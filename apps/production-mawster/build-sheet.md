---
revised: MAW | 8 Aug 2026
id: build-sheet
title: Build Sheet
type: reference
status: public
order: 10
summary: What's next?
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

## 🔴 Inside step 2 — the DDR punch list

**42 fixes read out of the file itself**, not out of the spec: [[DDR Punch List](@ddr-punch-list)]. Ordered by dependency, so rows 1–3 are the three missing foreign keys (`WORKDAYS::fkCalendar`, `WORKDAYS::fkWeek`, `WEEKS::fkCalendar`) that `link-workflows` cannot start without.

⚠️ **Rows 11–16 are renames and they get cheaper the sooner they happen** — there are 0 scripts in the file today, so nothing references the misspellings yet.

## ⬜ Also queued — device handoff

**Three fields and one script trigger, no relationships, no dependencies.** The open-log stamp (`LastOpenedAt` / `LastOpenedDevice` / `LastOpenedPlatform`) plus `ModifiedOnDevice` on the canonical tables answers *"is this the newest copy"* on sight, and turns the manual post-iPad audit into a query. Full spec: [[Device Handoff](@device-handoff)].

Layout geometry and the screen↔print seam: [[Print & iPad Geometry](@print-geometry)].

<!--
FLAG 2026-08-08 — the commented block below is NOT Production MAWster content.
ReceivedFunds, txn_Rollback, Loan hub, Payoff print, "corrupt money" = HML_LLC.
Left in place, not deleted (propose-and-wait on destructive moves). Either move it
to the HML_LLC build sheet or confirm it is dead scratch and cull it.
-->

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
