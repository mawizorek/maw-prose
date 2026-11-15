---
id: table-docz-archival-media
title: Archival Media
type: reference
status: public
order: 10
revised: Nov 2026
summary: One file of archival media, original or derived. Small on purpose.
data:
  catalog:
    file: DOCz_ARCHIVAL_MEDIA.tsv
---

# Archival Media

!!! abstract "Grain"
    One media file. An original capture or a file derived from one.

!!! data "catalog"

## What belongs here

Only what is true of **every** kind of media the solution will ever hold: which event it documents, what file it is, where it lives, when it was captured, and what it was made from. Anything specific to one kind of media goes on that kind's extension table, which joins 1:1 on `fkMedia`. Video is the first extension: [Archival Video](@table-docz-archival-video).

## Derivatives are records, and they point home

A trimmed cut is its own media row with modifier `TRIMMED`. That part is already built and it is right. What is missing is the link back: today the original and the trim of Performance 2 are related only by sharing an event and a slug, which is a coincidence the file cannot check.

**`fkSourceMedia`** fixes that. It is a self-join: a derivative carries the `PrimaryKey` of the media it was cut from. Empty means the row is an original. Occurrence name, on the house pattern of `EVENT_INSTANCES_self_ParentEvent`:

```
DOCz_ARCHIVAL_MEDIA_self_Source
  DOCz_ARCHIVAL_MEDIA::fkSourceMedia = DOCz_ARCHIVAL_MEDIA_self_Source::PrimaryKey
```

The link is generic on purpose. A proxy, a compressed upload copy or an audio pull from the same tape is the same relationship with a different modifier, and needs no new field.

## Capture start is the anchor

**`ts_CaptureStart`** is the wall-clock moment the recording began. It lives here and not on video because every medium has one: a photo has a capture moment, an audio file has a start. It is what turns a cut point typed as a time of day into an offset into the file.

Where to read it, in order of trust:

1. The recorder's own filename stamp, when it has one. Performance 2's camera wrote `2026-11-14_13-33-14.mov`, which is local time, 1:33:14 PM.
2. The file's metadata: `ffprobe -v error -show_entries format_tags=creation_time -of csv=p=0 <file>`. QuickTime usually writes this in **UTC**, so it reads five hours ahead in November and has to be shifted before it is compared with a 2:00 PM call.

On a derivative, `ts_CaptureStart` stays empty. Its anchor is its source's.

## Live data, 2026-11-15

Read from the table view at 11:46a. Flagged here because each one will fight the new calcs; none are fixed.

- **Performance 2's path names a file that isn't the file.** `auto_sourcePath` points at `Downloads/BC_20261114_Performance2.mov`, the real capture is `RECORDINGS/2026-11-14_13-33-14.mov` in iCloud, and `auto_CalcFileName` says `BC_20261114_Performance2_ORIGINAL.mov`. Three names, one file. Once the file is renamed to the calculated name, the path should be a folder plus `auto_CalcFileName`, not typed.
- **`auto_sourceSlug` says `20261114` on every row,** including Performance 1 (event on 11/13) and Performance 4 (event on 11/15). The slug date is being typed. It should derive from the event, or better, from `ts_CaptureStart` once that exists.
- **Four `auto_` fields have no auto-enter:** `auto_sourcePath`, `auto_sourceSlug`, `auto_sourceFileType`, `auto_sourceFileSize`. The prefix promises a calculation that isn't there, and `auto_` isn't in [Data standards](@data-standards) at all. Open naming question, not a ruling.

## Fields

See [DOCz_ARCHIVAL_MEDIA.tsv](./DOCz_ARCHIVAL_MEDIA.tsv). `{.conf}` rows are in the live file; `{.tbc}` rows are proposed.
