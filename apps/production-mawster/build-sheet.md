---
revised: MAW | 8 Aug 2026
id: build-sheet
title: Build Sheet
type: reference
status: public
order: 10
nav: collapsed
summary: What's next?
data:
    catalog
data:
  schedule:
    file: build-sheet.tsv  # revision_log?
    caption: What's next?   # optional
---

# Build sheet

## Build order

<!---the build-sheet.tsv *should* resort it's on publish - suhc>
--->    
!!! data "schedule"
    sort:  Step

<!---
feature request for the renderer: an additional command for under "data" that let's me tell the renderer to *actually* resort and recommit the 
probably not doable cos the renderer is acrtulyl snapshoting the site. not ever actaully topuching source code in the doc tree to edit anythign that way. only pure reading and transcription into it's own html - if I understand correctly   
--->

<!--
| # | Step | Why this order |
|---|---|---|
| 1 | Build `ReceivedFunds` table | Receipt is the transaction parent. Building rollback first forces Loan as parent → multi-loan revert only reaches half. |
| 2 | Build `txn_Begin` / `txn_Commit` / `txn_Rollback` in `00_APP` | Wraps atomicity. Comments MUST say "no engine transaction underneath." |
| 3 | Import Golden Month fixture | Acceptance test: unapplied cash must = exactly $850.00 traceable to one receipt. If not, schema is wrong. |
| 4 | Ledger table views | ExpectedTransactions, AccountTransactions, taxonomy, PaymentInstructions. Column set/order = the interface. |
| 5 | Loan hub layout | Expected + Account txns as two portals. The month-of-work screen. |
| 6 | Property hub layout | Just the Loans portal. Without it, properties read as orphans. |
| 7 | Payoff print layout | Read-only. No portal (portal = editing surface → defeats freeze). |

## Wrapper rules

| Rule | Failure mode if broken |
|---|---|
| `Set Error Capture [On]` + check `Get(LastError)` after EVERY write | Swallowed error → caller believes write landed |
| No `Commit Records` inside block | Ends transaction early; preceding rows become permanent silently |
| Wrap once, never copy rollback logic | Second copy is where the bug lives |
| Must fail loudly | Silent failure worse than no wrapper |

## Atomic routines (non-negotiable)

- Applying one payment across several owed items
- Freezing a payoff snapshot

Half-applied = corrupt money. Partial freeze = quote that silently changes post-send.

## Table view vs built layout

| Surface | Why |
|---|---|
| Table view | Bulk entry/review (most typing) |
| Built layout (portal) | Parent + children. Loan hub, property hub. |
| Portal economics | One object set renders N records. Style once, pays back per row. |

## Known traps

| Trap | Detail |
|---|---|
| Schedule date overflow | Month-walk overflows for origination day 29-31. Jan 31 + 1mo = Mar 3. Fixture loans use 1st/10th/15th so can't catch it. |
| `Payment Received` double-count | Redundant with `ReceivedFunds`. Someone will pick it by accident → same cash in two places. |
| `PropertyExpectations` | Exists in live file (~14 calc fields), absent from canonical 10. Probably absorbed into Loans calcs. Don't delete, don't build against. |
| 7 superseded scripts | Stamped, not rewritten. Intentional: rewriting before receipt table = paying twice. |

--->