---
id: table-docz-copy
title: Copy
type: reference
status: public
order: 10
revised: Nov 2026
summary: One place a file was seen. Synced in from URITP Utilities, never typed.
data:
  catalog:
    file: DOCz_COPY.tsv
---

# Copy

!!! abstract "Grain"
    One file placement seen by a scan: drive + path.

!!! data "catalog"

## Observed, never typed

A file is content and a copy is a place (J45). Copies come in from the URITP Utilities folder scan through `sync_APP`, keyed on `xt_Key`. MAWnster never holds a hub PK. A path is always a copy, never a file, so a moved file is the same file with a new copy.

## Matching

`fk_nlFile` is set by script on `DropboxHash`, then confirmed on `Sha256` when both sides have it. Dropbox API rows only carry `DropboxHash`. An empty `fk_nlFile` is content the archive hasn't met yet.

## What the report reads from here

- `ts_LastSeen` against the drive's `FixityWindowDays`: verified or stale.
- Hashes seen on the drive outside a package's `RootPath`: displaced, not missing. Someone moved the folder.
- A hash change at the same `xt_Key` under an archival root means someone saved over a sealed file. That's a fixity alarm.

## Fields

See [DOCz_COPY.tsv](./DOCz_COPY.tsv). Every row is `{.tbc}`. Waits on Seat C for the hub's Dropbox hash field.
