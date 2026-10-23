---
id: uritp-people-table-sync-reconcile
title: sync_RECONCILE
type: reference
status: public
order: 56
revised: 2026-10
summary: One field that differs between FileMaker and the external system, waiting for a decision.
data:
  catalog:
    file: sync_RECONCILE.tsv
---

# sync_RECONCILE

!!! abstract "Grain"
    One field of one external record that differs from FileMaker, in one session.

## Fields

!!! data "catalog"

## A decision, not an overwrite

FileMaker is canonical, so a difference never applies itself. `Decision` starts at pending and is set to keep FileMaker's value, take the external one, or applied. The time it was decided is the modification timestamp.

## The person is reached, never copied

There is no name or task id on the row. The person is found through [xt_RECORDS](@uritp-people-table-xt-records), [XTERNAL_JOINS](@uritp-people-table-xternal-joins) and [PEOPLE](@uritp-people-table-people).

## Contact values never land here

Emails and phones are FileMaker's and only ever pushed, so a difference in them is fixed by the next push, not reconciled.
