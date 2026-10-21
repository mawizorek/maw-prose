---
id: ddr-asbuilt-merge-compare-field
title: merge | compare field (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# merge | compare field

Folder: 40-Importing / Pass to Workspace.

```
#assume ON the record already
#receive *any* field
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $field; Value:ParamGetText ( $p ; "field" ; "" ) ]
#and a value for that field to potentially update to
Set Variable [ $value; Value:ParamGetText ( $p ; "value" ; "err" ) ]
If [ $value = "err" ]
Exit Script [ ]
End If
#and probably a json key
#>>>use the field name as that identifier
#and then compare the CURRENT value in that field
Set Field By Name [ $field; Get ( ActiveFieldContents ) ]
Set Variable [ $currentValue; Value:Get ( ActiveFieldContents ) ]
#if it's the same, just pass back - no change
If [ $currentValue = $value ]
Exit Script [ ]
Else
// Commit Records/Requests [ No dialog ]
#if DIFFERENT, save the old value into json_Rollback (destructive of that value)
// Set Variable [ $param; Value:Param ( List ( PText ( "field" ; $field ) ; PText ( "value" ; $currentValue ) ) ) ]
// Perform Script [ “backup | EVENT”; Parameter: $param ]
#then paste in the new value
// Set Field By Name [ $field; $value ]
Set Field [ $value ]
End If
#RETURN: pass 0/1
```

**Calls:** backup | EVENT
**Called by:** import | merge Event
**CFs:** ParamGetText, Param, PText
