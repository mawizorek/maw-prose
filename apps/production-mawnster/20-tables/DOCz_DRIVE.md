---
id: table-docz-drive
title: Drive
type: reference
status: public
order: 10
revised: Nov 2026
summary: One place a copy can live. Authored here, not in ClickUp.
data:
  catalog:
    file: DOCz_DRIVE.tsv
---

# Drive

!!! abstract "Grain"
    One place a copy can live: a physical drive, a Dropbox folder, a NAS share.

!!! data "catalog"

## Authored here

Drives live in FileMaker (J45). The ClickUp DRIVES list was a test skin. URITP Utilities never learns about drives. It only knows folder roots, and `RootCode` is the bridge: a copy's `xt_Key` carries its root code, and the script matches it here.

## Meaning fields

- `bool_RequiredForArchival`: the script gives this drive a [Package Drive](@table-docz-package-drive) row for every archival package, so nobody declares it by hand.
- `FixityWindowDays`: past this, a verified copy reads as stale in the report.
- `MediaKind` + `bool_Offsite`: enough for the report to flag packages short of 3-2-1 (three copies, two media kinds, one offsite). It's computed, not a field.

## Fields

See [DOCz_DRIVE.tsv](./DOCz_DRIVE.tsv). Every row is `{.tbc}`.
