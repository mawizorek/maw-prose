# ImportBatches

!!! abstract "Grain"
    one intake session. Audit wrapper for scan, import, and file-addition sessions.

Not a staging table. Imported files create real records in the real tables (Documents, Variants,
Parts, Files, FileLocations), all stamped with `fkImportBatch`. The batch tracks cleanup state.

The hub's "Recent Intake" lens filters to records with `fkImportBatch IS NOT EMPTY AND
NeedsTagging = 1`. Reconciliation = filling in metadata on records that already live where
they will stay.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| BatchName | Text | |
| BatchSource | Text | "phone scan", "desktop import", "email attachment" |
| ImportedBy | Text | |
| ImportedTimestamp | Timestamp | |
| BatchStatus | Text (VL) | "needs classification", "classified", "verified" |
| RecordCount | Number | count of documents in this batch |
| Notes | Text | |
| audit fields | | per data-standards.md |
