# PaymentInstructions

Manage → Database → Tables → PaymentInstructions

Grain: one reusable "how to pay us" block. Row-based, never a global.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| InstructionLabel | text | Display name ("Check by mail", "Wire", "Venmo") | | |
| PayeeText | text | Payee line for the instruction block | | |
| DeliveryType | text | mail / wire / ACH | | |
| DeliveryDetailText | text | Full delivery detail (address, routing info, handle) | | |
| SignatureReference | text | Pointer to signature image or document | | ⚠️ pending: container here or reference into Documents? |
| SortOrder | number | Numeric display sequence | | |
| IsActive | number | 1 = active and available for selection | | |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

Full relationship context → [graph.md](../relationships/README.md)
