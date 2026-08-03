# GLOBAL_USE_VARIABLES

Manage → Database → Tables → GLOBAL_USE_VARIABLES

Grain: one record, ever. App state and current selection, not data. Screaming-caps name is deliberate (signals "not a data table").

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| APP_TITLE | text | Application display title | | |
| APP_VERSION | text | Current app version string | | |
| [calc_filePath](../calculations/GLOBAL__calc_filePath.fmcalc) | (c→Text) | Get(FilePath); unstored | | |
| [calc_fileName](../calculations/GLOBAL__calc_fileName.fmcalc) | (c→Text) | Get(FileName); unstored | | |
| [calc_hostedStatus](../calculations/GLOBAL__calc_hostedStatus.fmcalc) | (c→Text) | Hosted vs local status; unstored | | |
| [calc_fileSizeMB](../calculations/GLOBAL__calc_fileSizeMB.fmcalc) | (c→Number) | File size in MB (append unit in display only); unstored | | |
| script_Stats_RecordCounts | text | Script-adjacent helper: record count cache | | |
| script_LastSaved | text | Script-adjacent helper: last save timestamp | | |
| g_fkCurrentProperty | text-uuid | GLOBAL: current property context | | |
| g_fkCurrentLoan | text-uuid | GLOBAL: current loan context | | |
| g_HubMode | text | GLOBAL: main hub/tab navigation mode | | |
| CreationTimestamp | timestamp | Record creation timestamp (auto-enter) | | |
| CreatedBy | text | Account name at record creation (auto-enter) | | |
| ModificationTimestamp | timestamp | Last modification timestamp (auto-enter) | | |
| ModifiedBy | text | Account name at last modification (auto-enter) | | |

Full relationship context → [graph.md](../relationships/README.md)
