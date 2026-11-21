---
id: ddr-asbuilt-import-event-records
title: import | Event records (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# import | Event records

Folder: 40-Importing / process.

```
#for import and field mapping
Import Records [ ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

**Calls:** new | Utility Log
**Called by:** import | new events
**CFs:** Param, PText
