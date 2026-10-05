---
id: TEMPLATE-hatch
name: "Hatch Name"
type: hatch
status: gap
folder: "Resource Manager folder path"
associative: true | false
scope: page | world
use: "one line. what material or condition this hatch means."
---

# Hatch Name

<!--
KEYS beyond the class set

associative  whether the hatch is associative. A non-associative hatch does
             not follow its object when the object changes.

scope        page | world. 🔴 THE ONE THAT BITES: a page-scoped hatch prints
             at the same density at every scale, a world-scoped one does not.
             Getting this wrong is invisible on screen and obvious on paper.
-->

## What it means

A hatch is a **convention**, not a decoration. Plywood, steel, masking, a cut plane, soft goods. If two hatches mean the same thing, one of them should go — but flag it, do not delete it.

## Reads correctly at

The scales it has actually been checked at. ⚠️ Not the scales you assume. A hatch that has never been printed has not been verified, and `status: gap` is the honest value.
