---
id: uritp-people-table-contact-emails
title: contact_EMAILS
type: reference
status: public
order: 22
revised: 2026-10
summary: One email address on one contact card. The first by sort_Index is the primary; the first two sync both ways with ClickUp's Primary and Secondary Email.
data:
  catalog:
    file: contact_EMAILS.tsv
---

# contact_EMAILS

!!! abstract "Grain"
    One email address on one [CONTACTS](@uritp-people-table-contacts) card. A person with three addresses has three rows.

## Fields

!!! data "catalog"

## The primary is the first one

The CONTACTS to contact_EMAILS relationship sorts by `sort_Index`, ascending. Whatever sits first is the primary on every layout, every contact sheet and every push. Changing someone's primary address means reordering, never retyping.

## The first two sync both ways

The first row mirrors the ClickUp PEOPLE task's Primary Email, the second its Secondary Email. Adoption fills them from ClickUp. After that an edit made only in FileMaker is pushed, and an edit made in ClickUp arrives as a [sync_RECONCILE](@uritp-people-table-sync-reconcile) row. Taking ClickUp's address inserts it as a new row in that position and moves the old one down, so no address is ever lost. Rows past the second are FileMaker's alone.

## Labels name the line

`value_ContactLabel` comes from the contact label list. Stage Management and Production are labels too, which is how an organization's or a production's inbox prints as its own named line.
