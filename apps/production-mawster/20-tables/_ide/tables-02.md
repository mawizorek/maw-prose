---
id: mawster-ide-tables-02
title: "IDE mirror - Tables 11-20 (verbatim)"
type: reference
status: hidden
order: 3
revised: 2026-08
summary: Verbatim transcription of DDR tables 11-20, 96 fields. Audit fields per the standard blocks in the tables index.
provenance: see 20-tables/_ide/index.md
---

# IDE mirror - Tables 11-20 *(verbatim)*

**DDR order 11-20.** Source chunks 2-4 of 21, all UUIDs verified. **96 fields** — 9+7+9+7+11+9+10+18+9+7.

🔴 **Audit fields are NOT repeated here.** Verbatim blocks live in `20-tables/_ide/index.md`.
Each table states which are present and any `PrimaryKey` variance. **Every non-audit field is
transcribed in full.**

⚠️ **`LOCATIONS` spans the chunk 2/3 boundary**, splitting its `PrimaryKey` mid-options. Both
chunks read, both UUIDs verified, splice recorded. It is now complete.

**Shared options block, referenced below as `[STD-TEXT]`.** Printed once because it recurs
verbatim across dozens of fields in these ten tables:

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

And `[STD-NUM]`, identical but `Normal, Number`. **Any field whose block differs by even one
line gets its block printed in full.** Comments and reference lists are never collapsed.

---

## 11 · LOCATIONS — 9 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_LOCATIONS`, indexing
`Minimal`; `In Value Lists: LOCATIONS`.

### Name

`[STD-TEXT]` · On Layouts: `table | LOCATIONS`

### NameShort

`[STD-TEXT]` · On Layouts: `table | LOCATIONS`

### NameDisplay

```
Normal, Text	Auto-Enter:
Allow editing
Do not replace existing value for field (if any)
Context table: view_LOCATIONS
Calculation: view_LOCATIONS::Name
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | LOCATIONS` · In Value Lists: `LOCATIONS`

### fkLocationType

`[STD-TEXT]` · On Layouts: `table | LOCATIONS`

⚠️ Points at `LOCATION_TYPES` by intent but carries **no relationship**. The join is not in the
graph.

---

## 12 · LOCATION_TYPES — 7 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_LOCATION_TYPES`,
indexing `Minimal`; `In Value Lists: LOCATION_TYPES`.

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

On Layouts: `table | LOCATION_TYPES`, `table | LOCATION_TYPES Copy` · In Value Lists: `LOCATION_TYPES`

### Sort

`[STD-NUM]` · On Layouts: `table | LOCATION_TYPES Copy`

⚠️ `Sort` appears **only on the `Copy` layout**, not on `table | LOCATION_TYPES`.

---

## 13 · EDITIONS — 9 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_EDITIONS`, indexing
`Minimal`. Zero records.

### Name

`[STD-TEXT]` · On Layouts: `table | EDITIONS`

### date_TakesPrecednace

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

Comments: `(optional) When this edition is scheduled to become the new SOURCE OF TRUTH. maybe removalble if fkPreceeded by is successful.`
On Layouts: `table | EDITIONS`

🔴 **Field name is misspelled in the schema: `date_TakesPrecednace`** (Precednace / Precedence).
Copied verbatim — this is the live field name and any calc or script must use it as spelled.
⚠️ Its comment names **`fkPreceeded by`**, which is **not a field in this table.** The nearest
thing is `fkSuperseededBy` below. Copied as written; no reconciliation attempted.

### fkCalendar

`[STD-TEXT]` · On Layouts: `table | EDITIONS`

### fkSuperseededBy

`[STD-TEXT]` · On Layouts: `table | EDITIONS`

🔴 **Also misspelled: `fkSuperseededBy`** (three `e`s; correct is Superseded). Verbatim.

⚠️ **All three EDITIONS foreign keys are `Indexing: None` and carry no relationships.** The
edition-supersession chain exists as fields only, not in the graph.

---

## 14 · VERSIONS — 7 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_VERSIONS`, indexing
`Minimal`. Zero records.

### ID

`[STD-TEXT]`

Comments: `Sequence within the calendar AND edition`
On Layouts: `table | VERSIONS`

⚠️ Named `ID` and typed **Text**, sitting alongside the UUID `PrimaryKey`. Two identity-ish
fields, different jobs. Printed as found.

### fkEdition

`[STD-TEXT]` · On Layouts: `table | VERSIONS`

⚠️ The comment says sequence is scoped to calendar AND edition, but this table has **`fkEdition`
and no `fkCalendar`.**

---

## 15 · STANDARD_EVENTS — 11 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_STANDARD_EVENTS`,
indexing `Minimal`.

### Name · NameShort

Both `[STD-TEXT]`. Each: On Layouts `table | STANDARD_EVENTS`, `table | STANDARD_EVENTS`
*(printed twice — there are two layouts of that exact name)*.

### NameDisplay

```
Normal, Text	Auto-Enter:
Allow editing
Do not replace existing value for field (if any)
Context table: view_STANDARD_EVENTS
Calculation: view_STANDARD_EVENTS::Name
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | STANDARD_EVENTS`, `table | STANDARD_EVENTS`

⚠️ **`Indexing: None`**, where `PRODUCTIONS.TitleDisplay` and `LOCATIONS.NameDisplay` are
`Minimal`. Three display fields, three indexing decisions.

### Sort

`[STD-NUM]`

Comments: `Production-convention order, not alphabetical`
On Layouts: `table | STANDARD_EVENTS`, `table | STANDARD_EVENTS`

### bool_isMilestone

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
On Layouts: `table | STANDARD_EVENTS`, `table | STANDARD_EVENTS`

### fkStyle

`[STD-TEXT]` · On Layouts: `table | STANDARD_EVENTS` *(once only, unlike its siblings)*

---

## 16 · WORKDAYS — 9 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_WORKDAYS`, indexing
`Minimal`; its references: `On Layouts: event portal` ·
`In Relationships: WORKDAYS=EVENTS_X_WORKDAYS`.

### Date

```
Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
```

On Layouts: `table | WORKDAYS`, `event portal`
In Relationships: `WORKDAYS_for_assignEvents=EVENTS_X_WORKDAYS`
In Scripts: `button | generate Workdays`, `sort | fkWorkday date`

✅ **`Indexing: All`** — correctly indexed for the date join, and worth reading against
`EVENTS.dateTime_Start`/`dateTime_End`, which are `Indexing: None`. Both facts are transcribed
where they occur; no verdict offered here.

### xTitleShort

`[STD-TEXT]` · On Layouts: `table | WORKDAYS`

⚠️ **The `x` prefix on a plain text field.** Elsewhere in this file `X` prefixes a key
(`XfkWorkday`). Verbatim.

### dateFormat_Colloquial

```
Calculated, Date	Calculation:
Context table: view_WORKDAYS
view_WORKDAYS::Date
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | WORKDAYS`

### dateFormat_Display

```
Calculated, Date	Calculation:
Context table: view_WORKDAYS
view_WORKDAYS::Date
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

On Layouts: `table | WORKDAYS`

🔴 **These two calculation fields are BYTE-IDENTICAL**, including the calculation
(`view_WORKDAYS::Date`). Two differently-named format fields that compute the same bare date
with no formatting applied. Copied exactly as printed; no claim made about intent.

⚠️ **Note the type: `Calculated, Date`**, not `Normal`. These are true stored calc fields, unlike
the auto-enter calcs elsewhere in the schema.

---

## 17 · EVENTS_X_WORKDAYS — 10 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_EVENTS_X_WORKDAYS`,
indexing `Minimal`, no references.

**The join table.** Every business field carries a comment; this is the best-documented table in
the schema.

### Date

```
Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
```

Comments: `The day this row represents`
On Layouts: `table | EVENT_WORKDAYS`, `print | Agenda Calendar`
In Relationships: `WORKDAYS_for_assignEvents=EVENTS_X_WORKDAYS`
In Scripts: `new | workday x event`, `sort | fkWorkday date`

### fkEvent

`[STD-TEXT]`

Comments: `→ EVENTS. Identity lives THERE, never here`
On Layouts: `table | EVENT_WORKDAYS`
In Relationships: `EVENTS_X_WORKDAYS=EVENTS`
In Scripts: `new | workday x event`

### XfkWorkday

```
Normal, Text	Auto-Enter:
Allow editing
Do not replace existing value for field (if any)
Context table: EVENTS_X_WORKDAYS
Calculation: WORKDAYS_for_assignEvents::PrimaryKey
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
```

Comments: `→ WORKDAYS. Stamped at rebuild`
On Layouts: `table | EVENT_WORKDAYS`
In Relationships: `WORKDAYS=EVENTS_X_WORKDAYS`
In Scripts: `new | workday x event`

🔴 **Its `Context table:` is `EVENTS_X_WORKDAYS`, NOT `view_EVENTS_X_WORKDAYS`** — the only
field in tables 1-20 whose context is a base occurrence rather than a `view_` one. Verbatim.
⚠️ **Auto-enters across the `WORKDAYS_for_assignEvents` date relationship to grab a key**, then
`WORKDAYS=EVENTS_X_WORKDAYS` joins on that key. Two relationships, one in service of the other.
⚠️ The set line for this field is **commented out** in `new | workday x event`
(`// Set Field [ view_EVENTS_X_WORKDAYS::XfkWorkday ]`) while the DDR still lists that script
here. Both facts as printed.

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

Comments: `Which grid this projection belongs to`
On Layouts: `table | EVENT_WORKDAYS`, `event portal`, `print | Agenda Calendar`
In Scripts: `button | generate events x workdays`, `new | workday x event`

### fkUtilityReport

`[STD-TEXT]`

Comments: `Which rebuild produced this row. Stamped at rebuild`
On Layouts: `table | EVENT_WORKDAYS` · In Scripts: `new | workday x event`

---

## 18 · CALENDAR_HIGHLIGHTS — 18 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_CALENDAR_HIGHLIGHTS`,
indexing `Minimal`, no references. Zero records.

⚠️ **Spans the chunk 3/4 boundary**, splitting `vl_AnchorMode` mid-options. Both chunks read,
both UUIDs verified.

### vl_AnchorMode

`[STD-TEXT]`

Comments: `range | event`
On Layouts: `table | CALENDAR_HIGHLIGHTS`

### Name

`[STD-TEXT]` · Comments: `For list display` · On Layouts: `table | CALENDAR_HIGHLIGHTS`

### LegendText

`[STD-TEXT]` · Comments: `Prints in the legend` · On Layouts: `table | CALENDAR_HIGHLIGHTS`

### Priority

`[STD-NUM]`

Comments: `Default 10, increment by 10. Highest wins; tie goes to narrowest span`
On Layouts: `table | CALENDAR_HIGHLIGHTS`

⚠️ The comment says **Default 10**, but the options show **no `Constant data:` line** — unlike
`DaysBefore`/`DaysAfter` below, which do default to 0. Printed as found.

### dateTime_Start

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

Comments: `Typed. range mode only`
On Layouts: `table | CALENDAR_HIGHLIGHTS`

### dateTime_End

Options identical to `dateTime_Start` above.

Comments: `Typed. Must be >= DateStart. Minimum required`
On Layouts: `table | CALENDAR_HIGHLIGHTS`

⚠️ The comment references **`DateStart`**, which is not a field name here; the field is
`dateTime_Start`. Verbatim.

### fkCalendar

`[STD-TEXT]` · On Layouts: `table | CALENDAR_HIGHLIGHTS`

### fkStyle

`[STD-TEXT]` · Comments: `STYLES row, domain emphasis` · On Layouts: `table | CALENDAR_HIGHLIGHTS`

### fkStandardEvent

`[STD-TEXT]`

Comments: `event mode only. Matches EVERY event of this type in the production`
On Layouts: `table | CALENDAR_HIGHLIGHTS`

### DaysBefore · DaysAfter

Both:

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

`DaysBefore` Comments: `Days to extend backward from the anchor. Default = 0`
`DaysAfter` Comments: `Days to extend forward from the anchor. Default = 0`
Each: On Layouts `table | CALENDAR_HIGHLIGHTS`

### calc_ResolvedStart

```
Calculated, Number	Calculation:
Context table: view_CALENDAR_HIGHLIGHTS
view_CALENDAR_HIGHLIGHTS::dateTime_Start
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Comments: `Unstored. Typed date, or earliest matched event minus PadBefore`
On Layouts: `table | CALENDAR_HIGHLIGHTS`

### calc_ResolvedEnd

```
Calculated, Number	Calculation:
Context table: view_CALENDAR_HIGHLIGHTS
view_CALENDAR_HIGHLIGHTS::dateTime_Start
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
```

Comments: `Unstored. Typed date, or latest matched event plus PadAfter`
On Layouts: `table | CALENDAR_HIGHLIGHTS`

🔴 **`calc_ResolvedEnd`'s calculation reads `dateTime_Start`, the same source as
`calc_ResolvedStart`.** The two calc fields are byte-identical while their comments describe
opposite ends of a span. Transcribed exactly as the DDR printed it. **No correction made and
none implied** — this file records what is in the schema.

⚠️ Both are typed **`Calculated, Number`** while holding dates, and both comments say
`Unstored.` though the `Storage:` block carries no unstored marker.
⚠️ Both comments name **`PadBefore` / `PadAfter`**; the actual fields are `DaysBefore` /
`DaysAfter`. Verbatim.

---

## 19 · STYLES — 9 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_STYLES`, indexing
`Minimal`; `In Relationships: THEMES_X_STYLES=STYLES`.

### vl_Domain

`[STD-TEXT]`

Comments: `month | event-status | watermark | emphasis | base`
On Layouts: `view | STYLES`, `table | STYLES`

### vl_Label

`[STD-TEXT]`

Comments: `"production-style" — SEMANTIC, never "green"`
On Layouts: `view | STYLES`, `table | STYLES`

⚠️ The comment uses a **true em dash** and curly quotes. Preserved exactly.

### LegendText

`[STD-TEXT]` · On Layouts: `view | STYLES`, `table | STYLES`

### Sort

`[STD-NUM]` · On Layouts: `view | STYLES`, `table | STYLES`

---

## 20 · THEMES — 7 Fields

**Audit fields (5):** all five standard. `PrimaryKey` context table `view_THEMES`, indexing
`Minimal`; `In Relationships: THEMES_X_STYLES=THEMES`.

### Name

`[STD-TEXT]` · On Layouts: `view | THEMES`, `table | THEMES`

### Sort

`[STD-TEXT]` · On Layouts: `view | THEMES`, `table | THEMES`

🔴 **`THEMES.Sort` is typed `Normal, Text`.** Every other `Sort` field in the schema — `STYLES`,
`STANDARD_EVENTS`, `LOCATION_TYPES`, `ROLE_ASSIGNMENTS` — is `Normal, Number`. Verbatim; a text
sort orders 10 before 9.

---

## ⚠️ Next tables

**`THEMES_X_STYLES` (21) and `THEME_COLORS` (22) are already fully printed in chunk 4** and were
read and UUID-verified this pass, but are held for the next batch to keep this file under the
read ceiling. **`THEME_TYPOGRAPHY` (23) is cut mid-`LineWeight`** at the chunk 4/5 boundary; its
partial text was discarded rather than completed by inference.
