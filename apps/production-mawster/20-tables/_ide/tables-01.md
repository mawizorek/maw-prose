---
id: mawster-ide-tables-01
title: "IDE mirror - Tables 1-10 (verbatim)"
type: reference
status: hidden
order: 2
revised: 2026-08
summary: Verbatim transcription of DDR tables 1-10, 104 fields. Audit fields per the standard blocks in the tables index.
provenance: see 20-tables/_ide/index.md
---

# IDE mirror - Tables 1-10 *(verbatim)*

**DDR order 1-10.** Source chunks 1-2 of 21, both UUIDs verified. **104 fields** — 11+5+5+15+7+15+7+18+8+13.

🔴 **Audit fields (`PrimaryKey`, `CreationTimestamp`, `CreatedBy`, `ModificationTimestamp`,
`ModifiedBy`) are NOT repeated here.** Their verbatim blocks are in `20-tables/_ide/index.md`.
Each table below states which are present and any `PrimaryKey` variance. **Every non-audit field
is transcribed in full.**

---

## 1 · GLOBAL_USE — 11 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_GLOBAL_USE`, indexing `Minimal`.

**Six global fields, all sharing this exact options block:**

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

⚠️ `Storage: Global` and **no `Indexing:` line at all** — globals are not indexed. All six are
`On Layouts: HOME`. They differ only in `In Scripts`:

| Field | In Scripts |
|---|---|
| `g_pkCurrentTheme` | (none) |
| `g_pkCurrentAppSession` | `new | App Session Token`, `new | Utility Report`, `new | Utility Log` |
| `g_pkCurrentProduction` | `new-import-session`, `lookup | calendar for production`, `goTo | Calendars` |
| `g_pkCurrentUtilitySession` | `set Global | pkCurrentUtilitySession`, `new | Utility Report` |
| `g_AppTitle` | `file | Create Backup` |
| `g_AppTitleShort` | (none) |

No comments, no relationships, no value lists on any of the six.

---

## 2 · GLOBAL_EXPORT — 5 Fields

🔴 **This table contains NOTHING BUT the five standard audit fields.** No business fields at all.
`PrimaryKey` context table `view_GLOBAL_EXPORT`, indexing `Minimal`. Zero records, and its
occurrence `view_GLOBAL_EXPORT` backs the layout `view | GLOBAL_EXPORT_VARIABLES`.

Transcribed complete. There is no omission here.

---

## 3 · APP_DEVICE_SETUP — 5 Fields

🔴 **Also nothing but the five standard audit fields.** `PrimaryKey` context table
`view_APP_DEVICE_SETUP`, indexing `Minimal`. Zero records; layout `view | APP_DEVICE_SETUP`
exists and shows no regular fields.

Transcribed complete.

---

## 4 · PRODUCTIONS — 15 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_PRODUCTIONS`,
🔴 **indexing `All` — NOT `Minimal`.** Its references: `On Layouts: table | PRODUCTIONS` ·
`In Relationships: CALENDARSxPRODUCTIONS_forCalendars` · `In Scripts: lookup | production short` ·
`In Value Lists: PRODUCTIONS`.

### Title

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

On Layouts: `table | PRODUCTIONS`, `table | PRODUCTIONS` *(printed twice)*

### TitleShort

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Unique
Error message: Not a unique ID.
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | PRODUCTIONS`, `table | PRODUCTIONS` · In Scripts: `lookup | production short`

⚠️ Carries a **custom validation error message**, the only one in these ten tables.

### TitleDisplay

```
Normal, Text	Auto-Enter:
Allow editing
Do not replace existing value for field (if any)
Context table: view_PRODUCTIONS
Calculation: view_PRODUCTIONS::Title
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | PRODUCTIONS`, `table | PRODUCTIONS` · In Value Lists: `PRODUCTIONS`

### date_FirstRehearsal

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

Comments: `TYPED, never derived. Contractual fact about the show. Calendar_START measures from it`
On Layouts: `table | PRODUCTIONS`, `table | PRODUCTIONS`

### date_Opening

Options block identical to `date_FirstRehearsal` above.

Comments: `TYPED. The production milestone. Season-report axis + value-list sort`
On Layouts: `table | PRODUCTIONS`, `table | PRODUCTIONS`

### cuProductionToken

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

Comments: `Indexed. EXACT ClickUp label string. A rename in CU breaks the join SILENTLY`
On Layouts: `table | PRODUCTIONS`, `table | PRODUCTIONS`

### cuProductionID

Options block identical to `cuProductionToken` above (`Indexing: All`).

Comments: `Indexed. Empty until the API pull. Rename-proof successor`
On Layouts: `table | PRODUCTIONS`, `table | PRODUCTIONS`

### fkProducer · fkVenue · fkCourse

Three foreign keys, each with this exact options block:

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Each: On Layouts `table | PRODUCTIONS`, `table | PRODUCTIONS`. No comments, no relationships,
no scripts, no value lists.

⚠️ **All three are `Indexing: None`** while `cuProductionToken`, `cuProductionID` and
`PrimaryKey` are `All`. Printed as found.

---

## 5 · ROLES — 7 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_ROLES`, indexing `Minimal`.

### Title · TitleShort

Both with this exact options block:

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Each: On Layouts `table | ROLES`, `table | ROLES Copy`.

⚠️ **`ROLES.Title` is `Indexing: None`** where `PRODUCTIONS.Title` is `Minimal`. Two title
fields, two decisions.
⚠️ A comment in `ROLE_ASSIGNMENTS.vl_Section` refers to **`ROLES.DefaultSection`**, which is
**not a field in this table.** Copied as written; no reconciliation attempted here.

---

## 6 · ROLE_ASSIGNMENTS — 15 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_ROLE_ASSIGNMENTS`,
indexing `Minimal`.

⚠️ **This table's field list spans the chunk 1/2 boundary**, splitting `bool_nonPerson`
mid-options. Both chunks read, both UUIDs verified, splice recorded.

### vl_Section

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Comments: `Defaults from ROLES.DefaultSection`
On Layouts: `table | ROLE_ASSIGNMENTS`

### Sort

```
Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | ROLE_ASSIGNMENTS`

### vl_CallsInclusions · vl_ReportsInclusion · ovr_Role_Title · vl_DropboxStatus

Four text fields, each with the same options block as `vl_Section` above (no comments). Each:
On Layouts `table | ROLE_ASSIGNMENTS`.

⚠️ **`vl_CallsInclusions` is plural, `vl_ReportsInclusion` is singular.** Copied verbatim.

### bool_nonPerson

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

Comments: `default = 0`
On Layouts: `table | ROLE_ASSIGNMENTS`

### fkProduction · fkRole · fkPerson

Three foreign keys, each with the same options block as `vl_Section` above (`Indexing: None`, no
comments). Each: On Layouts `table | ROLE_ASSIGNMENTS`. **No relationships on any of them.**

⚠️ **`fkPerson` points at no table in this file.** There is no PEOPLE table among the 37. The
folder `00-ext-PEOPLE` exists in the docs tree. Recorded, not resolved.

---

## 7 · WEEKS — 7 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_WEEKS`, indexing `Minimal`.

### Number

```
Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | WEEKS Copy`

### Weeks_Wednesday

```
Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | WEEKS Copy`

⚠️ Both fields appear on `table | WEEKS Copy` and **NOT on `table | WEEKS`**, which the DDR lists
as a layout with no regular fields. Printed as found.

---

## 8 · EVENTS — 18 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_EVENTS`, indexing
`Minimal`; its references: `In Relationships: EVENTS_X_WORKDAYS=EVENTS` ·
`In Scripts: button | generate events x workdays`.

### Name

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | EVENTS`, `event portal`, `print | Agenda Calendar`
In Scripts: `import | net new Event`, `import | merge Event`

### dateTime_Start · dateTime_End

Both:

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

On Layouts: `table | EVENTS`, `event portal`, `print | Agenda Calendar`
In Scripts: `button | generate events x workdays`, `import | net new Event`, `import | merge Event`
— and `dateTime_Start` additionally `sort | fkWorkday date`.

⚠️ **Both are `Indexing: None`** despite being the fields every date comparison and the
`WORKDAYS_for_assignEvents` date join depend on. Printed as found.

### bool_AllDay

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

Comments: `default = 0`
On Layouts: `table | EVENTS`, `event portal`, `print | Agenda Calendar`
In Scripts: `button | generate events x workdays`, `import | net new Event`, `import | merge Event`

### cuID

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

On Layouts: `table | EVENTS`, `event portal`, `print | Agenda Calendar`
In Scripts: `compare | cu_ID`, `import | net new Event`, `import | merge Event`

### hash_current

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Comments: `Copied from the winning import row. Cheap change detection`
On Layouts: `table | EVENTS` · In Scripts: `import | net new Event`, `import | merge Event`

### fkUtilityReport

Options block identical to `hash_current` above.

On Layouts: `table | EVENTS`
In Scripts: `button | generate events x workdays`, `import | net new Event`, `import | merge Event`

### fkProduction

Options block identical to `hash_current` above (`Indexing: None`).

Comments: `Indexed. Other half of the upsert key. NEVER upsert on TaskID alone`
On Layouts: `table | EVENTS`, `print | Agenda Calendar`
In Scripts: `button | generate events x workdays`, `import | net new Event`, `import | merge Event`

🔴 **The comment says `Indexed.` and the options say `Indexing: None`.** Both copied exactly as
printed. No correction made.

### fkCalendar

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

Comments: `Resolved at import. A production can have two calendars - stops a spring event printing on a fall grid`
On Layouts: `table | EVENTS`
In Scripts: `button | generate events x workdays`, `import | net new Event`, `import | merge Event`

### fkStandardEvent

Options block identical to `hash_current` above (`Indexing: None`).

Comments: `Nullable. Crosswalk result. The season-report spine`
On Layouts: `table | EVENTS` · In Scripts: `import | net new Event`, `import | merge Event`

### fkStyle

Options block identical to `hash_current` above (`Indexing: None`).

Comments: `STYLES row, domain event-status`
On Layouts: `table | EVENTS`, `event portal`, `print | Agenda Calendar`
In Scripts: `import | net new Event`, `import | merge Event`

### json_Rollback

Options block identical to `hash_current` above (`Indexing: None`), no comments.

On Layouts: `table | EVENTS`
In Scripts: `import | net new Event`, `import | merge Event`, `backup | EVENT`

### autoBool_unscheduled

```
Normal, Number	Auto-Enter:
Allow editing
Context table: view_EVENTS
Calculation: Case ( IsEmpty ( view_EVENTS::dateTime_Start ) and IsEmpty ( view_EVENTS::dateTime_End ) ; 1 ; IsEmpty ( view_EVENTS::dateTime_End ) ; 1 ; 0 )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Comments: `bool`
On Layouts: `print | Agenda Calendar`

⚠️ An **auto-enter calculation with `Allow editing`**, not a stored calc field. The only field in
these ten tables whose calculation is a `Case`.

---

## 9 · CALENDARS — 8 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_CALENDARS`, indexing
`Minimal`; its references: `In Scripts: lookup | calendar for production` ·
`In Value Lists: CALENDARS`.

### fkProduction

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

On Layouts: `table | CALENDARS`, `table | CALENDARS` *(printed twice)*
In Relationships: `CALENDARSxPRODUCTIONS_forCalendars`
In Scripts: `lookup | calendar for production`

### fkDefaultExportSet

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | CALENDARS`, `table | CALENDARS`

### Title

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

On Layouts: `table | CALENDARS` · In Value Lists: `CALENDARS`

⚠️ **`Title` is printed LAST in the DDR, after the audit fields**, not with the other business
fields. Field order here follows the DDR.

---

## 10 · PRODUCERS — 13 Fields

**Audit fields (5):** all five standard. 🔴 **`PrimaryKey` context table is `view_PRODUCER_INFO`,
not `view_PRODUCERS`** — this table's only occurrence breaks the naming convention. Indexing
`Minimal`; `In Value Lists: PRODUCERS`.

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

On Layouts: `table | PRODUCERS`

### NameShort

Same as `Name` but `Indexing: None`.

On Layouts: `table | PRODUCERS`

### NameDisplay

```
Normal, Text	Auto-Enter:
Allow editing
Do not replace existing value for field (if any)
Context table: view_PRODUCER_INFO
Calculation: view_PRODUCER_INFO::NameShort
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | PRODUCERS` · In Value Lists: `PRODUCERS`

⚠️ Auto-enters from **`NameShort`**, where `PRODUCTIONS.TitleDisplay` auto-enters from `Title`
and `LOCATIONS.NameDisplay` from `Name`. Three display fields, and this one takes the short form.
Printed as found.

### media_LogoWide · media_LogoSquare

Both:

```
Normal, Binary	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
```

Each: On Layouts `table | PRODUCERS`.

⚠️ **Binary fields carry NO `Indexing:` and NO `Index Language:` lines.** The block ends at
`Repetitions: 1`. Transcribed exactly that short; nothing was dropped.

### fkTheme

```
Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Comments: `nullable. empty = inherit the house theme`
On Layouts: (none)

⚠️ Carries a comment but sits on **no layout, no relationship, no script and no value list.**

### date_SeasonStart · date_SeasonEnd

Both:

```
Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Each: On Layouts `table | PRODUCERS`.

⚠️ Printed **after** the audit fields, like `CALENDARS.Title`. DDR order preserved.

---

## ⚠️ Next table

**`LOCATIONS` (DDR 11, 9 fields) is NOT in this file.** Chunk 2 ends mid-`PrimaryKey` inside it.
Its partial text was discarded rather than completed by inference. It is the resume point.
