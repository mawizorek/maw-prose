# Smith Theatre

*Everything worth knowing about the room, one file per system. Checked 2026-07-29.*

- **[The room](./the-room.md)** — shape, datum, the elevation trap, high-steel load limits, beam positions, toe height. Read this first.
- **[Layers](./layers.md)** — all 29 Vectorworks design layers, grouped by elevation band. Working draft.
- **[Classes](./classes.md)** — the 11-class tree. A proposal, not a built list; do not author against it as though it were ratified.
- **[Electrics](./electrics.md)** — dimmer racks, circuits, DMX, company switch, gotchas. Empty; headings only.

**Files that should exist and do not:** `audio.md` (amp and rack locations, tie lines, snake runs, mix positions) · `video.md` (projector positions, throw distances, signal paths) · `rigging.md` (the detail behind the load limits — pipe inventory, positions, hardware) · `access.md` (doors, keys, storage, who to ask) · `soft-goods.md` (what masking exists, sizes, condition, where it lives).

## What belongs in here

The back-pocket test: if a tech asks you in the room and you would rather not guess, it goes here. Dimmer rack locations. Circuit numbering. Which position has the dead circuit nobody remembers. Load ratings. Where the ladder key lives.

Three things do not. **Dimensioned geometry** lives in the Vectorworks model, because a transcribed drawing dimension goes stale the moment somebody edits the file. **Signed records** live in FileMaker. **How to do a task** is a guide, not a venue fact.

The dividing line: if you would put it on a drawing, it lives in the model; if you would tell it to a new hire on their first walk of the space, it lives here.

On personnel — this repo is private, so names are not a leak, but a fact that decays when someone leaves the job ("Charlie has the key") is a worse note than the one that outlives them ("the key lives in the PM office, ask the PM").

## The Vectorworks base file

Phase 2 of 6 — building the `.vwx` from the authored plan. Stalled since 2026-07-16 on three rulings: the class tree, sheet numbering, and locking the layer list.

Built in Educational, so it will need re-creating in a licensed version. The hedge is a DWG export. The `.vwx` does not live in git; it lives locally and this package documents it.

**There is no symbol inventory**, and it cannot be assembled by reading the file — the Resource Manager has no symbol dump, so it does not exist until someone runs a worksheet export. See [resources and symbols](../../standards/vectorworks/resources-and-symbols.md).

---

*Setup conventions that apply to every venue: [how our Vectorworks files are set up](../../standards/vectorworks/).*
