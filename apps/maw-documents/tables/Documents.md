# Documents

Manage → Database → Tables → Documents

Grain: **one intellectual work.** A book, a light plot, a lease, a scanned packing slip — one row
each, all the same kind of thing at this layer.

🔴 **An abstraction: cannot be bought, lent, shelved or damaged.** Those belong to
[DocumentCopies](./DocumentCopies.md).

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| DocumentTitle | text | The title as you would say it aloud | | |
| SortTitle | text | Leading articles dropped, for shelf order | | ⚠️ "The Rigging Guide" sorts under R |
| DocumentSummary | text | What this is and why it is kept | | |
| fkDocumentType | text-uuid | Textbook / plot / lease / scan | → DocumentTypes | ⚠️ table not yet cut |
| DocumentYear | number | The one most useful year | | ⚠️ date roles split later |
| SourceSystem | text | Where a migrated record came from | | |
| SourceSystemKey | text | Its key there | | ⚠️ ClickUp task id lands here on migration |
| IsReference | number | 1 = general reference, no context | | |
| NeedsTagging | number | 1 = intake incomplete | | |
| IsArchived | number | 1 = hidden from lenses, never deleted | | |
| Notes | text | Free-form | | |
| calc_ContributorDisplay | (c→Text) | Contributors as a readable string | → DocumentPeople | 🔴 UNSTORED |
| calc_CopyCount | (c→Number) | Copies held | → DocumentCopies | ⚠️ 0 is legitimate |

Audit fields → [data-standards.md](../data-standards.md).

## 🚩 There is no author field

Contributors are [DocumentPeople](./DocumentPeople.md) rows; display is an unstored calc. Publisher
is `fkPublisher` on [BibliographicDetails](./BibliographicDetails.md).

<!-- AGENT NOTE · what was here and why it is gone.
The live graph had a single fkPeopleJoins FK on this table — the "first author" shortcut. Correct
until a second contributor exists, then it disagrees with the join forever and nothing reports the
disagreement. A stored contributor string is a snapshot and lies the moment a name is corrected.
Same reasoning bars a Publisher text field here.
-->

## Rules

1. **A book is a document.** What makes it a book is a `BibliographicDetails` row.
2. **A template is not a record.** Real-estate blank forms may live here; an executed settlement
   statement may not — that is HML's.
3. **Context membership does the organizing**, through the join. Not tags, not a field here.
4. **Books use the shared `Subjects` vocabulary**, not their own genre field.
5. **Archive, never delete.**

<!-- AGENT NOTE · rules 4 and 5.
Subjects is this app's LCSH equivalent and already exists in the design; letting books grow a
private genre field forks the vocabulary.
Nothing removes a document record because a DocumentFiles row may be the only evidence a file ever
existed.
-->

## Scripts

`DOC_CreateDocument` · `DOC_EditMetadata` · `BATCH_ApplySharedMetadata`. ⚠️ Script pages not yet cut.

## Open

- 🔴 **Pre-J3 rename pending** on the design page (`DOCUMENTS`, `DOCUMENT_VARIANTS`). **No
  `ExecuteSQL` until it is done.**
- The first 10–20 `DocumentTypes` values are unseeded.
- Q7: does a work you do not own belong here at all?

FK map → [relationships/README.md](../relationships/README.md)
