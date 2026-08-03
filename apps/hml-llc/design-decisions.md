# Design decisions

| Decision | Ruling |
|---|---|
| UX orientation | Property-first navigation, loan-first schema |
| File architecture | Single-user, local-file, one file unless constraint justifies split |
| Document binder | Binder = doc source of truth; payoff history versioned + frozen |
| Multi-loan receipts | One receipt allocates across multiple loans/properties → tenth table (`ReceivedFunds`) |
| Integration boundary | One-way publish FMP → ClickUp, button-driven, no two-way sync in v1 |
| Build priority | Prove core loan lifecycle end-to-end before reporting or multi-user |
| Theme/artifacts | Shared object families only, no per-app objects |

## Schema-lock rulings (June 2026)

| What | Correction |
|---|---|
| `Loans` created | Real servicing parent; loan terms re-homed off PropertySUMMARIES |
| `PaymentApplications` rebuilt | Actual join purpose (was vague association as `_PAYMENT_ASSIGNMENTS`) |
| `Payoffs` created | Real table with frozen numbers |
| `PaymentInstructions` rebuilt | Record-based (was fake globals) |
| `Standard_Transactions` settled | Taxonomy table (metadata > display value = table) |
| `Account Calculations` retired | Logic folded into canonical tables + TO calcs |
