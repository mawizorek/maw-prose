---
title: S-3 — Origin and Datum
type: standard
package: vectorworks
sequence: 3
domain: theatre
department: all
venue: smith-theatre
audience: designers-and-drafters
status: active
last_verified: 2026-07-16
decision: D-013
---

# S-3 — Origin / datum convention

**Adopted 2026-07-16 · D-013 · Already built in the file**

---

## The rule

- **Smith is a blackbox rectangle** (~50' × 70' nominal). The datum is the **geometric center of the room rectangle** — **not** a proscenium centerline crossed with a plaster line.
- **That center is coincident with the Vectorworks INTERNAL origin (0,0)**, not merely a shifted user origin.
- **Coordinate reading:** `+X` / `−X` = stage right / stage left. `+Y` / `−Y` = upstage / downstage.

---

## Why the internal origin and not just a user origin

Two reasons, both structural:

1. **DWG round-trip precision.** Vectorworks degrades in accuracy as geometry moves away from the internal origin (work within roughly 5 km of it). Keeping the venue tight around (0,0) protects the DWG export that is the entire hedge against the Educational-to-licensed rebuild (D-008).
2. **Every referencing file inherits the same coordinate frame** for free (S-2). A shifted user origin would not travel.

The internal origin is fixed at (0,0) and cannot be moved. The user origin is movable and coordinates read relative to it. Binding the room center to the *internal* origin is the deliberate, stronger choice.

---

## The caveat that produced S-4

**The center is the ORIGIN. It does not resolve which SURFACE is the measurement reference at a given elevation.** That is a genuinely separate problem, and it is what S-4 exists to handle.

---

## Open

**`+X` / `+Y` polarity versus N/S/E/W convention is unresolved.** The high-steel beams run **east–west**, so the polarity convention should be tied to that rather than chosen arbitrarily.

---

*Distilled from finding F-007 (origin mechanics, vendor-documented; convention house-empirical). Source research: `ClickUp_apps/Vectorworks/VWX-BEST-PRACTICES.md`.*
