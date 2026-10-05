---
id: uritp-people-next-build
title: URITP People build sheet
type: page
status: unlisted
revised: 2026-10
summary: What gets built in URITP People this cycle, in order. Overwritten each build cycle.
---

# URITP People build sheet

## This cycle: from scratch, with the ClickUp import, 2026-10-05

1. A new, empty `URITP People.fmp12`, FileMaker 18 or later. Nothing is carried from the July file.
2. Tables, field for field as their registers: [PEOPLE](@uritp-people-table-people), [SETTINGS](@uritp-people-table-settings), [import_SESSIONS](@uritp-people-table-import-sessions), [import_PEOPLE](@uritp-people-table-import-people), [RECONCILE](@uritp-people-table-reconcile). [CONTACT_INFORMATION](@uritp-people-table-contact-information) can wait for its own pass.
3. Value lists ReconcileKinds (New, Changed, Gone) and ReconcileDecisions (Apply, Skip).
4. The [relationships](@uritp-people-relationships): `import_PEOPLE__PEOPLE`, `RECONCILE__PEOPLE` with creation allowed, `RECONCILE__import_PEOPLE`.
5. Layouts `import_SESSIONS`, `import_PEOPLE`, `util_PEOPLE`, and the [Reconcile People window](@uritp-people-layout-reconcile) with its restored sort.
6. Scripts in folder `10_IMPORT`, typed from their `.fmscript` files: RECONCILE_ShowSession, RECONCILE_SetAll, PEOPLE_Compare, PEOPLE_Apply, PEOPLE_Pull. That order, so every Perform Script finds its target.
7. In ClickUp, FMP VIEW on the PEOPLE list set to show closed tasks.
8. One SETTINGS record: the token, and FMP VIEW's API id.
9. A first import into the empty file. Every person arrives as New; Apply all, Apply. Then a count of PEOPLE against the 483 in ClickUp.
10. A second import straight after. It should say PEOPLE already matches ClickUp. If it lists anything, the compare and the apply disagree about a field.

## Next cycle

The EMAILS and PHONE NUMBERS passes into CONTACT_INFORMATION, through the same window. Then the first report.

## Belongs to other files

Production roles, assignments, contact-sheet rows and printed credits; employment; enrollments; seasons and departments.
