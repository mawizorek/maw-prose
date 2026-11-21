---
id: table-docz-archival-video
title: Archival Video
type: reference
status: public
order: 11
revised: Nov 2026
summary: The video extension of Archival Media. Cut points, offsets, the trim command.
data:
  catalog:
    file: DOCz_ARCHIVAL_VIDEO.tsv
---

# Archival Video

!!! abstract "Grain"
    One video file. A 1:1 extension of one [Archival Media](@table-docz-archival-media) row.

!!! data "catalog"

## The 1:1, enforced

The extension joins on `fkMedia`, and the graph currently draws that join as one-to-many, which is what FileMaker will allow. **Set `fkMedia` to Unique, validated always.** Then the 1:1 is a rule the file keeps instead of a habit you keep.

## Cut points are wall-clock time

Michael's ruling, 2026-11-15: trims anchor to real timestamps, not typed offsets.

**`ts_CutIn`** and **`ts_CutOut`** are Timestamps, the time of day the kept content starts and ends. They live on the **derivative's** video row, because they describe how that file was made. The original is never edited and never carries cut points.

They prefill from the event: auto-enter from `EVENT_INSTANCES::ts_Start_CALL_nl` and `ts_End_CALL_req`, with **do not replace existing**. The call window lands as the default and you nudge it to the real downbeat and bow. One field, one author, no override pair.

The current `ts_ContentTrimStart` / `ts_ContentTrimEnd` are Text holding offsets. They retire. Only Performance 2 holds data in them, so re-entering beats converting.

## Offsets and the command are calculations

**`calc_OffsetIn`** and **`calc_OffsetOut`** are unstored Number calcs. A timestamp minus a timestamp is seconds, and ffmpeg takes seconds for `-ss` and `-to` directly, so there is no time formatting anywhere in the chain:

```
ts_CutIn - DOCz_ARCHIVAL_MEDIA_self_Source::ts_CaptureStart
```

**`calc_TrimCommand`** is an unstored Text calc. The input is the source's path; the output is **this derivative's own path**, which is why `auto_ContentOutputPath` retires: a second field for a path the record already has is two authors of one value.

```
Let ( [
  src  = DOCz_ARCHIVAL_MEDIA_self_Source::auto_sourcePath ;
  out  = DOCz_ARCHIVAL_MEDIA::auto_sourcePath ;
  inS  = calc_OffsetIn ;
  outS = calc_OffsetOut
] ;
  If ( IsEmpty ( src ) or IsEmpty ( out ) or IsEmpty ( inS ) or IsEmpty ( outS ) or inS < 0 or outS <= inS ;
    "" ;
    "/opt/homebrew/bin/ffmpeg -ss " & inS & " -to " & outS & " -i " & Quote ( src ) & " -c copy -movflags +faststart " & Quote ( out )
  )
)
```

Three choices in it worth knowing:

- **`Quote()`** wraps and escapes for you. No hand-built `\"`.
- **The full ffmpeg path** works pasted into Terminal and is required under Perform AppleScript, whose shell does not see Homebrew. One command serves both button grades.
- **The guard returns empty**, not a broken command, until source, output and a sane window all exist. A negative in-point means the cut is before the tape was rolling, which is a data error worth seeing as a blank.

**Why the current command field is blank:** it is a Text field with an auto-enter calc. Auto-enter fires only when a field in its own table changes after the calc is defined, never backfills, and never watches a related field. It cannot track a path that lives on Media. An unstored calc reads live.

## Worked example: Performance 2

- Original media, `ts_CaptureStart` = 11/14/2026 1:33:14 PM, from the camera's filename.
- Trimmed media, `fkSourceMedia` = the original's `PrimaryKey`.
- Trimmed video row, `ts_CutIn` = 11/14/2026 1:59:00 PM, `ts_CutOut` = 3:37:00 PM.
- Offsets: 1546 and 7426 seconds. The same window as the hand-typed 00:25:46 to 02:03:46 that worked last night.

## Entry from either direction, later

Typing an offset instead of a time of day is still possible, without storing it: a global entry field with an OnObjectSave trigger that converts `offset + source capture start` into `ts_CutIn` and clears itself. The timestamp stays the only author. Not in this build.

## Fields

See [DOCz_ARCHIVAL_VIDEO.tsv](./DOCz_ARCHIVAL_VIDEO.tsv). `{.conf}` rows are in the live file; `{.tbc}` rows are proposed; retiring rows say so.
