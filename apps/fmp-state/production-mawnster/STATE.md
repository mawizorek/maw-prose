---
status: hidden
type: reference
generated: fmp-state
---

# Production_MAWnster.fmp12 · STATE
DDR-XML export 10/13/2026 4:34:26 PM · FM 19.6.3
Source drop: `apps/zFMP-drops/Production_MAWnster_fmp12.xml` · recover raw: `git show 4ea509c304b3:"apps/zFMP-drops/Production_MAWnster_fmp12.xml"`
Companion files: DELTA.md (vs previous drop, read first) · STEPS.md (full script steps, load on demand)

## Tables (43) · rec = record count (state, not hashed) · _std audit_ = stock PrimaryKey/Created*/Modified* fields, factored

### GLOBAL_USE · 20 fields · 0 rec
- _std audit 5/5_
- `g_pkCurrentTheme` Text g
- `g_pkDefaultTheme` Text g
- `g_pkCurrentProduction` Text g
- `g_pkCurrentAppSession` Text g
- `g_pkCurrentUtilitySession` Text g
- `g_AppTitle` Text g
- `g_AppTitleShort` Text g
- `g_pkCurrentOrg` Text g
- `g_pkCurrentDocument` Text g
- `g_pkCompare1` Text g
- `g_pkCompare2` Text g
- `g_pkCompare3` Text g
- `g_pkCompare4` Text g
- `g_pkCompare5` Text g
- `g_pkCompare6` Text g

### GLOBAL_EXPORT · 5 fields · 0 rec
- _std audit 5/5_

### APP_DEVICE_SETUP · 5 fields · 0 rec
- _std audit 5/5_

### PRODUCTIONS · 15 fields · 9 rec
- _std audit 5/5_
- `Title` Text
- `TitleShort` Text
- `TitleDisplay` Text ae=calc
- `date_FirstRehearsal` TimeStamp // TYPED, never derived. Contractual fact about the show. Calendar_START measures from it
- `date_Opening` TimeStamp // TYPED. The production milestone. Season-report axis + value-list sort
- `cuProductionToken` Text // Indexed. EXACT ClickUp label string. A rename in CU breaks the join SILENTLY
- `cuProductionID` Text // Indexed. Empty until the API pull. Rename-proof successor
- `fkProducer` Text
- `fkVenue` Text
- `fkCourse` Text

### ROLES · 7 fields · 3 rec
- _std audit 5/5_
- `Title` Text
- `TitleShort` Text

### ROLE_ASSIGNMENTS · 15 fields · 0 rec
- _std audit 5/5_
- `vl_Section` Text // Defaults from ROLES.DefaultSection
- `Sort` Number
- `vl_CallsInclusions` Text
- `vl_ReportsInclusion` Text
- `ovr_Role_Title` Text
- `bool_nonPerson` Number ae=ConstantData // default = 0
- `vl_DropboxStatus` Text
- `fkProduction` Text
- `fkRole` Text
- `fkPerson` Text

### WEEKS · 7 fields · 1 rec
- _std audit 5/5_
- `Number` Number
- `Weeks_Wednesday` Date

### EVENTS · 19 fields · 204 rec
- _std audit 5/5_
- `Name` Text
- `dateTime_Start` TimeStamp
- `dateTime_End` TimeStamp
- `bool_AllDay` Number ae=ConstantData // default = 0
- `cuID` Text
- `hash_current` Text // Copied from the winning import row. Cheap change detection
- `fkUtilityReport` Text
- `fkProduction` Text // Indexed. Other half of the upsert key. NEVER upsert on TaskID alone
- `fkCalendar` Text // Resolved at import. A production can have two calendars - stops a spring event printing on a fall g…
- `fkStandardEvent` Text // Nullable. Crosswalk result. The season-report spine
- `cu_StyleToken` Text ae=calc // STYLES row, domain event-status
- `json_Rollback` Text
- `autoBool_unscheduled` Number ae=calc // bool
- `autoKey_StyleLookup` Text ae=calc

### CALENDARS · 8 fields · 8 rec
- _std audit 5/5_
- `fkProduction` Text
- `fkDefaultExportSet` Text
- `Title` Text

### PRODUCERS · 13 fields · 4 rec
- _std audit 5/5_
- `Name` Text
- `NameShort` Text
- `NameDisplay` Text ae=calc
- `media_LogoWide` Binary
- `media_LogoSquare` Binary
- `fkTheme` Text // nullable. empty = inherit the house theme
- `date_SeasonStart` Date
- `date_SeasonEnd` Date

### LOCATIONS · 9 fields · 6 rec
- _std audit 5/5_
- `Name` Text
- `NameShort` Text
- `NameDisplay` Text ae=calc
- `fkLocationType` Text

### LOCATION_TYPES · 7 fields · 5 rec
- _std audit 5/5_
- `Name` Text
- `Sort` Number

### EDITIONS · 9 fields · 0 rec
- _std audit 5/5_
- `Name` Text
- `date_TakesPrecednace` Date // (optional) When this edition is scheduled to become the new SOURCE OF TRUTH. maybe removalble if fk…
- `fkCalendar` Text
- `fkSuperseededBy` Text

### VERSIONS · 7 fields · 0 rec
- _std audit 5/5_
- `ID` Text // Sequence within the calendar AND edition
- `fkEdition` Text

### STANDARD_EVENTS · 11 fields · 2 rec
- _std audit 5/5_
- `Name` Text
- `NameShort` Text
- `NameDisplay` Text ae=calc
- `Sort` Number // Production-convention order, not alphabetical
- `bool_isMilestone` Number ae=ConstantData // default = 0
- `fkStyle` Text

### WORKDAYS · 15 fields · 282 rec
- _std audit 5/5_
- `xTitleShort` Text
- `dateFormat_Colloquial` Text/Calculated = `Left ( DayName ( Date ) ; 3 ) & " " & Day ( Date ) & " " & Left ( MonthName ( Date ) ; 3 )`
- `dateFormat_Display` Text/Calculated = `Left ( DayName ( Date ) ; 3 ) & " " & Day ( Date ) & " " & Left ( MonthName ( Date ) ; 3 ) & " " & Year ( Date )`
- `dateFormat_Short` Text/Calculated = `Day ( Date ) & " " & Left ( MonthName ( Date ) ; 3 )`
- `Date` Date
- `StyleJoin_auto` Text ae=calc
- `calc_ThemedDate` Text/Calculated = `Let ( [ // ─── 1. THE TEXT ───────────────────────────────────────────── ~text = dateFormat_Colloquial ; // ─── 2. RESO…`
- `calc_ThemedDate_Colloquial` Text/Calculated = `Let ( [ // ─── 1. THE TEXT ───────────────────────────────────────────── ~text = dateFormat_Colloquial ; // ─── 2. RESO…`
- `calc_ThemedDate_Display` Text/Calculated = `Let ( [ // ─── 1. THE TEXT ───────────────────────────────────────────── ~text = dateFormat_Display ; // ─── 2. RESOLVE…`
- `calc_ThemedDate_Short` Text/Calculated = `Let ( [ // ─── 1. THE TEXT ───────────────────────────────────────────── ~text = dateFormat_Short ; // ─── 2. RESOLVE C…`

### EVENTS_X_WORKDAYS · 10 fields · 222 rec
- _std audit 5/5_
- `Date` Date // The day this row represents
- `fkEvent` Text // → EVENTS. Identity lives THERE, never here
- `XfkWorkday` Text ae=calc // → WORKDAYS. Stamped at rebuild
- `fkCalendar` Text // Which grid this projection belongs to
- `fkUtilityReport` Text // Which rebuild produced this row. Stamped at rebuild

### CALENDAR_HIGHLIGHTS · 18 fields · 0 rec
- _std audit 5/5_
- `vl_AnchorMode` Text // range | event
- `Name` Text // For list display
- `LegendText` Text // Prints in the legend
- `Priority` Number // Default 10, increment by 10. Highest wins; tie goes to narrowest span
- `dateTime_Start` TimeStamp // Typed. range mode only
- `dateTime_End` TimeStamp // Typed. Must be >= DateStart. Minimum required
- `fkCalendar` Text
- `fkStyle` Text // STYLES row, domain emphasis
- `fkStandardEvent` Text // event mode only. Matches EVERY event of this type in the production
- `DaysBefore` Number ae=ConstantData // Days to extend backward from the anchor. Default = 0
- `DaysAfter` Number ae=ConstantData // Days to extend forward from the anchor. Default = 0
- `calc_ResolvedStart` Date/Calculated = `dateTime_Start` // Unstored. Typed date, or earliest matched event minus PadBefore
- `calc_ResolvedEnd` Date/Calculated = `dateTime_End` // Unstored. Typed date, or latest matched event plus PadAfter

### STYLES · 12 fields · 19 rec
- _std audit 5/5_
- `vl_Domain` Text // month | event-status | watermark | emphasis | base
- `vl_Label` Text // "production-style" — SEMANTIC, never "green"
- `LegendText` Text
- `Sort` Number
- `calc_Key` Text ae=calc
- `calc_ActiveThemeKey` Text/Calculated = `view_GLOBAL_USE::g_pkCurrentTheme & ">" & PrimaryKey` // GLOBAL_USE::g_pkCurrentTheme & ">" & PrimaryKey
- `calc_DefaultThemeKey` Text/Calculated = `view_GLOBAL_USE::g_pkDefaultTheme & ">" & PrimaryKey` // GLOBAL_USE::g_pkDefaultTheme & ">" & PrimaryKey

### THEMES · 7 fields · 3 rec
- _std audit 5/5_
- `Name` Text
- `Sort` Text

### THEMES_X_STYLES · 10 fields · 22 rec
- _std audit 5/5_
- `fkStyle` Text // predicate 2
- `fkTheme` Text ae=calc // predicate 1
- `fkColor_Text` Text // empty = inherit
- `fkTypography` Text // empty = inherit
- `calc_ThemeStyleKey` Text/Calculated = `fkTheme &">"& fkStyle`

### THEME_COLORS · 12 fields · 23 rec
- _std audit 5/5_
- `Name` Text
- `SortLabel` Text
- `R` Number ae=calc
- `G` Number ae=calc
- `B` Number ae=calc
- `Hex_autoCalc` Text/Calculated = `Let ( [ ~hex = RGBToHex ( R ; G ; B ) ; ~r = R ; ~G = G ; ~b = B ] ; TextColor ( ~hex ; RGB ( ~r ; ~g ; ~b ) ) ) /* cal…`
- `enter_Hex` Text

### THEME_TYPOGRAPHY · 11 fields · 4 rec
- _std audit 5/5_
- `Name` Text
- `Font` Text
- `bool_italic` Number ae=ConstantData // default = 0
- `bool_bold` Number ae=ConstantData // default = 0
- `bool_underline` Number ae=ConstantData // default = 0
- `vl_Case` Text // none | upper | title | lower. needs Upper() on a display calc

### VALUE_LISTS · 13 fields · 6 rec
- _std audit 5/5_
- `Name` Text
- `Sort` Number
- `bool_isStatusList` Number ae=ConstantData // default = 0
- `bool_RequireUniqueInCategory` Number
- `g_valuesFor_Activity_Log_Types` Text g
- `g_valuesFor_Status_Categories` Text g
- `g_valuesFor_DOCUMENT_STATUSES` Text g
- `g_valuesFor_REQUIRED_State` Text g

### VALUES · 10 fields · 17 rec
- _std audit 5/5_
- `Name` Text
- `Sort` Number
- `fkList` Text
- `fkStatusCategory` Text
- `fkStyle` Text

### IMPORT_SOURCES · 9 fields · 1 rec
- _std audit 5/5_
- `Name` Text
- `Path` Text // nullable. For csv only
- `Link` Text // nullable. for API, listRef, etc
- `raw_Content` Binary

### IMPORT_EVENTS · 27 fields · 5836 rec
- _std audit 5/5_
- `import_raw_payload` Text // Whole original row/JSON, verbatim
- `import_Name` Text
- `import_dateSTART` Text // just get the data in and safe. paste something if imported BLANK?
- `import_dateEND` Text // just get the data in and safe
- `import_Style_Key` Text // just get the data in and safe
- `import_RowNumber` Number // just get the data in and safe
- `fkUtilityReport` Text
- `fkProduction` Text // Stamped from the session, never derived
- `bool_AllDay` Number ae=ConstantData // default = 0
- `calc_Start_dateTime` TimeStamp/Calculated = `import_dateSTART`
- `calc_End_dateTime` TimeStamp/Calculated = `import_dateEND`
- `calc_Start_date` Date/Calculated = `calc_Start_dateTime`
- `calc_End_date` Date/Calculated = `calc_End_dateTime`
- `calc_Start_time` Time/Calculated = `calc_Start_dateTime`
- `calc_End_time` Time/Calculated = `calc_End_dateTime`
- `calc_Start_AMPM` Text/Calculated = `Let ( [ ~time = GetAsTime ( calc_Start_dateTime ) ; ~temp = 0 ] ; Case ( ~time < Time ( 12 ; 0 ; 0 ) ; "AM" ; "PM" ) )`
- `calc_End_AMPM` Text/Calculated = `Let ( [ ~time = GetAsTime ( calc_End_dateTime ) ; ~temp = 0 ] ; Case ( ~time < Time ( 12 ; 0 ; 0 ) ; "AM" ; "PM" ) )`
- `hash_history` Text ae=calc
- `cu_TaskID` Text // CU source task
- `Event Name` Text // the cleaned, printed version, derived from import_Name
- `json_cleanImportDetails` Text ae=calc
- `Xauto_StyleLookup` Text

### EXPORT_SETS · 10 fields · 0 rec
- _std audit 5/5_
- `Name` Text
- `SetExportPath` Text // if a file does not have a specified destination. <Show>_Calendar_<YYYYMMDD> convention
- `bool_RevertRecord` Number // default = 0
- `bool_ScratchRecord` Number ae=ConstantData // default = 0
- `bool_DefaultRecord` Number // default = 0

### EXPORT_SET_ITEMS · 15 fields · 0 rec
- _std audit 5/5_
- `Sort` Number
- `NameLocal` Text
- `FileExportPath` Text // the final per-file export path choice. may be a reference to the SET's root
- `ovr_vl_OutputSize` Text
- `ovr_WeekStartDay` Number
- `ovr_ShowLegend` Number
- `fkDocument` Text // back to the canonical DOC index. Decides WHICH overrides apply (based on <defa
- `fkPrintSet` Text
- `fkPreset` Text // The HOW. Everything not overridden above resolves from here
- `fkEdition` Text // Prelim | For Bid Only | Final. A PRINT is a VERSION of an edition

### EXPORT_PRESETS · 12 fields · 0 rec
- _std audit 5/5_
- `Name` Text // 11x17 Full Company, Light Lab Only, Agenda
- `vl_OutputSize` Text
- `WeekStartDay` Number // 1=Sun ... 7=Sat. default = 1, SUNDAY
- `bool_UseShortName` Number ae=ConstantData // default = 1
- `bool_ShowLegend` Number ae=ConstantData // default = 1
- `bool_ShowUnscheduled` Number ae=ConstantData // default = 1
- `ExportFolder` Text // Relative. Never absolute - Get(FilePath) resolves the file Relative. Never absolute - Get(FilePath)…

### EXPORT_SESSIONS · 11 fields · 0 rec
- _std audit 5/5_
- `PrintedAt` TimeStamp
- `EventRowCount` Number // Count records printed
- `snap_ExportPath` Text // fkExport_Set export path may change. this is a log.
- `fkPrintSet` Text
- `Result_Pointer` Text // Link to the actual upload, if applicable.
- `Report_Container` Binary // where the run report is exported to. A cover page, and then each exported file appended on to the e…

### UTILITY_SESSIONS · 12 fields · 13 rec
- _std audit 5/5_
- `dateTime_Complete` TimeStamp // When the import is complete. Stamp failed runs too. Normalized.
- `fkcurr_importProduction` Text // *not* fkCalendar
- `fkSource` Text
- `countRows_File` Number
- `countRows_Imported` Number // Mismatch = reconcile before trusting the pull
- `countRows_Flagged` Number // Rows whose production token did not resolve
- `Comment` Text

### UTILITY_REPORTS · 15 fields · 410 rec
- _std audit 5/5_
- `Title` Text // Local run tilte.
- `Comment` Text // Runtime comment from user (nullable).
- `RunSummary` Text // Closing report. Ideally not blank.
- `dateTime_Start` TimeStamp
- `dateTime_End` TimeStamp
- `media_RunReport` Binary // nullable container for report result attachment
- `bool_Pass` Number // default = null. Pass = 1. Fail = 0.
- `vl_Status` Text // complete | partial | failed
- `fkUtilitySession` Text
- `fkAppSession` Text

### UTILITY_LOGS · 13 fields · 7368 rec
- _std audit 5/5_
- `Action` Text // (prose) session | script | pull
- `Timestamp` TimeStamp
- `Comment` Text
- `json_Params` Text // The inbound script parameter, verbatim
- `ErrorCode` Number // Get(LastError) from the failing step, 0 on success
- `fkRunReport` Text // nullable. linkable to a Run Report
- `fkAppSessionToken` Text // One UUID per file session. Pairs the open row to the close row. Every script run in that session ca…
- `auto_counter` Number ae=serial

### auto_LAYOUTS · 7 fields · 0 rec
- _std audit 5/5_
- `Sort` Number
- `Name` Text

### ORGANIZATION · 8 fields · 1 rec
- _std audit 5/5_
- `Name` Text
- `fkProducer` Text
- `fkDefaultTheme` Text

### APP_SESSIONS · 7 fields · 2 rec
- _std audit 5/5_
- `StartTimestamp` TimeStamp
- `ClosedTimestamp` TimeStamp

### DOCUMENTS · 8 fields · 7 rec
- _std audit 5/5_
- `Title` Text
- `auto_DisplayTitle` Text ae=calc
- `url_spec` Text

### ClickUp_Matches · 8 fields · 1 rec
- _std audit 5/5_
- `cu_TaskID` Text
- `fk_Filemaker` Text
- `Source_of_Truth` Text

### DOCUMENT_INSTANCES · 10 fields · 15 rec
- _std audit 5/5_
- `fkDocument` Text
- `fkProduction` Text
- `v_REQUIRED_Status` Text
- `v_PROGRESS_Status` Text
- `UUID.Production.Document` Text ae=calc

### ClickUp_TASKS · 10 fields · 7 rec
- _std audit 5/5_
- `cu_TaskID` Text
- `Home_List` Text
- `cu_CustomTaskID` Text // nullable | a convenient display sometimes
- `cu_TaskName` Text
- `auto_DisplayName` Text ae=calc

### COMPARE_Array · 7 fields · 8 rec
- _std audit 5/5_
- `fk_generic` Text
- `SORT` Number

### COMPARE_SavedViews · 9 fields · 1 rec
- _std audit 5/5_
- `JSON_completeSave` Text
- `auto_Num_Indexes` Number
- `SaveTitle` Text
- `auto_DisplayName` Text ae=calc

## Table occurrences (87) · name[base table]
VALUE_LISTS_of_Activity_Log_Types[VALUE_LISTS], VALUE_LISTS_of_Required_State[VALUE_LISTS], VALUE_LISTS_of_Document_Statuses[VALUE_LISTS], VALUE_LISTS_of_Status_Categories[VALUE_LISTS], VALUES[VALUES], VALUE_LISTS_fVALUES[VALUE_LISTS], DOCUMENTS_GLOBAL_USE[GLOBAL_USE], DOCUMENTS[DOCUMENTS], view_GLOBAL_USE[GLOBAL_USE], VALUES_fDOC_REQUIRED_Status[VALUES], DOCUMENT_INSTANCES[DOCUMENT_INSTANCES], VALUES_fDOC_PROGRESS_Status[VALUES], view_VALUES[VALUES], DOCUMENT_PRODUCTIONS[PRODUCTIONS], view_PRODUCTIONS[PRODUCTIONS], view_DOCUMENT_INSTANCES[DOCUMENT_INSTANCES], view_DOCUMENTS[DOCUMENTS], view_ClickUp_TASKS[ClickUp_TASKS], DOCUMENT_ClickUp_Matches[ClickUp_Matches], DOCUMENT_ClickUp_TASKS[ClickUp_TASKS], view_ClickUp_Matches[ClickUp_Matches], CALENDARS_for_WORKDAYSxEVENTS[CALENDARS], EVENTS_X_WORKDAYS[EVENTS_X_WORKDAYS], view_CALENDARS[CALENDARS], THEME_TYPOGRAPHY_for_curr_WORKDAYS[THEME_TYPOGRAPHY], TxS_for_curr_WORKDAYS[THEMES_X_STYLES], THEME_TYPOGRAPHY_for_default_WORKDAYS[THEME_TYPOGRAPHY], STYLES_for_WORKDAYS[STYLES], TxS_for_default_WORKDAYS[THEMES_X_STYLES], THEME_COLORS_for_default_WORKDAYS[THEME_COLORS], THEME_COLORS_for_curr_WORKDAYS[THEME_COLORS], WORKDAYS[WORKDAYS], STYLES_for_EVENTS[STYLES], EVENTS[EVENTS], THEME_COLORS_for_EVENTS[THEME_COLORS], THEMES_X_STYLES_for_EVENTS[THEMES_X_STYLES], THEME_TYPOGRAPHY_for_EVENTS[THEME_TYPOGRAPHY], view_THEMES[THEMES], view_THEME_TYPOGRAPHY[THEME_TYPOGRAPHY], view_THEME_COLORS[THEME_COLORS], view_THEMES_X_STYLES[THEMES_X_STYLES], view_STYLES[STYLES], WORKDAYS_for_assignEvents[WORKDAYS], view_EVENTS_X_WORKDAYS[EVENTS_X_WORKDAYS], CALENDARS[CALENDARS], PRODUCTIONS_forCalendars[PRODUCTIONS], view_EVENTS[EVENTS], view_WORKDAYS[WORKDAYS], view_EXPORT_SESSIONS[EXPORT_SESSIONS], EXPORT_SESSIONS[EXPORT_SESSIONS], UTILITY_REPORTS_for_Importing_Events[UTILITY_REPORTS], view_PRINT_PRESETS[EXPORT_PRESETS], view_EXPORT_SET_ITEMS[EXPORT_SET_ITEMS], view_EXPORT_SETS[EXPORT_SETS], IMPORT_EVENTS_forImportSessions[IMPORT_EVENTS], UTILTIY_LOGS_for_UTILITY_REPORTS[UTILITY_LOGS], UTILITY_SESSIONS[UTILITY_SESSIONS], UTILITY_REPORTS[UTILITY_REPORTS], view_UTILITY_LOGS[UTILITY_LOGS], view_UTILITY_SESSIONS[UTILITY_SESSIONS], view_UTILITY_REPORTS[UTILITY_REPORTS], view_STANDARD_EVENTS[STANDARD_EVENTS], view_CALENDAR_HIGHLIGHTS[CALENDAR_HIGHLIGHTS], view_ROLE_ASSIGNMENTS[ROLE_ASSIGNMENTS], view_ROLES[ROLES], view_LOCATIONS[LOCATIONS], view_LOCATION_TYPES[LOCATION_TYPES], view_EDITIONS[EDITIONS], view_VERSIONS[VERSIONS], view_IMPORT_SOURCES[IMPORT_SOURCES], view_IMPORT_EVENTS[IMPORT_EVENTS], THEME_COLORS_Fill_forStyleThemeJoin[THEME_COLORS], THEME_TYPOGRAPHY_forStyleThemeJoin[THEME_TYPOGRAPHY], THEME_COLORS_Text_forStyleThemeJoin[THEME_COLORS], THEMES_X_STYLES[THEMES_X_STYLES], THEMES[THEMES], STYLES[STYLES], view_PRODUCER_INFO[PRODUCERS], view_ORGANIZATION[ORGANIZATION], view_auto_LAYOUTS[auto_LAYOUTS], view_VALUE_LISTS[VALUE_LISTS], view_WEEKS[WEEKS], view_GLOBAL_EXPORT[GLOBAL_EXPORT], view_APP_SESSIONS[APP_SESSIONS], view_APP_DEVICE_SETUP[APP_DEVICE_SETUP], COMPARE_Array[COMPARE_Array], COMPARE_SavedViews[COMPARE_SavedViews]

## Relationships (36)
- CALENDARS ⇄ PRODUCTIONS_forCalendars on fkProduction CartesianProduct PrimaryKey
- UTILTIY_LOGS_for_UTILITY_REPORTS ⇄ UTILITY_REPORTS on fkRunReport Equal PrimaryKey [L:create]
- VALUES ⇄ VALUE_LISTS_fVALUES on fkList Equal PrimaryKey [L:create]
- THEMES_X_STYLES ⇄ STYLES on fkStyle Equal PrimaryKey
- THEMES_X_STYLES ⇄ THEMES on fkTheme Equal PrimaryKey
- THEME_COLORS_Text_forStyleThemeJoin ⇄ THEMES_X_STYLES on PrimaryKey Equal fkColor_Text
- THEME_COLORS_Fill_forStyleThemeJoin ⇄ THEMES_X_STYLES on PrimaryKey Equal 
- THEME_TYPOGRAPHY_forStyleThemeJoin ⇄ THEMES_X_STYLES on PrimaryKey Equal fkTypography
- UTILITY_REPORTS ⇄ UTILITY_SESSIONS on fkUtilitySession Equal PrimaryKey
- IMPORT_EVENTS_forImportSessions ⇄ UTILITY_REPORTS_for_Importing_Events on fkUtilityReport Equal PrimaryKey
- EVENTS_X_WORKDAYS ⇄ EVENTS on fkEvent Equal PrimaryKey
- WORKDAYS ⇄ EVENTS_X_WORKDAYS on PrimaryKey Equal XfkWorkday
- WORKDAYS_for_assignEvents ⇄ EVENTS_X_WORKDAYS on Date Equal Date
- EVENTS ⇄ STYLES_for_EVENTS on autoKey_StyleLookup Equal calc_Key
- THEME_COLORS_for_EVENTS ⇄ THEMES_X_STYLES_for_EVENTS on PrimaryKey Equal fkColor_Text
- THEME_TYPOGRAPHY_for_EVENTS ⇄ THEMES_X_STYLES_for_EVENTS on PrimaryKey Equal fkTypography
- THEMES_X_STYLES_for_EVENTS ⇄ STYLES_for_EVENTS on fkStyle Equal PrimaryKey
- STYLES_for_WORKDAYS ⇄ WORKDAYS on calc_Key Equal StyleJoin_auto
- THEME_COLORS_for_curr_WORKDAYS ⇄ TxS_for_curr_WORKDAYS on PrimaryKey Equal fkColor_Text
- THEME_TYPOGRAPHY_for_curr_WORKDAYS ⇄ TxS_for_curr_WORKDAYS on PrimaryKey Equal fkTypography
- TxS_for_curr_WORKDAYS ⇄ STYLES_for_WORKDAYS on calc_ThemeStyleKey Equal calc_ActiveThemeKey
- THEME_TYPOGRAPHY_for_default_WORKDAYS ⇄ TxS_for_default_WORKDAYS on PrimaryKey Equal fkTypography
- THEME_COLORS_for_default_WORKDAYS ⇄ TxS_for_default_WORKDAYS on PrimaryKey Equal fkColor_Text
- TxS_for_default_WORKDAYS ⇄ STYLES_for_WORKDAYS on calc_ThemeStyleKey Equal calc_DefaultThemeKey
- CALENDARS_for_WORKDAYSxEVENTS ⇄ EVENTS_X_WORKDAYS on PrimaryKey Equal fkCalendar
- DOCUMENT_ClickUp_Matches ⇄ DOCUMENTS on fk_Filemaker Equal PrimaryKey
- DOCUMENT_ClickUp_Matches ⇄ DOCUMENT_ClickUp_TASKS on cu_TaskID Equal cu_TaskID
- DOCUMENT_INSTANCES ⇄ DOCUMENTS on fkDocument Equal PrimaryKey [L:create]
- DOCUMENT_PRODUCTIONS ⇄ DOCUMENT_INSTANCES on PrimaryKey Equal fkProduction
- VALUES_fDOC_REQUIRED_Status ⇄ DOCUMENT_INSTANCES on PrimaryKey Equal v_REQUIRED_Status
- VALUES_fDOC_PROGRESS_Status ⇄ DOCUMENT_INSTANCES on PrimaryKey Equal v_PROGRESS_Status
- DOCUMENTS_GLOBAL_USE ⇄ DOCUMENTS on g_pkCurrentDocument Equal PrimaryKey
- VALUE_LISTS_of_Activity_Log_Types ⇄ VALUES on g_valuesFor_Activity_Log_Types Equal fkList
- VALUE_LISTS_of_Status_Categories ⇄ VALUES on g_valuesFor_Status_Categories Equal fkList
- VALUE_LISTS_of_Document_Statuses ⇄ VALUES on g_valuesFor_DOCUMENT_STATUSES Equal fkList
- VALUE_LISTS_of_Required_State ⇄ VALUES on g_valuesFor_REQUIRED_State Equal fkList

## Value lists (23)
- PRODUCTIONS · Field: PRODUCTIONS_forCalendars::PrimaryKey, PRODUCTIONS_forCalendars::TitleDisplay
- LOCATION_TYPES · Field: view_LOCATION_TYPES::PrimaryKey, view_LOCATION_TYPES::Name
- PRODUCERS · Field: view_PRODUCER_INFO::PrimaryKey, view_PRODUCER_INFO::NameDisplay
- LOCATIONS · Field: view_LOCATIONS::PrimaryKey, view_LOCATIONS::NameDisplay
- EXPORT_SETS · Field: view_EXPORT_SETS::PrimaryKey, view_EXPORT_SETS::Name
- One · custom: 1
- values_Status_Categories · Field: ::, ::
- Value_Lists · Field: view_VALUE_LISTS::PrimaryKey, view_VALUE_LISTS::Name
- open | close · custom: open close
- values_Utility_Action_Types · Field: view_VALUES::PrimaryKey, view_VALUES::Name
- valueStatuses_Utility_Run · Field: view_VALUES::PrimaryKey, view_VALUES::Name
- VALUES · Field: VALUES::PrimaryKey, VALUES::Name
- UTILITY_REPORTS · Field: UTILITY_REPORTS::PrimaryKey, UTILITY_REPORTS::dateTime_Start
- CALENDARS · Field: view_CALENDARS::PrimaryKey, view_CALENDARS::Title
- THEMES · Field: view_THEMES::PrimaryKey, view_THEMES::Name
- COLORS · Field: view_THEME_COLORS::PrimaryKey, view_THEME_COLORS::Name
- TYPOGRAPHY · Field: view_THEME_TYPOGRAPHY::PrimaryKey, view_THEME_TYPOGRAPHY::Name
- STYLES · Field: view_STYLES::PrimaryKey, view_STYLES::calc_Key
- ORGANIZATIONS · Field: view_ORGANIZATION::PrimaryKey, view_ORGANIZATION::Name
- Source_of_Truth · custom: ClickUp Filemaker
- popup_ClickUp_TaskIDs · Field: view_ClickUp_TASKS::PrimaryKey, view_ClickUp_TASKS::auto_DisplayName
- popup_RequiredSTATE · Field: VALUES::PrimaryKey, VALUES::Name
- pStatus_Documents · Field: VALUES::PrimaryKey, VALUES::Name

## Custom functions (12)
- Param(elementList)
- PText(key;value)
- PNum(key;value)
- Pjson(key;jsonValue)
- Pbool(key;value)
- ParamHas(json;key)
- ParamGetText(json;key;fallback)
- ParamGetNumber(json;key;fallback)
- ParamGetBool(json;key;fallback)
- JSONPatch(json;key;value;kind)
- RGBToHex(r;g;b)
- HexToRGB(hex)

## Scripts (folder tree · step counts exclude comments · `-` separators omitted)
- **set Global | pkCurrentUtilitySession** · 3 steps
- **file | Create Backup** · 14 steps · calls: new | Utility Log

**📁 APP OPEN**
- **on App Open** · 3 steps · calls: new | App Session Token, new | Utility Log
- **new | App Session Token** · 2 steps

**📁 APP CLOSE**
- **on App Close** · 4 steps · calls: file | Create Backup, new | Utility Log

**📁 BUTTONS**
- **button | import EVENTS** · 24 steps (2 disabled) · calls: Show ALL or NONE, goTo | table Import EVENTS, import | new events, new | Utility Log, new | Utility Report, set Global | pkCurrentUtilitySession
- **button | generate events x workdays** · 45 steps · calls: goTo | Events x Workdays, new | workday x event
- **new | workday x event** · 15 steps (2 disabled) · calls: goTo | Events x Workdays

**📁 New-Record**
- **new-import-session** · 2 steps
- **lookup | production short** · 15 steps · calls: goTo | productions, new | Utility Log

**📁 40-Importing**
- **import | new events** · 25 steps (3 disabled) · calls: import EVENT | remove ProdShortName, import | Event records, import | bool all day, import | copy Payload, import | delete empty rows, import | delete header row, import | pass to workspace, import | remove maw notes, import | write row numbers, link | fkReport fkProd Hash, new | Utility Report, xlink | fkUtilityReport

**📁 40-Importing/process**
- **import | Event records** · 11 steps · calls: new | Utility Log
- **import | write row numbers** · 11 steps · calls: new | Utility Log
- **import | copy Payload** · 2 steps · calls: new | Utility Log

**📁 40-Importing/linking**
- **xlink | fkUtilityReport** · 8 steps · calls: new | Utility Log
- **link | fkReport fkProd Hash** · 23 steps (13 disabled) · calls: new | Utility Log

**📁 40-Importing/normalization**
- **import | delete empty rows** · 11 steps · calls: new | Utility Log
- **import | delete header row** · 7 steps · calls: new | Utility Log
- **import EVENT | remove ProdShortName** · 9 steps · calls: filter | to current run, lookup | production short, new | Utility Log
- **import | remove maw notes** · 7 steps · calls: filter | to current run, new | Utility Log
- **import | bool all day** · 11 steps · calls: filter | to current run, new | Utility Log

**📁 40-Importing/Pass to Workspace**
- **import | pass to workspace** · 35 steps (7 disabled) · calls: compare | cu_ID, end | Utility Report, filter | to current run, import | merge Event, import | net new Event, new | Utility Log, new | Utility Report
- **compare | cu_ID** · 31 steps (7 disabled) · calls: goTo | Events, new | Utility Log
- **import | net new Event** · 36 steps (3 disabled) · calls: Show ALL or NONE, goTo | Events, lookup | calendar for production, new | Utility Log, update | EVENT_auto_StyleLookup
- **update | EVENT_auto_StyleLookup** · 1 steps
- **import | merge Event** · 50 steps (25 disabled) · calls: Show ALL or NONE, backup | EVENT, goTo | Events, lookup | calendar for production, merge | compare field, new | Utility Log, update | EVENT_auto_StyleLookup
- **backup | EVENT** · 32 steps (30 disabled)
- **merge | compare field** · 17 steps (4 disabled) · calls: backup | EVENT
- **XXmerge | Event Field** · 17 steps · calls: backup | EVENT
- **lookup | calendar for production** · 18 steps (1 disabled) · calls: goTo | Calendars, new | Utility Log
- **filter | to current run** · 3 steps

**📁 80-GoTo**

**📁 80-GoTo/CURRENTS**
- **goto_view_UTILITY_LOGS** · 1 steps
- **goTo | view_UTILITY_REPORTS** · 15 steps (1 disabled)
- **goTo | productions** · 1 steps
- **goTo | Calendars** · 17 steps (2 disabled)
- **goTo | Events** · 1 steps
- **goTo | Events x Workdays** · 1 steps
- **goTo | table Import EVENTS** · 1 steps
- **goto_view_Import_Sessions** · 1 steps
- **goto_view_APP_SESSIONS** · 1 steps
- **goto_view_UTILITY_LOGS** · 1 steps
- **goto_view_VALUES** · EMPTY

**📁 85-NEW_WINDOWS**
- **goTo | new window currentRunReport** · 11 steps (6 disabled) · calls: goTo | view_UTILITY_REPORTS

**📁 90-UTILITY**
- **trigger_App_Open** · 7 steps · calls: Show ALL or NONE, goto_view_APP_SESSIONS
- **App_Startup** · 9 steps

**📁 90-UTILITY/RUN_REPORTS**
- **new | Utility Report** · 28 steps (5 disabled) · calls: goTo | view_UTILITY_REPORTS, new | Utility Log
- **end | Utility Report** · 17 steps (8 disabled) · calls: goTo | new window currentRunReport, new | Utility Log

**📁 90-UTILITY/LOGS**
- **new | Utility Log** · 27 steps (3 disabled) · calls: goto_view_UTILITY_LOGS

**📁 SHOW & HIDE**
- **Show ALL or NONE** · 15 steps (1 disabled)
- **status_index_move** · 23 steps
- **exit w/ errors** · 8 steps
- **button | generate Workdays** · 22 steps (1 disabled)
- **sort | fkWorkday date** · 1 steps
- **field auto | enter_Hex update** · 1 steps
- **refresh | auto fields** · 11 steps (4 disabled)
- **set | Document PRODUCTION from MATRIX** · 9 steps (1 disabled)

## Layouts (folder tree · base TO · fields placed · button → script) · geometry + styling NOT captured
- **HOME** [view_GLOBAL_USE] · 8 fields

**📁 UX**

**📁 UX/DOCUMENTS**
- **DOCUMENTS** [DOCUMENTS] · 12 fields · 3 portals

**📁 View TABLES**

**📁 View TABLES/GLOBALS | UTILITIES**
- **view | APP_DEVICE_SETUP** [view_APP_DEVICE_SETUP] · 0 fields
- **view | auto_LAYOUTS** [view_auto_LAYOUTS] · 2 fields
- **view | UTILITY_REPORTS** [view_UTILITY_REPORTS] · 11 fields
- **view | UTILITY_LOGS** [view_UTILITY_LOGS] · 8 fields
- **view | GLOBAL_USE** [view_GLOBAL_USE] · 0 fields
- **view | GLOBAL_EXPORT_VARIABLES** [view_GLOBAL_EXPORT] · 0 fields
- **view_VALUE_LISTS** [view_VALUE_LISTS] · 4 fields
- **view_VALUES** [view_VALUES] · 5 fields
- **view | APP_SESSIONS** [view_APP_SESSIONS] · 2 fields

**📁 View TABLES/Normalized**

**📁 View TABLES/Normalized/working**
- **view | DOCUMENTS** [view_DOCUMENTS] · 3 fields
- **view | DOCUMENT_INSTANCES** [view_DOCUMENT_INSTANCES] · 5 fields
- **view | ClickUp_TASKS** [view_ClickUp_TASKS] · 5 fields
- **view | ClickUp_Matches** [view_ClickUp_Matches] · 3 fields
- **view | COMPARE_Array** [COMPARE_Array] · 2 fields
- **view | COMPARE_SavedViews** [COMPARE_SavedViews] · 4 fields
- **view | ORGANIZATION** [view_ORGANIZATION] · 3 fields
- **view | PRODUCERS** [view_PRODUCER_INFO] · 8 fields
- **view | PRODUCTIONS** [view_PRODUCTIONS] · 10 fields
- **view | ROLES** [view_ROLES] · 2 fields
- **view | WEEKS** [view_WEEKS] · 0 fields
- **view | WORKDAYS** [view_WORKDAYS] · 5 fields · btn → button | generate Workdays, refresh | auto fields
- **view | STANDARD_EVENTS** [view_STANDARD_EVENTS] · 5 fields
- **script | CALENDARS** [view_CALENDARS] · 3 fields
- **script | LOCATION_TYPES** [view_LOCATION_TYPES] · 1 fields

**📁 View TABLES/WORKING DATA**
- **script | EVENTS** [view_EVENTS] · 0 fields
- **script | EVENT_WORKDAYS** [view_EVENTS_X_WORKDAYS] · 5 fields
- **script | CALENDAR_HIGHLIGHTS** [view_CALENDAR_HIGHLIGHTS] · 13 fields
- **script | ROLE_ASSIGNMENTS** [view_ROLE_ASSIGNMENTS] · 10 fields
- **script | VERSIONS** [view_VERSIONS] · 2 fields
- **script | EDITIONS** [view_EDITIONS] · 4 fields
- **script | LOCATIONS** [view_LOCATIONS] · 4 fields

**📁 View TABLES/STYLING**
- **script | THEMES** [view_THEMES] · 2 fields
- **script | STYLES** [view_STYLES] · 7 fields
- **script | THEME_COLORS** [view_THEME_COLORS] · 6 fields
- **script | THEME_TYPOGRAPHY** [view_THEME_TYPOGRAPHY] · 6 fields
- **script | THEMES_X_STYLES** [view_THEMES_X_STYLES] · 5 fields

**📁 View TABLES/IMPORTING**
- **script | UTILITY_SESSIONS** [view_UTILITY_SESSIONS] · 2 fields
- **script | IMPORT_SOURCES** [view_IMPORT_SOURCES] · 3 fields
- **script | IMPORT_EVENTS** [view_IMPORT_EVENTS] · 0 fields

**📁 View TABLES/EXPORTING**
- **EXPORT_SESSIONS** [EXPORT_SESSIONS] · 3 fields
- **view_EXPORT_SET_ITEMS** [view_EXPORT_SET_ITEMS] · 2 fields
- **EXPORT_PRESETS** [view_PRINT_PRESETS] · 6 fields
- **view_EXPORT_SETS** [view_EXPORT_SETS] · 4 fields

**📁 NORMALIZED TABLES**
- **table | PRODUCTIONS** [view_PRODUCTIONS] · 11 fields
- **table | CALENDARS** [view_CALENDARS] · 3 fields
- **table | ROLES Copy** [view_ROLES] · 2 fields
- **table | STANDARD_EVENTS** [view_STANDARD_EVENTS] · 6 fields
- **table | IMPORT_EVENTS** [view_IMPORT_EVENTS] · 22 fields
- **table | EVENTS** [view_EVENTS] · 13 fields · btn → button | generate events x workdays
- **table | WEEKS Copy** [view_WEEKS] · 2 fields
- **table | LOCATION_TYPES Copy** [view_LOCATION_TYPES] · 2 fields
- **table | IMPORT_SOURCES** [view_IMPORT_SOURCES] · 4 fields
- **table | THEMES** [view_THEMES] · 2 fields
- **table | STYLES** [view_STYLES] · 4 fields
- **table | THEMES_X_STYLES Copy** [view_THEMES_X_STYLES] · 4 fields
- **VALUE_LISTS_fVALUES** [VALUE_LISTS_fVALUES] · 12 fields · 2 portals
- **Import New Events** [UTILITY_SESSIONS] · 16 fields · 2 portals · btn → button | import EVENTS
- **event portal** [WORKDAYS] · 9 fields · 2 portals

**📁 PRINT**
- **print | Agenda Calendar** [EVENTS_X_WORKDAYS] · 10 fields
- **print | Calendar** [WORKDAYS] · 12 fields · 1 portals
- **temp** [WORKDAYS] · 5 fields

## Counts
Tables 43 · Fields 473 · TOs 87 · Relationships 36 · Value lists 23 · Custom functions 12 · Scripts 56 · Layouts 63

## Not captured (declared)
- Layout object geometry, styles, local CSS, theme bodies
- Full script step text lives in STEPS.md, not here
- Record data, accounts, privileges
