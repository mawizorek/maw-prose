---
id: ddr-asbuilt-compare-cu-id
title: compare | cu_ID (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# compare | cu_ID

Folder: 40-Importing / Pass to Workspace. Found-count decides net-new (0), merge (1), or fail (>1).

```
Set Error Capture [ On ]
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $cuID; Value:ParamGetText ( $p ; "cuID" ; "abort" ) ]
If [ $cuID = "abort" ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "no cuID passed" ) ) ) ]
Exit Script [ ]
End If
New Window [ Style: Document; Using layout: <Current Layout>; Height: 400; Top: 100; Close: Yes; Minimize: No; Maximize: No; Resize: Yes; Menu Bar: No; Dim parent window: No; Toolbars: No ]
Perform Script [ “goTo | Events” ]
Enter Find Mode [ ]
Set Field [ view_EVENTS::cuID; $cuID ]
Perform Find [ ]
If [ Get ( FoundCount ) > 1 ]
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "foundcount =/ 1" ) ) ) ]
Set Variable [ $logParam; Value:Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "foundcount =/ 1" ) ) ) ]
Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 0 ) ; PText ( "result" ; "failed" ) ) ) ]
Else If [ Get ( FoundCount ) = 0 ]
Set Variable [ $logParam; Value:Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "net new. FC: " & Get ( FoundCount ) ) ) ) ]
Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "net new" ) ) ) ]
Else If [ Get ( FoundCount ) = 1 ]
Set Variable [ $logParam; Value:Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "merge FC: " & Get ( FoundCount ) ) ) ) ]
Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "result" ; "merge" ) ) ) ]
End If
Close Window [ Current Window ]
Perform Script [ “new | Utility Log”; Parameter: $logParam ]
Exit Script [ Result: $scriptResult ]
```

**Fields:** view_EVENTS::cuID
**Calls:** new | Utility Log, goTo | Events
**Called by:** import | pass to workspace
**CFs:** ParamGetText, Param, PText, Pbool
