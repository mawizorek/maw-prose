---
id: previs-vectorworks-import
title: Vectorworks Import
type: reference
status: public
order: 45
revised: 2026-11
summary: What leaves Vectorworks for a previs file, how to export it, and what the previs tool refuses.
related: [maw-previs, previs-lighting, previs-architecture]
---

# Vectorworks Import

## What crosses

- **Fixtures**: MVR. Type, hang position, GDTF and mode, patch, Channel.
- **Geometry**: FBX, from the venue and scenery files. Never inside the MVR.
- **Shutter cuts and frost as drawn**: a read-only device dump (`vwx_dump_lighting_devices.py`, in [ClickUp_apps/blender/previz/vectorworks](https://github.com/mawizorek/ClickUp_apps/blob/main/blender/previz/vectorworks/vwx_dump_lighting_devices.py)), which MAW Shutters can pull from.
- Origin is centre line × plaster line, the same in Vectorworks and every Blender file ([[Architecture](@previs-architecture)]).

## Before you export

### Every DMX unit has a GDTF

- Default Vectorworks symbols only fetch a GDTF on their own when they carry a Type ID. Most don't.
- Assign by hand: Spotlight › GDTF › Open GDTF Share Connection (free GDTF Share account) › find the unit › into the Resource Manager › drag onto the device › set **GDTF Fixture Mode** to the mode you'll patch.
- A patched unit without a GDTF is refused. BlenderDMX would otherwise swap in a generic LED PAR without saying so.

### Patch is real

- Universe and address on every DMX unit.
- No overlaps. The previs tool reads each unit's channel count from its GDTF mode, so a 48-channel mover and a 10-channel ellipsoidal can't silently share space.
- No unit runs across a universe boundary.

### Channel is filled

The Channel field (exported as Fixture ID) is what Eos calls the unit. Fill it and Blender's labels read like the console. Missing Channels are a warning, not a refusal.

### Units that aren't DMX

Follow spots and anything else that isn't on the console: leave unpatched and without a GDTF. Previz skips them.

## Export

- File › Export › Export MVR.
- Fixtures layer only. No scene objects, no trusses: geometry goes by FBX, and an MVR with scenery runs to hundreds of MB.
- Focus points: off, unless the units are actually focused to points. Without them, units point as drawn.
- Save it beside the previs file, **named exactly like it**: `SPAC_CHANNEL_CHECK.blend` takes `SPAC_CHANNEL_CHECK.mvr`. Replace it every time. Never leave versions next to it.

## What Previz refuses, skips, warns

- **Refuses** (nothing imports, the report names the fix): a patched unit whose GDTF isn't in the MVR · a mode the GDTF doesn't have · a patch overlap · a unit crossing a universe · duplicate IDs.
- **Skips**: no GDTF and no address.
- **Warns**: a unit with no address · no Channel · a unit off the expected layer.

## Housekeeping

- "Error loading Vision plugin" popup on launch: quit Vectorworks and delete `RuntimeCache` in `~/Library/Application Support/Vectorworks/<version>/Plug-ins/`. It rebuilds on the next launch.
- The device dump changes nothing in the drawing. Run it from Tools › Scripts › Run Script; it writes a JSON to the Desktop.
