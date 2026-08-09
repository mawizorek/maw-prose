---
id: table-productions
title: Productions
type: reference
status: public
order: 10
# nav: collapsed
revised: 2026-08
summary: One production. Two dates, ever — everything else about a show is a join.
data:
  catalog:
    file: PRODUCTIONS.tsv
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
--->

## 🔴 TWO DATES, EVER

`date_FirstRehearsal` + `date_Opening`. Both are **contractual facts about the show** — negotiated with a director, true whether or not anyone ever prints a calendar. Both are typed by hand and can never be derived.

**The hard line:** a third production-level date is an **EVENT**, not a field. Designer deadline, build start, photo call — those move, repeat, or are one of many. Events already have a table, an import pipe, and a canonical type layer.

> A date that can move, repeat, or be one of many is an EVENT.
> A date that is a defining property of the entity is a field.

## What is NOT here

- 🔴 **The page bounds live on [[PRODUCTION_CALENDARS](@table-production-calendars)]** — "needed first/last" are **page dimensions wearing dates** (nothing happens on "last date needed"; legacy fed it straight into `CalendarDaysNeeded`). Proof: the same show in two time blocks needs different page bounds and the SAME first rehearsal.
- **Director** is an [[ASSIGNMENTS](@table-assignments)] row, not a field. So are course codes.
- 🚫 **No convenience copy of anything.** A calendar reads first rehearsal **through `fkProduction`** — that is what the relationship is for. A lookup that copies the value goes stale silently the first time a director moves the start date.

## The placement rule (generalizes to every field)

**A date belongs to the table whose GRAIN it is one-per-of.** One first rehearsal per production. One needed-first/last per calendar. Settles the next forty fields without another conversation.

⚠️ The legacy file could not make this distinction: it had no PRODUCTIONS table, every date was a global on a one-record singleton, so "which entity owns this" was unanswerable. The duplication was inherited confusion, not a design choice.

## Fields

!!! data "catalog"
