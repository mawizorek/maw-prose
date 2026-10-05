---
id: uritp-people-table-import-sessions
title: import_SESSIONS
type: reference
status: public
order: 50
revised: 2026-10
summary: One press of the import button. When, who, which view, how many, and what went wrong.
data:
  catalog:
    file: import_SESSIONS.tsv
---

# import_SESSIONS

!!! abstract "Grain"
    One press of Import from ClickUp, whether it finished or not.

## Fields

!!! data "catalog"

## Append-only

A session is never edited after its import finishes and never deleted. When and who come from the audit fields, so there is no separate started-at field. A session with `ErrorText` filled stopped partway; whatever it staged before the failure is still in [import_PEOPLE](@uritp-people-table-import-people) and was never compared.

## The counts are a receipt

`CountPulled` is how many tasks ClickUp returned. `CountNew`, `CountChanged` and `CountGone` are how many review rows the compare wrote. `CountChanged` counts fields, not people: one person with a new last name and new pronouns is two.
