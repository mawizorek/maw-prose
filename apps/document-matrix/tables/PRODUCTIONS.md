---
id: document-matrix-table-productions
title: PRODUCTIONS
type: reference
status: draft
order: 20
revised: 2026-10
summary: One show, one season, one entity that documents get linked to.
data:
  catalog:
    file: PRODUCTIONS.tsv
---

# PRODUCTIONS

!!! abstract "Grain"
    One production. "Big Love F26" is one record. A production appears as a column in the matrix when it occupies a slot in [GLOBAL_STATE](@document-matrix-table-global-state).

## Fields

!!! data "catalog"

## Active vs inactive

IsActive controls whether a production appears in the slot dropdown. Inactive productions keep their link rows and references; they just stop being selectable for the current view. Annual rollover sets last year's shows to inactive and creates fresh rows for the new season.
