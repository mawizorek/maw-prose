---
id: table-colors
title: Colors
type: reference
status: public
order: 10
revised: 2026-09-30
summary: One colour table, one resolution path.
data:
  catalog:
    file: THEME_COLORS.tsv
---

# Colors

!!! abstract "Grain"
    One styled token. `Domain` says what kind.

!!! data "catalog"

???+ warning "🔴 TWO defects here, one fixed and one waiting on a ruling"
    ✅ **Fixed 2026-09-30:** the H1 read **Styles**, inherited from `STYLES.md`
    when this file was created by duplication. ⚠️ **The Grain block above and the
    commented block below are still STYLES' text**, and `theme_typography.md`
    carries the same copy.

    🔴 **NOT fixed — `id: table-colors` is declared by this file AND by
    `COLORS.md`.** One id cannot address two pages, so one of them is unreachable
    by `@id`, and the database menu can only hold one row for the pair.

    **They are not duplicates.** `COLORS.tsv` has **stored** `R`/`G`/`B` Number
    fields, a `probablyCalcAHex?` open question, and a `< STYLES` child
    relationship. `THEME_COLORS.tsv` has `R`/`G`/`B` as **unstored**
    `HexToRGB ( Hex ; ... )` calcs plus `calc_Hex`, and no child listed.
    ⭐ **That is two different designs of the same idea, one of which was
    superseded** — and `20-tables/INDEX.tsv` lists `THEME_COLORS` under STYLING
    TABLES as `{.conf}` while **plain `COLORS` is not in the catalog at all.**

    🚫 **Not guessed.** Which file dies, or which id gets renamed, is Michael's
    call.

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
