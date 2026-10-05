---
id: uritp-people-table-people
title: PEOPLE
type: reference
status: public
order: 10
revised: 2026-10
summary: One human. Brought across from the ClickUp PEOPLE list through the review window, matched on task id, never edited here.
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

`cu_TaskID` is the ClickUp task id and the only thing the import matches on. Names change and addresses get retired; the task id does not. Two people with the same name are two records because they are two tasks. The CRM custom id plays no part.

Every join into PEOPLE matches on `cu_TaskID` too, from this file or any other, because every ClickUp-fed table arrives carrying the person's task id and nothing else. `PrimaryKey` is FileMaker's own UUID and stays machine-only.

## Pulled fields change only through Apply

Everything in the From ClickUp group is written by [PEOPLE_Apply](@uritp-people-script-people-apply) and nothing else, after the difference has been shown in the [review window](@uritp-people-layout-reconcile). A blank in ClickUp is a real value: if a pronoun is cleared there, the window offers to clear it here.

On every layout people work in, those fields are not enterable in Browse mode. A field that looks editable invites an edit the next import will offer to undo; the Open in ClickUp button beside them, on `calc_ClickUpURL`, takes the person to the place the edit belongs.

The field names in that group are load-bearing. The scripts build `import_` plus the PEOPLE field name to find the matching staging field, so a renamed field here needs the same rename in [import_PEOPLE](@uritp-people-table-import-people) and in the field list at the top of each script.

## Closed people still come across

The ClickUp view includes closed tasks, and `cu_Status` carries the person's status. A person marked complete in ClickUp shows up here as complete, not as missing. Without that, 121 people would be flagged gone on every import.

## Only cu_TaskID is required

On 2026-09-28, 18 of 483 people had no legal first name and 37 had no primary email. Make any of those required and the first import rejects about fifty real people. Validate `cu_TaskID` and nothing else; a missing name is a ClickUp cleanup job, not a reason to lose the person.

## No email or phone on this table

There is no email or phone field here, stored or calculated. ClickUp's PEOPLE list carries flat Primary Email, Secondary Email, Dropbox Email and Phone Number fields because ClickUp cannot roll a value up through a relationship. Those are ClickUp workarounds and they do not port. Contact details arrive as rows in [CONTACT_INFORMATION](@uritp-people-table-contact-information), and the primary email is a [relationship](@uritp-people-relationships).

## A field earns its place by a report reading it

The ClickUp list carries about forty more fields: weekday availability, lift certification, mailing address, birthday, two sets of Position labels and a stack of relationships to other lists. None is pulled into PEOPLE. All of them are kept verbatim in `import_PEOPLE::import_raw_payload`, so a field a report needs later is already on file.
