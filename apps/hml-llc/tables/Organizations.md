# Organizations

Manage → Database → Tables → Organizations

Grain: one company or entity. Parked, out of v1 scope.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| *(full field set unenumerated)* | | *Table is undesigned; listing plausible fields would imply design that doesn't exist* | | ⚠️ scope decision needed: Borrowers only or all transacting entities? |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | ⚠️ not yet confirmed on this table |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

⚠️ Rename from `CRM` before any ExecuteSQL references it.

Full relationship context → [graph.md](../relationships/README.md)
