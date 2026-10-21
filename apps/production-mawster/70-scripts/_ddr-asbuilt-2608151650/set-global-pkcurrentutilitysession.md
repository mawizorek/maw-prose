---
id: ddr-asbuilt-set-global-pkcurrentutilitysession
title: set Global | pkCurrentUtilitySession (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# set Global | pkCurrentUtilitySession

```
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $fk; Value:ParamGetText ( $p ; "fk" ; "" ) ]
Set Field [ view_GLOBAL_USE::g_pkCurrentUtilitySession; $fk ]
```

**Fields:** view_GLOBAL_USE::g_pkCurrentUtilitySession
**Called by:** button | import EVENTS
**CFs:** ParamGetText
