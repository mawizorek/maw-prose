---
id: ddr-asbuilt-end-utility-report
title: end | Utility Report (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# end | Utility Report

Folder: 90-UTILITY / RUN_REPORTS.

```
Set Variable [ $p; Value:Get(ScriptParameter) ]
// Set Variable [ $report; Value:$$currentUtilityReport ]
Set Variable [ $report; Value:Param ( List ( 1 ; PText ( "fkReport" ; ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ) ) ) ]
// If [ IsEmpty ( Get ( ScriptParameter ) ) ]
// Set Variable [ $report; Value:$$currentUtilityReport ]
// Else
// Set Variable [ $p; Value:Get(ScriptParameter) ]
#REQUIRED, or defaulted:
// Set Variable [ $report; Value:Param ( List ( 1; ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ) ) ]
#OPTIONAL:
Set Variable [ $summary; Value:ParamGetText ( $p ; "summary" ; "" ) ]
// End If
#OPENING A NEW WINDOW
Perform Script [ “goTo | new window currentRunReport”; Parameter: $report ]
#SET FIELDS:
Set Field [ view_UTILITY_REPORTS::dateTime_End; Get ( CurrentTimestamp ) ]
Set Field [ view_UTILITY_REPORTS::RunSummary; $summary ]
Set Field [ view_UTILITY_REPORTS::bool_Pass; 1 ]
#OPTIONAL:
// Set Field [ view_UTILITY_REPORTS::media_RunReport; $fkReport ]
Close Window [ Current Window ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "" ) ) ) ]
```

**Fields:** view_UTILITY_REPORTS::dateTime_End, ::RunSummary, ::bool_Pass, ::media_RunReport
**Calls:** goTo | new window currentRunReport, new | Utility Log
**Called by:** import | pass to workspace
**CFs:** Param, PText, ParamGetText
