---
id: TEMPLATE-sheet-layer
name: "L-101"
title: "Sheet title as it prints"
type: sheet-layer
status: gap
sheet_number: "L-101"
scale: 
use: "one line. what this sheet shows, and who reads it."
---

# L-101 · Sheet title as it prints

<!--
KEYS beyond the class set

sheet_number  the number as it appears in the title block. The reader's
              handle for this sheet, and the thing they say out loud.

title         the sheet title as PRINTED. If it differs from `name`, that is
              a finding, not a formatting choice.

scale         the viewport scale, when the sheet has one dominant scale.
              A sheet with mixed scales leaves this blank and says so below.

issue         OPTIONAL. The title-block issue this sheet belongs to, which is
              what `Publish` batches on.
-->

## Viewports on this sheet

One line each: what it is a view of, which design layers are visible, which class overrides apply. A sibling `.tsv` when the list gets long.

⚠️ **Class and layer visibility overrides live on the VIEWPORT, not on the class.** A class documented `visibility: on` can still be invisible on a sheet, and that is not a contradiction. Record the override here, where it actually lives.

## Who reads it

The sheet exists for somebody. A carpenter, an electrician, a shop, a vendor, an archive. Say which, because it decides what belongs on it.

## Related

`standards/vectorworks/sheets-and-drawing-sets.md` — the portable standard for numbering and set composition.
