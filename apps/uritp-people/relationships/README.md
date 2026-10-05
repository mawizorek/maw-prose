---
id: uritp-people-relationships
title: Relationships
type: reference
status: public
order: 30
revised: 2026-10
summary: Two edges on one key. How a person reaches their contacts, and how FileMaker finds the primary email without storing it.
---

# Relationships

## A person to all their contacts

`PEOPLE::cu_TaskID = CONTACT_INFORMATION::fkPERSON`, one to many. Both sides carry ClickUp task ids, so the edge survives any number of re-pulls: nothing FileMaker generates sits in the key.

## A person to their primary email

Two criteria: `PEOPLE::cu_TaskID = CONTACT_INFORMATION::fkPERSON` and `PEOPLE::match_Primary = CONTACT_INFORMATION::ContactType`. Because `ContactType` is return-separated, an address labelled both Primary and Work still matches. Phones carry no type, so this edge only ever finds email.

If ClickUp has two addresses for one person both labelled Primary, the edge shows whichever comes first, which is an arbitrary one. Fix it in ClickUp.

## Why the primary email is never stored on PEOPLE

A stored copy goes stale. A relookup fires when the key changes, not when the related value changes, so correcting an address on its email record would leave the copy on the person wrong with nothing to say so. Read through the edge every time; across 483 people one hop costs nothing.

## Other files

Contact sheets, Bible directories and program credits reach a person from their own files, through the person's task id. Those edges are documented with the file that owns them.
