---
id: mawster-ide-app-close
title: "IDE mirror - APP CLOSE"
type: reference
status: hidden
order: 4
revised: 2026-08
summary: Verbatim transcription of the APP CLOSE folder. 1 script.
---

# IDE mirror - `APP CLOSE`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, part 16/20. Nothing corrected. -->

Exact IDE folder name: `APP CLOSE`

File Options binds `OnLastWindowClose` to `on App Close`.

---

### on App Close

```
Parent Folder:                          [APP CLOSE]
Previous Script:                        (none)
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

```
Commit Records/Requests [ No dialog ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
#save a backup?
Perform Script [ “file | Create Backup” ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]
```

Fields used: (none)
Scripts used: `new | Utility Log`, `file | Create Backup`
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)
