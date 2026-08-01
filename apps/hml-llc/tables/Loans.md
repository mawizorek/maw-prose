# Loans

*The servicing parent. 🔨 BUILT · verified in file 2026-07-15. Field register reconciled 2026-07-31, including eleven calc fields recovered from the retired schema JSON.*

**Grain: one note with its own terms.** This is the financial parent of the whole file — the ledgers, the payoffs and the applications all hang off it. A property can have several loans; a loan has exactly one property.

Everything about servicing lives here because of a June 2026 re-homing that moved loan terms off `PropertySUMMARIES`. That move is the reason the app reads property-first and computes loan-first, and it is why the property hub needs a `Loans` portal to make sense.

One field on this table is a live footgun. `fkCurrentPayoff` points at the current `Payoffs` row and is read by the payoff calculations — which means **it must be empty while a live payoff is being computed**, or `calc_TotalOutstanding` and `calc_CurrentPayoffAmount` short-circuit to the frozen prior payoff and quietly return last month's number.

## Fields

| Field | Type | Key | Category | Status | Notes |
|---|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | | |
| CreationTimestamp | timestamp | audit | audit | | |
| CreatedBy | text | audit | audit | | |
| ModificationTimestamp | timestamp | audit | audit | | |
| ModifiedBy | text | audit | audit | | |
| fkProperty | text-uuid | fk | key | | secured-by property |
| fkBorrower | text-uuid | fk | key | pending | waits on the party-table decision |
| fkCurrentPayoff | text-uuid | fk | key | pending | see the warning above — must be empty during live payoff compute |
| LoanNumber | text | plain | terms | | |
| OriginationDate | date | plain | terms | | |
| ClosingDate | date | plain | terms | pending | read by calc_NextMaturityDate; presence unconfirmed |
| OriginalPrincipal | number | plain | terms | | canonical principal basis; was `LoanAmount` before the July reconcile |
| InterestRateAnnual | number | plain | terms | | canonical annual rate; was `InterestRate` before the July reconcile |
| OriginationPoints | number | plain | terms | | rate or fraction feeding calc_originationPoints |
| MaturationPoints | number | plain | terms | | |
| MaturationTerm_inDays | number | plain | terms | | |
| LoanTerm_inDays | number | plain | terms | | |
| GraceDays | number | plain | terms | pending | read by ExpectedTransactions.calc_lateAfterDate; presence unconfirmed |
| ServicingStatus | text | plain | status | | should resolve to a status record, not free text |

### Calculations (11)

| Field | Returns | Stored |
|---|---|---|
| calc_CurrentPrincipalBalance | Number | yes |
| calc_originationPoints | Number | yes |
| calc_MaturationPayment | Number | yes |
| calc_MonthlyPayment | Number | yes |
| calc_perDiemInterest | Number | no |
| calc_FirstMaturation | Number | yes |
| calc_NextMaturityDate | Date | no |
| calc_NextDueDate | Date | no |
| calc_TotalOutstanding | Number | no |
| calc_CurrentPayoffAmount | Number | no |
| calc_expROI | Number | yes |

Formula bodies are one `.fmcalc` per field in `../calculations/`. **This inventory existed nowhere but the retired schema JSON** — the old version of this note deferred to it entirely — so it is here now because retiring that file without recovering these eleven rows would have deleted them.

## Relationships

`fkProperty` points at `PropertySUMMARIES`, locked. `fkBorrower` points at `Organizations` and `fkCurrentPayoff` at `Payoffs`, both pending. This table is the parent of `ExpectedTransactions.fkLoan`, `AccountTransactions.fkLoan` and `Payoffs.fkLoan`, all locked.

## Open

The canonical names `OriginalPrincipal`, `InterestRateAnnual`, `ClosingDate`, `GraceDays` and `fkCurrentPayoff` were reconciled across the docs in July. What has never happened is opening the file and confirming those exact names exist in it. If the file differs, the file wins and the docs change.

`ServicingStatus` should be a status reference rather than text. Two later renames are worth considering and neither is decided: `calc_originationPoints` reads like a rate but returns an amount, and `calc_FirstMaturation` may not be the forever name.
