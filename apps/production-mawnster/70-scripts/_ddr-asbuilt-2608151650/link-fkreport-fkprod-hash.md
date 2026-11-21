---
id: ddr-asbuilt-link-fkreport-fkprod-hash
title: link | fkReport fkProd Hash (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# link | fkReport fkProd Hash

Folder: 40-Importing / linking.

```
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; $$currentUtilityfkProduction ) ]
Set Variable [ $report; Value:ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ]
#assume already in found set
#and on: IMPORT_EVENTS based layout
Go to Record/Request/Page [ First ]
Loop
Set Field [ view_IMPORT_EVENTS::fkProduction; $fkProduction ]
Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $report ]
// Set Field [ view_IMPORT_EVENTS::hash_history; view_IMPORT_EVENTS::cu_TaskID & "." & view_IMPORT_EVENTS::fkUtilityReport ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
// Go to Record/Request/Page [ First ]
Set Variable [ $hash; Value:view_IMPORT_EVENTS::hash_history ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "ex: " & $hash ) ) ) ]
```

**Fields:** view_IMPORT_EVENTS::fkProduction, ::fkUtilityReport, ::cu_TaskID, ::hash_history
**Calls:** new | Utility Log
**Called by:** import | new events
**CFs:** ParamGetText, Param, PText
