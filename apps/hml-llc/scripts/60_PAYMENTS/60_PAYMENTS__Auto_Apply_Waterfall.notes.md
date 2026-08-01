# 60_PAYMENTS__Auto_Apply_Waterfall

*⛔ SUPERSEDED. Read the body; do not type it into FileMaker yet. Verified 2026-07-31.*

Copy text: [`60_PAYMENTS__Auto_Apply_Waterfall.fmscript`](60_PAYMENTS__Auto_Apply_Waterfall.fmscript)

## Two defects, and the second is the dangerous one

**It keys off `fkProperty`.** `Loans` won that argument in June; the servicing parent is `fkLoan`. Known since the 2026-06-18 audit and the least of the problems here.

**It commits twice per applied row, inside the loop.** This was not previously known and it is worse than the rename.

FileMaker 19 has no native transactions, so atomicity depends on every write staying uncommitted until one deliberate commit at the end. Each `Commit Records` in that loop ends the transaction and makes the preceding rows permanent. A failure on application three of five leaves two applications committed, the money half-applied, **and the routine still reporting `ok:true`.**

That is not a crash. That is a ledger that looks fine and is wrong.

Both commit steps have to go when this is rewritten, and the whole routine wrapped once in the `txn_*` trio with **`ReceivedFunds` as the single parent** — not `Loans`, because one check across two loans has two `Loans` parents and only one receipt.

## Rewrite checklist

- `fkProperty` to `fkLoan` throughout, in params and find criteria
- delete both mid-loop `Commit Records` steps
- wrap in the `txn_*` trio, parent = `ReceivedFunds`
- param becomes `{ receivedFundsID, loanID }` — a receipt can span loans, so the caller loops loans rather than properties
- re-test against `RCPT-001`, the two-loan check

**The commit steps stay in the body verbatim rather than being pre-deleted**, so the body remains a faithful record of what exists rather than a half-rewrite nobody can trust.

## Design worth keeping

The three-pass structure is correct and should survive. Ranking comes from the related `Standard_Transactions::Name` rather than a hardcoded list on the row, so renaming a display label cannot silently reorder the money. That is the right dependency direction.

Waiver handling is also correct: a waived row collapses the base to zero rather than being deleted, so an assessed-then-waived fee stays visible at its original amount. That is what makes fixture row `EXP-004` expressible at all.

And the remainder is deliberately left unapplied on the posted row instead of being forced somewhere. **Unapplied cash is a fact, not an error.**

## Relationships this needs wired

`PaymentApplications_forAccountTransaction` (AT one-to-many PA via `fkAccountTransaction`), `PaymentApplications_forExpected` (ET one-to-many PA via `fkExpectedTransaction`), and `Standard_Transactions_forExpected` (ET `fkStandardTransaction` to ST `PrimaryKey`).

## Fixture expectation

`RCPT-002` / `ACCT-003`: $400 against `EXP-002`, which owes $850, leaves it **partially paid with 450.00 remaining**, not paid. `EXP-004`: the waived $42.50 collects **0.00** and stays visible at $42.50. Net across the month: **850.00 unapplied**, traceable to `RCPT-004` alone.

## History

Flagged property-centered by the 2026-06-18 script-contract audit. Ported to a real body 2026-07-29, and the commit-boundary defect was found during that port.
