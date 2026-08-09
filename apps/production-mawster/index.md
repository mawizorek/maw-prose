---
id: production-mawster-moved
title: Production MAWster (MOVED)
type: reference
status: hidden
order: 9999
nav: hidden
revised: 2026-08
summary: MOVED to mawizorek/uritp-docs → production-mawster/. Nothing here is canonical.
---

# 🪦 Production MAWster — MOVED

**Canonical home: `mawizorek/uritp-docs` → `production-mawster/`.**

Moved by Michael 2026-08-08 so the tree renders on a known path. Nothing in this folder is canonical; do not read, edit, or build against it.

## Why this stub exists rather than an empty folder

On 2026-08-08 two documents (`device-handoff.md`, a revised `build-sheet.md`) were written to THIS path *after* the move, because the write target was carried forward from earlier in the same session instead of being re-derived. Git creates a directory on write, so **a misplaced write cannot fail** — it forks the tree silently. Those files have been landed in `uritp-docs` and deleted from here.

**The lesson, and the reason it is written down here where the mistake happened:** the Repo Referent Gate's rule applies to PATHS inside a repo, not only to repo names. A run of successful writes to a path is not evidence the next one belongs there. Re-derive at subject-turn, and treat a directory listing that disagrees with your last read as a **changed tree**, never as cache latency.

## Also here

`apps/production-mawster-no-use/` holds the pre-move copy of the tree. Michael's naming, Michael's call whether it gets culled. See [`MOVED.md`](../production-mawster-no-use/MOVED.md) there.
