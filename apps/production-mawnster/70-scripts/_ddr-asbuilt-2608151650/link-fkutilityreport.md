---
id: ddr-asbuilt-link-fkutilityreport
title: link | fkUtilityReport (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# link | fkUtilityReport

Folder: 40-Importing / linking.

```
#assume already in found set
#and on: IMPORT_EVENTS based layout
Go to Record/Request/Page [ First ]
Set Variable [ $report; Value:$$currentUtilityReport ]
Loop
Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $report ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Go to Record/Request/Page [ First ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

**Fields:** view_IMPORT_EVENTS::fkUtilityReport
**Calls:** new | Utility Log
**Called by:** import | new events (commented out)
**CFs:** Param, PText
