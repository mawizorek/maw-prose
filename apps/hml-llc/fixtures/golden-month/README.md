# The golden month

*One worked month of one borrower's activity, as importable TSV. March 2026. Import it and the relationship graph populates with real joins. Content verified 2026-07-31.*

This is the schema review fixture for `hml-llc`. Every identifier in it is invented.

## Why one month beats nine table samples

Nine isolated sample files prove nothing — any nine files look plausible alone. These files share the same primary keys, so they can only join if the keys, the grain and the parentage are all correct. Referential consistency is the proof. Get the schema wrong and the fixture refuses to reconcile, which makes the data a test of the schema rather than an illustration of it.

It is also deliberately ugly, and that is the deliverable. A tidy month — one loan, one on-time payment — imports cleanly under any schema, which is a test that cannot fail. Every row here was chosen because it kills something, so the hub screen will look like a mess when it renders. If it renders pretty, it is not doing its job.

## Read this before importing or you will silently destroy it

`PrimaryKey` is auto-enter `Get(UUID)` with *prohibit modification during data entry* on every table. Import as-is and FileMaker throws these keys away and mints its own, destroying every foreign key in every other file. It fails quietly: all rows import, no errors, and the portals come up empty.

Temporarily uncheck that option for the seeding pass and keep the readable keys. `LOAN-001` appearing in six files is the feature — you can verify a join with your eyes on a phone, which is the entire point of a review fixture.

Import in FK-parent order: `PropertySUMMARIES`, `Standard_Transactions`, `PaymentInstructions`, `Loans`, `ExpectedTransactions`, `ReceivedFunds`, `AccountTransactions`, `PaymentApplications`, `Payoffs`. Use *matching by field name*. TSV rather than CSV, because addresses and notes contain commas and FileMaker's CSV quoting is a bad time.

## What each row proves

| Row | What it kills |
|---|---|
| `RCPT-001` | One check, two loans. $1,966.67 covering interest on `LOAN-001` and `LOAN-003`. Cannot be expressed without `ReceivedFunds` — this row settled DL Q8 empirically instead of by argument. |
| `RCPT-004` | Cash with no home. $850, memo illegible, no borrower. Under a loan-parented model this row is illegal. It has to be a valid resting state, not a data error. |
| `APP-003` | Partial payment. $400 against $850 owed. Proves `AmountApplied` must be independent and that `ExpectedTransactions` needs a computed remainder, not a paid/unpaid flag. |
| `EXP-004` | Late fee assessed then waived. $42.50 to $0.00 on purpose. If the schema cannot say *the fee was $42.50, we collected nothing, deliberately*, then `OriginalAmount`/`AdjustedAmount` is the wrong field pair. |
| `PAYOFF-001` vs `ACCT-004` | The freeze. Payoff issued 03-18, payment posts 03-20, frozen total must not move. The only way to prove the freeze is real rather than described. |
| `PROP-001` with 2 loans | Kills "one property, one loan," which several script pages still assume. |
| `LOAN-003` paid off | A closed loan still carrying history. Proves status is not a filter that hides truth. |

## The acceptance test

| Check | Must equal |
|---|---|
| Sum of `ReceivedFunds.Amount` | 43,216.67 |
| Sum of `PaymentApplications.AmountApplied` | 42,366.67 |
| Unapplied cash across all receipts | 850.00, traceable to `RCPT-004` alone |
| `PAYOFF-001.frozen_TotalDue` after `ACCT-004` posts | 40,466.67, unchanged |
| `EXP-002` remaining | 450.00 |
| `EXP-004` collected | 0.00, status `Waived`, with the $42.50 still visible |
| `EXP-006` | still outstanding — April has not happened |

If unapplied cash does not come out to exactly $850.00 and trace to a single receipt, the schema is wrong. Not the fixture.

## The cast, all invented

One borrower, `ORG-001`, who owns both properties — realistic for private lending and what makes the two-loan check possible. Two properties, `PROP-001` (1420 Elm St) and `PROP-002` (88 Ridge Rd), on invented streets. Three loans: `LOAN-001` and `LOAN-003` both against Elm St, `LOAN-002` against Ridge Rd, and `LOAN-003` pays off mid-month. Four receipts: a two-loan check, a short Venmo, a payoff wire, and one mystery check.

## Why this folder is here and not in the public repo

It lived in `mawizorek/ClickUp_apps` until 2026-07-31 and leaked a real name twice in three days.

The first, on 07-29, was a payee name and a Venmo handle in `PaymentInstructions.tsv`, copied out of a ClickUp doc while the fixture was being built. Scrubbed the same day, and the no-real-identifiers rule was written into the file as a result.

The second was found on 07-31, during the migration, in `Payoffs.tsv` → `frozen_PaymentInstructionSnapshot`. **The same name, surviving two days after its source was cleaned, because a frozen snapshot exists precisely so that later edits to the source do not propagate.** The schema feature the fixture was demonstrating is the feature that defeated the remediation — `PAYOFF-001` is the row whose job is proving the freeze is real, and it worked.

Two lessons came out of that and both generalize past this folder. **Remediating a value means sweeping every table that snapshots it, not just the table that owns it** — grep the value, never the field. And **a checklist made only of source fields will pass a copy**: the old rule list named payees, borrowers, addresses, accounts and handles, every one of them a source, so a reader auditing their own work against it would have found nothing wrong.

Moving the folder prevents the next leak. It does not undo these two — the original values remain in `ClickUp_apps` git history and always will unless that history is rewritten.
