# Loans

Manage → Database → Tables → Loans

Grain: one note, one set of terms. The financial parent of all servicing records.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkProperty | text-uuid | Collateral property for this loan | → PropertySUMMARIES | |
| fkBorrower | text-uuid | Borrowing entity (always an Organization, even for individuals) | → Organizations | |
| fkCurrentPayoff | text-uuid | Most recent payoff snapshot; empty during live compute | → Payoffs | |
| LoanNumber | text | Human-readable reference (e.g. HML-2024-001) | | |
| OriginationDate | date | Date loan was funded | | |
| ClosingDate | date | Date closing docs were executed | | ⚠️ same as OriginationDate? |
| OriginalPrincipal | number | Loan amount at origination | | |
| InterestRateAnnual | number | Annual rate as decimal (0.12 = 12%) | | |
| OriginationPoints | number | Points charged at origination (2 = 2%) | | |
| MaturationPoints | number | Points charged at maturity | | |
| MaturationTerm_inDays | number | Days from origination to first maturity | | |
| LoanTerm_inDays | number | Total loan term in calendar days | | |
| GraceDays | number | Days after due before late fee triggers | | ⚠️ default value? |
| ServicingStatus | text | Current state: active, paid off, default, extended | | ⚠️ should be value list |

Audit fields: CreationTimestamp, CreatedBy, ModificationTimestamp, ModifiedBy.

## Calculations

| Field | Returns | Stored | Formula |
|---|---|---|---|
| calc_CurrentPrincipalBalance | Number | yes | [view](../calculations/Loans__calc_CurrentPrincipalBalance.fmcalc) |
| calc_originationPoints | Number | yes | [view](../calculations/Loans__calc_originationPoints.fmcalc) |
| calc_MaturationPayment | Number | yes | [view](../calculations/Loans__calc_MaturationPayment.fmcalc) |
| calc_MonthlyPayment | Number | yes | [view](../calculations/Loans__calc_MonthlyPayment.fmcalc) |
| calc_perDiemInterest | Number | no | [view](../calculations/Loans__calc_perDiemInterest.fmcalc) |
| calc_FirstMaturation | Number | yes | [view](../calculations/Loans__calc_FirstMaturation.fmcalc) |
| calc_NextMaturityDate | Date | no | [view](../calculations/Loans__calc_NextMaturityDate.fmcalc) |
| calc_NextDueDate | Date | no | [view](../calculations/Loans__calc_NextDueDate.fmcalc) |
| calc_TotalOutstanding | Number | no | [view](../calculations/Loans__calc_TotalOutstanding.fmcalc) |
| calc_CurrentPayoffAmount | Number | no | [view](../calculations/Loans__calc_CurrentPayoffAmount.fmcalc) |
| calc_expROI | Number | yes | [view](../calculations/Loans__calc_expROI.fmcalc) |

Full relationship context → [graph.md](../relationships/graph.md)
