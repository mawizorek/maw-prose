---
id: ddr-asbuilt-import-write-row-numbers
title: import | write row numbers (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import | write row numbers

Folder: 40-Importing / process.

```
#assume already in found set
#and on: IMPORT_EVENTS based layout
Go to Record/Request/Page [ First ]
Set Variable [ $r; Value:1 ]
Loop
Set Field [ view_IMPORT_EVENTS::import_RowNumber; $r ]
Set Field [ view_IMPORT_EVENTS::import_raw_payload; Param ( List ( PText ( "cu_TaskID" ; view_IMPORT_EVENTS::cu_TaskID ) ; PText ( "import_Name" ; view_IMPORT_EVENTS::import_Name ) ; PText ( "import_dateSTART" ; view_IMPORT_EVENTS::import_dateSTART ) ; PText ( "import_dateEND" ; view_IMPORT_EVENTS::import_dateEND ) ; PText ( "import_Style_Key" ; view_IMPORT_EVENTS::import_Style_Key ) ; PText ( "import_RowNumber" ; view_IMPORT_EVENTS::import_RowNumber ) ; ) ) ]
Set Variable [ $r; Value:$r+1 ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Go to Record/Request/Page [ First ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ); PText ( "comment" ; "and Copy Payload" ) ) ) ]
```

**Fields:** view_IMPORT_EVENTS::import_RowNumber, ::cu_TaskID, ::import_Name, ::import_dateSTART, ::import_dateEND, ::import_Style_Key, ::import_raw_payload
**Calls:** new | Utility Log
**Called by:** import | new events
**CFs:** Param, PText
