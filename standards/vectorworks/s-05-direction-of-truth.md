---
title: S-5 — Direction of Truth
type: standard
package: vectorworks
sequence: 5
domain: theatre
department: all
audience: designers-and-drafters
status: active
last_verified: 2026-07-16
decision: D-015
---

# S-5 — Direction of truth: git is the plan, Vectorworks is the realization

**Adopted 2026-07-16 · D-015 · The standard that governs all the others**

---

## The rule

- **Git is the PLAN — the design-time source of truth.** It holds the *intended* structure (the layers we expect, the class tree, the sheet scheme, the conventions), the goals, and the **hand-drawn reference notes and drawings that are actually handed to collaborators** and that Michael drafts against. **Git LEADS.**
- **Vectorworks (local files) is the REALIZATION — the as-built.** It reflects what has actually been made. The `.vwx` lives locally, never in git (D-009).
- **The Vectorworks-to-git export is RECONCILIATION, not population.** The worksheet, CSV, and PDF export machinery exists so Michael can produce a snapshot and ask *"does what I built match what we documented?"* It is an occasional checking aid. **We do not routinely import the file's state into git**, and the file's export does not become the primary package content.
- **Direction of authorship:** plan in git → build in Vectorworks from it → spot-check the build against the plan. **Never** build in Vectorworks then dump to git.

---

## Why this is the load-bearing one

The project it came from had been spinning its wheels for a long time, and the diagnosis was precise: *"there are no defined goals or endpoints, so every work session is just open the file and start poking."*

A documentation trail that **describes** a file can only ever lag it. It is written after the fact, it goes stale the moment the file changes, and it gives you nothing to work *toward*. **A plan that the file is built to match gives every session a defined endpoint.** That is the entire reframe, and it is why the export direction had to be settled rather than left to feel.

This explicitly parallels the FileMaker workflow: the agent preps the spec, Michael builds from it.

---

## 🔑 It generalizes past Vectorworks entirely

On **2026-07-29**, a boundary was drawn between FileMaker and this repository: **FileMaker holds documents as RECORDS, git holds documents as SOURCE, and the join is one-directional** — a FileMaker record may carry a path into the repo; the repo never carries a copy of a record.

**That is S-5, thirteen days later, in a different domain.** Same shape: git leads and holds intent, the external tool holds realization, the join runs one way, and two copies of one truth are the failure mode being designed out.

S-5 was written about a `.vwx` file. **Read it as the general rule for git against any external authoring tool.**

---

## Relationship to earlier decisions

**Refines rather than contradicts D-001 and D-009.** The package is still versioned docs in git with the file outside git — but its center of gravity is the **forward-looking plan**, not a file-trailing description. **Where any earlier text reads file-first, S-5 governs.**

---

## Open

**Reconciliation-snapshot policy:** does a generated snapshot live in the repo, or stay a throwaway diff? The *format* is settled (comma-CSV, or PDF/A-1b if archival, per S-6). **Whether it is committed at all is not.**

---

*Source research: `ClickUp_apps/Vectorworks/VWX-BEST-PRACTICES.md`, informed by findings F-004, F-011, and F-014 on the export machinery.*
