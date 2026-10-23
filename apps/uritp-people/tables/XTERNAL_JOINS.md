---
id: uritp-people-table-xternal-joins
title: XTERNAL_JOINS
type: reference
status: public
order: 48
revised: 2026-10
summary: One link between one FileMaker record and one external record. The only place a person meets their ClickUp task.
data:
  catalog:
    file: XTERNAL_JOINS.tsv
---

# XTERNAL_JOINS

!!! abstract "Grain"
    One FileMaker record linked to one external record.

## Fields

!!! data "catalog"

## Authored, so it survives

[xt_RECORDS](@uritp-people-table-xt-records) can be thrown away and pulled again. These rows are made by adoption and never by a pull, so the link between a person and their task outlives any rebuild of the cache.

## One external record, one FileMaker record

`fk_xtRecord` is unique and strict. A task cannot be linked to two people.

## No table name beside the key

`fk_SourceRecord` holds a FileMaker UUID, unique across the file, so the join needs no column saying which table it points at. The kind of record is known from the container's target table.
