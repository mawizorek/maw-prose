---
id: script-util-value-index-move
title: UTIL · Value Index Move (+ FIND · Values)
type: reference
status: public
order: 77
revised: Aug 2026
summary: Steps to first, last, next or previous within one value list's sort order. Rewrite of status_index_move, split in two.
---

# UTIL · Value Index Move

!!! abstract "Grain"
    One step per call, within one list.

**Retired name:** [status_index_move](@alias:script-util-value-index-move). Both scripts call [ErrJSON](@calc:cf-errjson).

## Why it is two scripts

The original does a find *and* the stepping logic. House rule 3 says the find moves out — but the real argument is not the rule, it is that **the find is reusable and the stepping is not.** Anything that needs the values of one list wants `FIND · Values`; only a stepper wants the arithmetic. Fused, the find is unreachable from anywhere else and gets typed inline a second time.

---

## FIND · Values

```
# ═══════════════════════════════════════════════════
# FIND · Values
# Purpose: the VALUES rows for one list, in sort order
# Params (JSON): fkList   MANDATORY
# Returns (JSON): ok, count
# ═══════════════════════════════════════════════════

Set Error Capture [ On ]
Allow User Abort [ Off ]

Set Variable [ $p      ; Get ( ScriptParameter ) ]
Set Variable [ $fkList ; ParamGetText ( $p ; "fkList" ; "" ) ]

If [ IsEmpty ( $fkList ) ]
    Exit Script [ ErrJSON ( 0 ; "FIND · Values" ; "fkList is required" ) ]
End If

Perform Script [ GOTO · Values ]

Enter Find Mode [ Pause: Off ]
Set Field [ util_VALUES::fkList ; $fkList ]
Perform Find [ ]

#  401 = no records match. That is an ANSWER, not a failure.
Set Variable [ $err ; Get ( LastError ) ]
If [ $err = 401 ]
    Exit Script [ Param ( List (
        PBool ( "ok"    ; 1 ) ;
        PNum  ( "count" ; 0 ) ) ) ]
Else If [ $err ≠ 0 ]
    Exit Script [ ErrJSON ( $err ; "FIND · Values / Perform Find" ; $fkList ) ]
End If

Sort Records [ By field: util_VALUES::Sort ; ascending ; With dialog: Off ]
If [ Get ( LastError ) ≠ 0 ]
    Exit Script [ ErrJSON ( Get ( LastError ) ; "FIND · Values / Sort" ; "" ) ]
End If

Exit Script [ Param ( List (
    PBool ( "ok"    ; 1 ) ;
    PNum  ( "count" ; Get ( FoundCount ) ) ) ) ]
```

Calls [GOTO · Values](@script:script-goto) and [ErrJSON](@calc:cf-errjson). Lands on [util_VALUES]{.layout} {.tbc}, finds on [fkList]{.field}, sorts on `VALUES::Sort` {.gap}.

🚫 **`$fkList` goes into the log through [ErrJSON](@calc:cf-errjson), and it is a KEY, which is why it is allowed.** A UUID identifies a row; it is not a person's name or a value someone typed. **Never widen this to the search TERM** — that is the exact call that puts real data in a permanent log, and it is the tempting one while debugging.

### 🔴 Error 401 is not an error

The live script does `If [ Get ( LastError ) ≠ 0 ]` straight after `Perform Find` and treats the result as failure. **`401` means "no records match", which is the correct and expected outcome of a find against an empty list.** Treated as a hard error, an empty list becomes a crash instead of a zero.

⭐ **This is the mirror of the swallowed-error problem, and it is the reason house rule 2 is easy to get wrong in both directions.** Not checking means missing real failures; checking bluntly means inventing failures that are not there. **Branch on the code, never on `≠ 0` alone, after any step whose "nothing found" case is legitimate.** Finds are the main one; `Go to Record [Next]` at the end of a found set (error 101) is the other one this file will hit.

### 🔴 `Sort Records [ Restore ]` is replaced by a sort on a real field

The live script uses `Restore`, which stores the sort specification **inside the script**. Change the intended order and the script keeps silently sorting by the old spec — no error, no symptom, just a "next" that goes to the wrong place.

⭐ Same shape as everything else settled this week: **a value that looks authored and is actually a stale copy.** The fix is the same one used on themes and on standard events — **make the order DATA.** A `Sort` field is visible, editable and diffable. A stored sort spec is none of those.

⚠️ [VALUES]{.rel} was renamed to `VALUE_ITEMS` in the open fix queue (SQL reserved word). **If that rename lands, this script and its [GOTO ·](@script:script-goto) change with it** — noted here so the pair is not discovered separately. The old name will need an [VALUES]{.alias} row.

---

## UTIL · Value Index Move

```
# ═══════════════════════════════════════════════════
# UTIL · Value Index Move
# Purpose: step within one list's sort order
# Params (JSON): fkList    MANDATORY
#                mode      MANDATORY  first|last|next|previous
#                curIndex  required when mode is next|previous
# Returns (JSON): ok, index, count, atEnd
# ═══════════════════════════════════════════════════

Set Error Capture [ On ]
Allow User Abort [ Off ]

Set Variable [ $p      ; Get ( ScriptParameter ) ]
Set Variable [ $fkList ; ParamGetText ( $p ; "fkList" ; "" ) ]
Set Variable [ $mode   ; ParamGetText ( $p ; "mode"   ; "" ) ]

If [ IsEmpty ( $fkList ) or IsEmpty ( $mode ) ]
    Exit Script [ ErrJSON ( 0 ; "UTIL · Value Index Move" ;
        "fkList and mode are both required" ) ]
End If

If [ $mode = "next" or $mode = "previous" ]
    Set Variable [ $cur ; ParamGetNumber ( $p ; "curIndex" ; "" ) ]
    If [ IsEmpty ( $cur ) ]
        Exit Script [ ErrJSON ( 0 ; "UTIL · Value Index Move" ;
            "curIndex is required for mode " & $mode ) ]
    End If
End If

Perform Script [ FIND · Values ; Param ( PText ( "fkList" ; $fkList ) ) ]
Set Variable [ $r ; Get ( ScriptResult ) ]
If [ not ParamGetBoolean ( $r ; "ok" ; 0 ) ]
    Exit Script [ $r ]
End If

Set Variable [ $count ; ParamGetNumber ( $r ; "count" ; 0 ) ]
If [ $count = 0 ]
    Exit Script [ Param ( List (
        PBool ( "ok"    ; 1 ) ;
        PNum  ( "count" ; 0 ) ;
        PBool ( "atEnd" ; 1 ) ) ) ]
End If

#  -- resolve the target index, clamped ---------------
Set Variable [ $i ; Case (
    $mode = "first"    ; 1 ;
    $mode = "last"     ; $count ;
    $mode = "next"     ; Min ( $cur + 1 ; $count ) ;
    $mode = "previous" ; Max ( $cur - 1 ; 1 ) ;
    0 ) ]

If [ $i = 0 ]
    Exit Script [ ErrJSON ( 0 ; "UTIL · Value Index Move" ;
        "unknown mode: " & $mode ) ]
End If

Go to Record/Request [ $i ]
If [ Get ( LastError ) ≠ 0 ]
    Exit Script [ ErrJSON ( Get ( LastError ) ; "Go to Record" ; $i ) ]
End If

Exit Script [ Param ( List (
    PBool ( "ok"    ; 1 ) ;
    PNum  ( "index" ; $i ) ;
    PNum  ( "count" ; $count ) ;
    PBool ( "atEnd" ; $i = 1 or $i = $count ) ) ) ]
```

⭐ **`Exit Script [ $r ]` passes the inner failure up UNMODIFIED, and that is deliberate.** Re-wrapping it in a fresh [ErrJSON](@calc:cf-errjson) here would overwrite `where` with this script's name and lose the fact that the find is what failed. **A caller wants the site of the failure, not the site of the last handler that touched it.**

## What changed, and why

### 🔴 The `"last"` default on a missing mode is removed

The live script reads `ParamGetText ( $p ; "mode" ; "last" )`. **A caller that forgot to pass a mode silently jumps to the end of the list** — a real action, taken confidently, on no instruction. Mode is mandatory now and absence is an error.

⭐ Same family as [new_UTILITY_LOG](@script:retired-new-utility-log) defaulting its action type to `"script"`: **a default that is also a plausible real value cannot be distinguished from a working system.** Both scripts in this pass had one.

### 🔴 The `"abort"` sentinel is gone

`ParamGetText ( $p ; "vl" ; "abort" )` then `If [ $vl = "abort" ]` cannot tell a missing parameter from a caller who deliberately sent `"abort"`. Empty is the missing marker. Written up in full on [FIND · All Or None](@script:script-find-all-or-none).

### The empty `If [ ]` at line 35 is resolved

The live script ends on an `If` with no condition and no body — the unfinished stepping logic. That is what the `Case` block above is for. ⚠️ **An empty `If` is not inert: it is a decision someone was in the middle of making**, and it is the single most useful thing in the original script because it marks exactly where the thinking stopped.

### Clamping instead of erroring at the ends

`Min` / `Max` hold the index inside the found set, and `atEnd` tells the caller it did. A stepper that errors at the boundary makes every caller write the same guard; one that clamps and reports makes the boundary visible without making it fatal.

### Naming

[status_index_move]{.alias} names neither what it does (steps within a list) nor what it operates on ([VALUES]{.rel}), and the word *status* is a leftover from one caller. **A script named after one of its callers gets copied the day a second caller appears.**

## Unverified

- `VALUES::Sort` is assumed to exist. {.gap} The live script sorted by a stored spec, so the field may not be there. **Confirm before entering** — and if it is missing, adding it is the correct fix, not reinstating `Restore`.
- Whether `Go to Record/Request [ by calculation ]` accepts a variable directly in the installed version. {.tbc} It does in every version this file will run on, but it has not been tested here.
- Who actually calls this. {.gap} It is referenced in a stray comment inside [new_UTILITY_LOG](@script:retired-new-utility-log) and nowhere else that has been read. **A utility with no live caller is a utility whose contract nobody has pressure-tested.**
