---
id: uritp-people-table-import-sources
title: IMPORT_SOURCES
type: reference
status: public
order: 45
revised: 2026-10
summary: One ClickUp view an import reads from. PEOPLE, EMAILS, PHONE NUMBERS. The pull scripts look their view up here by name.
data:
  catalog:
    file: IMPORT_SOURCES.tsv
---

# IMPORT_SOURCES

!!! abstract "Grain"
    One ClickUp view that one import reads. Not one import run: those are [import_SESSIONS](@uritp-people-table-import-sessions).

## Fields

!!! data "catalog"

## SourceName is what the scripts ask for

Each pull script looks up its own row by `SourceName`, spelled exactly: [PEOPLE_Pull](@uritp-people-script-people-pull) asks for `PEOPLE`. Renaming a row breaks its import, and a second row with the same name stops the import rather than letting it guess, which is why the field is unique.

## A stored table, never a global

On a hosted file a global field resets every session to whatever it held the last time the file was open single-user. A view id kept in one either reverts without warning or can only be changed by taking the file offline. These are settings that must survive, so they are ordinary stored records.

## Changing a view is one edit

Point a source at a different ClickUp view by changing `cu_ViewID` here. Every session already run keeps the id it actually used, copied onto the session, so the history still says which view each pull read.

## Not a place for run results

When an import ran, how many rows it pulled and why it failed belong to the session, not the source. A source row only changes when the view it points at changes.

## The token is not here

One ClickUp token serves every view, so it lives once, on [SETTINGS](@uritp-people-table-settings).
