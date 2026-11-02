---
id: uritp-utilities-table-sync-sessions
title: sync_SESSIONS
status: public
type: reference
summary: One hub run with source provenance and event-derived summaries.
order: 60
revised: 2026-11
data:
  catalog:
    file: sync_SESSIONS.tsv
---

# sync_SESSIONS

!!! abstract "Grain"
    One synchronization run through the hub.

## Fields

!!! data "catalog"

## Provenance is not a cross-file foreign key

`fk_Source` points at [sync_SOURCES](@uritp-utilities-table-sync-sources). `SourceFile` records which app ran the session as text provenance. It must not become a local app primary key or force the hub to reference an app file.

## Summaries come from events

`calc_EventCount` counts related events. `calc_EndedAt` is the latest related event's CreationTimestamp, not an independently authored completion flag. `calc_ErrorCount` retains the inherited count of this session's events with HttpStatus at least 300.

The error-count SQL must obtain identifiers through `sql.Table` and `sql.Field`, with the session identity passed as a `?` parameter. Literal table and field strings previously broke on renames. This page specifies the calculation contract, not a tested copy-ready expression.
