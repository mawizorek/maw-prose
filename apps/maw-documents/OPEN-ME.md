---
theme: default-theme
object-library: shared/themes/_objects.json
notes: >
  Theme metadata tag (STRICT). default-theme = grayscale default, and it is a
  PLACEHOLDER here: this app has no assigned theme yet.
---

# MAW Documents (Personal Document Library) — Doc Tree (v1.2)

Personal digital library + document repository. **Books, textbooks, paperwork, scans and PDFs
are all `Documents`** — a book is a document with better metadata. Library engine underneath,
binder lenses on top. Single-user, local-first, **FileMaker 19 floor.**

📖 [Read this tree in a browser](https://mawizorek.github.io/maw-prose/apps/maw-documents/docs-viewer.html)
· 📋 [Decision Log](https://app.clickup.com/36074068/docs/12cwjm-57453/12cwjm-80213) (the arguing happens there, not here)

**Status: designed, not built.** No `.fmp12` exists. Three questions block the first build
session → [next-build-spec.md](./next-build-spec.md).

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
│   ├── DocumentCopies.md           the object you hold
│   ├── DocumentPeople.md           contribution join (role lives here)
│   ├── Documents.md                the work's identity
│   ├── Organizations.md            publishers, vendors, libraries
│   ├── People.md                   name-authority record
│   ├── PurchaseLines.md            what was in the order
│   └── Purchases.md                the order
│
└── relationships/
    └── README.md           ← FK map, TO groups, join logic
```

<!-- AGENT NOTE · nav map integrity.
This map was verified against a live directory listing, and tables/ is alphabetical because
that is the order the filesystem returns. DO NOT hand-maintain it — regenerate from the tree.
The sibling app's map drifted (wrong viewer filename + eight omitted root files) and nobody
caught it for six weeks; a cold agent following it concluded design-decisions.md did not exist.
-->

## Build order (Phase 1)

1. `Documents` + `DocumentCopies` — the grain split; nothing works until identity and object are two records
2. `People` + `ContributorRoles` + `DocumentPeople` — the contribution join
3. `BibliographicDetails` — the sparse extension
4. `Organizations` — the party authority, before anything points at it
5. `Purchases` + `PurchaseLines` — ⚠️ money write, FMP19 pattern
6. `CopyLoans` — possession over time

Exit tests for each → [next-build-spec.md](./next-build-spec.md).
⚠️ **No `ExecuteSQL` until the pre-J3 rename pass is done** — SQL embeds table names as text
and does not fail loudly when they drift.

## 🚧 Deliberately not cut yet

The library spine (`DocumentVariants`, `DocumentFiles`, `Contexts`, `DocumentContexts`,
`DocumentTypes`, `Subjects`, `DocumentSubjects`, `ImportBatches`, `GLOBAL_USE_VARIABLES`) is
designed but carries **pre-J3 naming** on its ClickUp design page. Same for `layouts/`,
`scripts/`, `value-lists/`, `calculations/`, `fixtures/`.

<!-- AGENT NOTE · why absent rather than stubbed.
Cutting empty stubs would ship the scaffolding and call it the building: a file that exists and
says nothing reads as a file that has been written, and an empty directory is the same lie.
GLOBAL_USE_VARIABLES keeps its screaming caps deliberately — the shout signals "not a data
table" in Manage Database and in every TO name. A convention that erases its own exception is
worse than the exception.
No layout renders exist yet, so viewer.html (the LAYOUT renderer, in apps/hml-llc/) is
deliberately not copied here. An empty dropdown is worse than an absent tool.
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
-->
