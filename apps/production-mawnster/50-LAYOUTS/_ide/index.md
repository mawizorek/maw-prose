---
id: mawster-ide-layouts
title: "IDE mirror - Layouts (verbatim)"
type: index
status: hidden
order: 1
revised: 2026-08
summary: Verbatim transcription of the layout hierarchy and all 54 layout property rows. Copy, not commentary.
---

# IDE mirror - Layouts *(verbatim)*

<!-- VERBATIM TRANSCRIPTION. Nothing corrected, nothing interpreted.
     Source: mawizorek/uritp-docs @ a6fa075,
     production-mawster/90-file-imports-temp/DDR_imports/2608151650/raw.txt, chunks 8-9/21.
     Chunk set UUID 7534bbed-6a2a-4d5a-a2a2-7d3b00ced5b8, START/END UUIDs verified.
     Sibling convention: production-mawster/70-scripts/_ide/ -->

**This is a TRANSCRIPTION, not documentation.** Same contract as `70-scripts/_ide/`: copy, not
commentary.

🔴 **Do not reconcile this against the hand-written `print-geometry.md`, `print-first-runbook.md`
or the pages in `50-LAYOUTS/`.** Different document class.

## ✅ Scope: the LAYOUT DEFINITIONS. Layout OBJECTS are not captured.

The DDR splits this material in two, and only the first half is here:

| DDR material | Chunks | Status |
|---|---|---|
| **Layout Hierarchy** (folders + 54 layouts) | 8 | ✅ complete, verbatim below |
| **Layout properties table** (all 54 rows) | 8-9 | ✅ complete, verbatim below |
| **Layout Objects** (per-field coordinates on every layout) | 9-17 | ❌ **NOT captured** |

🔴 **Layout Objects is roughly EIGHT chunks of `Top/Left/Bottom/Right` point coordinates**, one
block per field per layout. It is the single largest body of text in the DDR and it is pure
rendering geometry: no logic, no names beyond `table::field` pairs already recorded in
`20-tables/_ide/`, and no comments. **It was deliberately not transcribed**, and that decision is
stated here rather than left as a silent gap.

**What IS recoverable from what is captured:** every layout's name, folder, record source, object
counts by type, script triggers, theme, and which scripts navigate to it. **What is NOT:** where
any individual field sits on the page. If print geometry ever needs auditing, it comes from a
fresh DDR or from FileMaker, not from here.

## Completeness

The DDR Overview reports **`Layouts 54`**.

- The Layout Hierarchy block below is **63 lines = 9 folder lines + 54 layout lines.**
- The properties table below carries **54 rows**, transcribed across chunks 8 and 9.

Both counts reconcile against the Overview independently. The set is complete.

## Layout Hierarchy — VERBATIM from the DDR

⚠️ **Indentation is lost in the source extraction**, exactly as in the Script Hierarchy. Folder
lines and layout lines are visually flat. Copied as the DDR emitted it.

```
HOME
View TABLES
GLOBALS | UTILITIES
view | APP_DEVICE_SETUP
view | auto_LAYOUTS
view | UTILITY_REPORTS
view | UTILITY_LOGS
view | GLOBAL_USE
view | GLOBAL_EXPORT_VARIABLES
view_VALUE_LISTS
view_VALUES
view | APP_SESSIONS
Normalized
view | ORGANIZATION
table | PRODUCERS
table | PRODUCTIONS
table | ROLES
table | WEEKS
table | WORKDAYS
table | STANDARD_EVENTS
table | CALENDARS
table | LOCATION_TYPES
WORKING DATA
table | EVENTS
table | EVENT_WORKDAYS
table | CALENDAR_HIGHLIGHTS
table | ROLE_ASSIGNMENTS
table | VERSIONS
table | EDITIONS
table | LOCATIONS
STYLING
view | THEMES
view | STYLES
view | THEME_COLORS
view | THEME_TYPOGRAPHY
view | THEMES_X_STYLES
IMPORTING
view_UTILITY_SESSIONS
view_IMPORT_SOURCES
view_IMPORT_EVENTS
EXPORTING
EXPORT_SESSIONS
view_EXPORT_SET_ITEMS
EXPORT_PRESETS
view_EXPORT_SETS
NORMALIZED TABLES
table | PRODUCTIONS
table | CALENDARS
table | ROLES Copy
table | STANDARD_EVENTS
table | IMPORT_EVENTS
table | EVENTS
table | WEEKS Copy
table | LOCATION_TYPES Copy
table | IMPORT_SOURCES
table | THEMES
table | STYLES
table | THEMES_X_STYLES Copy
VALUE_LISTS
Import New Events
event portal
PRINT
print | Agenda Calendar
```

**The 9 folder lines:** `View TABLES` · `GLOBALS | UTILITIES` · `Normalized` · `WORKING DATA` ·
`STYLING` · `IMPORTING` · `EXPORTING` · `NORMALIZED TABLES` · `PRINT`.

⚠️ **`View TABLES` is printed as a folder line immediately after `HOME` with no layouts of its own
before the next folder header.** Transcribed as the DDR shows it; whether it nests
`GLOBALS | UTILITIES` cannot be determined from flattened output.

## Layout properties — VERBATIM, all 54 rows

Columns are the DDR's own: **IIM** = `Include In Menu` · **QF** = `Quick Find` · **Save** =
`Save record changes automatically` · **Frames** = `Show field frames when record is active` ·
**FrameOnly** = `Show field frames only on current record` · **RecInd** =
`Show current record indicator in List View`. Every row's `Custom Menu Set` is `[File Default]`.

| # | Layout | IIM | QF | Objects | Show Records From | Save | Frames | FrameOnly | RecInd | Used in Scripts | Triggers | Theme |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `HOME` | Yes | Yes | 6 Regular Fields | `view_GLOBAL_USE` | On | Off | On | Off | — | — | 01 |
| 2 | `view \| APP_DEVICE_SETUP` | Yes | Yes | *(none)* | `view_APP_DEVICE_SETUP` | On | Off | On | On | — | — | 01 |
| 3 | `view \| auto_LAYOUTS` | Yes | Yes | 2 Regular Fields | `view_auto_LAYOUTS` | On | Off | On | On | — | — | 01 |
| 4 | `view \| UTILITY_REPORTS` | Yes | Yes | 11 Regular Fields | `view_UTILITY_REPORTS` | On | Off | On | On | `goTo \| view_UTILITY_REPORTS`, `goTo \| Calendars` | — | 01 |
| 5 | `view \| UTILITY_LOGS` | Yes | Yes | 8 Regular Fields | `view_UTILITY_LOGS` | On | Off | On | On | `goto_view_UTILITY_LOGS`, `goto_view_UTILITY_LOGS` | — | 01 |
| 6 | `view \| GLOBAL_USE` | **No** | Yes | *(none)* | `view_GLOBAL_USE` | On | Off | On | On | — | — | 01 |
| 7 | `view \| GLOBAL_EXPORT_VARIABLES` | Yes | Yes | *(none)* | `view_GLOBAL_EXPORT` | On | Off | On | On | — | — | 01 |
| 8 | `view_VALUE_LISTS` | Yes | Yes | 4 Regular Fields | `view_VALUE_LISTS` | On | Off | On | On | — | — | 01 |
| 9 | `view_VALUES` | Yes | Yes | 5 Regular Fields | `view_VALUES` | On | Off | On | On | — | — | 01 |
| 10 | `view \| APP_SESSIONS` | Yes | Yes | 2 Regular Fields | `view_APP_SESSIONS` | On | Off | On | On | `goto_view_APP_SESSIONS` | — | 01 |
| 11 | `view \| ORGANIZATION` | Yes | Yes | 1 Regular Fields | `view_ORGANIZATION` | On | Off | On | On | — | — | 01 |
| 12 | `table \| PRODUCERS` | Yes | Yes | 7 Regular Fields | `view_PRODUCER_INFO` | On | Off | On | On | — | — | 01 |
| 13 | `table \| PRODUCTIONS` | Yes | Yes | 10 Regular Fields | `view_PRODUCTIONS` | On | Off | On | On | — | — | 01 |
| 14 | `table \| ROLES` | Yes | Yes | 2 Regular Fields | `view_ROLES` | On | Off | On | On | — | — | 01 |
| 15 | `table \| WEEKS` | Yes | Yes | *(none)* | `view_WEEKS` | On | Off | On | On | — | — | 01 |
| 16 | `table \| WORKDAYS` | Yes | Yes | 4 Regular Fields, 1 Buttons, 1 Button Bars | `view_WORKDAYS` | On | Off | On | On | — | — | 01 |
| 17 | `table \| STANDARD_EVENTS` | Yes | Yes | 5 Regular Fields | `view_STANDARD_EVENTS` | On | Off | On | On | — | — | 01 |
| 18 | `table \| CALENDARS` | Yes | Yes | 3 Regular Fields | `view_CALENDARS` | On | Off | On | On | — | — | 01 |
| 19 | `table \| LOCATION_TYPES` | Yes | Yes | 1 Regular Fields | `view_LOCATION_TYPES` | On | Off | On | On | — | — | 01 |
| 20 | `table \| EVENTS` | Yes | Yes | *(none)* | `view_EVENTS` | On | Off | On | On | — | — | 01 |
| 21 | `table \| EVENT_WORKDAYS` | Yes | Yes | 5 Regular Fields | `view_EVENTS_X_WORKDAYS` | On | Off | On | On | `goTo \| Events x Workdays` | — | 01 |
| 22 | `table \| CALENDAR_HIGHLIGHTS` | Yes | Yes | 13 Regular Fields | `view_CALENDAR_HIGHLIGHTS` | On | Off | On | On | — | — | 01 |
| 23 | `table \| ROLE_ASSIGNMENTS` | Yes | Yes | 10 Regular Fields | `view_ROLE_ASSIGNMENTS` | On | Off | On | On | — | — | 01 |
| 24 | `table \| VERSIONS` | Yes | Yes | 2 Regular Fields | `view_VERSIONS` | On | Off | On | On | — | — | 01 |
| 25 | `table \| EDITIONS` | Yes | Yes | 4 Regular Fields | `view_EDITIONS` | On | Off | On | On | — | — | 01 |
| 26 | `table \| LOCATIONS` | Yes | Yes | 4 Regular Fields | `view_LOCATIONS` | On | Off | On | On | — | — | 01 |
| 27 | `view \| THEMES` | Yes | Yes | 2 Regular Fields | `view_THEMES` | On | Off | On | On | — | — | 01 |
| 28 | `view \| STYLES` | Yes | Yes | 4 Regular Fields | `view_STYLES` | On | Off | On | On | — | — | 01 |
| 29 | `view \| THEME_COLORS` | Yes | Yes | 4 Regular Fields | `view_THEME_COLORS` | On | Off | On | On | — | — | 01 |
| 30 | `view \| THEME_TYPOGRAPHY` | Yes | Yes | 8 Regular Fields | `view_THEME_TYPOGRAPHY` | On | Off | On | On | — | — | 01 |
| 31 | `view \| THEMES_X_STYLES` | Yes | Yes | 5 Regular Fields | `view_THEMES_X_STYLES` | On | Off | On | On | — | — | 01 |
| 32 | `view_UTILITY_SESSIONS` | Yes | Yes | 2 Regular Fields | `view_UTILITY_SESSIONS` | On | Off | On | On | `goto_view_Import_Sessions` | — | 01 |
| 33 | `view_IMPORT_SOURCES` | Yes | Yes | 3 Regular Fields | `view_IMPORT_SOURCES` | On | Off | On | On | — | — | 01 |
| 34 | `view_IMPORT_EVENTS` | Yes | Yes | *(none)* | `view_IMPORT_EVENTS` | On | Off | On | On | — | — | 01 |
| 35 | `EXPORT_SESSIONS` | Yes | Yes | 3 Regular Fields | `EXPORT_SESSIONS` | On | Off | On | On | — | — | 01 |
| 36 | `view_EXPORT_SET_ITEMS` | Yes | Yes | 2 Regular Fields | `view_EXPORT_SET_ITEMS` | On | Off | On | On | — | — | 01 |
| 37 | `EXPORT_PRESETS` | Yes | Yes | 6 Regular Fields | `view_PRINT_PRESETS` | On | Off | On | On | — | — | 01 |
| 38 | `view_EXPORT_SETS` | Yes | Yes | 4 Regular Fields | `view_EXPORT_SETS` | On | Off | On | On | — | — | 01 |
| 39 | `table \| PRODUCTIONS` | Yes | Yes | 11 Regular Fields | `view_PRODUCTIONS` | On | Off | On | On | `goTo \| productions` | — | 01 |
| 40 | `table \| CALENDARS` | Yes | Yes | 2 Regular Fields | `view_CALENDARS` | On | Off | On | On | `goTo \| Calendars` | — | 01 |
| 41 | `table \| ROLES Copy` | Yes | Yes | 2 Regular Fields | `view_ROLES` | On | Off | On | On | — | — | 01 |
| 42 | `table \| STANDARD_EVENTS` | Yes | Yes | 6 Regular Fields | `view_STANDARD_EVENTS` | On | Off | On | On | — | — | 01 |
| 43 | `table \| IMPORT_EVENTS` | Yes | Yes | 34 Regular Fields | `view_IMPORT_EVENTS` | On | Off | On | On | `goTo \| table Import EVENTS` | — | 01 |
| 44 | `table \| EVENTS` | Yes | Yes | 12 Regular Fields, 1 Buttons, 1 Button Bars | `view_EVENTS` | On | Off | On | On | `goTo \| Events` | — | 01 |
| 45 | `table \| WEEKS Copy` | Yes | Yes | 2 Regular Fields | `view_WEEKS` | On | Off | On | On | — | — | 01 |
| 46 | `table \| LOCATION_TYPES Copy` | Yes | Yes | 2 Regular Fields | `view_LOCATION_TYPES` | On | Off | On | On | — | — | 01 |
| 47 | `table \| IMPORT_SOURCES` | Yes | Yes | 4 Regular Fields | `view_IMPORT_SOURCES` | On | Off | On | On | — | — | 01 |
| 48 | `table \| THEMES` | Yes | Yes | 2 Regular Fields | `view_THEMES` | On | Off | On | On | — | — | 01 |
| 49 | `table \| STYLES` | Yes | Yes | 4 Regular Fields | `view_STYLES` | On | Off | On | On | — | — | 01 |
| 50 | `table \| THEMES_X_STYLES Copy` | Yes | Yes | 5 Regular Fields | `view_THEMES_X_STYLES` | On | Off | On | On | — | — | 01 |
| 51 | `VALUE_LISTS` | Yes | Yes | 12 Regular Fields, 2 Portals, 1 Graphic Objects | `VALUE_LISTS` | On | **On** | On | On | — | — | 01 |
| 52 | `Import New Events` | Yes | Yes | 18 Regular Fields, 2 Buttons, 2 Button Bars, 2 Portals | `UTILITY_SESSIONS` | On | **On** | On | On | — | — | 01 |
| 53 | `event portal` | Yes | Yes | 9 Regular Fields, 2 Portals | `WORKDAYS` | On | Off | On | **Off** | — | — | 01 |
| 54 | `print \| Agenda Calendar` | Yes | Yes | 10 Regular Fields, 1 Merge Fields | `EVENTS_X_WORKDAYS` | On | Off | **Off** | **Off** | — | `OnLayoutEnter` → `sort \| fkWorkday date`, Modes: Browse | **02** |

⚠️ **The `Objects` column is the DDR's own object-count summary**, transcribed verbatim including
its grammar (`1 Regular Fields`, `1 Buttons`). *(none)* means the DDR printed no object counts for
that layout — it is empty, not omitted.

## 🔍 Observations — what the DDR printed, no verdicts

### 🔴 Four layout names are used TWICE

| Name | Instances | Objects | Distinguished by |
|---|---|---|---|
| `table \| PRODUCTIONS` | 13 (`Normalized`), 39 (`NORMALIZED TABLES`) | 10 vs 11 fields | 39 is called by `goTo \| productions` |
| `table \| CALENDARS` | 18 (`Normalized`), 40 (`NORMALIZED TABLES`) | 3 vs 2 fields | 40 is called by `goTo \| Calendars` |
| `table \| STANDARD_EVENTS` | 17 (`Normalized`), 42 (`NORMALIZED TABLES`) | 5 vs 6 fields | neither is script-called |
| `table \| EVENTS` | 20 (`WORKING DATA`), 44 (`NORMALIZED TABLES`) | **0** vs 12 fields + button bar | 44 is called by `goTo \| Events` |

**Every `Go to Layout` step in the schema names a layout by name only.** `20-tables/_ide/` already
records the downstream effect: fields on these tables print their `On Layouts` value twice
(`table | PRODUCTIONS`, `table | PRODUCTIONS`), which is the DDR reporting both instances.

⚠️ **`table | EVENTS` #20 has ZERO objects while #44 carries 12 fields and a button bar.** The
empty one sits in `WORKING DATA`, the populated one in `NORMALIZED TABLES`.

### The `Copy` suffix family

`table | ROLES Copy` · `table | WEEKS Copy` · `table | LOCATION_TYPES Copy` ·
`table | THEMES_X_STYLES Copy` — four layouts carrying FileMaker's duplicate-layout suffix as
their live name. **All four are the populated instance**: `20-tables/_ide/` records
`WEEKS.Number` / `Weeks_Wednesday` and `LOCATION_TYPES.Sort` appearing **only** on the `Copy`
layout, while `table | WEEKS` (#15) has zero objects.

### Two naming conventions, side by side

- **`view | X` / `table | X`** (spaces around the pipe): 30 layouts.
- **`view_X`** (underscore, no pipe): 8 layouts — `view_VALUE_LISTS`, `view_VALUES`,
  `view_UTILITY_SESSIONS`, `view_IMPORT_SOURCES`, `view_IMPORT_EVENTS`, `view_EXPORT_SET_ITEMS`,
  `view_EXPORT_SETS`, plus `view_UTILITY_SESSIONS`.
- **Bare names, no prefix at all**: `HOME`, `EXPORT_SESSIONS`, `EXPORT_PRESETS`, `VALUE_LISTS`,
  `Import New Events`, `event portal`.

⚠️ **The underscore group clusters in `IMPORTING` and `EXPORTING`** — the two newest folders.

### 🔴 `print | Agenda Calendar` is the only layout that differs on anything structural

**The only layout on Theme ID `02`.** Every other one of the 54 is `01`. The Themes section lists
two themes, both displayed `Apex Blue`: `01` = `com.filemaker.theme.custom.B474922D_...` (Group:
`Custom`) and `02` = `com.filemaker.theme.apex_blue` (Group: `Apex Blue`). **The print layout is
the one using the stock theme; the other 53 use the custom one.**

**The only layout with a script trigger:** `OnLayoutEnter` → `sort | fkWorkday date`, Modes:
`Browse`.

✅ That trigger is the **only inbound caller of `sort | fkWorkday date`**, which
`70-scripts/_ide/_ROOT.md` records as having an empty `Scripts that use this script` list. **The
layout trigger is why that script is not dead code.** Recorded from two transcriptions.

**The only layout with both `Show field frames only on current record` = Off AND
`Show current record indicator` = Off**, and the only one carrying `Merge Fields` (1) —
`{{LayoutName}}`.

### Layouts with zero objects (6 of 54)

`view | APP_DEVICE_SETUP` · `view | GLOBAL_USE` · `view | GLOBAL_EXPORT_VARIABLES` ·
`table | WEEKS` · `table | EVENTS` (#20) · `view_IMPORT_EVENTS`.

⚠️ Two of these back tables that also have no business fields (`APP_DEVICE_SETUP`,
`GLOBAL_EXPORT`), so an empty layout is consistent. The other four back populated tables.

### 🔴 `view | GLOBAL_USE` is the ONLY layout with `Include In Menu` = No

All 53 others are `Yes`. It also has zero objects, while **`HOME` — which shows records from the
same `view_GLOBAL_USE` occurrence — carries all six globals.** Two layouts on one occurrence; the
populated one is `HOME`.

### Record-source occurrences that are NOT `view_`-prefixed

Four layouts read from a base occurrence: `EXPORT_SESSIONS` → `EXPORT_SESSIONS` · `VALUE_LISTS` →
`VALUE_LISTS` · `Import New Events` → `UTILITY_SESSIONS` · `event portal` → `WORKDAYS` · and
`print | Agenda Calendar` → `EVENTS_X_WORKDAYS`. **These five are also the only layouts carrying
Portals or Merge Fields.**

⚠️ `EXPORT_PRESETS` reads from **`view_PRINT_PRESETS`** — the EXPORT/PRINT split already recorded
in `20-tables/_ide/observations.md`, now visible at layout level too.

### The three heaviest layouts

1. **`table | IMPORT_EVENTS`** — 34 Regular Fields, the most of any layout. Every field of the
   26-field table plus related fields.
2. **`Import New Events`** — 18 Regular Fields, 2 Buttons, 2 Button Bars, 2 Portals. **The only
   layout with two of everything interactive**, and the operator surface for the whole import run.
3. **`table | CALENDAR_HIGHLIGHTS`** — 13 Regular Fields on a table with **zero records.**

### `Save record changes automatically` is `On` for all 54

No layout requires an explicit commit. Recorded because the scripts mirror shows
`Commit Records/Requests [ No dialog ]` called explicitly in `on App Close`,
`merge | compare field` and `XXmerge | Event Field`.

## Not captured from this DDR section

- **Layout Objects** (chunks 9-17): per-field `Top/Left/Bottom/Right` coordinates, `Anchoring`,
  `Field Format`, `Field Behavior`, `Quick Find` per field; Portal geometry and sort orders; Button
  Bar segment coordinates; Graphic Object placement. **Deliberately skipped** — see the scope note
  at the top.
- **Themes** (chunk 21): two rows, quoted in the `print | Agenda Calendar` note above rather than
  given their own file.
