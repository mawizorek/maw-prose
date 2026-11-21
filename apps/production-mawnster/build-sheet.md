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

## ⬜ Also queued — timestamp-anchored trims

**Archival captures run long past the show,** and the trim was being typed by hand in Terminal. Performance 2's tape is 6:31:07 for a 1:38:00 performance. Michael's ruling (2026-11-15): cut points are wall-clock timestamps, and the offsets and the ffmpeg command calculate from them.

Full spec on the two tables: [[Archival Media](@table-docz-archival-media)] and [[Archival Video](@table-docz-archival-video)].

Build order, each step usable on its own:

1. **`fkMedia` Unique** on video. One option, makes the 1:1 real.
2. **`fkSourceMedia`** on media, plus the `DOCz_ARCHIVAL_MEDIA_self_Source` occurrence. Point Performance 2's `TRIMMED` row at its `ORIGINAL`.
3. **`ts_CaptureStart`** on media. Performance 2 = 11/14/2026 1:33:14 PM.
4. **`ts_CutIn` / `ts_CutOut`** on video, prefilled from the event's call window.
5. **`calc_OffsetIn` / `calc_OffsetOut` / `calc_TrimCommand`**, unstored. Check Performance 2 reads 1546 and 7426.
6. Retire the four text and auto-enter fields the spec marks RETIRING.
7. **The button.** Clipboard grade first (`Set Variable`, `Insert Calculated Result`, copy). Perform AppleScript grade second; it is macOS only, so the iPad keeps the clipboard grade.

**Known guardrail: iCloud eviction.** The recordings live under iCloud Drive, so a correct path can point at an evicted placeholder that Finder still draws as a file. Any grade that runs the command checks the source is downloaded first, and reports that failure in its own words rather than ffmpeg's.

Source: Michael, chat, 2026-11-15 ~11:18a and ~11:47a ET.

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
