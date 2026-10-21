---
id: ddr-asbuilt-index
title: DDR As-Built Scripts (2608151650) — QUARANTINE
type: index
status: hidden
nav: hidden
order: 9999
revised: 2026-08
summary: Verbatim per-script transcription of the 2026-08-15 DDR. Working context only. NOT the curated script tree; do not build against it.
---

# 🚧 DDR As-Built Scripts — QUARANTINE

**Source:** `Production_MAWnster.fmp12` DDR export, chunk set `7534bbed-6a2a-4d5a-a2a2-7d3b00ced5b8`, dropped `2026-08-15 16:51`, read `2026-08-15`.
**Raw paste of record:** `../DDR_imports/2608151650/` (21 chunks, all UUID-verified).

## What this is

A faithful, one-file-per-script transcription of **every script in the DDR as it exists in the file today** (52 script entries; 51 unique bodies, `goto_view_UTILITY_LOGS` appears twice in the hierarchy). Raw script names preserved verbatim. Step listings are copied as-is inside code blocks.

## What this is NOT

🔴 This is **not** the curated script tree. The live convention lives in [`../index.md`](../index.md): prefix-based names (`FILE ·`, `GOTO ·`, `FIND ·`, `UTIL ·`, `BUILD ·`, `EXPORT ·`), folders mirroring prefixes 1:1, with a rename map and four **retired** scripts. Do NOT build against these files and do NOT edit them; folding the as-built into the curated tree is a separate, deliberate pass.

⚠️ **Retired in the curated tree, transcribed here anyway** (as-built record, not an endorsement): `trigger_App_Open`, `App_Startup`, `new | Utility Log` (as `new_UTILITY_LOG`), `exit w/ errors`.

## Transcription-faithful bugs noticed (NOT fixed here)

- **`import | delete header row`** sets `import_dateSTART` twice; the second Set Field is almost certainly meant to be `import_dateEND`.
- **`import | merge Event`** reads param keys `EventName` / `dateTime_start` / `dateTime_end` / `StyleKey`, but `json_cleanImportDetails` emits `Name` / `dateTime_Start` / `dateTime_End` / `fkStyle`. Keys don't match, so merges fall through to fallbacks.
- **`import | net new Event`** reads `hash_current` and `fkUtilityReport` from the clean-details JSON, which does not carry those keys (it carries `hash_current` via `hash_history` and `fkUtilityReport`; verify against `json_cleanImportDetails` element list).
- **`compare | cu_ID`** builds a `$logParam` on the >1 branch but the message text is scoped oddly; harmless, noted.
- **`new | Utility Log`** references `view_UTILITY_LOGS::<Field Missing>` (a `"open"` status write) — field unresolved in the DDR.
- **`App_Startup`** performs `<unknown>` then branches on `$mode`, which is never set in that script.

## Manifest (DDR hierarchy order)

| # | Raw script name | File |
|---|---|---|
| 1 | set Global \| pkCurrentUtilitySession | [set-global-pkcurrentutilitysession](set-global-pkcurrentutilitysession.md) |
| 2 | file \| Create Backup | [file-create-backup](file-create-backup.md) |
| 3 | on App Open | [on-app-open](on-app-open.md) |
| 4 | new \| App Session Token | [new-app-session-token](new-app-session-token.md) |
| 5 | on App Close | [on-app-close](on-app-close.md) |
| 6 | button \| import EVENTS | [button-import-events](button-import-events.md) |
| 7 | button \| generate events x workdays | [button-generate-events-x-workdays](button-generate-events-x-workdays.md) |
| 8 | new \| workday x event | [new-workday-x-event](new-workday-x-event.md) |
| 9 | new-import-session | [new-import-session](new-import-session.md) |
| 10 | lookup \| production short | [lookup-production-short](lookup-production-short.md) |
| 11 | import \| new events | [import-new-events](import-new-events.md) |
| 12 | import \| Event records | [import-event-records](import-event-records.md) |
| 13 | import \| write row numbers | [import-write-row-numbers](import-write-row-numbers.md) |
| 14 | import \| copy Payload | [import-copy-payload](import-copy-payload.md) |
| 15 | link \| fkUtilityReport | [link-fkutilityreport](link-fkutilityreport.md) |
| 16 | link \| fkReport fkProd Hash | [link-fkreport-fkprod-hash](link-fkreport-fkprod-hash.md) |
| 17 | import \| delete empty rows | [import-delete-empty-rows](import-delete-empty-rows.md) |
| 18 | import \| delete header row | [import-delete-header-row](import-delete-header-row.md) |
| 19 | import EVENT \| remove ProdShortName | [import-event-remove-prodshortname](import-event-remove-prodshortname.md) |
| 20 | import \| remove maw notes | [import-remove-maw-notes](import-remove-maw-notes.md) |
| 21 | import \| bool all day | [import-bool-all-day](import-bool-all-day.md) |
| 22 | import \| pass to workspace | [import-pass-to-workspace](import-pass-to-workspace.md) |
| 23 | compare \| cu_ID | [compare-cu-id](compare-cu-id.md) |
| 24 | import \| net new Event | [import-net-new-event](import-net-new-event.md) |
| 25 | import \| merge Event | [import-merge-event](import-merge-event.md) |
| 26 | backup \| EVENT | [backup-event](backup-event.md) |
| 27 | merge \| compare field | [merge-compare-field](merge-compare-field.md) |
| 28 | XXmerge \| Event Field | [xxmerge-event-field](xxmerge-event-field.md) |
| 29 | lookup \| calendar for production | [lookup-calendar-for-production](lookup-calendar-for-production.md) |
| 30 | filter \| to current run | [filter-to-current-run](filter-to-current-run.md) |
| 31 | goto_view_UTILITY_LOGS | [goto-view-utility-logs](goto-view-utility-logs.md) |
| 32 | goTo \| view_UTILITY_REPORTS | [goto-view-utility-reports](goto-view-utility-reports.md) |
| 33 | goTo \| productions | [goto-productions](goto-productions.md) |
| 34 | goTo \| Calendars | [goto-calendars](goto-calendars.md) |
| 35 | goTo \| Events | [goto-events](goto-events.md) |
| 36 | goTo \| Events x Workdays | [goto-events-x-workdays](goto-events-x-workdays.md) |
| 37 | goTo \| table Import EVENTS | [goto-table-import-events](goto-table-import-events.md) |
| 38 | goto_view_Import_Sessions | [goto-view-import-sessions](goto-view-import-sessions.md) |
| 39 | goto_view_APP_SESSIONS | [goto-view-app-sessions](goto-view-app-sessions.md) |
| 40 | goto_view_VALUES | [goto-view-values](goto-view-values.md) |
| 41 | goTo \| new window currentRunReport | [goto-new-window-currentrunreport](goto-new-window-currentrunreport.md) |
| 42 | trigger_App_Open | [trigger-app-open](trigger-app-open.md) |
| 43 | App_Startup | [app-startup](app-startup.md) |
| 44 | new \| Utility Report | [new-utility-report](new-utility-report.md) |
| 45 | end \| Utility Report | [end-utility-report](end-utility-report.md) |
| 46 | new \| Utility Log | [new-utility-log](new-utility-log.md) |
| 47 | Show ALL or NONE | [show-all-or-none](show-all-or-none.md) |
| 48 | status_index_move | [status-index-move](status-index-move.md) |
| 49 | exit w/ errors | [exit-w-errors](exit-w-errors.md) |
| 50 | button \| generate Workdays | [button-generate-workdays](button-generate-workdays.md) |
| 51 | sort \| fkWorkday date | [sort-fkworkday-date](sort-fkworkday-date.md) |

_51 unique bodies. DDR overview reports 52 scripts; `goto_view_UTILITY_LOGS` is listed twice in the script hierarchy._
