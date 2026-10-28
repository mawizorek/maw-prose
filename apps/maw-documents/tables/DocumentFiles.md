# DocumentFiles

!!! abstract "Grain"
    one file identity. FK to its parent part, plus metadata about what the file IS. The file is dumb: it does not know about other files, does not track versions, does not carry version messages.

## Built file name

In the `.fmp12` this table is currently named **`ATTACHMENTS`**. The repo uses
`DocumentFiles` as the canonical design name. Reconcile at rename pass.

## Parent

[DocumentParts](./DocumentParts.md) via `fkDocumentPart` (built file: `fkPart`).

Versioning lives one level up: the **part** knows which file is current via `fkCurrentFile`.
Adding a new version is just adding another DocumentFiles record under the same part. History
is "all files under this part, sorted by date."

## Storage architecture (locked Oct 2026)

All files live in **one flat folder** on disk. No subfolders, no FileMaker-managed external
storage. `g_FILE_REPO` on [GLOBAL_USE_VARIABLES](./GlobalUseVariables.md) holds the single
base path. Full path = `g_FILE_REPO & auto_fileName`.

The container field is **reference-only**: FM stores a path string, not the bytes. The file
stays untouched on disk. Copy the folder + the `.fmp12` to any machine, update `g_FILE_REPO`,
and every file resolves. Hashes verify the copies are byte-for-byte identical.

Where the file actually lives is a separate concern on [FileLocations](./FileLocations.md),
but FileLocations is **deferred for MVP**. One folder = one path = no need for a location
table until multiple storage backends exist (NAS, cloud, etc.).

## Hash identity

`FileHash` is the content-addressable identifier. Computed from the file's bytes via
`GetContainerAttribute ( container ; "MD5" )`. Same file always produces the same hash,
on any machine, forever. Different from PrimaryKey: the PK is record identity (arbitrary),
the hash is content identity (deterministic).

The hash does not see the filename, creation date, or folder. Those are filesystem metadata,
not part of the byte stream. Two copies of the same file with different names = same hash.
File edited and re-saved = different hash, even if visually identical.

`HashAlgorithm` self-describes which algorithm produced the hash. Defaults to `"MD5"`.
When/if upgrading to SHA-256, old records still self-describe. One hash per file, not
multiple.

### Duplicate detection

Conditional format on `FileHash`:
`ExecuteSQL("SELECT COUNT(*) FROM ATTACHMENTS WHERE FileHash = ?"; ""; ""; FileHash) > 1`

Highlights duplicates in red instantly on any layout showing the hash.

## Auto-enter calcs (not scripts)

All metadata fields use **auto-enter calculations** referencing the container field, with
"Do not replace existing value" **unchecked** so they re-fire when the container changes:

| Field | Auto-enter calculation |
|---|---|
| `auto_fileName` | `GetContainerAttribute ( Attachment ; "filename" )` |
| `auto_fileSize` | `GetContainerAttribute ( Attachment ; "fileSize" )` |
| `auto_fileType` | `GetContainerAttribute ( Attachment ; "fileType" )` |
| `FileHash` | `GetContainerAttribute ( Attachment ; "MD5" )` |
| `HashAlgorithm` | `"MD5"` |

Zero scripts needed for metadata population. Drop a file, everything fills.

## SearchPath

`SearchPath` is a plain indexed text field, written by `UTIL_RebuildSearchPath` whenever the
chain changes. Concatenates names up the hierarchy:
`"Big Love F26 > Light Plot > Final > Sheet 1 > v3.pdf"`. This is the field the hub searches
against. Not a calculation: a scripted denormalization.

## OCRText

`OCRText` holds extracted text content from the file: OCR output for scanned documents,
parsed text from PDFs, transcript content for audio/video. Populated on import or by a
background script. This is what makes SearchPath useful for finding content INSIDE documents,
not just their names.

## Thumbnail

`Thumbnail` is a container field holding a preview image of the file. Auto-generated on
import for PDFs and images, placeholder icon for other file types. Lives here (not on
FileLocations) because the thumbnail represents the file's content regardless of where
the bytes are stored.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkDocumentPart | UUID (FK) | parent part. Built file: `fkPart` |
| Attachment | Container | reference-only. Bytes stay on disk |
| FileHash | Text (indexed) | MD5. Content identity. Dedup key. Auto-enter calc |
| HashAlgorithm | Text | default `"MD5"`. Self-describes the hash algorithm |
| auto_fileName | Text | original filename. Auto-enter calc |
| auto_fileSize | Text | file size in bytes. Auto-enter calc |
| auto_fileType | Text | MIME type. Auto-enter calc |
| IsStray | Number | 1 = found by verification script, no FK chain yet |
| IsDuplicate | Number | 1 = hash matches another record |
| SearchPath | Text (indexed) | denormalized, scripted. Not a calc |
| OCRText | Text | extracted text content. Searchable |
| Thumbnail | Container | preview image. Auto-generated on import |
| CreatedTimestamp | Timestamp | |
| CreatedBy | Text | |
| Notes | Text | |
| audit fields | | per data-standards.md |

## Previous design (superseded 2026-10-24)

Earlier iterations carried version-chain fields (`fkParentVersion`, `is_current`,
`VersionMessage`) making the file track its own version history. Simplified in the
2026-10-24 workshop: the file is a dumb atom, the part owns the intelligence.
FileLocations split out as a child table for multi-location storage.
OCRText and Thumbnail restored from the original design doc after Shade feature scrub.

## Storage architecture evolution (Oct 2026)

Hash identity, auto-enter calcs, flat folder + `g_FILE_REPO`, duplicate detection,
and stray file handling all locked in the Oct 26-28 session. FileLocations deferred
until multiple storage backends are real. `HashAlgorithm` and `auto_fileType` added.
`IsStray` and `IsDuplicate` added for verification/triage workflows.
