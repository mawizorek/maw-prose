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

## Build SQL text from GetFieldName

`GetFieldName ( SETTINGS::cu_APIToken )` returns the text `SETTINGS::cu_APIToken`, and because it references the field rather than spelling it, it follows the field through a rename of either the field or its table occurrence. Split the result at `::` and the two halves are the occurrence and the field, ready to quote into the query:

```
Let ( [
  ~f = Substitute ( GetFieldName ( SETTINGS::cu_APIToken ) ; "::" ; ¶ )
] ;
  ExecuteSQL ( "SELECT \"" & GetValue ( ~f ; 2 ) & "\" FROM \"" & GetValue ( ~f ; 1 ) & "\"" ; "" ; "" )
)
```

Quote both names every time. A name with a space or a reserved word fails unquoted, and quoting always costs nothing. FileMaker's own schema tables (`FileMaker_BaseTables` and the like) are the exception: they never get renamed, so their names are typed.
