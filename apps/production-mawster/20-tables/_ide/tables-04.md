---
id: mawster-ide-tables-04
title: "IDE mirror - Tables 27-30 (verbatim)"
type: reference
status: hidden
order: 5
revised: 2026-08
summary: Verbatim transcription of DDR tables 27-30, 63 fields. The import-export pipeline.
provenance: see 20-tables/_ide/index.md
---

# IDE mirror - Tables 27-30 *(verbatim)*

**DDR order 27-30.** Source chunks 5-6 of 21, all UUIDs verified. **63 fields** — 26+10+15+12.

⚠️ **Second half of batch 3.** Tables 21-30 measured 24,036 bytes as one file, over the ~22KB
read ceiling, so it was cut at the domain seam: theme/value tables in `tables-03.md`, **the
import-export pipeline here.**

🔴 **Audit fields are NOT repeated here.** Verbatim blocks live in `20-tables/_ide/index.md`.

`[STD-TEXT]` and `[STD-NUM]` refer to the shared options blocks defined in the index. **Any block
differing by even one line is printed in full.** Comments and reference lists are never collapsed.

⚠️ **`IMPORT_EVENTS` spans the chunk 5/6 boundary**, split between `cu_TaskID` and `Event Name`.
Both chunks read, both UUIDs verified, splice recorded. It is complete here.

---

## 27 · IMPORT_EVENTS — 26 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_IMPORT_EVENTS`, indexing
`Minimal`; `In Scripts: import | pass to workspace`.

🔴 **The largest table in the schema, and the only one where the DDR prints `PrimaryKey` and the
four audit fields FIRST**, ahead of every business field. DDR order preserved below.

**5,290 records** — the second-highest count in the file after `UTILITY_LOGS`.

### import_raw_payload

`[STD-TEXT]`

Comments: `Whole original row/JSON, verbatim`
On Layouts: `table | IMPORT_EVENTS` · In Scripts: `import | write row numbers`, `import | copy Payload`

### import_Name

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`
In Scripts: `import | write row numbers`, `import | copy Payload`, `import | delete empty rows`, `import EVENT | remove ProdShortName`

### import_dateSTART

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
```

Comments: `just get the data in and safe. paste something if imported BLANK?`
On Layouts: `table | IMPORT_EVENTS`
In Scripts: `import | write row numbers`, `import | copy Payload`, `import | delete header row`, `import | bool all day`

### import_dateEND

`[STD-TEXT]`

Comments: `just get the data in and safe`
On Layouts: `table | IMPORT_EVENTS`
In Scripts: `import | write row numbers`, `import | copy Payload`, `import | bool all day`

⚠️ **`import_dateSTART` is `Minimal`, `import_dateEND` is `None`.** Same pair, two indexing
decisions. Both are typed **Text**, not Timestamp — deliberate per the comments, with the `calc_*`
family below doing the coercion.

### import_Style_Key

`[STD-TEXT]`

Comments: `just get the data in and safe`
On Layouts: `table | IMPORT_EVENTS` · In Scripts: `import | write row numbers`, `import | copy Payload`

### import_RowNumber

`[STD-NUM]`

Comments: `just get the data in and safe`
On Layouts: `table | IMPORT_EVENTS` · In Scripts: `import | write row numbers`, `import | copy Payload`

### fkUtilityReport

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`
In Relationships: `IMPORT_EVENTS_forImportSessions=UTILITY_REPORTS_for_Importing_Events`
In Scripts: `link | fkUtilityReport`, `link | fkReport fkProd Hash`, `import | delete empty rows`, `filter | to current run`

### fkProduction

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
```

Comments: `Stamped from the session, never derived`
On Layouts: `table | IMPORT_EVENTS` · In Scripts: `link | fkReport fkProd Hash`

### bool_AllDay

```
Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
```

Comments: `default = 0`
On Layouts: `table | IMPORT_EVENTS` · In Scripts: `import | bool all day`

⚠️ **`Indexing: All` on a boolean.** The only indexed boolean in the schema.

### calc_Start_dateTime

```
Calculated, Timestamp	Calculation:
Context table: view_IMPORT_EVENTS
view_IMPORT_EVENTS::import_dateSTART
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`

### calc_End_dateTime

```
Calculated, Timestamp	Calculation:
Context table: view_IMPORT_EVENTS
view_IMPORT_EVENTS::import_dateEND
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`

### calc_Start_date

```
Calculated, Date	Calculation:
Context table: view_IMPORT_EVENTS
view_IMPORT_EVENTS::calc_Start_dateTime
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`

### calc_End_date

```
Calculated, Date	Calculation:
Context table: view_IMPORT_EVENTS
view_IMPORT_EVENTS::calc_End_dateTime
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`

### calc_Start_time

```
Calculated, Time	Calculation:
Context table: view_IMPORT_EVENTS
view_IMPORT_EVENTS::calc_Start_dateTime
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`

### calc_End_time

```
Calculated, Time	Calculation:
Context table: view_IMPORT_EVENTS
view_IMPORT_EVENTS::calc_End_dateTime
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`

✅ **This calc family is correctly wired**, and it is worth saying plainly because two other calc
pairs in this schema are not: `dateTime` coerces from the raw text field, then `date` and `time`
each derive from their OWN `dateTime`. Start reads Start, End reads End, all six distinct.

### calc_Start_AMPM

```
Calculated, Text	Calculation:
Context table: view_IMPORT_EVENTS
Let ( [ ~time = GetAsTime ( view_IMPORT_EVENTS::calc_Start_dateTime ) ; ~temp = 0 ] ; Case ( ~time < Time ( 12 ; 0 ; 0 ) ; "AM" ; "PM" ) )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`

### calc_End_AMPM

```
Calculated, Text	Calculation:
Context table: view_IMPORT_EVENTS
Let ( [ ~time = GetAsTime ( view_IMPORT_EVENTS::calc_End_dateTime ) ; ~temp = 0 ] ; Case ( ~time < Time ( 12 ; 0 ; 0 ) ; "AM" ; "PM" ) )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS`

⚠️ Both declare **`~temp = 0`** in the `Let` and never use it. Copied verbatim.
⚠️ Midnight (`Time ( 0 ; 0 ; 0 )`) evaluates `< 12:00` and returns `"AM"`; an empty date coerces
to `0` and also returns `"AM"`. Stated as arithmetic on the printed expression, not as a verdict.

### hash_history

```
Normal, Text	Auto-Enter:
Allow editing
Context table: view_IMPORT_EVENTS
Calculation: view_IMPORT_EVENTS::cu_TaskID & "." & view_IMPORT_EVENTS::fkUtilityReport
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS` · In Scripts: `link | fkReport fkProd Hash`

⚠️ An **auto-enter** calc, not a stored calc field. The identical expression appears **commented
out** inside `link | fkReport fkProd Hash`
(`// Set Field [ view_IMPORT_EVENTS::hash_history; ... ]`) — the field now does what the script
line was going to do. Both facts as printed.

### cu_TaskID

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
```

Comments: `CU source task`
On Layouts: `table | IMPORT_EVENTS`
In Scripts: `import | write row numbers`, `import | copy Payload`, `link | fkReport fkProd Hash`, `import | pass to workspace`

### Event Name

`[STD-TEXT]`

Comments: `the cleaned, printed version, derived from import_Name`
On Layouts: `table | IMPORT_EVENTS` · In Scripts: `import EVENT | remove ProdShortName`, `import | remove maw notes`

🔴 **The field name contains a SPACE: `Event Name`.** Referenced in scripts as
`view_IMPORT_EVENTS::Event Name`. It is the only space-containing field name in the schema; every
other field uses underscores or camelCase. Verbatim.

### json_cleanImportDetails

```
Normal, Text	Auto-Enter:
Allow editing
Context table: view_IMPORT_EVENTS
Calculation: Param ( List ( PText ( "cuID" ; view_IMPORT_EVENTS::cu_TaskID ) ; PText ( "Name" ; view_IMPORT_EVENTS::Event Name ) ; PText ( "dateTime_Start" ; view_IMPORT_EVENTS::calc_Start_dateTime ) ; PText ( "dateTime_End" ; view_IMPORT_EVENTS::calc_End_dateTime ) ; Pbool ( "bool_AllDay" ; view_IMPORT_EVENTS::bool_AllDay ) ; PText ( "hash_current" ; view_IMPORT_EVENTS::hash_history ) ; PText ( "fkUtilityReport" ; view_IMPORT_EVENTS::fkUtilityReport ) ; PText ( "fkProduction" ; view_IMPORT_EVENTS::fkProduction ) ; PText ( "fkStyle" ; view_IMPORT_EVENTS::import_Style_Key ) )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | IMPORT_EVENTS` · In Scripts: `import | pass to workspace`

🔴 **This is the field-definition call site for the custom functions** — the DDR lists this field
under `In Field Definitions` for `Param`, `PText` and `Pbool`. It is the handoff payload:
`import | pass to workspace` passes it to `import | net new Event` and `import | merge Event`.

**The nine keys it emits, verbatim:** `cuID` · `Name` · `dateTime_Start` · `dateTime_End` ·
`bool_AllDay` · `hash_current` · `fkUtilityReport` · `fkProduction` · `fkStyle`.

⚠️ The DDR prints the calculation with **one unbalanced parenthesis** relative to the opening
`Param ( List (` — the trailing `)` for `Param` is not shown. Transcribed exactly as printed;
whether the DDR truncated it or the source is unbalanced cannot be determined from this document.

---

## 28 · EXPORT_SETS — 10 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_EXPORT_SETS`, indexing
`Minimal`; `In Value Lists: EXPORT_SETS`. Zero records.

### Name

`[STD-TEXT]` · On Layouts: `view_EXPORT_SETS` · In Value Lists: `EXPORT_SETS`

### SetExportPath

`[STD-TEXT]`

Comments: `if a file does not have a specified destination. <Show>_Calendar_<YYYYMMDD> convention`
On Layouts: **(none)**

### bool_RevertRecord

`[STD-NUM]`

Comments: `default = 0` · On Layouts: `view_EXPORT_SETS`

### bool_ScratchRecord

```
Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Comments: `default = 0` · On Layouts: `view_EXPORT_SETS`

### bool_DefaultRecord

`[STD-NUM]`

Comments: `default = 0` · On Layouts: `view_EXPORT_SETS`

⚠️ **Three booleans all commented `default = 0`, but only `bool_ScratchRecord` carries
`Constant data: 0`.** The other two have no auto-enter default. Printed as found.

---

## 29 · EXPORT_SET_ITEMS — 15 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_EXPORT_SET_ITEMS`,
indexing `Minimal`, no references. Zero records.

### Sort

`[STD-NUM]` · On Layouts: `view_EXPORT_SET_ITEMS`

### NameLocal

`[STD-TEXT]` · On Layouts: `view_EXPORT_SET_ITEMS`

### FileExportPath

`[STD-TEXT]`

Comments: `the final per-file export path choice. may be a reference to the SET's root`
On Layouts: **(none)**

### ovr_vl_OutputSize

`[STD-TEXT]` · On Layouts: **(none)**

### ovr_WeekStartDay · ovr_ShowLegend

Both `[STD-NUM]`. Each: On Layouts **(none)**.

⚠️ **The `ovr_` prefix marks per-item overrides of `EXPORT_PRESETS` values.** Three overrides here
against six settings on the preset — `bool_UseShortName` and `bool_ShowUnscheduled` have no `ovr_`
counterpart. Recorded, not judged.

### fkDocument

`[STD-TEXT]`

Comments: `back to the canonical DOC index. Decides WHICH overrides apply (based on <defa`
On Layouts: **(none)**

🔴 **This comment is TRUNCATED IN THE DDR ITSELF**, ending mid-word at `<defa`. The full text
exists only in the `.fmp12` file. **Nothing was cut in transcription** — this is exactly what the
source printed, and it is the one place in these 127 fields where a comment cannot be recovered
from the DDR.

### fkPrintSet

`[STD-TEXT]` · On Layouts: **(none)**

⚠️ Named `fkPrintSet` while the table it points at is `EXPORT_SETS`. The PRINT/EXPORT split shows
up again here and in `EXPORT_SESSIONS.fkPrintSet`.

### fkPreset

`[STD-TEXT]`

Comments: `The HOW. Everything not overridden above resolves from here`
On Layouts: **(none)**

### fkEdition

`[STD-TEXT]`

Comments: `Prelim | For Bid Only | Final. A PRINT is a VERSION of an edition`
On Layouts: **(none)**

⚠️ **Ten of this table's fifteen fields sit on NO layout**, and the table has zero relationships.
It is fully specified in fields and comments and not yet wired.

---

## 30 · EXPORT_PRESETS — 12 Fields

**Audit fields (5):** all five standard. 🔴 **`PrimaryKey` context table is `view_PRINT_PRESETS`,
not `view_EXPORT_PRESETS`** — the table's only occurrence, confirming the census note at field
level. Indexing `Minimal`, no references. Zero records.

### Name

`[STD-TEXT]`

Comments: `11x17 Full Company, Light Lab Only, Agenda`
On Layouts: `EXPORT_PRESETS`

### vl_OutputSize

`[STD-TEXT]` · On Layouts: `EXPORT_PRESETS`

### WeekStartDay

`[STD-NUM]`

Comments: `1=Sun ... 7=Sat. default = 1, SUNDAY`
On Layouts: `EXPORT_PRESETS`

⚠️ Comment says `default = 1`; options carry **no `Constant data:` line at all.**

### bool_UseShortName · bool_ShowLegend · bool_ShowUnscheduled

Three fields, each:

```
Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Each Comments: `default = 1` · Each: On Layouts `EXPORT_PRESETS`

🔴 **All three comments say `default = 1` while all three auto-enter `Constant data: 0`.** The
comment and the schema disagree on every one. Both copied exactly as printed.

### ExportFolder

`[STD-TEXT]`

Comments: `Relative. Never absolute - Get(FilePath) resolves the file Relative. Never absolute - Get(FilePath) resolves the file`
On Layouts: `EXPORT_PRESETS`

⚠️ **The comment text is DUPLICATED**, the same sentence twice with no separator. Verbatim.

---

## ⚠️ Next tables

**`EXPORT_SESSIONS` (31, 11 fields) is fully printed in chunk 6** and was read and UUID-verified
this pass, held for the next batch to keep this file under the read ceiling. **`UTILITY_SESSIONS`
(32) is cut mid-`ModificationTimestamp`** at the chunk 6/7 boundary; its partial text was
discarded rather than completed by inference.
