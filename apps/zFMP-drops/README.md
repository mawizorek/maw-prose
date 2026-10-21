---
id: fmp-drops
title: "FileMaker drops"
type: reference
status: hidden
summary: Drop folder for FileMaker DDR-XML exports. A workflow strips each drop into compact state files under fmp-state/ and deletes the raw XML.
---

# FileMaker drops

Drag a FileMaker export here (github.com → this folder → **Add file → Upload files** → commit to `main`). Within a minute it's gone from this folder and the stripped-down version is in `fmp-state/<app>/`.

## Which export

✅ **Tools → Database Design Report → format XML.** One `.xml` per `.fmp12`. Any filename is fine. The app is read from inside the file.

🚫 **Not "Save a Copy as XML."** It carries account and file-access authentication data. The workflow rejects it, deletes it, and fails loud, but it has already been committed by then, so that commit has to be purged from history.

## What comes out

- `DELTA.md`: what was added, removed, renamed or changed since the previous drop. **Read this first.**
- `STATE.md`: the whole app in one read. Tables and fields with calcs and comments, TOs, relationships, value lists, custom functions, scripts with call graph, layouts with button wiring. Layout geometry and styling are left out on purpose.
- `STEPS.md`: full script steps, for when you need them.
- `fingerprints.json`: per-object hashes keyed by FileMaker's internal ids, so a rename reads as a rename.

Index of every app: `fmp-state/index.md`.

Unknown XML formats (neither DDR nor Save-as-XML) are skipped with a warning and left in this folder for manual review.
