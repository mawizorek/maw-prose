# Payoffs

Manage → Database → Tables → Payoffs

Grain: one quote that was sent to a human. Frozen, never recomputed.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkLoan | text-uuid | Parent loan this payoff was computed against | → Loans | |
| IsCurrent | number | 1 = current version; versioning marker | | |
| IssueDate | date | Date payoff was sent to borrower | | |
| AsOfDate | date | Date the figure is computed against | | |
| PayoffDisplayDate | date | Statement display date (not a prepared timestamp) | | |
| GoodThroughDate | date | Validity endpoint; per-diem runs through this date | | |
| TotalPayoffAmount | number | FROZEN total payoff figure. Never recomputed after issue | | |
| FrozenPaymentInstructions | text | FROZEN snapshot of PaymentInstructions at issue time | | ⚠️ decide format: full text vs structured JSON |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

Full relationship context → [graph.md](../relationships/README.md)
