---
id: mawster-ide-linking
title: "IDE mirror - 40-Importing / linking"
type: reference
status: hidden
order: 9
revised: 2026-08
summary: Verbatim transcription of the linking subfolder. 2 scripts.
---

# IDE mirror - `linking`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, part 17/20. Nothing corrected. -->

Exact IDE folder name: `linking` (inside `40-Importing`)

---

### link | fkUtilityReport

```
Parent Folder:                          [linking]
Previous Script:                        (none)
Next Script:                            link | fkReport fkProd Hash
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
#assume already in found set
#and on: IMPORT_EVENTS based layout
Go to Record/Request/Page [ First ]
Set Variable [ $report; Value:$$currentUtilityReport ]
Loop
Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $report ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Go to Record/Request/Page [ First ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_IMPORT_EVENTS::fkUtilityReport`
Scripts used: `new | Utility Log`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

Transcription note: the caller `import | new events` has this Perform Script line commented out.

---

### link | fkReport fkProd Hash

```
Parent Folder:                          [linking]
Previous Script:                        link | fkUtilityReport
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import | new events`

Script Steps

```
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; $$currentUtilityfkProduction ) ]
Set Variable [ $report; Value:ParamGetText ( $p ; "fkReport" ; $$currentUtilityReport ) ]
#assume already in found set
#and on: IMPORT_EVENTS based layout
Go to Record/Request/Page [ First ]
Loop
Set Field [ view_IMPORT_EVENTS::fkProduction; $fkProduction ]
Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $report ]
// Set Field [ view_IMPORT_EVENTS::hash_history; view_IMPORT_EVENTS::cu_TaskID & "." & view_IMPORT_EVENTS::fkUtilityReport ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
// Go to Record/Request/Page [ First ]
Set Variable [ $hash; Value:view_IMPORT_EVENTS::hash_history ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "ex: " & $hash ) ) ) ]
#assume already in found set
#and on: IMPORT_EVENTS based layout
// Go to Record/Request/Page [ First ]
// Set Variable [ $report; Value:$$currentUtilityReport ]
// Loop
// Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $report ]
// Go to Record/Request/Page [ Next; Exit after last ]
// End Loop
//
// Go to Record/Request/Page [ First ]
//
// Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

Fields used: `view_IMPORT_EVENTS::fkProduction`, `view_IMPORT_EVENTS::fkUtilityReport`, `view_IMPORT_EVENTS::cu_TaskID`, `view_IMPORT_EVENTS::hash_history`
Scripts used: `new | Utility Log`
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: `ParamGetText`, `Param`, `PText`
Custom menu set used: (none)
