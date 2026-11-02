---
id: uritp-utilities-table-value-lists
title: value_LISTS
status: public
type: reference
summary: Immutable engine-list codes with freely renamable labels, without People-domain globals.
order: 80
revised: 2026-11
data:
  catalog:
    file: value_LISTS.tsv
---

# value_LISTS

!!! abstract "Grain"
    One engine vocabulary list, such as sync_action or sync_decision.

## Fields

!!! data "catalog"

## The seed owns declarations

The Utilities vocabulary seed upserts lists by immutable `Code`. Code uses lowercase letters, digits and underscores and is strictly unique. `Name` is only a label. Seed is safe to rerun, never deletes or renames, and is the single declaration of supported engine codes.

[VALUES](@uritp-utilities-table-values) supplies the list's members through `fk_List`. The foreign key remains a local UUID; scripts resolve it from the stable list code rather than requiring typed labels.

## No People interface globals

The Utilities copy excludes `gV_ContactLabels`, `gV_GraduationYearLabels`, `gS_Person`, `gV_AcademicLevel` and `gV_ClassStanding`. They describe People's UI, not the shared engine.
