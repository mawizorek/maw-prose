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

The Showkit builds a new show's folders and blank Blender files, already configured and already linked to each other, from one small config file. It runs headless from Terminal through Blender's own Python, so it never touches a file that is open in Blender. It lives in `MAW_PREVIS/_TOOLS/` and finds the rest of the tree from there.

## The config

One JSON file per show in `_TOOLS/shows/`, named by show code. It holds the show code, year and title; the frame rate; the venue file's path; the casts and which one is rendered; the track letters; how many musicians and cubes there are, and the cube size; and the numbers in running order, each with a two-digit code and a short name.

The frame rate has no default. The Showkit refuses to build until it is set, and the refusal prints the ffprobe command that reads it off a clip. A 29.97 clip is entered as 29.97; Blender stores it as 30 over 1.001.

## What it builds

It builds in dependency order, so every link points at a file that already exists. First the venue and figures libraries if they are missing, then the show's scenery, props and rig files, then one blocking file per number, then one previs file per number. It also makes the source, reference-by-cast and renders folders.

Every file gets the show's frame rate, frame 1 as its start, imperial display units, AgX colour, a scene named for the file, and an origin marker at center line × plaster line.

The figures library gets crude standing and seated stand-ins. The props file gets CUBE_18, built to size. Both are marked as assets.

A blocking file gets the collection tree from [[Architecture](@previs-architecture)]. It links the venue and scenery under REFERENCE and places the tracks, musicians and cubes as instances, lined up to be dragged to their presets. If a reference clip for that number exists in the render cast's folder, the clip goes into the Sequencer at frame 1 with its sound, the scene's end follows the clip, and the Sequencer is excluded from rendering.

A previs file gets LIGHTS and CAMERAS collections, one house camera aimed at the stage, Cycles, and links to the venue, scenery, rig and that number's BLOCKING.

## Safety

A run without `--go` is a dry run: it prints the plan and writes nothing. A run with `--go` builds whatever is missing and never opens or overwrites an existing file, so it is safe to run again as the config grows. Every run writes a report into the show folder listing what it made, what it kept, and anything it skipped.

## Not in this version

Importing Vectorworks exports into the scenery file, registering `_LIBRARY` as a Blender asset library, and a saved Blocking workspace layout.
