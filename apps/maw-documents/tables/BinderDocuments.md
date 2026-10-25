# BinderDocuments

!!! abstract "Grain"
    one document's membership in one canonical binder, at a specific position.

Join table. A document in two binders needs two rows, not one row with two binders.

Front-matter rows (cover pages, revision pages, section separators) are also ordinary document
records joined the same way. Convention: cover at SortOrder 0.1, revisions at 0.9, appendices
separator at 100.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkBinder | UUID (FK) | -> Binders |
| fkDocument | UUID (FK) | -> Documents |
| SortOrder | Number | position within the binder |
| IncludeInPrint | Number (boolean) | whether this item appears in printed builds |
| Notes | Text | |
| audit fields | | per data-standards.md |
