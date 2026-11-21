---
id: ddr-asbuilt-new-utility-log
title: new | Utility Log (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against. Curated equivalent (new_UTILITY_LOG) retired for a bad default.
---

# new | Utility Log

Folder: 90-UTILITY / LOGS. The universal logger — called by nearly every script. ⚠️ References `view_UTILITY_LOGS::<Field Missing>` (an `"open"` write) unresolved in the DDR.

```
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
New Window [ Style: Card; Name: "new log"; Using layout: <Current Layout>; Height: 80; Width: 500; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: No; Menu Bar: No; Dim parent window: No; Toolbars: No ]
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
// Pause/Resume Script [ Indefinitely ]
Close Window [ Current Window ]
#- EOF -
```

**Fields:** view_UTILITY_LOGS::PrimaryKey/fkRunReport/fkAppSessionToken/Action/Timestamp/Comment/json_Params/ErrorCode, view_GLOBAL_USE::g_pkCurrentAppSession
**Calls:** goto_view_UTILITY_LOGS
**CFs:** ParamGetText, Param, Pbool, PNum, PText
