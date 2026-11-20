---
id: previs-showkit
title: Showkit
type: reference
status: public
order: 40
revised: 2026-11
summary: The target spec for the show scaffolder, which builds a show's folders and pre-linked blank Blender files from one config.
related: [previs-architecture, previs-build-sheet]
---

# Showkit

## What it is

- Builds a new show's folders and blank Blender files, configured and pre-linked, from one config
- Runs headless from Terminal through Blender's own Python: [Command Line Arguments](https://docs.blender.org/manual/en/5.2/advanced/command_line/arguments.html)
- Never touches a file that's open in Blender
- Lives in `MAW_PREVIS/_TOOLS/` and finds the rest of the tree from there
- What it builds toward: [[Architecture](@previs-architecture)]
- Build status: [[Build Sheet](@previs-build-sheet)]

## The config

One JSON file per show in `_TOOLS/shows/`, named by show code:

- show code, year, title
- frame rate
- venue file path
- casts, and which one is rendered
- track letters
- musician count, cube count, cube size
- numbers in running order: two-digit code + short name

!!! warning "The frame rate has no default"

    The Showkit refuses to build until it's set, and prints the [ffprobe](https://ffmpeg.org/ffprobe.html) command that reads it off a clip. A 29.97 clip is entered as 29.97; Blender stores it as 30 over 1.001.

## What it builds

In dependency order, so every link points at a file that already exists:

1. Venue and figures libraries, if missing
2. The show's scenery, props and rig files
3. One blocking file per number
4. One previs file per number

Plus folders: source, reference by cast, renders.

### Every file

- The show's frame rate
- Start at frame 1
- Imperial display units
- AgX colour
- Scene named for the file
- Origin marker at center line × plaster line

### Libraries

- Figures: crude standing and seated stand-ins
- Props: CUBE_18, built to size
- Both marked as assets

### Blocking files

- The collection tree from [[Architecture](@previs-architecture)]
- Venue and scenery linked under REFERENCE ([Link & Append](https://docs.blender.org/manual/en/5.2/files/linked_libraries/link_append.html))
- Tracks, musicians and cubes placed as instances, lined up to drag to their presets
- If that number's clip is in the render cast's folder:
    - it goes into the Sequencer at frame 1, with sound
    - the scene end follows the clip
    - the Sequencer is excluded from rendering

### Previs files

- LIGHTS and CAMERAS collections
- One house camera aimed at the stage
- Cycles
- Links: venue, scenery, rig, that number's BLOCKING

## Safety

- No `--go`: dry run. Prints the plan, writes nothing.
- With `--go`: builds what's missing; never opens or overwrites an existing file. Safe to rerun as the config grows.
- Every run writes a report into the show folder: made, kept, skipped.

## Not in this version

- Importing Vectorworks exports into the scenery file
- Registering `_LIBRARY` as a Blender asset library
- A saved Blocking workspace layout
