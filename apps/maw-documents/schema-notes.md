# Schema notes

*The spine. Read before adding a table, and again before adding a field to one.*

FK map + TO groups -> [relationships/README.md](./relationships/README.md)

## The grain ladder

| Table | One record means |
|---|---|
| `Documents` | one intellectual work: *this thing exists* |
| `BibliographicDetails` | the book facts about one work (1:1) |
| `DocumentVariants` | one stream: clean, annotated, source scan |
| `DocumentParts` | one structural component of a variant: a sheet, a section |
| `DocumentFiles` | one file identity: hash, name, MIME type |
| `FileLocations` | one storage endpoint: where a copy of the bytes lives |
| `DocumentCopies` | one object you hold |
| `People` | one human, once |
| `Organizations` | one company or institution, once |
| `DocumentPeople` | one contribution: person + role + work (bibliographic credits) |
| `DocumentRelationships` | one encounter: person + relationship + work (supervised, received, reviewed) |
| `Contexts` | one ownership scope: whose world (URITP, HML_LLC, Teaching) |
| `DocumentContexts` | one document's membership in one context |
| `Subjects` | one topical facet: what it's about (Lighting, Sound, Budgeting) |
| `DocumentSubjects` | one document's classification under one subject |
| `DOCUMENT_TYPES` | one kind of paperwork (light plot, lesson plan, score) |
| `DocumentLinks` | one document-to-document cross-reference |
| `Binders` | one canonical binder definition: an indexed order of documents |
| `BinderDocuments` | one document's membership in one binder, at a position |
| `BinderPublications` | one dated publication of a canonical binder |
| `PublicationDocuments` | one frozen document copy in one publication |
| `ImportBatches` | one intake session |
| `Purchases` | one order |
| `PurchaseLines` | one thing in that order |
| `CopyLoans` | one span of possession |
| `GLOBAL_USE_VARIABLES` | the singleton hub control record |

### The document chain (updated 2026-10-24)

```
Documents -> DocumentVariants -> DocumentParts -> DocumentFiles -> FileLocations
```

Five layers. Intelligence rises as you go up; atoms get simpler as you go down.

- **Documents**: what is this thing
- **DocumentVariants**: what kind of copy (prelim, final, annotated)
- **DocumentParts**: what structural component (Sheet 1, Instrument Schedule). fkCurrentFile lives here
- **DocumentFiles**: one file identity. Dumb: FK + hash + metadata. No version tracking
- **FileLocations**: where copies live. Container field lives here. Universal xt pointer (NAS, Dropbox, ClickUp, local)

The variant/part line: **if it could have its own parts, it's a variant. If it IS a part of
something bigger, it's a part.**

A variant with no meaningful decomposition still gets one part: "Complete." The chain stays
uniform.

### The three classification axes

- **Contexts** (whose world): URITP, HML_LLC, Teaching, Personal. Many-to-many via DocumentContexts
- **Subjects** (what topic): Lighting, Sound, Budgeting. Many-to-many via DocumentSubjects
- **DOCUMENT_TYPES** (what kind of paperwork): light plot, lesson plan, score. FK from Documents

Three independent facets. They combine as filters on the hub.

### People (two separate join paths)

- **DocumentPeople** + **ContributorRoles**: bibliographic credits. Who MADE the work (author, editor, illustrator)
- **DocumentRelationships**: personal encounters. What you DID with it (supervised, received, reviewed)

Split because they have different fields and different purposes. Credits don't need Notes;
relationships almost always do. No nullable forks.

### The binder/publishing system

```
Binders -> BinderDocuments (canonical order)
   |
   v
BinderPublications -> PublicationDocuments (frozen copies)
```

A binder is a reusable index. A publication is a dated freeze of that index. Publications
point at frozen copies, never at live canonical documents. The freeze is structural, not a
status flag.

Ported from the ClickUp BINDERS 2x2 grid (J20+J21, 2026-09-20).

## The three rules

### 1: A role belongs to the RELATIONSHIP, never to the party

A person is not *an author*: they authored one work and may have edited another. Powell's is
not *a vendor*: it played the vendor role in a purchase.

**So: no `Publishers`, `Vendors`, `Borrowers` or `Libraries` tables.** Two authorities, and the
FK carries the role:

| Relationship | Role it means |
|---|---|
| `DocumentPeople.fkRole` | contributor role, explicit and controlled |
| `BibliographicDetails.fkPublisher` | publisher |
| `Purchases.fkVendor` | vendor |
| `CopyLoans.fkPerson` + `Direction` | borrower or lender |
| `DocumentRelationships.RelationshipRole` | supervised, received, reviewed |

### 2: A single FK on the ONE side of a many-to-many is a lie waiting

The original graph carried `fkPeopleJoins` on the parent: the *first author* shortcut. Correct
until contributor #2 exists, then silently wrong forever.

**Contributor display is an unstored calculation over the join. Never a stored key.**

### 3: A relationship carrying a VALUE and a CLOCK is a join row with a lifecycle

Not a flag, not a checkbox, not a scalar. A loan carries who and from-when-to-when. A purchase
line carries a price and an order date. **Append-only rows with a validity span; current state
is calculated, never stored.**

## Sparse facts go on an extension

`BibliographicDetails` is 1:1 with `Documents` for exactly this reason.

**"It wouldn't apply to every document" is the argument FOR a child table, not against one.**

## Absence must be explicit

`DocumentCopies.AcquisitionMethod` exists because not every acquisition is a purchase.
**Without it, a copy with no purchase line is indistinguishable from a copy whose receipt was
never entered.** Only `Purchased` is expected to carry a line.

## Deliberately deferred

Ruled out for now, with reasons:

- Payments, refunds, currency-conversion history: a different app
- Valuation over time: what you paid and what it is worth are different questions
- Condition-change history: wanted, but not before the copy layer has rows
- Barcode/QR workflows, movement log: asset management, not a library
- The production authority layer (`Productions`, `Companies`, `Venues`, `ProductionRuns`)
- `STORAGE_LOCATIONS` table: deferred until multiple storage backends need managed

When the production layer arrives, `Companies` folds into `Organizations`.

## Divergences from `apps/hml-llc/`

| Here | HML | Why |
|---|---|---|
| One `People` authority | separate `Organizations` + `Contacts` | HML's are both parked and undesigned |
| Work -> variants -> parts -> files -> locations (5 layers) | Documents -> DocumentVersions (2) | HML has no variant, part, or location layer |
| Amounts on `Purchases`/`PurchaseLines` | flattened on `Documents` | the extension rule rejects HML's flattening |
