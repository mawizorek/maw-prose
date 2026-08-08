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

- Domains: `month` · `event-status` · `watermark`. Add a domain, not a table.
- 🔴 **`Hex` is TEXT.** The legacy `MonthStyles.Hex` was a Number field, which cannot hold a hex value containing letters.
- R/G/B are unstored calcs off Hex. FileMaker wants RGB; humans want hex.
- `month` rows key on **`MonthNum`**, never a 3-letter abbreviation.
- ⚠️ Legacy solved colour three ways: `MonthStyles` + `EventStylesIMPORT_Statuses` + inline `TextColor` calcs in two tables. This replaces all three.

## Fields

See [STYLES.tsv](./STYLES.tsv).
