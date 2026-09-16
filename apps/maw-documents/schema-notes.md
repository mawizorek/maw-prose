# Schema notes

*The spine. Read before adding a table, and again before adding a field to one.*

FK map + TO groups → [relationships/README.md](./relationships/README.md)

## The grain ladder

| Table | One record means |
|---|---|
| `Documents` | one intellectual work — *this thing exists* |
| `BibliographicDetails` | the book facts about one work (1:1) |
| `DocumentVariants` | one stream — clean, annotated, source scan |
| `DocumentFiles` | one stored payload — v1, v2, the replacement scan |
| `DocumentCopies` | one object you hold |
| `People` | one human, once |
| `Organizations` | one company or institution, once |
| `DocumentPeople` | one contribution — person + role + work |
| `Purchases` | one order |
| `PurchaseLines` | one thing in that order |
| `CopyLoans` | one span of possession |

🔴 **`Documents` is an abstraction: it cannot be bought, lent, shelved or damaged.** Those verbs
belong to `DocumentCopies`. A field describing a physical event is on the wrong table.

## The three rules

### 1 · A role belongs to the RELATIONSHIP, never to the party

A person is not *an author* — they authored one work and may have edited another. Powell's is
not *a vendor* — it played the vendor role in a purchase.

**So: no `Publishers`, `Vendors`, `Borrowers` or `Libraries` tables.** Two authorities, and the
FK carries the role:

| Relationship | Role it means |
|---|---|
| `DocumentPeople.fkRole` | contributor role, explicit and controlled |
| `BibliographicDetails.fkPublisher` | publisher |
| `Purchases.fkVendor` | vendor |
| `CopyLoans.fkPerson` + `Direction` | borrower or lender |

⚠️ **`Organizations.fkOrganizationType` is DESCRIPTIVE, not the role** — a university press is
a publisher on one row and a vendor on another, simultaneously.

<!-- AGENT NOTE · rule 1, the full case and the failure it came from.
A library is a vendor when you buy its discards, a lender when you borrow, and a holding
institution when you note where a copy exists. Three roles, one organization, one row. Each of
the four banned tables would be a role wearing a table's clothes, and a party in two roles
would need two rows.
A TABLE NAME CAN MANUFACTURE A WRONG STRUCTURE. The live graph that started this build had
PEOPLE_ROLES, which reads as "roles a person has" — that reading invited a person+role pair
table, which forced a second join hop, which left per-book attributes somewhere they could
silently duplicate. The NAME caused the schema. Renaming it ContributorRoles made the extra
join look unnecessary on sight.
This rule was learned three times in one session (2026-09-16): once on contributors, then
re-broken on fkOrganizationType, then re-broken on LentTo. One habit, not three accidents:
putting a role or attribute on the entity instead of on the relationship.
-->

### 2 · A single FK on the ONE side of a many-to-many is a lie waiting

The original graph carried `fkPeopleJoins` on the parent — the *first author* shortcut. Correct
until contributor #2 exists, then silently wrong forever.

**Contributor display is an unstored calculation over the join. Never a stored key.**

<!-- AGENT NOTE · rule 2, the other two instances.
Same shape appeared twice more and was struck both times: DocumentCopies.LentTo (a scalar
holding the current borrower, so the previous loan is destroyed on the next one -> CopyLoans),
and any stored "is it out" flag (-> unstored calc over an empty ReturnedDate).
All three will look like good ideas again, because a single field always looks cheaper than a
join read. None is a shortcut; each is a second claimant on a fact the join already owns.
-->

### 3 · A relationship carrying a VALUE and a CLOCK is a join row with a lifecycle

Not a flag, not a checkbox, not a scalar. A loan carries who and from-when-to-when. A purchase
line carries a price and an order date. **Append-only rows with a validity span; current state
is calculated, never stored.**

## Sparse facts go on an extension

`BibliographicDetails` is 1:1 with `Documents` for exactly this reason.

**"It wouldn't apply to every document" is the argument FOR a child table, not against one.**
A child table with zero rows is zero footprint. A packing slip with no purchase row is not
missing data — it is a document that was never bought.

<!-- AGENT NOTE · the failure mode to actually fear.
The opposite design: six purchase columns and twenty bibliographic columns on Documents, empty
on ninety percent of rows. A table that is all housekeeping fields has the silhouette of a
finished table, and nothing in a review looks past the silhouette.
-->

## Absence must be explicit

`DocumentCopies.AcquisitionMethod` exists because not every acquisition is a purchase — gifts,
inherited books, library discards, comp copies. **Without it, a copy with no purchase line is
indistinguishable from a copy whose receipt was never entered.** Only `Purchased` is expected
to carry a line.

## Deliberately deferred

Ruled out for now, with reasons — **do not re-propose these as insights:**

- Payments, refunds, currency-conversion history — a different app
- Valuation over time — what you paid and what it is worth are different questions
- Condition-change history — wanted, but not before the copy layer has rows
- Barcode/QR workflows, movement log — asset management, not a library
- The production authority layer (`Productions`, `Companies`, `Venues`, `ProductionRuns`)

⚠️ **When the production layer arrives, `Companies` folds into `Organizations`.** Do not stand
up a second org-shaped table.

## Divergences from `apps/hml-llc/`

The apps share a design lineage, so a difference is deliberate or it is drift.

| Here | HML | Why |
|---|---|---|
| One `People` authority | separate `Organizations` + `Contacts` | HML's are both parked and undesigned |
| Work → variants → files (3 layers) | Documents → DocumentVersions (2) | HML has no variant layer |
| Amounts on `Purchases`/`PurchaseLines` | `Amount`, `PayorPayee`, `CheckNumber` on `Documents` | 🔴 HML's flattening is what the extension rule rejects |

<!-- AGENT NOTE · divergences, the reasoning.
HML's Organizations.md and Contacts.md explicitly refuse to list fields ("listing plausible
fields would imply design that doesn't exist") and Organizations carries an open scope question:
borrowers only, or all transacting entities? So THIS is the first real design of that table in
the lineage, and rule 1 answers HML's own open question: all transacting entities, one row each,
role by pointer. Per the reference-implementation stance, HML should adopt this shape.
On People: every real ILS (Koha, Alma, Sierra) keeps the patron file separate from the
name-authority file. Correct for an institution, wrong here — the colleague who borrows your
rigging guide may be a contributor on something else, and two people tables fork one human.
Recorded because the professional pattern points the other way and someone will cite it.
On the three layers: HML's plan drifted from a split this app had already ruled correct.
DO NOT clone HML's amount-flattening forward.
-->
