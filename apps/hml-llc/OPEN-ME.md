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

# HML_LLC FileMaker v1 — Doc Tree (v2.2)

This tree mirrors what you open in FileMaker. Each file = one menu destination.
Open the tree, find the screen, build or edit from it.

✅ **Map corrected 2026-09-16.** It named `_viewer.html` (the file is `viewer.html`) and omitted
eight root files that have been on disk the whole time — so a cold agent following it would have
concluded `design-decisions.md` did not exist. **Regenerate this map from the tree; do not
hand-maintain it.**

```
apps/hml-llc/
│
├── OPEN-ME.md                ← you are here (nav + build order + theme tag)
├── viewer.html               ← LAYOUT RENDERER (dropdown + live render of all HTML below)
├── README.md                 ← what the app is
├── build-sheet.md            ← the build sheet
├── schema-notes.md           ← schema spine
├── architecture-notes.md     ← architecture
├── design-decisions.md       ← settled rulings
├── data-standards.md         ← app-local naming + data rules
├── next-build-spec.md        ← what gets built next
├── changelog.md              ← documentation changes
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
│   │  viewer.html auto-discovers all renders via GitHub API
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

## ⚠️ Known limits of `viewer.html`, recorded 2026-09-16

It is a **layout renderer + theme sandbox**, not a documentation reader — it filters for `*.html`
and iframes the pick. To read the markdown doc set in a browser, the sibling pattern is
`apps/maw-documents/docs-viewer.html`. **Two tools, two jobs; do not merge them.**

- 🔴 **`FALLBACK_APP_ROOT` is hardcoded to `apps/hml-llc`.** Opened anywhere other than a
  `*.github.io` URL, it serves THIS app's layouts from whatever folder it sits in — wrong
  content, no error. Fine here (this IS that app); **a real defect the moment the file is
  copied elsewhere.** The doc reader deliberately errors out instead of guessing.
- ⚠️ **`DEFAULT_THEME` is hardcoded to `papyrus`** while the STRICT frontmatter above already
  declares the theme. Two claimants on one fact; the frontmatter is the one the standard calls
  strict. Harmless today because both say `papyrus`.
- ⚠️ It is **in no app ledger.** `ClickUp_apps/VERSIONS.md` scopes its coverage rule to that
  repo's root folders, so an HTML tool living inside a `maw-prose` app package is invisible to
  it. *"An app nobody indexes is an app nobody verifies"* — which is how the filename drift
  above survived six weeks.

## Build order (Phase 1)

1. `tables/ReceivedFunds.md`
2. `scripts/00_APP/txn_Begin.md` → `txn_Commit.md` → `txn_Rollback.md`
3. `fixtures/golden-month.md` (import + verify $850 unapplied)
4. `table-expected-transactions.md` + `table-received-funds.md`
5. `form-loan-detail.md` (hub + portals)
6. `form-property-hub.md` (loans portal)
7. `form-payoff.md` (read-only print)
