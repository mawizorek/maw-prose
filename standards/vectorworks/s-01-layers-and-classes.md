---
title: S-1 — Layers and Classes
type: standard
package: vectorworks
sequence: 1
domain: theatre
department: all
audience: designers-and-drafters
status: active
last_verified: 2026-07-16
decision: D-012
---

# S-1 — Hybrid layer/class division of labor

**Adopted 2026-07-16 · D-012**

---

## The rule

**Layers carry LOCATION + ROUTING + ELEVATION.**

- Location within the venue
- Department, which is what makes the reference model (S-2) work
- Elevation band: `0 NOTES` / `1 DECK` / `1.5 MEZZ` / `2 TOE` / `3 CATWALK`

**Elevation lives in layers. Never in classes.**

**Classes carry OBJECT CATEGORY, for filtering.** Steel, wood, framing, masking, and so on — so viewports and saved views can toggle object *types* globally across every layer. **A class is not a linestyle or line-weight bucket.**

**Naming:** object classes use dash-delimited, four-part-maximum hierarchy. The dash is not cosmetic — it drives hierarchical nesting in the Navigation and Organization palettes.

---

## Why this split and not another

**Layers answer *where, whose, what height*. Classes answer *what kind of thing*.** Those two questions are orthogonal, which is the entire point: a department file can pull only the layers it needs (S-2) and still toggle object categories across all of them.

Collapse them and you lose that. Put elevation in classes and every department file inherits the whole elevation vocabulary whether it needs it or not.

---

## ⚠️ We deliberately diverge from the vendor recommendation

Vectorworks Spotlight recommends **lean layering** for a light plot: stage, focus points, and scenic on separate design layers, but rigging objects, hanging positions, and lighting devices all together on **one** layer.

**We do not follow that, and the reason is structural rather than stylistic.** Spotlight's advice assumes a **single designer's plot**. This is a **multi-department master file** that other files reference. Department routing has to be expressible in the layer structure or S-2 has nothing to pull against, so we run roughly 27 layers keyed on department × elevation band.

**Where we do follow the vendor:** all design layers share **one uniform scale**. That is not optional and it is why scale is not enumerated per row in the layer manifest.

---

## Open

**The specific object-class tree is still a PROPOSAL, not a Standard** (D-023). Steel / wood / framing / masking with dash-nested children is a structured proposal, not a ratified list, and **no `classes.csv` exists yet** deliberately. No authoritative source list was found for it.

**This is the highest-priority open ruling in the package.**

---

*Distilled from findings F-001 (layers versus classes, vendor-documented) and F-002 (class naming, vendor-documented). Source research: `ClickUp_apps/Vectorworks/VWX-BEST-PRACTICES.md`.*
