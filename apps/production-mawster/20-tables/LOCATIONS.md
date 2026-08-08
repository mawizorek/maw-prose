---
id: table-locations
title: Locations
type: reference
status: public
order: 10
revised: Aug 2026
summary: Places. Venues, rooms, shops, off-campus.
---

# Locations

!!! abstract "Grain"
    One physical place we can point at. Todd Theatre, the scene shop, Rehearsal 2.

## 🔒 RULED 2026-08-08 — VENUES is dead, it lives here

Michael: *"venues is my elevation of locations — for when we get into assigning events to rooms."*

⭐ **LOCATIONS is not a rename of VENUES, it is the LEVEL BELOW it.** A venue is the building you produce in; a room is where a call actually happens. One table holds both, distinguished by `fkLocationType`.

- `PRODUCTIONS.fkVenue` → LOCATIONS. **The field name stays** — it states which ROLE the location plays for this production, which is real information the join needs.
- 🚫 Do not create a separate VENUES table. Two tables for one concept is the second-claimant problem; this session killed four instances of that shape.

## Why the table exists at all: events in rooms

⬜ **`EVENTS.fkLocation` is the stated destination**, not a nice-to-have. "Assigning events to rooms" is Michael's own reason for elevating this.

- The legacy calendar had **no location on an event**, which is why the printed grid cannot answer *"where is this call."*
- ⚠️ **Unverified: whether ClickUp emits a location on an event task.** If it does not, this is a manual field and cannot be part of the import. Check a live export before promising it.
- Crew calls need a `report location` (Milo's open question). If crew calls ever land, they resolve here.
- Room assignment implies **conflict detection** eventually — two events, one room, one time. Not v1, but it is the reason a room is an entity rather than a text field.

## Fields

See [LOCATIONS.tsv](./LOCATIONS.tsv).
