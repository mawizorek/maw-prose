---
id: data-standards
title: Data standards
type: standard
status: public
order: 25
revised: 2026-08
summary: Naming conventions for this app. Names lock before any SQL is written.
---

# Data standards

| Convention | Pattern | Example |
|---|---|---|
| Primary keys | `PrimaryKey`, UUID, never serial | ⚠️ Diverges from house `pk_` prefix (open governance item) |
| Foreign keys | `fk<Parent>` | `fkProduction`, `fkCalendar`, `fkStandardEvent` |
| **Dates** | `date_` prefix | `date_FirstRehearsal`, `date_NeededLast` |
| **Booleans** | `bool_` prefix. A REAL boolean, never text | `bool_AddPreProWeek`, `bool_IsScratch` |
| **Overrides** | `ovr_` prefix. Empty means INHERIT from the parent | `ovr_OutputSize` |
| Calculations | `calc_` prefix | `calc_TotalOutstanding` |
| Globals | `g_` prefix; `gLIST_` for value-list globals | `g_currentProduction`, `gLIST_PropertyNames` |
| **Integration keys** | `cu` prefix, camel, no underscore | `cuProductionToken`, `cuProductionID` |
| Display fields | `*Display`, auto-enter calculation | `TitleDisplay`, `NameDisplay` |
| Audit fields | `PrimaryKey`, `CreationTimestamp`, `CreatedBy`, `ModificationTimestamp`, `ModifiedBy` | **Spelled out on every table**, including singletons |
| No leading underscores | Active core tables only | Legacy `GLOBAL_`, `XXval_`, `old...` gets stripped |
| Value list vs table | Metadata beyond display value → table | Delivery type = value list; an event type carrying skin + report meaning = `STANDARD_EVENTS` |

## A name states the CONCEPT, never the format

`PDF_Path` became `ExportPath` because the output might not be a PDF. **A field name that encodes today's file format is a name that has to change when the format does.**

## Boolean means boolean

Legacy `startOnMon` was a TEXT field compared against `= 1`, so typing "Yes" silently flipped the week. ⚠️ **And a boolean cannot express a domain with three or more answers:** week start is `WeekStartDay` (1–7) because **Tuesday** is the real answer — a theatre week runs Tue→Mon since Monday is the dark day.

## Why names lock before SQL

`ExecuteSQL` embeds table and field names as **text**. Rename a table and the calc returns **empty, not an error** — which is the worst available failure, because the page still prints.

## The confirmation column

The first column of every `.tsv` in this app is a **state**, not an ordinal: `{.conf}` means the field is confirmed against the live build, `{.tbc}` means it is not. **A field menu here is a build tracker, not a static list.**
