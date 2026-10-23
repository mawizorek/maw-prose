---
id: fmp-app-catalog
title: The app catalog
status: public
type: standard
summary: Every FileMaker file keeps a record of its own tables, generated from the file itself, carrying only what FileMaker cannot store. On FileMaker 19 the base-table id is typed from the DDR, because the file cannot report it.
revised: 2026-10
---

# The app catalog

## What it is

Every solution carries a table catalog, `Target_Tables`, with one record per base table in the file. Anything else in the file that needs to point at a table points at a catalog record rather than naming the table in text.

A layout catalog is the same idea one object type over, and the app's navigation menu is that catalog. It is specified below as `APP_LAYOUTS`, but no file has built one yet, so that name is a proposal and not a fact.

The field registers live once, here, in [tables/](./tables/). An app's own table notes point at them rather than copying them.

## Generated, never typed, with one exception

FileMaker already knows its tables. A list someone maintains by hand is a second copy of the schema and it drifts the first time a table is renamed. So presence, the current name, and last-seen are written only by `APP_CatalogRefresh`, which reads the file's own schema tables. People type only the things FileMaker has no place for.

The exception is `fm_BaseTableID`, and it exists because of a platform limit rather than a choice. See the version section.

## The key, and why it is a name on FileMaker 19

!!! warning "A base-table id cannot be read on FileMaker 19"
    `FileMaker_BaseTables`, `BaseTableNames` and `BaseTableIDs` all arrived in **FileMaker 2023 (20.1)**. `FileMaker_BaseTableFields` arrived in 19.4.1 and carries base-table names and their fields, but no table id. `FileMaker_Tables.TableId` is a table *occurrence* id, the wrong grain, several per base table. This standard previously claimed the base-table system table shipped in 19.4; that was never true and was never run (corrected 2026-10-23).

On FileMaker 2023 and later the id is the key, it is read from the file, and a rename is invisible to everything pointing at a catalog record. That is the design and it still is.

On FileMaker 19.4.1 the refresh matches on `fm_BaseTableName`, and `fm_BaseTableID` is typed once per table from the DDR export, which does carry real ids (D-050). Empty is meaningful: a row the refresh created and nobody has seeded. Find `isPresent` 1 with an empty id and that is the worklist, reported in the refresh's closing dialog.

The cost is named rather than hidden: **a renamed base table reads as one gone and one new.** Nothing in a 19 file can say otherwise. Move the id across by hand or reseed from the next DDR. The id key existed to make renames safe, and on 19 a rename can only be noticed, not absorbed.

## What gets typed

On the table catalog: `fm_BaseTableID` until the platform can report it, plus a display name, whether ClickUp feeds the table, and notes. On the layout catalog: a display name, a menu section, an order within the section, whether it shows in the menu, and notes. If a value can be read from the file, it is not typed.

`Target_Tables` as it stands in URITP People carries none of the display fields yet, only identity. They are added when something needs them, per D-035.

## Gone, never deleted

A table the refresh no longer finds keeps its row with `isPresent` at 0. The record stays, because other records may point at it, and a record that silently loses its target is worse than one that says the target is gone. Rebuild it in the file and the next refresh reverses the flag.

`LastSeenAt` answers when a table was last seen, which is why no removal timestamp is carried.

## Self-audit

The refresh checks every base table for the standard fields in [the data standards](./fmp-data-standards.md): `PrimaryKey` and the four audit fields. This check works on 19.4.1, because `FileMaker_BaseTableFields` reports every field of every base table.

!!! warning "The conformance report does not exist yet"
    What is missing is meant to land in `AuditGap`, one field per line, so that an empty `AuditGap` means the table conforms and a find on that field is the conformance report. `Target_Tables` has no such field, so the refresh computes the gap and discards it. Adding `AuditGap` as Text, plus one `Set Field` in the refresh, is all this needs, and the computation is already proven.

## What else the refresh does on its own

More than the id limit suggests: it finds a table it has never seen, notices one that has vanished, keeps presence and last-seen true on every row, computes the conformance gap per table, and counts the file's base tables. The only manual act is typing an id for a table just added, and base tables are a finite set that changes rarely.

A base table with no fields defined does not appear in `FileMaker_BaseTableFields` and so is invisible to the refresh. It stops mattering the moment the table has a field.

## The menu

`APP_OpenMenu` opens a card window on the `APP_MENU` layout, found to layouts marked for the menu and not removed, sorted by section then order. Each row's button runs `APP_GoToLayout` with the layout's id. That script looks up the layout's current name from its id at the moment of the click, so renaming a layout never breaks a menu entry. None of this runs until a file has a layout catalog.

## Installing it in an app

- `Target_Tables`, field for field as the register.
- A layout on an occurrence of `Target_Tables`, a utility form. The refresh navigates to it, so it stops cold without one. Its name goes in `$layoutTables` at the top of the refresh; nothing else is edited.
- Script folder `00_APP`, typed or pasted from [scripts/](./scripts/): `APP_CatalogRefresh`, and `APP_GoToLayout` and `APP_OpenMenu` once there is a layout catalog to drive them.
- `APP_CatalogRefresh` on the file's OnFirstWindowOpen trigger, and on a developer button for after schema work.
- Run it, then seed `fm_BaseTableID` for every row from the DDR export, then run it again and confirm nothing new appears.

## Versions

**19.4.1 is the floor.** That is when `FileMaker_BaseTableFields` arrived, and the refresh reads nothing else. Below it the refresh says so and stops.

**FileMaker 2023 (20.1) is where this standard wants to live.** `FileMaker_BaseTables` gives the base-table id directly, which makes the id the key again, makes renames safe, and makes `fm_BaseTableID` generated rather than typed. The layout half uses `LayoutIDs` and `LayoutNames`, which every supported version has.

## What it is not

It is not the spec. The catalog records what exists in the file; the app package in this repo records what the file is built toward. Exporting the catalog and laying it beside the package's `tables/` folder is a punch list, and like any punch list it is temporary.

It does not make SQL rename-safe. `ExecuteSQL` names table occurrences and fields, not base tables. That job belongs to `GetFieldName`, in [the data standards](./fmp-data-standards.md).

## Why the name is Target_Tables

D-043 called this table `APP_TABLES`. URITP People built it as `Target_Tables` and Michael ruled on 2026-10-23 that the built name stands (D-049). The standard follows the file rather than the other way round, because no other solution had built the catalog at all, so there was nothing to keep compatible and no reason to carry the weaker name forward.
