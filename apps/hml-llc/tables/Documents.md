# Documents

*The binder. 🥇 GOLDEN — designed, parked, out of v1 scope. Verified 2026-07-31.*

**Grain: one logical document.** The file copies live on a child `DocumentVersions` row, which is the distinction this whole module turns on: a document is a thing that exists, a version is one manifestation of it at one point in time, and collapsing them destroys the history.

Parked for v1. It is also the surface most likely to be redesigned once the document seam between FileMaker and the wider document archive is settled, so building it now buys rework.

Before anything here is referenced by `ExecuteSQL`, rename `DOCUMENTS` to `Documents` and convert every legacy numeric serial foreign key to a text UUID. Mixed key typing across a graph is the kind of defect that works fine until the one join that silently returns nothing.

## Fields

| Field | Type | Key | Category | Notes |
|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | target Text UUID; legacy DocumentID was Serial |
| fkProperty | text-uuid | fk | key | the tab in the binder; legacy numeric |
| fkLoan | text-uuid | fk | key | optional for now; legacy numeric |
| fkCurrentVersion | text-uuid | fk | key | points at the active DocumentVersions row |
| DocumentType | text | plain | detail | Balloon Note, Settlement Statement, Interest Payment, Check Received |
| DocumentDate | date | plain | detail | the date on the document |
| DateReceived | date | plain | detail | when physically received or cashed |
| Amount | number | plain | detail | if applicable |
| PayorPayee | text | plain | detail | who wrote or received the check |
| CheckNumber | text | plain | detail | checks only |
| Notes | text | plain | detail | |
| VersionCount | calc | calc | calc | count of versions |
| PinnedLocal | number | plain | detail | 1 = keep cached on device |
| OriginalFilename | text | plain | detail | preserved original filename |
| fkExpectedPayment | text-uuid | fk | key | future: link to an expected item |
| fkReceivedPayment | text-uuid | fk | key | future: link to a receipt |
| IsVerified | number | plain | detail | 1 = reconciled against the ledger |
| LinkedDate | timestamp | audit | audit | when the link was made |
| LinkedBy | text | audit | audit | who linked it |
| DateCreated | timestamp | audit | audit | |
| DateModified | timestamp | audit | audit | |

⚠️ The audit fields on this table are `DateCreated` / `DateModified`, not the house `CreationTimestamp` / `ModificationTimestamp` quad. That is drift from the legacy binder design and it should be normalized before the table is built.

### Child: DocumentVersions

If versioning survives v1.

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | text-uuid | version PK; legacy VersionID was Serial |
| fkDocument | text-uuid | FK to Documents |
| VersionNumber | number | auto-increment per document |
| RemoteFile | container | encrypted remote storage |
| LocalCache | container | device-local cache |
| SyncStatus | text | remote_only / local_only / synced / pinned |
| UploadedBy | text | |
| UploadTimestamp | timestamp | auto |
| Notes | text | |

## Relationships

Referenced by `PropertySUMMARIES.fkDocuments`, many-to-one and under review — a scalar FK where a true one-to-many probably belongs. Parent of `DocumentVersions.fkDocument` if that child survives.

## Open

`Documents` plus a child `DocumentVersions`, or file storage directly on `Documents` for v1. Convert the legacy serial keys. Normalize the audit quad.
