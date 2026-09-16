# Data standards

*App-local naming, keys and controlled values. Cross-app conventions are canonical in the
ClickUp **FileMaker Patterns + Conventions** page; this file records what applies HERE and
any exception.*

## Naming — LOCKED

Ruled 2026-07-31 (J3), confirmed verbatim by Michael 2026-09-16 (J10).

| Thing | Convention | Example |
|---|---|---|
| Base tables | **PascalCase plural** | `Documents`, `DocumentCopies`, `ContributorRoles` |
| Join tables | `<Parent><Child>` | `DocumentPeople`, `DocumentContexts`, `PurchaseLines` |
| Primary key | **`PrimaryKey`**, bare, text UUID, no prefix | `PrimaryKey` |
| Foreign key | **`fk` + PascalCase, NO underscore** | `fkDocument`, `fkPerson`, `fkRole` |
| Calculation fields | `calc_` prefix | `calc_ContributorDisplay` |
| Globals | `g_` prefix | `g_Mode`, `g_CurrentContext` |
| Global list fields | `gLIST_` prefix | `gLIST_ActiveContexts` |
| Table occurrences | usage-context prefix, underscore-separated | `uFile_Values` |
| Card layouts | `c_` | `c_NewDocument` |
| Print layouts | `p_` | `p_DocumentPacket` |
| Hub layouts | `h_` | `h_DocLibrary` |

### The one deliberate exception

🔴 **`GLOBAL_USE_VARIABLES` keeps its screaming caps.** It is the singleton control table
and the shout is a **signal** — it says *this is not a data table* at a glance in Manage
Database and in every TO name. Make every table ALL_CAPS and that signal dies. A convention
that erases its own exception is worse than the exception.

### 🔴 The superseded convention, recorded because it is probably in built files

A second FileMaker documentation standard carried a rival convention: `pk_FileID` /
`fk_SetID` prefixes, **singular** PascalCase table names, and it claimed enforcement by the
DDR Explorer Health/Linter portal. **It was marked superseded on 2026-09-16 and struck in
place rather than deleted**, so that anyone finding `pk_` keys in a real file has an
explanation instead of a mystery.

⚠️ **If the linter is still live, it now flags correct keys as defects and passes dead
ones.** A linter that returns findings looks like a working linter. Config is downstream of
the naming ruling: **re-tune it, never obey it.**

## Keys

- **Text UUID, always. Never a serial.** Auto-enter calculated, `Get(UUID)`.
- A foreign key is text UUID and nothing else. No composite keys, no meaningful keys.
- 🚩 **No single FK on the ONE side of a many-to-many.** See
  [schema-notes.md](./schema-notes.md) rule 2. This has been struck three times in this
  app's history and it will be proposed again, because it always looks like a shortcut and
  never like a defect.

## Audit fields — on every table, no exceptions

| Field | Type | Behaviour |
|---|---|---|
| `CreationTimestamp` | timestamp | auto-enter, creation |
| `CreatedBy` | text | auto-enter, account name at creation |
| `ModificationTimestamp` | timestamp | auto-enter, modification |
| `ModifiedBy` | text | auto-enter, account name at modification |

These are factored out of every table page in `tables/` and documented once, here. A table
page that re-lists them is noise; a table that omits them is a defect.

## Derived values

⚠️ **An auto-enter stored calculation is a SNAPSHOT and it will lie.** A stored display name
built from a person's name is correct until the name is corrected, and then it is silently
wrong on every row nothing re-touched.

The rule for this app:

1. **Prefer unstored calculation.** Correct by construction, costs a little speed.
2. **If it must be stored** — for indexing, sorting or find performance — then say in the
   FMP field comment that it is a snapshot, name what re-drives it, and name what does
   NOT. A re-driver scoped to record creation but not to name changes looks live and is
   silently wrong for every row it never sees.
3. 🩹 **Mark a workaround AS a workaround in the moment you write it.** This documentation
   is the spec for the FileMaker build, so an unmarked band-aid ports across as design.

## Controlled values

Use the standard `ufile_ValueLISTS` + `ufile_Values` pattern for controlled selections:
document types, variant types, context types, contributor roles, organization types,
acquisition methods, formats, conditions, storage backends.

🚩 **Do not hide entity architecture inside a value list.** A value list is for controlled
selection. If the thing needs an attribute beyond its display label — a sort order, a
parent, a URL, a code — it is a table. `ContributorRoles` is a table for exactly this
reason: a role has a MARC relator code and a display order, so it is not a label.

## Money and dates

- Amounts: number fields, currency named explicitly on `Purchases.Currency`. **No implicit
  USD.**
- Line totals are stored and validated against `Quantity × UnitPrice`, never assumed.
  Undocumented arithmetic is how a ledger goes quietly wrong.
- Order-level charges (`ShippingAmount`, `TaxAmount`) belong to the ORDER and are never
  apportioned onto lines by hand.
- `PublicationYear` on `BibliographicDetails` is a year, not a date. Date **roles** will
  split later (publication vs document creation vs revision); one year field now, designed
  in the knowledge that it splits.

## 🚫 PII

**This repo is PUBLIC**, and so is `ClickUp_apps`. HML content has leaked twice.

No real names, addresses, account numbers, payment handles, vendor+amount pairs or named
balances in fixtures, examples, renders or artifacts. A remediation sweeps **every table
that snapshots a value**, not only the one that owns it.

Borrower names are real people. `CopyLoans` example data is initials or placeholders.
