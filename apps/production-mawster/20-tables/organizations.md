---
id: table-organizations
title: ORGANIZATIONS
type: reference
status: public
order: 10
revised: 2026-09-30
summary: Orgs. Main app skin and default. Rarely touched.
data:
  catalog:
    file: ORGANIZATIONS.tsv
---

# ORGANIZATIONS

## Fields

!!! data "catalog"

??? tip "✅ Fixed 2026-09-30 — this page had no working frontmatter"
    The `data:` block read `file: ORGANIZATIONSfind` followed by a bare `.tsv` on
    the next line. **That is invalid YAML**, so the whole frontmatter failed to
    parse and the `id` never registered.

    ⭐ **It was undetectable until something tried to resolve it.** Nothing in the
    repo referenced `@table-organizations`, so the page sat broken and looked
    fine. The new [[Tables](@menu-tables)] menu was the first thing to point at
    it, and it came back the ONLY dead door out of 37. **Building the menu was
    the test.**
