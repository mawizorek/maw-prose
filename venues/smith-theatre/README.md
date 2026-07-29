---
title: Smith Theatre
type: venue-reference
package: smith-theatre
domain: theatre
venue: smith-theatre
audience: designers-and-new-hires
status: active
last_verified: 2026-07-29
---

# Smith Theatre

Everything worth knowing about the room. **One file per system** — so you open the one you need instead of scrolling a venue bible.

| File | What is in it | State |
|---|---|---|
| [**The Room**](./the-room.md) | Shape, datum, the elevation trap, high-steel load limits, beam positions, toe height | ✅ real |
| [**Layers**](./layers.md) | All 29 Vectorworks design layers, grouped by elevation band | ✅ real |
| [**Classes**](./classes.md) | The 11-class proposal | ⚠️ proposal |
| [**Electrics**](./electrics.md) | Dimmer racks, circuits, DMX, company switch, gotchas | ⭕ **empty — headings only** |

**Files that should exist and do not yet.** Named so the gaps are visible rather than forgotten:

- `audio.md` — amp/rack locations, tie lines, snake runs, mix positions
- `video.md` — projector positions, throw distances, signal paths
- `rigging.md` — the detail behind the load limits: pipe inventory, positions, hardware
- `access.md` — doors, keys, storage, who to ask. ⚠️ **names and key-holders are personnel data** — see the note below
- `soft-goods.md` — what masking exists, sizes, condition, where it lives

---

## What belongs in here

**The back-pocket test:** if a tech asks you in the room and you would rather not guess, it goes here.

Dimmer rack locations. Circuit numbering. Which position has the dead circuit nobody remembers. Load ratings. Where the ladder key lives. **Raw, specific, unglamorous facts about this building.**

**What does NOT belong here:**

- **Dimensioned geometry** — that lives in the Vectorworks model. A transcribed drawing dimension goes stale the moment someone edits the file.
- **Anything that is a signed record** — completed forms, dated acknowledgments, anything tied to a person. FileMaker.
- **How to do a task** — that is a guide, not a venue fact.

**The dividing line:** *if you would put it on a drawing, it lives in the model. If you would tell it to a new hire on their first walk of the space, it lives here.*

⚠️ **Personnel:** this repo is private, so names are not a leak. But a fact that decays when someone leaves the job ("Charlie has the key") is a worse note than the fact that outlives them ("the key lives in the PM office, ask the PM"). **Write the durable version.**

---

## The Vectorworks base file

**Phase 2 of 6** — building the `.vwx` from the authored plan. Stalled since 2026-07-16 on three rulings: the class tree, sheet numbering, and locking the layer list.

Built in **Educational**, so it will need re-creating in a licensed version. The hedge is a DWG export — keep resources embedded and cleanly laid out and a re-import de-skins the file but brings the content back.

**The `.vwx` does not live in git.** It lives locally; this package documents it.

❌ **There is no symbol inventory anywhere.** The old plan was to generate it from a Vectorworks worksheet, so it does not exist until someone runs that export. Columns needed: `name, type, default_layer, default_class, count`.

---

*Setup conventions that apply to every venue, not just this one: [how our Vectorworks files are set up](../../standards/vectorworks/).*
