---
id: menu-fields
title: Fields
type: page
status: unlisted
chrome: app
revised: Sep 2026
summary: "Fields, per table. Pick a table to open its field menu."
hide:
  - navigation
  - toc
  - footer
---

# Fields {.align-center}

[← Database](@menu-database)

⭐ **There is no flat field census, on purpose.** A field only means anything
next to its table's grain, so this menu routes **per table** — the answer ruled
2026-09-30. Each row opens that table's page, where the field menu renders from
the `data: catalog:` block. **The source of every one of those tables is
`20-tables/<TABLE>.tsv`**, columns `Field_Name | Type | Notes`, and that TSV is
the only place a field is ever written down.

🚫 **Never retype a field onto this page.** The moment a field name lives in two
files, one of them is wrong and nobody knows which.

## Normalized

!!! cards cols=1 style=rows
    - @table-producers
    - @table-roles
    - @table-productions
    - @table-production-calendars
    - @table-weeks
    - @table-workdays
    - @table-standard-events
    - @table-location-types
    - @table-organizations

## Working data

!!! cards cols=1 style=rows
    - @table-events
    - @table-events-workday
    - @table-calendar-emphasis
    - @table-assignments
    - @table-editions
    - @table-versions
    - @table-locations

## Styling

!!! cards cols=1 style=rows
    - @table-styles
    - @table-themes
    - @table-themes_x_styles
    - @table-colors
    - @table-typography

## Import

!!! cards cols=1 style=rows
    - @table-import-sessions
    - @table-import-sources
    - @table-import-events

## Export

!!! cards cols=1 style=rows
    - @table-print-sessions
    - @table-export-presets
    - @table-print-sets
    - @table-print-set-items

## Globals and utility

!!! cards cols=1 style=rows
    - @table-global-use
    - @table-global-export
    - @table-utility-reports
    - @table-utility-logs
    - @table-utility_logs

## Essentially value lists

!!! cards cols=1 style=rows
    - @table-value-lists
    - @table-values

<p><br/></p>

---

???+ warning "Two tables have NO field menu, and that is correct"
    **`FISCAL_YEARS`** and **`PEOPLE`** have a page but no `.tsv` twin. Both are
    **external data sources** — other FileMaker files own their fields
    (`URITP_GLOBAL` and `URITP_PEOPLE`). ⭐ **Writing a field list for them here
    would be transcription of somebody else's schema**, which goes stale without
    anyone touching this repo. They are deliberately absent from this menu and
    present on [[Tables](@menu-tables)].

    ⚠️ `PEOPLE` is its own app, ruled 2026-08-07: *a table with two owners has no
    owner.* Its field truth lives in the `uritp-people` build, and the ClickUp →
    FileMaker pull is what keeps it current.

??? tip "The audit five"
    Every normalized table's TSV ends with the same block — `PrimaryKey`,
    `CreationTimestamp`, `CreatedBy`, `ModificationTimestamp`, `ModifiedBy`.
    ⚠️ **The marker text reads `[Audit Feilds]`, misspelled, across the TSVs.**
    Cosmetic, consistent, and fixable in one sweep whenever somebody is in there
    anyway. 🚫 Not swept yet — it touches roughly 35 files for a cosmetic gain,
    which is a decision, not a chore.
