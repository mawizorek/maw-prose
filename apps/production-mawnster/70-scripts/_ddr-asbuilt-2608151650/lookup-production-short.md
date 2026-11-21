---
id: ddr-asbuilt-lookup-production-short
title: lookup | production short (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# lookup | production short

```
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; $$currentUtilityfkProduction ) ]
New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Height: 400; Width: 400; Top: 200; Close: Yes; Minimize: Yes; Maximize: No; Resize: Yes; Menu Bar: No; Dim parent window: No; Toolbars: No ]
Perform Script [ “goTo | productions” ]
Enter Find Mode [ ]
Set Field [ view_PRODUCTIONS::PrimaryKey; $fkProduction ]
Perform Find [ ]
If [ Get ( LastError ) ≠ 0 ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "No fkProduction" ) ) ) ]
Exit Script [ ]
End If
Set Variable [ $shortLabel; Value:view_PRODUCTIONS::TitleShort ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "with: " & $shortLabel ) ) ) ]
Close Window [ Current Window ]
Exit Script [ Result: Param ( List ( 1 ; PText ( "shortLabel" ; $shortLabel ) ) ) ]
```

**Fields:** view_PRODUCTIONS::PrimaryKey, view_PRODUCTIONS::TitleShort
**Calls:** goTo | productions, new | Utility Log
**Called by:** import EVENT | remove ProdShortName
**CFs:** ParamGetText, Param, PText
