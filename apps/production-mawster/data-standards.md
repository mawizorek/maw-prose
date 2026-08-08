---
id: data-standards
title: Data standards
type: reference
status: public
order: 25
nav: collapsed
revised: 2026-08
summary: Naming conventions for this app. Names lock before any calc queries them by name.
---

# Data standards

## Naming

| Convention | Pattern | Example |
|---|---|---|
| Primary keys | `PrimaryKey`, UUID, never serial | ⚠️ Diverges from house `pk_` prefix (open governance item) |
| Foreign keys | `fk<Parent>` | `fkProduction`, `fkCalendar`, `fkStandardEvent` |
| Dates | `date_` prefix | `date_FirstRehearsal`, `date_NeededLast` |
| Booleans | `bool_` prefix | `bool_AddPreProWeek`, `bool_IsScratch` |
| Calculations | `calc_` prefix | `calc_TotalOutstanding` |
| Overrides | `ovr_` prefix | `ovr_OutputSize` — empty means INHERIT from the parent |
| Integration keys | `cu` prefix, camel, no underscore | `cuProductionToken`, `cuProductionID` |
| Globals | `g_` prefix; `gLIST_` for value-list globals | `g_currentProduction`, `gLIST_PropertyNames` |
| Audit fields | `PrimaryKey`, `CreationTimestamp`, `CreatedBy`, `ModificationTimestamp`, `ModifiedBy` | Every table, including a singleton |
| No leading underscores | Active core tables only | Legacy `GLOBAL_`, `XXval_`, `old...` gets stripped |
| Value list vs table | Metadata beyond display value → table | Location type = value list until it earns `SortOrder`; event type (carries skin + report role) = `STANDARD_EVENTS` |

⚠️ **`date_`, `bool_`, `ovr_` and `cu` were added 2026-08-08** from live practice. This page had documented only `calc_`, `g_` and `fk` while the build was already using the others — the doc lost to the diff.

## Why names lock before SQL

`ExecuteSQL` embeds table and field names as **text**. Rename a table and the calc returns **empty, not error**.

## Field-menu conventions (the `.tsv` side)

- The first column is a **confirmation state** (`{.conf}` / `{.tbc}`), **not a sort ordinal.** A field menu is a build tracker, not a static list.
- Columns mirror FileMaker's own field dialog: `Field_Name` · `Type` · `Options` · `Notes`.
- Sections are bare singular rows: `NORMALIZED FIELDS` · `INTEGRATION KEYS` · `RELATIONSHIP` · `CHILDREN` · `AUDIT FIELDS`, closed by `- EOF -`.
- Audit fields are **spelled out**, not pointed at — you cannot check off a pointer while sitting in the field dialog.
- `TABLE.tsv` is uppercase (it is the FMP table name); `table.md` is lowercase (it is a document).
