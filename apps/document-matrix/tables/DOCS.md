---
id: document-matrix-table-docs
title: DOCS
type: reference
status: draft
order: 10
revised: 2026-10
summary: One canonical document definition. Not a copy, not a version, not a production-specific instance.
data:
  catalog:
    file: DOCS.tsv
---

# DOCS

!!! abstract "Grain"
    One document that a production could need. "Light Plot" is one record whether five shows use it or none do. The relationship to a production lives in [DOC_PRODUCTION_LINKS](@document-matrix-table-doc-production-links).

## Fields

!!! data "catalog"

## A document is a concept, not a file

A DOCS row says "there is such a thing as a Light Plot." It carries no URL, no file, no version. WHERE the document lives (Google Doc, Vectorworks file, ClickUp view, a scanned PDF) is a [REFERENCES](@document-matrix-table-references) record attached through [DOC_REFERENCE_LINKS](@document-matrix-table-doc-reference-links). The same document can have an EDIT surface (the VWX file) and a VIEW surface (the published PDF) as separate reference rows, each with its own RefRole.

## Categories group the matrix rows

DocCategory drives the left-column grouping in the matrix layout. Current set: Technical, Administrative, Safety, Creative. Not a value list yet; will become one when the set stabilizes.
