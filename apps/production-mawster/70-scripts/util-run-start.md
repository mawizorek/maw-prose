---
id: script-util-run-start
title: UTIL · Run Start
type: reference
status: public
order: 71
revised: Aug 2026
summary: Opens the log row and hands back the key everything else reports against.
---

# UTIL · Run Start

!!! abstract "Grain"
    One call per run. Writes one [UTILITY_LOGS]{.rel} row and returns its key.

House rule 9 says every script is wrapped by Run Start and [UTIL · Run End](@script:script-util-run-end). This is the first half. It captures where the caller was standing, creates the log row, commits it, and puts itself back — the caller never notices it moved.

🔴 **It navigates and it commits, so it can never be called from inside a transaction.** Rule 7 forbids implicit commits mid-transaction, and `Go to Layout` plus `New Record` are two of them. Call it at the top of a script, before the transaction opens. That ordering is not a style preference: a Run Start in the middle of a transaction silently commits half of it.

## The script

```
# ═══════════════════════════════════════════════════
# UTIL · Run Start
# Purpose: open a UTILITY_LOGS row for this run
# Params (JSON): sessionToken, kind, scriptName, params
# Returns (JSON): ok, logPK, sessionToken, entryLayout
# ═══════════════════════════════════════════════════
# Never call inside a transaction. It commits.
# kind defaults to "script" ON PURPOSE. See the page.
# ═══════════════════════════════════════════════════

Set Error Capture [ On ]

Set Variable [ $p ; Get ( ScriptParameter ) ]

#  -- entry context, captured BEFORE we move ---------
Set Variable [ $entryLayout ; Get ( LayoutName ) ]
Set Variable [ $entryFound  ; Get ( FoundCount ) ]
Set Variable [ $token       ; ParamGetText ( $p ; "sessionToken" ; $$SESSION.token ) ]

Go to Layout [ util_UTILITY_LOGS ]
New Record/Request
If [ Get ( LastError ) ≠ 0 ]
    Set Variable [ $err ; Get ( LastError ) ]
    Go to Layout [ original layout ]
    Exit Script [ Param ( List ( PBool ( "ok" ; 0 ) ; PNum ( "error" ; $err ) ) ) ]
End If

Set Field [ UTILITY_LOGS::SessionToken ; $token ]
Set Field [ UTILITY_LOGS::vl_Kind      ; ParamGetText ( $p ; "kind" ; "script" ) ]
Set Field [ UTILITY_LOGS::ScriptName   ; ParamGetText ( $p ; "scriptName" ; "" ) ]
Set Field [ UTILITY_LOGS::vl_Status    ; "running" ]
Set Field [ UTILITY_LOGS::ts_Start     ; Get ( CurrentTimestamp ) ]
Set Field [ UTILITY_LOGS::json_Params  ; ParamGetText ( $p ; "params" ; "" ) ]
Set Field [ UTILITY_LOGS::AccountName  ; Get ( AccountName ) ]
Set Field [ UTILITY_LOGS::UserName     ; Get ( UserName ) ]
Set Field [ UTILITY_LOGS::HostName     ; Get ( HostName ) ]
Set Field [ UTILITY_LOGS::AppVersion   ; Get ( ApplicationVersion ) ]
Set Field [ UTILITY_LOGS::json_Context ; Param (
    List (
        PText ( "entryLayout" ; $entryLayout ) ;
        PNum  ( "entryFound"  ; $entryFound )
    )
) ]

Set Variable [ $pk ; UTILITY_LOGS::PrimaryKey ]

Commit Records/Requests [ No dialog ]
If [ Get ( LastError ) ≠ 0 ]
    Set Variable [ $err ; Get ( LastError ) ]
    Revert Record/Request [ No dialog ]
    Go to Layout [ original layout ]
    Exit Script [ Param ( List ( PBool ( "ok" ; 0 ) ; PNum ( "error" ; $err ) ) ) ]
End If

Go to Layout [ original layout ]

Exit Script [ Param (
    List (
        PBool ( "ok" ; 1 ) ;
        PText ( "logPK" ; $pk ) ;
        PText ( "sessionToken" ; $token ) ;
        PText ( "entryLayout" ; $entryLayout )
    )
) ]
```

Lands on [util_UTILITY_LOGS]{.layout} {.tbc}. Reads [$$SESSION.token]{.global}. Writes [SessionToken]{.field}, [vl_Kind]{.vl}, [ScriptName]{.field}, [vl_Status]{.vl}, [ts_Start]{.field}, [json_Params]{.field}, [json_Context]{.field}.

## ⭐ The `vl_Kind` default STAYS, and writing down why is the point of this section

[UTIL · Run End](@script:script-util-run-end) lost its `ok` default on 2026-08-10 because a forgotten status logged a success. **The obvious next move is to strip this default too, and it is wrong.** Left unwritten, someone tidies it out in a month on the strength of the sibling's commit message.

**A default is safe only when the case it assumes is the one that CANNOT go unnoticed if it is wrong.** Apply it to the two:

| | assumes | if wrong |
|---|---|---|
| [vl_Kind]{.vl} → `script` | the caller is a script | **one obviously-wrong row per day.** The session row is the first of its day, [FILE · Open](@script:script-file-open) is its only producer, and it is mislabelled in a way you see at a glance |
| [vl_Status]{.vl} → ~~`ok`~~ | the run succeeded | **invisible by construction.** You only open the log because something broke, and it says nothing did |

🔴 **And the default is what makes the [template](@script-template)'s bare `Perform Script [ UTIL · Run Start ]` legal.** Every templated script is a script; requiring the parameter would put one line of ceremony into every script in the file to describe the only thing they all have in common. **The exception passes explicitly, and there is exactly one exception.**

⚠️ **The condition that ends this argument, so it is falsifiable rather than a preference:** the moment a THIRD kind exists — an import run, a scheduled run, a server-side run — the caller population stops being 99% one thing, and the default becomes a lie told quietly. **Strip it then.**

⚠️ Not the same as [new_UTILITY_LOG](@script:retired-new-utility-log)'s version, which looked identical and was not: there the parameter was read from the wrong variable, so the default fired on **every** row rather than on the ones that omitted it. **A default that fires when nobody omitted anything is not a default, it is a constant.**

## Notes

**`Go to Layout [ original layout ]` is why the caller never has to restore anything.** FileMaker remembers the entry layout for the duration of one script, so the utility cleans up after itself rather than making every caller do it. Every exit path uses it, including the two failure paths — a utility that leaves you standing on a util layout after an error has turned a logging failure into a navigation bug.

**The caller's found set survives because [util_UTILITY_LOGS]{.layout} sits on its own table occurrence.** That is the real argument for house rule 8, and it is stronger than the one the rule states: borrowing a user-facing layout would not just risk a redesign breaking the script, it would move the user's record pointer inside their own found set.

⚠️ **Returning fires [OnLayoutEnter]{.trigger} on the entry layout.** If that trigger ever does real work, a run-logged script fires it twice. Nothing has such a trigger today {.verify}; write one and this is where it bites.

⚠️ **`$entryLayout` is returned and nothing consumes it.** Run End restores itself the same way, so the value is diagnostic only, and it is also written into [json_Context]{.field} where it is genuinely useful. Kept deliberately: if a caller ever needs to know where it stood before a chain of utilities ran, this is the only record of it.

🚫 **Do not pass values in `params`.** The field stores what it is handed, verbatim, and a log is the last surface anyone sanitises. Keys, ids and modes — never a name, never an amount.

## Unverified

- [$$SESSION.token]{.global} is set by [FILE · Open](@script:script-file-open). {.tbc} A script that runs before the open handler has finished, or one in a file opened by a script from another file, will find it empty and mint an orphan row with no session. Not worth guarding until it happens, but it is the known hole.
- [util_UTILITY_LOGS]{.layout} does not exist yet {.gap} — the file had 0 layouts at the last DDR. Neither does the [UTILITY_LOGS]{.rel} table occurrence this writes through.
