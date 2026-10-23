---
id: uritp-people-table-target-tables
title: Target_Tables
type: reference
status: public
order: 60
revised: 2026-10
summary: One base table this file has ever had, found by its internal id and refreshed from the file's own schema.
data:
  catalog:
    file: Target_Tables.tsv
---

# Target_Tables

!!! abstract "Grain"
    One base table, matched on FileMaker's internal table id so a rename keeps the same row.

## Fields

!!! data "catalog"

## Refreshed, never typed

The refresh reads `FileMaker_BaseTables` with ExecuteSQL, matches on `fm_BaseTableID`, and writes the name. A table that disappears keeps its row with `isPresent` at 0, because a container may still point at it.

!!! warning "Not reconciled with the app catalog"
    D-043 says every FileMaker file carries the app catalog, APP_TABLES and APP_LAYOUTS, refreshed by APP_CatalogRefresh. This table does the APP_TABLES job under another name, and the file has no APP_LAYOUTS. Which one URITP People keeps has not been ruled.
