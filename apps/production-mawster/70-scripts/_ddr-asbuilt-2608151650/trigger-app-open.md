---
id: ddr-asbuilt-trigger-app-open
title: trigger_App_Open (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against. 🪦 RETIRED in the curated tree.
---

# trigger_App_Open

Folder: 90-UTILITY. 🪦 **Retired** in the curated tree (one of three open-handler claimants).

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

**Fields:** view_APP_SESSIONS::StartTimestamp
**Calls:** goto_view_APP_SESSIONS, Show ALL or NONE
**CFs:** Param, PText
