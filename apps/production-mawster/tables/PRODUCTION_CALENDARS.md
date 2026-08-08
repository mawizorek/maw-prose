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

- **Entity vs output.** PRODUCTIONS is the entity, so nothing about how a page looks goes there. All print config lives here.
- Reprinting a show with different highlight ranges = a **second record**, not retyped globals. The legacy file kept these as `SETUP_EXPORT` globals, which means retyping them every reissue.
- WEEKS hangs off THIS table, not PRODUCTIONS. Week 1 is only meaningful relative to a calendar's start.
- ⚠️ `DateFirstRehearsal` / `DateNeededLast` are canonical HERE. The same dates currently also sit in PRODUCTIONS.tsv — **delete them there.**
- ⚠️ `StartOnMonday` is a real boolean. Legacy `startOnMon` was TEXT compared against `= 1`, so typing "Yes" silently flipped the week.
- Watermark is NOT a field here. It moved to PRINT_SESSIONS.

## Fields

See [PRODUCTION_CALENDARS.tsv](./PRODUCTION_CALENDARS.tsv).
