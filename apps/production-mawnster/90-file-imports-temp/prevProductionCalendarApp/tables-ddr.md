ProductionCalendarFormat.fmp12

Overview
Tables	9
Relationships	0
Layouts	0
Scripts	73
Value Lists	0
Custom Functions	0
Accounts	0
Privilege Sets	0
Extended Privileges	0
File Access (in / out)	0 / 0
FileMaker Data Sources	0
ODBC Data Sources	0
Custom Menu Sets	0
Custom Menus	0
File Options
Default custom menu set	[Standard FileMaker Menus]
When opening file
Minimum allowed version	12.0
Login using	Account Name; Account= Admin
Allow user to save password	Off
Require iOS passcode	Off
Switch to layout	Off
Hide all toolbars	Off
Script triggers
OnFirstWindowOpen	Script: refreshFilePath
OnLastWindowClose	Off
OnWindowOpen	Off
OnWindowClose	Off
OnFileAVPlayerChange	Off
Thumbnail Settings
Generate Thumbnails	On; Temporary
 

Tables

Table Name	
Statistics
Occurrences in Relationship Graph
Weeks	
4 fields defined, 10 records
SETUP_EXPORT	
9 fields defined, 1 record
SETUP	
20 fields defined, 1 record
Prodution WORKDAYS	
11 fields defined, 68 records
ProductionCalendar Format	
23 fields defined, 121 records
FCCalendarSampleEvents	
16 fields defined, 10 records
FCCalendarAddon	
9 fields defined, 1 record
EventStylesIMPORT_Statuses	
8 fields defined, 7 records
MonthStyles	
8 fields defined, 12 records
Fields

Table Name: Weeks - 4 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: Weeks
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: Unicode Raw
Unique identifier of each record in this table	
Week Number	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
Week START DATE	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
PAGE BREAK	Normal, Number	Auto-Enter:
Allow editing
Validation:
Always Validate
Value list: One
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: SETUP_EXPORT - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: SETUP_EXPORT
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: Unicode Raw
Unique identifier of each record in this table	
FilePathName	Calculated, Text	Calculation:
Context table: SETUP_EXPORT
Let ( [ ~filePath = Get ( FilePath ) ; ~filemakerExtension = ".fmp12" ] ; Left ( ~filePath ; Length ( ~filepath ) - Length ( ~filemakerExtension ) ) &" fmpCals/" )
Storage:
Global
Repetitions: 1
Index Language: English
UseShortTitleDELETETHIS	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
HIDE_Start	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
HIDE_End	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
HIGHLIGHT_Start	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
HIGHLIGHT_End	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
LOWLIGHT_End	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
LOWLIGHT_Start	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English

Table Name: SETUP - 20 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: SETUP
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: Unicode Raw
Unique identifier of each record in this table	
Calendar START	Calculated, Date	Calculation:
Context table: SETUP
Let ( ~calStart = If ( SETUP::startOnMon = 1 ; GetAsNumber ( SETUP::FIRST REHEARSAL ) - DayOfWeek ( SETUP::FIRST REHEARSAL ) + 2 ; GetAsNumber ( SETUP::FIRST REHEARSAL ) - DayOfWeek ( SETUP::FIRST REHEARSAL ) + 1 ) ; If ( SETUP::ADDpreProWeek ≠ 0 ; ~calStart - (7*SETUP::ADDpreProWeek) ; ~calStart ) )
Storage:
Global
Repetitions: 1
Index Language: English
FIRST REHEARSAL	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
LAST DATE Needed	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
ProductionTITLE	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
ProductionSHORTTitle	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Director	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
VenueLOGO	Normal, Binary	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
ProductionLOGO	Normal, Binary	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
UNSCHEDULED Date	Calculated, Date	Calculation:
Context table: SETUP
SETUP::Calendar START
Storage:
Global
Repetitions: 1
Index Language: English
importPreProCounter	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
the number of pre-pro events counted	
startOnMon	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
CalendarDaysNeeded	Calculated, Number	Calculation:
Context table: SETUP
GetAsNumber ( SETUP::LAST DATE Needed ) - GetAsNumber ( SETUP::FIRST REHEARSAL )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
NumberOfRecordsPerPortal	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
NumberAvailablePreProRecords	Calculated, Number	Calculation:
Context table: SETUP
SETUP::NumberAvailablePreProDays * SETUP::NumberOfRecordsPerPortal
Storage:
Global
Repetitions: 1
Index Language: English
NumberAvailablePreProDays	Calculated, Number	Calculation:
Context table: SETUP
SETUP::FIRST REHEARSAL - SETUP::Calendar START
Storage:
Global
Repetitions: 1
Index Language: English
CounterUnscheduledEvents	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Semester	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Course Numbers	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
ADDpreProWeek	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: Prodution WORKDAYS - 11 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: Prodution WORKDAYS
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: Unicode Raw
Unique identifier of each record in this table	
DATE	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
WeekID	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
Workday TITLE	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Workday SORT	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
DisplayAsTitle	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
WorkdayMonth	Calculated, Text	Calculation:
Context table: Prodution WORKDAYS
MonthName ( Prodution WORKDAYS::DATE )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
ColloqiualDate	Calculated, Text	Calculation:
Context table: Prodution WORKDAYS
TextColor ( Let ( [ ~date = GetAsDate ( Prodution WORKDAYS::DATE ) ; ~day = Day ( ~date ) ; ~monthName = Left ( MonthName ( ~date ) ; 3 ) ] ; ~monthName & " " & ~day ) ; RGB ( MonthStyles 2::R ; MonthStyles 2::G ; MonthStyles 2::B ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
HideDateFromCalendar	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
Highlight	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
Lowlight	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English

Table Name: ProductionCalendar Format - 23 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: ProductionCalendar Format
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: Unicode Raw
Unique identifier of each record in this table	
CreationTimestamp	Normal, Timestamp	Auto-Enter:
Creation timestamp
Validation:
Only during data entry
Strict data type: 4 digit year
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Date and time each record was created	
Event Name	Normal, Text	Auto-Enter:
Allow editing
Context table: ProductionCalendar Format
Calculation: TextColor ( Self ; RGB ( EventStylesIMPORT_Statuses 2::R ; EventStylesIMPORT_Statuses 2::G ; EventStylesIMPORT_Statuses 2::B ) )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
Start Date IMPORT	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
End Date IMPORT	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
StyleColor IMPORT	Normal, Text	Auto-Enter:
Allow editing
Context table: ProductionCalendar Format
Calculation: TextColor ( Self ; RGB ( EventStylesIMPORT_Statuses::R ; EventStylesIMPORT_Statuses::G ; EventStylesIMPORT_Statuses::B ) )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
START DATE calc	Calculated, Date	Calculation:
Context table: ProductionCalendar Format
Let ( parsedDATE = LeftWords ( ProductionCalendar Format::Start Date IMPORT; 4 ) ; Date ( GetMonthAsNumber ( MiddleWords ( parsedDATE;2;1) ) ; GetAsNumber ( MiddleWords ( parsedDATE ; 3 ; 1 ) ) ; GetAsNumber ( RightWords ( parsedDATE ; 1 ) ) ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
END DATE calc	Calculated, Date	Calculation:
Context table: ProductionCalendar Format
Let ( parsedDATE = LeftWords ( ProductionCalendar Format::End Date IMPORT; 4 ) ; Date ( GetMonthAsNumber ( MiddleWords ( parsedDATE;2;1) ) ; GetAsNumber ( MiddleWords ( parsedDATE ; 3 ; 1 ) ) ; GetAsNumber ( RightWords ( parsedDATE ; 1 ) ) ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
Start TIME calc	Calculated, Time	Calculation:
Context table: ProductionCalendar Format
If ( IsEmpty ( ProductionCalendar Format::Start TIME AP ) ; "" ; Let ( readTime = GetAsTime ( MiddleWords ( ProductionCalendar Format::Start Date IMPORT ; 5 ; 1 ) ) ; If ( Left ( readTime ; 2 ) = "12" ; If ( ProductionCalendar Format::Start TIME AP = "AM" ; readTime; Time ( 12; 0 ; 0 ) ) ; If ( ProductionCalendar Format::Start TIME AP = "AM" ; readTime ; readTime + (12*3600) ) ) ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
End TIME calc	Calculated, Time	Calculation:
Context table: ProductionCalendar Format
If ( IsEmpty ( ProductionCalendar Format::End TIME AP ) ; "" ; Let ( [readTime = GetAsTime ( MiddleWords ( ProductionCalendar Format::End Date IMPORT ; 5 ; 1 ) ) ; am_pm = If(End TIME AP = "AM";1;0) ] ; If ( Left ( readTime ; 2 ) = "12" ; If ( am_pm ; Time ( 0 ; 0 ; 0 ); Time ( 12; 0 ; 0 ) ) ; If ( am_pm ; readTime ; readTime + (12*3600) ) ) ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
Start TIME AP	Calculated, Text	Calculation:
Context table: ProductionCalendar Format
If ( WordCount ( ProductionCalendar Format::Start Date IMPORT ) > 4 ; MiddleWords ( ProductionCalendar Format::Start Date IMPORT ; 6 ; 1 ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
End TIME AP	Calculated, Text	Calculation:
Context table: ProductionCalendar Format
If ( WordCount ( ProductionCalendar Format::End Date IMPORT ) > 4 ; MiddleWords ( ProductionCalendar Format::End Date IMPORT ; 6 ; 1 ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
Start TIMESTAMP	Calculated, Timestamp	Calculation:
Context table: ProductionCalendar Format
Timestamp ( ProductionCalendar Format::START DATE calc ; ProductionCalendar Format::Start TIME calc )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
End TIMESTAMP	Calculated, Timestamp	Calculation:
Context table: ProductionCalendar Format
Timestamp ( ProductionCalendar Format::END DATE calc ; ProductionCalendar Format::End TIME calc )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
TaskID	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
WORKDAY_ID	Normal, Date	Auto-Enter:
Allow editing
Context table: ProductionCalendar Format
Calculation: If ( IsEmpty ( ProductionCalendar Format::START DATE calc ) ; GetAsDate ( ProductionCalendar Format::END DATE calc ) ; GetAsDate ( ProductionCalendar Format::START DATE calc ) )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
Time Colloqiual	Calculated, Text	Calculation:
Context table: ProductionCalendar Format
Let ( ~actualTEXT = Let ( [ startTimeText = GetAsText ( ProductionCalendar Format::Start TIME calc ) ; endTimeText = GetAsText ( ProductionCalendar Format::End TIME calc ) ; startAM = If ( Start TIME AP = "AM"; 1 ; 0 ) ; endAM = If ( End TIME AP = "AM"; 1 ; 0 ) ; sameAMPM = If ( startAM = endAM ; 1 ; 0 ) ; ~diffDays = DayOfWeek ( GetAsDate ( ProductionCalendar Format::END DATE calc ) ) - DayOfWeek ( GetAsDate ( ProductionCalendar Format::START DATE calc ) ) ; ~justDate = Left ( GetAsText ( ProductionCalendar Format::END DATE calc ) ; Length ( GetAsText ( ProductionCalendar Format::END DATE calc ) )-5 ) ] ; Let ( [ startPhrase = Right ( "0" & Hour ( startTimeText ) ; 2 ) & ":" & Right ( "0" & Minute ( startTimeText ) ; 2 ) ; endPhrase = Right ( "0" & Hour ( endTimeText ) ; 2 ) & ":" & Right ( "0" & Minute ( endTimeText ) ; 2 ) ] ; If ( ProductionCalendar Format::NoDates = 2 ; "TBD" ; If ( ProductionCalendar Format::NoDates = 1 ; ""; If ( ProductionCalendar Format::NoDates = -1 ; Left ( GetAsText ( ProductionCalendar Format::START DATE calc ); Length(GetAsText(ProductionCalendar Format::START DATE calc ))-5) & " - " & Left ( GetAsText ( ProductionCalendar Format::END DATE calc ) ; Length(GetAsText ( ProductionCalendar Format::END DATE calc ))-5); If ( GetAsNumber ( Left ( startPhrase ; 1 ) ) = 0 ; Middle ( startPhrase ; 2 ; 1 ) ; If ( GetAsNumber ( Left ( startPhrase ; 2 ) ) > 12 ; GetAsNumber ( Left ( startPhrase ; 2 ) ) - 12 ; Left ( startPhrase ; 2 ) ) ) & If ( GetAsNumber ( Middle ( startPhrase ; 4 ; 2 ) ) = 0 ; "" ; ":" & Middle ( startPhrase ; 4 ; 2 ) ) & " " & If ( sameAMPM ; "" ; "AM" ) & " - " & If ( GetAsNumber ( Middle ( endPhrase ; 4 ; 2 ) ) = 59 ; "MIDNIGHT" ; If ( GetAsNumber ( Left ( endPhrase ; 1 ) ) = 0 ; Middle ( endPhrase ; 2 ; 1 ) ; If ( GetAsNumber ( Left ( endPhrase ; 2 ) ) > 12 ; GetAsNumber ( Left ( endPhrase ; 2 ) ) - 12 ; Left ( endPhrase ; 2 ) ) ) & If ( GetAsNumber ( Middle ( endPhrase ; 4 ; 2 ) ) = 0 ; "" ; ":" & Middle ( endPhrase ; 4 ; 2 ) ) & " " & If ( endAM ; "AM" ; "PM" ) ) ) ) ) ) ) ; Case ( ProductionCalendar Format::StyleColor IMPORT = "NEW" ; TextColor ( ~actualTEXT ; RGB ( EventStylesIMPORT_Statuses 2::R ; EventStylesIMPORT_Statuses 2::G ; EventStylesIMPORT_Statuses 2::B ) ) ; ~actualTEXT ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
Colloqiual PREPRODUCTION	Calculated, Text	Calculation:
Context table: ProductionCalendar Format
Let ( [ startTimeText = GetAsText ( ProductionCalendar Format::Start TIME calc ) ; endTimeText = GetAsText ( ProductionCalendar Format::End TIME calc ) ; startAM = If ( Start TIME AP = "AM"; 1 ; 0 ) ; endAM = If ( End TIME AP = "AM"; 1 ; 0 ) ; sameAMPM = If ( startAM = endAM ; 1 ; 0 ) ; ~endDateShort = Left ( GetAsText ( ProductionCalendar Format::END DATE calc ) ; Length ( GetAsText ( ProductionCalendar Format::END DATE calc ) )-5 ) ; ~startDateShort = Left ( GetAsText ( ProductionCalendar Format::START DATE calc ); Length(GetAsText(ProductionCalendar Format::START DATE calc ))-5) ; diffDays = DayOfWeek ( GetAsDate ( ProductionCalendar Format::END DATE calc ) ) - DayOfWeek ( GetAsDate ( ProductionCalendar Format::START DATE calc ) ) ] ; Let ( [ startPhrase = Right ( "0" & Hour ( startTimeText ) ; 2 ) & ":" & Right ( "0" & Minute ( startTimeText ) ; 2 ) ; endPhrase = Right ( "0" & Hour ( endTimeText ) ; 2 ) & ":" & Right ( "0" & Minute ( endTimeText ) ; 2 ) ; startTimeDisplay = If ( GetAsNumber ( Left ( startPhrase ; 1 ) ) = 0 ; Middle ( startPhrase ; 2 ; 1 ) ; If ( GetAsNumber ( Left ( startPhrase ; 2 ) ) > 12 ; GetAsNumber ( Left ( startPhrase ; 2 ) ) - 12 ; Left ( startPhrase ; 2 ) ) ) & If ( GetAsNumber ( Middle ( startPhrase ; 4 ; 2 ) ) = 0 ; "" ; ":" & Middle ( startPhrase ; 4 ; 2 ) ) & " " & If ( sameAMPM ; "" ; "A" ) ; endTimeDisplay = If ( GetAsNumber ( Left ( endPhrase ; 1 ) ) = 0 ; Middle ( endPhrase ; 2 ; 1 ) ; If ( GetAsNumber ( Left ( endPhrase ; 2 ) ) > 12 ; GetAsNumber ( Left ( endPhrase ; 2 ) ) - 12 ; Left ( endPhrase ; 2 ) ) & If ( GetAsNumber ( Middle ( endPhrase ; 4 ; 2 ) ) = 0 ; "" ; ":" & Middle ( endPhrase ; 4 ; 2 ) ) & " " & If ( endAM ; "A" ; "P" ) ) ] ; If ( ProductionCalendar Format::NoDates = 1 ; ~endDateShort ; If ( ProductionCalendar Format::NoDates = -1 ; ~startDateShort & " - " & ~endDateShort; "["&~endDateShort&"]" & " " & startTimeDisplay & " - " & endTimeDisplay ) ) ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
Manual WORKDAY Override	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
NoDates	Calculated, Text	Calculation:
Context table: ProductionCalendar Format
TextColor ( If ( IsEmpty ( ProductionCalendar Format::END DATE calc ) ; 2 ; If ( IsEmpty (ProductionCalendar Format::Start Date IMPORT) ; 1 ; If ( DayOfWeek ( GetAsDate ( ProductionCalendar Format::END DATE calc ) ) ≠ DayOfWeek ( GetAsDate ( ProductionCalendar Format::START DATE calc ) ); -1 ; 0 ) ) ) ; RGB (255 ; 0 ; 0 ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
ProductionPeriod	Calculated, Text	Calculation:
Context table: ProductionCalendar Format
Let ( [ eventNUMBER = GetAsNumber ( GetAsDate ( ProductionCalendar Format::END DATE calc ) ) ; firstWeekNUMBER = GetAsNumber ( GetAsDate ( SETUP::FIRST REHEARSAL ) ) ; preproductionNUMBER = GetAsNumber ( GetAsDate ( SETUP::Calendar START ) ) ; lastdateNUMBER = GetAsNumber ( GetAsDate ( SETUP::LAST DATE Needed ) ) + 7 ] ; If ( eventNUMBER < 0 ; "UNSCHEDULED" ; If ( eventNumber < preproductionNUMBER ; "BEFORE" ; If ( eventNUMBER > lastdateNUMBER ; "POST" ; If ( eventNUMBER < firstWeekNUMBER ; "BEFORE" ; "ON CALENDAR" ) ) ) ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
autoGenerated	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
StyleColor IMPORT STYLED	Calculated, Number	Calculation:
Context table: ProductionCalendar Format
TextColor ( ProductionCalendar Format::StyleColor IMPORT ; RGB ( EventStylesIMPORT_Statuses::R ; EventStylesIMPORT_Statuses::G ; EventStylesIMPORT_Statuses::B ) )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English

Table Name: FCCalendarSampleEvents - 16 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
Id	Normal, Text	Auto-Enter:
Allow editing
Context table: FCCalendarSampleEvents
Calculation: Get(UUID)
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
AllDay	Normal, Number	Auto-Enter:
Allow editing
Context table: FCCalendarSampleEvents
Calculation: If(Self; 1; 0)
Validation:
Only during data entry
Range: 0 - 1
Storage:
Repetitions: 1
Indexing: All
Index Language: English
String. Events that share a groupId will be dragged and resized together automatically.	
StartDate	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
String. Events that share a groupId will be dragged and resized together automatically.	
EndDate	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
String. Events that share a groupId will be dragged and resized together automatically.	
Editable	Normal, Number	Auto-Enter:
Constant data: 1
Allow editing
Context table: FCCalendarSampleEvents
Calculation: If(Self; 1; 0)
Validation:
Only during data entry
Range: 0 - 1
Storage:
Repetitions: 1
Indexing: All
Index Language: English
String. Events that share a groupId will be dragged and resized together automatically.	
Title	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
Style	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
StartTime	Normal, Time	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
EndTime	Normal, Time	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Description	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Temp	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Color	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
importSTART	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
importEND	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
calcStartDATE	Calculated, Date	Calculation:
Context table: FCCalendarSampleEvents
GetAsDate ( FCCalendarSampleEvents::importSTART )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
calcStartTIME	Calculated, Text	Calculation:
Context table: FCCalendarSampleEvents
GetAsTime ( FCCalendarSampleEvents::calcStartDATE )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: FCCalendarAddon - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
HTML	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
ConfigStore	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
CurrentState	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Query	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
CurrentAddonUUID	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
OriginalLayout	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
This is the layout that the Addon being configurated came from	
OriginalTable	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
This is the TO of layout that the Addon being configurated came from	
Test	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
DefaultDayOfWeek	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: EventStylesIMPORT_Statuses - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: EventStylesIMPORT_Statuses
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: Unicode Raw
Unique identifier of each record in this table	
Label	Normal, Text	Auto-Enter:
Allow editing
Context table: EventStylesIMPORT_Statuses
Calculation: TextColor ( Self ; RGB ( EventStylesIMPORT_Statuses::R ; EventStylesIMPORT_Statuses::G ; EventStylesIMPORT_Statuses::B ) )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
Color	Normal, Text	Auto-Enter:
Allow editing
Context table: EventStylesIMPORT_Statuses
Calculation: TextColor ( EventStylesIMPORT_Statuses::Color ; RGB ( EventStylesIMPORT_Statuses::R ; EventStylesIMPORT_Statuses::G ; EventStylesIMPORT_Statuses::B ) )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
R	Calculated, Text	Calculation:
Context table: EventStylesIMPORT_Statuses
HexToRGB ( EventStylesIMPORT_Statuses::Hex ; "r" )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
G	Calculated, Number	Calculation:
Context table: EventStylesIMPORT_Statuses
HexToRGB ( EventStylesIMPORT_Statuses::Hex ; "g" )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
B	Calculated, Number	Calculation:
Context table: EventStylesIMPORT_Statuses
HexToRGB ( EventStylesIMPORT_Statuses::Hex ; "b" )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
Hex	Normal, Number	Auto-Enter:
Allow editing
Lookup: Colors::Hex, Do not copy, Don't copy contents if empty
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
includeInLegend	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English

Table Name: MonthStyles - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: MonthStyles
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: Unicode Raw
Unique identifier of each record in this table	
MonthName	Normal, Text	Auto-Enter:
Allow editing
Context table: MonthStyles
Calculation: TextColor ( Self ; RGB ( MonthStyles::R ; MonthStyles::G ; MonthStyles::B ) )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
Color	Normal, Text	Auto-Enter:
Allow editing
Context table: MonthStyles
Calculation: TextColor ( Self ; RGB ( MonthStyles::R ; MonthStyles::G ; MonthStyles::B ) )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
R	Calculated, Text	Calculation:
Context table: MonthStyles
HexToRGB ( MonthStyles::Hex ; "r" )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
G	Calculated, Number	Calculation:
Context table: MonthStyles
HexToRGB ( MonthStyles::Hex ; "g" )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
B	Calculated, Number	Calculation:
Context table: MonthStyles
HexToRGB ( MonthStyles::Hex ; "b" )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
Hex	Normal, Number	Auto-Enter:
Allow editing
Lookup: Colors::Hex, Do not copy, Don't copy contents if empty
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
MonthNum	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Base Directories