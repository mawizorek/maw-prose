---
id: ddr-asbuilt-on-app-close
title: on App Close (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# on App Close

Folder: APP CLOSE. Bound to `OnLastWindowClose`.

```
Commit Records/Requests [ No dialog ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "start> " & Get ( ScriptName ) ) ) ) ]
#save a backup?
Perform Script [ “file | Create Backup” ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; "end> " & Get ( ScriptName ) ) ) ) ]
```

**Calls:** new | Utility Log, file | Create Backup
**CFs:** Param, PText
