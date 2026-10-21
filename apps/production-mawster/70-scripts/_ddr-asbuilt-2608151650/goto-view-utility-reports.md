---
id: ddr-asbuilt-goto-view-utility-reports
title: goTo | view_UTILITY_REPORTS (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# goTo | view_UTILITY_REPORTS

Folder: 80-GoTo.

```
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
// Perform Script [ <unknown> ]
Enter Find Mode [ ]
Set Field [ view_UTILITY_REPORTS::PrimaryKey; $pk ]
Perform Find [ ]
If [ Get ( LastError ) ≠ 0 ]
Exit Script [ ]
End If
```

**Fields:** view_UTILITY_REPORTS::PrimaryKey
**Called by:** goTo | new window currentRunReport, new | Utility Report
**CFs:** Param, PText, ParamGetText
