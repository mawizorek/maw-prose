---
id: table-print-sessions
title: PRINT_SESSIONS
type: reference
status: public
order: 10
revised: Aug 2026
summary: One export. Where editions live.
---

# PRINT_SESSIONS

!!! abstract "Grain"
    One exported calendar. **Edition lives HERE, never on an import.**

- Michael's rule: import sessions are inherently the snapshot; an *edition* is a published artifact plus live awareness of where we are in the process. That is the export side.
- Consequence: **watermark stops being a field you flip** on the calendar and becomes a value on the run. `FIRST` / `REVISED` / `UPDATED` styled via STYLES, domain `watermark`.
- Gives print-to-print diffing two stable endpoints, so "what moved since last print" no longer depends on a ClickUp automation firing.
- Reissue is ROUTINE, not rare — `zOLD/` holds 9 dated versions for Thought Crime, 8 for The Christians. Each reissue is a **staffing milestone**, not a formatting pass.

## Fields

See [PRINT_SESSIONS.tsv](./PRINT_SESSIONS.tsv).
