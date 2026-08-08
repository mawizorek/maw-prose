---
id: table-print-presets
title: PRINT_PRESETS
type: reference
status: public
order: 10
revised: Aug 2026
summary: Saved export settings. The template, not the event.
---

# PRINT_PRESETS

!!! abstract "Grain"
    One named, reusable export configuration.

**The split that answers "how do I implement saved export settings":**

| Table | Is | Lifetime |
|---|---|---|
| `PRINT_PRESETS` | the TEMPLATE — what to output and how | reused forever |
| `PRINT_SESSIONS` | the EVENT — one actual export that happened | one row per print |

A session carries `fkPreset`. Same rule as everywhere else: **split by lifetime, not by topic.** The legacy file put these on `SETUP_EXPORT` as globals, which is why every reissue meant retyping the same settings.

## Scope

- **Presets are reusable across productions, not owned by one.** `fkCalendar` is NULLABLE: null = a house preset ("11x17 full company"), set = a one-off saved for this calendar only.
- This is what makes "department filtering" (the legacy next-step: *"only light lab tasks"*) a preset rather than a code change. A subset calendar is a saved filter, not a new layout.
- Legacy parity: the two `PRINT_SET...Rlandscape` scripts and `exportORprint` are what this table replaces as DATA.
- ⬜ Filtering by department needs a department field on EVENTS that does not exist yet. Corey's `Production Note` labels field is the candidate, unresolved (see [integration.md](@integration)).

## Fields

See [PRINT_PRESETS.tsv](./PRINT_PRESETS.tsv).
