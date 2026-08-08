---
id: scripts
title: Scripts
type: index
status: public
order: 70
nav: collapsed
revised: 2026-08
summary: The app's own script index. Nothing built yet.
---

# Scripts

⬜ **Empty. Nothing is built.**

⚠️ **This folder owns the `scripts` id.** The legacy paste under `90-file-imports-temp/` claimed it too — **links to a duplicated id are a coin flip**, and a scratch import beating the app's own folder to a name is the wrong winner. Fix on that side is a one-line front-matter edit to `legacy-scripts-01`.

## What the legacy review says to PORT

From [[legacy script review](@legacy-script-review)], the four worth carrying:

- **`CREATE PRODUCTION WORKDAYS`** — the generator. Two loops (production days forward from first rehearsal, pre-pro backward), then sort by date → stamp sequential sort → re-sort by it. ⚠️ Kill the magic `+ 10` on the pre-pro exit condition.
- **`showRelevantDates`** — find hidden → **Show Omitted Only** → constrain by date. The found-set trick that makes hide-as-existence work.
- **`EXPORT Calendar Set`** — the filename builder. ⚠️ Its four-output hardcoded sequence is now DATA: [[PRINT_SETS](@table-print-sets)].
- **`PRINT_SETUP` pair** — parameter `1` = landscape, else portrait. Clean.

🚫 **And what dies:** delete-and-replace on import · the CSV header-row delete · portal-geometry date math · the six colour scripts · the FCCalendar addon.

## House rule for anything written here

🔴 `Set Error Capture [On]` plus a `Get(LastError)` check after **every** write. A swallowed error means the caller believes a write landed. Legacy had scripts that failed silently and one that shipped with a live debug dialog.
