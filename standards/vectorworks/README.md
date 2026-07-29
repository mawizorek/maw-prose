# How our Vectorworks files are set up

*Read this before you open a show file. Ten minutes here saves you a day of drafting into the wrong place. Content last checked: 2026-07-16.*

Venue specifics are separate: **[Smith Theatre](../../venues/smith-theatre/)** has the room, the layer list, and the classes.

## Layers vs. classes — the one thing to get right

**The layer says WHERE it is. The class says WHAT IT IS.**

A layer carries location, department, and elevation, which is why a layer name looks like `LX - PLOT 2 TOE PIPES`. A class carries the object category so you can filter on it, which is why a class name looks like `Steel-Pipe`. That is the whole distinction, and almost every structural mistake in these files comes from blurring it.

**Elevation lives in the layer. Never in a class.** If you find yourself making a class called `high` or `deck`, stop — that belongs in the layer name.

**A class is not a linestyle bucket.** Pen weight and fill are drafting attributes, not categories. A class exists so a viewport can switch every piece of steel off at once.

**Class names use dashes, up to four parts:** `Steel-Beam`, `Masking-Traveler`. The dash is functional — it drives the nesting you see in the Navigation and Organization palettes. `Steel_Beam` or `Steel Beam` will not nest.

**Heads up on the vendor docs:** Vectorworks Spotlight tells you to keep layers lean and put rigging, positions, and instruments all on one layer. **We do not do that**, and it is deliberate. Spotlight assumes one designer's plot. Ours is a multi-department master that other files reference, so department has to be visible in the layer structure or the reference model below has nothing to hook onto. Expect roughly 29 layers, not six.

## You are probably working in a file that REFERENCES the master

One dense **master** file holds all the venue geometry, every department as layers. Your department or show file **references** it and pulls in only the layers you need.

What that means day to day. **Do not redraw the architecture** — it is already in the master, reference it. **Referenced items show up italicized**, which is how you tell what you can edit from what you cannot. **Venue geometry gets fixed in the master, once**: if a wall is wrong it is wrong in the master, fixing it there fixes it everywhere, and patching it locally just hides it. **Use a referenced Design Layer Viewport**, not layer-import — layer-import copies everything in and makes your file fat, and it is the Fundamentals default, so it is easy to do by accident.

⚠️ **The master and your file must be on the same Vectorworks version.** No exceptions, and it bites during any upgrade.

## Origin

**The datum is the geometric center of the room**, and it sits on the Vectorworks **internal origin (0,0)** — not a shifted user origin.

Two reasons it matters: precision degrades as geometry moves away from the internal origin, which would wreck the DWG export we depend on, and every referencing file inherits the same coordinate frame for free.

**Do not move the origin.** Ever.

## Watch the reference plane

A venue's walls are not where the nominal dimensions say they are, and **which surface you measure from can change with elevation.**

At Smith: **deck measures off the interior trim face, mezzanine and catwalks off the nominal wall structure.** So a dimension that is right at deck level is wrong at the catwalk, and nothing in the drawing warns you.

**Every venue package carries a note like that.** Read it before you trust a dimension. Smith's is in [the-room.md](../../venues/smith-theatre/the-room.md).

## Symbols

**Lighting devices and pipe/position symbols must be hybrid 2D/3D**, and the 2D part must be a **screen-plane** representation, not a 2D planar object. Get this wrong and the symbol misbehaves in 3D — it is the single most common authoring mistake here.

**Attach records to the symbol DEFINITION, not to instances.** A record on the definition auto-attaches to every instance, which is what makes the inventory exportable later. Records travel with the symbol on import and copy.

**No commas in symbol names.** Our manifests are comma-CSV.

## Where numbers live

**If you would put it on a drawing, it lives in the model.** Dimensioned geometry belongs in the `.vwx`, and a transcribed dimension in a document goes stale the moment someone edits the file.

**If you would tell it to a new hire on their first walk of the space, it lives in these notes.** A load rating, a beam position, a trim behaviour, a datum convention — those are properties of the building. They do not change when someone edits a file, and burying them somewhere that needs a license to open is how they get lost.

## What is not locked yet

Three things are drafted but not ratified. If you need them, ask rather than assume.

**The class tree** is a proposal — [the list](../../venues/smith-theatre/classes.md). **Sheet numbering** is drafted from the existing department-prefix scheme (UR / S / L / A / R / V, with `0` as the department readme sheet). **The house layer list** is a working draft, and nine of its 29 rows have no status.

## The file you are working from is built in Educational

It will have to be re-created in a licensed version eventually. The hedge is a **DWG export**: with resources embedded and cleanly laid out, a re-import de-skins the file but brings the content back.

**So: keep resources embedded, keep them laid out, keep class names clean.** That discipline is the only thing making the rebuild survivable, and it costs nothing while you work.

⚠️ On a DWG round-trip, **a DWG "layer" maps to a Vectorworks CLASS**, not a layer. Map them deliberately and save the mapping set.

---

*The research behind all of this — 16 sourced findings with vendor links and confidence ratings — is still in `ClickUp_apps/Vectorworks/VWX-BEST-PRACTICES.md` and has not been migrated. Settled calls are in [`DECISIONS.md`](../../DECISIONS.md); open ones are in the ClickUp decision log, never in this repo.*
