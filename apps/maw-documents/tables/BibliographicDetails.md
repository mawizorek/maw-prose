# BibliographicDetails

Manage → Database → Tables → BibliographicDetails

Grain: **the book facts about one work.** 1:1 with [Documents](./Documents.md). A row exists
only when the document is a published thing with bibliographic identity — a book, a
textbook, a score, a published article.

⭐ **This table exists so that `Documents` does not have twenty empty columns.** A scanned
packing slip has no row here, and that absence is correct and meaningful, not missing data.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkDocument | text-uuid | The work these facts describe | → Documents | 🔴 must be unique: 1:1, enforced |
| fkPublisher | text-uuid | The publishing body | → Organizations | 🔴 NOT a text field. See below |
| ISBN | text | ISBN-13 preferred, ISBN-10 accepted | | ⚠️ store unhyphenated; format for display |
| EditionStatement | text | As printed: "2nd ed.", "rev. and expanded" | | ⚠️ transcribe, do not normalize |
| PublicationYear | number | Year of THIS edition, not of the work | | ⚠️ a 1985 work in a 2003 printing is 2003 here |
| PageCount | number | Pages in the published object | | |
| CallNumber | text | LC or Dewey, if the copy carries one | | ⚠️ library discards often do; useful for shelf order |
| Notes | text | Bibliographic oddities worth recording | | |

Audit fields on every table → [data-standards.md](../data-standards.md).

## 🚩 Author does NOT live here

It is the single most likely wrong edit to this file, so it is stated at the top level.

Authors, editors, translators and illustrators are [DocumentPeople](./DocumentPeople.md)
rows, because a contribution is a person **plus a role** and one work has many of them.
An `Author` text field here would be a second claimant on that fact and would silently
disagree with the join.

## 🔴 Why `fkPublisher` is a key and not text

A publisher is an organization playing the publisher role. Yale University Press is a
publisher on this table and could be a **vendor** on a [Purchases](./Purchases.md) row —
simultaneously, from the same one row in [Organizations](./Organizations.md).

As plain text it forks: *Yale UP*, *Yale University Press*, *Yale Univ. Press*. Then
"everything I own from Yale" is quietly incomplete, and nothing reports it. **The authority
record is the whole point** — same argument as [People](./People.md).

⚠️ This field was originally specified as text and corrected the same day. If it appears as
text anywhere else, that surface is stale.

## Grain trap

🔴 **`PublicationYear` belongs to the EDITION, not the work.** A 1985 book you own in a 2003
printing has `PublicationYear = 2003` here and may have `DocumentYear = 1985` on
`Documents`. They are different facts and both are right.

This is the FRBR distinction between the work and its manifestation, arriving in a single
field. When date roles eventually split, this is where the split starts.

## Open

- ⚠️ **1:1 is a convention here, not a constraint FileMaker enforces.** Either the creation
  script checks for an existing row, or a duplicate is possible and nothing complains. Pick
  one and write it down before the first record exists.
- Whether a second edition of the same work is a new `Documents` row or a second
  `BibliographicDetails` row. **Real cataloguing says new manifestation, new record.** Not
  yet ruled; it decides how a replaced textbook edition files.

Full relationship context → [README.md](../relationships/README.md)
