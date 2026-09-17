# Data standards

*App-local naming, keys and controlled values.*

## Naming — LOCKED

| Thing | Convention | Example |
|---|---|---|
| Base tables | **ALL_CAPS_UNDERSCORE** | `DOCUMENTS`, `DOCUMENT_INSTANCES` |
| Join tables | `<PARENT>_<CHILD>` | `DOCUMENT_PEOPLE`, `PURCHASE_LINES` |
| Table occurrences | `<BASE>_<context>` | `ROLES_fPEOPLE`, `ORGS_fPURCHASES`, `DOCUMENTS_asRECEIPTS` |
| Primary key | **`PrimaryKey`**, bare, text UUID | `PrimaryKey` |
| Foreign key | **`fk` + PascalCase, NO underscore** | `fkDocument`, `fkDocumentInstance` |
| Regular fields | PascalCase | `AcquisitionMethod`, `OrderReference` |
| Short-form twin | `<Field>_short` | `Name_short`, `Title_short` |
| Auto-enter calcs | `auto_` | `auto_DisplayName`, `auto_ReadingName` |
| Calculations | `calc_` | `calc_ContributorDisplay` |
| Globals | `g_` / `gLIST_` | `g_Mode`, `gLIST_ActiveContexts` |
| Layouts | `h_` hub · `c_` card · `p_` print | `h_DocLibrary`, `c_NewDocument` |

🔴 **Tables shout, fields do not.** Ruled by Michael 2026-09-16: *"clearly i'm committing to all caps."*
The built file is the source of truth for names and this table follows it.

⚠️ **Consequence, recorded rather than glossed: `GLOBAL_USE_VARIABLES` no longer stands out.** Its caps
were the singleton control table's *this is not a data table* signal, and in an all-caps file that signal
is gone. **The distinction now has to live somewhere else** — the `g_` field prefix carries part of it,
and a `z`/`u` prefix on non-data tables is the usual answer if it is ever wanted back.

<!-- AGENT NOTE · the reversal, the two dead conventions, and the live linter risk.
J3 (2026-07-31) locked PascalCase PLURAL tables, arguing that GLOBAL_USE_VARIABLES's caps were a signal
worth protecting and that a convention erasing its own exception is worse than the exception. Michael
reversed the table half on 2026-09-16 after building the file all-caps. HIS FIELD RULING FROM THE SAME
DAY STANDS UNCHANGED ("J3s naming is correct fkPscaCase") — the reversal is TABLES ONLY, which is why
fkDocument and AcquisitionMethod stay PascalCase. Read J3 as historical on table case, live on fields.
WHY IT IS THE RIGHT CALL ANYWAY: the built file already had 14 all-caps tables and 3 records. Renaming
every table to satisfy a doc would have been a doc winning an argument against a working file, and
ExecuteSQL embeds table names as text — a rename pass is the single most expensive edit available here.
DEAD CONVENTION #1: a second FileMaker documentation standard carried pk_FileID / fk_SetID prefixes and
SINGULAR PascalCase tables. Marked superseded 2026-09-16, STRUCK IN PLACE rather than deleted, so anyone
finding pk_ keys in a real file gets an explanation instead of a mystery.
DEAD CONVENTION #2: this file's own PascalCase-plural table rule, as of this commit.
THE LIVE RISK: that superseded page claimed enforcement by the DDR Explorer Health/Linter portal. If the
linter still runs, it flags correct keys as defects and passes dead ones — an automated check arguing
against the ruling in the ruling's own voice, with a findings list to back it up. A linter that returns
findings looks like a working linter. RULE: linter config is DOWNSTREAM of a naming ruling. Re-tune it,
never obey it. UNVERIFIED: nobody has read the linter's rules. Treat as a lead, not a finding.
-->

## Keys

**Text UUID, always. Never a serial.** Auto-enter calculated, `Get(UUID)`. No composite keys, no
meaningful keys.

🚩 **No single FK on the ONE side of a many-to-many** — [schema-notes.md](./schema-notes.md) rule 2.
**Struck four times now**, twice in built schema (`fkPeopleJoins`, `fkOrgRoleJoin`), and it will be
proposed again.

⚠️ **An FK pointing at an uncut table does not error — it resolves to nothing, silently, forever.**
Live instance: `fkStorageLocation` on `DOCUMENT_INSTANCES`, with no `STORAGE_LOCATIONS` table.

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

⚠️ **Two live instances to settle: `auto_DisplayName` and `auto_ReadingName` on `PEOPLE`.** If stored,
both lie the moment a name is corrected.

<!-- AGENT NOTE · the re-driver trap, and why rule 3 is not politeness.
A re-driver scoped to record creation but NOT to name changes looks live and is silently wrong for
every row it never sees. That exact defect ran at 41 of 49 rows empty on a live ROLE join elsewhere
in this workspace.
Rule 3 matters because THIS DOCUMENTATION IS THE SPEC for the FileMaker build. An unmarked
band-aid ports across as design.
auto_ReadingName is a BETTER name than the SortName this doc originally specified — "reading form" is
the actual cataloguing term for the inverted form. Michael's name won; the doc followed.
-->

## Controlled values

Standard `ufile_ValueLISTS` + `ufile_Values` pattern for: variant types, context types, acquisition
methods, formats, conditions, storage backends.

🚩 **Do not hide entity architecture inside a value list.** If the thing needs an attribute beyond its
display label — a sort order, a parent, a URL, a code — **it is a table.**

**Already tables for exactly that reason:** `ROLES_FOR_PEOPLE_and_ORGANIZATIONS` (relator code + sort
order) · `ORG_TYPES` · `DOCUMENT_TYPES` (short name, sort order, two completeness flags).

## Money and dates

- Amounts are number fields; currency named explicitly on `PURCHASES.Currency`. **No implicit USD.**
- 🔴 **Line totals are stored AND validated against `Quantity × UnitPrice`, never assumed.** ⚠️ **Live
  gap: `PURCHASE_LINES` has `UnitPrice` and `LineTotal` and no `Quantity`** — so the validation has no
  second operand, and quantity is either always 1 (one field redundant) or hiding in undocumented
  division.
- Order-level charges (shipping, tax) belong to the ORDER, never apportioned onto lines by hand.
- `PublicationYear` is a year, not a date. Date **roles** split later; one field now, designed knowing
  it splits.

## 🚫 PII

**This repo is PUBLIC**, and so is `ClickUp_apps`. HML content has leaked twice.

No real names, addresses, account numbers, payment handles, vendor+amount pairs or named balances in
fixtures, examples, renders or artifacts. **Borrower names are real people** — loan examples use
initials. A remediation sweeps **every table that snapshots a value**, not only the one that owns it.
