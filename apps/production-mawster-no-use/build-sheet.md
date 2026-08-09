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

<hr />

## ⬜ Device handoff — the open-log

**One person, three devices, one file. The file is never open in two places — but nothing in the file says so.** This closes that gap. Logged 2026-08-08; fleet-wide concern, implemented here first because this app is being built now.

The existing workflow is already a checkout protocol: download to device = checkout, share-sheet the file back out = check-in, sequential-only = the lease. **It runs in Michael's head. This writes it down.** Nothing here changes the discipline; it instruments it.

### Tier 0 — three fields + one trigger. No relationships, no dependencies. BUILD THIS FIRST.

On `00_APP` (or wherever the single-record app-state row lives):

| Field | Type | Written by |
|---|---|---|
| `LastOpenedAt` | Timestamp | `OnFirstWindowOpen` |
| `LastOpenedDevice` | Text | `OnFirstWindowOpen` |
| `LastOpenedPlatform` | Text | `OnFirstWindowOpen` |

```
Set Field [ 00_APP::LastOpenedAt       ; Get ( CurrentTimeStamp ) ]
Set Field [ 00_APP::LastOpenedDevice   ; Get ( SystemNVLTargetName ) ]
Set Field [ 00_APP::LastOpenedPlatform ; Get ( Device ) ]
```

Surface it as merge text, top-right of the home layout: `home-mbp · Aug 8 7:20 PM`.

**Why it earns its place before anything else:** open any copy on any device and it tells you where that copy last lived. A copy on the work laptop last opened on the iPad two hours ago is *visibly* the stale one. That is the whole "what's open elsewhere" problem solved for three fields.

| Rule | Failure mode if broken |
|---|---|
| Stamp on OPEN, not on close | A crash or a force-quit never writes a close. Open always fires. |
| Never trust the stamp as a LOCK | It is a sign, not a gate. It reports; it does not prevent. |
| Verify `Get ( Device )` return values against current docs | Return integers are quoted from memory constantly and are wrong about as often. |

⚠️ `Get ( SystemNVLTargetName )` is **unverified on FileMaker Go** — it may return something useless there. If so, fall back to a one-time manual device picker written to a global on first open per device.

### Tier 1 — transport

Mobile leg moves to **Dropbox**; laptop↔laptop stays on iCloud. Dropbox earns the mobile leg for exactly one reason: it has an HTTP API `Insert from URL` can call, which makes **pull** scriptable. iCloud has none.

🚫 **Push is never scriptable.** FileMaker Go cannot export to FMP12 at all, so moving a file back off an iPad is an iOS share-sheet operation FileMaker cannot see or trigger. **Design the return trip out of existence rather than trying to automate it.**

### Tier 2 — the launcher (gated on a device test)

A small permanent `MAW_Launch.fmp12` per device: lists the apps, shows each build stamp, one **Pull newest** button each. Splits a tiny always-current control plane from the fat on-demand data plane.

```
Insert from URL [ target: container ; Dropbox download endpoint ]

# VALIDATE — never skip. Insert from URL succeeds at storing whatever came back.
# A 404 page and a wrong MIME type both land in the container looking fine.
Set Variable [ $size ; GetContainerAttribute ( container ; "fileSize" ) ]
Set Variable [ $md5  ; GetContainerAttribute ( container ; "MD5" ) ]
If [ $size < 100000 or $md5 ≠ expected ]  →  fail loudly, exit

Export Field Contents [ container ; Get ( DocumentsPath ) & filename ]
Open URL [ "fmp://~/" & filename ]
```

⚠️ **Two unverified claims block Tier 2. Test on a real device before designing further:**

1. the launch token — `fmp://~/` vs `fmp://$/` on current FileMaker Go. No first-party dated source found for either.
2. whether `Export Field Contents` can write where Go actually browses. A 2024 report has AirDropped `.fmp12` files landing in an iOS Downloads folder Go cannot see at all.

If either fails, Tier 2 does not exist. Tiers 0 and 1 stand alone regardless.

### Tier 3 — the registry. PARKED.

`APPS` · `APP_BUILDS` · `APP_CHECKOUTS` · `DEVICES` · `SYNC_EVENTS`. Full shape and reasoning on the session task. **Build only if Tier 0 proves insufficient in practice.** Notes: `APPS` duplicates two existing inventories (repo `VERSIONS.md`, the URITP fmp Solutions list) so it folds in rather than starting fresh; and the registry can never live inside the app it tracks, or you must open the stale copy to learn it is stale.

Open-state should be a **relationship, not a stored flag** — constant calc `cOutFlag = "out"` matched against `APP_CHECKOUTS::State` on a second TO, then `not IsEmpty ( ... )` unstored. Derived state cannot go stale. Same law as the [[Projection Law](@projection-law)].

### 🚫 What is NOT on the table

| Not doing | Why |
|---|---|
| Merge / conflict resolution | `.fmp12` is opaque binary. No diff, no merge, not ever. Two edited copies = pick one, retype the other. |
| A pull-request UI | It would be a merge surface that can never merge. |
| Hosting / serving | Ruled out of scope. |
| Automated push from mobile | Platform impossibility, see Tier 1. |

### ⬜ Open — UI/DATA separation

Splitting a solution into a records-free UI file + a DATA file, joined by an external data source reference (the mechanism URITP GLOBAL Setup already uses fleet-wide). Makes version push **idempotent**: a UI file holds no records, so overwriting it can never lose work.

| Editing... | Lives in | Separation helps? |
|---|---|---|
| tables, fields, relationships | DATA | no |
| layouts, scripts, value lists, TOs | UI | yes — overwrite is lossless |
| entering / reviewing records | DATA | no |

**The tension, stated honestly:** it pays off least during the current schema-build phase and most once the work becomes layouts and reports — but it is cheap only while there are no layouts to re-point, which is *now*. Cheapest now, most useful later. Michael's call; posed as Q10 on the FMP Apps — Shared Build & Behaviour Decision Log (ClickUp).

⚠️ Also unverified: two **local** separated files referencing each other via external data source **on FileMaker Go**. Separation normally pairs with hosting. Same device test as Tier 2.
