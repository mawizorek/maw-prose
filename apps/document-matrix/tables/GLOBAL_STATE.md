---
id: document-matrix-table-global-state
title: GLOBAL_STATE
type: reference
status: draft
order: 60
revised: 2026-10
summary: "One-record globals table. Holds the 5 production slot pointers and transient UI state. FMP equivalent: GLOBAL_USE_VARIABLES."
data:
  catalog:
    file: GLOBAL_STATE.tsv
---

# GLOBAL_STATE

!!! abstract "Grain"
    One record, always. The slot globals and current layout context. In the FMP version this is GLOBAL_USE_VARIABLES with global fields; in D1 it is a single-row table.

## Fields

!!! data "catalog"

## The slot pattern

Five production slots, each a nullable FK to PRODUCTIONS. The matrix renders only the slotted productions as columns. "This just happens to be this year" (Michael, 10-13): the slots are a UI window, not the data. Reassigning a slot does not touch any link rows. In FMP these are global fields; in D1 they are columns on the one row.
