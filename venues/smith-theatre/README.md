---
title: Smith Theatre
type: venue-reference
package: smith-theatre
domain: theatre
venue: smith-theatre
audience: designers-and-drafters
status: active
last_verified: 2026-07-16
---

# Smith Theatre

Reference notes for the room and its Vectorworks base file. **Look things up here.**

| File | What you get |
|---|---|
| [**The Room**](./the-room.md) | Shape, datum, the elevation trap, high-steel load limits, beam positions, band and department vocabulary |
| [**Layers**](./layers.md) | All 29 design layers, grouped by elevation band |
| [**Classes**](./classes.md) | The 11-class proposal, four categories |
| **Symbols** | ❌ **Does not exist.** See below. |

---

## ❌ The symbol inventory does not exist

Worth stating plainly, because it was asked for directly.

**There is no list of symbols anywhere.** The source file in `ClickUp_apps` is a *plan for how the library will be organized* plus three TODOs, with zero inventory. Its stated approach is that `symbols.csv` gets **generated from a Vectorworks worksheet**, not hand-authored — so the list only comes into existence once someone runs that export.

**Nothing is being invented to fill the gap.** What is actually known:

- Symbols group by department, mirroring the layer departments: lighting devices, rigging points and hardware, scenic units, audio, video, hang positions.
- **Lighting-device and pipe/position symbols must be hybrid 2D/3D**, and the 2D component must be a **screen-plane** representation, not a 2D planar object, or it will not behave in 3D.
- **A record attached to a symbol *definition* auto-attaches to every instance**, which is what makes the inventory machine-readable later.
- No commas in symbol names.

**To get the list:** build a Vectorworks worksheet database row with columns `name, type, default_layer, default_class, count`, export to CSV, and it becomes a real file here.

---

## What else is still in `ClickUp_apps/Vectorworks/`

Not yet migrated, nothing deleted:

- **`VWX-BEST-PRACTICES.md`** — 30.6KB of sourced research, findings F-001..F-016, every claim with a vendor link and a confidence rating. **This is the genuinely useful half of that file** and it has not moved yet.
- **`BUILD-PLAN.md`** — the one-page build-from artifact.
- **`_TEMPLATE/`** — 17 files of cloneable skeleton. Status contested; see the Decision Log.
- The rest of `smith-theatre/`: sheet layers, drafting, naming, records, hatches, saved views, title blocks, reconciliation, plus two record CSVs.

---

## Status of the base file itself

**Phase 2 of 6 — building the `.vwx` from the authored plan.** Stalled since 2026-07-16 on three rulings: the class tree, promoting the sheet-numbering scheme, and locking the layer list.

The file is being built in **Vectorworks Educational** and will eventually need re-creating in a licensed version. The hedge is a DWG export: keep resources embedded and cleanly laid out so a re-import de-skins but brings the content back.

**The `.vwx` does not live in git.** It lives locally; this package documents it.
