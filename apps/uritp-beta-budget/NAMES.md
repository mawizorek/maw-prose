---
id: budget-names
title: Names
type: reference
status: hidden
order: 20
nav: collapsed
revised: 2026-10
summary: Every table name, written once. Nothing here is approved yet.
data:
  catalog:
    file: NAMES.tsv
---

# Names

!!! warning "Sketch. Nothing on this page is approved."
    `proposed` is Fiona's provisional pass from the Gold Standard Schema. `status` says what would happen to each table, not what has been decided.

!!! data "catalog"

## The rule

- **A name is written in one row.** Notes cite the `key` (`t.yearconfig`), never the spelling.
- **Keys never change.** Rename = edit `current` here. Retire = set `status`. Nothing else moves.
- **Fields are not listed here.** [STATE](../fmp-state/uritp-budget/STATE.md) already lists every field, regenerated on each DDR drop. Notes record only what STATE can't: grain, rules, rulings.
- A table gets a field sheet (`20-tables/<key>.tsv`) only once it's approved, and a page only if it carries a rule nobody would guess.

## Until the renderer resolves keys

The hub page still spells names out, because nothing renders `t.yearconfig` back into a name yet. After a rename pass: update `current` here, then search the folder for the old spelling. The DDR's DELTA lists every rename, so the search list writes itself.
