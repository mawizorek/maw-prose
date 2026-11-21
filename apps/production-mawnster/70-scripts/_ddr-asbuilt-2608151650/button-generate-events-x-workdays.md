---
id: ddr-asbuilt-button-generate-events-x-workdays
title: button | generate events x workdays (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# button | generate events x workdays

Folder: BUTTONS. On layout: table | EVENTS.

```
Set Error Capture [ On ]
#assume on EVENTS after import and current
#the join remains light and a join. it gets wiped and re-linked each time essentially cos it's just links
Show Custom Dialog [ Title: "which calendar?"; Default Button: “OK”, Commit: “Yes”; Button 2: “Abort”, Commit: “No”; Input #1: $fkCalendar, "fkCalendar" ]
New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
Perform Script [ “goTo | Events x Workdays” ]
Enter Find Mode [ ]
Set Field [ view_EVENTS_X_WORKDAYS::fkCalendar; $fkCalendar ]
Perform Find [ ]
If [ Get ( FoundCount ) > 0 ]
Delete All Records
End If
Close Window [ Current Window ]
#back in EVENTS, look at only this calendar
Enter Find Mode [ ]
Set Field [ view_EVENTS::fkCalendar; $fkCalendar ]
Perform Find [ ]
If [ Get ( FoundCount ) = 0 ]
Exit Script [ ]
End If
Go to Record/Request/Page [ First ]
Loop
Set Variable [ $fkEvent; Value:view_EVENTS::PrimaryKey ]
Set Variable [ $fkProduction; Value:view_EVENTS::fkProduction ]
Set Variable [ $fkCalendar; Value:view_EVENTS::fkCalendar ]
Set Variable [ $fkUtilityReport; Value:view_EVENTS::fkUtilityReport ]
If [ IsEmpty ( view_EVENTS::dateTime_Start ) and view_EVENTS::bool_AllDay = True ]
Set Variable [ $date; Value:view_EVENTS::dateTime_End ]
Set Variable [ $param; Value:Param ( List ( PText ( "fkEvent" ; $fkEvent ) ; PText ( "fkCalendar" ; $fkCalendar ) ; PText ( "fkProduction" ; $fkProduction ) ; PText ( "fkUtilityReport" ; $fkUtilityReport ) ; PText ( "date" ; $date ) ) ) ]
Perform Script [ “new | workday x event”; Parameter: $param ]
Else If [ GetAsDate ( view_EVENTS::dateTime_Start ) = GetAsDate ( view_EVENTS::dateTime_End ) ]
Set Variable [ $date; Value:view_EVENTS::dateTime_End ]
Set Variable [ $param; Value:Param ( List ( PText ( "fkEvent" ; $fkEvent ) ; PText ( "fkCalendar" ; $fkCalendar ) ; PText ( "fkProduction" ; $fkProduction ) ; PText ( "fkUtilityReport" ; $fkUtilityReport ) ; PText ( "date" ; $date ) ) ) ]
Perform Script [ “new | workday x event”; Parameter: $param ]
Else If [ GetAsDate ( view_EVENTS::dateTime_Start ) < GetAsDate ( view_EVENTS::dateTime_End ) ]
Set Variable [ $countNeeded; Value:GetAsDate ( view_EVENTS::dateTime_End ) - GetAsDate ( view_EVENTS::dateTime_Start ) + 1 ]
Set Variable [ $c; Value:1 ]
Set Variable [ $date; Value:view_EVENTS::dateTime_Start ]
Loop
Set Variable [ $param; Value:Param ( List ( PText ( "fkEvent" ; $fkEvent ) ; PText ( "fkCalendar" ; $fkCalendar ) ; PText ( "fkProduction" ; $fkProduction ) ; PText ( "fkUtilityReport" ; $fkUtilityReport ) ; PText ( "date" ; $date ) ) ) ]
Perform Script [ “new | workday x event”; Parameter: $param ]
Set Variable [ $c; Value:$c+1 ]
Exit Loop If [ $c > $countNeeded ]
Set Variable [ $date; Value:GetAsDate ( $date + Time ( 24 ; 0 ; 0 ) ) ]
End Loop
End If
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
```

**Fields:** view_EVENTS_X_WORKDAYS::fkCalendar, view_EVENTS::fkCalendar, view_EVENTS::PrimaryKey, view_EVENTS::fkProduction, view_EVENTS::fkUtilityReport, view_EVENTS::dateTime_Start, view_EVENTS::bool_AllDay, view_EVENTS::dateTime_End
**Calls:** goTo | Events x Workdays, new | workday x event
**CFs:** Param, PText
