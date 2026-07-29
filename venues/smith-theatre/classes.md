# Smith Theatre — Classes

*The 11-class tree, in four categories.* ⚠️ ***A PROPOSAL, not a built list.*** *No authoritative Smith class list exists yet; this is the shape, awaiting a ruling. Content last checked: 2026-07-16.*

A class answers *what kind of thing is this*, so that viewports and saved views can toggle object types globally. **Category only** — never a linestyle bucket, never elevation.

## The tree

Four top-level categories, eleven classes.

**Steel** carries a bare `Steel` parent plus `Steel-Beam` and `Steel-Pipe`. **Wood** likewise has a bare `Wood` plus `Wood-Ply` and `Wood-Dimensional`. **Framing** has `Framing-Stud` and `Framing-Platform`. **Masking** has `Masking-Border`, `Masking-Leg`, and `Masking-Traveler`.

**The dash is functional, not decorative** — it drives the hierarchical nesting you see in the Navigation and Organization palettes, up to four parts. `Steel_Beam` and `Steel Beam` will not nest.

## What is deliberately missing, and what is probably an oversight

**Lighting, audio, and video device classes are not here on purpose.** They are expected to arrive via Spotlight auto-classing, which generates device classes from a field value rather than from a hand-authored list. The house tree is built to nest cleanly alongside them rather than compete with them.

⚠️ **`Framing` and `Masking` have no bare parent class the way `Steel` and `Wood` do.** `Framing-Stud` and `Framing-Platform` exist with no plain `Framing`; same for masking. That reads like an oversight rather than a decision, but it has never been confirmed either way.

**No default attributes are recorded for any class.** Fill, pen weight, and colour are unspecified across the whole tree, which means the first person to draw in these classes sets them by accident and everyone inherits it.

---

*Ratifying the category set, and resolving the missing bare parents, are open questions in the ClickUp decision log. Questions do not live in this repo.*
