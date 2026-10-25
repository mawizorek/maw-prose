# DocumentParts

!!! abstract "Grain"
    one structural component of a variant. A sheet of a light plot, a section of a score, the instrument schedule inside a final plot.

Parent: [DocumentVariants](./DocumentVariants.md) via `fkDocumentVariant`.

A variant with no meaningful decomposition still gets one part: "Complete." The chain stays
uniform and every portal works the same way. The user never sees stub parts — layouts hide them
when only one exists.

`fkCurrentFile` points at the active [DocumentFiles](./DocumentFiles.md) record. The hub shows
the current file for each part. Tap into the part to see the full history (all files, sorted by
date).

## The variant/part line

**If it could have its own parts, it's a variant. If it IS a part of something bigger, it's a
part.** A reduced touring version of a light plot is a variant (it has its own sheets). Sheet 2
of the full plot is a part.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fkDocumentVariant | UUID (FK) | parent variant |
| PartLabel | Text | "Sheet 1", "Instrument Schedule", "Complete" |
| SortOrder | Number | display sequence within the variant |
| fkCurrentFile | UUID (FK) | -> DocumentFiles. The active file for this part |
| Notes | Text | |
| audit fields | | per data-standards.md |
