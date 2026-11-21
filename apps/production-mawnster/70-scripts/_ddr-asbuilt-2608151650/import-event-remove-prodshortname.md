---
id: ddr-asbuilt-import-event-remove-prodshortname
title: import EVENT | remove ProdShortName (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import EVENT | remove ProdShortName

Folder: 40-Importing / normalization.

```
#be *in* the found set thyat you want to apply the search to first
#make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) but also covers multi imports
#could also filter by g_pkCurrentImportSession
Perform Script [ “filter | to current run” ]
Perform Script [ “lookup | production short” ]
Set Variable [ $shortLabel; Value:ParamGetText ( Get ( ScriptResult ) ; "shortLabel" ; "" ) ]
Go to Record/Request/Page [ First ]
Loop
Set Field [ view_IMPORT_EVENTS::Event Name; Substitute ( view_IMPORT_EVENTS::import_Name ; "[" & $shortLabel & "] " ; "" ) ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

**Fields:** view_IMPORT_EVENTS::import_Name, ::Event Name
**Calls:** filter | to current run, lookup | production short, new | Utility Log
**Called by:** import | new events
**CFs:** ParamGetText, Param, PText
