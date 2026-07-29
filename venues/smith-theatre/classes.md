---
title: Smith Theatre — Classes
type: venue-reference
package: smith-theatre
domain: theatre
department: all
venue: smith-theatre
audience: designers-and-drafters
status: proposal
last_verified: 2026-07-16
---

# Smith Theatre — Classes

**11 classes, four top-level categories. This is a PROPOSAL, not a built list.** No authoritative Smith class list exists yet — this is the shape, awaiting a ruling.

A class answers *what kind of thing is this*, so viewports and saved views can toggle object types globally. **Category only** — never a linestyle bucket, never elevation.

---

## The tree

| Class | Category |
|---|---|
| `Steel` | Steel |
| `Steel-Beam` | Steel |
| `Steel-Pipe` | Steel |
| `Wood` | Wood |
| `Wood-Ply` | Wood |
| `Wood-Dimensional` | Wood |
| `Framing-Stud` | Framing |
| `Framing-Platform` | Framing |
| `Masking-Border` | Masking |
| `Masking-Leg` | Masking |
| `Masking-Traveler` | Masking |

**The dash is functional, not decorative** — it drives hierarchical nesting in the Navigation and Organization palettes. Up to four parts.

---

## What is deliberately missing

**Lighting, audio, and video device classes are not here.** They are expected to arrive via Spotlight auto-classing, which generates device classes from a field value rather than from a hand-authored list. The house tree is built to nest cleanly alongside them.

**`Framing` and `Wood` have no bare parent class** the way `Steel` and `Wood` do. `Framing-Stud` and `Framing-Platform` exist with no plain `Framing`. Probably an oversight, possibly deliberate.

---

## Open on this list

- **Rule the top-level categories.** Steel / Wood / Framing / Masking — is that the set, or are there gaps (soft goods, hardware, electrics infrastructure, deck treatment)?
- **Confirm which categories collide with Spotlight auto-classing** before authoring anything that fights it.
- **The bare-parent inconsistency** above.
- **No default attributes recorded** for any class. Fill, pen weight, and colour are unspecified everywhere.
