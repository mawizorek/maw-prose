---
id: mawster-ide-tables-05
title: "IDE mirror - Tables 31-37 (verbatim)"
type: reference
status: hidden
order: 6
revised: 2026-08
summary: Verbatim transcription of DDR tables 31-37, 71 fields. The session/log tables. Completes the Tables + Fields section.
provenance: see 20-tables/_ide/index.md
---

# IDE mirror - Tables 31-37 *(verbatim)*

**DDR order 31-37. FINAL BATCH — this completes all 37 tables and 398 fields.**
Source chunks 6-7 of 21, all UUIDs verified. **71 fields** — 11+12+15+13+7+6+7.

🔴 **Audit fields are NOT repeated here.** Verbatim blocks live in `20-tables/_ide/index.md`.
Each table states which are present and any variance. **Every non-audit field is transcribed in
full.**

`[STD-TEXT]` and `[STD-NUM]` refer to the shared options blocks defined in the index. **Any block
differing by even one line is printed in full.** Comments and reference lists are never collapsed.

⚠️ **`UTILITY_SESSIONS` spans the chunk 6/7 boundary**, split mid-`ModificationTimestamp`. Both
chunks read, both UUIDs verified, splice recorded. It is complete here.

🔴 **THIS BATCH BREAKS THE AUDIT-FIELD RULE ONCE.** `UTILITY_REPORTS.CreationTimestamp` carries a
layout reference — the first non-key audit field in 37 tables to reference anything. Recorded in
full below and corrected in the index.

---

## 31 · EXPORT_SESSIONS — 11 Fields

**Audit fields (5):** all five standard. 🔴 **`PrimaryKey` context table is `EXPORT_SESSIONS`, a
BASE occurrence with no `view_` prefix** — one of only two such contexts in the whole schema (the
other is `EVENTS_X_WORKDAYS.XfkWorkday`). Indexing `Minimal`, no references. Zero records.

### PrintedAt

```
Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `EXPORT_SESSIONS`

### EventRowCount

`[STD-NUM]`

Comments: `Count records printed`
On Layouts: `EXPORT_SESSIONS`

### snap_ExportPath

`[STD-TEXT]`

Comments: `fkExport_Set export path may change. this is a log.`
On Layouts: **(none)**

⚠️ The comment names **`fkExport_Set`**; the field below is `fkPrintSet`. Verbatim.
⚠️ The `snap_` prefix marks a snapshot. This is the pattern Realty Riley's guardrail warns about
in another domain: a snapshot does not inherit edits from its source. Recorded as a naming
observation only.

### fkPrintSet

`[STD-TEXT]` · On Layouts: `EXPORT_SESSIONS`

⚠️ Named PrintSet, pointing at `EXPORT_SETS`. Same PRINT/EXPORT split as
`EXPORT_SET_ITEMS.fkPrintSet` and the `view_PRINT_PRESETS` occurrence.

### Result_Pointer

`[STD-TEXT]`

Comments: `Link to the actual upload, if applicable.`
On Layouts: **(none)**

⚠️ **The only field in the schema using `Word_Word` capitalised-with-underscore casing.**
Everything else is camelCase or prefixed. Verbatim.

### Report_Container

```
Normal, Binary	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
```

Comments: `where the run report is exported to. A cover page, and then each exported file appended on to the end. Or a ZIP or the full tree.`
On Layouts: **(none)**

⚠️ Binary, so no `Indexing:` or `Index Language:` lines — the block genuinely ends at
`Repetitions: 1`. Nothing dropped.
⚠️ Printed **after** the audit fields, along with `Result_Pointer`.

---

## 32 · UTILITY_SESSIONS — 12 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_UTILITY_SESSIONS`,
indexing `Minimal`; its references: `On Layouts: Import New Events` ·
`In Relationships: UTILITY_REPORTS=UTILITY_SESSIONS` · `In Scripts: button | import EVENTS`.

### dateTime_Complete

```
Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Comments: `When the import is complete. Stamp failed runs too. Normalized.`
On Layouts: `view_UTILITY_SESSIONS`, `Import New Events`

### fkcurr_importProduction

`[STD-TEXT]`

Comments: `*not* fkCalendar`
On Layouts: `view_UTILITY_SESSIONS`, `Import New Events`
In Scripts: `button | import EVENTS`, `new-import-session`

⚠️ **The `fkcurr_` prefix appears on this field alone** in the whole schema. Verbatim.

### fkSource

`[STD-TEXT]` · On Layouts: `Import New Events`

⚠️ Points at `IMPORT_SOURCES` by intent; **no relationship.**

### countRows_File

`[STD-NUM]` · On Layouts: `Import New Events`

### countRows_Imported

`[STD-NUM]`

Comments: `Mismatch = reconcile before trusting the pull`
On Layouts: `Import New Events`

### countRows_Flagged

`[STD-NUM]`

Comments: `Rows whose production token did not resolve`
On Layouts: `Import New Events`

### Comment

`[STD-TEXT]` · On Layouts: `Import New Events`

⚠️ **All three `countRows_*` fields are written by nothing.** No script in the file sets them —
their `In Scripts` column is empty, and the import chain (`import | new events` through
`import | pass to workspace`) does not reference them. They sit on the `Import New Events` layout
as empty fields. Printed as found.

---

## 33 · UTILITY_REPORTS — 15 Fields

**Audit fields (5):** all five standard, with **TWO variances**:

🔴 **1. `PrimaryKey` is `Indexing: All`, not `Minimal`** — only the second table in 37 to do this
(`PRODUCTIONS` is the other). Context table `view_UTILITY_REPORTS`. Its references are the
heaviest of any key in the schema: `On Layouts: view | UTILITY_REPORTS`, `Import New Events` ·
`In Relationships: UTILTIY_LOGS_for_UTILITY_REPORTS=UTILITY_REPORTS`,
`IMPORT_EVENTS_forImportSessions=UTILITY_REPORTS_for_Importing_Events` ·
`In Scripts: goTo | view_UTILITY_REPORTS`, `goTo | Calendars`, `new | Utility Report` ·
`In Value Lists: UTILITY_REPORTS`.

🔴 **2. `CreationTimestamp` carries `On Layouts: Import New Events`.** **This is the ONLY non-key
audit field in all 37 tables that references anything.** The index's blanket claim that the four
non-key audit fields are referenced by nothing is **wrong here**, and has been corrected there.
Its options block is otherwise the standard block, byte for byte.

### Title

`[STD-TEXT]`

Comments: `Local run tilte.`
On Layouts: `view | UTILITY_REPORTS`, `Import New Events` · In Scripts: `new | Utility Report`

⚠️ **`tilte` is a typo in the comment** (title). Comment text only, not a field name. Verbatim.

### Comment

`[STD-TEXT]`

Comments: `Runtime comment from user (nullable).`
On Layouts: `view | UTILITY_REPORTS`, `Import New Events` · In Scripts: `new | Utility Report`

### RunSummary

`[STD-TEXT]`

Comments: `Closing report. Ideally not blank.`
On Layouts: `view | UTILITY_REPORTS`, `Import New Events`
In Scripts: `new | Utility Report`, `end | Utility Report`

### dateTime_Start

```
Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
```

On Layouts: `view | UTILITY_REPORTS`, `Import New Events`
In Scripts: `new | Utility Report` · In Value Lists: `UTILITY_REPORTS`

### dateTime_End

```
Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `view | UTILITY_REPORTS`, `Import New Events`
In Scripts: `new | Utility Report`, `end | Utility Report`

⚠️ **`dateTime_Start` is `All`, `dateTime_End` is `None`.** The same start-indexed/end-unindexed
asymmetry as `IMPORT_EVENTS.import_dateSTART` / `import_dateEND`.

### media_RunReport

```
Normal, Binary	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
```

Comments: `nullable container for report result attachment`
On Layouts: `view | UTILITY_REPORTS`
In Scripts: `new | Utility Report`, `end | Utility Report`

⚠️ Both script references are to **commented-out** `Set Field` lines
(`// Set Field [ view_UTILITY_REPORTS::media_RunReport; $fkReport ]`). The DDR lists them anyway.
Both facts as printed.

### bool_Pass

`[STD-NUM]`

Comments: `default = null. Pass = 1. Fail = 0.`
On Layouts: `view | UTILITY_REPORTS`, `Import New Events`
In Scripts: `new | Utility Report`, `end | Utility Report`

✅ **Comment and options AGREE here**, and it is worth marking: the comment says `default = null`
and the options carry **no `Constant data:` line**, which is exactly what produces null. Every
other boolean in the schema commented with a default either contradicts its options or has none.
This is the one that is internally consistent.

### vl_Status

`[STD-TEXT]`

Comments: `complete | partial | failed`
On Layouts: `view | UTILITY_REPORTS`, `Import New Events` · In Scripts: `new | Utility Report`

⚠️ `new | Utility Report` sets this to the literal `"New"`
(`Set Field [ view_UTILITY_REPORTS::vl_Status; "New" ]`), which is **not among the three values
the comment names.** Both as printed.

### fkUtilitySession

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

On Layouts: `view | UTILITY_REPORTS`
In Relationships: `UTILITY_REPORTS=UTILITY_SESSIONS` · In Scripts: `new | Utility Report`

### fkAppSession

`[STD-TEXT]`

On Layouts: `view | UTILITY_REPORTS` · In Scripts: `new | Utility Report`

⚠️ Named `fkAppSession` here, while `UTILITY_LOGS` calls the same concept
**`fkAppSessionToken`**. Both are written from `view_GLOBAL_USE::g_pkCurrentAppSession`. Two names,
one value.

---

## 34 · UTILITY_LOGS — 13 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_UTILITY_LOGS`, indexing
`Minimal`; `In Scripts: new | Utility Log`.

**4,939 records** — the highest count in the file.

### Action

`[STD-TEXT]`

Comments: `(prose) session | script | pull`
On Layouts: `view | UTILITY_LOGS` · In Scripts: `new | Utility Log`

### Timestamp

```
Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `view | UTILITY_LOGS` · In Scripts: `new | Utility Log`

⚠️ A field named `Timestamp` sitting alongside `CreationTimestamp`, both written on creation, and
the relationship `UTILTIY_LOGS_for_UTILITY_REPORTS=UTILITY_REPORTS` sorts on **this** one
descending. `Indexing: None` on the sort field of a 4,939-row relationship. Printed as found.

### Comment

`[STD-TEXT]` · On Layouts: `view | UTILITY_LOGS` · In Scripts: `new | Utility Log`

### json_Params

`[STD-TEXT]`

Comments: `The inbound script parameter, verbatim`
On Layouts: `view | UTILITY_LOGS` · In Scripts: `new | Utility Log`

### ErrorCode

`[STD-NUM]`

Comments: `Get(LastError) from the failing step, 0 on success`
On Layouts: `view | UTILITY_LOGS` · In Scripts: `new | Utility Log`

⚠️ `new | Utility Log` sets this to the literal string `"0"` on every call
(`Set Field [ view_UTILITY_LOGS::ErrorCode; "0" ]`) and there is no other writer, so no failing
step's `Get(LastError)` reaches it. Field is `Normal, Number`; the assigned value is quoted text.
Both as printed.

### fkRunReport

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

Comments: `nullable. linkable to a Run Report`
On Layouts: `view | UTILITY_LOGS`
In Relationships: `UTILTIY_LOGS_for_UTILITY_REPORTS=UTILITY_REPORTS` · In Scripts: `new | Utility Log`

### fkAppSessionToken

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

Comments: `One UUID per file session. Pairs the open row to the close row. Every script run in that session carries the same token`
On Layouts: `view | UTILITY_LOGS` · In Scripts: `new | Utility Log`

### auto_counter

```
Normal, Number	Auto-Enter:
Allow editing
Serial: Generate: On creation, Next value: 4153, Increment: 1
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `view | UTILITY_LOGS`

🔴 **The only serial-number field in the entire schema.** Every other identity field is
`Get( UUID )`. Printed after the audit fields.
⚠️ **`Next value: 4153` against 4,939 records in the table.** The serial's next value is 786 lower
than the record count. Stated as arithmetic on two printed DDR figures; what it means is not
determined by this document.

### 🔴 The `<Field Missing>` in `new | Utility Log` — triangulated

`70-scripts/_ide/90-UTILITY/LOGS.md` transcribes a **live** step in `new | Utility Log`:

```
Set Field [ view_UTILITY_LOGS::<Field Missing>; "open" ]
```

plus two more commented-out `<Field Missing>` lines. Three facts from three separate transcribed
documents:

1. **`UTILITY_LOGS` has 13 fields and NONE of them holds a state or status value.** The full list
   is above: `Action`, `Timestamp`, `Comment`, `json_Params`, `ErrorCode`, `fkRunReport`,
   `fkAppSessionToken`, `auto_counter`, plus the five audit fields.
2. A native value list **`open | close`** exists with values `open, close`, and
   `25-value-lists/_ide/value-lists.md` records it as **bound to no layout**.
3. The script's own comment block describes pairing an open row to a close row via
   `fkAppSessionToken`.

**So the field the script writes `"open"` into does not exist in the table, and the value list
built for it is unbound.** This is a reading of three transcriptions, not a test run. **Nothing
has been changed.**

---

## 35 · auto_LAYOUTS — 7 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_auto_LAYOUTS`, indexing
`Minimal`, no references. Zero records.

### Sort

`[STD-NUM]` · On Layouts: `view | auto_LAYOUTS`

### Name

`[STD-TEXT]` · On Layouts: `view | auto_LAYOUTS`

⚠️ **The only lowercase-prefixed table name in the schema** (`auto_LAYOUTS`). No script writes to
it and it holds zero records.

---

## 36 · ORGANIZATION — 6 Fields

**Audit fields (5):** all five standard, printed **FIRST**. `PrimaryKey` context table
`view_ORGANIZATION`, indexing `Minimal`, no references. Zero records.

### Name

`[STD-TEXT]` · On Layouts: `view | ORGANIZATION`

🔴 **The smallest table in the schema: five audit fields plus one `Name`.** Transcribed complete;
there is no omission here.

---

## 37 · APP_SESSIONS — 7 Fields

**Audit fields (5):** all five standard, printed **FIRST** (as in `IMPORT_EVENTS` and
`ORGANIZATION`). `PrimaryKey` context table `view_APP_SESSIONS`, indexing `Minimal`, no
references. **2 records.**

### StartTimestamp

```
Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `view | APP_SESSIONS` · In Scripts: `trigger_App_Open`

### ClosedTimestamp

Options identical to `StartTimestamp` above.

On Layouts: `view | APP_SESSIONS` · In Scripts: **(none)**

⚠️ **`StartTimestamp` / `ClosedTimestamp`** — Start vs Closed, not Start/End or Opened/Closed.
Verbatim.
⚠️ **Nothing writes `ClosedTimestamp`.** Its `In Scripts` column is empty, and
`70-scripts/_ide/APP-CLOSE.md` shows `on App Close` performing only a commit, a log and a backup.
⚠️ The one script that writes `StartTimestamp` is **`trigger_App_Open`**, which
`90-UTILITY/index.md` records as having **no inbound caller**; File Options binds
`OnFirstWindowOpen` to `on App Open` instead. The live session token path is
`new | App Session Token` → `view_GLOBAL_USE::g_pkCurrentAppSession`, which never touches this
table. Recorded from three transcriptions; no verdict.

---

## 📁 Base Directories — verbatim

The DDR prints one more block at the end of the Tables section:

```
Base Directories

ID	Path
0	Production_MAWster/
```

🔴 **The base directory is `Production_MAWster/` — spelled MAWster. The file is
`Production_MAWnster.fmp12` — spelled MAWnster, with an `n`.** Two spellings of the app name in
one DDR. Both copied exactly as printed.

---

## ✅ SECTION COMPLETE

**37 of 37 tables. 398 of 398 fields.** Batch counts reconcile against the DDR census:
104 + 96 + 64 + 63 + 71 = **398**.

Next uncaptured DDR section: **Layouts + Layout Objects** (54 layouts, chunks 8-17).
