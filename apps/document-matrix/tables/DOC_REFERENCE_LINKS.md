---
id: document-matrix-table-doc-reference-links
title: DOC_REFERENCE_LINKS
type: reference
status: draft
order: 35
revised: 2026-10
summary: "The join that attaches references to documents or production-links, with a role (EDIT, VIEW, PRINT) and version history. One table solving three problems: edit/view surfaces, version tracking, and the canonical/instance cascade."
data:
  catalog:
    file: DOC_REFERENCE_LINKS.tsv
---

# DOC_REFERENCE_LINKS

!!! abstract "Grain"
    One reference attached to one document (canonical level) or one doc-production pairing (instance level), serving one role at one version. "Big Love's Light Plot, Rev C, the VIEW surface" is one row.

## Fields

!!! data "catalog"

## Two parent axes, one populated per row

fkDoc (nullable) attaches a canonical-level reference: "the Light Plot template lives here." fkDocProdLink (nullable) attaches an instance-level override: "Big Love's Light Plot Rev C lives here." Exactly one of the two is populated per row. The cascade: instance-level DEFAULT ref wins over canonical-level DEFAULT ref.

## RefRole: what the reference is FOR

EDIT = the surface where the document is authored (VWX file, Google Doc in edit mode). VIEW = the published, read-only surface (exported PDF, shared Google Doc link). PRINT = the print-ready version. SOURCE = the original/template. DEFAULT = untyped, resolves as VIEW for the matrix chip. The role is a property of the attachment, not the reference itself: the same Google Doc URL could be EDIT for one show and VIEW for another.

## Version history is rows

Rev A of the Big Love Light Plot is one row (VersionSeq=1, VersionLabel="Rev A", IsCurrent=false). Rev B is another row (VersionSeq=2). A sub-revision within Rev B (channel 42 moved) is VersionSeq=3, same VersionLabel="Rev B", Notes="channel 42 repositioned." Append-only per J9: new version = new row, old row gets IsCurrent=false, never deleted.

## IsCurrent drives the matrix chip

The matrix resolves: find DOC_REFERENCE_LINKS where fkDocProdLink = this link AND IsCurrent = true AND RefRole IN (DEFAULT, VIEW). That is the button target. If none, fall through to fkDoc = this doc AND IsCurrent = true AND RefRole IN (DEFAULT, VIEW).

## The detail card shows the timeline

All rows for a doc-production pairing, grouped by RefRole, ordered by VersionSeq descending. IsCurrent row highlighted, history beneath it. Each row clickable.
