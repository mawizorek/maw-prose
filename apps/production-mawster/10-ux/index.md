---
id: ux
title: UX
type: index
status: public
order: 10
revised: Aug 2026
summary: Treat this like the most consice "Quick User Guide" for how we expect to interact with the app.
---

# User Experience

## App __Open__ and __Setup__ Windows

??? tip "Determine Device on Entry"
    - Desktop
    - iPad Pro 13" (fit for iPad mini as well...?)
    - iPhone

1. Enter to [App Home Window](app-home)  

[View/Print Calendars]{.button}  
[View/print Contacts]{.button}

[App Layout]{.portal}

## At __Print__ Time

1. Navigate to EDITION.
2. [Print Current Version]{.button} or [Create New Version]{.button}

???+ warning "Automated Script: create_current_EVENTS_WORKDAYS"
    This automatically generates a fresh set of EVENTS_WORKDAYS. The old set is retained, but superseeded with the new version.

!!! quote "Print Menu [a *form* layout TO: PRINT_SETS]{.hi}"
    - Print a [Saved SET]{.button} — from [PRINT_SETS](@table-print-sets)
    - Manual print from 
    
    or from []
        - Fill from default | Start from default, then edit and print. May save as new PRINT_PRESET


3. Step 3

<!---
need a globla "CIURRNET PRINT SETTINGS field global holdng place"
better idea; *always* create a new "PRINT_PRESET" upon entry and use sceripts to keep your the clear?

MARKER NOTES (Dexter, 2026-08-09) --

1. A MARKER SPAN CANNOT HOLD A LINK. This line used to read
   [Saved [SET](@table-print-sets)]{.button}, which does not fail loudly -- the
   pattern's text group forbids a `]`, so it matched the BARE form and rendered a
   chip saying "Button" with the link left beside it as literal text. Split into a
   chip plus a reference, which is what it was reaching for.

2. @table-print-sets DOES NOT RESOLVE and now renders struck through. There is no
   PRINT_SETS page in 20-tables; the nearest thing is EXPORT_SETS. Left broken on
   purpose rather than repointed on a guess -- which table this means is a real
   question, not a typo.

3. Every .button and the .portal on this page were rendering as PLAIN TEXT until
   2026-08-09, because neither was a row in theme/markers.tsv. They now render.
   Nothing on this page had to change for that.
-- >
