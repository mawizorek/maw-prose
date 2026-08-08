---
id: workflow
title: Build & Use Workflow
type: reference
status: public
order: 15
revised: 2026-08
summary: Manual input comes first. Import skins on top and never authors.
---

# Workflow

## 🔴 Manual input comes FIRST, and it has to

**First rehearsal cannot be derived from imported events.** The dependency runs one way:

```
date_FirstRehearsal  →  calendar start  →  WEEKS  →  WORKDAYS  →  events land on days
```

Derive the date from events and you have a circle: events need workdays to land on, workdays need weeks, weeks need a start, the start needs the date. So it is typed, and it is typed before any import runs.

## Order of operations

| # | Step | Where | Typed or generated |
|---|---|---|---|
| 1 | Create the production. Type `date_FirstRehearsal` + `date_Opening`. Set `cuProductionToken`. | [[PRODUCTIONS](@table-productions)] | typed |
| 2 | Create the calendar. Type the page bounds, set `bool_AddPreProWeek`. | [[PRODUCTION_CALENDARS](@table-production-calendars)] | typed |
| 3 | Generate the grid. | [[WEEKS](@table-weeks)] → [[WORKDAYS](@table-workdays)] | generated, never typed |
| 4 | Add callouts. Tech week, breaks, residencies. | [[CALENDAR_EMPHASIS](@table-calendar-emphasis)] | typed |
| 5 | **Import.** Events land on days that already exist. | [[import_SESSIONS](@table-import-sessions)] → [[import_EVENTS](@table-import-events)] → [[EVENTS](@table-events)] | imported |
| 6 | Print. | [[PRINT_SETS](@table-print-sets)] → [[PRINT_SESSIONS](@table-print-sessions)] | generated |

Steps 1–4 are a working app with zero imports. That is deliberate: a calendar with a grid and no events is still printable, and it is how you find a wrong start date before 121 event records are sitting on it.

⚠️ **The grid is rebuilt per print, not built once.** `WeekStartDay` lives on the preset, so a Tue-start and a Sun-start render different week rows from the same calendar. See [[Projection Law](@projection-law)].

## Import SKINS, it never AUTHORS

The import layer may **only**:

- create/update [[EVENTS](@table-events)] (upsert on `TaskID` + `fkProduction`)
- resolve `fkStyle` from the raw ClickUp status token
- resolve `fkStandardEvent` via the crosswalk
- rebuild [[EVENTS_workday](@table-events-workday)] as the last step

It may **never** write first rehearsal, opening, page bounds, or emphasis rows. Those are human decisions.

### The one thing it does check

⭐ **If the earliest event of canonical type "First Rehearsal" does not match the typed `date_FirstRehearsal`, FLAG it. Never correct it.**

Same guard shape as the production token: the import surfaces a disagreement instead of silently resolving one. This is what stops a date typed in June from quietly contradicting a schedule that moved in August — the failure mode being defended against is a printed page that is a week off with no symptom.

### Anchored emphasis needs events

`event`-mode [[CALENDAR_EMPHASIS](@table-calendar-emphasis)] rows resolve through events, so they render as nothing until the first import lands. `MatchCount = 0` is the tell. That is correct behaviour, not a bug — and it is why `range` mode exists for anything that must print pre-import.
