---
id: previs-architecture
title: Architecture
type: reference
status: unlisted
order: 10
revised: 2026-11
summary: The folder tree, what each Blender file owns, and the rules that keep blocking and lighting from breaking each other.
related: [maw-previs, previs-blocking-method, previs-showkit]
---

# Architecture

## The one rule

Every piece of the show is edited in exactly one file, and every other file sees it through a read-only link. Blocking files never hold a light. Previs files never hold a blocking keyframe. A model's geometry lives in its library file and nowhere else.

Breaking this rule is how a reblock quietly moves a light, or a lighting session nudges a performer off a mark, and nobody finds out until the render.

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

`_LIBRARY` holds what every show uses. A show folder holds only what is that show's own, and is named year then show code so the folders sort by season.

## What each file owns

**The venue file** owns the room as a VENUE collection: walls, house, stage floor, pipes, anything that does not change between shows. It is built once.

**The figures file** owns the stand-ins as FIG_STANDING and FIG_SEATED. They are deliberately crude. Every performer in every show is an instance of one of these two collections, so when a better figure replaces what is inside them, every blocking file and every render updates without a keyframe changing. Each figure's origin is at its feet, and its nose faces −Y.

**The scenery file** owns the set as SCENERY. This is where the realism lives. Its materials are tuned here and never in a previs file, because a material changed downstream is a material lost the next time the link reloads.

**The props file** owns one master of each moving prop. The stage cube is CUBE_18, 18 inches on a side, with its origin at the bottom center so it sits on whatever it is placed on. Six cubes on stage are six instances of that one collection.

**The rig file** owns the hang positions as RIG.

**A blocking file** owns one number's movement. Its BLOCKING collection holds TRACKS for performers, CUBES, PRESET for musicians and anything placed once and never moved, and the BLK collections the add-on writes into. Its REFERENCE collection holds the linked venue and scenery, so there is a stage to block on. It also owns the number's reference video in the Sequencer and its timeline markers. It renders in EEVEE or Solid so it stays fast to scrub.

**A previs file** owns the lights, the cameras, the world and the Cycles settings for one number. It links the venue, the scenery, the rig, and that number's BLOCKING collection. The blocking plays in it and cannot be edited in it.

Only BLOCKING is ever linked out of a blocking file. REFERENCE stays home; linked out as well, it would load the scenery into the previs file twice.

## Why one file per number

A whole show on one timeline ripples. Re-cut the second number and every number after it shifts, which is the same failure a single long blocking route has, at the size of a show. Each number gets its own file and its own timeline starting at frame 1, so a change to one number cannot move another.

Continuity between numbers is carried by hand: where a performer ends one number is where they are preset in the next.

## Rules that are expensive to break later

**Frame rate** matches the reference video and is the same in every file of a show. It is set before any blocking starts, because changing it afterwards retimes every keyframe. The Showkit refuses to build a show until it is set.

**The origin** is center line × plaster line, in every file. Anything imported is moved to that origin before it is used, never the other way round.

**Units** display as imperial. Blender stores metres underneath, so an 18-inch cube is 0.4572 in raw values, which matters only to scripts.

**Tracks are named by role, never by actor:** TRK_A, MUS_01, CUBE_03. Both casts use the same names, and no student's name ends up in a file, a render, or this repo.

**One cast is blocked and rendered per number.** The casts move at different speeds and a render shows one of them. A second cast is blocked only when its staging differs in shape, not just in pace.

**Paths are relative,** so the whole MAW_PREVIS folder can move between machines. Live .blend files stay out of folders a sync service rewrites while Blender has them open.

**Links are made, never appended.** An appended copy stops receiving fixes.
