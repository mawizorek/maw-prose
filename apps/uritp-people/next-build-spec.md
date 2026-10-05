---
id: uritp-people-next-build
title: URITP People build sheet
type: page
status: unlisted
revised: 2026-10
summary: What gets built in URITP People this cycle, in order. Overwritten each build cycle.
---

# URITP People build sheet

## This cycle: from scratch, with the app catalog and the ClickUp import, 2026-10-05

1. A new, empty `URITP People.fmp12`, FileMaker 19.4 or later. Nothing is carried from the July file.
2. The [app catalog](@fmp-app-catalog) first: tables APP_TABLES and APP_LAYOUTS, layouts `APP_TABLES`, `APP_LAYOUTS`, `APP_MENU`, scripts APP_CatalogRefresh, APP_GoToLayout, APP_OpenMenu in folder `00_APP`, and APP_CatalogRefresh on OnFirstWindowOpen.
3. Tables, field for field as their registers: [PEOPLE](@uritp-people-table-people), [SETTINGS](@uritp-people-table-settings), [IMPORT_SOURCES](@uritp-people-table-import-sources), [import_SESSIONS](@uritp-people-table-import-sessions), [import_PEOPLE](@uritp-people-table-import-people), [RECONCILE](@uritp-people-table-reconcile). [CONTACT_INFORMATION](@uritp-people-table-contact-information) can wait for its own pass.
4. Run APP_CatalogRefresh. Every table's `AuditGap` should be empty; anything listed there is a field missed in step 3.
5. Value lists ReconcileKinds (New, Changed, Gone) and ReconcileDecisions (Apply, Skip).
6. The [relationships](@uritp-people-relationships): `import_PEOPLE__PEOPLE`, `RECONCILE__PEOPLE` with creation allowed, `RECONCILE__import_PEOPLE`, `IMPORT_SOURCES__APP_TABLES`.
7. Layouts `import_SESSIONS`, `import_PEOPLE`, `util_PEOPLE`, and the [Reconcile People window](@uritp-people-layout-reconcile) with its restored sort. Pulled fields not enterable in Browse mode wherever people work.
8. Scripts in folder `10_IMPORT`, typed from their `.fmscript` files: RECONCILE_ShowSession, RECONCILE_SetAll, PEOPLE_Compare, PEOPLE_Apply, PEOPLE_Pull. That order, so every Perform Script finds its target.
9. Privileges: `SETTINGS::cu_APIToken` readable by Full Access only.
10. In ClickUp, FMP VIEW on the PEOPLE list set to show closed tasks.
11. One SETTINGS record holding the token. One IMPORT_SOURCES row: SourceName `PEOPLE`, FMP VIEW's API id, `fkAppTable` the PEOPLE catalog record.
12. A first import into the empty file. Every person arrives as New; Apply all, Apply. Then a count of PEOPLE against the 483 in ClickUp.
13. A second import straight after. It should say PEOPLE already matches ClickUp. If it lists anything, the compare and the apply disagree about a field.

## Next cycle

The EMAILS and PHONE NUMBERS passes into CONTACT_INFORMATION, through the same window, each with its own IMPORT_SOURCES row and its own pull script. Then the first report.

## Belongs to other files

Production roles, assignments, contact-sheet rows and printed credits; employment; enrollments; seasons and departments.
