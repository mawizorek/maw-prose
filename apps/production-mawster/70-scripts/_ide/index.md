---
id: mawster-ide-mirror
title: Script IDE Mirror — verbatim
type: index
status: hidden
order: 1
revised: 2026-08
summary: A verbatim mirror of the Production_MAWnster script workspace, transcribed from the DDR. Copy, not commentary.
---

# Script IDE Mirror — verbatim

**This is a TRANSCRIPTION, not documentation.** It exists so a future agent can review the
actual codebase for flaws without reading a 360KB DDR. Every script body is copied verbatim
from the source DDR, including typos, commented-out steps, `<unknown>` steps and
`<Field Missing>` references. **Nothing here has been corrected, normalised or interpreted.**

<!-- CURRENT SOURCE: mawizorek/uritp-docs @ d47535e
     production-mawster/90-file-imports-temp/DDR_imports/2608151650/raw.txt (360,264 bytes)
     Chunk set UUID 7534bbed-6a2a-4d5a-a2a2-7d3b00ced5b8 (File Chunker v18, 21 parts)
     Parts read this pass: 1, 8, 10, 16, 17, 18, 19, 20, 21. All START/END UUIDs verified.
     PRIOR SOURCE: DDR 2608142227 @ 2a9909d (20 parts) - THAT IMPORT FOLDER HAS BEEN DELETED. -->

## 🔴 Source generation — read before trusting any file here

| | |
|---|---|
| **Ground truth** | the `.fmp12` file itself, via a fresh DDR |
| **Current DDR** | `DDR_imports/2608151650` — Aug 15, 16:50 · 360KB · 21 chunks |
| **Prior DDR** | ~~`DDR_imports/2608142227`~~ — Aug 14, 22:27 · **DELETED from the repo** |
| **This mirror** | a verbatim copy of the DDR's Scripts section, for agent review |
| **The hand-written specs in `70-scripts/`** | a DIFFERENT document class — what a script *should* be. They do NOT agree with this mirror. |

⚠️ **The mirror was first built against a DDR that no longer exists.** Files carrying content
from `2608142227` are stamped per script. The app moved substantially between the two exports;
see the delta table and the pending list below.

🔴 **Do not reconcile the specs against this mirror inside these files.** A transcription that
argues with itself stops being a transcription. Findings go somewhere else.

🔴 **THIS INDEX IS THE SOLE PROVENANCE RECORD FOR BOTH `Pass-to-Workspace` FILES.** They were
stripped of all inline provenance and transcription commentary on 2026-08-16 at Michael's
instruction (*"strip only the transcription/provenance comments from Pass-to-Workspace and keep
all script bodies verbatim"*), and the same contract carried into the sibling file created by
the split later that day. Both carry front matter, headings, DDR metadata blocks, verbatim step
lists and dependency lists — **and nothing else.** Both point here via a `provenance:` key.
**If the section below is deleted, their provenance is gone.**

## Overview counts, as reported by the current DDR

| | `2608142227` (Aug 14) | `2608151650` (Aug 15) | |
|---|---|---|---|
| Tables | 37 | 37 | |
| Relationships | 12 | **15** | +3 |
| Layouts | 52 | **54** | +2 |
| **Scripts** | **44** | **52** | **+8** |
| Value Lists | 0 | **14** | +14 |
| Custom Functions | 0 | **10** | +10 |
| Accounts / Privilege Sets | 0 / 0 | 0 / 0 | |

🔴 **`Value Lists 0` and `Custom Functions 0` in the older DDR were NOT omissions.** That was
flagged as suspicious at the time, since scripts were already calling `Param`, `PText`,
`Pbool`, `PNum`. The Aug-15 export settles it: those objects genuinely did not exist on Aug 14.
The scripts were written against functions that had not been installed yet.

**File Options — script triggers, verbatim (unchanged across both generations):**

```
OnFirstWindowOpen   Script: on App Open
OnLastWindowClose   Script: on App Close
OnWindowOpen        Off
OnWindowClose       Off
Minimum allowed version  12.0
Login using         Account Name; Account= Admin
```

## Script Hierarchy — VERBATIM from DDR 2608151650

⚠️ **Indentation is lost in the source extraction.** The block below is copied exactly as the
DDR emitted it. Folder lines and script lines are therefore visually flat. Where nesting
matters, each script's own `Parent Folder` value is recorded in its transcription and is the
more reliable signal.

```
set Global | pkCurrentUtilitySession
file | Create Backup
APP OPEN
on App Open
new | App Session Token
APP CLOSE
on App Close
BUTTONS
button | import EVENTS
button | generate events x workdays
new | workday x event
New-Record
new-import-session
lookup | production short
40-Importing
import | new events
process
import | Event records
import | write row numbers
import | copy Payload
linking
link | fkUtilityReport
link | fkReport fkProd Hash
normalization
import | delete empty rows
import | delete header row
import EVENT | remove ProdShortName
import | remove maw notes
import | bool all day
Pass to Workspace
import | pass to workspace
compare | cu_ID
import | net new Event
import | merge Event
backup | EVENT
merge | compare field
XXmerge | Event Field
lookup | calendar for production
filter | to current run
80-GoTo
CURRENTS
goto_view_UTILITY_LOGS
goTo | view_UTILITY_REPORTS
goTo | productions
goTo | Calendars
goTo | Events
goTo | Events x Workdays
goTo | table Import EVENTS
goto_view_Import_Sessions
goto_view_APP_SESSIONS
goto_view_UTILITY_LOGS
goto_view_VALUES
85-NEW_WINDOWS
goTo | new window currentRunReport
90-UTILITY
trigger_App_Open
App_Startup
RUN_REPORTS
new | Utility Report
end | Utility Report
LOGS
new | Utility Log
SHOW & HIDE
Show ALL or NONE
status_index_move
exit w/ errors
button | generate Workdays
sort | fkWorkday date
```

**Count reconciliation:** 68 lines − 16 folder lines = **52 scripts**, which matches the
Overview's `Scripts 52`. The set is complete.

**The 16 folder lines:** `APP OPEN` · `APP CLOSE` · `BUTTONS` · `New-Record` · `40-Importing` ·
`process` · `linking` · `normalization` · `Pass to Workspace` · `80-GoTo` · `CURRENTS` ·
`85-NEW_WINDOWS` · `90-UTILITY` · `RUN_REPORTS` · `LOGS` · `SHOW & HIDE`. Unchanged from the
prior generation — **no new folders were created for the 8 new scripts.**

🔴 **The 16 IDE folders map to 17 mirror files, NOT 16.** `Pass to Workspace` is transcribed
across two files (see the split note below). **An agent counting folders to predict files will
be off by one**, and that is deliberate rather than an error.

## 🆕 The 8 new scripts (44 → 52), all transcribed

| Script | IDE folder | Mirror file |
|---|---|---|
| `button | generate events x workdays` | `BUTTONS` | `BUTTONS.md` |
| `new | workday x event` | `BUTTONS` | `BUTTONS.md` |
| `backup | EVENT` | `Pass to Workspace` | `40-Importing/Pass-to-Workspace.merge-rollback.md` |
| `merge | compare field` | `Pass to Workspace` | `40-Importing/Pass-to-Workspace.merge-rollback.md` |
| `XXmerge | Event Field` | `Pass to Workspace` | `40-Importing/Pass-to-Workspace.merge-rollback.md` |
| `goTo | Events x Workdays` | `80-GoTo` | `80-GoTo/index.md` |
| `button | generate Workdays` | *(root)* | `_ROOT.md` |
| `sort | fkWorkday date` | *(root)* | `_ROOT.md` |

They cluster in two places: the **EVENTS × WORKDAYS join** (5 of 8) and the **merge/rollback
path** (3 of 8). The merge/rollback three now have their own file.

## ✂️ The Pass to Workspace split (2026-08-16)

**One IDE folder, two mirror files.** Michael's instruction: *"split the merge/rollback trio out
now."*

| File | Scripts | Size |
|---|---|---|
| `40-Importing/Pass-to-Workspace.md` | 5 | **18,512 bytes** |
| `40-Importing/Pass-to-Workspace.merge-rollback.md` | 3 | **6,657 bytes** |

✅ **Both are now under the ~22KB safe-whole-read ceiling.** Sizes measured at write time,
2026-08-16, from the write responses — not quoted from an earlier listing.

**Full arithmetic, because the numbers do not simply add up and the reason matters:** the file
was 25,797 bytes; the strip pass took it to 23,638 (−2,159, still over the ceiling); the split
then produced 18,512 + 6,657 = 25,169 bytes total. **The split ADDED ~1,531 bytes overall** —
the new file's front matter, heading, cross-reference notes, and the pointer stub left in the
parent. That is the correct trade: total bytes are irrelevant, **per-file readability is the
constraint.**

⚠️ **THIS IS A FILE SPLIT, NOT A FOLDER SPLIT.** All 8 scripts live in the same
`Pass to Workspace` folder in FileMaker. Nothing about the app changed. An agent must not infer
a new IDE folder from the new filename.

⚠️ **The `Previous Script` / `Next Script` chain runs ACROSS the file boundary and was NOT
edited.** `import | merge Event` still points to `backup | EVENT` as its Next, and
`lookup | calendar for production` still names `XXmerge | Event Field` as its Previous, even
though those targets now live in the sibling file. **Those pointers are DDR metadata; rewriting
them to fit our file layout would be a fabrication.** The parent file carries a `⏭` marker at
the split point so the ordering stays visible.

## 📄 Absorbed from the Pass to Workspace files — provenance + observations

Everything below was stripped out of the two `Pass-to-Workspace` files and lives here instead.
**The step lists in those files were never touched, by either the strip or the split.**

**Provenance for all 8 scripts across both files:** source DDR `2608151650` @ `d47535e`, parts
18-20/21, chunk set UUID `7534bbed-6a2a-4d5a-a2a2-7d3b00ced5b8`, START/END UUIDs verified. **No
mixed generations — both files are current.** Every one of the 5 pre-existing scripts had
changed since `2608142227`, which is why the folder was re-transcribed whole rather than
patched:

| Script | Change since the prior DDR |
|---|---|
| `import | pass to workspace` | substantially rewritten (loop added, logging added) |
| `compare | cu_ID` | the matched field changed |
| `import | net new Event` | was a two-line stub, now fully written |
| `import | merge Event` | rewritten around a field-walk loop |
| `lookup | calendar for production` | the empty `Set Field` now carries a value |

⚠️ **`import | pass to workspace` spans the 18/19 chunk boundary.** Its final `Perform Script`
line was printed at the head of part 19. Both parts were read, both UUIDs verified; the splice
is recorded here rather than in the file.

**Observations that were inline, now here.** These are what the DDR printed, recorded without
verdict:

- `backup | EVENT` — the `If [ PatternCount ( ... ; "Rollback" ) ]` branch is printed EMPTY, all
  work sits in the `Else`.
- `backup | EVENT` — the `Set Variable [ $jsonUpdated ... ]` line carries an inline `/* ... */`
  comment inside the calculation. Preserved intact in the file.
- `backup | EVENT` — the commented-out tail includes nine consecutive bare `//` lines. All
  preserved in the file.
- `merge | compare field` — `Set Field [ $value ]` is printed with a target slot but **no field
  name**.
- `merge | compare field` — the `backup | EVENT` call is commented out in the steps, yet the DDR
  still lists it under Scripts used.
- `merge | compare field` — the closing `#RETURN: pass 0/1` comment describes a return the step
  list does not perform.
- `XXmerge | Event Field` — the `XX` name prefix is verbatim. No claim is made about what it
  signifies.

## ⚠️ Pending re-transcription

Files below still carry text from the deleted `2608142227` DDR. **Each affected script is
stamped inline with its source and any known drift.** A cold agent must read those stamps
before quoting a body.

| Mirror file | Status |
|---|---|
| `index.md` | ✅ current (this file) |
| `_ROOT.md` | ⚠️ **mixed** — 6 scripts from `2608142227` (1 known drift, flagged inline), 2 new from `2608151650` |
| `BUTTONS.md` | ✅ fully re-transcribed from `2608151650` |
| `40-Importing/Pass-to-Workspace.md` | ✅ fully current from `2608151650`; **provenance is in THIS index, not in the file** (stripped 2026-08-16) |
| `40-Importing/Pass-to-Workspace.merge-rollback.md` | ✅ fully current from `2608151650`; **provenance is in THIS index** (split 2026-08-16) |
| `80-GoTo/index.md` | ✅ fully re-transcribed from `2608151650` |
| `APP-OPEN.md` | ⚠️ from `2608142227`; bodies re-read in part 17 and verified UNCHANGED |
| `APP-CLOSE.md` | ⚠️ from `2608142227`; body re-read in part 17 and verified UNCHANGED |
| `New-Record.md` | ⚠️ from `2608142227`; body re-read in part 17 and verified UNCHANGED |
| `40-Importing/index.md` | ⚠️ from `2608142227`; **DRIFTED** — gained `#assume on: import_events_layout` |
| `40-Importing/process.md` | ⚠️ from `2608142227`; bodies re-read in parts 17-18 and verified UNCHANGED |
| `40-Importing/linking.md` | ⚠️ from `2608142227`; bodies re-read in part 18 and verified UNCHANGED |
| `40-Importing/normalization.md` | ⚠️ from `2608142227`; bodies re-read in part 18 and verified UNCHANGED |
| `80-GoTo/85-NEW_WINDOWS.md` | ⚠️ from `2608142227`; body re-read in part 20 and verified UNCHANGED |
| `90-UTILITY/index.md` | ⚠️ from `2608142227`; bodies re-read in part 20 and verified UNCHANGED |
| `90-UTILITY/RUN_REPORTS.md` | ⚠️ from `2608142227`; bodies re-read in parts 20-21 and verified UNCHANGED |
| `90-UTILITY/LOGS.md` | ⚠️ from `2608142227`; body re-read in part 21 and verified UNCHANGED |
| `SHOW-AND-HIDE.md` | ⚠️ from `2608142227`; **DRIFTED** — caller list gained `import | net new Event` |

**Known drift not yet written into its file:** `40-Importing/index.md` and `SHOW-AND-HIDE.md`.
Everything else marked UNCHANGED was compared against the current DDR during this pass.

## Sibling captures outside this folder

Other DDR sections were mirrored under the same `_ide/` convention:

| Section | Location | Scope |
|---|---|---|
| Relationships (15) | `30-RELATIONSHIPS/_ide/relationship-graph.md` | full verbatim |
| Value Lists (14) | `25-value-lists/_ide/value-lists.md` | full verbatim |
| Custom Functions (10) | `60-custom-functions/_ide/cf-index.md` | **INDEX ONLY by ruling** — canonical bodies live in another repo |

✅ **`25-value-lists/` is Michael's ruling (2026-08-16).** The value-list mirror lived at
`15-runtime/_ide/value-lists.md` for about an hour before the folder was named; **that path is
deleted, not redirected.** One claimant, no stub.

📋 **The CF reconciliation rule for future passes lives in `cf-index.md`:** compare an index of
CF names against the canonical CF repo and confirm each exists. **Do not diff line-for-line.**

**Not yet captured:** Tables + Fields (37 tables, the bulk of the DDR, chunks 1-8), Layouts +
Layout Objects (54 layouts, chunks 8-17), Themes (2).

## Manifest — the 18 mirror files

One file per IDE folder in hierarchy order, **except `Pass to Workspace`, which takes two.**
Folder-granularity rather than one-file-per-script: related scripts get reviewed together and
the whole codebase is 18 fetches instead of 52.

| # | Mirror file | Exact IDE folder | Scripts |
|---|---|---|---|
| 1 | `_ROOT.md` | *(no parent folder)* | 8 |
| 2 | `APP-OPEN.md` | `APP OPEN` | 2 |
| 3 | `APP-CLOSE.md` | `APP CLOSE` | 1 |
| 4 | `BUTTONS.md` | `BUTTONS` | 3 |
| 5 | `New-Record.md` | `New-Record` | 1 |
| 6 | `40-Importing/index.md` | `40-Importing` | 1 |
| 7 | `40-Importing/process.md` | `process` | 3 |
| 8 | `40-Importing/linking.md` | `linking` | 2 |
| 9 | `40-Importing/normalization.md` | `normalization` | 5 |
| 10 | `40-Importing/Pass-to-Workspace.md` | `Pass to Workspace` (5 of 8) | 5 |
| 11 | `40-Importing/Pass-to-Workspace.merge-rollback.md` | `Pass to Workspace` (3 of 8) | 3 |
| 12 | `80-GoTo/index.md` | `80-GoTo` + `CURRENTS` | 11 |
| 13 | `80-GoTo/85-NEW_WINDOWS.md` | `85-NEW_WINDOWS` | 1 |
| 14 | `90-UTILITY/index.md` | `90-UTILITY` | 2 |
| 15 | `90-UTILITY/RUN_REPORTS.md` | `RUN_REPORTS` | 2 |
| 16 | `90-UTILITY/LOGS.md` | `LOGS` | 1 |
| 17 | `SHOW-AND-HIDE.md` | `SHOW & HIDE` | 1 |
| — | `index.md` | *(this file)* | 0 |

**Total: 8+2+1+3+1+1+3+2+5+5+3+11+1+2+2+1+1 = 52.** Every script in the file is accounted for,
and `Pass to Workspace` still sums to 8 across its two files.

⚠️ **Folder and file names are slugified** (`SHOW & HIDE` → `SHOW-AND-HIDE.md`) because `&` and
spaces in repo paths break links. **The exact IDE name is recorded in every file's front matter
and heading**, and that name is the one to type in FileMaker.

⚠️ **Read-size watch.** `_ROOT.md` (14,441 bytes) and `BUTTONS.md` (10,184 bytes) are the next
largest and both have headroom. **The next DDR generation is the moment to re-measure**, since
the last one added 8 scripts in a weekend. The split precedent above is the pattern: one concern
per file, seam chosen along a real boundary, and **the sizes measured at write time and written
down.**

## ⚠️ Transcription notes (source ambiguities, copied not resolved)

1. **`goto_view_UTILITY_LOGS` appears TWICE** in the hierarchy, both under the GoTo area, and
   the DDR prints two separate script entries under that one name with identical bodies. Both
   are transcribed, tagged `instance 1` and `instance 2`. **Still true in this generation.**
2. **Eight scripts have NO `Parent Folder` line** in their DDR entry — `set Global | pkCurrentUtilitySession`,
   `file | Create Backup`, `lookup | production short`, `filter | to current run`,
   `status_index_move`, `exit w/ errors`, `button | generate Workdays`, `sort | fkWorkday date`
   — yet the hierarchy block shows several positioned inside or after folders. The DDR prints
   parentless scripts first in its body section, which suggests root. **Both readings are
   recorded; neither is chosen.** They are filed in `_ROOT.md`.
3. **`CURRENTS` is emitted as a folder header with no scripts printed under it**, appearing in
   the body section *after* the eleven GoTo scripts rather than before them.
4. **`goto_view_VALUES` has a completely empty `Script Steps` block.** Transcribed as empty.
   Still empty in this generation.
5. **`Perform Script [ <unknown> ]` appears as a LIVE step** in `App_Startup` and in the new
   `button | generate Workdays`, and commented out in `goTo | view_UTILITY_REPORTS` and
   `goTo | Calendars`. Copied literally.
6. **`new | Utility Log` sets `view_UTILITY_LOGS::<Field Missing>`**, and `button | import EVENTS`
   plus `button | generate events x workdays` list a `<Missing Field>` dependency. Copied literally.
7. **`import | net new Event` and `import | merge Event` now match on `view_EVENTS::cuID`**,
   where the prior generation used `view_EVENTS::cuTaskId`. Both spellings exist in the repo's
   history; the current DDR says `cuID`.

## Per-script transcription shape

Every script in every mirror file carries, in this order:

1. The exact script name as an `###` heading.
2. Its **source DDR stamp** where the file mixes generations. ⚠️ **Exception: neither
   `Pass-to-Workspace` file carries stamps at all** — stripped 2026-08-16, provenance held in
   this index. Absence of a stamp there does NOT mean unknown provenance.
3. The DDR metadata block: `Parent Folder`, `Previous Script`, `Next Script`, full-access flag,
   `Include In Menu`, Siri visibility.
4. `Scripts that use this script` and `Layouts that use this script` — the inbound callers.
5. **`Script Steps` verbatim, in a fenced block.** Untouched.
6. The DDR's own dependency lists: fields, scripts, layouts, tables, table occurrences, custom
   functions.

An empty DDR list is transcribed as `(none)` so that *absent* is distinguishable from
*not transcribed*.

🔴 **Fidelity note, kept rather than deleted.** The first commit of `_ROOT.md` (2026-08-14)
substituted `!=` for the not-equal glyph `≠` and stripped curly quotes from script-name
arguments. It was restored to true verbatim the same day. **A transcription that claims verbatim
and silently normalises is worse than no transcription**, which is why this stays on the record.
