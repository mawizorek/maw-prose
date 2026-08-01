# Calculations

*Every calculation-field formula body in the app, one file per calc. Verified 2026-07-31.*

These are **copy targets**, and unlike a `.fmscript` they genuinely round-trip: copy the file, paste into the FileMaker calculation dialog, paste back out unchanged. The two `//` header lines are FileMaker comments and travel with the formula harmlessly, so the whole file pastes clean.

Filenames are `<Table>__<FieldName>.fmcalc`, with a double underscore as the namespace separator. Calc field names are not globally unique in FileMaker — several tables can each have a `calc_remaining` — so the table prefix is what stops a collision.

The formula lives here and nowhere else. Table notes name their calc fields with return type and stored flag; they do not restate the bodies.

## What is here

**`ExpectedTransactions`** — four. `calc_amountPaid` sums applications, `calc_remaining` subtracts that from the adjusted-or-original amount, `calc_lateAfterDate` resolves the grace window with a row override beating the loan default, and `calc_islate` reads both. That chain is why the schedule needs no paid/unpaid flag.

**`GLOBAL_USE_VARIABLES`** — four file-info helpers. Trivial, and `calc_fileSizeMB` is deliberately numeric with the unit appended in display only, so nothing downstream has to parse "MB" out of a number.

**`Loans`** — eleven, and this is the app's arithmetic. Two of them, `calc_TotalOutstanding` and `calc_CurrentPayoffAmount`, both check for a frozen payoff first and fall back to a live computation. **That fallback is the reason `Loans.fkCurrentPayoff` must be empty while a live payoff is being computed** — leave it set and both calcs short-circuit to last month's frozen number and return it as if it were current.

## Two names that are not synonyms

**`calc_NextDueDate` and `calc_NextMaturityDate` mean different things** and reading one as the other produces a wrong payoff. The first is the next date something is collectible — a query for the earliest upcoming expected row. The second is a maturity milestone computed from the closing or origination date plus the maturation term. A loan can be months from maturity and have interest due next week.

This was recorded once in an index that has since been retired, which is exactly the kind of fact that vanishes in a reorganization.

## Two things worth knowing before editing any of them

**`ExecuteSQL` embeds table and field names as text.** `calc_amountPaid` queries `PaymentApplications`, `calc_lateAfterDate` queries `Loans`, `calc_NextDueDate` queries `ExpectedTransactions`, and both payoff calcs query `Payoffs`. A rename in Manage Database does not update them, and SQL against a wrong table name **returns empty rather than erroring**. This is the concrete reason table names get locked before any SQL is written.

**Stored versus unstored is load-bearing, not a performance knob.** Anything reading related records or `Get(CurrentDate)` has to be unstored or it freezes at its first evaluation. `calc_islate` stored would mean a row that was on time yesterday is on time forever.

## Not here

`PropertySUMMARIES::countNumDocuments` has a body recorded on its table note rather than a file here, because **its existence is unconfirmed** — flagged in July as possibly present only in an old index. If the live file has it, it gets a real `.fmcalc` like everything else.
