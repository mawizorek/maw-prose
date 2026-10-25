# Subjects

!!! abstract "Grain"
    one topical facet. "What is this document about?" Lighting, Sound, Budgeting, Contracts, Electrical Theory, Stage Management.

Subjects cut across contexts. A lighting doc could exist in URITP, Teaching, and Personal.
Subject is the discovery axis: "show me everything about lighting regardless of which world it
lives in."

Controlled vocabulary. No free-text tags. This is what keeps the library usable at year three.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| SubjectName | Text | |
| ParentSubject | UUID (FK) | optional hierarchy |
| IsActive | Number (boolean) | |
| SortOrder | Number | |
| audit fields | | per data-standards.md |
