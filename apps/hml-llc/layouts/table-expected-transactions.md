# Expected Transactions (Table View)

Manage → Layouts → Expected Transactions → View as Table

Context: `ExpectedTransactions`

Spreadsheet view of all expected payments. Sort, filter, spot what's due and what's late.

## Columns

| # | Field | Width | Sort | FMP Comment |
|---|---|---|---|---|
| 1 | DueDate | 100 | ↑ default | Date this payment is due |
| 2 | calc_loanNumber | 120 | | Lookup: parent Loan number |
| 3 | calc_borrowerName | 150 | | Lookup: Loan → Organization name |
| 4 | AmountDue | 100 | | Monthly payment amount |
| 5 | calc_amountPaid | 100 | | Sum of applied PaymentApplications |
| 6 | calc_remaining | 100 | | AmountDue minus calc_amountPaid |
| 7 | Status | 90 | | paid / partial / open / late |
| 8 | calc_isLate | 60 | | Boolean: past grace period |
| 9 | calc_lateAfterDate | 100 | | DueDate + parent Loan GraceDays |

## Default found set

All records where Status ≠ "paid" (open obligations first).

## Sort

DueDate ascending (soonest due at top).

## Actions

| Element | Script | Does |
|---|---|---|
| Row double-click | NAV/go-to-loan | navigates to form-loan-detail for parent loan |
| Header: "Show All" | FIND/show-all-expected | resets found set to include paid |

## Design tokens

- Row striping: alternating cream/white
- Late rows: left border red `#C0392B`
- Amounts: IBM Plex Mono, right-aligned
- Status column: colored pill (green=paid, gold=partial, grey=open, red=late)
