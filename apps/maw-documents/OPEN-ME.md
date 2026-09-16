---
theme: default-theme
object-library: shared/themes/_objects.json
notes: >
  Theme metadata tag (STRICT). Every FMP app tree declares its theme here.
  Renders read this slug and inline the resolved tokens at build time.
  default-theme resolves to the grayscale default and is a PLACEHOLDER here:
  MAW Documents has not been assigned a theme yet. Object library points at
  the canonical shared set; renders MUST use these components.
  Cold agents: check this block before rendering anything.
---

# MAW Documents (Personal Document Library) — Doc Tree (v1.1)

This tree mirrors what you open in FileMaker. Each file = one menu destination.
Open the tree, find the screen, build or edit from it.

📖 **Read it in a browser:**
[docs-viewer.html](https://mawizorek.github.io/maw-prose/apps/maw-documents/docs-viewer.html)
— sidebar nav over every page below, tables and all. Deep-links per page.

**What this app is.** A single-user, local-first personal digital library + document
repository + file logistics layer. One library engine underneath, binder-style lenses
on top. Books, textbooks, paperwork, scans and PDFs are all `Documents` — a book is a
document with better metadata, not a different kind of thing.

**Lineage.** MAW Documents is the REFERENCE IMPLEMENTATION for the shared document /
variant / version engine. `apps/hml-llc/` is the sibling deployment; the engine is
settled HERE first, then cloned. Two files, one design lineage.

## Where the two halves live

| Surface | Holds | Rule |
|---|---|---|
| **This repo tree** | What gets READ while building: table and field specs, the relationship model, script contracts, layout inventory, data standards, build spec, changelog | Open this when the FileMaker window is already open |
| **[Decision Log](https://app.clickup.com/36074068/docs/12cwjm-57453/12cwjm-80213) (ClickUp)** | What gets ANSWERED and argued: `Q`/`J` blocks, inverted-polarity checkboxes, the brainstorm, session transcripts, build status | A decision log cannot live here — `- [ ]` is inert text in markdown, so a `Q` block in git literally cannot be answered |

⚠️ **The seam that rots if nobody minds it: a decision reached in ClickUp has to LAND
here.** A ruling the build cannot see is not a ruling. Every `J` block on the log carries
a *Reflected on* line, and that line names a file in this tree.

```
apps/maw-documents/
│
├── OPEN-ME.md              ← you are here (nav + build order + theme tag)
├── docs-viewer.html        ← DOC READER (renders every .md below, in a browser)
├── README.md               ← what the app is, who it is for, what it refuses to be
├── schema-notes.md         ← the spine: grain, layers, and the rules that hold it together
├── design-decisions.md     ← index of settled rulings → pointers to the ClickUp log
├── data-standards.md       ← app-local naming, keys, audit fields, controlled values
├── next-build-spec.md      ← what gets built next, in order, with the exit test
├── changelog.md            ← structural changes to this documentation set
│
├── tables/                 ← Manage → Database → Tables
│   ├── BibliographicDetails.md     ← 1:1 extension, book facts only
│   ├── ContributorRoles.md         ← author / editor / translator / illustrator
│   ├── CopyLoans.md                ← possession over time, both directions
│   ├── DocumentCopies.md           ← the physical or digital object you hold
│   ├── DocumentPeople.md           ← the contribution join (role lives HERE)
│   ├── Documents.md                ← the bibliographic / intellectual identity
│   ├── Organizations.md            ← one authority: publishers, vendors, libraries
│   ├── People.md                   ← name-authority record
│   ├── PurchaseLines.md            ← what was in the order
│   └── Purchases.md                ← the order
│
└── relationships/          ← Manage → Database → Relationships
    └── README.md           ← THE source of truth: FK map, TO groups, join logic
```

✅ **This map was verified against a live directory listing, and it is alphabetical inside
`tables/` because that is the order the filesystem returns.** It is not hand-maintained —
regenerate it from the tree rather than editing it by hand. The sibling app's nav map drifted
from its own tree (a filename typo plus eight omitted files) and nobody noticed for six weeks.

## 📖 The two viewers are different tools, on purpose

| Tool | Reads | Answers |
|---|---|---|
| **`docs-viewer.html`** (here) | `*.md` in this tree | *what does this app's schema say* |
| **`viewer.html`** (in `apps/hml-llc/`) | `*.html` layout renders | *what does this FileMaker layout look like built* |

🚩 **Do not merge them and do not teach either one the other's job.** Ruled 2026-09-16. A third
thing, `doc-render-engine`, is the markdown *publisher* (it builds a static site); this reader
publishes nothing and reads the repo live. Three tools, three jobs.

⚠️ No layout renders exist for this app yet, so `viewer.html` is deliberately **not** copied in
here. An empty dropdown is worse than an absent tool.

## 🚧 Not yet cut, and deliberately so

The **library spine** — `Documents` variants and files, contexts, subjects, document
types, import batches, `GLOBAL_USE_VARIABLES` — is designed but still carries
**pre-J3 naming** (`DOCUMENT_VARIANTS`, `DOCUMENT_FILES`, `CONTEXTS`…) on its ClickUp
design page. Those files land in the rename pass, not before.

**Cutting them now as empty stubs would be shipping the scaffolding and calling it the
building.** A file that exists and says nothing reads as a file that has been written.
So they are absent, and this section is why.

| Table | State |
|---|---|
| `DocumentVariants` | designed, pre-J3 name, awaiting rename pass |
| `DocumentFiles` | designed, pre-J3 name, awaiting rename pass |
| `Contexts` · `DocumentContexts` | designed, pre-J3 name, awaiting rename pass |
| `DocumentTypes` · `Subjects` · `DocumentSubjects` | designed, pre-J3 name, awaiting rename pass |
| `ImportBatches` | designed, pre-J3 name, awaiting rename pass |
| `GLOBAL_USE_VARIABLES` | designed; keeps its screaming caps deliberately |
| `layouts/` · `scripts/` · `value-lists/` · `calculations/` · `fixtures/` | not started — no directory yet, because an empty directory is the same lie |

## Build order (Phase 1)

Nothing here is built. This is the order to build it in, and the reason for the order is
that each step is testable before the next one depends on it.

1. `tables/Documents.md` + `tables/DocumentCopies.md` — identity and object. Nothing
   else works until the grain split is real.
2. `tables/People.md` + `ContributorRoles.md` + `DocumentPeople.md` — the contribution
   join. Exit test: one person appearing as author on one book and editor on another,
   with no duplicate person row.
3. `tables/BibliographicDetails.md` — the sparse extension. Exit test: a scanned packing
   slip with no row here, and no empty columns anywhere.
4. `tables/Organizations.md` — the party authority, before anything points at it.
5. `tables/Purchases.md` + `PurchaseLines.md` — the ledger. ⚠️ Money write: FMP19
   pattern, no native transactions. Exit test: one order, three books, one shipping
   charge, and a forced failure mid-commit that leaves NO header behind.
6. `tables/CopyLoans.md` — possession over time. Exit test: the same copy lent twice,
   with the first loan still legible.

⚠️ **Do not write `ExecuteSQL` against any of these until the rename pass is done.**
SQL text embeds the table name and does not fail loudly when it drifts.
