---
id: docz-paste-kit
title: DOCz_ paste kit
type: reference
status: hidden
summary: FileMaker field snippets for the DOCz_ archive tables. Load one onto the clipboard from Terminal, paste into Manage Database.
---

# DOCz_ paste kit

One `.fields.xml` per table. Each holds that table's own fields (names, types, indexes, defaults, and the field comments from the `.tsv`). Audit fields aren't in them.

## Per table

1. **Manage Database → Tables:** create the table by name (`DOCz_PACKAGE`). FileMaker adds its five default fields, which are the house audit fields. If your version doesn't, copy the five from `DOCUMENTS` and paste them in first.
2. **Terminal**, from this folder:

```
bash fmclip.sh DOCz_PACKAGE.fields.xml
```

3. **Manage Database → Fields** with that table selected: ⌘V.

## Order

Tonight: `DOCz_PACKAGE` → `DOCz_PACKAGE_ITEM` → `DOCz_PACKAGE_CONTENT`.
Then: `DOCz_REVISION_FILE` · `DOCz_DRIVE` · `DOCz_PACKAGE_DRIVE` · `DOCz_COPY` (waits on Seat C for the hub's Dropbox hash).
`DOCz_ARCHIVAL_MEDIA.additions.fields.xml` pastes into the existing table. If `fkSourceMedia` is already there, delete `fk_nlSourceMedia` after pasting and rename the old field instead.

## Not in the paste (needs TOs first)

- Relationships and table occurrences, including `DOCz_PACKAGE_self_Supersedes`.
- The seal lock: validation by calculation on `fkPackage` (item + content), `IsEmpty ( <package TO>::ts_Sealed )`, validate always.
- Pair uniqueness (fkPackage + PathInPackage, fkPackage + fkDrive, fkRevision + fkFile, fkPackage + fkInstance). Do it with a concatenated key or a script check.
- The `Name` auto-enter calc on `DOCz_PACKAGE`.

## If a paste does nothing

The clipboard type didn't take. Run `bash fmclip.sh <file>` again with FileMaker frontmost, then paste. If it still does nothing, copy any one field out of FileMaker and compare its XML with these. FileMaker versions differ in small attributes.
