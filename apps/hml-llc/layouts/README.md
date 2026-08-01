# Layouts

*Mirrors Manage Layouts. Seven layouts, all role-defined and none of them enumerated from the file. Verified 2026-07-31.*

Every layout here is described by its **functional role** rather than its FileMaker identity. Exact layout names, parts, object inventories and portal configurations are all pending a pass through the actual file, and that gap is the honest state of this folder — these are design intent, not documentation of something built.

The seven were previously seven files. They are one file now, because each was under 400 bytes and each said the same three things in the same order, with "pending a DDR pass" as the closing line of all of them. Seven copies of one sentence is not seven documents.

## The philosophy that shapes all of them

**Property-first UX over a loan-first schema.** Layouts organize around the navigation a person performs — start at a property, drill into its loan — even though the model parents every financial record on `Loans`. That tension is deliberate and the property hub's `Loans` portal is what resolves it.

Built from the locked object families rather than per-layout objects: cards, property bar, pills, buttons, table styling, tab switcher, form elements, verification boxes.

## The set

**Property Hub** · entry point, context `PropertySUMMARIES`. The front door. Navigate by property, property bar plus document-type pills, drill into the property's loan. Components: property bar in purple, cards, document-type pills, side navigation zones.

**Loan Detail** · financial parent view, context `Loans`. Loan terms, servicing status, and the entry points into transactions and payoff. Components: cards, status pills, primary and secondary buttons, form elements.

**Transactions** · ledger view, context `Loans` through both transaction tables. A view-tab switcher between the expected and actual ledgers, with filter and status pills. Components: view tab switcher, filter pills, status pills, table styling — dashed row borders, monospace data cells, category dots.

**Payment Application** · context `PaymentApplications`. Apply an account transaction against one or more expected transactions; supports partial payments and one-payment-covers-many. A verification box confirms the math. Components: verification box in green for a match and red for a mismatch, form elements, action pill buttons.

**Payoff** · context `Payoffs`. Generate and freeze a payoff snapshot, pulling a `PaymentInstructions` snapshot at issue. Frozen numbers never recompute. Components: cards, verification box, primary and danger pill buttons, info and warning note bars. ⚠️ **Read-only, and no portal** — a portal is an editing surface by default and an editing surface over frozen data defeats the freeze.

**Document Binder** · context `Documents`, parked for v1. Binder view of loan and property documents. Components: cards, document-type pills, table styling.

**Global Setup** · control layer, context `GLOBAL_USE_VARIABLES`. Device mode, current-context globals, the file-info block. Wired from day one, before anything else needs it.

## Design language

Cream page `#F5F1EA`, paper cards `#FDFCFA`, warm-gray secondary `#EDE9E3`, purple accent `#7B3FA0` on the property bar. Gabarito for UI, IBM Plex Mono for data. Status colors: red for late and fees, green for paid, gold for outstanding and upcoming-due, purple for interest.

## Pending, for all seven

Exact FileMaker layout names and folder structure. Layout parts — header, body, footer, sub-summary. Object-level inventory and which component family each object uses. Portal and tab-control configuration on Transactions and Payoff. Whether mobile gets its own variants or a responsive single layout.
