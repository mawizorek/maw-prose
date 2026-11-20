---
id: previs-architecture
title: Architecture
type: reference
status: public
order: 10
revised: 2026-11
summary: The folder tree, what each Blender file owns, and the rules that keep blocking and lighting from breaking each other.
related: [maw-previs, previs-blocking-method, previs-showkit]
---

# Architecture

## The one rule

!!! warning "Edit everything in exactly one file"

    Every other file sees it through a read-only link.

    - Blocking files never hold a light.
    - Previs files never hold a blocking keyframe.
    - A model's geometry lives in its library file and nowhere else.

- Break it and a reblock quietly moves a light, or a lighting session nudges a performer off a mark.
- Nobody finds out until the render.
- How linking works: [Link & Append](https://docs.blender.org/manual/en/5.2/files/linked_libraries/link_append.html)

## The tree

```
MAW_PREVIS/
    _TOOLS/                     the add-on, the scaffolder, show configs
    _LIBRARY/
        venue/SPAC_venue.blend  the room
        figures/standins.blend  stand-in performers
    _SHOWS/
        2026_SFANW/
            source/             Vectorworks exports, reference clips by cast
            scenery.blend
            props.blend
            rig.blend
            blocking/
                01_opening.blend
            previs_01_opening.blend
            renders/
```

- `_LIBRARY`: what every show uses
- A show folder: only that show's own
- Show folders are named year then show code, so they sort by season
- The [[Showkit](@previs-showkit)] builds this tree

## What each file owns

### Venue file

- VENUE: walls, house, stage floor, pipes
- Anything that doesn't change between shows
- Built once

### Figures file

- FIG_STANDING and FIG_SEATED, deliberately crude
- Every performer in every show is an instance of one of them
- Replace what's inside: every blocking file and render updates, no keyframe changes
- Origin at the feet; nose faces −Y

### Scenery file

- SCENERY: where the realism lives
- Tune materials here only
- A material changed downstream is lost the next time the link reloads

### Props file

- One master per moving prop
- CUBE_18: 18 in per side, origin at the bottom center so it sits on whatever it's placed on
- Six cubes on stage = six instances of it

### Rig file

- RIG: the hang positions

### Blocking file

One number's movement.

- BLOCKING:
    - TRACKS: the performers
    - CUBES
    - PRESET: musicians and anything placed once and never moved
    - BLK collections: written by the [[Blocking Add-on](@previs-blocking-addon)]
- REFERENCE: linked venue and scenery, a stage to block on
- The number's reference video in the Sequencer, and its timeline markers
- Renders in EEVEE or Solid, so it scrubs fast
- How to block in it: [[Blocking Method](@previs-blocking-method)]

### Previs file

One number's lighting and render.

- Owns lights, cameras, world, Cycles settings
- Links venue, scenery, rig, and that number's BLOCKING
- The blocking plays here and can't be edited here

!!! note "Only BLOCKING leaves a blocking file"

    REFERENCE stays home. Linked out as well, it would load the scenery into the previs file twice.

## Why one file per number

- One show-long timeline ripples: re-cut the second number and every later number shifts
- Same failure as one long blocking route, at the size of a show ([[Blocking Method](@previs-blocking-method)])
- Each number gets its own file and its own timeline from frame 1
- Continuity between numbers is by hand: where a performer ends one number is their preset in the next

## Rules that are expensive to break later

### Frame rate

- Matches the reference video
- Same in every file of a show
- Set before blocking starts: changing it later retimes every keyframe
- The [[Showkit](@previs-showkit)] refuses to build until it's set

### Origin

- Center line × plaster line, in every file
- Imports move to the origin, never the other way round

### Units

- Display: imperial
- Stored: metres, so an 18 in cube is 0.4572 in raw values
- Only scripts care

### Track names

- By role, never by actor: TRK_A, MUS_01, CUBE_03
- Both casts share the names
- No student names in files, renders, or this repo

### One cast per number

- Block and render one cast
- Casts move at different speeds; a render shows one
- Block the second cast only when its staging differs in shape, not just pace

### Paths

- Relative, so MAW_PREVIS moves between machines intact
- Live .blend files stay out of folders a sync service rewrites while Blender has them open

### Links

- Link, never append
- An appended copy stops receiving fixes
