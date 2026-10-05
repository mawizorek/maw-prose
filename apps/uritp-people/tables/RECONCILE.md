---
id: uritp-people-table-reconcile
title: RECONCILE
type: reference
status: public
order: 70
revised: 2026-10
summary: One difference between ClickUp and FileMaker, waiting for Apply or Skip. The rows behind the review window.
data:
  catalog:
    file: RECONCILE.tsv
---

# RECONCILE

!!! abstract "Grain"
    New and Gone: one person in one session. Changed: one field of one person in one session.

## Fields

!!! data "catalog"

## Three kinds

**New** is a task ClickUp returned that PEOPLE does not have. One row per person, not per field: on a first import into an empty file every person is new, and five rows each would bury the window. Apply creates the person with every pulled field at once.

**Changed** is one field that differs. The compare uses `Exact`, because FileMaker's `=` ignores case and would call `them` and `Them` the same pronoun.

**Gone** is a person PEOPLE has that this pull did not return. It almost always means the task was deleted or moved out of the list in ClickUp. Its decision is always `Flag`: nothing in this import deletes a person.

## Decision

`Apply` or `Skip`, from the value list ReconcileDecisions; New and Changed rows start as `Apply`. Skip leaves the row unapplied in its session, and the next import will raise the same difference again if it still exists. `AppliedTimestamp` is the receipt; a filled one means the value is in PEOPLE.

## Writes go through one door

Apply writes into PEOPLE only through the `RECONCILE__PEOPLE` relationship, which allows creating PEOPLE records. See [Relationships](@uritp-people-relationships).
