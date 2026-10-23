---
id: uritp-people-table-contact-phone-numbers
title: contact_PHONE_NUMBERS
type: reference
status: public
order: 24
revised: 2026-10
summary: One phone number on one contact card. The first by sort_Index is the primary and is what gets pushed to ClickUp.
data:
  catalog:
    file: contact_PHONE_NUMBERS.tsv
---

# contact_PHONE_NUMBERS

!!! abstract "Grain"
    One phone number on one [CONTACTS](@uritp-people-table-contacts) card.

## Fields

!!! data "catalog"

## Same rules as email

The relationship sorts by `sort_Index` and the first row is the primary. The primary number pushes to the ClickUp PEOPLE task's Phone Number field and is never pulled back.
