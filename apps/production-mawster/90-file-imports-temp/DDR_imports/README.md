---
id: mawster-ddr-imports
title: "DDR imports (staging) - deletion log"
type: reference
status: hidden
revised: 2026-08
summary: Staging folder for FileMaker DDR exports. Records which imports were captured and deleted, and how to recover them.
---

# DDR imports — staging + deletion log

**This folder is STAGING, not storage.** A DDR export lands here, gets transcribed into the `_ide`
mirrors, and is then deleted. Michael's rule, 2026-08-16: *"those DDR can be volatile and cheap
and rolled back if we need so delete the lines / files entirely."*

🔴 **Every `_ide` mirror's `provenance:` front matter points at a DDR path in this folder. Those
paths are DEAD once the import is deleted.** This file is what keeps them resolvable. **Do not
delete this log.**

## 🪦 Deleted imports

### `2608151650` — Aug 15 2026, 16:50 · DELETED 2026-08-16

| | |
|---|---|
| Source file | `Production_MAWnster.fmp12` |
| Size | 360,264 bytes |
| Chunk set | 21 parts, File Chunker v18 |
| Set UUID | `7534bbed-6a2a-4d5a-a2a2-7d3b00ced5b8` |
| Files deleted | 24 (`raw.txt` + `source/` with 21 chunks, `raw_index.txt`, `README.txt`) |
| **Last commit containing it** | **`d5745a9546c072e18f6041a7d27d7cce29ca4e61`** |

**Recovery:** `git show d5745a9:production-mawster/90-file-imports-temp/DDR_imports/2608151650/raw.txt`
— or browse the tree at that SHA. **Nothing was force-pushed or rewritten; the blobs are intact in
history.**

**Overview counts, for reference without recovering:**

```
Tables 37 | Relationships 15 | Layouts 54 | Scripts 52
Value Lists 14 | Custom Functions 10 | Accounts 0 | Privilege Sets 0
```

#### What was captured before deletion

| DDR section | Chunks | Mirror | Coverage |
|---|---|---|---|
| Tables + Fields | 1-7 | `20-tables/_ide/` | ✅ 37 of 37 tables, 398 of 398 fields |
| Relationships | 8 | `30-RELATIONSHIPS/_ide/` | ✅ 15 of 15, full detail blocks |
| Value Lists | 16 | `25-value-lists/_ide/` | ✅ 14 of 14 |
| Custom Functions | 21 | `60-custom-functions/_ide/` | ✅ index only (10 names + call sites) — bodies are canonical in another repo, by ruling |
| Scripts | 16-21 | `70-scripts/_ide/` | ✅ 52 of 52, verbatim step lists |
| Layout hierarchy + properties | 8-9 | `50-LAYOUTS/_ide/` | ✅ 54 of 54 layouts |
| Themes | 21 | `50-LAYOUTS/_ide/` | ✅ both, inline |

#### 🔴 What was NOT captured — recoverable ONLY from history

1. **Layout Objects** (chunks 9-17, ~8 chunks) — per-field `Top/Left/Bottom/Right` coordinates,
   `Anchoring`, `Field Format`, `Field Behavior`, `Quick Find`; portal geometry and sort orders;
   button-bar segment coordinates; graphic-object placement. **Deliberately skipped** — Michael,
   2026-08-16: *"dont need the loayout objects yet."* Print geometry is not auditable from the
   mirrors; it comes from a fresh DDR or from FileMaker.
2. **`EXPORT_SET_ITEMS.fkDocument`'s full comment** — the DDR itself truncated it mid-word at
   `(based on <defa`. It was never in this export; the full text exists only in the `.fmp12`.
3. **Whether `IMPORT_EVENTS.json_cleanImportDetails`'s calculation is genuinely
   paren-unbalanced** or was clipped by the DDR printer. The mirror records the question; only a
   fresh export or FileMaker settles it.

### `2608142227` — Aug 14 2026, 22:27 · deleted by Michael before 2026-08-16

314,216 bytes, 20 chunks, set UUID `47c7e43c-f8b4-408b-9d92-d250669b7485`. Its Scripts section was
transcribed on Aug 14 (44 scripts at the time) and later superseded. **Deletion commit not
recorded** — it was removed outside this process, along with `202608091647`, `2608091647` and
`2608121248`.

⚠️ **Lesson, and the reason this log exists:** the Aug-14 import was deleted while
`70-scripts/_ide/` still cited it as the live source, which left provenance pointing at a path
that no longer resolved. Fixed by re-transcription against `2608151650`. **From now on, an import
gets a row here BEFORE it is deleted, with its last-containing commit SHA.**

## 📂 Still present

### `26080916471` — NOT captured, NOT deleted

`raw.txt` at 102,878 bytes plus a `source/` chunk set. **Left in place deliberately: it was never
transcribed, so deleting it would drop content that exists nowhere else in the repo.**

⚠️ **The folder name has ELEVEN digits.** Every other import here uses a 10-digit `YYMMDDHHMM`
stamp. Two Aug-9 imports previously existed with byte-identical content under `202608091647` and
`2608091647`; both are gone. **Whether this is a third copy, a rename of one of them, or a
distinct export cannot be determined from the name alone**, and its 102,878-byte size matches
what those two carried.

**Before deleting it, decide one of:** (a) it is a superseded duplicate of an Aug-9 export and can
go, or (b) it holds something the Aug-15 export does not, in which case capture first. **Do not
assume from the size match.**

## Naming convention

`YYMMDDHHMM` — ten digits, local time of export. `2608151650` = 2026-08-15 16:50.

⚠️ Historically inconsistent: `202608091647` (12 digits, full year), `2608091647` (10, correct),
`26080916471` (11, unexplained). **Ten digits going forward.**
