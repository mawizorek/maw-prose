---
id: table-location-types
title: Location Types
type: reference
status: public
order: 10
revised: Aug 2026
summary: Venue, rehearsal room, shop, storage, off-campus.
---

# Location Types

!!! abstract "Grain"
    One kind of place.

## ⚠️ This is currently a value list wearing a table

As shipped it holds `Name` + the five audit fields and nothing else. **Your own rule** (`data-standards.md`): *metadata beyond display value → table; otherwise value list.*

By that test this should be a value list today. **Keep it as a table only if it earns metadata**, and there are real candidates:

- `SortOrder` — so a picker groups by kind instead of alphabetically
- `IsBookable` / `RequiresReservation` — a venue needs scheduling, a storage closet does not
- `DefaultCapacity`
- `IsOnCampus`

If none of those ever arrive, this is six fields doing a value list's job. **Not a reason to delete it now** — it is a reason to add the one field that justifies it, which is `SortOrder`.

## Fields

See [LOCATION_TYPES.tsv](./LOCATION_TYPES.tsv).
