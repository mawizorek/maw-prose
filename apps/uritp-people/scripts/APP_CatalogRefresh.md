---
id: uritp-people-script-app-catalog-refresh
title: refresh | Target_Tables
type: reference
status: public
order: 10
revised: 2026-10
summary: The app catalog refresh as installed in URITP People. Body lives on the standards shelf; this page carries the install values and the first run.
---

# refresh | Target_Tables

!!! abstract "Installed, not authored"
    The script body lives once, on the standards shelf: `standards/filemaker/scripts/APP_CatalogRefresh.fmscript`, with its reasoning in [the app catalog scripts notes](@fmp-app-catalog-scripts). This page is the pointer D-037 asks each app to hold instead of a copy. Nothing here is the script.

## Install values in this file

- **Script name:** `refresh | Target_Tables`, matching this file's `<verb> | <object>` convention rather than the shelf's `APP_CatalogRefresh` filename. The shelf names the definition; each file names its own script.
- **`$layoutTables`:** `view | Target_Tables`, the layout on the `view_Target_Tables` occurrence. The only line edited at install. The shelf copy ships it empty and refuses to run until it is set, so no app's naming rides along inside a shared file.
- **Placement:** `00_APP`, on OnFirstWindowOpen and on a developer button.

## What it writes here

One [Target_Tables](@uritp-people-table-target-tables) row per base table that has a field defined. It owns `fm_BaseTableName`, `isPresent`, `LastSeenAt` and `AuditField_gaps`. It never writes `fm_BaseTableID`, which is typed from the DDR export (D-050), and never writes a display field.

## First run, 2026-10-23

Clean on the first attempt. 22 base tables found, 22 rows created, 0 gone, **0 failing the audit**, 22 waiting on a DDR id.

Two things that run proved beyond the script itself:

- **Every base table in this file conforms to the data standards.** `PrimaryKey` and all four audit fields are present on all of them, which is the first time that has been checked rather than assumed, and it held across a schema built over three sittings.
- **No table is invisible.** The count matched Manage Database exactly, so no base table is sitting there without a field defined, which is the one blind spot of reading `FileMaker_BaseTableFields` on FileMaker 19.

The catalog table lists itself, which is correct: it is a base table like any other.

## Why the names here became the standard's names

This is the first file in any solution to build the catalog, so its names are the ones the standard adopted: `Target_Tables` over D-043's proposed APP_TABLES (D-049), and `AuditField_gaps` over the proposed AuditGap. Nothing about either name is specific to people or to URITP; they describe a table catalog in any FileMaker file. A proposed name that was never built lost to a name that exists, which is the test D-049 applied.

The two things that genuinely are local are handled as local: the layout and script names, set at install, and FileMaker 19's inability to report a base-table id, which is a version condition rather than an app condition and is written into the standard as such.

## Next

Seed `fm_BaseTableID` for all 22 rows from the DDR export, then run again. New rows and waiting-on-an-id should both read 0, and that count stays at 0 until a table is added.
