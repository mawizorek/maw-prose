---
id: uritp-people-table-target-tables
title: Target_Tables
type: reference
status: public
order: 60
revised: 2026-10
summary: One base table this file has ever had, refreshed from the file's own schema, with the conformance gap for each one.
data:
  catalog:
    file: Target_Tables.tsv
---

# Target_Tables

!!! abstract "Grain"
    One base table. Matched on `fm_BaseTableName`, because FileMaker 19 cannot report a base-table id (D-050).

## Fields

!!! data "catalog"

## Refreshed, never typed, except the id

The refresh reads `SELECT DISTINCT BaseTableName FROM FileMaker_BaseTableFields`, finds each name, and writes presence, last-seen and the audit gap. A table that disappears keeps its row with `isPresent` at 0, because a container may still point at it.

`fm_BaseTableID` is the one typed field. It comes from the DDR export, because no FileMaker 19 function or system table reports a base-table id. **Empty is meaningful:** a row the refresh created that nobody has seeded yet. Find `isPresent` 1 with an empty id and that is the worklist; the refresh's closing dialog counts it for you.

## AuditGap is the conformance report

Every base table is supposed to carry `PrimaryKey` and the four audit fields. Nothing in FileMaker enforces that, so the refresh compares each table's real field list against the five and writes what is missing, one per line. Empty means the table conforms, and a find on a non-empty `AuditGap` is the whole audit.

It matters here more than most files: every join in this schema keys on `PrimaryKey`, so a table missing one never matches rather than erroring, and the sync layer reads the audit fields for provenance when a reconcile row asks who changed what.

Rewritten on every run and never typed, so it cannot go stale and claim a table conforms when it stopped conforming.

## This is the app catalog

Ruled 2026-10-23, D-049: this table is the app catalog's table half under its built name, and `APP_TABLES` was never created in any file. `APP_CatalogRefresh` on the standards shelf writes here, and [the app catalog](@fmp-app-catalog) carries the name. The superseded `APP_TABLES` page in this folder points back to this one.

Still open: the file has no layout catalog, so whether it becomes `Target_Layouts` or `APP_LAYOUTS` is unruled. And a renamed base table reads as one gone plus one new until the file moves to FileMaker 2023, where the id becomes readable and the rename becomes invisible.
