---
id: ddr-asbuilt-new-workday-x-event
title: new | workday x event (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# new | workday x event

Folder: BUTTONS.

```
// Set Variable [ $param; Value:Param ( List ( PText ( "fkEvent" ; $fkEvent ) ; PText ( "fkCalendar" ; $fkCalendar ) ; PText ( "fkProduction" ; $fkProduction ) ; PText ( "fkUtilityReport" ; $fkUtilityReport ) ; PText ( "date" ; $date ) ) ) ]
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $date; Value:ParamGetText ( $p ; "date" ; "err" ) ]
Set Variable [ $fkEvent; Value:ParamGetText ( $p ; "fkEvent" ; "err" ) ]
Set Variable [ $fkCalendar; Value:ParamGetText ( $p ; "fkCalendar" ; "err" ) ]
Set Variable [ $fkUtilityReport; Value:ParamGetText ( $p ; "fkUtilityReport" ; "err" ) ]
New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
Perform Script [ “goTo | Events x Workdays” ]
New Record/Request
Set Field [ view_EVENTS_X_WORKDAYS::Date; $date ]
Set Field [ view_EVENTS_X_WORKDAYS::fkEvent; $fkEvent ]
// Set Field [ view_EVENTS_X_WORKDAYS::XfkWorkday ]
Set Field [ view_EVENTS_X_WORKDAYS::fkCalendar; $fkCalendar ]
Set Field [ view_EVENTS_X_WORKDAYS::fkUtilityReport; $fkUtilityReport ]
Close Window [ Current Window ]
```

**Fields:** view_EVENTS_X_WORKDAYS::Date, ::fkEvent, ::XfkWorkday, ::fkCalendar, ::fkUtilityReport
**Calls:** goTo | Events x Workdays
**Called by:** button | generate events x workdays
**CFs:** Param, PText, ParamGetText
