---
id: table-docz-package-drive
title: Package Drive
type: reference
status: public
order: 10
revised: Nov 2026
summary: Where a package should live. The "where" expectation, package × drive.
data:
  catalog:
    file: DOCz_PACKAGE_DRIVE.tsv
---

# Package Drive

!!! abstract "Grain"
    Package × drive. One row = this package should live on this drive, under this path.

!!! data "catalog"

## The where expectation

[Package Content](@table-docz-package-content) is what a package should hold. This is where it should live. It was named over "target" (J46) because the sync layer already uses target for a field mapping.

## Rules

- For a `bool_RequiredForArchival` drive, the script creates the row. Only the extras get declared by hand ("this one also went to the director's Dropbox").
- The first row seals the package.
- No status fields. Fulfillment is a report (J45): a script checks that each item has a [Copy](@table-docz-copy) on this drive where `PathUnderRoot` = `RootPath` + `PathInPackage`, with a matching hash. Statuses: verified · partial · missing · stale · displaced.

## Fields

See [DOCz_PACKAGE_DRIVE.tsv](./DOCz_PACKAGE_DRIVE.tsv). Every row is `{.tbc}`.
