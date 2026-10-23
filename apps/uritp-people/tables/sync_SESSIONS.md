---
id: uritp-people-table-sync-sessions
title: sync_SESSIONS
type: reference
status: public
order: 52
revised: 2026-10
summary: One run of a sync. When, who and which source are stored; every count is worked out from its events.
data:
  catalog:
    file: sync_SESSIONS.tsv
---

# sync_SESSIONS

!!! abstract "Grain"
    One press of Sync for one source, whether it finished or not.

## Fields

!!! data "catalog"

## Counts are never stored

How many records a run touched, how many failed and when it ended are calculations over its [sync_EVENTS](@uritp-people-table-sync-events) rows. A stored count can disagree with the rows it counts; a count of the rows cannot. Start time and who ran it are the audit fields.
