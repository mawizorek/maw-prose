# Binders

!!! abstract "Grain"
    one canonical binder definition. An indexed ORDER of documents, not a stack of paper.

A binder says which documents belong, in what sequence. It is the reusable template: Todd Bible,
URITP Production Binder, Emergency Handbook. Maintaining a canonical binder = maintaining a
complete, correctly ordered index.

Members are joined via [BinderDocuments](./BinderDocuments.md). Dated publications (the "2025
Todd Bible") are [BinderPublications](./BinderPublications.md).

Ported from the existing ClickUp BINDERS structure (four lists, J20+J21 on the MAW Documents
Decision Log, 2026-09-20).

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| BinderName | Text | "Todd Bible", "URITP Production Binder" |
| Purpose | Text | what this binder is for |
| IsActive | Number (boolean) | |
| SortOrder | Number | |
| audit fields | | per data-standards.md |
