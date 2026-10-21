---
id: ddr-asbuilt-import-delete-header-row
title: import | delete header row (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against. ⚠️ Known bug transcribed as-is.
---

# import | delete header row

Folder: 40-Importing / normalization.

⚠️ **As-built bug:** the second Set Field targets `import_dateSTART` again; almost certainly meant `import_dateEND`. Transcribed verbatim, NOT corrected.

```
#assume already in the found set
Set Error Logging [ On ; Custom debug info: ]
Enter Find Mode [ ]
Set Field [ view_IMPORT_EVENTS::import_dateSTART; "Date" ]
Set Field [ view_IMPORT_EVENTS::import_dateSTART; "Date" ]
Perform Find [ ]
Delete All Records [ No dialog ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

**Fields:** view_IMPORT_EVENTS::import_dateSTART
**Calls:** new | Utility Log
**Called by:** import | new events
**CFs:** Param, PText
