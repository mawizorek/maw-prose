# BibliographicDetails

Manage → Database → Tables → BibliographicDetails

Grain: **the book facts about one work.** 1:1 with [Documents](./Documents.md). A row exists only when
the document is a published thing — a book, textbook, score, published article.

⭐ **It exists so `Documents` does not carry twenty empty columns.** A packing slip has no row here,
and that absence is correct.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkDocument | text-uuid | The work these facts describe | → Documents | 🔴 must be unique: 1:1 |
| fkPublisher | text-uuid | The publishing body | → Organizations | 🔴 NOT a text field |
| ISBN | text | ISBN-13 preferred | | ⚠️ store unhyphenated, format for display |
| EditionStatement | text | As printed: "2nd ed.", "rev. and expanded" | | ⚠️ transcribe, do not normalize |
| PublicationYear | number | Year of THIS edition, not of the work | | 🔴 see grain trap |
| PageCount | number | Pages in the published object | | |
| CallNumber | text | LC or Dewey, if the copy carries one | | ⚠️ library discards often do |
| Notes | text | Bibliographic oddities | | |

Audit fields → [data-standards.md](../data-standards.md).

## 🚩 Author does NOT live here

Authors, editors, translators and illustrators are [DocumentPeople](./DocumentPeople.md) rows — a
contribution is a person **plus a role**, and one work has many.

## 🔴 Grain trap: `PublicationYear` belongs to the EDITION

A 1985 book owned in a 2003 printing has `PublicationYear = 2003` here and may have
`DocumentYear = 1985` on `Documents`. **Different facts, both right.**

<!-- AGENT NOTE · why fkPublisher is a key, and where the grain trap leads.
Publisher as plain text forks: "Yale UP" / "Yale University Press" / "Yale Univ. Press". Then
"everything I own from Yale" is quietly incomplete and nothing reports it. And a publisher is an
organization playing a role — the same row can be a VENDOR on a Purchases line, simultaneously.
This field was originally specified as TEXT and corrected the same day. If it appears as text on any
other surface, that surface is stale.
The PublicationYear split is the FRBR work/manifestation distinction arriving in a single field. When
date roles eventually split (publication vs document creation vs revision), this is where it starts.
-->

## Open

- ⚠️ **1:1 is a convention here, not a constraint FileMaker enforces.** Either the creation script
  checks for an existing row, or a duplicate is possible and nothing complains. **Pick one before the
  first record exists.**
- Whether a second edition is a new `Documents` row or a second row here. **Real cataloguing says new
  manifestation, new record.** Not ruled; it decides how a replaced textbook edition files.

FK map → [relationships/README.md](../relationships/README.md)
