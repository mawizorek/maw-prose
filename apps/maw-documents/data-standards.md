# Data standards

*App-local naming, keys and controlled values.*

## Naming — LOCKED

| Thing | Convention | Example |
|---|---|---|
| Base tables | **PascalCase plural** | `Documents`, `DocumentCopies` |
| Join tables | `<Parent><Child>` | `DocumentPeople`, `PurchaseLines` |
| Primary key | **`PrimaryKey`**, bare, text UUID | `PrimaryKey` |
| Foreign key | **`fk` + PascalCase, NO underscore** | `fkDocument`, `fkPerson` |
| Calculations | `calc_` | `calc_ContributorDisplay` |
| Globals | `g_` / `gLIST_` | `g_Mode`, `gLIST_ActiveContexts` |
| Table occurrences | context prefix, underscored | `uFile_Values` |
| Layouts | `h_` hub · `c_` card · `p_` print | `h_DocLibrary`, `c_NewDocument` |

🔴 **One exception: `GLOBAL_USE_VARIABLES` keeps its screaming caps.** It is the singleton control
table and the shout signals *this is not a data table* at a glance.

<!-- AGENT NOTE · the superseded convention, and the live risk it left behind.
A second FileMaker documentation standard carried a rival convention: pk_FileID / fk_SetID
prefixes and SINGULAR PascalCase table names, and it claimed enforcement by the DDR Explorer
Health/Linter portal. Marked superseded 2026-09-16 and STRUCK IN PLACE rather than deleted, so
anyone finding pk_ keys in a real file has an explanation instead of a mystery.
THE LIVE RISK: if that linter is still running, it now flags J3-correct keys as defects and
passes dead ones — an automated check arguing against the ruling in the ruling's own voice, with
a findings list to back it up. A linter that returns findings looks like a working linter.
RULE: linter config is DOWNSTREAM of a naming ruling. Re-tune it, never obey it.
UNVERIFIED: nobody has read the linter's rules. Treat as a lead, not a finding.
-->

## Keys

**Text UUID, always. Never a serial.** Auto-enter calculated, `Get(UUID)`. No composite keys, no
meaningful keys.

🚩 **No single FK on the ONE side of a many-to-many** — [schema-notes.md](./schema-notes.md) rule 2.
Struck three times in this app's history and it will be proposed again.

## Audit fields — every table, no exceptions

`CreationTimestamp` · `CreatedBy` · `ModificationTimestamp` · `ModifiedBy` — all auto-enter.

Documented once, here. **A table page that re-lists them is noise; a table that omits them is a
defect.**

## Derived values

⚠️ **A stored auto-enter calculation is a SNAPSHOT and it will lie.** A stored display name is
correct until the underlying name is corrected.

1. **Prefer unstored.** Correct by construction.
2. **If it must be stored**, say so in the FMP field comment: that it is a snapshot, what re-drives
   it, and what does NOT.
3. 🩹 **Mark a workaround AS a workaround in the moment you write it.**

<!-- AGENT NOTE · the re-driver trap, and why rule 3 is not politeness.
A re-driver scoped to record creation but NOT to name changes looks live and is silently wrong for
every row it never sees. That exact defect ran at 41 of 49 rows empty on a live ROLE join elsewhere
in this workspace.
Rule 3 matters because THIS DOCUMENTATION IS THE SPEC for the FileMaker build. An unmarked
band-aid ports across as design.
-->

## Controlled values

Standard `ufile_ValueLISTS` + `ufile_Values` pattern for: document types, variant types, context
types, contributor roles, organization types, acquisition methods, formats, conditions, storage
backends.

🚩 **Do not hide entity architecture inside a value list.** If the thing needs an attribute beyond
its display label — a sort order, a parent, a URL, a code — **it is a table.** `ContributorRoles`
is a table because a role carries a MARC relator code and a display order.

## Money and dates

- Amounts are number fields; currency named explicitly on `Purchases.Currency`. **No implicit USD.**
- Line totals are stored **and validated** against `Quantity × UnitPrice`, never assumed.
- Order-level charges (shipping, tax) belong to the ORDER, never apportioned onto lines by hand.
- `PublicationYear` is a year, not a date. Date **roles** split later; one field now, designed
  knowing it splits.

## 🚫 PII

**This repo is PUBLIC**, and so is `ClickUp_apps`. HML content has leaked twice.

No real names, addresses, account numbers, payment handles, vendor+amount pairs or named balances
in fixtures, examples, renders or artifacts. **Borrower names are real people** — `CopyLoans`
examples use initials. A remediation sweeps **every table that snapshots a value**, not only the
one that owns it.
