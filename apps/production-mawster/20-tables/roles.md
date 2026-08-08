---
id: table-roles
title: Roles
type: reference
status: public
order: 10
# nav: collapsed
revised: Aug 2026
summary: Roles in production.
data:
  catalog:
    file: ROLES.tsv
    caption: ROLES field menu
---

# Production Roles

??? abstract "Grain"
    One role that CAN exist on a show. Lighting Designer, ASM, Run Crew / LX.
    *not* PEOPLE, and *not* the credit line either.

- **The library, not the instance.** A role as a concept has no person on it and no show on it.
- 🔴 `fkPerson` moved to [ASSIGNMENTS](@table-assignments). Keeping it here made ROLES two entities in one table — the grain note said "one playbill credit line" while the row said "one role."
- A credit line = production x role x nullable person. That is ASSIGNMENTS.
- Section + seniority sort live here as DEFAULTS, overridable per assignment.

## Fields

!!! data "catalog"
