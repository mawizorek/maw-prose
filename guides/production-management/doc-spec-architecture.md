# Doc Spec Architecture

> One registry. Two layers. Three horizons.

## The Problem

Production paperwork (info sheets, contact sheets, crew calls, rehearsal reports) lives across Dropbox, Google, Word, and ClickUp. When a date or contact changes, 3-7 documents need updating across platforms. Today that's manual memory.

The info sheet is the perfect example: it downstream-summarizes the production calendar AND the contact sheet, making it the doc you forget precisely because "someone else already updated the source."

## The Concept

**Doc specs** are field-level definitions of what each document type contains. Not instructions on how to update them. Not meta-documentation. Just: "a cast list contains these 20 fields."

This is the **documentation analog to the Document Destroyer** (the CU doc that catalogs which documents exist and their lifecycle). The Destroyer says "here's every doc a production produces." Doc specs say "here's what goes IN each type."

## The Split (three layers)

| Layer | Home | Purpose | Audience |
|-------|------|---------|----------|
| **Registry** | ClickUp list | Metadata, filtering, lifecycle status | Agents + Michael (browse/filter) |
| **Spec** | Git (`maw-prose/guides/doc-specs/`) | Versioned field definitions, copy-pasteable | SMs, designers, Michael (reference) |
| **Schema** | FMP (future) | Normalized records, relational queries, exports | Automated systems, reports |

### Why three and not one

- **Git** gives version history, tight prose, and copy-paste for a new SM asking "what goes in a crew call?"
- **CU list** gives filtering (show me all docs maintained by SM, show me all docs that contain dates) without opening a repo
- **FMP** gives the relational graph (when Date X changes, which document instances need updating?) that neither git nor a flat list can express

## Doc Tree (Git)

```
guides/
├── doc-specs/                    ← NEW: unified field-spec folder
│   ├── _TEMPLATE.md             ← bare-bones spec skeleton
│   ├── README.md                ← pointer to this architecture doc
│   ├── info-sheet.md
│   ├── contact-sheet.md
│   ├── production-calendar.md
│   ├── crew-call.md
│   ├── cast-list.md
│   ├── rehearsal-report.md
│   ├── performance-report.md
│   ├── props-list.md
│   ├── costume-plot.md
│   ├── scenic-design-packet.md
│   ├── light-plot.md
│   ├── sound-plot.md
│   ├── box-office-report.md
│   ├── safety-briefing.md
│   └── risk-assessment.md
├── production-management/        ← PROCESS guides (how to maintain)
│   ├── updating-contact-sheets.md
│   ├── updating-production-calendars.md
│   ├── updating-info-sheets.md
│   └── doc-spec-architecture.md  ← THIS FILE
├── production-phases/            ← WHEN things happen
├── _hooks/                       ← processing hooks (doc-team-loop)
└── README.md
```

### Why `doc-specs/` is a sibling, not nested in `production-management/`

Michael's constraint: "not some here in PM and some in SM and some in HE." Doc specs describe documents FROM every department. A SM reading `doc-specs/rehearsal-report.md` should not navigate into a PM folder. The architecture doc lives in PM because it's about the system the PM is building.

## Spec Template (`doc-specs/_TEMPLATE.md`)

```markdown
# [Document Name]
> One line: what this document is.

**Department:** [PM / SM / HE / Design / Safety]
**Steward:** [role that creates/maintains it]
**Platform:** [where it lives: Dropbox / Google / Word / CU]
**Frequency:** [per-production / per-performance / per-season / standing]

## Fields
- field 1
- field 2
- ...

## Sources
Where each field comes from (which CU list, which person, which upstream doc).

## Downstream
What other documents consume data from this one.

---
tags: [department], [steward-role], [platform]
```

That's it. No process, no philosophy. Copy-pasteable in 30 seconds.

## CU List Design (the Registry)

**Proposed name:** Document Types
**Location decision (open):** inside FMP Tables folder (since it IS a precursor to FMP build) OR a new top-level list. Corey advises.

**Custom fields:**
- `Department` (dropdown: PM / SM / HE / Design / Safety / Admin)
- `Steward Role` (dropdown: PM / SM / PSM / Designer / HE Manager)
- `Platform` (labels: Dropbox / Google Cal / Word / ClickUp / PDF)
- `Frequency` (dropdown: per-production / per-performance / per-season / standing)
- `Git Spec` (URL: link to the maw-prose file)
- `Field Count` (number)
- `Downstream Docs` (relationship: other doc types that consume from this one)
- `Update Triggers` (short text)

**Views:**
- Default: all types, grouped by department
- "When dates change": filtered to docs containing date fields
- "When contacts change": filtered to docs containing personnel fields
- "By steward": grouped by who maintains

## FMP Future (Fiona's domain)

The CU list is deliberately shaped as a flat precursor to:

```
Documents (type table)
  → Fields (field table, many-to-one)
  → Instances (per-production, junction to Productions table)
  → Platforms (junction: where each instance lives)
```

When Fiona builds this:
- Git specs become the IMPORT SOURCE for Documents + Fields tables
- CU list retires or becomes a lightweight portal view
- "When Date X changes, what needs updating?" becomes a report

## Timeline

### Now (Aug 2026, pre-season)
1. This architecture doc committed
2. Write 3-4 initial specs from known documents (info-sheet, contact-sheet, production-calendar, crew-call)
3. Decide CU list home (Corey session)

### Fall 2026 (season running)
4. Add specs as each doc type comes up naturally in production work
5. Populate CU list with real instances from 26-27 productions
6. Brain/Milo cross-references registry when someone asks "what needs updating?"

### Spring 2027
7. Second semester of data. Patterns visible: which specs changed, which were stable
8. Fiona scopes FMP table structure from accumulated specs
9. The "calendar and contact audit" (original prompt on ITP-1320) becomes a defined procedure

### 27-28 season and beyond
10. FMP holds the normalized graph
11. Exports generate versioned doc instances from a single source
12. "Edit 7 docs when a date changes" becomes "change once, FMP propagates"

## Relationship Map

```
                    ┌─────────────────┐
                    │   FMP (future)   │
                    │  normalized DB   │
                    └────────┬────────┘
                             │ serves / imports from
              ┌─────────────┼─────────────┐
              │              │              │
    ┌─────────▼──────┐ ┌────▼─────┐ ┌─────▼─────────┐
    │  CU List       │ │ Git Specs│ │ Production     │
    │  (registry)    │ │ (prose)  │ │ Instances      │
    │  metadata +    │ │ fields + │ │ (actual docs   │
    │  filtering     │ │ copy/ref │ │ per show)      │
    └────────────────┘ └──────────┘ └────────────────┘
              │                              │
              └──── both reference ───────────┘
                   the same type specs
```

Each SEASON, a production gets instances of these doc types. The spec says what goes in them. The registry says where they live. FMP connects instances to specs and answers "P1's info sheet was last verified Oct 3" without manual tracking.

## Pushback on the Plan (Mira's editorial)

1. **Don't write 15 specs pre-season.** Write 4 (info-sheet, contact-sheet, production-calendar, crew-call) and add as-needed when production work surfaces them. Theory-specs rot; specs written from real documents stay true.

2. **The CU list should NOT be net-new until we confirm Document TEMPLATES doesn't already do this.** That existing list in FMP Tables may already be the precursor. Creating a parallel surface violates the singularity audit findings.

3. **Fiona should not start schema work until 8+ specs exist with one real season behind them.** Otherwise she builds from imagination. The CU list IS the interim structure; let it gather data.

4. **The Document Destroyer is the LIFECYCLE side of this same system.** The Destroyer tracks "which docs exist for this production and when to archive/destroy them." Doc specs track "what those docs should contain." They're two faces of the same registry. Consider: the CU list might be an EXTENSION of the Destroyer, not a sibling.

5. **The `updating-*.md` files in production-management/ are process, not specs.** They stay. But they cross-reference the specs. The info-sheet spec says WHAT; the updating-info-sheets guide (if we keep it) says WHEN and WHERE.

## Open Questions

- Q1: Does the CU list live in FMP Tables folder or get its own home?
- Q2: Does Document TEMPLATES already serve part of this role?
- Q3: Is the Document Destroyer the lifecycle half of the same registry (extend it) or a separate concern?
- Q4: Should specs track version history (fields added/removed across seasons)?
- Q5: At what point does the CU list retire in favor of FMP?

---

## Activity

- `2026-08-02 11:53` Origin: Michael identifies the need in [info sheet task](https://app.clickup.com/t/86a8z0muf) [comment](https://app.clickup.com/t/36074068/86a8z0muf?comment=90130300060087)
- `2026-08-02 12:16` URITP Wiki + Document Destroyer walked during doc audit pass
- `2026-08-02 12:37` Full doc audit initiated (8 docs), findings posted to [URITP List Audit session task](https://app.clickup.com/t/36074068/86ajknmmk)
- `2026-08-02 13:02` Redirected back to update guides with info sheet as cross-sectional example
- `2026-08-02 13:11` PR #17 merged: 5 files to production-management/
- `2026-08-02 13:19` Michael corrects direction: field specs, not docs-about-docs
- `2026-08-02 13:27` Architecture brainstorm triggered: unified folder, CU+git+FMP split, Document Destroyer connection
- `2026-08-02 ~13:30` [Session task opened](https://app.clickup.com/t/86ajuqznw), this architecture plan drafted and committed
