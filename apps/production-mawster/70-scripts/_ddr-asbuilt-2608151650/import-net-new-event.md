---
id: ddr-asbuilt-import-net-new-event
title: import | net new Event (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import | net new Event

Folder: 40-Importing / Pass to Workspace.

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
```

**Fields:** view_EVENTS::cuID, ::Name, ::dateTime_Start, ::dateTime_End, ::bool_AllDay, ::fkUtilityReport, ::hash_current, ::fkProduction, ::fkStyle, ::json_Rollback, ::fkCalendar, ::fkStandardEvent
**Calls:** new | Utility Log, goTo | Events, Show ALL or NONE, lookup | calendar for production
**Called by:** import | pass to workspace
**CFs:** Param, PText, ParamGetText
