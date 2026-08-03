# PaymentApplications

Manage → Database → Tables → PaymentApplications

Grain: one act of assigning $X of a receipt to one owed item. Join facts only.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkExpectedTransaction | text-uuid | The owed item being satisfied | → ExpectedTransactions | |
| fkAccountTransaction | text-uuid | The ledger line providing the cash | → AccountTransactions | |
| AmountApplied | number | Dollar amount assigned in this application | | |
| AppliedTimestamp | timestamp | When this application was recorded | | |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

Full relationship context → [graph.md](../relationships/README.md)
