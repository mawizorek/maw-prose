# HML_LLC — the FileMaker solution

*Private-money real-estate loan servicing. Runtime is FileMaker 19, permanently. Content moved here from `ClickUp_apps/filemaker/hml-llc/` on 2026-07-30; schema last verified against the live file 2026-06-15, which is the number that matters and it is six weeks old.*

This is the loan-servicing solution — the thing that knows which borrower owes what, what came in, and what a payoff quote said on the day it was sent. If you are picking this up cold, read `build-sheet.md` first. It is the one page that tells you what to do when you sit down, and everything else here is detail you reach for from it.

## The one thing to understand before anything else

**A loan is the financial parent, not a property.** That sounds obvious and it was wrong in this file for months. A property is collateral — a building. A loan is a note with its own terms, and one property can carry several of them, which is exactly the case that broke the original design. Every ledger row hangs off the loan.

And above the ledger there is a receipt. When a check arrives, the thing that happened in the world is *a check arrived* — one amount, the amount the bank saw. That check might cover interest on two different loans, or arrive with an illegible memo and belong to nothing yet. So a payment is an **event** that spawns statement lines, not a statement line pretending to be an event. That is `ReceivedFunds`, it is the tenth table, and it was approved on 2026-07-29 after the schema and the script plan were read against each other and found to disagree about how many tables existed.

## The menus

The folders here mirror FileMaker's own *Manage* menu, so opening this package should feel like opening the file.

**`tables/`** — one note per table. Each one leads with its grain, which is the sentence answering *what does one record mean* — and getting that sentence wrong is how every mistake in this schema started. `AccountTransactions` is not a cash ledger, it is a line on a borrower-facing statement; nobody wrote that down, so it got used as a ledger for months.

**`scripts/`** — mirrors the eleven-folder script workspace: `00_APP`, `10_UI`, `20_NAV`, `30_CONTEXT`, `40_BINDER`, `50_RECEIPTS`, `60_PAYMENTS`, `70_SCHEDULE`, `80_PAYOFF`, `90_ADMIN`, `zz_DEV_ARCHIVE`. Those names are FileMaker's, so they keep their casing. A `.fmscript` in here is a **copy target** — you type it in by hand — and its status and history live in a `.notes.md` beside it. Do not paste a changelog into a script.

**`relationships/`** — the graph. The one that carries weight is `ReceivedFunds` to `AccountTransactions`, because on FileMaker 19 every write in a transaction has to flow through one relationship from one parent record, and that is the parent.

**`calculations/`** — one `.fmcalc` per calculation field. Those paste back into the calculation dialog verbatim, unlike the scripts.

**`fixtures/golden-month/`** — a worked month of one borrower as importable TSV, deliberately ugly. Read its own README before importing or you will silently destroy it: `PrimaryKey` is auto-enter UUID with modification prohibited, so an as-is import throws every key away, and it fails quietly with rows landing and portals coming up empty.

## Why FileMaker 19 shapes everything

FileMaker 19 has no transactions. `Open Transaction`, `Commit Transaction` and `Revert Transaction` all arrived in FileMaker 2023, verified against the Claris 20.1.2 release notes rather than assumed. So atomicity here is the old pattern: hold one parent record uncommitted, do every write through a relationship from it, and a single `Revert Record` on the parent throws the whole set away.

That has two consequences worth carrying in your head, because both of them are the kind of thing that produces a ledger which looks fine and is wrong.

The first is that **the receipt table has to exist before the rollback wrapper does.** Build the wrapper first and the only parent available is the loan — so a check spanning two loans has two parents, and a revert can only reach half of it. You would ship a rollback that silently reverts partially, which is worse than no rollback, because you believe you were covered.

The second is that **a stray `Commit Records` anywhere inside a write routine ends the transaction early.** Everything before it becomes permanent while the wrapper still reports success. The payment-application routine currently does this twice per row inside its loop, which is the single most important thing to strip when it gets rewritten.

## Where the money math must not move

A payoff quote is a number you sent to a human being. Once it is issued, nothing downstream may change it — not a payment posting two days later, not a recalculation. That is why the payoff figures are frozen onto the record instead of computed live, and it is why the payoff screen is a read-only print layout rather than a portal. A portal is an editing surface by default, and an editing surface over frozen data defeats the entire point of freezing it.

## Migration status, honestly

This package is **partial**. What is here: this map and the build sheet. What is still in `ClickUp_apps/filemaker/hml-llc/`: the table notes, the script bodies and their sidecars, the relationship notes, the calculations, and the fixture.

**Nothing has been deleted from the old location**, and nothing will be until its replacement is verified here. Deleting a source before its replacement exists is how content actually gets lost — there is a standing example in this repo already, where thirty Vectorworks files stayed put for exactly this reason.

The remaining move is mechanical rather than a design problem. The design questions were settled on 2026-07-28 and 07-29 and they are in `DECISIONS.md`.

## Open, and these are real

The schedule generator has a **date-overflow bug** that nothing currently catches. It walks months by adding one to the month number and keeping the origination day, which overflows for a loan originated on the 29th through 31st — January 31st plus a month lands on March 3rd. That produces wrong due dates and therefore wrong schedule keys, which breaks the idempotence the whole generator rests on. All three fixture loans originate on the 15th, 10th and 1st, so **the fixture cannot see it**, which is precisely why it survived.

`Payment Received` in the transaction taxonomy is now a **double-counting risk**. That value exists to paper over the receipt table's absence; with the table in place it is a redundant type somebody will pick by accident, putting the same cash in two places.

Three tables still have two spellings each, and the pre-SQL naming lock has not been done. That is inert until SQL calculation text starts referencing them, at which point it becomes a bug factory.

And `PropertyExpectations` exists in the live file with roughly fourteen calculation fields while being absent from the canonical ten. It was probably absorbed into the loan calculations. Nobody has confirmed it, so do not delete it and do not build against it.

*Questions about any of this go to the HML_LLC FileMaker v1 Decision Log in ClickUp, not into a file here.*
