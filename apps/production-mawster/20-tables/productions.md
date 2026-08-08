---
id: table-productions
title: Productions
type: reference
status: public
order: 10
revised: Aug 2026
summary: Productions records.
---

# Productions

!!! abstract "Grain"
    One opening night - is what we'll say for now. Productions *may* share the same NAME and will generally serve the same then (maybe the'ats what we build?)
<!---
but when does a show stop being a show? what part of a devising process would it take to make a second grain?  
does TOME need a seperate input
does OA need a diferent style input?
a musical
something off-campus
studnet theatrre?
Ogunquit Playhouse
Broadway?
stidnet theatre?

## 🔴 TWO DATES, EVER

`DateFirstRehearsal` + `DateOpening`. Both are **contractual facts about the show** — negotiated with a director, true whether or not anyone ever prints a calendar. Both are typed by hand and can never be derived.

**The hard line:** a third production-level date is an **EVENT**, not a field. Designer deadline, build start, photo call — those move, repeat, or are one of many. Events already have a table, an import pipe, and a canonical type layer.

> A date that can move, repeat, or be one of many is an EVENT.
> A date that is a defining property of the entity is a field.

## What is NOT here

- 🔴 **`DateNeededFirst` / `DateNeededLast` moved to PRODUCTION_CALENDARS.** They are **page dimensions wearing dates** — nothing happens on "last date needed," it sizes the grid (legacy fed it straight into `CalendarDaysNeeded`). Proof: the same show in two time blocks needs different page bounds and the SAME first rehearsal.
- **Director** is an ASSIGNMENTS row, not a field. So are course codes.
- 🚫 **No convenience copy of anything.** A calendar reads first rehearsal **through `fkProduction`** — that is what the relationship is for. A lookup that copies the value goes stale silently the first time a director moves the start date.

## The placement rule (generalizes to every field)

**A date belongs to the table whose GRAIN it is one-per-of.** One first rehearsal per production. One needed-first/last per calendar. Settles the next forty fields without another conversation.

⚠️ The legacy file could not make this distinction: it had no PRODUCTIONS table, every date was a global on a one-record singleton, so "which entity owns this" was unanswerable. The duplication was inherited confusion, not a design choice.

## Fields
--->

See [PRODUCTIONS.tsv](./PRODUCTIONS.tsv).

<!--- Full relationship context → a relationships/ folder that does not exist yet.
      Link removed 2026-08-08: it was the build's only broken FILE link. The
      CHILDREN section of the .tsv carries the same information for now. --->
