---
id: workflow-import-events
title: Importing Events, workflow
type: page
status: public
order: 20
revised: 2026-08
summary: Importing *events* process.
data:
  catalog:
    file: events.tsv
---

# Importing Events

!!! data "catalog"

Land in [IMPORT_EVENTS](@table-import-events) table.

!!! note " about 'import_raw_payload'"
    Assumed to be used for API pulls and holding record packages for parsing into import fields. Not relevant for CSV import.

## Assume the data will be messy.

__import_Name__

- contains production name in brackets []. [Gets stripped]{.}

## Fields that get link via initial import scriptings.

__Event Name__  :: cleaned from "import_Name"

!!! tip "script: parse event import name"
    - [Remove]{.gap} "[]" production acronynms.  
    - [Remove]{.gap} "<>" internal notes.
    - **Leave** "?" indicators in the name.
    - **Leave** "1st" or "&" or anything like that.


!!! note "script: globals, generics set at run time"
    - __fkImportSession__  
    - __fkProduction__:: provided as a import script parameter. Set via g_pkCurrentProduction or an import script menu selection.  
    - __import_Row_Number__ :: set via import order.  

__bool_AllDayEvent__  
Marked &lt;true&gt; during import for all day events. Mosty commonly used when Due Date is recieved with no time or Start Date.

!!! note "Actual 'mark true' conditions"
    - import_StartDate = import_DueDate and neither one has a timestamp
    - import_StartDate is set to a single date, no time - and import_DueDate is not set
    - import_DueDate is set to single date, no time - and import_StartDate is note set

__fkStandardEvent__  
Implement later. Not ready for this yet...  








