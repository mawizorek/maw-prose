---
id: table-docz-package-content
title: Package Content
type: reference
status: public
order: 10
revised: Nov 2026
summary: What a package should hold. The "what" expectation, package × instance.
data:
  catalog:
    file: DOCz_PACKAGE_CONTENT.tsv
---

# Package Content

!!! abstract "Grain"
    Package × instance. One row = this package should carry this document.

!!! data "catalog"

## Two expectations

A package carries two kinds of expectation (J45). This table is the **what**: the documents it should hold, stated before any file arrives. [Package Drive](@table-docz-package-drive) is the **where**.

## Defaults from Template Sets

When a package is made from a Template Set (Lighting · archival), its rows copy in from the set's items, `RevisionOwed` included. Rows can be added or dropped until the seal. Template Sets live in MAWnster (J46). Until `ppwrk_Archive_TEMPLATE_SETS` / `TEMPLATE_SET_ITEMS` port, rows are typed by hand and `fk_nlTemplateSetItem` stays empty.

On a one-act bill, the template decides whether a document is one instance per production or one per piece (J46).

## The contents check

Passes when every `bool_Required` row has a [Package Item](@table-docz-package-item) whose file is evidence ([Revision File](@table-docz-revision-file)) for that instance's `RevisionOwed`. It's a report, not a stored status (J45). A missing magic sheet shows up the moment the package exists.

## Fields

See [DOCz_PACKAGE_CONTENT.tsv](./DOCz_PACKAGE_CONTENT.tsv). Every row is `{.tbc}`.
