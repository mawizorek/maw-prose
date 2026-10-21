---
id: mawster-ide-90-utility
title: "IDE mirror - 90-UTILITY"
type: reference
status: hidden
order: 14
revised: 2026-08
summary: Verbatim transcription of the 90-UTILITY folder root. 2 scripts, neither with an inbound caller.
---

# IDE mirror - `90-UTILITY`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, part 19/20. Nothing corrected. -->

Exact IDE folder name: `90-UTILITY`

Subfolders, each in its own mirror file: `RUN_REPORTS` - `LOGS`.

Both scripts below report an empty `Scripts that use this script` list, and neither is the File Options handler (File Options binds `on App Open`). Recorded as reported, not interpreted.

---

### trigger_App_Open

```
Parent Folder:                          [90-UTILITY]
Previous Script:                        (none)
Next Script:                            App_Startup
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

```
#---
#---
Set Error Capture [ On ]
Allow User Abort [ Off ]
Perform Script [ “goto_view_APP_SESSIONS” ]
Perform Script [ “Show ALL or NONE”; Parameter: Param ( List ( PText ( "mode" ; "All" ); 1 ) ) ]
New Record/Request
Set Field [ view_APP_SESSIONS::StartTimestamp; Get ( CurrentTimestamp ) ]
Set Variable [ $$SESSION.token ]
```

Fields used: `view_APP_SESSIONS::StartTimestamp`
Scripts used: `goto_view_APP_SESSIONS`, `Show ALL or NONE`
Layouts used: (none)
Tables used: `APP_SESSIONS`
Table occurrences used: `view_APP_SESSIONS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

Transcription note: the final step is printed as `Set Variable [ $$SESSION.token ]` with no value expression. Copied as printed.

---

### App_Startup

```
Parent Folder:                          [90-UTILITY]
Previous Script:                        trigger_App_Open
Next Script:                            (none)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

```
#---
#EXPECTING: sessionToken
#---
Set Error Capture [ On ]
Allow User Abort [ Off ]
Set Variable [ $p; Value:Get(ScriptParameter) ]
Set Variable [ $session; Value:ParamGetText ( $p ; "sessionToken" ; $$SESSION.token ) ]
Perform Script [ <unknown> ]
If [ $mode = "ALL" ]
Show All Records
Else If [ $mode = "NONE" or $mode = "none" or $mode = "None" or $mode = "N" or $mode = "n" ]
End If
```

Fields used: (none)
Scripts used: (none)
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: `ParamGetText`
Custom menu set used: (none)

Transcription note: `Perform Script [ <unknown> ]` is a LIVE step here, not commented out, and the DDR could not resolve its target. Copied literally.
