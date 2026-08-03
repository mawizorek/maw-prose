# ExpectedTransactions

Manage → Database → Tables → ExpectedTransactions

Grain: one thing the borrower owes, on a date. A promise, not a payment.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkLoan | text-uuid | Authoritative parent loan | → Loans | |
| fkStandardTransaction | text-uuid | What kind of thing is owed | → Standard_Transactions | |
| fkStatus | text-uuid | Outstanding / Paid / Partially Paid / Waived | | ⚠️ confirm resolves to real status record |
| DueDate | date | Anchored to the origination day-of-month | | |
| OriginalAmount | number | Canonical expected amount; for late fees, the calculated 5% | | |
| AmountAdjusted | number | What to actually collect; supports waiver and discount | | |
| AdjustmentReason | text | Why the amount was adjusted (optional) | | |
| AdjustmentStatus | text | Normal / Discounted / Waived | | |
| SequenceNumber | number | 1..n per loan; enforces uniqueness | | |
| GraceDaysOverride | number | Row-level override, else falls back to Loans.GraceDays | | |
| Notes | text | Free-form notes | | |
| [calc_amountPaid](../calculations/ExpectedTransactions__calc_amountPaid.fmcalc) | (c→Number) | Sum of applied payments against this item; unstored | | |
| [calc_remaining](../calculations/ExpectedTransactions__calc_remaining.fmcalc) | (c→Number) | OriginalAmount minus applied; unstored | | |
| [calc_lateAfterDate](../calculations/ExpectedTransactions__calc_lateAfterDate.fmcalc) | (c→Date) | DueDate plus grace days; unstored | | |
| [calc_islate](../calculations/ExpectedTransactions__calc_islate.fmcalc) | (c→Number) | Boolean: today > lateAfterDate; unstored | | |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

Full relationship context → [graph.md](../relationships/README.md)
