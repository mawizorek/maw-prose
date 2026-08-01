# Changelog

*Milestones for the solution itself. Git history is authoritative for the documentation; this is the app's story. Verified 2026-07-31.*

**2026-07-31** — Documentation migrated to this repository and completed. The retired machine mirrors (`schema/*.json`, the per-folder `_index.json` files, the empty verification ledger) did not travel; their content folded into the notes that replaced them.

**2026-07-29** — `ReceivedFunds` approved as the tenth table, closing a six-week disagreement between a schema that said nine and a script build order that required ten. The `txn_*` rollback design was settled the same day, along with the ruling that FileMaker 19 is the permanent runtime. Seven scripts stamped superseded rather than rewritten. The Golden Month fixture was built as the schema's acceptance test.

**2026-07-28** — v1 rescoped from a demo to an internal instrument, and the ledger surfaces moved to table view.

**2026-06-18** — Script-contract audit. Five scripts found written against the pre-`Loans` schema; the context resolver rewritten loan-aware.

**2026-06-15** — Normalization audit against first, second and third normal form. Last date anything here was verified against the live file.

**2026-06-14** — Schema lock. `Loans` created as the servicing parent with loan terms re-homed off the property, `PaymentApplications` rebuilt as a real join, `Payoffs` created with frozen values, `PaymentInstructions` rebuilt out of fake globals, and `Standard_Transactions` settled as a taxonomy.

## Open schema-lock items

Still outstanding from the June lock: deciding whether `SETUP_LLC` merges into `GLOBAL_USE_VARIABLES`, normalizing the remaining core table names, stripping legacy placeholder naming from the active schema, retiring the `XXval_*` / `xwork_Notes` / `zOld_FileFOLDERS` remnants, and the pre-SQL rename lock for the documents and party tables.
