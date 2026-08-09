---
id: table-import-sessions
title: import_SESSIONS
type: reference
status: public
order: 10
revised: Aug 2026
summary: One pull from ClickUp.
---

# import_SESSIONS

!!! abstract "Grain"
    One pull. **The session IS the snapshot** — nothing here ever carries an edition.

- Serves BOTH pipes: calendar events and contact-sheet assignments come down the same way. The two-projects framing is really one import layer with two renderers.
- One session = **one production**. The export view is per-production, so a cross-listed event arrives in both sessions. That is correct, not duplication.
- `fkProduction` is declared by the operator at import. Any row whose CU token does not resolve to it gets **flagged, never silently filed** — that is how a renamed label gets caught on day one.
- RowCount is the reconciliation check. Rows in the file vs rows landed.
- Editions belong to PRINT_SESSIONS, on the export side. Import never has one.

## Fields

See [import_SESSIONS.tsv](./import_SESSIONS.tsv).
