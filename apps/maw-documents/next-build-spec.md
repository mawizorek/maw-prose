# Next build spec

*What gets built next, in order, with the test that says it worked. Feature requests land HERE,
not in a comment somewhere.*

## Where this build actually is

**Nothing is built.** No `.fmp12` file exists for this app. The schema is designed, the naming is
locked, and ten table pages in this tree are ready to build from.

⚠️ That is worth stating flatly, because this app has a six-week history of documentation reading
as progress. **A design page is not a file.**

## 🔴 Three things block the first build session

None of them is work; all three are answers.

| Blocker | What it decides | Where |
|---|---|---|
| **Q5 confirmation** | whether `DocumentCopies` is real. It was inferred from the purchase request, not stated | Decision Log, unstruck |
| **Q6** | whether `PurchaseLines.fkDocumentCopy` is a real FK or a polymorphic target. 🔴 Cannot be retrofitted | Decision Log |
| **Q7** | whether `CopyLoans.Direction` exists, or the table is outbound-only | Decision Log |

⚠️ **Q6 in particular must be answered before the table is built, not after it has rows.**
Retrofitting a polymorphic target onto rows that assumed a real key is the single most expensive
move available in this design.

## The rename pass — do this first, it is cheap now and expensive later

The ClickUp design page still names the library spine `DOCUMENTS`, `DOCUMENT_VARIANTS`,
`DOCUMENT_FILES`, `CONTEXTS`, `DOCUMENT_CONTEXTS`, `DOCUMENT_TYPES`, `SUBJECTS`,
`DOCUMENT_SUBJECTS`, `IMPORT_BATCHES`. All pre-J3.

1. Rename to J3 form: `Documents`, `DocumentVariants`, `DocumentFiles`, `Contexts`,
   `DocumentContexts`, `DocumentTypes`, `Subjects`, `DocumentSubjects`, `ImportBatches`.
2. `GLOBAL_USE_VARIABLES` keeps its caps. Deliberately.
3. Cut the remaining table pages into `tables/` in this tree.
4. 🔴 **Only then write any `ExecuteSQL`.** SQL embeds the table name as text and does not fail
   loudly when it drifts — which is the whole reason names are locked before calcs are written.

## Build order, with exit tests

Each step is testable before the next depends on it. **An exit test that cannot fail is not a
test.**

### 1 · `Documents` + `DocumentCopies`

The grain split. Nothing else works until *the work* and *the object* are two records.

**Exit test:** one work with **two copies** — a hardcover and a PDF — in different locations,
with different conditions, and one bibliographic identity. Then a third work with **zero copies**
that still appears in the catalogue.

### 2 · `People` + `ContributorRoles` + `DocumentPeople`

The contribution join.

**Exit test:** one person as **author on one work and editor on another**, with exactly one
`People` row. Then attempt the same person+role on the same work twice and confirm the script
refuses it — ⚠️ **FileMaker will not, and that duplicate is the exact defect the old two-join
design was criticised for.**

### 3 · `BibliographicDetails`

The sparse extension.

**Exit test:** a scanned packing slip with **no row here at all**, sitting beside a textbook with
a full row, and **no empty columns anywhere on `Documents`.** If the packing slip has blank ISBN
and publisher fields, the extension was not actually used.

### 4 · `Organizations`

The party authority, built before anything points at it.

**Exit test:** **one row serving as both a publisher and a vendor** — a university press you
bought from directly. If that needs two rows, `fkOrganizationType` has been misused as the role
again.

### 5 · `Purchases` + `PurchaseLines`

🔴 The money write.

**Exit test, and it must actually be run:** one order, **three books, one shipping charge**. Then
**force a failure mid-commit** — after the header, before the third line — and confirm **NO
header row is left behind.** A partial purchase looks completely fine in a list view;
`calc_LineCount = 0` is the only tell, and nothing surfaces it unless something already looks
wrong.

⚠️ **Verify the lines are created through the `PurchaseLines` relationship from the `Purchases`
parent record.** Create them from any other context and they sit outside revert scope — the
script will look correct and the rollback will silently leave rows behind.

### 6 · `CopyLoans`

Possession over time.

**Exit test:** the same copy **lent twice, with the first loan still legible** after the second
is recorded. Then confirm *is it out* is computed, not stored — change a `ReturnedDate` directly
in the data and the copy's status must follow immediately.

## Then, and not before

- `GLOBAL_USE_VARIABLES` and the `h_DocLibrary` hub. ⚠️ Wire global setup from day one; retrofitting
  it is painful.
- `StorageLocations`, so `fkStorageLocation` has something to point at.
- The variant and file layers, post-rename.
- Intake: desktop drag-drop PDF and scan first, phone capture second.
- `layouts/`, `scripts/`, `value-lists/`, `calculations/`, `fixtures/` directories — created when
  they have contents, **never as empty scaffolding.**

## Reports this schema unlocks (the reason the purchase layer earned its place)

All one join away once lines exist, and **none of them were reachable from the original graph:**

- spend by vendor, and by year
- cost per subject, or per document type
- average price by format
- what you paid for and never annotated
- total replacement value of the collection, for insurance
- what you owe and what is owed to you, in one view (⚠️ needs Q7 answered)

⭐ Worth remembering how this got here: the original design added a second join table on the
people side hoping to unlock reporting. It unlocked none. **The purchase and copy layers unlock
all of the above** — right instinct, wrong table.

## Explicitly not in scope

Payments and refunds · currency-conversion history · valuation over time · condition-change
history · barcode and QR workflows · a movement log · the production authority layer · loan
reminders and nagging.

Each is deferred with a reason in [schema-notes.md](./schema-notes.md). **Deferred is not
forgotten** — do not re-propose one as an insight.
