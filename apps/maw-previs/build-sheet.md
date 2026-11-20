---
id: previs-build-sheet
title: Build Sheet
type: reference
status: public
order: 50
revised: 2026-11
summary: What is built, what has been tested and how, and the order of work for the first show.
related: [maw-previs, previs-blocking-addon, previs-showkit]
---

# Build Sheet

## Where things stand

- Both programs are prototypes written before these specs
- Kept as starting points; revised against the specs before anything depends on them

!!! warning "Neither has run in Blender yet"

    The first real install is the test.

### MAW Blocking 2.0.0

- Spec: [[Blocking Add-on](@previs-blocking-addon)]
- Checked only against a purpose-built stand-in for Blender's Python: 37 checks
- Covers crosses, retimes, overlaps, gaps, removal, insertion, reverse travel, shared routes, adopting the earlier rig, re-registration, panel drawing
- Proves the logic, not that it runs in Blender {.tbc}

### Showkit 1

- Spec: [[Showkit](@previs-showkit)]
- Exercised: the dry run and its two refusals
- Not run anywhere: the half that builds files, which only Blender can run {.tbc}

## Order of work

!!! danger "Steps 1 and 2 are gates"

    Nothing after them is built until both pass.

1. **Gate: the add-on runs in Blender.**
    - Install it, adopt the existing mark, block one cross on the existing route.
    - If Depart refuses that route as two pieces, that's also why the earlier rig barely moved the figure.
2. **Gate: linked blocking plays.**
    - Link a blocking file's BLOCKING into an empty file and scrub ([Link & Append](https://docs.blender.org/manual/en/5.2/files/linked_libraries/link_append.html)).
    - Constraint-driven animation inside a linked collection isn't confirmed on 5.2, and the whole [[Architecture](@previs-architecture)] rests on it.
    - If it fails, the architecture changes before anything else is built.
3. Set the show config: frame rate from the reference clip, real running order.
4. Dry run the Showkit, then build.
5. Move the existing SFANW file's scenery into scenery.blend (on copies) and relink it from the opening's blocking file.
6. Block the opening, one track at a time, against the render cast's clip.
7. Light the opening in its previs file while the second number is blocked.
8. Repeat for each number.

## Known gaps

- [Fixtures and recorded DMX]{.gap}: not settled, so one previs file per number is the current target, not a fixed part of the architecture
- [Running order]{.gap}: the SFANW config doesn't yet carry numbers two to seven
- [Stand-in figures]{.gap}: placeholders until a better figure is built into the library
