---
id: ddr-asbuilt-import-delete-empty-rows
title: import | delete empty rows (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import | delete empty rows

Folder: 40-Importing / normalization.

```
#assume already in the found set
Set Error Logging [ On ; Custom debug info: ]
Go to Record/Request/Page [ First ]
Enter Find Mode [ ]
Set Field [ view_IMPORT_EVENTS::import_Name; "*" ]
Perform Find [ ]
Show Omitted Only
Enter Find Mode [ ]
Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $$currentUtilityReport ]
Constrain Found Set [ ]
Delete All Records [ No dialog ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

**Fields:** view_IMPORT_EVENTS::import_Name, ::fkUtilityReport
**Calls:** new | Utility Log
**Called by:** import | new events
**CFs:** Param, PText
