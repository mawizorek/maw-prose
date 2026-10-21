---
id: mawster-ide-merge-rollback
title: "IDE mirror - 40-Importing / Pass to Workspace (merge + rollback)"
type: reference
status: hidden
order: 12
revised: 2026-08
summary: Verbatim transcription of the 3 merge/rollback scripts in the Pass to Workspace subfolder.
provenance: see 70-scripts/_ide/index.md
---

# IDE mirror - `Pass to Workspace` · merge + rollback

Exact IDE folder name: `Pass to Workspace` (inside `40-Importing`)

⚠️ **This is a FILE split, not a folder split.** All three scripts below live in the same
`Pass to Workspace` IDE folder as the five in `Pass-to-Workspace.md`. The split is purely a
repo-side read-size measure. **In FileMaker there is one folder.**

Sibling file: `Pass-to-Workspace.md` — the other 5 scripts.

---

### backup | EVENT

```
Parent Folder:                          [Pass to Workspace]
Previous Script:                        import | merge Event
Next Script:                            merge | compare field
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | merge Event`, `merge | compare field`, `XXmerge | Event Field`

Script Steps

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
//
// Set Variable [ $p; Value:Get ( ScriptParameter ) ]
//
// Set Variable [ $cuID; Value:ParamGetText ( $p ; "cuID" ; "" ) ]
// Set Variable [ $name; Value:ParamGetText ( $p ; "EventName" ; "err" ) ]
// Set Variable [ $start; Value:ParamGetText ( $p ; "dateTime_start" ; "" ) ]
// Set Variable [ $end; Value:ParamGetText ( $p ; "dateTime_end" ; "err" ) ]
// Set Variable [ $bool_AllDay; Value:ParamGetBool ( $p ; "bool_AllDay" ; "" ) ]
// Set Variable [ $fkReport; Value:ParamGetText ( $p ; "fkUtilityReport" ; "err" ) ]
// Set Variable [ $hash; Value:ParamGetText ( $p ; "hash_current" ; "err" ) ]
//
// Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; "err" ) ]
//
// Set Variable [ $styleKey; Value:ParamGetText ( $p ; "StyleKey" ; "" ) ]
//
//
//
//
//
//
//
//
//
// Set Variable [ $p; Value:Get ( ScriptParameter ) ]
// Set Variable [ $field; Value:ParamGetText ( $p ; "field" ; "" ) ]
// Set Variable [ $value; Value:ParamGetText ( $p ; "value" ; "" ) ]
//
// Set Field By Name [ "json_Rollback"; Get ( ActiveFieldContents ) ]
// Set Variable [ $JSONtemp; Value:Get ( ActiveFieldContents ) ]
// Set Field By Name [ "json_Rollback"; JSONPatch ( Get ( ActiveFieldContents ) ; $field ; $value ; "" ) ]
```

Fields used: `view_EVENTS::json_Rollback`
Scripts used: (none)
Layouts used: (none)
Tables used: `EVENTS`
Table occurrences used: `view_EVENTS`
Custom Functions used: `JSONPatch`, `ParamGetText`, `ParamGetBool`
Custom menu set used: (none)

---

### merge | compare field

```
Parent Folder:                          [Pass to Workspace]
Previous Script:                        backup | EVENT
Next Script:                            XXmerge | Event Field
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | merge Event`

Script Steps

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

Fields used: (none)
Scripts used: `backup | EVENT`
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: `ParamGetText`, `Param`, `PText`
Custom menu set used: (none)

---

### XXmerge | Event Field

```
Parent Folder:                          [Pass to Workspace]
Previous Script:                        merge | compare field
Next Script:                            lookup | calendar for production
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

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

Fields used: (none)
Scripts used: `backup | EVENT`
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: `ParamGetNumber`, `ParamGetText`, `Param`, `PText`
Custom menu set used: (none)
