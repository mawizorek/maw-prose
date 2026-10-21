---
id: ddr-asbuilt-sort-fkworkday-date
title: sort | fkWorkday date (DDR as-built)
type: reference
status: hidden
revised: 2026-08
summary: Verbatim DDR transcription. Do not edit; do not build against.
---

# sort | fkWorkday date

Bound to `OnLayoutEnter` on `print | Agenda Calendar`.

```
#WORKDAYS::Date
#EVENTS_x_WORKDAYS::Date (local)
#EVENTS::dateTIme_Start
Sort Records [ Keep records in sorted order; Specified Sort Order: WORKDAYS::Date; ascending EVENTS_X_WORKDAYS::Date; ascending EVENTS::dateTime_Start; ascending ] [ Restore; No dialog ]
```

**Fields:** WORKDAYS::Date, EVENTS_X_WORKDAYS::Date, EVENTS::dateTime_Start
**Trigger:** OnLayoutEnter — print | Agenda Calendar
