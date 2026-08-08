---
id: tables
title: Tables
type: index
status: public
order: 0
nav: collapsed
revised: Aug 2026
summary: Tables index.
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

[[GLOBAL_USE](@table-global-use)]{.tbc}
- Singleton. Session state ONLY (current production / semester / calendar).
- 🚫 SETUP is killed — production config became records, print config went to the calendar, `Get(FilePath)` needs no storage.

### Canonical entities

[[PRODUCTIONS](@table-productions)]{.tbc}  
- Normalized vectors for each Production. 
[[VENUES](@table-venues)]{.tbc}  
[[PRODUCER_INFO](@table-producer-info)]{.tbc}

[[ROLES](@table-roles)]{.tbc}
- The role LIBRARY. No person, no show.
[[ASSIGNMENTS](@table-assignments)]{.tbc}
- production x role x NULLABLE person. The credit line. The contact sheet.

[[STYLES](@table-styles)]{.tbc}
- One colour table. Domains: month | event-status | watermark.

### For the Production __Calendars__  

[[PRODUCTION_CALENDARS](@table-production-calendars)]{.tbc}
- One calendar per production (usually - exceptions might be the same production in two different time blocks).  
- Joining entity to output.

[[WEEKS](@table-weeks)]{.tbc}  
- Parent is the CALENDAR, not the production.
[[WORKDAYS](@table-workdays)]{.tbc}
- The printed grid cell. Generated, never typed.

[[STANDARD_EVENTS](@table-standard-events)]{.tbc}  
- For defining custom events. *Nothing* in the app should break if there are no standard events. That is to say that all imported events are handled elegantly regardless of its existence in STANDARD_EVENTS. But STANDARD_EVENTS should automatically be linked during import and might SKIN additionally or help us export specialized reports or create workflow notes from canonical definitions.


[[EVENTS](@table-events)]{.tbc}
- What gets printed. UPSERT on **TaskID + fkProduction**, never TaskID alone.
[[import_SESSIONS](@table-import-sessions)]{.tbc}
- One pull. The session IS the snapshot.
- see also {#import-events}

### Exporting

[[PRINT_SESSIONS](@table-print-sessions)]{.tbc}
- One export. **Edition lives here**, never on an import.


## External Data Sources (EDS)

### ClickUp Integration/IMPORT layer

Pipe + open to-dos → [integration.md](@integration)

#### Importing Calendar Events
[[import_EVENTS](@table-import-events)]{.tbc} {#import-events}
- Append-only. IS the revision history.

### Other Filemaker Builds

[[FISCAL_YEARS](@table-fiscal-years)]{.tbc}
[[PEOPLE](@table-people)]{.tbc}
- Its own app (ruled 2026-08-07). A table with two owners has no owner.
