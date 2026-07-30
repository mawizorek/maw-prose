# Build sheet

*The page to open before a build session. Target state — what the file should be, not what it currently is. Written 2026-07-29, moved here 2026-07-30, and no part of it has been checked against the live file since 2026-06-15.*

The v1 target is narrow and worth saying up front, because it licenses most of the decisions below. **This is an instrument for one expert user to run the books in.** Not a demo, not the borrower's tool, not Dad's tool — he sees a presentable version after the data model has survived real use. So the audience for every call here is one person who already knows the schema, which is what makes ugly-but-correct a pass, and it is why FileMaker Go dropped out of scope entirely.

Scoped to the two or three screens that carry a month. Nothing else built.

## Build in this order, and the order is a correctness matter

First, **build the `ReceivedFunds` table**, and settle `Payment Received` in the transaction taxonomy while you are in there. That value exists purely to paper over the receipt table's absence, so once the table lands it is a redundant type that somebody will select by accident and put the same cash in two places.

Second, **build the rollback wrapper** — `txn_Begin`, `txn_Commit`, `txn_Rollback` in `00_APP`. Done means a deliberate mid-block failure rolls back *everything*, not most of it.

**That order is not a preference and getting it backwards produces silent corruption.** FileMaker 19 has no native transactions, so atomicity depends on every write in a transaction flowing through one relationship from one parent record — then a single `Revert Record` on that parent discards the whole set. The receipt *is* that parent. Build the wrapper first and the only candidate is the loan, so a check covering two loans has two parents and a revert reaches half of it. The routine still reports success. You would be shipping a rollback that leaves the money half-applied while telling you it protected you, and that is worse than having no rollback at all.

Third, **import the Golden Month fixture** and check the reconciliation. Unapplied cash must come out to exactly $850.00 and trace to one receipt. If it does not, the schema is wrong — not the fixture.

Fourth, **the ledger table views**: expected transactions, account transactions, the transaction taxonomy, payment instructions. Table view is a real user surface in this build rather than developer scaffolding, which means the column set, the column order and the formatting *are* the interface and get designed deliberately instead of accepted as whatever order the fields happen to sit in.

Fifth, **the loan hub** — expected transactions and account transactions as two portals on one screen. This is the month-of-work screen and the only one that has to be right for the tool to be usable at all.

Sixth, **the property hub**, which is just the loans portal. Small, but without it a property reads as an orphan, since the loan terms moved off the property in June.

Seventh, **the payoff print layout**, read-only. No portal — see below.

## The wrapper, and the parts that are not obvious

The three scripts are named `txn_*` and **there is no engine transaction underneath them.** Write that in the comments. A developer reading `txn_Commit` on FileMaker 19 will reasonably assume a native commit exists and will design against a guarantee that is not there.

Wrap `Set Error Capture [On]` around the block and check `Get(LastError)` after *every* write step rather than once at the end. And **no `Commit Records` anywhere inside the block** — that is the single most common way this pattern gets broken, because it does not fail, it just ends the transaction early and makes the preceding rows permanent.

Wrap it once. Hand-copying rollback logic into the payment-apply and the payoff-freeze means the second copy is where the bug lives.

It has to fail loudly. A wrapper that swallows an error to keep a routine moving is worse than none, because the caller believes the write landed.

**Two routines have to be atomic**: applying one payment across several owed items, and freezing a payoff snapshot. A half-applied payment is corrupt money data, and a partial freeze is a quote that silently changes after it was sent.

## Table view versus a built layout

Table view takes the surfaces where the work is bulk entry and review, which is most of the typing. It cannot show a parent record with its children, so the loan and property hubs stay built layouts — a parent-with-children screen in FileMaker is a portal, and that is what those two screens are.

Portals are the *cheap* layout here, which is the opposite of the intuition. A portal row is one object set that renders N records, so you style it once and it pays back on every row. The pill and badge families are the inverse — one object per state, each needing its own hide condition. That economics is why the two hubs are affordable and the decorated screens were not.

**No portal on payoffs.** A payoff is a frozen snapshot that went to a human being, and a portal is an editing surface by default. An editing surface over frozen data defeats the freeze. It wants a read-only print layout.

The documents portal is deferred — off the critical path for the month.

## Pages that are currently lying to you

Seven scripts are marked superseded in the script inventory, with the reason on each row. Five were written against the old property-parented schema before the loan won that argument; two are unverified.

They are **stamped rather than rewritten**, on purpose. Rewriting them before the receipt table was approved would have paid twice, because they were about to be wrong for a second reason. A stamp is legible debt and it discharges the obligation — which is more than can be said for the self-audit those pages carried since the 18th of June, sitting in a status table nobody reread for six weeks.

## What is deliberately not in v1

Documents, document versions, contacts and organizations. The naming-lock rename pass. Rewriting the seven superseded scripts. FileMaker Go. And resolving `PropertyExpectations`, which exists in the live file with about fourteen calculation fields, is absent from the canonical ten, was probably absorbed into the loan calculations, and has not been confirmed by anybody — so do not delete it and do not build against it.

## Two things that will bite and are not on the list above

The schedule generator walks months by incrementing the month number while keeping the origination day, which **overflows for a loan originated on the 29th through the 31st**. January 31st plus a month gives March 3rd. Wrong due dates, and therefore wrong schedule keys, which is the mechanism the generator's whole idempotence rests on. Every fixture loan originates on the 15th, 10th or 1st, so the fixture cannot catch it.

The ledger table views have **no approved object vocabulary** — a `tbl_*` family was proposed and has not been ruled on. So reviewing them means reviewing schema through an unstyled surface. Do not read unstyled as unfinished.

---

*If you read one paragraph: build the receipt table before the rollback wrapper, import the Golden Month, and confirm unapplied cash is exactly $850.00 traceable to a single receipt. The rest is detail.*
