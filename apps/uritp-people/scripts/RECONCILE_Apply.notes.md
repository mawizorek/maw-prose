# RECONCILE_Apply

Built name: `RECONCILE_Apply`
Folder: `sync`
Called by: user (standalone, after reviewing PENDING reconcile rows)

## What it does

Processes decided sync_RECONCILE rows for one session:

- **XT decision:** writes the xt_Value into FileMaker (PEOPLE field or contact row). For emails and phones, inserts a new row at the target position and bumps existing rows down by 1, so nothing is lost.
- **FM decision:** marks APPLIED. The push will send the FM value.
- **PENDING rows:** left untouched, counted in the return.

## Context

Takes the context block (needs `session` at minimum). Looks up all decision keys (PENDING, FM, XT, APPLIED) itself.

## Layouts

table | sync_RECONCILE, table | PEOPLE, table | contact_EMAILS, table | contact_PHONE_NUMBERS.

## Contact row handling

"Inserts as a new row and moves the old one down, so nothing is lost." Processes bumps in reverse sort_Index order (highest first) to avoid index collisions.
