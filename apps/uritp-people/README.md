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

It is not where people get edited. ClickUp is. The PEOPLE list in the URITP CRM space is the source of truth, and a button script in this file pulls it one way. Nothing in People writes back to ClickUp, so a change typed into FileMaker is a change the next pull erases. Fix the person in ClickUp.

## Where the data comes from

Three ClickUp lists, three pulls, two tables:

- CRM ▸ PEOPLE ▸ PEOPLE, task type Person, lands in [PEOPLE](@uritp-people-table-people).
- CRM ▸ CONTACT INFO ▸ EMAILS lands in [CONTACT_INFORMATION](@uritp-people-table-contact-information).
- CRM ▸ CONTACT INFO ▸ PHONE NUMBERS lands in the same table.

Every record is matched on its native ClickUp task id. The ClickUp API hands back a related record as a bare task id, never as a nested object, so a person's emails exist in FileMaker only after the EMAILS list itself has been pulled. Once both tables are local, the graph walks from a contact sheet to a person to an email with no script and no stored copy. See [Relationships](@uritp-people-relationships).

On 2026-10-05 the lists held 483 PEOPLE rows counting closed ones, 453 EMAILS and 150 PHONE NUMBERS. Those numbers are here for scale and go stale.

## What does not live here

A person's relationship to anything with its own lifecycle lives in the file that owns that thing. Production roles, contact-sheet rows and printed credits belong to the production side; employment belongs to Labour; enrollments to Courses; seasons and departments to Global Setup. The Bible and the playbill both read People for names and contact details, but neither is a People report.

## Documents

- [PEOPLE](@uritp-people-table-people): one human.
- [CONTACT_INFORMATION](@uritp-people-table-contact-information): one email address or one phone number.
- [Relationships](@uritp-people-relationships): how a person reaches their contacts, and how FileMaker finds the primary email.
- [Build sheet](@uritp-people-next-build): what gets built this cycle, in order.

## Not written yet

- `scripts/`: the pull. Nothing goes in until the script exists to copy, because a `.fmscript` is a copy target.
- `layouts/`.
- `value-lists/`: the email type labels.
- The ClickUp import views each pull reads from, one per source list.
- How a person's name prints in a program. ClickUp PEOPLE has legal first name, last name and an alternate name; it has no preferred name and no playbill name, so a printed-credit name has nowhere to come from yet.
- Student and non-student classification.
- What a pull does when a person's task is closed or deleted in ClickUp.

## Superseded

Everything in this folder without a page header is the July 2026 as-built pass: `INDEX.md`, `schema/`, `meta/`, `layouts/README.md`, `tables/README.md`, `tables/_index.json`, and the ADULTS_ext, STUDENTS_ext, GRADUATION_CLASSES, Emails and PhoneNumbers table notes. Superseded by D-042. Kept for its reasoning; do not build against it.
