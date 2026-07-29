---
title: Smith Theatre — Layers
type: venue-reference
package: smith-theatre
domain: theatre
department: all
venue: smith-theatre
audience: designers-and-drafters
status: working-draft
last_verified: 2026-07-16
---

# Smith Theatre — Layers

**29 design layers.** Working draft. Source: the Google Sheet *URITP VWX Smith Theatre BASE FILE Worksheets*.

`VENUE-BASE` layers are authored once in the master file. `DEPARTMENT` layers are the thin per-discipline consumers that reference it.

---

## `3 CATWALK` — catwalk / high steel

| Layer | Dept | Scope | 2D | 3D | Status |
|---|---|---|:-:|:-:|---|
| `RIGGING - OVERHEAD` | RIGGING | venue-base | ✓ | ✓ | created |
| `_HANG POSITIONS` | UR | venue-base | | ✗ | reviewing |
| `3D 3 CATWALKS` | UR | venue-base | | ✓ | reviewing |
| `LX - REP` | HEAD ELECTRICIAN | venue-base | ✓ | ✓ | new · *rep; house + work lights* |
| `LX - PLOT 1 CATWALKS` | LX DESIGNER | department | ✓ | ✓ | new |
| `LX - PLOT SECTIONS` | HEAD ELECTRICIAN | department | ✓ | ✗ | new |
| `VID - OVERHEAD` | VIDEO | department | ✗ | ✗ | drafting |
| `UTL - CAMERAS` | UTILITY | department | ✓ | ✓ | — · *rep* |

## `2 TOE` — toe-pipe level

| Layer | Dept | Scope | 2D | 3D | Status |
|---|---|---|:-:|:-:|---|
| `AUDIO - REP` | AUDIO | venue-base | ✗ | | drafting · *rep* |
| `AUDIO - OVERHEAD` | AUDIO | department | ✓ | ✓ | created |
| `LX - PLOT 2 TOE PIPES` | LX DESIGNER | department | ✓ | ✓ | new |
| `VID - TOE PIPES` | VIDEO | department | ✗ | ✗ | — |
| `SCENIC - OVERHEAD` | SCENIC | department | ✗ | ✗ | — |

## `1.5 MEZZ` — mezzanine / tech-setup intermediate

| Layer | Dept | Scope | 2D | 3D | Status |
|---|---|---|:-:|:-:|---|
| `3D 2 MEZZANINE` | UR | venue-base | | ✓ | reviewing |
| `LX - MEZZ` | LX DESIGNER | department | ✓ | ✓ | new |
| `TECH SETUP` | PM | department | ✓ | ✓ | — |

## `1 DECK` — deck level

| Layer | Dept | Scope | 2D | 3D | Status |
|---|---|---|:-:|:-:|---|
| `Theatre Architecture` | UR | venue-base | ✓ | ✓ | — |
| `3D 1 GROUNDPLAN` | UR | venue-base | | ✓ | reviewing |
| `LX - focus points` | LX DESIGNER | department | ✓ | ✓ | created |
| `LX - PLOT 3 DECK` | LX DESIGNER | department | ✓ | ✓ | new |
| `SCENIC - DECK` | SCENIC | department | ✗ | ✗ | drafting |
| `SCENIC - Symbols` | SCENIC | department | ✗ | ✗ | — |
| `VID - DECK` | VIDEO | department | ✗ | ✗ | — |

## `0 NOTES` — non-geometry

| Layer | Dept | Scope | 2D | 3D | Status |
|---|---|---|:-:|:-:|---|
| `WORKING SCRATCH` | UTILITY | venue-base | ✓ | ✓ | — |
| `PVIZ - View CAMERAS` | UTILITY | venue-base | ✗ | ✓ | drafting · *render viewport cameras* |
| `VID - SYSTEM NOTES` | VIDEO | department | ✗ | ✗ | — |

## No band assigned

| Layer | Dept | Scope | 2D | 3D | Status |
|---|---|---|:-:|:-:|---|
| `>import 3D` | UR | department | ✗ | ✗ | created · *2D master the LX file references* |
| `VID - REP` | VIDEO | venue-base | ✗ | ✗ | — · *rep* |
| `2D 2 [SPAC] Mezzanine` | UR | venue-base | ✗ | ✗ | **CUT?** |

---

## Open on this list

- **`2D 2 [SPAC] Mezzanine` is flagged `CUT?`** — cut it or keep it.
- **Three rows have no elevation band** (`>import 3D`, `VID - REP`, `2D 2 [SPAC] Mezzanine`). Band them or confirm they are deliberately unbanded.
- **Nine rows have no status at all.** Blank means unknown, not "fine."
- **The uniform design-layer scale value is not recorded anywhere.** All layers share one scale; nobody wrote down what it is.
- **`LX DESIGNER` and `HEAD ELECTRICIAN` are separate departments here.** Worth confirming that split is intentional, since it puts `LX - REP` and `LX - PLOT SECTIONS` under one and the plots under the other.

---

## Two conventions this list depends on

**Elevation lives in the layer, never in a class.** Layers answer *where, whose, what height*; classes answer *what kind of thing*.

**All design layers share one scale**, so referenced viewports line up. That is why scale is not a column here.
