---
id: previs-lighting
title: Lighting
type: reference
status: public
order: 40
revised: 2026-11
summary: How fixtures live in previs files, who owns what, how Eos drives them, and where shutters, cameras and house lights stand.
related: [maw-previs, previs-architecture, previs-vectorworks-import, previs-build-sheet]
---

# Lighting

## Who owns what

!!! warning "Vectorworks owns the fixtures"

    Type, position and patch come from Vectorworks and nowhere else. Never edit a fixture in Blender: the next sync puts it back.

- **Vectorworks**: every fixture, its hang position, its GDTF and mode, its universe and address, its Channel.
- **Previs file**: cameras, world, haze, Cycles settings, and any animation.
- **Eos**: the programming. Previs never writes cues; it shows what the console sends.
- Fixtures reach Blender by MVR, geometry by FBX, never both in one file. How to export: [[Vectorworks Import](@previs-vectorworks-import)].

## The tools

- **MAW Previz** builds and maintains a previs file: syncs the rig, sets the look and render, builds the cameras, and adds a Previz sidebar tab. Code and current status: [ClickUp_apps/blender/previz](https://github.com/mawizorek/ClickUp_apps/blob/main/blender/previz/README.md).
- **MAW Shutters** adds framing shutters to Cycles spot lights, with cue-style keys and barrel and frost edges. Code and status: [ClickUp_apps/blender/shutters](https://github.com/mawizorek/ClickUp_apps/blob/main/blender/shutters/README.md).
- **BlenderDMX** (the "DMX" extension) is the fixture engine underneath: GDTF fixtures, Programmer, sACN input, gobos and iris.
- Status on every tool is BUILT, TESTED or VERIFIED. Only Michael's own run makes anything VERIFIED. The [[Build Sheet](@previs-build-sheet)] tracks them.

## The channel check rig

Before any show plot, one of each inventory unit, hung in SPAC, patched for real. Michael builds his own channel check in Eos against it, and Blender shows what each channel does.

```
MAW_PREVIS/_LIBRARY/SPAC_CHANNEL_CHECK/
    SPAC_CHANNEL_CHECK.blend
    SPAC_CHANNEL_CHECK.mvr
    maw_previz.py
    OPEN PREVIZ.command
    previz_reports/
```

- It's library-level because every show draws on the same inventory.
- Vectorworks source: the inventory file, fixtures on one layer, default symbols with GDTFs assigned.
- The loop: export the MVR over the old one, double-click OPEN PREVIZ, read the RIG line.

## What a sync does

1. **Pre-flight** reads the MVR before Blender touches it. It refuses to import a patched fixture without its GDTF, a patch overlap, a fixture crossing a universe, or a mode the GDTF doesn't have. It skips units that aren't DMX (no GDTF, no address). Rules in full: [[Vectorworks Import](@previs-vectorworks-import)].
2. **Import** matches fixtures by their Vectorworks ID, so a moved unit updates in place.
3. **Prune** removes anything Vectorworks no longer has.
4. **Verify** checks every fixture: present, has geometry, real GDTF, patched where Vectorworks says.
5. **Report**: PASS, CURRENT (nothing changed), BLOCKED (the fix is named), MISSING or FAIL. A PASS saves the file.

## Driving it

- **Play**: the BlenderDMX Programmer drives every universe. For poking at one unit without a console.
- **Eos**: universes listen to sACN. Eos runs on the same Mac, patched to match Vectorworks.
- **The gate**: a channel at full in Eos lights that unit in Blender. Not passed yet {.tbc}

## Look

- Black world, light haze so beams read, Cycles with Metal GPU, AgX colour.
- Rendered viewport through a camera, never a free orbit, so what's on screen is what renders.

## Cameras

A camera lives in the file that owns its position (decided 2026-11-19).

- **Venue**: overhead plan, rep centre, rep back. The building owns these.
- **Scenic**: audience seats, house left and right. SPAC's seating is flexible, so these follow the scenery file.
- **Render**: wide, rig. The show's own framings.
- Level cameras, height framed with shift so verticals stay straight. Placed once; a rerun never moves a camera that was adjusted by hand.

## Shutters, gobos, iris

- Gobos and iris come from BlenderDMX, from the GDTF.
- BlenderDMX has no framing shutters. MAW Shutters adds them, named the way Vectorworks and Eos name them: Top/A, Right/B, Bottom/C, Left/D, each a depth and an angle, plus Rotate for the whole assembly.
- Wiring Shutters to the moving lights' blade channels, so Eos runs them, is the next build {.tbc}
- The 8 moving lights with shutters and gobos are the eye candy of the previs. They get this first.

## House lights

Planned, not built.

- In Vectorworks: a house layer of small cans, 7 under each catwalk (centre plus 3 each side) and cans under each gallery.
- A generic one-channel dimmer GDTF. Every can in a zone shares one address, so one channel runs the zone.
- Eight zones on channels 1001 to 1008, six catwalks and two galleries. The channel records live in ClickUp (Lighting Documentation, Channels (Patch)). Addresses come later.
- In Previz: zone faders, House Full and House Out, warm wide beams.

## Open

- [Programming surface]{.gap}: the Working Reference ruled Showcase on 2026-11-18; this lane runs on Eos. Not reconciled.
- [Show files]{.gap}: one previs file per number needs one shared show rig MVR, proposed as `source/rig.mvr` in the show folder. Not built.
- [Recorded DMX]{.gap}: whether a cue stack is ever baked into keyframes. Not settled.
