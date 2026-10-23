---
id: uritp-people-table-settings
title: SETTINGS (D-042, superseded)
type: reference
status: hidden
order: 40
revised: 2026-10
summary: Superseded. The ClickUp API token every import uses. One record, ever.
data:
  catalog:
    file: SETTINGS.tsv
---

# SETTINGS (D-042, superseded)

!!! warning "Superseded"
    D-042's design, replaced by the 2026-10-23 schema baseline. Current page: [xt_SYSTEMS](@uritp-people-table-xt-systems). Kept for its reasoning; do not build against it.

!!! abstract "Grain"
    The file. Exactly one record.

## Fields

!!! data "catalog"

## One record, read by SQL

The imports read this table with `ExecuteSQL`, so no script has to visit a layout to get the token. Two records return two tokens on two lines, and the import refuses to run rather than guess.

## The token is a password

`cu_APIToken` is a personal ClickUp API token, the one that starts `pk_`. Anyone holding it can read and write the whole workspace as its owner. It never goes into a script, a clone, an export or this repo. Create it in ClickUp under Settings ▸ Apps.

## View ids live elsewhere

Which ClickUp view each import reads is one row per view in [IMPORT_SOURCES](@uritp-people-table-import-sources). This table holds only what every import shares.
