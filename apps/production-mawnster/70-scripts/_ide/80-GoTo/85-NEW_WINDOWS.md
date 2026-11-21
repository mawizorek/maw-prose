---
id: mawster-ide-85-new-windows
title: "IDE mirror - 80-GoTo / 85-NEW_WINDOWS"
type: reference
status: hidden
order: 13
revised: 2026-08
summary: Verbatim transcription of the 85-NEW_WINDOWS subfolder. 1 script.
---

# IDE mirror - `85-NEW_WINDOWS`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, part 19/20. Nothing corrected. -->

Exact IDE folder name: `85-NEW_WINDOWS` (printed after `80-GoTo` and `CURRENTS`)

---

### goTo | new window currentRunReport

```
Parent Folder:                          [85-NEW_WINDOWS]
Previous Script:                        (none)
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `end | Utility Report`

Script Steps

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

Fields used: (none)
Scripts used: `goTo | view_UTILITY_REPORTS`
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: `Param`, `PText`, `ParamGetText`
Custom menu set used: (none)
