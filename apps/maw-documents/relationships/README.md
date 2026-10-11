# Relationships

Manage → Database → Relationships

**THE source of truth for the FK map, TO groups and join logic.** When a table page and this page
disagree, **this page is right.**

## The graph, Phase 1

```
GLOBAL_USE_VARIABLES
        |
        +-- drives hub filters / current lens / mode / selected record
        |
Documents ------<  DocumentVariants  ------<  DocumentFiles
    |                                              |
    |                                              +--<  ImportBatches
    |
    +-- 1:1 --  BibliographicDetails  -- fkPublisher -->  Organizations
    |
    +------<  DocumentCopies
    |              |
    |              +------<  CopyLoans  -- fkPerson -->  People
    |              |
    |              +------<  PurchaseLines  -- fkPurchase -->  Purchases
    |                                                             |
    |                                       fkVendor --------------+--> Organizations
    |                                       fkReceiptDocument -----+--> Documents
    |
    +------<  DocumentPeople  -- fkPerson -->  People
    |              |
    |              +--------- fkRole ------->  ContributorRoles
    |
    +------<  DocumentProductions  -- fkProduction --> (cross-app, no local table)
    |              |
    |              +--------- fkDocumentInstance --> DocumentVariants
    |
    +------<  DocumentContexts  --  Contexts
    |
    +------<  DocumentSubjects  --  Subjects
    |
    +--------- fkDocumentType ----->  DocumentTypes
```

🚧 `DocumentVariants`, `DocumentFiles`, `ImportBatches`, `Contexts`, `DocumentContexts`, `Subjects`,
`DocumentSubjects`, `DocumentTypes` and `GLOBAL_USE_VARIABLES` are **designed but not yet cut as
files** (pre-J3 naming, awaiting the rename pass). **The shape above is correct; the file set is
incomplete.**

🔴 **`DocumentProductions` and `DocumentContexts` are NOT redundant, and the distinction is
load-bearing.** `Contexts` is the WORLD axis (URITP · HML_LLC · home) and a context is a bucket.
A **production is an ENTITY** carrying dates, a venue and a season. `| URITP |` and `"Big Love"` are
not peers; one contains the other. Collapsing them reproduces the seven-axes-in-one-list defect
measured in the ClickUp `TAGS` value list on 2026-10-10.

## FK map

| From | Field | To | Card. | Notes |
|---|---|---|---|---|
| BibliographicDetails | fkDocument | Documents | 1:1 | ⚠️ uniqueness is script-enforced |
| BibliographicDetails | fkPublisher | Organizations | N:1 | publisher role |
| DocumentCopies | fkDocument | Documents | N:1 | many copies of one work |
| DocumentCopies | fkStorageLocation | StorageLocations | N:1 | 🚧 target not built |
| DocumentPeople | fkDocument | Documents | N:1 | |
| DocumentPeople | fkPerson | People | N:1 | |
| DocumentPeople | fkRole | ContributorRoles | N:1 | 🔴 unique on the triple |
| DocumentProductions | fkDocument | Documents | N:1 | the WORK, never a copy |
| DocumentProductions | fkProduction | — | N:1 | 🔴 **CROSS-APP, no local authority yet** |
| DocumentProductions | fkDocumentInstance | DocumentVariants | N:1 | 🚧 optional; target not built |
| Purchases | fkVendor | Organizations | N:1 | vendor role |
| Purchases | fkReceiptDocument | Documents | N:1 | the receipt is itself archived |
| PurchaseLines | fkPurchase | Purchases | N:1 | 🔴 THE write relationship |
| PurchaseLines | fkDocumentCopy | DocumentCopies | N:1 | 🔴 a copy, never a work |
| CopyLoans | fkDocumentCopy | DocumentCopies | N:1 | append-only history |
| CopyLoans | fkPerson | People | N:1 | borrower or lender, per Direction |

## The three many-to-manys

| Join | Between | Carries |
|---|---|---|
| `DocumentPeople` | works and people | the ROLE, plus billing order and scope notes |
| `PurchaseLines` | orders and copies | the PRICE, plus quantity and the receipt's wording |
| `DocumentProductions` | works and productions | the NOTES, plus per-show paperwork status |

🔴 **The test for whether a relationship needs a join row: does it carry a VALUE, a CLOCK, or both?**
Either one rules out a flag. `CopyLoans` carries both, which is why it is append-only.

⭐ **`DocumentProductions` is the matrix.** Paperwork items are rows, productions are columns, **a
cell is one record.** A pivot is a PROJECTION of this table and never a column definition — if
adding a production changes a column set anywhere, the pivot is built in the wrong place.

## 🚩 Three shortcuts that must never be re-added

1. **`Documents.fkPeopleJoins`** — a single FK on the ONE side of the contribution many-to-many.
2. **`DocumentCopies.LentTo`** — a scalar where a history belongs.
3. **`Documents.fkCurrentProduction`** — a single FK on the ONE side of the production
   many-to-many. **Struck before it was built**, 2026-10-10.

<!-- AGENT NOTE · why both will be proposed again.
A single field always looks cheaper than a join read. Neither is a shortcut; both are second claimants
on a fact the join already owns. fkPeopleJoins is correct until contributor #2 exists, then silently
wrong forever. LentTo destroys the previous loan on the next one. Struck once each, 2026-09-16.
A join table carrying only two keys is a membership flag. Both joins here carry more than membership,
which is why they are tables rather than repeating fields.
SHORTCUT 3 IS THE FIFTH INSTANCE OF THIS ONE HABIT and the first caught pre-build. The fourth lives
outside FileMaker: uritp-docs REPO_PAGES/current-production-{accessibility,egress,house,timings}.md,
where "current" is the single-slot defect expressed as a filename. Four live files, same defect class.
Also barred: a stored IsCurrent on or near DocumentProductions. That is Q1's two-current-versions bug.
-->

## Table-occurrence groups

Drawn around **what a layout needs to see at once**, not around subject matter.

| Group | Anchor | Purpose |
|---|---|---|
| Library hub | `GLOBAL_USE_VARIABLES` | hub filters, current lens, the found-set engine |
| Document detail | `Documents` | one work + bibliographic row, copies, contributors, contexts |
| Acquisition | `Purchases` | the order + its lines + their copies — 🔴 **the write path** |
| Production paperwork | `Documents` | 🚧 the production join + its instance, for the matrix export |

⚠️ **Do not reach across groups in a script when a group anchor exists for the job.**

## 🔴 Atomicity depends on the GRAPH, not just the script

The FMP19 money-write pattern requires **all rows in one commit to be reachable through ONE
relationship from a single parent record**, so `Revert Record` discards the whole set.

For a purchase: navigate to the `Purchases` parent, create lines **through the `PurchaseLines`
relationship from that record**, never commit inside the block. **A line created from any other context
is outside revert scope — the script looks correct and the rollback silently leaves it behind.**

## Open

- No TO naming applied yet (convention: context prefix, underscored). ⚠️ **Name occurrences before
  drawing them** — renaming a TO breaks every layout bound to it.
- 🔴 **No `ExecuteSQL` until the pre-J3 rename pass is done.**
- ⚠️ Whether `DocumentCopies` should hang off `DocumentVariants` rather than `Documents`. A scan is a
  variant, and a copy of a scan is arguably a copy of the variant. **Currently copies attach to the
  work; this is the one join in the graph that is not obviously right.** ⚠️ `DocumentProductions`
  inherits the identical question and the identical provisional answer.
- 🔴 **`fkProduction` has no authority table.** Thin local stub, bare external key, or the join moves
  to the URITP app. **Unresolved, and a bare key with no authority accepts typos as new productions.**
