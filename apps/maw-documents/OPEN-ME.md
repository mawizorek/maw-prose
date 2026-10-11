---
theme: default-theme
object-library: shared/themes/_objects.json
notes: >
  Theme metadata tag (STRICT). default-theme = grayscale default, and it is a
  PLACEHOLDER here: this app has no assigned theme yet.
---

# MAW Documents (Personal Document Library) — Doc Tree (v1.3)

Personal digital library + document repository. **Books, textbooks, paperwork, scans and PDFs
are all `DOCUMENTS`** — a book is a document with better metadata. Library engine underneath,
binder lenses on top. Single-user, local-first, **FileMaker 19 floor.**

📖 [Read this tree in a browser](https://mawizorek.github.io/maw-prose/apps/maw-documents/docs-viewer.html)
· 📋 [Decision Log](https://app.clickup.com/36074068/docs/12cwjm-57453/12cwjm-80213) (the arguing happens there, not here)

🔴 **THE FILE EXISTS** — 14 tables built, records in three of them (J19). Per the Lifecycle SoT
rule the built file is the source and **every page here is a CLAIM.** Verify against Manage
before trusting a field list. One blocker gates the spine cut → [next-build-spec.md](./next-build-spec.md).

```
apps/maw-documents/
├── OPEN-ME.md              ← you are here
├── docs-viewer.html        ← doc reader (renders every .md below)
├── README.md               ← what the app is, and refuses to be
├── schema-notes.md         ← the spine: grain + the three rules
├── design-decisions.md     ← settled rulings → log pointers
├── data-standards.md       ← naming, keys, audit fields
├── next-build-spec.md      ← build order + exit tests
├── changelog.md
│
├── tables/                 ← Manage → Database → Tables
│   ├── BibliographicDetails.md     1:1 extension, book facts
│   ├── ContributorRoles.md         author / editor / translator
│   ├── CopyLoans.md                possession over time
│   ├── DOCUMENT_PRODUCTIONS.md     production join (the NOTES live here)
│   ├── DOCUMENT_TYPES.md           document kind vocabulary
│   ├── DocumentCopies.md           the object you hold
│   ├── DocumentPeople.md           contribution join (role lives here)
│   ├── Documents.md                the work's identity
│   ├── Organizations.md            publishers, vendors, libraries
│   ├── People.md                   name-authority record
│   ├── PurchaseLines.md            what was in the order
│   ├── Purchases.md                the order
│   └── REPO_PAGES.md               one row per rendered page in a repo
│
└── relationships/
    └── README.md           ← FK map, TO groups, join logic
```

🚩 **FILENAMES ARE HALF-MIGRATED AND THAT IS NOT A STYLE QUESTION.** `ALL_CAPS` is the live
convention (Michael reversed the PascalCase rename pass **2026-09-16**: *"clearly i'm committing
to all caps"*, after the file was built all-caps — **tables shout, fields do not**). Live
exemplars: `DOCUMENT_PRODUCTIONS` · `DOCUMENT_TYPES` · `REPO_PAGES`. **The other ten still carry
the dead convention.** ⚠️ A cold agent cloning any of those ten inherits a dead name — that
happened on 2026-10-10 and was corrected same-day.

<!-- AGENT NOTE · nav map integrity.
Regenerated from a LIVE directory listing on 2026-10-11, and the regeneration found a real defect:
the v1.2 map listed 11 .md pages and OMITTED DOCUMENT_TYPES.md and REPO_PAGES.md, both on disk. The
v1.3 push inherited the omission rather than catching it.
That is the exact failure this note already warned about one app over: apps/hml-llc/OPEN-ME.md named
_viewer.html (file: viewer.html) and omitted eight root files, and nobody caught it for six weeks.
Writing "verified against a live listing" is not the same as verifying, and the sentence survived two
passes where it was no longer true.
Order is case-insensitive alphabetical, which is what the GitHub contents API returns: '_' sorts ahead
of a letter, so DOCUMENT_PRODUCTIONS and DOCUMENT_TYPES precede DocumentCopies.
Field-register .tsv siblings are not listed, matching the existing convention.
DO NOT hand-maintain this map. Regenerate it from the tree.
-->

## Build order (Phase 1)

🔴 **Step 0 is now the `DOCUMENT_INSTANCES` blocker** in `next-build-spec.md` — nobody has read
Manage to learn whether the variant and file layers were merged in the built file. **It decides
whether the spine cut is six tables or two.** ⚠️ An FK pointing at an uncut table resolves to
nothing, silently, forever.

1. `DOCUMENTS` + the copy layer — the grain split; nothing works until identity and object are two records
2. `PEOPLE` + roles + the contribution join — one person, two roles, two rows
3. `BIBLIOGRAPHIC_DETAILS` — the sparse extension
4. `ORGANIZATIONS` — the party authority, before anything points at it
5. `PURCHASES` + `PURCHASE_LINES` — ⚠️ money write, FMP19 pattern
6. `COPY_LOANS` — possession over time
7. `DOCUMENT_PRODUCTIONS` — the paperwork × production join. 🔴 **BLOCKED:** `fkProduction` has no
   authority table, and a bare key with no authority accepts typos as new productions

Full ordered list, defects and exit tests → [next-build-spec.md](./next-build-spec.md).
⚠️ **No `ExecuteSQL` until the naming is settled** — SQL embeds table names as text and does not
fail loudly when they drift.

## 🚧 Deliberately not cut yet

The library spine (`CONTEXTS`, `DOCUMENT_CONTEXTS`, `SUBJECTS`, `DOCUMENT_SUBJECTS`,
`IMPORT_BATCHES`, `GLOBAL_USE_VARIABLES`, `STORAGE_LOCATIONS`, and the variant/file layers **only
if the blocker says they are not already merged**). Same for `layouts/`, `scripts/`,
`value-lists/`, `calculations/`, `fixtures/`.

<!-- AGENT NOTE · why absent rather than stubbed.
Cutting empty stubs would ship the scaffolding and call it the building: a file that exists and
says nothing reads as a file that has been written, and an empty directory is the same lie.
GLOBAL_USE_VARIABLES keeps its screaming caps deliberately — the shout signals "not a data
table" in Manage Database and in every TO name. A convention that erases its own exception is
worse than the exception, and that exception is now the whole convention.
No layout renders exist yet, so viewer.html (the LAYOUT renderer, in apps/hml-llc/) is
deliberately not copied here. An empty dropdown is worse than an absent tool.
DOCUMENT_PRODUCTIONS WAS cut despite its target being unbuilt, because the join itself is fully
specified and the missing piece is named in its Open section. A page with a stated blocker is not
a stub; a page with nothing in it is.
-->

## The two viewers are different tools

| Tool | Reads | Answers |
|---|---|---|
| `docs-viewer.html` (here) | `*.md` | what does this app's schema say |
| `viewer.html` (in `apps/hml-llc/`) | `*.html` renders | what does this layout look like built |

🚩 **Do not merge them or teach either one the other's job** (ruled 2026-09-16).
`doc-render-engine` is a third thing: the markdown *publisher*.

<!-- AGENT NOTE · the ClickUp/repo seam, and the one way it rots.
REPO = what gets READ while building (specs, relationship model, script contracts, standards).
CLICKUP = what gets ANSWERED and argued (Q/J blocks, inverted-polarity checkboxes, transcripts,
build status). A decision log cannot live in git: `- [ ]` is inert text in markdown, so a Q
block here literally cannot be answered. What is barred from the repo is ANSWERABLE content,
not unsettled content — the in-progress schema belongs here.
THE SEAM: a decision reached in ClickUp has to LAND here. A ruling the build cannot see is not
a ruling. Every J block's "Reflected on" line names a file in THIS tree, not a ClickUp task.
This app has six weeks of evidence for that exact failure.
LINEAGE: MAW Documents is the REFERENCE IMPLEMENTATION of the shared document/variant/version
engine. apps/hml-llc/ is the sibling deployment. Settle the engine here, then clone.
ONE LIVE EXCEPTION, 2026-10-10: the MAW Documents Decision Log page BODY refuses writes, so J10
onward, Q10 and J22 are parked as COMMENTS on that page. A parked J block survives intact; a parked
Q block has INERT CHECKBOXES, so that log cannot accept a Q block until the body is editable. Q10
was answered by ClickKit button instead. Ten-plus rulings currently live outside the log body.
-->
