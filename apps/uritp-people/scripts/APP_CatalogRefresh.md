---
id: uritp-people-script-app-catalog-refresh
title: APP_CatalogRefresh
type: reference
status: public
order: 10
revised: 2026-10
summary: Installed from the standards shelf, not written here. What this file sets at install and what the first run proved.
---

# APP_CatalogRefresh

!!! abstract "Installed, not authored"
    The script body lives once, on the standards shelf: `standards/filemaker/scripts/APP_CatalogRefresh.fmscript`, with its reasoning in [the app catalog scripts notes](@fmp-app-catalog-scripts). This page is the pointer D-037 asks each app to hold instead of a copy. Nothing here is the script.

## What this file sets at install

`$layoutTables` is `view | Target_Tables`, the layout on the `view_Target_Tables` occurrence. That is the only line edited. The shelf copy ships it empty and refuses to run until it is set, so one app's layout naming never rides along inside a shared file.

The script goes in the `00_APP` script folder, on OnFirstWindowOpen and on a developer button.

## What it writes here

One [Target_Tables](@uritp-people-table-target-tables) row per base table that has a field defined. It owns `fm_BaseTableName`, `isPresent`, `LastSeenAt` and `AuditField_gaps`. It never writes `fm_BaseTableID`, which is typed from the DDR export (D-050), and never writes a display field.

## Why the names here became the standard's names

This is the first file in any solution to build the catalog, so its names are the ones the standard adopted: `Target_Tables` over D-043's proposed APP_TABLES (D-049), and `AuditField_gaps` over the proposed AuditGap. Nothing about either name is specific to people or to URITP; they describe a table catalog in any FileMaker file. A proposed name that was never built lost to a name that exists, which is the same test D-049 applied.

The two things that genuinely are local are handled as local: the layout name, set at install, and FileMaker 19's inability to report a base-table id, which is a version condition rather than an app condition and is written into the standard as such.

## First run

Run it before seeding ids. The closing dialog reports the file's base-table count, new rows, gone rows, rows waiting on a DDR id, and the tables failing the audit by name. Then seed `fm_BaseTableID` for every row from the DDR, run it again, and both the new count and the waiting count should be zero.
