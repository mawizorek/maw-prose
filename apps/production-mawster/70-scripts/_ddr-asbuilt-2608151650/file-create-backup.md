---
id: ddr-asbuilt-file-create-backup
title: file | Create Backup (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# file | Create Backup

```
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $mode; Value:ParamGetText ( $p ; "mode" ; "confirm" ) ]
If [ $mode = "confirm" ]
Show Custom Dialog [ Title: "Save a backup?"; Default Button: “Yes”, Commit: “Yes”; Button 2: “No”, Commit: “No” ]
If [ Get ( LastMessageChoice ) = 2 ]
Exit Script [ ]
End If
End If
#get filapath in real time for sanity | don't rely on a variable
Set Variable [ $path; Value:Get ( FilePath ) ]
#strip filename to get parent directory
Set Variable [ $dir; Value:Left ( $path ; Position ( $path ; "/" ; Length ( $path ) ; -1 ) ) ]
#Timestamp for the backup name
Set Variable [ $ts; Value:Year ( Get ( CurrentDate ) ) & "" & Right("0" & Month ( Get ( CurrentDate ) ) ; 2 ) & "" & Right("0" & Day ( Get ( CurrentDate ) ) ; 2 ) & "_" & Right("0" & Hour ( Get ( CurrentTimestamp ) ) ; 2 ) & Right("0" & Minute ( Get ( CurrentTimestamp ) ) ; 2 ) ]
#build the backup destination
Set Variable [ $File; Value:$dir & "zBACKUPS/" & Substitute ( view_GLOBAL_USE::g_AppTitle ; " " ; "" ) & "_" & $ts & ".fmp12" ]
#Save the file
Save a Copy as [ “$File”; Create folders:Yes ] [ copy of current file ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
```

**Fields:** view_GLOBAL_USE::g_AppTitle
**Calls:** new | Utility Log
**Called by:** on App Close
**CFs:** ParamGetText, Param, PText
