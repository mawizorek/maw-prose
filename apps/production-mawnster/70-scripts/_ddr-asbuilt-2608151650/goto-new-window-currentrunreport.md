---
id: ddr-asbuilt-goto-new-window-currentrunreport
title: goTo | new window currentRunReport (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# goTo | new window currentRunReport

Folder: 85-NEW_WINDOWS.

```
Set Variable [ $p; Value:Get(ScriptParameter) ]
Set Variable [ $report; Value:Param ( List ( 1 ; PText ( "fkReport" ; ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ) ) ) ]
// If [ IsEmpty ( Get ( ScriptParameter ) ) ]
// Set Variable [ $report; Value:$$currentUtilityReport ]
// Else
// Set Variable [ $p; Value:Get(ScriptParameter) ]
#REQUIRED, or defaulted:
Set Variable [ $name; Value:ParamGetText ( $p ; "windowName" ; "Unnamed Window" ) ]
#make the report into a json package right at script param lookup
// Set Variable [ $report; Value:Param ( List ( 1 ; "fkReport" ; ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ) ) ]
// End If
New Window [ Style: Card; Name: $name; Using layout: <Current Layout>; Height: 400; Width: 400; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: No; Menu Bar: No; Dim parent window: No; Toolbars: No ]
#pass a fkReport to the go_to layout for an automatic filter to just that record(s).
Perform Script [ “goTo | view_UTILITY_REPORTS”; Parameter: $report ]
```

**Calls:** goTo | view_UTILITY_REPORTS
**Called by:** end | Utility Report
**CFs:** Param, PText, ParamGetText
