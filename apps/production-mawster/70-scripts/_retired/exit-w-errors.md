---
id: retired-exit-w-errors
title: exit w/ errors (RETIRED)
type: reference
status: public
order: 794
revised: 2026-08
summary: Cannot do what its name says. A subscript cannot exit its caller.
---

# exit w/ errors — RETIRED 2026-08-09

!!! danger "This is the most important page in the archive"
    The script is not buggy. **The idea does not work.** Anything built on it inherits the same hole.

✅ **Its replacement now exists: [ErrJSON](@calc:cf-errjson), a custom function.** That page also records that the canonical parameter family explicitly forbids result-builder wrappers, and why this one is app-level anyway.

## VERBATIM

Transcribed from the FileMaker script workspace, 2026-08-09 ~21:45 ET. Clipped lines are marked; nothing is reconstructed.

```
# ---

# REQUIRED: VALUE LIST
# EXPECTING: "next, previous, first, or last, in VALUE LIST sort"
# ---
Set Error Capture [ On ]
Allow User Abort [ Off ]


Set Variable [ $p ; Value: Get(ScriptParameter) ]
Set Variable [ $comment ; Value: ParamGetText ( $p ; "comment" ; "" ) ]
If [ $comment ≠ "" ]
    Show Custom Dialog [ $comment ; "Exiting…" ]
End If







Exit Script [ Text Result: Param ( List ( Pbool ( "o…[clipped] ]
```

The final line is truncated in the source screenshot {.gap} — the boolean key and everything after it were never read.

## WHY IT DIED

🔴 **`Exit Script` ends the script it is written in. It has no reach into the caller.**

Call this from a script that has just hit a failed find and the sequence is: this script runs, shows its dialog, exits — **and the caller resumes on its very next step, error unhandled, as if nothing happened.** The name promises an abort. The mechanism cannot deliver one. There is no version of this script that works, because the thing it is trying to do is not a thing a subscript can do in FileMaker.

⭐ **And the failure is invisible in exactly the situation it was written for.** You only reach for it on an error path, error paths are the least-tested code in any file, and the symptom of it not working is *the script keeps going* — which looks identical to no error having occurred.

⚠️ The step that DOES stop everything is `Halt Script`, and it is wrong here for a different reason: it kills the entire call stack including the caller's cleanup, so [UTIL · Run End](@script:script-util-run-end) never runs and the log row stays open forever. **A logged crash is worth more than a clean abort.**

### Two smaller defects, worth naming because they generalize

**The header belongs to a different script.** `# REQUIRED: VALUE LIST` and `# EXPECTING: "next, previous, first, or last…"` are [status_index_move](@script:script-util-value-index-move)'s header, pasted in and never edited. This is the *comments-are-the-spec, fields-are-the-build* pattern that the DDR pass has now found in field definitions, in table comments, and here in scripts. **Three surfaces, one habit: the description is written in the same sitting as the thing and never reconciled with it.**

**`Show Custom Dialog` is not suppressed by `Set Error Capture`.** A dialog inside an error handler stops an unattended run dead and waits for a human who is not there. Any error path that can fire during an import, an export or a scheduled run must be able to complete silently.

## WHAT REPLACES IT

**Nothing, as a script.** The payload builder is [ErrJSON](@calc:cf-errjson), a custom function, and the caller does its own exiting:

```
// ErrJSON ( code ; where ; comment )
Param (
    List (
        PBool ( "ok"      ; 0 ) ;
        PNum  ( "error"   ; code ) ;
        PText ( "where"   ; where ) ;
        PText ( "comment" ; comment )
    )
)
```

Then, in the script that actually failed:

```
If [ Get ( LastError ) ≠ 0 ]
    Perform Script [ UTIL · Run End ; logPK, status "error", comment ]
    Exit Script [ ErrJSON ( Get ( LastError ) ; "Perform Find" ; "" ) ]
End If
```

⭐ **The rewrite is smaller than the script it replaces and it works, which is the tell that the original was a script-shaped answer to a function-shaped problem.** House rule 6 already says domain strings belong in custom functions; this widens it: **anything a script returns but does not DO is a custom function.**

⚠️ It also gets the reporting right by accident. The dialog is gone, so an unattended run completes, and the failure lands in [UTILITY_LOGS]{.rel} where it can be found later — instead of on a screen nobody was watching.

⚠️ **The block above is a QUOTE of the definition, not a second copy of it.** [ErrJSON](@calc:cf-errjson)'s own page is canonical; if the two ever disagree, that page wins and this one is wrong. It is reproduced here because the argument for retiring this script is unreadable without seeing what replaced it.

## Callers

Known to have called it: [FIND · All Or None](@script:script-find-all-or-none) and [status_index_move](@script:script-util-value-index-move) in their live forms. **A full caller list has never been read** {.gap} — it needs a DDR script-reference pass, and it is required before the script is deleted rather than merely retired.
