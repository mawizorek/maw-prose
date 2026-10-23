---
id: fmp-app-catalog-scripts
title: App catalog scripts
status: public
type: standard
summary: APP_CatalogRefresh, APP_GoToLayout and APP_OpenMenu. What each one does, what FileMaker 19 cannot tell it, and the checks on a first install.
revised: 2026-10
---

# App catalog scripts

Copy targets in this folder, installed into each app's `00_APP` script folder. The standard they serve is [the app catalog](@fmp-app-catalog).

## APP_CatalogRefresh

Reads every base table that has a field defined, adds a `Target_Tables` row for one it has not seen, stamps `isPresent` and `LastSeenAt` on every row it does see, flips `isPresent` to 0 on a row it stops seeing, and reports what changed in a dialog. It never writes a typed field, and it never writes `fm_BaseTableID`.

The upsert finds by name once per table. A file has tens of tables, not thousands, so a find per row costs nothing and keeps the script plain.

## What FileMaker 19 cannot tell it

**There is no base-table id available on 19.** `FileMaker_BaseTables`, `BaseTableNames` and `BaseTableIDs` all arrived in FileMaker 2023 (20.1). `FileMaker_Tables.TableId` is a table *occurrence* id, the wrong grain, several per base table. `FileMaker_BaseTableFields` arrived in 19.4.1 and carries names and fields but no table id.

So the refresh matches on `fm_BaseTableName`, and `fm_BaseTableID` is typed by hand from the DDR export (D-050). Three consequences, all of them designed around rather than hidden:

- **Empty is the worklist.** A row the script creates has no id, and the script's closing dialog counts the rows waiting for one. A find on `isPresent` 1 with `fm_BaseTableID` empty is the to-do list, and it is never a guess about which tables are new.
- **A rename looks like a deletion plus an addition.** Nothing in the file can tell the refresh otherwise. Rename a base table and you get the old row flipped to `isPresent` 0 and a fresh row with no id; move the id across by hand, or reseed from the next DDR. This is the exact failure the id key existed to prevent, and on 19 it cannot be prevented, only noticed.
- **A table with no fields defined is invisible.** `FileMaker_BaseTableFields` only lists tables that have at least one field. Not a bug, a 19 limit; it stops mattering the moment the table has a field.

Upgrading to FileMaker 2023 removes all three. Until then this is the honest version.

## What is still automatic

More than the id situation suggests. The script detects a new table, detects a vanished one, maintains presence and last-seen on every row, computes the D-043 conformance gap per table from `FileMaker_BaseTableFields`, and counts the file's base tables for the dialog. The only manual act is typing an id for a table you just added, and tables are a finite, rarely changing set.

## The layout name is an install variable

`$layoutTables` is set in the first steps and is the only line an installing app edits. The script needs record context, which means a layout whose base table occurrence is the catalog table; it does not care what that layout is called. URITP People's is `view | Target_Tables`, on the `view_Target_Tables` occurrence. A missing layout stops the script with a dialog naming the variable, rather than letting `Go to Layout` fail quietly and writing records into whatever context happened to be current.

## AuditGap has nowhere to land

The script computes the missing standard fields into `$gap`, because that is the D-043 conformance check, but `Target_Tables` has no field to hold it, so nothing is written and a comment step says so. This one is worth closing: the gap computation genuinely works on 19.4.1, so adding `AuditGap` as Text and one `Set Field` turns a find on that field into the conformance report.

## The layout catalog

No file has one, so there is no built name to follow and inventing one would be a guess. Whether it becomes `Target_Layouts` for symmetry or stays `APP_LAYOUTS` is unruled, and the layout half has been cut from this script until a file has the table. `APP_GoToLayout` and `APP_OpenMenu` below are unreachable meanwhile.

## APP_GoToLayout

Looks up the layout's current name from its id at the moment it runs. When it runs from the APP_MENU card it closes the card first, so the move happens in the window underneath.

## APP_OpenMenu

Opens APP_MENU as a card, found to ShowInMenu and not removed, in the layout's restored sort: MenuSection, then MenuOrder.

## Check on the first install

- That `$layoutTables` names a layout that exists in this file, on an occurrence of the catalog table. The script tells you if it does not.
- That the base-table list comes back at all. A leading `?` or an empty result means the file is older than 19.4.1.
- That the dialog's base-table count matches the Tables tab of Manage Database. If it is short, a table has no fields defined.
- That running it twice creates nothing the second time. That is the proof the name match works.
- That `Get ( WindowStyle )` reports 3 for a card window, once there is a menu to open.
