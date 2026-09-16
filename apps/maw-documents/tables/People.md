# People

Manage → Database → Tables → People

Grain: **one human, once.** Authors, editors, translators, illustrators, and the people who
borrow your books. One row per person regardless of how many roles they play.

⭐ **This is an AUTHORITY record, and that is the entire justification for the table.**
Libraries run name authority control (LCNAF, VIAF) so that *Penny, Louise* and *Louise
Penny* resolve to one row with variant forms. Without it, "everything I own by X" is
quietly incomplete and nothing reports the gap.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| SortName | text | Authority form, inverted: "Uva, Michael" | | 🔴 the authority-control field. Indexed, sorted on |
| DisplayName | text | How the name reads in running text: "Michael Uva" | | |
| VariantNames | text | Other forms seen in the wild, one per line | | ⚠️ a searchable text blob, deliberately not a child table — see below |
| PersonType | text | Contributor / Contact / Both | | ⚠️ descriptive, NOT the role. See below |
| Notes | text | Disambiguation: which of two same-named people this is | | |
| calc_ContributionCount | (c→Number) | How many works this person contributed to | → DocumentPeople | |

Audit fields on every table → [data-standards.md](../data-standards.md).

## 🚩 `PersonType` is descriptive, not the role

Same trap as `Organizations.fkOrganizationType`, and it is written here because this is the
second table where it would look reasonable.

**A person is not "an author."** They authored one work and may have edited another and may
also be the colleague who borrowed your rigging guide. The role lives on
[DocumentPeople](./DocumentPeople.md) or is implied by [CopyLoans](./CopyLoans.md).
`PersonType` exists only to keep a value list browsable.

🔴 **If anyone proposes splitting this into `Authors` and `Borrowers`, that is the same
error one level up.** A person in two roles would need two rows.

## 🚩 The name that caused a wrong schema

The graph this build started from had `PEOPLE_ROLES`, which reads as *roles a person has*.
That reading invited a `PEOPLE_JOINS` person+role pair table, which forced every contributor
read to be two hops, and left per-work attributes (billing order, "translator of the 2nd
edition") with nowhere to live except back on the near join.

**The name manufactured the structure.** It is now
[ContributorRoles](./ContributorRoles.md), and the second join stopped looking necessary the
moment it was renamed. A name is a contract.

⚠️ The live graph also spells the table `POEPLE`. Fix before any `ExecuteSQL` references it.

## 🔒 What this table is NOT

**Not URITP People.** That was ruled its own FileMaker app on 2026-08-07 — *a table with two
owners has no owner*; People is an entity, contact sheets and calendars are outputs.

This table is **bibliographic and personal-loan scope only**. It does not mirror URITP
People, does not sync with it, and must never try. If a name has to exist in both, it exists
twice, by design.

## ⚠️ Deliberate divergence from `apps/hml-llc/`

HML has **separate `Organizations` and `Contacts` tables**. This app has one `People`
authority plus one [Organizations](./Organizations.md) authority, and no `Contacts`.

The divergence is intentional: HML's two tables are both **parked and undesigned** (their
own pages say so and refuse to list fields), so there is no built pattern being contradicted.
And every real ILS keeps its patron file separate from its name-authority file — correct for
an institution, **wrong here**, because the colleague who borrows a book may be a contributor
on something else, and two people tables fork one human into two rows.

🔴 **If HML's `Contacts` is ever designed for real, revisit this** — not to merge, but to
confirm the divergence is still deliberate rather than two vocabularies for one entity.

## Open

- **`VariantNames` as a text blob is a compromise, marked as one.** Real authority control
  uses a child table of name forms. A newline-delimited field is searchable and cheap and
  cannot carry per-variant metadata (source, script, date). 🩹 **This is a workaround, and it
  is marked so it does not port into the build as design.**
- No disambiguation rule for two people with identical `SortName`. Libraries append dates
  (*Smith, John, 1945–*). Not ruled; `Notes` carries it manually until it is.

Full relationship context → [README.md](../relationships/README.md)
