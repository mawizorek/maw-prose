---
id: uritp-people-table-contacts
title: CONTACTS
type: reference
status: public
order: 20
revised: 2026-10
summary: One contact card for one owner, whether a person, a venue, an organization or a production. Emails, phones and addresses hang off it.
data:
  catalog:
    file: CONTACTS.tsv
---

# CONTACTS

!!! abstract "Grain"
    One contact card for one owner: a [PEOPLE](@uritp-people-table-people), [VENUES](@uritp-people-table-venues) or [ORGANIZATIONS](@uritp-people-table-organizations) record in this file, or a production in Production MAWnster.

## Fields

!!! data "catalog"

## One key reaches any owner

`fk_Owner` holds the owner's PrimaryKey whatever table it lives in. FileMaker UUIDs are unique across files, so one field can point at a person, a venue, an organization or a production without a second key or a table name beside it. [XTERNAL_JOINS](@uritp-people-table-xternal-joins) uses the same trick.

## One card per owner

`fk_Owner` is unique. An owner with three emails has one card and three [contact_EMAILS](@uritp-people-table-contact-emails) rows, never three cards.

## No kind field, no primary fields

What kind of owner a card belongs to is known from which owner relationship resolves, so it is not stored. The primary email and phone are the first related rows by `sort_Index`, so they are not stored either.

## Contact sheets read cards, not people

A contact-sheet line is the owner's name, a label and a value. Venues, the program's inboxes and a show's stage management inbox all print on the same sheet as people because they all have cards. A distro list is a set of those lines, not a table.
