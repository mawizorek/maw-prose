# SQL helpers

*The canonical definition of the SQL field/table name resolution family. Every FileMaker solution that writes ExecuteSQL installs these two. Closes the D-043 gap: literal field names in SQL text.*

Two custom functions: `sql.Field` and `sql.Table`. They turn a `GetFieldName` result into the bare field name or the resolved base table name that `ExecuteSQL` needs.

## Documents

`sql.notes.md` is the contract: what the family solves, the call-site pattern, the FM19 verification step, and the retrofit plan for existing scripts.

The two `.fmcalc` files are copy targets. Each pastes into the FileMaker custom function dialog verbatim.

## The problem

D-043 requires SQL text built from `GetFieldName` so a rename follows the field instead of returning empty. But `GetFieldName` returns `TO::Field` (e.g. `"PEOPLE::Name"`), and `ExecuteSQL` needs bare names (`"Name"` for fields, `"PEOPLE"` for tables, where "PEOPLE" is the base table name, not necessarily the TO name). No built-in function bridges the gap, so every script was writing literal strings and every rename was a silent break.

## The pattern

Before (literal, fragile):
```
ExecuteSQL (
    "SELECT Name, fk_xtContainer FROM sync_SOURCES WHERE Name = ?" ;
    "" ; "" ; $sourceName
)
```

After (reference-tracked, rename-safe):
```
ExecuteSQL (
    "SELECT " & sql.Field ( GetFieldName ( sync_SOURCES::Name ) )
    & ", " & sql.Field ( GetFieldName ( sync_SOURCES::fk_xtContainer ) )
    & " FROM " & sql.Table ( GetFieldName ( sync_SOURCES::PrimaryKey ) )
    & " WHERE " & sql.Field ( GetFieldName ( sync_SOURCES::Name ) ) & " = ?" ;
    "" ; "" ; $sourceName
)
```

More verbose. Rename-proof. A deleted or missing field breaks at calculation compile time, not at runtime with a silent empty result.

## Caching

`sql.Table` runs one `ExecuteSQL` per call. When a script queries the same table in multiple statements, resolve once at the top:

```
Set Variable [ $tSources ; sql.Table ( GetFieldName ( sync_SOURCES::PrimaryKey ) ) ]
```

Then reference `$tSources` in the SQL text. `sql.Field` is pure string manipulation with no query, so caching it is optional.

## Install order

Either function first; they are independent. Both paste into Manage Database > File > Custom Functions. No dependencies on json-params or any other family.
