# Documents

Manage → Database → Tables → Documents

Grain: one logical document. Parked, out of v1 scope. Child `DocumentVersions` handles file copies if versioning survives.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier (legacy was Serial) | | ⚠️ convert from legacy numeric |
| fkProperty | text-uuid | The property tab in the binder | → PropertySUMMARIES | ⚠️ legacy numeric FK |
| fkLoan | text-uuid | Optional loan association | → Loans | ⚠️ legacy numeric FK |
| fkCurrentVersion | text-uuid | Active DocumentVersions row | → DocumentVersions | |
| DocumentType | text | Balloon Note / Settlement Statement / Interest Payment / Check Received | | |
| DocumentDate | date | The date on the document itself | | |
| DateReceived | date | When physically received or cashed | | |
| Amount | number | Dollar amount if applicable | | |
| PayorPayee | text | Who wrote or received the check | | |
| CheckNumber | text | Check number (checks only) | | |
| Notes | text | Free-form notes | | |
| [VersionCount](../calculations/Documents__VersionCount.fmcalc) | (c→Number) | Count of related versions | | |
| PinnedLocal | number | 1 = keep cached on device | | |
| OriginalFilename | text | Preserved original filename | | |
| fkExpectedPayment | text-uuid | Link to expected item (future) | → ExpectedTransactions | ⚠️ future |
| fkReceivedPayment | text-uuid | Link to receipt (future) | → ReceivedFunds | ⚠️ future |
| IsVerified | number | 1 = reconciled against the ledger | | |
| LinkedDate | timestamp | When the document link was established | | |
| LinkedBy | text | Who linked this document | | |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | ⚠️ normalize from legacy DateCreated |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | ⚠️ normalize from legacy DateModified |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

Full relationship context → [graph.md](../relationships/README.md)
