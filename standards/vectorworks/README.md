# How our Vectorworks files are set up

*Read this before you open a show file. Ten minutes here saves you a day of drafting into the wrong place. Checked 2026-07-16.*

Venue specifics are separate: [Smith Theatre](../../venues/smith-theatre/) has the room, the layer list, and the classes.

Also in this package: [getting data out](./getting-data-out.md) · [resources and symbols](./resources-and-symbols.md) · [sheets and drawing sets](./sheets-and-drawing-sets.md).

## Layers versus classes — the one thing to get right

**The layer says WHERE it is. The class says WHAT IT IS.**

A layer carries location, department, and elevation, which is why a layer name looks like `LX - PLOT 2 TOE PIPES`. A class carries the object category so you can filter on it, which is why a class name looks like `Steel-Pipe`. Almost every structural mistake in these files comes from blurring that.

Elevation lives in the layer, never in a class. If you find yourself making a class called `high` or `deck`, stop.

A class is not a linestyle bucket. Pen weight and fill are drafting attributes, not categories. A class exists so a viewport can switch every piece of steel off at once.

Class names use dashes, up to four parts: `Steel-Beam`, `Masking-Traveler`. The dash is functional — it drives the nesting you see in the Navigation and Organization palettes. `Steel_Beam` and `Steel Beam` will not nest.

**Heads up on the vendor docs.** Vectorworks Spotlight tells you to keep layers lean and put rigging, positions, and instruments all on one layer. We do not do that, and it is deliberate: Spotlight assumes one designer's plot, and ours is a multi-department master that other files reference, so department has to be visible in the layer structure or the reference model below has nothing to hook onto. Expect roughly 29 layers, not six.

## You are probably working in a file that references the master

One dense master file holds all the venue geometry, every department as layers. Your department or show file references it and pulls in only the layers you need.

Do not redraw the architecture — it is already in the master. Referenced items show italicised, which is how you tell what you can edit from what you cannot. Venue geometry gets fixed in the master, once: if a wall is wrong it is wrong there, and patching it locally just hides it.

Use a **referenced Design Layer Viewport**, not layer-import. Layer-import copies everything in and makes your file fat, and it is the Fundamentals default, so it is easy to do by accident.

The master and your file must be on the same Vectorworks version. No exceptions, and it bites during any upgrade.

## Origin

The datum is the geometric center of the room, and it sits on the Vectorworks **internal** origin (0,0), not a shifted user origin. The internal origin is immovable; a user origin is movable and coordinates read relative to it.

Two reasons it matters: precision degrades as geometry moves away from the internal origin — stay within about 5 km of it — which would wreck the DWG export we depend on, and every referencing file inherits the same coordinate frame for free.

Do not move the origin.

## Watch the reference plane

A venue's walls are not where the nominal dimensions say they are, and which surface you measure from can change with elevation.

At Smith: deck measures off the interior trim face, mezzanine and catwalks off the nominal wall structure. So a dimension that is right at deck level is wrong at the catwalk, and nothing in the drawing warns you.

Every venue package carries a note like that. Read it before you trust a dimension. Smith's is in [the-room.md](../../venues/smith-theatre/the-room.md).

## Symbols

Lighting devices and pipe or position symbols must be hybrid 2D/3D, and the 2D part must be a **screen-plane** representation, not a 2D planar object. Screen-plane objects only exist inside hybrid symbols and do not appear in 3D views. Get this wrong and the symbol misbehaves in 3D; it is the single most common authoring mistake here.

Attach records to the symbol definition, not to instances — see [resources and symbols](./resources-and-symbols.md).

No commas in symbol names. Our manifests are comma-CSV.

## Templates and naming

Vectorworks recommends a **Save As Template** workflow: a file holding your standard classes, layers, resources, page size and attributes, so a new file starts correct instead of getting corrected. Spotlight ships default content libraries and preformatted reports worth borrowing from.

**USITT RP-2** is the graphics standard most theatre plots follow, and the one to check a plate against if you are unsure whether it reads conventionally.

Vectorworks also has built-in **Standard Naming** for layers, classes and viewports at `File > Document Settings > Standard Naming`. It ships VWArch, AIA/NCS and three user slots, and supports up to 99 custom standards per type. Our house naming could be registered there so new files inherit it rather than relying on someone remembering — not done yet.

- [Save As Template workflow](https://app-help.vectorworks.net/2019/eng/VW2019_Guide/LightingDesign1/Lighting_Design.htm) · [Resource management for entertainment design](https://www.vectorworks.net/en-US/newsroom/managing-resource-libraries-vectorworks-spotlight) · [USITT RP-2 (PDF)](https://cad4theatre.org.uk/USITT-RP2-Lighting-Standard.pdf) · [Layer, class and viewport standards](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/Structure/Layer_class_and_viewport_standards.htm) · [Creating custom standards](https://app-help.vectorworks.net/2022/eng/VW2023_Guide/Setup/Creating_additional_custom_standards.htm)

## Where numbers live

If you would put it on a drawing, it lives in the model. A transcribed dimension in a document goes stale the moment someone edits the file.

If you would tell it to a new hire on their first walk of the space, it lives in these notes. A load rating, a beam position, a trim behaviour, a datum convention — those are properties of the building. They do not change when someone edits a file, and burying them somewhere that needs a license to open is how they get lost.

## The DWG hedge

The file you are working from was built in Educational, so it will have to be re-created in a licensed version. The hedge is a DWG export: with resources embedded and cleanly laid out, a re-import de-skins the file but brings the content back.

So keep resources embedded, keep them laid out, keep class names clean. That discipline is the only thing making the rebuild survivable, and it costs nothing while you work.

**On a DWG round-trip, a DWG "layer" maps to a Vectorworks CLASS, not a layer.** Map them deliberately and save the mapping set. Symbols, plug-ins and groups export as blocks — symbol blocks keep their name, others go generic unless named in the Object Info Data tab. Vectorworks imports DWG v2.5 through 2025 and exports v12 through 2025. Expect de-classing and renaming on the round trip; clean class names, named plug-ins, and embedded resources are what make the re-import survivable.

- [Mapping DXF/DWG layer and class names](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/DXFDWG/Mapping_DXFDWG_layer_and_class_names.htm) · [DXF/DWG import options](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/DXFDWG/DXF_DWG_and_DWF_import_options.htm) · [DXF/DWG export](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/DXFDWG/DXF_DWG_and_DWF_file_export.htm)

## What is not locked yet

Three things are drafted but not ratified. If you need them, ask rather than assume.

The **class tree** is a proposal — [the list](../../venues/smith-theatre/classes.md). **Sheet numbering** is drafted from the department-prefix scheme — [the model it follows](./sheets-and-drawing-sets.md). The **house layer list** is a working draft, and nine of its 29 rows have no status.
