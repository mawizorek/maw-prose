# PropertySUMMARIES

Manage → Database → Tables → PropertySUMMARIES

Grain: one piece of real collateral. Not a deal, not a loan. Navigation hub (property-first), schema parent is Loans.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier for this property record | | |
| fkBorrower | text-uuid | Borrowing entity for this property | → Organizations | ⚠️ under review: property lens or loan servicing? |
| fkDocuments | text-uuid | Document linkage | → Documents | ⚠️ under review: scalar FK where one-to-many probably belongs |
| fkBalloonNote | text-uuid | Balloon note reference | | ⚠️ under review |
| fkPropertyStatus | text-uuid | Property operational status | | ⚠️ under review: should resolve to a real status record |
| *(property identity fields)* | | *Not enumerated from live file* | | ⚠️ must enumerate from FMP |
| [countNumDocuments](../calculations/PropertySUMMARIES__countNumDocuments.fmcalc) | (c→Number) | Count of related property documents; unstored ExecuteSQL | | ⚠️ may not exist in live file |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

Full relationship context → [graph.md](../relationships/README.md)
