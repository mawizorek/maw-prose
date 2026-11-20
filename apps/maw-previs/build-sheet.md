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

Both programs exist as prototypes written before these specs. They are kept as starting points and are revised against the specs before anything depends on them.

!!! warning "Neither has run in Blender yet"

    The first real install is the test.

### MAW Blocking 2.0.0

Checked only against a stand-in for Blender's Python built for the purpose: 37 checks covering crosses, retimes, overlaps, gaps, removal, insertion, reverse travel, shared routes, adoption of the earlier rig, re-registration and panel drawing.

That proves the logic. It does not prove the add-on runs in Blender. {.tbc}

### Showkit 1

Its dry run and its two refusals have been exercised. The half that builds files has not run anywhere, because only Blender can run it. {.tbc}

## Order of work

!!! danger "Steps 1 and 2 are gates"

    Nothing after them is built until both pass.

1. **Gate: run the blocking add-on in Blender.** Install it, adopt the existing mark, and block one cross on the existing route. If Depart refuses that route as two pieces, that also explains why the earlier rig barely moved the figure.
2. **Gate: prove linked blocking plays.** Link a blocking file's BLOCKING collection into an empty file and scrub. Constraint-driven animation inside a linked collection has not been confirmed on 5.2, and the whole architecture rests on it. If it fails, the architecture changes before anything else is built.
3. Set the show config: the frame rate read from the reference clip, and the real running order.
4. Dry run the Showkit, then build.
5. Move the existing SFANW file's scenery into scenery.blend, working on copies, and relink it from the opening's blocking file.
6. Block the opening, one track at a time, against the render cast's clip.
7. Light the opening in its previs file while the second number is blocked.
8. Repeat for each number.

## Known gaps

- [Fixtures and recorded DMX]{.gap} How they live in previs files is not settled, so a previs file per number is the current target rather than a fixed part of the architecture.
- [Running order]{.gap} The SFANW config does not yet carry numbers two to seven.
- [Stand-in figures]{.gap} Placeholders until a better figure is built into the library.
