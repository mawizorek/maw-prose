# DocumentCopies

Manage → Database → Tables → DocumentCopies

Grain: **one object you hold.** This hardcover on this shelf. This PDF on this disk. The
water-damaged paperback you replaced.

⭐ **The FRBR/LRM Item layer** — condition, location, acquisition and lending all attach here, and
none of them can live on [Documents](./Documents.md). **You cannot buy a title.**

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkDocument | text-uuid | The work this is a copy OF | → Documents | |
| Format | text | Hardcover / Paperback / PDF / EPUB / Scan | | ⚠️ value-list controlled |
| fkStorageLocation | text-uuid | Where it lives | → StorageLocations | ⚠️ table not yet built |
| Condition | text | New / Good / Worn / Damaged / Ex-library | | ⚠️ snapshot, not history |
| AcquiredDate | date | When it came into your possession | | |
| AcquisitionMethod | text | Purchased / Gift / Inherited / Library discard / Comp | | 🔴 load-bearing |
| IsPrimaryCopy | number | 1 = reach for this one first | | ⚠️ one per document, script-enforced |
| Notes | text | Marginalia, provenance, what is wrong with it | | |
| calc_IsOnLoan | (c→Number) | 1 when an open CopyLoans row exists | → CopyLoans | 🔴 UNSTORED |
| calc_CurrentHolder | (c→Text) | Who has it | → CopyLoans | 🔴 UNSTORED |

Audit fields → [data-standards.md](../data-standards.md).

## 🔴 `AcquisitionMethod` is not a nice-to-have

Without it, a copy with no purchase line is **indistinguishable from a copy whose receipt was never
entered.** A gift reads as missing data forever. Only `Purchased` is expected to carry a line.

## 🚩 `LentTo` was specified here and struck

A single field holding the current borrower destroys the previous loan on the next one. Possession
over time is [CopyLoans](./CopyLoans.md).

<!-- AGENT NOTE · the general rule this is the third instance of.
A relationship carrying a VALUE and a CLOCK is a join row with a lifecycle, never a flag. LentTo
was a scalar standing in for a history — same shape as the fkPeopleJoins shortcut struck on
Documents, and as any stored "is it out" flag.
WHY THIS TABLE EXISTS AT ALL (Q5, inferred not stated): the purchase-ledger request made it
load-bearing. Buy the same book twice — a replacement, a travel paperback — and there are two
acquisitions of ONE bibliographic identity, which a title-only model cannot represent. If Michael
rejects that read, this table and Purchases both change shape.
-->

## Rules

1. **A copy of a digital work is still a copy.** A PDF is `Format = PDF` plus a location, not a
   special case.
2. **`Condition` is a snapshot.** Change history is deferred; when it arrives it is a child table.
3. **Zero copies is legitimate** — a work you know about and do not hold.
4. **No bibliographic facts here.** ISBN and publisher belong to the edition, even though the ISBN
   is printed on the object in your hand.

## Open

- **Q7 · does a copy you possess but do NOT own belong here?** A borrowed library book, a colleague's
  script, a publisher's desk copy. If yes: `AcquisitionMethod = Borrowed` + an inbound `CopyLoans`
  row. **It decides whether "how many books do I own" needs a filter.**
- `StorageLocations` is unbuilt, so `fkStorageLocation` has nothing to point at.
- ⚠️ `IsPrimaryCopy` may overlap the variant layer's `PreferredForOpen`. **Resolve before both are
  built.**

FK map → [relationships/README.md](../relationships/README.md)
