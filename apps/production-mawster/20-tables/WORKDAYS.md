---
id: table-workdays
title: Workdays
type: reference
status: public
order: 10
revised: Aug 2026
summary: One canonical row per real date. Calendar-agnostic.
data:
  catalog:
    file: WORKDAYS.tsv
---

# Workdays

!!! danger "🔴 READ THIS BEFORE YOU READ A FIELD — the grain CHANGED on 2026-08-12"

    **WORKDAYS is CANONICAL-PER-DATE. One row per real calendar date, for the
    whole file. It is CALENDAR-AGNOSTIC and PRODUCTION-AGNOSTIC.**
    Ruled by Michael 2026-08-12 (J19).

    ~~One date inside one calendar's week. The printed cell. WEEKS x 7.~~ was the
    grain until this ruling, and it is the single most misleading sentence a cold
    agent can inherit here, because **every remaining field on this table was
    designed under it.**

    **The consequence, stated once and applied everywhere below: a workday row is
    SHARED. Sept 8 is ONE record that Big Love, the One Acts and a spring show all
    read. So any field expressing what ONE production or ONE calendar thinks about
    a date is ILLEGAL HERE** — set it for one show and you have set it for every
    show that shares the date. That is not a style preference, it is silent
    cross-production data corruption, and it is the test to run against any field
    anyone proposes adding.

## Grain

!!! abstract "Grain"
    **One real date. Canonical. One row per date in the whole file.**
    Not one row per date per calendar, and not one row per date per production.

!!! data "catalog"

- Generated, never typed.
- `Date` is the identity. **Unique + Not empty is a CONSTRAINT, not a convention** — *"one canonical workday per real date"* is unenforceable without it, and duplicate rows for one date split every relationship that reads through it. {.gap}
- Month colour resolves through `MONTHS` on a numeric month key, then through STYLES — **never a 3-letter name.** The legacy file joined on a display abbreviation. See J8.
- ⚠️ Legacy table was `Prodution WORKDAYS` — misspelled, with a space. Do not inherit either.

## 🔴 What the ruling EVICTS from this table

Each of these is a per-calendar or per-production opinion sitting on a shared row. **They are fix-queue items, not open questions.**

| Field | Why it cannot live here | Where it goes |
|---|---|---|
| `Title` / `TitleShort` | *Thanksgiving* is canonical; *First Rehearsal* is ONE production's name for a date. **One field holds both kinds, so the table cannot tell them apart.** | The production-specific half becomes a `Label` on [CALENDAR_EMPHASIS](@rel:table-calendar-emphasis). A genuinely canonical day name belongs to a canonical holiday source, not to the grid cell. |
| `bool_HideFromCalendar` | Hiding is **one calendar's decision about a date.** Left here, one show hides a week for every show sharing it. | A hide row on CALENDAR_EMPHASIS. 🔴 **And it must BLANK THE CELL, never remove the record** — a flowed found set shifts every subsequent day one column left. |
| `Manual_Override` / `ovr_ManualDate` | An override date **on a table whose identity IS the date.** | Nowhere. Delete. |
| `Sort` | ⚠️ **Unresolved under the new grain.** {.tbc} A stamped print order is calendar-relative — two calendars covering the same dates can legitimately want different orders. Either it is per-calendar (so it moves to the projection) or it is a pure date sort (so it is derivable and should not be stored). **Decide before the generator is written.** |
| `fkWeek` | Points at `WEEKS`, which J8 PARKED with no known job. **A relationship to a table with no purpose is not a path to a calendar.** | ⬜ Dead until J8's revive trigger fires: *a report that needs to group BY week.* |

⭐ **The pattern worth carrying out of this ruling: a field named for the only instance that existed.** `Title` works today because one production is loaded. It breaks at production two, exactly like `Contact Sheet HEADER` (J10) and the unnamed default theme (J3). **Third instance of the same tell.**

## Where a production's opinion about a day DOES live

**[CALENDAR_EMPHASIS](@rel:table-calendar-emphasis), keyed to the CALENDAR.** It already carries every part of the need: `AnchorMode = event` matching through [fkStandardEvent](@rel:table-standard-events), a `Label` field whose documented job is *what makes a printed legend possible*, `fkStyle`, `PadBefore`/`PadAfter`, and a priority ladder.

🔴 **The key is `fkCalendar`, NEVER `fkProduction`.** [EVENTS](@rel:table-events)`::fkCalendar` exists precisely because *"a production can have two calendars — stops a spring event printing on a fall grid."* A day label keyed to the production prints on both of them.

### Per-vector resolution (added by J19)

Emphasis resolves ONE winner per day, so *"Tech, Day 1"* would compete with academic greying and one would lose. **Resolve PER VECTOR instead, exactly as `THEMES_x_STYLES` does:** `Label` from the highest-priority row that carries a label, `fkStyle` from the highest-priority row that carries a style, **empty = no claim on that vector.** A greyed Fall Break day can then still read *"Load-in."* Second instance of the mechanism, not a new one.

🚫 **Ordinals are DERIVED, never stored.** *"Tech, Day 1 / 2 / 3"* is position within the matched span, so the label is a template resolved unstored at render. Hand-numbering them means inserting one day makes every later number wrong **with nothing flagging it** — the same class of failure as stamping a resolved colour onto a record (J3).

## Relationships

- [EVENTS|span](@rel:table-events) — a **range** relationship, not an equality. `DATE >= Start_DATE`, `DATE <= End_DATE`, `fkCalendar =`. One stored event row is seen by every day it covers, which is what lets a span stay whole. ⚠️ **`fkCalendar` in that predicate is what keeps a canonical workday from showing every show's events at once** — it was doing the scoping work all along, which is corroboration for this ruling rather than a change forced by it.
- [CALENDAR_EMPHASIS](@rel:table-calendar-emphasis) — RANGE, sorted `Priority` then span. **Resolved live, never a stamped flag** — stamping would mean regenerating every workday record to change one colour.
- `MONTHS` — indexed equality on the numeric month, for colour. See J8.
- ~~fkWeek~~ — see the eviction table.

## 🔴 Live contradiction — NOT resolved by this ruling

[CALENDAR_EMPHASIS](@rel:table-calendar-emphasis) states plainly that **HIDE deliberately did NOT move there** and *"hide stays a stamped flag on WORKDAYS driven by a range pair on the calendar,"* on the reasoning that hide changes which records EXIST in a found set while emphasis only styles records already there — **a genuinely different verb.** The 2026-08-09 11:49 ruling and this page say the opposite.

**Both instructions are live in this doc set right now, and one of them is a fix-queue item about to be run.** {.verify} The verb argument is real and is not answered by the grain ruling: emphasis-as-hide needs a resolver that can subtract a record, not just colour it. **Michael's call, and it must be settled before either is built.** 🚫 Do not implement one and quietly leave the other page contradicting it.

## Calculations

!!! info "This section is the register, and that is deliberate"

    FileMaker has no screen that lists every calculation in a file. `Manage >
    Database > Fields` shows one table at a time and buries the formula behind a
    button. So this page is not a description of the calcs — **it is where they
    are written down**, and the build report collects every one across the whole
    doc set into a single grouped list.

    One `###` per calculation, each carrying an **explicit** `{#calc-name}`
    anchor. That anchor is a contract: any page can reach this one with
    `@calc:table-workdays#calc-<name>`. It is written by hand rather than left to
    the automatic heading slug because an automatic one is derived from the
    heading TEXT and lowercased — so retitling the heading would break every
    inbound link while both ends still looked perfectly fine.

⚠️ **Both calcs below are typed Number in the file and cannot return what they are for.** {.verify} Fix-queue item 6.

### dateFormat_Colloquial {#calc-dateFormat_Colloquial}

Unstored [Text]{.calc}, from `DATE`. The human spelling used on the printed grid.

```
Let ( d = DATE ;
  DayName ( d ) & " " & MonthName ( d ) & " " & Day ( d )
)
```

- Unstored on purpose. It is display only; nothing joins on it and nothing sorts by it.
- ⚠️ Never join on this. The legacy file matched a month colour against a 3-letter abbreviation and broke the first time a display string changed.
- ⭐ Once `MONTHS` exists this can read `MONTHS::NameShort` through the relationship instead of hardcoding month names in a calc (J8).

### dateFormat_Display {#calc-dateFormat_Display}

Unstored [Text]{.calc}, from `DATE`. The short cell spelling.

```
Let ( d = DATE ;
  Right ( "0" & Month ( d ) ; 2 ) & "/" & Right ( "0" & Day ( d ) ; 2 )
)
```

- Same rule: display only.
- The numeric month is what STYLES resolves colour against, never this string.

### calc_MonthNum {#calc-calc_MonthNum}

**STORED** [Number]{.calc}, `Month ( Date )`. {.gap}

Stored because it references only its own record's field, which keeps it indexable — and it must be indexed, because it is the join key into `MONTHS`.
