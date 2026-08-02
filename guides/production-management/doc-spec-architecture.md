# Doc Spec Architecture

> One registry. Two layers. Three horizons.

## The Problem

Production paperwork (info sheets, contact sheets, crew calls, rehearsal reports) lives across Dropbox, Google, Word, and ClickUp. When a date or contact changes, 3-7 documents need updating across platforms. Today that's manual memory.

The info sheet is the perfect example: it downstream-summarizes the production calendar AND the contact sheet, making it the doc you forget precisely because "someone else already updated the source."

## The Concept

**Doc specs** are field-level definitions of what each document type contains. Not instructions on how to update them. Not meta-documentation. Just: "a cast list contains these 20 fields."

This is the **documentation analog to the Document Destroyer** (the CU list that canonically registers every document type a production can generate). The Destroyer says "here's every doc type we crush." Doc specs say "here's what goes IN each type."

## The Split (three layers)

| Layer | Home | Purpose | Audience |
|-------|------|---------|----------|
| **Registry** | ClickUp list (Document DESTROYER) | Metadata, filtering, lifecycle status | Agents + Michael (browse/filter) |
| **Spec** | Git (`maw-prose/guides/doc-specs/`) | Versioned field definitions, copy-pasteable | SMs, designers, Michael (reference) |
| **Schema** | FMP (future) | Normalized records, relational queries, exports | Automated systems, reports |

### Why three and not one

- **Git** gives version history, tight prose, and copy-paste for a new SM asking "what goes in a crew call?"
- **CU list** gives filtering (show me all docs maintained by SM, show me all docs that contain dates) without opening a repo
- **FMP** gives the relational graph (when Date X changes, which document instances need updating?) that neither git nor a flat list can express

## Doc Tree (Git)

```
guides/
├── doc-specs/                    ← unified field-spec folder
│   ├── _TEMPLATE.md             ← bare-bones spec skeleton
│   ├── README.md                ← pointer to this architecture doc
│   ├── info-sheet.md
│   ├── contact-sheet.md
│   ├── production-calendar.md
│   ├── crew-call.md
│   ├── letterhead.md
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

## CU List: Document DESTROYER

**Home:** URITP space, loose list (repurposed from Document TEMPLATES)
**Purpose:** Canonical reference table of all possible document types a production generates. NOT an archive/destroy lifecycle tool. "Destroyer" = we crush the documentation on every show.

### Wave 1 Fields (live)

| Field | Type | Purpose |
|-------|------|--------|
| Department | Dropdown (PM / SM / HE / Design / General) | Filter by who owns it |
| Spec URL | URL | Link to git markdown spec |
| Category | Dropdown (Paperwork / Report / Schedule / Reference / Template) | What kind of doc |

### Wave 2 Fields (after 8+ entries exist)

- Steward Role (dropdown)
- Platform (labels: Dropbox / Google Cal / Word / CU)
- Frequency (dropdown: per-production / per-performance / per-season / standing)
- Field Count (number)

### Wave 3 Fields (FMP prep)

- Downstream Docs (relationship)
- Update Triggers (short text)
- Last Verified (date)

### Events (sister concept)

All possible EVENT TYPES (rehearsal, performance, tech, meeting, etc.) follow the same registry pattern. A sibling list or a section within the Destroyer. Parked for a /milo session.

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

**Kill criterion:** when Michael asks "which docs need updating after this date change" more than twice in one season and the CU list can't answer it without manual cross-referencing.

## Timeline

### Now (Aug 2026, pre-season)
1. ✅ Architecture doc committed
2. ✅ Initial specs written (info-sheet, contact-sheet, production-calendar, crew-call, letterhead)
3. ✅ CU list home decided: Document DESTROYER in URITP (repurposed)
4. ✅ Wave 1 fields created and populated

### Fall 2026 (season running)
5. Add specs as each doc type comes up naturally in production work
6. Add corresponding tasks to CU list as types emerge
7. Brain/Milo cross-references registry when someone asks "what needs updating?"

### Spring 2027
8. Second semester of data. Patterns visible: which specs changed, which were stable
9. Fiona scopes FMP table structure from accumulated specs
10. The "calendar and contact audit" becomes a defined procedure

### 27-28 season and beyond
11. FMP holds the normalized graph
12. Exports generate versioned doc instances from a single source
13. "Edit 7 docs when a date changes" becomes "change once, FMP propagates"

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
    │  (DESTROYER)   │ │ (prose)  │ │ Instances      │
    │  metadata +    │ │ fields + │ │ (actual docs   │
    │  filtering     │ │ copy/ref │ │ per show)      │
    └────────────────┘ └──────────┘ └────────────────┘
              │                              │
              └──── both reference ───────────┘
                   the same type specs
```

## Open Questions

- ~~Q1: CU list home~~ → RESOLVED: Document DESTROYER in URITP (repurposed from TEMPLATES)
- ~~Q2: Does Document TEMPLATES already serve part of this role?~~ → RESOLVED: Yes. Repurposed entirely.
- ~~Q3: Is the Document Destroyer the lifecycle half?~~ → RESOLVED: It IS the registry. Not archive/destroy, it's "crushing" documentation.
- Q4: Should specs track version history (fields added/removed across seasons)?
- Q5: At what point does the CU list retire in favor of FMP?

---

## Activity

- `2026-08-02 11:53` Origin: Michael identifies the need in info sheet task
- `2026-08-02 12:16` URITP Wiki + Document Destroyer walked during doc audit pass
- `2026-08-02 12:37` Full doc audit initiated (8 docs), findings posted to URITP List Audit session task
- `2026-08-02 13:02` Redirected back to update guides with info sheet as cross-sectional example
- `2026-08-02 13:11` PR #17 merged: 5 files to production-management/
- `2026-08-02 13:19` Michael corrects direction: field specs, not docs-about-docs
- `2026-08-02 13:27` Architecture brainstorm triggered: unified folder, CU+git+FMP split
- `2026-08-02 ~13:30` Session task opened, architecture plan drafted and committed
- `2026-08-02 ~14:00` PR #18 merged: 7 files to doc-specs/ (template + README + 4 specs)
- `2026-08-02 ~14:20` CU list repurposed: Wave 1 fields created, 6 tasks populated, letterhead spec added
