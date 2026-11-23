---
id: table-docz-package-item
title: Package Item
type: reference
status: public
order: 10
revised: Nov 2026
summary: One file inside one package.
data:
  catalog:
    file: DOCz_PACKAGE_ITEM.tsv
---

# Package Item

!!! abstract "Grain"
    One file inside one [Package](@table-docz-package).

!!! data "catalog"

## Where it comes from

The J35 port of `ppwrk_Archive_Version_PACKAGE_PARTS`. J36 ruled that parts stop holding container files and become a join: package → file record, with label and sort. This is that join.

## Rules

- The same file can sit in several packages. That's one file record with several items.
- `PathInPackage` is unique within a package. It's half of what `PackageHash` hashes.
- Items validate only while the package's `ts_Sealed` is empty.
- The seal-a-folder script skips junk: `.DS_Store`, Lightwright autosaves, Vectorworks backups. Otherwise every package hash includes garbage.

## Fields

See [DOCz_PACKAGE_ITEM.tsv](./DOCz_PACKAGE_ITEM.tsv). Every row is `{.tbc}`.
