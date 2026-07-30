# Smith Theatre — classes

*The 11-class tree, in four categories. **A proposal, not a built list** — no authoritative Smith class list exists yet. Checked 2026-07-16.*

A class answers *what kind of thing is this*, so viewports and saved views can toggle object types globally. Category only — never a linestyle bucket, never elevation.

## The tree

**Steel** carries a bare `Steel` parent plus `Steel-Beam` and `Steel-Pipe`. **Wood** likewise has a bare `Wood` plus `Wood-Ply` and `Wood-Dimensional`. **Framing** has `Framing-Stud` and `Framing-Platform`. **Masking** has `Masking-Border`, `Masking-Leg`, and `Masking-Traveler`.

The dash is functional, not decorative — it drives the hierarchical nesting in the Navigation and Organization palettes, up to four parts. `Steel_Beam` and `Steel Beam` will not nest.

## What is missing, and what is probably an oversight

Lighting, audio, and video device classes are not here on purpose. They arrive via Spotlight auto-classing, which generates device classes from a field value rather than a hand-authored list, and the house tree is built to nest cleanly alongside them rather than compete.

`Framing` and `Masking` have no bare parent class the way `Steel` and `Wood` do. That reads like an oversight, and it has never been confirmed either way.

No default attributes are recorded for any class. Fill, pen weight and colour are unspecified across the whole tree, which means the first person to draw in these classes sets them by accident and everyone inherits it.
