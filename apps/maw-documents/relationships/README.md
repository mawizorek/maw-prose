# Relationships

Manage → Database → Relationships

**THE source of truth for the FK map, table-occurrence groups and join logic.** Table pages
describe their own fields; this page describes how they connect. When a table page and this page
disagree, **this page is right and the table page gets corrected.**

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
    +------<  DocumentContexts  --  Contexts
    |
    +------<  DocumentSubjects  --  Subjects
    |
    +--------- fkDocumentType ----->  DocumentTypes
```

🚧 **Grey rows above** — `DocumentVariants`, `DocumentFiles`, `ImportBatches`, `Contexts`,
`DocumentContexts`, `Subjects`, `DocumentSubjects`, `DocumentTypes`, `GLOBAL_USE_VARIABLES` —
are designed but not yet cut as files. They carry pre-J3 naming on their ClickUp design page and
land in the rename pass. **The shape above is correct; the file set is incomplete, and
[OPEN-ME.md](../OPEN-ME.md) says which is which.**

## FK map

| From | Field | To | Cardinality | Notes |
|---|---|---|---|---|
| BibliographicDetails | fkDocument | Documents | 1:1 | ⚠️ uniqueness is script-enforced, not FMP-enforced |
| BibliographicDetails | fkPublisher | Organizations | N:1 | publisher role, implied by the field |
| DocumentCopies | fkDocument | Documents | N:1 | many copies of one work |
| DocumentCopies | fkStorageLocation | StorageLocations | N:1 | 🚧 target not yet built |
| DocumentPeople | fkDocument | Documents | N:1 | |
| DocumentPeople | fkPerson | People | N:1 | |
| DocumentPeople | fkRole | ContributorRoles | N:1 | 🔴 unique on the triple document+person+role |
| Purchases | fkVendor | Organizations | N:1 | vendor role, implied by the field |
| Purchases | fkReceiptDocument | Documents | N:1 | the receipt is itself an archived document |
| PurchaseLines | fkPurchase | Purchases | N:1 | 🔴 THE write relationship. See atomicity below |
| PurchaseLines | fkDocumentCopy | DocumentCopies | N:1 | 🔴 a copy, never a work |
| CopyLoans | fkDocumentCopy | DocumentCopies | N:1 | append-only history |
| CopyLoans | fkPerson | People | N:1 | borrower or lender, per Direction |

## The two many-to-manys, and what each join carries

A join table that carries nothing but two keys is a membership flag. **Both joins here carry
more than membership, and that is why they are tables rather than repeating fields.**

| Join | Between | Carries |
|---|---|---|
| `DocumentPeople` | works and people | the ROLE, plus billing order and scope notes |
| `PurchaseLines` | orders and copies | the PRICE, plus quantity and the receipt's own wording |

🔴 **The test that decides whether a relationship needs a join row: does it carry a VALUE, or a
CLOCK, or both?** A value needs somewhere to live. A clock needs a validity span. Either one
rules out a flag. Both joins above carry a value; `CopyLoans` carries both and is therefore
append-only.

## 🚩 Two shortcuts that must never be re-added

1. **`Documents.fkPeopleJoins`** — a single FK on the ONE side of the contribution
   many-to-many. The *first author* shortcut. Correct until contributor #2 exists, then silently
   wrong forever. **It was in the original graph and it is struck.**
2. **`DocumentCopies.LentTo`** — a scalar where a history belongs. Destroys the previous loan on
   the next one. **Specified twice, struck the same day, replaced by `CopyLoans`.**

Both will look like good ideas again, because a single field always looks cheaper than a join
read. Neither is a shortcut; both are second claimants on a fact the join already owns.

## Table-occurrence groups

Groups are drawn around **what a layout needs to see at once**, not around subject matter.
Phase 1 needs three:

| Group | Anchor | Purpose |
|---|---|---|
| Library hub | `GLOBAL_USE_VARIABLES` | drives the hub's filters and current lens; the found-set engine |
| Document detail | `Documents` | one work with its bibliographic row, copies, contributors, contexts, subjects |
| Acquisition | `Purchases` | the order with its lines, and through them the copies — 🔴 **this is the write path** |

⚠️ **Do not reach across groups in a script when a group anchor exists for the job.** That is how
a relationship graph turns into a spider web, and it is also how a money write ends up not being
atomic.

## 🔴 Atomicity depends on the graph, not just on the script

The FMP19 money-write pattern requires that **all rows in one commit are reachable through ONE
relationship from a single parent record**, so `Revert Record` discards the whole set.

For a purchase that means: navigate to the `Purchases` parent, create lines **through the
`PurchaseLines` relationship from that record**, and never commit inside the block. Create a
line from any other context and it is outside the revert scope — **the script will look correct
and the rollback will silently leave the line behind.**

This is a relationship-design constraint, which is why it is documented here and not only in the
script pages.

## Open

- No TO naming applied yet. The convention is a usage-context prefix, underscore-separated
  (`uFile_Values`). ⚠️ **Name the occurrences before drawing them, not after** — renaming a TO
  breaks every layout bound to it.
- 🔴 **No `ExecuteSQL` anywhere until the pre-J3 rename pass is done.** SQL embeds the table name
  as text and does not fail loudly when it drifts.
- Whether `DocumentCopies` should hang off `DocumentVariants` rather than `Documents`. A scan is
  a variant and a copy of a scan is arguably a copy of the variant. ⚠️ **Currently copies attach
  to the work; revisit when the variant layer is cut, because this is the one join in the graph
  that is not obviously right.**
