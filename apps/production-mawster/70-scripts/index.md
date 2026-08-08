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

This folder owns the `scripts` id. ⚠️ The legacy paste under `90-file-imports-temp/` claimed it too until 2026-08-08 — **links to a duplicated id are a coin flip**, and a scratch import beating the app's own folder to a name is the wrong winner.

## What the legacy review says to PORT

From [[Legacy Script Review](@legacy-script-review)], the four worth carrying:

- **`CREATE PRODUCTION WORKDAYS`** — the generator. Two loops (production days forward from first rehearsal, pre-pro backward), then sort by date → stamp sequential sort → re-sort. ⚠️ Kill the magic `+ 10` on the pre-pro exit.
- **`showRelevantDates`** — find hidden → **Show Omitted Only** → constrain by date. The found-set trick that makes hide-as-existence work.
- **`EXPORT Calendar Set`** — the filename builder. ⚠️ Its four-output sequence is now DATA: [[PRINT_SETS](@table-print-sets)].
- **`PRINT_SETUP` pair** — parameter `1` = landscape, else portrait.

🚫 And the ones that die: delete-and-replace import · the CSV header-row delete · portal-geometry date math · the six colour scripts · the FCCalendar addon.
