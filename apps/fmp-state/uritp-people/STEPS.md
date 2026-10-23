---
status: hidden
type: reference
generated: fmp-state
---

# URITP People.fmp12 · SCRIPT STEPS
Source drop: `apps/zFMP-drops/URITP People_fmp12.xml` · disabled steps prefixed ~~

## API test
  Go to Layout [ “table | xt_SYSTEMS” (xt_SYSTEMS) ]
  Enter Find Mode [ ]
  Set Field [ xt_SYSTEMS::Name; "ClickUp" ]
  Perform Find [ ]
  Set Variable [ $token; Value:xt_SYSTEMS::Token ]
  Set Variable [ $baseURL; Value:xt_SYSTEMS::BaseURL ]
  Set Variable [ $url; Value:$baseURL & "/view/" & "12cwjm-66873" & "/task?page=0" ]
  Insert from URL [ $r; $url; cURL options: "--header " & Quote ( "Authorization: " & $token ) ] [ Select; No dialog; Verify SSL Certificates ]
  Show Custom Dialog [ Title: "ClickUp Test"; Message: "Tasks: " & ValueCount ( JSONListKeys ( $r ; "tasks" ) ) & ¶ & "last_page: " & JSONGetElement ( $r ; "last_page" ) & ¶ & Left ( $r ; 300 ); Defaul…

## PEOPLE_Pull
  #PEOPLE_Pull
  #Button: Import from ClickUp.
  #Pulls the PEOPLE view into import_CRM, writes import_RECONCILE rows, opens Reconcile People.
  #Changes nothing in URITP_PEOPLE. PEOPLE_Apply does that.
  Set Error Capture [ On ]
  Allow User Abort [ Off ]
  Freeze Window
  Set Variable [ $origLayout; Value:Get ( LayoutName ) ]
  #1. Token from App_Setup, view from the import_SOURCES row named PEOPLE. SQL text is built from GetFieldName, so renames follow.
  Set Variable [ $sqlToken; Value:Let ( [ ~t = Substitute ( GetFieldName ( <Table Missing>::<Field Missing> ) ; "::" ; ¶ ) ] ; "SELECT \"" & GetValue ( ~t ; 2 ) & "\" FROM \"" & GetValue ( ~t ; 1 ) & "…
  Set Variable [ $token; Value:ExecuteSQL ( $sqlToken ; "" ; "" ) ]
  If [ IsEmpty ( $token ) or Left ( $token ; 1 ) = "?" or ValueCount ( $token ) > 1 ]
  Show Custom Dialog [ Title: "Import from ClickUp"; Message: "App_Setup needs exactly one record, with a clickUp API token."; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ Result: 0 ]
  End If
  Set Variable [ $sqlSource; Value:Let ( [ ~v = Substitute ( GetFieldName ( sync_SOURCES::xt_ViewPath ) ; "::" ; ¶ ) ; ~k = Substitute ( GetFieldName ( sync_SOURCES::PrimaryKey ) ; "::" ; ¶ ) ; ~n = Su…
  Set Variable [ $src; Value:ExecuteSQL ( $sqlSource ; ¶ ; "|" ; "PEOPLE" ) ]
  If [ IsEmpty ( $src ) or Left ( $src ; 1 ) = "?" or PatternCount ( $src ; "|" ) > 0 or IsEmpty ( GetValue ( $src ; 1 ) ) ]
  Show Custom Dialog [ Title: "Import from ClickUp"; Message: "import_SOURCES needs exactly one row named PEOPLE, with a clickUp view ID."; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ Result: 0 ]
  End If
  Set Variable [ $viewID; Value:GetValue ( $src ; 1 ) ]
  Set Variable [ $sourceID; Value:GetValue ( $src ; 2 ) ]
  #2. Open a session
  Go to Layout [ “table | sync_SESSIONS” (sync_SESSIONS) ]
  New Record/Request
  Set Field [ sync_SESSIONS::fk_Source; $sourceID ]
  Set Field [ sync_SESSIONS::<Field Missing>; $viewID ]
  Commit Records/Requests [ No dialog ]
  Set Variable [ $session; Value:sync_SESSIONS::PrimaryKey ]
  #3. ClickUp custom field ids on the PEOPLE list
  Set Variable [ $cfLegalFirstName; Value:"b8397952-bcaf-423d-a182-62bc152cf160" ]
  Set Variable [ $cfLastName; Value:"4e8a61ba-3162-4e9a-89fd-9fe0e24fad8e" ]
  Set Variable [ $cfAltName; Value:"d5cba607-c034-4eb3-a699-9f5a3f4a4144" ]
  Set Variable [ $cfPronouns; Value:"da51a70d-2beb-46eb-ba14-2d46ac37004b" ]
  #4. Page through the view, 30 tasks a page, one staged row per task
  Set Variable [ $curl; Value:"--header " & Quote ( "Authorization: " & $token ) ]
  Set Variable [ $page; Value:0 ]
  Set Variable [ $pulled; Value:0 ]
  Go to Layout [ <unknown> ]
  Loop
  Set Variable [ $url; Value:"https://api.clickup.com/api/v2/view/" & $viewID & "/task?page=" & $page ]
  Insert from URL [ $response; $url; cURL options: $curl ] [ Select; No dialog; Verify SSL Certificates ]
  Set Variable [ $err; Value:Get ( LastError ) ]
  Set Variable [ $cuErr; Value:JSONGetElement ( $response ; "err" ) ]
  If [ $err ≠ 0 or not IsEmpty ( $cuErr ) or Left ( JSONFormatElements ( $response ) ; 1 ) = "?" ]
  Set Variable [ $msg; Value:"ClickUp page " & $page & " failed. FileMaker error " & $err & ". " & $cuErr ]
  Go to Layout [ “table | sync_SESSIONS” (sync_SESSIONS) ]
  Set Field [ sync_SESSIONS::<Field Missing>; $msg ]
  Commit Records/Requests [ No dialog ]
  Go to Layout [ $origLayout ]
  Show Custom Dialog [ Title: "Import from ClickUp"; Message: $msg; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ Result: 0 ]
  End If
  Set Variable [ $n; Value:ValueCount ( JSONListKeys ( $response ; "tasks" ) ) ]
  Set Variable [ $i; Value:0 ]
  Loop
  Exit Loop If [ $i ≥ $n ]
  Set Variable [ $task; Value:JSONGetElement ( $response ; "tasks[" & $i & "]" ) ]
  #Our four custom fields as one flat object. Every key exists, so a field ClickUp left out reads as empty.
  Set Variable [ $cf; Value:While ( [ ~arr = JSONGetElement ( $task ; "custom_fields" ) ; ~n = ValueCount ( JSONListKeys ( ~arr ; "" ) ) ; ~i = 0 ; ~ours = List ( $cfLegalFirstName ; $cfLastName ; $cfA…
  New Record/Request
  Set Field [ <Table Missing>; $session ]
  Set Field [ <Table Missing>; JSONGetElement ( $task ; "id" ) ]
  Set Field [ <Table Missing>; JSONGetElement ( $task ; "name" ) ]
  Set Field [ <Table Missing>; JSONGetElement ( $task ; "status.status" ) ]
  Set Field [ <Table Missing>; JSONGetElement ( $cf ; $cfLegalFirstName ) ]
  Set Field [ <Table Missing>; JSONGetElement ( $cf ; $cfLastName ) ]
  Set Field [ <Table Missing>; JSONGetElement ( $cf ; $cfAltName ) ]
  Set Field [ <Table Missing>; JSONGetElement ( $cf ; $cfPronouns ) ]
  Set Field [ <Table Missing>; GetAsTimestamp ( Int ( JSONGetElement ( $task ; "date_updated" ) / 1000 ) + 62135596800 ) ]
  Set Field [ <Table Missing>; $task ]
  Commit Records/Requests [ No dialog ]
  Set Variable [ $i; Value:$i + 1 ]
  End Loop
  Set Variable [ $pulled; Value:$pulled + $n ]
  Exit Loop If [ $n = 0 or JSONGetElement ( $response ; "last_page" ) = 1 or $page ≥ 100 ]
  Set Variable [ $page; Value:$page + 1 ]
  End Loop
  #5. Receipt. Nothing pulled means nothing to compare against.
  Go to Layout [ “table | sync_SESSIONS” (sync_SESSIONS) ]
  Set Field [ sync_SESSIONS::<Field Missing>; $pulled ]
  Commit Records/Requests [ No dialog ]
  If [ $pulled = 0 ]
  Go to Layout [ $origLayout ]
  Show Custom Dialog [ Title: "Import from ClickUp"; Message: "ClickUp returned no people. Check the view still exists and still shows PEOPLE list."; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ Result: 0 ]
  End If
  #6. Compare
  Perform Script [ “PEOPLE_Compare”; Parameter: $session ]
  Set Variable [ $rows; Value:Get ( ScriptResult ) ]
  #TYPE BY HAND: Go to Layout [ Layout Name by calculation: $origLayout ; Animation: None ]
  Go to Layout [ $origLayout ]
  If [ $rows = 0 ]
  #TYPE BY HAND: Show Custom Dialog [ "Import from ClickUp" ; $pulled & " people pulled. URITP_PEOPLE already matches ClickUp." ]
  Show Custom Dialog [ Title: "Import from ClickUp"; Message: $pulled & " people pulled. URITP_People already matches ClickUp."; Default Button: “OK”, Commit: “Yes” ]
  Exit Script [ Result: 0 ]
  End If
  #7. Review window
  New Window [ Style: Document; Name: "Reconcile People"; Using layout: “table | sync_RECONCILE” (sync_RECONCILE); Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent windo…
  Enter Find Mode [ ]
  Set Field [ sync_RECONCILE::fk_Session; "==" & $session ]
  Perform Find [ ]
  Sort Records [ Keep records in sorted order; Specified Sort Order: sync_RECONCILE::<Field Missing>; ascending sync_RECONCILE::<Field Missing>; ascending sync_RECONCILE::fk_xtField; ascending ] [ Rest…
  Go to Record/Request/Page [ No dialog; First ]
  Exit Script [ Result: $rows ]

## RECONCILE_Setll
  #RECONCILE_SetAll
  #Buttons in Reconcile People: Apply all, Skip all. Parameter: Apply or Skip.
  #Marks every unapplied New and Changed row in the window. Gone rows keep Flag.
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  If [ $p ≠ "Apply" and $p ≠ "Skip" ]
  Exit Script [ Result: 0 ]
  End If
  Set Error Capture [ On ]
  Freeze Window
  Go to Record/Request/Page [ No dialog; First ]
  Loop
  If [ sync_RECONCILE::<Field Missing> ≠ "Gone" and IsEmpty ( sync_RECONCILE::<Field Missing> ) ]
  Set Field [ sync_RECONCILE::Decision; $p ]
  End If
  Go to Record/Request/Page [ No dialog; Next; Exit after last ]
  End Loop
  Commit Records/Requests [ No dialog ]
  Go to Record/Request/Page [ No dialog; First ]

## RECONCILE_SetAll
  #RECONCILE_SetAll
  #Buttons in Reconcile People: Apply all, Skip all. Parameter: Apply or Skip.
  #Marks every unapplied New and Changed row in the window. Gone rows keep Flag.
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  If [ $p ≠ "Apply" and $p ≠ "Skip" ]
  Exit Script [ Result: 0 ]
  End If
  Set Error Capture [ On ]
  Freeze Window
  Go to Record/Request/Page [ No dialog; First ]
  Loop
  If [ sync_RECONCILE::<Field Missing> ≠ "Gone" and IsEmpty ( sync_RECONCILE::<Field Missing> ) ]
  Set Field [ sync_RECONCILE::Decision; $p ]
  End If
  Go to Record/Request/Page [ No dialog; Next; Exit after last ]
  End Loop
  Commit Records/Requests [ No dialog ]
  Go to Record/Request/Page [ No dialog; First ]

## PEOPLE_Compare
  #PEOPLE_Compare · Called by PEOPLE_Pull. Parameter: the session PrimaryKey. Writes one import_RECONCILE row per difference. Result: how many rows.
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  If [ IsEmpty ( $p ) ]
  Exit Script [ Result: 0 ]
  End If
  Set Error Capture [ On ]
  #Field map. Same five, same order, in every import script: first, last, alternate, pronouns, status.
  Set Variable [ $fmp; Value:List ( GetFieldName ( PEOPLE::Name_First ) ; GetFieldName ( PEOPLE::Name_Last ) ; GetFieldName ( PEOPLE::Name_Alternate ) ; GetFieldName ( PEOPLE::Pronouns ) ; GetFieldName…
  Set Variable [ $cu; Value:List ( GetFieldName ( <Table Missing>::<Field Missing> ) ; GetFieldName ( <Table Missing>::<Field Missing> ) ; GetFieldName ( <Table Missing>::<Field Missing> ) ; GetFieldNa…
  Set Variable [ $rows; Value:"[]" ]
  Set Variable [ $r; Value:0 ]
  Set Variable [ $new; Value:0 ]
  Set Variable [ $changed; Value:0 ]
  Set Variable [ $gone; Value:0 ]
  #1. New and Changed: walk this session's staged rows
  Go to Layout [ <unknown> ]
  Enter Find Mode [ ]
  Set Field [ <Table Missing>; "==" & $p ]
  Perform Find [ ]
  Go to Record/Request/Page [ No dialog; First ]
  Loop
  Set Variable [ $id; Value:<Table Missing>::<Field Missing> ]
  Set Variable [ $ids; Value:List ( $ids ; $id ) ]
  If [ IsEmpty ( PEOPLE::<Field Missing> ) ]
  Set Variable [ $rows; Value:JSONSetElement ( $rows ; "[" & $r & "]" ; JSONSetElement ( "{}" ; [ "kind" ; "New" ; JSONString ] ; [ "id" ; $id ; JSONString ] ; [ "imp" ; <Table Missing>::<Field Missing…
  Set Variable [ $r; Value:$r + 1 ]
  Set Variable [ $new; Value:$new + 1 ]
  Else
  Set Variable [ $j; Value:0 ]
  Loop
  Set Variable [ $j; Value:$j + 1 ]
  Exit Loop If [ $j > ValueCount ( $fmp ) ]
  Set Variable [ $a; Value:GetField ( GetValue ( $fmp ; $j ) ) ]
  Set Variable [ $b; Value:GetField ( GetValue ( $cu ; $j ) ) ]
  #Exact, not =. FileMaker's = ignores case.
  If [ not Exact ( $a ; $b ) ]
  Set Variable [ $f; Value:GetValue ( Substitute ( GetValue ( $fmp ; $j ) ; "::" ; ¶ ) ; 2 ) ]
  Set Variable [ $rows; Value:JSONSetElement ( $rows ; "[" & $r & "]" ; JSONSetElement ( "{}" ; [ "kind" ; "Changed" ; JSONString ] ; [ "id" ; $id ; JSONString ] ; [ "imp" ; <Table Missing>::<Field Mis…
  Set Variable [ $r; Value:$r + 1 ]
  Set Variable [ $changed; Value:$changed + 1 ]
  End If
  End Loop
  End If
  Go to Record/Request/Page [ No dialog; Next; Exit after last ]
  End Loop
  #2. Gone: people FileMaker has that this pull did not return
  Go to Layout [ “table | PEOPLE” (PEOPLE) ]
  Show All Records
  If [ Get ( FoundCount ) > 0 ]
  Go to Record/Request/Page [ No dialog; First ]
  Loop
  If [ IsEmpty ( FilterValues ( $ids ; PEOPLE::<Field Missing> ) ) ]
  Set Variable [ $rows; Value:JSONSetElement ( $rows ; "[" & $r & "]" ; JSONSetElement ( "{}" ; [ "kind" ; "Gone" ; JSONString ] ; [ "id" ; PEOPLE::<Field Missing> ; JSONString ] ; [ "imp" ; "" ; JSONS…
  Set Variable [ $r; Value:$r + 1 ]
  Set Variable [ $gone; Value:$gone + 1 ]
  End If
  Go to Record/Request/Page [ No dialog; Next; Exit after last ]
  End Loop
  End If
  #3. Write the review rows
  Go to Layout [ “table | sync_RECONCILE” (sync_RECONCILE) ]
  Set Variable [ $k; Value:0 ]
  Loop
  Exit Loop If [ $k ≥ $r ]
  Set Variable [ $row; Value:JSONGetElement ( $rows ; "[" & $k & "]" ) ]
  New Record/Request
  Set Field [ sync_RECONCILE::fk_Session; $p ]
  Set Field [ sync_RECONCILE::<Field Missing>; JSONGetElement ( $row ; "kind" ) ]
  Set Field [ sync_RECONCILE::fk_xtRecord; JSONGetElement ( $row ; "id" ) ]
  Set Field [ sync_RECONCILE::<Field Missing>; JSONGetElement ( $row ; "imp" ) ]
  Set Field [ sync_RECONCILE::<Field Missing>; JSONGetElement ( $row ; "name" ) ]
  Set Field [ sync_RECONCILE::fk_xtField; JSONGetElement ( $row ; "field" ) ]
  Set Field [ sync_RECONCILE::FM_Value; JSONGetElement ( $row ; "fmp" ) ]
  Set Field [ sync_RECONCILE::xt_Value; JSONGetElement ( $row ; "cu" ) ]
  Set Field [ sync_RECONCILE::Decision; If ( JSONGetElement ( $row ; "kind" ) = "Gone" ; "Flag" ; "Apply" ) ]
  Commit Records/Requests [ No dialog ]
  Set Variable [ $k; Value:$k + 1 ]
  End Loop
  #4. Counts onto the session
  Go to Layout [ “table | sync_SESSIONS” (sync_SESSIONS) ]
  Enter Find Mode [ ]
  Set Field [ sync_SESSIONS::PrimaryKey; "==" & $p ]
  Perform Find [ ]
  Set Field [ sync_SESSIONS::<Field Missing>; $new ]
  Set Field [ sync_SESSIONS::<Field Missing>; $changed ]
  Set Field [ sync_SESSIONS::<Field Missing>; $gone ]
  Commit Records/Requests [ No dialog ]
  Exit Script [ Result: $r ]

## RECONCILE_ShowSession
  #RECONCILE_ShowSession
  #Parameter: the session PrimaryKey. Shows every row of that session, sorted Kind, PersonName, FieldName.
  Set Variable [ $p; Value:Get ( ScriptParameter ) ]
  If [ IsEmpty ( $p ) ]
  Exit Script [ Result: 0 ]
  End If
  Set Error Capture [ On ]
  Go to Layout [ “table | sync_RECONCILE” (sync_RECONCILE) ]
  Enter Find Mode [ ]
  Set Field [ sync_RECONCILE::fk_Session; "==" & $p ]
  Perform Find [ ]
  #TYPE BY HAND: Sort Records [ Restore ; With dialog: Off ]
  Go to Record/Request/Page [ No dialog; First ]
