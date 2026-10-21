---
id: legacy-scripts-paste-1
title: Legacy scripts paste 1
type: reference
status: hidden
order: 91
revised: 2026-08
summary: Raw FileMaker script export, part 1 of 6. Working material - read the review instead.
---

# Legacy scripts paste 1

⚠️ **Raw paste, split by SIZE not by folder, so the six parts OVERLAP.** Do not read these for structure — read [[the review](@legacy-script-review)], which is the PORT / TRANSFORM / KILL pass over all of them.

🔴 **`status: hidden` and the id is `legacy-scripts-paste-1`.** It previously claimed `id: scripts`, which collided with the real [[Scripts](@scripts)] index and made every link to that id a coin flip.

Original content follows, unedited.

<!-- Original front matter carried `id: scripts` + a Scripts title. Replaced 2026-08-08 to resolve the duplicate-id collision reported by the build. Body untouched. -->

---

Script Hierarchy

-
IMPORTing FUNCTIONS
import Records
REPLACE THE SET
Delete EMPTY
REMOVE ShortName
remove notes
WORKDAY_ID Assign
Create multDaysAtImport
Delete ClickUp Rows
AUTO_WorkdayID
CREATE_multipleDays
updatePreproCounter
updateUnscheduledCounter
-
pre-production schedule
Production WORKDAY
CREATE PRODUCTION WORKDAYS
checkHideWorkday
checkHIGHlight
checkLOWlight
Workday Sort INPUT
Workday_CalendarStart
-
SORT Functions
Sort by DATE
Sort by SORT
Delete ALL
PRINTs
PRINT_SETUPS
PRINT_SETUP 8.5x11 portraitORlandscape
PRINT_SETUP 11x17 portraitORlandscape
PRINT Sort and Starts
showNecessaryRecords
showRelevantDates
end PRINT
EXPORTS
exportORprint
EXPORT Calendar Set
PRINT Calendar Set
-
CLEANUP Functions
Layout Triggers
Events Agenda View SORT
-
-
FCCalendar Addon
(FCCalendar addon scripts - third-party widget, ~25 scripts. KILL. See the review.)
COLOR TEXT
TextColorHex
color_Text
ColorMONTHStyle
ColorSTATUSStyle
openCOLORS
removeTextFormatting
updateEventSTYLE
updateWORKDAYcolor
refreshFilePath
stored production INFO
Secretary INFO
Big Love INFO
TIME Reading INFO
TIME INFO
KAYFABE Info
One Acts INFO

⚠️ **The full step-by-step bodies live in parts 2 through 6.** They were pasted as one 112KB file, then split by size; the original whole-file paste was deleted 2026-08-08 (recoverable from history) because nothing could read it in one pass.
