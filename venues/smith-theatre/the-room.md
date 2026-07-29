---
title: Smith Theatre — The Room
type: venue-reference
package: smith-theatre
domain: theatre
department: all
venue: smith-theatre
audience: designers-and-drafters
status: active
last_verified: 2026-07-16
---

# Smith Theatre — The Room

The facts about the space. **With the numbers**, on purpose (see the note at the bottom).

---

## Shape and datum

**Blackbox rectangle, ~50' × 70' nominal.**

**Datum = the geometric center of the room rectangle**, not a proscenium centerline crossed with a plaster line. That center sits on the Vectorworks **internal origin (0,0)**, not a shifted user origin — which keeps geometry tight around zero so DWG round-trips do not lose precision, and gives every referencing file the same coordinate frame for free.

**Coordinates:** `+X` / `−X` = stage right / stage left. `+Y` / `−Y` = upstage / downstage.

⚠️ **`+X`/`+Y` polarity against N/S/E/W is unresolved.** The high-steel beams run **east–west**, so tie the convention to that rather than picking one.

---

## ⚠️ The reference plane changes with elevation

This is the trap in this room, and nothing in the drawing warns you about it.

Smith is nominally 50' × 70', **but the interior trim shaves roughly ⅛" per wall.**

| Elevation | Measure from |
|---|---|
| Deck | the **interior trim face** |
| Mezzanine, catwalks | the **nominal wall structure** |

**So a dimension that is correct at deck level is wrong at the catwalk.** Model to real dimensions and know which surface you are working off.

**Bottom of the toe: 18'-8" from the deck.**

---

## High steel — load limits

| | Limit |
|---|---|
| Concentrated point load | **2,000 lbs** |
| Total load, single beam | **8,000 lbs** |
| Simultaneous loads per beam | **max 4** |
| Minimum spacing between loads | **4'-0" on center** |
| Total across all beams | **12,000 lbs** |

**Beams run east–west, at 4' and 12' from center.**

---

## Elevation bands

The vocabulary every layer is keyed to:

| Band | Meaning at Smith |
|---|---|
| `0 NOTES` | non-geometry: scratch, system notes, render cameras |
| `1 DECK` | deck level: groundplan, deck plots, architecture |
| `1.5 MEZZ` | mezzanine / tech-setup intermediate |
| `2 TOE` | toe-pipe level |
| `3 CATWALK` | catwalk / high steel: rigging, overhead positions |

## Departments

**UR** (venue base / architecture) · **SCENIC** · **LX DESIGNER** · **HEAD ELECTRICIAN** · **AUDIO** · **RIGGING** · **VIDEO** · **UTILITY** (cameras / scratch) · **PM** (tech setup)

---

## ⚠️ Note on why this file has numbers in it

A standard adopted 2026-07-16 says **"document the RULE, not the numbers — values live in the file, never in the prose."** This file deliberately breaks it.

**That rule is the reason the migrated Vectorworks documentation was useless as notes.** It systematically stripped out every fact worth looking up and left behind prose about how to document facts. The load limits above were sitting in an appendix of a decision log; the toe height was in a ClickUp doc; the trim behaviour was described as a *convention* three files deep.

**The rule was not wrong about dimensioned geometry** — a transcribed drawing dimension does go stale, and the model should stay authoritative for anything you would measure off. **It was wrong about facts that are not geometry:** a load rating, a beam position, a datum convention, a trim behaviour. Those are properties of the building. They do not change when someone edits a `.vwx`, and hiding them inside a file nobody can open without a license is how they get lost.

**The working line: if you would put it on a drawing, it lives in the model. If you would tell it to a new hire on their first walk of the space, it lives here.**
