# BinderPublications

!!! abstract "Grain"
    one dated publication of a canonical binder. The "2025 Todd Bible." Append-only.

A publication holds FROZEN COPIES, not live pointers. It points at
[PublicationDocuments](./PublicationDocuments.md), never at canonical documents. This is what
makes the freeze real: a closed publication cannot silently show a document's later revisions.

Publishing is a manual AUTHORING act. No automation, no sync obligation, no derived fields.
Status is a permission on the re-pull: an open publication may be refreshed from canonical, a
closed one may not.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkBinder | UUID (FK) | -> Binders (the canonical parent) |
| PublicationName | Text | "Todd Bible Fall 2026" |
| PublicationDate | Date | |
| Status | Text (VL) | "open", "closed" |
| Notes | Text | |
| audit fields | | per data-standards.md |
