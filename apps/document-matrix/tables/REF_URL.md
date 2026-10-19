---
id: document-matrix-table-ref-url
title: REF_URL
type: reference
status: draft
order: 50
revised: 2026-10
summary: "Subclass of REFERENCES for generic web URLs. The v1 workhorse: any link that does not have a dedicated service-specific subclass."
data:
  catalog:
    file: REF_URL.tsv
---

# REF_URL

!!! abstract "Grain"
    One URL attached to a [REFERENCES](@document-matrix-table-references) base record. The FK existing means "this reference is a URL." Google Docs, ClickUp views, GitHub blob links, and arbitrary web pages all land here in v1. When a dedicated subclass (REF_GOOGLE, REF_CLICKUP) is built, its rows move out and this table keeps only the unclassified ones.

## Fields

!!! data "catalog"
