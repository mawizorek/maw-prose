---
id: scripts
title: Scripts
type: index
status: public
order: 70
nav: collapsed
revised: 2026-08
summary: The app's own script index. Eleven scripts live in the file, four of them retired on sight.
---

# Scripts

~~⚠️ **This folder owns the `scripts` id.** The legacy paste under `90-file-imports-temp/` claimed it too — **links to a duplicated id are a coin flip**, and a scratch import beating the app's own folder to a name is the wrong winner. Fix on that side is a one-line front-matter edit to `legacy-scripts-01`.~~

🔴 **STRUCK 2026-08-10: the collision was resolved on 08-08 and this warning outlived it by two days.** Verified by search — **exactly one page in the repo carries `id: scripts`, and it is this one.** The legacy paste has read `id: legacy-scripts-paste-1` with `status: hidden` since the 08-08 fix, and its own body documents the change.

⚠️ **Two things worth keeping from the failure rather than just deleting the line.** The warning named the id as `legacy-scripts-01`, which **has never existed** — so following it would have sent a reader hunting a page that is not there. And it was **carried forward verbatim through two full rewrites of this file (PR #72 and #78) without being checked**, by an author who spent the same session documenting *the comments are the spec and the fields are the build*. **A warning is the easiest thing in a document to copy and the last thing anybody re-tests**, because it reads as diligence.

## 🔴 The ruling: ONE taxonomy, and the name prefix is it

The file currently has two filing systems running at once. Six folders (`00_APP`, `File OPERATIONS`, `80-GOTO`, `90-UTILITY`, `LOGS`, `SHOW & HIDE`) and, separately, name prefixes that do not match them.

**The prefix wins, and folders mirror it 1:1.** The prefix is what survives into a DDR, a `Perform Script` picker, an export and a version of FileMaker with no folders; a folder is a view. **Two filing systems means one of them is always the stale one, and nothing tells you which.**

The consequence is small and worth stating: **`LOGS`, `SHOW & HIDE` and `File OPERATIONS` go away.** They are topic folders, and topics cut across prefixes — `SHOW & HIDE` holds a `FIND ·`, `LOGS` holds a `UTIL ·`, `File OPERATIONS` holds a `FILE ·`. Each one is a third axis that will eventually disagree with both of the others.

```
00 FILE      FILE · Open · FILE · Close · FILE · Save Backup
10 GOTO      GOTO · Utility Logs · GOTO · Values
20 FIND      FIND · Values · FIND · All Or None
30 SHOW      (empty)
40 BUILD     (empty)
50 EXPORT    (empty)
90 UTIL      UTIL · Run Start · UTIL · Run End · UTIL · Value Index Move
_TEMPLATE    _TEMPLATE · New Script
```

⚠️ **Empty folders are deliberate.** They are the build order, visible every time the script workspace is opened. A folder created the day it is first needed gets named on the fly and is how the second taxonomy started.

## Rename map — 2026-08-09

The left column is the **retired name**, marked and pointed at the live one, so paperwork or a comment quoting the old name still lands. The right column is the live script.

| Retired name | Becomes | |
|---|---|---|
| [00App__onLastWindowClose](@alias:script-file-close) | [FILE · Close](@script:script-file-close) | 🔴 rewrite, see the veto trap |
| [save zBACKUP \| File](@alias:script-file-save-backup) | [FILE · Save Backup](@script:script-file-save-backup) | 🔴 moves to the OPEN path |
| [goto_view_UTILITY_LOGS](@alias:script-goto) | [GOTO · Utility Logs](@script:script-goto) | 🔴 two scripts share this name |
| [goto_view_VALUES](@alias:script-goto) | [GOTO · Values](@script:script-goto) | |
| `goto_view_APP_SESSIONS` | ⬜ blocked | on the `APP_SESSIONS` fork below |
| [Show ALL or NONE](@alias:script-find-all-or-none) | [FIND · All Or None](@script:script-find-all-or-none) | |
| [status_index_move](@alias:script-util-value-index-move) | [UTIL · Value Index Move](@script:script-util-value-index-move) | splits into two |
| [trigger_App_Open](@script:retired-trigger-app-open) | 🪦 retired | |
| [App_Startup](@script:retired-app-startup) | 🪦 retired | |
| [new_UTILITY_LOG](@script:retired-new-utility-log) | 🪦 retired | |
| [exit w/ errors](@script:retired-exit-w-errors) | 🪦 retired | 🔴 the idea does not work |

⭐ **The four retired rows take `@script:` and NOT `@alias:`, and the distinction is the useful one.** An alias says *this name now means that thing*. A retirement says *this name means nothing and here is why*. Aliasing a dead script to a live one would quietly assert a replacement that, in the case of [exit w/ errors]{.alias}, does not exist.

🔴 **Nothing in this table is a delete instruction.** Renaming is safe; deleting breaks every caller silently. Order: archive → find the callers → repoint → then delete. The [retired index](@scripts-retired) has the procedure.

## Specced and ready to enter

- [UTIL · Run Start](@script:script-util-run-start) — opens the [UTILITY_LOGS]{.rel} row, returns its key.
- [UTIL · Run End](@script:script-util-run-end) — closes it, through a relationship rather than a find. ⚠️ Blocked on the `UTILITY_LOGS|byLogPK` {.gap} table occurrence.
- [FILE · Open](@script:script-file-open) — mints the session token, logs the open, then the setup work. ⬜ Blocked on the `APP_SESSIONS` fork.
- [FILE · Close](@script:script-file-close) — 🔴 the one script that must not return JSON.
- [FILE · Save Backup](@script:script-file-save-backup) — timestamped copy into `zBACKUPS/`.
- [GOTO · family](@script:script-goto) · [FIND · All Or None](@script:script-find-all-or-none) · [UTIL · Value Index Move](@script:script-util-value-index-move)

**Every one of them depends on [custom functions](@custom-functions)** — the canonical JSON parameter family, which must be installed here first {.gap}, plus [ErrJSON](@cf-errjson) for the failure payload. ⚠️ `Param` needs FileMaker 19.6 [unverified in this file]{.tbc}.

⬜ **Named gaps:** `UTIL · Sweep Abandoned Runs` {.gap}. The first real `SHOW ·` {.gap}. ✅ *`ErrJSON` was written 2026-08-10 and is no longer a gap — see [its page](@cf-errjson), which also records that the canonical family explicitly forbids that shape and why it is app-level anyway.*

## 🔴 Open forks — Michael's, not mine

**1 · `APP_SESSIONS` is a second claimant on [UTILITY_LOGS]{.rel}.** J13 ruled one table, two grains, separated by [vl_Kind]{.vl}. A separate sessions table is that ruling reversed without the reversal being written down. **Either the table goes or J13 does.** [FILE · Open](@script:script-file-open) cannot be entered until this is settled, because it does not know where to write. Full argument on the [trigger_App_Open](@script:retired-trigger-app-open) page.

**2 · Three claimants on the open handler** — [00App_onFirstWindowOpen]{.script} {.verify}, [trigger_App_Open](@script:retired-trigger-app-open), [App_Startup](@script:retired-app-startup). Only one can be set in File Options and nothing records which won.

**3 · `view_` vs `util_` vs bare table occurrences.** The unpicked naming fork, now showing up in scripts as well as in the relationship plan. **Pick it before the graph binds it.**

## ⬜ Not yet read

Three scripts in the `00_APP` folder have been seen by name only: [00App_onFirstWindowOpen]{.script} {.tbc}, [00App_Mark_Setup_Complete]{.script} {.tbc}, [00App_Set_Setup_State]{.script} {.tbc}. No spec is written for them and none should be — **a rewrite of a body nobody has read is fiction.** The last two imply a setup-state machine that appears in no table doc, so they may be pointing at a real gap.

## 🚩 Flagged for deletion, not deleted

`70-scripts/90-Utlity/` — folder name misspelled, and both files in it were **zero bytes**. They are placeholders for two scripts now documented properly or retired. Flagged in place per the Deletion-Flag Gate: the folder carries `DELETE-ME-*.md` files naming the keeper and the reason. ⚠️ An empty named container is the most attractive place in a tree for the next unrelated file; same mechanism that grew legacy `SETUP` to 20 fields. **Michael deletes the folder.**

## What the legacy review says to PORT

From [[legacy script review](@legacy-script-review)], the four worth carrying:

- [CREATE PRODUCTION WORKDAYS]{.script} — the generator. Two loops, then sort by date → stamp sequential sort → re-sort by it. ⚠️ Kill the magic `+ 10` on the pre-pro exit condition.
- [showRelevantDates]{.script} — find hidden → **Show Omitted Only** → constrain by date. The found-set trick that makes hide-as-existence work.
- [EXPORT Calendar Set]{.script} — the filename builder. ⚠️ Its four-output hardcoded sequence is now DATA: [[PRINT_SETS](@table-print-sets)].
- [PRINT_SETUP]{.script} pair — parameter `1` = landscape, else portrait. Clean.

🚫 **And what dies:** delete-and-replace on import · the CSV header-row delete · portal-geometry date math · the six colour scripts · the FCCalendar addon.

⚠️ **The raw legacy paste is six overlapping files split by SIZE, not by folder** — `90-file-imports-temp/prevProductionCalendarApp/scripts/index copy 1..6.md`, all `status: hidden`. **Read the review, never the paste.** Part 1 is the script hierarchy and is the only one worth opening directly.

## House rule for anything written here

🔴 `Set Error Capture [On]` plus a `Get(LastError)` check after **every** write — **branching on the code, not on `≠ 0`**, because 401 after a find is an answer and not a failure. A swallowed error means the caller believes a write landed; an invented one means an empty list reads as a crash. Legacy had scripts that failed silently and one that shipped with a live debug dialog.
