# PurchaseLines

Manage → Database → Tables → PurchaseLines

Grain: **one thing in one order.** Three books in one order is three rows.

🔴 **A line points at a COPY, not at a work** — the reason
[DocumentCopies](./DocumentCopies.md) exists.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkPurchase | text-uuid | The order this belongs to | → Purchases | 🔴 the ONE write relationship |
| fkDocumentCopy | text-uuid | The specific object acquired | → DocumentCopies | 🔴 a copy, never a work |
| LineDescription | text | As printed on the receipt | | ⭐ keep even with the copy link |
| Quantity | number | Usually 1 | | ⚠️ >1 means multiple copies |
| UnitPrice | number | Per unit, before order charges | | |
| LineTotal | number | Quantity × UnitPrice | | ⚠️ stored AND validated |
| Notes | text | ex-library, damaged and discounted | | |

Audit fields → [data-standards.md](../data-standards.md).

## ⚠️ Quantity > 1 is a staging state, not a resting one

Three copies of one book = **three `DocumentCopies` rows** (independent locations, conditions and
lending states) and therefore **three lines of quantity 1.**

`Quantity` survives for a receipt that genuinely bundles ("lot of 12 assorted paperbacks, $20")
**before the copies are itemized.**

🔴 **The test is INDEPENDENT STATES, not physical identity.** Two copies of the same printing on two
shelves have independent states.

<!-- AGENT NOTE · why the line points at a copy, and why LineDescription stays.
You cannot buy a title. Buy the same book twice — a replacement, a travel paperback — and there are
two acquisitions of ONE bibliographic identity. A line pointing at Documents cannot tell them apart,
so the second purchase either overwrites the first in meaning or looks like a duplicate entry.
LineDescription is what the RECEIPT said; the copy record is your INTERPRETATION of it. They drift
for good reasons (a bundled lot, a mis-titled listing, a seller's abbreviation) and when they
disagree you want both, not a reconciliation you performed once and cannot reproduce.
The independent-states test is the same one used elsewhere in this workspace to decide
bulk-versus-itemized inventory tracking.
-->

## Rules

1. **Lines are written through the header**, in one block, per the FMP19 pattern on
   [Purchases](./Purchases.md). A line created elsewhere is an orphan waiting.
2. **`LineTotal` is stored and checked.** A stored total disagreeing with `Quantity × UnitPrice` is a
   finding, not a rounding artifact.
3. **No order-level charges here.**
4. 🚩 **A line with no `fkDocumentCopy` is incomplete, not a feature.** It happens during intake from a
   receipt; it belongs in a cleanup lens and must not become normal.

## 🔴 Open, and blocking this table

**Q6 · book ledger or general purchase ledger?**

`fkDocumentCopy` is a real enforced FK **only if every line is a document.** The moment a line must be
a scanner or a lighting fixture, the target becomes polymorphic (`TargetTable` + `TargetKey`), which
kills referential integrity, kills the relationship graph as a way of understanding the app, and
makes every report an `ExecuteSQL` exercise.

The alternative is an `AcquirableItems` supertable every purchasable thing registers in — **real
architecture, not a field.**

⚠️ **Pick before the table is built.** Retrofitting a polymorphic target onto rows that assumed a real
FK is the most expensive move in this design.

FK map → [relationships/README.md](../relationships/README.md)
