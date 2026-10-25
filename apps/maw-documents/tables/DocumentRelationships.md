# DocumentRelationships

!!! abstract "Grain"
    one person's relationship to one document. What you DID with this document, not what role the document's creator played.

Separate from [DocumentPeople](./DocumentPeople.md), which tracks bibliographic credits (who
MADE the work: author, editor, illustrator). This table tracks personal encounters: supervised,
received, reviewed, inherited, assigned, collaborated.

This is what makes the library a professional archive instead of a filing cabinet. "Show me
everything I supervised" is a query on this table.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkDocument | UUID (FK) | -> Documents |
| fkPerson | UUID (FK) | -> People (or text until authority table exists) |
| RelationshipRole | Text (VL) | "supervised", "received", "reviewed", "inherited", "assigned", "collaborated", "commissioned" |
| Notes | Text | context: "Nigel handed this off during tech week" |
| audit fields | | per data-standards.md |
