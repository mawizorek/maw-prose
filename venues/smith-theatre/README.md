# Smith Theatre

*Everything worth knowing about the room, one file per system, so you open the one you need instead of scrolling a venue bible. Content last checked: 2026-07-29.*

**[The room](./the-room.md)** is the shape, the datum, the elevation trap, the high-steel load limits, the beam positions, and the toe height. Real content, and the first thing to read.

**[Layers](./layers.md)** is all 29 Vectorworks design layers grouped by elevation band. Real content, working draft.

**[Classes](./classes.md)** is the 11-class tree. ⚠️ **A proposal, not a built list** — do not author against it as though it were ratified.

**[Electrics](./electrics.md)** is dimmer racks, circuits, DMX, company switch, and the gotchas. ⭕ **Empty — headings only.** Nothing has been filled in.

**Files that should exist and do not yet**, named so the gaps stay visible rather than getting forgotten: `audio.md` for amp and rack locations, tie lines, snake runs and mix positions · `video.md` for projector positions, throw distances and signal paths · `rigging.md` for the detail behind the load limits, meaning pipe inventory, positions and hardware · `access.md` for doors, keys, storage and who to ask · `soft-goods.md` for what masking exists, in what sizes, in what condition, and where it lives.

## What belongs in here

**The back-pocket test: if a tech asks you in the room and you would rather not guess, it goes here.** Dimmer rack locations. Circuit numbering. Which position has the dead circuit nobody remembers. Load ratings. Where the ladder key lives. Raw, specific, unglamorous facts about this building.

Three things do not belong. **Dimensioned geometry** lives in the Vectorworks model, because a transcribed drawing dimension goes stale the moment somebody edits the file. **Signed records** — completed forms, dated acknowledgments, anything tied to a person — live in FileMaker. **How to do a task** is a guide, not a venue fact.

The dividing line, which is the same one the whole repo runs on: *if you would put it on a drawing, it lives in the model; if you would tell it to a new hire on their first walk of the space, it lives here.*

⚠️ **On personnel:** this repo is private, so names are not a leak. But a fact that decays when someone leaves the job ("Charlie has the key") is a worse note than the one that outlives them ("the key lives in the PM office, ask the PM"). Write the durable version.

## The Vectorworks base file

**Phase 2 of 6** — building the `.vwx` from the authored plan. Stalled since 2026-07-16 on three rulings: the class tree, sheet numbering, and locking the layer list.

It was built in **Educational**, so it will need re-creating in a licensed version. The hedge is a DWG export: keep resources embedded and cleanly laid out and a re-import de-skins the file but brings the content back.

**The `.vwx` does not live in git.** It lives locally; this package documents it.

❌ **There is no symbol inventory anywhere.** The old plan was to generate it from a Vectorworks worksheet, so it does not exist until someone runs that export. The columns needed are name, type, default layer, default class, and count.

---

*Setup conventions that apply to every venue rather than just this one: [how our Vectorworks files are set up](../../standards/vectorworks/).*

*Open questions about the layer and class lists are in the ClickUp decision log, not in these files.*
