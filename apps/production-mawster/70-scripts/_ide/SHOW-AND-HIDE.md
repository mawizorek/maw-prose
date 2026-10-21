---
id: mawster-ide-show-and-hide
title: "IDE mirror - SHOW & HIDE"
type: reference
status: hidden
order: 17
revised: 2026-08
summary: Verbatim transcription of the SHOW & HIDE folder. 1 script.
---

# IDE mirror - `SHOW & HIDE`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, part 20/20. Nothing corrected. -->

Exact IDE folder name: `SHOW & HIDE` (filename slugified to `SHOW-AND-HIDE.md`; the ampersand and spaces break repo paths and links)

---

### Show ALL or NONE

```
Parent Folder:                          [SHOW & HIDE]
Previous Script:                        (none)
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `button | import EVENTS`, `import | merge Event`, `trigger_App_Open`

Script Steps

```
#---
#EXPECTED: mode: ALL | NONE
#---
Set Error Capture [ On ]
Allow User Abort [ Off ]
Set Variable [ $param; Value:Get(ScriptParameter) ]
Set Variable [ $mode; Value:ParamGetText ( $param ; "mode" ; "abort" ) ]
If [ $mode = "ALL" ]
Show All Records
Else If [ $mode = "NONE" or $mode = "none" or $mode = "None" or $mode = "N" or $mode = "n" ]
Show All Records
Show Omitted Only
// Show Custom Dialog [ Title: "None"; Default Button: “OK”, Commit: “Yes” ]
Else If [ $mode = "abort" ]
Exit Script [ Result: Param ( List ( PText ( "error" ; "No mode passed. Won't assume." ) ; PNum ( "pass" ; 0 ) ) ) ]
Else
Exit Script [ Result: Param ( List ( PText ( "error" ; "Failed to load $mode" ) ; PNum ( "pass" ; 0 ) ) ) ]
End If
```

Fields used: (none)
Scripts used: (none)
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: `ParamGetText`, `Param`, `PText`, `PNum`
Custom menu set used: (none)

Transcription note: callers pass `mode` as `"None"`, `"none"` and `"All"` across the file. All spellings copied as found in their own transcriptions; the branch list above is what this script actually tests.
