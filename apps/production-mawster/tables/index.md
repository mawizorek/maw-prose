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

[[SETUP](@table-setup)]{.tbc}  

[[PRODUCTIONS](@table-productions)]{.tbc}  
- Normalized vectors for each Production. 
[[VENUES](@venues)]{.tbc}  
[[PRODUCER_INFO](@producer-info)]{.tbc}

### For the Production __Calendars__  

[[PRODUCTION_CALENDARS](@production-calendars)]{.tbc}
- One calendar per produciton (usually). Joining entity to output.

[[WEEKS](@table-weeks)]{.tbc}  

[[STANDARD_EVEMTS]]  
- For defining custom events. *Nothing* in the app should break if there are no standard events. That is to say that all imported events are handled elegantly regardless of it's existance in STANDARD_EVENTS. But STANDARD_EVENTS should automatically be linked during import and might SKIN additionally or help us export specialized reports or create workflow notes from canonical definitions.

#### Importing Calendar Events

[import_EVENTS]
[import_SESSIONS]


## External Data Sources (EDS)

### ClickUp Integration/IMPORT layer

[EVENTS]

!!! tip "The real unlock of the app"
    This 

#### Import Sessions




### Other Filemaker Builds

[[FISCAL_YEARS](@table-fiscal-years)]{.tbc}

[[]]
