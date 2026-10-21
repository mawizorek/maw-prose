---
id: mawster-ide-root
title: "IDE mirror - (root, no parent folder)"
type: reference
status: hidden
order: 2
revised: 2026-08
summary: Verbatim transcription of the 8 scripts whose DDR entry carries no Parent Folder line.
---

# IDE mirror - root level *(no parent folder)*

<!-- VERBATIM TRANSCRIPTION. Nothing corrected.
     Scripts 1-6: source DDR 2608142227 @ 2a9909d (that import folder has since been DELETED).
     Scripts 7-8: source DDR 2608151650 @ d47535e, part 16/21, UUIDs verified.
     MIXED GENERATION - each script is stamped with its own source below.
     REVISION: first commit substituted != for the not-equal glyph and stripped curly quotes.
     Restored to true verbatim 2026-08-15. -->

⚠️ **Filing conflict, unresolved on purpose.** These scripts print **no `Parent Folder`
line** in the DDR, which is how the DDR marks a root-level script. But the Script Hierarchy
block shows several of them sitting adjacent to folders. Both readings are recorded per script
below. **Do not fix this here** — confirm it in the file.

⚠️ **MIXED SOURCE GENERATIONS.** The first six scripts were transcribed from DDR `2608142227`
(Aug 14), which no longer exists in the repo. The last two come from `2608151650` (Aug 15).
One known drift in the older six is flagged inline. A full re-transcription against the
current DDR is pending — see `_ide/index.md` → Pending re-transcription.

---

### set Global | pkCurrentUtilitySession

*Source: DDR 2608142227.*

```
Parent Folder:                          (none printed)
Previous Script:                        (none)
Next Script:                            file | Create Backup
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         No
```

Layouts that use this script: (none)
Scripts that use this script: `button | import EVENTS`

Script Steps

```
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $fk; Value:ParamGetText ( $p ; "fk" ; "" ) ]
Set Field [ view_GLOBAL_USE::g_pkCurrentUtilitySession; $fk ]
```

Fields used: `view_GLOBAL_USE::g_pkCurrentUtilitySession`
Scripts used: (none)
Layouts used: (none)
Tables used: `GLOBAL_USE`
Table occurrences used: `view_GLOBAL_USE`
Custom Functions used: `ParamGetText`
Custom menu set used: (none)

---

### file | Create Backup

*Source: DDR 2608142227. Verified unchanged in 2608151650.*

```
Parent Folder:                          (none printed)
Previous Script:                        set Global | pkCurrentUtilitySession
Next Script:                            lookup | production short
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `on App Close`

Script Steps

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

Fields used: `view_GLOBAL_USE::g_AppTitle`
Scripts used: `new | Utility Log`
Layouts used: (none)
Tables used: `GLOBAL_USE`
Table occurrences used: `view_GLOBAL_USE`
Custom Functions used: `ParamGetText`, `Param`, `PText`
Custom menu set used: (none)

---

### lookup | production short

*Source: DDR 2608142227.* 🔴 **DRIFTED in 2608151650:** the `New Window` step gained
`Name: Get ( ScriptName );` after `Style: Document;`. Everything else identical. The block
below is the OLDER text.

*Hierarchy block places this line under `New-Record`. Its DDR entry prints no Parent Folder.*

```
Parent Folder:                          (none printed)
Previous Script:                        file | Create Backup
Next Script:                            status_index_move
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import EVENT | remove ProdShortName`

Script Steps

```
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $fkProduction; Value:ParamGetText ( $p ; "fkProduction" ; $$currentUtilityfkProduction ) ]
New Window [ Style: Document; Using layout: <Current Layout>; Height: 400; Width: 400; Top: 200; Close: Yes; Minimize: Yes; Maximize: No; Resize: Yes; Menu Bar: No; Dim parent window: No; Toolbars: No ]
Perform Script [ “goTo | productions” ]
Enter Find Mode [ ]
Set Field [ view_PRODUCTIONS::PrimaryKey; $fkProduction ]
Perform Find [ ]
If [ Get ( LastError ) ≠ 0 ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; "failed> " & Get ( ScriptName ) ) ; PText ( "comment" ; "No fkProduction" ) ) ) ]
Exit Script [ ]
End If
Set Variable [ $shortLabel; Value:view_PRODUCTIONS::TitleShort ]
Perform Script [ “new | Utility Log”; Parameter: Param ( List ( PText ( "action" ; Get ( ScriptName ) ) ; PText ( "comment" ; "with: " & $shortLabel ) ) ) ]
Close Window [ Current Window ]
Exit Script [ Result: Param ( List ( 1 ; PText ( "shortLabel" ; $shortLabel ) ) ) ]
```

Fields used: `view_PRODUCTIONS::PrimaryKey`, `view_PRODUCTIONS::TitleShort`
Scripts used: `goTo | productions`, `new | Utility Log`
Layouts used: (none)
Tables used: `PRODUCTIONS`
Table occurrences used: `view_PRODUCTIONS`
Custom Functions used: `ParamGetText`, `Param`, `PText`
Custom menu set used: (none)

---

### filter | to current run

*Source: DDR 2608142227. Verified unchanged in 2608151650.*

*Hierarchy block places this line at the end of `40-Importing`. Its DDR entry prints no Parent Folder.*

```
Parent Folder:                          (none printed)
Previous Script:                        lookup | production short
Next Script:                            exit w/ errors
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: `import EVENT | remove ProdShortName`, `import | remove maw notes`, `import | bool all day`, `import | pass to workspace`

Script Steps

```
Enter Find Mode [ ]
Set Field [ view_IMPORT_EVENTS::fkUtilityReport; $$currentUtilityReport ]
Perform Find [ ]
```

Fields used: `view_IMPORT_EVENTS::fkUtilityReport`
Scripts used: (none)
Layouts used: (none)
Tables used: `IMPORT_EVENTS`
Table occurrences used: `view_IMPORT_EVENTS`
Custom Functions used: (none)
Custom menu set used: (none)

---

### status_index_move

*Source: DDR 2608142227. Verified unchanged in 2608151650.*

*Hierarchy block places this line after `SHOW & HIDE`. Its DDR entry prints no Parent Folder.*

```
Parent Folder:                          (none printed)
Previous Script:                        filter | to current run
Next Script:                            exit w/ errors
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

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

Fields used: `view_VALUES::fkList`, `VALUE_LISTS::Sort`
Scripts used: (none)
Layouts used: (none)
Tables used: `VALUES`, `VALUE_LISTS`
Table occurrences used: `VALUE_LISTS`, `view_VALUES`
Custom Functions used: `ParamGetText`, `Param`, `Pbool`, `PNum`, `PText`
Custom menu set used: (none)

---

### exit w/ errors

*Source: DDR 2608142227. Verified unchanged in 2608151650, except `Next Script` now points at
`button | generate Workdays` (it was the last root script; two have been added after it).*

```
Parent Folder:                          (none printed)
Previous Script:                        status_index_move
Next Script:                            button | generate Workdays
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

```
#---
#REQUIRED: VALUE LIST
#EXPECTING: "next, previous, first, or last, in VALUE LIST sort"
#---
Set Error Capture [ On ]
Allow User Abort [ Off ]
Set Variable [ $p; Value:Get(ScriptParameter) ]
Set Variable [ $comment; Value:ParamGetText ( $p ; "comment" ; "" ) ]
If [ $comment ≠ "" ]
Show Custom Dialog [ Title: $comment; Message: "Exiting…"; Default Button: “OK”, Commit: “Yes” ]
End If
Exit Script [ Result: Param ( List ( Pbool ( "ok" ; 0 ) ; PNum ( "error" ; Get ( LastError ) ) ; PText ( "message" ; Get ( LastErrorDetail ) ) ) ) ]
```

Fields used: (none)
Scripts used: (none)
Layouts used: (none)
Tables used: (none)
Table occurrences used: (none)
Custom Functions used: `ParamGetText`, `Param`, `Pbool`, `PNum`, `PText`
Custom menu set used: (none)

---

## 🆕 New in DDR 2608151650

---

### button | generate Workdays

*Source: DDR 2608151650, part 16/21. NEW.*

```
Parent Folder:                          (none printed)
Previous Script:                        exit w/ errors
Next Script:                            sort | fkWorkday date
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         Yes
```

Layouts that use this script: `table | WORKDAYS`
Scripts that use this script: (none)

Bound to a Button Bar segment on `table | WORKDAYS` labelled `"generate WORKDAYS"`.

Script Steps

```
Set Error Capture [ On ]
#assume on WORKDAYS
Show All Records
Set Variable [ $startDate; Value:Date ( 8 ; 6 ; 2026 ) ]
Set Variable [ $endDate; Value:Date ( 5 ; 14 ; 2027 ) ]
Set Variable [ $date; Value:$startDate ]
Loop
Enter Find Mode [ ]
Set Field [ view_WORKDAYS::Date; $date ]
Perform Find [ ]
If [ Get ( FoundCount ) = 0 ]
New Record/Request
Set Field [ view_WORKDAYS::Date; GetAsDate ( $date ) ]
Else If [ Get ( FoundCount ) > 1 ]
Perform Script [ <unknown>; Parameter: Param ( List ( PText ( "action" ; "!ERR! " & Get ( ScriptParameter ) ) ; PText ( "comment" ; "Multiple workdays exist for the same date." ) ) ) ]
Commit Records/Requests [ No dialog ]
Pause/Resume Script [ Indefinitely ]
Else
#if found count == 1
End If
Exit Loop If [ $date = $endDate ]
Set Variable [ $date; Value:$date + 1 ]
// Go to Record/Request/Page [ Next; Exit after last ]
End Loop
```

Fields used: `view_WORKDAYS::Date`
Scripts used: (none)
Layouts used: (none)
Tables used: `WORKDAYS`
Table occurrences used: `view_WORKDAYS`
Custom Functions used: `Param`, `PText`
Custom menu set used: (none)

Transcription notes:

- `Perform Script [ <unknown>; ... ]` is a LIVE step and the DDR could not resolve its target. Copied literally.
- The date bounds are hardcoded literals: `Date ( 8 ; 6 ; 2026 )` to `Date ( 5 ; 14 ; 2027 )`. Copied as written.

---

### sort | fkWorkday date

*Source: DDR 2608151650, part 16/21. NEW.*

```
Parent Folder:                          (none printed)
Previous Script:                        button | generate Workdays
Next Script:                            (none - last script in the hierarchy)
Run script with full access privileges  Off
Siri Shortcut Visible                   Off
Include In Menu                         No
```

Layouts that use this script: (none)
Scripts that use this script: (none)

Script Steps

```
#WORKDAYS::Date
#EVENTS_x_WORKDAYS::Date (local)
#EVENTS::dateTIme_Start
Sort Records [ Keep records in sorted order; Specified Sort Order: WORKDAYS::Date; ascending EVENTS_X_WORKDAYS::Date; ascending EVENTS::dateTime_Start; ascending ] [ Restore; No dialog ]
```

Fields used: `WORKDAYS::Date`, `EVENTS_X_WORKDAYS::Date`, `EVENTS::dateTime_Start`
Scripts used: (none)
Layouts used: (none)
Tables used: `EVENTS`, `EVENTS_X_WORKDAYS`, `WORKDAYS`
Table occurrences used: `EVENTS`, `EVENTS_X_WORKDAYS`, `WORKDAYS`
Custom Functions used: (none)
Custom menu set used: (none)

Transcription note: the DDR prints the three sort keys run together on one line with no delimiter between `ascending` and the next field name. Copied as printed.
