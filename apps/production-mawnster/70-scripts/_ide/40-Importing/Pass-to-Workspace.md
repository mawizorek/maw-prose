---
id: mawster-ide-pass-to-workspace
title: "IDE mirror - 40-Importing / Pass to Workspace"
type: reference
status: hidden
order: 11
revised: 2026-08
summary: Verbatim transcription of the Pass to Workspace subfolder. 5 of 8 scripts; the merge/rollback trio is in the sibling file.
provenance: see 70-scripts/_ide/index.md
---

# IDE mirror - `Pass to Workspace`

Exact IDE folder name: `Pass to Workspace` (inside `40-Importing`)

⚠️ **This folder is transcribed across TWO files.** The IDE folder holds 8 scripts; 5 are here.
The merge/rollback trio (`backup | EVENT`, `merge | compare field`, `XXmerge | Event Field`)
is in `Pass-to-Workspace.merge-rollback.md`. **A repo-side read-size split only — in FileMaker
there is one folder.** The `Previous Script` / `Next Script` chain below still runs through the
moved scripts, because those pointers are DDR metadata and were not edited.

---

### import | pass to workspace

```
Parent Folder:                          [Pass to Workspace]
Previous Script:                        (none)
Next Script:                            compare | cu_ID
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
#GOALS
Perform Script [ “filter | to current run” ]
Perform Script [ “end | Utility Report” ]
Perform Script [ “new | Utility Report”; Parameter: Param ( List ( PText ( "title" ; Get ( ScriptName ) ) ) ) ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "START> " & Get ( ScriptName ) ) ) ) ]
#be *in* the found set that you want to apply the search to first
#make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) but also covers multi imports
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
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "data return> " & Get ( ScriptName ) ) ; PText ( "comment" ; "!result: " & $result ) ) ) ]
#STILL IN A NEW FLOATING WINDOW
If [ ParamGetBool ( $return ; "pass" ; False ) ≠ True ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "found count ≠ 1 or 0" ) ) ) ]
Exit Script [ ]
Else
// Set Variable [ $return; Value:ParamGetText ( $result ; "result" ; "" ) ]
Set Variable [ $mode; Value:$result ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "data> " & Get ( ScriptName ) ) ; PText ( "comment" ; "mode: " & $mode ) ) ) ]
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "success in " & Get ( ScriptName ) ) ; PText ( "comment" ; "result: " & $result ) ) ) ]
End If
#INCORPORATE THE IMPROTED EVENT
If [ $mode = "net new" ]
Perform Script [ “import | net new Event”; Parameter: view_IMPORT_EVENTS::json_cleanImportDetails ]
// Perform Script [ “import | merge Event”; Parameter: view_IMPORT_EVENTS::json_cleanImportDetails ]
Else If [ $mode = "merge" ]
Perform Script [ “import | merge Event”; Parameter: view_IMPORT_EVENTS::json_cleanImportDetails ]
// Perform Script [ “import | net new Event”; Parameter: view_IMPORT_EVENTS::json_cleanImportDetails ]
End If
// Exit Loop If [ $c = 30 ]
Go to Record/Request/Page [ Next; Exit after last ]
Set Variable [ $c; Value:$c + 1 ]
End Loop
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "END> " & Get ( ScriptName ) ) ; PText ( "comment" ; "count = " & $c ) ) ) ]
```

Fields used: `view_IMPORT_EVENTS::PrimaryKey`, `view_IMPORT_EVENTS::cu_TaskID`, `view_IMPORT_EVENTS::json_cleanImportDetails`
Scripts used: `filter | to current run`, `end | Utility Report`, `new | Utility Report`, `new | Utility Log`, `compare | cu_ID`, `import | net new Event`, `import | merge Event`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `Param`, `PText`, `ParamGetText`, `ParamGetBool`
Custom menu set used: (none)

---

### compare | cu_ID

```
Parent Folder:                          [Pass to Workspace]
Previous Script:                        import | pass to workspace
Next Script:                            import | net new Event
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | pass to workspace`

Script Steps

```
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
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "foundcount =/ 1" ) ) ) ]
Set Variable [ $logParam; Value:Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "foundcount =/ 1" ) ) ) ]
Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 0 ) ; PText ( "result" ; "failed" ) ) ) ]
Else If [ Get ( FoundCount ) = 0 ]
Set Variable [ $logParam; Value:Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "net new. FC: " & Get ( FoundCount ) ) ) ) ]
Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "net new" ) ) ) ]
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "Found count: " & Get ( FoundCount ) ) ) ) ]
// Exit Script [ Result: Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "net new" ) ) ) ]
Else If [ Get ( FoundCount ) = 1 ]
Set Variable [ $logParam; Value:Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "merge FC: " & Get ( FoundCount ) ) ) ) ]
Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "merge" ) ) ) ]
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "Found count: " & Get ( FoundCount ) ) ) ) ]
// Exit Script [ Result: Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "merge" ) ) ) ]
End If
Close Window [ Current Window ]
Perform Script [ “new | Utility Log”; Parameter: $logParam ]
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "data> " & Get ( ScriptName )) ; PText ( "comment" ; "$scriptResult: " & $scriptResult ) ) ) ]
Exit Script [ Result: $scriptResult ]
```

Fields used: `view_EVENTS::cuID`
Scripts used: `new | Utility Log`, `goTo | Events`
Layouts used: (none)
Tables used: `EVENTS`
Table occurrences used: `view_EVENTS`
Custom Functions used: `ParamGetText`, `Param`, `PText`, `Pbool`
Custom menu set used: (none)

---

### import | net new Event

```
Parent Folder:                          [Pass to Workspace]
Previous Script:                        compare | cu_ID
Next Script:                            import | merge Event
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | pass to workspace`

Script Steps

```
Set Error Capture [ On ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $cuID; Value:ParamGetText ( $p ; "cuID" ; "" ) ]
Set Variable [ $name; Value:ParamGetText ( $p ; "Name" ; "err" ) ]
Set Variable [ $start; Value:ParamGetText ( $p ; "dateTime_Start" ; "" ) ]
Set Variable [ $end; Value:ParamGetText ( $p ; "dateTime_End" ; "err" ) ]
Set Variable [ $bool_AllDay; Value:ParamGetText ( $p ; "bool_AllDay" ; "" ) ]
Set Variable [ $fkReport; Value:ParamGetText ( $p ; "fkUtilityReport" ; "err" ) ]
Set Variable [ $hash; Value:ParamGetText ( $p ; "hash_current" ; "err" ) ]
Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; "err" ) ]
Set Variable [ $styleKey; Value:ParamGetText ( $p ; "fkStyle" ; "" ) ]
New Window [ Style: Document; Name: "import | new new Event"; Using layout: <Current Layout>; Height: 400; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: Yes; Menu Bar: No; Dim parent window: No; Toolbars: No ]
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
Set Field [ view_EVENTS::fkStyle; $styleKey ]
Set Field [ view_EVENTS::json_Rollback; $p ]
Perform Script [ “lookup | calendar for production”; Parameter: Param ( List ( 1 ; PText ( "fkProduction" ; $fkProduction ) ) ) ]
Set Variable [ $return; Value:Get ( ScriptResult ) ]
Set Variable [ $fkCalendar; Value:ParamGetText ( $return ; "fkCalendar" ; "err" ) ]
Set Field [ view_EVENTS::fkCalendar; $fkCalendar ]
Commit Records/Requests [ No dialog ]
// Set Field [ view_EVENTS::fkStandardEvent; $cuID ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]
Close Window [ Name: "import | new new Event"; Current file ]
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_EVENTS::cuID`, `view_EVENTS::Name`, `view_EVENTS::dateTime_Start`, `view_EVENTS::dateTime_End`, `view_EVENTS::bool_AllDay`, `view_EVENTS::fkUtilityReport`, `view_EVENTS::hash_current`, `view_EVENTS::fkProduction`, `view_EVENTS::fkStyle`, `view_EVENTS::json_Rollback`, `view_EVENTS::fkCalendar`, `view_EVENTS::fkStandardEvent`
Scripts used: `new | Utility Log`, `goTo | Events`, `Show ALL or NONE`, `lookup | calendar for production`
Layouts used: (none)
Tables used: `EVENTS`
Table occurrences used: `view_EVENTS`
Custom Functions used: `Param`, `PText`, `ParamGetText`
Custom menu set used: (none)

---

### import | merge Event

```
Parent Folder:                          [Pass to Workspace]
Previous Script:                        import | net new Event
Next Script:                            backup | EVENT
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | pass to workspace`

Script Steps

```
Set Error Capture [ On ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
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
New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Height: 400; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: Yes; Menu Bar: No; Dim parent window: No; Toolbars: No ]
Perform Script [ “goTo | Events” ]
// Perform Script [ “Show ALL or NONE”; Parameter: Param ( List ( 1 ; PText ( "mode" ; "none" ) ) ) ]
//
Enter Find Mode [ ]
Set Field [ view_EVENTS::cuID; $cuID ]
Perform Find [ ]
If [ Get ( FoundCount ) ≠ 1 ]
Exit Script [ ]
End If
Perform Script [ “backup | EVENT”; Parameter: $p ]
// Set Variable [ $param; Value:Param ( List ( 1 ; PNum ( "index" ; $i ) ) ) ]
Go to Next Field
Set Variable [ $startField; Value:Get ( ActiveFieldName ) ]
Loop
Set Variable [ $value; Value:ParamGetText ( $p ; Get ( ActiveFieldName ) ; "err" ) ]
Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "field" ; Get ( ActiveFieldName ) ) ; PText ( "value" ; $value ) ) ) ]
Perform Script [ “merge | compare field”; Parameter: $param ]
Go to Next Field
Exit Loop If [ Get ( ActiveFieldName ) = $startField ]
End Loop
Close Window [ Current Window ]
// Set Field [ view_EVENTS::cuID; $cuID ]
// Set Field [ view_EVENTS::Name; $name ]
// Set Field [ view_EVENTS::dateTime_Start; GetAsTimestamp ( $start ) ]
// Set Field [ view_EVENTS::dateTime_End; GetAsTimestamp ( $end ) ]
// Set Field [ view_EVENTS::bool_AllDay; $bool_AllDay ]
// Set Field [ view_EVENTS::fkUtilityReport; $fkReport ]
// Set Field [ view_EVENTS::hash_current; $hash ]
//
// Set Field [ view_EVENTS::fkProduction; $fkProduction ]
//
// Set Field [ view_EVENTS::fkStyle; $styleKey ]
//
// Set Field [ view_EVENTS::json_Rollback; $p ]
//
// Perform Script [ “lookup | calendar for production”; Parameter: Param ( List ( 1 ; PText ( "fkProduction" ; $fkProduction ) ) ) ]
// Set Variable [ $return; Value:Get ( ScriptResult ) ]
// Set Variable [ $fkCalendar; Value:ParamGetText ( $return ; "fkCalendar" ; "err" ) ]
// Set Field [ view_EVENTS::fkCalendar; $fkCalendar ]
//
//
// Set Field [ view_EVENTS::fkStandardEvent; $cuID ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_EVENTS::cuID`, `view_EVENTS::Name`, `view_EVENTS::dateTime_Start`, `view_EVENTS::dateTime_End`, `view_EVENTS::bool_AllDay`, `view_EVENTS::fkUtilityReport`, `view_EVENTS::hash_current`, `view_EVENTS::fkProduction`, `view_EVENTS::fkStyle`, `view_EVENTS::json_Rollback`, `view_EVENTS::fkCalendar`, `view_EVENTS::fkStandardEvent`
Scripts used: `new | Utility Log`, `goTo | Events`, `Show ALL or NONE`, `backup | EVENT`, `merge | compare field`, `lookup | calendar for production`
Layouts used: (none)
Tables used: `EVENTS`
Table occurrences used: `view_EVENTS`
Custom Functions used: `Param`, `PText`, `ParamGetText`, `ParamGetBool`, `PNum`
Custom menu set used: (none)

---

⏭ **`backup | EVENT`, `merge | compare field` and `XXmerge | Event Field` are transcribed in
`Pass-to-Workspace.merge-rollback.md`.** They sit here in the IDE's ordering, between
`import | merge Event` above and `lookup | calendar for production` below.

---

### lookup | calendar for production

```
Parent Folder:                          [Pass to Workspace]
Previous Script:                        XXmerge | Event Field
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | net new Event`, `import | merge Event`

Script Steps

```
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "start" ) ) ) ]
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
```

Fields used: `view_GLOBAL_USE::g_pkCurrentProduction`, `view_CALENDARS::fkProduction`, `view_CALENDARS::PrimaryKey`
Scripts used: `new | Utility Log`, `goTo | Calendars`
Layouts used: (none)
Tables used: `CALENDARS`, `GLOBAL_USE`
Table occurrences used: `view_CALENDARS`, `view_GLOBAL_USE`
Custom Functions used: `Param`, `PText`, `ParamGetText`, `Pbool`
Custom menu set used: (none)
