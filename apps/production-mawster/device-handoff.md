---
id: device-handoff
title: Device Handoff
type: reference
status: public
order: 25
nav: collapsed
revised: 2026-08
summary: One person, three devices, one file. The file is never open twice — but nothing in the file says so.
---

# Device handoff — the open-log

**One person, three devices, one file.** The file is never open in two places, but nothing in the file *says* so. That is the whole gap.

Extracted from [[Build Sheet](@build-sheet)] on 2026-08-08 when it outgrew an appendix. Fleet-wide concern; implemented here first because this app is the one being built.

## The existing workflow is already a checkout protocol

| Habit | Protocol equivalent |
|---|---|
| download the file onto the device | **checkout** |
| share-sheet it back off the device | **check-in** |
| never open it in two places | **the lease** |
| iCloud between work laptop and home laptop, sequential | the transfer, not the mobile leg |

**It runs in Michael's head. This writes it down.** Nothing here changes the discipline; it instruments it. The one thing memory genuinely cannot do — *"it's not clear what's open elsewhere"* — is what Tier 0 buys.

<hr />

## Tier 0 — three fields + one trigger. No relationships, no dependencies. BUILD THIS FIRST.

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

**Why it earns its place before anything else:** open any copy on any device and it tells you where that copy last lived. A copy on the work laptop last opened on the iPad two hours ago is *visibly* the stale one. The "what's open elsewhere" problem, solved for three fields.

| Rule | Failure mode if broken |
|---|---|
| Stamp on OPEN, not on close | A crash or force-quit never writes a close. Open always fires. |
| Never treat the stamp as a LOCK | It is a sign, not a gate. It reports; it does not prevent. |
| Verify `Get ( Device )` return values against current docs | Return integers get quoted from memory constantly, and are wrong about as often. |

⚠️ `Get ( SystemNVLTargetName )` is **unverified on FileMaker Go** — it may return something useless there. Fallback: a one-time manual device picker written to a global on first open per device.

## Tier 1 — transport

Mobile leg moves to **Dropbox**; laptop↔laptop stays on iCloud. Dropbox earns the mobile leg for exactly one reason: it has an HTTP API `Insert from URL` can call, which makes **pull** scriptable. iCloud has none.

🚫 **Push is never scriptable.** FileMaker Go cannot export to FMP12 at all, so moving a file back off an iPad is an iOS share-sheet operation FileMaker cannot see or trigger. **Design the return trip out of existence rather than trying to automate it.**

## Tier 2 — the launcher (gated on a device test)

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

## Tier 3 — the registry. PARKED.

`APPS` · `APP_BUILDS` · `APP_CHECKOUTS` · `DEVICES` · `SYNC_EVENTS`. **Build only if Tier 0 proves insufficient in practice.**

- `APPS` duplicates two existing inventories (repo `VERSIONS.md`, the URITP fmp Solutions list) — it folds in rather than starting fresh.
- The registry can never live inside the app it tracks, or you must open the stale copy to learn it is stale.
- Open-state should be a **relationship, not a stored flag**: constant calc `cOutFlag = "out"` matched against `APP_CHECKOUTS::State` on a second TO, then `not IsEmpty ( ... )` unstored. Derived state cannot go stale — same law as the [[Projection Law](@projection-law)].

## 🚫 What is NOT on the table

| Not doing | Why |
|---|---|
| Merge / conflict resolution | `.fmp12` is opaque binary. No diff, no merge, not ever. Two edited copies = pick one, retype the other. |
| A pull-request UI | It would be a merge surface that can never merge. |
| Hosting / serving | Ruled out of scope. |
| Automated push from mobile | Platform impossibility, see Tier 1. |

<hr />

# ⬜ Open — UI/DATA separation ("build a UI app later")

Splitting one solution into a records-free **UI** file + a **DATA** file, joined by an external data source reference — the mechanism URITP GLOBAL Setup already uses fleet-wide. Payoff: version push becomes **idempotent**, because a file with no records cannot lose work when overwritten.

| Editing... | Lives in | Separation helps? |
|---|---|---|
| tables, fields, relationships | DATA | no |
| layouts, scripts, value lists, TOs | UI | yes — overwrite is lossless |
| entering / reviewing records | DATA | no |

**The timing tension:** it pays off least during the current schema-build phase and most once the work becomes layouts and reports — but it is cheap only while there are no layouts to re-point, which is *now*. Cheapest now, most useful later. Michael's call; posed as **Q10** on the FMP Apps — Shared Build & Behaviour Decision Log (ClickUp).

## Scripting implications of a later split

### The migration is cheap if you do exactly one thing

**Keep the table-occurrence names identical.** Scripts, calcs and layout objects all address fields as `TOName::fieldName`. If the UI file's *external* TOs carry the same names today's *internal* TOs carry, the overwhelming majority of references survive the split untouched. Rename the TOs during the split and you re-touch every reference in the solution.

### Where everything ends up

| Element | Home | Note |
|---|---|---|
| Layouts, scripts, value lists, custom functions, custom menus, TOs | **UI** | keep ALL logic in one file |
| Tables, fields, records | **DATA** | |
| Accounts + privilege sets | **BOTH** | the one that surprises people |

### Ranked by how likely each is to bite

**1. 🔴 Two LOCAL separated files on FileMaker Go is the least-proven deployment of this pattern.** Separation normally pairs with *hosting*. Reported breakage exists version to version: a local UI+DATA pair working on Go `18.0.3.325` and the data file silently failing to open in the background on Go `19.5.2.200` ([thread](https://community.claris.com/en/s/question/0D53w00005qfLWCCA2/2-filemaker-files-gui-and-database-are-separatedwhen-i-open-the-gui-on-fmgo-1952200-no-data-is-displayed-the-database-file-is-not-opened-in-the-background-with-fmgo-1803325-it-works-fine)), plus same-folder auto-open breaking on FM19 desktop ([thread](https://community.claris.com/en/s/question/0D53w000054J1pPCAS/auto-opening-of-data-file-in-data-separation-model-not-working)). **The payoff is desktop-shaped and the risk is mobile-shaped — and the iPad is exactly where the relief was wanted.**

**2. The Tier 0 stamp splits across both files.** Fields belong in **DATA** (that is the file that travels and goes stale). The trigger stays in **UI**, because `OnFirstWindowOpen` fires when a *window* opens, and a data file opened only as a data source has no window. So UI's `OnFirstWindowOpen` writes across the TO into DATA. **Build the fields in DATA today and they survive the split unchanged** — only the trigger's home moves. ⚠️ Verify the no-window trigger behaviour; it is inferred from [this exchange](https://community.claris.com/en/s/question/0D53w000056WIyWCAW/prompts-to-log-into-multiple-databases-in-webdirect), not from first-party docs.

**3. `Get ( FileName )` and `Get ( FilePath )` start describing the UI file.** Any script building an export path, a `fmp://` link, or a self-referencing backup name from those is silently wrong afterward. Grep for them before splitting.

**4. Accounts must exist in BOTH files with matching name + password**, or every open throws a login dialog for the data file — a matching authenticated account passes through silently, a mismatched one prompts. Privileges become a two-file maintenance job. ⭐ **This lands directly on Q8:** read-only has to be enforced in **DATA**. A read-only privilege set in the UI file cannot stop a record edit, because the records are not there.

**5. Filename stability becomes load-bearing.** Renaming a file breaks its references. And iOS appends ` 2` to a duplicated file — `Production_MAWster_DATA 2.fmp12` breaks the link instantly. This workflow is full of OS-level file shuffling, so that is not hypothetical.

**6. Go is documented as fussy about the path FORM.** Error 100 "unable to open file" with `file:B.fmp12` on Go 17, with advice to drop the `file:` prefix entirely and a note that Go may be **case-sensitive** on filenames ([thread](https://community.claris.com/en/s/question/0D50H00006dskvKSAQ/unable-to-open-fm-go-17-deployed-file)).

**7. Schema changes now require opening the DATA file directly in Pro.** You cannot add a field from the UI file. Every schema session becomes two files open — and schema is the current phase.

**8. Keep ALL scripts in one file.** Cross-file `Perform Script` on Go is documented failing with error 100 until the target file has been manually opened once (same thread as #6). Zero scripts in DATA avoids the entire class.

**9. The discipline that preserves the whole payoff: the UI file holds ZERO records, forever.** The sneaky violation is a value-list source table or a preferences table quietly living in UI. The moment UI holds real data, *overwrite blindly* stops being safe and you have built a second data store.

### Architectural note — prefer LOOSE coupling on mobile

`Open URL [ "fmp://…" ]` launches a file and walks away. An external data source reference is a **hard runtime dependency re-resolved on every open**. On Go, the loose one is the safer one. That is why Tier 2's launcher is a better mobile bet than separation, even though separation is the more elegant idea.

### Revised recommendation

Treat separation as a **desktop maintenance play for once layouts exist**, not as the mobile-handoff fix. If it happens: split while layouts are still few, keep TO names, and **test the local pair on Go before committing to it.**
