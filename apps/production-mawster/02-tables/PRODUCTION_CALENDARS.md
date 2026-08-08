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
- `date_NeededFirst` / `date_NeededLast` are **page bounds**, not schedule facts — nothing happens on "last date needed." Legacy fed it into `CalendarDaysNeeded`, which sized the grid.
- First rehearsal + opening are read through `fkProduction`. **Never copied down** — a copy diverges silently and the symptom is a printed page quietly a week off.
- `fkSemester` is a property of the CALENDAR. Two calendars for one show means two semesters.

## HIDE is real, and it stays

`HIDE_Start` / `HIDE_End` grey a range out **entirely** — the flag stamps onto WORKDAYS and those days do not print. Legacy evidence: `Secretary INFO` sets `3/7/27 → 3/13/27`, which is spring break. That is what they are for.

Hide is **existence**, not styling: it changes which records are in the found set. CALENDAR_EMPHASIS only styles records already there.

## 🔴 The grid moved to the PRINT layer (2026-08-08, Michael)

**Week start is a PRINT spec, not a calendar fact.** `date_CalendarStart` and the old `bool_StartOnMonday` are gone from this table:

- **`WeekStartDay` (1–7) lives on PRINT_PRESETS**, snapshotted onto PRINT_SESSIONS.
- 🪦 **The boolean is dead.** `bool_StartOnMonday` cannot express **Tuesday**, which is the actual answer — a theatre week runs Tue→Mon because Monday is the dark day. Sunday/Monday was never the real domain.
- `date_CalendarStart` is derived: the `WeekStartDay` on or before `PRODUCTIONS::DateFirstRehearsal`.

⚠️ **The consequence, and it is structural: WEEKS and WORKDAYS are now DISPOSABLE.** The same grid re-rendered Tue-start vs Sun-start produces different week rows, so the grid cannot be generated once and reused — it is rebuilt per print, exactly like `EVENTS_workday`.

That is coherent, and it sharpens the whole model:

| Layer | Tables | Rule |
|---|---|---|
| **Canonical** | PRODUCTIONS · PRODUCTION_CALENDARS · EVENTS · CALENDAR_EMPHASIS · ROLES · ASSIGNMENTS | typed, edited, holds identity |
| **Projection** | WEEKS · WORKDAYS · EVENTS_workday | generated, disposable, rebuilt, never the source of truth |
| **Archive** | import_EVENTS · import_SESSIONS · PRINT_SESSIONS | append-only, never trashed |

⚠️ **Watch item:** a spot edit on `EVENTS_workday` is wiped by a grid rebuild, and now a preset change triggers a rebuild too. The `ManualEdit` flag has to survive both.

## What is NOT here

- **Highlight / lowlight ranges** → [CALENDAR_EMPHASIS](@table-calendar-emphasis)
- **Watermark** → PRINT_SESSIONS (it belongs to a run)
- **Export settings + week start** → PRINT_PRESETS

## Fields

See [PRODUCTION_CALENDARS.tsv](./PRODUCTION_CALENDARS.tsv).
