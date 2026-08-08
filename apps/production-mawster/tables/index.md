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

### SETUP

[[PRODUCTIONS](@table-productions)]{.tbc}  
- Normalized vectors for each Production. 
[[VENUES](@table-venues)]{.tbc}  
[[PRODUCER_INFO](@table-producer-info)]{.tbc}

### For the Production __Calendars__  

[[PRODUCTION_CALENDARS](@table-production-calendars)]{.tbc}
- One calendar per production (usually - exceptions might be the same production in two different time blocks).  
- Joining entity to output.

[[WEEKS](@table-weeks)]{.tbc}  

[[STANDARD_EVENTS](@table-standard-events)]{.tbc}  
- For defining custom events. *Nothing* in the app should break if there are no standard events. That is to say that all imported events are handled elegantly regardless of its existence in STANDARD_EVENTS. But STANDARD_EVENTS should automatically be linked during import and might SKIN additionally or help us export specialized reports or create workflow notes from canonical definitions.


[[EVENTS](@table-events)]{.tbc}
[[import_SESSIONS](@table-import-sessions)]{.tbc}
- see also {#import-events}


## External Data Sources (EDS)

### ClickUp Integration/IMPORT layer

#### Importing Calendar Events
[[import_EVENTS](@table-import-events)]{.tbc} {#import-events}

### Other Filemaker Builds

[[FISCAL_YEARS](@table-fiscal-years)]{.tbc}
