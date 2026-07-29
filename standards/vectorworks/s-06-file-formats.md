---
title: S-6 — File Formats
type: standard
package: vectorworks
sequence: 6
domain: theatre
department: all
audience: designers-and-drafters
status: active
last_verified: 2026-07-16
decision: D-016
---

# S-6 — File-format split: Markdown prose, comma-CSV manifests

**Adopted 2026-07-16 · D-016**

---

## The rule

Format each file by its **job**, not by one blanket preference.

**Prose, standards, conventions, the WHY → Markdown (`.md`).** It renders as clean headed pages on GitHub with tables and cross-links, so a designer reads it in a browser with zero tooling, and it is still plain text underneath so it diffs perfectly. **No `.txt`** — that is Markdown with the benefits stripped out: no structure, no rendering, a flat wall at scale.

**Data manifests (layers, classes, symbols, records, inventory) → CSV, comma-delimited.** Machine-comparable, clean per-row diffs, and it mirrors a Vectorworks database worksheet so the reconciliation diff is trivial. **Comma is locked** (quote any value containing one). Vectorworks' worksheet export offers comma or semicolon; we standardized.

**The rule of thumb, which settles every case:**

> **If a Vectorworks worksheet will ever mirror it → CSV. If a human reads it top to bottom → Markdown.**

---

## The guardrail that matters more than the formats

**The worksheet mirror is a RECONCILIATION device, never a source.** The git CSV is **authored first** as the plan. The Vectorworks worksheet renders the file's *actual* state. Export, then diff.

**The worksheet renders a check. It never becomes the source.** Auto-render stays strictly on the tabular manifests — **never render prose standards as worksheets.** This is the S-5 direction-of-truth guarantee applied at the file-format level, and without it the CSVs would quietly invert into file-trailing dumps.

---

## Reach

**Org-agnostic.** S-6 applies to every package, not only URITP or Smith Theatre.

---

## 🔑 This decision predicted `maw-prose`

S-6 was adopted **2026-07-16**. The `maw-prose` repository was created **2026-07-29**, thirteen days later, as a markdown prose repository — and the reasoning that justified it is, line for line, the reasoning already written here: *markdown renders for a human reader with no tooling, and still diffs as plain text.*

**Nobody re-derived it. It was already decided, in a folder filed under a different project.** That is the strongest single piece of evidence that the prose-in-git pattern is the shape this content wants rather than a preference someone imposed on it.

---

*Distilled from finding F-015 (workshop-reasoned, plus vendor tooling facts on worksheet export). Source research: `ClickUp_apps/Vectorworks/VWX-BEST-PRACTICES.md`.*
