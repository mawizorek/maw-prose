# Changelog

| Date | Event |
|---|---|
| 2026-07-31 | Docs migrated here. Retired machine mirrors (`schema/*.json`, `_index.json`, verification ledger) did not travel. |
| 2026-07-29 | `ReceivedFunds` approved as 10th table. `txn_*` rollback settled. FMP19 confirmed permanent runtime. 7 scripts stamped superseded. Golden Month fixture built. |
| 2026-07-28 | v1 rescoped: internal instrument, not demo. Ledger surfaces → table view. |
| 2026-06-18 | Script-contract audit. 5 scripts found pre-Loans; context resolver rewritten loan-aware. |
| 2026-06-15 | Last date anything verified against live file. |
| 2026-06-14 | Schema lock. Loans created, PaymentApplications rebuilt, Payoffs created, PaymentInstructions rebuilt, Standard_Transactions settled. |

## Open schema-lock items

- Decide: merge `SETUP_LLC` into `GLOBAL_USE_VARIABLES`?
- Normalize remaining core table names
- Strip legacy placeholder naming (`XXval_*`, `xwork_Notes`, `zOld_FileFOLDERS`)
- Pre-SQL rename lock for Documents + party tables
