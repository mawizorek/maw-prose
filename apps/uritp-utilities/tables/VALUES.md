---
id: uritp-utilities-table-values
title: VALUES
status: public
type: reference
summary: Seeded engine vocabulary values keyed by list and stable code, with labels reserved for display.
order: 90
revised: 2026-11
data:
  catalog:
    file: VALUES.tsv
---

# VALUES

!!! abstract "Grain"
    One declared engine value within a vocabulary list.

## Fields

!!! data "catalog"

## A code is unique within its list

`fk_List` identifies [value_LISTS](@uritp-utilities-table-value-lists). `Code` is nonempty, strictly validated and restricted to lowercase letters, digits and underscores. `uniq_ListCode` stores `fk_List` plus a vertical bar plus Code, with unique validation. Values in different lists can therefore reuse a code without conflating identities.

## Seed, never manual entry

The vocabulary seed is the only declaration of value codes and upserts them in their list scope. `Name` is display text; `sort_Index` controls menu order. Scripts never branch on Name. Event writers snapshot the label into their event row.

`bool_isStatusList` does not belong in this file. It describes People's interface rather than shared engine vocabulary. Exact seed members are not invented by this register; they must match the seed script's declared JSON.
