# PaymentInstructions

*How to pay us. 🥇 GOLDEN — the record-based design is agreed, the table is under review. Verified 2026-07-31.*

**Grain: one reusable "how to pay us" block.** Row-based, never a global.

That last clause is the entire history of this table. Payment instructions used to live as globals on a fake global table, which meant there was exactly one of each and no way to have a mail block and a wire block and a Venmo block coexist. Making them records is what allows a payoff to reference the right one, and what allows a snapshot of it to be frozen onto the quote.

**Real payment instructions are records in this file. They do not belong in a fixture, a repo, or a chat message.** The sample rows in `../fixtures/golden-month/` use `LENDER NAME` and an invented handle, and that is a rule rather than a courtesy — the ClickUp source these were first copied from also holds a routing number and an account number two lines below what got pasted.

## Fields

| Field | Type | Key | Category | Status | Notes |
|---|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | | |
| CreationTimestamp | timestamp | audit | audit | | |
| CreatedBy | text | audit | audit | | |
| ModificationTimestamp | timestamp | audit | audit | | |
| ModifiedBy | text | audit | audit | | |
| InstructionLabel | text | plain | detail | | "Check by mail", "Wire" |
| PayeeText | text | plain | detail | | |
| DeliveryType | text | plain | detail | | mail / wire / ACH |
| DeliveryDetailText | text | plain | detail | | |
| SignatureReference | text | plain | detail | pending | container here, or a reference into the document module |
| SortOrder | number | plain | detail | | |
| IsActive | number | plain | detail | | |

## Relationships

None as an FK. `Payoffs.FrozenPaymentInstructions` takes a snapshot of the chosen row at issue and keeps it — the absence of a relationship is what makes the freeze real.

## Open

Confirm this table as the canonical record-based source; its status is still under review. Decide whether `SignatureReference` is a container on this table or a pointer into the document module, which is the same fork the whole document layer is waiting on.
