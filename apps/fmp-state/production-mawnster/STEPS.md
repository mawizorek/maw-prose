---
status: hidden
type: reference
generated: fmp-state
---

# Production_MAWnster.fmp12 · SCRIPT STEPS
Source drop: `apps/zFMP-drops/Production_MAWnster_fmp12.xml` · disabled steps prefixed ~~

## set Global | pkCurrentUtilitySession
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $fk; Value:ParamGetText ( $p ; "fk" ; "" ) ]
  Set Field [ view_GLOBAL_USE::g_pkCurrentUtilitySession; $fk ]

## file | Create Backup
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $mode; Value:ParamGetText ( $p ; "mode" ; "confirm" ) ]
  If [ $mode = "confirm" ]
  Show Custom Dialog [ Title: "Save a backup?"; Default Button: “Yes”, Commit: “Yes”; Button 2: “No”, Commit: “No” ]
  If [ Get ( LastMessageChoice ) = 2 ]
  Exit Script [ ]
  End If
  End If
  #get filapath in real time for sanity | don't rely on a variable
  Set Variable [ $path; Value:Get ( FilePath ) ]
  #strip filename to get parent directory
  Set Variable [ $dir; Value:Left ( $path ; Position ( $path ; "/" ; Length ( $path ) ; -1 ) ) ]
  #Timestamp for the backup name
  Set Variable [ $ts; Value:Year ( Get ( CurrentDate ) ) & "" & Right("0" & Month ( Get ( CurrentDate ) ) ; 2 ) & "" & Right("0" & Day ( Get ( CurrentDate ) ) ; 2 ) & "_" & Right("0" & Hour ( Get ( Cur…
  #build the backup destination
  Set Variable [ $File; Value:$dir & "zBACKUPS/" & Substitute ( view_GLOBAL_USE::g_AppTitle ; " " ; "" ) & "_" & $ts & ".fmp12" ]
  #Save the file
  Save a Copy as [ “$File”; Create folders:Yes ] [ copy of current file ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## on App Open
  Perform Script [ “new | App Session Token” ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]

## new | App Session Token
  Set Variable [ $uuid; Value:Get ( UUID ) ]
  Set Field [ view_GLOBAL_USE::g_pkCurrentAppSession; $uuid ]

## on App Close
  Commit Records/Requests [ No dialog ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
  #save a backup?
  Perform Script [ “file | Create Backup” ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]

## button | import EVENTS
  #---
  #Starting point: Assume BUTTON is on the IMPORT SESSIONS layout
  #---
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $fkUtilitySession; Value:ParamGetText ( $p ; "fkUtilitySession" ; UTILITY_SESSIONS::PrimaryKey ) ]
  Show Custom Dialog [ Title: "New Session?"; Default Button: “Yes”, Commit: “Yes”; Button 2: “No”, Commit: “No” ]
  If [ Get ( LastMessageChoice ) = 1 ]
  New Record/Request
  Set Variable [ $fkUtility Sessions; Value:UTILITY_SESSIONS::PrimaryKey ]
  Else If [ Get ( LastMessageChoice ) = 2 ]
  End If
  #BEFORE LEAVING "SESSION"
  #set g_pkCurrentImportSession to match
  Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "fk" ; $fkUtilitySession ) ) ) ]
  Perform Script [ “set Global | pkCurrentUtilitySession”; Parameter: $param ]
  Set Variable [ $$currentUtilityfkProduction; Value:UTILITY_SESSIONS::fkcurr_importProduction ]
  Set Variable [ $title; Value:ParamGetText ( $p ; "title" ; Get ( ScriptName ) ) ]
  Set Variable [ $comment; Value:ParamGetText ( $p ; "comment" ; "" ) ]
  #temp menu to fill in those details
  ~~// Show Custom Dialog [ Title: "Details:"; Default Button: “OK”, Commit: “Yes”; Button 2: “Abort”, Commit: “No”; Input #1: $title, "Utlilty Report title: "; Input #2: $comment, "Comments?" ]
  #new REPORT and new LOG
  Set Variable [ $param; Value:Param ( List ( PText ( "title" ; $title ) ; PText ( "comment" ; $comment ) ) ) ]
  Perform Script [ “new | Utility Report”; Parameter: $param ]
  Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
  Perform Script [ “new | Utility Log”; Parameter: $param ]
  #start a new window to execute the workflow
  New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
  Perform Script [ “goTo | table Import EVENTS” ]
  Perform Script [ “Show ALL or NONE”; Parameter: Param ( List ( 1 ; PText ( "mode" ; "None" ) ) ) ]
  # DO THE ACTUAL IMPORTING NOW
  ~~// Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "fkProduction" ; UTILITY_SESSIONS::fkcurr_importProduction ) ) ) ]
  Perform Script [ “import | new events” ]
  Close Window [ Current Window ]

## button | generate events x workdays
  Set Error Capture [ On ]
  #assume on EVENTS after import and current
  #the join remains light and a join. it gets wiped and re-linked each time essentially cos it's just links
  Show Custom Dialog [ Title: "which calendar?"; Default Button: “OK”, Commit: “Yes”; Button 2: “Abort”, Commit: “No”; Input #1: $fkCalendar, "fkCalendar" ]
  New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
  Perform Script [ “goTo | Events x Workdays” ]
  Enter Find Mode [ ]
  Set Field [ view_EVENTS_X_WORKDAYS::fkCalendar; $fkCalendar ]
  Perform Find [ ]
  If [ Get ( FoundCount ) > 0 ]
  Delete All Records
  End If
  Close Window [ Current Window ]
  #back in EVENTS, look at only this calendar
  Enter Find Mode [ ]
  Set Field [ view_EVENTS::fkCalendar; $fkCalendar ]
  Perform Find [ ]
  If [ Get ( FoundCount ) = 0 ]
  Exit Script [ ]
  End If
  Go to Record/Request/Page [ First ]
  Loop
  Set Variable [ $fkEvent; Value:view_EVENTS::PrimaryKey ]
  Set Variable [ $fkProduction; Value:view_EVENTS::fkProduction ]
  Set Variable [ $fkCalendar; Value:view_EVENTS::fkCalendar ]
  Set Variable [ $fkUtilityReport; Value:view_EVENTS::fkUtilityReport ]
  If [ IsEmpty ( view_EVENTS::dateTime_Start ) and view_EVENTS::bool_AllDay = True ]
  Set Variable [ $date; Value:view_EVENTS::dateTime_End ]
  Set Variable [ $param; Value:Param ( List ( PText ( "fkEvent" ; $fkEvent ) ; PText ( "fkCalendar" ; $fkCalendar ) ; PText ( "fkProduction" ; $fkProduction ) ; PText ( "fkUtilityReport" ; $fkUtilityRe…
  Perform Script [ “new | workday x event”; Parameter: $param ]
  Else If [ GetAsDate ( view_EVENTS::dateTime_Start ) = GetAsDate ( view_EVENTS::dateTime_End ) ]
  Set Variable [ $date; Value:view_EVENTS::dateTime_End ]
  Set Variable [ $param; Value:Param ( List ( PText ( "fkEvent" ; $fkEvent ) ; PText ( "fkCalendar" ; $fkCalendar ) ; PText ( "fkProduction" ; $fkProduction ) ; PText ( "fkUtilityReport" ; $fkUtilityRe…
  Perform Script [ “new | workday x event”; Parameter: $param ]
  Else If [ GetAsDate ( view_EVENTS::dateTime_Start ) < GetAsDate ( view_EVENTS::dateTime_End ) ]
  Set Variable [ $countNeeded; Value:GetAsDate ( view_EVENTS::dateTime_End ) - GetAsDate ( view_EVENTS::dateTime_Start ) + 1 ]
  Set Variable [ $c; Value:1 ]
  Set Variable [ $date; Value:view_EVENTS::dateTime_Start ]
  Loop
  Set Variable [ $param; Value:Param ( List ( PText ( "fkEvent" ; $fkEvent ) ; PText ( "fkCalendar" ; $fkCalendar ) ; PText ( "fkProduction" ; $fkProduction ) ; PText ( "fkUtilityReport" ; $fkUtilityRe…
  Perform Script [ “new | workday x event”; Parameter: $param ]
  Set Variable [ $c; Value:$c+1 ]
  Exit Loop If [ $c > $countNeeded ]
  Set Variable [ $date; Value:GetAsDate ( $date + Time ( 24 ; 0 ; 0 ) ) ]
  End Loop
  End If
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop

## new | workday x event
  ~~// Set Variable [ $param; Value:Param ( List ( PText ( "fkEvent" ; $fkEvent ) ; PText ( "fkCalendar" ; $fkCalendar ) ; PText ( "fkProduction" ; $fkProduction ) ; PText ( "fkUtilityReport" ; $fkUtilit…
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $date; Value:ParamGetText ( $p ; "date" ; "err" ) ]
  Set Variable [ $fkEvent; Value:ParamGetText ( $p ; "fkEvent" ; "err" ) ]
  Set Variable [ $fkCalendar; Value:ParamGetText ( $p ; "fkCalendar" ; "err" ) ]
  Set Variable [ $fkUtilityReport; Value:ParamGetText ( $p ; "fkUtilityReport" ; "err" ) ]
  New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
  Perform Script [ “goTo | Events x Workdays” ]
  New Record/Request
  Set Field [ view_EVENTS_X_WORKDAYS::Date; $date ]
  Set Field [ view_EVENTS_X_WORKDAYS::fkEvent; $fkEvent ]
  ~~// Set Field [ view_EVENTS_X_WORKDAYS::XfkWorkday ]
  Set Field [ view_EVENTS_X_WORKDAYS::fkCalendar; $fkCalendar ]
  Set Field [ view_EVENTS_X_WORKDAYS::fkUtilityReport; $fkUtilityReport ]
  Close Window [ Current Window ]

## new-import-session
  New Record/Request
  Set Field [ UTILITY_SESSIONS::fkcurr_importProduction; view_GLOBAL_USE::g_pkCurrentProduction ]

## lookup | production short
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; $$currentUtilityfkProduction ) ]
  New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Height: 400; Width: 400; Top: 200; Close: Yes; Minimize: Yes; Maximize: No; Resize: Yes; Menu Bar: No; Dim pare…
  Perform Script [ “goTo | productions” ]
  Enter Find Mode [ ]
  Set Field [ view_PRODUCTIONS::PrimaryKey; $fkProduction ]
  Perform Find [ ]
  If [ Get ( LastError ) ≠ 0 ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "No fkProduction" ) ) ) ]
  Exit Script [ ]
  End If
  Set Variable [ $shortLabel; Value:view_PRODUCTIONS::TitleShort ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "with: " & $shortLabel ) ) ) ]
  Close Window [ Current Window ]
  Exit Script [ Result: Param ( List ( 1 ; PText ( "shortLabel" ; $shortLabel ) ) ) ]

## import | new events
  #---
  #assume on: import_events_layout
  #---
  #import SESSIONs can import mulitple PRODUCTIONS in the future.
  #one RUN REPORT would be generate PER production IMPORT, while all the newely imported events would be linked to the same import SESSION
  #so one import SESSION is going to generate many RUN REPORTS and each IMPORTED RECORD actualy links a RUN REPORT and not a SESSION because the REPORT is going to be link to the SESSION itself. REPORT…
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
  Set Variable [ $return; Value:Get ( ScriptResult ) ]
  Set Variable [ $rowCount; Value:ParamGetNumber ( $return ; "RowCount" ; -1 ) ]
  Set Field [ UTILITY_SESSIONS::countRows_File; $rowCount ]
  #delay | script: write import_raw_payload
  #part of "row numbering" script now:::
  ~~// Perform Script [ “import | copy Payload” ]
  #IMPORT LINKING
  #(can we use one script that accepts many iterations of json in to accomplish some of these in one pass?)
  #manual | script: link RUN REPORT
  ~~// Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "$fkReport" ; $fkReport ) ) ) ]
  ~~// Perform Script [ “xlink | fkUtilityReport”; Parameter: $param ]
  #manual | script: link PRODUCTION
  Set Variable [ $param; Value:Param ( List ( PText ( "fkReport" ; $fkReport ); PText ( "fkProduction" ; $fkProduction ) ; PText ( "StyleKey" ; $styleKey ) ) ) ]
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

## import | Event records
  #for import and field mapping
  #dictate match fields
  ## ClickUp Task ID
  Set Variable [ $matchFields; Value:$matchFields & "| CU-ID |" ]
  ## Event NAME
  Set Variable [ $matchFields; Value:$matchFields & "| Event Name |" ]
  ## Event START date (and time)
  Set Variable [ $matchFields; Value:$matchFields & "| Start Timestamp |" ]
  ## Event START date (and time)
  Set Variable [ $matchFields; Value:$matchFields & "| End Timestamp |" ]
  ## Event STYLE choice
  Set Variable [ $matchFields; Value:$matchFields & "| Event Style Choice |" ]
  Show Custom Dialog [ Title: "Incoming Import Window..."; Message: "Match fields:¶" & $matchFields; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
  If [ Get ( LastMessageChoice ) = 2 ]
  Exit Script [ ]
  End If
  Import Records [ ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## import | write row numbers
  #assume already in found set
  #and on: IMPORT_EVENTS based layout
  Go to Record/Request/Page [ First ]
  Set Variable [ $r; Value:1 ]
  Loop
  Set Field [ view_IMPORT_EVENTS::import_RowNumber; $r ]
  Set Field [ view_IMPORT_EVENTS::import_raw_payload; Param ( List ( PText ( "cu_TaskID" ; view_IMPORT_EVENTS::cu_TaskID ) ; PText ( "import_Name" ; view_IMPORT_EVENTS::import_Name ) ; PText ( "import_…
  Set Variable [ $r; Value:$r+1 ]
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop
  Go to Record/Request/Page [ First ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ); PText ( "comment" ; $r-1 & " rows imported" ) ) ) ]
  Exit Script [ Result: Param ( List ( 1 ; PNum ( "RowCount" ; $r-1 ) ) ) ]

## import | copy Payload
  #on import, copy every column, row, header into a row json into the import_raw_payload field
  #would take some advanced scripting to save and store the headers too in a singel json but good for rollback and could be passed as an entire json package to many of the import script steps as it's o…
  Set Field [ view_IMPORT_EVENTS::import_raw_payload; Param ( List ( PText ( "cu_TaskID" ; view_IMPORT_EVENTS::cu_TaskID ) ; PText ( "import_Name" ; view_IMPORT_EVENTS::import_Name ) ; PText ( "import_…
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## xlink | fkUtilityReport
  #assume already in found set
  #and on: IMPORT_EVENTS based layout
  Go to Record/Request/Page [ First ]
  Set Variable [ $report; Value:$$currentUtilityReport ]
  Loop
  Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $report ]
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop
  Go to Record/Request/Page [ First ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## link | fkReport fkProd Hash
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; $$currentUtilityfkProduction ) ]
  Set Variable [ $report; Value:ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ]
  Set Variable [ $styleKey; Value:ParamGetText ( $p ; "StyleKey" ; $$currentUtilityReport ) ]
  #assume already in found set
  #and on: IMPORT_EVENTS based layout
  Go to Record/Request/Page [ First ]
  Loop
  Set Field [ view_IMPORT_EVENTS::fkProduction; $fkProduction ]
  Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $report ]
  ~~// Set Field [ view_IMPORT_EVENTS::Xauto_StyleLookup; "calendar>" & view_IMPORT_EVENTS::import_Style_Key ]
  ~~// Set Field [ view_IMPORT_EVENTS::hash_history; view_IMPORT_EVENTS::cu_TaskID & "." & view_IMPORT_EVENTS::fkUtilityReport ]
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop
  ~~// Go to Record/Request/Page [ First ]
  Set Variable [ $hash; Value:view_IMPORT_EVENTS::hash_history ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "ex: " & $hash ) ) ) ]
  #assume already in found set
  #and on: IMPORT_EVENTS based layout
  ~~// Go to Record/Request/Page [ First ]
  ~~// Set Variable [ $report; Value:$$currentUtilityReport ]
  ~~// Loop
  ~~// Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $report ]
  ~~// Go to Record/Request/Page [ Next; Exit after last ]
  ~~// End Loop
  ~~//
  ~~// Go to Record/Request/Page [ First ]
  ~~//
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## import | delete empty rows
  #assume already in the found set
  Set Error Logging [ On ; Custom debug info: ]
  Go to Record/Request/Page [ First ]
  Enter Find Mode [ ]
  Set Field [ view_IMPORT_EVENTS::import_Name; "*" ]
  Perform Find [ ]
  Show Omitted Only
  Enter Find Mode [ ]
  Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $$currentUtilityReport ]
  Constrain Found Set [ ]
  Delete All Records [ No dialog ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## import | delete header row
  #assume already in the found set
  Set Error Logging [ On ; Custom debug info: ]
  Enter Find Mode [ ]
  Set Field [ view_IMPORT_EVENTS::import_dateSTART; "Date" ]
  Set Field [ view_IMPORT_EVENTS::import_dateSTART; "Date" ]
  Perform Find [ ]
  Delete All Records [ No dialog ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## import EVENT | remove ProdShortName
  #be *in* the found set thyat you want to apply the search to first
  #make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) bu…
  #could also filter by g_pkCurrentImportSession
  Perform Script [ “filter | to current run” ]
  Perform Script [ “lookup | production short” ]
  Set Variable [ $shortLabel; Value:ParamGetText ( Get ( ScriptResult ) ; "shortLabel" ; "" ) ]
  Go to Record/Request/Page [ First ]
  Loop
  Set Field [ view_IMPORT_EVENTS::Event Name; Substitute ( view_IMPORT_EVENTS::import_Name ; "[" & $shortLabel & "] " ; "" ) ]
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## import | remove maw notes
  #be *in* the found set thyat you want to apply the search to first
  #make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) bu…
  #could also filter by g_pkCurrentImportSession
  Perform Script [ “filter | to current run” ]
  Go to Record/Request/Page [ First ]
  Loop
  Set Field [ view_IMPORT_EVENTS::Event Name; Let ( [ ~text = view_IMPORT_EVENTS::Event Name ] ; While ( [ ~result = ~text ; ~start = Position ( ~result ; "<" ; 1 ; 1 ) ; ~end = Position ( ~result ; ">…
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## import | bool all day
  #be *in* the found set thyat you want to apply the search to first
  #make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) bu…
  #could also filter by g_pkCurrentImportSession
  Perform Script [ “filter | to current run” ]
  Go to Record/Request/Page [ First ]
  Loop
  If [ IsEmpty ( view_IMPORT_EVENTS::import_dateSTART ) and view_IMPORT_EVENTS::import_dateEND ]
  Set Field [ view_IMPORT_EVENTS::bool_AllDay; 1 ]
  Else If [ GetAsDate ( view_IMPORT_EVENTS::import_dateSTART ) ≠ GetAsDate ( view_IMPORT_EVENTS::import_dateEND ) and GetAsTime ( view_IMPORT_EVENTS::import_dateEND ) ≠ Time ( 24 ; 0 ; 0 ) ]
  Set Field [ view_IMPORT_EVENTS::bool_AllDay; 1 ]
  End If
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## import | pass to workspace
  #GOALS
  Perform Script [ “filter | to current run” ]
  Perform Script [ “end | Utility Report” ]
  Perform Script [ “new | Utility Report”; Parameter: Param ( List ( PText ( "title" ; Get ( ScriptName ) ) ) ) ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "START> " & Get ( ScriptName ) ) ) ) ]
  #be *in* the found set that you want to apply the search to first
  #make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) bu…
  #see if this event has ever been imported before. verify using HASH - which is just cu_taskID
  Go to Record/Request/Page [ First ]
  Set Variable [ $c; Value:1 ]
  Loop
  Set Variable [ $pkReturn; Value:view_IMPORT_EVENTS::PrimaryKey ]
  Set Variable [ $cuID; Value:view_IMPORT_EVENTS::cu_TaskID ]
  #search cuID in current EVENTS. passes if found count = 1 or 0
  Perform Script [ “compare | cu_ID”; Parameter: Param ( List ( 1 ; PText ( "cuID" ; $cuID ) ) ) ]
  Set Variable [ $return; Value:Get ( ScriptResult ) ]
  Set Variable [ $result; Value:ParamGetText ( $return ; "result" ; "err" ) ]
  Set Variable [ $pass; Value:ParamGetBool ( $return ; "pass" ; False ) ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "data return> " & Get ( ScriptName ) ) ; PText ( "comment" ; "!result: " & $result ) ) ) ]
  #STILL IN A NEW FLOATING WINDOW
  If [ ParamGetBool ( $return ; "pass" ; False ) ≠ True ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "found count ≠ 1 or 0" ) ) ) ]
  Exit Script [ ]
  Else
  ~~// Set Variable [ $return; Value:ParamGetText ( $result ; "result" ; "" ) ]
  Set Variable [ $mode; Value:$result ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "data> " & Get ( ScriptName ) ) ; PText ( "comment" ; "mode: " & $mode ) ) ) ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "success in " & Get ( ScriptName ) ) ; PText ( "comment" ; "result: " & $result ) ) ) ]
  End If
  #INCORPORATE THE IMPROTED EVENT
  If [ $mode = "net new" ]
  Perform Script [ “import | net new Event”; Parameter: view_IMPORT_EVENTS::json_cleanImportDetails ]
  ~~// Perform Script [ “import | merge Event”; Parameter: view_IMPORT_EVENTS::json_cleanImportDetails ]
  Else If [ $mode = "merge" ]
  Perform Script [ “import | merge Event”; Parameter: view_IMPORT_EVENTS::json_cleanImportDetails ]
  ~~// Perform Script [ “import | net new Event”; Parameter: view_IMPORT_EVENTS::json_cleanImportDetails ]
  End If
  ~~// Exit Loop If [ $c = 30 ]
  Go to Record/Request/Page [ Next; Exit after last ]
  Set Variable [ $c; Value:$c + 1 ]
  End Loop
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "END> " & Get ( ScriptName ) ) ; PText ( "comment" ; "count = " & $c ) ) ) ]

## compare | cu_ID
  Set Error Capture [ On ]
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $cuID; Value:ParamGetText ( $p ; "cuID" ; "abort" ) ]
  If [ $cuID = "abort" ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "no cuID passed" ) ) ) ]
  Exit Script [ ]
  End If
  New Window [ Style: Document; Using layout: <Current Layout>; Height: 400; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: Yes; Menu Bar: No; Dim parent window: No; Toolbars: No ]
  Perform Script [ “goTo | Events” ]
  Enter Find Mode [ ]
  Set Field [ view_EVENTS::cuID; $cuID ]
  Perform Find [ ]
  If [ Get ( FoundCount ) > 1 ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "foundcount =/ 1" ) ) ) ]
  Set Variable [ $logParam; Value:Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "foundcount =/ 1" ) ) ) ]
  Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 0 ) ; PText ( "result" ; "failed" ) ) ) ]
  Else If [ Get ( FoundCount ) = 0 ]
  Set Variable [ $logParam; Value:Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "net new. FC: " & Get ( FoundCount ) ) ) ) ]
  Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "net new" ) ) ) ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "Found count: " & Get ( FoundCount ) ) ) ) ]
  ~~// Exit Script [ Result: Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "net new" ) ) ) ]
  Else If [ Get ( FoundCount ) = 1 ]
  Set Variable [ $logParam; Value:Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "merge FC: " & Get ( FoundCount ) ) ) ) ]
  Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "merge" ) ) ) ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "Found count: " & Get ( FoundCount ) ) ) ) ]
  ~~// Exit Script [ Result: Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "merge" ) ) ) ]
  End If
  Close Window [ Current Window ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: $logParam ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "data> " & Get ( ScriptName )) ; PText ( "comment" ; "$scriptResult: " & $scriptResult ) ) ) ]
  Exit Script [ Result: $scriptResult ]

## import | net new Event
  Set Error Capture [ On ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $cuID; Value:ParamGetText ( $p ; "cuID" ; "" ) ]
  Set Variable [ $name; Value:ParamGetText ( $p ; "Name" ; "err" ) ]
  Set Variable [ $start; Value:ParamGetText ( $p ; "dateTime_Start" ; "" ) ]
  Set Variable [ $end; Value:ParamGetText ( $p ; "dateTime_End" ; "err" ) ]
  Set Variable [ $bool_AllDay; Value:ParamGetText ( $p ; "bool_AllDay" ; "" ) ]
  Set Variable [ $fkReport; Value:ParamGetText ( $p ; "fkUtilityReport" ; "err" ) ]
  Set Variable [ $hash; Value:ParamGetText ( $p ; "hash_current" ; "err" ) ]
  Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; "err" ) ]
  Set Variable [ $styleKey; Value:ParamGetText ( $p ; "StyleKey" ; "" ) ]
  New Window [ Style: Document; Name: "import | new new Event"; Using layout: <Current Layout>; Height: 400; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: Yes; Menu Bar: No; Dim parent wind…
  Perform Script [ “goTo | Events” ]
  Perform Script [ “Show ALL or NONE”; Parameter: Param ( List ( 1 ; PText ( "mode" ; "none" ) ) ) ]
  New Record/Request
  Set Field [ view_EVENTS::cuID; $cuID ]
  Set Field [ view_EVENTS::Name; $name ]
  Set Field [ view_EVENTS::dateTime_Start; GetAsTimestamp ( $start ) ]
  Set Field [ view_EVENTS::dateTime_End; GetAsTimestamp ( $end ) ]
  Set Field [ view_EVENTS::bool_AllDay; $bool_AllDay ]
  Set Field [ view_EVENTS::fkUtilityReport; $fkReport ]
  Set Field [ view_EVENTS::hash_current; $hash ]
  Set Field [ view_EVENTS::fkProduction; $fkProduction ]
  Set Field [ view_EVENTS::cu_StyleToken; $styleKey ]
  Perform Script [ “update | EVENT_auto_StyleLookup” ]
  Set Field [ view_EVENTS::json_Rollback; $p ]
  Perform Script [ “lookup | calendar for production”; Parameter: Param ( List ( 1 ; PText ( "fkProduction" ; $fkProduction ) ) ) ]
  Set Variable [ $return; Value:Get ( ScriptResult ) ]
  Set Variable [ $fkCalendar; Value:ParamGetText ( $return ; "fkCalendar" ; "err" ) ]
  Set Field [ view_EVENTS::fkCalendar; $fkCalendar ]
  Commit Records/Requests [ No dialog ]
  ~~// Set Field [ view_EVENTS::fkStandardEvent; $cuID ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]
  Close Window [ Name: "import | new new Event"; Current file ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]

## update | EVENT_auto_StyleLookup
  #assume on view_EVENTS
  Set Field [ view_EVENTS::autoKey_StyleLookup; "calendar>" & view_EVENTS::cu_StyleToken ]

## import | merge Event
  Set Error Capture [ On ]
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $cuID; Value:ParamGetText ( $p ; "cuID" ; "" ) ]
  Set Variable [ $name; Value:ParamGetText ( $p ; "EventName" ; "err" ) ]
  Set Variable [ $start; Value:ParamGetText ( $p ; "dateTime_start" ; "" ) ]
  Set Variable [ $end; Value:ParamGetText ( $p ; "dateTime_end" ; "err" ) ]
  Set Variable [ $bool_AllDay; Value:ParamGetBool ( $p ; "bool_AllDay" ; "" ) ]
  Set Variable [ $fkReport; Value:ParamGetText ( $p ; "fkUtilityReport" ; "err" ) ]
  Set Variable [ $hash; Value:ParamGetText ( $p ; "hash_current" ; "err" ) ]
  Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; "err" ) ]
  Set Variable [ $styleKey; Value:ParamGetText ( $p ; "StyleKey" ; "" ) ]
  New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Height: 400; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: Yes; Menu Bar: No; Dim parent window: No…
  Perform Script [ “goTo | Events” ]
  ~~// Perform Script [ “Show ALL or NONE”; Parameter: Param ( List ( 1 ; PText ( "mode" ; "none" ) ) ) ]
  ~~//
  Enter Find Mode [ ]
  Set Field [ view_EVENTS::cuID; $cuID ]
  Perform Find [ ]
  If [ Get ( FoundCount ) ≠ 1 ]
  Exit Script [ ]
  End If
  Perform Script [ “backup | EVENT”; Parameter: $p ]
  ~~// Set Variable [ $param; Value:Param ( List ( 1 ; PNum ( "index" ; $i ) ) ) ]
  Go to Next Field
  Set Variable [ $startField; Value:Get ( ActiveFieldName ) ]
  Loop
  Set Variable [ $value; Value:ParamGetText ( $p ; Get ( ActiveFieldName ) ; "err" ) ]
  Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "field" ; Get ( ActiveFieldName ) ) ; PText ( "value" ; $value ) ) ) ]
  Perform Script [ “merge | compare field”; Parameter: $param ]
  Go to Next Field
  Exit Loop If [ Get ( ActiveFieldName ) = $startField ]
  End Loop
  Perform Script [ “update | EVENT_auto_StyleLookup” ]
  Close Window [ Current Window ]
  ~~// Set Field [ view_EVENTS::cuID; $cuID ]
  ~~// Set Field [ view_EVENTS::Name; $name ]
  ~~// Set Field [ view_EVENTS::dateTime_Start; GetAsTimestamp ( $start ) ]
  ~~// Set Field [ view_EVENTS::dateTime_End; GetAsTimestamp ( $end ) ]
  ~~// Set Field [ view_EVENTS::bool_AllDay; $bool_AllDay ]
  ~~// Set Field [ view_EVENTS::fkUtilityReport; $fkReport ]
  ~~// Set Field [ view_EVENTS::hash_current; $hash ]
  ~~//
  ~~// Set Field [ view_EVENTS::fkProduction; $fkProduction ]
  ~~//
  ~~// Set Field [ view_EVENTS::cu_StyleToken; $styleKey ]
  ~~//
  ~~// Set Field [ view_EVENTS::json_Rollback; $p ]
  ~~//
  ~~// Perform Script [ “lookup | calendar for production”; Parameter: Param ( List ( 1 ; PText ( "fkProduction" ; $fkProduction ) ) ) ]
  ~~// Set Variable [ $return; Value:Get ( ScriptResult ) ]
  ~~// Set Variable [ $fkCalendar; Value:ParamGetText ( $return ; "fkCalendar" ; "err" ) ]
  ~~// Set Field [ view_EVENTS::fkCalendar; $fkCalendar ]
  ~~//
  ~~//
  ~~// Set Field [ view_EVENTS::fkStandardEvent; $cuID ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]

## backup | EVENT
  New Window [ Style: Document; Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes ]
  Go to Next Field
  Set Variable [ $startField; Value:Get ( ActiveFieldName ) ]
  Loop
  If [ PatternCount ( Get ( ActiveFieldName ) ; "Rollback" ) ]
  Else
  Set Variable [ $json; Value:view_EVENTS::json_Rollback ]
  Set Variable [ $key; Value:Get ( ActiveFieldName ) ]
  Set Variable [ $value; Value:Get ( ActiveFieldContents ) ]
  Set Variable [ $jsonUpdated; Value: /*JSONSetElement ( $json ; [ $key ; $value ; JSONString ] )*/ JSONPatch ( $json ; $key ; $value ; "" ) ]
  Set Field [ view_EVENTS::json_Rollback; $jsonUpdated ]
  End If
  Go to Next Field
  Exit Loop If [ Get ( ActiveFieldName ) = $startField ]
  End Loop
  Close Window [ Current Window ]
  #assume already ON THE RECORD
  ~~//
  ~~// Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  ~~//
  ~~// Set Variable [ $cuID; Value:ParamGetText ( $p ; "cuID" ; "" ) ]
  ~~// Set Variable [ $name; Value:ParamGetText ( $p ; "EventName" ; "err" ) ]
  ~~// Set Variable [ $start; Value:ParamGetText ( $p ; "dateTime_start" ; "" ) ]
  ~~// Set Variable [ $end; Value:ParamGetText ( $p ; "dateTime_end" ; "err" ) ]
  ~~// Set Variable [ $bool_AllDay; Value:ParamGetBool ( $p ; "bool_AllDay" ; "" ) ]
  ~~// Set Variable [ $fkReport; Value:ParamGetText ( $p ; "fkUtilityReport" ; "err" ) ]
  ~~// Set Variable [ $hash; Value:ParamGetText ( $p ; "hash_current" ; "err" ) ]
  ~~//
  ~~// Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; "err" ) ]
  ~~//
  ~~// Set Variable [ $styleKey; Value:ParamGetText ( $p ; "StyleKey" ; "" ) ]
  ~~//
  ~~//
  ~~//
  ~~//
  ~~//
  ~~//
  ~~//
  ~~//
  ~~//
  ~~// Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  ~~// Set Variable [ $field; Value:ParamGetText ( $p ; "field" ; "" ) ]
  ~~// Set Variable [ $value; Value:ParamGetText ( $p ; "value" ; "" ) ]
  ~~//
  ~~// Set Field By Name [ "json_Rollback"; Get ( ActiveFieldContents ) ]
  ~~// Set Variable [ $JSONtemp; Value:Get ( ActiveFieldContents ) ]
  ~~// Set Field By Name [ "json_Rollback"; JSONPatch ( Get ( ActiveFieldContents ) ; $field ; $value ; "" ) ]

## merge | compare field
  #assume ON the record already
  #receive *any* field
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $field; Value:ParamGetText ( $p ; "field" ; "" ) ]
  #and a value for that field to potentially update to
  Set Variable [ $value; Value:ParamGetText ( $p ; "value" ; "err" ) ]
  If [ $value = "err" ]
  Exit Script [ ]
  End If
  #and probably a json key
  #>>>use the field name as that identifier
  #and then compare the CURRENT value in that field
  Set Field By Name [ $field; Get ( ActiveFieldContents ) ]
  Set Variable [ $currentValue; Value:Get ( ActiveFieldContents ) ]
  #if it's the same, just pass back - no change
  If [ $currentValue = $value ]
  Exit Script [ ]
  Else
  ~~// Commit Records/Requests [ No dialog ]
  #if DIFFERENT, save the old value into json_Rollback (destructive of that value)
  ~~// Set Variable [ $param; Value:Param ( List ( PText ( "field" ; $field ) ; PText ( "value" ; $currentValue ) ) ) ]
  ~~// Perform Script [ “backup | EVENT”; Parameter: $param ]
  #then paste in the new value
  ~~// Set Field By Name [ $field; $value ]
  Set Field [ $value ]
  End If
  #RETURN: pass 0/1

## XXmerge | Event Field
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $c; Value:ParamGetNumber ( $p ; "index" ; 0 ) ]
  If [ $c = 0 ]
  Exit Script [ ]
  End If
  Set Variable [ $field; Value:ParamGetText ( $p ; "field" ; "" ) ]
  Set Variable [ $value; Value:ParamGetText ( $p ; "value" ; "" ) ]
  Set Field By Name [ $field ]
  Set Variable [ $currentValue; Value:Get ( ActiveFieldContents ) ]
  If [ $currentValue = $value ]
  Exit Script [ ]
  Else
  Commit Records/Requests [ No dialog ]
  Set Variable [ $param; Value:Param ( List ( PText ( "field" ; $field ) ; PText ( "value" ; $currentValue ) ) ) ]
  Perform Script [ “backup | EVENT”; Parameter: $param ]
  Set Field By Name [ $field; $value ]
  End If

## lookup | calendar for production
  ~~// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "start" ) ) ) ]
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; view_GLOBAL_USE::g_pkCurrentProduction ) ]
  New Window [ Style: Document; Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes ]
  Perform Script [ “goTo | Calendars” ]
  Enter Find Mode [ ]
  Set Field [ view_CALENDARS::fkProduction; $fkProduction ]
  Perform Find [ ]
  If [ Get ( FoundCount ) = 0 or Get ( FoundCount ) > 1 ]
  Set Variable [ $logParam; Value:Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "FC = " & Get ( FoundCount ) ) ) ) ]
  Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 0 ) ; PText ( "fkCalendar" ; "indecisive" ) ) ) ]
  Else
  Set Variable [ $logParam; Value:Param ( List ( PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "fkProd: " & view_CALENDARS::fkProduction ) ) ) ]
  Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "fkCalendar" ; view_CALENDARS::PrimaryKey ) ) ) ]
  End If
  Close Window [ Current Window ]
  Perform Script [ “new | Utility Log”; Parameter: $logParam ]
  Exit Script [ Result: $scriptResult ]

## filter | to current run
  Enter Find Mode [ ]
  Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $$currentUtilityReport ]
  Perform Find [ ]

## goto_view_UTILITY_LOGS
  Go to Layout [ “view | UTILITY_LOGS” (view_UTILITY_LOGS) ]

## goTo | view_UTILITY_REPORTS
  Go to Layout [ “view | UTILITY_REPORTS” (view_UTILITY_REPORTS) ]
  #if a "fk" is passed, then filter the goTo to that record(s)
  #set a default fallback per goTo script, but leave the if below alone then
  Set Variable [ $default; Value:$$currentUtilityReport ]
  If [ IsEmpty ( Get ( ScriptParameter ) ) ]
  Exit Script [ Result: Param ( List ( 1 ; PText ( "message" ; "no filtering" ) ) ) ]
  Else
  Set Variable [ $p; Value:Get(ScriptParameter) ]
  Set Variable [ $pk; Value:ParamGetText ( $p ; "fk" ; $$currentUtilityReport ) ]
  End If
  ~~// Perform Script [ <unknown> ]
  Enter Find Mode [ ]
  Set Field [ view_UTILITY_REPORTS::PrimaryKey; $pk ]
  Perform Find [ ]
  If [ Get ( LastError ) ≠ 0 ]
  Exit Script [ ]
  End If

## goTo | productions
  Go to Layout [ “table | PRODUCTIONS” (view_PRODUCTIONS) ]

## goTo | Calendars
  Go to Layout [ “table | CALENDARS” (view_CALENDARS) ]
  ~~// Go to Layout [ “view | UTILITY_REPORTS” (view_UTILITY_REPORTS) ]
  #if a "fk" is passed, then filter the goTo to that record(s)
  #set a default fallback per goTo script, but leave the if below alone then
  Set Variable [ $default; Value:view_GLOBAL_USE::g_pkCurrentProduction ]
  Set Variable [ $json_key; Value:"fkCalendar" ]
  If [ IsEmpty ( Get ( ScriptParameter ) ) ]
  Exit Script [ Result: Param ( List ( 1 ; PText ( "message" ; "no filtering" ) ) ) ]
  Else
  Set Variable [ $p; Value:Get(ScriptParameter) ]
  Set Variable [ $pk; Value:ParamGetText ( $p ; $json_key ; $default ) ]
  End If
  ~~// Perform Script [ <unknown> ]
  Enter Find Mode [ ]
  Set Field [ view_UTILITY_REPORTS::PrimaryKey; $pk ]
  Perform Find [ ]
  If [ Get ( LastError ) ≠ 0 ]
  Exit Script [ ]
  End If

## goTo | Events
  Go to Layout [ “table | EVENTS” (view_EVENTS) ]

## goTo | Events x Workdays
  Go to Layout [ “script | EVENT_WORKDAYS” (view_EVENTS_X_WORKDAYS) ]

## goTo | table Import EVENTS
  Go to Layout [ “table | IMPORT_EVENTS” (view_IMPORT_EVENTS) ]

## goto_view_Import_Sessions
  Go to Layout [ “script | UTILITY_SESSIONS” (view_UTILITY_SESSIONS) ]

## goto_view_APP_SESSIONS
  Go to Layout [ “view | APP_SESSIONS” (view_APP_SESSIONS) ]

## goto_view_UTILITY_LOGS
  Go to Layout [ “view | UTILITY_LOGS” (view_UTILITY_LOGS) ]

## goto_view_VALUES

## goTo | new window currentRunReport
  Set Variable [ $p; Value:Get(ScriptParameter) ]
  Set Variable [ $report; Value:Param ( List ( 1 ; PText ( "fkReport" ; ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ) ) ) ]
  ~~// If [ IsEmpty ( Get ( ScriptParameter ) ) ]
  ~~// Set Variable [ $report; Value:$$currentUtilityReport ]
  ~~// Else
  ~~// Set Variable [ $p; Value:Get(ScriptParameter) ]
  #REQUIRED, or defaulted:
  Set Variable [ $name; Value:ParamGetText ( $p ; "windowName" ; "Unnamed Window" ) ]
  #make the report into a json package right at script param lookup
  ~~// Set Variable [ $report; Value:Param ( List ( 1 ; "fkReport" ; ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ) ) ]
  ~~// End If
  New Window [ Style: Card; Name: $name; Using layout: <Current Layout>; Height: 400; Width: 400; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: No; Menu Bar: No; Dim parent window: No; Tool…
  #pass a fkReport to the go_to layout for an automatic filter to just that record(s).
  Perform Script [ “goTo | view_UTILITY_REPORTS”; Parameter: $report ]

## trigger_App_Open
  #---
  #---
  Set Error Capture [ On ]
  Allow User Abort [ Off ]
  Perform Script [ “goto_view_APP_SESSIONS” ]
  Perform Script [ “Show ALL or NONE”; Parameter: Param ( List ( PText ( "mode" ; "All" ); 1 ) ) ]
  New Record/Request
  Set Field [ view_APP_SESSIONS::StartTimestamp; Get ( CurrentTimestamp ) ]
  Set Variable [ $$SESSION.token ]

## App_Startup
  #---
  #EXPECTING: sessionToken
  #---
  Set Error Capture [ On ]
  Allow User Abort [ Off ]
  Set Variable [ $p; Value:Get(ScriptParameter) ]
  Set Variable [ $session; Value:ParamGetText ( $p ; "sessionToken" ; $$SESSION.token ) ]
  Perform Script [ <unknown> ]
  If [ $mode = "ALL" ]
  Show All Records
  Else If [ $mode = "NONE" or $mode = "none" or $mode = "None" or $mode = "N" or $mode = "n" ]
  End If

## new | Utility Report
  #---
  #id: new-utility-log
  #NEEDS: a currentImportSession, or a pass of one to use.
  #---
  Set Error Capture [ On ]
  Allow User Abort [ Off ]
  #may be blank:
  Set Variable [ $p; Value:Get(ScriptParameter) ]
  #REQUIRED, or globalled:
  Set Variable [ $currentUtilitySession; Value:ParamGetText ( $p ; "fkUtilitySession" ; view_GLOBAL_USE::g_pkCurrentUtilitySession ) ]
  #OPTIONAL:
  Set Variable [ $title; Value:ParamGetText ( $p ; "title" ; "Unnamed Report" ) ]
  Set Variable [ $comment; Value:ParamGetText ( $p ; "comment" ; "" ) ]
  New Window [ Style: Card; Name: "new run report"; Using layout: <Current Layout>; Height: 80; Width: 500; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: No; Menu Bar: No; Dim parent window…
  Perform Script [ “goTo | view_UTILITY_REPORTS” ]
  New Record/Request
  If [ Get ( LastError ) ≠ 0 ]
  Show Custom Dialog [ Title: "Error in utiltiy log creation."; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
  End If
  Set Variable [ $$currentUtilityReport; Value:view_UTILITY_REPORTS::PrimaryKey ]
  #SET FIELDS
  Set Field [ view_UTILITY_REPORTS::Title; $title ]
  Set Field [ view_UTILITY_REPORTS::Comment; $comment ]
  #auto-set
  Set Field [ view_UTILITY_REPORTS::vl_Status; "New" ]
  Set Field [ view_UTILITY_REPORTS::dateTime_Start; Get ( CurrentTimestamp ) ]
  Set Field [ view_UTILITY_REPORTS::fkUtilitySession; $currentUtilitySession ]
  Set Field [ view_UTILITY_REPORTS::fkAppSession; view_GLOBAL_USE::g_pkCurrentAppSession ]
  ~~// Pause/Resume Script [ Indefinitely ]
  Close Window [ Current Window ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
  Exit Script [ Result: Param ( List ( 1 ; PText ( "fkReport" ; view_UTILITY_REPORTS::PrimaryKey ) ) ) ]
  #AT END-TIME variables
  #not sure how to implement this part:
  #probably from the global $$currentRunReport that we set just after creating new record.
  #script for: Add summmary to, or "end Report timestamp" etc
  ~~// Set Field [ view_UTILITY_REPORTS::RunSummary; "" ]
  ~~// Set Field [ view_UTILITY_REPORTS::dateTime_End; $fkReport ]
  ~~// Set Field [ view_UTILITY_REPORTS::media_RunReport; $fkReport ]
  ~~// Set Field [ view_UTILITY_REPORTS::bool_Pass; "" ]
  #- EOF -

## end | Utility Report
  Set Variable [ $p; Value:Get(ScriptParameter) ]
  ~~// Set Variable [ $report; Value:$$currentUtilityReport ]
  Set Variable [ $report; Value:Param ( List ( 1 ; PText ( "fkReport" ; ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ) ) ) ]
  ~~// If [ IsEmpty ( Get ( ScriptParameter ) ) ]
  ~~// Set Variable [ $report; Value:$$currentUtilityReport ]
  ~~// Else
  ~~// Set Variable [ $p; Value:Get(ScriptParameter) ]
  #REQUIRED, or defaulted:
  ~~// Set Variable [ $report; Value:Param ( List ( 1; ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ) ) ]
  #OPTIONAL:
  Set Variable [ $summary; Value:ParamGetText ( $p ; "summary" ; "" ) ]
  ~~// End If
  #OPENING A NEW WINDOW
  Perform Script [ “goTo | new window currentRunReport”; Parameter: $report ]
  #SET FIELDS:
  Set Field [ view_UTILITY_REPORTS::dateTime_End; Get ( CurrentTimestamp ) ]
  Set Field [ view_UTILITY_REPORTS::RunSummary; $summary ]
  Set Field [ view_UTILITY_REPORTS::bool_Pass; 1 ]
  #OPTIONAL:
  ~~// Set Field [ view_UTILITY_REPORTS::media_RunReport; $fkReport ]
  Close Window [ Current Window ]
  Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "" ) ) ) ]

## new | Utility Log
  #---
  #id: new-utility-log
  #---
  Set Error Capture [ On ]
  Allow User Abort [ Off ]
  Set Variable [ $p; Value:Get(ScriptParameter) ]
  #required: "action" as prose text
  Set Variable [ $action; Value:ParamGetText ( $p ; "action" ; "unnamed action" ) ]
  #requried, or globalled:
  Set Variable [ $fkReport; Value:ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ]
  #optional: "comment" as prose text
  #optional: "json" as json package
  Set Variable [ $comment; Value:ParamGetText ( $p ; "comment" ; "" ) ]
  Set Variable [ $json; Value:ParamGetText ( $p ; "json" ; "" ) ]
  New Window [ Style: Card; Name: "new log"; Using layout: <Current Layout>; Height: 80; Width: 500; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: No; Menu Bar: No; Dim parent window: No; T…
  Perform Script [ “goto_view_UTILITY_LOGS” ]
  New Record/Request
  If [ Get ( LastError ) ≠ 0 ]
  Show Custom Dialog [ Title: "Error in utiltiy log creation."; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
  End If
  Set Variable [ $fkLog; Value:view_UTILITY_LOGS::PrimaryKey ]
  Set Field [ view_UTILITY_LOGS::fkRunReport; $fkReport ]
  Set Field [ view_UTILITY_LOGS::fkAppSessionToken; view_GLOBAL_USE::g_pkCurrentAppSession ]
  Set Field [ view_UTILITY_LOGS::Action; $action ]
  Set Field [ view_UTILITY_LOGS::Timestamp; Get ( CurrentTimestamp ) ]
  Set Field [ view_UTILITY_LOGS::<Field Missing>; "open" ]
  #OPTIONAL INPUTS:
  Set Field [ view_UTILITY_LOGS::Comment; $comment ]
  Set Field [ view_UTILITY_LOGS::json_Params; $json ]
  #OPTIONAL OUTPUTS:
  Set Field [ view_UTILITY_LOGS::ErrorCode; "0" ]
  ~~// Pause/Resume Script [ Indefinitely ]
  Close Window [ Current Window ]
  #not sure how to implement this part:
  ~~// Set Field [ view_UTILITY_LOGS::<Field Missing>; $fkReport ]
  ~~// Set Field [ view_UTILITY_LOGS::<Field Missing>; "open" ]
  #- EOF -

## Show ALL or NONE
  #---
  #EXPECTED: mode: ALL | NONE
  #---
  Set Error Capture [ On ]
  Allow User Abort [ Off ]
  Set Variable [ $param; Value:Get(ScriptParameter) ]
  Set Variable [ $mode; Value:ParamGetText ( $param ; "mode" ; "abort" ) ]
  If [ $mode = "ALL" ]
  Show All Records
  Else If [ $mode = "NONE" or $mode = "none" or $mode = "None" or $mode = "N" or $mode = "n" ]
  Show All Records
  Show Omitted Only
  ~~// Show Custom Dialog [ Title: "None"; Default Button: “OK”, Commit: “Yes” ]
  Else If [ $mode = "abort" ]
  Exit Script [ Result: Param ( List ( PText ( "error" ; "No mode passed. Won't assume." ) ; PNum ( "pass" ; 0 ) ) ) ]
  Else
  Exit Script [ Result: Param ( List ( PText ( "error" ; "Failed to load $mode" ) ; PNum ( "pass" ; 0 ) ) ) ]
  End If

## status_index_move
  #---
  #REQUIRED: VALUE LIST
  #EXPECTING: "mode" "next, previous, first, or last" in VALUE LIST sort
  #CONDIITON: "curIndex" if "mode" = next or previous
  #---
  Set Error Capture [ On ]
  Allow User Abort [ Off ]
  Set Variable [ $p; Value:Get(ScriptParameter) ]
  Set Variable [ $vl; Value:ParamGetText ( $p ; "vl" ; "abort" ) ]
  If [ $vl = "abort" ]
  Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
  End If
  Set Variable [ $mode; Value:ParamGetText ( $p ; "mode" ; "last" ) ]
  If [ $mode = "next" or $mode = "previous" ]
  Set Variable [ $curIndex; Value:ParamGetText ( $p ; "curIndex" ; "abort" ) ]
  If [ $curIndex = "abort" ]
  Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
  End If
  End If
  Enter Find Mode [ ]
  Set Field [ view_VALUES::fkList; $vl ]
  Perform Find [ ]
  If [ Get ( LastError ) ≠ 0 ]
  Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
  End If
  Sort Records [ Keep records in sorted order; Specified Sort Order: VALUE_LISTS_fVALUES::Sort; ascending ] [ Restore; No dialog ]
  If [ ]
  End If
  #perform script to: find "next, previous, first, or last, in VALUE LIST sort"
  #return FIRST

## exit w/ errors
  #---
  #REQUIRED: VALUE LIST
  #EXPECTING: "next, previous, first, or last, in VALUE LIST sort"
  #---
  Set Error Capture [ On ]
  Allow User Abort [ Off ]
  Set Variable [ $p; Value:Get(ScriptParameter) ]
  Set Variable [ $comment; Value:ParamGetText ( $p ; "comment" ; "" ) ]
  If [ $comment ≠ "" ]
  Show Custom Dialog [ Title: $comment; Message: "Exiting…"; Default Button: “OK”, Commit: “Yes” ]
  End If
  Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]

## button | generate Workdays
  Set Error Capture [ On ]
  #assume on WORKDAYS
  Show All Records
  Set Variable [ $startDate; Value:Date ( 8 ; 6 ; 2026 ) ]
  Set Variable [ $endDate; Value:Date ( 5 ; 14 ; 2027 ) ]
  Set Variable [ $date; Value:$startDate ]
  Loop
  Enter Find Mode [ ]
  Set Field [ view_WORKDAYS::Date; $date ]
  Perform Find [ ]
  If [ Get ( FoundCount ) = 0 ]
  New Record/Request
  Set Field [ view_WORKDAYS::Date; GetAsDate ( $date ) ]
  Else If [ Get ( FoundCount ) > 1 ]
  Perform Script [ <unknown>; Parameter: Param ( List ( PText ( "action" ; "!ERR! " & Get ( ScriptParameter ) ) ; PText ( "comment" ; "Multiple workdays exist for the same date." ) ) ) ]
  Commit Records/Requests [ No dialog ]
  Pause/Resume Script [ Indefinitely ]
  Else
  #if found count == 1
  End If
  Exit Loop If [ $date = $endDate ]
  Set Variable [ $date; Value:$date + 1 ]
  ~~// Go to Record/Request/Page [ Next; Exit after last ]
  End Loop

## sort | fkWorkday date
  #WORKDAYS::Date
  #EVENTS_x_WORKDAYS::Date (local)
  #EVENTS::dateTIme_Start
  Sort Records [ Keep records in sorted order; Specified Sort Order: WORKDAYS::Date; ascending EVENTS_X_WORKDAYS::Date; ascending EVENTS::dateTime_Start; ascending ] [ Restore; No dialog ]

## field auto | enter_Hex update
  Set Field [ view_THEME_COLORS::enter_Hex; view_THEME_COLORS::Hex_autoCalc ]

## refresh | auto fields
  Set Error Capture [ On ]
  ~~// Show Custom Dialog [ Title: "Enter field name:"; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No”; Input #1: $field, "Field to use:" ]
  ~~//
  ~~// Set Field By Name [ $field; Get ( ActiveFieldContents ) ]
  ~~// Set Variable [ ]
  Go to Record/Request/Page [ First ]
  Loop
  Go to Next Field
  Set Field [ Get ( ActiveFieldContents ) ]
  Commit Records/Requests [ No dialog ]
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop

## set | Document PRODUCTION from MATRIX
  Set Variable [ $fkCurDOC; Value:DOCUMENTS::PrimaryKey ]
  Set Variable [ $param; Value:Get ( ScriptParameter ) ]
  If [ IsEmpty ( $param ) ]
  Show Custom Dialog [ Title: "Bye."; Message: "ASSIGN A PRODUCTION!"; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ ]
  Else
  ~~// Show Custom Dialog [ Title: "Current PK."; Message: $param; Default Button: “OK”, Commit: “Yes” ]
  End If
  Set Field [ DOCUMENT_INSTANCES::fkProduction; $param ]
