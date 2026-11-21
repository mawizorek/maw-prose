---
id: ddr-asbuilt-new-app-session-token
title: new | App Session Token (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# new | App Session Token

```
Set Variable [ $uuid; Value:Get ( UUID ) ]
Set Field [ view_GLOBAL_USE::g_pkCurrentAppSession; $uuid ]
```

**Fields:** view_GLOBAL_USE::g_pkCurrentAppSession
**Called by:** on App Open
