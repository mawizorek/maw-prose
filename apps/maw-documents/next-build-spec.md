# Next build spec

*What gets built next, in order, with the test that says it worked. Feature requests land HERE.*

**Nothing is built.** No `.fmp12` exists. Schema designed, naming locked, ten table pages ready.

## 🔴 Three answers block the first session

| Blocker | Decides |
|---|---|
| **Q5** confirmation | whether `DocumentCopies` is real — it was inferred from the purchase request, not stated |
| **Q6** | whether `PurchaseLines.fkDocumentCopy` is a real FK or a polymorphic target |
| **Q7** | whether `CopyLoans.Direction` exists, or the table is outbound-only |

⚠️ **Q6 must be answered before the table is built.** Retrofitting a polymorphic target onto rows
that assumed a real key is the most expensive move in this design.

All three live on the [Decision Log](https://app.clickup.com/36074068/docs/12cwjm-57453/12cwjm-80213).

## Rename pass — first, and cheap now

The ClickUp design page still uses pre-J3 ALL_CAPS (`DOCUMENTS`, `DOCUMENT_VARIANTS`…). Rename to
PascalCase plural, cut the remaining table pages, **then** write any `ExecuteSQL`.
`GLOBAL_USE_VARIABLES` keeps its caps.

## Build order + exit tests

**An exit test that cannot fail is not a test.**

1. **`Documents` + `DocumentCopies`** → one work with **two copies** (hardcover + PDF) in different
   locations with different conditions, plus a third work with **zero copies** still in the catalogue.
2. **`People` + `ContributorRoles` + `DocumentPeople`** → one person as **author on one work and
   editor on another**, exactly one `People` row. Then try the same person+role on one work twice
   and confirm the script refuses — ⚠️ **FileMaker will not.**
3. **`BibliographicDetails`** → a packing slip with **no row at all** beside a textbook with a full
   one, and **no empty columns on `Documents`.**
4. **`Organizations`** → **one row serving as both publisher and vendor.** If that needs two rows,
   `fkOrganizationType` has been misused as the role again.
5. **`Purchases` + `PurchaseLines`** → one order, three books, one shipping charge. Then **force a
   failure mid-commit and confirm NO header is left behind.** ⚠️ Verify lines are created through
   the `PurchaseLines` relationship from the parent record — anywhere else is outside revert scope.
6. **`CopyLoans`** → the same copy **lent twice, first loan still legible.** Then change a
   `ReturnedDate` directly in the data and confirm the copy's status follows.

<!-- AGENT NOTE · why the exit tests are shaped this way.
Each step is testable before the next depends on it. Step 5's forced failure is the one nobody
runs and the only one that matters: a partial purchase (header, no lines) looks completely fine in
a list view, and calc_LineCount = 0 is the only tell. Nothing surfaces it unless something already
looks wrong.
Step 2's duplicate check exists because the two-join design this app replaced was criticised for
allowing exactly that duplicate. Failing to guard it here reproduces the defect one table over.
Step 1's zero-copy case is how a library records a work it does not own.
-->

## Then, not before

`GLOBAL_USE_VARIABLES` + the `h_DocLibrary` hub (⚠️ wire global setup day one) · `StorageLocations`
· the variant and file layers, post-rename · intake (desktop drag-drop and scan first, phone
second) · `layouts/`, `scripts/`, `value-lists/`, `calculations/`, `fixtures/` **when they have
contents, never as empty scaffolding.**

## Reports this schema unlocks

All one join away once lines exist — **none were reachable from the original graph:** spend by
vendor and by year · cost per subject or document type · average price by format · what you paid
for and never annotated · replacement value for insurance · what you owe and what is owed to you
(⚠️ needs Q7).

<!-- AGENT NOTE · keep this list; it earned the layer.
The original design added a second join on the PEOPLE side hoping to unlock reporting, and
unlocked none. The purchase and copy layers unlock every line above. Right instinct, wrong table —
worth remembering the next time a table is proposed "for reporting."
-->

## Not in scope

Payments/refunds · currency conversion · valuation over time · condition history · barcode/QR ·
movement log · the production authority layer · loan reminders. Reasons in
[schema-notes.md](./schema-notes.md). **Deferred is not forgotten.**
