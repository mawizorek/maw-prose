---
id: integration
title: ClickUp Integration
type: reference
status: public
order: 20
nav: collapsed
revised: Aug 2026
summary: How events and assignments get here.
---

# ClickUp Integration

**ClickUp AUTHORS. This app RENDERS.** The list is the work; the PDF is the byproduct.

## The pipe

- CSV first, API second. **Same fields serve both** — no migration.
- **The VIEW is the contract.** A saved ClickUp view is a stable, human-editable integration surface: change what gets published without touching a script.
- One session = one production (see [import_SESSIONS](@table-import-sessions)).

## Views are per-LIST

- A view lives on one list and carries its own filter. So "Big Love events" is a saved view built once.
- Cost: **one saved view per production.** Manual upkeep at 7+ shows, and a new show means a new view before the first import.

## ⬜ TO-DO — one view, production passed as a PARAMETER at pull time

**Wanted.** Replaces N per-production views with ONE view plus a runtime filter argument.

- **API only.** A CSV export is a static file; there is no parameter to pass.
- So the per-production views are the CSV-era stopgap, and this is what retires them.
- Blocks nothing today: `CU_ProductionID` is already on PRODUCTIONS waiting for it.
- Lands with the `API Pull` button on the [standing integration task](https://app.clickup.com/t/86ajwtjq8).

## Join keys

| Key | Transport | Note |
|---|---|---|
| `CU_ProductionToken` | CSV + API | Exact label string. A rename in CU breaks it SILENTLY |
| `CU_ProductionID` | API only | Rename-proof. Empty until the pull exists |

- Operator declares the production at import. Non-resolving rows get **flagged, never silently filed.**

## ⬜ Open

- ⬜ **Multi-label exposure.** `URITP Productions` is multi-select, so one event task can carry two shows. Handled by per-production views + a compound upsert key — **verify against a live CSV.**
- ⬜ Do CSV multi-value labels come back comma-separated inside one quoted cell, and do any show titles contain commas?
- ⬜ Event classification: Michael declined a CU-side canonical-type dropdown, so a **crosswalk** (raw name → fkStandardEvent) with an unmatched queue carries it. Learns instead of guessing.
- ⬜ Crew calls — third document, or a view of the calendar? A call carries person, role, call time, report location; a calendar event drops all but the time.
