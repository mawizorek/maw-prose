# Next build spec

*One file, overwritten each cycle. Where feature requests land instead of dying in chat. Current cycle: v2. Verified 2026-07-31.*

## Next build

Finish the canonical schema lock — the remaining rename and normalize items. Build the Global Setup utility layer. Build the `Loans`, `Payoffs` and `PaymentInstructions` infrastructure. Implement property intake, import and output workflows.

And the one with a design behind it: **date-scoped payoff**, which unblocks the fastest path from a balloon-note contract to an exported payoff at any date.

## Date-scoped payoff

### The problem

`calc_TotalOutstanding` and `calc_CurrentPayoffAmount` are **date-blind**. They sum every remaining expected row regardless of its due date and never touch `calc_perDiemInterest`. On a balloon note with nothing paid, an origination-dated payoff and a today-dated payoff return the identical undiscounted total, so the comparison that matters never diverges. **The per-diem accrual layer is the entire delta and nothing consumes it.**

### The happy path

One `Loans` record from the contract. Spawn the schedule: origination points at day zero, monthly interest anchored to the origination day-of-month, maturation fee, principal balloon at maturity. With no payments, `calc_amountPaid` is zero and `calc_remaining` equals the original amount on every row. Compute the payoff for a target date, freeze it into a `Payoffs` snapshot, export.

### The model

Payoff at date D is principal, plus fees and interest due on or before D, plus per-diem accrual for the partial period since the last scheduled interest date through D.

Build it as **one custom function** so as-of and good-through share the exact same arithmetic. Two implementations of one formula is how the two figures start disagreeing.

`fn_PayoffForDate ( loanID ; targetDate )` returns a number:

```
Let (
[
  _principal = ExecuteSQL (
    "SELECT calc_CurrentPrincipalBalance FROM Loans WHERE PrimaryKey = ?" ; "" ; "" ; loanID ) ;

  // fees + scheduled interest already due on/before target date, still unpaid.
  // Excludes the principal-balloon row (principal counted above) to avoid double-count.
  _dueItems = ExecuteSQL (
    "SELECT COALESCE(SUM(CASE WHEN et.AmountAdjusted IS NOT NULL THEN et.AmountAdjusted ELSE et.OriginalAmount END),0) " &
    "- COALESCE(SUM(pa.AmountApplied),0) " &
    "FROM ExpectedTransactions et " &
    "LEFT JOIN PaymentApplications pa ON et.PrimaryKey = pa.fkExpectedTransaction " &
    "JOIN Standard_Transactions st ON et.fkStandardTransaction = st.PrimaryKey " &
    "WHERE et.fkLoan = ? AND et.DueDate <= ? AND st.Name <> 'Principal'" ;
    "" ; "" ; loanID ; targetDate ) ;

  // last scheduled interest DueDate on/before target date (per-diem stub start).
  // Falls back to origination/closing base if no interest row has come due yet.
  _lastInterestDue = ExecuteSQL (
    "SELECT MAX(et.DueDate) FROM ExpectedTransactions et " &
    "JOIN Standard_Transactions st ON et.fkStandardTransaction = st.PrimaryKey " &
    "WHERE et.fkLoan = ? AND st.Name = 'Interest Payment' AND et.DueDate <= ?" ;
    "" ; "" ; loanID ; targetDate ) ;

  _base = ExecuteSQL (
    "SELECT COALESCE(ClosingDate, OriginationDate) FROM Loans WHERE PrimaryKey = ?" ; "" ; "" ; loanID ) ;

  _stubStart = Case ( not IsEmpty ( _lastInterestDue ) ; GetAsDate ( _lastInterestDue ) ; GetAsDate ( _base ) ) ;
  _perDiem = ExecuteSQL ( "SELECT calc_perDiemInterest FROM Loans WHERE PrimaryKey = ?" ; "" ; "" ; loanID ) ;
  _stubDays = Max ( 0 ; GetAsDate ( targetDate ) - _stubStart ) ;
  _stubInterest = GetAsNumber ( _perDiem ) * _stubDays
] ;
  GetAsNumber ( _principal ) + GetAsNumber ( _dueItems ) + _stubInterest
)
```

### What consumes it

Two unstored calculations on `Loans`. `calc_PayoffAsOf` passes `AsOfDate` — the payoff's effective date and the figure that gets exported. `calc_PayoffGoodThrough` passes `GoodThroughDate`, which is the as-of date plus a float buffer for wire or mail lead time; per-diem keeps running, so the quote stays valid through that date.

At origination the stub is zero days, so the payoff is principal plus origination points. At the current date the stub accrues per-diem times elapsed days. **That linear per-diem layer is the origination-versus-current delta the whole comparison is about.**

### Freezing it

`AsOfDate` takes the as-of date and `TotalPayoffAmount` takes the frozen figure, with `GoodThroughDate` and its own frozen figure captured at issue. `PayoffDisplayDate` is statement display only, and `CreationTimestamp` covers when the record was generated. Frozen values in, live recompute out.

### Blockers specific to this build

🔴 **`fkCurrentPayoff` must be empty during live computation** or `calc_TotalOutstanding` and `calc_CurrentPayoffAmount` short-circuit to the prior frozen payoff and return last month's number as if it were current.

**Field-naming drift is blocking.** The function text uses `OriginalPrincipal`, `InterestRateAnnual` and `ClosingDate`. Whether the live file agrees has never been confirmed.

Confirm the `Standard_Transactions::Name` values used in the SQL — `Principal` and `Interest Payment` — match the file exactly, because the `st.Name` filters depend on the literal strings and a mismatch returns empty rather than erroring.

## In review

The `PaymentInstructions` record-based rebuild, specifically whether the signature is a container on the table or a reference into the document module.

## Futures

A reporting layer beyond the core lifecycle. Two-way ClickUp sync, explicitly not v1.

## Standing guardrails

Property-first UX, loan-first schema — do not re-parent transactions onto the property. Payoffs are frozen snapshots and an issued one is never recomputed. Publish is one-way, FileMaker to ClickUp, button-driven in v1. Single file, single user, local-first unless a real constraint forces a split.
