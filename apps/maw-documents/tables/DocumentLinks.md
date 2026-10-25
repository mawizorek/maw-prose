# DocumentLinks

!!! abstract "Grain"
    one document-to-document cross-reference. Symmetric by default.

A risk assessment references the light plot it assesses. A lesson plan references the score it
teaches from. An annotated script references the clean script.

Links are bidirectional: "A relates to B" and "B relates to A" are the same record. The
`LinkType` field carries the relationship kind. Directional types like "supersedes" read
A -> B by convention.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkDocumentA | UUID (FK) | -> Documents |
| fkDocumentB | UUID (FK) | -> Documents |
| LinkType | Text (VL) | "related", "supplements", "supersedes", "derives_from", "responds_to" |
| Notes | Text | |
| audit fields | | per data-standards.md |
