---
id: uritp-people-table-contact-information
title: CONTACT_INFORMATION
type: reference
status: public
order: 20
revised: 2026-10
summary: One email address or one phone number, pulled from the ClickUp CONTACT INFO lists and tied to a person by task id.
data:
  catalog:
    file: CONTACT_INFORMATION.tsv
---

# CONTACT_INFORMATION

!!! abstract "Grain"
    One email address or one phone number: one task in CRM ▸ CONTACT INFO ▸ EMAILS or ▸ PHONE NUMBERS. A person with three addresses has three records.

## Fields

!!! data "catalog"

## A new kind of contact is a row

Email and phone land in the same table, told apart by `ContactKind`. A future contact type is a new ClickUp list and one more pass in the pull, never a new field on PEOPLE.

## fkPERSON holds a ClickUp task id

Both lists carry a PEOPLE relationship field. The pull copies its value, which is the person's task id, into `fkPERSON`, and that matches `PEOPLE::cu_TaskID`. A ClickUp relationship field can hold more than one task; a contact linked to two people is a data error in ClickUp, and the pull must not guess which of them owns it.

## ContactType is a label list

EMAILS carries Email TYPE | TAG, a labels field with Primary, Secondary, Personal, Work and Dropbox, so one address can be Primary and Work at once. The pull stores the labels return-separated, which is what lets a FileMaker relationship match `Primary` against it.

PHONE NUMBERS has no type field at all. No phone can be primary until ClickUp grows one.

## Deleting a person keeps their contacts

A person delete never cascades into this table. An accidental delete in the hub must not take a contact history with it.
