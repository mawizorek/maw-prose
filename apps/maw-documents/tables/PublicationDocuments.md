# PublicationDocuments

!!! abstract "Grain"
    one frozen document copy in one dated publication. The layer that makes a closed publication genuinely immutable.

Append-only. A row here is history. Creating these rows at publication time IS the work of
owning a binder publication.

Each record snapshots the document's state at publish time. Once created, never modified.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkBinderPublication | UUID (FK) | -> BinderPublications |
| fkDocument | UUID (FK) | -> Documents (the canonical source) |
| fkDocumentPart | UUID (FK) | -> DocumentParts (specific part frozen) |
| fkDocumentFile | UUID (FK) | -> DocumentFiles (specific file version frozen) |
| SortOrder | Number | position in the publication |
| SnapshotFileHash | Text | sha256 at publish time. Proof the frozen copy matches |
| audit fields | | per data-standards.md |
