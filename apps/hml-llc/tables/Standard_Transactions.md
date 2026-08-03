# Standard_Transactions

Manage → Database → Tables → Standard_Transactions

Grain: one kind of money movement. Taxonomy table (carries behaviour, not just a label).

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| Name | text | Locked values: Payment Received, Interest Payment, Principal, Origination Points, Maturation Fee, Late Fee (indexed) | | ⚠️ "Payment Received" redundant once ReceivedFunds exists |
| DisplayName | text | Human-readable display (auto-enter calc) | | |
| value_Category | text | Taxonomy category | | |
| value_CashDirection | text | in / out | | |
| value_AppliedToLayer | text | expected / actual | | |
| sort_order | number | Numeric display sequence | | |
| is_active | number | 1 = active and available for selection | | |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

⚠️ Table name carries underscore (predates PascalCase lock). Settle before any ExecuteSQL references it.

Full relationship context → [graph.md](../relationships/README.md)
