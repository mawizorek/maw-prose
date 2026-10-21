---
id: budget-hub-layout
title: h_BudgetHub · the daily driver
type: reference
status: hidden
order: 51
nav: collapsed
revised: 2026-10
summary: One hub layout. Pick a year, pick a code, code the latest import. Every other layout is a utility.
data:
  catalog:
    file: h-budget-hub.objects.tsv
---

# h_BudgetHub

| Layout | Context TO | View | Size | Theme | Menu set |
|---|---|---|---|---|---|
| `h_BudgetHub` (folder `HUB`) | `ui_GLOBAL_BudgetHub` (GLOBAL_USE_VARIABLES, 1 rec) | Form only | 1280 × 800 pt | `maw-dark-utility` (FMP: **MAW Dark**) | [File Default] |

**The whole day on one screen:** pick the FY → click a code on the left → on the right, hit **→** on each uncoded row from the latest import. The row leaves *Uncoded* and lands in that code's *Ledger*. The tiles move with it.

⭐ **The tiles are the portal's column totals, nothing else.** They sum `hub_YearConfigs`, so a tile and the rows under it can never disagree.

Theme pick: `maw-dark-utility` is the only registry theme whose `fmp` column isn't `pending`. It's the one skin that already exists in a FileMaker file.

## Layout mode

```
┌─ HEADER 56pt · cnt_toolbar ──────────────────────────────────────────────────────────────────────┐
│ ▍URITP Budget   [g_fkSelectedFiscalYear ▾]   [BUDGET_AllocationVersions::TITLE]                  │
│                 last import <<hub_LastSession::ImportTimestamp>>          [ Import URF0985 ]     │
├─ BODY · cnt_page_shell ──────────────────────────────────────────────────────────────────────────┤
│ ┌sum_metric_tile─────┐ ┌sum_metric_tile─────┐ ┌sum_metric_tile─────┐ ┌sum_metric_tile_alert───┐  │
│ │[calc_HubAllocated] │ │[calc_HubPosted]    │ │[calc_HubRemaining] │ │[calc_HubUncoded]       │  │
│ │ ALLOCATED          │ │ POSTED             │ │ REMAINING          │ │ UNCODED · LAST IMPORT  │  │
│ └────────────────────┘ └────────────────────┘ └────────────────────┘ └────────────────────────┘  │
│ ┌─ cnt_section_card · CODES <<FY ShortName>> ────────┐ ┌─ cnt_section_card ────────────────────┐ │
│ │ [⌕ gSearch                        ]                │ │ (Uncoded) (Ledger)        nav_mode_*  │ │
│ │ row_portal_header                                  │ │ <<hub_SelectedCode::Name_snapshot>>   │ │
│ │ CODE   NAME          ALLOC    POSTED   LEFT        │ │ ┄ portal B · uncoded ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │ │
│ │ ┄ portal hub_YearConfigs · row_portal_standard ┄   │ │ [source_Ac][source_Sup][source_Am][→] │ │
│ │ [Code_][Name_snapsho][calc_Al][calc_Po][calc_Re]   │ │ ┄ portal A · ledger (same rect) ┄┄┄   │ │
│ │ [Code_][Name_snapsho][calc_Al][calc_Po][calc_Re]   │ │ [source_Ac][source_Sup][AssignedA][✕] │ │
│ │   whole row = button → hub | Select Code           │ │   hide-when on gHubMode               │ │
│ └────────────────────────────────────────────────────┘ └───────────────────────────────────────┘ │
├─ FOOTER 24pt · tx_helper ────────────────────────────────────────────────────────────────────────┤
│ <<APP_VERSION>> · <<calc_HOSTED_STATUS>> · <<calc_FILENAME>>                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

`[field]` = field object · `<<merge>>` = merge field · `( )` = button · every box is one family from the [Canonical Object Library](https://app.clickup.com/36074068/docs/12cwjm-53953/12cwjm-65093). **22 families, 0 new.** Badges are deliberately absent: conditional formatting does their job (library rule).

## Objects

One row per object. Part · family · source · behaviour · what the file doesn't have yet.

!!! data "catalog"

## What the file needs first

Everything not listed here already exists in the 10/10 DDR.

**Fields: GLOBAL_USE_VARIABLES** (calcs unstored, context `ui_GLOBAL_BudgetHub`)

| Field | Type | Definition |
|---|---|---|
| `gHubMode` | Text g | `"uncoded"` or `"ledger"` |
| `gSearch` | Text g | code search |
| `calc_HubAllocated` | Number | `Sum ( hub_YearConfigs::calc_Allocated )` |
| `calc_HubPosted` | Number | `Sum ( hub_YearConfigs::calc_Posted )` |
| `calc_HubRemaining` | Number | `calc_HubAllocated - calc_HubPosted` |
| `calc_HubUncoded` | Number | `Count ( hub_SessionRows::PrimaryKey ) - ValueCount ( UniqueValues ( List ( hub_SessionRowAssignments::fkURFImportRow ) ) )` |

**Fields: BudgetCode_YearConfig** (calcs unstored, context `hub_YearConfigs`)

| Field | Type | Definition |
|---|---|---|
| `calc_fkCurrentVersion` | Text | `GLOBAL_USE_VARIABLES::g_fkSelectedBudgetVersion` |
| `calc_Allocated` | Number | `Sum ( yc_AllocCurrent::AmountAwarded )` |
| `calc_Posted` | Number | `Sum ( yc_Assignments::AssignedAmount )` |
| `calc_Remaining` | Number | `calc_Allocated - calc_Posted` |

**Table occurrences (9), all off the hub, no cycles**

| TO | Base table | Predicate |
|---|---|---|
| `hub_LastSession` | IMPORT_SESSIONS | `g_fkImportURFSession = PrimaryKey` |
| `hub_YearConfigs` | BudgetCode_YearConfig | `g_fkSelectedFiscalYear = fkFiscalYear` |
| `yc_AllocCurrent` | Budget_Allocation | `hub_YearConfigs::PrimaryKey = fkBudgetCode` AND `calc_fkCurrentVersion = fkBudgetVersion` |
| `yc_Assignments` | URF_ROW_ASSIGNMENTS | `hub_YearConfigs::PrimaryKey = fkBudgetCode` |
| `hub_SelectedCode` | BudgetCode_YearConfig | `g_fkSelectedCode = PrimaryKey` |
| `hub_CodeAssignments` | URF_ROW_ASSIGNMENTS | `g_fkSelectedCode = fkBudgetCode` |
| `hub_CodeAssignmentRows` | IMPORT_URF0985 | `hub_CodeAssignments::fkURFImportRow = PrimaryKey` |
| `hub_SessionRows` | IMPORT_URF0985 | `g_fkImportURFSession = fkImportSession` |
| `hub_SessionRowAssignments` | URF_ROW_ASSIGNMENTS | `hub_SessionRows::PrimaryKey = fkURFImportRow` |

⚠️ `yc_AllocCurrent` carries the version in its predicate on purpose. Without it, a code with allocations in versions A, B and Final sums all three.

## Scripts

Reused as-is: `select | g FISCAL YEAR` · `Create_New_URF_Import`. Four new, JSON in / JSON out, house rules from [Patterns + Conventions](https://app.clickup.com/36074068/docs/12cwjm-53953/12cwjm-65153).

```
# hub | Refresh   { mode? }   →   { ok }
Set Variable [ $p ; Get ( ScriptParameter ) ]
If [ ParamHas ( $p ; "mode" ) ]
  Set Field [ ui_GLOBAL_BudgetHub::gHubMode ; ParamGetText ( $p ; "mode" ; "uncoded" ) ]
End If
Commit Records/Requests [ No dialog ]
Refresh Window [ Flush cached join results ]
Exit Script [ JSONSetElement ( "{}" ; "ok" ; True ; JSONBoolean ) ]
```

```
# hub | Select Code   { yearConfigID }   →   { ok }
Set Variable [ $id ; ParamGetText ( Get ( ScriptParameter ) ; "yearConfigID" ; "" ) ]
If [ IsEmpty ( $id ) ]
  Exit Script [ JSONSetElement ( "{}" ; [ "ok" ; False ; JSONBoolean ] ; [ "error" ; "no code passed" ; JSONString ] ) ]
End If
Set Field [ ui_GLOBAL_BudgetHub::g_fkSelectedCode ; $id ]
Perform Script [ "hub | Refresh" ; Parameter: "{}" ]
Exit Script [ JSONSetElement ( "{}" ; "ok" ; True ; JSONBoolean ) ]
```

```
# ledger | Assign Row   { rowID ; yearConfigID ; amount }   →   { ok ; assignmentID }
# Full-amount assignment. Splits come later through a card window; this is the 90% path.
# The → button sits in the portal row, so it passes source_Amount itself. No SQL.
Set Error Capture [ On ]
Set Variable [ $p ; Get ( ScriptParameter ) ]
Set Variable [ $row ; ParamGetText ( $p ; "rowID" ; "" ) ]
Set Variable [ $yc ; ParamGetText ( $p ; "yearConfigID" ; "" ) ]
Set Variable [ $amt ; ParamGetNumber ( $p ; "amount" ; 0 ) ]
If [ IsEmpty ( $row ) or IsEmpty ( $yc ) ]
  Exit Script [ JSONSetElement ( "{}" ; [ "ok" ; False ; JSONBoolean ] ; [ "error" ; "row and code required" ; JSONString ] ) ]
End If
# J18 guard 2: the code's FY must be the import's FY
If [ hub_SelectedCode::fkFiscalYear ≠ hub_LastSession::fkFiscalYear ]
  Show Custom Dialog [ "Wrong year" ; "This code isn't configured for this import's fiscal year." ]
  Exit Script [ JSONSetElement ( "{}" ; [ "ok" ; False ; JSONBoolean ] ; [ "error" ; "fy mismatch" ; JSONString ] ) ]
End If
Go to Layout [ "URF_ROW_ASSIGNMENTS" ]
New Record/Request
Set Field [ URF_ROW_ASSIGNMENTS::fkURFImportRow ; $row ]
Set Field [ URF_ROW_ASSIGNMENTS::fkBudgetCode ; $yc ]
Set Field [ URF_ROW_ASSIGNMENTS::AssignedAmount ; $amt ]
Set Field [ URF_ROW_ASSIGNMENTS::AssignmentMethod ; "hub" ]
Set Field [ URF_ROW_ASSIGNMENTS::AssignedBy ; Get ( AccountName ) ]
Set Field [ URF_ROW_ASSIGNMENTS::AssignedAt ; Get ( CurrentTimestamp ) ]
Set Variable [ $new ; URF_ROW_ASSIGNMENTS::PrimaryKey ]
Commit Records/Requests [ No dialog ]
Go to Layout [ original layout ]
Perform Script [ "hub | Refresh" ; Parameter: "{}" ]
Exit Script [ JSONSetElement ( "{}" ; [ "ok" ; True ; JSONBoolean ] ; [ "assignmentID" ; $new ; JSONString ] ) ]
```

```
# ledger | Unassign   →   { ok }
# The ✕ sits in the ledger portal row, so the row is already active. Portal setup: "Allow deletion of portal records" ON.
Show Custom Dialog [ "Unassign this row?" ; "It goes back to Uncoded." ; Buttons: "Unassign", "Cancel" ]
If [ Get ( LastMessageChoice ) ≠ 1 ]
  Exit Script [ JSONSetElement ( "{}" ; "ok" ; False ; JSONBoolean ) ]
End If
Delete Portal Row [ With dialog: Off ]
Perform Script [ "hub | Refresh" ; Parameter: "{}" ]
Exit Script [ JSONSetElement ( "{}" ; "ok" ; True ; JSONBoolean ) ]
```

⚠️ Guard 2 assumes `BudgetCode_YearConfig::fkFiscalYear` and `IMPORT_SESSIONS::fkFiscalYear` both hold the Global Setup FY key. Both relate to that file's fiscal years today; the first DDR after building proves it.

**Zero ExecuteSQL on this layout.** Every number comes through a relationship, so the rename pass can't silently break it.

## Not on this layout, on purpose

- **Pending.** No `PendingTransactions` table yet. When it lands: one tile, one column, Remaining subtracts it.
- **Splits.** One row to many codes goes in a `c` card window off the → button. Full-amount covers the daily case.
- **Every other layout.** Allocation entry, code generation, YearConfig rollover, prints: utility surfaces, reached from Manage Layouts. None of them is a daily driver.

## Verify after building

Drop a DDR. DELTA should show exactly: 1 layout, 10 fields, 9 TOs, 4 scripts added, and nothing else changed. Anything else in DELTA is drift.

Names spelled here are current DDR names; [Names](@budget-names) owns them.

Related: [STATE](../../fmp-state/uritp-budget/STATE.md) · [Gold Standard Schema](https://app.clickup.com/36074068/docs/12cwjm-52833/12cwjm-83693) · Decision Log J18, J19.
