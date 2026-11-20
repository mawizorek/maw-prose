---
id: maw-previs
title: MAW Previs
type: index
status: public
revised: 2026-11
summary: The Blender previs system for URITP shows. Linked show files, blocking against rehearsal video, and the tools that build and drive them.
---

# MAW Previs

## What it is

MAW Previs turns a show into a set of Blender files that can be blocked against rehearsal video and then lit photorealistically, without either job touching the other. It is built for URITP productions in SPAC and carries from show to show: the venue and the stand-in figures are made once, and each show adds only what is its own.

The system has three parts. The file architecture decides what lives where, and everything else depends on it. The blocking method is how performers, cubes and props get moved and timed. The tooling is two programs: a Blender add-on that drives the blocking method, and a scaffolder that builds a new show's folders and pre-linked blank files.

## Start here

- [[Architecture](@previs-architecture)]: folders, files, what each one owns, and the linking rules.
- [[Blocking Method](@previs-blocking-method)]: routes, riders, pucks and figures, and how a number gets blocked.
- [[Blocking Add-on](@previs-blocking-addon)]: the spec for the Blender add-on.
- [[Showkit](@previs-showkit)]: the spec for the show scaffolder.
- [[Build Sheet](@previs-build-sheet)]: what is built, what is tested, and the order of work.

## Not written yet

A SPAC venue note belongs in `venues/`, covering the origin at center line × plaster line, trim heights, and the survey the venue file is built from. A lighting note belongs here once it is settled how fixtures and recorded DMX live in the previs files. A Vectorworks import spec belongs here once the export format out of Vectorworks is fixed.

Code lives in `ClickUp_apps`, next to its own README. Decision history lives in ClickUp.
