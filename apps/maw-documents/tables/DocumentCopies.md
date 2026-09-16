# DocumentCopies

Manage → Database → Tables → DocumentCopies

Grain: **one object you hold.** This hardcover on this shelf. This PDF on this disk. The
water-damaged paperback you replaced. One row per physical or digital object, not per title.

⭐ **This is the layer FRBR/LRM calls the Item and BIBFRAME calls Item, and it is the layer
every real library system attaches circulation to.** Condition, location, acquisition and
lending all live here, and none of them can live on [Documents](./Documents.md).

## Why it exists — the argument, because it was nearly built without one

**You cannot say "I bought this book on this date for this amount" about a title.** A title
is an abstraction; you bought a specific physical object that arrived on a date in a
condition. The purchase ledger request is what made this table load-bearing rather than
optional — it answered the open question by implication.

Buy the same book twice — replacing a damaged copy, or a paperback for travel — and there
are **two acquisitions of one bibliographic identity**, which a title-only model literally
cannot represent.

⚠️ This rests on an inferred reading of Michael's intent (Q5 on the log, left unstruck
pending confirmation). **If that read is wrong, this table and
[Purchases](./Purchases.md) both change shape.**

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkDocument | text-uuid | The work this is a copy OF | → Documents | |
| Format | text | Hardcover / Paperback / PDF / EPUB / Photocopy / Scan | | ⚠️ value-list controlled |
| fkStorageLocation | text-uuid | Where it physically or logically lives | → StorageLocations | ⚠️ table is phase-2, not yet cut |
| Condition | text | New / Good / Worn / Damaged / Ex-library | | ⚠️ value-list controlled; snapshot, not history |
| AcquiredDate | date | When it came into your possession | | |
| AcquisitionMethod | text | Purchased / Gift / Inherited / Library discard / Found / Comp copy | | 🔴 load-bearing. See below |
| IsPrimaryCopy | number | 1 = the copy to open or reach for first | | ⚠️ at most one per document; script-enforced, not FMP-enforced |
| Notes | text | Marginalia, provenance, what is wrong with it | | |
| calc_IsOnLoan | (c→Number) | 1 when an open CopyLoans row exists | → CopyLoans | 🔴 UNSTORED. Never a stored flag |
| calc_CurrentHolder | (c→Text) | Who has it, from the open loan row | → CopyLoans | 🔴 UNSTORED |

Audit fields on every table → [data-standards.md](../data-standards.md).

## 🔴 `AcquisitionMethod` is not a nice-to-have

Without it, a copy with no [PurchaseLines](./PurchaseLines.md) row is **indistinguishable
from a copy whose receipt you never entered.** A gift reads as missing data forever.

One controlled field turns a silent gap into a stated fact. **Only `Purchased` is expected
to carry a purchase line**, and that expectation is what makes an unlinked purchased copy a
real finding rather than noise.

## 🚩 `LentTo` was specified here and struck the same day

It was a single field holding the current borrower. **A scalar standing in for a history:**
the previous loan is destroyed the moment the next one starts, and nothing records that it
happened.

Same shape as the `fkPeopleJoins` shortcut struck on `Documents`. Possession over time is
[CopyLoans](./CopyLoans.md) — append-only rows with a validity span — and current state is
the unstored calc above.

**The general rule, third application in this app:** a relationship carrying a value AND a
clock is a join row with a lifecycle, never a flag.

## Business rules

1. **A copy of a digital work is still a copy.** A PDF is a copy with `Format = PDF` and a
   storage location. It is not a special case, and treating it as one is how a second
   parallel model starts.
2. **`Condition` is a snapshot.** Condition-change history is deliberately deferred until
   this table has real rows. When it arrives it is a child table, not more fields here.
3. **Zero copies is legitimate.** A work you know about, have read, or want, with nothing
   held. That is a catalogue entry with no item — exactly how a library records a work it
   does not own.
4. **Do not put bibliographic facts here.** ISBN and publisher belong to the edition, on
   [BibliographicDetails](./BibliographicDetails.md), even though the ISBN is printed on the
   object in your hand.

## Open

- **Q7 · does a copy you possess but do NOT own belong here?** A borrowed library book, a
  colleague's script, a publisher's desk copy. If yes, `AcquisitionMethod = Borrowed` plus a
  `CopyLoans` row with the inbound direction. **Unresolved, and it decides whether "how many
  books do I own" needs a filter.**
- `StorageLocations` is unbuilt, so `fkStorageLocation` has nothing to point at yet.
  Containers, shelves and bins are its rows.
- Whether `IsPrimaryCopy` and the design page's `PreferredForOpen` on the variant layer are
  the same idea at two grains. ⚠️ **Likely overlap; resolve before both are built.**

Full relationship context → [README.md](../relationships/README.md)
