---
id: mawster-ide-new-record
title: "IDE mirror - New-Record"
type: reference
status: hidden
order: 6
revised: 2026-08
summary: Verbatim transcription of the New-Record folder. 1 script.
---

# IDE mirror - `New-Record`

<!-- VERBATIM TRANSCRIPTION. Source: mawizorek/uritp-docs @ 2a9909d,
     .../DDR_imports/2608142227/raw.txt, part 17/20. Nothing corrected. -->

Exact IDE folder name: `New-Record`

Transcription note: the Script Hierarchy block also lists `lookup | production short` on the line after `new-import-session`, but that script's own DDR entry prints no `Parent Folder`, so it is filed in `_ROOT.md` with the conflict stated. Only `new-import-session` carries `Parent Folder: [New-Record]`.

---

### new-import-session

```
Parent Folder:                          [New-Record]
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
New Record/Request
Set Field [ UTILITY_SESSIONS::fkcurr_importProduction; view_GLOBAL_USE::g_pkCurrentProduction ]
```

Fields used: `view_GLOBAL_USE::g_pkCurrentProduction`, `UTILITY_SESSIONS::fkcurr_importProduction`
Scripts used: (none)
Layouts used: (none)
Tables used: `GLOBAL_USE`, `UTILITY_SESSIONS`
Table occurrences used: `UTILITY_SESSIONS`, `view_GLOBAL_USE`
Custom Functions used: (none)
Custom menu set used: (none)
