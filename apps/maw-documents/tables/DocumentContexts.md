# DocumentContexts

!!! abstract "Grain"
    one document's membership in one context. Many-to-many join.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkDocument | UUID (FK) | -> Documents |
| fkContext | UUID (FK) | -> Contexts |
| IsPrimaryContext | Number (boolean) | |
| Notes | Text | |
| audit fields | | per data-standards.md |
