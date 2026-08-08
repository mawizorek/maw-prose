---
id: table-weeks
title: Weeks
type: reference
status: public
order: 10
revised: 2026-08
summary: One printed week row. Parent is the CALENDAR, not the production.
---

# Weeks

!!! abstract "Grain"
    One week of the printed grid, inside one calendar.

- **Parent is the CALENDAR.** Week 1 is only meaningful relative to a calendar's start date.
- `PAGE_BREAK` is a print concern, which is the tell that WEEKS belongs to the projection layer rather than to the schedule.
- ⚠️ **DISPOSABLE.** `WeekStartDay` lives on the preset, so the same calendar rendered Tue-start and Sun-start produces different week rows. The grid is rebuilt per print — see [[Projection Law](@projection-law)].
- Generated, never typed. Seven [[WORKDAYS](@table-workdays)] per week.

## Fields

See [WEEKS.tsv](./WEEKS.tsv).
