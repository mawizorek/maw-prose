# The Tree — a prototype for `maw-prose`

> **Status: PROPOSAL. The shape is not ratified.** This is the first file in the repository. No content packages exist yet, deliberately — the tree gets agreed before it gets filled.
>
> **RULED 2026-07-29:** `standards/vectorworks/` is **package #1**. Everything else waits.
>
> **Last verified: 2026-07-29.** Authored by Brain (Opus 5) with Dev Dexter on architecture, seated by Maestro Mira. Session record: ClickUp task `86ajrtz1m`. **Decisions and open questions: *Prose Documentation (repo) — Decision Log*, ClickUp, Brain Reference Library.**

---

## Where decisions live (read this before adding anything to this file)

**This file holds findings, architecture, and reasoning. It never holds a question.**

Questions posed to Michael are `Q` blocks on the ClickUp Decision Log, always. The reason is mechanical, not stylistic: the decision-log format runs on **inverted checkbox polarity** — Michael answers by checking the options he *rejects*. In repo markdown, `- [ ]` is inert text. **A question written here cannot be answered without hand-editing a file through the GitHub UI**, which means it is not a question, it is a wish.

An earlier revision of this file shipped five open questions in a section at the bottom. That was the defect, corrected on 2026-07-29. **If a passage in this repo expects a reply, it is in the wrong place.**

---

## What this repository is for

Authored prose that gets **edited, versioned, rendered, and re-delivered**: role handbooks, weekly one-pagers, craft standards, safety programs, email templates.

It is **private**. Michael is the distribution gate — nothing leaves this repo except by him sending it. That is a deliberate ruling, not a default, and it is what makes writing freely here safe.

### The boundary against everything else

**RECORDS live in FileMaker. SOURCE lives here.**

- A **record** is retrieved, related, and proven: a signed acknowledgment, a completed form, a dated approval, anything tied to a specific person or production. FileMaker does relationships and found sets; markdown cannot.
- **Source** is authored text with a revision history. Git does diffs and blame; a FileMaker text field silently overwrites the previous paragraph and cannot be read by an agent at all.
- **The join is one-directional.** A FileMaker record may carry a path into this repo. This repo never carries a copy of a record. Two copies of one truth is how every mirror in this system has drifted.

**ClickUp keeps its work.** Tasks, lists, chat, decision logs, audit pages, the reference library. A stance of "documentation should leave ClickUp" was floated and **withdrawn by its author** on 2026-07-29. Nobody may cite it as a ruling.

**`mawizorek/ClickUp_apps` keeps code.** Apps, agent configuration, app data. Prose does not move there and code does not move here.

---

## The evidence this design was built from

Not invented. Surveyed on 2026-07-29:

| Source | What is there |
|---|---|
| ClickUp | **20 spaces, ~5,000 open tasks.** Largest: Budgeting/Shopping (1051), Inventory (773), _LIBRARY (758), URITP (392), Travel/POIs (271), URITP CRM (242), Dad LLC (237), Home (231), Food (193) |
| ClickUp ▸ _LIBRARY | A **`Standards` list with 89 tasks**, plus `Writings` (16), `Quotes` (7), `JOURNAL` (2), `Sources` (42) |
| ClickUp ▸ CV and Applications | **`Production History`, 44+ productions**, `Outward Profile \| Resume`, `Trainings \| Certificates \| Unions`, `Applications` |
| ClickUp ▸ MAW Documents | `DOCUMENTS fmp skin` — already a FileMaker-shaped staging list |
| Dropbox ▸ `/URITP SOPs` | **~15 `.docx` safety programs**, an `__INDEX OF PROGRAMS.docx`, a `_Cover Page.docx`, `_PROGRAMS IN PROGRESS`, `__SHOW SPECIFIC PROGRAMS`, `zOld` |
| Dropbox ▸ root | `Emergency Handbook`, `Lighting & Sound`, `_URITP Production RESOURCES`, `PRODUCTIONS`, `PROGRAM`, `Theatre Rig HB.pdf`, `zSHARED ARCHIVALS` |
| `ClickUp_apps/Vectorworks/` | A six-phase package lifecycle, `_TEMPLATE/` → `smith-theatre/`, `VWX-BEST-PRACTICES.md` at **30.6KB**, 23 logged decisions |

**Not surveyed: Google Drive.** No listing tool was available in the session that produced this file. A credential exists, so this is a gap in the survey rather than an absence of content. **Anything Drive-side is unrepresented below.**

### 🔑 The finding: this pattern has been built three times already

Nobody set out to build a prose system three times, but three exist, and **all three independently arrived at the same shape**: an index, one file per unit, a template to clone, an archive convention for superseded material.

1. **`Dropbox/URITP SOPs`** — `__INDEX OF PROGRAMS.docx` is the index. One `.docx` per program. `_Cover Page.docx` is the template. `zOld/` is the archive. This is a working prose library and it predates every conversation about building one.
2. **`ClickUp_apps/Vectorworks/`** — `README.md` is explicitly "the map." `_TEMPLATE/` is the clone source. Its own standard already locks **markdown prose plus CSV manifests** as the file format.
3. **ClickUp ▸ URITP ▸ `Policies`** — 15 tasks, 13 of which open with Michael's own sentence: *"Migrated working source from legacy Program in SAFETY Programs. Legacy item is being left in place temporarily for reference during migration."*

**The convergence is the argument.** Three surfaces, three tools, one shape, arrived at separately. That is not a preference; it is the shape this content wants.

**And the warning is in the same evidence.** The safety programs currently exist as Dropbox `.docx` files, as ClickUp `Policies` tasks, and as legacy `SAFETY Programs` tasks. **Three claimants on one truth, mid-migration, for months.** Adding this repo makes four unless a migration finishes. Nothing here is done until something else is retired.

---

## ⚠️ A correction, recorded because it changed the design

An earlier pass asserted that *electrics is the lighting department* and used that to claim Michael's own sketch contained a duplicate level. **That was wrong, and it was wrong about his profession.**

> **Electrics spans lighting, audio, and video.** It is the department that owns powered systems. Lighting is one discipline inside it.

The design consequence is not cosmetic. If `electrics` is a parent of three disciplines, then a folder named `theatre-electrics/` is **not** a countable leaf — it is a category with internal structure that will keep growing. Which kills the practice-area-at-level-one idea outright and forces the architecture below.

**Michael's instinct was right and the correction is what produced the better answer.**

---

## The architecture

### Two rules, and everything follows from them

**1. Level 1 is ARTIFACT TYPE, because artifact types are countable and domains are not.**

The test for whether something earns a folder: *can you name every sibling it will ever have, today?*

- **Artifact types: yes.** A handbook, a standard, a program, a template, a guide. The list of *kinds of document a person writes* is small and stable across an entire career.
- **Domains: no.** Michael asked for this to cover everything, cross-departmental, long-term, across roles he does not hold yet. **"Everything" is the opposite of countable.** The moment level 1 is a domain, every new role is a schema change.

**2. The taxonomy lives in front matter, not in the path.**

Domain, department, discipline, role, venue, audience — all of it. Six axes that overlap, and any path forces you to rank them.

This is what makes `electrics` tractable. A document is `department: electrics` **and** `discipline: lighting`. Both true, no decision, no duplicate level. Ask for everything in electrics and you get all three disciplines; ask for lighting and you get the subset.

**Depth is capped at two structural levels. Three path segments to any file, always.**

```
<artifact-type>/<package>/<document>.md
```

### Why depth is the thing to fear, and not the thing to want

**Granularity** is how finely content splits into files. **Depth** is how many decisions you make before you are allowed to write. They are unrelated, and the proof is in the evidence table: `VWX-BEST-PRACTICES.md` is **30.6KB and past the readable ceiling at depth 2.** Nesting it six levels deep would not have split it. One file per unit is what fixes granularity, and it works at any depth.

Depth also destroys the flexibility Michael asked for. **A path is a link.** Deep paths mean every reclassification is a file move, and every move breaks every reference to it. With the taxonomy in front matter, reclassifying is editing one line and nothing breaks because nothing moved.

---

## The tree

```
maw-prose/
  README.md                    THE MAP. One line per package. Read this first, always.
  CONVENTIONS.md               The rules. Lives inside the tree it governs.
  TREE.md                      This file. The architecture and why.

  handbooks/                   Role handbooks. Sequenced, delivered over time.
    head-electrician/
      README.md                Index + who it is for + what "done" means
      week-01.md
      week-02.md
    production-manager/
    stage-manager/

  standards/                   Craft standards. How the work is done correctly.
    vectorworks/               ← PACKAGE #1 (ruled 2026-07-29)
      README.md
      s-01-file-organization.md
      s-02-classes-and-layers.md
    paperwork/
    drafting/

  programs/                    Safety and compliance. Written to be acknowledged.
    safety/
      README.md
      ppe.md
      fire-prevention.md
      mewp.md
    emergency/

  guides/                      Task-scoped how-to. Read once, at the moment of need.
    lighting/
    audio/
    rigging/

  venues/                      Venue reference. Facts about a physical room.
    smith-theatre/
    todd/

  templates/                   Fill-in-the-blank. Never delivered as-is.
    email/
      README.md
      vendor-quote-request.md
      crew-call-confirmation.md
    documents/

  practice/                    Professional record. Portable, career-facing.
    production-history/
    credentials/
```

**Seven artifact types.** Every one answers a different question, which is the test of whether a type is real:

| Type | The question it answers | Retrieval |
|---|---|---|
| `handbooks/` | How do I *hold this role* over time? | Sequential — week 1, then 2 |
| `standards/` | What is the *correct* way to do this? | By reference, cited |
| `programs/` | What must someone *acknowledge*? | By compliance topic |
| `guides/` | How do I do this *one thing*? | By situation, at need |
| `venues/` | What is *true about this room*? | By place |
| `templates/` | What do I *start from*? | By situation |
| `practice/` | What have I *done*? | Chronological |

If a proposed type cannot state a distinct question and a distinct retrieval pattern, it is a front-matter value, not a folder.

**The type list is the only decision here that is expensive to reverse**, because level 1 is the sole taxonomy axis encoded in paths. Everything else is a text edit. It is under review — see the Decision Log.

---

## Front matter

Every document opens with this block. No exceptions — the tree's queryability is only as good as its worst-tagged file.

```yaml
---
title: Week 1 — Reading the Plot
type: handbook              # matches the level-1 folder
package: head-electrician
sequence: 1                 # handbooks and standards only; omit elsewhere

domain: theatre             # theatre | business | personal | academic
department: electrics       # electrics | scenic | props | costumes | stage-management
discipline: lighting        # lighting | audio | video — a child of department
role: head-electrician
venue: smith-theatre        # omit when venue-independent

audience: department-heads
status: draft               # draft | review | active | superseded
last_verified: 2026-07-29
---
```

**`discipline` nested under `department` is the whole correction, made structural.** Electrics is the department; lighting, audio, and video are its disciplines. Both are recorded, neither is a folder, and no document ever has to choose.

**`last_verified` is not optional and not decoration.** Prose in git rots silently, and this system has the receipts: `VERSIONS.md` once carried a remediation instruction that was 32 pull requests stale and nearly triggered a destructive revert. An app goes stale loudly. **A markdown file looks authoritative forever.** One dated line per document is the cheapest possible defense and the only one that works when nobody builds a checker.

---

## Conventions

- **Kebab-case, lowercase, everywhere.** Folders and files.
- **Zero-padded sequences.** `week-01`, not `week-1`. Unpadded sorts 1, 10, 11, 2.
- **One document per unit.** One week, one standard, one program, one template. Never a file that accretes.
- **~15KB soft ceiling, ~22KB hard.** Past roughly 22KB a file cannot be read whole, and **a file that cannot be read whole cannot be safely edited.** Over the line, split it.
- **Nothing in this repo asks a question.** Findings and reasoning here; questions to the Decision Log. If a passage expects a reply, it is misfiled. (See *Where decisions live*, top of this file.)
- **Every package has a `README.md`** listing its documents in order. The index is what makes the rest findable.
- **The root `README.md` is the map.** It is the single most valuable file here. The Vectorworks README made an entire stalled project legible from a cold start thirteen days later, without reading the other 60KB.
- **Superseded content is marked, not deleted.** `status: superseded` plus a pointer to the replacement. Git holds the history; the reader needs the signpost.
- **No `index.html`. No app. No viewer. Ever.** An app whose only job was rendering a repo markdown file was built, maintained, versioned, and then deleted on 2026-07-27 as redundant. The finding that killed it: *"I don't need the fancy app as long as the schedule is findable and legible."* **This repo is content. If it grows a viewer, it grows the same defect.**

---

## Migration candidates

Real inventory from the survey. **Only the first is authorized.**

| Candidate | Where it is now | Status |
|---|---|---|
| `standards/vectorworks/` | `ClickUp_apps/Vectorworks/VWX-BEST-PRACTICES.md`, 30.6KB | ✅ **PACKAGE #1, ruled 2026-07-29.** Already written, already over the readable ceiling. Splitting it into one-file-per-standard fixes a live defect and tests the tree against prose Michael already trusts. Two things to settle before the split: whether the source file is **moved** or **left as a pointer** (a full copy left behind is two claimants on one truth), and that `Vectorworks/DECISION-LOG.md` is **not** replicated into this tree. |
| `programs/safety/` | Dropbox `.docx` ×15 + ClickUp `Policies` ×15 + legacy `SAFETY Programs` | **Highest value, highest risk. Not authorized.** The biggest body of finished prose, and *already* three-way split mid-migration. Do not touch it until the retirement plan is explicit, or it becomes a fourth claimant. |
| `handbooks/head-electrician/` | Does not exist | The thing Michael actually wants. Net-new authoring, so it tests nothing about the structure and everything about the writing. |
| `templates/email/` | Does not exist | Thin, easy, low-stakes. A good second test. |
| `practice/production-history/` | ClickUp ▸ CV and Applications, 44+ productions | ⚠️ **Probably should NOT move.** Structured records with fields, not prose — FileMaker's lane by the boundary above. Under review in the Decision Log so the call is deliberate rather than accidental. |

---

## What is deliberately not here

- **No `_TEMPLATE/` folder.** Vectorworks earned one because a venue package has layers, classes, sheet lists, and reconciliation exports. A prose package has a README and a naming rule. **A template that enforces two conventions is more machinery than the conventions.** Revisit only if a third package genuinely wants it.
- **No automation, and no pretending otherwise.** Nothing parses the front matter today. The consumer is Brain reading the files, which *is* the capability that motivated this repo — but no scheduler fires, no site builds, and nothing sends. An email send lock has been in force since 2026-07-16: drafts yes, sending no. **The realistic gain is drafting speed, not delivery.**
- **No publishing story.** Pages from a private repository may require a paid plan; that has not been verified and nothing here depends on it. Private authoring works today regardless.
- **No content.** On purpose, and only until the type list settles. `standards/vectorworks/` is cleared to be first the moment it does.
