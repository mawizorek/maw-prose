---
id: ddr-asbuilt-import-new-events
title: import | new events (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import | new events

Folder: 40-Importing. The import orchestrator.

```
#---
#assume on: import_events_layout
#---
#import SESSIONs can import mulitple PRODUCTIONS in the future.
#one RUN REPORT would be generate PER production IMPORT, while all the newely imported events would be linked to the same import SESSION
#so one import SESSION is going to generate many RUN REPORTS and each IMPORTED RECORD actualy links a RUN REPORT and not a SESSION because the REPORT is going to be link to the SESSION itself. REPORTS make up the IMPORT SESSIONS
#one REPORT per WORKFLOW, and an IMPORT of a PRODUCTION is the starting WORKFLOW that we are deifning here
#and this could be run multiple times in one Import SESSION
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
#required, or defaulted using global
Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; $$currentUtilityfkProduction ) ]
If [ IsEmpty ( $fkProduction ) ]
Show Custom Dialog [ Title: "No production provided at import."; Message: "Aborting…"; Default Button: “OK”, Commit: “Yes” ]
Exit Script [ ]
End If
#GETS
#get: value for fkImportSession (it's a global!)
#IMPORT SETUP
#__script__: new Utility Run Report
Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "title" ; Get ( ScriptName ) ) ; PText ( "comment" ; "" ) ) ) ]
Perform Script [ “new | Utility Report”; Parameter: $param ]
Set Variable [ $fkReport; Value:ParamGetText ( Get ( ScriptParameter ) ; "fkReport" ; $$currentUtilityReport ) ]
#IMPORT PROCESS
#manual | script: do the actual import and *mapping*
Perform Script [ “import | Event records” ]
#done | script: write import_row_numbers directly
Perform Script [ “import | write row numbers” ]
#delay | script: write import_raw_payload
#part of "row numbering" script now:::
// Perform Script [ “import | copy Payload” ]
#IMPORT LINKING
#(can we use one script that accepts many iterations of json in to accomplish some of these in one pass?)
#manual | script: link RUN REPORT
// Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "$fkReport" ; $fkReport ) ) ) ]
// Perform Script [ “link | fkUtilityReport”; Parameter: $param ]
#manual | script: link PRODUCTION
Set Variable [ $param; Value:Param ( List ( PText ( "fkReport" ; $fkReport ); PText ( "fkProduction" ; $fkProduction ) ) ) ]
Perform Script [ “link | fkReport fkProd Hash”; Parameter: $param ]
#NORMALIZATION
#script: remove BLANK records (via task name for now)
Perform Script [ “import | delete empty rows” ]
#script: remove header records (via "date" in start/due date fields)
Perform Script [ “import | delete header row” ]
#script: Clean Event Name
##script: remove [short] production names
Perform Script [ “import EVENT | remove ProdShortName” ]
##script: remove any <maw> style notes in event names
Perform Script [ “import | remove maw notes” ]
#assume: times come in formatted and calced by field defintions - but this may not be the case as soon as we get inot anything besides direct csv download - which is a fine workflow for now
#script: check All Day
Perform Script [ “import | bool all day” ]
#INTEGRATING INTO THE WORKSPACE
Perform Script [ “import | pass to workspace” ]
## this is all stuff I'm making up for now::::
#script: set Hash ID
#script: existent cu ID in the space?
#script: how do we coordinate fkStandardEvent? seem slike this should be on the actual "Events" lsit for the produciton calendars and not on the import table?
```

**Calls:** new | Utility Report, import | Event records, import | write row numbers, link | fkReport fkProd Hash, import | delete empty rows, import | delete header row, import EVENT | remove ProdShortName, import | remove maw notes, import | bool all day, import | pass to workspace
**Called by:** button | import EVENTS
**CFs:** ParamGetText, Param, PText
