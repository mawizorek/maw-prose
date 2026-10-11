# Relationships

Manage → Database → Relationships

**THE source of truth for the FK map, TO groups and join logic.** When a table page and this page
disagree, **this page is right.**

⚠️ **Table names below use the LIVE `ALL_CAPS` convention** (reversed 2026-09-16). Ten `tables/`
filenames still carry the dead PascalCase names; **the names here are the ones to build.**

## The graph, Phase 1

```
GLOBAL_USE_VARIABLES
        |
        +-- drives hub filters / current lens / mode / selected record
        |
DOCUMENTS ------<  DOCUMENT_VARIANTS  ------<  DOCUMENT_FILES
    |              \____ 🔴 may be MERGED as DOCUMENT_INSTANCES — unverified ____/
    |                                              |
    |                                              +--<  IMPORT_BATCHES
    |
    +-- 1:1 --  BIBLIOGRAPHIC_DETAILS  -- fkPublisher -->  ORGANIZATIONS
    |
    +------<  DOCUMENT_COPIES
    |              |
    |              +------<  COPY_LOANS  -- fkPerson -->  PEOPLE
    |              |
    |              +------<  PURCHASE_LINES  -- fkPurchase -->  PURCHASES
    |                                                             |
    |                                       fkVendor --------------+--> ORGANIZATIONS
    |                                       fkReceiptDocument -----+--> DOCUMENTS
    |
    +------<  DOCUMENT_PEOPLE  -- fkPerson -->  PEOPLE
    |              |
    |              +--------- fkRole ------->  CONTRIBUTOR_ROLES
    |
    +------<  DOCUMENT_PRODUCTIONS  -- fkProduction --> (cross-app, no local table)
    |              |
    |              +--------- fkDocumentInstance --> 🔴 BLOCKED, see below
    |
    +------<  DOCUMENT_CONTEXTS  --  CONTEXTS
    |
    +------<  DOCUMENT_SUBJECTS  --  SUBJECTS
    |
    +--------- fkDocumentType ----->  DOCUMENT_TYPES
```

🔴 **BLOCKER — `DOCUMENT_INSTANCES`.** `data-standards.md` names it as a live base table while
`DocumentCopies.md` still exists beside it. Three readings and **they are not the same build**:
copies renamed · variant+file merged · all three collapsed. ⚠️ **Nobody has read Manage.** It
decides whether the spine cut is six tables or two, so `fkDocumentInstance` above stays unbuilt
until it is answered. Full statement → `next-build-spec.md` step 1.

🚧 `DOCUMENT_VARIANTS`, `DOCUMENT_FILES`, `IMPORT_BATCHES`, `CONTEXTS`, `DOCUMENT_CONTEXTS`,
`SUBJECTS`, `DOCUMENT_SUBJECTS` and `GLOBAL_USE_VARIABLES` are **designed but not yet cut as
files.** **The shape above is correct; the file set is incomplete.**

🔴 **`DOCUMENT_PRODUCTIONS`, `DOCUMENT_CONTEXTS` and `DOCUMENT_SUBJECTS` are three different axes
and none is redundant.** `CONTEXTS` is the WORLD (URITP · HML_LLC · home) — a bucket.
`SUBJECTS` is ABOUTNESS (rigging, power, photometrics). A **production is an ENTITY** carrying
dates, a venue and a season. ⭐ **Measured in ClickUp 2026-10-11:** the `TAGS` value list
(`901329124550`) carries all three axes plus four more in 38 rows, and `| URITP |` alone is on **61
of 252** documents. **The axes are all real and heavily used; they were never separable inside one
value list.**

## FK map

| From | Field | To | Card. | Notes |
|---|---|---|---|---|
| BIBLIOGRAPHIC_DETAILS | fkDocument | DOCUMENTS | 1:1 | ⚠️ uniqueness is script-enforced |
| BIBLIOGRAPHIC_DETAILS | fkPublisher | ORGANIZATIONS | N:1 | publisher role |
| DOCUMENT_COPIES | fkDocument | DOCUMENTS | N:1 | many copies of one work |
| DOCUMENT_COPIES | fkStorageLocation | STORAGE_LOCATIONS | N:1 | 🔴 target NEVER CUT — resolves to nothing, silently |
| DOCUMENT_PEOPLE | fkDocument | DOCUMENTS | N:1 | |
| DOCUMENT_PEOPLE | fkPerson | PEOPLE | N:1 | |
| DOCUMENT_PEOPLE | fkRole | CONTRIBUTOR_ROLES | N:1 | 🔴 unique on the triple |
| DOCUMENT_PRODUCTIONS | fkDocument | DOCUMENTS | N:1 | the WORK, never a copy |
| DOCUMENT_PRODUCTIONS | fkProduction | — | N:1 | 🔴 **CROSS-APP, no local authority yet** |
| DOCUMENT_PRODUCTIONS | fkDocumentInstance | — | N:1 | 🔴 **BLOCKED** — leave unbuilt |
| PURCHASES | fkVendor | ORGANIZATIONS | N:1 | vendor role |
| PURCHASES | fkReceiptDocument | DOCUMENTS | N:1 | the receipt is itself archived |
| PURCHASE_LINES | fkPurchase | PURCHASES | N:1 | 🔴 THE write relationship |
| PURCHASE_LINES | fkDocumentCopy | DOCUMENT_COPIES | N:1 | 🔴 a copy, never a work |
| COPY_LOANS | fkDocumentCopy | DOCUMENT_COPIES | N:1 | append-only history |
| COPY_LOANS | fkPerson | PEOPLE | N:1 | borrower or lender, per Direction |

## The three many-to-manys

| Join | Between | Carries |
|---|---|---|
| `DOCUMENT_PEOPLE` | works and people | the ROLE, plus billing order and scope notes |
| `PURCHASE_LINES` | orders and copies | the PRICE, plus quantity and the receipt's wording |
| `DOCUMENT_PRODUCTIONS` | works and productions | the NOTES, plus per-show paperwork status |

🔴 **The test for whether a relationship needs a join row: does it carry a VALUE, a CLOCK, or both?**
Either one rules out a flag. `COPY_LOANS` carries both, which is why it is append-only.

⭐ **`DOCUMENT_PRODUCTIONS` is the matrix.** Paperwork items are rows, productions are columns, **a
cell is one record.** A pivot is a PROJECTION of this table and never a column definition — if
adding a production changes a column set anywhere, the pivot is built in the wrong place.

## 🚩 Three shortcuts that must never be re-added

1. **`DOCUMENTS.fkPeopleJoins`** — a single FK on the ONE side of the contribution many-to-many.
2. **`DOCUMENT_COPIES.LentTo`** — a scalar where a history belongs.
3. **`DOCUMENTS.fkCurrentProduction`** — a single FK on the ONE side of the production
   many-to-many. **Struck before it was built**, 2026-10-10.

<!-- AGENT NOTE · why all three will be proposed again.
A single field always looks cheaper than a join read. None is a shortcut; all are second claimants
on a fact the join already owns. fkPeopleJoins is correct until contributor #2 exists, then silently
wrong forever. LentTo destroys the previous loan on the next one. Struck 2026-09-16.
A join table carrying only two keys is a membership flag. All three joins here carry more than
membership, which is why they are tables rather than repeating fields.
SHORTCUT 3 IS THE FIFTH INSTANCE OF THIS ONE HABIT and the first caught pre-build. The fourth lives
outside FileMaker: uritp-docs REPO_PAGES/current-production-{accessibility,egress,house,timings}.md,
where "current" is the single-slot defect expressed as a filename. Four live files, same defect class.
A SIXTH lives one runtime over: a ClickUp Tasks-in-Multiple-Lists membership is a join with NO ROW,
so it cannot carry fkRole or SortOrder and it EVAPORATES at migration. See next-build-spec.md.
Also barred: a stored IsCurrent on or near DOCUMENT_PRODUCTIONS. That is Q1's two-current-versions bug.
-->

## Table-occurrence groups

Drawn around **what a layout needs to see at once**, not around subject matter.

| Group | Anchor | Purpose |
|---|---|---|
| Library hub | `GLOBAL_USE_VARIABLES` | hub filters, current lens, the found-set engine |
| Document detail | `DOCUMENTS` | one work + bibliographic row, copies, contributors, contexts |
| Acquisition | `PURCHASES` | the order + its lines + their copies — 🔴 **the write path** |
| Production paperwork | `DOCUMENTS` | 🚧 the production join, for the matrix export |

⚠️ **Do not reach across groups in a script when a group anchor exists for the job.**
⚠️ **No TO naming applied yet** — name occurrences before drawing them; renaming a TO breaks every
layout bound to it.

## 🔴 Atomicity depends on the GRAPH, not just the script

The FMP19 money-write pattern requires **all rows in one commit to be reachable through ONE
relationship from a single parent record**, so `Revert Record` discards the whole set.

For a purchase: navigate to the `PURCHASES` parent, create lines **through the `PURCHASE_LINES`
relationship from that record**, never commit inside the block. **A line created from any other context
is outside revert scope — the script looks correct and the rollback silently leaves it behind.**

## Open

- 🔴 **The `DOCUMENT_INSTANCES` blocker**, above. Read Manage before cutting any spine table.
- 🔴 **No `ExecuteSQL` until naming is settled.** SQL embeds table names as text and drifts silently.
- ⚠️ Whether `DOCUMENT_COPIES` should hang off `DOCUMENT_VARIANTS` rather than `DOCUMENTS`. A scan is a
  variant, and a copy of a scan is arguably a copy of the variant. **Currently copies attach to the
  work; this is the one join in the graph that is not obviously right.** ⚠️ `DOCUMENT_PRODUCTIONS`
  inherits the identical question and the identical provisional answer.
- 🔴 **`fkProduction` has no authority table.** Thin local stub, bare external key, or the join moves
  to the URITP app. **A bare key with no authority accepts typos as new productions.**
- ⚠️ **No ClickUp row carries a `PrimaryKey`** — zero UUIDs across four lists, so nothing on that side
  can be matched to a row here or to a TSV.
