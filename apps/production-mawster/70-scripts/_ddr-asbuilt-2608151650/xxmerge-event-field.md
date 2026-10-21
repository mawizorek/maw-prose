---
id: ddr-asbuilt-xxmerge-event-field
title: XXmerge | Event Field (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against. `XX` prefix = superseded/parked in-file.
---

# XXmerge | Event Field

Folder: 40-Importing / Pass to Workspace. `XX` prefix marks it superseded by `merge | compare field`.

```
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $c; Value:ParamGetNumber ( $p ; "index" ; 0 ) ]
If [ $c = 0 ]
Exit Script [ ]
End If
Set Variable [ $field; Value:ParamGetText ( $p ; "field" ; "" ) ]
Set Variable [ $value; Value:ParamGetText ( $p ; "value" ; "" ) ]
Set Field By Name [ $field ]
Set Variable [ $currentValue; Value:Get ( ActiveFieldContents ) ]
If [ $currentValue = $value ]
Exit Script [ ]
Else
Commit Records/Requests [ No dialog ]
Set Variable [ $param; Value:Param ( List ( PText ( "field" ; $field ) ; PText ( "value" ; $currentValue ) ) ) ]
Perform Script [ “backup | EVENT”; Parameter: $param ]
Set Field By Name [ $field; $value ]
End If
```

**Calls:** backup | EVENT
**CFs:** ParamGetNumber, ParamGetText, Param, PText
