# Smith Theatre — layers

`venue-base` layers are authored once in the master file. `department` layers are the thin per-discipline consumers that reference it.

These are the master layers.

Geometry for the building canonically lives as 3D symbols. The intent is to project each of these as hidden line 



<!---
## `3 CATWALK` — catwalk and high steel

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

## `1.5 MEZZ` — mezzanine and tech-setup intermediate

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

## Known gaps

Nine rows carry no status. Blank means unknown, not fine.

Three rows have no elevation band — `>import 3D`, `VID - REP`, and `2D 2 [SPAC] Mezzanine` — and the band is what every other layer is keyed to. That last one has been flagged `CUT?` since the list was authored.

**The uniform design-layer scale value is not written down anywhere.** Every layer shares one scale, which is why it is not a column here, and nobody recorded what it is. That is the gap most likely to bite during a reference or a viewport setup.

## Two conventions this list depends on

Elevation lives in the layer, never in a class. Layers answer *where, whose, what height*; classes answer *what kind of thing*.

All design layers share one scale, so referenced viewports line up.


--->
