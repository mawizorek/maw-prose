# Relationships

*The relationship graph. Verified 2026-07-31. The edge list below is the only edge list — the machine mirror it used to defer to retired with `schema/`.*

## The loan-first spine

The defining decision of this app: **loans are the financial parent, not properties.** The user navigates by property and the schema parents everything financial on `Loans`, and those two facts are allowed to disagree because the property hub's `Loans` portal reconciles them.

| Child | Field | Parent | Cardinality | Status |
|---|---|---|---|---|
| `Loans` | `fkProperty` | `PropertySUMMARIES` | many-to-one | locked |
| `ExpectedTransactions` | `fkLoan` | `Loans` | many-to-one | locked |
| `AccountTransactions` | `fkLoan` | `Loans` | many-to-one | locked |
| `AccountTransactions` | `fkReceivedFunds` | `ReceivedFunds` | many-to-one | golden |
| `PaymentApplications` | `fkExpectedTransaction` | `ExpectedTransactions` | many-to-one | locked |
| `PaymentApplications` | `fkAccountTransaction` | `AccountTransactions` | many-to-one | locked |
| `Payoffs` | `fkLoan` | `Loans` | many-to-one | locked |
| `ExpectedTransactions` | `fkStandardTransaction` | `Standard_Transactions` | many-to-one | locked |
| `AccountTransactions` | `fkStandardTransaction` | `Standard_Transactions` | many-to-one | locked |
| `Loans` | `fkBorrower` | `Organizations` | many-to-one | pending |
| `PropertySUMMARIES` | `fkBorrower` | `Organizations` | many-to-one | under review |
| `ReceivedFunds` | `fkBorrower` | `Organizations` | many-to-one, nullable | golden |
| `Loans` | `fkCurrentPayoff` | `Payoffs` | many-to-one | pending |
| `PropertySUMMARIES` | `fkDocuments` | `Documents` | many-to-one | under review |

`fkProperty` was removed from both ledgers once `fkLoan` was established, which is the June re-parenting. `AccountTransactions` still carries it in at least one recorded field list — see that table's note.

## The one edge that carries the rollback

**`ReceivedFunds.PrimaryKey` ← `AccountTransactions.fkReceivedFunds`.** Every write in a rollback-protected block flows through it, because FileMaker 19 atomicity requires one relationship from one parent record. Break this edge and the `txn_*` wrapper silently protects half a multi-loan write.

There is deliberately no edge from `ReceivedFunds` to `Loans`. One receipt can touch several loans, so the loan is reached through the applications; a direct `fkLoan` would recreate the bug `ReceivedFunds` was added to fix.

## Named relationships the scripts require

The waterfall needs three that do not appear in the table above because they are table occurrences rather than new keys: `PaymentApplications_forAccountTransaction`, `PaymentApplications_forExpected`, and `Standard_Transactions_forExpected`.

## Under review

Party links wait on the Organizations-versus-Borrowers scope decision. `PropertySUMMARIES` carries three foreign keys — `fkDocuments`, `fkBalloonNote`, `fkPropertyStatus` — whose ownership predates the loan re-homing and has not been re-examined since. `fkDocuments` in particular is a scalar key where a one-to-many probably belongs.

## A linter, if one is ever built

The checks worth having: both endpoints resolve to a real table and field, the parent field is a `PrimaryKey`, cardinality and status are valid values, and no edge names a table that does not exist.
