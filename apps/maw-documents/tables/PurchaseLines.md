# PurchaseLines

Manage → Database → Tables → PurchaseLines

Grain: **one thing in one order.** Three books in one order is three rows.

🔴 **A line points at a COPY, not at a work.** That is the load-bearing decision in this table
and the reason [DocumentCopies](./DocumentCopies.md) exists.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkPurchase | text-uuid | The order this line belongs to | → Purchases | 🔴 the ONE relationship all writes route through |
| fkDocumentCopy | text-uuid | The specific object acquired | → DocumentCopies | 🔴 a copy, never a work. See below |
| LineDescription | text | As printed on the receipt | | ⭐ keep even when the copy link exists |
| Quantity | number | Usually 1 | | ⚠️ quantity > 1 means multiple copies. See below |
| UnitPrice | number | Price per unit before order-level charges | | |
| LineTotal | number | Quantity × UnitPrice | | ⚠️ stored, but VALIDATED against the product. Never assumed |
| Notes | text | ex-library, cover damaged and discounted, etc. | | |

Audit fields on every table → [data-standards.md](../data-standards.md).

## 🔴 Why the line points at a copy

**You cannot buy a title.** A title is an abstraction. You bought a specific physical object
that arrived on a date in a condition — the FRBR/LRM **Item**.

The consequence is what makes it worth insisting on: **buy the same book twice** (replacing a
water-damaged copy, or a paperback for travel) **and there are two acquisitions of one
bibliographic identity.** A line pointing at `Documents` cannot tell them apart, so the second
purchase either overwrites the first in meaning or looks like a duplicate entry.

## ⭐ Keep `LineDescription` even when the copy link exists

It is what the receipt said, and the receipt is the evidence. The copy record is your
interpretation of it.

They drift for good reasons — a bundled lot, a mis-titled listing, a seller's abbreviation —
and when they disagree you want both, not a reconciliation you performed once and cannot
reproduce. **A transcription and an interpretation are different facts.**

## ⚠️ Quantity > 1 is a trap worth naming

If you bought three copies of one book, that is **three `DocumentCopies` rows** — they have
independent locations, conditions and lending states — and therefore **three lines of quantity
1**, not one line of quantity 3.

`Quantity` survives for the case where the receipt genuinely bundles things (a lot of 12
assorted paperbacks for $20) **and the copies have not been itemized yet.** That is a staging
state, not a resting state.

🔴 **The test for whether things deserve individual rows is whether they have INDEPENDENT
STATES, not whether they are physically identical.** Two copies of the same printing on two
different shelves have independent states. That is the same test used elsewhere in this
workspace to decide bulk-versus-itemized inventory tracking.

## Business rules

1. **Lines are written through the header**, in one block, per the FMP19 atomicity pattern on
   [Purchases](./Purchases.md). A line created outside that block is an orphan waiting.
2. **`LineTotal` is stored and checked.** Undocumented arithmetic is how a ledger goes quietly
   wrong; a stored total that disagrees with `Quantity × UnitPrice` is a finding, not a rounding
   artifact.
3. **No order-level charges here.** Shipping and tax belong to the header and are never
   apportioned onto lines by hand.
4. 🚩 **A line with no `fkDocumentCopy` is incomplete, not a feature.** It happens during intake
   from a receipt before the copies are catalogued. It belongs in a cleanup lens, and it must
   not become the normal state.

## 🔴 Open, and blocking the build of this table

**Q6 · is this a book ledger or a general purchase ledger?**

`fkDocumentCopy` is a real, enforced foreign key **only if every line is a document.** The
moment a line must be a scanner, a shelf or a lighting fixture, the target becomes polymorphic
— a `TargetTable` + `TargetKey` pair — which:

- kills referential integrity,
- kills the relationship graph as a way of understanding the app, and
- makes every report an `ExecuteSQL` exercise.

**The alternative is an `AcquirableItems` supertable that every purchasable thing registers
in.** That is real architecture, not a field, and it is a different app's decision.

⚠️ **This fork has to be picked before the table is built.** Retrofitting a polymorphic target
onto rows that assumed a real FK is the most expensive move available in this design.

Full relationship context → [README.md](../relationships/README.md)
