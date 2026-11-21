---
id: ddr-asbuilt-import-merge-event
title: import | merge Event (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against. ⚠️ Known key-mismatch bug transcribed as-is.
---

# import | merge Event

Folder: 40-Importing / Pass to Workspace.

⚠️ **As-built bug:** param keys read here (`EventName`, `dateTime_start`, `dateTime_end`, `StyleKey`) do NOT match what `json_cleanImportDetails` emits (`Name`, `dateTime_Start`, `dateTime_End`, `fkStyle`). Merges fall through to fallbacks. Transcribed verbatim.

```
Set Error Capture [ On ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $cuID; Value:ParamGetText ( $p ; "cuID" ; "" ) ]
Set Variable [ $name; Value:ParamGetText ( $p ; "EventName" ; "err" ) ]
Set Variable [ $start; Value:ParamGetText ( $p ; "dateTime_start" ; "" ) ]
Set Variable [ $end; Value:ParamGetText ( $p ; "dateTime_end" ; "err" ) ]
Set Variable [ $bool_AllDay; Value:ParamGetBool ( $p ; "bool_AllDay" ; "" ) ]
Set Variable [ $fkReport; Value:ParamGetText ( $p ; "fkUtilityReport" ; "err" ) ]
Set Variable [ $hash; Value:ParamGetText ( $p ; "hash_current" ; "err" ) ]
Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; "err" ) ]
Set Variable [ $styleKey; Value:ParamGetText ( $p ; "StyleKey" ; "" ) ]
New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Height: 400; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: Yes; Menu Bar: No; Dim parent window: No; Toolbars: No ]
Perform Script [ “goTo | Events” ]
Enter Find Mode [ ]
Set Field [ view_EVENTS::cuID; $cuID ]
Perform Find [ ]
If [ Get ( FoundCount ) ≠ 1 ]
Exit Script [ ]
End If
Perform Script [ “backup | EVENT”; Parameter: $p ]
Go to Next Field
Set Variable [ $startField; Value:Get ( ActiveFieldName ) ]
Loop
Set Variable [ $value; Value:ParamGetText ( $p ; Get ( ActiveFieldName ) ; "err" ) ]
Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "field" ; Get ( ActiveFieldName ) ) ; PText ( "value" ; $value ) ) ) ]
Perform Script [ “merge | compare field”; Parameter: $param ]
Go to Next Field
Exit Loop If [ Get ( ActiveFieldName ) = $startField ]
End Loop
Close Window [ Current Window ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]
```

**Fields:** view_EVENTS::cuID (+ full field set via loop)
**Calls:** new | Utility Log, goTo | Events, backup | EVENT, merge | compare field, lookup | calendar for production
**Called by:** import | pass to workspace
**CFs:** Param, PText, ParamGetText, ParamGetBool, PNum
