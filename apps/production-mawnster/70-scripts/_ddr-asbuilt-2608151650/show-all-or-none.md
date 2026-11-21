---
id: ddr-asbuilt-show-all-or-none
title: Show ALL or NONE (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# Show ALL or NONE

Folder: SHOW & HIDE. Curated: reclassified as a `FIND ·` (rename → FIND · All Or None).

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

**Called by:** button | import EVENTS, import | net new Event, import | merge Event, trigger_App_Open
**CFs:** ParamGetText, Param, PText, PNum
