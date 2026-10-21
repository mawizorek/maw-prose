---
id: ddr-asbuilt-import-copy-payload
title: import | copy Payload (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import | copy Payload

Folder: 40-Importing / process. (Folded into `import | write row numbers`; retained, not called from the orchestrator.)

```
#on import, copy every column, row, header into a row json into the import_raw_payload field
#would take some advanced scripting to save and store the headers too in a singel json but good for rollback and could be passed as an entire json package to many of the import script steps as it's own utility... ngating the need for individual fields passing into each - they can alway sjust search for their striong. but field names used in calcs auti-updated while sciped json string look ups do *not*
Set Field [ view_IMPORT_EVENTS::import_raw_payload; Param ( List ( PText ( "cu_TaskID" ; view_IMPORT_EVENTS::cu_TaskID ) ; PText ( "import_Name" ; view_IMPORT_EVENTS::import_Name ) ; PText ( "import_dateSTART" ; view_IMPORT_EVENTS::import_dateSTART ) ; PText ( "import_dateEND" ; view_IMPORT_EVENTS::import_dateEND ) ; PText ( "import_Style_Key" ; view_IMPORT_EVENTS::import_Style_Key ) ; PText ( "import_RowNumber" ; view_IMPORT_EVENTS::import_RowNumber ) ; ) ) ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

**Fields:** view_IMPORT_EVENTS::cu_TaskID, ::import_Name, ::import_dateSTART, ::import_dateEND, ::import_Style_Key, ::import_RowNumber, ::import_raw_payload
**Calls:** new | Utility Log
**Called by:** import | new events (commented out)
**CFs:** Param, PText
