# Vectorworks documentation tree

**One folder per documented Vectorworks file.** A venue base file, a show file, or `_TEMPLATE`.

This tree is read live by the **`vwx-renderer`** ClickUp app, which holds no content of its own. Write a note here, push, hit *Re-read repo*. Same contract as `apps/` and `fmp-renderer`.

Spec: `ClickUp_apps/vwx-renderer/next-build-spec.md` (PR #982).

## The one rule that decides everything else

🔴 **This tree says what the file is SUPPOSED to be. It never claims what the file currently IS.**

`standards/vectorworks/getting-data-out.md` already says it: *"an export tells you what the file currently is. Our documentation says what it is supposed to be. When they disagree, that is information, not an error to paper over."*

So a worksheet export **reconciles against** these files. It never writes them. Scaffolding this tree from an export would turn it into a mirror and delete the only signal worth having.

## Shape

```
<file>/
  INDEX.md             what the file is for, scale, units, origin
  classes/             one .md per LEAF class, FLAT
  design-layers/       one .md per design layer
  sheet-layers/        one .md per sheet layer
  resources/
    symbols/
    hatches/
    record-formats/
  meta/                revision notes, export stamps
```

**Hierarchy lives in the frontmatter `parent:` key, never in the folder tree.** `classes/` is flat. The renderer derives the tree at load. That is deliberate: re-banding the class structure becomes a frontmatter edit instead of a file migration.

⚠️ **Vectorworks itself derives hierarchy from the NAME delimiter** — `Steel-Pipe` is a child of `Steel` because of the hyphen. A `parent:` that disagrees with the name is **RED** in the renderer, and it means one specific thing: the class was re-banded here and never renamed in the file. Documentation re-banding is free. File re-banding is not.

## A stub is a complete record

Frontmatter, `status: gap`, no prose. That is finished work, not an unfinished file. The renderer badges it amber and moves on.

This is on purpose. Thirteen safety programs were written in one evening and two in the seven weeks after, because the template demanded a finished document. A nine-line class file does not.

**Never invent a value to fill a key.** Blank attributes, an unknown uniform scale and a blank status are recorded gaps, and they stay gaps.

## The back-pocket test

Same test as `venues/`: *if someone asks you in the room and you would rather not guess, it goes here.*

A class's `use:` line exists so a designer can tell whether their object belongs in it without asking you. If the line does not do that, it is not written yet.

## 🔴 Source-of-truth warning, live as of 2026-10-05

**Four claimants exist on VWX classes and layers across three repos, and none is ratified.**

| Path | Repo |
|---|---|
| `venues/smith-theatre/{classes,layers}.md` | maw-prose (proposal / working draft) |
| `production/venues/spac/vwx-base-file/{classes,layers}.md` | uritp-docs |
| `doc-specs/software/vectorworks/base/{classes,layers}.md` | uritp-docs — live and EMPTY |
| `Vectorworks/{_TEMPLATE,smith-theatre}/standards/` | ClickUp_apps — flagged for retirement (D-041 precedent) |

**Until Michael names the keeper, this tree is the DESTINATION and not yet the source of truth.** Do not migrate content in on your own read, and do not delete any claimant.
