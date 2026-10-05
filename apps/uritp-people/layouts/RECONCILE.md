---
id: uritp-people-layout-reconcile
title: Reconcile People window
type: reference
status: public
order: 10
revised: 2026-10
summary: The review window the import opens. One row per difference, ClickUp beside FileMaker, Apply or Skip, then one button writes it.
---

# Reconcile People window

Layout `RECONCILE`, based on the `RECONCILE` occurrence, list view. [PEOPLE_Pull](@uritp-people-script-people-pull) opens it in a new document window named Reconcile People, already found to the current session and sorted.

## The row

Left to right: Kind, PersonName, FieldName, FMP_Value, CU_Value, Decision. Decision is a two-button radio set on ReconcileDecisions. FMP_Value and CU_Value sit side by side at the same width so the eye can run down the difference, the way Lightwright lays out its Vectorworks reconcile.

Conditional formatting does the rest of the reading. A row with `AppliedTimestamp` filled goes grey. A Gone row goes amber, and its Decision field is not enterable in Browse mode, so Flag cannot be changed to Apply.

## Sort

Kind by the ReconcileKinds value list (New, Changed, Gone), then PersonName, then FieldName. Save it as the layout's restored sort for `Sort Records [ Restore ]` in the pull.

## Header buttons

- Apply all: `RECONCILE_SetAll` with parameter `Apply`.
- Skip all: `RECONCILE_SetAll` with parameter `Skip`.
- Apply: `PEOPLE_Apply`. It asks once before writing.
- Close: `Close Window [ Current Window ]`. Closing writes nothing; the rows stay in their session.

## Utility layouts

The scripts also need `import_SESSIONS`, `import_PEOPLE` and `util_PEOPLE` (on the PEOPLE occurrence). None of them is for people to work in; a bare form with the fields on it is enough.
