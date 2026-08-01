# GLOBAL_USE_VARIABLES

*Singleton control table. 🔨 BUILT · verified in file 2026-07-15. Field register reconciled 2026-07-31.*

**Grain: one record, ever.** This table holds app state and the current selection, not data. It is the only one-record control table in the file, and everything that wants to know "which property are we looking at" reads it.

The screaming-caps name is deliberate and is the one exception to the PascalCase table convention. The shout is a signal: it says *this is not a data table* at a glance in Manage Database and in every table-occurrence name on the graph. Renaming it to match the others would spend the only place the naming convention carries information.

Audit fields stay on it even though it is singleton state. There is no scenario where knowing when app state last changed hurts, and the house standard puts the quad on every table without exception, which is easier to hold than a rule with a carve-out.

## Fields

| Field | Type | Key | Category | Returns | Stored | Notes |
|---|---|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | | | |
| CreationTimestamp | timestamp | audit | audit | | | |
| CreatedBy | text | audit | audit | | | |
| ModificationTimestamp | timestamp | audit | audit | | | |
| ModifiedBy | text | audit | audit | | | |
| APP_TITLE | text | plain | setup | | | |
| APP_VERSION | text | plain | setup | | | |
| calc_filePath | calc | calc | setup | Text | no | |
| calc_fileName | calc | calc | setup | Text | no | |
| calc_hostedStatus | calc | calc | setup | Text | no | |
| calc_fileSizeMB | calc | calc | setup | Number | no | numeric; append "MB" in display only |
| script_Stats_RecordCounts | text | plain | setup | | | script-adjacent helper |
| script_LastSaved | text | plain | setup | | | script-adjacent helper |
| g_fkCurrentProperty | text-uuid | global | context | | | current property context |
| g_fkCurrentLoan | text-uuid | global | context | | | current loan context |
| g_HubMode | text | global | context | | | main hub/tab mode |

Formula bodies live as one `.fmcalc` per field in `../calculations/`, which is a copy-target folder — those files get typed into the calculation dialog, so they hold formula text and nothing else.

### Record-count calcs, if they are ever wanted

`calc_propertyCount`, `calc_accountTransactionCount`, `calc_expectedTransactionCount`, `calc_documentCount` and `calc_borrowerCount` belong here rather than on a setup table, for the same reason everything else does: this is where app-level state lives. None are built. Each would get its own `.fmcalc` file when it is.

## Relationships

None. It is a singleton state table and it stays that way — the moment something relates to it, it has stopped being state and become data.

## Open

`SETUP_LLC` may or may not merge into this table. `SETUP_MOBILE`, `Values` and `Value_Lists` are retire-or-park candidates. Neither decision has been made.
