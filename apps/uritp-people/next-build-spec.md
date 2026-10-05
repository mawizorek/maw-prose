---
id: uritp-people-next-build
title: URITP People build sheet
type: page
status: unlisted
revised: 2026-10
summary: What gets built in URITP People this cycle, in order. Overwritten each build cycle.
---

# URITP People build sheet

## This cycle: from scratch, 2026-10-05

1. A new, empty `URITP People.fmp12`. Nothing is carried from the July file; the first pull fills it.
2. [PEOPLE](@uritp-people-table-people) and [CONTACT_INFORMATION](@uritp-people-table-contact-information), field for field as their registers.
3. The two [relationships](@uritp-people-relationships).
4. One ClickUp import view per source list: PEOPLE, EMAILS, PHONE NUMBERS.
5. The pull: one button, three passes, PEOPLE first. Each pass matches on `cu_TaskID`, creates what is new, overwrites what exists, blanks included.
6. A first full pull, then a count of each table against its ClickUp list.

## Next cycle

The first report. It decides which further PEOPLE fields get pulled, and which spoke tables People has to serve.

## Belongs to other files

Production roles, assignments, contact-sheet rows and printed credits; employment; enrollments; seasons and departments.
