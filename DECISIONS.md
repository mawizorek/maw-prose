# Decisions

Settled calls, one line each, newest first. Open questions live in the ClickUp log — *Prose Documentation (repo) — Decision Log*, in the Brain Reference Library — because a `- [ ]` in a repo is dead text.

## This repo

- **D-035** — Never scaffold an empty file. Gaps get named in the package README.
- **D-034** — Roles go in `handbooks/<role>/`; production phases go in `guides/production-phases/`. Five departments share one load-in, so it is written once and cited.
- **D-033** — One repo. A second was proposed to separate personal from institutional prose; that solves a publishing boundary, and nothing publishes yet.
- **D-030** — Prose, not tables. No YAML front matter. *(Supersedes the front-matter half of D-025.)*
- **D-029** — Notes are handoff docs for a designer, a new hire, or whoever holds the role next.
- **D-028** — No `practice/`. A production history is a record set; FileMaker owns it.
- **D-027** — `guides/` and `standards/` both stay: a standard is cited, a guide is followed.
- **D-026** — Drawing dimensions live in the model; new-hire facts live in the notes. *(Replaces the old no-numbers-in-prose rule.)*
- **D-025** — Prose lives here, private, Michael is the only distribution gate. Level 1 is artifact type; depth capped at two levels.
- **D-025b** — FileMaker holds records, this repo holds source. One-directional join.

## Vectorworks

- **D-024** — Naming is seeded in the template, then copied per package, so an exported bundle is self-contained.
- **D-023** — The object-class tree is a proposal, not ratified.
- **D-022** — Smith sheet list drafted from the department-prefix scheme.
- **D-021** — Smith reference planes: deck off the interior trim face, mezzanine and catwalk off nominal wall structure.
- **D-020** — Smith layer list keyed department × elevation band.
- **D-019** — `_TEMPLATE/` cloned to the first venue instance; the template stays pristine.
- **D-018** — Chronological logs are newest-at-top. Numbered registers are exempt.
- **D-017** — Capture every resource type except rendering polish.
- **D-016** — Prose in Markdown, data manifests in comma-CSV. No `.txt`.
- **D-015** — Git is the plan, Vectorworks is the realization, export is reconciliation.
- **D-014** — Superseded by D-026.
- **D-013** — Datum is the room center, on the internal origin.
- **D-012** — Layers carry location, department, elevation. Classes carry object category.
- **D-011** — One dense master; department files reference it.
- **D-010** — Research established practice before designing the workflow. Sixteen sourced findings.
- **D-009** — `.vwx` files do not live in git.
- **D-008** — Educational-to-licensed rebuild accepted, hedged with a DWG export.
- **D-007** — Six-phase lifecycle: brainstorm, template, base file, package, per-show, archive.
- **D-006** — Plan first, schema later.
- **D-005** — Productions do not get top-level folders.
- **D-004** — Superseded by D-025.
- **D-003** — This documentation lives in git, not ClickUp docs.
- **D-002** — Package structure is templated; per-show files clone it.
- **D-001** — The deliverable is a versioned documentation package.
