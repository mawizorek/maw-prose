---
id: table-docz-revision-file
title: Revision File
type: reference
status: public
order: 10
revised: Nov 2026
summary: Which revision a file is evidence for. Fulfillment rolls up through here.
data:
  catalog:
    file: DOCz_REVISION_FILE.tsv
---

# Revision File

!!! abstract "Grain"
    File × revision. One row = this file is evidence for this revision.

!!! data "catalog"

## Why it exists

A package can hold several revisions (J44), so a package can't say which revision a file belongs to. This table does. Fulfillment rolls up through here, not through package membership.

## Words

"Version" is retired in DOCz_ (J46). **Instance** is the document a production owes. **Revision** is its stage (FINAL, ARCHIVAL). **Modifier** is a step that makes a new file from an old one (trim, edit), and lives in `DOCUMENT_MODIFIERS`. A hash is none of the three.

## Rules

- Duplicating FINAL to make ARCHIVAL copies these rows (pointers), not the files.
- A file with no row here is never owed. That's how private media (designer runs) stay out of the fulfillment report.

## Fields

See [DOCz_REVISION_FILE.tsv](./DOCz_REVISION_FILE.tsv). Every row is `{.tbc}`.
