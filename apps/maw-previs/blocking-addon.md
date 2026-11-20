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

MAW Blocking is a Blender extension, installed once per computer from disk, that adds a Blocking tab to the 3D Viewport sidebar. It turns the [[Blocking Method](@previs-blocking-method)] into buttons and keeps the bookkeeping out of sight.

Every button is one undo step. Installing it changes nothing in any file; only pressing a button does.

It targets Blender 5.2 LTS and works offline.

## Controls

### Pickers

Unit accepts only pucks. Route accepts any curve.

### Make Unit

Acts on the selected object.

- A figure, cube or prop gets a new puck at its feet, facing the way it faces, and is parented to it.
- A mark from the earlier single-route rig is adopted in place. Its Follow Path constraint is turned off and renamed as legacy, never deleted, and the mark stays where it visibly stands.
- A figure already parented to something is refused, and the refusal names the parent to select instead.

### New Route

Draws a two-point curve that starts exactly where the unit stands and points the way it faces, then selects it for shaping.

### Walk it backwards

Makes the next cross travel its route from the last point to the first.

### Depart and Arrive

Depart starts a cross on the current frame. Arrive finishes the open cross on the current frame.

### Cross list

Each cross gets a row showing its route and its departure and arrival frames.

- Each frame is a button that moves the playhead there.
- A record button beside it moves that moment to the playhead.
- A remove button deletes the cross and its rider while leaving the route alone.

## Refusals

The add-on refuses rather than guesses, and every refusal says what to do. It refuses:

- to depart while another cross is still open
- to arrive at or before the departure
- to depart on a route that has more than one piece
- to create anything whose name already exists

!!! note "Why multi-piece routes are refused"

    Follow Path follows only a curve's first piece and gives no sign that it has ignored the rest.

## Warnings

The cross list warns, live, when:

- a handoff jumps because one route does not end where the next begins
- a cross departs before the previous one arrives
- a cross never arrives
- a route has more than one piece

Distances print in the scene's own units. A unit with no warnings says so.

## What it writes

### Where things go

Pucks go in BLK_UNITS, routes in BLK_ROUTES and riders in BLK_RIDERS, each created under BLOCKING when that collection exists.

Pucks and riders are hidden from render; figures are not. Riders stay visible as small spheres, because a rider disabled in the viewport stops being evaluated and its unit freezes.

### How keys are written

Switch keys are written as Constant and offset keys with Bézier easing.

The add-on does this by setting the new-key preferences for the moment it writes and restoring them afterwards, rather than reaching into F-curves, whose Python API moved with Blender 5's slotted actions.

### Names

- A puck is named for its figure plus `_PUCK`.
- A rider is the puck's name plus `.X` and a two-digit cross number.
- A cross's constraint is `BLK X`, its number, then the route's name.

!!! warning "The panel is the only editor"

    Hand-editing BLK constraints or their influence keys breaks the bookkeeping.

## Not in this version

- Spike marks as named route endpoints
- A blocking run-sheet export
- Facing that follows the route automatically
- Props handed from one performer to another
