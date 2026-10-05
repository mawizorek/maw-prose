---
id: uritp-people-script-people-pull
title: PEOPLE_Pull
type: reference
status: public
order: 10
revised: 2026-10
summary: The Import from ClickUp button. Pulls, stages, compares, opens the review window. Writes nothing to PEOPLE.
---

# PEOPLE_Pull

Copy target: `PEOPLE_Pull.fmscript`, folder `10_IMPORT`. Needs FileMaker 18 or later for `While`.

## What it does

Reads the token and view id from [SETTINGS](@uritp-people-table-settings), opens an [import_SESSIONS](@uritp-people-table-import-sessions) record, then asks ClickUp for the view one page at a time until ClickUp says `last_page`. Every task becomes one [import_PEOPLE](@uritp-people-table-import-people) row. Then it runs [PEOPLE_Compare](@uritp-people-script-people-compare) and, if there is anything to review, opens the [Reconcile People window](@uritp-people-layout-reconcile).

## The view decides who, this script decides what

The view's columns do not trim what ClickUp sends: every task arrives with every field. The view decides which tasks come; the four custom field ids at step 3 decide which values land in staged fields. Everything else is still in `import_raw_payload`.

## Failure leaves a trace, not a mess

Any failed page stops the import, writes the reason to the session's `ErrorText` and says so. Rows staged before the failure stay in import_PEOPLE and are never compared, so a half-pulled session can never produce Gone rows for people it simply did not reach.

## The page cap

The loop stops at page 100 whatever ClickUp says. It exists so a malformed `last_page` cannot spin forever; the PEOPLE list is nowhere near it.
