---
id: ddr-asbuilt-lookup-calendar-for-production
title: lookup | calendar for production (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# lookup | calendar for production

Folder: 40-Importing / Pass to Workspace. Resolves the one CALENDAR for a production; fails on 0 or >1.

```
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "start" ) ) ) ]
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; view_GLOBAL_USE::g_pkCurrentProduction ) ]
New Window [ Style: Document; Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes ]
Perform Script [ “goTo | Calendars” ]
Enter Find Mode [ ]
Set Field [ view_CALENDARS::fkProduction; $fkProduction ]
Perform Find [ ]
If [ Get ( FoundCount ) = 0 or Get ( FoundCount ) > 1 ]
Set Variable [ $logParam; Value:Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "FC = " & Get ( FoundCount ) ) ) ) ]
Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 0 ) ; PText ( "fkCalendar" ; "indecisive" ) ) ) ]
Else
Set Variable [ $logParam; Value:Param ( List ( PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "fkProd: " & view_CALENDARS::fkProduction ) ) ) ]
Set Variable [ $scriptResult; Value:Param ( List ( Pbool ( "pass" ; 1 ) ; PText ( "fkCalendar" ; view_CALENDARS::PrimaryKey ) ) ) ]
End If
Close Window [ Current Window ]
Perform Script [ “new | Utility Log”; Parameter: $logParam ]
Exit Script [ Result: $scriptResult ]
```

**Fields:** view_GLOBAL_USE::g_pkCurrentProduction, view_CALENDARS::fkProduction, view_CALENDARS::PrimaryKey
**Calls:** new | Utility Log, goTo | Calendars
**Called by:** import | net new Event, import | merge Event
**CFs:** Param, PText, ParamGetText, Pbool
