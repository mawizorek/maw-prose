---
id: uritp-people-script-sync-run
title: SYNC_Run
type: reference
status: public
order: 30
revised: 2026-10
summary: The orchestrator. Reads one source's context, opens a session, calls pull then dispatch then push, and shows the session.
---

# SYNC_Run

!!! abstract "Grain"
    One press of Sync for one source. Everything else is a subscript.

## What it does

Reads the source, its container and its system in a single `ExecuteSQL` join (D-048 ruling 6), packs the result into a context JSON, opens a `sync_SESSIONS` row, and calls three scripts in order: the pull adapter, the dispatcher and the push adapter. If the pull fails, it stops and shows the session (which still exists, with whatever error events the pull wrote). On success it navigates to the session record so the user sees the outcome.

## The context block

Every subscript receives the same JSON: session, source, container, viewPath, listID, containerName, system, systemName, baseURL, token. The context is read once, and nothing downstream looks it up again. A token never appears in a script parameter visible to the user because `SYNC_Run` is a button script invoked with a source name, and the subscripts receive machine keys that only become a token inside the adapter.

If the source's system is not ClickUp, the push is skipped. That is the only branch on systemName in this script. The pull adapter already dispatches by system (through the context block's systemName), and the dispatcher is system-agnostic.

## The one context join

Nine columns across three tables:

```
sync_SOURCES.PrimaryKey
sync_SOURCES.fk_xtContainer
sync_SOURCES.xt_ViewPath
xt_CONTAINERS.xt_ID
xt_CONTAINERS.Name
xt_SYSTEMS.PrimaryKey
xt_SYSTEMS.Name
xt_SYSTEMS.BaseURL
xt_SYSTEMS.Token
```

The alternative (relationships through `sync_SOURCES_fxtContainers`) would expose the same data through the graph and add two table occurrences. Both are equivalent for the subscripts, which receive variables either way. The SQL was chosen because the graph was just rebuilt and the join is read-only.

## Param and result

Param: a `sync_SOURCES` Name as plain text.

Result: `{ "ok" : 1|0, "session" : "<PrimaryKey>", "pulled" : n, "dispatched" : n, "pushed" : n }`

## D-043 gap

Field names in the SQL are literal text, matching the same gap flagged in `XT_Refresh_Fields`. The `sql/` custom-function family needed to use `GetFieldName` in SQL does not exist yet. A rename of any joined field name breaks this script silently.
