---
id: uritp-people-table-value-lists
title: value_LISTS
type: reference
status: public
order: 80
revised: 2026-10
summary: The lists whose values are kept as data, and the globals that pick which list a value-list occurrence shows.
data:
  catalog:
    file: value_LISTS.tsv
---

# value_LISTS

!!! abstract "Grain"
    One named list, such as contact labels or person status. Its values are rows in [VALUES](@uritp-people-table-values).

## Fields

!!! data "catalog"

## The globals drive filtered occurrences

Each global holds one list's key and feeds one table occurrence of VALUES, which a FileMaker value list then reads. Adding a value is a new VALUES row, never a schema change.
