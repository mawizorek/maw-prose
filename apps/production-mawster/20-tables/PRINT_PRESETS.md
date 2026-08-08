---
id: table-print-presets
title: PRINT_PRESETS
type: reference
status: public
order: 10
revised: Aug 2026
summary: Saved export settings. The HOW, reusable forever.
---

# PRINT_PRESETS

!!! abstract "Grain"
    One named, reusable export configuration. **The HOW.**

## Where it sits in the print hub

| Table | Is | Lifetime |
|---|---|---|
| `PRINT_PRESETS` | **HOW** to output | reused forever |
| [[PRINT_SETS](@table-print-sets)] | **WHAT** to output, batched | reused; one is scratch |
| [[PRINT_SET_ITEMS](@table-print-set-items)] | one output + its overrides | per line |
| [[PRINT_SESSIONS](@table-print-sessions)] | **WHAT HAPPENED** | one per produced PDF |

🔴 **A preset is NOT created per print.** That was considered and refused 2026-08-08: minting one on entry would produce hundreds of near-identical rows and destroy the only thing that makes it a preset — being reusable across shows. The per-entry record is a **scratch PRINT_SET** instead.

## `DocumentType` (added 2026-08-08)

A preset is scoped to a KIND of document. A calendar preset has no `ShowVacancies`; a contact-sheet preset has no `WeekStartDay`. **Without this field, one flat option list serves every document and the table becomes legacy `SETUP` again.**

## Scope

- **Presets are reusable across productions.** `fkCalendar` is NULLABLE: null = a house preset ("11x17 Full Company"), set = a one-off saved for this calendar.
- This is what makes department filtering (the legacy next-step: *"only light lab tasks"*) a preset row rather than a code change.
- Legacy parity: the two `PRINT_SET...Rlandscape` scripts and `exportORprint` are what this table replaces as DATA.
- ⬜ Department filtering needs a department field on EVENTS that does not exist yet — Corey's `Production Note` labels field is the candidate, unresolved (see [[ClickUp Integration](@integration)]).

## Fields

See [PRINT_PRESETS.tsv](./PRINT_PRESETS.tsv).
