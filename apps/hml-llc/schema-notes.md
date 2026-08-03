# Schema notes

Per-table field sets live in `tables/`. This page = cross-cutting contracts and the live-file inventory.

## Locked implementation contract (June 2026)

| Subject | Contract |
|---|---|
| Binder keys | `Documents::fkLoan` + `Documents::fkProperty` are **text UUIDs**, not numeric |
| AccountTransactions parent | `fkLoan` authoritative. If live file shows `fkProperty`, that's transition state. |
| Status fields | `fkStatus` resolves to **real record keys**, never free text |
| Locked txn names | `Payment Received`, `Interest Payment`, `Principal`, `Origination Points`, `Maturation Fee`, `Late Fee` |
| `Payment Received` | Becomes redundant when `ReceivedFunds` is built (cash-in bucket) |

## Normalization targets

| Form | Rule | Violation to fix |
|---|---|---|
| 1NF | One field = one fact | No `AmountOriginal` beside `OriginalAmount`. No scalar FK where structure is 1:M (`PropertySUMMARIES.fkDocuments`). |
| 2NF | Ownership | Loan terms on Loans, not PropertySUMMARIES. Both ledgers parent on `fkLoan`. PaymentApplications stays skinny. |
| 3NF | Dependencies | Status metadata in status tables by key. Txn-type behavior in `Standard_Transactions`. File history in `DocumentVersions`. |
| Exception | Frozen payoffs are **allowed denormalization** (snapshot artifact, intentional) |

## Remaining stragglers

| Table | Check |
|---|---|
| GLOBAL_USE_VARIABLES | Unresolved overlap with SETUP_LLC |
| PropertySUMMARIES | Verify no loan terms drifted back; re-check 4 surviving FKs |
| Loans | Finish calc-name cleanup; confirm status + payoff-pointer are real refs |
| ExpectedTransactions | Confirm `fkLoan` authoritative, no property anchor; settle one amount family |
| AccountTransactions | Same parent confirm; doc linkage separate from external ref text; resolve `TransactionKind` overlap |
| PaymentApplications | Must stay skinny |
| Payoffs | Needs explicit source-template reference |
| PaymentInstructions | Confirm fully row-based, no global remnants |
| Standard_Transactions | Settle its own name |

## Live file inventory (snapshot 2026-05-30)

| Table | Purpose | Key | Status |
|---|---|---|---|
| Property SUMMARIES | Core property record | Text | Active |
| PropertyExpectations | Calc layer (next maturity, per diem, ROI) | Text | ⚠️ Folding into Loans |
| AccountTransactions | Borrower-facing rows for payoff/export | Text | Active |
| Standard_Transactions | Template transaction types | Text | Active |
| statuses_PropertySummaries | Status records | — | Active |
| statuses_AccountTransactions | Status records | — | Active |
| DOCUMENTS | Document records | Serial | Active |
| FileFOLDERS | Folder records | — | Active |
| CRM | Borrower/company records | — | Active |
| CONTACTS | Person records | — | Active |
| PaymentInstructions | Payment instruction content | — | Active |
| GLOBAL_USE_Variables | Globals and preferences | — | Active |
| SETUP_LLC | LLC setup | — | ⚠️ Merge candidate |
| SETUP_MOBILE | Mobile setup | — | ⚠️ Retire candidate |
| Values | Generic value-list values | — | ⚠️ Retire candidate |
| Value_Lists | Value list definitions | — | ⚠️ Retire candidate |
| work_Notes | Notes | — | ⚠️ Retire candidate |

⚠️ Spellings above are **live-file spellings** (space in "Property SUMMARIES", mixed case in "GLOBAL_USE_Variables", caps in "DOCUMENTS"). Pre-SQL rename lock exists because of this.
