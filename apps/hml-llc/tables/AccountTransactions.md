# AccountTransactions

*Borrower-facing ledger rows. 🔨 BUILT · verified in file 2026-07-14. Field register reconciled 2026-07-31 — see the conflict below.*

**Grain: one line on a borrower-facing statement.** A projection for output, not a cash ledger. That distinction is the whole reason `ReceivedFunds` had to be added: this table describes what the borrower should see, and something else has to describe what the bank saw.

It is deliberately lean. Rows seed from `ExpectedTransactions` and from received-payment activity, then stay editable so a payoff statement can read cleanly. Treating it as a catch-all internal ledger is the failure mode, and it is what the app did for six weeks.

## 🔴 The two field lists disagree, and neither was marked stale

This table was documented in two places that drifted apart. Both are preserved because there is no basis in the documentation for picking one — **the live file is the tiebreaker and nobody has opened it.**

The note's list had `fkProperty` as a transition-state parent, plus `is_active`, `RunningTotal` and `Summary_TotalAmount`. The machine registry had `fkLoan` as the authoritative parent plus `fkSourceDocument`, and no summary fields at all. They agree on the audit quad, `Date`, `Amount`, `Description`, `Notes` and `fkStatus`.

The disagreement is not cosmetic: one says the parent is a property and one says it is a loan, which is the exact re-parenting this app has been mid-way through since June.

### Fields recorded as live (from the per-table note, 2026-07-14)

| Field | Type | Key | Category | Notes |
|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | |
| fkProperty | text-uuid | fk | key | transition state — the target contract is fkLoan |
| fkStatus | text-uuid | fk | key | auto-enter calc; should resolve to a status record |
| Date | date | plain | detail | indexed |
| Amount | number | plain | detail | |
| Description | text | plain | detail | indexed |
| Notes | text | plain | detail | |
| is_active | number | plain | detail | |
| CreatedBy | text | audit | audit | |
| CreationTimestamp | timestamp | audit | audit | |
| ModifiedBy | text | audit | audit | |
| ModificationTimestamp | timestamp | audit | audit | |
| RunningTotal | summary | plain | summary | |
| Summary_TotalAmount | summary | plain | summary | |

### Fields recorded in the machine registry (2026-07-16)

Same audit quad, `Date`, `Amount`, `Description`, `Notes` and `fkStatus` as above, plus `fkLoan` (authoritative parent, noted as replacing `fkProperty`), `fkStandardTransaction`, `fkSourceDocument` (pending — document linkage, kept separate from `ExternalRef`) and `ExternalRef` as a proper text field rather than a container. It carries no `is_active` and no summary fields.

### Fields the design says to add

`fkLoan` as the authoritative parent, `fkStandardTransaction` for type, `TransactionKind` (Expected / Actual / Adjustment), `ReceivedMethod`, `ExternalRef`, and an optional `ClearedDate` for reconciliation.

Once `ReceivedFunds` is built this table also needs `fkReceivedFunds`, which is the relationship every rollback-protected write flows through.

## Relationships

The target is `fkLoan` → `Loans`, with `fkProperty` retained only transitionally. `fkStandardTransaction` → `Standard_Transactions` is locked. Joined to the schedule through `PaymentApplications.fkAccountTransaction`.

## Open

Re-parent from `fkProperty` to `fkLoan` and resolve which of the two field lists above is true. Keep document linkage separate from `ExternalRef` text — one is a relationship and one is a string off a bank statement, and merging them loses both.

`TransactionKind` overlaps in meaning with `Standard_Transactions` and one of them is redundant. Unresolved.
