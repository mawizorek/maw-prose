---
id: uritp-people-table-contact-phone-numbers
title: contact_PHONE_NUMBERS
type: reference
status: public
order: 24
revised: 2026-10
summary: One phone number on one contact card. The first by sort_Index is the primary and syncs both ways with ClickUp's Phone Number.
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

The relationship sorts by `sort_Index` and the first row is the primary. It syncs both ways with the ClickUp PEOPLE task's Phone Number field, by the same rules as email: adoption fills it, FileMaker edits push, ClickUp edits arrive as [sync_RECONCILE](@uritp-people-table-sync-reconcile) rows, and taking ClickUp's number moves the old one down.

## Compared as digits

Numbers are compared digits only, so `+1 (401) 555-0100` and `401.555.0100` are the same number and never raise a row. ClickUp's field requires a country code: the push sends a ten-digit number as `+1`, and anything else is logged as an error event rather than guessed at.
