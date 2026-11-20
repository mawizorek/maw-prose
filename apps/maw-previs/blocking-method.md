---
id: previs-blocking-method
title: Blocking Method
type: reference
status: public
order: 20
revised: 2026-11
summary: How performers, cubes and props are moved and timed against rehearsal video, and why the method survives weeks of revisions.
related: [maw-previs, previs-architecture, previs-blocking-addon]
---

# Blocking Method

## The four parts

Every moving thing on stage is a **unit**: four objects, four jobs.

!!! abstract "At a glance"

    The route owns where. The rider owns when. The puck owns facing. The figure owns the look.

### Route

- Owns where
- A Bézier curve on the stage, one per cross
- Drawn in 3D, so it climbs stairs
- Shared: two performers, a cube, or both casts can use one route

### Rider

- Owns when
- A small hidden sphere, one per cross
- Travels its route on a [Follow Path](https://docs.blender.org/manual/en/5.2/animation/constraints/relationship/follow_path.html) constraint
- Offset Factor keyed 0 at departure, 1 at arrival
- Blender's default easing, so the walk starts and stops naturally

### Puck

- Owns facing
- A floor disc with a nose
- Copies the position of whichever rider is live
- Rotation Z keyed by hand: where someone looks never depends on where they walk

### Figure

- Owns the look
- The performer or cube model, parented to the puck
- Never keyed
- Swap in a better model any time without touching the timing

## How a cross works

- The puck carries one [Copy Location](https://docs.blender.org/manual/en/5.2/animation/constraints/transform/copy_location.html) constraint per cross, in run order
- Each switches off to on exactly once, then stays on
- A later constraint overrides every earlier one
- Read the puck's constraint stack top to bottom = the number's blocking in order
- First cross: simply on, no keys. Before its first departure, a unit waits at the start of its first route.
- Every later cross: switches on the frame after the previous cross arrives
- At that moment both riders stand on the same spot, so the switch is invisible
- A hold is the gap between one arrival and the next departure; nothing is keyed to make one

!!! tip "Why retiming is safe"

    The departure can move anywhere inside the hold without anyone jumping. In the third week of rehearsal a departure gets retimed, and nothing else moves.

## Why not one long route

- Offset Factor is a fraction of the whole route's length
- Extend the route and every earlier position slides along the curve
- Short routes, one per cross, keep each cross's timing independent

## Blocking a number

Setup:

- The number's reference clip sits in the Sequencer from frame 1 ([Sequencer scene](https://docs.blender.org/manual/en/5.2/video_editing/sequencer_scene.html))
- Musical landmarks are timeline markers, named by lyric

Steps:

1. Make units from their figures and drag them to their presets.
2. Pick one unit. Scrub to the moment the performer leaves; start the cross.
3. Scrub to where they land; finish the cross.
4. Start the next route from where the unit stands. New routes always start there, so crosses chain without gaps.
5. Key turns as Rotation Z on the puck.
6. Finish that unit all the way through before starting the next.

- Handoffs between performers hang off the markers, not each other's keyframes
- The buttons for all of this: [[Blocking Add-on](@previs-blocking-addon)]

## Cases

- **Exits:** usually retrace an entrance, so walk the route backwards instead of drawing it twice
- **Sitting and standing:** no rig. A seated and a standing figure under one puck, visibility keyed at the change.
- **Musicians and set dressing:** placed once in PRESET, no puck
- **Carried cubes:** their own route beside the carrier's, same departure and arrival frames
- **Shared routes:** reshaping one changes every unit on it, in both casts. When one cast diverges, it gets its own copy.
- **Two units on one route at once:** they walk through each other, which is accurate, since that's a collision on stage too. Parallel crosses get parallel routes.
