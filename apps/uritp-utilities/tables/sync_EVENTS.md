---
id: uritp-utilities-table-sync-events
title: sync_EVENTS
status: public
type: reference
summary: The shared hub event log for transport activity and app-reported dispatch outcomes.
order: 70
revised: 2026-11
data:
  catalog:
    file: sync_EVENTS.tsv
---

# sync_EVENTS

!!! abstract "Grain"
    One logged transport action or app-reported event within a hub session.

## Fields

!!! data "catalog"

## One log, no app dependency

`fk_Session` points at [sync_SESSIONS](@uritp-utilities-table-sync-sessions). `xt_Key` retains the external identity from [xt_RECORDS](@uritp-utilities-table-xt-records), replacing a pointer to the cache's local UUID. `SourceFile` is text provenance for app-reported dispatch errors; it is never a local app foreign key.

## Codes validate; labels snapshot

`ActionCode` replaces `fk_vAction`. Strict calculation validation checks that the code exists in [VALUES](@uritp-utilities-table-values) under the `sync_action` list, using sql.* identifiers and parameterized SQL. Writers inspect Get ( LastError ) after commit and surface a refusal.

`stored_ActionLabel` captures the display label at write time. Renaming a current label does not rewrite historical events. The label is not used to decide the action.

## Diagnostics exclude credentials

Request holds the JSON body or GET address; Response holds the external reply. Neither is a reason to log authentication headers or tokens. These are live operational records and are never exported into this public repository.
