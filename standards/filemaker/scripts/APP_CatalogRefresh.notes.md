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

Reads `FileMaker_BaseTables` for every base table and its id, checks each table's fields in `FileMaker_BaseTableFields` against the five standard fields, and adds or updates one APP_TABLES record per id. Then it reads `LayoutIDs` and `LayoutNames` and does the same into APP_LAYOUTS. Anything it no longer sees gets `RemovedTimestamp`. It never writes a typed field.

The upsert finds by id once per object. A file has tens of tables and layouts, not thousands, so a find per row costs nothing and keeps the script plain.

## APP_GoToLayout

Looks up the layout's current name from its id at the moment it runs. When it runs from the APP_MENU card it closes the card first, so the move happens in the window underneath.

## APP_OpenMenu

Opens APP_MENU as a card, found to ShowInMenu and not removed, in the layout's restored sort: MenuSection, then MenuOrder.

## Check on the first install

- That `FileMaker_BaseTableFields` names its table column `BaseTableName`. If the refresh writes all five fields into every `AuditGap`, the column name is wrong.
- That `LayoutNames` and `LayoutIDs` skip layout folders and separators on your version. The refresh already ignores a blank name and a `-`.
- That `Get ( WindowStyle )` reports 3 for a card window. If the menu card stays open after a click, it does not.
