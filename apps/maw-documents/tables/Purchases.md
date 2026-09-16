# Purchases

Manage → Database → Tables → Purchases

Grain: **one order.** One trip to a bookstore, one online order, one estate-sale haul. The
things in it are [PurchaseLines](./PurchaseLines.md) rows.

🔴 **This is a money write. Read the atomicity section before writing any script that touches
it.**

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkVendor | text-uuid | Who you bought from | → Organizations | ⭐ the pointer IS the vendor role |
| PurchaseDate | date | Date of the transaction | | ⚠️ not the date the books arrived — that is AcquiredDate on the copy |
| OrderReference | text | Order number, invoice number, receipt id | | ⭐ the thread back to the real world |
| Subtotal | number | Sum of line totals before shipping and tax | | |
| ShippingAmount | number | Order-level shipping | | 🔴 belongs to the ORDER. Never apportioned onto lines |
| TaxAmount | number | Order-level tax | | 🔴 same |
| TotalAmount | number | What you actually paid | | ⚠️ validate against Subtotal + Shipping + Tax; do not assume |
| Currency | text | ISO code | | 🔴 explicit. No implicit USD |
| fkReceiptDocument | text-uuid | The receipt, as a document in this same archive | → Documents | ⭐ see below |
| Notes | text | Free-form | | |
| calc_LineCount | (c→Number) | How many lines are on this order | → PurchaseLines | 🔴 0 = a half-applied commit. See below |
| calc_LineTotalSum | (c→Number) | Sum of line totals, for reconciling against Subtotal | → PurchaseLines | |

Audit fields on every table → [data-standards.md](../data-standards.md).

## ⭐ The receipt lives in the archive it documents

`fkReceiptDocument` points at a [Documents](./Documents.md) row, because **a receipt PDF is
already a document this app can hold.** The ledger row and its evidence sit in the same file,
and the receipt gets the same variant/version handling as anything else.

That is a small thing that pays off constantly: no second storage story for financial
evidence.

## 🔴 Why header + lines, and not one flat table

**One Amazon order with three books and one shipping charge has no correct home in a flat
table.** Shipping and tax belong to the order; price belongs to the line. Flatten it and you
get one of two bad outcomes:

- duplicate the order total onto three rows — three claimants on one fact, and they will
  disagree after the first correction, or
- apportion shipping across the lines by hand — arithmetic that nobody documents and nobody
  can reproduce a year later.

This is the same header/lines discipline as any real purchase ledger, and it is not
over-engineering: it is the minimum shape that can represent a normal receipt.

## 🔴 Atomicity — FMP19, hand-built, no exceptions

A purchase commit is **multi-row**: one header plus N lines. Half-applied leaves an order with
a total and no lines — and **that looks completely fine in a list view.** `calc_LineCount = 0`
is the only tell, and nothing surfaces it unless something already looks wrong.

The app is built to the FileMaker 19 floor so the engine stays portable to HML's runtime, and
19 has **no `Open/Commit/Revert Transaction`**. So:

1. All writes go through **ONE relationship from the `Purchases` parent record**, so
   `Revert Record` discards the whole set.
2. `Set Error Capture [On]` around the block.
3. Check `Get(LastError)` **after every step**, not at the end.
4. 🚩 **No `Commit Records` inside the block.** A commit mid-block is what makes a partial
   write permanent.

This is the same pattern already ruled for HML money writes. **Portable by construction — do
not substitute native transactions even if this file ends up on a newer runtime.**

## 🚫 PII

**This repo is PUBLIC.** No real vendor-plus-amount pairs in fixtures, examples or renders.
A row here is a purchase Michael actually made from a business that actually exists.

## Open

- **Q6 · book-only ledger, or general purchase ledger?** 🔴 It decides whether
  `PurchaseLines.fkDocumentCopy` stays a real enforced key or becomes a polymorphic target.
  **The polymorphic version kills referential integrity and the relationship graph, and needs
  `ExecuteSQL` for every report.** Pick before the table is built, not after there are rows.
- URITP Inventory deferred its own `PURCHASES` / `PURCHASE_LINES` design. **Either this engine
  gets documented once and cloned, or there will be two purchase ledgers with no sync
  obligation** — the known cost of a cloned engine, already on the record for this app pair.
- No refunds, payments or currency-conversion history. Deliberately deferred; see
  [schema-notes.md](../schema-notes.md).

Full relationship context → [README.md](../relationships/README.md)
