---
id: ddr-asbuilt-import-bool-all-day
title: import | bool all day (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import | bool all day

Folder: 40-Importing / normalization.

```
#be *in* the found set thyat you want to apply the search to first
#make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) but also covers multi imports
#could also filter by g_pkCurrentImportSession
Perform Script [ “filter | to current run” ]
Go to Record/Request/Page [ First ]
Loop
If [ IsEmpty ( view_IMPORT_EVENTS::import_dateSTART ) and view_IMPORT_EVENTS::import_dateEND ]
Set Field [ view_IMPORT_EVENTS::bool_AllDay; 1 ]
Else If [ GetAsDate ( view_IMPORT_EVENTS::import_dateSTART ) ≠ GetAsDate ( view_IMPORT_EVENTS::import_dateEND ) and GetAsTime ( view_IMPORT_EVENTS::import_dateEND ) ≠ Time ( 24 ; 0 ; 0 ) ]
Set Field [ view_IMPORT_EVENTS::bool_AllDay; 1 ]
End If
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

**Fields:** view_IMPORT_EVENTS::import_dateSTART, ::import_dateEND, ::bool_AllDay
**Calls:** filter | to current run, new | Utility Log
**Called by:** import | new events
**CFs:** Param, PText
