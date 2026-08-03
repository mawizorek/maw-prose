# AccountTransactions

Manage → Database → Tables → AccountTransactions

Grain: one line on a borrower-facing statement. A projection for output, not a cash ledger.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkLoan | text-uuid | Authoritative parent loan | → Loans | ⚠️ replacing fkProperty (transition in progress) |
| fkStandardTransaction | text-uuid | Transaction type | → Standard_Transactions | |
| fkReceivedFunds | text-uuid | Source receipt for rollback-protected writes | → ReceivedFunds | ⚠️ add when ReceivedFunds is built |
| fkSourceDocument | text-uuid | Proof document link | → Documents | ⚠️ pending: keep separate from ExternalRef |
| fkStatus | text-uuid | Transaction status | | ⚠️ auto-enter calc; should resolve to status record |
| Date | date | Transaction date (indexed) | | |
| Amount | number | Dollar amount | | |
| Description | text | Line description (indexed) | | |
| TransactionKind | text | Expected / Actual / Adjustment | | ⚠️ may overlap with Standard_Transactions |
| ReceivedMethod | text | Check / Wire / ACH / Venmo / Cash | | |
| ExternalRef | text | Check number or wire reference (not a document link) | | |
| ClearedDate | date | Bank reconciliation date (optional) | | |
| Notes | text | Free-form notes | | |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

Full relationship context → [graph.md](../relationships/README.md)
