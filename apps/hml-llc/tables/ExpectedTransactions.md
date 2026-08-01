# ExpectedTransactions

*The schedule. 🔨 BUILT · verified in file 2026-07-15. Field register reconciled 2026-07-31, including four calc fields recovered from the retired schema JSON.*

**Grain: one thing the borrower owes, on a date.** A promise, not a payment. Early design called this `LoanSchedule` and that name is a better description of what it is — everything the loan expects to collect, laid out in time.

The amount pattern is the part that catches people. `OriginalAmount` is what was assessed and `AmountAdjusted` is what will actually be collected, and they are deliberately two fields rather than one editable number. That is what lets the file say *the late fee was $42.50, we collected nothing, on purpose* — a waiver that erases the original amount destroys the fact that a fee was ever assessed. The fixture's `EXP-004` exists to test exactly this.

Do not reintroduce `AmountExpected`. One amount family, two fields, no synonyms.

## Fields

| Field | Type | Key | Category | Notes |
|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | UUID, auto-enter |
| CreationTimestamp | timestamp | audit | audit | |
| CreatedBy | text | audit | audit | |
| ModificationTimestamp | timestamp | audit | audit | |
| ModifiedBy | text | audit | audit | |
| fkLoan | text-uuid | fk | key | authoritative parent |
| fkStandardTransaction | text-uuid | fk | key | what kind of thing is owed |
| fkStatus | text-uuid | fk | key | Outstanding / Paid / Partially Paid / Waived |
| DueDate | date | plain | detail | anchored to the origination day-of-month |
| OriginalAmount | number | plain | detail | canonical expected amount; for late fees, the calculated 5% |
| AmountAdjusted | number | plain | detail | what to actually collect; supports waiver and discount |
| AdjustmentReason | text | plain | detail | optional |
| AdjustmentStatus | text | plain | detail | Normal / Discounted / Waived |
| SequenceNumber | number | plain | detail | 1..n per loan; enforces uniqueness |
| GraceDaysOverride | number | plain | detail | row-level override, else falls back to Loans.GraceDays |
| Notes | text | plain | detail | |

### Calculations (4)

| Field | Returns | Stored |
|---|---|---|
| calc_amountPaid | Number | no |
| calc_remaining | Number | no |
| calc_lateAfterDate | Date | no |
| calc_islate | Number | no |

Formula bodies are one `.fmcalc` per field in `../calculations/`. Like the `Loans` set, **this inventory lived only in the retired schema JSON** and is recovered here.

`calc_remaining` is why this table has no paid/unpaid flag. Partial payment is normal in private lending, and a boolean cannot express $400 against $850 owed — the fixture's `APP-003` is that case.

## Relationships

`fkLoan` points at `Loans` and `fkStandardTransaction` at `Standard_Transactions`, both locked. Joined to the actual money through `PaymentApplications.fkExpectedTransaction`.

## Open

Confirm `fkStatus` resolves to a real status record rather than text.
