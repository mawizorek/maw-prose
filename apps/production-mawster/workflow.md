---
id: workflow
title: Build & Use Workflow
type: reference
status: public
order: 15
nav: collapsed
summary: Manual first, import skins on top.
---

# Workflow

## 🔴 Manual input comes FIRST, and it has to

**First rehearsal cannot be derived from imported events.** The dependency runs one way:

```
DateFirstRehearsal  →  Calendar_START  →  WEEKS  →  WORKDAYS  →  events land on days
```

Derive the date from EVENTS and you have a circle: events need workdays to land on, workdays need weeks, weeks need a start, the start needs the date. So it is typed, and it is typed before any import runs.

## Order of operations

| # | Step | Where | Typed or generated |
|---|---|---|---|
| 1 | Create the production. Type `DateFirstRehearsal` + `DateOpening`. Set `CU_ProductionToken`. | PRODUCTIONS | typed |
| 2 | Create the calendar. Type `DateNeededFirst` / `DateNeededLast`, set `StartOnMonday`, `AddPreProWeek`. | PRODUCTION_CALENDARS | typed |
| 3 | Generate the grid. | WEEKS → WORKDAYS | generated, never typed |
| 4 | Add callouts. Tech week, breaks, residencies. | CALENDAR_EMPHASIS | typed |
| 5 | **Import.** Events land on days that already exist. | import_SESSIONS → import_EVENTS → EVENTS | imported |
| 6 | Print. | PRINT_PRESETS → PRINT_SESSIONS | generated |

Steps 1–4 are a working app with zero imports. That is deliberate: a calendar with a grid and no events is still printable, and it is how you find a wrong start date before 121 event records are sitting on it.

## Import SKINS, it never AUTHORS

The import layer may **only**:

- create/update EVENTS (upsert on `TaskID` + `fkProduction`)
- stamp `fkWorkday` from the event's date
- resolve `fkStyle` from the raw CU status token
- resolve `fkStandardEvent` via the crosswalk

It may **never** write `DateFirstRehearsal`, `DateOpening`, page bounds, or emphasis rows. Those are human decisions.

### The one thing it does check

⭐ **If the earliest event of canonical type "First Rehearsal" does not match the typed `DateFirstRehearsal`, FLAG it. Never correct it.**

Same guard shape as the production token: the import surfaces a disagreement instead of silently resolving one. This is what stops a date typed in June from quietly contradicting a schedule that moved in August — the failure mode being defended against is a printed page that is a week off with no symptom.

### Anchored emphasis needs events

`event`-mode CALENDAR_EMPHASIS rows resolve through EVENTS, so they render as nothing until the first import lands. `MatchCount = 0` is the tell. That is correct behaviour, not a bug — and it is why `range` mode exists for anything that must print pre-import.
