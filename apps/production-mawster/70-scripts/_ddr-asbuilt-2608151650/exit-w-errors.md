---
id: ddr-asbuilt-exit-w-errors
title: exit w/ errors (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against. 🪦 RETIRED — curated index says the idea does not work.
---

# exit w/ errors

Folder: SHOW & HIDE. 🪦 **Retired** in the curated tree ("the idea does not work").

```
#---
#REQUIRED: VALUE LIST
#EXPECTING: "next, previous, first, or last, in VALUE LIST sort"
#---
Set Error Capture [ On ]
Allow User Abort [ Off ]
Set Variable [ $p; Value:Get(ScriptParameter) ]
Set Variable [ $comment; Value:ParamGetText ( $p ; "comment" ; "" ) ]
If [ $comment ≠ "" ]
Show Custom Dialog [ Title: $comment; Message: "Exiting…"; Default Button: “OK”, Commit: “Yes” ]
End If
Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
```

**CFs:** ParamGetText, Param, Pbool, PNum, PText
