# DocumentSubjects

!!! abstract "Grain"
    one document's classification under one subject. Many-to-many join.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkDocument | UUID (FK) | -> Documents |
| fkSubject | UUID (FK) | -> Subjects |
| audit fields | | per data-standards.md |
