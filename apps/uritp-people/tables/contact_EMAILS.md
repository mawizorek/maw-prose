---
id: uritp-people-table-contact-emails
title: contact_EMAILS
type: reference
status: public
order: 22
revised: 2026-10
summary: One email address on one contact card. The first by sort_Index is the primary, and it is what gets pushed to ClickUp.
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

## FileMaker owns the address

The primary address pushes to the ClickUp PEOPLE task's Primary Email field. Nothing is ever pulled back from ClickUp into this table.

## Labels name the line

`value_ContactLabel` comes from the contact label list. Stage Management and Production are labels too, which is how an organization's or a production's inbox prints as its own named line.
