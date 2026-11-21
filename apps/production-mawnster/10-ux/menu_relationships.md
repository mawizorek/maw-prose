---
id: menu-relationships
title: Relationships
type: page
status: unlisted
chrome: app
revised: Sep 2026
summary: "The graph as designed. One page, one catalog, by choice."
hide:
  - navigation
  - toc
  - footer
---

# Relationships {.align-center}

[← Database](@menu-database)

!!! cards cols=1 style=rows
    - 🔗 @relationships

<p><br/></p>

🔴 **This menu is one door, and that is the design rather than a gap.**
`30-RELATIONSHIPS/` holds exactly two files: the index and
`RELATIONSHIPS.tsv`. **There are no per-relationship pages and there should not
be** — the index states the reason plainly: *the DDR already generates what DOES
exist,* so a second hand-written inventory is a second claimant, and the
hand-written one always loses.

⭐ **So the useful artifact is the DIFF.** The page holds INTENT — what should
exist, which anchor owns it, whether creation is allowed through it. The DDR
holds inventory. Compare them; do not merge them.

## What you are looking at when you get there

**Anchor and buoy.** One anchor occurrence per table a layout is built on, with
buoys hanging off it for everything that anchor must reach. **Never one
interconnected web** — in a web, adding a relationship for a new report silently
changes what an existing layout can see, and the symptom arrives on a printed
page weeks later.

⚠️ **Naming is `<TABLE>_for_<ANCHOR>`** — `STYLES_for_WORKDAYS`,
`THEMES_X_STYLES_for_EVENTS`. The docs once specified `<ANCHOR>_<PATH>`; the file
won, because the file's version reads as a sentence and sorts by target table,
which is how you actually hunt an occurrence.

🚫 **Two columns no DDR can give you, so they only exist if a human writes the
row BEFORE building the relationship:** `Allow_Create` (invisible on the graph,
and a relationship that silently lost it breaks a rebuild script with no error)
and `Used_By` (what makes deleting one safe).

🚫 **Never write a relationship count. The rows are the count.**
