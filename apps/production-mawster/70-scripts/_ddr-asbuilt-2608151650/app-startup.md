---
id: ddr-asbuilt-app-startup
title: App_Startup (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against. 🪦 RETIRED. Branches on $mode which is never set.
---

# App_Startup

Folder: 90-UTILITY. 🪦 **Retired** in the curated tree. ⚠️ Performs `<unknown>` then branches on `$mode`, which this script never assigns.

```
#---
#EXPECTING: sessionToken
#---
Set Error Capture [ On ]
Allow User Abort [ Off ]
Set Variable [ $p; Value:Get(ScriptParameter) ]
Set Variable [ $session; Value:ParamGetText ( $p ; "sessionToken" ; $$SESSION.token ) ]
Perform Script [ <unknown> ]
If [ $mode = "ALL" ]
Show All Records
Else If [ $mode = "NONE" or $mode = "none" or $mode = "None" or $mode = "N" or $mode = "n" ]
End If
```

**CFs:** ParamGetText
