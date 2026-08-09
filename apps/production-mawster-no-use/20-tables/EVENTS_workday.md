---
id: table-events-workday
title: EVENTS_workday
type: reference
status: public
order: 10
revised: 2026-08
summary: One row per event per day. A projection, rebuilt at import, never edited.
---

# EVENTS_workday

!!! abstract "Grain"
    One event on one workday. A five-day load-in is five rows.

## Why it exists — and it is NOT a performance hedge

It was first offered as an escape hatch in case the range join proved slow. **Michael found the real reason:** a list view repeats **per RECORD**, so a one-row span cannot produce three agenda lines, and a WORKDAYS portal is fixed-height. **The agenda REQUIRES this table.**

The split that keeps it safe:

| Table | Holds | Layer |
|---|---|---|
| [[EVENTS](@table-events)] | **IDENTITY** — the upsert key, history, change counts | canonical |
| `EVENTS_workday` | a **PROJECTION** for reports | disposable |

Both agenda shapes then come free: base a report HERE for one line per day, base it on EVENTS for one line with a date range.

## When it is built

**At import, as the LAST step.** Never at print.

- Printing must not be a write. A read-only report that mutates data cannot run on a locked file, cannot run twice safely, and turns "reprint that PDF" into a schema operation.
- Rebuild triggers: an import lands · the grid regenerates (page bounds or `WeekStartDay` moved) · on demand.
- Full delete-and-rebuild for the calendar in scope. Safe precisely because it holds no identity, nothing points at it, and nothing is lost. See [[Projection Law](@projection-law)].

## ⭐ It SKIPS hidden days

A span crossing a hidden range (spring break) gets no rows for those days. Two things fall out of that:

- **Beckett's continuous-span problem solves itself** on the agenda — the gap is real because the rows are absent, rather than a span silently reading as unbroken.
- `DayIndex` / `DayCount` count **working** days, so "day 2 of 3" reads the way a person would say it.

## Fields

See [EVENTS_workday.tsv](./EVENTS_workday.tsv).
