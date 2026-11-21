---
id: print-first-runbook
title: Print-first Runbook
type: runbook
status: public
order: 11
revised: 2026-08
summary: The only page to open next session. Four stages, two PDFs, and a list of everything you are not allowed to touch until a page prints.
---

<!-- House rule, 2026-08-14 (Michael): NO EMOJI IN REPO DOCS. Emphasis is carried by
     callouts (which ship their own SVG icons) and by inline marker spans from
     theme/markers.tsv. A literal emoji is a third mechanism duplicating two that
     already exist. This page was the worst offender in the tree and is the reference
     for what the corrected form looks like. -->

# MAWster Print-first Runbook

!!! danger "Read this paragraph or the runbook does not work"
    **36 tables, 0 relationships, 0 layouts** (DDR `202608091643`). The print path is fully designed and entirely unbuilt. Every session since 08-08 went into the layer that FEEDS the calendar instead of the calendar. **This page inverts that order and it only works if the Do-Not-Touch list is obeyed.** If a session touches anything on that list before a page prints, it has repeated the mistake this runbook exists to fix.

**Target: two PDFs.** An ugly vertical date list at the end of Stage 2, and the week grid at the end of Stage 4. Everything here is already specced elsewhere — [[Print & iPad Geometry](@print-geometry)] holds the geometry and the build checklist, [[Relationships](@relationships)] holds the graph plan, `50-LAYOUTS/LAYOUTS.tsv` names the layouts. **Read, do not redesign.**

---

## Stage 0 · Decided, do not re-litigate (5 min)

Two forks that would otherwise eat the first twenty minutes. Both are Fiona's calls, 2026-08-13.

### 0.1 · The calendar-scope predicate {.conf}

A relationship matches two occurrences only, so the parent side needs a field holding the current calendar. **Resolution: the global is reached from the ANCHOR as an unstored calc — not stored on `WORKDAYS`, not a portal filter.**

1. Cartesian (`×`) buoy from the grid anchor to `GLOBAL_USE`.
2. Unstored calculation {.calc} on the anchor returning `GLOBAL_USE::g_pkCurrentCalendar` {.global}.
3. Use that calc as the parent-side match field. **Parent-side match fields may be unstored**; only the child side (`EVENTS::fkCalendar`) needs an index.

!!! warning "Verify this resolves before building on it"
    Five minutes in the file. If FileMaker refuses the unstored calc as a match field through a Cartesian buoy, fall back to a plain global field on the anchor and write that down.

!!! failure "Never the portal filter"
    It filters DISPLAY only, so found sets and reports lie.

**Apply the same answer to `STYLES_ACTIVE` and `STYLES_HOUSE`.** The relationships index says decide once for all three. This is the once.

### 0.2 · `WEEKS` is the print anchor {.tbc}

J8 parked `WEEKS` "with no known job"; J19 killed `fkWeek` {.alias} "until a report that groups BY week." **The month grid IS that report.** `print-geometry` requires seven day-portals side by side in one week row with *also resize enclosing part*, so the layout body part must be one record per week. That is `WEEKS`.

!!! warning "This is a proposal against a parked ruling"
    It needs Michael's yes before fields are added to `WEEKS` — but it is the only shape that satisfies the print spec, so **treat "WEEKS is dead" as retired** and do not re-park it.

---

## Stage 1 · Import — get 115 rows into `EVENTS` (~20 min)

The landed set is already there: **117 records, 115 real events, 5/1 → 10/18/2026** in `import_EVENTS`.

1. **`EVENTS::fkProduction` — add the index.** Its own field comment claims *"Indexed"* and it is not. Sixth flag, and it is a match field in Stage 2, so it stops being a nuisance and starts being a blocker here.
2. **Move the rows into `EVENTS` by hand** — internal import, `import_EVENTS` → `EVENTS`, mapping by name.
3. **Skip the two junk rows** (blank record #1, header-as-record #2) and **keep the three dateless rows** — `Paper Tech`, `LX Hang prep`, `SET Risers` are the legacy UNSCHEDULED bucket, not garbage.
4. Stamp `fkCalendar` on all of them. One calendar exists; set it once by Replace Field Contents.

!!! failure "Do NOT wait for `BUILD · Upsert Events` to be written"
    The chain does not have to be finished for the data to be in the table, and **this is the single decision that unblocks the whole page.**

**Stop condition:** `EVENTS` shows ~115 records with dates and a calendar key. Nothing else about `EVENTS` matters yet.

---

## Stage 2 · `WORKDAYS` — the ugly PDF (~40 min, ends in output)

**Not the grid.** A vertical date list. Real output a stage manager could use tomorrow, and it proves the graph works before any geometry is at stake.

1. **Generate `WORKDAYS`.** Loop script {.script}, ~10 lines, one record per real date across the season range. **Canonical-per-date** per J19 — `Date` is Unique + Not empty, and there is no `bool_HideFromCalendar` and no `ovr_ManualDate`.
2. **Build `WORKDAYS_EVENTS`** {.rel} — `WORKDAYS::Date = EVENTS::Date`, plus the calendar predicate from 0.1. **This is the first relationship in the file.**
3. **Build the `WORKDAYS` working form** per `LAYOUTS.tsv`: anchor `WORKDAYS`, one portal {.portal} on `WORKDAYS_EVENTS`. Fields: date, then event name and times in the portal row. Ugly is the point.
4. **Preview mode.** Not Browse. Browse never shows sliding and will lie to you all night.
5. **Save/Send Records as PDF.**

**Stop condition — PDF #1 exists.** A page of dates with their events on it. If this does not happen, nothing in Stage 3 is worth starting.

---

## Stage 3 · `WEEKS` anchor — the grid (~60 min)

### 3.1 · Run the empty-portal PDF test FIRST {.verify}

!!! danger "Before building all seven columns"
    An empty sliding portal is documented as corrupting `Save/Send Records as PDF`: with slide + resize enclosing part, a record whose portal is empty produces a PDF where the object *below* the portal does not render at all. **This app has empty days by design** and `PRINT_SESSIONS` exists to log Save/Send output, so this is the intended path, not an edge case.

**Test:** one week row, ONE day portal, containing a fully empty day, then Save/Send as PDF and confirm nothing below it vanishes. If it reproduces, a hidden single space in the day cell keeps the portal from ever being truly empty. **Ten minutes here saves rebuilding seven columns.**

### 3.2 · Build it

1. **`WEEKS` fields:** one record per week, plus the seven dates of that week (calc {.calc} off the week-start date, or seven stored dates set by the generator — either is fine, the calc is cheaper).
2. **Seven buoys:** `WEEK_EVENTS_MON` through `WEEK_EVENTS_SUN` {.rel}, each predicated on that day's date on `WEEKS` against `EVENTS::Date`, plus the calendar predicate.
3. **Seven portals** {.portal} side by side in the body part. **Draw the slot count for TECH WEEK, not for an average week** — a portal never grows, and busy weeks cost nothing extra while quiet weeks give the space back by sliding.
4. **Run `print-geometry`'s build checklist literally.** All seven portals slide up + *also resize enclosing part* (six out of seven pins the row open), and every object below them slides too.
5. **Chrome hides, space slides.** Navigation and buttons get *hide when printing*; anything that leaves a hole has to slide or the collapse is blocked.

!!! failure "No rectangle as the day-cell border"
    Non-field objects slide but never shrink, so a box drawn for 10 rows keeps its height on a collapsed week and breaks the grid. Use the portal's own row borders, alternating fill, or a bottom rule set to slide.

**Stop condition:** in Preview, a light week is visibly shorter than tech week. If every week is the same height, something in step 4 is missing — it is almost always one portal or one footer object.

---

## Stage 4 · PDF test — acceptance (~15 min)

1. **Save/Send Records as PDF** across a range that contains: a tech week, a light week, an empty day, and a multi-day span (both Costume Fittings, Meliora Weekend and Fall Break are the four legitimate spans in the landed data).
2. **Check, in this order:** nothing vanished below a portal, week rows differ in height, the multi-day spans read correctly, and a displaced event past the last slot carries its own date in its label (Decision Log J17).
3. **Open it on the iPad.** Letter fit to the 13-inch screen renders at ~92% of physical size, so this is close to 1:1 and worth seeing on the real surface.

**Done = PDF #2.** A month grid that self-sizes per week, from real Big Love data, with zero scripting in the print path.

---

## Do-Not-Touch until a page prints

!!! failure "All real, all logged, none of it between you and a page"
    - the import chain spec and the `IMPORT ·` script pages
    - the logging spine defaults (`Run End` defaulting `vl_Status` to `"ok"`)
    - the `APP_SESSIONS` vs `UTILITY_LOGS` fork (Q2)
    - the two `goto_view_UTILITY_LOGS` twins, and `exit w/ errors`
    - `import_Style_Key` {.gap}, `STYLES`, `THEMES`, `CALENDAR_EMPHASIS`, conditional formatting
    - the rest of the DDR punch list beyond the one index in Stage 1
    - the two colliding Decision Logs

**One exception, already folded in:** the `fkProduction` index, because Stage 1 needs it.

---

## If it stalls

| Symptom | Cause, in order of likelihood |
|---|---|
| Portal shows nothing | calendar predicate — the unstored calc did not resolve (0.1); check the child-side index |
| Every week the same height | one portal missing *also resize enclosing part*, or an object below that does not slide |
| Objects missing from the PDF | the empty-portal defect (3.1). Put a hidden space in the day cell |
| Grid looks right in Browse, wrong on paper | you checked Browse. Sliding is Preview-only, anchoring is Browse-only |
| Day cell keeps its height when empty | a drawn rectangle as the border. Delete it |

---

## The fallback, and it is not a failure

**Running Big Love on the legacy file this fall costs nothing durable.** `ClickUp AUTHORS → FileMaker RENDERS → git ARCHIVES` is locked, and **a renderer is disposable.** The season data lives in ClickUp; legacy handles one production at a time and Big Love is one production. Nothing done in legacy is lost work, because the data was never in FileMaker — MAWster re-imports whenever it is ready. **The choice is which renderer to use this fall, not whether to finish the build.**

!!! note "The cost, stated honestly"
    Swapping globals per show by hand, and any hand-edit inside legacy is uncaptured, because FMP renders and does not author.
