# Organizations

*Party records. 🥇 GOLDEN — parked, out of v1 scope. Verified 2026-07-31.*

**Grain: one company or entity.**

Parked, and genuinely undesigned — only the primary key is settled. The open question is scope rather than fields: if the file only ever holds borrowers, this is `Borrowers` and the name should say so. If it holds anyone the LLC transacts with, it is `Organizations`. The lean is toward `Organizations`, on the reasoning that a narrower name is the harder one to widen later.

Rename `CRM` to whichever wins before any `ExecuteSQL` references it.

## Fields

| Field | Type | Key | Category |
|---|---|---|---|
| PrimaryKey | text-uuid | pk | key |

The full field set and the audit quad are unenumerated. Listing plausible ones here would make the table look designed when it is not.

## Relationships

Referenced by `Loans.fkBorrower` (pending) and `PropertySUMMARIES.fkBorrower` (under review). `ReceivedFunds.fkBorrower` will point here too, nullable.

## Open

The scope decision above, then the field set.
