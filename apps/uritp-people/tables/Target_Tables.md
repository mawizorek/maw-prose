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

## This is the app catalog

Ruled 2026-10-23, D-049: this table is the app catalog's table half under its built name, and `APP_TABLES` was never created in any file. `APP_CatalogRefresh` on the standards shelf now writes here, and [the app catalog](@fmp-app-catalog) carries the name. The superseded `APP_TABLES` page in this folder points back to this one.

Still open, both named in the standard rather than hidden here: the file has no layout catalog, so whether it becomes `Target_Layouts` or `APP_LAYOUTS` is unruled; and this table has no `AuditGap` field, so the refresh computes the conformance gap and has nowhere to write it.
