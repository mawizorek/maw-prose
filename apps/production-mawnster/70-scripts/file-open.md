---
id: script-file-open
title: FILE · Open
type: reference
status: public
order: 73
revised: Aug 2026
summary: The session starts here. Mints the token, logs the open, then does the file's setup work.
---

# FILE · Open

!!! abstract "Grain"
    One run per file session. Set in **File Options → When opening → Perform script**, not on a layout trigger.

This is the only place a session token is created. Everything else in the file inherits it.

🔴 **BLOCKED. Do not enter this script yet.** [APP_SESSIONS]{.rel} is a second claimant on [UTILITY_LOGS]{.rel} and nothing has ruled which table holds the session row — so this script does not know where to write. Full argument on [trigger_App_Open](@script:retired-trigger-app-open). {.gap}

**Three scripts claim this handler:** [00App_onFirstWindowOpen]{.script} {.tbc}, [trigger_App_Open](@script:retired-trigger-app-open), [App_Startup](@script:retired-app-startup). Only one can be set in File Options, and **nothing in the file records which one won** {.verify}.

## The script

```
# ═══════════════════════════════════════════════════
# FILE · Open
# Purpose: start the session, log it, run file setup
# Params (JSON): none
# Returns: nothing meaningful. Fires from File Options
# ═══════════════════════════════════════════════════

Set Error Capture [ On ]
Allow User Abort [ Off ]

Set Variable [ $$SESSION.token ; Get ( UUID ) ]

Perform Script [ UTIL · Run Start ; Parameter:
Param (
    List (
        PText ( "sessionToken" ; $$SESSION.token ) ;
        PText ( "kind"         ; "session" ) ;
        PText ( "scriptName"   ; "FILE · Open" ) ;
        PText ( "comment"      ; "file opened" )
    )
) ]
Set Variable [ $$SESSION.logPK ; ParamGetText ( Get ( ScriptResult ) ; "logPK" ; "" ) ]

#  -- file setup ------------------------------------
Perform Script [ FILE · Save Backup ]
#  auto_LAYOUTS refresh (upsert, never rebuild)
#  g_ defaults, including g_currentOrg
#  landing layout via SHOW ·

Exit Script [ True ]
```

Mints [$$SESSION.token]{.global} and [$$SESSION.logPK]{.global}. Calls [UTIL · Run Start](@script:script-util-run-start) and [FILE · Save Backup](@script:script-file-save-backup). Fires from [OnFirstWindowOpen]{.trigger}.

## Notes

**[$$SESSION.token]{.global} and [$$SESSION.logPK]{.global} are global variables and that is deliberate.** They have to outlive this script and be readable from every other one. A `$` variable dies at the last `Exit Script` and a field would mean a write on every read; a global is the only lifetime that fits a session.

**`Get ( UUID )` is line one of the body and cannot fail**, so nothing can happen between minting the token and using it. That is the fix for [trigger_App_Open](@script:retired-trigger-app-open)'s defect, where the token was set three lines *after* the row was written and an error in between orphaned the session.

⚠️ **This handler already had a second job before logging existed.** `INDEX.tsv` describes [auto_LAYOUTS]{.rel} as *generated on file open for front lazy menu loading*, so the open script is an orchestrator that happens to log first, not a logging script. Keep the log call at the top: if the setup work fails, the session row already exists to record that it did.

🔴 **The backup runs from HERE, not from the close handler** — added 2026-08-09. [FILE · Save Backup](@script:script-file-save-backup) carries the argument: a close-triggered backup misses every session that crashed, and those are the only sessions anyone ever wanted a backup for. **It is placed after the log call on purpose**, so a backup that fails is recorded in a session row that already exists.

⚠️ **It is also the slowest thing in the open path.** A multi-MB file copy runs before the user sees a layout. If that becomes intolerable, the answer is a button rather than a faster copy — and the log row is what will tell you how long it actually takes {.verify}.

⚠️ **[g_currentOrg]{.global} must be set here.** Empty at startup means every token resolves to **magenta** and the whole file prints unstyled. The theme cascade has no other entry point.

⚠️ **`Allow User Abort [ Off ]` disables the debugger's abort.** Turn it back on while developing this script specifically — a file-open script you cannot escape is a file you cannot get into.

⬜ **The abandoned-run sweep belongs here and is not written** {.gap}. See [utility logs](@table-utility-logs): a `running` row carrying a stale token is a crashed session, and nothing currently resolves it.

## Unverified

- Whether the setup work stays inline or moves to a `UTIL · File Setup` and gets called. {.tbc} Inline is fine at three steps and stops being fine at ten, and **nobody has drawn the line.** The backup call just made it four.
- What [auto_LAYOUTS]{.rel} is actually for. {.gap} **Asked five times, never answered.** If it is the doc index that `EXPORT_SET_ITEMS::fkDocument` points at, the refresh here MUST upsert rather than delete-and-recreate, or every export set item is orphaned silently.
