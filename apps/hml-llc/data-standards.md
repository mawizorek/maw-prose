# Data standards

| Convention | Pattern | Example |
|---|---|---|
| Primary keys | `PrimaryKey`, UUID, never serial | ⚠️ Diverges from house `pk_` prefix (open governance item) |
| Foreign keys | `fk<Parent>` | `fkLoan`, `fkBorrower`, `fkStandardTransaction` |
| Calculations | `calc_` prefix | `calc_TotalOutstanding` |
| Globals | `g_` prefix; `gLIST_` for value-list globals | `g_currentLoan`, `gLIST_PropertyNames` |
| Audit fields | `CreationTimestamp`, `CreatedBy`, `ModificationTimestamp`, `ModifiedBy` | Every table, including the singleton |
| No leading underscores | Active core tables only | Legacy `GLOBAL_`, `XXval_`, `old...` gets stripped |
| Value list vs table | Metadata beyond display value → table | Delivery type = value list; transaction type (carries category + direction + layer) = `Standard_Transactions` |

## Why names lock before SQL

`ExecuteSQL` embeds table/field names as **text**. Rename a table → calc returns **empty, not error**. Five calcs in this app query by name.
