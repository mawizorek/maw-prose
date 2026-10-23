---
id: uritp-people-table-sync-events
title: sync_EVENTS
type: reference
status: public
order: 54
revised: 2026-10
summary: One action on one external record in one run, with exactly what was sent and what came back. Append-only.
data:
  catalog:
    file: sync_EVENTS.tsv
---

# sync_EVENTS

!!! abstract "Grain"
    One pull, push, adoption or export of one external record in one session. A pull of a 30-task page writes 30 rows, not one.

## Fields

!!! data "catalog"

## Written once, never edited

Scripts add a row per API action and never change it afterwards. That is what makes it the history.

## The payload lives here and only here

`Request` is the JSON body sent on a push, or the address asked on a pull. `Response` is what the system replied. "Last pushed" for a record is its newest push row; there is no last-pushed field, error field or stored payload anywhere else in the file.

## Errors are statuses

A failed call is a row with an `HttpStatus` of 300 or above and the reason in `Response`.
