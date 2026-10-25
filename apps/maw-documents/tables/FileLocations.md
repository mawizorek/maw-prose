# FileLocations

!!! abstract "Grain"
    one storage endpoint for a file. Where a copy of the bytes lives. The dumbest table in the schema.

Parent: [DocumentFiles](./DocumentFiles.md) via `fkDocumentFile`.

A single file can exist in multiple locations: a NAS via WebDAV, a Google Drive backup, a
Dropbox public link, a local FileMaker container. Each location is one record. `IsPrimary`
says which one opens by default.

The container field lives here, not on DocumentFiles, because the blob is a property of the
location, not the identity.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkDocumentFile | UUID (FK) | parent file identity |
| StorageBackend | Text (VL) | "local", "NAS", "GoogleDrive", "Dropbox", "ClickUp", "GitHub" |
| FilePath | Text | local or network path, when applicable |
| RemoteFileURL | Text | API endpoint or web URL, when applicable |
| FileContainer | Container | actual bytes, when stored locally |
| IsPrimary | Number (boolean) | 1 = default open location |
| LastVerifiedTimestamp | Timestamp | last confirmed this copy exists and matches the hash |
| audit fields | | per data-standards.md |
