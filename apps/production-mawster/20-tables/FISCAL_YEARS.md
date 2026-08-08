---
id: table-fiscal-years
title: FISCAL_YEARS
type: reference
status: unlisted
order: 10
revised: 2026-08
summary: EXTERNAL data source. Lives in another FileMaker build.
---

# FISCAL_YEARS

**EXTERNAL DATA SOURCE — not defined in this file.**

Fiscal years belong to the budget build. Production MAWster consumes them; it does not own them.

⚠️ **Consequence of that, and it is the reason this page exists rather than a table:** an EDS table is only as available as the file it lives in. Anything on the printed page that depends on a fiscal year fails differently from anything that depends on a local record — it fails when the *other* file is missing, not when the data is wrong.

⬜ Unresolved: whether the calendar needs a fiscal year at all, or whether `Semester` on [[PRODUCTION_CALENDARS](@table-production-calendars)] is the only time-bucket this app ever needs.

`unlisted`: reachable by link, absent from the nav.
