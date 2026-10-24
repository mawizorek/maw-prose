# PERSON_Upsert_From_xtRecord

Built name: `PERSON_Upsert_From_xtRecord`
Folder: `sync`
Called by: `sync DISPATCH`

## What it does

Receives one xt_RECORDS PK and a mode (adopt or compare) from Dispatch.

**Adopt:** creates a PEOPLE record, a CONTACTS card with emails and phone rows, and an XTERNAL_JOINS row. Writes an ADOPT event with the task JSON as the base for future compares. Splits the task name at the last space when ClickUp's first and last name custom fields are empty.

**Compare:** three-way compare of each mirrored field (status, first, last, alt, pronouns, playbill, email_primary, email_secondary, phone_primary). Skips name (pushed, never compared). Phones compared digits only. Writes sync_RECONCILE PENDING rows for fields where only ClickUp moved or where both sides moved to different values.

## Context

Takes the full context block from sync RUN (through Dispatch), plus `record` and `mode`. Looks up decision keys (PENDING) itself.

## Layouts

table | PEOPLE, table | CONTACTS, table | contact_EMAILS, table | contact_PHONE_NUMBERS, table | XTERNAL_JOINS, table | sync_EVENTS, table | sync_RECONCILE.

## Field extraction

Builds a cfLookup JSON (ClickUp field ID to value) from the task's custom_fields array. Uses xt_FIELDS mapKey to fieldID mapping for all custom field reads. Status reads from `status.status` in the task JSON.

## D-043

Literal field names in ExecuteSQL. The `sql/` custom function family has not been built.
