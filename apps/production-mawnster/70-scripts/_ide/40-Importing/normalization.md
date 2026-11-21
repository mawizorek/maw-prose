---
id: mawster-ide-normalization
title: "IDE mirror - 40-Importing / normalization"
type: reference
status: hidden
order: 10
revised: 2026-08
summary: Verbatim transcription of the normalization subfolder. 5 scripts.
---

# IDE mirror - `normalization`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, parts 17-18/20. Nothing corrected. -->

Exact IDE folder name: `normalization` (inside `40-Importing`)

The three-line comment header `#be *in* the found set...` is repeated verbatim at the top of three of these scripts. It is transcribed each time it appears rather than deduplicated.

---

### import | delete empty rows

```
Parent Folder:                          [normalization]
Previous Script:                        (none)
Next Script:                            import | delete header row
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
#assume already in the found set
Set Error Logging [ On ; Custom debug info: ]
Go to Record/Request/Page [ First ]
Enter Find Mode [ ]
Set Field [ view_IMPORT_EVENTS::import_Name; "*" ]
Perform Find [ ]
Show Omitted Only
Enter Find Mode [ ]
Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $$currentUtilityReport ]
Constrain Found Set [ ]
Delete All Records [ No dialog ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_IMPORT_EVENTS::import_Name`, `view_IMPORT_EVENTS::fkUtilityReport`
Scripts used: `new | Utility Log`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

---

### import | delete header row

```
Parent Folder:                          [normalization]
Previous Script:                        import | delete empty rows
Next Script:                            import EVENT | remove ProdShortName
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
#assume already in the found set
Set Error Logging [ On ; Custom debug info: ]
Enter Find Mode [ ]
Set Field [ view_IMPORT_EVENTS::import_dateSTART; "Date" ]
Set Field [ view_IMPORT_EVENTS::import_dateSTART; "Date" ]
Perform Find [ ]
Delete All Records [ No dialog ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_IMPORT_EVENTS::import_dateSTART`
Scripts used: `new | Utility Log`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

Transcription note: the identical `Set Field` line appears twice in a row in the DDR. Copied as printed.

---

### import EVENT | remove ProdShortName

```
Parent Folder:                          [normalization]
Previous Script:                        import | delete header row
Next Script:                            import | remove maw notes
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
#be *in* the found set thyat you want to apply the search to first
#make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) but also covers multi imports
#could also filter by g_pkCurrentImportSession
Perform Script [ “filter | to current run” ]
Perform Script [ “lookup | production short” ]
Set Variable [ $shortLabel; Value:ParamGetText ( Get ( ScriptResult ) ; "shortLabel" ; "" ) ]
Go to Record/Request/Page [ First ]
Loop
Set Field [ view_IMPORT_EVENTS::Event Name; Substitute ( view_IMPORT_EVENTS::import_Name ; "[" & $shortLabel & "] " ; "" ) ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_IMPORT_EVENTS::import_Name`, `view_IMPORT_EVENTS::Event Name`
Scripts used: `filter | to current run`, `lookup | production short`, `new | Utility Log`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `ParamGetText`, `Param`, `PText`
Custom menu set used: (none)

---

### import | remove maw notes

```
Parent Folder:                          [normalization]
Previous Script:                        import EVENT | remove ProdShortName
Next Script:                            import | bool all day
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
#be *in* the found set thyat you want to apply the search to first
#make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) but also covers multi imports
#could also filter by g_pkCurrentImportSession
Perform Script [ “filter | to current run” ]
Go to Record/Request/Page [ First ]
Loop
Set Field [ view_IMPORT_EVENTS::Event Name; Let ( [ ~text = view_IMPORT_EVENTS::Event Name ] ; While ( [ ~result = ~text ; ~start = Position ( ~result ; "<" ; 1 ; 1 ) ; ~end = Position ( ~result ; ">" ; 1 ; 1 ) ] ; ~start > 0 and ~end > ~start ; [ ~result = Replace ( ~result ; ~start ; ( ~end - ~start ) + 1 ; "" ) ; ~start = Position ( ~result ; "<" ; 1 ; 1 ) ; ~end = Position ( ~result ; ">" ; 1 ; 1 ) ] ; ~result ) ) ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_IMPORT_EVENTS::Event Name`
Scripts used: `filter | to current run`, `new | Utility Log`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

---

### import | bool all day

```
Parent Folder:                          [normalization]
Previous Script:                        import | remove maw notes
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
#be *in* the found set thyat you want to apply the search to first
#make sure PRODUCTION is set first, cos that's the key it looks against. This lets events from one Production appear on anohter's *with* that acronym sometimes. (but that can also be formatted in) but also covers multi imports
#could also filter by g_pkCurrentImportSession
Perform Script [ “filter | to current run” ]
Go to Record/Request/Page [ First ]
Loop
If [ IsEmpty ( view_IMPORT_EVENTS::import_dateSTART ) and view_IMPORT_EVENTS::import_dateEND ]
Set Field [ view_IMPORT_EVENTS::bool_AllDay; 1 ]
Else If [ GetAsDate ( view_IMPORT_EVENTS::import_dateSTART ) ≠ GetAsDate ( view_IMPORT_EVENTS::import_dateEND ) and GetAsTime ( view_IMPORT_EVENTS::import_dateEND ) ≠ Time ( 24 ; 0 ; 0 ) ]
Set Field [ view_IMPORT_EVENTS::bool_AllDay; 1 ]
End If
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_IMPORT_EVENTS::import_dateSTART`, `view_IMPORT_EVENTS::import_dateEND`, `view_IMPORT_EVENTS::bool_AllDay`
Scripts used: `filter | to current run`, `new | Utility Log`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)
