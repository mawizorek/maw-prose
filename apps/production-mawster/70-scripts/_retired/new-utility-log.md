---
id: retired-new-utility-log
title: new_UTILITY_LOG (RETIRED)
type: reference
status: public
order: 793
revised: 2026-08
summary: Second claimant on run logging. Three of its own variables never get a value.
---

# new_UTILITY_LOG — RETIRED 2026-08-09

!!! danger "This script writes rows, and every row it writes is wrong in the same way"
    It does not fail. It logs, successfully, with the identifying columns empty. A log you cannot join is worse than no log, because it looks like coverage.

## VERBATIM

Transcribed from the FileMaker script workspace, 2026-08-09 ~21:45 ET. Clipped lines are marked; nothing is reconstructed.

```
# ---
# id: new-utility-log

# ---
Set Error Capture [ On ]
Allow User Abort [ Off ]

Set Variable [ $param ; Value: Get(ScriptParameter) ]
# MANDATORY:  fkReport
# EXPECTED:   ACTION | vl_Status | Comment
Set Variable [ $fkReport ]


# perform script to: find "next, previous, first, or last, in VALUE LIST sort"
# return FIRST
Set Variable [ ]




Perform Script [ Specified: From list ; "goto view UTILITY LOGS" ; Parameter:   ]
New Record/Request
If [ Get ( LastError ) ≠ 0 ]
    Exit Script [ Text Result: Param ( List ( Pbool…[clipped] ]
End If




Set Field [ view UTILITY LOGS::fkSessionToken ; $token ]


Set Field [ view UTILITY LOGS::vl_ActionType ; ParamGetText ( $p : "kind" : "script" ) ]
```

One line truncated in the source screenshot {.gap}. Calls [goto_view_UTILITY_LOGS](@alias:script-goto). Writes [UTILITY_LOGS::fkSessionToken]{.field} and [UTILITY_LOGS::vl_ActionType]{.field}.

## WHY IT DIED

### 1 · 🔴 Three variables are read and never written

This is the whole story, and none of it throws an error.

| Read on line | Written on line | Result at runtime |
|---|---|---|
| `$token` (33) | never | [fkSessionToken]{.field} is **always empty** |
| `$p` (37) | never — the parameter went into `$param` (8) | `ParamGetText` gets nothing, returns the default `"script"` **every time** |
| `$fkReport` (11) | declared with no value | the field the header calls **MANDATORY** is never written |

🔴 **[vl_ActionType]{.field} is the worst of the three, because it is confidently wrong rather than blank.** An empty field reads as *not filled in* and someone eventually asks why. `"script"` on every single row reads as *the answer*, and it is the fallback firing on a typo — one character between `$p` and `$param`.

⭐ **The generalizable rule: a default that is also a plausible real value cannot be distinguished from a working system.** Same defect the theme resolve cascade already solved by falling back to **magenta** — a colour nothing legitimately uses, so hitting it is proof of a break rather than a guess that might be right. **A default should be conspicuous or it should be an error.** `"script"` is neither.

### 2 · 🔴 It never returns the key it created

No `Exit Script` on the success path. The log row is opened and the caller is never told which row it is, so **nothing can ever close it.** Every row this script writes is permanently `running`.

That is precisely the ambiguity J13 accepted as unavoidable for *crashes* — and this manufactures it for **normal, successful runs**, which destroys the one signal the open-with-no-close row was supposed to carry.

### 3 · Second claimant on run logging

[UTIL · Run Start](@script:script-util-run-start) was specced the same day for this exact job, and returns `logPK` because [UTIL · Run End](@script:script-util-run-end) needs it. Two scripts, one responsibility.

### 4 · Someone else's comments, again

Lines 15–16 — *"perform script to: find next, previous, first, or last, in VALUE LIST sort"* — belong to [status_index_move](@script:script-util-value-index-move) and describe nothing this script does. Third instance in four scripts. ⚠️ The dangling `Set Variable [ ]` on line 17 is the shell of whatever that note was meant to become.

### 5 · No `Get ( LastError )` after the two `Set Field` steps

Only `New Record` is checked. A `Set Field` fails on a validation rule, a lock or a missing field, and with capture on it fails quietly.

## WHAT REPLACES IT

[**UTIL · Run Start**](@script:script-util-run-start) — same job, returns `logPK`, and half of house rule 9.

⚠️ **Run Start is not yet enterable either:** its sibling [UTIL · Run End](@script:script-util-run-end) is blocked on the `UTILITY_LOGS|byLogPK` table occurrence {.gap}, which does not exist. **Log rows that cannot be closed is the same end state as this script**, arrived at from the other direction — so build the relationship before entering either.
