---
id: previs-blocking-addon
title: Blocking Add-on
type: reference
status: public
order: 30
revised: 2026-11
summary: The target spec for MAW Blocking, the Blender add-on that drives the blocking method from a sidebar tab.
related: [previs-blocking-method, previs-build-sheet]
---

# Blocking Add-on

## What it is

- MAW Blocking: a Blender extension that adds a **Blocking** tab to the 3D Viewport sidebar
- Turns the [[Blocking Method](@previs-blocking-method)] into buttons and hides the bookkeeping
- Installed once per computer, from disk: [Get Extensions › Install from Disk](https://docs.blender.org/manual/en/5.2/editors/preferences/extensions.html)
- Every button is one undo step
- Installing changes nothing in any file; only pressing a button does
- Targets Blender 5.2 LTS; works offline
- Build status: [[Build Sheet](@previs-build-sheet)]

## Controls

### Pickers

- Unit: accepts pucks only
- Route: accepts any curve

### Make Unit

Acts on the selected object.

- Figure, cube or prop: gets a new puck at its feet, facing the way it faces, and is parented to it
- Mark from the earlier single-route rig: adopted in place
    - Its Follow Path constraint is turned off and renamed as legacy, never deleted
    - The mark stays where it visibly stands
- Figure already parented to something: refused; the refusal names the parent to select instead

### New Route

- Draws a two-point curve from exactly where the unit stands, pointing the way it faces
- Selects it for shaping

### Walk it backwards

- The next cross travels its route from the last point to the first

### Depart and Arrive

- Depart: starts a cross on the current frame
- Arrive: finishes the open cross on the current frame

### Cross list

One row per cross: route, departure frame, arrival frame.

- Each frame is a button that jumps the playhead there
- The record button beside it moves that moment to the playhead
- The remove button deletes the cross and its rider; the route stays

## Refusals

It refuses rather than guesses, and every refusal says what to do. It won't:

- depart while another cross is still open
- arrive at or before the departure
- depart on a route with more than one piece
- create anything whose name already exists

!!! note "Why multi-piece routes are refused"

    [Follow Path](https://docs.blender.org/manual/en/5.2/animation/constraints/relationship/follow_path.html) follows only a curve's first piece and gives no sign that it ignored the rest.

## Warnings

Live, in the cross list, when:

- a handoff jumps: one route doesn't end where the next begins
- a cross departs before the previous one arrives
- a cross never arrives
- a route has more than one piece

Display:

- Distances print in the scene's own units
- A unit with no warnings says so

## What it writes

### Where things go

- Pucks: BLK_UNITS
- Routes: BLK_ROUTES
- Riders: BLK_RIDERS
- Each created under BLOCKING when it exists ([[Architecture](@previs-architecture)])
- Pucks and riders: hidden from render. Figures: not.
- Riders stay visible as small spheres: a rider disabled in the viewport stops evaluating and its unit freezes

### How keys are written

- Switch keys: Constant ([Copy Location](https://docs.blender.org/manual/en/5.2/animation/constraints/transform/copy_location.html) influence)
- Offset keys: Bézier easing
- Done by setting the new-key preferences for the moment it writes, then restoring them
- Never reaches into F-curves, whose Python API moved with Blender 5's slotted actions

### Names

- Puck: figure's name + `_PUCK`
- Rider: puck's name + `.X` + two-digit cross number
- Cross constraint: `BLK X` + number + route name

!!! warning "The panel is the only editor"

    Hand-editing BLK constraints or their influence keys breaks the bookkeeping.

## Not in this version

- Spike marks as named route endpoints
- Blocking run-sheet export
- Facing that follows the route automatically
- Props handed from one performer to another
