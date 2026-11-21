---
revised: 16 Aug 2026
id: ddr-punch-list
title: DDR Punch List
type: reference
status: public
order: 11
summary: 58 rows from the 2026-08-15 DDR re-audit. Supersedes the 42-row Aug-9 list. Tick them off.
data:
  schedule:
    file: ddr-punch-list.tsv
    caption: One fix per row. Tick `Done` in a spreadsheet. `Origin` says which audit found it.
---

# DDR punch list

Every finding from the DDR read of **`Production_MAWnster.fmp12` at 2026-08-15 16:50** — 37 tables,
15 relationships, 52 scripts, 54 layouts, 14 value lists, 10 custom functions.

🔴 **This SUPERSEDES the 42-row list of 2026-08-09.** That audit ran against a 29-table file with
**zero relationships and zero scripts**, so everything join-side and script-side postdates it
entirely. Every one of its 42 rows was re-checked against the live schema; none were dropped
silently. See *Reconciliation* below.

## The tally — 58 rows

| | Count | Meaning |
|---|---|---|
| 🔴 | **26** | 21 schema/script + 5 repo items carried unverified |
| ⚠️ | **28** | free now, expensive later |
| ⬜ | **4** | needs a decision first |
| | **58** | 32 carried from Aug 9 + 26 new |

**Of the 26 red, SIX corrupt data in flight** (rows 1–6). Those six are the ones that write a wrong
value into a real record every time they run. Everything else red either blocks something
downstream or has two surfaces claiming one fact.

⭐ **Read the ratio, not just the count.** 58 findings against roughly **543 built objects** (398
fields, 52 scripts, 54 layouts, 15 relationships, 14 value lists, 10 custom functions) is about
**11%**, and only **1%** corrupts data. For a file that went from 29 tables and no scripts to this
in one week, that is a low defect rate. **The build is sound; the defects cluster.** Which is the
more useful finding — see *the pattern* below.

🔴 **CORRECTED 2026-08-16, same day this list shipped.** The first version of this file said *"the
four defects that corrupt data in flight are 1–6"* directly above a section headed *"The five that
would cost the most"* — **three different numbers for one set, in adjacent paragraphs.** It read as
"only 6 flags" and it undercounted the list by an order of magnitude. That is the same species of
undocumented arithmetic this list flags in the schema (rows 25, 26, 27, 44), so it is corrected in
place and recorded rather than quietly swapped.

## ⚠️ The source DDR no longer exists

The Aug-15 export was captured into the `_ide` mirrors and then deleted, per the staging rule.
**Recovery coordinates and full coverage table:**
[`90-file-imports-temp/DDR_imports/README.md`](90-file-imports-temp/DDR_imports/README.md).
Last commit containing it: **`d5745a9`**.

🔴 **The Aug-9 list cited `DDR_imports/202608090053.md`, which is also gone and has no recovery
SHA recorded** — it was deleted outside the capture process. That is why the tombstone log now
exists. **Every finding below is instead traceable to a live `_ide` mirror**, not to a dead path:

| Evidence for | Lives in |
|---|---|
| Tables + fields, 398 of 398 | `20-tables/_ide/` · register at `observations.md` |
| Relationships, 15 of 15 | `30-RELATIONSHIPS/_ide/` |
| Scripts, 52 of 52 verbatim | `70-scripts/_ide/` |
| Value lists, 14 of 14 | `25-value-lists/_ide/` |
| Custom function signatures | `60-custom-functions/_ide/` |
| Layouts, 54 of 54 | `50-LAYOUTS/_ide/` |

!!! abstract "How to use it"
    Open the `.tsv` in a spreadsheet, put anything in `Done`, save, push.
    One row is one fix. If a row needs a conversation it is `⬜`, not `🔴`.
    `Origin` reads `A9-6` (Aug-9 row 6, still open) or `A15` (found in this audit).

## ⭐ Ordered by dependency, not severity

Unchanged principle. **The import pipeline now runs end to end and writes wrong values**, so the six
data-corrupting defects are rows 1–6 and every cosmetic item is at the bottom. `Tier` carries
severity separately, so sorting by it still works.

| Tier | Means |
|---|---|
| 🔴 | Blocks something downstream, or two surfaces claim one fact, or it silently writes a wrong value |
| ⚠️ | Free right now, expensive after more records exist |
| ⬜ | Needs a decision before it can be a task |

## The six that corrupt data in flight — rows 1–6

- **`import \| merge Event` reads four wrong JSON keys** (row 1). The payload emits `Name`,
  `dateTime_Start`, `dateTime_End`, `fkStyle`; the merge branch asks for `EventName`,
  `dateTime_start`, `dateTime_end`, `StyleKey`. **Two differ by letter case only.** `ParamGetText`
  returns the fallback on a missing key, so merge writes `"err"` into the name and both dates.
  `import \| net new Event` reads all nine correctly — **so net-new works and merge is broken, which
  is exactly the split that looks like "merge is flaky" rather than "merge is wrong."**
- **`hash_history` failure INVERTED** (row 2). Aug 9 it was `fkProduction & "." & fkStandardEvent`
  — byte-identical every run, so nothing ever looked changed. It is now
  `cu_TaskID & "." & fkUtilityReport`. **`fkUtilityReport` is new on every run**, so the hash now
  differs every time and *everything* looks changed. The formula moved; the defect swapped ends.
- **`EVENTS::hash_current` copies it** (row 3), so change detection is dead end to end in whichever
  direction row 2 currently fails.
- **`calc_ResolvedEnd` still reads `dateTime_Start`** (row 4). **This was row 6 on the Aug-9 list.
  It is one week old.** Both resolved calcs read Start, so every emphasis span resolves to zero
  length. Same bug species as the legacy `RGB ( $R ; $G ; $R )`. `CALENDAR_HIGHLIGHTS` has 0
  records, which is the only reason nobody has seen it.
- **Both `calc_Resolved*` are typed `Calculated, Number`** (row 5) while holding dates, so a Number
  result on a date calc returns the serial.
- **`THEME_COLORS::calc_Hex` is `view_THEME_COLORS::R` alone** (row 6). G and B are not in the
  expression.

## 🔴 The pattern, which is worth more than any single row

**Three separate fields build a multi-argument value out of one argument:** legacy
`RGB ( $R ; $G ; $R )`, `calc_ResolvedEnd` reading Start, and `calc_Hex` reading only R. **Three
instances is a pattern, not three slips.** All three are silent — they return a plausible value of
the right type, so nothing errors and nothing looks wrong until someone compares output to intent.

**And the second pattern, which only became visible once scripts existed: writers and readers
disagreeing.** A script setting `"New"` into a field whose own comment names three other values. A
script setting the string `"0"` into a Number field commented `Get(LastError)`. Three counters no
script increments. A timestamp nothing stamps. A field name that does not exist. **Nine of the 26
new rows are this shape**, and none of them are schema-shape problems — the schema is fine, the
contract between the two halves is not.

**If only two things get fixed this week:** row 1 (merge writes `"err"` into live records now) and
row 18 (the rename wave broke every `@table-*` doc id).

## Reconciliation — all 42 Aug-9 rows accounted for

| Outcome | Count | Rows |
|---|---|---|
| ✅ **Closed** | 4 | 11, 12, 19, 20 |
| 🔄 **Partially fixed, re-scoped** | 6 | 8, 17, 18, 33, 34, 37 |
| 🔴 **Still open, verified in the live schema** | 27 | 1–7, 9, 10, 13–16, 21–32, 35, 36 |
| ⚠️ **Carried, NOT re-verified** | 5 | 38–42 |

**Closed:** `fkImportSssion` and `fkImportSesseion` (11, 12) both vanished when the import tables
moved to the `UTILITY_*` model — fixed by rename, not by correction. `g_pkDefault_PRINT_SET` (19)
was deleted outright, and the lesson landed: the two new globals in `VALUE_LISTS` carry proper
`Storage: Global`. `ROLES::fkPerson` (20) is gone.

🔴 **Rows 38–42 are repo, renderer and GitHub-token items. A DDR says nothing about repo trees, so
they could not be re-verified from this audit and are carried forward unchanged.** They are
marked `A9-38`…`A9-42` with tier intact. **Do not read their presence as confirmation they are
still broken, or their silence as confirmation they are fixed.** They need a separate pass.

### 🔴 A rename wave happened between the two audits, and it invalidates doc ids

The Aug-9 list is written in the old vocabulary. **Six tables were renamed:**

| Aug 9 | Aug 15 |
|---|---|
| `PRODUCTION_CALENDARS` | `CALENDARS` |
| `CALENDAR_HIGHLIGHT` | `CALENDAR_HIGHLIGHTS` |
| `EVENTS_WORKDAYS` | `EVENTS_X_WORKDAYS` |
| `PRINT_SETS` | `EXPORT_SETS` |
| `PRINT_PRESETS` | `EXPORT_PRESETS` |
| `PRINT_SET_ITEMS` | `EXPORT_SET_ITEMS` |
| `IMPORT_SESSIONS` | `UTILITY_SESSIONS` |

⚠️ **That table lists SEVEN renames under a heading that says six.** Counted from the DDR: seven
rows, seven renames. The heading is the error, kept visible for one revision because this file just
shipped with three contradictory counts in it and silently fixing the next one would teach the
wrong lesson. **Seven.**

This is why **row 18 (doc name vs build name) is now the highest-leverage cleanup on the list, not
a tidy-up.** Every `@table-*` id in the doc tree is wired to the left column. The rename also left
three PRINT ghosts in the schema: `EXPORT_PRESETS`'s only occurrence is **`view_PRINT_PRESETS`**,
and both `EXPORT_SET_ITEMS::fkPrintSet` and `EXPORT_SESSIONS::fkPrintSet` still say PrintSet while
pointing at `EXPORT_SETS`.

### ⚠️ Two Aug-9 rows need re-deciding, not just re-doing

- **Row 4/5 (stored date-only fields on `EVENTS`)** were written when spans were to be compared
  directly. **The architecture changed:** `button | generate events x workdays` now projects one
  `EVENTS_X_WORKDAYS` row per day, and the join is `Date = Date` on that table. The original fix
  may be the wrong fix now. Kept as `A9-4` at 🔴 because `EVENTS::dateTime_Start`/`_End` are still
  **`Indexing: None`** while both partners on that join are `All`, but **read it as a question.**
- **Row 30 (`CALENDAR_HIGHLIGHT` → `CALENDAR_EMPHASIS`)** drifted the wrong way — it pluralized to
  `CALENDAR_HIGHLIGHTS` instead. But `emphasis` is now a live **`STYLES::vl_Domain`** value, and
  `CALENDAR_HIGHLIGHTS::fkStyle` is commented *"STYLES row, domain emphasis."* **The word is taken
  by a different concept now**, so the Aug-9 ruling deserves a second look before anyone renames a
  table to collide with it. Now ⬜, not ⚠️.

## What this audit found that Aug 9 could not

The Aug-9 file had **no scripts and no relationships**, so nothing below was observable then. **26
new rows.**

- **Nothing writes `UTILITY_SESSIONS::countRows_File` / `_Imported` / `_Flagged`** (row 12). All
  three sit on the `Import New Events` layout, permanently blank. This is the second half of Aug-9
  row 28: the token cannot land *and* the counter has no writer.
- **Nothing writes `APP_SESSIONS::ClosedTimestamp`** (row 20), and the only script that writes
  `StartTimestamp` is **`trigger_App_Open`, which has no caller** — File Options binds
  `OnFirstWindowOpen` to `on App Open` instead. The live session token lives in a global and never
  touches the table. It holds 2 records.
- **`new \| Utility Log` writes `"open"` into a field that does not exist** (row 7).
  `Set Field [ view_UTILITY_LOGS::<Field Missing>; "open" ]` is a **live** step. `UTILITY_LOGS` has
  13 fields and none holds state. The `open | close` value list exists and is **bound to nothing**.
  4,939 rows have been written through this script with that step failing.
- **`UTILITY_LOGS::ErrorCode` is set to the string `"0"` on every call and by nothing else** (row
  33), into a `Normal, Number` field. Its comment says `Get(LastError) from the failing step`. No
  failing step's error can reach it.
- **`UTILITY_REPORTS::vl_Status` is set to `"New"`** (row 34) — not one of the three values its own
  comment names (`complete | partial | failed`).
- **`EXPORT_SET_ITEMS` has ten of fifteen fields on no layout and zero relationships** (row 47).
  Fully specified in fields and comments, entirely unwired.
- **Four layout names are each used twice** (row 39), and every `Go to Layout` resolves by name
  only. Worst case: `table | EVENTS` exists twice — **one instance has zero objects, the other has
  12 fields and a button bar.**

✅ **Three Aug-14 script defects were fixed by Aug 15** and are recorded here only so nobody
re-files them: `import | pass to workspace` had an unassigned `$result` and read
`Get(ScriptParameter)` where it wanted `Get(ScriptResult)`; it tested `"new new"` against a
returned `"net new"`; and `lookup | calendar for production` had an empty `Set Field`. All three
now read correctly. `import | net new Event` also went from a two-line stub to fully written.

## Not in here

- Open questions and rulings live in the [Decision Log](https://app.clickup.com/36074068/docs/12cwjm-52833/12cwjm-80853), not on a punch list.
- ⭐ **What landed right is still not itemised**, same reason as before: a punch list that also
  lists wins stops being a punch list. **The ratio in the tally above is the one exception** — a
  defect count with no denominator reads as a verdict on the build, which would be wrong. The
  counter-examples themselves are recorded where they belong, in
  `20-tables/_ide/observations.md`: `IMPORT_EVENTS`'s six-field date/time calc family IS correctly
  wired, and `UTILITY_REPORTS::bool_Pass` is the one boolean whose comment and options agree.
- **Layout object geometry.** Not captured from the Aug-15 DDR by ruling
  (*"dont need the loayout objects yet"*), so no row here concerns field placement. Print geometry
  is not auditable from the mirrors.

## ⚠️ One structural note on this file

**The `.tsv` gained an `Origin` column.** Six columns, not five. It is the only way a row can say
*"this was found a week ago and is still here"* without that fact living in prose nobody re-reads.
If the renderer is column-count sensitive, that is the change to look at.
