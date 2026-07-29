# Decisions — `maw-prose`

> **What this file is:** the **archive** of settled decisions about this repository and everything in it. Past tense, resolved only, newest at top.
>
> **What this file is not:** a place to ask anything. **Open questions live in ClickUp** — see the split below.
>
> **Last verified: 2026-07-29.**

---

## How this log works (the split, and why it is not arbitrary)

Michael's question, 2026-07-29: *"how do we do this log going forward? seems unsustainable to have DL relating to docs in CU if the doc is in Git."*

**He is right, and the reason is worth stating precisely: a decision log per DOCUMENT does not scale.** Forty documents would mean forty logs, and nobody would read any of them. But that was never the requirement. The log attaches to a **decision surface**, not to a file.

So the split is **by STATE, not by location**:

| | Lives in | Why |
|---|---|---|
| **An OPEN question** | **ClickUp**, one log for this whole repo | It is an **interaction**. The format runs on inverted checkbox polarity — Michael answers by checking what he rejects — and that needs a *clickable* checkbox. In repo markdown `- [ ]` is inert text, so a question written here cannot be answered without hand-editing a file through the GitHub UI. |
| **A RESOLVED decision** | **here**, in this file | It is a **finding**. Past tense, no reply expected, and its whole value is being readable next to the content it governs. A cold reader of `standards/vectorworks/s-01-layers-and-classes.md` should not have to leave the repo to learn why it says what it says. |

**ClickUp is the inbox. This file is the archive.** A question arrives as a `Q` block in ClickUp, Michael answers it, the answer gets folded into a numbered row here, and the ClickUp block stays forever (never cull). One ClickUp log for the entire repository — **not one per document, which is exactly the unsustainable thing.**

**The one-question test before writing anything into this repo:** *does this passage expect a reply?* If yes, it belongs in ClickUp with a pointer left behind.

**Live ClickUp log:** *Prose Documentation (repo) — Decision Log*, Brain Reference Library.

> This resolves the fork left open as **Meta DL D7** on 2026-07-26 ("how should existing repo-resident decision logs be handled?"). The answer is neither *migrate everything* nor *leave it*: **split each one, questions up to ClickUp, resolved rows down into the repo.** The Vectorworks log was the test case — 24 resolved decisions came here, its §8 Open Questions went to ClickUp as `Q` blocks.

---

## D-025 · 2026-07-29 · The prose tree, and its architecture

**Decided:** authored prose moves to `mawizorek/maw-prose`, **private**, with Michael as the sole distribution gate. Level 1 of the tree is **artifact type** (countable); the taxonomy — domain, department, discipline, role, venue, audience — lives in **YAML front matter**, never in the path. Depth is capped at two structural levels.

**Why:** "everything, cross-departmental, long-term, across roles I do not hold yet" is the opposite of a countable set, so a domain at level 1 makes every new role a schema change. Artifact types are countable and stable across a career. And a path is a link: with the taxonomy in front matter, reclassifying is a text edit instead of a file move that breaks every reference.

**The correction that produced it:** an earlier pass claimed *electrics is the lighting department* and used that to argue Michael's own folder sketch was malformed. **Electrics spans lighting, audio, and video** — it owns powered systems. Being wrong about that is what surfaced the real problem: if `electrics` parents three disciplines it is not a countable leaf, which killed practice-area-at-level-1. `discipline` is now nested under `department` in front matter, so no document ever has to choose.

**Full reasoning:** [`TREE.md`](./TREE.md).

---

## D-024 · 2026-07-16 · Naming conventions = global seed + self-contained per-package copy

The universal naming rule is **seeded in the template** as the starting point every package inherits. On clone, each package carries its **own local naming copy** that is **allowed to drift per venue** and **travels with the package when exported**. The package-local copy is the source of truth for THAT file; it states the rule in full rather than pointing up to app-level notes, which do not ship with the export.

**Notes:** confirmed by Michael. A deliberate exception to the "point up, don't duplicate" integration principle: naming drift is intentional (show-file templates may legitimately differ) and the exported bundle must be self-contained.

---

## D-023 · 2026-07-16 · Object-class tree stays a PROPOSAL

The object-class tree (steel / wood / framing / masking + dash-nested children) is recorded as a per-instance **proposal**, NOT promoted to a Standard, and no `classes.csv` is authored yet.

**Notes:** no authoritative source list exists; the tree is a structured proposal from D-012's shape. **Highest-priority open candidate, still awaiting Michael's ruling.** Per S-1: category only, never elevation.

---

## D-022 · 2026-07-16 · Smith per-department sheet list drafted

The full Smith sheet list is drafted from the existing scheme (UR / S / L / A / R / V department prefix; `0` = department readme sheet; indent = a viewport off the sheet above). Utility and PM route under UR/notes.

**Notes:** remains an **F-016 DRAFT**. Promotion to a Standard needs Michael's explicit ruling.

---

## D-021 · 2026-07-16 · Smith reference-plane rule recorded

**Deck measures off the interior trim face; mezzanine and catwalks reference the nominal wall structure.** Origin is room-center on the internal origin (S-3), already built. **The RULE only — no dimension values.**

**Notes:** Smith-scoped, not template. `+X/+Y` polarity versus N/S/E/W convention is still **open** (beams run E/W).

---

## D-020 · 2026-07-16 · Smith house layer list authored as CSV

The Smith layer list is authored as a comma-CSV manifest (per S-6) keyed **department × elevation band**, sourced from the working Google Sheet *URITP VWX Smith Theatre BASE FILE Worksheets*. The prose file holds the RULE and the department vocabulary; the enumerated rows live in the CSV. Scale is uniform (F-001) and not enumerated per row.

**Notes:** ~26 numbered layers across `0 NOTES / 1 DECK / 1.5 MEZZ / 2 TOE / 3 CATWALK`, plus a `CUT?`/import candidate. **A working draft, not a ratified Standard.** Plan authored in git first (S-5); the Vectorworks worksheet checks against it.

---

## D-019 · 2026-07-16 · Clone the template into the first real instance

`_TEMPLATE/` cloned to `smith-theatre/` as the first real package; Phase 1 → 2. **`_TEMPLATE/` is kept pristine and never edited with venue specifics.**

---

## D-018 · 2026-07-16 · Chronological logs are newest-at-top

Every changelog and decision log lists the most recent entry FIRST; new entries **prepend**, never append. **Numbered registers are exempt** — findings (`F-NNN`) and standards (`S-N`) are registers, not chronologies, so they stay in ascending order. Per-entity ledgers keyed by name rather than date are also exempt.

**Notes:** confirmed by Michael. This file follows it.

---

## D-017 · 2026-07-16 · Resource-capture list + segmentation

Capture **symbols, record formats, title-block styles, line types and weights, text and dimension styles, hatches and tile fills, and saved views**. **Exclude only** textures, Renderworks styles, and gradients — rendering polish. Resource documentation stays **segmented into separate files**, not one fat README, for cleaner diffs. **Each record type gets its own example CSV** with explicit sample rows of that record's fields.

**Notes:** confirmed by Michael. Promoted hatches and saved views from "maybe" to "yes".

---

## D-016 · 2026-07-16 · File-format split → S-6

**Prose, standards, and the WHY → Markdown.** Renders for designers on GitHub, diffs clean as plain text. **No `.txt`** — it is Markdown with the benefits stripped out. **Data manifests → CSV, comma-delimited.** Machine-comparable, clean per-row diffs, and mirrors a Vectorworks database worksheet.

**Notes:** confirmed by Michael; comma delimiter chosen. Promoted to **S-6**. **This decision is why `maw-prose` is a markdown repo** — it was made thirteen days before the repo existed.

---

## D-015 · 2026-07-16 · Direction of truth → S-5

**Git = the plan. Vectorworks = the realization. Export = reconciliation.** Git holds the intended structure, the goals, and the hand-drawn reference notes handed to collaborators, and git **leads**. Michael builds in Vectorworks *from* the git plan. The Vectorworks-to-git export is an occasional check that the built file matches the plan, **not** a routine population pipeline.

**Notes:** confirmed by Michael. Promoted to **S-5**. Explicitly parallels the FileMaker workflow. **This is the decision that generalizes furthest** — it is the same shape as the 2026-07-29 records-versus-source split between FileMaker and this repo.

---

## D-014 · 2026-07-16 · Datums documentation convention → S-4

**Document the RULE, never the numbers.** Which surface is the datum at each elevation goes in a short "Datums & Reference Planes" note. Values live in the file and its exported worksheets. The convention is universal; the specific venue rule lives in that venue's package.

---

## D-013 · 2026-07-16 · Origin and datum convention → S-3

Smith is a blackbox rectangle (~50' × 70' nominal); the datum is the **center of the room rectangle, coincident with the Vectorworks internal origin (0,0)**. Already built in the file.

**Notes:** internal-origin coincidence protects DWG round-trip precision (D-008) and shares one coordinate frame across every referencing file (D-011).

---

## D-012 · 2026-07-16 · Hybrid layer/class division → S-1

**Classes = object-category filtering** (steel, wood, framing, masking). **Layers = location + department routing + elevation band.** **Elevation lives in layers, never in classes.** Object classes use dash-delimited, four-part-maximum naming.

**Notes:** confirmed by Michael. Deliberately diverges from Spotlight's lean-layer advice, because this is a multi-department master file rather than a single designer's plot.

---

## D-011 · 2026-07-16 · Master-file reference model → S-2

One dense **MASTER** base file holds all departments as layers; department and show files **reference** it via a referenced Design Layer Viewport, pulling only the layers they need rather than duplicating geometry.

---

## D-010 · 2026-07-16 · Do the best-practices deep dive first

Research established Vectorworks practice before designing the workflow. Build on published practice, not habit. Produced findings F-001 through F-016.

---

## D-009 · 2026-07-16 · `.vwx` files do NOT live in git

Git is solely the documentation trail. The files live elsewhere; the package references them.

**Notes:** the export role was later refined by D-015 to a reconciliation check rather than routine population.

---

## D-008 · 2026-07-16 · Rebuild risk accepted, with a DWG hedge

The file is being built in Vectorworks Educational and will eventually need re-creating in a licensed version. **Mitigation: export DWG directly from the file.** With resources embedded and cleanly laid out, re-importing the DWG should de-skin but bring the content back. Keep resources embedded and laid out throughout so this path stays viable.

---

## D-007 · 2026-07-16 · Seven-phase lifecycle ratified

Phases 0 through 6: brainstorming → template build → base file build → package and publish → per-show instantiation → production use → closing and archiving.

---

## D-006 · 2026-07-16 · One exhaustive plan first, schema later

Write the plan and decision log first; build the schema from it afterwards. Broad-strokes mode.

---

## D-005 · 2026-07-16 · Productions do not get top-level folders

Productions become sub-references elsewhere. Anti-clutter guardrail.

---

## D-004 · 2026-07-16 · A `Vectorworks/` header folder in `ClickUp_apps`

**Notes:** ⚠️ **SUPERSEDED 2026-07-29 by D-025.** This deliberately bent the "repo root = apps and infrastructure only" rule to add a documentation domain to a code repository. That tension is what `maw-prose` exists to resolve, and the content has moved here. Recorded rather than deleted, because the bend was conscious and the reasoning is why the split eventually happened.

---

## D-003 · 2026-07-16 · This documentation lives in git, not ClickUp docs

**Notes:** the original ruling, and it still stands — only the repository changed. **Thirteen days before `maw-prose` existed, the call had already been made.**

---

## D-002 · 2026-07-16 · Package structure must be templated

Per-show files = clone the template, swap the specifics. Smith Theatre is the first instance.

---

## D-001 · 2026-07-16 · The deliverable is a versioned package

Reframe the deliverable as a versioned, downloadable **documentation package** describing the `.vwx` file, maintained in git, one per base show file.

**Notes:** the endpoint the project was missing. Emphasis later refined plan-first by D-015.

---

*D-001 through D-024 migrated 2026-07-29 from `ClickUp_apps/Vectorworks/DECISION-LOG.md`, read whole at commit `fe616a2`. Wording is condensed; every decision, date, and rationale is preserved. The source file's §8 Open Questions did NOT come here — they are `Q` blocks in ClickUp, because they are still questions.*
