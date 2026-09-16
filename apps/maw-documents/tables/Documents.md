# Documents

Manage → Database → Tables → Documents

Grain: **one intellectual work.** The canonical "this thing exists" record. A book, a light
plot, a lease, a scanned packing slip, a syllabus — all one row each, all the same kind of
thing at this layer.

🔴 **This table is an ABSTRACTION.** You cannot buy it, lend it, shelve it or damage it.
Those verbs belong to [DocumentCopies](./DocumentCopies.md). If a proposed field here
describes a physical event or a physical object, it is on the wrong table.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| DocumentTitle | text | The work's title as you would say it aloud | | |
| SortTitle | text | Title with leading articles dropped, for shelf order | | ⚠️ library convention: "The Rigging Guide" sorts under R |
| DocumentSummary | text | What this is and why it is kept | | |
| fkDocumentType | text-uuid | Primary lensing axis: textbook / plot / lease / scan | → DocumentTypes | ⚠️ table not yet cut (pre-J3 rename pending) |
| DocumentYear | number | The one most useful year for this record | | ⚠️ deliberately ONE year field; date roles split later |
| SourceSystem | text | Where this record came from, if migrated | | |
| SourceSystemKey | text | Its key in that system | | ⚠️ the ClickUp interim task id lands here on migration |
| IsReference | number | 1 = general reference, not tied to a context | | |
| NeedsTagging | number | 1 = intake incomplete, appears in the cleanup lens | | |
| IsArchived | number | 1 = hidden from default lenses, never deleted | | |
| Notes | text | Free-form | | |
| [calc_ContributorDisplay](../relationships/README.md) | (c→Text) | Contributors as a readable string, built from the join | → DocumentPeople | 🔴 UNSTORED. Never a stored key. See below |
| calc_CopyCount | (c→Number) | How many copies of this work you hold | → DocumentCopies | ⚠️ 0 is legitimate: a work you know of but do not own |

Audit fields (`CreationTimestamp`, `CreatedBy`, `ModificationTimestamp`, `ModifiedBy`) are
on every table and documented once in
[data-standards.md](../data-standards.md#audit-fields--on-every-table-no-exceptions).

## 🚩 There is no author field, and that is the design

The live graph this build started from had a single `fkPeopleJoins` foreign key on this
table. **It is the *first author* shortcut and it is correct exactly until a second
contributor exists**, at which point it disagrees with the join table and nothing reports
the disagreement.

Contributors are [DocumentPeople](./DocumentPeople.md) rows. Display is
`calc_ContributorDisplay`, unstored, computed over the join. **A stored contributor string
is a snapshot and it lies the moment a name is corrected.**

Same reasoning bars a `Publisher` text field here: publisher is on
[BibliographicDetails](./BibliographicDetails.md) as `fkPublisher`, pointing at
[Organizations](./Organizations.md).

## Business rules

1. **A book is a document.** No separate library file, no separate books table. What makes a
   book different is a [BibliographicDetails](./BibliographicDetails.md) row, not a
   different identity table.
2. **A template is not a record.** Real-estate-LLC blank forms and letterheads may live
   here as documents. An executed settlement statement may not — that is HML's, in HML's
   file. They look identical on disk and are opposite kinds of thing.
3. **Context membership does the broad organizing**, through the `DocumentContexts` join.
   Not tags, not a context field on this table.
4. **Subjects are controlled and joined**, and books use the same `Subjects` vocabulary as
   everything else. Books do NOT grow their own genre field — `Subjects` is this app's
   LCSH equivalent and it already exists in the design.
5. **Archive, never delete.** `IsArchived` hides; nothing in this app removes a document
   record, because a `DocumentFiles` row may be the only evidence a file ever existed.

## Scripts that create or update this table

| Script | What it does |
|---|---|
| `DOC_CreateDocument` | creates the identity row, then optionally launches the first variant/file flow |
| `DOC_EditMetadata` | controlled card-flow edit of title, summary, type, flags |
| `BATCH_ApplySharedMetadata` | intake cleanup pass across a found set |

⚠️ Script pages are not yet cut. Names are the settled contract from the design page.

## Open

- 🔴 **The pre-J3 rename.** The design page still calls this `DOCUMENTS` with children
  `DOCUMENT_VARIANTS` / `DOCUMENT_FILES`. Names here are J3-correct; the design page is not
  yet. **No `ExecuteSQL` until that pass is done** — SQL embeds the name and fails quietly.
- The first 10–20 canonical `DocumentTypes` values are unseeded.
- Whether a work you do NOT own belongs here at all → Q7 on the log.

Full relationship context → [README.md](../relationships/README.md)
