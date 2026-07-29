---
title: Vectorworks Standards
type: standard
package: vectorworks
domain: theatre
department: all
role: designer
audience: designers-and-drafters
status: active
last_verified: 2026-07-16
---

# Vectorworks Standards

**Package #1** in `maw-prose`. Migrated 2026-07-29 from `ClickUp_apps/Vectorworks/`, where it was authored 2026-07-16.

> **Note on `last_verified`.** Every file in this package carries **2026-07-16** — the date the content was actually decided and checked. The migration on 2026-07-29 moved bytes; it did not re-verify Vectorworks behaviour. **Copying a file is not verifying it**, and the field would be a lie if it said otherwise.

---

## The standards

Six adopted standards, each in its own file, each with a decision behind it in [`DECISIONS.md`](../../DECISIONS.md).

| | Standard | What it settles | Decision |
|---|---|---|---|
| **S-1** | [Layers and classes](./s-01-layers-and-classes.md) | Layers carry location, department, and elevation. Classes carry object category. | D-012 |
| **S-2** | [Master-file reference model](./s-02-master-file-reference-model.md) | One dense master; department files reference it rather than copying geometry. | D-011 |
| **S-3** | [Origin and datum](./s-03-origin-and-datum.md) | Room-center, coincident with the internal origin. | D-013 |
| **S-4** | [Datums and reference planes](./s-04-datums-and-reference-planes.md) | Document the rule, never the numbers. | D-014 |
| **S-5** | [Direction of truth](./s-05-direction-of-truth.md) | Git is the plan, Vectorworks is the realization, export is reconciliation. | D-015 |
| **S-6** | [File formats](./s-06-file-formats.md) | Markdown for prose, comma-CSV for manifests. | D-016 |

**Read S-5 first if you read only one.** It governs the direction every other standard points, and it generalizes past Vectorworks entirely — it is the same shape as the records-versus-source split that decides what belongs in FileMaker and what belongs in this repo.

---

## What is NOT here yet

Deliberately incomplete, and the gaps are named rather than hidden:

- **Research findings F-001..F-016** — the sourced research these standards were distilled from, every claim carrying a vendor link and a confidence rating. Still in `ClickUp_apps/Vectorworks/VWX-BEST-PRACTICES.md`.
- **The Smith Theatre package** — the first real venue instance. Belongs in `venues/smith-theatre/` under this tree's architecture, not under `standards/`, because it answers *what is true about this room* rather than *what is correct practice*.
- **The template skeleton (`_TEMPLATE/`)** — a real, working, cloneable package skeleton. It **conflicts with a rule in [`TREE.md`](../../TREE.md)** that says this repo gets no `_TEMPLATE/`. That rule was written before anyone looked at what the Vectorworks template actually contains, and it needs settling rather than quietly winning.
- **`BUILD-PLAN.md`** — the one-page build-from artifact.

---

## Status of the underlying project

**Phase 2 of 6 — building the Smith Theatre base file from the authored plan.** Stalled since 2026-07-16 on three rulings: the object-class tree (D-023), promoting the sheet-numbering scheme to a Standard (D-022), and locking the house layer list (D-020).

**Nothing in this package is blocked by that.** The six standards are adopted and stable; the open items are the *next* layer of specificity.

---

## Scope

These standards are **org-agnostic** (D-016). They govern any Vectorworks file, not only URITP or Smith Theatre — those are simply the first users. That was a deliberate call at authoring time and it is what makes this package portable.
