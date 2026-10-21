---
id: retired-trigger-app-open
title: trigger_App_Open (RETIRED)
type: reference
status: public
order: 791
revised: 2026-08
summary: Writes the session row to APP_SESSIONS, which is a second claimant on UTILITY_LOGS.
---

# trigger_App_Open — RETIRED 2026-08-09

!!! warning "The script is the closest to correct of the four, and it is retired for a schema reason, not a scripting one"
    Read the second-claimant section before deleting anything, because the fix is a table decision Michael has to make first.

## VERBATIM

Transcribed from the FileMaker script workspace, 2026-08-09 ~21:45 ET. Clipped lines are marked; nothing is reconstructed.

```
# ---

# ---
Set Error Capture [ On ]
Allow User Abort [ Off ]

Perform Script [ Specified: From list ; "goto view APP SESSIONS" ; Parameter:   ]
Perform Script [ Specified: From list ; "Show ALL or NONE" ; Parameter:
Param ( List ( PText ( "mode" : "All" ): 1 ) ) ]

New Record/Request
Set Field [ view APP SESSIONS::StartTimestamp ; Get ( CurrentTimestamp ) ]
Set Variable [ $$SESSION.token ]
```

Calls [goto_view_APP_SESSIONS](@alias:script-goto) and [Show ALL or NONE](@alias:script-find-all-or-none). Writes [APP_SESSIONS::StartTimestamp]{.field}, sets [$$SESSION.token]{.global}.

## WHY IT DIED

### 1 · 🔴 `APP_SESSIONS` is a second claimant on [UTILITY_LOGS]{.rel}

This is the real reason, and it is a schema question wearing a script.

**J13 ruled one table with two grains**, separated by [vl_Kind]{.vl} and bound by [SessionToken]{.field}: a file session and a script run both start, both end, both succeed or do not, and both want the same nine columns. The ruling was explicit that splitting them *"would duplicate every field to gain a distinction one indexed value already makes, and would turn what happened during this session into a join instead of a sort."*

**`APP_SESSIONS` is that split, built anyway.** Two tables now claim the session row, and [UTILITY_LOGS::fkSessionToken]{.field} — the field that binds every script run to its session — points at whichever one wins.

⬜ **Michael's call, and it is not mine to make** {.gap}. Either `APP_SESSIONS` dies and [vl_Kind]{.vl} carries it, or J13 is reversed in writing and [UTILITY_LOGS]{.rel} sheds its session grain. **Both are defensible. Having both tables is not.** Until it is settled, [FILE · Open](@script:script-file-open) cannot be entered, because it does not know which table to write to.

### 2 · 🔴 The session token is minted after the row is written

`Set Variable [ $$SESSION.token ]` is the **last** step, three lines after the record is created. So the row exists without its token, and if anything between them errors, the session row is orphaned — present, timestamped, and unjoinable to any of the script runs that follow it.

**Mint the token first, then write the row.** In [FILE · Open](@script:script-file-open) `Get ( UUID )` is line one of the body for exactly this reason: it cannot fail, so nothing can happen between minting and using it.

### 3 · `New Record/Request` with no `Get ( LastError )` check

House rule 2. `Set Error Capture [ On ]` is on line 4, so a failed create is silent, and the two `Set Field` steps that follow then write into **whatever record the user happened to be on.** ⚠️ That is worse than a failure: it is a silent edit to real data.

### 4 · [Show ALL or NONE](@alias:script-find-all-or-none) on the way in does nothing useful

Showing every session row before creating a new one has no effect on the create and costs a full found-set fetch at open, which grows forever. ⚠️ And `Show All Records` implicitly commits (house rule 7), so it can never sit inside a transaction later.

### 5 · Third claimant on the open handler

With [00App_onFirstWindowOpen]{.script} {.tbc} and [App_Startup](@script:retired-app-startup). See that page — the same defect is written up there.

## WHAT REPLACES IT

[**FILE · Open**](@script:script-file-open), once the `APP_SESSIONS` fork above is settled.

⭐ **What this script got right, and the rewrite keeps:** it calls a [GOTO ·](@script:script-goto) rather than typing `Go to Layout` inline, and it uses a JSON parameter on a script that only needed one value. Both were house rules before the house rules were written down.
