---
id: script-util-run-end
title: UTIL · Run End
type: reference
status: public
order: 72
revised: Aug 2026
summary: Closes the log row through a relationship. No find, ever. A missing status is never success.
---

# UTIL · Run End

!!! abstract "Grain"
    One call per run. Writes the outcome onto the row [UTIL · Run Start](@script:script-util-run-start) opened.

The second half of house rule 9. It stamps the end time, the status and the error, and puts itself back where it came from.

🔴 **It reaches the log row through a relationship, not a find.** Rule 3 forbids inline `Enter Find Mode`, and this is exactly the case that tempts people to break it — the row is known by key, so finding it would be searching for something you already have the address of. Setting a global and editing through the relationship is fewer steps, cannot disturb a found set, and is the rule 7 transaction pattern applied to a one-record edit.

⚠️ **That makes a relationship a hard dependency.** [g_logPK]{.global} = [UTILITY_LOGS::PrimaryKey]{.field}, table occurrence named `UTILITY_LOGS|byLogPK` {.gap}. **It does not exist. This script does nothing until it does**, and "does nothing" here means every log row stays `running` forever — the exact end state that retired [new_UTILITY_LOG](@script:retired-new-utility-log), reached from the other direction.

## The script

```
# ═══════════════════════════════════════════════════
# UTIL · Run End
# Purpose: close the UTILITY_LOGS row this run opened
# Params (JSON): logPK (required), status, comment, errorCode
# Returns (JSON): ok, error
# ═══════════════════════════════════════════════════
# Never call inside a transaction. It commits.
# Requires TO UTILITY_LOGS|byLogPK off GLOBAL_USE.
# A MISSING status is logged as unreported, never as ok.
# ═══════════════════════════════════════════════════

Set Error Capture [ On ]

Set Variable [ $p     ; Get ( ScriptParameter ) ]
Set Variable [ $logPK ; ParamGetText ( $p ; "logPK" ; "" ) ]

If [ IsEmpty ( $logPK ) ]
    Exit Script [ Param (
        List (
            PBool ( "ok" ; 0 ) ;
            PText ( "error" ; "missing logPK" )
        )
    ) ]
End If

#  The caller did not say how it went. Say THAT, not "fine".
Set Variable [ $status ; ParamGetText ( $p ; "status" ; "unreported" ) ]

Go to Layout [ util_GLOBAL_USE ]
Set Field [ GLOBAL_USE::g_logPK ; $logPK ]

If [ IsEmpty ( UTILITY_LOGS|byLogPK::PrimaryKey ) ]
    Go to Layout [ original layout ]
    Exit Script [ Param (
        List (
            PBool ( "ok" ; 0 ) ;
            PText ( "error" ; "log row not found" ) ;
            PText ( "logPK" ; $logPK )
        )
    ) ]
End If

Set Field [ UTILITY_LOGS|byLogPK::ts_End    ; Get ( CurrentTimestamp ) ]
Set Field [ UTILITY_LOGS|byLogPK::vl_Status ; $status ]
Set Field [ UTILITY_LOGS|byLogPK::Comment   ; ParamGetText   ( $p ; "comment"   ; "" ) ]
Set Field [ UTILITY_LOGS|byLogPK::ErrorCode ; ParamGetNumber ( $p ; "errorCode" ; 0 ) ]

Commit Records/Requests [ No dialog ]
Set Variable [ $err ; Get ( LastError ) ]
If [ $err ≠ 0 ]
    Revert Record/Request [ No dialog ]
End If

Go to Layout [ original layout ]

Exit Script [ Param (
    List (
        PBool ( "ok" ; $err = 0 ) ;
        PNum  ( "error" ; $err )
    )
) ]
```

Lands on [util_GLOBAL_USE]{.layout} {.tbc}. Sets [g_logPK]{.global}, edits through `UTILITY_LOGS|byLogPK` {.gap}. Writes [ts_End]{.field}, [vl_Status]{.vl}, [Comment]{.field}, [ErrorCode]{.field}.

## 🔴 `vl_Status` defaults to `unreported`. Changed 2026-08-10, and this is the important part of the page.

It used to default to **`ok`**. That meant a script which failed and then called Run End without passing a status **logged a success** — and Run End cannot know better, because it cannot see what happened upstream.

⭐ **A default is safe only when the case it assumes is the one that CANNOT go unnoticed if it is wrong.** That is the sharpened rule, and it is what separates this from the other two defaults in the logging spine. A mislabelled *kind* on a session row is one obviously-wrong row a day, visible on sight. **A mislabelled *outcome* on a failure is invisible by construction** — you only read the log because something went wrong, and the log is telling you nothing did.

`unreported` is the [magenta](@script-template) pattern one runtime over: **a value nothing legitimately produces, so seeing it is proof of a break rather than a guess that might be right.** Group by [vl_Status]{.vl} and every caller that forgot shows up in its own bucket.

⚠️ **It is a real value list entry, not a blank** {.gap}. `unreported` has to be added to the [vl_Status]{.vl} value list or it fails validation on write, which turns a soft signal into a hard error at the worst moment.

**The rule this leaves for callers is unchanged and still the easiest thing to forget: every failure path passes its own status.** What changed is that forgetting now produces a visible wrong answer instead of an invisible right-looking one.

## Notes

**A missing `logPK` exits quietly rather than loudly.** The caller has already finished its work by the time Run End is reached, so failing hard here would turn a bookkeeping problem into a user-visible one. The `ok: 0` is there for a caller that wants to care.

**"Log row not found" is a different failure from "could not write" and is reported as such.** The first means the key is wrong or the row was deleted; the second means the write was refused. Collapsing them would make the one debuggable case indistinguishable from the one that is not.

**`$status` is resolved BEFORE the navigation**, so the one line that carries the outcome is read while the parameter is still the only thing in scope. Cosmetic, and it keeps the substantive decision out of the middle of a block that is all plumbing.

## Callers

[FILE · Close](@script:script-file-close) · [exit w/ errors](@script:retired-exit-w-errors)'s replacement error path · every script built from the [template](@script-template).

## Unverified

- Whether [util_GLOBAL_USE]{.layout} should be the anchor layout for all utility writes or only this one. {.tbc} It is the first script to need a global-keyed edit and it will not be the last, so the answer decides whether the utility layer gets one anchor or several. **Not ruled.**
- `UTILITY_LOGS|byLogPK` does not exist. {.gap} Build it before entering either half of the pair.
- `unreported` is not yet in the [vl_Status]{.vl} value list. {.gap}
