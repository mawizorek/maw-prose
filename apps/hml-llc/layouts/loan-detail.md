# Loan Detail
Manage → Layouts → Loan Detail
Context: `Loans`
The month-of-work screen. Loan terms + two portals showing what's owed and what's come in.
## What you see
```
┌─────────────────────────────────────────────────┐
│  LOAN DETAIL                     [← Property]   │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─ TERMS CARD ──────────────────────────────┐  │
│  │ Borrower   Original Principal   Rate      │  │
│  │ Origination   Term   Grace Days           │  │
│  │ Status pill                               │  │
│  └────────────────────────────────────────────┘  │
│                                                 │
│  ┌─ EXPECTED TRANSACTIONS (portal) ──────────┐  │
│  │ Due Date | Amount | Status | Late? | Applied│ │
│  │ ────────────────────────────────────────── │  │
│  │ (sorted by due date desc)                 │  │
│  └────────────────────────────────────────────┘  │
│                                                 │
│  ┌─ RECEIVED FUNDS (portal) ─────────────────┐  │
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
| ← Property | NAV/go-to-property | navigates to PropertyHub filtered to this loan's property |
| Apply Payment | SERVICING/apply-payment | opens Payment Application layout in context |
| Generate Payoff | SERVICING/generate-payoff | opens Payoff layout, creates new record |
## Design tokens
- Terms card: paper `#FDFCFA`, warm-gray border
- Status pill: green=current, gold=upcoming, red=late
- Portal rows: dashed borders, monospace amounts, category dots
- Font: Gabarito (UI), IBM Plex Mono (data)
