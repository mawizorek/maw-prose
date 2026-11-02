---
id: uritp-utilities-table-xt-containers
title: xt_CONTAINERS
status: public
type: reference
summary: External lists and repositories mirrored by the hub, with no back-reference to app tables.
order: 20
revised: 2026-11
data:
  catalog:
    file: xt_CONTAINERS.tsv
---

# xt_CONTAINERS

!!! abstract "Grain"
    One external container: a ClickUp List or a GitHub repository.

## Fields

!!! data "catalog"

## Arrows point toward the hub

`fk_System` identifies the [external system](@uritp-utilities-table-xt-systems). `xt_ID` identifies the remote container: a ClickUp List ID or GitHub owner/repo. A consuming app subscribes through its local Target_Tables using the external container identity.

There is no `fk_TargetTable` here. Keeping that People field in the Utilities copy would make the hub depend on a consuming app, violating J20.

## Labels are not subscriptions

`Name` is display text. It is never the value a script matches to choose a container. `isActive` is a 0/1 switch; it is not a claim that the remote source is available or that a run succeeded.
