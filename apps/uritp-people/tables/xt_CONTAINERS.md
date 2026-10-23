---
id: uritp-people-table-xt-containers
title: xt_CONTAINERS
type: reference
status: public
order: 42
revised: 2026-10
summary: One place external records live, a ClickUp list or a GitHub repo, and which FileMaker table its records become.
data:
  catalog:
    file: xt_CONTAINERS.tsv
---

# xt_CONTAINERS

!!! abstract "Grain"
    One container in one system: the ClickUp PEOPLE list, or one GitHub repo.

## Fields

!!! data "catalog"

## The container decides the table

`fk_TargetTable` points at the [Target_Tables](@uritp-people-table-target-tables) row for the FileMaker table this container's records become. The dispatcher routes on that row's internal table id, so renaming a FileMaker table never breaks a sync.

## GitHub paths are conventions

For a repo, `xt_ID` is `owner/repo`. Branch and file path are set by the export script that writes there, not stored here.
