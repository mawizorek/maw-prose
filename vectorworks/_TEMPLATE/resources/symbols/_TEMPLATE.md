---
id: TEMPLATE-symbol
name: "Symbol Name"
type: symbol
status: gap
folder: "Resource Manager folder path"
geometry: 2d | 3d | hybrid
insertion: "where the insertion point sits and why"
class_assignment: TEMPLATE-class
record: TEMPLATE-record
use: "one line. what this symbol represents."
---

# Symbol Name

<!--
KEYS beyond the class set

folder            the Resource Manager folder path. A symbol nobody can find
                  is a symbol nobody uses, so the path is part of the spec.

geometry          2d | 3d | hybrid. Hybrid is the one that surprises people:
                  the 2D and 3D components can live in DIFFERENT classes.

insertion         where the insertion point sits, and WHY. This is the key
                  that saves the most time in the room — an insertion point
                  at the wrong corner makes every placement a nudge.

class_assignment  the @id of the class the symbol's components are assigned
                  to. ⚠️ On a hybrid symbol this may be TWO classes. List
                  both rather than picking the one you remember.

record            the @id of the record format attached, if any. This is what
                  makes the symbol show up in a worksheet or on a data tag.

scale_behaviour   OPTIONAL. Whether the symbol scales with the layer.
-->

## What it represents

The real-world thing. A model number, a stock item, a generic placeholder.

## Gotchas

The reason somebody places it wrong. Worth more than any other section on this page.

## Related

`standards/vectorworks/resources-and-symbols.md` — the portable standard.
