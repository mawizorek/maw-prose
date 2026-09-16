# People

Manage → Database → Tables → People

Grain: **one human, once.** Authors, editors, translators, illustrators, and the people who borrow
your books. One row regardless of how many roles they play.

⭐ **An AUTHORITY record** — the same job libraries do with LCNAF/VIAF, so *Penny, Louise* and
*Louise Penny* resolve to one row. Without it, "everything I own by X" is quietly incomplete.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| SortName | text | Authority form, inverted: "Uva, Michael" | | 🔴 indexed, sorted on |
| DisplayName | text | Running-text form: "Michael Uva" | | |
| VariantNames | text | Other forms seen, one per line | | 🩹 a workaround — see below |
| PersonType | text | Contributor / Contact / Both | | ⚠️ descriptive, NOT the role |
| Notes | text | Which of two same-named people this is | | |
| calc_ContributionCount | (c→Number) | Works contributed to | → DocumentPeople | |

Audit fields → [data-standards.md](../data-standards.md).

## 🚩 `PersonType` is descriptive, not the role

**A person is not "an author."** They authored one work, may have edited another, and may be the
colleague who borrowed your rigging guide. Role lives on
[DocumentPeople](./DocumentPeople.md) or is implied by [CopyLoans](./CopyLoans.md).

🔴 **Splitting this into `Authors` and `Borrowers` is the same error one level up.**

<!-- AGENT NOTE · the name that caused a wrong schema, and the ILS pattern rejected.
The original graph had PEOPLE_ROLES — "roles a person has" — which invited a PEOPLE_JOINS pair
table and a two-hop contributor read. Renaming it ContributorRoles made the extra join look
unnecessary on sight. The live graph also spells this table POEPLE; fix before any ExecuteSQL.
Every real ILS (Koha, Alma, Sierra) keeps the PATRON file separate from the NAME-AUTHORITY file —
patrons have addresses, fines, PII; agents have preferred name forms. Correct for an institution,
wrong here: two people tables fork one human. Recorded because the professional pattern points the
other way and someone will cite it as evidence this is wrong.
-->

## 🔒 Not URITP People

That is its own FileMaker app (ruled 2026-08-07 — *a table with two owners has no owner*). This
table is **bibliographic and personal-loan scope only.** It does not mirror or sync with that app.
If a name must exist in both, it exists twice, by design.

## ⚠️ Divergence from `apps/hml-llc/`

HML has separate `Organizations` and `Contacts`. This app has one `People` authority and no
`Contacts`. **Deliberate:** HML's two are both parked and undesigned, so no built pattern is being
contradicted.

🔴 **If HML's `Contacts` is ever designed for real, revisit** — not to merge, but to confirm the
divergence is still deliberate rather than two vocabularies for one entity.

## Open

- 🩹 **`VariantNames` as a text blob is a workaround, marked as one.** Real authority control uses a
  child table of name forms; a newline-delimited field is cheap and searchable and **cannot carry
  per-variant metadata** (source, script, date).
- No disambiguation rule for identical `SortName`. Libraries append dates (*Smith, John, 1945–*).
  `Notes` carries it manually until ruled.

FK map → [relationships/README.md](../relationships/README.md)
