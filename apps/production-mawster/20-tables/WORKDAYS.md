---
id: table-workdays
title: Workdays
type: reference
status: public
order: 10
revised: Aug 2026
summary: The calendar grid cell.
---

# Workdays

!!! abstract "Grain"
    One date inside one calendar's week. The printed cell.

- Generated, never typed. WEEKS x 7.
- `Highlight` / `Lowlight` / `Hide` are **flags stamped at generation** from the parent calendar's date ranges. The ranges live on PRODUCTION_CALENDARS; the flags live here so the layout reads one field per cell.
- Month colour resolves through STYLES on **`MonthNum`**, never a 3-letter name. The old file joined on a display abbreviation.
- ⚠️ Legacy table was `Prodution WORKDAYS` — misspelled, with a space. Do not inherit either.
- ⬜ Crew calls may become a sibling of EVENTS, not a field here. Do not close this as the only day surface.

## Fields

See [WORKDAYS.tsv](./WORKDAYS.tsv).
