# ReceivedFunds

*The receipt parent. 🥇 GOLDEN — approved 2026-07-29, not yet built. Verified 2026-07-31.*

**Grain: one real-world cash event.** The check, the wire, the Venmo — what the *bank* saw. Not a ledger line and not an application. This is the tenth table and it is the transaction parent for every multi-record write in the file.

## Why it exists

It was approved after the locked nine-table schema and the locked script build order were read against each other for the first time and disagreed about how many tables the app has. Four script pages already assumed it; one of them states outright that it *"does not skip the parent receipt layer."* It was never a new idea, it was an unwritten one.

Three reasons, in ascending order of teeth.

**One check, two loans.** A borrower with two properties writes a single check. Without a receipt record there is nothing holding the amount the bank actually saw, so you either split it into rows that no longer reconcile to the deposit, or you pick one loan and lie.

**Money arrives before you know what it is.** A check with an illegible memo has no legal home when the loan is the authoritative parent. Here, unapplied cash is a valid resting state rather than a data error.

**It is the atomicity design.** FileMaker 19 has no native transactions — `Open`, `Commit` and `Revert Transaction` arrived in FileMaker 2023. Rollback on 19 requires every write in a transaction to flow through one relationship from one parent record, so `Revert Record` on that parent discards the whole set. This record is that parent. Without it the only candidate is `Loans`, so a check across two loans has two parents and rollback reverts half of it. **Build this table before the `txn_*` wrapper or you ship a silent partial rollback, which is worse than none** — it produces corruption you believe was prevented.

## Fields (none built yet)

| Field | Type | Key | Category | Notes |
|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | auto-enter Get(UUID), prohibit modification |
| ReceivedDate | date | plain | detail | the date on the deposit, not the date typed |
| Amount | number | plain | detail | the full amount the bank saw. Never split |
| ReceivedMethod | text | plain | detail | Check / Wire / ACH / Venmo / Cash |
| ExternalRef | text | plain | detail | check number, wire reference. Not a document link |
| fkBorrower | text-uuid | fk | key | nullable — an unknown payer is legal |
| ReconciliationStatus | text | plain | detail | Unassigned / Partially Applied / Applied / Voided |
| Notes | text | plain | detail | "memo illegible" belongs here |
| fkSourceDocument | text-uuid | fk | key | optional proof link; inert until Documents returns |
| calc_AmountApplied | calc | calc | summary | sum of child AccountTransactions.Amount |
| calc_AmountUnapplied | calc | calc | summary | Amount minus applied. Keeps orphan cash on screen |
| audit quad | — | audit | audit | per house standard |

## The one rule that must never break

**`Amount` is what the bank saw and it is never edited to make the math work.** If the applications do not sum to it, the difference is unapplied cash, and that is a fact rather than an error to tidy away. `calc_AmountUnapplied` exists to keep that fact visible instead of letting it become a silent reconciliation gap.

## Relationships

`ReceivedFunds.PrimaryKey` ← `AccountTransactions.fkReceivedFunds`, one-to-many. **This is the transaction relationship** — every write in a rollback-protected block flows through it.

`fkBorrower` points at `Organizations`, many-to-one and nullable.

There is deliberately **no link to `Loans`**. The loan is reached through the applications, because one receipt can touch several. An `fkLoan` here would recreate the exact bug this table was added to fix.

## Scripts that write here

`50_RECEIPTS__Create_ReceivedFunds_From_Document` and `60_PAYMENTS__Post_ReceivedFunds_Batch` are both superseded and need rewriting against this table. `60_PAYMENTS__Reverse_Posted_Payment` is golden — void one receipt and the applications cascade.

## Open

`Payment Received` in `Standard_Transactions` becomes a double-count risk the moment this table exists. That value was created specifically to paper over the absence of a receipt layer, and once the layer is real it is a redundant type somebody will pick by accident, putting the same cash in two places. Any rollup filtering on it will double-count silently. Retire it or write down why it survives.

Confirm the `ReceivedMethod` value list against how deposits actually arrive.

## Test

Fixture rows `RCPT-001` (one check, two loans) and `RCPT-004` ($850, memo illegible, no loan) in `../fixtures/golden-month/`. `RCPT-001` cannot be expressed without this table, which is what settled the question empirically rather than by argument.
