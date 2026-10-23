---
id: uritp-people-table-sync-sources
title: sync_SOURCES
type: reference
status: public
order: 50
revised: 2026-10
summary: One saved pull, a ClickUp view or a GitHub path inside one container.
data:
  catalog:
    file: sync_SOURCES.tsv
---

# sync_SOURCES

!!! abstract "Grain"
    One way of pulling one container. Not one run: those are [sync_SESSIONS](@uritp-people-table-sync-sessions).

## Fields

!!! data "catalog"

## A container can have several

The PEOPLE list can be pulled through an Active view and an Alumni view. Each is its own source pointing at the same container, so the records land in one place either way.

## The view path is the contract

`xt_ViewPath` holds a ClickUp view id or a GitHub file path. The view's filters decide who counts as everyone.
