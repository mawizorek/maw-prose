# Schema notes

*The cross-cutting schema reasoning — the normalization rulebook, the locked implementation contract, and the live-file inventory the target stack is being reconciled against. Per-table field sets live in `tables/`. Verified 2026-07-31; the inventory below is a 2026-05-30 snapshot and has not been re-read since.*

## The locked implementation contract

From June 2026. These supersede older language wherever they conflict, and they describe the intended rebuild even where the live file still shows pre-rebuild structure.

Binder keys — `Documents::fkLoan` and `Documents::fkProperty` — are **text UUIDs**, not numeric. The older numeric-FK language is legacy pending file updates, and mixed key typing across a graph is the kind of defect that works until the one join that silently returns nothing.

`AccountTransactions` parents to **`fkLoan`**. If the live file still shows `fkProperty`, that is transition state rather than the contract. Its purpose is the lean borrower-facing payoff and export row set — not a catch-all internal ledger. It seeds from the schedule and from received-payment activity, then stays editable so a payoff statement reads cleanly.

`fkStatus` fields resolve to **real status record keys**, never free text pretending to be a foreign key.

The locked `Standard_Transactions::Name` values are `Payment Received`, `Interest Payment`, `Principal`, `Origination Points`, `Maturation Fee` and `Late Fee`. `Payment Received` is the actual cash-in bucket and the others are expected-item, application or payoff categories that received cash can satisfy — **which is exactly why `Payment Received` becomes redundant the day `ReceivedFunds` is built.**

## The normalization audit

First and second normal form are prerequisites; the core servicing tables should reach practical third normal form before more layout or script surface gets added on top.

**First normal form.** One field means one fact of one type. No duplicate-name variants — `AmountOriginal` beside `OriginalAmount` is two names for one idea and one of them has to die. No scalar foreign key where the real structure is one-to-many, which is what `PropertySUMMARIES.fkDocuments` still is. And no reusable long-form operational content living in globals when it belongs as records, which is what `PaymentInstructions` was.

**Second normal form, ownership.** Loan-owned fields belong on `Loans`: origination date, closing date, rate, term, loan number, borrower link, principal, maturity helpers, and everything that drives a payoff. `PropertySUMMARIES` keeps property identity and collateral facts only. Both ledgers treat `fkLoan` as the authoritative parent. `PaymentApplications` holds join-level facts and never copies parent metadata down.

**Third normal form, dependencies.** Status metadata belongs in status tables referenced by key, not repeated as ad-hoc text. Transaction-type behaviour belongs in `Standard_Transactions`, not duplicated onto expected and actual rows. File and version history belongs in `DocumentVersions` while the logical document record stays in `Documents`.

**Frozen payoff values are an allowed exception**, and it is worth naming as an exception rather than letting it look like sloppiness. An issued payoff is a snapshot artifact. It is supposed to be denormalized; that is what makes it a record of what was sent.

## Remaining stragglers

Each of these is a specific thing to check rather than a general worry.

`GLOBAL_USE_VARIABLES` has unresolved overlap with `SETUP_LLC`. `PropertySUMMARIES` needs verifying that no loan-owned terms drifted back onto it, and its four surviving foreign keys re-checked. `Loans` needs the calc-name cleanup finished to one consistent family, and confirmation that its status and payoff-pointer are real references. `ExpectedTransactions` needs `fkLoan` confirmed authoritative with no lingering property anchor, and one canonical amount family. `AccountTransactions` needs the same parent confirmation, document linkage kept separate from external reference text, and the `TransactionKind` overlap with `Standard_Transactions` resolved. `PaymentApplications` needs to stay skinny. `Payoffs` needs an explicit source-template reference. `PaymentInstructions` needs confirming as fully row-based with no global remnants. `Standard_Transactions` needs its own name settled.

## The live file, as of 2026-05-30

Seventeen tables physically exist. The target is ten servicing tables plus the parked party and document tables.

| Table | Purpose | Key |
|---|---|---|
| `Property SUMMARIES` | core deal/loan/property record | Text |
| `PropertyExpectations` | calc layer: next maturity, per diem, mortgage balance, ROI | Text |
| `AccountTransactions` | lean borrower-facing rows for payoff and export | Text |
| `Standard_Transactions` | template transaction types | Text |
| `statuses_PropertySummaries` | status records | — |
| `statuses_AccountTransactions` | status records | — |
| `DOCUMENTS` | document records | Serial |
| `FileFOLDERS` | folder records for document storage | — |
| `CRM` | borrower or company records | — |
| `CONTACTS` | person records | — |
| `PaymentInstructions` | payment instruction content | — |
| `GLOBAL_USE_Variables` | globals and preferences | — |
| `SETUP_LLC` | LLC setup | — |
| `SETUP_MOBILE` | mobile setup | — |
| `Values` | generic value-list values | — |
| `Value_Lists` | value list definitions | — |
| `work_Notes` | notes | — |

The `PropertyExpectations` calc layer is being folded into the `Loans` calculations. The `statuses_*` tables back the `fkStatus` references and are real. `Values`, `Value_Lists`, `work_Notes` and `SETUP_MOBILE` are candidates to retire or park.

⚠️ **Note the spellings in that table** — `Property SUMMARIES` with a space, `GLOBAL_USE_Variables` with mixed case, `DOCUMENTS` in caps. Those are what the file says, and they are the reason the pre-SQL naming lock exists.
