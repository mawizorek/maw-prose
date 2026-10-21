---
id: mawster-ide-relationships
title: "IDE mirror - Relationships (verbatim)"
type: reference
status: hidden
order: 1
revised: 2026-08
summary: Verbatim transcription of all 15 relationships in the Production_MAWnster graph, straight from the DDR.
---

# IDE mirror - Relationships *(verbatim)*

<!-- VERBATIM TRANSCRIPTION. Nothing corrected, nothing interpreted.
     Source: mawizorek/uritp-docs @ d47535e,
     production-mawster/90-file-imports-temp/DDR_imports/2608151650/raw.txt, part 8/21.
     Chunk set UUID 7534bbed-6a2a-4d5a-a2a2-7d3b00ced5b8, START/END UUIDs verified.
     Sibling convention: production-mawster/70-scripts/_ide/ -->

**This is a TRANSCRIPTION, not documentation.** Same contract as `70-scripts/_ide/`: copy, not
commentary. It exists so an agent can review the real graph without reading a 360KB DDR.

🔴 **Do not reconcile this against `30-RELATIONSHIPS/index.md` or `RELATIONSHIPS.tsv` inside
this file.** Those are hand-written and are a different document class. A transcription that
argues with itself stops being a transcription.

## Completeness

The DDR Overview reports **`Relationships 15`**. Fifteen `Relationship:` blocks are printed in
the Relationships: Details section and all fifteen are transcribed below. The set is complete.

⚠️ **Relationships grew 12 → 15 since DDR `2608142227`** (Aug 14). That older import folder has
been deleted from the repo, so which three are new cannot be established from the repo alone
and no such claim is made here.

## Index

| # | Relationship | Left TO | Predicate | Right TO |
|---|---|---|---|---|
| 1 | `CALENDARSxPRODUCTIONS_forCalendars` | `CALENDARS` | `fkProduction` **x** `PrimaryKey` | `PRODUCTIONS_forCalendars` |
| 2 | `UTILTIY_LOGS_for_UTILITY_REPORTS=UTILITY_REPORTS` | `UTILTIY_LOGS_for_UTILITY_REPORTS` | `fkRunReport` **=** `PrimaryKey` | `UTILITY_REPORTS` |
| 3 | `valuesFor_Activity_Log_Types=VALUE_LISTS` | `valuesFor_Activity_Log_Types` | `fkList` **=** `g_valuesFor_Activity_Log_Types` | `VALUE_LISTS` |
| 4 | `VALUES=VALUE_LISTS` | `VALUES` | `fkList` **=** `PrimaryKey` | `VALUE_LISTS` |
| 5 | `valuesFor_Status_Categories=VALUE_LISTS` | `valuesFor_Status_Categories` | `fkList` **=** `g_valuesFor_Status_Categories` | `VALUE_LISTS` |
| 6 | `THEMES_X_STYLES=STYLES` | `THEMES_X_STYLES` | `fkStyle` **=** `PrimaryKey` | `STYLES` |
| 7 | `THEMES_X_STYLES=THEMES` | `THEMES_X_STYLES` | `fkTheme` **=** `PrimaryKey` | `THEMES` |
| 8 | `THEME_COLORS_Text_forStyleThemeJoin=THEMES_X_STYLES` | `THEME_COLORS_Text_forStyleThemeJoin` | `PrimaryKey` **=** `fkColor_Text` | `THEMES_X_STYLES` |
| 9 | `THEME_COLORS_Fill_forStyleThemeJoin=THEMES_X_STYLES` | `THEME_COLORS_Fill_forStyleThemeJoin` | `PrimaryKey` **=** `fkColor_Fill` | `THEMES_X_STYLES` |
| 10 | `THEME_TYPOGRAPHY_forStyleThemeJoin=THEMES_X_STYLES` | `THEME_TYPOGRAPHY_forStyleThemeJoin` | `PrimaryKey` **=** `fkTypography` | `THEMES_X_STYLES` |
| 11 | `UTILITY_REPORTS=UTILITY_SESSIONS` | `UTILITY_REPORTS` | `fkUtilitySession` **=** `PrimaryKey` | `UTILITY_SESSIONS` |
| 12 | `IMPORT_EVENTS_forImportSessions=UTILITY_REPORTS_for_Importing_Events` | `IMPORT_EVENTS_forImportSessions` | `fkUtilityReport` **=** `PrimaryKey` | `UTILITY_REPORTS_for_Importing_Events` |
| 13 | `EVENTS_X_WORKDAYS=EVENTS` | `EVENTS_X_WORKDAYS` | `fkEvent` **=** `PrimaryKey` | `EVENTS` |
| 14 | `WORKDAYS=EVENTS_X_WORKDAYS` | `WORKDAYS` | `PrimaryKey` **=** `XfkWorkday` | `EVENTS_X_WORKDAYS` |
| 15 | `WORKDAYS_for_assignEvents=EVENTS_X_WORKDAYS` | `WORKDAYS_for_assignEvents` | `Date` **=** `Date` | `EVENTS_X_WORKDAYS` |

⚠️ The index above is a navigation aid built from the verbatim blocks below. **The blocks are
the record.** Every relationship's source file is `Production_MAWnster.fmp12` on both sides;
there are no external data sources in this file (`FileMaker Data Sources 0`).

---

## Relationship blocks, verbatim

### 1 · CALENDARSxPRODUCTIONS_forCalendars

```
Table Occurrence   CALENDARS        PRODUCTIONS_forCalendars
Field              fkProduction  x  PrimaryKey
Source Table       CALENDARS        PRODUCTIONS
Source File        Production_MAWnster.fmp12    Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

On
Field: date_Opening

Descending order
Reorder based on summary field: Off
Override field's language for sort: Off
Field: Title

Descending order
Reorder based on summary field: Off
Override field's language for sort: Off
```

⚠️ The predicate operator is **`x`** (cartesian), not `=`. Copied as printed. This is the only
non-equals relationship in the graph, and it is also the only one whose name does not embed its
operator.

---

### 2 · UTILTIY_LOGS_for_UTILITY_REPORTS=UTILITY_REPORTS

```
Table Occurrence   UTILTIY_LOGS_for_UTILITY_REPORTS    UTILITY_REPORTS
Field              fkRunReport                      =  PrimaryKey
Source Table       UTILITY_LOGS                        UTILITY_REPORTS
Source File        Production_MAWnster.fmp12           Production_MAWnster.fmp12
Allow creation of records via this relationship        On     Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
On

Field: Timestamp

Descending order
Reorder based on summary field: Off
Override field's language for sort: Off
Off
```

⚠️ `UTILTIY` is transposed in the table-occurrence name. Copied verbatim; the source table is
`UTILITY_LOGS`, spelled correctly.

---

### 3 · valuesFor_Activity_Log_Types=VALUE_LISTS

```
Table Occurrence   valuesFor_Activity_Log_Types    VALUE_LISTS
Field              fkList                       =  g_valuesFor_Activity_Log_Types
Source Table       VALUES                          VALUE_LISTS
Source File        Production_MAWnster.fmp12       Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

Matches against a **global** field on the right side.

---

### 4 · VALUES=VALUE_LISTS

```
Table Occurrence   VALUES        VALUE_LISTS
Field              fkList     =  PrimaryKey
Source Table       VALUES        VALUE_LISTS
Source File        Production_MAWnster.fmp12    Production_MAWnster.fmp12
Allow creation of records via this relationship        On     Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
On

Field: Sort

Ascending order
Reorder based on summary field: Off
Override field's language for sort: Off
Off
```

---

### 5 · valuesFor_Status_Categories=VALUE_LISTS

```
Table Occurrence   valuesFor_Status_Categories    VALUE_LISTS
Field              fkList                      =  g_valuesFor_Status_Categories
Source Table       VALUES                         VALUE_LISTS
Source File        Production_MAWnster.fmp12      Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

Matches against a **global** field on the right side.

---

### 6 · THEMES_X_STYLES=STYLES

```
Table Occurrence   THEMES_X_STYLES    STYLES
Field              fkStyle         =  PrimaryKey
Source Table       THEMES_X_STYLES    STYLES
Source File        Production_MAWnster.fmp12    Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

---

### 7 · THEMES_X_STYLES=THEMES

```
Table Occurrence   THEMES_X_STYLES    THEMES
Field              fkTheme         =  PrimaryKey
Source Table       THEMES_X_STYLES    THEMES
Source File        Production_MAWnster.fmp12    Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

---

### 8 · THEME_COLORS_Text_forStyleThemeJoin=THEMES_X_STYLES

```
Table Occurrence   THEME_COLORS_Text_forStyleThemeJoin    THEMES_X_STYLES
Field              PrimaryKey                          =  fkColor_Text
Source Table       THEME_COLORS                           THEMES_X_STYLES
Source File        Production_MAWnster.fmp12              Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

---

### 9 · THEME_COLORS_Fill_forStyleThemeJoin=THEMES_X_STYLES

```
Table Occurrence   THEME_COLORS_Fill_forStyleThemeJoin    THEMES_X_STYLES
Field              PrimaryKey                          =  fkColor_Fill
Source Table       THEME_COLORS                           THEMES_X_STYLES
Source File        Production_MAWnster.fmp12              Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

---

### 10 · THEME_TYPOGRAPHY_forStyleThemeJoin=THEMES_X_STYLES

```
Table Occurrence   THEME_TYPOGRAPHY_forStyleThemeJoin    THEMES_X_STYLES
Field              PrimaryKey                         =  fkTypography
Source Table       THEME_TYPOGRAPHY                      THEMES_X_STYLES
Source File        Production_MAWnster.fmp12             Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

---

### 11 · UTILITY_REPORTS=UTILITY_SESSIONS

```
Table Occurrence   UTILITY_REPORTS      UTILITY_SESSIONS
Field              fkUtilitySession  =  PrimaryKey
Source Table       UTILITY_REPORTS      UTILITY_SESSIONS
Source File        Production_MAWnster.fmp12    Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

---

### 12 · IMPORT_EVENTS_forImportSessions=UTILITY_REPORTS_for_Importing_Events

```
Table Occurrence   IMPORT_EVENTS_forImportSessions    UTILITY_REPORTS_for_Importing_Events
Field              fkUtilityReport                 =  PrimaryKey
Source Table       IMPORT_EVENTS                      UTILITY_REPORTS
Source File        Production_MAWnster.fmp12          Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

---

### 13 · EVENTS_X_WORKDAYS=EVENTS

```
Table Occurrence   EVENTS_X_WORKDAYS    EVENTS
Field              fkEvent           =  PrimaryKey
Source Table       EVENTS_X_WORKDAYS    EVENTS
Source File        Production_MAWnster.fmp12    Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

---

### 14 · WORKDAYS=EVENTS_X_WORKDAYS

```
Table Occurrence   WORKDAYS         EVENTS_X_WORKDAYS
Field              PrimaryKey    =  XfkWorkday
Source Table       WORKDAYS         EVENTS_X_WORKDAYS
Source File        Production_MAWnster.fmp12    Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

⚠️ The right-side field is `XfkWorkday`, carrying an `X` prefix. Copied verbatim. The same
field appears commented out in `new | workday x event`
(`// Set Field [ view_EVENTS_X_WORKDAYS::XfkWorkday ]`) while still being listed as a
dependency of that script.

---

### 15 · WORKDAYS_for_assignEvents=EVENTS_X_WORKDAYS

```
Table Occurrence   WORKDAYS_for_assignEvents    EVENTS_X_WORKDAYS
Field              Date                      =  Date
Source Table       WORKDAYS                     EVENTS_X_WORKDAYS
Source File        Production_MAWnster.fmp12    Production_MAWnster.fmp12
Allow creation of records via this relationship        Off    Off
Delete related records in this table when a record is deleted in the other table    Off    Off
Sort records
Off

Off
```

⚠️ A **second** occurrence of `WORKDAYS` joining the **same** occurrence of
`EVENTS_X_WORKDAYS` as #14, on a different predicate (`Date = Date` rather than
`PrimaryKey = XfkWorkday`). Both are transcribed; no judgement is offered here about which
is load-bearing.

---

## Table-occurrence roster, verbatim

The DDR prints an occurrence-by-occurrence list ahead of the relationship details. Transcribed
here for name resolution only — each line is `occurrence → source table`, all in
`Production_MAWnster.fmp12`.

```
view_UTILITY_SESSIONS               UTILITY_SESSIONS
view_UTILITY_REPORTS                UTILITY_REPORTS
view_STANDARD_EVENTS                STANDARD_EVENTS
view_CALENDAR_HIGHLIGHTS            CALENDAR_HIGHLIGHTS
view_ROLE_ASSIGNMENTS               ROLE_ASSIGNMENTS
view_CALENDARS                      CALENDARS
view_ROLES                          ROLES
view_LOCATIONS                      LOCATIONS
view_LOCATION_TYPES                 LOCATION_TYPES
view_EDITIONS                       EDITIONS
view_VERSIONS                       VERSIONS
view_IMPORT_SOURCES                 IMPORT_SOURCES
view_IMPORT_EVENTS                  IMPORT_EVENTS
THEME_COLORS_Fill_forStyleThemeJoin  THEME_COLORS
THEME_TYPOGRAPHY_forStyleThemeJoin   THEME_TYPOGRAPHY
THEME_COLORS_Text_forStyleThemeJoin  THEME_COLORS
THEMES_X_STYLES                     THEMES_X_STYLES
THEMES                              THEMES
STYLES                              STYLES
view_THEMES_X_STYLES                THEMES_X_STYLES
view_THEME_COLORS                   THEME_COLORS
view_THEMES                         THEMES
view_STYLES                         STYLES
view_THEME_TYPOGRAPHY               THEME_TYPOGRAPHY
valuesFor_Activity_Log_Types        VALUES
valuesFor_Status_Categories         VALUES
VALUE_LISTS                         VALUE_LISTS
VALUES                              VALUES
view_PRODUCTIONS                    PRODUCTIONS
view_PRODUCER_INFO                  PRODUCERS
view_ORGANIZATION                   ORGANIZATION
view_auto_LAYOUTS                   auto_LAYOUTS
view_VALUES                         VALUES
view_VALUE_LISTS                    VALUE_LISTS
view_WEEKS                          WEEKS
view_GLOBAL_EXPORT                  GLOBAL_EXPORT
view_APP_SESSIONS                   APP_SESSIONS
view_APP_DEVICE_SETUP               APP_DEVICE_SETUP
view_GLOBAL_USE                     GLOBAL_USE
```

⚠️ **This roster is PARTIAL as printed.** The DDR's occurrence list begins mid-run at the top
of chunk 8, so occurrences printed before that boundary are not captured here. The per-table
`Occurrences in Relationship Graph` column in the Tables section is the complete source and
names occurrences absent above, including `PRODUCTIONS_forCalendars`, `CALENDARS`, `EVENTS`,
`WORKDAYS`, `WORKDAYS_for_assignEvents`, `EVENTS_X_WORKDAYS`, `EXPORT_SESSIONS`,
`UTILITY_SESSIONS`, `UTILITY_REPORTS`, `UTILTIY_LOGS_for_UTILITY_REPORTS`,
`UTILITY_REPORTS_for_Importing_Events`, `IMPORT_EVENTS_forImportSessions`,
`view_EVENTS`, `view_WORKDAYS`, `view_EVENTS_X_WORKDAYS`, `view_EXPORT_SETS`,
`view_EXPORT_SET_ITEMS`, `view_PRINT_PRESETS`, `view_EXPORT_SESSIONS` and
`view_UTILITY_LOGS`. **Do not treat the block above as the occurrence census.**
