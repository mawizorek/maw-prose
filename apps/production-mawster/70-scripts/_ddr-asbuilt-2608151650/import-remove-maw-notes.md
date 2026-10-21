---
id: ddr-asbuilt-import-remove-maw-notes
title: import | remove maw notes (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import | remove maw notes

Folder: 40-Importing / normalization. Strips `<...>` angle-bracket notes from event names via a While loop.

```
#be *in* the found set thyat you want to apply the search to first
#make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) but also covers multi imports
#could also filter by g_pkCurrentImportSession
Perform Script [ “filter | to current run” ]
Go to Record/Request/Page [ First ]
Loop
Set Field [ view_IMPORT_EVENTS::Event Name; Let ( [ ~text = view_IMPORT_EVENTS::Event Name ] ; While ( [ ~result = ~text ; ~start = Position ( ~result ; "<" ; 1 ; 1 ) ; ~end = Position ( ~result ; ">" ; 1 ; 1 ) ] ; ~start > 0 and ~end > ~start ; [ ~result = Replace ( ~result ; ~start ; ( ~end - ~start ) + 1 ; "" ) ; ~start = Position ( ~result ; "<" ; 1 ; 1 ) ; ~end = Position ( ~result ; ">" ; 1 ; 1 ) ] ; ~result ) ) ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

**Fields:** view_IMPORT_EVENTS::Event Name
**Calls:** filter | to current run, new | Utility Log
**Called by:** import | new events
**CFs:** Param, PText
