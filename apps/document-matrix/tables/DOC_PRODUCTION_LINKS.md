---
id: document-matrix-table-doc-production-links
title: DOC_PRODUCTION_LINKS
type: reference
status: draft
order: 30
revised: 2026-10
summary: The join between a document and a production. One row means "this show needs this document." The cell in the matrix.
data:
  catalog:
    file: DOC_PRODUCTION_LINKS.tsv
---

# DOC_PRODUCTION_LINKS

!!! abstract "Grain"
    One document x one production pairing. "Big Love needs a Light Plot" is one row. The same document in two shows is two rows. Status, print flag, and sort order are per-production: the Light Plot can be PUBLISHED for Big Love and DRAFT for Becoming Curious simultaneously.

## Fields

!!! data "catalog"

## Append-only lifecycle (J9)

DateLinked stamps when the pairing was created. DateEnded stamps when it was retired. A retired row is never deleted, never cleared. "Reset the buttons each year" writes a fresh cohort and marks the prior year's rows ENDED. History is rows.

## DocStatus belongs here, not on the document

The same document can be at different stages in different productions. A status on the DOCS table would force a single state across all shows. DocStatus on the join is the "what's missing" field, and it answers per-show.

## References attach through DOC_REFERENCE_LINKS

This table no longer carries fkInstanceRef directly. Per-production references (the specific Google Doc for this show, the signed scan) are rows in [DOC_REFERENCE_LINKS](@document-matrix-table-doc-reference-links) that point at this join's PrimaryKey. The cascade: instance-level refs (on this join) override canonical-level refs (on DOCS).
