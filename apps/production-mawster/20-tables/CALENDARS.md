---
id: table-production-calendars
title: PRODUCTION_CALENDARS
type: reference
status: public
order: 10
revised: Aug 2026
summary: Joining entity to output.
data:
  catalog:
    file: CALENDARS.tsv
---

# PRODUCTION_CALENDARS

!!! abstract "Grain"
    One calendar per production per semester. Exceptions: the same production
    in two different time blocks.

⚠️ **Three names, and only one of them is stable.** File `CALENDARS.md` · id `table-production-calendars` · title `PRODUCTION_CALENDARS` · and the live FMP table is now **`CALENDARS`**. **The id is the stable one and must NEVER be renamed** — every `@table-production-calendars` reference in the tree resolves against it, and an id is a permanent address, not a description. 🔴 **The TITLE is what is stale**, and retitling it is a schema claim rather than a doc fix, so it is flagged for Michael and not done here. The filename already moved.

## Fields

!!! data "catalog"

🔴 **This slot pointed at `PRODUCTION_CALENDARS.tsv`, which does not exist** — corrected 2026-08-10 to `CALENDARS.tsv`. The `.tsv` was renamed with the table and the front matter was not, so **the field catalogue on this page has been rendering as a failed data slot.** A wiki-link fails loudly and visibly; a data slot pointing at a missing file just leaves a hole where a table should be, and the page still reads as finished.

- **Entity vs output.** PRODUCTIONS is the entity, so nothing about how a page looks goes there.
- `date_NeededFirst` / `date_NeededLast` are **page bounds**, not schedule facts — nothing happens on "last date needed." Legacy fed it into `CalendarDaysNeeded`, which sized the grid.
- First rehearsal + opening are read through `fkProduction`. **Never copied down** — a copy diverges silently and the symptom is a printed page quietly a week off.
- `fkSemester` is a property of the CALENDAR. Two calendars for one show means two semesters.

## HIDE is real, and it stays

`HIDE_Start` / `HIDE_End` grey a range out **entirely** — the flag stamps onto WORKDAYS and those days do not print. Legacy evidence: `Secretary INFO` sets `3/7/27 → 3/13/27`, which is spring break.

Hide is **existence**, not styling: it changes which records are in the found set. [CALENDAR_EMPHASIS](@table-calendar-emphasis) only styles records already there.

⚠️ **Superseded in part, 2026-08-09:** `bool_HideFromCalendar` on WORKDAYS was ruled illegal on a canonical date table — hiding is ONE calendar's decision about a date, so left there, one show hides a week for every show sharing it. The hide row moves to `CALENDAR_HIGHLIGHT`. 🔴 **And it must BLANK THE CELL, never remove the record**: a flowed found set shifts every subsequent day one column left.

## 🔴 The grid moved to the PRINT layer (2026-08-08, Michael)

**Week start is a PRINT spec, not a calendar fact.** `date_CalendarStart` and `bool_StartOnMonday` are gone from this table.

- **`WeekStartDay` (1–7) lives on the export preset**, snapshotted onto the export session.
- 🪦 **The boolean is dead.** It cannot express **Tuesday**, which is the actual answer — a theatre week runs Tue→Mon because Monday is the dark day. Sunday-or-Monday was never the real domain, and the legacy `startOnMon` (a TEXT field compared against `= 1`) was wrong twice over.
- `date_CalendarStart` is derived: the `WeekStartDay` falling on or before `PRODUCTIONS::DateFirstRehearsal`.

⚠️ **The consequence is structural: WEEKS and WORKDAYS are DISPOSABLE.** The same calendar rendered Tue-start vs Sun-start produces different week rows, so the grid cannot be generated once and reused. It is rebuilt per print, exactly like `EVENTS_workday`.

🔒 **The projection is never hand-edited** — see [projection-law.md](@projection-law). Rebuild is therefore a dumb delete-and-regenerate with no preservation pass.

## The three-layer table is NOT here

It lives on [the app index](@production-mawster). **This page carried its own copy until 2026-08-10 and the copy had gone stale** — it listed `PRINT_SESSIONS` under Archive with no export preset beside it, and omitted `STYLES` from Canonical entirely.

⭐ **Two surfaces stating one model is the dueling-canonical defect, and the duplicate is always the one that rots** — this repo has retired three manifests over exactly that shape. A table page is the wrong home for a whole-app classification: it is read when someone wants THIS table, so nobody re-checks the part that is about the other fifteen.

## What is NOT here

- **Highlight / lowlight ranges** → [CALENDAR_EMPHASIS](@table-calendar-emphasis)
- **Watermark** → the export session (it belongs to a run)
- **Export settings + week start** → the export preset

⚠️ **The print → export rename is only half-applied across this tree** {.tbc}. Prose references above were updated to say *export preset* / *export session*; **the `@table-print-presets` and `@table-print-sessions` link ids elsewhere have NOT been verified to still resolve.** Named rather than assumed — see the app index.
