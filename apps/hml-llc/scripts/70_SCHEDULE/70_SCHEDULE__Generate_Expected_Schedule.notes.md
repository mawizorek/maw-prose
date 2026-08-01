# 70_SCHEDULE__Generate_Expected_Schedule

*🥇 GOLDEN. Loan-centered and correct on the thing that broke the other scripts. Two open defects below — read them before typing this in. Verified 2026-07-31.*

Copy text: [`70_SCHEDULE__Generate_Expected_Schedule.fmscript`](70_SCHEDULE__Generate_Expected_Schedule.fmscript)

## Open 1 — the date-overflow bug

This one is subtle and it breaks identity.

```
Set Variable [ $due ; Date ( Month ( $due ) + 1 ; $day ; Year ( $due ) ) ]
```

FileMaker rolls month 13 into January, so year-crossing is fine. **The problem is `$day`.** For a loan originated on the 29th, 30th or 31st, this overflows into the *following* month whenever the target month is short: origination on the 31st gives `Date(2; 31; 2026)`, which resolves to **March 3**, not February 28. The 30th gives March 2, the 29th gives March 1.

So the due dates drift forward and — because `ScheduleKey` is built from the sequence number rather than the date — **the row identity silently stops matching the intended month.** A re-run then creates a second row for what should be the same obligation, which defeats the entire idempotence design.

A clamp would fix it, and it is not applied because changing date identity changes keys, which is Michael's call:

```
Let ( [ _m = Month ( $due ) + 1 ; _y = Year ( $due ) ;
        _lastDay = Day ( Date ( _m + 1 ; 1 ; _y ) - 1 ) ] ;
  Date ( _m ; Min ( $day ; _lastDay ) ; _y )
)
```

⚠️ **Why it was invisible: all three fixture loans originate on the 15th, 10th and 1st, so none of them trip it.** A test suite that cannot fail is how this survived. To see it, add a loan originated on the 31st.

## Open 2 — `fkStatus` is never set

Both create branches skip status entirely. It has to resolve to a real status record, never free text pretending to be a foreign key. Blocked on a status-resolver helper that does not exist, so rows will generate with an empty status until it does.

## Why the design is right

**Idempotence comes from a stable key, not a diff.** Every generated row carries `ScheduleKey = fkLoan & "." & fkStandardTransaction & "." & SequenceNumber`, and that key — not the date, not the amount — is what the script trusts when deciding whether a row already exists. The Schedule button can be pressed twice without fear, which is the whole point.

The due-date rule is locked: the term is treated in whole months and interest dates stay anchored to the day-of-month of origination. Origination on June 18 gives July 18, August 18, September 18. The current date matters for display and reporting and is never the identity of a scheduled row.

The first pass is deliberately small — monthly interest rows plus one balloon principal row at maturity. **No late-fee rows here**, on purpose: fee assessment has different triggers and different waiver semantics, so it lives in its own script.

It reads `Loans` and never `PropertySUMMARIES`.

## Guard rails

Do not generate by property context alone. Do not duplicate rows on re-run — `ScheduleKey` is the defense. Do not overwrite paid or already-applied history in `create_or_refresh` mode. `regenerate_open_only` touches only rows with nothing applied against them.

This is a multi-row write, so it belongs inside the `txn_*` trio once those exist. Its per-row commits are less dangerous than the waterfall's — a half-generated schedule is recoverable by re-running, since the keys are stable — but a partial generate still leaves a loan looking scheduled when it is not.

## Fixture expectation

| Loan | Terms | Monthly interest | Matches |
|---|---|---|---|
| `LOAN-001` | 150,000 at 12% | 1,500.00 | `EXP-001`, `EXP-006` |
| `LOAN-002` | 85,000 at 12% | 850.00 | `EXP-002` |
| `LOAN-003` | 40,000 at 14% | 466.67 | `EXP-003`; balloon 40,000 = `EXP-005` |

## History

Rewritten loan-centered 2026-06-18 and approved. Ported to a real body 2026-07-29, and the month-overflow bug was found during that port and flagged rather than silently patched.
