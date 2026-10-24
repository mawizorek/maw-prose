---
id: uritp-people-script-adapter-clickup-pull
title: ADAPTER_ClickUp_Pull
type: reference
status: public
order: 31
revised: 2026-10
summary: The only script that knows ClickUp's task-page shape. Pages a view, caches each task in xt_RECORDS, and writes a pull event for every new or changed task.
---

# ADAPTER_ClickUp_Pull

!!! abstract "Grain"
    One page of tasks per iteration. One xt_RECORDS row and one sync_EVENTS row per new or changed task.

## The endpoint

`GET {baseURL}/view/{viewPath}/task?page={n}`, returning `{ "tasks" : [ ... ], "last_page" : true|false }`. Each task carries `id`, `name`, `status`, `date_updated` and `custom_fields`.

Authorization is the personal token, bare (no Bearer prefix), matching the convention `ADAPTER_ClickUp_RefreshFields` already uses.

## What happens per task

For each task on the page, the script looks up its `xt_RECORDS` row by `xt_ID` and `fk_xtContainer`:

- **No row:** creates the xt_RECORDS row (container, id, label, version), then writes a pull event with the full task JSON as the response. This is a new record, and the dispatcher will adopt it.
- **Row exists, same version:** the task has not changed since the last pull. No event, no update.
- **Row exists, different version:** updates `xt_Label` and `xt_Version` on the existing row, then writes a pull event. The dispatcher will run the three-way compare against this record's newest prior event.

An event is only written for a new or changed task. Unchanged tasks are never logged. This follows D-048 ruling 1: an event only for a new or changed task.

## The version check

`xt_Version` stores ClickUp's `date_updated` as raw milliseconds text. The comparison is `Exact`, so there is no type coercion. Equal means unchanged, and the pull moves on. This is the cheapest possible skip, and it is the reason the pull can be run frequently without drowning sync_EVENTS in identical payloads.

## Development cap

A variable `$devCap` at the top of the script controls whether the pull stops after page 0. Set to 1 (the default), it caps the pull at 30 tasks, which is checkpoint 2 of the sync plan. Set to 0 for a full pull once the adoption and compare paths are proven.

## Page-level errors

A page-level error (transport failure, non-200, double-429) is not a sync event. The script exits with an error JSON, and `SYNC_Run` reports it. The session row exists: its absence of events tells you it failed before any task was processed. This ruling follows from the principle that every `sync_EVENTS` row has a record key.

## 429 handling

A 429 pauses 60 seconds and retries the page once. A second failure exits with the error. The sync plan places retry logic here, in the pull, where it is worth the complexity, and not in the housekeeping refresh scripts.

## Event field names

Uses `fk_vAction` (the VALUES PrimaryKey for PULL) with `stored_ActionLabel` snapped to "PULL", matching the value-list keying convention from D-051. The PULL key is looked up once at the top of the script by ExecuteSQL against value_LISTS and VALUES, so a renamed value breaks the lookup rather than silently writing the wrong key.

## D-043 gap

Field names in all ExecuteSQL calls are literal text, same gap as `SYNC_Run` and the refresh scripts. The `sql/` custom-function family is not built.

## Known limits

The xt_RECORDS lookup per task is an ExecuteSQL call inside a loop. At 30 tasks per page that is 30 calls, each indexed. At the volumes this file handles, that is nothing. If the page size ever increases to hundreds, batch the IDs and search once.

The full task JSON is stored in `sync_EVENTS::Response` for every new or changed task. That is the correct design (it is the base for the three-way compare), but it means sync_EVENTS can grow large. It is the one table that cannot be published from a public repo without FERPA clearance.
