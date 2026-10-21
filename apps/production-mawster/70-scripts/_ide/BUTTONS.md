---
id: mawster-ide-buttons
title: "IDE mirror - BUTTONS"
type: reference
status: hidden
order: 5
revised: 2026-08
summary: Verbatim transcription of the BUTTONS folder. 3 scripts.
---

# IDE mirror - `BUTTONS`

<!-- VERBATIM TRANSCRIPTION. Nothing corrected.
     Source DDR 2608151650 @ d47535e, parts 16-17/21, UUIDs verified.
     All three scripts in this file are from the CURRENT DDR generation.
     button | import EVENTS was re-transcribed because it changed since 2608142227. -->

Exact IDE folder name: `BUTTONS`

---

### button | import EVENTS

*Source: DDR 2608151650. 🔄 RE-TRANSCRIBED — this script changed since 2608142227.*

```
Parent Folder:                          [BUTTONS]
Previous Script:                        (none)
Next Script:                            button | generate events x workdays
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: `Import New Events`
Scripts that use this script: (none)

Script Steps

```
#---
#Starting point: Assume BUTTON is on the IMPORT SESSIONS layout
#---
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $fkUtilitySession; Value:ParamGetText ( $p ; "fkUtilitySession" ; UTILITY_SESSIONS::PrimaryKey ) ]
#BEFORE LEAVING "SESSION"
#set g_pkCurrentImportSession to match
Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "fk" ; $fkUtilitySession ) ) ) ]
Perform Script [ “set Global | pkCurrentUtilitySession”; Parameter: $param ]
Set Variable [ $$currentUtilityfkProduction; Value:UTILITY_SESSIONS::fkcurr_importProduction ]
Set Variable [ $title; Value:ParamGetText ( $p ; "title" ; Get ( ScriptName ) ) ]
Set Variable [ $comment; Value:ParamGetText ( $p ; "comment" ; "" ) ]
#temp menu to fill in those details
// Show Custom Dialog [ Title: "Details:"; Default Button: “OK”, Commit: “Yes”; Button 2: “Abort”, Commit: “No”; Input #1: $title, "Utlilty Report title: "; Input #2: $comment, "Comments?" ]
#new REPORT and new LOG
Set Variable [ $param; Value:Param ( List ( PText ( "title" ; $title ) ; PText ( "comment" ; $comment ) ) ) ]
Perform Script [ “new | Utility Report”; Parameter: $param ]
Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
Perform Script [ “new | Utility Log”; Parameter: $param ]
#start a new window to execute the workflow
New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
Perform Script [ “goTo | table Import EVENTS” ]
Perform Script [ “Show ALL or NONE”; Parameter: Param ( List ( 1 ; PText ( "mode" ; "None" ) ) ) ]
# DO THE ACTUAL IMPORTING NOW
// Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "fkProduction" ; UTILITY_SESSIONS::fkcurr_importProduction ) ) ) ]
Perform Script [ “import | new events” ]
Close Window [ Current Window ]
```

Fields used: `UTILITY_SESSIONS::PrimaryKey`, `UTILITY_SESSIONS::fkcurr_importProduction`, `<Missing Field>`
Scripts used: `set Global | pkCurrentUtilitySession`, `new | Utility Report`, `new | Utility Log`, `goTo | table Import EVENTS`, `Show ALL or NONE`, `import | new events`
Layouts used: (none)
Tables used: `UTILITY_SESSIONS`
Table occurrences used: `UTILITY_SESSIONS`
Custom Functions used: `ParamGetText`, `Param`, `PText`
Custom menu set used: (none)

Transcription note: `<Missing Field>` appears in the DDR dependency list exactly as written. Copied, not diagnosed.

---

## 🆕 New in DDR 2608151650

---

### button | generate events x workdays

*Source: DDR 2608151650, part 17/21. NEW.*

```
Parent Folder:                          [BUTTONS]
Previous Script:                        button | import EVENTS
Next Script:                            new | workday x event
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         No
```

Layouts that use this script: `table | EVENTS`
Scripts that use this script: (none)

Script Steps

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

Fields used: `<Missing Field>`, `view_EVENTS_X_WORKDAYS::fkCalendar`, `view_EVENTS::fkCalendar`, `view_EVENTS::PrimaryKey`, `view_EVENTS::fkProduction`, `view_EVENTS::fkUtilityReport`, `view_EVENTS::dateTime_Start`, `view_EVENTS::bool_AllDay`, `view_EVENTS::dateTime_End`
Scripts used: `goTo | Events x Workdays`, `new | workday x event`
Layouts used: (none)
Tables used: `EVENTS`, `EVENTS_X_WORKDAYS`
Table occurrences used: `view_EVENTS`, `view_EVENTS_X_WORKDAYS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

Transcription notes:

- `Delete All Records` is printed WITHOUT a `[ No dialog ]` suffix here, unlike the delete steps in `normalization`. Copied as printed.
- `<Missing Field>` heads the dependency list. Copied as written.

---

### new | workday x event

*Source: DDR 2608151650, part 17/21. NEW.*

```
Parent Folder:                          [BUTTONS]
Previous Script:                        button | generate events x workdays
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `button | generate events x workdays`

Script Steps

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

Fields used: `view_EVENTS_X_WORKDAYS::Date`, `view_EVENTS_X_WORKDAYS::fkEvent`, `view_EVENTS_X_WORKDAYS::XfkWorkday`, `view_EVENTS_X_WORKDAYS::fkCalendar`, `view_EVENTS_X_WORKDAYS::fkUtilityReport`
Scripts used: `goTo | Events x Workdays`
Layouts used: (none)
Tables used: `EVENTS_X_WORKDAYS`
Table occurrences used: `view_EVENTS_X_WORKDAYS`
Custom Functions used: `Param`, `PText`, `ParamGetText`
Custom menu set used: (none)

Transcription note: the `XfkWorkday` set line is commented out, yet `XfkWorkday` still appears in the DDR's Fields-used list. Copied as reported.
