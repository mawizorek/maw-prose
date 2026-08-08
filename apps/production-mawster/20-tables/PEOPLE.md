---
id: table-people
title: PEOPLE
type: reference
status: unlisted
order: 10
revised: 2026-08
summary: EXTERNAL. Its own app, ruled 2026-08-07 - a table with two owners has no owner.
---

# PEOPLE

**EXTERNAL DATA SOURCE — and that is a RULING, not a convenience.**

🔒 **Ruled 2026-08-07: PEOPLE stays its own app.** The durable reason is stronger than the one first offered (that it cross-sections with Courses): **a table with two owners has no owner.**

The rule it comes from: **an ENTITY is a table, an OUTPUT is a layout over a found set.** A person is an entity. A contact sheet is an output. This app renders, so it consumes people and never authors them.

- [[ASSIGNMENTS](@table-assignments)]`.fkPerson` points here and is **NULLABLE** — the assignment exists before anyone is cast, and a blank line on a printed contact sheet is a visible vacancy that prints on purpose.
- 🔒 **PII:** this is the join that makes a PDF full of student phone numbers possible. `bool_IncludeContactInfo` and `bool_Anonymize` on [[PRINT_SET_ITEMS](@table-print-set-items)] decide what leaves the building, and they snapshot onto the print receipt so there is a record of what was handed out.

`unlisted`: reachable by link, absent from the nav.
