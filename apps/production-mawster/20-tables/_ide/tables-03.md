---
id: mawster-ide-tables-03
title: "IDE mirror - Tables 21-26 (verbatim)"
type: reference
status: hidden
order: 4
revised: 2026-08
summary: Verbatim transcription of DDR tables 21-26, 64 fields. Theme, value-list and import-source tables.
provenance: see 20-tables/_ide/index.md
---

# IDE mirror - Tables 21-26 *(verbatim)*

**DDR order 21-26.** Source chunks 4-5 of 21, all UUIDs verified. **64 fields** —
10+11+13+11+10+9.

⚠️ **Batch 3 was split at write time.** Tables 21-30 measured 24,036 bytes as one file, over the
~22KB read ceiling, so it was cut at the domain seam: **theme/value tables here, the
import-export pipeline in `tables-04.md`.** Both halves are table-complete.

🔴 **Audit fields are NOT repeated here.** Verbatim blocks live in `20-tables/_ide/index.md`.
Each table states which are present and any `PrimaryKey` variance. **Every non-audit field is
transcribed in full.**

`[STD-TEXT]` and `[STD-NUM]` refer to the shared options blocks defined in the index. **Any block
differing by even one line is printed in full.** Comments and reference lists are never collapsed.

⚠️ **`THEME_TYPOGRAPHY` spans the chunk 4/5 boundary**, split mid-`LineWeight`. Both chunks read,
both UUIDs verified, splice recorded. It is complete here.

---

## 21 · THEMES_X_STYLES — 10 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_THEMES_X_STYLES`,
indexing `Minimal`, no references. Zero records.

**The theme×style join.** Every business field carries a comment.

### fkStyle

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

Comments: `predicate 2`
On Layouts: `view | THEMES_X_STYLES`, `table | THEMES_X_STYLES Copy`
In Relationships: `THEMES_X_STYLES=STYLES`

### fkTheme

Options identical to `fkStyle` above (`Indexing: All`).

Comments: `predicate 1`
On Layouts: `view | THEMES_X_STYLES`, `table | THEMES_X_STYLES Copy`
In Relationships: `THEMES_X_STYLES=THEMES`

⚠️ `fkStyle` is printed **first** but commented `predicate 2`; `fkTheme` is printed second and
commented `predicate 1`. Order and numbering disagree. Verbatim.

### fkColor_Text

`[STD-TEXT]`

Comments: `empty = inherit`
On Layouts: `view | THEMES_X_STYLES`, `table | THEMES_X_STYLES Copy`
In Relationships: `THEME_COLORS_Text_forStyleThemeJoin=THEMES_X_STYLES`

### fkColor_Fill

`[STD-TEXT]`

Comments: `empty = inherit`
On Layouts: `view | THEMES_X_STYLES`, `table | THEMES_X_STYLES Copy`
In Relationships: `THEME_COLORS_Fill_forStyleThemeJoin=THEMES_X_STYLES`

### fkTypography

`[STD-TEXT]`

Comments: `empty = inherit`
On Layouts: `view | THEMES_X_STYLES`, `table | THEMES_X_STYLES Copy`
In Relationships: `THEME_TYPOGRAPHY_forStyleThemeJoin=THEMES_X_STYLES`

⚠️ **The two predicate keys are `Indexing: All`; the three inheritance keys are `None`.** Read as
printed: the join is indexed, the payload is not.

---

## 22 · THEME_COLORS — 11 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_THEME_COLORS`, indexing
`Minimal`; `In Relationships: THEME_COLORS_Text_forStyleThemeJoin=THEMES_X_STYLES`,
`THEME_COLORS_Fill_forStyleThemeJoin=THEMES_X_STYLES`. Zero records.

### Name

`[STD-TEXT]` · On Layouts: `view | THEME_COLORS`

### SortLabel

`[STD-TEXT]` · On Layouts: **(none)**

⚠️ **On no layout, in no relationship, script or value list.** The only field in this table that
is referenced by nothing.

### R · G · B

Three fields, each `[STD-NUM]`. Each: On Layouts `view | THEME_COLORS`.

### calc_Hex

```
Calculated, Number	Calculation:
Context table: view_THEME_COLORS
view_THEME_COLORS::R
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: **(none)**

🔴 **The calculation is `view_THEME_COLORS::R` alone.** A field named `calc_Hex`, typed
`Calculated, Number`, returning only the red channel — G and B are not in the expression. Copied
exactly as printed. **No correction made or implied.**

---

## 23 · THEME_TYPOGRAPHY — 13 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_THEME_TYPOGRAPHY`,
indexing `Minimal`; `In Relationships: THEME_TYPOGRAPHY_forStyleThemeJoin=THEMES_X_STYLES`.
Zero records.

### Name · Font

Both `[STD-TEXT]`. Each: On Layouts `view | THEME_TYPOGRAPHY`.

### Size

`[STD-NUM]` · On Layouts: `view | THEME_TYPOGRAPHY`

### bool_italic · bool_bold · bool_underline

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

Each Comments: `default = 0` · Each: On Layouts `view | THEME_TYPOGRAPHY`

⚠️ **Lowercase suffixes** (`bool_italic`), where every other boolean in the schema uses
capitalised words (`bool_AllDay`, `bool_isMilestone`, `bool_UseShortName`). Verbatim.

### vl_Case

`[STD-TEXT]`

Comments: `none | upper | title | lower. needs Upper() on a display calc`
On Layouts: `view | THEME_TYPOGRAPHY`

### LineWeight

`[STD-NUM]`

Comments: `layout property, not formatting`
On Layouts: `view | THEME_TYPOGRAPHY`

---

## 24 · VALUE_LISTS — 11 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_VALUE_LISTS`, indexing
`Minimal`; `In Relationships: VALUES=VALUE_LISTS` · `In Value Lists: Value_Lists`.

🔴 **This is the TABLE-DRIVEN value-list system, not the native value lists.** The native ones are
transcribed at `25-value-lists/_ide/value-lists.md`. Two systems, same vocabulary, both live.

### Name

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

On Layouts: `view_VALUE_LISTS`, `VALUE_LISTS` · In Value Lists: `Value_Lists`

### Sort

`[STD-NUM]`

On Layouts: `view_VALUE_LISTS`, `VALUE_LISTS` · In Scripts: `status_index_move`

### bool_isStatusList

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

Comments: `default = 0` · On Layouts: `view_VALUE_LISTS`, `VALUE_LISTS`

### bool_RequireUniqueInCategory

`[STD-NUM]` · On Layouts: `view_VALUE_LISTS`, `VALUE_LISTS`

⚠️ **No `Constant data: 0` line and no comment**, unlike its sibling `bool_isStatusList`
directly above. Two booleans, two defaulting decisions.

### g_valuesFor_Activity_Log_Types · g_valuesFor_Status_Categories

Two global fields, both:

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
```

`g_valuesFor_Activity_Log_Types`: On Layouts `VALUE_LISTS` · In Relationships `valuesFor_Activity_Log_Types=VALUE_LISTS`
`g_valuesFor_Status_Categories`: On Layouts `VALUE_LISTS` · In Relationships `valuesFor_Status_Categories=VALUE_LISTS`

⚠️ **`Storage: Global` with no `Indexing:` line**, matching the six globals in `GLOBAL_USE`.
⚠️ Both are printed **after** the audit fields, at the very end of the table.
⚠️ **Globals used as the right side of a relationship predicate** — the mechanism behind the two
value lists that filter by category.

---

## 25 · VALUES — 10 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_VALUES`, indexing
`Minimal`; `In Value Lists: values_Status_Categories`, `values_Utility_Action_Types`,
`valueStatuses_Utility_Run`, `VALUES`.

### Name

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

On Layouts: `view_VALUES`, `VALUE_LISTS`
In Value Lists: `values_Status_Categories`, `values_Utility_Action_Types`, `valueStatuses_Utility_Run`, `VALUES`

⚠️ **One field feeding four native value lists.** Two of those four (`values_Utility_Action_Types`,
`valueStatuses_Utility_Run`) are byte-identical definitions bound to no layout — see
`25-value-lists/_ide/`.

### Sort

`[STD-NUM]` · On Layouts: `view_VALUES`, `VALUE_LISTS`

### fkList

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

On Layouts: `view_VALUES`
In Relationships: `valuesFor_Activity_Log_Types=VALUE_LISTS`, `VALUES=VALUE_LISTS`, `valuesFor_Status_Categories=VALUE_LISTS`
In Scripts: `status_index_move`

⚠️ **One field, three relationships.** All three `VALUES`-side occurrences join on it.

### fkStatusCategory · fkStyle

Both `[STD-TEXT]`. Each: On Layouts `view_VALUES`, `VALUE_LISTS`.

⚠️ `fkStatusCategory` points back into this same table (a `VALUES` row categorising a `VALUES`
row) and carries **no relationship**. Verbatim.

---

## 26 · IMPORT_SOURCES — 9 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_IMPORT_SOURCES`,
indexing `Minimal`, no references.

### Name

`[STD-TEXT]` · On Layouts: `view_IMPORT_SOURCES`, `table | IMPORT_SOURCES`

### Path

`[STD-TEXT]`

Comments: `nullable. For csv only`
On Layouts: `view_IMPORT_SOURCES`, `table | IMPORT_SOURCES`

### Link

`[STD-TEXT]`

Comments: `nullable. for API, listRef, etc`
On Layouts: `view_IMPORT_SOURCES`, `table | IMPORT_SOURCES`

### raw_Content

```
Normal, Binary	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
```

On Layouts: `table | IMPORT_SOURCES`

⚠️ **Binary, so no `Indexing:` or `Index Language:` lines** — the block genuinely ends at
`Repetitions: 1`. Nothing dropped.
⚠️ Printed **after** the audit fields.

---

## ⚠️ Continued

**Tables 27-30** (`IMPORT_EVENTS`, `EXPORT_SETS`, `EXPORT_SET_ITEMS`, `EXPORT_PRESETS`) are in
**`tables-04.md`**.
