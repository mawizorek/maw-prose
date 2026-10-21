---
id: production-mawster
title: Production MAWster
theme: database
type: index
status: public
routrer: [PM]
order: 9999
nav: collapsed
revised: 2026-08
summary: The production calendar + contacts app. ClickUp AUTHORS, this app RENDERS.
---

# Production MAWster

!!! danger "Next session opens ONE page"
    [[Print-first Runbook](@print-first-runbook)] — the print path is fully designed and was entirely unbuilt as of 08-09, and every session since 08-08 built the layer that FEEDS the calendar instead of the calendar. The runbook inverts that order and ends in a PDF. ⚠️ **The counts this callout used to quote (36 tables / 0 relationships / 0 layouts) are STALE** — the 2026-08-15 DDR reports **37 tables · 15 relationships · 54 layouts · 10 custom functions**, and scripts exist. Re-read a DDR before quoting any structural number.

## Why it was rebuilt

The previous file held exactly **one production at a time** — `SETUP` was 20 fields, 1 record, almost entirely global storage, with six hardcoded scripts swapping those globals per show. Full pass: [[legacy script review](@legacy-script-review)].

## Three layers

| Layer | Tables | Rule |
|---|---|---|
| **Canonical** | [[PRODUCTIONS](@table-productions)] · [[PRODUCTION_CALENDARS](@table-production-calendars)] · [[EVENTS](@table-events)] · [[CALENDAR_EMPHASIS](@table-calendar-emphasis)] · [[ROLES](@table-roles)] · [[ASSIGNMENTS](@table-assignments)] · [[LOCATIONS](@table-locations)] · [[PRODUCERS](@table-producers)] · [[STYLES](@table-styles)] | typed, edited, holds identity |
| **Projection** | [[WEEKS](@table-weeks)] · [[WORKDAYS](@table-workdays)] · [[EVENTS_workday](@table-events-workday)]{.tbc} | generated, disposable, **never edited** — see [[Projection Law](@projection-law)] |
| **Archive** | [[import_EVENTS](@table-import-events)] · [[import_SESSIONS](@table-import-sessions)] · [[PRINT_PRESETS](@table-print-presets)] · [[PRINT_SESSIONS](@table-print-sessions)] | append-only, never trashed |

## Start here

- [[Print-first Runbook](@print-first-runbook)] — **the current build order.** Import, WORKDAYS, WEEKS anchor, PDF
- [[Tables](@tables)] — the schema
- [[UX](@user-experience)] — how the app is meant to be used
- [[Build & Use Workflow](@workflow)] — order of operations, manual-first
- [[ClickUp Integration](@integration)] — the pipe and its open questions
- [[Device Handoff](@device-handoff)] — desktop, iPad and phone, and the open-log
- [[Print & iPad Geometry](@print-geometry)] — letter geometry, and where one layout stops serving both
- [[Projection Law](@projection-law)] — why nothing in the projection layer is hand-edited

## Theming

⭐ **[[The master diagram](@theme-selection)] — fields through to printed page, on one screen.** Start there.

| Page | What it answers |
|---|---|
| [[Theme State](@theme-state)] | **what is actually built.** ✅ The colour chain renders end to end as of 08-16 |
| [[Theme Build Order](@theme-build-order)] | 🔨 **the remaining WORK**, dependency-ordered, each step with its verification |
| [[Styled Objects Template](@theme-template-layout)] | 🔨 the in-file token INVENTORY + theme test bench. Build spec |
| [[Vector Grain](@theme-vector-grain)] | what is DATA and what is LAYOUT. Only SIZE belongs to the surface |
| [[Theme Selection](@theme-selection)] | WHICH theme is in force. Startup script, records → two globals |
| [[Theme Resolution](@theme-resolution)] | what THIS object looks like. Globals → token → vectors → values |
| [[Event Styling](@theme-event-styling)] | how an EVENT gets its token, and the ClickUp vocabulary contract |

### Conventions

- [[Data standards](@data-standards)] — naming conventions

Decision history: **Production MAWster FMP — Decision Log** (ClickUp).
