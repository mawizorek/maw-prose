# Design decisions

*An INDEX, not a record. Every decision below is canonical on the ClickUp log; this page
exists so a cold agent building from the repo knows what has been settled and can go read
why.*

📋 **Canonical:**
[MAW Documents — Decision Log](https://app.clickup.com/36074068/docs/12cwjm-57453/12cwjm-80213)

🚩 **Do not copy a decision block into this file.** A `Q` block uses inverted-polarity
checkboxes — checked means REJECTED — and `- [ ]` is inert text in markdown, so a question
copied here cannot be answered and a copied answer becomes a second claimant on a fact.
One line and a pointer. That is the whole job of this page.

## Settled

| # | Decision | Consequence for the build |
|---|---|---|
| **J1** | Two apps, one engine. MAW Documents is the **reference implementation**; HML Docs is cloned forward from it | Settle the schema and the commit script HERE, before HML Docs is cut. Cloned engines diverge and there is no sync obligation |
| **Q1** | Build to the **FileMaker 19 floor** | No native transactions anywhere. Hand-built atomicity on every multi-row write |
| **Q2** | **Lenses**, not layout families | One hub, filtered by context. "Window" in speech meant "view" |
| **Q3** | HML servicing documents live **only** in the HML app | This archive may hold real-estate **templates**. A template is not a record |
| **J3 / J10** | **Naming locked.** PascalCase plural tables, `PrimaryKey` bare text UUID, `fk` + PascalCase with no underscore, `calc_*`, `g_*`, `gLIST_*`, audit fields on every table. `GLOBAL_USE_VARIABLES` keeps its caps | → [data-standards.md](./data-standards.md). A rival `pk_`/`fk_` convention was marked superseded on 2026-09-16 |
| **J4** | Design documentation belongs in `maw-prose/apps/` | This tree |
| **J5** | **Books are documents.** No separate library file. Contribution join collapses from two tables to one. Bibliographic facts go on a 1:1 extension | → `tables/Documents.md`, `DocumentPeople.md`, `BibliographicDetails.md` |
| **J6** | **Purchase ledger = header + lines**, attaching to the copy. One `Organizations` authority, not three org-shaped tables | → `tables/Purchases.md`, `PurchaseLines.md`, `Organizations.md` |
| **J7** | **Publishers, vendors, borrowers and libraries are ROLES**, not tables. Two authorities carry them | → [schema-notes.md](./schema-notes.md) rule 1 |
| **J9** | **Repo is the build surface; ClickUp holds the argument.** What is barred from the repo is *answerable* content, not unsettled content | → [OPEN-ME.md](./OPEN-ME.md) |
| **J11** | `maw-prose/apps/` is the declared home for FileMaker build notes, and the folder shape **mirrors FileMaker's own Manage menus** — not an invented taxonomy | This tree's structure |

## Open, and blocking something

| # | Question | What it blocks |
|---|---|---|
| **Q5** | Copies or titles only? | ⚠️ **Answered by implication in J6** — a purchase is evidence of acquiring a copy, so `DocumentCopies` is load-bearing. Left unstruck on the log pending confirmation; if that read is wrong, the copy layer and the purchase ledger both change shape |
| **Q6** | Book-only ledger, general purchase ledger, or book-only with the pattern documented once? | Whether URITP Inventory clones this engine or invents a second one. **A general ledger would need a polymorphic line target, which is the single most expensive thing in this design** |
| **Q7** | Does a copy you possess but do not own belong in the library? | `CopyLoans.Direction` and whether "what do I owe / what is owed to me" is one view or impossible |
| **Q8** | Which surface is canonical? | ✅ Superseded by J9. The question was framed wrong: it is about posture, not ranking |
| **Q9** | Where does the doc standard's **repo clause** get authored? | Whether this tree's shape is a cross-app standard or a MAW-Documents-local convention. `apps/hml-llc/` and `apps/production-mawster/` are already undescribed by any standard |

## Known risks carried forward

- 🔴 **A linter may be enforcing the dead naming convention.** The superseded standards page
  claimed enforcement by the DDR Explorer Health/Linter portal. If that is live, it flags
  J3-correct keys as defects and passes superseded ones — an automated check arguing
  against the ruling in the ruling's own voice. **Linter config is downstream of a naming
  ruling: re-tune it, never obey it.** Unverified; treat as a lead.
- ⚠️ **This app has historically been documented on two ClickUp surfaces under two names**
  (a task descriptor and a differently-titled design page). That naming drift is why the
  "separate library file?" question looked open when it had already been answered.
- ⚠️ **The interim ClickUp blueprint points at the wrong intake list.** Books live in one
  list, the migration mapping describes another in the same folder.
- ⚠️ **No row on the FileMaker App Index.** The nearest row reads *"no dedicated doc home
  found yet"* — the same defect that once hid a built-and-in-production app.
