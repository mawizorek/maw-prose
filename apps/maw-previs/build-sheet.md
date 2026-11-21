---
id: previs-build-sheet
title: Build Sheet
type: reference
status: public
order: 50
revised: 2026-11
summary: What is built, what has been tested and how, and the order of work for the first show.
related: [maw-previs, previs-blocking-addon, previs-showkit, previs-lighting]
---

# Build Sheet

## Where things stand

- Status words: **BUILT** (written) → **TESTED** (automated checks pass) → **VERIFIED** (Michael's own Blender, screenshot or console)
- Only Michael's evidence makes anything VERIFIED

### MAW Blocking 2.0.0

- Spec: [[Blocking Add-on](@previs-blocking-addon)]
- TESTED only against a purpose-built stand-in for Blender's Python: 37 checks
- Covers crosses, retimes, overlaps, gaps, removal, insertion, reverse travel, shared routes, adopting the earlier rig, re-registration, panel drawing
- Proves the logic, not that it runs in Blender {.tbc}

### Showkit 1

- Spec: [[Showkit](@previs-showkit)]
- Exercised: the dry run and its two refusals
- Not run anywhere: the half that builds files, which only Blender can run {.tbc}

### MAW Previz 0.5.0

- Spec: [[Lighting](@previs-lighting)] and [[Vectorworks Import](@previs-vectorworks-import)]
- BUILT. Rig-sync logic TESTED: 17 checks, plain Python, against the real inventory MVR
- The pre-flight already caught a real defect in that MVR: a follow spot with no GDTF that BlenderDMX had silently turned into an LED PAR
- Not yet run in Blender {.tbc}

### MAW Shutters 0.6

- Spec: [[Lighting](@previs-lighting)]
- VERIFIED at 0.3.1: headless Cycles self-test 9/9 on Blender 5.2.2, and the sidebar panel by screenshot
- 0.4 to 0.6 BUILT: Shutters naming, cue keys that keep hand-shaped curves, barrel and frost, Pull from Vectorworks {.tbc}
- Not yet driven by fixture blade channels {.tbc}

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

### Lighting track

Runs alongside, on the channel check rig, before any show plot.

1. **Gate: the rig syncs.** OPEN PREVIZ on the inventory MVR gives RIG PASS, every unit in place.
2. **Gate: Eos drives it.** A channel at full in Eos lights that unit in Blender over sACN.
3. Shutters on the moving lights' blade channels.
4. House lights: the Vectorworks layer, then the Previz zone faders.
5. Then the SFANW plot.

## Known gaps

- [Show rig file]{.gap}: one shared MVR per show for its per-number previs files, proposed `source/rig.mvr`, not built
- [Recorded DMX]{.gap}: whether cues are ever baked into keyframes is not settled
- [Running order]{.gap}: the SFANW config doesn't yet carry numbers two to seven
- [Stand-in figures]{.gap}: placeholders until a better figure is built into the library
