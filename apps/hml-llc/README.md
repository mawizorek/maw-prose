# HML_LLC — FileMaker solution

Private-money real-estate loan servicing. FMP19, permanently. Single file, single user, local-first.

**Start at [`OPEN-ME.md`](OPEN-ME.md)** — that's the nav tree mirroring the FMP menu structure.

## One thing to know

A **loan** is the financial parent, not a property. Property = collateral. Loan = note with terms. Every ledger row hangs off the loan. One receipt can allocate across multiple loans (`ReceivedFunds`).

## Folder map

| Folder | Mirrors |
|---|---|
| `tables/` | Manage → Database → Tables (one file per table, field register) |
| `scripts/` | Script Workspace (11 folders: `00_APP` through `zz_DEV_ARCHIVE`) |
| `relationships/` | Manage → Database → Relationships (edge table) |
| `calculations/` | One `.fmcalc` per calc field (paste-ready) |
| `functions/` | Custom functions |
| `layouts/` | Layout specs + render HTMLs |
| `value-lists/` | Value list definitions |
| `fixtures/` | Golden Month importable TSV |

## Root pages

| File | Purpose |
|---|---|
| `build-sheet.md` | Build order + session start page |
| `next-build-spec.md` | Feature requests land here |
| `architecture-notes.md` | Non-obvious rulings that reversing = regression |
| `design-decisions.md` | Constitution-level stance |
| `data-standards.md` | Naming conventions |
| `schema-notes.md` | Cross-cutting contracts + live-file inventory |
| `changelog.md` | App milestones |

## Known gaps (need FMP file read)

- Script bodies for 6 of 11 folders
- Custom function body (`MSG_ValueListErrors`)
- Layout internals (exact names, parts, object inventories)
- Value list stored values
- Property identity fields on PropertySUMMARIES
- 52 relationship graph screenshots (still on ClickUp task)
- Import/export field-level maps
- Loans field reconciliation (`OriginalPrincipal`, `InterestRateAnnual`, `ClosingDate`, `GraceDays`)
