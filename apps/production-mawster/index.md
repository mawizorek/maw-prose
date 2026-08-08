---
id: production-mawster
title: Production MAWster
theme: database
type: index
status: public
order: 0
nav: collapsed
revised: 2026-08
summary: Production lens.
---

# Production MAWster

The production calendar + contacts app. **ClickUp AUTHORS, this app RENDERS.**

Rebuilt from scratch because the previous file ([[ProductionCalendarFormat](@legacy-script-review)]{.conf}) holds exactly **one production at a time** — `SETUP` was 20 fields, 1 record, almost entirely global storage.

## Three layers

| Layer | Tables | Rule |
|---|---|---|
| **Canonical** | [[PRODUCTIONS](@table-productions)] · [[PRODUCTION_CALENDARS](@table-production-calendars)] · [[EVENTS](@table-events)] · [[CALENDAR_EMPHASIS](@table-calendar-emphasis)] · [[ROLES](@table-roles)] · [[ASSIGNMENTS](@table-assignments)] · [[LOCATIONS](@table-locations)] · [[PRODUCERS](@table-producers)] · [[STYLES](@table-styles)] | typed, edited, holds identity |
| **Projection** | [[WEEKS](@table-weeks)] · [[WORKDAYS](@table-workdays)] · [[EVENTS_workday](@table-events-workday)]{.tbc} | generated, disposable, **never edited** — see [[Projection Law](@projection-law)] |
| **Archive** | [[import_EVENTS](@table-import-events)] · [[import_SESSIONS](@table-import-sessions)] · [[PRINT_PRESETS](@table-print-presets)] · [[PRINT_SESSIONS](@table-print-sessions)] | append-only, never trashed |

## Start here

- [[Tables](@tables)] — the schema
- [[Build & Use Workflow](@workflow)] — order of operations, manual-first
- [[ClickUp Integration](@integration)] — the pipe and its open questions
- [[Projection Law](@projection-law)] — why nothing in the projection layer is hand-edited
- [[Data standards](@data-standards)]{.conf} — naming conventions

Decision history: **Production MAWster FMP — Decision Log** (ClickUp).
