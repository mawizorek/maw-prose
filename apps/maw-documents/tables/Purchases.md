# Purchases

Manage → Database → Tables → Purchases

Grain: **one order.** One trip to a bookstore, one online order, one estate-sale haul. What was in it
is [PurchaseLines](./PurchaseLines.md).

🔴 **This is a money write. Read the atomicity section before scripting it.**

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkVendor | text-uuid | Who you bought from | → Organizations | ⭐ the pointer IS the vendor role |
| PurchaseDate | date | Date of the transaction | | ⚠️ not the arrival date — that is on the copy |
| OrderReference | text | Order number, invoice, receipt id | | |
| Subtotal | number | Sum of line totals | | |
| ShippingAmount | number | Order-level shipping | | 🔴 belongs to the ORDER |
| TaxAmount | number | Order-level tax | | 🔴 same |
| TotalAmount | number | What you actually paid | | ⚠️ validate, do not assume |
| Currency | text | ISO code | | 🔴 explicit. No implicit USD |
| fkReceiptDocument | text-uuid | The receipt, as a document in this archive | → Documents | ⭐ |
| Notes | text | Free-form | | |
| calc_LineCount | (c→Number) | Lines on this order | → PurchaseLines | 🔴 0 = a half-applied commit |
| calc_LineTotalSum | (c→Number) | For reconciling against Subtotal | → PurchaseLines | |

Audit fields → [data-standards.md](../data-standards.md).

## 🔴 Atomicity — FMP19, hand-built

A purchase commit is **multi-row**: one header plus N lines. Half-applied leaves an order with a
total and no lines — **and that looks completely fine in a list view.**

1. All writes through **ONE relationship from the `Purchases` parent record**, so `Revert Record`
   discards the whole set.
2. `Set Error Capture [On]`.
3. Check `Get(LastError)` **after every step**, not at the end.
4. 🚩 **No `Commit Records` inside the block.**

🚩 **Do not substitute native transactions even if this file lands on a newer runtime.**

<!-- AGENT NOTE · why header+lines, and why the receipt link is cheap and good.
One order with three books and one shipping charge has NO correct home in a flat table. Flatten it
and you get either the order total duplicated onto three rows (three claimants on one fact, which
disagree after the first correction) or shipping apportioned by hand — arithmetic nobody documents
and nobody can reproduce a year later.
fkReceiptDocument points at a Documents row because a receipt PDF is already a document this app can
hold: the ledger row and its evidence live in the same file, and the receipt gets the same
variant/version handling as anything else. No second storage story for financial evidence.
Why FMP19 at all: the engine must be portable to HML's runtime, which is 19 permanently. Native
transactions are v20 steps. Portable by construction is the point of this app.
-->

## 🚫 PII

**This repo is PUBLIC.** No real vendor-plus-amount pairs in fixtures, examples or renders.

## Open

- **Q6 · book-only ledger, or general purchase ledger?** 🔴 It decides whether
  `PurchaseLines.fkDocumentCopy` stays a real FK or becomes polymorphic. **Cannot be retrofitted.**
- URITP Inventory deferred its own `PURCHASES` / `PURCHASE_LINES`. **Either this engine is documented
  once and cloned, or there will be two ledgers with no sync obligation.**
- No refunds, payments or currency history — deferred, see [schema-notes.md](../schema-notes.md).

FK map → [relationships/README.md](../relationships/README.md)
