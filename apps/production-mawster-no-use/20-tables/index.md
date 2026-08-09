---
id: tables
title: Tables
type: index
status: public
order: 20
nav: collapsed
revised: 2026-08
summary: Every table in the app, grouped by what it serves.
---

# Tables

<!--
# ~reserved~
## Internal | External Data Source
### [ HEADER ]
#### TABLE
-->

## Defined in this file

### GLOBALS

[[GLOBAL_USE](@table-global-use)]
- Session state only. Holds `g_fkPrintSet` — staging is a RECORD now, not a global scratchpad.

### Canonical entities

[[PRODUCTIONS](@table-productions)]  
[[LOCATIONS](@table-locations)]  
- 🔴 A VENUE is a LOCATION with `fkLocationType = venue`. **VENUES was killed 2026-08-08** — `fkVenue` points here.
[[LOCATION_TYPES](@table-location-types)]  
[[PRODUCERS](@table-producers)]
- Carries the logo. The table that makes the app portable to a non-URITP show.

[[STYLES](@table-styles)]
- One colour table. Domains: month | event-status | watermark | emphasis.

### For the Production __Calendars__  

[[PRODUCTION_CALENDARS](@table-production-calendars)]
- One calendar per production (usually - exceptions might be the same production in two different time blocks).  
- Joining entity to output.

[[CALENDAR_EMPHASIS](@table-calendar-emphasis)]
- N typed callouts per calendar. `range` mode = typed dates; `event` mode = anchored to a STANDARD_EVENT so it survives a reschedule.
- Priority-resolved. Replaced the fixed highlight/lowlight pairs.
- ⬜ **Michael's note: use this for HIDE as well.** Not done — HIDE is currently a range pair on the calendar because hide is EXISTENCE (stamped, changes the found set) while emphasis is STYLING (resolved live). Folding it in means deciding which verb wins.

[[WEEKS](@table-weeks)]  
- Parent is the CALENDAR, not the production.
[[WORKDAYS](@table-workdays)]
- The printed grid cell. Generated, never typed.

[[STANDARD_EVENTS](@table-standard-events)]{.tbc}  
- For defining custom events. *Nothing* in the app should break if there are no standard events. That is to say that all imported events are handled elegantly regardless of its existence in STANDARD_EVENTS. But STANDARD_EVENTS should automatically be linked during import and might SKIN additionally or help us export specialized reports or create workflow notes from canonical definitions.
- ⭐ Also the anchor for `event`-mode emphasis.


[[EVENTS](@table-events)]
- What gets printed. UPSERT on **TaskID + fkProduction**, never TaskID alone.
[[import_SESSIONS](@table-import-sessions)]
- One pull. The session IS the snapshot.
- see also {#import-events}

### For the __Contact Sheets__

[[ROLES](@table-roles)]
- The role LIBRARY.
[[ASSIGNMENTS](@table-assignments)]
- production x role x NULLABLE person. The credit line. The contact sheet.

## Exporting — the print hub

[[PRINT_PRESETS](@table-print-presets)]
- **HOW** to output. Reusable across productions.
[[PRINT_SETS](@table-print-sets)]
- **WHAT** to output, batched. One reserved SCRATCH set resets from a template set on entry.
[[PRINT_SET_ITEMS](@table-print-set-items)]
- One produced document. **Overrides live here**; empty means inherit from the preset.
[[PRINT_SESSIONS](@table-print-sessions)]
- **WHAT HAPPENED.** One row per PDF. Carries `fkPreset`.

[[EDITIONS](@table-editions)]{.tbc}
- Prelim | For Bid Only | Final. A PRINT is a VERSION of an edition.
[[VERSIONS](@table-versions)]{.tbc}
- Parts of an edition.


## External Data Sources (EDS)

### ClickUp Integration/IMPORT layer

Pipe + open to-dos → [[ClickUp Integration](@integration)]

#### Importing Calendar Events
[[import_EVENTS](@table-import-events)] {#import-events}
- Append-only. IS the revision history.

### Other Filemaker Builds

⬜ **Neither of these has a page yet** — they are other FileMaker files, referenced by name until they do.

- `FISCAL_YEARS`
- `PEOPLE` — its own app (ruled 2026-08-07). A table with two owners has no owner.
