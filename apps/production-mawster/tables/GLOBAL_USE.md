---
id: table-global-use
title: GLOBAL_USE
type: reference
status: public
order: 10
revised: Aug 2026
summary: Session state only. The hub lens.
---

# GLOBAL_USE

!!! abstract "Grain"
    Singleton. One record, all global-storage fields.

- **Split globals by LIFETIME, not by topic.** This holds only what is true for THIS user in THIS session: which production is selected, which semester.
- Globals are per-user per-session in a hosted file, which is exactly what a lens is.
- 🚫 **No GLOBAL_EXPORT_SETTINGS.** Highlight/lowlight/hide ranges are facts about a specific show's calendar, so they live on PRODUCTION_CALENDARS. As globals they get retyped every reprint.
- 🚫 `FilePathName` needs no storage. It is `Get ( FilePath )`.
- 🚫 **SETUP is killed.** Once production config became real records and print config moved to the calendar, nothing was left in it. The legacy `SETUP` was 20 fields / 1 record / almost all global — which is why the old file could only ever hold ONE production at a time.

## Fields

| Field | Type | Notes |
|---|---|---|
| `g_currentProduction` | Text, global | fkProduction of the active lens |
| `g_currentSemester` | Text, global | |
| `g_currentCalendar` | Text, global | fkCalendar of the active lens |
