# Data standards

*Naming conventions as they apply in this solution. Verified 2026-07-31. The cross-app convention lives in the FileMaker Patterns + Conventions reference; this page records where HML sits against it.*

**Primary keys** are named `PrimaryKey` on every table, UUID, never serial.

⚠️ That name is a **divergence from the house `pk_` prefix**, and it is deliberate rather than an oversight — but it is a real inconsistency across the two solutions and reconciling it is an open governance item, not something to fix quietly on one side.

**Foreign keys** take an `fk<Parent>` prefix: `fkProperty`, `fkLoan`, `fkBorrower`, `fkStandardTransaction`, `fkStatus`, `fkExpectedTransaction`, `fkAccountTransaction`, `fkReceivedFunds`.

**Calculations** take `calc_`. Mixed forms like `CALC_*` get eliminated rather than tolerated.

**Globals** take `g_`, with `gLIST_` reserved for value-list globals.

**Audit fields** — `CreationTimestamp`, `CreatedBy`, `ModificationTimestamp`, `ModifiedBy` — go on every table including the singleton. A rule with an exception is harder to hold than a rule without one.

**No leading underscores** on active core table names, and legacy prefixes (`GLOBAL_`, `XXval_`, `old...`) get stripped from the active schema rather than left as archaeology.

**Value list versus table:** metadata beyond the display value means a table. A delivery type is a word and belongs in a value list; a transaction type carries a category, a cash direction and an applied layer, so it is `Standard_Transactions`.

## Why the names get locked before any SQL

`ExecuteSQL` embeds table and field names as **text**. Renaming a table in Manage Database does not update the calculation, and a query against a table name that no longer exists **returns empty rather than raising an error**. Five calculations in this app query by name.

That is the mechanical reason behind the sequencing rule, and it is worth stating in those terms rather than as "lock names first": the failure mode is not a broken calculation, it is a calculation that quietly returns zero and gets believed.
