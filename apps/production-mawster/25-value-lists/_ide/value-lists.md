---
id: mawster-ide-value-lists
title: "IDE mirror - Value Lists (verbatim)"
type: reference
status: hidden
order: 1
revised: 2026-08
summary: Verbatim transcription of all 14 native FileMaker value lists in Production_MAWnster.
---

# IDE mirror - Value Lists *(verbatim)*

<!-- VERBATIM TRANSCRIPTION. Nothing corrected, nothing interpreted.
     Source: mawizorek/uritp-docs @ d47535e,
     production-mawster/90-file-imports-temp/DDR_imports/2608151650/raw.txt, part 16/21.
     Chunk set UUID 7534bbed-6a2a-4d5a-a2a2-7d3b00ced5b8, START/END UUIDs verified.
     Sibling convention: production-mawster/70-scripts/_ide/
     PLACEMENT: ruled 2026-08-16 by Michael - "25-value-lists/ name it".
     Was provisionally at 15-runtime/_ide/value-lists.md for ~1 hour; that path is deleted. -->

**This is a TRANSCRIPTION, not documentation.** Same contract as `70-scripts/_ide/`: copy, not
commentary.

✅ **Placement is SETTLED.** Michael ruled `25-value-lists/` on 2026-08-16. The number slots it
between `20-tables` (schema) and `30-RELATIONSHIPS` (the graph), which is where a picker
resource belongs: downstream of fields, upstream of joins.

⚠️ **NATIVE value lists are NOT the `VALUE_LISTS` table.** This app also carries a
data-driven value-list system in tables (`VALUE_LISTS`, 3 records; `VALUES`, 10 records) with
its own layout, globals and `status_index_move` script. **The 14 objects below are the
FileMaker-native definitions.** The two systems overlap by design and by name; do not merge
them, and do not read a native list here as evidence about a table row.

## Completeness

The DDR Overview reports **`Value Lists 14`**. Fourteen entries are printed in the Value Lists
section and all fourteen are transcribed below. The set is complete.

🔴 **This section did not exist in DDR `2608142227`, which reported `Value Lists 0`.** That was
previously flagged as a possible DDR omission. It was not: the lists genuinely were not there
on Aug 14 and were created before Aug 15. Same story for Custom Functions (`0` → `10`).

## Index

| # | Value List Name | Source | Shape |
|---|---|---|---|
| 1 | `PRODUCTIONS` | Field | `PRODUCTIONS_forCalendars` key + `TitleDisplay`, scoped to TO `CALENDARS` |
| 2 | `LOCATION_TYPES` | Field | `view_LOCATION_TYPES` key + `Name` |
| 3 | `PRODUCERS` | Field | `view_PRODUCER_INFO` key + `NameDisplay` |
| 4 | `LOCATIONS` | Field | `view_LOCATIONS` key + `NameDisplay` |
| 5 | `EXPORT_SETS` | Field | `view_EXPORT_SETS` key + `Name` |
| 6 | `One` | **Custom** | literal `1` |
| 7 | `values_Status_Categories` | Field | `valuesFor_Status_Categories` key + `Name`, scoped to TO `VALUE_LISTS` |
| 8 | `Value_Lists` | Field | `view_VALUE_LISTS` key + `Name` |
| 9 | `open \| close` | **Custom** | literal `open, close` |
| 10 | `values_Utility_Action_Types` | Field | `view_VALUES` key + `Name` |
| 11 | `valueStatuses_Utility_Run` | Field | `view_VALUES` key + `Name` |
| 12 | `VALUES` | Field | `VALUES` key + `Name` |
| 13 | `UTILITY_REPORTS` | Field | `UTILITY_REPORTS` key + `dateTime_Start`, **sort by FIRST field** |
| 14 | `CALENDARS` | Field | `view_CALENDARS` key + `Title` |

⚠️ The index is a navigation aid built from the verbatim blocks below. **The blocks are the record.**

---

## Value list blocks, verbatim

### 1 · PRODUCTIONS

```
Value List Name    PRODUCTIONS
Source             Field

Primary Field
Field: PRODUCTIONS_forCalendars::PrimaryKey

Secondary Field
Field: PRODUCTIONS_forCalendars::TitleDisplay

Show values only from second field
Sort by second field
Table Occurrence: CALENDARS

On Layouts:
HOME
table | CALENDARS
table | CALENDARS
table | IMPORT_EVENTS
table | EVENTS
Import New Events
print | Agenda Calendar
```

⚠️ Carries an explicit **`Table Occurrence: CALENDARS`** scope, which means the list is
evaluated from that occurrence's context. Only this list and `values_Status_Categories` do.
⚠️ `table | CALENDARS` is printed **twice** in the On Layouts list. Copied as printed — there
are two distinct layouts of that exact name in the file (see the Layout Hierarchy: one under
`Normalized`, one under `NORMALIZED TABLES`).

---

### 2 · LOCATION_TYPES

```
Value List Name    LOCATION_TYPES
Source             Field

Primary Field
Field: view_LOCATION_TYPES::PrimaryKey

Secondary Field
Field: view_LOCATION_TYPES::Name

Show values only from second field
Sort by second field

On Layouts:
table | LOCATIONS
```

---

### 3 · PRODUCERS

```
Value List Name    PRODUCERS
Source             Field

Primary Field
Field: view_PRODUCER_INFO::PrimaryKey

Secondary Field
Field: view_PRODUCER_INFO::NameDisplay

Show values only from second field
Sort by second field

On Layouts:
table | PRODUCTIONS
table | PRODUCTIONS
```

---

### 4 · LOCATIONS

```
Value List Name    LOCATIONS
Source             Field

Primary Field
Field: view_LOCATIONS::PrimaryKey

Secondary Field
Field: view_LOCATIONS::NameDisplay

Show values only from second field
Sort by second field

On Layouts:
table | PRODUCTIONS
table | PRODUCTIONS
```

---

### 5 · EXPORT_SETS

```
Value List Name    EXPORT_SETS
Source             Field

Primary Field
Field: view_EXPORT_SETS::PrimaryKey

Secondary Field
Field: view_EXPORT_SETS::Name

Show values only from second field
Sort by second field

On Layouts:
table | CALENDARS
table | CALENDARS
```

---

### 6 · One

```
Value List Name    One
Source             Custom

Values:
1

On Layouts:
view_VALUE_LISTS
table | STANDARD_EVENTS
table | EVENTS
VALUE_LISTS
event portal
print | Agenda Calendar
```

The single-value custom list behind every `Checkbox Set` in the file (the boolean checkbox
pattern: `Display values from: One`).

---

### 7 · values_Status_Categories

```
Value List Name    values_Status_Categories
Source             Field

Primary Field
Field: valuesFor_Status_Categories::PrimaryKey

Secondary Field
Field: valuesFor_Status_Categories::Name

Show values only from second field
Sort by second field
Table Occurrence: VALUE_LISTS

On Layouts:
view_VALUES
VALUE_LISTS
```

⚠️ Note the name: the value LIST is `values_Status_Categories` (lowercase `values_`) while the
table OCCURRENCE it reads is `valuesFor_Status_Categories`. Two similar names, one character
apart in effect. Copied verbatim, both.

---

### 8 · Value_Lists

```
Value List Name    Value_Lists
Source             Field

Primary Field
Field: view_VALUE_LISTS::PrimaryKey

Secondary Field
Field: view_VALUE_LISTS::Name

Show values only from second field
Sort by second field

On Layouts:
view_VALUES
VALUE_LISTS
```

⚠️ `Value_Lists` (the value list) vs `VALUE_LISTS` (the table, the table occurrence, AND a
layout name). Four things, three casings, one word. Copied verbatim.

---

### 9 · open | close

```
Value List Name    open | close
Source             Custom

Values:
open, close

On Layouts:
(none)
```

⚠️ **The values are printed as the single line `open, close`.** Whether that is two values or
one comma-containing value is not resolvable from the DDR text, and no guess is made here.
⚠️ Bound to no layout. The string `"open"` is written by `new | Utility Log` via
`Set Field [ view_UTILITY_LOGS::<Field Missing>; "open" ]`, which is a script literal, not
this list.

---

### 10 · values_Utility_Action_Types

```
Value List Name    values_Utility_Action_Types
Source             Field

Primary Field
Field: view_VALUES::PrimaryKey

Secondary Field
Field: view_VALUES::Name

Show values only from second field
Sort by second field

On Layouts:
(none)
```

---

### 11 · valueStatuses_Utility_Run

```
Value List Name    valueStatuses_Utility_Run
Source             Field

Primary Field
Field: view_VALUES::PrimaryKey

Secondary Field
Field: view_VALUES::Name

Show values only from second field
Sort by second field

On Layouts:
(none)
```

⚠️ Definitionally **identical** to `values_Utility_Action_Types` (#10): same primary field,
same secondary field, same options, both unbound to any layout. Two names, one definition.
Both transcribed; no judgement offered here.

---

### 12 · VALUES

```
Value List Name    VALUES
Source             Field

Primary Field
Field: VALUES::PrimaryKey

Secondary Field
Field: VALUES::Name

Show values only from second field
Sort by second field

On Layouts:
(none)
```

Reads the base `VALUES` occurrence, where #10 and #11 read `view_VALUES`.

---

### 13 · UTILITY_REPORTS

```
Value List Name    UTILITY_REPORTS
Source             Field

Primary Field
Field: UTILITY_REPORTS::PrimaryKey

Secondary Field
Field: UTILITY_REPORTS::dateTime_Start

Sort by first field

On Layouts:
table | IMPORT_EVENTS
```

⚠️ **The only list in the file with NO `Show values only from second field`**, so it displays
both the key and the timestamp. ⚠️ Also the only one that **sorts by the FIRST field** — a
UUID — rather than the second. Copied as printed.

---

### 14 · CALENDARS

```
Value List Name    CALENDARS
Source             Field

Primary Field
Field: view_CALENDARS::PrimaryKey

Secondary Field
Field: view_CALENDARS::Title

Show values only from second field
Sort by second field

On Layouts:
table | EVENTS
event portal
print | Agenda Calendar
```

---

## Layout bindings observed elsewhere in the DDR

The Layout Objects sections name value lists at each field. Recorded here as cross-reference
only; the blocks above are the definitions.

```
PRODUCTIONS      view_CALENDARS::fkProduction         (Pop-up Menu, table | CALENDARS)
PRODUCTIONS      view_PRODUCTIONS  … via EVENTS::fkProduction (Pop-up Menu, print | Agenda Calendar)
PRODUCTIONS      UTILITY_SESSIONS::fkcurr_importProduction (Pop-up Menu, Import New Events)
PRODUCERS        view_PRODUCTIONS::fkProducer         (Pop-up Menu, table | PRODUCTIONS)
LOCATIONS        view_PRODUCTIONS::fkVenue            (Pop-up Menu, table | PRODUCTIONS)
EXPORT_SETS      view_CALENDARS::fkDefaultExportSet   (Pop-up Menu, table | CALENDARS)
One              VALUE_LISTS::bool_isStatusList        (Checkbox Set, VALUE_LISTS)
One              VALUE_LISTS::bool_RequireUniqueInCategory (Checkbox Set, VALUE_LISTS)
One              EVENTS::bool_AllDay                  (Checkbox Set, print | Agenda Calendar)
One              EVENTS::autoBool_unscheduled         (Checkbox Set, print | Agenda Calendar)
values_Status_Categories  VALUES::fkStatusCategory    (Pop-up Menu, VALUE_LISTS)
Value_Lists      VALUE_LISTS::g_valuesFor_Activity_Log_Types (Pop-up Menu, VALUE_LISTS)
Value_Lists      VALUE_LISTS::g_valuesFor_Status_Categories  (Pop-up Menu, VALUE_LISTS)
```

⚠️ **This cross-reference is PARTIAL.** It covers only the Layout Objects blocks read during
this pass (chunks 8, 10, 15-16). The Layout Objects section spans roughly chunks 9-17 and was
not read end to end. **Do not treat it as the complete binding census** — the `On Layouts`
lines inside each block above are the DDR's own answer to that question.
