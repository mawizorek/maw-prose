# Architecture notes

*The non-obvious technical decisions, and why reversing one would be a regression rather than a preference. Verified 2026-07-31.*

**The data model is loan-first even though the navigation is property-first.** A person starts at a building and drills into its note; the schema parents every financial record on `Loans`. `fkProperty` was deliberately removed from both transaction tables once `fkLoan` was established, and re-parenting them onto the property is not a refactor, it is the original bug. The property hub's `Loans` portal is what makes the two orientations agree — without it a property reads as an orphan, since its loan terms live somewhere else now.

**Payoffs are frozen, and the freeze is structural rather than a convention.** An issued payoff stores its own amounts and its own snapshot of the payment instructions as of the moment it was sent. Later edits to `PaymentInstructions` must never reach an issued quote. This is the actual reason `PaymentInstructions` is a real record table instead of globals: a payoff snapshots *from* it, and you cannot snapshot from a global.

**One control table, and it holds state rather than data.** `GLOBAL_USE_VARIABLES` is the single one-record app-state table — session context like the current property, the current loan and the hub mode, all as `g_` globals. The moment something relates to it, it has stopped being state.

**The publish boundary is one-way and manual.** FileMaker is the system of record for property and payment truth. Publishing to ClickUp is button-driven in v1, with no middleware and no webhook layer, and there is no two-way sync. ClickUp owns the human operational workflow; FileMaker owns the money.

**Single file, single user, local-first**, until a concrete constraint forces otherwise. Not a philosophy — just the absence of a reason to pay for anything else yet.
