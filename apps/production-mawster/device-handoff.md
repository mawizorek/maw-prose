---
id: device-handoff
title: Device Handoff
type: reference
status: public
order: 25
nav: collapsed
revised: 2026-08
summary: One file, three devices. The file is never open twice — it just never SAYS which copy is current. A display problem, not a sync problem.
---

# Device handoff — the open-log

🔒 **SINGLE-FILE LOCKED 2026-08-08** (Michael): *"kinda want to keep it all in one… I've not **really** had issues with the transferring up to this point and I design MOSTLY for interaction on my iPad — it's slick."*

**That ruling shrank this doc's job to one sentence: the file never says which copy is current.** Not a sync problem, not a version-control problem. A **display** problem. Everything below either serves that or is marked speculative.

| Ruling | Effect |
|---|---|
| One file, no UI/DATA split | separation → [[revisit block](#if-we-ever-revisit-separation)], not queued |
| Transfer has not been painful | **Tiers 1–3 DEMOTED to speculative** |
| iPad is the PRIMARY interaction surface | mobile read-only is dead; layouts target iPad |

## The existing workflow is already a checkout protocol

| Habit | Protocol equivalent |
|---|---|
| download the file onto the device | **checkout** |
| share-sheet it back off the device | **check-in** |
| never open it in two places | **the lease** |
| iCloud between work laptop and home laptop, sequential | the transfer — and it works |

**It runs in Michael's head, and it runs fine.** The only thing memory genuinely cannot do is *"it's not clear what's open elsewhere."* That is the entire build.

<hr />

# ⬜ THE BUILD — Tier 0 + the landing page

## 0a · File-level stamp — three fields, one trigger, no relationships

On `00_APP` (the single-record app-state row):

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

Open any copy on any device and it tells you where that copy last lived. A copy on the work laptop last opened on the iPad two hours ago is *visibly* the stale one.

| Rule | Failure mode if broken |
|---|---|
| Stamp on OPEN, not on close | A crash or force-quit never writes a close. Open always fires. |
| Never treat the stamp as a LOCK | It is a sign, not a gate. It reports; it does not prevent. |
| Verify `Get ( Device )` return values against current docs | Return integers get quoted from memory constantly, and are wrong about as often. |

⚠️ `Get ( SystemNVLTargetName )` is **unverified on FileMaker Go**. Fallback: a one-time manual device picker written to a global on first open per device.

## 0b · Record-level state — a FOLD-IN, plus exactly one new field

**Four of these already exist as a fleet convention** (see `Departments`, `Fiscal_Years` and others in URITP Global Setup). Formalize them on every canonical table, and add the fifth:

| Field | Auto-enter | Native? |
|---|---|---|
| `CreationTimestamp` | Creation → Timestamp | ✅ built in |
| `CreatedBy` | Creation → Account Name | ✅ built in |
| `ModificationTimestamp` | Modification → Timestamp | ✅ built in |
| `ModifiedBy` | Modification → Account Name | ✅ built in |
| **`ModifiedOnDevice`** | **Calculated value, "do not replace" UNCHECKED** | 🆕 the only new one |

FileMaker has no native "which device modified this," so `ModifiedOnDevice` is an auto-enter **calculated value** with *do not replace existing value* left unchecked, so it re-stamps on every edit. Feed it the same value `0a` resolves, ideally through one global set at open so both agree.

### ⭐ Why this is the highest-value field in the build

It **automates the audit Michael already does by hand.** His words: *"reopen it on my Mac and audit it."* With `ModifiedOnDevice` on every table, that audit becomes a query — *show me every record touched on the iPad since this file was last opened on a laptop.* The manual read-through stops being necessary.

It also degrades gracefully: even if the landing page is never built, the fields alone make the question answerable from a Find.

## 0c · The landing page

One home layout, iPad-first, showing: the file-level stamp, counts of recently-touched records per table, and anything flagged for review.

### 🔴 The rule that decides whether this layout is fast or unusable

**No live unstored aggregate calcs and no summary fields on this layout.** They recalculate on record load, throw the `Summarizing…` progress dialog, and are a documented cause of catastrophic open times — including a case of a file taking **15 minutes to open** on a one-record layout, diagnosed to aggregate calcs and summary fields ([thread](https://community.claris.com/en/s/question/0D50H00006h8vawSAA/15-minutes-to-open-a-file)).

**Instead, CACHE:** a script writes plain number fields on `00_APP` at open, the layout displays those, and a visible `counts as of <timestamp>` line plus a manual **Refresh** button keeps it honest ([caching pattern](https://blog.gomainspring.com/filemaker-community/caching-data-to-improve-layout-performance-in-filemaker)). A stale-but-labelled number beats a live number that costs 15 seconds a tap.

### iPad-first, because that is the primary surface

Michael designs *on* desktop (Go cannot edit layouts) but *lives* on iPad. So:

- **build and measure at iPad dimensions**, not desktop-then-shrink
- **no hover states** — they do not exist on touch
- **popovers and Card windows over dialogs** — dialogs are hostile on touch
- **generous touch targets**; buttons sized for a thumb, not a cursor
- **test on the device**, because the design surface and the use surface are different machines

⚠️ Pure look-and-feel belongs in [[UX](@user-experience)], not here. This doc owns only the STATE the landing page displays.

### ⬜ Open — what "database state" means

Michael said *"tagging of records or database state"* and those are two different builds. Not guessing:

1. **File-level mode** — one field on `00_APP` (`clean` / `working` / `needs-audit`), set manually or by script. Answers *"is this copy trustworthy."*
2. **Record-level lifecycle** — a status field per record (`draft` / `confirmed` / `needs-review`), which is domain state and belongs with each table's own design.

`0b` above delivers neither; it delivers *provenance* (who, when, where), which is the prerequisite for both.

<hr />

# 💤 Speculative — Tiers 1–3 (demoted 2026-08-08)

**These solved a problem Michael does not have.** Kept because the reasoning is sound and the constraints are real, not because they are queued.

| Tier | Idea | Why it is parked |
|---|---|---|
| **1** | Mobile leg to Dropbox; iCloud stays for laptop↔laptop | Dropbox is the only leg with an HTTP API `Insert from URL` can call, so it is the precondition for ANY pull automation. But the transfer has not hurt. |
| **2** | `MAW_Launch.fmp12` per device — build stamps + a **Pull newest** button | Blocked on an untested device claim (below). Nice, not needed. |
| **3** | `APPS` · `APP_BUILDS` · `APP_CHECKOUTS` · `DEVICES` · `SYNC_EVENTS` | Tier 0 answers most of what it would report. `APPS` also duplicates `VERSIONS.md` + the URITP fmp Solutions list. |

**Constraints that stay true regardless:**

- 🚫 **Push is never scriptable.** FileMaker Go cannot export to FMP12 at all, so moving a file off an iPad is an iOS share-sheet operation FileMaker cannot see or trigger.
- ⚠️ **Validate any download.** `Insert from URL` succeeds at storing *whatever came back* — a 404 page and a wrong MIME type both land in a container looking fine. `GetContainerAttribute ( … ; "fileSize" )` and `"MD5"` make the check two lines.
- ⚠️ **Untested:** the launch token (`fmp://~/` vs `fmp://$/`) on current Go, and whether `Export Field Contents` can write where Go actually browses (a 2024 report has AirDropped `.fmp12` files landing in an iOS Downloads folder Go cannot see).
- A registry can never live inside the app it tracks, or you must open the stale copy to learn it is stale.
- Open-state should be a **relationship, not a stored flag** — constant calc `cOutFlag = "out"` matched against `APP_CHECKOUTS::State` on a second TO, then `not IsEmpty ( … )` unstored. Derived state cannot go stale, same law as the [[Projection Law](@projection-law)].

## 🚫 Never on the table

| Not doing | Why |
|---|---|
| Merge / conflict resolution | `.fmp12` is opaque binary. No diff, no merge, not ever. Two edited copies = pick one, retype the other. |
| A pull-request UI | It would be a merge surface that can never merge. |
| Hosting / serving | Out of scope by ruling. |
| Automated push from mobile | Platform impossibility. |
| Mobile read-only privilege set | ⛔ **Killed 2026-08-08** — the iPad is the primary interaction surface. |

<hr />

# 🪦 If we ever revisit separation

**Rejected 2026-08-08 (Q10 → no).** Splitting into a records-free UI file + a DATA file makes version push *idempotent*, because a file with no records cannot lose work when overwritten. It was rejected for a good reason, kept for a better one: the reasoning is what stops it being re-proposed cold.

**Why it lost:** the payoff is desktop-shaped and the risk is mobile-shaped, and mobile is where Michael works. A local separated pair on FileMaker Go is the **least-proven deployment of the pattern** — separation normally pairs with hosting. Documented breakage: a local pair working on Go `18.0.3.325` and the data file silently failing to open on `19.5.2.200` ([thread](https://community.claris.com/en/s/question/0D53w00005qfLWCCA2/2-filemaker-files-gui-and-database-are-separatedwhen-i-open-the-gui-on-fmgo-1952200-no-data-is-displayed-the-database-file-is-not-opened-in-the-background-with-fmgo-1803325-it-works-fine)); same-folder auto-open breaking on FM19 desktop ([thread](https://community.claris.com/en/s/question/0D53w000054J1pPCAS/auto-opening-of-data-file-in-data-separation-model-not-working)); Go returning error 100 on a `file:`-prefixed path and possibly being case-sensitive on filenames ([thread](https://community.claris.com/en/s/question/0D50H00006dskvKSAQ/unable-to-open-fm-go-17-deployed-file)).

**Architectural principle worth keeping even though the pattern lost:** `Open URL [ "fmp://…" ]` is **loose** coupling — launch and walk away. An external data source reference is a **hard runtime dependency re-resolved on every open**. On Go, prefer loose.

**The four things that would bite, if it is ever reconsidered:**

1. **Keep table-occurrence names identical.** Everything addresses fields as `TOName::fieldName`, so same-named external TOs mean most references survive untouched. Renaming during the split means re-touching the whole solution.
2. **Accounts must exist in both files with matching name + password**, or every open prompts. Read-only would have to be enforced in DATA — UI privileges cannot stop an edit on records that are not there.
3. **`Get ( FileName )` / `Get ( FilePath )` start describing the UI file**, silently breaking any script that builds a path or an `fmp://` link from them.
4. **Filename stability becomes load-bearing** — and iOS appends ` 2` to duplicates, which breaks the reference instantly.

Also: keep ALL scripts in one file (cross-file `Perform Script` on Go fails with error 100 until the target has been opened manually once), and the UI file must hold **zero records forever** — the sneaky violation is a value-list source or preferences table, and it silently destroys the entire payoff.
