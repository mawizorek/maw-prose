---
id: script-find-all-or-none
title: FIND · All Or None
type: reference
status: public
order: 76
revised: Aug 2026
summary: Sets the current layout's found set to everything, or to nothing. The one entity-agnostic FIND.
---

# FIND · All Or None

!!! abstract "Grain"
    One run per found-set reset.

**Retired name:** [Show ALL or NONE](@alias:script-find-all-or-none).

## Why it is a `FIND ·` and not a `SHOW ·`

It returns a found set and touches nothing else, which is the `FIND ·` contract. `SHOW ·` sets state and then sends a *person* somewhere; nobody arrives anywhere here.

🔴 **It is the one FIND that is not bound to an entity, and that is a hazard, not a feature.** It operates on whatever table the current layout happens to sit on, so its behaviour is decided by the caller's context rather than by its parameter. **Always call a [GOTO ·](@script:script-goto) immediately before it.** A caller that assumes it knows where it is standing is the bug this script will eventually cause.

## The script

```
# ═══════════════════════════════════════════════════
# FIND · All Or None
# Purpose: found set = every record, or no records
# Params (JSON): mode = "all" | "none"   MANDATORY
# Returns (JSON): ok, mode, count
# ═══════════════════════════════════════════════════

Set Error Capture [ On ]
Allow User Abort [ Off ]

Set Variable [ $p    ; Get ( ScriptParameter ) ]
Set Variable [ $mode ; ParamGetText ( $p ; "mode" ; "" ) ]

If [ IsEmpty ( $mode ) ]
    Exit Script [ ErrJSON ( 0 ; "FIND · All Or None" ; "mode is required" ) ]
End If

If [ $mode = "all" ]
    Show All Records

Else If [ $mode = "none" ]
    Show All Records
    Show Omitted Only

Else
    Exit Script [ ErrJSON ( 0 ; "FIND · All Or None" ;
        "unknown mode: " & $mode ) ]
End If

Exit Script [ Param ( List (
    PBool ( "ok"    ; 1 ) ;
    PText ( "mode"  ; $mode ) ;
    PNum  ( "count" ; Get ( FoundCount ) ) ) ) ]
```

Calls [ErrJSON](@calc:cf-errjson).

🔴 **Both failure calls pass `0` as the error code, and that is correct rather than a placeholder.** `0` is FileMaker's code for *no error* — because FileMaker did not fail, **this script refused.** A missing or unknown `mode` is a rejection by the script, and there is no Claris code for *the caller wrote the wrong thing*. **The consequence for every caller: read `ok` first, never `error`.** Full argument on [ErrJSON](@calc:cf-errjson)'s own page.

## What changed, and why

### 🔴 1 · Every path now exits with a result

The original's two **success** branches fall out of the `If` block and off the end of the script with no `Exit Script`. That does not return nothing — **FileMaker persists the previous subscript's result**, so a caller checking `Get ( ScriptResult )` after a successful `"all"` reads whatever the last script that bothered to set one returned ([Claris Community](https://community.claris.com/en/s/question/0D50H00006h8zTbSAI/why-exit-script-at-the-end-of-a-script)).

⭐ **This is the same mechanism that nearly locked the file open** through [FILE · Close](@script:script-file-close) on the same day. **One defect, two scripts, and in one of them it was fatal.** The rule that closes it everywhere: *a script has exactly one exit shape, and it is on the last line.*

### 🔴 2 · The `"abort"` default is removed everywhere

The original reads `ParamGetText ( $param ; "mode" ; "abort" )` and then branches on `$mode = "abort"`. **A caller who forgot the parameter and a caller who deliberately passed `"abort"` land in the same branch and cannot be told apart.** A default exists to describe *absence*; the moment it is also a legal input, absence stops being detectable.

**Empty is the missing marker. Missing is an error.** Same rule applies to the other three scripts in this pass — all four used `"abort"` this way.

### 3 · The three spellings of NONE collapse to one

`$mode = "NONE" or $mode = "none" or …` — **FileMaker's `=` on text is case-insensitive.** All three tests are the same test. `Exact ( )` is the case-sensitive one, and it is not wanted here.

⚠️ The redundancy is worth naming rather than just deleting: **it is a written record of an assumption nobody checked**, and it appears in three of the four scripts. Tidying it away without saying so loses the signal.

### 4 · The commented-out dialog is deleted, not commented

`// Show Custom Dialog [ "None" ]` sits in the live script. Legacy shipped with a live debug dialog in a running file; **this is that, one step earlier.** A commented step is uncommented by the next person in a hurry. Delete it — git has it now.

### 5 · Failure is a payload, not a dialog

[ErrJSON](@calc:cf-errjson) replaces the call to [exit w/ errors](@script:retired-exit-w-errors). That script could never work — a subscript cannot exit its caller — so the caller checks `ok` and exits itself.

## Notes

**`Show All Records` → `Show Omitted Only` is the correct "find nothing" idiom** and it was right in the original. Showing everything empties the omitted set; showing the omitted set then leaves you on zero records. It beats a find that cannot match, because it cannot accidentally match.

🔴 **Both steps implicitly commit** (house rule 7). This script can never be called from inside a transaction. Worth a comment in the script body itself, since the caller is where the damage happens.

⚠️ **`Show All Records` on a large table fetches the whole found set.** Harmless on [VALUES]{.rel}, not harmless on [EVENTS]{.rel} once real seasons are loaded. If a caller only needs a count, it wants a relationship or an `ExecuteSQL`, not this.

## Unverified

- That `=` on text is case-insensitive in the installed version. {.tbc} Believed true of every version this file will run on; the collapse of the three NONE spellings depends on it.
- Who calls this today. {.gap} [trigger_App_Open](@script:retired-trigger-app-open) did, and it is retired.
