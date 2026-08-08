---
id: table-production-calendars
title: PRODUCTION_CALENDARS
type: reference
status: public
order: 10
revised: Aug 2026
summary: Joining entity to output.
---

# PRODUCTION_CALENDARS

!!! abstract "Grain"
    One calendar per production per semester. Exceptions: the same production
    in two different time blocks.

- **Entity vs output.** PRODUCTIONS is the entity, so nothing about how a page looks goes there.
- Reprinting a show with different callouts = new [CALENDAR_EMPHASIS](@table-calendar-emphasis) rows, or a different [PRINT_PRESET](@table-print-presets). Not a second calendar.
- WEEKS hangs off THIS table, not PRODUCTIONS. Week 1 is only meaningful relative to a calendar's start.
- ⚠️ `DateFirstRehearsal` / `DateNeededLast` are canonical HERE. The same dates currently also sit in PRODUCTIONS.tsv — **delete them there.**
- ⚠️ `StartOnMonday` is a real boolean. Legacy `startOnMon` was TEXT compared against `= 1`, so typing "Yes" silently flipped the week.

## What is NOT here

- 🔴 **Highlight / lowlight ranges MOVED to [CALENDAR_EMPHASIS](@table-calendar-emphasis)** (N typed rows, priority-resolved). Six fixed fields could not answer "what if there are multiple ranges, called out different ways."
- **HIDE stayed.** Hide is existence, not styling: it changes which records are in the found set, so it stamps `HideFromCalendar` on WORKDAYS at generation. Emphasis resolves live. Different verb, different mechanism, on purpose.
- **Watermark** moved to PRINT_SESSIONS — it belongs to a print run, not a calendar.
- **Export settings** moved to PRINT_PRESETS.

## Fields

See [PRODUCTION_CALENDARS.tsv](./PRODUCTION_CALENDARS.tsv).
