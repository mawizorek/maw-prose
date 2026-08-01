# Payoffs

*Frozen quotes. 🔨 BUILT · verified in file 2026-07-14. Field register reconciled 2026-07-31.*

**Grain: one quote that was sent to a human.** Frozen, never recomputed. This is an allowed denormalized snapshot table, and the denormalization is the feature rather than a compromise.

The freeze is the whole design. Once a payoff figure goes to a borrower, nothing downstream may change it — not a later payment posting, not an edit to the payment instructions, not a recalculated per-diem. `TotalPayoffAmount` and `FrozenPaymentInstructions` are copies taken at issue and they stay copies. The fixture tests this directly: `PAYOFF-001` is issued on 03-18 and `ACCT-004` posts on 03-20, and the frozen total must not move.

That same freeze has a consequence nobody anticipated until it bit. **A frozen field does not receive corrections to its source**, which is correct behaviour for a payoff quote and also means that scrubbing a value out of `PaymentInstructions` does not reach the snapshot. A real name survived two days in a public repo that way. Remediating a value means sweeping every table that snapshots it.

Four dates live on this table and they are genuinely four different facts. `CreationTimestamp` is when the record was generated. `IssueDate` is when it went out. `AsOfDate` is the date the figure is computed against. `PayoffDisplayDate` is what prints on the statement. `GoodThroughDate` is when the quote expires and per-diem stops running. Collapsing any two of them produces a quote that is wrong in a way nobody notices.

## Fields

| Field | Type | Key | Category | Notes |
|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | |
| CreationTimestamp | timestamp | audit | audit | when the record was actually generated |
| CreatedBy | text | audit | audit | |
| ModificationTimestamp | timestamp | audit | audit | |
| ModifiedBy | text | audit | audit | |
| fkLoan | text-uuid | fk | key | |
| IsCurrent | number | plain | version | current/version marker |
| IssueDate | date | plain | detail | |
| AsOfDate | date | plain | detail | the figure is computed as of this date |
| PayoffDisplayDate | date | plain | detail | statement display date, not a prepared timestamp |
| GoodThroughDate | date | plain | detail | validity endpoint; per-diem runs through this date |
| TotalPayoffAmount | number | plain | frozen | frozen. Read by Loans.calc_CurrentPayoffAmount and calc_TotalOutstanding |
| FrozenPaymentInstructions | text | plain | frozen | snapshot of PaymentInstructions at issue |

## Relationships

`fkLoan` → `Loans`, locked. `Loans.fkCurrentPayoff` points back here, pending — and that back-pointer is the field that must be empty during a live payoff compute or the calcs short-circuit to the previous frozen quote.

The payment instructions are copied at issue rather than related. That is deliberate: a relationship would let a later edit change a quote that has already been sent.

## Open

Decide the freeze format for `FrozenPaymentInstructions` — full text snapshot or structured JSON. Text is simpler and JSON survives a layout change; nobody has ruled.

This table gets a read-only print layout and **no portal**. A portal is an editing surface by default, and an editing surface over frozen data defeats the only thing the table is for.
