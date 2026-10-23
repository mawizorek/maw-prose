---
id: uritp-people
title: URITP People
type: index
status: public
summary: The FileMaker identity hub. One record per human, every way to reach them, and a generic sync layer that mirrors names and primary contacts to ClickUp.
revised: 2026-10
contents: auto
---

# URITP People

## What it is

`URITP People.fmp12` holds one record per human the program deals with, whether student, faculty, staff, guest artist or vendor, and every way to reach them. Venues, organizations and productions own contact cards here too, so a contact sheet can list a box office or a stage management inbox beside the people. Every other URITP file that needs a person points at a People record and restates nothing.

This page describes the schema baseline Michael set on 2026-10-23. It is the gold standard the file is built to; changes from here are made against it.

## FileMaker is canonical

FileMaker owns people and their contact details. ClickUp's PEOPLE list is a mirror and an intake: a person can be typed into ClickUp by name on a phone, and the next sync adopts them, creating the PEOPLE record and linking it to the task. After adoption FileMaker wins. A name or status that differs in ClickUp arrives as a row for a decision, never as an overwrite. Emails and phone numbers are FileMaker's alone: the primary of each is pushed to the task's Primary Email and Phone Number fields and nothing is ever pulled back.

## The sync layer is not ClickUp-shaped

Everything about an outside system lives in tables prefixed `xt_`, and none of them is specific to ClickUp. [xt_SYSTEMS](@uritp-people-table-xt-systems) holds one row per system, ClickUp and GitHub; [xt_CONTAINERS](@uritp-people-table-xt-containers) is a list or a repo; [xt_RECORDS](@uritp-people-table-xt-records) is a cache of what the system holds; [xt_FIELDS](@uritp-people-table-xt-fields) maps the system's field ids to stable names. [XTERNAL_JOINS](@uritp-people-table-xternal-joins) is the only place a FileMaker record meets an external one. What differs between systems is confined to its `ADAPTER_<System>_` scripts.

Every run is a [sync_SESSIONS](@uritp-people-table-sync-sessions) row, every API action a [sync_EVENTS](@uritp-people-table-sync-events) row carrying exactly what was sent and what came back, and every disagreement a [sync_RECONCILE](@uritp-people-table-sync-reconcile) row. No payload, hash, count or last-pushed time is stored anywhere else.

## Contacts

A [CONTACTS](@uritp-people-table-contacts) card belongs to one owner through `fk_Owner`, a single key that can hold a person's, a venue's, an organization's or a production's UUID. Emails, phones and addresses hang off the card, each ordered by `sort_Index`, and the first of each is the primary. Program-wide inboxes sit on URITP's organization card; a show's stage management and production inboxes sit on that production's card.

## Productions live in another file

PRODUCTIONS is in Production MAWnster. A production's card is a CONTACTS row in this file whose `fk_Owner` is the production's UUID. The connection is made from the Production file, through an external data source pointing here; People needs nothing added for it. On a phone, both files have to be reachable together.

## Documents

- People: [PEOPLE](@uritp-people-table-people), [people_STUDENTS](@uritp-people-table-people-students), [people_ADULTS](@uritp-people-table-people-adults).
- Contact owners and cards: [VENUES](@uritp-people-table-venues), [ORGANIZATIONS](@uritp-people-table-organizations), [CONTACTS](@uritp-people-table-contacts), [contact_EMAILS](@uritp-people-table-contact-emails), [contact_PHONE_NUMBERS](@uritp-people-table-contact-phone-numbers), [contact_ADDRESS](@uritp-people-table-contact-address).
- External layer: [xt_SYSTEMS](@uritp-people-table-xt-systems), [xt_CONTAINERS](@uritp-people-table-xt-containers), [xt_FIELDS](@uritp-people-table-xt-fields), [xt_RECORDS](@uritp-people-table-xt-records), [XTERNAL_JOINS](@uritp-people-table-xternal-joins).
- Sync log: [sync_SOURCES](@uritp-people-table-sync-sources), [sync_SESSIONS](@uritp-people-table-sync-sessions), [sync_EVENTS](@uritp-people-table-sync-events), [sync_RECONCILE](@uritp-people-table-sync-reconcile).
- File: [Target_Tables](@uritp-people-table-target-tables), [GLOBAL_USE](@uritp-people-table-global-use), [value_LISTS](@uritp-people-table-value-lists), [VALUES](@uritp-people-table-values).
- [Relationships](@uritp-people-relationships).
- [Build sheet](@uritp-people-next-build).

## Not written yet

- Scripts for the baseline: the table refresh, the field refresh, `ADAPTER_ClickUp_Pull` and `_Push`, the dispatcher and the person handler. The pages in `scripts/` today are D-042's import scripts.
- Layouts for the baseline.
- Value lists Action and Decision.

## Not decided yet

- How the adapters read their source, container and system: one ExecuteSQL join into variables, with the graph kept for layouts, or relationships from a layout on `sync_SOURCES_fxtContainers`. D-043 already builds SQL text from `GetFieldName`, which removes the rename risk of the first.
- [Target_Tables](@uritp-people-table-target-tables) against the D-043 app catalog, APP_TABLES and APP_LAYOUTS.
- Whether `stored_NameDisplayInPlaybills` drops its `stored_` prefix.

## Superseded

The D-042 design of 2026-10-05, ClickUp as the source of truth with a one-way import through import_PEOPLE and RECONCILE, is superseded by this baseline. Its table notes, the old PEOPLE register and the old relationships page are in `meta/` marked superseded. The `10_IMPORT` script pages and the Reconcile People window page are D-042's and are not built against.

Everything in this folder without a page header is the July 2026 as-built pass: `INDEX.md`, `schema/`, `meta/design-decisions.md`, `layouts/README.md`, `tables/README.md` and `tables/_index.json`. Kept for its reasoning; do not build against it.
