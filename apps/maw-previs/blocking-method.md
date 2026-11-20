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

Every moving thing on stage is a **unit**, and a unit is four objects with four separate jobs.

The **route** owns where. It is a Bézier curve drawn on the stage, one per cross, and it climbs stairs because it is drawn in three dimensions. Routes are shared: two performers, a cube, or both casts can use the same one.

The **rider** owns when. It is a small hidden sphere, one per cross, that travels its route on a Follow Path constraint. Its Offset Factor is keyed 0 at departure and 1 at arrival with Blender's default easing, so the walk starts and stops naturally.

The **puck** owns facing. It is a floor disc with a nose that copies the position of whichever rider is live. Rotation Z on the puck is keyed by hand, so where someone looks never depends on where they walk.

The **figure** owns the look. It is the performer or cube model, parented to the puck and never keyed, and it can be swapped for a better model at any time without touching the timing.

## How a cross works

The puck carries one Copy Location constraint per cross, in run order. Each constraint switches from off to on exactly once and then stays on, and a later constraint overrides every earlier one. Reading the puck's constraint stack top to bottom reads the number's blocking in order.

The first cross is simply on, with no keys. That makes the unit's waiting position free: before its first departure, it stands at the start of its first route.

Every later cross switches on the frame after the previous cross arrives. At that moment both riders stand on the same spot, so the switch is invisible, and the departure can move anywhere inside the hold without anyone jumping. This is the property the method exists for. In the third week of rehearsal a departure gets retimed, and nothing else moves.

A hold is the gap between one arrival and the next departure. Nothing has to be keyed to make one.

## Why not one long route

A single route with its Offset Factor keyed along it fails the moment the route is extended. Offset Factor is a fraction of the whole route's length, so adding a segment at the end slides every earlier position along the curve. Short routes, one per cross, keep each cross's timing independent of every other.

## Blocking a number

The number's reference clip sits in the blocking file's Sequencer starting at frame 1, with the musical landmarks marked on the timeline and named by lyric.

Units are made from their figures and dragged to their presets. Then, one unit at a time, the playhead is scrubbed to the moment the performer leaves and the cross is started, then scrubbed to where they land and the cross is finished. A new route always starts exactly where the unit is standing, so crosses chain without gaps. Turns are Rotation Z keys on the puck.

One unit is blocked all the way through before the next is started. Handoffs between performers hang off the markers, not off each other's keyframes.

## Cases

**Exits** usually retrace an entrance, so a route can be walked backwards rather than drawn twice.

**Sitting and standing** need no rig. A seated figure and a standing figure sit under the same puck, and their visibility is keyed at the moment of the change.

**Musicians and set dressing** that never move are placed once in PRESET and get no puck.

**A carried cube** gets its own route alongside the carrier's, with the same departure and arrival frames.

**Shared routes stay shared.** Reshaping a route changes every unit that uses it, in both casts. When one cast's blocking diverges, that cast gets its own copy of the route.

**Two units on one route at the same time** walk through each other, which is accurate: that is a collision on stage as well. Parallel crosses get parallel routes.
