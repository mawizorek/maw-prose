# DocumentFiles

!!! abstract "Grain"
    one file identity. FK to its parent part, plus metadata about what the file IS. The file is dumb: it does not know about other files, does not track versions, does not carry version messages.

Parent: [DocumentParts](./DocumentParts.md) via `fkDocumentPart`.

Versioning lives one level up: the **part** knows which file is current via `fkCurrentFile`.
Adding a new version is just adding another DocumentFiles record under the same part. History
is "all files under this part, sorted by date."

Where the file actually lives is a separate fact on [FileLocations](./FileLocations.md). One
file can exist in multiple locations (NAS, Google Drive, Dropbox): same content, different
storage endpoints. The hash proves they are the same bytes.

## SearchPath

`SearchPath` is a plain indexed text field, written by `UTIL_RebuildSearchPath` whenever the
chain changes. Concatenates names up the hierarchy:
`"Big Love F26 > Light Plot > Final > Sheet 1 > v3.pdf"`. This is the field the hub searches
against. Not a calculation: a scripted denormalization.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkDocumentPart | UUID (FK) | parent part |
| FileHash | Text | sha256. Identity proof. Dedup key |
| OriginalFilename | Text | |
| MIMEType | Text | |
| FileSizeBytes | Number | |
| SearchPath | Text (indexed) | denormalized, scripted. Not a calc |
| CreatedTimestamp | Timestamp | |
| CreatedBy | Text | |
| Notes | Text | |
| audit fields | | per data-standards.md |

## Previous design (superseded 2026-10-24)

Earlier iterations carried version-chain fields (`fkParentVersion`, `is_current`,
`VersionMessage`) making the file track its own version history. Simplified in the
2026-10-24 workshop: the file is a dumb atom, the part owns the intelligence.
FileLocations split out as a child table for multi-location storage.
