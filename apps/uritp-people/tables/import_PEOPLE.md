---
id: uritp-people-table-import-people
title: import_PEOPLE
type: reference
status: public
order: 60
revised: 2026-10
summary: Raw ClickUp pulls of the PEOPLE view, append-only. The holding table the review window compares against.
data:
  catalog:
    file: import_PEOPLE.tsv
---

# import_PEOPLE

!!! abstract "Grain"
    One person as one import session saw them. Not one person: pulling the same task twice writes two rows.

## Fields

!!! data "catalog"

## Append-only

Nothing edits or deletes a row here. Ordered by session, the rows for one task id read as that person's history in ClickUp.

## Staging names mirror PEOPLE

Every staged value is named `import_` plus the PEOPLE field it feeds: `import_LastName` feeds `LastName`, `import_cu_Status` feeds `cu_Status`. The compare and apply scripts build field names that way, so breaking the pattern breaks the import with no error, only a difference that never shows up.

## import_raw_payload

The whole task as ClickUp sent it, verbatim, including the forty-odd fields PEOPLE does not use. A field a report needs in six months is already here.

## import_DateUpdated is UTC

ClickUp sends milliseconds since 1970 in UTC, and the pull stores the timestamp without shifting it. It is for reading in the window, not for deciding anything: the compare always checks every field.
