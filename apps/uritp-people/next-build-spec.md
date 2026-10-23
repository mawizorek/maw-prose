---
id: uritp-people-next-build
title: URITP People build sheet
type: page
status: unlisted
revised: 2026-10
summary: What gets built in URITP People this cycle, in order. Overwritten each build cycle.
---

# URITP People build sheet

## Done: the schema baseline, 2026-10-23

Every table and all 28 relationships on the [README](@uritp-people) are in the file and were checked against three schema exports that day. The token lives on xt_SYSTEMS, App_Setup is gone, and a read-only test of one ClickUp view page returns 30 tasks using it. PEOPLE held a single record, so there is nothing to migrate.

## This cycle

The design for steps 2 to 7, with field ids, checkpoints and the rulings still owed, is the [sync plan](@uritp-people-sync-plan).

1. Rule on how the adapters read their source, container and system, and on Target_Tables against the D-043 app catalog. Both shape the scripts below.
2. Value lists Action (pull, push, adopt, export) and Decision (pending, fm, xt, applied).
3. The table refresh, then the field refresh for the PEOPLE container: one xt_FIELDS row per mapped field, `name` and `status` included.
4. `ADAPTER_ClickUp_Pull`: page the source's view 30 tasks at a time until `last_page` is true; upsert xt_RECORDS; skip a record whose `xt_Version` has not changed; one sync_EVENTS row per task.
5. The dispatcher and `PERSON_Upsert_From_xtRecord`. The first pull is the initial load: every ClickUp person is adopted, a PEOPLE record and a join row each. Then a count of PEOPLE against the ClickUp list.
6. A second pull straight after. Nothing should be adopted and nothing should reach sync_RECONCILE.
7. `ADAPTER_ClickUp_Push` for name, status, primary email and primary phone.
8. Layouts, built against the real data the pull brought in.
9. Field access on xt_SYSTEMS::Token for Full Access only, with the adapters running with full access privileges.

## Retired in the file

The D-042 `10_IMPORT` scripts sit in a `z_RETIRED` folder as paging reference until `ADAPTER_ClickUp_Pull` works, then go.

## Belongs to other files

PRODUCTIONS and its contact card hookup, production roles, assignments, contact-sheet rows and printed credits; employment; enrollments; seasons and departments.
