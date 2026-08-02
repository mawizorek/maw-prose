# Doc Specs

*What a document contains. Not how to update it, not when to send it. Just the fields.*

Each file in this folder is a **field-level definition** of one production document type. When a new SM asks "what goes in a crew call?" you hand them the markdown. When an agent asks "which docs contain date fields?" you filter the CU registry.

## How to use these

1. **Creating a new production doc:** open the spec, copy the field list, fill in your show's values.
2. **Auditing an existing doc:** compare the live document against its spec. Missing fields = gaps. Extra fields = candidates for the spec (file a PR or flag it).
3. **Adding a new doc type:** copy `_TEMPLATE.md`, fill in the fields from a real instance (not from imagination), and PR it.

## Architecture

These specs are one layer of a three-part system:

| Layer | Home | Question it answers |
|-------|------|--------------------|
| **Spec** (here) | Git | What fields does this doc type contain? |
| **Registry** | ClickUp list | Which doc types exist, who stewards them, how to filter? |
| **Schema** (future) | FMP | When Field X changes, which instances need updating? |

Full architecture: [`../production-management/doc-spec-architecture.md`](../production-management/doc-spec-architecture.md)

## Rules

- **One file per document type.** No multi-doc files, no department subfolders.
- **Write specs from REAL documents, not theory.** If you haven't held a real instance of this doc type, don't spec it yet.
- **Fields only, not prose.** These are reference cards, not essays. A spec that takes more than 90 seconds to scan has drifted.
- **Sources and downstream are mandatory.** A field without a source is a field nobody knows how to fill. A doc without downstream connections is a doc nobody reads.

## Folder contract

This folder answers ONE question: **WHAT does a document contain?**

Sibling folders answer different questions:
- `production-management/` — HOW to maintain things (process guides)
- `production-phases/` — WHEN things happen (timeline reference)
