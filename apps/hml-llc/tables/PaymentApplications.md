# PaymentApplications

*The join. 🔨 BUILT · verified in file 2026-07-14. Field register reconciled 2026-07-31.*

**Grain: one act of assigning $X of a receipt to one owed item.** Join facts only — never copy parent metadata down into it.

`AmountApplied` being independent of both parents is the point of the table. It is what makes partial payment expressible: $400 landing against $850 owed is one row here, and the remainder is computed rather than flagged. A schema that could not do this would need a paid/unpaid boolean on the schedule, and would then have to lie about every partial month.

This is also the table that makes the atomicity requirement real. Applying one receipt across several owed items is a multi-record write, and half of it landing is corrupt money data rather than a UI glitch.

## Fields

| Field | Type | Key | Category |
|---|---|---|---|
| PrimaryKey | text-uuid | pk | key |
| CreationTimestamp | timestamp | audit | audit |
| CreatedBy | text | audit | audit |
| ModificationTimestamp | timestamp | audit | audit |
| ModifiedBy | text | audit | audit |
| fkExpectedTransaction | text-uuid | fk | key |
| fkAccountTransaction | text-uuid | fk | key |
| AmountApplied | number | plain | detail |
| AppliedTimestamp | timestamp | plain | detail |

## Relationships

`fkExpectedTransaction` → `ExpectedTransactions` and `fkAccountTransaction` → `AccountTransactions`, both many-to-one and both locked. Those are the two sides of the join and there is nothing else.

## Open

Keep it lean. Add a field only when the real application workflow demands one — a join table that accretes columns has usually started duplicating a parent.
