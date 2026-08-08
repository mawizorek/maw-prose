---
id: production-mawster
title: Production MAWster
theme: database
type: index
status: public
order: 0
nav: collapsed
revised: 2026-08
summary: The production calendar + contacts app. ClickUp AUTHORS, this app RENDERS.
---

# Production MAWster

## Three layers

| Layer | Tables | Rule |
|---|---|---|
| **Canonical** | [[PRODUCTIONS](@table-productions)] · [[PRODUCTION_CALENDARS](@table-production-calendars)] · [[EVENTS](@table-events)] · [[STANDARD_EVENTS](@table-standard-events)] · [[CALENDAR_EMPHASIS](@table-calendar-emphasis)] · [[ROLES](@table-roles)] · [[ASSIGNMENTS](@table-assignments)] · [[LOCATIONS](@table-locations)] · [[PRODUCERS](@table-producers)] · [[STYLES](@table-styles)] | typed, edited, holds identity |
| **Projection** | [[WEEKS](@table-weeks)] · [[WORKDAYS](@table-workdays)] · [[EVENTS_workday](@table-events-workday)] | generated, disposable, **never edited** — see [[Projection Law](@projection-law)] |
| **Archive** | [[import_EVENTS](@table-import-events)] · [[import_SESSIONS](@table-import-sessions)] · [[PRINT_SETS](@table-print-sets)] · [[PRINT_SESSIONS](@table-print-sessions)] | append-only, never trashed |

Rebuilt from scratch because the previous file holds exactly **one production at a time** — `SETUP` was 20 fields, 1 record, almost entirely global storage, with six hardcoded scripts swapping the globals per show. Legacy pass: [[Legacy Script Review](@legacy-script-review)].

## Start here

- [[Tables](@tables)] — the schema
- [[Build & Use Workflow](@workflow)] — order of operations, manual-first
- [[ClickUp Integration](@integration)] — the pipe and its open questions
- [[Projection Law](@projection-law)] — why nothing in the projection layer is hand-edited
- [[Data standards](@data-standards)] — naming conventions

Decision history: **Production MAWster FMP — Decision Log** (ClickUp).
