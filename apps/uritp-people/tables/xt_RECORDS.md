---
id: uritp-people-table-xt-records
title: xt_RECORDS
type: reference
status: public
order: 46
revised: 2026-10
summary: One external record as it was last seen. A cache that can be rebuilt; the links live elsewhere.
data:
  catalog:
    file: xt_RECORDS.tsv
---

# xt_RECORDS

!!! abstract "Grain"
    One external record: one ClickUp task, or one file in a GitHub repo.

## Fields

!!! data "catalog"

## A cache, never authored

Every row is written by a pull and can be rebuilt from the system. That is why links to FileMaker records live in [XTERNAL_JOINS](@uritp-people-table-xternal-joins): a rebuild here never loses one.

## xt_Version decides whether to look

ClickUp's date-updated (raw milliseconds) or GitHub's file sha, kept as text so it compares exactly. If a pull sees the same version it already has, it skips the record.

## The label is the only name an unadopted record has

`xt_Label` is stored so lists, finds and sorts work on it. A person typed into ClickUp on a phone has no PEOPLE record until the sync adopts them, and this label is how they are recognised until then.

## One row even if the task sits in two lists

`xt_ID` is unique. A task added to a second ClickUp list stays one row, filed under its home list.

## No payload columns

What was sent and what came back live once, in [sync_EVENTS](@uritp-people-table-sync-events).
