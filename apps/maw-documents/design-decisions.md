# Design decisions

*An INDEX, not a record.* Canonical: 📋 [MAW Documents — Decision Log](https://app.clickup.com/36074068/docs/12cwjm-57453/12cwjm-80213)

🚩 **Never copy a decision block into this file.** `Q` blocks use inverted-polarity checkboxes
(checked = REJECTED) and `- [ ]` is inert text in markdown — a question copied here cannot be
answered, and a copied answer becomes a second claimant. **One line and a pointer.**

## Settled

| # | Decision | Consequence |
|---|---|---|
| **J1** | Two apps, one engine. This is the **reference implementation** | Settle schema + commit script HERE before HML Docs is cut |
| **Q1** | Build to the **FileMaker 19 floor** | No native transactions. Hand-built atomicity |
| **Q2** | **Lenses**, not layout families | One hub, filtered by context |
| **Q3** | HML servicing docs live **only** in HML | This archive may hold **templates** |
| **J3 / J10** | **Naming locked** | → [data-standards.md](./data-standards.md) |
| **J4** | Design docs belong in `maw-prose/apps/` | This tree |
| **J5** | **Books are documents.** Join collapses 2 → 1. Bibliographic facts on a 1:1 extension | `Documents`, `DocumentPeople`, `BibliographicDetails` |
| **J6** | **Ledger = header + lines**, attaching to the copy. One `Organizations` authority | `Purchases`, `PurchaseLines`, `Organizations` |
| **J7** | **Publishers, vendors, borrowers, libraries are ROLES**, not tables | [schema-notes.md](./schema-notes.md) rule 1 |
| **J9** | **Repo is the build surface; ClickUp holds the argument** | [OPEN-ME.md](./OPEN-ME.md) |
| **J11** | Folder shape **mirrors FileMaker's Manage menus**, not an invented taxonomy | This tree's structure |

## Open, and blocking

| # | Question | Blocks |
|---|---|---|
| **Q5** | Copies or titles only? | ⚠️ **Answered by implication in J6** — unstruck pending confirmation. If the read is wrong, the copy layer and the ledger both change shape |
| **Q6** | Book-only ledger, general ledger, or book-only + documented pattern? | Whether a purchase line's target is a real FK or polymorphic. **Cannot be retrofitted** |
| **Q7** | Does a copy you possess but do not own belong here? | `CopyLoans.Direction`, and whether "what do I owe" is possible |
| **Q8** | Which surface is canonical? | ✅ Superseded by J9 — the question was framed wrong |
| **Q9** | Where is the doc standard's **repo clause** authored? | Whether this tree's shape is a cross-app standard or local convention |

<!-- AGENT NOTE · risks carried forward, and the surfaces that have drifted before.
A LINTER MAY BE ENFORCING THE DEAD NAMING CONVENTION. The superseded standards page claimed
enforcement by the DDR Explorer Health/Linter portal. If live, it flags J3-correct keys as defects and
passes superseded ones — an automated check arguing against the ruling in the ruling's own voice.
Linter config is DOWNSTREAM of a naming ruling: re-tune, never obey. UNVERIFIED — treat as a lead.
SURFACES THAT HAVE DRIFTED: (1) this app was documented on two ClickUp surfaces under two names, which
is why the "separate library file?" question read as open when it had been answered; (2) the interim
ClickUp blueprint pointed at the wrong intake list — books live in one list, the migration mapping
described another in the same folder; (3) the FileMaker App Index had NO row for this app while Labour,
Signage and Patchbay all did, and the nearest row read "no dedicated doc home found yet" — the same
defect that once hid a built-and-in-production app. All three corrected 2026-09-16.
Q6 DETAIL: a polymorphic line target (TargetTable + TargetKey) kills referential integrity, kills the
relationship graph as a way of understanding the app, and makes every report an ExecuteSQL exercise.
The alternative is an AcquirableItems supertable — real architecture, not a field.
-->
