---
id: ddr-asbuilt-on-app-open
title: on App Open (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# on App Open

Folder: APP OPEN. Bound to `OnFirstWindowOpen`.

```
Perform Script [ “new | App Session Token” ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]
```

**Calls:** new | App Session Token, new | Utility Log
**CFs:** Param, PText
