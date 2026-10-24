# adapter PUSH | ClickUp

Built name: `adapter PUSH | ClickUp`
Folder: `sync`
Called by: `sync RUN`

## What it does

Pushes FileMaker edits back to ClickUp for every joined person in the container. Also creates ClickUp tasks for unjoined PEOPLE records.

For each joined person:
1. Compares FM values against the base (most recent event Response).
2. Skips any field with a PENDING reconcile row.
3. Sends name/status changes via Update Task (PUT).
4. Sends custom field changes via Set Custom Field Value (POST), one call per field.
5. Re-reads the task and writes a PULL event as the new base.

For unjoined people: creates a task in the list with all fields, then creates xt_RECORDS + XTERNAL_JOINS rows and writes PUSH + PULL events.

## Rate pacing

~0.7s pause between each API call. 429 retries with a 60s pause, once.

## Phone formatting

10 US digits get +1 prefix. Already-prefixed (+) numbers pass through. Anything else is skipped with an error event logged.

## Context

Takes the full context block from sync RUN. Looks up decision keys (PENDING) itself.

## Layouts

table | xt_RECORDS, table | sync_EVENTS, table | XTERNAL_JOINS.

## D-043

Literal field names in ExecuteSQL.
