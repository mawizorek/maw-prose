# Resources and symbols

*What Vectorworks means by "resource," how records attach, and why there is no symbol inventory. Sourced from Vectorworks documentation plus community confirmation; checked 2026-07-16.*

## What counts as a resource

A specific list, not a loose word. Managed in the **Resource Manager**: symbols, record formats, worksheets, hatches, line types, text styles, dimension standards, title block border styles, textures and Renderworks styles, gradients, class and layer definitions, and saved views.

So when a standard says "keep resources embedded and laid out," that is the set it means — and it is broader than most people assume, which is why a file that looks clean can still be missing the hatches or the title block style.

## Records are the data layer, and they attach to the definition

A **record format** is the schema you attach to an object or a symbol so it can carry data. It is what makes an inventory possible at all.

**Attach the record to the symbol DEFINITION, not to instances.** A record on the definition auto-attaches to every instance placed from it, which is what makes a worksheet able to count and schedule them. Records attached to a definition also **travel with the symbol** on import and copy, so the data survives moving between files.

Get this backwards and you get a plot full of objects with no data on them and no way to fix it except by hand.

## Referencing from a master

The Resource Manager exports individual resources or whole folders, and on Design Suite it can **reference** resources from a master file rather than copying them in. Referenced items show **italicised** — that is how you tell at a glance what you can edit and what belongs to the master.

## There is no symbol inventory, and this is why

**The Resource Manager has no clean one-click "dump all symbol names to a spreadsheet."** Community-confirmed, and it is a real gap in the tool rather than something we have failed to find.

The reliable path is a **worksheet database row** with symbol-name criteria, exported to CSV — see [getting data out](./getting-data-out.md). Which means a symbol inventory does not exist until someone runs that export; it cannot be assembled by reading the file.

The columns worth pulling: `name, type, default_layer, default_class, count`.

- [Resource Manager](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/ResourceManager/Resource%20Manager.htm) · [Exporting resources](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/ResourceManager/Exporting_resources.htm) · [Attaching record formats](https://app-help.vectorworks.net/2023/eng/VW2023_Guide/RecordsSchedules/Attaching_record_formats_to_symbols_objects_and_materials.htm) · [Symbol name export (VW Forum)](https://forum.vectorworks.net/index.php?/topic/115928-symbol-name-export-from-resource-manager/)

## Hybrid symbols

Covered in [how our files are set up](./README.md), because getting it wrong is the most common authoring mistake here rather than a resource question. Short version: lighting devices and position symbols must be hybrid 2D/3D, and the 2D half must be a screen-plane representation.
