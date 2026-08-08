---
id: table-venues
title: Venues
type: reference
status: unlisted
order: 10
revised: 2026-08
summary: RETIRED. A venue is a LOCATION whose type is venue.
---

# Venues

🪦 **RETIRED 2026-08-08. There is no VENUES table.**

Michael: *"venues is my elevation of locations — for when we get into assigning events to rooms."*

**A venue is a [[LOCATION](@table-locations)] whose `fkLocationType` is `venue`.** LOCATIONS is not a rename of this table, it is the **level below** it: a venue is the building you produce in, a room is where a call actually happens, and one table holds both.

- `PRODUCTIONS.fkVenue` points at LOCATIONS. **The field name stays** — it says which ROLE the location plays for this production.
- 🚫 Do not recreate this table. Two tables for one concept is the second-claimant problem, and this session killed four instances of it.

This page is a tombstone so the name still resolves rather than breaking a link. `unlisted`: reachable, absent from the nav.
