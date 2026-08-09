---
id: integration
title: ClickUp Integration
type: reference
status: public
order: 20
nav: collapsed
revised: 2026-08
summary: ClickUp AUTHORS. This app RENDERS. The list is the work; the PDF is the byproduct.
---

# ClickUp Integration

## The pipe

- CSV first, API second. **Same fields serve both** — no migration.
- **The VIEW is the contract.** A saved ClickUp view is a stable, human-editable integration surface: change what gets published without touching a script.
- One session = one production (see [[import_SESSIONS](@table-import-sessions)]).

## Views are per-LIST

- A view lives on one list and carries its own filter. So "Big Love events" is a saved view built once.
- Cost: **one saved view per production.** Manual upkeep at 7+ shows, and a new show means a new view before the first import.

## ⬜ TO-DO — one view, production passed as a PARAMETER at pull time

**Wanted.** Replaces N per-production views with ONE view plus a runtime filter argument.

- **API only.** A CSV export is a static file; there is no parameter to pass.
- So the per-production views are the CSV-era stopgap, and this is what retires them.
- Blocks nothing today: `cuProductionID` is already on [[PRODUCTIONS](@table-productions)] waiting for it.

## Join keys

| Key | Transport | Note |
|---|---|---|
| `cuProductionToken` | CSV + API | Exact label string. A rename in ClickUp breaks it SILENTLY |
| `cuProductionID` | API only | Rename-proof. Empty until the pull exists |

- Operator declares the production at import. Non-resolving rows get **flagged, never silently filed.**

## ⬜ Open

- ⬜ **Multi-label exposure.** `URITP Productions` is multi-select, so one event task can carry two shows. Handled by per-production views + a compound upsert key — **verify against a live CSV.**
- ⬜ Do CSV multi-value labels come back comma-separated inside one quoted cell, and do any show titles contain commas?
- ⬜ Event classification: a CU-side canonical-type dropdown was declined, so a **crosswalk** (raw name → `fkStandardEvent`) with an unmatched queue carries it. Learns instead of guessing.
- ⬜ **ClickUp does not emit a LOCATION on an event task today.** Ruled 2026-08-08: not going there yet, but [[LOCATIONS](@table-locations)] is built so it can.
- ⬜ Crew calls — third document, or a view of the calendar? A call carries person, role, call time, report location.
