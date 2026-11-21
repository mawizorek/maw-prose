---
id: mawster-ide-tables
title: "IDE mirror - Tables + Fields (verbatim)"
type: index
status: hidden
order: 1
revised: 2026-08
summary: Census of all 37 tables and the contract for their 398 fields. COMPLETE. Copy, not commentary.
---

# IDE mirror - Tables + Fields *(verbatim)*

<!-- VERBATIM TRANSCRIPTION. Nothing corrected, nothing interpreted.
     Source: mawizorek/uritp-docs, DDR_imports/2608151650/raw.txt, chunks 1-7/21.
     Chunk set UUID 7534bbed-6a2a-4d5a-a2a2-7d3b00ced5b8, START/END UUIDs verified per chunk.
     Pass 1 (chunks 1-2) @ 8d655dc. Pass 2 (2-4) @ 101f4de. Pass 3 (4-6) @ 373b7a9.
     Pass 4 (6-7) @ e7b3905.
     Sibling convention: production-mawster/70-scripts/_ide/ -->

**This is a TRANSCRIPTION, not documentation.** Same contract as `70-scripts/_ide/`: copy, not
commentary. It exists so an agent can review the real schema without reading a 360KB DDR.

🔴 **Do not reconcile this against the hand-written pages in `20-tables/`.** Those are a
different document class. A transcription that argues with itself stops being a transcription.

## ✅ SECTION COMPLETE — 37 of 37 tables, 398 of 398 fields

| Pass | Chunks read | Tables | Fields |
|---|---|---|---|
| 1 (2026-08-16) | 1, 2 | 1-10 | 104 |
| 2 (2026-08-16) | 2, 3, 4 | 11-20 | 96 |
| 3 (2026-08-16) | 4, 5, 6 | 21-30 | 127 |
| 4 (2026-08-16) | 6, 7 | 31-37 | 71 |
| **Total** | **1-7 of 21** | **37 of 37** | **398 of 398** |

**Reconciliation:** 104 + 96 + 64 + 63 + 71 = **398**, matching the sum of the DDR's own per-table
`N fields defined` values in the census below. Work was **table-complete** throughout: a table was
either fully transcribed or absent, never half-written. Four chunk-boundary splits
(`ROLE_ASSIGNMENTS`, `LOCATIONS`, `CALENDAR_HIGHLIGHTS`, `THEME_TYPOGRAPHY`, `IMPORT_EVENTS`,
`UTILITY_SESSIONS`) were each closed by reading both chunks and verifying both UUIDs; **no partial
text was ever completed by inference.**

**Field-count note:** the Overview reports no total, so **398 is derived** by summing the census.
It is arithmetic on DDR figures, not a DDR figure, and it served as the completeness tripwire.

**Next uncaptured DDR section:** Layouts + Layout Objects (54 layouts, chunks 8-17), plus Themes (2).

## 🔍 Schema observations register → `observations.md`

**Cross-table readings live in `20-tables/_ide/observations.md`**, so the batch files stay pure
transcription. It holds the JSON key mismatch, the `<Field Missing>` triangulation, the
calculations that do not match their names, indexing asymmetries, naming breaks, and the
specified-but-unwired list. Every item is a direct reading; nothing has been acted on.

🔴 **The register was SPLIT OUT of this index at pass 4**, when the index reached **21,492 bytes**
and pass 4's additions would have pushed it past the ~22KB read ceiling. Same precedent as the
`Pass to Workspace` split: cut at a real seam rather than record a violation.

## 🔴 THE AUDIT-FIELD RULE — read before quoting any table file

**Every one of the 37 tables carries the same five audit fields**, and the DDR prints their full
option blocks 37 times over. Transcribing 185 near-identical blocks would have buried the 213
fields that actually differ.

**So the five standard blocks are transcribed ONCE, here, verbatim. Batch files list which audit
fields are present and record ANY variance, but do not repeat the blocks.**

⚠️ **This is a deliberate factoring, and it is the ONE place these mirrors depart from
repeat-it-every-time verbatim.** Stated here rather than buried because the batch files are not
self-contained on this point. **Everything else — every non-audit field, every comment, every
calculation — is transcribed in full, in place, per table.**

### Verified against all 37 tables, with the variances named

✅ **All 37 carry exactly these five.** The four non-key blocks are byte-identical every time.

🔴 **CORRECTED AT PASS 4.** Passes 1-3 claimed the four non-key audit fields reference nothing
anywhere. That held for 30 tables and **is false in the 33rd**:
**`UTILITY_REPORTS.CreationTimestamp` carries `On Layouts: Import New Events`** — the only non-key
audit field in 398 to reference anything. The earlier blanket claim is struck; this is the
corrected statement. *(A rule verified on a subset and asserted as universal is exactly the kind of
claim these mirrors exist to catch.)*

**The complete variance list:**

| Variance | Where |
|---|---|
| `PrimaryKey` `Indexing: All` | `PRODUCTIONS`, `UTILITY_REPORTS` — the other 35 are `Minimal` |
| `Context table` not the table's own `view_` occurrence | `PRODUCERS` → `view_PRODUCER_INFO` · `EXPORT_PRESETS` → `view_PRINT_PRESETS` · `EXPORT_SESSIONS` → `EXPORT_SESSIONS` |
| A non-key audit field with a reference | `UTILITY_REPORTS.CreationTimestamp` only |
| Audit fields printed FIRST, before business fields | `IMPORT_EVENTS`, `ORGANIZATION`, `APP_SESSIONS` |

### `PrimaryKey` — verbatim standard block

```
PrimaryKey	Normal, Text	Auto-Enter:
Context table: <TABLE'S OWN view_ OCCURRENCE — 3 EXCEPTIONS ABOVE>
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: <Minimal, EXCEPT All on PRODUCTIONS + UTILITY_REPORTS>
Automatically create indexes as needed
Index Language: Unicode Raw
Unique identifier of each record in this table
```

### `CreationTimestamp` — verbatim standard block

```
CreationTimestamp	Normal, Timestamp	Auto-Enter:
Creation timestamp
Validation:
Only during data entry
Strict data type: 4 digit year
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Date and time each record was created
```

### `CreatedBy` — verbatim standard block

```
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record
```

### `ModificationTimestamp` — verbatim standard block

```
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
Validation:
Only during data entry
Strict data type: 4 digit year
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Date and time each record was last modified
```

### `ModifiedBy` — verbatim standard block

```
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record
```

## 📐 Shared field blocks

Beyond the audit five, two options blocks recur verbatim across dozens of fields. Batch files
print each once as `[STD-TEXT]` / `[STD-NUM]` and reference them. **A field whose block differs by
even one line gets its block printed in full, and comments plus reference lists are never
collapsed** — those are what differ field to field.

```
[STD-TEXT]   Normal, Text | Allow editing | Only during data entry
             Repetitions: 1 | Indexing: None | auto-create | English
[STD-NUM]    identical, Normal, Number
```

⚠️ **Binary fields carry NO `Indexing:` and NO `Index Language:` lines** — their blocks genuinely
end at `Repetitions: 1`. Five in the schema: `PRODUCERS.media_LogoWide`, `media_LogoSquare`,
`IMPORT_SOURCES.raw_Content`, `UTILITY_REPORTS.media_RunReport`,
`EXPORT_SESSIONS.Report_Container`. Nothing was dropped in transcription.
⚠️ **Global fields (`Storage: Global`) also carry no `Indexing:` line.** Eight in the schema: six
in `GLOBAL_USE`, two in `VALUE_LISTS`.

## Table census — VERBATIM from the DDR Tables section

All 37 tables in DDR order with the DDR's own statistics and occurrence lists. **All ✅.**

| # | Table | Fields | Records | Occurrences in Relationship Graph | File |
|---|---|---|---|---|---|
| 1 | `GLOBAL_USE` | 11 | 0 | `view_GLOBAL_USE` | 01 |
| 2 | `GLOBAL_EXPORT` | 5 | 0 | `view_GLOBAL_EXPORT` | 01 |
| 3 | `APP_DEVICE_SETUP` | 5 | 0 | `view_APP_DEVICE_SETUP` | 01 |
| 4 | `PRODUCTIONS` | 15 | 7 | `PRODUCTIONS_forCalendars`, `view_PRODUCTIONS` | 01 |
| 5 | `ROLES` | 7 | 3 | `view_ROLES` | 01 |
| 6 | `ROLE_ASSIGNMENTS` | 15 | 0 | `view_ROLE_ASSIGNMENTS` | 01 |
| 7 | `WEEKS` | 7 | 1 | `view_WEEKS` | 01 |
| 8 | `EVENTS` | 18 | 115 | `EVENTS`, `view_EVENTS` | 01 |
| 9 | `CALENDARS` | 8 | 7 | `CALENDARS`, `view_CALENDARS` | 01 |
| 10 | `PRODUCERS` | 13 | 1 | `view_PRODUCER_INFO` | 01 |
| 11 | `LOCATIONS` | 9 | 6 | `view_LOCATIONS` | 02 |
| 12 | `LOCATION_TYPES` | 7 | 5 | `view_LOCATION_TYPES` | 02 |
| 13 | `EDITIONS` | 9 | 0 | `view_EDITIONS` | 02 |
| 14 | `VERSIONS` | 7 | 0 | `view_VERSIONS` | 02 |
| 15 | `STANDARD_EVENTS` | 11 | 2 | `view_STANDARD_EVENTS` | 02 |
| 16 | `WORKDAYS` | 9 | 282 | `WORKDAYS_for_assignEvents`, `WORKDAYS`, `view_WORKDAYS` | 02 |
| 17 | `EVENTS_X_WORKDAYS` | 10 | 121 | `EVENTS_X_WORKDAYS`, `view_EVENTS_X_WORKDAYS` | 02 |
| 18 | `CALENDAR_HIGHLIGHTS` | 18 | 0 | `view_CALENDAR_HIGHLIGHTS` | 02 |
| 19 | `STYLES` | 9 | 1 | `STYLES`, `view_STYLES` | 02 |
| 20 | `THEMES` | 7 | 1 | `THEMES`, `view_THEMES` | 02 |
| 21 | `THEMES_X_STYLES` | 10 | 0 | `THEMES_X_STYLES`, `view_THEMES_X_STYLES` | 03 |
| 22 | `THEME_COLORS` | 11 | 0 | `THEME_COLORS_Fill_forStyleThemeJoin`, `THEME_COLORS_Text_forStyleThemeJoin`, `view_THEME_COLORS` | 03 |
| 23 | `THEME_TYPOGRAPHY` | 13 | 0 | `THEME_TYPOGRAPHY_forStyleThemeJoin`, `view_THEME_TYPOGRAPHY` | 03 |
| 24 | `VALUE_LISTS` | 11 | 3 | `VALUE_LISTS`, `view_VALUE_LISTS` | 03 |
| 25 | `VALUES` | 10 | 10 | `valuesFor_Activity_Log_Types`, `valuesFor_Status_Categories`, `VALUES`, `view_VALUES` | 03 |
| 26 | `IMPORT_SOURCES` | 9 | 1 | `view_IMPORT_SOURCES` | 03 |
| 27 | `IMPORT_EVENTS` | 26 | 5290 | `IMPORT_EVENTS_forImportSessions`, `view_IMPORT_EVENTS` | 04 |
| 28 | `EXPORT_SETS` | 10 | 0 | `view_EXPORT_SETS` | 04 |
| 29 | `EXPORT_SET_ITEMS` | 15 | 0 | `view_EXPORT_SET_ITEMS` | 04 |
| 30 | `EXPORT_PRESETS` | 12 | 0 | `view_PRINT_PRESETS` | 04 |
| 31 | `EXPORT_SESSIONS` | 11 | 0 | `view_EXPORT_SESSIONS`, `EXPORT_SESSIONS` | 05 |
| 32 | `UTILITY_SESSIONS` | 12 | 10 | `UTILITY_SESSIONS`, `view_UTILITY_SESSIONS` | 05 |
| 33 | `UTILITY_REPORTS` | 15 | 392 | `UTILITY_REPORTS_for_Importing_Events`, `UTILITY_REPORTS`, `view_UTILITY_REPORTS` | 05 |
| 34 | `UTILITY_LOGS` | 13 | 4939 | `UTILTIY_LOGS_for_UTILITY_REPORTS`, `view_UTILITY_LOGS` | 05 |
| 35 | `auto_LAYOUTS` | 7 | 0 | `view_auto_LAYOUTS` | 05 |
| 36 | `ORGANIZATION` | 6 | 0 | `view_ORGANIZATION` | 05 |
| 37 | `APP_SESSIONS` | 7 | 2 | `view_APP_SESSIONS` | 05 |

**Sum of `Fields`: 398.**

⚠️ **Census transcription note:** the DDR writes **`0 record`** (singular) for empty tables and
`N records` otherwise. Normalised to a number column here; the census is tabulated, the field
blocks are not.

⚠️ **Record counts are a SNAPSHOT of the Aug-15 export**, not stable schema. `IMPORT_EVENTS` went
345 → 5,290 and `UTILITY_LOGS` 686 → 4,939 between the Aug-14 and Aug-15 DDRs. Treat the Fields
column as schema and the Records column as a reading taken at one moment.

## 📁 Base Directories — verbatim

```
ID	Path
0	Production_MAWster/
```

🔴 **Base directory `Production_MAWster/` vs file `Production_MAWnster.fmp12`** — two spellings of
the app name in one DDR. Both copied exactly. Full detail in `observations.md`.

## Manifest

| File | Tables | DDR order | Fields | Size | Status |
|---|---|---|---|---|---|
| `index.md` | — | — | — | *(this file)* | ✅ |
| `observations.md` | — | all 37 | — | 14,663 bytes | ✅ register |
| `tables-01.md` | 10 | 1-10 | 104 | 17,404 bytes | ✅ |
| `tables-02.md` | 10 | 11-20 | 96 | 15,929 bytes | ✅ |
| `tables-03.md` | 6 | 21-26 | 64 | 9,974 bytes | ✅ |
| `tables-04.md` | 4 | 27-30 | 63 | 15,464 bytes | ✅ |
| `tables-05.md` | 7 | 31-37 | 71 | 16,542 bytes | ✅ |

✅ **Every file measured at write time from its write response**, never quoted from an earlier
listing. All under the ~22KB safe-whole-read ceiling.

## 📐 Batching lesson, learned the hard way — carry this forward

🔴 **The "~10 tables per file" cap was the WRONG heuristic and was corrected mid-capture.** Tables
21-30 were first written as one file, measured **24,036 bytes — over the ceiling** — and had to be
split at the theme/pipeline seam into `tables-03` + `tables-04`.

Compare: `tables-01.md` holds **10** tables in 17.4KB. `tables-04.md` holds **4** in 15.5KB,
because `IMPORT_EVENTS` alone is 26 heavily-commented fields.

**✅ The rule that actually works: budget by FIELD COUNT and comment density, aim for ~60-100
fields per file, then MEASURE at write time and split at a real seam if over.** Never record a
size you did not measure, and never leave a known-over file in place.

## Per-field transcription shape

Each table gets an `###` heading with its DDR name and field count, then one entry per field:

1. Field name and **`Type`** exactly as printed.
2. The **`Options`** block verbatim (auto-enter, calculation, validation, storage, indexing), or a
   `[STD-TEXT]` / `[STD-NUM]` reference where byte-identical to the shared block above.
3. The **`Comments`** column verbatim where present. 🔴 **These are Michael's own schema notes and
   are the highest-value text in this section.** Never paraphrased, never corrected — including the
   typos, the truncation, and the places a comment contradicts its own field.
4. `On Layouts` · `In Relationships` · `In Scripts` · `In Value Lists`, as printed.

An absent DDR column is written `(none)` so *absent* is distinguishable from *not transcribed*.
Audit fields are listed by name against the standard blocks above, with variances stated.
