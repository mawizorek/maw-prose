# Design decisions

*Constitution-level stance for the solution. Migrated from the ClickUp Design Constitution; this is canonical. Verified 2026-07-31.*

## Stance

Property-first UX over a loan-first schema. Single-user, local-file-first, one file unless a later constraint justifies a split.

## Documents and the binder

The binder is the document source of truth, and payoff history inside it is versioned and frozen.

One parent receipt or payment may allocate across several loans and properties. That single sentence is the reason the tenth table exists, and it was written down months before anybody noticed the schema could not express it.

## The integration boundary

One-way publish, FileMaker to ClickUp, button-driven. No two-way sync in v1 and no middleware before the manual version has proven what actually needs to move.

## Build priorities

Prove the core loan lifecycle end to end — property summary, loan, transactions, payoff — before touching reporting or multi-user. Keep theme and artifact work inside the shared object families rather than inventing per-app objects.

## The schema-lock rulings

From the June 2026 lock, and each one is a correction to something that had drifted.

`Loans` was created as the real servicing parent and the loan terms were re-homed off `PropertySUMMARIES`. `_PAYMENT_ASSIGNMENTS` was rebuilt as `PaymentApplications` with an actual join purpose rather than a vague association. `Payoffs` became a real table, with the numbers frozen. `_Payment_Instructions` was rebuilt as record-based, out of the fake-globals table it had been living in. The `Account Calculations` logic folded into the canonical tables and table-occurrence calcs, and the standalone table was retired. And `Standard_Transactions` was settled as a taxonomy rather than a glorified value list — which is the general rule that metadata beyond a display value means a table.
