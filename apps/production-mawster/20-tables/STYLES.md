---
id: table-styles
title: Styles
type: reference
status: public
order: 10
revised: Aug 2026
summary: One colour table, one resolution path.
---

# Styles

!!! abstract "Grain"
    One styled token. `Domain` says what kind.

- Domains: `month` · `event-status` · `watermark` · `emphasis`. Add a domain, not a table.
- 🔴 **`Hex` is TEXT.** The legacy `MonthStyles.Hex` was a Number field, which cannot hold a hex value containing letters.
- R/G/B are unstored calcs off Hex. FileMaker wants RGB; humans want hex.
- `month` rows key on **`MonthNum`**, never a 3-letter abbreviation.

## Colour IMPORT

- Calendar colour arrives as a raw ClickUp status token on `import_EVENTS.CU_StatusToken`. STYLES maps token → colour, domain `event-status`.
- 🔴 **The mapping rows must exist BEFORE the first import** or events land unstyled. The legacy file hardcoded status→RGB inside a calc, so there was nothing to seed.
- ⚠️ Legacy solved colour SEVEN ways: `MonthStyles` + `EventStylesIMPORT_Statuses` + inline `TextColor` calcs in two tables + the `TextColorHex` / `color_Text` / `ColorMONTHStyle` / `ColorSTATUSStyle` / `updateEventSTYLE` / `updateWORKDAYcolor` script family. This table replaces all of it.

## Fields

See [STYLES.tsv](./STYLES.tsv).
