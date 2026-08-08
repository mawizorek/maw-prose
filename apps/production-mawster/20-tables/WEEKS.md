---
id: table-weeks
title: Weeks
type: reference
status: public
order: 10
revised: 2026-08
summary: One printed week row. Parent is the calendar, not the production.
---

# Weeks

!!! abstract "Grain"
    One week of the printed grid. Seven WORKDAYS hang off it.

- **Parent is the CALENDAR.** Week 1 is only meaningful relative to a calendar's start.
- `Week_START_DATE` falls on the preset's `WeekStartDay` (1–7). ⚠️ **Not a Sunday/Monday boolean** — a theatre week runs Tue→Mon because Monday is the dark day.
- `PAGE_BREAK` is a print concern, which is the tell that this table belongs to the print layer.
- 🔴 **DISPOSABLE.** The same calendar rendered Tue-start vs Sun-start produces different week rows, so the grid cannot be generated once and reused. Rebuilt per print, never hand-edited — see [[Projection Law](@projection-law)].

## Fields

See [WEEKS.tsv](./WEEKS.tsv).
