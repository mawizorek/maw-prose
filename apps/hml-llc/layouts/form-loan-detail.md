# Loan Detail (Form View)

Manage → Layouts → Loan Detail → View as Form

Context: `Loans`

The month-of-work screen. Loan terms + two portals showing what's owed and what's come in.

## Wireframe

```
┌─────────────────────────────────────────────────┐
│  LOAN DETAIL                     [← Property]   │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─ TERMS CARD ────────────────────────────┐  │
│  │ Borrower   Original Principal   Rate      │  │
│  │ Origination   Term   Grace Days           │  │
│  │ Status pill                               │  │
│  └────────────────────────────────────────────┘  │
│                                                 │
│  ┌─ EXPECTED TRANSACTIONS (portal) ────────┐  │
│  │ Due Date | Amount | Status | Late? | Applied│ │
│  │ ────────────────────────────────────────── │ │
│  │ (sorted by due date desc)                 │ │
│  └────────────────────────────────────────────┘  │
│                                                 │
│  ┌─ RECEIVED FUNDS (portal) ───────────────┐  │
│  │ Date | Amount | Source | Applied? | Match  │  │
│  │ ────────────────────────────────────────── │  │
│  │ (sorted by date desc)                     │  │
│  └────────────────────────────────────────────┘  │
│                                                 │
│  [ Apply Payment ]       [ Generate Payoff ]    │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Portals

| Portal | Table | Relationship | Sort | Filter |
|---|---|---|---|---|
| Expected Transactions | ExpectedTransactions | Loans::PrimaryKey = ExpectedTransactions::fkLoan | DueDate desc | none |
| Received Funds | ReceivedFunds | Loans::PrimaryKey = ReceivedFunds::fkLoan | DateReceived desc | none |

## Actions

| Button | Script | Does |
|---|---|---|
| ← Property | NAV/go-to-property | navigates to form-property-hub filtered to this loan's property |
| Apply Payment | SERVICING/apply-payment | opens form-payment-application in context |
| Generate Payoff | SERVICING/generate-payoff | opens form-payoff, creates new record |

## Design tokens

- Terms card: paper `#FDFCFA`, warm-gray border
- Status pill: green=current, gold=upcoming, red=late
- Portal rows: dashed borders, monospace amounts, category dots
- Font: Gabarito (UI), IBM Plex Mono (data)
