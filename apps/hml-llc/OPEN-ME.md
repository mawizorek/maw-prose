---
theme: papyrus
object-library: shared/themes/_objects.json
notes: >
  Theme metadata tag (STRICT). Every FMP app tree declares its theme here.
  Renders read this slug and inline the resolved tokens at build time.
  Omit the slug or set to "default-theme" and the grayscale default applies.
  Object library points at the canonical shared set; renders MUST use these
  components. Cold agents: check this block before rendering anything.
---

# HML_LLC FileMaker v1 — Doc Tree (v2.1)

This tree mirrors what you open in FileMaker. Each file = one menu destination.
Open the tree, find the screen, build or edit from it.

```
apps/hml-llc/
│
├── OPEN-ME.md                ← you are here (nav + build order + theme tag)
├── _viewer.html              ← LAYOUT RENDERER (dropdown + live render of all HTML below)
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
│   └── README.md             ← THE source of truth: FK map, TO groups, all join logic
│
├── layouts/                  ← Manage → Layouts
│   │
│   │  Prefix = view type. Three FMP views = three doc templates.
│   │  form-  = Form View (one record, portals, detail)
│   │  table- = Table View (spreadsheet grid, column config)
│   │  list-  = List View (scrollable row layout)
│   │
│   │  *-render.html files = visual renders (what the wireframe looks like built)
│   │  _viewer.html auto-discovers all renders via GitHub API
│   │
│   ├── form-property-hub.md
│   ├── form-loan-detail.md
│   ├── form-loan-detail-render.html
│   ├── form-payment-application.md
│   ├── form-payoff.md
│   ├── form-document-binder.md
│   ├── form-global-setup.md
│   ├── table-expected-transactions.md
│   ├── table-received-funds.md
│   └── list-loan-browser.md
│
├── scripts/                  ← Manage → Scripts
│   ├── 00_APP/
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
│   └── all.md
│
├── calculations/             ← formula bodies (one per calc field)
│   ├── Loans__calc_MonthlyPayment.fmcalc
│   ├── Loans__calc_perDiemInterest.fmcalc
│   └── ...
│
└── fixtures/                 ← test data
    └── golden-month.md
```

## Layout view types

| Prefix | FMP Menu Path | What it documents | Template shape |
|---|---|---|---|
| `form-` | View as Form | Wireframe, portals, actions, design tokens | One record on screen |
| `table-` | View as Table | Column config (field, width, sort), found set, filters | Spreadsheet mode |
| `list-` | View as List | Row wireframe, body/header/footer parts, per-row fields | Scrollable rows |

## Build order (Phase 1)

1. `tables/ReceivedFunds.md`
2. `scripts/00_APP/txn_Begin.md` → `txn_Commit.md` → `txn_Rollback.md`
3. `fixtures/golden-month.md` (import + verify $850 unapplied)
4. `table-expected-transactions.md` + `table-received-funds.md`
5. `form-loan-detail.md` (hub + portals)
6. `form-property-hub.md` (loans portal)
7. `form-payoff.md` (read-only print)
