---
id: workflow
title: Build & Use Workflow
type: reference
status: public
order: 15
revised: 2026-08
summary: Manual first, import skins on top.
---

# Workflow

ClickUp is the editing surface. It holds canonical Task IDs for each canonical item. Whatever you can get away with in ClickUp with a single task ID is what we can expect to be able to import with. The path from "plan" to "page" is:

- Tasks are devised in CU and stored as EVENTS (typically TaskType::Event, but not a requirement).
    - These are necessarily *homed* in a list in CU, but may be added to other list 


- Those created Event TASKS are either repitions of known 'standard' events, or are on-one requirements. This distinction is far more important to plans for the fmp build, than with CU use. 

## Related ClickUp Lists

**Production Events (canonical)**  
for the distinct, repeating event types: First Rehearsal, DR, LX Focus. Finding this grain can be challenging.  

### URITP Production Folders

Each working **Production** gets a ClickUp *view* which serves as the export surface of that Productions [Events]{.gap} or [fkCalendar Events]{.gap}?  

Think of these views as that Production's individual Production Google Calendar - that these are passive chunks of that larger calendar, but some events may overlap - notable breaks that exist at the beginning and ends of processes.  
More and more productions are overlapping now, so it would be prudent to be able to print a productions calendar, and it be aware of events associated with that production vs associated with other producitons - or UR Events.

Calendar Color should no longer include: UR Events > that is essentially it's own "Production" as viewed from the mainstage schedule's awareness. 

!!! note "If the same *event* needs to appear on multiple calendars."
    The actual EVENT exists *once* in CU, and has a unique ClickUp ID. This Event, however, could be shared into multiple ClickUp view Calendars.



## User defines "Documents"

Variables that define a calendar:

- Document Name: "Production Calendar" "Contact Sheet" "Info Sheet" "Crew Call Sheet" "Rehearsal Calendar"
- Base Production
- fkStandardData (many to many)
    - match to StandardEvents: to include with this docs
    - match to StandardRoles: to inluce with this doc
- ReferenceType:
    - Inclusive (automatically includes *all* events and contacts machting fk'Base'Production)
    - Deterministic (only items )
- Calendar Display Name becomes: &lt;Base Production&gt;&lt;Calendar Name&gt;

To be able to accomplish something like combining Contacts and Events in to a shared 
view like an "Info Sheet" demands, a join is needed that connects both of those 
distinct types. That join may look like: 

- Data Name (the left column that is static: Event Name or Role Name)
- Data Value (the right column that reflects the current value: Date & Times, assigned person)




## Document Exporting

=== "Calendars"

    - Choose at print:
        - fkProduction (brings in *all* events associated with that Production)
        - fkCalendar (to bring in )
    - Printable as:  
        [Agenda View]{.layout}
            TO: WORKDAYS_x_EVENTS
            Unfilter Displays: *all* Production events on any single day.  
            Filter: only one fkCalendar
            Callout: non-this-fkProduction
        [Month Grid]{.layout}  
    - 
    
    *per fkCalendar*
    - a fkCalendar 

### Contact Sheets
    - 

=== "Combined (Info Sheets)"

    - printable as a [List]{.layout}

    | Data | Value |
    |---|---|
    | Title | fkProduction::Title |
    | Course | fkProducion::fkCourse::Number |
    | Semester (Season) | fkSeason::Name |
    | Director | fkProduction::fkRoleAssignment::Person::Name |
    | Designers | fkProduction::fkRoleAssignment::Person::Name |
    | First Rehearsal | fkStandardEvents::fkProduction::fkEvent::[Display_single_data]{.gap} |

    ??? note "Fields on Info Sheet"
        fkProduction (Base Production) :: Title, Course, Semester/Year, Opening Night
            :: fkRole :: Director, Designers, Staff, Crew
            :: fkEvents :: First Rehearsal, Designer Run, Tech Start, Dress Rehearsals, Opening Night, Closing Night, Strike























<!--
## 🔴 Manual input comes FIRST, and it has to

**First rehearsal cannot be derived from imported events.** The dependency runs one way:

```
date_FirstRehearsal  →  calendar start  →  WEEKS  →  WORKDAYS  →  events land on days
```

Derive the date from events and you have a circle: events need workdays to land on, workdays need weeks, weeks need a start, the start needs the date. So it is typed, and it is typed before any import runs.

## Order of operations

| # | Step | Where | Typed or generated |
|---|---|---|---|
| 1 | Create the production. Type `date_FirstRehearsal` + `date_Opening`. Set `cuProductionToken`. | [[PRODUCTIONS](@table-productions)] | typed |
| 2 | Create the calendar. Type the page bounds, set `bool_AddPreProWeek`. | [[PRODUCTION_CALENDARS](@table-production-calendars)] | typed |
| 3 | Generate the grid. | [[WEEKS](@table-weeks)] → [[WORKDAYS](@table-workdays)] | generated, never typed |
| 4 | Add callouts. Tech week, breaks, residencies. | [[CALENDAR_EMPHASIS](@table-calendar-emphasis)] | typed |
| 5 | **Import.** Events land on days that already exist. | [[import_SESSIONS](@table-import-sessions)] → [[import_EVENTS](@table-import-events)] → [[EVENTS](@table-events)] | imported |
| 6 | Print. | [[PRINT_PRESETS](@table-print-presets)] → [[PRINT_SESSIONS](@table-print-sessions)] | generated |

Steps 1–4 are a working app with zero imports. That is deliberate: a calendar with a grid and no events is still printable, and it is how you find a wrong start date before 121 event records are sitting on it.

⚠️ **The grid is rebuilt per print, not built once.** `WeekStartDay` lives on the preset, so a Tue-start and a Sun-start render different week rows from the same calendar. See [[Projection Law](@projection-law)].

## Import SKINS, it never AUTHORS

The import layer may **only**:

- create/update [[EVENTS](@table-events)] (upsert on `TaskID` + `fkProduction`)
- resolve `fkStyle` from the raw ClickUp status token
- resolve `fkStandardEvent` via the crosswalk
- rebuild [[EVENTS_workday](@table-events-workday)]{.tbc} as the last step

It may **never** write first rehearsal, opening, page bounds, or emphasis rows. Those are human decisions.

### The one thing it does check

⭐ **If the earliest event of canonical type "First Rehearsal" does not match the typed `date_FirstRehearsal`, FLAG it. Never correct it.**

Same guard shape as the production token: the import surfaces a disagreement instead of silently resolving one. This is what stops a date typed in June from quietly contradicting a schedule that moved in August — the failure mode being defended against is a printed page that is a week off with no symptom.

### Anchored emphasis needs events

`event`-mode [[CALENDAR_EMPHASIS](@table-calendar-emphasis)] rows resolve through events, so they render as nothing until the first import lands. `MatchCount = 0` is the tell. That is correct behaviour, not a bug — and it is why `range` mode exists for anything that must print pre-import.
-->
