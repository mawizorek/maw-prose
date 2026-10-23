---
id: fmp-app-catalog-scripts
title: App catalog scripts
status: public
type: standard
summary: APP_CatalogRefresh, APP_GoToLayout and APP_OpenMenu. What each one does and the three things to check on a first install.
revised: 2026-10
---

# App catalog scripts

Copy targets in this folder, installed into each app's `00_APP` script folder. The standard they serve is [the app catalog](@fmp-app-catalog).

## APP_CatalogRefresh

Reads `FileMaker_BaseTables` for every base table and its id, checks each table's fields in `FileMaker_BaseTableFields` against the five standard fields, and adds or updates one `Target_Tables` record per id. Then it reads `LayoutIDs` and `LayoutNames` and does the same into APP_LAYOUTS. A table it no longer sees keeps its row with `isPresent` at 0; a layout it no longer sees gets `RemovedTimestamp`. It never writes a typed field.

The upsert finds by id once per object. A file has tens of tables and layouts, not thousands, so a find per row costs nothing and keeps the script plain.

## The two halves do not match each other yet

The table half was rewritten 2026-10-23 against URITP People's live `Target_Tables`, which is the only catalog table that exists in any file (D-049). It writes `fm_BaseTableID`, `fm_BaseTableName`, `isPresent` and `LastSeenAt`.

Two consequences, both deliberate and neither guessed at:

- **`AuditGap` has nowhere to land.** The script still computes the missing standard fields into `$gap`, because that is the D-043 conformance check, but `Target_Tables` has no field to hold it, so nothing is written and a comment step says so. Add `AuditGap` as Text and one `Set Field` restores the check. Until then, the conformance report named in the catalog standard does not exist.
- **The layout half still says APP_LAYOUTS.** No file has a layout catalog, so there is no live name to follow and inventing one would be a guess. Whether it becomes `Target_Layouts` for symmetry or stays `APP_LAYOUTS` is unruled, and the half is unreachable in URITP People until the table exists.

## APP_GoToLayout

Looks up the layout's current name from its id at the moment it runs. When it runs from the APP_MENU card it closes the card first, so the move happens in the window underneath.

## APP_OpenMenu

Opens APP_MENU as a card, found to ShowInMenu and not removed, in the layout's restored sort: MenuSection, then MenuOrder.

## Check on the first install

- That `FileMaker_BaseTableFields` names its table column `BaseTableName`. If `$gap` comes back holding all five fields for every table, the column name is wrong.
- That `LayoutNames` and `LayoutIDs` skip layout folders and separators on your version. The refresh already ignores a blank name and a `-`.
- That `Get ( WindowStyle )` reports 3 for a card window. If the menu card stays open after a click, it does not.
- That a `Target_Tables` layout exists before you run it. The script goes to a layout by name, so a missing layout stops it cold.
