# Schema notes

*The spine. Read this before adding a table, and read it again before adding a field to an
existing one.*

Full relationship context → [relationships/README.md](./relationships/README.md)

## The grain ladder

Every table in this app answers one question: **what does one record mean?** Get that wrong
and no amount of good field naming saves it.

| Table | One record means |
|---|---|
| `Documents` | one intellectual work — *this thing exists* |
| `BibliographicDetails` | the book facts about one work (1:1) |
| `DocumentVariants` | one stream of that work — clean, annotated, source scan |
| `DocumentFiles` | one stored payload — v1, v2, the replacement scan |
| `DocumentCopies` | one object you hold — this hardcover, this PDF on this disk |
| `People` | one human, once |
| `Organizations` | one company or institution, once |
| `DocumentPeople` | one contribution — this person, this role, this work |
| `Purchases` | one order |
| `PurchaseLines` | one thing in that order |
| `CopyLoans` | one span of possession |

🔴 **`Documents` is an ABSTRACTION and cannot be bought, lent, shelved or damaged.** Those
verbs all belong to `DocumentCopies`. If a proposed field on `Documents` describes a
physical event, it is on the wrong table.

## The three rules that keep it honest

### 1 · A role belongs to the RELATIONSHIP, never to the party

This is the load-bearing rule and it was learned the hard way, three times in one session.

A person is not *an author* — they authored one work and may have edited another.
Powell's is not *a vendor* — it played the vendor role in a purchase. A library is a
vendor when you buy its discards, a lender when you borrow, and a holding institution when
you are noting where a copy exists. Three roles, one organization.

**So there is no `Publishers` table, no `Vendors` table, no `Borrowers` table, no
`Libraries` table.** Each would be a role wearing a table's clothes, and a party in two
roles would need two rows. Two authorities, and the FK carries the role:

| Relationship | Role it implies |
|---|---|
| `DocumentPeople.fkRole` | contributor role, explicit and controlled |
| `BibliographicDetails.fkPublisher` | publisher, implied by the field |
| `Purchases.fkVendor` | vendor, implied by the field |
| `CopyLoans.fkPerson` + `Direction` | borrower or lender, implied by the table |

⚠️ **`Organizations.fkOrganizationType` is DESCRIPTIVE, not the role.** It says what kind
of body this is (bookstore, publisher, university, library) for browsing and value lists.
It cannot determine role, because a university press is a publisher on one row and a vendor
on another, simultaneously.

⚠️ **A table NAME can manufacture a wrong structure.** The live graph that started this
build had a `PEOPLE_ROLES` table, which reads as *roles a person has* — and that reading
invited a person+role pair table, which forced a second join hop, which put per-book
attributes somewhere they could silently duplicate. The name caused the schema. Renaming it
`ContributorRoles` makes the extra join look unnecessary on sight.

### 2 · A single FK on the ONE side of a many-to-many is always a lie waiting

The live graph carried `fkPeopleJoins` on the parent table — the *first author* shortcut.
It is correct until a second contributor is added, and then it disagrees with the join and
nothing reports the disagreement.

**Contributor display is an unstored calculation over the join. Never a stored key.**

The same shape appeared twice more and was struck both times: `LentTo` as a single field on
the copy (destroys the previous loan on the next one → `CopyLoans`), and any "is it out"
flag (→ unstored calc over an empty `ReturnedDate`).

### 3 · A relationship carrying a VALUE and a CLOCK is a join row with a lifecycle

Not a flag, not a checkbox, not a scalar field. A loan carries who and from-when-to-when.
A purchase line carries a price and an order date. Both are append-only rows with a
validity span, and the current state is calculated, never stored.

This is the same test that ruled a separate design: annual "reset the joins" became
append-only rows with a validity span rather than wiped flags.

## Sparse facts go on an extension, never on the parent

`BibliographicDetails` is 1:1 with `Documents` and exists for exactly this reason. So does
the `Purchases` child relationship.

**"It wouldn't apply to every document" is the argument FOR a child table, not a problem
with one.** A child table with zero rows is zero footprint. A scanned packing slip with no
purchase row is not missing data — it is a document that was never bought, and the absence
is a meaningful, correct fact.

⚠️ The failure mode to fear is the opposite design: six purchase columns and twenty
bibliographic columns on `Documents`, empty on ninety percent of rows. **A table that is
all housekeeping fields has the silhouette of a finished table, and nothing in a review
looks past the silhouette.**

## Absence must be explicit

`DocumentCopies.AcquisitionMethod` exists because not every acquisition is a purchase —
gifts, inherited books, library discards, conference freebies. Without an explicit method,
a copy with no purchase line is indistinguishable from a copy whose receipt was never
entered. One controlled field turns a silent gap into a stated fact.

Only `Purchased` is expected to carry a `PurchaseLines` row.

## Deliberately deferred

Not "forgotten" — ruled out for now, with the reason, so nobody re-proposes them as
insights:

- **Payments, refunds, currency-conversion history.** Purchase price is a fact; the money
  workflow around it is a different app.
- **Valuation over time.** What you paid and what it is worth are different tables and
  different questions.
- **Condition-change history on a copy.** Wanted eventually; not before the copy layer has
  real rows.
- **Barcode / QR workflows and a movement log.** These are asset-management features and
  this is a library.
- **The production authority layer** (`Productions`, `Companies`, `Venues`,
  `ProductionRuns`). Correct long-term, wrong first: the library core has to be proven
  first. ⚠️ When it arrives, `Companies` folds into `Organizations` — do NOT stand up a
  second org-shaped table.

## Divergences from `apps/hml-llc/`, stated on purpose

The two apps share a design lineage, so a difference has to be deliberate or it is drift.

| Here | HML | Why |
|---|---|---|
| One `People` authority | separate `Organizations` and `Contacts` | HML's are both parked and undesigned; a personal library must not fork one human into a "contact" and a "contributor" |
| `Documents` → variants → files (three layers) | `Documents` → `DocumentVersions` (two) | HML has no variant layer. **This app's split is the correct one and HML's plan drifted from it** |
| Amounts and payors live on `Purchases` / `PurchaseLines` | `Amount`, `PayorPayee`, `CheckNumber` sit directly on `Documents` | HML's flattening is the exact pattern this app's extension rule rejects. Do not clone it forward |
