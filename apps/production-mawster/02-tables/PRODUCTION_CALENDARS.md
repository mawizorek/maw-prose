---
id: table-production-calendars
title: PRODUCTION_CALENDARS
type: reference
status: public
order: 10
revised: Aug 2026
summary: Joining entity to output.
---

# PRODUCTION_CALENDARS

!!! abstract "Grain"
    One calendar per production per semester. Exceptions: the same production
    in two different time blocks.

- **Entity vs output.** PRODUCTIONS is the entity, so nothing about how a page looks goes there.
- Reprinting a show with different callouts = new [CALENDAR_EMPHASIS](@table-calendar-emphasis) rows, or a different [PRINT_PRESET](@table-print-presets). Not a second calendar.
- WEEKS hangs off THIS table, not PRODUCTIONS. Week 1 is only meaningful relative to a calendar's start.
- ⚠️ `StartOnMonday` is a real boolean. Legacy `startOnMon` was TEXT compared against `= 1`, so typing "Yes" silently flipped the week.

## The page bounds live here

`DateNeededFirst` / `DateNeededLast` are **page dimensions**, not schedule facts — nothing happens on "last date needed." The legacy file fed it straight into `CalendarDaysNeeded`, which sized the grid. Two calendars for one show need different bounds and share one first rehearsal, which is the proof.

⚠️ **`Calendar_START` is UNSTORED, across the relationship** (`PRODUCTIONS::DateFirstRehearsal`). Unstored means unindexable, and WEEKS generation depends on it — acceptable because it runs once per calendar build, not per cell. **This is exactly the cost that tempts someone to copy the date down. Do not.**

## What is NOT here

- 🔴 **First rehearsal + opening belong to PRODUCTIONS** and are read through `fkProduction`. A copy here would diverge silently: both dates valid, both render, symptom is a printed page quietly a week off.
- 🔴 **Highlight / lowlight ranges MOVED to [CALENDAR_EMPHASIS](@table-calendar-emphasis)** (N typed rows, priority-resolved). Six fixed fields could not answer "what if there are multiple ranges, called out different ways."
- **HIDE stayed.** Hide is existence, not styling: it changes which records are in the found set, so it stamps `HideFromCalendar` on WORKDAYS at generation. Emphasis resolves live. Different verb, different mechanism, on purpose.
- **Watermark** moved to PRINT_SESSIONS — it belongs to a print run, not a calendar.
- **Export settings** moved to PRINT_PRESETS.

## Fields

See [PRODUCTION_CALENDARS.tsv](./PRODUCTION_CALENDARS.tsv).
