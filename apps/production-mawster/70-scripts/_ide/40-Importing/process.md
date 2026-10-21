---
id: mawster-ide-process
title: "IDE mirror - 40-Importing / process"
type: reference
status: hidden
order: 8
revised: 2026-08
summary: Verbatim transcription of the process subfolder. 3 scripts.
---

# IDE mirror - `process`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, part 17/20. Nothing corrected. -->

Exact IDE folder name: `process` (inside `40-Importing`)

---

### import | Event records

```
Parent Folder:                          [process]
Previous Script:                        (none)
Next Script:                            import | write row numbers
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
#for import and field mapping
Import Records [ ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: (none)
Scripts used: `new | Utility Log`
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

Transcription note: `Import Records [ ]` is printed by the DDR with no options captured.

---

### import | write row numbers

```
Parent Folder:                          [process]
Previous Script:                        import | Event records
Next Script:                            import | copy Payload
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

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

Fields used: `view_IMPORT_EVENTS::import_RowNumber`, `view_IMPORT_EVENTS::cu_TaskID`, `view_IMPORT_EVENTS::import_Name`, `view_IMPORT_EVENTS::import_dateSTART`, `view_IMPORT_EVENTS::import_dateEND`, `view_IMPORT_EVENTS::import_Style_Key`, `view_IMPORT_EVENTS::import_raw_payload`
Scripts used: `new | Utility Log`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

---

### import | copy Payload

```
Parent Folder:                          [process]
Previous Script:                        import | write row numbers
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
#on import, copy every column, row, header into a row json into the import_raw_payload field
#would take some advanced scripting to save and store the headers too in a singel json but good for rollback and could be passed as an entire json package to many of the import script steps as it's own utility... ngating the need for individual fields passing into each - they can alway sjust search for their striong. but field names used in calcs auti-updated while sciped json string look ups do *not*
Set Field [ view_IMPORT_EVENTS::import_raw_payload; Param ( List ( PText ( "cu_TaskID" ; view_IMPORT_EVENTS::cu_TaskID ) ; PText ( "import_Name" ; view_IMPORT_EVENTS::import_Name ) ; PText ( "import_dateSTART" ; view_IMPORT_EVENTS::import_dateSTART ) ; PText ( "import_dateEND" ; view_IMPORT_EVENTS::import_dateEND ) ; PText ( "import_Style_Key" ; view_IMPORT_EVENTS::import_Style_Key ) ; PText ( "import_RowNumber" ; view_IMPORT_EVENTS::import_RowNumber ) ; ) ) ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_IMPORT_EVENTS::cu_TaskID`, `view_IMPORT_EVENTS::import_Name`, `view_IMPORT_EVENTS::import_dateSTART`, `view_IMPORT_EVENTS::import_dateEND`, `view_IMPORT_EVENTS::import_Style_Key`, `view_IMPORT_EVENTS::import_RowNumber`, `view_IMPORT_EVENTS::import_raw_payload`
Scripts used: `new | Utility Log`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)
