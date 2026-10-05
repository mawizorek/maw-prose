---
id: uritp-people-script-people-apply
title: PEOPLE_Apply
type: reference
status: public
order: 30
revised: 2026-10
summary: The Apply button. The only script that writes PEOPLE, and only for rows marked Apply, after one confirmation.
---

# PEOPLE_Apply

Copy target: `PEOPLE_Apply.fmscript`, folder `10_IMPORT`. Runs from the [Reconcile People window](@uritp-people-layout-reconcile).

## One door

Every write goes across `RECONCILE__PEOPLE`, the one relationship that allows creating PEOPLE records. A New row sets `cu_TaskID` across it first, which creates the person, then fills every pulled field from the staged row. A Changed row sets one field by name. Nothing here deletes, and Gone rows never match the find because their decision is Flag.

## Safe to press twice

It only finds rows that are marked Apply and have no `AppliedTimestamp`. A second press after a full apply finds nothing and says so.

## A failed row stays unapplied

If a commit fails, the row is reverted, its timestamp stays empty, and it is named in the closing dialog. Fix the cause and press Apply again; only the failures are retried.

## Needs RECONCILE_ShowSession

After writing, the window goes back to showing the whole session through `RECONCILE_ShowSession`, so applied rows stay visible in grey instead of vanishing.
