---
id: ddr-asbuilt-new-utility-report
title: new | Utility Report (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# new | Utility Report

Folder: 90-UTILITY / RUN_REPORTS.

```
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
New Window [ Style: Card; Name: "new run report"; Using layout: <Current Layout>; Height: 80; Width: 500; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: No; Menu Bar: No; Dim parent window: No; Toolbars: No ]
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
// Pause/Resume Script [ Indefinitely ]
Close Window [ Current Window ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
Exit Script [ Result: Param ( List ( 1 ; PText ( "fkReport" ; view_UTILITY_REPORTS::PrimaryKey ) ) ) ]
```

**Fields:** view_GLOBAL_USE::g_pkCurrentUtilitySession, view_UTILITY_REPORTS::PrimaryKey/Title/Comment/vl_Status/dateTime_Start/fkUtilitySession/fkAppSession, view_GLOBAL_USE::g_pkCurrentAppSession
**Calls:** goTo | view_UTILITY_REPORTS, new | Utility Log
**Called by:** button | import EVENTS, import | new events, import | pass to workspace
**CFs:** ParamGetText, Param, Pbool, PNum, PText
