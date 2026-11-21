---
id: mawster-ide-app-open
title: "IDE mirror - APP OPEN"
type: reference
status: hidden
order: 3
revised: 2026-08
summary: Verbatim transcription of the APP OPEN folder. 2 scripts.
---

# IDE mirror - `APP OPEN`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, part 16/20. Nothing corrected. -->

Exact IDE folder name: `APP OPEN`

File Options binds `OnFirstWindowOpen` to `on App Open`.

---

### on App Open

```
Parent Folder:                          [APP OPEN]
Previous Script:                        (none)
Next Script:                            new | App Session Token
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

```
Perform Script [ “new | App Session Token” ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]
```

Fields used: (none)
Scripts used: `new | App Session Token`, `new | Utility Log`
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

---

### new | App Session Token

```
Parent Folder:                          [APP OPEN]
Previous Script:                        on App Open
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `on App Open`

Script Steps

```
Set Variable [ $uuid; Value:Get ( UUID ) ]
Set Field [ view_GLOBAL_USE::g_pkCurrentAppSession; $uuid ]
```

Fields used: `view_GLOBAL_USE::g_pkCurrentAppSession`
Scripts used: (none)
Layouts used: (none)
Tables used: `GLOBAL_USE`
Table occurrences used: `view_GLOBAL_USE`
Custom Functions used: (none)
Custom menu set used: (none)
