---
id: uritp-people
title: URITP People
type: index
status: public
summary: The FileMaker identity hub. One record per human, every way to reach them, and a generic sync layer that keeps names and contacts in step with ClickUp both ways.
revised: 2026-10
contents: auto
---

# URITP People

## What it is

`URITP People.fmp12` holds one record per human the program deals with, whether student, faculty, staff, guest artist or vendor, and every way to reach them. Venues, organizations and productions own contact cards here too, so a contact sheet can list a box office or a stage management inbox beside the people. Every other URITP file that needs a person points at a People record and restates nothing.

This page describes the schema baseline Michael set on 2026-10-23. It is the gold standard the file is built to; changes from here are made against it. Everything in this folder describes that baseline. The July 2026 as-built pass and the D-042 one-way import design were deleted on 2026-10-24 (D-054); git history holds them.

## FileMaker is canonical, and the sync runs both ways

FileMaker owns people and their contact details. ClickUp's PEOPLE list is a mirror and an intake: a person can be typed into ClickUp by name on a phone, and the next sync adopts them, creating the PEOPLE record, its contact card and the link to the task from whatever ClickUp holds.

After adoption every mirrored field follows one rule, in both directions. An edit made only in FileMaker is pushed. An edit made only in ClickUp arrives as a [sync_RECONCILE](@uritp-people-table-sync-reconcile) row for a decision, never as an overwrite. An edit made on both sides is a conflict row. FileMaker's value stands until a row is decided. The mirrored fields are the names, pronouns and status, the playbill name, the first two email addresses and the primary phone number. The [sync plan](@uritp-people-sync-plan) has the mechanics.

## The sync layer is not ClickUp-shaped

Everything about an outside system lives in tables prefixed `xt_`, and none of them is specific to ClickUp. [xt_SYSTEMS](@uritp-people-table-xt-systems) holds one row per system, ClickUp and GitHub; [xt_CONTAINERS](@uritp-people-table-xt-containers) is a list or a repo; [xt_RECORDS](@uritp-people-table-xt-records) is a cache of what the system holds; [xt_FIELDS](@uritp-people-table-xt-fields) maps the system's field ids to stable names. [XTERNAL_JOINS](@uritp-people-table-xternal-joins) is the only place a FileMaker record meets an external one. What differs between systems is confined to its `ADAPTER_<System>_` scripts.

Every run is a [sync_SESSIONS](@uritp-people-table-sync-sessions) row, every API action a [sync_EVENTS](@uritp-people-table-sync-events) row carrying exactly what was sent and what came back, and every disagreement a [sync_RECONCILE](@uritp-people-table-sync-reconcile) row. No payload, hash, count or last-pushed time is stored anywhere else.

`SYNC_Run` reads its source, container and system in one `ExecuteSQL` join, with field names built from `GetFieldName` (D-048).

## Contacts

A [CONTACTS](@uritp-people-table-contacts) card belongs to one owner through `fk_Owner`, a single key that can hold a person's, a venue's, an organization's or a production's UUID. Emails, phones and addresses hang off the card, each ordered by `sort_Index`, and the first of each is the primary. Program-wide inboxes sit on URITP's organization card; a show's stage management and production inboxes sit on that production's card.

## Productions live in another file

PRODUCTIONS is in Production MAWnster. A production's card is a CONTACTS row in this file whose `fk_Owner` is the production's UUID. The connection is made from the Production file, through an external data source pointing here; People needs nothing added for it. On a phone, both files have to be reachable together.

## Naming

`fk_<family><Thing>` names the family a key points at: `fk_v<Thing>` into VALUES, `fk_xt<Thing>` into the external layer, and every table pointing at the same thing uses the same name (D-053). `stored_` means frozen at write time. `null_` marks a nullable field.

## Documents

- People: [PEOPLE](@uritp-people-table-people), [people_STUDENTS](@uritp-people-table-people-students), [people_ADULTS](@uritp-people-table-people-adults).
- Contact owners and cards: [VENUES](@uritp-people-table-venues), [ORGANIZATIONS](@uritp-people-table-organizations), [CONTACTS](@uritp-people-table-contacts), [contact_EMAILS](@uritp-people-table-contact-emails), [contact_PHONE_NUMBERS](@uritp-people-table-contact-phone-numbers), [contact_ADDRESS](@uritp-people-table-contact-address).
- External layer: [xt_SYSTEMS](@uritp-people-table-xt-systems), [xt_CONTAINERS](@uritp-people-table-xt-containers), [xt_FIELDS](@uritp-people-table-xt-fields), [xt_RECORDS](@uritp-people-table-xt-records), [XTERNAL_JOINS](@uritp-people-table-xternal-joins).
- Sync log: [sync_SOURCES](@uritp-people-table-sync-sources), [sync_SESSIONS](@uritp-people-table-sync-sessions), [sync_EVENTS](@uritp-people-table-sync-events), [sync_RECONCILE](@uritp-people-table-sync-reconcile).
- File: [Target_Tables](@uritp-people-table-target-tables), [GLOBAL_USE](@uritp-people-table-global-use), [value_LISTS](@uritp-people-table-value-lists), [VALUES](@uritp-people-table-values).
- [Relationships](@uritp-people-relationships).
- [Sync plan](@uritp-people-sync-plan).
- [Build sheet](@uritp-people-next-build).

## Where the live file's own truth is

This folder is the standard the file is built to. What the file actually contains is machine-written from a DDR drop and lives in `apps/fmp-state/uritp-people/`: `DELTA.md` for what changed since the last drop, `STATE.md` for the whole file in one read. When this folder and that folder disagree, that folder is right about what exists and this folder is right about what was intended.

## Built, as of 2026-10-24

- `refresh | Target_Tables` installed, run clean twice: 22 base tables, 22 rows, 0 gone, 0 failing `AuditField_gaps`. All 22 `fm_BaseTableID` values seeded from the DDR (D-050).
- The external layer stands up: the ClickUp xt_SYSTEMS row, the PEOPLE container, the repointed sync_SOURCES row, and xt_FIELDS at ten rows with mapKeys typed.
- `SYNC_Action` and `SYNC_DECISION` value lists built, globals seeded, filtered `value_LIST_*` occurrences on the graph, and the `fk_v*` / `stored_*Label` pairs wired (D-051).
- `refresh | xt_fields` and `adapter | clickup_Refresh_Fields` pasted into the file, under a `sync` script folder.
- The single test PEOPLE record deleted, so the first pull starts from zero.

## Still to write

`SYNC_Run`, `ADAPTER_ClickUp_Pull` (page-0 cap first), `SYNC_Dispatch`, `PERSON_Upsert_From_xtRecord`, `RECONCILE_Apply`, `ADAPTER_ClickUp_Push`. Layouts for the sync tables beyond the table forms that exist.

## Still open

- A `sql/` custom-function family, to satisfy D-043's requirement that SQL text is built from `GetFieldName`.
- Whether this file gets a layout catalog at all, and under which name: `APP_LAYOUTS` is D-043's, `Target_Layouts` would match the table. No live counterpart to follow (D-049).
