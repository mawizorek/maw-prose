---
id: script-file-close
title: FILE · Close
type: reference
status: public
order: 74
revised: Aug 2026
summary: Closes the session row. The one script in the file that must not return JSON.
---

# FILE · Close

!!! abstract "Grain"
    One run per clean file close. Set in **File Options → When closing → Perform script**.

**Retired name:** [00App__onLastWindowClose](@alias:script-file-close). **Fires from:** [OnLastWindowClose]{.trigger}.

## 🔴 This script is the documented exception to house rule 5

House rule 5 says params in and out are JSON, always. **This script returns `True` instead, and it has to.**

FileMaker treats the close handler's result as a **veto**: return false and the file does not close. Our template ends every script with `Exit Script [ JSONSetElement ( ... ) ]`, a text result, and a text result evaluated as a boolean is not something to gamble a file's closability on. **A file that will not shut is a worse bug than an unlogged close**, and it is the kind you discover at the wrong moment.

So the JSON contract stops at the door. Rule 5 governs scripts talking to other scripts; this one talks to FileMaker.

## 🔴 The veto trap, found live 2026-08-09

The first close handler entered into the file was [00App__onLastWindowClose]{.alias}, and it had **no `Exit Script` at all**. It ended on a `Perform Script` call to [FILE · Save Backup](@script:script-file-save-backup), which exits with a text result when the user declines the prompt.

**That combination locks the file open.** FileMaker persists a subscript's result up to its caller when the caller does not set one of its own ([Claris Community](https://community.claris.com/en/s/question/0D50H00006h8zTbSAI/why-exit-script-at-the-end-of-a-script)), so the close handler's result became the backup script's result, and the close handler's result is [a veto](https://help.claris.com/en/pro-help/content/onlastwindowclose.html). Decline the backup → the file refuses to close. [Reproduced by reasoning from first-party docs, not yet reproduced in the file]{.verify}

⭐ **Omitting `Exit Script` is not neutral here, and that is the part that catches people.** It does not mean *no result*; it means *whatever the last subscript happened to return*. The handler inherits a decision made by a script that knows nothing about closing files.

🔴 **So `Exit Script [ True ]` is unconditional and it is the last step, always, on every path.** Not inside a branch. Not skipped when there is nothing to log. **A close handler with a conditional exit is a file with a conditional ability to close.**

## 🚫 Do not call the backup from here

It was built that way. Move it. [FILE · Save Backup](@script:script-file-save-backup) carries the full argument; the short version is that a close-triggered backup **misses every session that ended badly** — a crash fires no [OnLastWindowClose]{.trigger} — which is the only kind of session anyone has ever wanted a backup for. It runs from [FILE · Open](@script:script-file-open) instead, where it copies the last known-good state before the day's edits start.

## The script

```
# ═══════════════════════════════════════════════════
# FILE · Close
# Purpose: close the session's log row
# Params (JSON): none
# Returns: True. NOT JSON - the result is a close veto
# ═══════════════════════════════════════════════════

Set Error Capture [ On ]
Allow User Abort [ Off ]

If [ not IsEmpty ( $$SESSION.logPK ) ]
    Perform Script [ UTIL · Run End ; Parameter:
    Param (
        List (
            PText ( "logPK"   ; $$SESSION.logPK ) ;
            PText ( "status"  ; "ok" ) ;
            PText ( "comment" ; "file closed cleanly" )
        )
    ) ]
End If

Exit Script [ True ]
```

Calls [UTIL · Run End](@script:script-util-run-end). Reads [$$SESSION.logPK]{.global}.

## Notes

**The `If` is load-bearing.** If [FILE · Open](@script:script-file-open) failed to log, [$$SESSION.logPK]{.global} is empty and Run End would be called with nothing to close. Guarding here keeps the failure in one place instead of producing a second error at the exact moment the file is trying to shut.

**Everything here is best-effort and the design assumes it.** A crash, a force quit, a lost server connection or a killed process fires no close trigger at all. That is not a hole to plug — see [utility logs](@table-utility-logs), where an open row with no close is read as the crash log rather than as a missing write.

⚠️ **Do not add work to this script.** Every step is a step between the user clicking close and the file closing, and it runs at the moment they have already decided to leave. Log the close and get out of the way. **The backup was the first thing to try to move in here; it will not be the last.**

⚠️ **`Show Custom Dialog` is banned in this script and in everything it calls.** A dialog on the close path is a prompt the user answers *after* deciding to leave, and its answer feeds the veto. If a close-time question is ever genuinely needed, ask it somewhere the answer is not also a vote on whether the file may shut.

## Naming

The live script is [00App__onLastWindowClose]{.alias} — double underscore, against three single-underscore siblings, and a second naming convention alongside the `FILE ·` prefix this folder committed to. **Rename to `FILE · Close`.** See [the scripts index](@scripts) for the one-taxonomy ruling.

## Unverified

- Whether `Exit Script [ True ]` behaves identically to omitting the result entirely on the close handler. {.tbc} **Partly answered by the 08-09 finding: omitting it is definitely NOT equivalent**, because the handler then inherits a subscript's result. What remains open is whether an omitted result with no subscript calls at all still permits the close. Moot in practice — the explicit form is written here regardless, because an omitted result is indistinguishable from a forgotten one.
- Which script File Options currently points at. {.gap} Nothing in the repo records it and three scripts claim the open half.
