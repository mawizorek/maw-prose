---
id: ddr-asbuilt-goto-calendars
title: goTo | Calendars (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# goTo | Calendars

Folder: 80-GoTo. ⚠️ Note the trailing filter block writes into `view_UTILITY_REPORTS::PrimaryKey`, not a CALENDARS field — as-built.

```
Go to Layout [ “table | CALENDARS” (view_CALENDARS) ]
// Go to Layout [ “view | UTILITY_REPORTS” (view_UTILITY_REPORTS) ]
#if a "fk" is passed, then filter the goTo to that record(s)
#set a default fallback per goTo script, but leave the if below alone then
Set Variable [ $default; Value:view_GLOBAL_USE::g_pkCurrentProduction ]
Set Variable [ $json_key; Value:"fkCalendar" ]
If [ IsEmpty ( Get ( ScriptParameter ) ) ]
Exit Script [ Result: Param ( List ( 1 ; PText ( "message" ; "no filtering" ) ) ) ]
Else
Set Variable [ $p; Value:Get(ScriptParameter) ]
Set Variable [ $pk; Value:ParamGetText ( $p ; $json_key ; $default ) ]
End If
// Perform Script [ <unknown> ]
Enter Find Mode [ ]
Set Field [ view_UTILITY_REPORTS::PrimaryKey; $pk ]
Perform Find [ ]
If [ Get ( LastError ) ≠ 0 ]
Exit Script [ ]
End If
```

**Fields:** view_GLOBAL_USE::g_pkCurrentProduction, view_UTILITY_REPORTS::PrimaryKey
**Called by:** lookup | calendar for production
**CFs:** Param, PText, ParamGetText
