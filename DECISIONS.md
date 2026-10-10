# Decisions

Settled calls about this repo and its contents. **One line each, newest first.** Open questions live in ClickUp, not here.

**Why the split:** an open question needs a clickable checkbox to answer, and `- [ ]` is dead text in a repo. So questions go to ClickUp — **one log for this whole repo**, not one per document — and once answered they land here as a line. ClickUp is the inbox; this is the archive.

*ClickUp log: Prose Documentation (repo) — Decision Log, in the Brain Reference Library.*

---

## Profile · 2026-10-10

- **D-044** — **Michael's resume source lives here, in `profile/`: `master/` holds the summaries and the bullet bank, `resumes/` holds one resume per job lane.** It earns a type folder on the same test as `venues/` and `apps/`, what is true about one specific thing, and its packages are countable today. Resumes are named by lane, never by employer, because which posting got which resume is a record of the job search and lives on that application's ClickUp task. Dates, credits and credentials stay records in ClickUp under D-025b, D-028 and D-039; a resume carries them only as delivered text, and is corrected from ClickUp, never the other way round. Every page is `status: hidden`. The repo is public and Michael accepted that on 2026-10-10, so no phone number or other contact value beyond the public email is committed; it is added at export.

## FileMaker standards · 2026-10-05

- **D-043** — **Every FileMaker file carries the app catalog: `APP_TABLES` and `APP_LAYOUTS`, generated from the file's own schema by a refresh script, keyed on FileMaker's internal ids, holding only what FileMaker cannot store.** Typed by hand: display names, menu placement, a ClickUp-fed flag, notes. Never typed: an id or a name. Anything that points at a table or layout points at a catalog record; the layout catalog is the app's navigation menu; the refresh's `AuditGap` is the conformance check against the data standards. Removed objects are stamped, never deleted. Registers and scripts live once in `standards/filemaker/`, and app table notes point their `data` slot at them rather than copying. Same day: SQL text is built from `GetFieldName`, so a rename follows the field instead of returning empty. Adopted first by URITP People.

## URITP People · 2026-10-05

- **D-042** — **URITP People is rebuilt from scratch as a ClickUp-fed identity hub, and the July 2026 as-built pass in `apps/uritp-people/` is superseded.** ClickUp's PEOPLE list is the source of truth; a FileMaker button script pulls PEOPLE, EMAILS and PHONE NUMBERS one way, matched on native task id, with no write-back (ClickUp session of 2026-09-28). Every join into PEOPLE matches on that task id. The flat email and phone fields on ClickUp PEOPLE are ClickUp roll-up workarounds and do not port; contacts arrive as rows. Carried forward from July: bare `PrimaryKey` / `fkPERSON` naming, hub-and-spoke (roles, assignments and credits live in the file that owns them), and no cascade delete from a person to their contacts. July pages without a page header stay in place for their reasoning and are not built against; the four-input name model and student/adult classification are not carried until ClickUp holds the fields they need.

## This repo · 2026-10-04

- **D-041** — **One authoring format across every repo, the doc renderer's, and one home for every FileMaker spec, `apps/<app>/` here.** Pages in this repo carry the `template-docs` front matter (`id`, `title`, `status`, `type`, `summary`, then optional keys only when needed) and use its callouts, markers, `@id` links and TSV data tables, so a page written here and a page written in uritp-docs are written the same way. The vocabulary is referenced from template-docs, never copied in. **Supersedes the front-matter half of D-030**; the prose-over-tables half stands. FileMaker specs take the shape Production MAWster already uses: one note per table, the grain in a `Grain` callout, the field register as a sibling `.tsv` placed with a `data` slot. Folders are bare menu-mirror names (`tables/`, `relationships/`, `layouts/`, `scripts/`, `value-lists/`, `custom-functions/`), ordered by `order:`, because a numeric prefix means tooling. Moving in: uritp-docs `production-mawster/`; ClickUp_apps `filemaker/` (`maw-budget`, `uritp-global-setup`, `uritp-people`, while its `hml-llc` is superseded by this repo's and retires); the Beta Budget notes from ClickUp as `apps/uritp-budget/`. `ClickUp_apps/filemaker/DOCUMENTATION-STANDARD.md` becomes a pointer, since one standard is the source. Unchanged from 2026-09-25: a `status` key or column means publication or field grouping, never build state. Order: this rule, then this repo publishing through doc-render-engine, then the renderer reading the format, then one move per app with Production MAWster last, so no uritp page loses its target before the new one is live.

## This repo · 2026-10-03

- **D-040** — **The FileMaker sandbox renderer is the `fmp-renderer` app in `ClickUp_apps`; every app's FMP spec lives here, in `apps/<app>/`. No new repo.** It reads this repo live at page load and holds no spec content, so this repo stays content only, as `CONVENTIONS.md` requires: code that runs or gets served lives in `ClickUp_apps`. Live at `mawizorek.github.io/ClickUp_apps/fmp-renderer/`. The 2026-09-25 design (Home with spec coverage per app, Manage Database with Tables / Fields / Relationships and field options, Script Workspace with real script folders) is the target; v1 ships Home, Tables and Fields. A Vectorworks renderer later is its own app, `vwx-renderer`. Each app keeps its spec in `apps/<app>/`: `hml-llc`, `maw-documents`, and Beta Budget as `apps/uritp-budget/`. The proposed `fmp-apps` repo was never created and is dropped. Carried from 2026-09-25: the spec is the gold standard we build toward and never claims to describe the live file · no per-entity build-state field · progress lives on one build sheet per app · a DDR comparison is a temporary punch list, not documentation. Production MAWster joins only once the renderer proves itself. **Front matter is not needed:** the renderer reads the plain `## Fields` table the existing table notes already carry (`# Name`, the Manage breadcrumb, a `Grain:` line, then Field / Type / FMP Comment / TO / ⚠️), so D-030 stands and the 2026-09-25 YAML assumption is dropped. *(Amended twice: first placed at `apps/_renderer/`, then `renderers/fmp/`. Both put code in this content repo, against `CONVENTIONS.md`.)* *(Front-matter half superseded the next day by D-041.)*

## This repo · 2026-09-21

- **D-039** — **University appointment policy is documentation and lives here, in `guides/faculty-appointments/`.** Placed on the cited-versus-followed test in `CONVENTIONS.md`: a reappointment case is assembled by reading the process start to finish at the moment of need, which is a guide, rather than pointed at to settle an argument about correct practice, which would be a standard. That it is an outside institution's policy rather than our own does not move it — the repo holds documentation of things, and how the employer runs a review is a thing whoever holds the role next will need explained. **Personal appointment facts stay out:** dates, rank, track, and what was submitted when are records tied to a person, so they live in ClickUp under D-025b, and the guide describes the system without claiming to know where anyone sits in it.

## This repo · 2026-08-09

- **D-038** — **The menu-mirror depth exemption is not limited to `apps/`.** It applies wherever the extra levels copy an application's own object types, which is why `standards/filemaker/custom-functions/json-params/` is legal at four segments. The test is unchanged and still narrow: could you read every folder name off the application's own menu? Custom functions are a FileMaker object type, so yes. Invent a level with no counterpart in the app and the cap is back on. *(Extends the exemption written into `CONVENTIONS.md`, which scoped it to `apps/`.)*
- **D-037** — **Cross-app FileMaker definitions are canonical here, and installed copies audit against them.** A custom function cannot be shared between FileMaker files, so there is no way to keep two installs identical and nothing should pretend otherwise. Instead one definition lives in `standards/filemaker/`, each app holds a pointer rather than a copy, and a conformance fixture beside the definition lets a solution test its own local functions and find out it has drifted. Behaviour is compared, never a version constant: FileMaker cannot read its own function bodies at runtime, so a stamp is a label nobody bumps. Self-audit for now, meaning the app pulls the fixture from this public repo with `Insert from URL` and no credential.

## This repo · 2026-07-30

- **D-036** — The Vectorworks research findings migrate as **lookup notes, not a numbered register.** `F-NNN` numbering dropped: nobody looks up F-011, they look up how to get a list out of a file, so the filename carries the question.
- **D-035** — **Do not scaffold empty files.** Seven heading-only phase skeletons were deleted the day after they shipped. A file appears when there is something to put in it; gaps get NAMED in the package README instead. An empty container makes a project look further along than it is.
- **D-034** — **Roles go in `handbooks/<role>/`; production phases go in `guides/production-phases/`.** A handbook belongs to a person in a role, a phase guide belongs to the phase. Five departments live through the same load-in, so it is written once and cited, never copied per role.
- **D-033** — Everything stays in **this one repo**. A second repo was proposed to separate personal from institutional prose; that solves a PUBLISHING boundary, and nothing publishes yet. Split when something actually does.

## This repo · 2026-07-29

- **D-032** — Head electrician notes are broken up by **production phase**, not calendar week, matching the spine the existing handbook site already used. *(Superseded in part by D-034: the phases moved to `guides/`.)*
- **D-031** — *(renumbered from the original D-031; see D-032.)*
- **D-030** — **Prose, not tables, and no YAML front matter.** GitHub renders front matter as a table, so every note opened with a metadata grid instead of a sentence. What mattered in it — what this is, where it came from, how old the source is — goes in an italic line under the title. A table is allowed only when the data is genuinely tabular and there is nothing to say about it, and it has to justify itself in the file. *(Supersedes the front-matter half of D-025.)* *(Front-matter half superseded by D-041: pages now carry the doc renderer's header.)*
- **D-029** — Notes are **handoff docs**, written for a designer, a new hire, or whoever holds the role next. Reference first, ceremony never.
- **D-028** — Dropped `practice/`. A production history is a record set; FileMaker owns it.
- **D-027** — `guides/` and `standards/` both stay, with the boundary test written into `CONVENTIONS.md` so placement is never a judgment call.
- **D-026** — Replaced the old "never numbers in prose" rule: **if you would put it on a drawing it lives in the model; if you would tell it to a new hire on their first walk, it lives in the notes.**
- **D-025** — Prose lives in `maw-prose`, private, Michael is the only distribution gate. Level 1 is artifact type and depth is capped at two levels. ~~The taxonomy is front matter.~~ **Superseded by D-030: there is no front matter. The taxonomy lives in the prose and the paths, and finding things is a matter of reading rather than querying.** ⚠️ **The word "private" in this line is not true of the repo as it stands and has not been ruled on.**
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
