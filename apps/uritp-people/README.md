---
id: uritp-people
title: URITP People
status: public
type: index
summary: The FileMaker identity hub. One record per human, pulled one way from ClickUp, plus every way to reach them.
revised: 2026-10
contents: auto
---

# URITP People

## What it is

`URITP People.fmp12` holds one record per human the program deals with, whether student, faculty, staff, guest artist or vendor, and the ways to reach them. Every other URITP file that needs a person points at a People record. None of them restates a name, a pronoun or an email.

It is not where people get edited. ClickUp is. The PEOPLE list in the URITP CRM space is the source of truth, and an import in this file brings it across one way. Nothing in People writes back to ClickUp, so a change typed into FileMaker is a change the next import offers to overwrite. Fix the person in ClickUp; every person record carries a button that opens their task.

## How the import works

One button pulls the ClickUp view into a holding table and compares it with PEOPLE. Nothing in PEOPLE changes yet. A review window, modelled on Lightwright's Vectorworks reconcile, lists every difference: people who are new, single fields that changed, and people FileMaker has that the pull did not return. Each row is marked Apply or Skip. ClickUp always wins, so the choice is never which value is right, only whether to take it now. Apply writes the marked rows; gone people are flagged and never deleted.

Every record is matched on its native ClickUp task id and nothing else. The CRM custom id is never used. Which ClickUp view each import reads is a row in IMPORT_SOURCES, never a global and never a value typed into a script.

## The app catalog

People carries the cross-app [app catalog](@fmp-app-catalog): a generated record of its own tables and layouts, which is also its navigation menu and its check that every table has the standard key and audit fields.

## Where the data comes from

- CRM ▸ PEOPLE ▸ PEOPLE, task type Person, lands in [PEOPLE](@uritp-people-table-people).
- CRM ▸ CONTACT INFO ▸ EMAILS and ▸ PHONE NUMBERS land in [CONTACT_INFORMATION](@uritp-people-table-contact-information).

The ClickUp API hands back a related record as a bare task id, never as a nested object, so a person's emails exist in FileMaker only after the EMAILS list itself has been pulled. Once both tables are local, the graph walks from a contact sheet to a person to an email with no script and no stored copy. See [Relationships](@uritp-people-relationships).

On 2026-10-05 the lists held 483 PEOPLE rows counting closed ones, 453 EMAILS and 150 PHONE NUMBERS. Those numbers are here for scale and go stale.

## What does not live here

A person's relationship to anything with its own lifecycle lives in the file that owns that thing. Production roles, contact-sheet rows and printed credits belong to the production side; employment belongs to Labour; enrollments to Courses; seasons and departments to Global Setup. The Bible and the playbill both read People for names and contact details, but neither is a People report.

## Documents

- [PEOPLE](@uritp-people-table-people): one human.
- [CONTACT_INFORMATION](@uritp-people-table-contact-information): one email address or one phone number.
- [SETTINGS](@uritp-people-table-settings): the ClickUp token.
- [IMPORT_SOURCES](@uritp-people-table-import-sources): one ClickUp view an import reads.
- [import_SESSIONS](@uritp-people-table-import-sessions): one press of an import button.
- [import_PEOPLE](@uritp-people-table-import-people): one person as one pull saw them.
- [RECONCILE](@uritp-people-table-reconcile): one difference waiting for a decision.
- [APP_TABLES](@uritp-people-table-app-tables) and [APP_LAYOUTS](@uritp-people-table-app-layouts): the catalog, installed from the standard.
- [Relationships](@uritp-people-relationships).
- [Reconcile People window](@uritp-people-layout-reconcile).
- Scripts, folder `10_IMPORT`: [PEOPLE_Pull](@uritp-people-script-people-pull), [PEOPLE_Compare](@uritp-people-script-people-compare), [PEOPLE_Apply](@uritp-people-script-people-apply), [RECONCILE_SetAll and RECONCILE_ShowSession](@uritp-people-script-reconcile-setall). Folder `00_APP` is the catalog's, typed from the standard.
- [Build sheet](@uritp-people-next-build).

## Not written yet

- The EMAILS and PHONE NUMBERS passes. They reuse the same window, the same RECONCILE table and their own IMPORT_SOURCES rows.
- `value-lists/`: the email type labels and the two reconcile lists.
- How a person's name prints in a program. ClickUp PEOPLE has legal first name, last name and an alternate name; it has no preferred name and no playbill name, so a printed-credit name has nowhere to come from yet.
- Student and non-student classification.

## Superseded

Everything in this folder without a page header is the July 2026 as-built pass: `INDEX.md`, `schema/`, `meta/`, `layouts/README.md`, `tables/README.md` and `tables/_index.json`. The July table notes for ADULTS_ext, STUDENTS_ext, GRADUATION_CLASSES, Emails and PhoneNumbers sit in `meta/`. Superseded by D-042. Kept for its reasoning; do not build against it.
