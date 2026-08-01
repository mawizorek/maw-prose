# Tables

*Mirrors Manage Database → Tables. One note per table, each carrying its own field register. Content verified 2026-07-31 against the migration source; field data reconciled from the retired `schema/tables.json`.*

Every note opens with its **grain** — what one record means — because grain is the fact everything else depends on and the one most often left implicit. A July 2026 audit of this app found that every schema contradiction in it was a grain disagreement: whether one row was a payment or an application of a payment, whether a property was a deal or a piece of collateral. The notes are ordered here the way the money moves rather than alphabetically.

State stamps are 🥇 golden (target), 🔨 built (verified in the file, dated) and ⛔ superseded. An unstamped note is a defect.

## The stack

| Table | One record means | Role | State |
|---|---|---|---|
| [GLOBAL_USE_VARIABLES](GLOBAL_USE_VARIABLES.md) | one record, ever — app state and current selection | singleton | 🔨 |
| [PropertySUMMARIES](PropertySUMMARIES.md) | one piece of real collateral. Not a deal, not a loan | collateral | 🔨 |
| [Loans](Loans.md) | one note with its own terms — the financial parent | servicing-parent | 🔨 |
| [ExpectedTransactions](ExpectedTransactions.md) | one thing the borrower owes, on a date. A promise | ledger | 🔨 |
| [ReceivedFunds](ReceivedFunds.md) | one real-world cash event — what the bank saw. Never split | receipt-parent | 🥇 |
| [AccountTransactions](AccountTransactions.md) | one line on a borrower-facing statement. A projection | ledger | 🔨 |
| [PaymentApplications](PaymentApplications.md) | one act of assigning $X of a receipt to one owed item | join | 🔨 |
| [Payoffs](Payoffs.md) | one quote that was sent to a human. Frozen | snapshot | 🔨 |
| [PaymentInstructions](PaymentInstructions.md) | one reusable "how to pay us" block. Row-based, never a global | source | 🥇 |
| [Standard_Transactions](Standard_Transactions.md) | one kind of money movement. Taxonomy, not a value list | taxonomy | 🔨 |
| [Documents](Documents.md) | one logical document | document | 🥇 out of v1 |
| [Organizations](Organizations.md) | one company or entity | party | 🥇 out of v1 |
| [Contacts](Contacts.md) | one person | party | 🥇 out of v1 |

`ReceivedFunds` is the tenth table, approved 2026-07-29. It closed a six-week disagreement between the locked schema, which said nine, and the locked script build order, which required ten — and it is also the single-parent record the FileMaker 19 rollback pattern needs, which is why it has to exist before the `txn_*` wrapper does.

## What is missing and known to be missing

`PropertyExpectations` exists in the live file carrying roughly fourteen calculation fields and is not in this stack. It was probably absorbed into the `Loans` calcs when loan terms were re-homed, but nobody has confirmed that. Do not delete it and do not build against it until someone opens the file and checks.

The property identity and operating fields on `PropertySUMMARIES` have never been enumerated. The note says so in place of guessing.

## Two things the migration found

This package replaced a machine registry (`schema/tables.json`) that ran alongside these notes. Reading the two against each other turned up defects that neither surfaced alone, and they are recorded here rather than quietly fixed.

`ReceivedFunds` was **absent from the JSON entirely** — registered in the folder index and carrying its own note, but never added to the file that claimed to be the schema source. A registry missing the newest table is worse than no registry.

`AccountTransactions` **disagreed with itself across the two files**, and neither copy was marked stale. Both versions survive in that note, with the conflict stated. The live file is the tiebreaker and nobody has opened it.
