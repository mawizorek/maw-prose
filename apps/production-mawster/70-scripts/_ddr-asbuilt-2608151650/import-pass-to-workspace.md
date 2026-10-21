---
id: ddr-asbuilt-import-pass-to-workspace
title: import | pass to workspace (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import | pass to workspace

Folder: 40-Importing / Pass to Workspace. The net-new vs merge router.

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

**Fields:** view_IMPORT_EVENTS::PrimaryKey, ::cu_TaskID, ::json_cleanImportDetails
**Calls:** filter | to current run, end | Utility Report, new | Utility Report, new | Utility Log, compare | cu_ID, import | net new Event, import | merge Event
**Called by:** import | new events
**CFs:** Param, PText, ParamGetText, ParamGetBool
