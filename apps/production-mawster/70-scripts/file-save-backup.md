---
id: script-file-save-backup
title: FILE · Save Backup
type: reference
status: public
order: 75
revised: Aug 2026
summary: Timestamped copy of the file into ./zBACKUPS/. Fires on OPEN, not on close.
---

# FILE · Save Backup

!!! abstract "Grain"
    One copy of the whole `.fmp12` per run. Called by [FILE · Open](@script:script-file-open), and by a [Back up now]{.button}.

**Retired name:** [save zBACKUP | File](@alias:script-file-save-backup).

## 🔴 The ruling: this fires on OPEN, not on close

It was built on [OnLastWindowClose]{.trigger}. **Move it.** Three reasons, and the third one is the one that matters.

**1 · The close handler is a veto surface.** Anything called from it can stop the file from closing — see [FILE · Close](@script:script-file-close). A backup that can wedge the file shut is a worse problem than the one it solves.

**2 · A backup on close misses every session you actually want backed up.** No close trigger fires on a crash, a force quit, a lost connection or a killed process. **The sessions that end badly are exactly the sessions that produce nothing** — and those are the only ones where you would ever reach for a backup.

**3 · ⭐ On open you are copying a file nobody has touched yet.** Same argument the projection layer already runs on: back up the last known-good state, *before* today's edits, not the state produced by a session that may have gone wrong. **On close you preserve the damage. On open you preserve the last version that was fine.**

⚠️ **The cost, stated honestly: you lose the final session's work if you never reopen the file.** That is the trade, and it is the right side of it — a session's work is also sitting in the live file, which is not gone; a backup exists for when the live file *is*.

## The script

```
# ═══════════════════════════════════════════════════
# FILE · Save Backup
# Purpose: timestamped copy of this file into ./zBACKUPS/
# Params (JSON): prompt (bool, default 0)
# Returns (JSON): ok, skipped, reason, path
# ═══════════════════════════════════════════════════

Set Error Capture [ On ]
Allow User Abort [ Off ]

Set Variable [ $p ; Get ( ScriptParameter ) ]

#  -- 1. platform gate ------------------------------
#  Save a Copy as does not exist on FileMaker Go.
If [ PatternCount ( Get ( ApplicationVersion ) ; "Go" ) ]
    Exit Script [ Param ( List (
        PBool ( "ok"      ; 1 ) ;
        PBool ( "skipped" ; 1 ) ;
        PText ( "reason"  ; "FileMaker Go cannot save a copy" ) ) ) ]
End If

#  -- 2. hosted gate --------------------------------
#  A hosted file is backed up by the server, not by us.
If [ not IsEmpty ( Get ( HostName ) ) ]
    Exit Script [ Param ( List (
        PBool ( "ok"      ; 1 ) ;
        PBool ( "skipped" ; 1 ) ;
        PText ( "reason"  ; "file is hosted" ) ) ) ]
End If

#  -- 3. optional prompt ----------------------------
If [ ParamGetBoolean ( $p ; "prompt" ; 0 ) ]
    Show Custom Dialog [ "Save a backup?" ]
    If [ Get ( LastMessageChoice ) = 2 ]
        Exit Script [ Param ( List (
            PBool ( "ok"      ; 1 ) ;
            PBool ( "skipped" ; 1 ) ;
            PText ( "reason"  ; "declined" ) ) ) ]
    End If
End If

#  -- 4. build the destination ----------------------
#  Read the path live. Never trust a stored one.
Set Variable [ $path ; Get ( FilePath ) ]
Set Variable [ $dir  ; Left ( $path ;
    Position ( $path ; "/" ; Length ( $path ) ; -1 ) ) ]

Set Variable [ $ts ;
    Year ( Get ( CurrentDate ) )
    & Right ( "0" & Month  ( Get ( CurrentDate ) ) ; 2 )
    & Right ( "0" & Day    ( Get ( CurrentDate ) ) ; 2 )
    & "-"
    & Right ( "0" & Hour   ( Get ( CurrentTime ) ) ; 2 )
    & Right ( "0" & Minute ( Get ( CurrentTime ) ) ; 2 ) ]

Set Variable [ $file ; $dir & "zBACKUPS/"
    & Get ( FileName ) & " " & $ts & ".fmp12" ]

#  -- 5. write --------------------------------------
Save a Copy as [ "$file" ; copy of current file ; Create folders: On ]
If [ Get ( LastError ) ≠ 0 ]
    Exit Script [ ErrJSON ( Get ( LastError ) ; "Save a Copy as" ; $file ) ]
End If

Exit Script [ Param ( List (
    PBool ( "ok"      ; 1 ) ;
    PBool ( "skipped" ; 0 ) ;
    PText ( "path"    ; $file ) ) ) ]
```

Calls [ErrJSON](@calc:cf-errjson) and the canonical JSON parameter family — see [custom functions](@custom-functions).

🚫 **The `$file` passed to [ErrJSON](@calc:cf-errjson) is a FILE PATH, and that is deliberate.** A path is a location, not a person; it is the one thing worth having in the log when a backup fails. **Never widen it** — that function's page carries the rule, and the tempting call is the one that logs a value instead of a key.

## Why each piece

**⭐ Reading `Get ( FilePath )` live is right and it was right in the original.** It carries the platform prefix (`file:` / `filemac:`) already correct, so slicing the directory off the front of it means the destination inherits the prefix for free. Hand-building a path is how you get a script that works on one machine.

**`Position ( … ; Length ( $path ) ; -1 )` walks backwards** to the last separator. The negative occurrence is a real feature and the tidiest way to get a parent directory in FileMaker.

🔴 **The timestamp is zero-padded on purpose.** `Month ( … )` returns `8`, not `08`, so an unpadded stamp sorts `20260810` after `2026810` and the folder is scrambled permanently. **It is also built from the component functions rather than formatted from the date**, because `Get ( CurrentDate )` renders per the system locale — a backup set that changes its own filename shape when the machine's region setting moves is a genuinely nasty thing to debug.

🔴 **`Get ( LastError )` after `Save a Copy as` is not optional.** Disk full, a read-only volume, a locked folder, an insufficient privilege set: with capture on, every one of those returns cleanly and writes nothing. **A backup routine that silently does not back up is strictly worse than not having one**, because you stop thinking about it.

**The prompt defaults OFF.** A dialog on every run gets clicked through inside a week and then it is furniture. ⭐ **The log row is the confirmation** — [UTILITY_LOGS]{.rel} records that the backup ran, where it went, and how long it took, and that is a record you can actually check later. Pass `prompt: 1` from a manual [Back up now]{.button} if a human wants the choice.

**The hosted gate exists for the version of this file that lives on a server.** `Save a Copy as` is not permitted on a hosted file, and skipping deliberately is better than erroring — the server's own backup schedule is doing this job properly by then.

## ⚠️ Two things this script does not solve

**1 · The file lives in a synced folder.** Backups written beside it get pushed to iCloud or Dropbox on every run — a multi-MB upload each time, forever. **Exclude `zBACKUPS/` in the sync client**, or point the destination outside the synced tree. This is a setup step, not a code change, and it is the kind that gets skipped and then blamed on the script.

**2 · Nothing prunes.** A daily copy of a file that only grows means the folder only grows. ⬜ **Named as a gap and deliberately not built** {.gap} — nobody asked for it, and a delete-files routine written speculatively is a delete-files routine nobody reviewed. The obvious shape when it is wanted: keep the last N, plus the first of each month.

## Unverified

- `Get ( HostName )` as the hosted test. {.tbc} Believed empty for a local file and set for a hosted one. Confirm before relying on the gate rather than on the error.
- `PatternCount ( Get ( ApplicationVersion ) ; "Go" )` is the documented idiom for detecting FileMaker Go. {.tbc} `Get ( SystemPlatform )` would be tidier, but its numeric codes are **not** written here from memory — look them up and swap if you want the cleaner test.
- Whether `Create folders: On` creates `zBACKUPS/` on first run in every supported version, or only where the parent already exists. {.verify} **Test the very first run into an empty directory**, which is the one case nobody ever tests twice.
