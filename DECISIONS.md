# Decisions

Settled calls about this repo and its contents. **One line each, newest first.** Open questions live in ClickUp, not here.

**Why the split:** an open question needs a clickable checkbox to answer, and `- [ ]` is dead text in a repo. So questions go to ClickUp — **one log for this whole repo**, not one per document — and once answered they land here as a line. ClickUp is the inbox; this is the archive.

*ClickUp log: Prose Documentation (repo) — Decision Log, in the Brain Reference Library.*

---

## This repo · 2026-07-30

- **D-036** — The Vectorworks research findings migrate as **lookup notes, not a numbered register.** `F-NNN` numbering dropped: nobody looks up F-011, they look up how to get a list out of a file, so the filename carries the question.
- **D-035** — **Do not scaffold empty files.** Seven heading-only phase skeletons were deleted the day after they shipped. A file appears when there is something to put in it; gaps get NAMED in the package README instead. An empty container makes a project look further along than it is.
- **D-034** — **Roles go in `handbooks/<role>/`; production phases go in `guides/production-phases/`.** A handbook belongs to a person in a role, a phase guide belongs to the phase. Five departments live through the same load-in, so it is written once and cited, never copied per role.
- **D-033** — Everything stays in **this one repo**. A second repo was proposed to separate personal from institutional prose; that solves a PUBLISHING boundary, and nothing publishes yet. Split when something actually does.

## This repo · 2026-07-29

- **D-032** — Head electrician notes are broken up by **production phase**, not calendar week, matching the spine the existing handbook site already used. *(Superseded in part by D-034: the phases moved to `guides/`.)*
- **D-031** — *(renumbered from the original D-031; see D-032.)*
- **D-030** — **Prose, not tables, and no YAML front matter.** GitHub renders front matter as a table, so every note opened with a metadata grid instead of a sentence. What mattered in it — what this is, where it came from, how old the source is — goes in an italic line under the title. A table is allowed only when the data is genuinely tabular and there is nothing to say about it, and it has to justify itself in the file. *(Supersedes the front-matter half of D-025.)*
- **D-029** — Notes are **handoff docs**, written for a designer, a new hire, or whoever holds the role next. Reference first, ceremony never.
- **D-028** — Dropped `practice/`. A production history is a record set; FileMaker owns it.
- **D-027** — `guides/` and `standards/` both stay, with the boundary test written into `CONVENTIONS.md` so placement is never a judgment call.
- **D-026** — Replaced the old "never numbers in prose" rule: **if you would put it on a drawing it lives in the model; if you would tell it to a new hire on their first walk, it lives in the notes.**
- **D-025** — Prose lives in `maw-prose`, private, Michael is the only distribution gate. Level 1 is artifact type and depth is capped at two levels. ~~The taxonomy is front matter.~~ **Superseded by D-030: there is no front matter. The taxonomy lives in the prose and the paths, and finding things is a matter of reading rather than querying.**
- **D-025b** — FileMaker holds **records**, this repo holds **source**. An FMP record may carry a repo path; the repo never holds a copy of a record.

## Vectorworks · 2026-07-16

- **D-024** — Naming is seeded in the template, then copied per package where it may drift, so the exported bundle is self-contained.
- **D-023** — The object-class tree is a **proposal**, not ratified. No `classes.csv` until it is ruled.
- **D-022** — Smith sheet list drafted from the department-prefix scheme. Still a draft.
- **D-021** — Smith's reference-plane rule: deck off the interior trim face, mezzanine and catwalk off nominal wall structure.
- **D-020** — Smith layer list authored as a manifest, keyed department × elevation band. Working draft.
- **D-019** — `_TEMPLATE/` cloned to `smith-theatre/` as the first instance. The template stays pristine.
- **D-018** — Chronological logs are newest-at-top and prepend. Numbered registers are exempt.
- **D-017** — Capture every resource type except rendering polish. Segmented files, one example CSV per record type.
- **D-016** — Prose in Markdown, data manifests in comma-CSV. **No `.txt`.** *(Made thirteen days before this repo existed, and it is why this repo is markdown.)*
- **D-015** — **Git is the plan, Vectorworks is the realization, export is reconciliation.** Git leads; the file is built to match it. *(Same shape as D-025b, one domain over.)*
- **D-014** — Superseded by D-026.
- **D-013** — Datum is the room center, on the internal origin.
- **D-012** — Layers carry location, department, elevation. Classes carry object category. Elevation never goes in a class.
- **D-011** — One dense master; department files reference it rather than copying geometry.
- **D-010** — Research established practice before designing the workflow. Produced 16 sourced findings.
- **D-009** — `.vwx` files do not live in git.
- **D-008** — Educational-to-licensed rebuild accepted, hedged with a DWG export. Keep resources embedded and laid out.
- **D-007** — Six-phase lifecycle: brainstorm → template → base file → package → per-show → archive.
- **D-006** — Plan first, schema later.
- **D-005** — Productions do not get top-level folders.
- **D-004** — Superseded by D-025. Documentation left `ClickUp_apps` for this repo.
- **D-003** — This documentation lives in git, not ClickUp docs. *(Still true; only the repo changed.)*
- **D-002** — Package structure is templated; per-show files clone it.
- **D-001** — The deliverable is a versioned documentation package, not a vague file state.

---

*D-001..D-024 came from `ClickUp_apps/Vectorworks/DECISION-LOG.md`, read whole at commit `fe616a2`. Full rationales are in git history and in the notes each decision governs.*
