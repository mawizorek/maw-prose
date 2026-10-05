---
id: uritp-people-table-people
title: PEOPLE
type: reference
status: public
order: 10
revised: 2026-10
summary: One human. Pulled from the ClickUp PEOPLE list, matched on task id, never edited here.
data:
  catalog:
    file: PEOPLE.tsv
---

# PEOPLE

!!! abstract "Grain"
    One person: one Person task in CRM ▸ PEOPLE ▸ PEOPLE. Someone who holds five roles is still one record.

## Fields

!!! data "catalog"

## Match on cu_TaskID, never on a name or an email

`cu_TaskID` is the ClickUp task id and the only thing the pull matches on. Names change and addresses get retired; the task id does not. Two people with the same name are two records because they are two tasks.

Every join into PEOPLE matches on `cu_TaskID` too, from this file or any other, because every ClickUp-fed table arrives carrying the person's task id and nothing else. `PrimaryKey` is FileMaker's own UUID and stays machine-only.

## Pulled fields are overwritten, blanks included

Everything in the FROM CLICKUP group is replaced on every pull. A blank in ClickUp writes a blank here. Editing these in FileMaker is wasted work: the next pull undoes it.

## Only cu_TaskID is required

On 2026-09-28, 18 of 483 people had no legal first name and 37 had no primary email. Make any of those required and the first pull rejects about fifty real people. Validate `cu_TaskID` and nothing else; a missing name is a ClickUp cleanup job, not a reason to lose the person.

## No email or phone on this table

There is no email or phone field here, stored or calculated. ClickUp's PEOPLE list carries flat Primary Email, Secondary Email, Dropbox Email and Phone Number fields because ClickUp cannot roll a value up through a relationship. Those are ClickUp workarounds and they do not port. Contact details arrive as rows in [CONTACT_INFORMATION](@uritp-people-table-contact-information), and the primary email is a [relationship](@uritp-people-relationships).

## A field earns its place by a report reading it

The ClickUp list carries about forty more fields: weekday availability, lift certification, mailing address, birthday, two sets of Position labels and a stack of relationships to other lists. None is pulled. A field joins the register when a report needs it, and not before.
