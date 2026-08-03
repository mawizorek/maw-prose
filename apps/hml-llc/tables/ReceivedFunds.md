# ReceivedFunds

Manage → Database → Tables → ReceivedFunds

Grain: one real-world cash event. What the bank saw. Transaction parent for rollback-protected writes. Not yet built.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-enter Get(UUID), prohibit modification | | |
| ReceivedDate | date | Date on the deposit (not the date typed) | | |
| Amount | number | Full amount the bank saw. NEVER edited to make math work | | |
| ReceivedMethod | text | Check / Wire / ACH / Venmo / Cash | | ⚠️ confirm value list against real deposits |
| ExternalRef | text | Check number or wire reference (not a document link) | | |
| fkBorrower | text-uuid | Paying entity (nullable: unknown payer is legal) | → Organizations | |
| ReconciliationStatus | text | Unassigned / Partially Applied / Applied / Voided | | |
| Notes | text | Free-form ("memo illegible" belongs here) | | |
| fkSourceDocument | text-uuid | Optional proof link; inert until Documents returns | → Documents | |
| [calc_AmountApplied](../calculations/ReceivedFunds__calc_AmountApplied.fmcalc) | (c→Number) | Sum of child AccountTransactions.Amount; unstored | | |
| [calc_AmountUnapplied](../calculations/ReceivedFunds__calc_AmountUnapplied.fmcalc) | (c→Number) | Amount minus applied; keeps orphan cash visible; unstored | | |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

⚠️ No fkLoan on purpose. Loan is reached through applications (one receipt can touch several loans).

Full relationship context → [graph.md](../relationships/README.md)
