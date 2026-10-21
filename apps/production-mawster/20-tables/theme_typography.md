---
id: table-typography
title: Typography
type: reference
status: public
order: 10
revised: 2026-09-30
summary: Typography tokens for the theme. Source THEME_TYPOGRAPHY.tsv.
data:
  catalog:
    file: THEME_TYPOGRAPHY.tsv
---

# Typography

!!! abstract "Grain"
    One styled token. `Domain` says what kind.

!!! data "catalog"

???+ warning "🔴 This page's body is a COPY of `STYLES.md`, and the copy has not been rewritten"
    Corrected 2026-09-30: the `id` read `table-typogrpahy`, the `summary` read
    *"One colour table, one resolution path"*, and the H1 read **Styles**. All
    three were inherited from `STYLES.md` when this file was created by
    duplication.

    ⚠️ **The Grain block above and the commented block below are STILL
    STYLES' text**, not typography's. `theme_colors.md` carries the same copy.
    🚫 **Do not trust either until somebody who knows the typography grain writes
    it** — an inherited sentence that reads plausibly is worse than a blank one,
    because nothing marks it as unwritten.

<!---
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
--->
