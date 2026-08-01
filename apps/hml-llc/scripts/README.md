# Scripts

*Mirrors Manage Scripts. A script's path here is where it lives in the Script Workspace. Folder tree confirmed against the live file 2026-07-31; five of eleven folders carry bodies.*

## The copy-target rule

This is the most important thing in the package and it governs every file below.

A `.fmscript` is **not read, it is typed** — hand-entered into *Manage Scripts* step by step, because FileMaker's script clipboard is an XML snippet and there is no paste-back path. So **everything inside one has to be something you want to type.**

That splits each script into two files, and the split axis is not prose-versus-code. It is **typed versus not typed.**

The `.fmscript` holds the copy target: a short header of four to six `#` lines saying what the script does, the parameter contract, the return contract, and at most one line naming the single most dangerous thing about it, plus inline `#` comments where a step needs explaining. Those comments become real comment steps in FileMaker and they are worth having.

The `.notes.md` sidecar holds everything else — status, defects, reasoning, rewrite checklists, fixture expectations, relationship requirements. Read on a phone, never typed.

**The split has to be at the file boundary rather than a marker inside one file.** A `#` line is a valid FileMaker comment step, so over-selecting past a marker does not fail — it silently pastes your changelog into a payment routine. Whole-file copy is the only version that cannot be got wrong.

The test before adding a line to a body: *would I want to type this into FileMaker?* If no, it belongs in the sidecar.

## The folder tree

Eleven folders. Six are documented and have no scripts written yet; they are listed here rather than created as empty directories, because a file appears when there is something to put in it.

| Folder | Belongs here | Does not | Bodies |
|---|---|---|---|
| `00_APP` | startup, app-wide guards, the `txn_*` trio | layout button handlers | 3 |
| `10_UI` | tab switching, card open/close, visual state | data posting | 1 |
| `20_NAV` | found-set navigation, jump to related record | business calculations | — |
| `30_CONTEXT` | set current property, resolve current loan | document capture, payoff generation | 1 |
| `40_BINDER` | new document, new version, linking, cleanup queue | loan schedule logic | — |
| `50_RECEIPTS` | create `ReceivedFunds`, proof-first intake | payoff output | — |
| `60_PAYMENTS` | post money rows, waterfall, reversals | hub tab switching | 1 |
| `70_SCHEDULE` | generate expected rows, defer, late fees | document versioning | 1 |
| `80_PAYOFF` | duplicate prior payoff, snapshot math, issue | generic receipt capture | — |
| `90_ADMIN` | migration helpers, data repair, seed metadata | daily workflow scripts | — |
| `zz_DEV_ARCHIVE` | retired experiments | anything a live button calls | — |

Naming is `<FOLDER_CODE>__<Verb_Object>`, two underscores after the code, named by job rather than by button label. `60_PAYMENTS__Post_ReceivedFunds_Batch`, not `PostButton`.

## utilities — the one divergence

`utilities/` is not in the documented FileMaker tree and it holds `commitRecord`, a shared cross-app helper. A house-standard helper does not obviously belong in `90_ADMIN` either, since that folder is for one-offs and repair.

It travels with this package because **`commitRecord` is the only script in this app verified present in a real FileMaker file.** Whether the live file has a `utilities` folder or keeps the helper somewhere else is an open question about FileMaker's internals, not about whether the script exists. Flag it, do not fix another system's structure from here.

## What is here

**`00_APP/`** — the `txn_*` trio. Three entry points to one design, sharing a single sidecar because splitting the reasoning three ways would mean maintaining it in triplicate. Golden, not built. **Build them after `ReceivedFunds` exists** — that ordering is a correctness matter, not a preference.

**`10_UI/Set_Hub_Tab`** — the only script that came through the June 2026 audit unscathed, because it does exactly one thing.

**`30_CONTEXT/Select_Property_Context`** — everything downstream reads what this writes.

**`60_PAYMENTS/Auto_Apply_Waterfall`** — superseded. Read the sidecar before typing any of it.

**`70_SCHEDULE/Generate_Expected_Schedule`** — golden with two open defects, one of them a date-overflow bug that no fixture loan trips.

**`utilities/commitRecord`** — built.

Thirteen further scripts are named across the design documents and have no bodies here. Porting them is mechanical rather than a design task.
