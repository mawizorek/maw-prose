---
id: uritp-people-table-global-use
title: GLOBAL_USE
type: reference
status: public
order: 70
revised: 2026-10
summary: The file's one-record table of interface globals.
data:
  catalog:
    file: GLOBAL_USE.tsv
---

# GLOBAL_USE

!!! abstract "Grain"
    The file. Exactly one record, enforced by the UNIQUE field.

## Fields

!!! data "catalog"

## For the interface only

`gCur_PERSON` holds whichever person a layout has selected. No script reads it as a key, because a global resets per session on a hosted file.
