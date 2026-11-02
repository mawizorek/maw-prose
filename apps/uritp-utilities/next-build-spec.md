# URITP Utilities: next build spec (v1)

The fleet's ClickUp mirror hub. One file, `URITP Utilities.fmp12`, referenced by every consuming app through a relative external data source. It holds transport, raw payloads, the external-system registry, the token and the engine vocabulary. Apps keep their domain tables, dispatch, `Target_Tables`, `XTERNAL_JOINS` and `sync_RECONCILE`.

Rulings this spec implements, all on the ClickUp FMP Apps Shared Build & Behaviour Decision Log: J19 (hub split, join on external identity), J20 (arrows point app to hub), J21 (the hub is URITP Utilities), J22 (build rules), J23 (no script depends on a typed name).

This repo is public. Schema and counts only. The token never appears here or in any export.

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
4. Tables, in one paste from URITP People, then apply every change below.
5. Relationships (anchor-buoy).
6. Scripts, in the order listed at the bottom.
7. Run the seed script, then the version check, then a preflight with no network call.

URITP People's live sync is not repointed at this file until People passes Checkpoint 2 in-file (J19 gate).

## Standard audit block (every table)

`PrimaryKey` (Text, Get ( UUID ) auto-enter, unique, can't modify) · `CreationTimestamp` · `CreatedBy` · `ModificationTimestamp` · `ModifiedBy`.

## Tables

### xt_SYSTEMS
One row per external system.

- `Code` NEW. Text, not empty, unique, strict, validated to the code charset. `clickup`, `github`. Adapters branch on this, never on `Name`.
- `Name` label only.
- `BaseURL` not empty.
- `Token` not empty. Never exported, never logged, never copied to another device: a new device gets a fresh Utilities and a pasted token.

### xt_CONTAINERS
The lists and repos being mirrored.

- `fk_System` indexed, not empty.
- `xt_ID` indexed, not empty. ClickUp list id or GitHub owner/repo.
- `Name` label only.
- `isActive` auto-enter 1, range 0-1.
- REMOVED: `fk_TargetTable`. The hub never points at an app (J20). Each app's `Target_Tables` subscribes to a container by its `xt_ID`.

### sync_SOURCES
Which view or path feeds a container.

- `fk_Container` indexed, not empty.
- `xt_ViewPath` ClickUp view id or GitHub file path. The view must show closed tasks, or a closed person reads as deleted.
- `isActive` NEW. Auto-enter 1, range 0-1.
- `Name` label only. No script passes a source name (J23 rule 6): runs are driven by the app's active subscriptions.

### xt_RECORDS
One row per external record. Latest payload only (J22 rule 2).

- `fk_Container` indexed, not empty.
- `xt_ID` indexed, not empty. ClickUp task id or GitHub file path.
- `xt_Key` NEW. Auto-enter calc, stored, indexed, unique, strict: the system `Code` & ":" & `xt_ID`. This is what apps join on and what logs store. A GitHub path is not unique across repos; the key is.
- `xt_Label` not empty.
- `xt_Version` not empty. ClickUp date_updated (ms) or GitHub sha.
- `xt_Payload` NEW. Text. The raw JSON, overwritten when `xt_Version` changes. History lives in `sync_EVENTS`.

### xt_FIELDS
The external field catalog. Written by the field refresh.

- `fk_Container` indexed.
- `xt_FieldID` · `xt_FieldName` · `xt_FieldType` written by the refresh.
- `mapKey` what the field MEANS (e.g. `person.email`). Validated: lowercase `a-z`, `0-9`, `_` and `.` only.
- `uniq_ContainerMapKey` NEW. Auto-enter calc, stored, unique: `fk_Container` & "|" & `mapKey`. One meaning per container.
- The app owns where a mapKey LANDS. Utilities never names an app field.

### sync_SESSIONS
One row per run.

- `fk_Source` indexed.
- `SourceFile` NEW. Text provenance: which app ran it. Not a key.
- `calc_EventCount` · `calc_EndedAt` unchanged.
- `calc_ErrorCount` rewrite with `sql.Field` / `sql.Table` and a `?` parameter. No literal field or table names (D-043).

### sync_EVENTS
The one event log (J22 rule 1).

- `fk_Session` indexed.
- `xt_Key` REPLACES `fk_xtRecord`. Text, indexed. Survives a hub rebuild; a UUID would not.
- `ActionCode` REPLACES `fk_vAction`. Text, not empty, strict, validated by calculation: the code exists in `VALUES` under list `sync_action` (ExecuteSQL through `sql.*`, `?` parameters).
- `stored_ActionLabel` snapped from the label at write time.
- `SourceFile` NEW. Text provenance for app-reported dispatch errors. Never a local primary key.
- `HttpStatus` · `Request` · `Response` unchanged. `Request` never contains the token.

### value_LISTS
The engine's lists.

- `Code` NEW. Unique, strict, code charset. `sync_action`, `sync_decision`.
- `Name` label only.
- REMOVED: the five People-domain globals (`gV_ContactLabels`, `gV_GraduationYearLabels`, `gS_Person`, `gV_AcademicLevel`, `gV_ClassStanding`).

### VALUES
The engine's vocabulary rows. Never hand-entered.

- `fk_List` indexed.
- `Code` NEW. Not empty, strict, code charset.
- `uniq_ListCode` NEW. Auto-enter calc, stored, unique: `fk_List` & "|" & `Code`.
- `Name` label only.
- `sort_Index` menu order.
- REMOVED: `bool_isStatusList` (a People UI concern).

### Not in this file
`XTERNAL_JOINS`, `Target_Tables`, `sync_RECONCILE` and every domain table live in the consuming app. Org identity, fiscal years and departments stay in URITP GLOBAL Setup.

## Scripts (v1)

Every parameter and result is JSON. Every `Set Error Capture [ On ]` is followed by a `Get ( LastError )` check. Apps call these picked from the Perform Script list (ID-bound), never by calculated name.

1. `UTIL · Schema Version`: returns `{ ok, version }`. The version is a constant in this script, bumped on any schema change. Apps call it on open and fail loud on a mismatch.
2. `UTIL · Seed Engine Vocabulary`: the ONLY declaration of engine codes, as one JSON object of list code to value codes. Upserts `value_LISTS` and `VALUES` by `Code`. Never deletes, never renames. Safe to run any number of times. Runs on open and inside the version check.
3. `UTIL · Preflight`: takes the codes and mapKeys a run declares; returns `{ ok, missing: [] }`. Runs before any network call.
4. `XT_Refresh_Fields` + `ADAPTER_ClickUp_RefreshFields`: moved from People.
5. `HUB · Pull`: takes a container `xt_ID` from the calling app's subscription. Opens a session, pages the source, upserts `xt_RECORDS` by `xt_Key`, skips unchanged `xt_Version`, logs events, returns the session key, the codes the app needs, and the changed `xt_Key`s.
6. `HUB · Push`: takes `xt_Key`, the `xt_Version` the app last saw and a mapKey payload. Re-checks the version before writing and refuses on mismatch (J22 rule 4). On create, returns the new `xt_ID` only after verifying the response body.

Stays in each app: a thin `sync RUN` orchestrator (loop active `Target_Tables` subscriptions: Pull, dispatch, upsert, `RECONCILE_Apply`, Push) and the `<Entity>_Upsert_From_xtRecord` scripts. Each upsert declares the mapKeys it reads in one block at the top.

## Done means

URITP People passes Checkpoint 2 against this file with zero xt_ tables left in People, and Production MAWnster pulls its first event without building any.
