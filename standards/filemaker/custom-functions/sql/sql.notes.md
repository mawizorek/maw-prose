# SQL helpers — the contract

*Shared sidecar for both copy targets in this folder. Created 2026-10-24. Closes the D-043 gap that was flagged, not fixed, in four scripts on 2026-10-23.*

## What this solves

D-043 (2026-10-05) ruled that SQL text is built from `GetFieldName`, so a rename follows the field instead of returning empty. The ruling could not be followed because `GetFieldName` returns `TO::Field` and `ExecuteSQL` rejects qualified names. Without a stripping function, every script hardcoded literal field and table names.

The Oct 23 session proved the threat is live: three field renames in one sitting (`fk_System` → `fk_xtSystem`, `fk_Container` → `fk_xtContainer`, `fk_Action` → `fk_vAction`), any of which would have silently broken a script referencing the old name.

## Why GetFieldName must be at the call site

FileMaker custom function parameters are evaluated. `sql.Field ( PEOPLE::Name )` hands the function the field's VALUE ("Jane Doe"), not its name. Only the native `GetFieldName` function takes an unevaluated field reference, so the caller writes `GetFieldName ( TO::Field )` and passes the resulting text to `sql.Field` or `sql.Table`.

This is not a limitation to work around later. It is how FileMaker evaluates custom function arguments, and the pattern is stable.

## sql.Field

Parameter: `qualifiedFieldName` (text, the result of `GetFieldName`).

Strips everything before and including `::`. Returns the bare field name.

Pure string manipulation. No queries, no dependencies, no version sensitivity beyond basic `Position` / `Middle` / `Length`.

## sql.Table

Parameter: `qualifiedFieldName` (text, the result of `GetFieldName`).

Extracts the TO name (everything before `::`), then resolves the base table name via:

```
ExecuteSQL (
    "SELECT BaseTableName FROM FileMaker_Tables WHERE TableName = ?" ;
    "" ; "" ; _toName
)
```

`FileMaker_Tables` is a system virtual table available since FileMaker 12, carrying `TableName` (TO name), `TableId` (TO id), `BaseTableName`, `BaseFileName`, and `ModCount`. This is NOT `FileMaker_BaseTables`, which D-050 established is FileMaker 2023 only.

Returns `"?"` on a failed lookup so that the caller's `ExecuteSQL` fails with error 4413 (table not found) rather than silently matching nothing.

### ⚠️ Verify on first install

The claim that `FileMaker_Tables.BaseTableName` is available on FM19 has not been tested against a live file. Run this before trusting the function:

```
ExecuteSQL ( "SELECT BaseTableName FROM FileMaker_Tables WHERE TableName = 'PEOPLE'" ; "" ; "" )
```

Expected: `"PEOPLE"`. If it errors or returns `"?"`, the column is absent on this version and `sql.Table` needs a fallback through `FileMaker_BaseTableFields` (available since 19.4.1), which maps fields to base table names but not TOs to base tables.

### Why FileMaker_Tables and not Target_Tables

`Target_Tables` stores `fm_BaseTableName` but has no TO-name column. The lookup path is TO name → base table name, and `Target_Tables` can only do that lookup if TO name = base table name, which is the default but not universal (`view_Target_Tables` ≠ `Target_Tables`). `FileMaker_Tables` maps every TO to its base table directly, is always current (no refresh needed), and covers TOs that point at external data sources.

`Target_Tables` remains the catalog of record for auditing, presence tracking, and `AuditField_gaps`. The two serve different purposes: `FileMaker_Tables` is the name resolver, `Target_Tables` is the inventory.

## Retrofit plan (PARKED, do not execute while another agent is in the file)

Five scripts carry literal field names in ExecuteSQL and need retrofitting once both functions are installed:

1. **`SYNC_Run`** (`apps/uritp-people/scripts/` + `filemaker/uritp-people/scripts/10_SYNC/`)
   Flagged: `# D-043 gap: literal field names until the sql/ custom-function family exists.`
   The context-read join (D-048 ruling 6) names fields from sync_SOURCES, xt_CONTAINERS, xt_SYSTEMS.

2. **`ADAPTER_ClickUp_Pull`** (same locations)
   Flagged: `# D-043 gap: literal field names until the sql/ custom-function family exists.`
   Reads and writes xt_RECORDS, sync_EVENTS, value lookups against VALUES and value_LISTS.

3. **`XT_Refresh_Fields`** (`apps/uritp-people/scripts/`)
   The dispatcher. ExecuteSQL context read against xt_CONTAINERS and xt_SYSTEMS.

4. **`ADAPTER_ClickUp_RefreshFields`** (`apps/uritp-people/scripts/`)
   Writes xt_FIELDS rows. ExecuteSQL lookups against xt_FIELDS and xt_CONTAINERS.

5. **`APP_CatalogRefresh`** (`standards/filemaker/scripts/`)
   The standards-shelf catalog refresh. ExecuteSQL against Target_Tables and FileMaker_BaseTableFields.

### Retrofit pattern per script

For each script:
- Add `sql.Field` and `sql.Table` resolution variables at the top, one per table used.
- Replace every literal field name string with `sql.Field ( GetFieldName ( TO::Field ) )`.
- Replace every literal table name string with the cached `$t*` variable.
- Remove the `# D-043 gap` comment.
- Verify idempotency: run the script, confirm identical output to the literal version.

### What blocks the retrofit

Another agent is currently working in the file. The custom functions must be installed (pasted into Manage Database > File > Custom Functions) before any script can reference them. Install, then retrofit, then verify, in that order.
