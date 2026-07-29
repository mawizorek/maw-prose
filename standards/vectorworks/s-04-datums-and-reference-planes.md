---
title: S-4 — Datums and Reference Planes
type: standard
package: vectorworks
sequence: 4
domain: theatre
department: all
audience: designers-and-drafters
status: active
last_verified: 2026-07-16
decision: D-014
---

# S-4 — Datums & reference-planes documentation convention

**Adopted 2026-07-16 · D-014**

---

## The rule

**Document the RULE, not the numbers.**

Every package carries a short **"Datums & Reference Planes"** note stating which surface is the datum, and where that changes by elevation. Capture the logic and the gotchas.

**Values live in the file, never in the prose.** Actual dimensions flow out through worksheet and CSV export. Prose holds no dimension values, save a few deliberately flagged exceptions.

**Model to real dimensions.** The geometry reflects reality; the document only flags where deck-datum differs from nominal-wall.

---

## The scope split

**The convention is universal** — every package gets the note, whatever the venue.

**The specific rules are venue-specific.** Smith's elevation rule lives in the Smith package, not here.

---

## The problem this solves, concretely

Smith is nominally 50' × 70', **but the interior trim shaves roughly ⅛" per wall.** Deck measurements come off the **interior trim face**; mezzanine and catwalk measurements come off the **nominal wall structure**.

**So the reference plane changes depending on elevation.** That is a real trap: a dimension that is correct at deck level is wrong at the catwalk, and nothing in the drawing announces it.

The temptation was to solve it by writing the tolerances down. **That is the wrong fix** — transcribed dimensions in prose go stale the moment the model changes, and then two sources disagree with no way to tell which is current. Documenting the *rule* stays true regardless of what the numbers become.

---

*Distilled from finding F-009 (house-empirical, from a working session with Michael). Source research: `ClickUp_apps/Vectorworks/VWX-BEST-PRACTICES.md`.*
