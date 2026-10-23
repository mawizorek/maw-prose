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

Every solution carries a table catalog, `Target_Tables`, with one record per base table in the file. Anything else in the file that needs to point at a table points at a catalog record rather than naming the table in text.

A layout catalog is the same idea one object type over, and the app's navigation menu is that catalog. It is specified below as `APP_LAYOUTS`, but no file has built one yet, so that name is a proposal and not a fact.

The field registers live once, here, in [tables/](./tables/). An app's own table notes point at them rather than copying them.

## Generated, never typed

FileMaker already knows its tables and layouts. A list someone maintains by hand is a second copy of the schema and it drifts the first time a table is renamed. So the identity of every catalog record, its id and its current name, is written only by `APP_CatalogRefresh`, which reads the file's own schema tables and layout lists. People type only the things FileMaker has no place for.

## The key is FileMaker's internal id

`fm_BaseTableID`, and `fm_LayoutID` for layouts, are the ids FileMaker assigns and never changes. Names are rewritten on every refresh. Rename a table or a layout and its catalog record follows it, with every typed field and every record pointing at it intact.

## What gets typed

On the table catalog: a display name, whether ClickUp feeds the table, and notes. On the layout catalog: a display name, a menu section, an order within the section, whether it shows in the menu, and notes. If a value can be read from the file, it is not typed.

`Target_Tables` as it stands in URITP People carries none of those typed fields yet, only identity. They are added when something needs them, per D-035.

## Gone, never deleted

A table the refresh no longer finds keeps its row with `isPresent` at 0. A layout the refresh no longer finds gets `RemovedTimestamp`. Either way the record stays, because other records may point at it, and a record that silently loses its target is worse than one that says the target is gone. Rebuild it in the file and the next refresh reverses the flag, because the id is gone for good only when the object is.

The two halves use different mechanisms because the live table does, and `LastSeenAt` already answers when a table was last seen, so the timestamp lost nothing.

## Self-audit

The refresh checks every base table for the standard fields in [the data standards](./fmp-data-standards.md): `PrimaryKey` and the four audit fields.

!!! warning "The conformance report does not exist yet"
    What is missing is meant to land in `AuditGap`, one field per line, so that an empty `AuditGap` means the table conforms and a find on that field is the conformance report. `Target_Tables` has no such field, so the refresh computes the gap and discards it. Adding `AuditGap` as Text, plus one `Set Field` in the refresh, is all this needs.

## The menu

`APP_OpenMenu` opens a card window on the `APP_MENU` layout, found to layouts marked for the menu and not removed, sorted by section then order. Each row's button runs `APP_GoToLayout` with the layout's id. That script looks up the layout's current name from its id at the moment of the click, so renaming a layout never breaks a menu entry. None of this runs until a file has a layout catalog.

## Installing it in an app

- `Target_Tables`, field for field as the register. In the app package, `tables/Target_Tables.md` states the grain and points its `data` slot at the register.
- A layout named `Target_Tables`, a utility form. The refresh navigates by layout name, so it stops cold without one.
- Script folder `00_APP`, typed from [scripts/](./scripts/): `APP_CatalogRefresh`, and `APP_GoToLayout` and `APP_OpenMenu` once there is a layout catalog to drive them.
- `APP_CatalogRefresh` on the file's OnFirstWindowOpen trigger, and on a developer button for after schema work.

## Versions

The table half reads `FileMaker_BaseTables` and `FileMaker_BaseTableFields`, which arrived in FileMaker 19.4. On an older file the refresh says so and stops. The layout half uses `LayoutIDs` and `LayoutNames`, which every supported version has.

## What it is not

It is not the spec. The catalog records what exists in the file; the app package in this repo records what the file is built toward. Exporting the catalog and laying it beside the package's `tables/` folder is a punch list, and like any punch list it is temporary.

It does not make SQL rename-safe. `ExecuteSQL` names table occurrences and fields, not base tables. That job belongs to `GetFieldName`, in [the data standards](./fmp-data-standards.md).

## Why the name is Target_Tables

D-043 called this table `APP_TABLES`. URITP People built it as `Target_Tables` and Michael ruled on 2026-10-23 that the built name stands (D-049). The standard follows the file rather than the other way round, because no other solution had built the catalog at all, so there was nothing to keep compatible and no reason to carry the weaker name forward.
