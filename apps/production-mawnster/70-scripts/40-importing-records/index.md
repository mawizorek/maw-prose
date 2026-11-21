---
id: script-importing-records
title: Importing Records
type: index
status: public
order: 20
revised: 2026-08
<<<<<<< Updated upstream
summary: The import workflow. Three scripts, verified against a live 115-event CSV run.
=======
summary: The import process.
---
<!---
>>>>>>> Stashed changes
data:
  catalog:
    file: importing-index.tsv
--->

# Importing Records

!!! success "A real import has now run"
    2026-08-12: a ClickUp calendar-list export of the Big Love list was imported and
    the landed `import_EVENTS` set was exported back out and parsed. **117 records,
    21 columns, 115 real events, 5/1 -> 10/18/2026.** Everything on this page is
    written against that run rather than against a plan. The findings it produced
    are in the catalog below and in the session record.

    **It worked.** The gaps are stamping and derivation, not parsing.

All user imports hub from either [Import Sessions](@button:layout-session-importing) or a specific record type:

- [Calendar Events](@button:layout-import-events)
- [Contact Joins](@button:layout-import-contacts)

<<<<<<< Updated upstream
Both pipes land in [import_EVENTS](@rel:table-import-events) / the join equivalent, under one [import_SESSIONS](@rel:table-import-sessions) row. **The two-projects framing is really one import layer with two renderers.**

---

## 🔴 The prefix fork — settle before the first script is entered

The locked taxonomy (2026-08-09, J14) is `00 FILE / 10 GOTO / 20 FIND / 30 SHOW / 40 BUILD / 50 EXPORT / 90 UTIL`, **with folders mirroring name prefixes 1:1 and holding nothing else.**

🔴 **This folder is `40-importing-records`, which is a TOPIC folder sitting in the `40 BUILD` slot** — the exact defect that ruling deleted `LOGS`, `SHOW & HIDE` and `File OPERATIONS` for. {.gap} Two options, and one must be picked:

1. **Add `IMPORT ·` as a real prefix** and renumber (`40 IMPORT`, BUILD moves). The template's own instruction is *"add the prefix here in the same pass as the first script that uses it"* — which is this pass.
2. **These are `BUILD ·` scripts** and the folder is renamed `40-BUILD`.

⚠️ Names below are written as `IMPORT ·` pending that call. **If option 2 wins, every name on this page changes and so does the rename map in [the scripts index](@scripts).**

---

## The workflow

### Stage 0 · ClickUp (outside the file)

A dedicated export view, **one per production**, exporting only the five columns in the catalog below as unique lines. 🔴 **Turn OFF "use field names as first row."** The live run left it on and produced a header row as record 2 plus a blank record 1 — visible only because the stored timestamp calcs returned `?` on it, which is them failing loud and working correctly.

⚠️ **Task ID must be in the view.** It was missing from this folder's field map entirely, and it is half the upsert key.

### Stage 1 · `IMPORT · Session Open`

The operator declares **which production and which calendar** this pull belongs to. Then, in order:

1. Create the [import_SESSIONS](@rel:table-import-sessions) row **FIRST, before any data moves.** The table's own spec says *stamp failed runs too* — which is impossible if the session record is written at the end.
2. Set `g_currentImportSession` and `g_currentImportProduction` as **true Global storage**, not just any field. {.gap}
3. Record `RowCount_File`.

🔴 **`fkProduction` is DECLARED, never derived from a token in the file.** Any row whose ClickUp production token disagrees with the declaration is **flagged, never silently filed** — that is how a renamed label gets caught on day one instead of in October.

### Stage 2 · `IMPORT · Events CSV`

The import itself, and the whole trick is that **nothing is stamped afterward.**

- `fkImportSession` and `fkProduction` are **auto-enter from the globals on record creation**, with **"Perform auto-enter options while importing" ticked in the stored `Import Records` step.** So no row can ever exist unstamped — there is no window between landing and stamping.
- Skip the first record (or fix the export view; do one, not both, or you lose a real event).
- `bool_AllDay` is auto-enter too: **END time is `00:00` AND START is empty -> 1.** 33 of the 115 rows are all-day and every one landed `0`. A `00:00` end excludes the last day, so every deadline currently renders on the wrong side of its own boundary.

🚫 **NOT a post-import `Replace Field Contents` loop for the keys.** Replace hits the **found set**, is not undoable, and one stray trigger or subscript between the import and the Replace stamps append-only history instead of the new rows.

⭐ **The one legitimate `Replace`** is `import_RowNumber` over the post-import found set with `Get ( RecordNumber )`. Position in the file genuinely is not knowable per-record at creation. *(This is a deliberate exception to the paragraph above, called out because it looks like a contradiction.)*

### Stage 3 · `IMPORT · Session Close`

1. Reconcile `RowCount_File` vs `RowCount_Landed` vs `RowCount_Flagged`. **A mismatch means reconcile before trusting the pull.**
2. Stamp `dateTime_Complete` — **including on a failed run.**
3. Pass its **own** status to [UTIL · Run End](@script:script-util-run-end). It cannot see what happened upstream, and its default is the documented worst case in this file.

**Verification, and it is one find:** search `import_EVENTS` for an empty `fkImportSession`. **Expected count: zero.** Anything else means the auto-enter did not fire, which is the failure this whole shape exists to make impossible.

### Stage 4 · `BUILD · Upsert Events` — a SEPARATE script, deliberately

Importing and upserting are different jobs and must not share a script. Import is append-only and can be re-run; the upsert **writes to canonical EVENTS** and cannot.

🔴 **The key is `cu_TaskID` + `fkProduction`, never TaskID alone.** `URITP Productions` is a multi-select in ClickUp, so one event task can legitimately carry two shows, each printing its own copy. **Keying on TaskID alone means show two silently overwrites show one.**

⚠️ **[EVENTS](@rel:table-events)`::fkProduction` is UNINDEXED** while its own field comment says *"Indexed."* {.gap} Every upsert scans. **Flagged five times now**, and it is this script's join key.

---

## What is deliberately NOT in this workflow yet

**The `fkStandardEvent` crosswalk, and the style vocabulary cleanup.** Both are real and both are downstream. The reasoning for deferring rather than just postponing:

⭐ **A missing `fkStandardEvent` is RECOVERABLE and that is why it can wait.** `import_EVENTS` is append-only and retains `import_Name`, so the name crosswalk can be re-run over historical rows at any time and will produce the same answer. ⚠️ **Contrast J6, where `fkStandardEvent` on EVENTS went in early precisely because it could never be reconstructed — the test is UNRECOVERABLE, not merely inconvenient, and it lands on opposite sides for the two tables.** Do not misapply that precedent in either direction.

🔴 **`import_Style_Key` is the one that needs a decision before theming is wired**, because one of its six observed tokens is not an event kind: **`BLACK` is a colour.** {.gap} A rendering instruction sitting in a semantic field is the exact leak `STYLES` = identity-only exists to prevent (J3). Casing is also inconsistent (`PRODUCTION` / `Rehearsal` / `DEADLINE`). **Six tokens is small enough to map by hand into STYLES rows, and that is the shortest path from a landed import to a coloured calendar** — the crosswalk is a bigger build and is not on the critical path to a printed grid.

---
=======
All imported records land in dedicated import table. Each import field typically gets a specifc "import_" field to load direclty into.
>>>>>>> Stashed changes

## Using CSV

- Have a dedicated ClickUp view solely for exporting the necessary fields and records as unique lines (no expanded tasks — collapsed is fine).
- ⚠️ **The export is CR-terminated classic-Mac text.** Fine for FileMaker, will choke a naive parser reading it back out.
- ⚠️ Dates arrive in the file's locale order (`9/6/2026 2:00 PM`), not ISO.

<<<<<<< Updated upstream
??? note "Fields for Production Calendar events"
    Keep it light. Five columns. The catalog below is verified against a live export, not proposed.

!!! data "catalog"

---

## What the live run also proved about the DATA (not the mechanism)

- ✅ **Zero duplicate TaskIDs. Zero end-before-start.** Four legitimate multi-day spans (both Costume Fittings, Meliora Weekend, Fall Break) — so the span relationship has real work to do, and the number is 4, not a theory.
- ⚠️ **Three rows carry no dates at all** (`Paper Tech`, `LX Hang prep`, `SET Risers`). `dateTime_End` is EVENTS' stated minimum requirement, so these cannot upsert. **They are the legacy UNSCHEDULED bucket and `RowCount_Flagged` is 3.**
- 🔴 **26 of 115 events are not `[BL]`-prefixed, and they are three different populations** — genuinely shared UR dates that belong on `STANDARD_EVENTS` and should print on every calendar (`Fall Classes Begin`, `Labor Day`, `Fall Break`, `! MELIORA WEEKEND !`), two May `Auditions` rows that belong to the season rather than to one show, and an entire tech block that IS Big Love work and simply never got prefixed. **The prefix was doing the work `fkProduction` is supposed to do.** This is the multi-label exposure fork, in real data rather than in argument.

## Unverified

- Whether "Perform auto-enter options while importing" survives being saved into a stored import step, or must be re-ticked per run. {.verify} **Load-bearing for the entire no-window guarantee above** — test it before trusting it.
- Whether the header-row skip is per-import-step or per-dialog. {.tbc}
=======
>>>>>>> Stashed changes
