---
id: table-print-set-items
title: PRINT_SET_ITEMS
type: reference
status: public
order: 10
revised: Aug 2026
summary: One output in a print set. Where overrides live.
---

# PRINT_SET_ITEMS

!!! abstract "Grain"
    ONE produced document. doc type x preset x edition, plus this run's overrides.

## Overrides live here, and empty means INHERIT

**The resolution rule, and it is the whole contract:**

```
If ( IsEmpty ( item::override_x ) ; preset::x ; item::override_x )
```

🔴 **Do NOT copy every preset field down onto the line.** If every field is always populated you can never tell an OVERRIDE from an INHERITANCE, the preset stops mattering, and you have built a shadow PRINT_PRESETS that drifts. **Only fields a human actually flips at print time get an override column.**

Three categories, and the third is why staging needs a home at all:

| Category | Example | Where |
|---|---|---|
| preset-only, never overridden | `ExportFolder`, `IsDefault` | PRINT_PRESETS only |
| genuinely overridable per run | output size, week start, legend | **override column here** |
| session-only, no preset to inherit from | edition, note | **here only** |

## 🔒 The PII fields are not conveniences

Once contacts land, `bool_IncludeContactInfo` and `bool_Anonymize` decide whether a PDF full of student phone numbers leaves the building. **They snapshot onto PRINT_SESSIONS** so there is a record of what was actually on the page you handed out.

## `DocumentType` is what keeps the override list small

A calendar has no `ShowVacancies`; a contact sheet has no `WeekStartDay`. The preset carries the type-specific defaults, so the override set exposed here is whatever the CURRENT document type actually uses. **Without `DocumentType` this table drifts into one flat list of every option for every document — which is legacy `SETUP` rebuilt one table over.**

## Fields

See [PRINT_SET_ITEMS.tsv](./PRINT_SET_ITEMS.tsv).
