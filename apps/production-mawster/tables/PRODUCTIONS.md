---
id: table-productions
title: Productions
type: reference
status: public
order: 10
# nav: collapsed
revised: Aug 2026
summary: Productions records.
---

# Productions

!!! abstract "Grain"
    One opening night - is what we'll say for now. Productions *may* share the same NAME and will generally serve the same then (maybe the'ats what we build?)
<!---
but when does a show stop being a show? what part of a devising process would it take to make a second grain?  
does TOME need a seperate input
does OA need a diferent style input?
a musical
something off-campus
studnet theatrre?
Ogunquit Playhouse
Broadway?
stidnet theatre?
--->

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier for this loan record | | |
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
| [calc_CurrentPrincipalBalance](../calculations/Loans__calc_CurrentPrincipalBalance.fmcalc) | (c→Number) | Principal remaining after all applied payments | | |
| [calc_originationPoints](../calculations/Loans__calc_originationPoints.fmcalc) | (c→Number) | Computed origination fee dollar amount | | |
| [calc_MaturationPayment](../calculations/Loans__calc_MaturationPayment.fmcalc) | (c→Number) | Balloon payment due at maturity | | |
| [calc_MonthlyPayment](../calculations/Loans__calc_MonthlyPayment.fmcalc) | (c→Number) | Interest-only monthly payment amount | | |
| [calc_perDiemInterest](../calculations/Loans__calc_perDiemInterest.fmcalc) | (c→Number) | Daily interest accrual; unstored | | |
| [calc_FirstMaturation](../calculations/Loans__calc_FirstMaturation.fmcalc) | (c→Number) | Original maturity date as serial | | |
| [calc_NextMaturityDate](../calculations/Loans__calc_NextMaturityDate.fmcalc) | (c→Date) | Next maturity considering extensions; unstored | | |
| [calc_NextDueDate](../calculations/Loans__calc_NextDueDate.fmcalc) | (c→Date) | Next payment due date; unstored | | |
| [calc_TotalOutstanding](../calculations/Loans__calc_TotalOutstanding.fmcalc) | (c→Number) | Principal + all accrued unpaid interest; unstored | | |
| [calc_CurrentPayoffAmount](../calculations/Loans__calc_CurrentPayoffAmount.fmcalc) | (c→Number) | Live payoff figure (outstanding + per diem to today); unstored | | |
| [calc_expROI](../calculations/Loans__calc_expROI.fmcalc) | (c→Number) | Expected return on investment over full term | | |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

Full relationship context → [graph.md](../relationships/README.md)
