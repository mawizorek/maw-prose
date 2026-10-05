---
id: uritp-people-table-settings
title: SETTINGS
type: reference
status: public
order: 40
revised: 2026-10
summary: The ClickUp API token and the id of the view each import reads. One record, ever.
data:
  catalog:
    file: SETTINGS.tsv
---

# SETTINGS

!!! abstract "Grain"
    The file. Exactly one record.

## Fields

!!! data "catalog"

## One record, read by SQL

The import reads this table with `ExecuteSQL`, so no script has to visit a layout to get the token. Two records return two tokens on two lines, and the import refuses to run rather than guess.

## The token is a password

`cu_APIToken` is a personal ClickUp API token, the one that starts `pk_`. Anyone holding it can read and write the whole workspace as its owner. It never goes into a script, a clone, an export or this repo. Create it in ClickUp under Settings ▸ Apps.

## The view id is not the number on screen

`cu_PeopleViewID` is the view id the ClickUp API expects, which is the segment of the view's URL after `/v/l/` (or `/v/li/`), not the id ClickUp shows in its own interface. A wrong id comes back as an error on the first page and the import stops there.
