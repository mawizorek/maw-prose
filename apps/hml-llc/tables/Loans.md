# Loans
Manage → Database → Tables → Loans
Grain: one note, one set of terms. The financial parent of all servicing records.
## Fields
| Field | Type | Notes |
|---|---|---|
| PrimaryKey | text-uuid | pk |
| fkProperty | text-uuid | → PropertySUMMARIES |
| fkBorrower | text-uuid | → Organizations |
| fkCurrentPayoff | text-uuid | → Payoffs · ⚠️ EMPTY during live payoff compute |
| LoanNumber | text | |
| OriginationDate | date | |
| ClosingDate | date | pending confirm |
| OriginalPrincipal | number | was LoanAmount |
| InterestRateAnnual | number | was InterestRate |
| OriginationPoints | number | |
| MaturationPoints | number | |
| MaturationTerm_inDays | number | |
| LoanTerm_inDays | number | |
| GraceDays | number | pending confirm |
| ServicingStatus | text | should become status ref |
Audit fields: CreationTimestamp, CreatedBy, ModificationTimestamp, ModifiedBy.
## Calculations
| Field | Returns | Stored | Formula |
|---|---|---|---|
| calc_CurrentPrincipalBalance | Number | yes | `calculations/Loans__calc_CurrentPrincipalBalance.fmcalc` |
| calc_originationPoints | Number | yes | `calculations/Loans__calc_originationPoints.fmcalc` |
| calc_MaturationPayment | Number | yes | |
| calc_MonthlyPayment | Number | yes | `calculations/Loans__calc_MonthlyPayment.fmcalc` |
| calc_perDiemInterest | Number | no | `calculations/Loans__calc_perDiemInterest.fmcalc` |
| calc_FirstMaturation | Number | yes | |
| calc_NextMaturityDate | Date | no | |
| calc_NextDueDate | Date | no | |
| calc_TotalOutstanding | Number | no | |
| calc_CurrentPayoffAmount | Number | no | |
| calc_expROI | Number | yes | |
## Children
- ExpectedTransactions.fkLoan
- AccountTransactions.fkLoan (→ ReceivedFunds in v2 naming)
- Payoffs.fkLoan
- PaymentApplications.fkLoan
## Parents
- PropertySUMMARIES via fkProperty
- Organizations via fkBorrower
