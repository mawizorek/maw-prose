---
id: ddr-asbuilt-backup-event
title: backup | EVENT (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# backup | EVENT

Folder: 40-Importing / Pass to Workspace. Snapshots every non-Rollback field into `json_Rollback` via JSONPatch.

```
New Window [ Style: Document; Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes ]
Go to Next Field
Set Variable [ $startField; Value:Get ( ActiveFieldName ) ]
Loop
If [ PatternCount ( Get ( ActiveFieldName ) ; "Rollback" ) ]
Else
Set Variable [ $json; Value:view_EVENTS::json_Rollback ]
Set Variable [ $key; Value:Get ( ActiveFieldName ) ]
Set Variable [ $value; Value:Get ( ActiveFieldContents ) ]
Set Variable [ $jsonUpdated; Value: /*JSONSetElement ( $json ; [ $key ; $value ; JSONString ] )*/ JSONPatch ( $json ; $key ; $value ; "" ) ]
Set Field [ view_EVENTS::json_Rollback; $jsonUpdated ]
End If
Go to Next Field
Exit Loop If [ Get ( ActiveFieldName ) = $startField ]
End Loop
Close Window [ Current Window ]
#assume already ON THE RECORD
```

**Fields:** view_EVENTS::json_Rollback
**Called by:** import | merge Event, merge | compare field, XXmerge | Event Field
**CFs:** JSONPatch, ParamGetText, ParamGetBool
