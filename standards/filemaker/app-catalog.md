---
id: fmp-app-catalog
title: The app catalog
status: public
type: standard
summary: Every FileMaker file keeps a record of its own tables and layouts, generated from the file itself, keyed on FileMaker's internal ids, carrying only what FileMaker cannot store.
revised: 2026-10
---

# The app catalog

## What it is

Every solution carries two tables, `APP_TABLES` and `APP_LAYOUTS`. One record per base table and one per layout in the file. Anything else in the file that needs to point at a table or a layout points at a catalog record, and the app's own navigation menu is the layout catalog.

The field registers live once, here: [APP_TABLES.tsv](./tables/APP_TABLES.tsv) and [APP_LAYOUTS.tsv](./tables/APP_LAYOUTS.tsv). An app's own table notes point at them rather than copying them.

## Generated, never typed

FileMaker already knows its tables and layouts. A list someone maintains by hand is a second copy of the schema and it drifts the first time a table is renamed. So the identity of every catalog record, its id and its current name, is written only by `APP_CatalogRefresh`, which reads the file's own schema tables and layout lists. People type only the things FileMaker has no place for.

## The key is FileMaker's internal id

`fm_TableID` and `fm_LayoutID` are the ids FileMaker assigns and never changes. Names are rewritten on every refresh. Rename a table or a layout and its catalog record follows it, with every typed field and every record pointing at it intact.

## What gets typed

On APP_TABLES: a display name, whether ClickUp feeds the table, and notes. On APP_LAYOUTS: a display name, a menu section, an order within the section, whether it shows in the menu, and notes. If a value can be read from the file, it is not typed.

## Removed, never deleted

A table or layout the refresh no longer finds gets `RemovedTimestamp` and stays. Other records may point at it, and a record that silently loses its target is worse than one that says the target is gone. Rebuild it in the file and the next refresh clears the stamp, because the id is gone for good only when the object is.

## Self-audit

The refresh checks every base table for the standard fields in [the data standards](./fmp-data-standards.md): `PrimaryKey` and the four audit fields. What is missing lands in `AuditGap`, one field per line. An empty `AuditGap` means the table conforms. A find on that field is the conformance report.

## The menu

`APP_OpenMenu` opens a card window on the `APP_MENU` layout, found to layouts marked for the menu and not removed, sorted by section then order. Each row's button runs `APP_GoToLayout` with the layout's id. That script looks up the layout's current name from its id at the moment of the click, so renaming a layout never breaks a menu entry.

## Installing it in an app

- Two tables, field for field as the registers. In the app package, `tables/APP_TABLES.md` and `tables/APP_LAYOUTS.md` state the grain and point their `data` slot at the registers here.
- Layouts `APP_TABLES`, `APP_LAYOUTS` and `APP_MENU`. The first two are utility forms; `APP_MENU` is a list view sized for a card window, with ShowInMenu and Removed hidden.
- Script folder `00_APP`, typed from [scripts/](./scripts/): `APP_CatalogRefresh`, `APP_GoToLayout`, `APP_OpenMenu`.
- `APP_CatalogRefresh` on the file's OnFirstWindowOpen trigger, and on a developer button for after schema work.

## Versions

The table half reads `FileMaker_BaseTables` and `FileMaker_BaseTableFields`, which arrived in FileMaker 19.4. On an older file the refresh says so and stops. The layout half uses `LayoutIDs` and `LayoutNames`, which every supported version has.

## What it is not

It is not the spec. The catalog records what exists in the file; the app package in this repo records what the file is built toward. Exporting the catalog and laying it beside the package's `tables/` folder is a punch list, and like any punch list it is temporary.

It does not make SQL rename-safe. `ExecuteSQL` names table occurrences and fields, not base tables. That job belongs to `GetFieldName`, in [the data standards](./fmp-data-standards.md).
