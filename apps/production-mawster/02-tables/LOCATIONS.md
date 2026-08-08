---
id: table-locations
title: Locations
type: reference
status: public
order: 10
revised: Aug 2026
summary: Places. Rooms, theatres, shops, off-campus.
---

# Locations

!!! abstract "Grain"
    One physical place we can point at. Todd Theatre, the scene shop, Rehearsal 2.

## 🔴 Is a VENUE a LOCATION?

`PRODUCTIONS.fkVenue` points at a **VENUES** table that is also in the index. **A venue is a location whose `fkLocationType` = venue.** Two tables for one concept is the second-claimant problem, and it is the third time it has come up today.

**Recommendation: kill VENUES, point `fkVenue` at LOCATIONS.** Keep the field name `fkVenue` — it says WHICH ROLE the location plays for this production, which is real information the join needs.

## The bigger use nobody has claimed yet

⬜ **EVENTS have locations.** A rehearsal happens in a room; a load-in happens on a stage. The legacy calendar had NO location on an event at all, which is why the printed grid can't answer "where is this call."

- That is a genuine feature the old app never had, and it is one field: `EVENTS.fkLocation`.
- ⚠️ **ClickUp probably does not emit it.** Verify against a live export before promising it — if the task carries no location, this stays a manual field and cannot be part of the import.
- Crew calls need `report location` (Milo's open question). If crew calls ever land, they resolve here.

## Fields

See [LOCATIONS.tsv](./LOCATIONS.tsv).
