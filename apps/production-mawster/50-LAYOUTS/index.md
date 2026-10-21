---
id: layouts
title: Layouts
type: index
status: public
order: 50
nav: collapsed
revised: 2026-08
summary: The app's layouts. Nothing built yet, and one test decides how they get styled.
data:
  catalog:
    file: LAYOUTS.tsv
---

# Layouts

Every table gets **ONE** primary editing layout. It may also appear on other layouts for VIEW or UTILITY needs.

🔴 **Before building any of them: [the Conditional-Formatting Capability Test](@layout-theme-capability-test).** Ten minutes, a throwaway layout, and it decides whether the theme model paints from data or from enumerated swatches. **The answer is free while the file has no layouts and stops being free the moment a styled object exists in two places.**

⚠️ House rule 8: a script lands on `util_<TABLE>`, never on a user-facing layout. The `util_` set is not in the catalog below yet and every [GOTO ·](@script:script-goto) script already assumes it.

!!! data "catalog"
