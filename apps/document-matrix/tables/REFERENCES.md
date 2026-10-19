---
id: document-matrix-table-references
title: REFERENCES
type: reference
status: draft
order: 40
revised: 2026-10
summary: "Base class in a class-table inheritance hierarchy. One pointer to a thing: a URL, a file, a ClickUp object, a Google Doc. The base carries only what all references share."
data:
  catalog:
    file: REFERENCES.tsv
---

# REFERENCES

!!! abstract "Grain"
    One external reference. Not the document itself; the pointer to where it lives. A reference has a label, a verification state, and a timestamp. WHAT it points at (URL, file, ClickUp view) is determined by which subclass table has a row for it.

## Fields

!!! data "catalog"

## Class-table inheritance

REFERENCES is the base class. It carries no URL, no file path, no service-specific metadata. Those live in subclass tables:

- [REF_URL](@document-matrix-table-ref-url) (v1, built): a generic web URL
- REF_CLICKUP (designed, not built): ClickUp object type, object ID, URL, space, list
- REF_GOOGLE (designed, not built): Google file ID, Drive URL, MIME type, sharing status
- REF_DROPBOX (designed, not built): Dropbox file ID, path, shared URL
- REF_FILE (designed, not built): file name, MIME type, size, storage key (R2 or Container)
- REF_INTERNAL (designed, not built): FMP-internal type (layout, script, value list), name

A subclass row's FK to this table IS the type discriminator. No enum needed. Add a new service = add a new subclass table, touch nothing else.

## Verification

IsVerified + LastVerifiedAt track whether the reference has been confirmed reachable. In v1 this is manual. In v2, a Worker health-checks URLs and flips the flag.
