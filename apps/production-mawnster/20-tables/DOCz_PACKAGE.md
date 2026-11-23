---
id: table-docz-package
title: Package
type: reference
status: public
order: 10
revised: Nov 2026
summary: A stored, sealed bundle of files. Usually one department's folder after strike.
data:
  catalog:
    file: DOCz_PACKAGE.tsv
---

# Package

!!! abstract "Grain"
    One stored, sealed bundle of files.

!!! data "catalog"

## Where it comes from

The J35 port of `ppwrk_Archive_Version_PACKAGES`. J44 cut it loose from a single version: one package can span several instances and revisions, because a lighting folder after strike holds the plot, section, hookup, Lightwright file and magic sheet together. Which revision a file is evidence for lives on [Revision File](@table-docz-revision-file), not here.

## Sealed means read-only

`ts_Sealed` is set by script the first time the package gets a [Package Drive](@table-docz-package-drive) row or a matched [Copy](@table-docz-copy). Content rows don't seal it. They're written before any file arrives.

After the seal, [Package Item](@table-docz-package-item) and [Package Content](@table-docz-package-content) rows validate only while the parent's `ts_Sealed` is empty. That's one field validation, not a privilege set. A change means a new package, with `fk_nlSupersedes` pointing at the old one. The old package and its copies stay true.

```
DOCz_PACKAGE_self_Supersedes
  DOCz_PACKAGE::fk_nlSupersedes = DOCz_PACKAGE_self_Supersedes::PrimaryKey
```

## PackageHash

One hash for the whole package, set at seal: the sorted list of `PathInPackage` + `DropboxHash` for every item, hashed. It's built on `DropboxHash` because that's the one hash every file row is guaranteed to carry. `Sha256` is empty on Dropbox-only files. One compare checks a whole drive copy, and a rename inside the package changes it.

## Name

Auto-enters from production and template set ("BC · Lighting · archival"), editable until the seal. Typed names drift.

## Fields

See [DOCz_PACKAGE.tsv](./DOCz_PACKAGE.tsv). Every row is `{.tbc}`. Ruled in J44, J45, J46.
