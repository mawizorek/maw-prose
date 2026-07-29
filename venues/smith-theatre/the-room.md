# Smith Theatre — The Room

*The facts about the space, numbers included on purpose. Source: the authored Vectorworks plan and its decision record. Content last checked: 2026-07-16 — the migration moved these facts, it did not re-measure them.*

## Shape and datum

**Blackbox rectangle, roughly 50' × 70' nominal.**

**The datum is the geometric center of the room rectangle**, not a proscenium centerline crossed with a plaster line. That center sits on the Vectorworks **internal origin (0,0)**, not a shifted user origin. Two reasons that matters: it keeps geometry tight around zero so DWG round-trips do not lose precision, and it gives every referencing file the same coordinate frame for free.

**Coordinates:** `+X` and `−X` are stage right and stage left. `+Y` and `−Y` are upstage and downstage.

⚠️ **The `+X`/`+Y` polarity against compass north is unresolved.** The high-steel beams run east–west, so tie the convention to the beams rather than picking a direction arbitrarily.

## ⚠️ The reference plane changes with elevation

This is the trap in this room, and nothing in the drawing warns you about it.

Smith is nominally 50' × 70', **but the interior trim shaves roughly ⅛" per wall.** At **deck** level you measure off the **interior trim face**. At the **mezzanine and the catwalks** you measure off the **nominal wall structure**. So a dimension that is correct at deck level is wrong at the catwalk, silently, and the only defense is knowing which surface you are working off before you trust a number.

Model to real dimensions, not nominal ones.

**The bottom of the toe is 18'-8" from the deck.**

## High steel — load limits

The numbers you need before anything goes in the air. A single **concentrated point load** is capped at **2,000 lbs**. **One beam** takes **8,000 lbs total**, across a maximum of **four simultaneous loads**, and those loads need **4'-0" minimum spacing on center**. Across **all beams together** the cap is **12,000 lbs**.

Read those as a set rather than a list: it is entirely possible to be under the point limit and the per-beam limit and still be over the house total, which is the version of this that catches people.

**The beams run east–west, at 4' and 12' from center.**

## Elevation bands

The vocabulary every layer name is keyed to, low to high. **`0 NOTES`** is not geometry at all — scratch, system notes, render cameras. **`1 DECK`** is deck level: groundplan, deck plots, architecture. **`1.5 MEZZ`** is the mezzanine and the tech-setup intermediate. **`2 TOE`** is toe-pipe level. **`3 CATWALK`** is the catwalk and high steel, meaning rigging and overhead positions.

The band is part of the layer name, never a class. See [layers](./layers.md).

## Departments

**UR** is the venue base and architecture. Then **SCENIC**, **LX DESIGNER**, **HEAD ELECTRICIAN**, **AUDIO**, **RIGGING**, **VIDEO**, **UTILITY** (cameras and scratch), and **PM** (tech setup).

Note that **LX DESIGNER and HEAD ELECTRICIAN are separate departments in this structure**, which is unusual and load-bearing for how the layer list is split.

---

*Why a notes file holds numbers at all: the rule is that drawing dimensions live in the model and new-hire facts live here. A load rating is a property of the building, not a dimension — it does not change when someone edits a `.vwx`, and hiding it in a file that needs a license to open is how it gets lost. The full rule is in [CONVENTIONS.md](../../CONVENTIONS.md); the rule it replaced is one line in [DECISIONS.md](../../DECISIONS.md).*
