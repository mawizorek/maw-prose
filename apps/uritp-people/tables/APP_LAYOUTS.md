---
id: uritp-people-table-app-layouts
title: APP_LAYOUTS
type: reference
status: public
order: 90
revised: 2026-10
summary: People's record of its own layouts and its navigation menu, installed from the app catalog standard.
data:
  catalog:
    file: ../../../standards/filemaker/tables/APP_LAYOUTS.tsv
---

# APP_LAYOUTS

!!! abstract "Grain"
    One layout in `URITP People.fmp12`, keyed on FileMaker's internal layout id.

## Fields

!!! data "catalog"

## Installed, not designed here

The register above is the standard's own, read from the shelf rather than copied. What this table means and how the menu works is in [the app catalog](@fmp-app-catalog).

## In People

The menu shows the [Reconcile People window](@uritp-people-layout-reconcile) layout and whatever people-facing layouts come next. The utility layouts the import scripts use stay out of it: `import_SESSIONS`, `import_PEOPLE`, `util_PEOPLE`, `APP_TABLES`, `APP_LAYOUTS`.
