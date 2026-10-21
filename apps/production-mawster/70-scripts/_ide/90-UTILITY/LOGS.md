---
id: mawster-ide-logs
title: "IDE mirror - 90-UTILITY / LOGS"
type: reference
status: hidden
order: 16
revised: 2026-08
summary: Verbatim transcription of the LOGS subfolder. 1 script, called by 22 others.
---

# IDE mirror - `LOGS`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, parts 19-20/20. Nothing corrected. -->

Exact IDE folder name: `LOGS` (inside `90-UTILITY`)

This is the most-called script in the file. Its inbound caller list is transcribed in full below because it is the dependency map of the whole import chain.

---

### new | Utility Log

```
Parent Folder:                          [LOGS]
Previous Script:                        (none)
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)

Scripts that use this script (22, verbatim in DDR order):

```
file | Create Backup
on App Open
on App Close
button | import EVENTS
lookup | production short
import | Event records
import | write row numbers
import | copy Payload
link | fkUtilityReport
link | fkReport fkProd Hash
import | delete empty rows
import | delete header row
import EVENT | remove ProdShortName
import | remove maw notes
import | bool all day
import | pass to workspace
compare | cu_ID
import | net new Event
import | merge Event
lookup | calendar for production
new | Utility Report
end | Utility Report
```

Script Steps

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
#not sure how to implement this part:
// Set Field [ view_UTILITY_LOGS::<Field Missing>; $fkReport ]
// Set Field [ view_UTILITY_LOGS::<Field Missing>; "open" ]
#- EOF -
```

Fields used: `view_UTILITY_LOGS::PrimaryKey`, `view_UTILITY_LOGS::fkRunReport`, `view_GLOBAL_USE::g_pkCurrentAppSession`, `view_UTILITY_LOGS::fkAppSessionToken`, `view_UTILITY_LOGS::Action`, `view_UTILITY_LOGS::Timestamp`, `<Missing Field>`, `view_UTILITY_LOGS::Comment`, `view_UTILITY_LOGS::json_Params`, `view_UTILITY_LOGS::ErrorCode`
Scripts used: `goto_view_UTILITY_LOGS`
Layouts used: (none)
Tables used: `GLOBAL_USE`, `UTILITY_LOGS`
Table occurrences used: `view_GLOBAL_USE`, `view_UTILITY_LOGS`
Custom Functions used: `ParamGetText`, `Param`, `Pbool`, `PNum`, `PText`
Custom menu set used: (none)

Transcription notes:

- `view_UTILITY_LOGS::<Field Missing>` appears as a LIVE `Set Field` target, plus twice more in commented-out lines. Copied literally, all three times.
- The `#id:` comment reads `new-utility-log`, the same id printed inside `new | Utility Report`. Copied as printed.
