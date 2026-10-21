---
id: ddr-asbuilt-status-index-move
title: status_index_move (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against. Curated rename → UTIL · Value Index Move (splits into two).
---

# status_index_move

Folder: SHOW & HIDE.

```
#---
#REQUIRED: VALUE LIST
#EXPECTING: "mode" "next, previous, first, or last" in VALUE LIST sort
#CONDIITON: "curIndex" if "mode" = next or previous
#---
Set Error Capture [ On ]
Allow User Abort [ Off ]
Set Variable [ $p; Value:Get(ScriptParameter) ]
Set Variable [ $vl; Value:ParamGetText ( $p ; "vl" ; "abort" ) ]
If [ $vl = "abort" ]
Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
End If
Set Variable [ $mode; Value:ParamGetText ( $p ; "mode" ; "last" ) ]
If [ $mode = "next" or $mode = "previous" ]
Set Variable [ $curIndex; Value:ParamGetText ( $p ; "curIndex" ; "abort" ) ]
If [ $curIndex = "abort" ]
Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
End If
End If
Enter Find Mode [ ]
Set Field [ view_VALUES::fkList; $vl ]
Perform Find [ ]
If [ Get ( LastError ) ≠ 0 ]
Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
End If
Sort Records [ Keep records in sorted order; Specified Sort Order: VALUE_LISTS::Sort; ascending ] [ Restore; No dialog ]
If [ ]
End If
#perform script to: find "next, previous, first, or last, in VALUE LIST sort"
#return FIRST
```

**Fields:** view_VALUES::fkList, VALUE_LISTS::Sort
**CFs:** ParamGetText, Param, Pbool, PNum, PText
