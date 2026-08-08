---
id: table-events
title: Events
type: reference
status: public
order: 10
revised: Aug 2026
summary: The current, printable event set.
---

# Events

!!! abstract "Grain"
    One event per production. Always the latest known state.

- Built by UPSERT from the newest import session. Never deleted and re-created — that would destroy the history in import_EVENTS and make snapshots impossible to retro-add.
- 🔴 **Upsert key = `TaskID` + `fkProduction`.** A CU event task can carry two shows; each calendar prints its own copy. TaskID alone means show two overwrites show one.
- `fkStandardEvent` is the reporting spine: per-production churn counts on TaskID, season-wide "we never move these" counts on the standard event.
- Lands on a WORKDAY by DATE, stamped at import. Not walked live.
- Unscheduled (no date) events collect at the top of week one, legacy parity.

## Fields

See [EVENTS.tsv](./EVENTS.tsv).
