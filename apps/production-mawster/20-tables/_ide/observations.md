---
id: mawster-ide-tables-observations
title: "IDE mirror - Schema observations register"
type: reference
status: hidden
order: 7
revised: 2026-08
summary: Cross-table readings of the DDR for all 37 tables. Direct readings only, no verdicts, nothing acted on.
provenance: see 20-tables/_ide/index.md
---

# Schema observations register

<!-- Split out of 20-tables/_ide/index.md on 2026-08-16 at pass 4, when the index reached
     21,492 bytes and this pass's additions would have pushed it over the ~22KB read ceiling.
     Same precedent as the Pass-to-Workspace split. -->

**Complete: all 37 tables, 398 fields.** Source `DDR_imports/2608151650`, chunks 1-7 of 21, all
START/END UUIDs verified.

🔴 **Every item here is a DIRECT READING of transcribed text, not an inference and not a test
run.** This file exists so the batch files stay pure transcription. **Nothing here has been acted
on, and nothing in the schema has been changed.**

Where an item spans mirrors (tables ↔ scripts ↔ value lists ↔ custom functions), the sources are
quoted so the reading can be checked without re-reading the DDR.

---

## 🔴 JSON parameter key mismatch — the import merge path

`IMPORT_EVENTS.json_cleanImportDetails` is an auto-enter calc building the handoff payload.
**The nine keys it emits, verbatim from the field definition:**

```
cuID  Name  dateTime_Start  dateTime_End  bool_AllDay
hash_current  fkUtilityReport  fkProduction  fkStyle
```

`import | pass to workspace` passes that payload to two consumers. Their `ParamGetText` key
arguments, verbatim from `70-scripts/_ide/40-Importing/Pass-to-Workspace.md`:

| Payload key | `import \| net new Event` reads | `import \| merge Event` reads |
|---|---|---|
| `cuID` | `cuID` ✅ | `cuID` ✅ |
| `Name` | `Name` ✅ | **`EventName`** ❌ |
| `dateTime_Start` | `dateTime_Start` ✅ | **`dateTime_start`** ❌ |
| `dateTime_End` | `dateTime_End` ✅ | **`dateTime_end`** ❌ |
| `bool_AllDay` | `bool_AllDay` ✅ | `bool_AllDay` ✅ |
| `hash_current` | `hash_current` ✅ | `hash_current` ✅ |
| `fkUtilityReport` | `fkUtilityReport` ✅ | `fkUtilityReport` ✅ |
| `fkProduction` | `fkProduction` ✅ | `fkProduction` ✅ |
| `fkStyle` | `fkStyle` ✅ | **`StyleKey`** ❌ |

**`net new` matches all nine. `merge Event` mismatches four**, two by letter case only. Per the
`ParamGetText` definition in `60-custom-functions/_ide/cf-index.md`, an absent key returns the
**fallback**; those four fallbacks are `"err"`, `""`, `"err"`, `""`.

## 🔴 `<Field Missing>` in `new | Utility Log` — triangulated

`70-scripts/_ide/90-UTILITY/LOGS.md` transcribes a **live** step:

```
Set Field [ view_UTILITY_LOGS::<Field Missing>; "open" ]
```

plus two more commented-out `<Field Missing>` lines. Three facts, three documents:

1. **`UTILITY_LOGS` has 13 fields and none holds a state or status value** — `Action`,
   `Timestamp`, `Comment`, `json_Params`, `ErrorCode`, `fkRunReport`, `fkAppSessionToken`,
   `auto_counter`, plus the five audit fields.
2. A native value list **`open | close`** exists with values `open, close`, recorded in
   `25-value-lists/_ide/value-lists.md` as **bound to no layout.**
3. The script's own comments describe pairing an open row to a close row via `fkAppSessionToken`.

**The field the script writes `"open"` into does not exist, and the value list built for it is
unbound.**

## 🔴 Session-close path, per three transcriptions

- **`APP_SESSIONS.ClosedTimestamp` has an empty `In Scripts` column.** Nothing writes it.
- The one script writing `APP_SESSIONS.StartTimestamp` is **`trigger_App_Open`**, which
  `70-scripts/_ide/90-UTILITY/index.md` records as having **no inbound caller.**
- File Options binds `OnFirstWindowOpen` to **`on App Open`**, whose chain is
  `new | App Session Token` → `view_GLOBAL_USE::g_pkCurrentAppSession` — **never touching
  `APP_SESSIONS`.** The table holds 2 records.

## Calculations that do not match their names or comments

- 🔴 **`CALENDAR_HIGHLIGHTS.calc_ResolvedStart` and `calc_ResolvedEnd`** — byte-identical, both
  reading `dateTime_Start`; comments describe opposite ends of a span.
- 🔴 **`THEME_COLORS.calc_Hex`** — calculation is `view_THEME_COLORS::R` alone. G and B are not in
  the expression.
- 🔴 **`WORKDAYS.dateFormat_Colloquial` and `dateFormat_Display`** — byte-identical
  `Calculated, Date` fields, both returning the bare `view_WORKDAYS::Date` with no formatting.
- **`IMPORT_EVENTS.calc_Start_AMPM` / `calc_End_AMPM`** — both declare `~temp = 0` in the `Let` and
  never use it. Empty or midnight input evaluates `< 12:00` and returns `"AM"`.
- ✅ **Counter-example, kept deliberately:** `IMPORT_EVENTS`'s six-field `calc_*` date/time family
  IS correctly wired. Start reads Start, End reads End, all distinct.

## Fields written with the wrong literal, or by nobody

- **`UTILITY_REPORTS.vl_Status`** — comment names `complete | partial | failed`;
  `new | Utility Report` sets the literal `"New"`.
- **`UTILITY_LOGS.ErrorCode`** — comment says `Get(LastError) from the failing step, 0 on success`;
  `new | Utility Log` sets the quoted string `"0"` on every call and nothing else writes it. Field
  is `Normal, Number`.
- **`UTILITY_SESSIONS.countRows_File` / `countRows_Imported` / `countRows_Flagged`** — all three
  have empty `In Scripts` columns. They sit on the `Import New Events` layout; no script sets them.
- **`UTILITY_REPORTS.media_RunReport`** — both its script references are to commented-out
  `Set Field` lines. The DDR lists them anyway.

## Misspellings that are LIVE names — must be used as spelled

| Where | As printed | Apparent intent |
|---|---|---|
| `EDITIONS` field | `date_TakesPrecednace` | Precedence |
| `EDITIONS` field | `fkSuperseededBy` | Superseded |
| Occurrence | `UTILTIY_LOGS_for_UTILITY_REPORTS` | UTILITY |

🔴 **`IMPORT_EVENTS.Event Name` contains a SPACE** — the only such field name in the schema,
referenced as `view_IMPORT_EVENTS::Event Name`.
🔴 **Base directory is `Production_MAWster/`; the file is `Production_MAWnster.fmp12`.** Two
spellings of the app name in one DDR.
⚠️ Comment-text typo only, not a field name: `UTILITY_REPORTS.Title` → `Local run tilte.`

## Comments naming things that do not exist

- `ROLE_ASSIGNMENTS.vl_Section` → `ROLES.DefaultSection`. **`ROLES` has no such field.**
- `EDITIONS.date_TakesPrecednace` → `fkPreceeded by`. **No such field.**
- `CALENDAR_HIGHLIGHTS.dateTime_End` → `DateStart`. Field is `dateTime_Start`.
- `CALENDAR_HIGHLIGHTS.calc_Resolved*` → `PadBefore` / `PadAfter`. Fields are `DaysBefore` / `DaysAfter`.
- `EXPORT_SESSIONS.snap_ExportPath` → `fkExport_Set`. Field is `fkPrintSet`.
- `ROLE_ASSIGNMENTS.fkPerson` → **no PEOPLE table exists among the 37.** (`00-ext-PEOPLE` is a docs folder.)

## Comment vs options contradictions

- 🔴 **`EVENTS.fkProduction`** — comment says `Indexed.`, options say `Indexing: None`.
- 🔴 **`EXPORT_PRESETS.bool_UseShortName` / `bool_ShowLegend` / `bool_ShowUnscheduled`** — all
  three comments say `default = 1`, all three auto-enter `Constant data: 0`.
- **`EXPORT_PRESETS.WeekStartDay`** — comment says `default = 1, SUNDAY`, no `Constant data:` line.
- **`EXPORT_SETS.bool_RevertRecord` / `bool_DefaultRecord`** — commented `default = 0`, no
  `Constant data:` line; sibling `bool_ScratchRecord` has one.
- **`CALENDAR_HIGHLIGHTS.Priority`** — comment says `Default 10`, no `Constant data:` line.
- **`CALENDAR_HIGHLIGHTS.calc_ResolvedStart` / `calc_ResolvedEnd`** — comments say `Unstored.`,
  `Storage:` shows no unstored marker.
- ✅ **The one that AGREES: `UTILITY_REPORTS.bool_Pass`** — comment says `default = null` and there
  is no `Constant data:` line, which is exactly what produces null.

## Truncated or malformed in the source

- 🔴 **`EXPORT_SET_ITEMS.fkDocument`** — comment ends mid-word at `(based on <defa`. **The DDR
  itself truncated it**; full text exists only in the `.fmp12`. Nothing was cut in transcription.
- **`IMPORT_EVENTS.json_cleanImportDetails`** — printed calculation has one unbalanced parenthesis
  against the opening `Param ( List (`. Cannot be determined from this document whether the DDR
  clipped it or the source is unbalanced.
- **`EXPORT_PRESETS.ExportFolder`** — comment contains the same sentence twice, no separator.

## Indexing asymmetries, as printed

- **`Indexing: All`:** `PRODUCTIONS.PrimaryKey`, `cuProductionToken`, `cuProductionID` ·
  `EVENTS.fkCalendar` · `CALENDARS.fkProduction` · `WORKDAYS.Date` · `EVENTS_X_WORKDAYS.Date`,
  `fkCalendar` · `THEMES_X_STYLES.fkStyle`, `fkTheme` · `IMPORT_EVENTS.import_Name`,
  `fkUtilityReport`, `bool_AllDay`, `cu_TaskID` · `UTILITY_REPORTS.PrimaryKey`, `dateTime_Start` ·
  `UTILITY_LOGS.fkAppSessionToken`.
- 🔴 **`Indexing: None` on `EVENTS.dateTime_Start` and `dateTime_End`**, the fields every date
  comparison and the `WORKDAYS_for_assignEvents` date join run through. `WORKDAYS.Date` and
  `EVENTS_X_WORKDAYS.Date` on the other side ARE `All`.
- **The start-indexed / end-unindexed pattern recurs three times:** `IMPORT_EVENTS.import_dateSTART`
  (`Minimal`) vs `import_dateEND` (`None`) · `UTILITY_REPORTS.dateTime_Start` (`All`) vs
  `dateTime_End` (`None`) · and `EVENTS` has both at `None`.
- **`IMPORT_EVENTS.bool_AllDay` is `Indexing: All`** — the only indexed boolean in the schema.
- **`UTILITY_LOGS.Timestamp` is `Indexing: None`**, and it is the sort field of the
  `UTILTIY_LOGS_for_UTILITY_REPORTS=UTILITY_REPORTS` relationship over 4,939 rows.
- **All `PRODUCTIONS` foreign keys** (`fkProducer`, `fkVenue`, `fkCourse`) are `None`.
- **All `EDITIONS` foreign keys** are `None` and carry no relationships.
- **`THEMES_X_STYLES`:** the two predicate keys are `All`, the three inheritance keys are `None`.

## Type choices worth reading twice

- 🔴 **`THEMES.Sort` is `Normal, Text`.** Every other `Sort` in the schema is `Normal, Number`.
- **`CALENDAR_HIGHLIGHTS.calc_ResolvedStart` / `calc_ResolvedEnd` are `Calculated, Number`** while
  holding dates.
- **`THEME_COLORS.calc_Hex` is `Calculated, Number`** for a hex value.
- **`VERSIONS.ID` is `Normal, Text`**, alongside the UUID `PrimaryKey`.
- **`IMPORT_EVENTS.import_dateSTART` / `import_dateEND` are `Normal, Text`** — deliberate per their
  comments, with the `calc_*` family coercing.
- 🔴 **`UTILITY_LOGS.auto_counter` is the only serial field in the schema** (`Next value: 4153`,
  increment 1). Every other identity field is `Get( UUID )`. **The table holds 4,939 records — 786
  more than the serial's next value.** Arithmetic on two printed figures; meaning not determined
  here.

## Naming convention breaks

- **`PRODUCERS`** → occurrence `view_PRODUCER_INFO`, propagating into its PrimaryKey context and
  value list.
- **`EXPORT_PRESETS`** → occurrence `view_PRINT_PRESETS`. Table says EXPORT, occurrence says PRINT,
  confirmed at field level by the PrimaryKey context.
- **`fkPrintSet` in both `EXPORT_SET_ITEMS` and `EXPORT_SESSIONS`** → named PrintSet, pointing at
  `EXPORT_SETS`. The PRINT/EXPORT split recurs four times in total.
- **Base-occurrence `Context table` (2 of 398 fields):** `EVENTS_X_WORKDAYS.XfkWorkday` →
  `EVENTS_X_WORKDAYS`, and `EXPORT_SESSIONS.PrimaryKey` → `EXPORT_SESSIONS`.
- **`WORKDAYS.xTitleShort`** → lowercase `x` prefix on a plain text field, where `X` elsewhere
  marks a key.
- **`THEME_TYPOGRAPHY.bool_italic` / `bool_bold` / `bool_underline`** → lowercase suffixes, where
  every other boolean capitalises.
- **`UTILITY_SESSIONS.fkcurr_importProduction`** → the only `fkcurr_` prefix in the schema.
- **`EXPORT_SESSIONS.Result_Pointer` / `Report_Container`** → the only `Word_Word`
  capitalised-with-underscore names.
- **One value, two field names:** `UTILITY_REPORTS.fkAppSession` and
  `UTILITY_LOGS.fkAppSessionToken`, both written from `view_GLOBAL_USE::g_pkCurrentAppSession`.
- **`APP_SESSIONS.StartTimestamp` / `ClosedTimestamp`** → Start vs Closed, not Start/End.
- **`auto_LAYOUTS`** → the only lowercase-prefixed table name.
- **Three display fields, three sources:** `PRODUCTIONS.TitleDisplay` ← `Title` ·
  `LOCATIONS.NameDisplay` ← `Name` · **`PRODUCERS.NameDisplay` ← `NameShort`.** Four indexing
  choices across four display fields; `STANDARD_EVENTS.NameDisplay` is `None`.
- **`THEMES_X_STYLES`:** `fkStyle` printed first but commented `predicate 2`; `fkTheme` second,
  commented `predicate 1`.

## Audit-field variances — the complete list across 37 tables

🔴 **`PrimaryKey` `Indexing: All` — exactly TWO tables:** `PRODUCTIONS` and `UTILITY_REPORTS`.
All 35 others are `Minimal`.

🔴 **A non-key audit field carrying a reference — exactly ONE field in 398:**
`UTILITY_REPORTS.CreationTimestamp` has `On Layouts: Import New Events`. **Every other instance of
the four non-key audit fields references nothing**, in all 37 tables.

**Three `PrimaryKey` `Context table` values that are not the table's own `view_` occurrence:**
`PRODUCERS` → `view_PRODUCER_INFO` · `EXPORT_PRESETS` → `view_PRINT_PRESETS` · `EXPORT_SESSIONS`
→ `EXPORT_SESSIONS`.

**Audit fields printed FIRST rather than after the business fields — three tables:**
`IMPORT_EVENTS`, `ORGANIZATION`, `APP_SESSIONS`.

## Tables with no business fields at all

- **`GLOBAL_EXPORT`** (5 fields) and **`APP_DEVICE_SETUP`** (5 fields) — nothing but the audit five.
- **`ORGANIZATION`** (6 fields) — the audit five plus one `Name`.

## Specified but not wired

- 🔴 **`EXPORT_SET_ITEMS`** — **ten of fifteen fields on no layout**, zero relationships. Fully
  specified in fields and comments, not wired.
- **`auto_LAYOUTS`** — zero records, no script writes to it.
- **`PRODUCERS.fkTheme`** — has a comment, on no layout, relationship, script or value list.
- **`LOCATIONS.fkLocationType`** — no relationship; the `LOCATION_TYPES` join is not in the graph.
- **`UTILITY_SESSIONS.fkSource`** — no relationship to `IMPORT_SOURCES`.
- **`THEME_COLORS.SortLabel` and `calc_Hex`** — on no layout at all.
- **`VALUES.fkStatusCategory`** — points back into `VALUES`, no relationship.
- **`EXPORT_SETS.SetExportPath`**, **`EXPORT_SESSIONS.snap_ExportPath`**, **`Result_Pointer`**,
  **`Report_Container`** — all have comments, all on no layout.

## Two value-list systems, both live

- **Native FileMaker value lists (14)** → `25-value-lists/_ide/value-lists.md`.
- **Table-driven** → `VALUE_LISTS` (3 records) + `VALUES` (10 records), with two **global** fields
  in `VALUE_LISTS` serving as relationship predicates.

Same vocabulary, different mechanism. **Do not merge them.**
