---
id: table-standard-events
title: STANDARD_EVENTS
type: reference
status: public
order: 10
revised: 2026-08
summary: Canonical cross-season event types. The reporting spine and the skin layer.
---

# STANDARD_EVENTS

!!! abstract "Grain"
    One kind of event that recurs across productions and seasons. Load In, Q2Q,
    Designer Run, Photo Call.

## Nothing breaks if this table is empty

Michael's rule, and it is the important one: **every imported event is handled elegantly whether or not it matches a standard event.** `fkStandardEvent` is nullable on both [[EVENTS](@table-events)] and [[import_EVENTS](@table-import-events)]. An unmatched event still prints.

What a match BUYS:

- **The season-report axis.** Per-production churn counts on `TaskID`; season-wide *"we never move these"* counts on `fkStandardEvent`. ⭐ **The second is impossible to retrofit**, which is why the link goes in from day one.
- **Skinning** beyond the raw ClickUp status token.
- **Anchored emphasis.** An `event`-mode [[CALENDAR_EMPHASIS](@table-calendar-emphasis)] row points HERE, so "highlight Designer Run" resolves through events at render and **moves when the run moves.**
- Workflow notes attached to a canonical definition.

## How an import matches

🚫 **Not by fuzzy name matching** — that mis-buckets silently and nobody notices.

Michael declined a ClickUp-side canonical-type dropdown, so matching is a **CROSSWALK**: raw event name → `fkStandardEvent`, with unmatched rows landing in a queue resolved once by hand. **It learns instead of guessing.**

## Fields

See [STANDARD_EVENTS.tsv](./STANDARD_EVENTS.tsv).
