---
id: uritp-utilities-next-build-spec
title: URITP Utilities next build spec
status: public
type: reference
summary: Build order and v1 script contracts for the shared URITP FileMaker mirror hub.
revised: 2026-11
---

# URITP Utilities next build spec

## Architecture

The fleet's ClickUp mirror hub. One file, `URITP Utilities.fmp12`, referenced by every consuming app through a relative external data source. It holds transport, raw payloads, the external-system registry, the token and the engine vocabulary. Apps keep their domain tables, dispatch, `Target_Tables`, `XTERNAL_JOINS` and `sync_RECONCILE`.

Rulings this spec implements, all on the [FMP Apps Shared Build & Behaviour Decision Log](https://app.clickup.com/36074068/docs/12cwjm-52833/12cwjm-76733): J19 (hub split, join on external identity), J20 (arrows point app to hub), J21 (the hub is URITP Utilities), J22 (build rules), J23 (no script depends on a typed name).

This repo is public. Schema and counts only. The token never appears here or in any export.

## Reference surfaces

The [app reference](README.md) links the target table notes and matching field registers. Those notes are what the FMP Renderer reads. [Build progress](build-sheet.md) is separate and never inferred from a table's publication status.

## The rule under everything (J23)

Every value has three identity layers and scripts only touch the first two.

- Machine identity: `PrimaryKey` (UUID), `xt_Key`, `BaseTableID`. Never typed.
- Code: typed once, validated, never displayed, never renamed. Lowercase `a-z`, `0-9` and `_` only.
- Label: display text. Renamable freely. Nothing matches on it.

Four nets catch a bad value, each covering what the one before missed: the seed script guarantees the rows exist, preflight guarantees every declared code resolves, field validation refuses an undeclared code at commit, and `Get ( LastError )` after the commit surfaces the refusal.

## Build order

1. File named exactly `URITP Utilities.fmp12`. Never renamed after first deploy.
2. Before wiring any reference: test a relative path from a different folder (`file:../URITP Utilities/URITP Utilities.fmp12`) on the Mac and in FileMaker Go. If either fails, live files go flat in one deploy folder.
3. Custom functions: `sql` (2) and `json-params` (9) from `standards/filemaker/custom-functions/`. Nothing else. `JSONPatch` does not belong here.
4. Tables, in one paste from URITP People, then apply every change in the target table registers below.
5. Relationships (anchor-buoy).
6. Scripts, in the order listed below.
7. Run the seed script, then the version check, then a preflight with no network call.

URITP People's live sync is not repointed at this file until People passes Checkpoint 2 in-file (J19 gate).

## Target tables

The field-level target lives once, in each note's sibling TSV. Every register includes `PrimaryKey` (Text, Get ( UUID ) auto-enter, unique, cannot modify), `CreationTimestamp`, `CreatedBy`, `ModificationTimestamp` and `ModifiedBy`.

- [xt_SYSTEMS](tables/xt_SYSTEMS.md): system Code, display Name, BaseURL and device-local Token.
- [xt_CONTAINERS](tables/xt_CONTAINERS.md): external containers; no fk_TargetTable or other app pointer.
- [sync_SOURCES](tables/sync_SOURCES.md): active source views and paths, never matched by display Name.
- [xt_RECORDS](tables/xt_RECORDS.md): versioned latest payload and external join key. The note explicitly identifies the v1 formula's GitHub cross-repository limitation; it is not resolved by this documentation pass.
- [xt_FIELDS](tables/xt_FIELDS.md): external field catalog and container-scoped semantic mapKeys.
- [sync_SESSIONS](tables/sync_SESSIONS.md): source provenance and inherited summaries, with rename-safe error-count SQL.
- [sync_EVENTS](tables/sync_EVENTS.md): shared event log using xt_Key and ActionCode, with no tokens in diagnostics.
- [value_LISTS](tables/value_LISTS.md): stable engine list codes, without People-domain globals.
- [VALUES](tables/VALUES.md): list-scoped seeded codes and labels, without bool_isStatusList.

`XTERNAL_JOINS`, `Target_Tables`, `sync_RECONCILE` and every domain table live in the consuming app. Org identity, fiscal years and departments stay in URITP GLOBAL Setup.

## Scripts (v1)

Every parameter and result is JSON. Every `Set Error Capture [ On ]` is followed by a `Get ( LastError )` check. Apps call these picked from the Perform Script list (ID-bound), never by calculated name.

1. `UTIL · Schema Version`: returns `{ ok, version }`. The version is a constant in this script, bumped on any schema change. Apps call it on open and fail loud on a mismatch.
2. `UTIL · Seed Engine Vocabulary`: the ONLY declaration of engine codes, as one JSON object of list code to value codes. Upserts `value_LISTS` and `VALUES` by `Code` in the appropriate list scope. Never deletes, never renames. Safe to run any number of times. Runs on open and inside the version check.
3. `UTIL · Preflight`: takes the codes and mapKeys a run declares; returns `{ ok, missing: [] }`. Runs before any network call.
4. `XT_Refresh_Fields` + `ADAPTER_ClickUp_RefreshFields`: moved from People.
5. `HUB · Pull`: takes a container `xt_ID` from the calling app's subscription. Opens a session, pages the source, upserts `xt_RECORDS` by `xt_Key`, skips unchanged `xt_Version`, logs events, returns the session key, the codes the app needs, and the changed `xt_Key`s.
6. `HUB · Push`: takes `xt_Key`, the `xt_Version` the app last saw and a mapKey payload. Re-checks the version before writing and refuses on mismatch (J22 rule 4). On create, returns the new `xt_ID` only after verifying the response body.

Stays in each app: a thin `sync RUN` orchestrator (loop active `Target_Tables` subscriptions: Pull, dispatch, upsert, `RECONCILE_Apply`, Push) and the `<Entity>_Upsert_From_xtRecord` scripts. Each upsert declares the mapKeys it reads in one block at the top.

## Done means

URITP People passes Checkpoint 2 against this file with zero xt_ tables left in People, and Production MAWnster pulls its first event without building any.
