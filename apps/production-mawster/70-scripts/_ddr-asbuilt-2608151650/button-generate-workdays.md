---
id: ddr-asbuilt-button-generate-workdays
title: button | generate Workdays (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against. ⚠️ Hardcoded date window.
---

# button | generate Workdays

Folder: (root). On layout: table | WORKDAYS. ⚠️ Hardcoded `Date(8;6;2026)` → `Date(5;14;2027)` window.

```
Set Error Capture [ On ]
#assume on WORKDAYS
Show All Records
Set Variable [ $startDate; Value:Date ( 8 ; 6 ; 2026 ) ]
Set Variable [ $endDate; Value:Date ( 5 ; 14 ; 2027 ) ]
Set Variable [ $date; Value:$startDate ]
Loop
Enter Find Mode [ ]
Set Field [ view_WORKDAYS::Date; $date ]
Perform Find [ ]
If [ Get ( FoundCount ) = 0 ]
New Record/Request
Set Field [ view_WORKDAYS::Date; GetAsDate ( $date ) ]
Else If [ Get ( FoundCount ) > 1 ]
Perform Script [ <unknown>; Parameter: Param ( List ( PText ( "action" ; "!ERR! " & Get ( ScriptParameter ) ) ; PText ( "comment" ; "Multiple workdays exist for the same date." ) ) ) ]
Commit Records/Requests [ No dialog ]
Pause/Resume Script [ Indefinitely ]
Else
#if found count == 1
End If
Exit Loop If [ $date = $endDate ]
Set Variable [ $date; Value:$date + 1 ]
// Go to Record/Request/Page [ Next; Exit after last ]
End Loop
```

**Fields:** view_WORKDAYS::Date
**On layout:** table | WORKDAYS (button bar)
**CFs:** Param, PText
