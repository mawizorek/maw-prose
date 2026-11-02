---
id: uritp-utilities-table-sync-sources
title: sync_SOURCES
status: public
type: reference
summary: The external view or path feeding a mirrored container.
order: 30
revised: 2026-11
data:
  catalog:
    file: sync_SOURCES.tsv
---

# sync_SOURCES

!!! abstract "Grain"
    One configured view or path feeding an external container.

## Fields

!!! data "catalog"

## Runs start from subscriptions

`fk_Container` points at [xt_CONTAINERS](@uritp-utilities-table-xt-containers). `xt_ViewPath` holds the ClickUp view ID or GitHub file path. `Name` is a label, never a script parameter used to find the source. Each consuming app's active subscriptions drive the run.

## Closed tasks must remain visible

The ClickUp source view must include closed tasks. Otherwise closing a person hides them from the pull and can be misread as deletion. A source filter is part of the transport contract, not merely a convenient screen setting.
