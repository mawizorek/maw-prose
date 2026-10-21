---
id: ddr-asbuilt-button-import-events
title: button | import EVENTS (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# button | import EVENTS

Folder: BUTTONS. On layout: Import New Events.

```
#---
#Starting point: Assume BUTTON is on the IMPORT SESSIONS layout
#---
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $fkUtilitySession; Value:ParamGetText ( $p ; "fkUtilitySession" ; UTILITY_SESSIONS::PrimaryKey ) ]
#BEFORE LEAVING "SESSION"
#set g_pkCurrentImportSession to match
Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "fk" ; $fkUtilitySession ) ) ) ]
Perform Script [ “set Global | pkCurrentUtilitySession”; Parameter: $param ]
Set Variable [ $$currentUtilityfkProduction; Value:UTILITY_SESSIONS::fkcurr_importProduction ]
Set Variable [ $title; Value:ParamGetText ( $p ; "title" ; Get ( ScriptName ) ) ]
Set Variable [ $comment; Value:ParamGetText ( $p ; "comment" ; "" ) ]
#temp menu to fill in those details
// Show Custom Dialog [ Title: "Details:"; Default Button: “OK”, Commit: “Yes”; Button 2: “Abort”, Commit: “No”; Input #1: $title, "Utlilty Report title: "; Input #2: $comment, "Comments?" ]
#new REPORT and new LOG
Set Variable [ $param; Value:Param ( List ( PText ( "title" ; $title ) ; PText ( "comment" ; $comment ) ) ) ]
Perform Script [ “new | Utility Report”; Parameter: $param ]
Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "action" ; Get ( ScriptName ) ) ) ) ]
Perform Script [ “new | Utility Log”; Parameter: $param ]
#start a new window to execute the workflow
New Window [ Style: Document; Name: Get ( ScriptName ); Using layout: <Current Layout>; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
Perform Script [ “goTo | table Import EVENTS” ]
Perform Script [ “Show ALL or NONE”; Parameter: Param ( List ( 1 ; PText ( "mode" ; "None" ) ) ) ]
# DO THE ACTUAL IMPORTING NOW
// Set Variable [ $param; Value:Param ( List ( 1 ; PText ( "fkProduction" ; UTILITY_SESSIONS::fkcurr_importProduction ) ) ) ]
Perform Script [ “import | new events” ]
Close Window [ Current Window ]
```

**Fields:** UTILITY_SESSIONS::PrimaryKey, UTILITY_SESSIONS::fkcurr_importProduction
**Calls:** set Global | pkCurrentUtilitySession, new | Utility Report, new | Utility Log, goTo | table Import EVENTS, Show ALL or NONE, import | new events
**CFs:** ParamGetText, Param, PText
