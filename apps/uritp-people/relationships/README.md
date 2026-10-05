---
id: uritp-people-relationships
title: Relationships
type: reference
status: public
order: 30
revised: 2026-10
summary: Every edge in People. How a person reaches their contacts, how the import reads PEOPLE, and the one door it writes through.
---

# Relationships

Each base table has a table occurrence with the table's own name. The occurrences below are the only others.

## A person to all their contacts

`PEOPLE::cu_TaskID = CONTACT_INFORMATION::fkPERSON`, one to many. Both sides carry ClickUp task ids, so the edge survives any number of imports: nothing FileMaker generates sits in the key.

## A person to their primary email

Two criteria: `PEOPLE::cu_TaskID = CONTACT_INFORMATION::fkPERSON` and `PEOPLE::match_Primary = CONTACT_INFORMATION::ContactType`. Because `ContactType` is return-separated, an address labelled both Primary and Work still matches. Phones carry no type, so this edge only ever finds email.

If ClickUp has two addresses for one person both labelled Primary, the edge shows whichever comes first, which is an arbitrary one. Fix it in ClickUp.

## Why the primary email is never stored on PEOPLE

A stored copy goes stale. A relookup fires when the key changes, not when the related value changes, so correcting an address on its email record would leave the copy on the person wrong with nothing to say so. Read through the edge every time; across 483 people one hop costs nothing.

## The import reads PEOPLE through import_PEOPLE__PEOPLE

`import_PEOPLE::cu_TaskID = import_PEOPLE__PEOPLE::cu_TaskID`. No creation, no deletion. The compare stands on a staged row and reads what PEOPLE has now through this edge; an empty `cu_TaskID` on the far side means the person is new.

## The import writes PEOPLE through RECONCILE__PEOPLE

`RECONCILE::cu_TaskID = RECONCILE__PEOPLE::cu_TaskID`, with **Allow creation of records in this table via this relationship** checked on the PEOPLE side. Deletion is never checked. This is the only edge anything writes PEOPLE through: setting a field across it on a New row creates the person and fills in `cu_TaskID` from the row.

## A review row back to its staged values

`RECONCILE::fkImportPeople = RECONCILE__import_PEOPLE::PrimaryKey`. Apply reads a new person's staged values through it.

## Other files

Contact sheets, Bible directories and program credits reach a person from their own files, through the person's task id. Those edges are documented with the file that owns them.
