# Getting data out of a Vectorworks file

*How you turn what is in the file into a list, a schedule, or a PDF. Sourced from Vectorworks documentation; checked 2026-07-16.*

This is the answer to "can you send me a list of every X in the plot." You almost always can, and the mechanism is a worksheet.

## Worksheets are the extraction engine

A worksheet has two kinds of row and the difference is the whole thing.

A **spreadsheet row** holds what you type: constants, notes, totals. A **database row** is a header row that automatically generates one sub-row per object matching a set of criteria. You do not populate a database row; you describe what should be in it and the file fills it.

The **Criteria dialog** is where you describe it. You can match on class, layer, object type, record field, symbol name, or line weight, and nest AND/OR condition sets. So "every lighting device on the catwalk layer" and "every object in the Steel-Pipe class" are both one criteria set away.

Then each **column** picks a function or a field. Two kinds are available: data from the object's attached record, and general properties of the object itself — **the layer it is on, its class, its symbol name, count, dimensions.** Because a column can emit both layer and class, a full "every object with its layer and class" snapshot is native. You do not need a script.

Which means: a layer list, a class list, a symbol count, an instrument schedule, and a resource inventory are all the same operation with different criteria.

- [Defining worksheet rows](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/Worksheets/Defining_worksheet_rows.htm) · [The Criteria dialog box](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/Worksheets/The_Criteria_dialog_box.htm) · [Selecting a function or field for a database column](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/Worksheets/Selecting_a_function_or_field_for_a_database_column.htm) · [Worksheet functions reference](https://github.com/Vectorworks/developer-worksheets/blob/main/Worksheet%20Functions/Vectorworks%202026%20US.md)

## Getting it out of the file

`File > Export` sends a worksheet to **CSV**, tab-delimited text, or Excel. **Use comma-delimited CSV** — it is what our manifests are, and it diffs cleanly.

A **report** is just a worksheet built from record data, made through `Spotlight > Reports` or `Tools > Reports`. Spotlight ships preformatted ones, including `SL Instrument Schedule Database`, and **`Generate Paperwork` builds schedules and reports in one pass** rather than one at a time.

`File > Export > Export Instrument Data` dumps instrument, accessory, power, and position data in a **Lightwright-compatible** format. That is the one to reach for when a designer or an LD asks for the paperwork in their own tool rather than yours.

- [Exporting worksheets](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/Worksheets/Exporting%20worksheets.htm) · [Creating reports](https://app-help.vectorworks.net/2025/eng/VW2025_Guide/RecordsSchedules/Creating%20reports.htm) · [Generating paperwork](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/LightingDesign2/Generating%20paperwork.htm) · [Exporting instrument data](https://app-help.vectorworks.net/2020/eng/VW2020_Guide/Export/Exporting_instrument_data.htm)

## Publishing a drawing set

The **Publish** command batch-exports multiple sheet layers, saved views, and worksheets at once, to PDF, DWG, DWF, Excel, or image. It can pull every sheet in a title-block issue automatically, so "send the whole set" is one command. PDF and image output need Design Suite.

**PDF export offers PDF/A-1b**, an archival format that flattens layers and embeds colour and fonts. That is the right choice for a frozen as-published set that has to still open in ten years, and the wrong choice for anything you intend to edit.

- [Batch publishing](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/PrintPublish/Batch%20publishing.htm) · [Exporting PDF files](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/Export/Exporting_PDF_files.htm)

## One thing to keep straight

An export tells you what the file **currently is**. Our documentation says what it is **supposed to be**. When they disagree, that is information, not an error to paper over — and the fix goes in whichever one is wrong.
