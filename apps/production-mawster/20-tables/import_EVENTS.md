---
id: table-import-events
title: import_EVENTS
type: reference
status: public
order: 10
# nav: collapsed
revised: Aug 2026
summary: Raw ClickUp pulls, append-only.
---

# import_EVENTS

!!! abstract "Grain"
    One event, as it appeared in ONE import session. Not one event.
    Re-importing the same task appends a NEW row; it never edits the old one.

## Append-only

Nothing in the app edits or deletes a row here. This table IS the revision
history — order by session and the timeline reads itself. That is why there is
no separate EVENT_TRACKING / revisions table.

## 🔴 Upsert key = TaskID + fkProduction, never TaskID alone

`URITP Productions` in ClickUp is a **labels** (multi-select) field, so one
event task can legitimately carry two shows. Each production's calendar prints
its own copy, so the same TaskID must be able to exist twice — once per show.

**Keying the upsert into EVENTS on TaskID alone means show two silently
overwrites show one.** Compound the key.

Mitigation on the ClickUp side: make the export view **per-production**, so one
import session = one show. A cross-listed event then arrives in both sessions,
which is correct.

## WatchHash

Auto-enter calculation, **"Do not replace existing value" CHECKED**. A plain
calculation field recomputes, which rewrites history the first time the formula
is touched.

```
Let ( ~d = "|" ;
  GetAsText ( Start_TIMESTAMP ) & ~d &
  GetAsText ( End_TIMESTAMP )   & ~d &
  Event_Name
)
```

The delimiter is load-bearing: without it `"12" & "3"` and `"1" & "23"` collide.

**Watched set:** start/end timestamps + event name. **NOT** modification stamps,
style, or row order — otherwise "Q2Q moved 12 times" really means "you
reimported 12 times." Same hash as the prior session for that TaskID = no real
change. Counting distinct hashes = counting real changes.

## Timestamps are STORED, not unstored

An unstored calculation re-evaluates on read, so fixing the parse formula later
silently rewrites every historical row and moves every change count.

## Raw_Payload

The whole original row/JSON, kept verbatim. An unmapped ClickUp field that turns
out to matter in six months is already in the table instead of needing a
re-import that can no longer be reproduced.

## What NOT to port from the old file

The legacy `ProductionCalendar Format` table spent **8 of 23 fields** parsing
text dates (`Start Date IMPORT` / `End Date IMPORT` were TEXT, chewed by
`MiddleWords` / `LeftWords`). That is CSV damage, not schema. The API pull
deletes all of it — including the month-walk date-overflow trap, which lives in
code that should not exist here.

## Fields

See [import_EVENTS.tsv](./import_EVENTS.tsv).
