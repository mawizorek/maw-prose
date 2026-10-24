---
id: uritp-people-script-xt-refresh-fields
title: XT_Refresh_Fields
type: reference
status: public
order: 20
revised: 2026-10
summary: The generic field-refresh dispatcher. Resolves a container's system and performs that system's adapter. Knows no API.
---

# XT_Refresh_Fields

!!! abstract "Grain"
    One container per run. Refreshes the `xt_FIELDS` rows under it.

## Why it exists separately from the adapter

D-046 reserves knowledge of an outside system's shape for `ADAPTER_<System>_` scripts. A refresh that parsed ClickUp's JSON under a generic `XT_` name would break that on the first script written, and the generic layer is the entire reason a second system costs an adapter instead of a rewrite.

Michael ruled the dispatcher shape on 2026-10-23, over the simpler option of naming the whole thing an adapter. It costs one extra script now and buys the pattern every future refresh reuses. `SYNC_Dispatch` already has this shape, so it is the file's second use of it rather than a new idea.

## What it does

Reads the container and the system that owns it in one `ExecuteSQL` join, matching D-048's ruling that `SYNC_Run` reads its context the same way. Then it branches on the system's `Name` and performs that adapter, returning the adapter's own result untouched.

A system with no adapter yet is named in the dialog, along with the script that would need writing. The one thing it must never do is fail quietly: an empty refresh and a refresh that could not run look identical in the data.

## The token never travels

The adapter receives two keys, the container and the system, and reads `BaseURL` and `Token` off the system record itself. A token passed as a script parameter is visible in the Data Viewer and in any error dialog that echoes the parameter, and `STEPS.md` already confirmed no token appears in script text. Passing keys keeps that true.

## Param and result

Param: `{ "container" : "<xt_CONTAINERS PrimaryKey>" }`

Result: `{ "ok" : 1|0, "system" : "<name>", "updated" : n, "missing" : n, "native" : n }`

## Open

The branch on `$systemName` is a string comparison against the system record's `Name`. That is the one place a renamed `xt_SYSTEMS` row would break dispatch. Keying the branch on the system's `PrimaryKey` instead would be rename-proof but unreadable in the script; left as a name deliberately, flagged here rather than hidden.
