# CopyLoans

Manage → Database → Tables → CopyLoans

Grain: **one span of possession.** This copy, with this person, from this date to that date.
**Append-only** — the same copy lent three times is three rows, and all three stay.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkDocumentCopy | text-uuid | The object that changed hands | → DocumentCopies | 🔴 a copy, never a work |
| fkPerson | text-uuid | Who has it, or who you have it from | → People | |
| Direction | text | Out (you lent) / In (you borrowed) | | 🔴 makes one table cover both |
| LoanedDate | date | When it left, or arrived | | |
| DueDate | date | When it is expected back | | ⚠️ empty = indefinite, a real state |
| ReturnedDate | date | When it actually came back | | 🔴 EMPTY = the loan is open |
| Notes | text | Condition on handover, what it was for | | |
| calc_IsOpen | (c→Number) | 1 when ReturnedDate is empty | | 🔴 UNSTORED |
| calc_IsOverdue | (c→Number) | 1 when open and DueDate is past | | 🔴 UNSTORED — changes with the clock |

Audit fields → [data-standards.md](../data-standards.md).

## 🔴 Why `Direction` earns its place

One table answers both halves of the only question you actually care about: **what do I owe, and what
is owed to me.** Without it you get two mirror-image tables, or only the outbound half and the
borrowed library book has nowhere to live.

⭐ It also makes the catalogue honest: **a record of things you know about, with ownership as an
attribute rather than an admission criterion.**

<!-- AGENT NOTE · what LentTo got wrong, and the ILS pattern rejected.
DocumentCopies.LentTo was specified twice and struck the same day: a single field holding the current
borrower destroys the previous loan the moment the next one starts. No record it happened, no way to
answer "who has had this," and no way to notice that one person never returns anything. Same shape as
fkPeopleJoins on Documents and as any stored "is it out" flag — three instances of one habit: putting
a scalar where a history belongs.
Every ILS keeps the patron file separate from the name-authority file. Correct for an institution,
wrong here: the colleague who borrows your rigging guide may be a contributor on something else, and
two people tables fork one human. One People authority; the loan carries the role.
The catalogue framing matches how the interim ClickUp list is already used — it holds plenty of
documents Michael neither wrote nor bought.
-->

## Rules

1. **Never update a loan row to record a new loan.** Set `ReturnedDate`, insert a new row.
2. **At most one open row per copy per direction.** ⚠️ FileMaker will not enforce it; the script checks.
3. **Current state is always calculated.** 🚩 No stored "on loan" flag — it drifts the first time a
   return is recorded outside the script.
4. **An overdue loan is a report, not an error state.** Nothing here nags.

## 🚫 PII

Borrowers are real people and **this repo is PUBLIC.** Fixtures use initials, never a real name paired
with a real book and date.

## Open

- **Q7 · does a copy you possess but do NOT own belong in the library?** 🔴 `Direction = In` assumes yes.
  **If the answer is no, `Direction` collapses and this is an outbound-only table** — so Q7 blocks the
  build of this file, not just its scope.
- No renewal model. A renewal currently means moving `DueDate`, which loses the original. ⚠️ **That is
  the `LentTo` mistake in miniature** — named rather than left to be discovered.
- Nothing links a loan to a reminder or task. Deliberate for now.

FK map → [relationships/README.md](../relationships/README.md)
