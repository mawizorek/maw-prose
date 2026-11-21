---
id: mawster-ide-80-goto
title: "IDE mirror - 80-GoTo"
type: reference
status: hidden
order: 12
revised: 2026-08
summary: Verbatim transcription of the 80-GoTo folder. 11 scripts, including a duplicated script name.
---

# IDE mirror - `80-GoTo`

<!-- VERBATIM TRANSCRIPTION. Nothing corrected.
     Source DDR 2608151650 @ d47535e, part 20/21, UUIDs verified.
     WHOLE FILE re-transcribed against the current DDR. One script is new; the other ten
     were re-read and verified byte-identical to 2608142227 apart from Next Script pointers. -->

Exact IDE folder name: `80-GoTo`

Transcription notes for this folder:

- `CURRENTS` is emitted as a folder header with NO scripts printed beneath it, and it appears in the body section AFTER these scripts, while the hierarchy block places it before them. Both positions recorded; neither chosen.
- **`goto_view_UTILITY_LOGS` appears TWICE** in the hierarchy and the DDR prints two entries under that one name with identical bodies. Both are transcribed below as instance 1 and instance 2. **Still true in this DDR generation.**
- Subfolder `85-NEW_WINDOWS` is in its own mirror file.

---

### goto_view_UTILITY_LOGS  *(instance 1)*

```
Parent Folder:                          [80-GoTo]
Previous Script:                        (none)
Next Script:                            goTo | view_UTILITY_REPORTS
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `new | Utility Log`

Script Steps

```
Go to Layout [ “view | UTILITY_LOGS” (view_UTILITY_LOGS) ]
```

Fields used: (none)
Scripts used: (none)
Layouts used: `view | UTILITY_LOGS`
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: (none)
Custom menu set used: (none)

---

### goTo | view_UTILITY_REPORTS

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goto_view_UTILITY_LOGS
Next Script:                            goTo | productions
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `goTo | new window currentRunReport`, `new | Utility Report`

Script Steps

```
Go to Layout [ “view | UTILITY_REPORTS” (view_UTILITY_REPORTS) ]
#if a "fk" is passed, then filter the goTo to that record(s)
#set a default fallback per goTo script, but leave the if below alone then
Set Variable [ $default; Value:$$currentUtilityReport ]
If [ IsEmpty ( Get ( ScriptParameter ) ) ]
Exit Script [ Result: Param ( List ( 1 ; PText ( "message" ; "no filtering" ) ) ) ]
Else
Set Variable [ $p; Value:Get(ScriptParameter) ]
Set Variable [ $pk; Value:ParamGetText ( $p ; "fk" ; $$currentUtilityReport ) ]
End If
// Perform Script [ <unknown> ]
Enter Find Mode [ ]
Set Field [ view_UTILITY_REPORTS::PrimaryKey; $pk ]
Perform Find [ ]
If [ Get ( LastError ) ≠ 0 ]
Exit Script [ ]
End If
```

Fields used: `view_UTILITY_REPORTS::PrimaryKey`
Scripts used: (none)
Layouts used: `view | UTILITY_REPORTS`
Tables used: `UTILITY_REPORTS`
Table occurrences used: `view_UTILITY_REPORTS`
Custom Functions used: `Param`, `PText`, `ParamGetText`
Custom menu set used: (none)

Transcription note: `// Perform Script [ <unknown> ]` copied literally, `<unknown>` and all.

---

### goTo | productions

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goTo | view_UTILITY_REPORTS
Next Script:                            goTo | Calendars
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `lookup | production short`

Script Steps

```
Go to Layout [ “table | PRODUCTIONS” (view_PRODUCTIONS) ]
```

Fields used: (none)
Scripts used: (none)
Layouts used: `table | PRODUCTIONS`
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: (none)
Custom menu set used: (none)

---

### goTo | Calendars

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goTo | productions
Next Script:                            goTo | Events
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `lookup | calendar for production`

Script Steps

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

Fields used: `view_GLOBAL_USE::g_pkCurrentProduction`, `view_UTILITY_REPORTS::PrimaryKey`
Scripts used: (none)
Layouts used: `table | CALENDARS`, `view | UTILITY_REPORTS`
Tables used: `GLOBAL_USE`, `UTILITY_REPORTS`
Table occurrences used: `view_GLOBAL_USE`, `view_UTILITY_REPORTS`
Custom Functions used: `Param`, `PText`, `ParamGetText`
Custom menu set used: (none)

---

### goTo | Events

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goTo | Calendars
Next Script:                            goTo | Events x Workdays
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `compare | cu_ID`, `import | net new Event`, `import | merge Event`

Script Steps

```
Go to Layout [ “table | EVENTS” (view_EVENTS) ]
```

Fields used: (none)
Scripts used: (none)
Layouts used: `table | EVENTS`
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: (none)
Custom menu set used: (none)

---

### 🆕 goTo | Events x Workdays

*Source: DDR 2608151650, part 20/21. NEW.*

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goTo | Events
Next Script:                            goTo | table Import EVENTS
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `button | generate events x workdays`, `new | workday x event`

Script Steps

```
Go to Layout [ “table | EVENT_WORKDAYS” (view_EVENTS_X_WORKDAYS) ]
```

Fields used: (none)
Scripts used: (none)
Layouts used: `table | EVENT_WORKDAYS`
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: (none)
Custom menu set used: (none)

Transcription note: the script name says `Events x Workdays`, the layout it targets is named
`table | EVENT_WORKDAYS` (singular EVENT, no `x`), and the table occurrence is
`view_EVENTS_X_WORKDAYS`. Three spellings of one concept, copied exactly as each appears.

---

### goTo | table Import EVENTS

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goTo | Events x Workdays
Next Script:                            goto_view_Import_Sessions
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `button | import EVENTS`

Script Steps

```
Go to Layout [ “table | IMPORT_EVENTS” (view_IMPORT_EVENTS) ]
```

Fields used: (none)
Scripts used: (none)
Layouts used: `table | IMPORT_EVENTS`
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: (none)
Custom menu set used: (none)

---

### goto_view_Import_Sessions

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goTo | table Import EVENTS
Next Script:                            goto_view_APP_SESSIONS
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

```
Go to Layout [ “view_UTILITY_SESSIONS” (view_UTILITY_SESSIONS) ]
```

Fields used: (none)
Scripts used: (none)
Layouts used: `view_UTILITY_SESSIONS`
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: (none)
Custom menu set used: (none)

---

### goto_view_APP_SESSIONS

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goto_view_Import_Sessions
Next Script:                            goto_view_UTILITY_LOGS
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `trigger_App_Open`

Script Steps

```
Go to Layout [ “view | APP_SESSIONS” (view_APP_SESSIONS) ]
```

Fields used: (none)
Scripts used: (none)
Layouts used: `view | APP_SESSIONS`
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: (none)
Custom menu set used: (none)

---

### goto_view_UTILITY_LOGS  *(instance 2)*

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goto_view_APP_SESSIONS
Next Script:                            goto_view_VALUES
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

```
Go to Layout [ “view | UTILITY_LOGS” (view_UTILITY_LOGS) ]
```

Fields used: (none)
Scripts used: (none)
Layouts used: `view | UTILITY_LOGS`
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: (none)
Custom menu set used: (none)

Transcription note: body identical to instance 1. The two entries differ ONLY in their inbound-caller list: instance 1 reports `new | Utility Log` as a caller, instance 2 reports none.

---

### goto_view_VALUES

```
Parent Folder:                          [80-GoTo]
Previous Script:                        goto_view_UTILITY_LOGS
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

```
(empty - the DDR prints the Script Steps heading with no steps beneath it)
```

Fields used: (none)
Scripts used: (none)
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: (none)
Custom menu set used: (none)

Still empty in this DDR generation.

---

### CURRENTS  *(folder header, no scripts printed)*

The DDR emits the bare line `CURRENTS` in the body section at this position, with no `Parent Folder` block and no scripts following it before `85-NEW_WINDOWS`. Transcribed as an empty folder. Still empty in this DDR generation.
