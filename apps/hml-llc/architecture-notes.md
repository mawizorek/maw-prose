# Architecture notes

| Ruling | Why reversal = regression |
|---|---|
| Schema parents everything on **Loans**, not properties | Property hub uses a Loans portal to bridge the two orientations. Re-parenting txns onto property is the original bug. |
| Payoffs are **frozen snapshots** | Issued quote stores its own amounts + payment instruction snapshot. Later edits to PaymentInstructions must never reach an issued record. |
| One control table (`GLOBAL_USE_VARIABLES`) holds **state, not data** | Session context (`g_` globals): current property, current loan, hub mode. The moment something relates to it, it stopped being state. |
| Publish boundary is **one-way, manual** | FMP → ClickUp, button-driven. No two-way sync, no middleware. ClickUp owns workflow; FMP owns money. |
| **Single file, single user, local-first** | No constraint justifies otherwise yet. |
