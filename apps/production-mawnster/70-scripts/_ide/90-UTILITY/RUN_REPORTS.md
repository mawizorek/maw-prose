---
id: mawster-ide-run-reports
title: "IDE mirror - 90-UTILITY / RUN_REPORTS"
type: reference
status: hidden
order: 15
revised: 2026-08
summary: Verbatim transcription of the RUN_REPORTS subfolder. 2 scripts.
---

# IDE mirror - `RUN_REPORTS`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, part 19/20. Nothing corrected. -->

Exact IDE folder name: `RUN_REPORTS` (inside `90-UTILITY`)

---

### new | Utility Report

```
Parent Folder:                          [RUN_REPORTS]
Previous Script:                        (none)
Next Script:                            end | Utility Report
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `button | import EVENTS`, `import | new events`, `import | pass to workspace`

Script Steps

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
#AT END-TIME variables
#not sure how to implement this part:
#probably from the global $$currentRunReport that we set just after creating new record.
#script for: Add summmary to, or "end Report timestamp" etc
// Set Field [ view_UTILITY_REPORTS::RunSummary; "" ]
// Set Field [ view_UTILITY_REPORTS::dateTime_End; $fkReport ]
// Set Field [ view_UTILITY_REPORTS::media_RunReport; $fkReport ]
// Set Field [ view_UTILITY_REPORTS::bool_Pass; "" ]
#- EOF -
```

Fields used: `view_GLOBAL_USE::g_pkCurrentUtilitySession`, `view_UTILITY_REPORTS::PrimaryKey`, `view_UTILITY_REPORTS::Title`, `view_UTILITY_REPORTS::Comment`, `view_UTILITY_REPORTS::vl_Status`, `view_UTILITY_REPORTS::dateTime_Start`, `view_UTILITY_REPORTS::fkUtilitySession`, `view_GLOBAL_USE::g_pkCurrentAppSession`, `view_UTILITY_REPORTS::fkAppSession`, `view_UTILITY_REPORTS::RunSummary`, `view_UTILITY_REPORTS::dateTime_End`, `view_UTILITY_REPORTS::media_RunReport`, `view_UTILITY_REPORTS::bool_Pass`
Scripts used: `goTo | view_UTILITY_REPORTS`, `new | Utility Log`
Layouts used: (none)
Tables used: `GLOBAL_USE`, `UTILITY_REPORTS`
Table occurrences used: `view_GLOBAL_USE`, `view_UTILITY_REPORTS`
Custom Functions used: `ParamGetText`, `Param`, `Pbool`, `PNum`, `PText`
Custom menu set used: (none)

Transcription note: the `#id:` comment reads `new-utility-log`, the same id the `new | Utility Log` script carries. Copied as printed.

---

### end | Utility Report

```
Parent Folder:                          [RUN_REPORTS]
Previous Script:                        new | Utility Report
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | pass to workspace`

Script Steps

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

Fields used: `view_UTILITY_REPORTS::dateTime_End`, `view_UTILITY_REPORTS::RunSummary`, `view_UTILITY_REPORTS::bool_Pass`, `view_UTILITY_REPORTS::media_RunReport`
Scripts used: `goTo | new window currentRunReport`, `new | Utility Log`
Layouts used: (none)
Tables used: `UTILITY_REPORTS`
Table occurrences used: `view_UTILITY_REPORTS`
Custom Functions used: `Param`, `PText`, `ParamGetText`
Custom menu set used: (none)
