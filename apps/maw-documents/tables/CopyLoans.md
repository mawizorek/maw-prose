# CopyLoans

Manage → Database → Tables → CopyLoans

Grain: **one span of possession.** This copy, with this person, from this date to that date.
Append-only: the same copy lent three times is three rows, and all three stay.

⭐ **This table replaced a single `LentTo` field, and the reason generalizes:** a relationship
that carries a value AND a clock is a join row with a lifecycle, never a flag.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkDocumentCopy | text-uuid | The object that changed hands | → DocumentCopies | 🔴 a copy, never a work |
| fkPerson | text-uuid | Who has it, or who you have it from | → People | ⭐ the pointer plus Direction IS the role |
| Direction | text | Out (you lent it) / In (you borrowed it) | | 🔴 the field that makes one table cover both. See below |
| LoanedDate | date | When it left, or arrived | | |
| DueDate | date | When it is expected back | | ⚠️ empty = indefinite, which is a real and common state |
| ReturnedDate | date | When it actually came back | | 🔴 EMPTY means the loan is open. This is the state field |
| Notes | text | Condition on handover, what it was borrowed for | | |
| calc_IsOpen | (c→Number) | 1 when ReturnedDate is empty | | 🔴 UNSTORED. Never a stored flag |
| calc_IsOverdue | (c→Number) | 1 when open and DueDate is past | | 🔴 UNSTORED, and it must be — it changes with the clock, not with a write |

Audit fields on every table → [data-standards.md](../data-standards.md).

## 🔴 What `LentTo` got wrong

`DocumentCopies.LentTo` was specified twice and struck the same day. It was a single field
holding the current borrower, which means **the previous loan is destroyed the moment the next
one starts.** No record that it happened, no way to answer *who has had this*, and no way to
notice that one person never returns anything.

It is the same shape as two other things struck from this app: `fkPeopleJoins` on `Documents`
(a scalar standing in for a many-to-many) and any stored *is it out* flag. **Three instances of
one habit: putting a scalar where a history belongs.**

## 🔴 Why `Direction` earns its place

With it, one table answers both halves of the only question you actually care about:
**what do I owe, and what is owed to me.**

Without it you get two tables that do the same work in mirror image, or you get only the
outbound half and the borrowed library book has nowhere to live at all.

⭐ **And it changes what `Documents` means, honestly and for the better:** the catalogue becomes
a record of things you know about, with ownership as an attribute rather than an admission
criterion. That is closer to how the interim ClickUp list is already used — it holds plenty of
documents Michael neither wrote nor bought.

## ⚠️ Where this deliberately departs from real library practice

Every ILS — Koha, Alma, Sierra — keeps the **patron file separate from the name-authority
file.** A patron has an address, a contact method, a fine balance, PII. A bibliographic agent
has a preferred name form and variants. Different systems entirely.

**Correct for an institution. Wrong here.** The colleague who borrows your rigging guide may be
a contributor on something else, and a personal library with two people tables forks one human
into two rows. **One [People](./People.md) authority; the loan carries the role.**

Recorded because the professional pattern points the other way and someone will eventually cite
it as evidence this is wrong.

## Business rules

1. **Never update a loan row to record a new loan.** Set `ReturnedDate` on the old one, insert
   a new row. Append-only is the whole point.
2. **At most one open row per copy per direction.** ⚠️ FileMaker will not enforce this; the
   lending script checks for an existing open row first.
3. **Current state is always calculated.** `DocumentCopies.calc_IsOnLoan` and
   `calc_CurrentHolder` read this table. 🚩 No stored *on loan* flag anywhere — it will drift the
   first time a return is recorded outside the script.
4. **An overdue loan is not an error state.** It is a report. Nothing in this app nags.

## 🚫 PII

Borrowers are real people. **This repo is PUBLIC** — fixture and example data uses initials or
placeholders, never a real name paired with a real book and date.

## Open

- **Q7 · does a copy you possess but do NOT own belong in the library at all?** 🔴 This table's
  `Direction = In` assumes yes. **If the answer is no, `Direction` collapses and this becomes an
  outbound-only table** — so Q7 blocks the build of this file, not just its scope.
- No renewal model. A renewal is currently *move `DueDate`*, which loses the original. ⚠️ Fine
  for a personal library; **it is the `LentTo` mistake in miniature**, so it is named rather
  than left to be discovered.
- Nothing links a loan to a reminder or a task. Deliberate for now.

Full relationship context → [README.md](../relationships/README.md)
