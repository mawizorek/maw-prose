---
id: table-assignments
title: Assignments
type: reference
status: public
order: 10
revised: Aug 2026
summary: Someone-or-nobody doing a role on a show.
---

# Assignments

!!! abstract "Grain"
    One playbill credit line: production x role x (maybe) person.
    ROLES is the library; this is the instance.

- **`fkPerson` is NULLABLE and that is the whole trick.** The assignment exists before anyone is cast.
- Unfilled roles PRINT with the name blank. Big Love prints 7 empty ASM slots on purpose — a blank line is a visible vacancy.
- Non-person rows are legal: `Production email`, `SM email`. A distribution channel is an entity here.
- Section + sort default from ROLES, overridable per assignment.
- `Calls` / `Reports` answer ONE question: *under what condition does this person receive calls and reports?* Four values — always · never · from tech · fittings.
- Course codes ride the role title as a prefix (`ENGL126 Run Crew / LX`). The course-production seam is already printed.
- ⚠️ ClickUp's Contact Sheet list already IS this table, wearing tasks. This mirrors it, does not redesign it.

## Fields

See [ASSIGNMENTS.tsv](./ASSIGNMENTS.tsv).
