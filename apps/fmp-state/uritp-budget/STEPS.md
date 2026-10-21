---
status: hidden
type: reference
generated: fmp-state
---

# URITP Budget.fmp12 · SCRIPT STEPS
Source drop: `zFMP-drops/URITP Budget_fmp12.xml` · disabled steps prefixed ~~

## lastWindowClose
  Set Field [ GLOBAL_USE_VARIABLES::script_LastSaved; Get ( CurrentTimestamp ) ]
  Commit Records/Requests [ No dialog ]
  Perform Script [ “save zBACKUP | File” ]

## firstWindowOpen
  Set Variable [ ]

## save zBACKUP | File
  Show Custom Dialog [ Message: "Save a backup?"; Default Button: “Save”, Commit: “Yes”; Button 2: “No”, Commit: “No” ]
  If [ Get ( LastMessageChoice ) = 2 ]
  Exit Script [ ]
  End If
  #get filapath in real time for sanity | don't rely on a variable
  Set Variable [ $path; Value:Get ( FilePath ) ]
  #strip filename to get parent directory
  Set Variable [ $dir; Value:Left ( $path ; Position ( $path ; "/" ; Length ( $path ) ; -1 ) ) ]
  #Timestamp for the backup name
  Set Variable [ $ts; Value:Year ( Get ( CurrentDate ) ) & "" & Right("0" & Month ( Get ( CurrentDate ) ) ; 2 ) & "" & Right("0" & Day ( Get ( CurrentDate ) ) ; 2 ) & "_" & Right("0" & Hour ( Get ( Cur…
  #build the backup destination
  Set Variable [ $File; Value:$dir & "zBACKUPS/" & Substitute ( ui_GLOBAL_BudgetHub::APP_TITLE ; " " ; "" ) & "_" & $ts & ".fmp12" ]
  #Save the file
  Save a Copy as [ “$File”; Create folders:Yes ] [ copy of current file ]

## enter | GLOBAL SETUP
  Perform Script [ “set G | FILE RECORD STATS” ]

## set G | FILE RECORD STATS
  Set Field [ GLOBAL_USE_VARIABLES::script_Stats_RecordCounts; "Budget Codes: " & ExecuteSQL ( "SELECT COUNT(*) FROM \"Budget_Codes\"" ; "" ; "" ) ]

## set G | SELECTED CODE
  Set Variable [ $pk; Value:Get ( ScriptParameter ) ]
  If [ IsEmpty ( $pk ) ]
  Show Custom Dialog [ Message: "No pk passed."; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ ]
  End If
  Set Field [ ui_GLOBAL_BudgetHub::g_fkSelectedCode; $pk ]

## set G | SELECTED Version from gFY
  If [ Get ( ScriptParameter ) ]
  Set Variable [ $fy; Value:Get ( ScriptParameter ) ]
  Else
  Set Variable [ $fy; Value:ui_GLOBAL_BudgetHub::g_fkSelectedFiscalYear ]
  End If
  If [ IsEmpty ( $fy ) ]
  Show Custom Dialog [ Message: "No fiscal year."; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ ]
  End If
  Set Field [ ui_GLOBAL_BudgetHub::g_fkSelectedCode; $pk ]

## select | g FISCAL YEAR
  Commit Records/Requests [ No dialog ]
  Perform Script [ “set G | SELECTED Version from gFY”; Parameter: ui_GLOBAL_BudgetHub::g_fkSelectedFiscalYear ]

## navi | Select Code
  If [ IsEmpty ( Get ( ScriptParameter ) ) ]
  Set Variable [ $pkCode; Value:BudgetCode_Defintions::PrimaryKey ]
  Show Custom Dialog [ Title: "No pk passed."; Message: "Using: " & $pk; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
  If [ Get ( LastMessageChoice ) = 2 ]
  Exit Script [ ]
  End If
  Else
  Set Variable [ $pkCode; Value:Get ( ScriptParameter ) ]
  End If
  Perform Script [ “set G | SELECTED CODE”; Parameter: $pkCode ]
  Refresh Window [ Flush cached join results; Flush cached external data ]

## Create_New_URF_Import
  #============================================================
  #SCRIPT: IMPORT__URF__New_Set (working file: Create_New_URF_Import)
  #ROLE: Orchestrator (Option B, keep thin): full URF0985 monthly intake
  #CALLED BY: "Import New Set" header button on the URF Raw Import Workbench
  #CALLS: IMPORT__URF__Create_Session -> IMPORT__URF__Preflight_Profile ->
  # IMPORT__URF__Stamp_Imported_FoundSet -> IMPORT__URF__Clean_First_Pass ->
  # IMPORT__URF__Classify_Current_Session -> IMPORT__URF__Open_Current_Session_Workbench
  # (UI util: new_square_window)
  #------------------------------------------------------------
  #INPUTS (script parameter): none for v1
  #GLOBALS IN: (optional) current fiscal-year global if set elsewhere
  #------------------------------------------------------------
  #RETURNS (Exit Script, JSON per convention):
  # { "ok": true, "status": "done" } full chain completed
  # { "ok": false, "status": "cancelled" } user cancelled
  # { "ok": false, "status": "preflight_failed", "error": <notes> }
  #GLOBALS OUT (set via Create_Session):
  # GLOBAL_USE_VARIABLES::g_fkImportURFSession = new session PK
  # GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession = new session PK
  # GLOBAL_USE_VARIABLES::g_tempImportContainer = selected file (CLEARED on exit)
  #SIDE EFFECTS: creates 1 session + N raw URF_IMPORT_ROWS rows; lands on workbench
  #============================================================
  #--- SETUP / SAFETY -----------------------------------------
  Allow User Abort [ Off ]
  Set Error Capture [ On ]
  Set Variable [ $layoutName; Value:Get ( LayoutName ) ]
  #JSON in (optional in v1)
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Commit Records/Requests [ No dialog ]
  ~~// Freeze Window
  Set Variable [ $SessionLabel; Value:"Auto import URF 0985" ]
  Show Custom Dialog [ Message: "Beginning import session: " & $SessionLabel & ". With or without file upload?"; Default Button: “Without”, Commit: “Yes”; Button 2: “Abort”, Commit: “No”; Button 3: “Wi…
  #Buttons: 1 = without file , 2 = cancel , 3 = with file
  If [ Get ( LastMessageChoice ) = 2 ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "status" ; "cancelled" ) ) ) ]
  End If
  If [ Get ( LastMessageChoice ) = 3 ]
  Set Variable [ $wFileUpload; Value:PBool ( "wFileUpload" ; 1 ) ]
  Else
  Set Variable [ $wFileUpload; Value:PBool ( "wFileUpload" ; 0 ) ]
  End If
  If [ not IsEmpty ( $customName ) ]
  #rename the session
  Set Variable [ $sessionLabel; Value:$customName ]
  End If
  #--- RESET GLOBALS (preserve prior selection for safe return)
  Set Variable [ $currentSelected; Value:GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession ]
  Set Field [ GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession; "" ]
  Set Field [ GLOBAL_USE_VARIABLES::g_fkImportURFSession; "" ]
  Set Field [ GLOBAL_USE_VARIABLES::g_tempImportContainer; "" ]
  Commit Records/Requests [ No dialog ]
  Perform Script [ “new_square_window”; Parameter: Param ( List ( PText ( "mode" ; "max" ) ; PNum ( "max" ; 400 ) ) ) ]
  #--- 1. CREATE SESSION (helper sets the session globals) ----
  Perform Script [ “IMPORT_URF_Create_Session”; Parameter: Param ( List ( 1 ; $wFileUpload ; PText ( "sessionLabel" ; $sessionLabel ) ) ) ]
  ~~// Exit Script [ Result: Param ( List ( PBool ( "ok" ; 1 ) ; "sessionPK" ; $sessionPK ) ) ]
  Set Variable [ $return_create; Value:Get ( ScriptResult ) ]
  Set Variable [ $ok; Value:ParamGetText ( $return_create ; "ok" ; 0 ) ]
  If [ $ok = 0 ]
  Set Variable [ $message; Value:ParamGetText ( $return_create ; "error" ; "unkown error" ) ]
  Show Custom Dialog [ Title: "Import failed."; Message: $message; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ ]
  End If
  #--- 2. PREFLIGHT against the locked URF0985 profile --------
  Perform Script [ “IMPORT_URF_Preflight_Profile”; Parameter: Param ( List ( PText ( "sessionPK" ; $sessionPK ) ) ) ]
  #Preflight reads the file from g_tempImportContainer + resolves the session by PK.
  Set Variable [ $return_preflight; Value:Get ( ScriptResult ) ]
  If [ ParamGetBoolean ( $return_preflight ; "ok" ; 0 ) = 0 ]
  Set Variable [ $message; Value:JSONGetElement ( $return_preflight ; "error" ) ]
  Go to Layout [ “(table) Import SESSIONS URF” (IMPORT_SESSIONS) ]
  Enter Find Mode [ ]
  Set Field [ IMPORT_SESSIONS::PrimaryKey; $sessionPK ]
  Perform Find [ ]
  Show Custom Dialog [ Title: "Preflight failed."; Message: "$message" & Char(13) & Char(13) & Char(13) & "Delete created session?"; Default Button: “Yes”, Commit: “Yes”; Button 2: “Save it”, Commit: “…
  If [ Get ( FoundCount ) = 1 ]
  If [ Get ( LastMessageChoice ) = 1 ]
  Delete Record/Request
  Else
  Set Field [ IMPORT_SESSIONS::Notes; $message ]
  Set Field [ IMPORT_SESSIONS::fkSessionStatus; "preflight_failed" ]
  Perform Script [ “commitRecord” ]
  Show All Records
  End If
  Close Window [ Current Window ]
  Exit Script [ ]
  End If
  End If
  ~~// Go to Layout [ “(table) Import URF LINES Excel” (URF_IMPORT_ROWS) ]
  ~~// Omit Multiple Records [ URF_IMPORT_ROWS::PrimaryKey ] [ No dialog ]
  ~~// Perform Script [ “Omit_all” ]
  #--- 3. IMPORT into the raw rows table (locked URF0985 order)
  Perform Script [ “IMPORT_rows_to_URF0985” ]
  #Import Records leaves the newly imported records as the current found set.
  #--- 4. HELPER CHAIN over the imported found set ------------
  #Classify rolls up the status counts onto the parent session record.
  #--- 5. LAND on the workbench (globals point at this session)
  ~~// Go to Layout [ original layout ]
  #=== EOF ========================================================

## IMPORT_URF_Create_Session
  #SCRIPT: IMPORT__URF__Create_Session (working file: IMPORT_URF_Create_Session)
  #ROLE: Helper: create one fresh URF_IMPORT_SESSIONS parent + activate it
  #CALLED BY: IMPORT__URF__New_Set
  #CALLS: (none)
  #------------------------------------------------------------
  #INPUTS (script parameter, JSON, all optional in v1):
  # sourceFileName text original workbook file name (if overriding auto)
  # sessionLabel text e.g. "FY27-02 URF0985 import"
  # fiscalYearPK text FK -> eds_Fiscal_Years
  # reportMonthEnd date month-end this pull represents
  # sessionStatus text
  # wFileUploade bool 0 / 1
  #GLOBALS IN: (none required)
  #------------------------------------------------------------
  #RETURNS (Exit Script, JSON per convention):
  # { "ok": true, "sessionPK": <new PK> }
  # { "ok": false, "error": <message> } (on record-create failure)
  #GLOBALS OUT:
  # GLOBAL_USE_VARIABLES::g_fkImportURFSession = new session PK
  # GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession = new session PK
  #SIDE EFFECTS: creates + commits exactly one URF_IMPORT_SESSIONS record
  #============================================================
  #--- SETUP --------------------------------------------------
  Set Error Capture [ On ]
  #JSON in (optional in v1)
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $wFileUpload; Value:JSONGetElement ( $p ; "wFileUpload" ) ]
  Go to Layout [ “(table) Import SESSIONS URF” (IMPORT_SESSIONS) ]
  Perform Script [ “Omit_all” ]
  #--- 1-2. NEW SESSION RECORD --------------------------------
  New Record/Request
  Commit Records/Requests [ No dialog ]
  If [ Get ( LastError ) ≠ 0 ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "error" ; "could not create session record" )) ) ]
  End If
  Set Variable [ $sessionPK; Value:IMPORT_SESSIONS::PrimaryKey ]
  #--- 4-5. CAPTURE PK into the session globals ---------------
  Set Field [ GLOBAL_USE_VARIABLES::g_fkImportURFSession; $sessionPK ]
  Set Field [ GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession; $sessionPK ]
  #--- RETREIVE REFERENCE FILE --------------------------------
  Insert File [ $importFile ] [ Storage method: Reference ] [ Display icon ] [ Compression: Never compress ]
  If [ Get ( LastError ) = 1 ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "error" ; "File selection error." ) ) ) ]
  End If
  Set Field [ GLOBAL_USE_VARIABLES::g_tempImportContainer; $importFile ]
  #--- 3. POPULATE metadata (helper readers w/ defaults) ------
  If [ $wFileUpload = 1 ]
  Set Field [ IMPORT_SESSIONS::OriginalFile; $importFile ]
  End If
  Set Field [ IMPORT_SESSIONS::SessionLabel; ParamGetText ( $p ; "sessionLabel" ; "Import " & GetAsText ( Get ( CurrentDate ) ) ) ]
  Set Field [ IMPORT_SESSIONS::fkFiscalYear; ParamGetText ( $p ; "fiscalYearPK" ; eds_URITP_GLOBAL_Variables::fkCURRENT_FISCAL_YEAR ) ]
  Set Field [ IMPORT_SESSIONS::ReportMonthEnd; ParamGetText ( $p ; "reportMonthEnd" ; "" ) ]
  Set Field [ IMPORT_SESSIONS::fkSessionStatus; ParamGetText ( $p ; "sessionStatus" ; "" ) ]
  Set Field [ IMPORT_SESSIONS::auto_Filename; ParamGetText ( $p ; "sourceFileName" ; IMPORT_SESSIONS::auto_Filename ) ]
  Set Field [ IMPORT_SESSIONS::ImportTimestamp; Get ( CurrentTimestamp ) ]
  #--- 6-7. COMMIT and return JSON to the caller --------------
  Commit Records/Requests [ No dialog ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 1 ) ; "sessionPK" ; $sessionPK ) ) ]
  #=== EOF ========================================================

## IMPORT_URF_Preflight_Profile
  #============================================================
  #SCRIPT: IMPORT_URF_Preflight_Profile
  #ROLE: Light pre-import gate: confirm a file is present + correct type
  # on the active session before Import Records runs (v1).
  #CALLED BY: Create_New_URF_Import (after Create_Session, before Import Records)
  #CALLS: (none)
  #------------------------------------------------------------
  #INPUTS (script parameter, JSON):
  # sessionPK text default = GLOBAL_USE_VARIABLES::g_fkImportURFSession
  # expectedProfile text default "URF0985"
  # expectedSheet text optional; sheet name we EXPECT (see sheet note)
  #GLOBALS IN:
  # GLOBAL_USE_VARIABLES::g_fkImportURFSession (fallback session PK)
  # GLOBAL_USE_VARIABLES::g_tempImportContainer (the selected file — read here)
  #------------------------------------------------------------
  #RETURNS (Exit Script, JSON per convention):
  # { "ok": true, "result": "pass", "profile": "URF0985" }
  # { "ok": false, "result": "fail", "notes": <plain-language reason> }
  #GLOBALS OUT: (none)
  #SIDE EFFECTS: none (does NOT import, does NOT write rows). May leave the
  # session record found; caller owns marking preflight_failed.
  #============================================================
  #--- SETUP --------------------------------------------------
  Set Error Capture [ On ]
  #JSON in (optional in v1)
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $sessionPK; Value:JSONGetElement ( $p ; "sessionPK" ) ]
  Set Variable [ $sessionPK; Value:ParamGetText ( $p ; "sessionPK" ; GLOBAL_USE_VARIABLES::g_fkImportURFSession ) ]
  Set Variable [ $expectedProfile; Value:ParamGetText ( $p ; "expectedProfile" ; "URF0985" ) ]
  Set Variable [ $expectedProfile; Value:ParamGetText ( $p ; "expectedSheet" ; "" ) ]
  #--- RESOLVE THE ACTIVE SESSION RECORD ----------------------
  #why do this step at all?????
  #--- 1. FILE PRESENT? ---------------------------------------
  Set Variable [ $file; Value:GLOBAL_USE_VARIABLES::g_tempImportContainer ]
  If [ IsEmpty ( $file ) ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "result" ; "fail" ) ; PText ( "error" ; MSG_PreflightErrors ( "sourceFileLocationError" ) ) ) ) ]
  End If
  #--- 2. CORRECT FILE TYPE? ----------------------------------
  Set Variable [ $fileName; Value:GetContainerAttribute ( $file ; "filename" ) ]
  Set Variable [ $ext; Value:Lower ( RightWords ( Substitute ( $fileName ; "." ; " " ) ; 1 ) ) ]
  If [ not ($ext = "xlsx" or $ext = "xls") ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "result" ; "fail" ) ; PText ( "error" ; MSG_PreflightErrors ( "fileTypeError" ) & Char(13) & "Received: " & $fileName ) ) ) ]
  End If
  #--- 3. EXPECTED SHEET (best-effort; see sheet note) --------
  ## v1 cannot enumerate xlsx sheet names by calc before import.
  ## If $expectedSheet is provided, this is documented intent only;
  ## real sheet/header confirmation happens at the import step or via
  ## the future peek table. Left as a pass-through in v1.
  #--- PASS ---------------------------------------------------
  If [ ParamGetBoolean ( $ScriptResult ; "ok" ; 0 ) = 0 ]
  Set Variable [ $message; Value:JSONGetElement ( $return_preflight ; "error" ) ]
  End If
  #--- COMMIT and return JSON to the caller --------------
  Commit Records/Requests [ No dialog ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 1 ) ; PText ( "result" ; "passed" ) ; PText ( "profile" ; $expectedProfile ) ) ) ]
  #=== EOF ========================================================

## IMPORT_rows_to_URF0985
  Go to Layout [ “(table) Import URF LINES Excel” (URF_IMPORT_ROWS) ]
  Perform Script [ “Omit_all” ]
  #--- GUARD: file present in the global ----------------------
  If [ IsEmpty ( GLOBAL_USE_VARIABLES::g_tempImportContainer ) ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "status" ; "no_file" ) ; PText ( "error" ; "g_tempImportContainer is empty." ) ) ) ]
  End If
  #--- 1. EXPORT container -> temp path (Import can't read a container)
  #CONSTANT filename (not the source filename). A stable path is what lets the
  #saved field map keep a target every run. Import cannot read a container.
  Set Variable [ $FilePath; Value:Get ( TemporaryPath ) & "URF_0985_import.xlsx" ]
  Show Custom Dialog [ Title: "Exporting file."; Message: $FilePath; Default Button: “OK”, Commit: “Yes” ]
  If [ Get ( LastError ) ≠ 0 ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "status" ; "export_failed" ) ; PText ( "error" ; "Export to temp failed, code " & Get ( LastError ) ) ) ) ]
  End If
  Export Field Contents [ GLOBAL_USE_VARIABLES::g_tempImportContainer; “$FilePath”; Create folders:Yes ]
  #--- 2. IMPORT from the temp path using the locked URF0985 map
  #The saved field map + worksheet live ON this step. Build it ONCE against a
  #real file (worksheet "URF0985 Transaction Details Pri...", 30-col positional,
  #Add), THEN swap Source to $FilePath. Dialog OFF + arrange by LAST order so
  #FileMaker does NOT remap by name at runtime. Do not reopen the map dialog.
  ~~// Import Records [ "URF0985_Transaction_Details_Printable_(NCL) (3) copy.xlsx"; Worksheet: "URF0985 Transaction Details Pri"; Fields Name Row: 0; Target: “URF_IMPORT_ROWS”; Method: Add; Character Se…
  ~~// Import Records [ Source: “$FilePath”; Target: “URF_IMPORT_ROWS”; Method: Add; Character Set: “Mac Roman”; Field Mapping: Source field 1 import to URF_IMPORT_ROWS::source_Company; Source field 2 im…
  Import Records [ "$FilePath"; Worksheet: ""; Fields Name Row: 0; Target: “URF_IMPORT_ROWS”; Method: Add; Character Set: “Mac Roman”; Field Mapping: Source field 1 import to URF_IMPORT_ROWS::source_Co…
  If [ Get ( LastError ) ≠ 0 ]
  Delete File [ Target file: “$FilePath” ]
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "status" ; "import_failed" ) ; PText ( "error" ; "Import failed, code " & Get ( LastError ) ) ) ) ]
  End If
  Set Variable [ $rows; Value:Get ( FoundCount ) ]
  #--- 3. CLEANUP: remove the exported temp file --------------
  ~~// Delete File [ Target file: “$FilePath” ]
  ~~// Show Custom Dialog [ Message: "Exiting Import_Rows"; Default Button: “OK”, Commit: “Yes” ]
  #--- PASS ---------------------------------------------------
  Exit Script [ Result: Param ( List ( PBool ( "ok" ; 1 ) ; PText ( "status" ; "imported" ) ; PNum ( "rows" ; $rows ) ) ) ]

## Recompute_URF_Fingerprints

## Omit_all
  Show All Records
  Go to Record/Request/Page [ No dialog; First ]
  Omit Multiple Records [ Get ( FoundCount ) ] [ No dialog ]

## new_square_window
  Set Variable [ $defaultSize; Value:400 ]
  Set Variable [ $defaultHeight; Value:$defaultSize ]
  Set Variable [ $defaultWidth; Value:$defaultSize ]
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $mode; Value:JSONGetElement ( $p ; "mode" ) ]
  If [ IsEmpty ( $mode ) or $mode = "default" ]
  New Window [ Style: Document; Using layout: <Current Layout>; Height: $defualtHeight; Width: $defaultWidth; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No…
  End If
  If [ PatternCount ( $mode ; "max" ) ]
  Set Variable [ $max; Value:JSONGetElement ( $p ; "max" ) ]
  New Window [ Style: Document; Using layout: <Current Layout>; Height: Max ( $defualtHeight ; $max ; Get ( WindowHeight ) - 80 ); Width: Max ( $defaultWidth ; $max ; Get ( WindowWidth ) - 80); Close: …
  End If

## button_CurrentAllocationPupup
  New Window [ Style: Document; Name: "Current Allocation"; Using layout: <Current Layout>; Height: 800; Width: 1200; Top: 100; Left: 600; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Ba…
  Perform Script [ “goToRelatedAllocations” ]

## showOnly_CurrentAllocation
  Go to Layout [ “(form) Budget Versions” (BUDGET_AllocationVersions) ]
  Enter Find Mode [ ]
  Set Field [ BUDGET_AllocationVersions::PrimaryKey; ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ]
  Perform Find [ ]
  Perform Script [ “goToRelatedAllocations” ]

## goToRelatedAllocations
  Go to Related Record [ From table: “Budget_Allocation”; Using layout: “(Layout) NM Allocation Format” (Budget_Allocation) ] [ Show only related records; New window ]
  Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_Allocation::AllocationWorksheet; based on value list: “NM_AllocationWorksheets” Budget_Allocation::NM_Subtotal; based on valu…

## RefreshCurrentAllocation
  Refresh Portal [ Object Name: "SUMMARY_PORTAL" ]
  ~~// Refresh Portal [ Object Name: "SUMMARY_PORTAL" ]

## assignToCurrent
  If [ IsEmpty ( Budget_Allocation::fkBudgetVersion ) ]
  Set Field [ Budget_Allocation::fkBudgetVersion; ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ]
  End If

## commitSummaryButtonTriggerFY26
  Set Variable [ $ObjectName; Value:"PORTAL_SUMMARY" ]
  ~~// Set Variable [ $Total; Value: GetLayoutObjectAttribute ( $ObjectName ; "content" ) ]
  Set Variable [ $Total; Value: Case ( IsEmpty(Budget_Allocation::SummaryAmountAwarded) ; 0 ; GetLayoutObjectAttribute ( $ObjectName ; "content" ) ) ]
  ~~// Show Custom Dialog [ Title: "Value"; Message: "Value = " & $Total; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
  ~~// Show Custom Dialog [ Title: "Summary Amount"; Message: "Total = " & $Total; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
  Set Field [ BudgetCode_Defintions::xxFY26 Allocation; $Total ]
  Set Field [ BudgetCode_Defintions::_temp; 1 ]

## commitSummaryButtonTrigger CopyFY26
  Go to Object [ Object Name: "PORTAL_SUMMARY" ]
  Set Variable [ $Total; Value: Case ( IsEmpty(Budget_Allocation::SummaryAmountAwarded) ; 0 ; Budget_Allocation::SummaryAmountAwarded ) ]
  ~~// Show Custom Dialog [ Title: "Summary Amount"; Message: "Total = " & $Total; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
  Set Field [ BudgetCode_Defintions::xxFY26 Allocation; $Total ]

## COMMIT_ALL
  Set Variable [ $return; Value:BudgetCode_Defintions::PrimaryKey ]
  Go to Record/Request/Page [ First ]
  Loop
  Perform Script [ “commitSummaryButtonTriggerFY26” ]
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop
  Enter Find Mode [ ]
  Set Field [ BudgetCode_Defintions::PrimaryKey; $return ]
  Perform Find [ ]
  Show All Records
  Perform Script [ “SORT_BudgetCodes” ]

## SORT_BudgetCodes
  Sort Records by Field [ Ascending; BudgetCode_Defintions::Default Code ]

## showUNASSIGNED
  Show All Records
  Enter Find Mode [ ]
  ~~// Go to Field [ URF_IMPORT_ROWS::source_Amount ]
  Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; "=" ]
  Perform Find [ ]

## showUNASSIGNED Copy
  Show All Records
  Enter Find Mode [ ]
  ~~// Go to Field [ URF_IMPORT_ROWS::source_Amount ]
  Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; "=" ]
  Perform Find [ ]
  Show Omitted Only

## assignCODE
  Set Variable [ ]

## useSelectedCode
  Set Variable [ $selectedCode; Value:Code_Definitions::PrimaryKey ]
  ~~// Show Custom Dialog [ Title: "pk Budget Code"; Message: "pk: " & $selectedCode; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
  Close Window [ Current Window ]
  #and then add that P.K. to the record
  Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; $selectedCode ]

## goToCode
  Set Variable [ $code; Value:Get(ScriptParameter) ]
  Enter Find Mode [ ]
  Set Field [ Code_Definitions::Default Code; $code ]
  Perform Find [ ]
  Show All Records
  Sort Records by Field [ Ascending ]
  ~~// Scroll Window [ End ]
  ~~// Pause/Resume Script [ Duration (seconds): .25 ]
  Scroll Window [ To Selection ]

## POPUP_selectCODE
  Set Variable [ $returnID; Value:URF_IMPORT_ROWS::PrimaryKey ]
  New Window [ Style: Card; Name: "BUDGET CODES"; Using layout: “CodeSelectionPOPUP” (Code_Definitions); Height: 800; Close: Yes; Minimize: No; Maximize: No; Resize: No; Menu Bar: No; Dim parent window…
  Show All Records
  Sort Records [ Keep records in sorted order; Specified Sort Order: Code_Definitions::Default Code; ascending ] [ Restore; No dialog ]
  Enter Find Mode [ ] [ Pause ]

## goToCodedTransactions
  Set Variable [ $pkCode; Value:<Table Missing>::<Field Missing> ]
  New Window [ Style: Dialog; Name: "Code"; Using layout: “(form) CODED Transactions” (Code_Definitions); Height: 800; Width: 800; Top: 200; Left: 200; Close: Yes; Minimize: No; Maximize: Yes; Resize: …
  ~~// Go to Layout [ “(form) CODED Transactions” (Code_Definitions) ]
  Enter Find Mode [ ]
  ~~// Go to Field [ Code_Definitions::Default Name ]
  Set Field [ Code_Definitions::PrimaryKey; $pkCode ]
  Perform Find [ ]

## printAllCodeFormats
  ~~// Freeze Window
  Perform Script [ “SortedbyHeader” ]
  #setup 8.5x11 portrai
  Enter Preview Mode
  Save Records as PDF [ Create folders:Yes ]
  Enter Browse Mode
  Perform Script [ “SortedbyCode10” ]
  #setup 8.5x11 portrai
  Enter Preview Mode
  Save Records as PDF [ Create folders:Yes ]
  Enter Browse Mode
  Perform Script [ “SortbyCode100” ]
  #setup 8.5x11 portrai
  Enter Preview Mode
  Save Records as PDF [ Create folders:Yes ]
  Enter Browse Mode

## Layout #29
  Enter Browse Mode
  Go to Layout [ “CODED Ledgers” (URF_IMPORT_ROWS) ]

## SortbyCode100
  Show All Records
  Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; ascending <Table Missing>; ascending ] [ Restore; No dialog ]
  Set Field [ XX_GLOBAL_PrintingVariables::xx_CodeSortedBy; "Groups of 100" ]

## SortedbyCode10
  Show All Records
  Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; ascending <Table Missing>; ascending ] [ Restore; No dialog ]
  Set Field [ XX_GLOBAL_PrintingVariables::xx_CodeSortedBy; "Groups of 10" ]

## SortedbyCode10 Copy
  Show All Records
  Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; ascending ] [ Restore; No dialog ]
  Set Field [ XX_GLOBAL_PrintingVariables::xx_CodeSortedBy; "Code Number" ]

## SortedbyHeader
  Show All Records
  Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; based on value list: “(popup) Code HEADERS” ] [ Restore; No dialog ]
  Set Field [ XX_GLOBAL_PrintingVariables::xx_CodeSortedBy; "Header Category" ]

## REPLACE_fkBudgetCode
  Replace Field Contents [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; Current contents ]

## COPY_code
  Set Variable [ $fk; Value:URF_IMPORT_ROWS::xxfkBUDGET_CODE ]
  Set Field [ <Table Missing>; $fk ]

## PASTE_code
  Set Variable [ $fk; Value:<Table Missing>::<Field Missing> ]
  Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; $fk ]

## buttonPassCodeNum
  Set Variable [ $code; Value:Get(ScriptParameter) ]
  Set Variable [ $fk; Value:0 ]
  Freeze Window
  Go to Layout [ “(table) URITP Budget Codes” (BudgetCode_Defintions) ]
  Enter Find Mode [ ]
  Set Field [ BudgetCode_Defintions::Default Code; $code ]
  Perform Find [ ]
  Set Variable [ $fk; Value:BudgetCode_Defintions::PrimaryKey ]
  Show All Records
  Go to Layout [ original layout ]
  Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; $fk ]

## enterLayoutSpecificCodeURF
  Enter Browse Mode
  Go to Layout [ “PRINT CODED TRANSACTIONS” (URF_IMPORT_ROWS) ]
  Sort Records [ Keep records in sorted order; Specified Sort Order: URF_IMPORT_ROWS::xxfkBUDGET_CODE; based on value list: “popup Budget Code Number” URF_IMPORT_ROWS::source_BudgetDate; ascending ] [ …

## FilterSingleCodeASK
  Show Custom Dialog [ Title: "Which code do you want to display?"; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No”; Input #1: $code, "Show code:" ]
  Perform Script [ “getCODEpk”; Parameter: $code ]
  Enter Find Mode [ ]
  Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; GLOBAL_scriptVariables::CODEpk ]
  ~~// Perform Find [ ]
  ~~// Set Variable [ $CODEpk; Value:BudgetCode_Defintions::PrimaryKey ]
  ~~// Go to Layout [ original layout ]
  ~~//
  ~~//
  ~~// Show All Records
  ~~// Enter Find Mode [ ]
  ~~//
  ~~// Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE ]

## getCODEpk
  Set Variable [ $code; Value:Get(ScriptParameter) ]
  Set Field [ GLOBAL_scriptVariables::CODEpk; 0 ]
  Freeze Window
  Go to Layout [ “(table) URITP Budget Codes” (BudgetCode_Defintions) ]
  Enter Find Mode [ ]
  Set Field [ BudgetCode_Defintions::Default Code; $code ]
  Perform Find [ ]
  Set Field [ GLOBAL_scriptVariables::CODEpk; BudgetCode_Defintions::PrimaryKey ]

## New Script

## sortByNMAllocation
  Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_Allocation::AllocationWorksheet; based on value list: “NM_AllocationWorksheets” Budget_Allocation::NM_Subtotal; based on valu…

## BudgetVersionBY_SortOrder
  Sort Records [ Keep records in sorted order; Specified Sort Order: BUDGET_AllocationVersions::SORT_ORDER; descending ] [ Restore; No dialog ]

## findAllocation
  Enter Find Mode [ ]
  Go to Field [ Budget_Allocation::fkBudgetVersion ]
  Pause/Resume Script [ Indefinitely ]
  Perform Find [ ]
  Perform Script [ “sortByNMAllocation” ]

## newAllocationWcurrent
  New Record/Request
  Set Field [ Budget_Allocation::fkBudgetVersion ]

## showOnlyActiveAllocation
  Show All Records
  Set Variable [ $ActiveAllocation; Value:GetAsText ( GetField ( ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ) ) ]
  Show Custom Dialog [ Title: "allocation"; Message: "Current: " & $ActiveAllocation; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
  Perform Find [ Specified Find Requests: Find Records; Criteria: Budget_Allocation::fkBudgetVersion: “$ActiveAllocation” ] [ Restore ]

## DuplicateWRelated
  Set Variable [ $newParentID; Value:BUDGET_AllocationVersions::PrimaryKey ]

## commitRecord
  Set Error Capture [ On ]
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  Set Variable [ $mode; Value:JSONGetElement ( $p ; "mode" ) ]
  If [ PatternCount ( "mode" ; "skipValidation" ) ]
  Commit Records/Requests [ Skip data entry validation; No dialog ]
  Else
  Commit Records/Requests [ No dialog ]
  If [ Get ( LastError ) and ufile_ValueLISTS::enforce_1_to_1 = 1 ]
  Show Custom Dialog [ Message: MSG_ValueListErrors ( "validate_enforce_1_to_1" ) & Char(13) & Char(13) & Char(13) & Char(13) & "Reverting record."; Default Button: “OK”, Commit: “Yes” ]
  Revert Record/Request [ No dialog ]
  End If
  End If

## sort | Budget Code SUFFIXES
  #::Family DIGITS
  #fkContext
  #Digits
  Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_FamilyDefintions::Digits; ascending Budget_ContextSuffixDefinitions_forFiltering::Digits; ascending Budget_ContextDefinitions…

## sort | Budget Code SUFFIXES Copy
  #::Family DIGITS
  #DIGITS
  Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_FamilyDefintions::Digits; ascending Budget_ContextDefinitions_forFiltering::Digit; ascending ] [ Restore; No dialog ]

## sort | Budget Code Assignment Join
  # budget FAMILY digit
  # budget CONTEXT digits
  # budget SUFFIX digits
  Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_FamilyDefintions::Digits; ascending Budget_ContextDefinitions::Digit; ascending Budget_ContextSuffixDefinitions::Digits; asce…

## temp
  Show All Records
  ~~// Go to Field [ BudgetCode_Defintions::Default Name ]
  Go to Record/Request/Page [ First ]
  Loop
  Set Field [ BudgetCode_Defintions::Default Name; BudgetCode_Defintions::Default Name ]
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop
  Go to Record/Request/Page [ First ]

## New Script
  Show All Records
  Go to Record/Request/Page [ First ]
  Loop
  Set Field [ BudgetCode_Defintions::display_CodeCurrent; BudgetCode_Defintions::calc_ExpectedCode ]
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop

## CREATE Budget Code Year Config Snapshot
  #really an UPDATE / RECONCILATION to make a UNIQUE SET OF CODES for the CURRENT FISCAL YEAR.
  #If no config exists for the selected FY, then generate new joins for every found CODE.
  #If fkBudgetCodeDefintiion already exists, update the code for the selected FY
  Set Variable [ $fkFY; Value:GLOBAL_USE_VARIABLES::g_fkSelectedFiscalYear ]
  Show All Records
  Enter Find Mode [ ]
  Set Field [ BudgetCode_YearConfig::fkBudgetCodeDefinition; "*" ]
  Perform Find [ ]
  ~~// Show Omitted Only
  Sort Records [ Keep records in sorted order; Specified Sort Order: BudgetCode_YearConfig::Code_snapshot; ascending ] [ Restore; No dialog ]
  Go to Record/Request/Page [ First ]
  Set Variable [ $i; Value:0 ]
  Set Variable [ $made; Value:0 ]
  Loop
  Set Variable [ $i; Value:$i+1 ]
  Set Variable [ $fkCodeConfig; Value:BudgetCode_YearConfig::PrimaryKey ]
  Set Variable [ $fkCodeConfig; Value:BudgetCode_YearConfig::PrimaryKey ]
  Freeze Window
  Go to Layout [ “(table) Generate Budget Codes” (BudgetCode_Defintions) ]
  Enter Find Mode [ ]
  Set Field [ BudgetCode_Defintions::PrimaryKey; $fkCodeDef ]
  Perform Find [ ]
  Go to Record/Request/Page [ Next; Exit after last ]
  End Loop

## CHECK BudgetCodeDef
  #really an UPDATE / RECONCILATION to make a UNIQUE SET OF CODES for the CURRENT FISCAL YEAR.
  #If no config exists for the selected FY, then generate new joins for every found CODE.
  #If fkBudgetCodeDefintiion already exists, update the code for the selected FY
  Freeze Window
  Go to Layout [ original layout ]

## sort | Budget Allocation VERSIONS
  #fk FISCAL YEAR::YEAR
  #DATE RECEIVED
  #SORT ORDER
  Sort Records [ Keep records in sorted order; Specified Sort Order: Fiscal_Years_forBudgetVersions::StartDate; descending BUDGET_AllocationVersions::DateReceived; descending BUDGET_AllocationVersions:…
