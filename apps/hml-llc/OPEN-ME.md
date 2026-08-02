# HML_LLC FileMaker v1 — Doc Tree (v2)
This tree mirrors what you open in FileMaker. Each file = one menu destination.
Open the tree, find the screen, build or edit from it.
```
apps/hml-llc/
│
├── OPEN-ME.md                ← you are here (nav + build order)
│
├── tables/                   ← Manage → Database → Tables
│   ├── Loans.md
│   ├── PropertySUMMARIES.md
│   ├── ExpectedTransactions.md
│   ├── ReceivedFunds.md
│   ├── PaymentApplications.md
│   ├── Payoffs.md
│   ├── PaymentInstructions.md
│   ├── Standard_Transactions.md
│   ├── Organizations.md
│   ├── Contacts.md
│   ├── Documents.md
│   └── GLOBAL_USE_VARIABLES.md
│
├── relationships/            ← Manage → Database → Relationships
│   └── graph.md              ← one file: FK map + TO groups
│
├── layouts/                  ← Manage → Layouts
│   ├── property-hub.md
│   ├── loan-detail.md
│   ├── transactions.md
│   ├── payment-application.md
│   ├── payoff.md
│   ├── document-binder.md
│   └── global-setup.md
│
├── scripts/                  ← Manage → Scripts
│   ├── 00_APP/               ← folder in script workspace
│   │   ├── txn_Begin.md
│   │   ├── txn_Commit.md
│   │   └── txn_Rollback.md
│   ├── SERVICING/
│   │   ├── apply-payment.md
│   │   └── generate-payoff.md
│   └── NAV/
│       └── go-to-loan.md
│
├── value-lists/              ← Manage → Value Lists
│   └── all.md                ← one file, one table
│
├── calculations/             ← formula bodies (one per calc field)
│   ├── Loans__calc_MonthlyPayment.fmcalc
│   ├── Loans__calc_perDiemInterest.fmcalc
│   └── ...
│
└── fixtures/                 ← test data (Golden Month etc.)
    └── golden-month.md
```
## How to use this tree
1. Open FileMaker.
2. Open the file in this tree that matches where you're working.
3. Build what the file says. If it's wrong, fix the file.
## Build order (Phase 1)
1. `tables/ReceivedFunds.md`
2. `scripts/00_APP/txn_Begin.md` → `txn_Commit.md` → `txn_Rollback.md`
3. `fixtures/golden-month.md` (import + verify $850 unapplied)
4. `layouts/transactions.md` (table view surfaces)
5. `layouts/loan-detail.md` (hub + portals)
6. `layouts/property-hub.md` (loans portal)
7. `layouts/payoff.md` (read-only print)
