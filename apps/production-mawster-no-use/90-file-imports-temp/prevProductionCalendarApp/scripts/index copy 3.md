
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [checkHIGHlight]
Parent Folder: [Production WORKDAY]
Next Script: [Workday Sort INPUT]
Script Name	checkLOWlight
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
CREATE PRODUCTION WORKDAYS
Script Definition
Script Steps	
#get hide START and END dates to be local
Set Variable [ $START; Value:GetAsNumber ( SETUP_EXPORT::LOWLIGHT_Start ) ]
Set Variable [ $END; Value:GetAsNumber ( SETUP_EXPORT::LOWLIGHT_End ) ]
// Show Custom Dialog [ Title: "check"; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
#determine if this record is equal to or between these dates
If [ GetAsNumber ( Prodution WORKDAYS::DATE ) ≥ GetAsNumber ( $START ) ]
// Show Custom Dialog [ Title: "success 1!"; Message: "start: " & GetAsText ( GetAsNumber ( $hideSTART ) ); Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
If [ Prodution WORKDAYS::DATE ≤ $END ]
// Show Custom Dialog [ Title: "success 2!"; Message: $hideEND; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
Set Field [ Prodution WORKDAYS::Lowlight; "1" ]
End If
End If
#if they are, make HIDE = 1
Fields used in this script	
SETUP_EXPORT::LOWLIGHT_Start
SETUP_EXPORT::LOWLIGHT_End
Prodution WORKDAYS::DATE
Prodution WORKDAYS::Lowlight
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [checkLOWlight]
Parent Folder: [Production WORKDAY]
Next Script: [Workday_CalendarStart]
Script Name	Workday Sort INPUT
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
CREATE PRODUCTION WORKDAYS
Script Definition
Script Steps	
Set Variable [ $n; Value:1 ]
Show All Records
Go to Record/Request/Page [ First ]
Go to Field [ Prodution WORKDAYS::Workday SORT ]
Loop
Set Field [ Prodution WORKDAYS::Workday SORT; $n ]
Set Variable [ $n; Value:$n+1 ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Go to Record/Request/Page [ First ]
Fields used in this script	
Prodution WORKDAYS::Workday SORT
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [Workday Sort INPUT]
Parent Folder: [Production WORKDAY]
Script Name	Workday_CalendarStart
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
CREATE PRODUCTION WORKDAYS
Script Definition
Script Steps	
Enter Find Mode [ ]
Set Field [ Prodution WORKDAYS::DATE; GetAsDate ( SETUP::UNSCHEDULED Date ) ]
Perform Find [ ]
Set Field [ Prodution WORKDAYS::Workday TITLE; "Unscheduled" ]
Show All Records
Fields used in this script	
SETUP::UNSCHEDULED Date
Prodution WORKDAYS::DATE
Prodution WORKDAYS::Workday TITLE
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

SORT Functions

Parent Folder: [SORT Functions]
Next Script: [Sort by SORT]
Script Name	Sort by DATE
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Sort Records by Field [ Ascending; Prodution WORKDAYS::DATE ]
Fields used in this script	
Prodution WORKDAYS::DATE
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [Sort by DATE]
Parent Folder: [SORT Functions]
Script Name	Sort by SORT
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
CREATE PRODUCTION WORKDAYS
Script Definition
Script Steps	
Sort Records by Field [ Ascending; Prodution WORKDAYS::Workday SORT ]
Fields used in this script	
Prodution WORKDAYS::Workday SORT
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

PRINTs

Parent Folder: [PRINTs]
Script Name	-
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

PRINT_SETUPS

Parent Folder: [PRINT_SETUPS]
Next Script: [PRINT_SETUP 11x17 portraitORlandscape]
Script Name	PRINT_SETUP 8.5x11 portraitORlandscape
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
EXPORT Calendar Set
PRINT Calendar Set
Script Definition
Script Steps	
Set Variable [ $test; Value:Get(ScriptParameter) ]
#1 = LANDSCAPE
If [ $test = 1 ]
Print Setup [ Orientation: Landscape; Paper size: 8.5" x 11" ] [ Restore; No dialog ]
#everything else = PORTRAIT
Else
Print Setup [ Orientation: Portrait; Paper size: 8.5" x 11" ] [ Restore; No dialog ]
End If
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [PRINT_SETUP 8.5x11 portraitORlandscape]
Parent Folder: [PRINT_SETUPS]
Script Name	PRINT_SETUP 11x17 portraitORlandscape
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
EXPORT Calendar Set
PRINT Calendar Set
Script Definition
Script Steps	
Set Variable [ $test; Value:Get(ScriptParameter) ]
#1 = LANDSCAPE
If [ $test = 1 ]
Print Setup [ Orientation: Landscape; Paper size: 11" x 17" ] [ Restore; No dialog ]
#everything else = PORTRAIT
Else
Print Setup [ Orientation: Portrait; Paper size: 11" x 17" ] [ Restore; No dialog ]
End If
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

PRINT Sort and Starts

Parent Folder: [PRINT Sort and Starts]
Next Script: [showRelevantDates]
Script Name	showNecessaryRecords
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
EXPORT Calendar Set
PRINT Calendar Set
Script Definition
Script Steps	
Enter Browse Mode
Show All Records
Perform Script [ “showRelevantDates” ]
Set Variable [ $FirstVisible; Value:GetAsDate ( SETUP::Calendar START ) - 1 ]
Show All Records
Enter Find Mode [ ]
Set Field [ Prodution WORKDAYS::DATE; ">" & $FirstVisible ]
Perform Find [ ]
Sort Records [ Keep records in sorted order; Specified Sort Order: Prodution WORKDAYS::DATE; ascending ] [ Restore; No dialog ]
Fields used in this script	
SETUP::Calendar START
Prodution WORKDAYS::DATE
Scripts used in this script	
showRelevantDates
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [showNecessaryRecords]
Parent Folder: [PRINT Sort and Starts]
Next Script: [end PRINT]
Script Name	showRelevantDates
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
showNecessaryRecords
Script Definition
Script Steps	
Show All Records
Enter Find Mode [ ]
Set Variable [ $FirstVisible; Value:GetAsDate ( SETUP::Calendar START ) - 1 ]
Set Error Capture [ On ]
Set Field [ Prodution WORKDAYS::HideDateFromCalendar; 1 ]
Perform Find [ ]
If [ Get (LastError) = 401 ]
// Show Custom Dialog [ Title: "message"; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
End If
Set Error Capture [ Off ]
Show Omitted Only
Enter Find Mode [ ]
Set Field [ Prodution WORKDAYS::DATE; ">" & $FirstVisible ]
Constrain Found Set [ ]
// Perform Find [ ]
// Constrain Found Set [ Specified Find Requests: Find Records; Criteria: Prodution WORKDAYS::HideDateFromCalendar: “≠ 1” ] [ Restore ]
Sort Records [ Keep records in sorted order; Specified Sort Order: Prodution WORKDAYS::DATE; ascending ] [ Restore; No dialog ]
Fields used in this script	
SETUP::Calendar START
Prodution WORKDAYS::HideDateFromCalendar
Prodution WORKDAYS::DATE
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [showRelevantDates]
Parent Folder: [PRINT Sort and Starts]
Script Name	end PRINT
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Go to Layout [ original layout ]
Enter Browse Mode
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

EXPORTS

Parent Folder: [EXPORTS]
Next Script: [EXPORT Calendar Set]
Script Name	exportORprint
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Show Custom Dialog [ Title: "Print or Export?"; Default Button: “Export”, Commit: “Yes”; Button 2: “PRINT”, Commit: “No”; Button 3: “Cancel”, Commit: “No” ]
Set Variable [ $selection; Value:Get ( LastMessageChoice ) ]
If [ $selection = 3 ]
Show Custom Dialog [ Title: "Cancelled"; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
Exit Script [ ]
Else If [ $selection = 2 ]
Perform Script [ “PRINT Calendar Set” ]
Else
Perform Script [ “EXPORT Calendar Set” ]
End If
Fields used in this script	
Scripts used in this script	
PRINT Calendar Set
EXPORT Calendar Set
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [exportORprint]
Parent Folder: [EXPORTS]
Next Script: [PRINT Calendar Set]
Script Name	EXPORT Calendar Set
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
exportORprint
Script Definition
Script Steps	
Show Custom Dialog [ Title: "Long or Short Title?"; Default Button: “Long Name”, Commit: “Yes”; Button 2: “Short Name”, Commit: “No”; Button 3: “Cancel”, Commit: “No” ]
Set Variable [ $selection; Value:Get ( LastMessageChoice ) ]
If [ $selection = 3 ]
Show Custom Dialog [ Title: "Cancelled"; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
Exit Script [ ]
End If
Set Variable [ $FilePath; Value:Let ( [ ~date = Get ( CurrentDate ) ; ~yy = Year ( ~date ) ; ~mm = Right ( "0" & Month ( ~date ) ; 2 ) ; ~dd = Right ( "0" & Day ( ~date ) ; 2 ) ; ~longDateDisplay = ~yy & "-" & ~mm & "-" & ~dd ; ~shortDateDisplay = Right ( ~yy ; 2 ) & ~mm & ~dd ] ; SETUP_EXPORT::FilePathName & Case ( $selection = 2 ; SETUP::ProductionSHORTTitle & "_Calendar" & ~shortDateDisplay; $selection = 1 ; Substitute ( Substitute ( SETUP::ProductionTITLE ; " " ; "" ) ; "." ; "" ) & "_ProdCalendar" & ~shortDateDisplay ) ) ]
Set Variable [ $fileNAME; Value:$filePath & ".pdf" ]
#landscape 8.5x11
Go to Layout [ “11x17 expanded” (Prodution WORKDAYS) ]
Perform Script [ “showNecessaryRecords” ]
Perform Script [ “PRINT_SETUP 8.5x11 portraitORlandscape”; Parameter: 1 ]
Set Variable [ $fileNAME; Value:$FilePath & "_landscape.pdf" ]
Save Records as PDF [ File Name: “$FileNAME”; Automatically open; Create folders:Yes; Records being browsed ] [ Document - ] [ Pages - Number Pages From: 1; Include: All pages ] [ Security - Printing: High Resolution; Editing: Any except extracting pages; Enable copying; Enable Screen Reader ] [ Initial View - Show: Pages Panel and Page; Page Layout: Single Page; Magnification: 100% ] [ Restore; No dialog ]
Set Variable [ $fileNAME; Value:$filePath & ".pdf" ]
#PORTRAIT 8.5x11
Go to Layout [ “8.5x11” (Prodution WORKDAYS) ]
Perform Script [ “showNecessaryRecords” ]
Perform Script [ “PRINT_SETUP 8.5x11 portraitORlandscape”; Parameter: 0 ]
Save Records as PDF [ File Name: “$FileNAME”; Automatically open; Create folders:Yes; Records being browsed ] [ Document - ] [ Pages - Number Pages From: 1; Include: All pages ] [ Security - Printing: High Resolution; Editing: Any except extracting pages; Enable copying; Enable Screen Reader ] [ Initial View - Show: Pages Panel and Page; Page Layout: Single Page; Magnification: 100% ] [ Restore; No dialog ]
Set Variable [ $fileNAME; Value:$filePath & ".pdf" ]
#11x17 EXPANDED
Go to Layout [ “11x17 expanded” (Prodution WORKDAYS) ]
Perform Script [ “showNecessaryRecords” ]
Perform Script [ “PRINT_SETUP 11x17 portraitORlandscape”; Parameter: 0 ]
Set Variable [ $fileNAME; Value:$FilePath & "_11x17.pdf" ]
Save Records as PDF [ File Name: “$Filename”; Automatically open; Create folders:Yes; Records being browsed ] [ Document - ] [ Pages - Number Pages From: 1; Include: All pages ] [ Security - Printing: High Resolution; Editing: Any except extracting pages; Enable copying; Enable Screen Reader ] [ Initial View - Show: Pages Panel and Page; Page Layout: Single Page; Magnification: 100% ] [ Restore; No dialog ]
Set Variable [ $FileNAME; Value:$FilePath & ".pdf" ]
// #export 11x17 table display
// Go to Layout [ “11x17” (Prodution WORKDAYS) ]
// Perform Script [ “showNecessaryRecords” ]
// Perform Script [ “PRINT_SETUP 11x17 portraitORlandscape”; Parameter: 0 ]
// Set Variable [ $fileNAME; Value:$FilePath & "_table.pdf" ]
// Save Records as PDF [ File Name: “$Filename”; Automatically open; Create folders:Yes; Records being browsed ] [ Document - ] [ Pages - Number Pages From: 1; Include: All pages ] [ Security - Printing: High Resolution; Editing: Any except extracting pages; Enable copying; Enable Screen Reader ] [ Initial View - Show: Pages Panel and Page; Page Layout: Single Page; Magnification: 100% ] [ Restore; No dialog ]
// Set Variable [ $FileNAME; Value:$FilePath & ".pdf" ]
##export AGENDA
Go to Layout [ “Events AGENDA View” (ProductionCalendar Format) ]
Perform Script [ “Events Agenda View SORT” ]
Perform Script [ “PRINT_SETUP 8.5x11 portraitORlandscape”; Parameter: 0 ]
Set Variable [ $fileNAME; Value:$FilePath & "_Agenda.pdf" ]
Save Records as PDF [ File Name: “$Filename”; Automatically open; Create folders:Yes; Records being browsed ] [ Document - ] [ Pages - Number Pages From: 1; Include: All pages ] [ Security - Printing: High Resolution; Editing: Any except extracting pages; Enable copying; Enable Screen Reader ] [ Initial View - Show: Pages Panel and Page; Page Layout: Single Page; Magnification: 100% ] [ Restore; No dialog ]
Set Variable [ $FileNAME; Value:$FilePath & ".pdf" ]
Go to Layout [ original layout ]
Fields used in this script	
SETUP_EXPORT::FilePathName
SETUP::ProductionSHORTTitle
SETUP::ProductionTITLE
Scripts used in this script	
showNecessaryRecords
PRINT_SETUP 8.5x11 portraitORlandscape
PRINT_SETUP 11x17 portraitORlandscape
Events Agenda View SORT
Layouts used in this script	
11x17 expanded
8.5x11
11x17
Events AGENDA View
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [EXPORT Calendar Set]
Parent Folder: [EXPORTS]
Script Name	PRINT Calendar Set
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
exportORprint
Script Definition
Script Steps	
#landscape 8.5x11
Go to Layout [ “11x17 expanded” (Prodution WORKDAYS) ]
Perform Script [ “showNecessaryRecords” ]
Perform Script [ “PRINT_SETUP 8.5x11 portraitORlandscape”; Parameter: 1 ]
Print [ ]
#PORTRAIT 8.5x11
Go to Layout [ “8.5x11” (Prodution WORKDAYS) ]
Perform Script [ “showNecessaryRecords” ]
Perform Script [ “PRINT_SETUP 8.5x11 portraitORlandscape”; Parameter: 0 ]
Print [ ]
#11x17 EXPANDED
Go to Layout [ “11x17 expanded” (Prodution WORKDAYS) ]
Perform Script [ “showNecessaryRecords” ]
Perform Script [ “PRINT_SETUP 11x17 portraitORlandscape”; Parameter: 0 ]
Print [ ]
// #export 11x17 table display
// Go to Layout [ “11x17” (Prodution WORKDAYS) ]
// Perform Script [ “showNecessaryRecords” ]
// Perform Script [ “PRINT_SETUP 11x17 portraitORlandscape”; Parameter: 0 ]
// Print [ ]
##export AGENDA
Go to Layout [ “Events AGENDA View” (ProductionCalendar Format) ]
Perform Script [ “Events Agenda View SORT” ]
Perform Script [ “PRINT_SETUP 8.5x11 portraitORlandscape”; Parameter: 0 ]
Print [ ]
Go to Layout [ original layout ]
Fields used in this script	
Scripts used in this script	
showNecessaryRecords
PRINT_SETUP 8.5x11 portraitORlandscape
PRINT_SETUP 11x17 portraitORlandscape
Events Agenda View SORT
Layouts used in this script	
11x17 expanded
8.5x11
11x17
Events AGENDA View
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

CLEANUP Functions

Layout Triggers

Parent Folder: [Layout Triggers]
Next Script: [-]
Script Name	Events Agenda View SORT
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
EXPORT Calendar Set
PRINT Calendar Set
Script Definition
Script Steps	
Enter Browse Mode
Go to Layout [ “Events AGENDA View” (ProductionCalendar Format) ]
Show All Records
Enter Find Mode [ ]
Set Field [ ProductionCalendar Format::Event Name; "==Rehearsal" ]
Perform Find [ ]
Show Omitted Only
Sort Records [ Keep records in sorted order; Specified Sort Order: ProductionCalendar Format::WORKDAY_ID; ascending ProductionCalendar Format::autoGenerated; descending ProductionCalendar Format::CreationTimestamp; ascending ] [ Restore; No dialog ]
Fields used in this script	
ProductionCalendar Format::Event Name
ProductionCalendar Format::WORKDAY_ID
ProductionCalendar Format::autoGenerated
ProductionCalendar Format::CreationTimestamp