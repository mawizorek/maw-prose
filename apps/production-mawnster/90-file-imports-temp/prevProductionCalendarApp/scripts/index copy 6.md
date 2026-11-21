
#generate new sample data from schema
Insert Text [ $schema ] [ Select ]
Set Variable [ $schema; Value:JSONGetElement($schema; "" ) // removes whitespace ]
Insert Text [ $options ] [ Select ]
Set Variable [ $options; Value:Substitute($options; "_DATA_" ; Quote($schema)) ]
Insert from URL [ $data; "https://fakermaker.geist.ws/api/generate"; cURL options: $options ] [ Select; No dialog ]
If [ Get(LastError) ]
Show Custom Dialog [ Title: "Data Generation Failed"; Message: "Couldn't generator fake data."; Default Button: “OK”, Commit: “Yes” ]
Exit Script [ ]
End If
// Set Variable [ $path; Value:"/Users/toddgeist/Desktop/fmw_calendar.xml.json" ]
// If [ IsEmpty ( $path ) ]
// Exit Script [ ]
// End If
//
// If [ Get ( SystemPlatform )=-2 ]
// Set Variable [ $Format; Value:WinPath ]
// Else
// Set Variable [ $Format; Value:PosixPath ]
// End If
// Set Variable [ $path; Value:ConvertToFileMakerPath ( $path ; $Format ) ]
// Open Data File [ “$path” ; Target: $fileId ]
// Read from Data File [ File ID: $fileId ; Amount (bytes): ; Target: $data ; Read as: UTF-8 ]
// Close Data File [ File ID: $fileId ]
Set Variable [ $Tables; Value:JSONListKeys($data; "") ]
Set Variable [ $t; Value:1 ]
Loop
Set Variable [ $TableName; Value:GetValue ( $tables; $t ) ]
Exit Loop If [ IsEmpty ( $TableName ) ]
Set Variable [ $TableDataList; Value:JSONListValues ( $Data ; $TableName ) ]
If [ ValueCount ( $TableDataList ) > 0 ]
Go to Layout [ $TableName & "Import" ]
Set Variable [ $Error; Value:Get(LastError) ]
If [ $error ]
Show Custom Dialog [ Title: "Developer Error: " & $error; Message: "The table " & $TableName & " can't be imported"; Default Button: “OK”, Commit: “Yes” ]
Exit Loop If [ 1 ]
End If
Show All Records
Delete All Records [ No dialog ]
Set Variable [ $r; Value:1 ]
// Set Variable [ $FieldList; Value:JSONListKeys ( $Data ; $TableName & "[0]" ) ]
Loop
Set Variable [ $RecordData; Value:GetValue($TableDataList; $r ) ]
Exit Loop If [ IsEmpty ( $RecordData ) ]
New Record/Request
Set Variable [ $f; Value:1 ]
Loop
Set Variable [ $FieldName; Value:GetValue($FieldList; $f ) ]
Exit Loop If [ IsEmpty ( $FieldName ) ]
Set Variable [ $FieldValue; Value:JSONGetElement($RecordData ; $FieldName) ]
Set Variable [ $FullFieldName; Value:Get(LayoutTableName) & "::" & $FieldName ]
If [ Left($FieldValue; 6 ) = "fmexp:" ]
Set Variable [ $exp; Value:Middle($FieldValue; 7; 10000000) ]
Set Variable [ $FieldValue; Value:Evaluate ( $exp ) ]
End If
Set Field By Name [ $FullFieldName; $FieldValue ]
Set Variable [ $f; Value:$f + 1 ]
End Loop
Set Variable [ ]
Set Variable [ $r; Value:$r + 1 ]
End Loop
End If
Set Variable [ $t; Value:$t + 1 ]
End Loop
Go to Layout [ original layout ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [FCCalendar Import Sample Data]
Parent Folder: [FCCalendar Addon Developer Only]
Script Name	FCCalendarUpdateCalendarHTML
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
#/##
# This script is only used when developing the Addon
# It is never used by the users of an application using this addon
# #uploads the html code into the right location
##/
Set Variable [ $path; Value:Get(ScriptParameter) ]
If [ IsEmpty ( $path ) ]
Exit Script [ ]
End If
If [ Get ( SystemPlatform )=-2 ]
Set Variable [ $Format; Value:WinPath ]
Else
Set Variable [ $Format; Value:PosixPath ]
End If
Show Custom Dialog [ Title: "Uploading Inlined HTML"; Message: "You are about to upload a new verison of the inlined HTML to this Addon. Do you want to continue?"; Default Button: “Cancel”, Commit: “Yes”; Button 2: “Yes”, Commit: “No” ]
If [ Get(LastMessageChoice) <> 2 ]
Exit Script [ ]
End If
Set Variable [ $path; Value:ConvertToFileMakerPath ( $path ; $Format ) ]
Go to Layout [ “FCCalendar Config” (FCCalendarAddon) ]
Open Data File [ “$path” ; Target: $fileId ]
Read from Data File [ File ID: $fileId ; Amount (bytes): ; Target: FCCalendarAddon::HTML ; Read as: UTF-8 ]
Close Data File [ File ID: $fileId ]
Commit Records/Requests
Go to Layout [ original layout ]
Perform Script [ “FCCalendar Clear Dev Flag” ]
Show Custom Dialog [ Title: "New version uploaded"; Message: "The new version was uploaded and store in the Addon", Default Button: "OK", Commit: “Yes” ]
Fields used in this script	
FCCalendarAddon::HTML
Scripts used in this script	
FCCalendar Clear Dev Flag
Layouts used in this script	
FCCalendar Config
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

COLOR TEXT

Parent Folder: [COLOR TEXT]
Next Script: [color_Text]
Script Name	TextColorHex
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $~parameter; Value:Get(ScriptParameter) ]
Set Variable [ $~parameter ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [TextColorHex]
Parent Folder: [COLOR TEXT]
Script Name	color_Text
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $~parameter; Value:Get(ScriptParameter) ]
Set Variable [ $~parameter; Value:TextColor ( $~parameter ; RGB ( 255 ; 0 ; 0 ) ) ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

stored production INFO

Parent Folder: [stored production INFO]
Next Script: [Big Love INFO]
Script Name	Secretary INFO
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
#PRODUCTION INFO - ON SETUP
Go to Layout [ “SETUP” (SETUP) ]
Go to Record/Request/Page [ First ]
Set Field [ SETUP::ProductionTITLE; "The Secretary" ]
Set Field [ SETUP::ProductionSHORTTitle; "TS" ]
Set Field [ SETUP::FIRST REHEARSAL; "1/19/2027" ]
Set Field [ SETUP::LAST DATE Needed; "3/16/2027" ]
Set Field [ SETUP::ADDpreProWeek; 1 ]
Set Field [ SETUP::Director; "Kareem Fahmy" ]
Set Field [ SETUP::Semester; "Spring 2027" ]
Set Field [ SETUP::Course Numbers; "THTR Secretary course" ]
#EXPORT SETUP
Set Field [ SETUP_EXPORT::HIDE_Start; "3/7/27" ]
Set Field [ SETUP_EXPORT::HIDE_End; "3/13/27" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_Start; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_Start; "3/7/2027" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_End; "3/16/2027" ]
Go to Layout [ original layout ]
Perform Script [ “CREATE PRODUCTION WORKDAYS” ]
Fields used in this script	
SETUP::ProductionTITLE
SETUP::ProductionSHORTTitle
SETUP::FIRST REHEARSAL
SETUP::LAST DATE Needed
SETUP::ADDpreProWeek
SETUP::Director
SETUP::Semester
SETUP::Course Numbers
SETUP_EXPORT::HIDE_Start
SETUP_EXPORT::HIDE_End
SETUP_EXPORT::HIGHLIGHT_Start
SETUP_EXPORT::HIGHLIGHT_End
SETUP_EXPORT::LOWLIGHT_Start
SETUP_EXPORT::LOWLIGHT_End
Scripts used in this script	
CREATE PRODUCTION WORKDAYS
Layouts used in this script	
SETUP
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [Secretary INFO]
Parent Folder: [stored production INFO]
Next Script: [TIME Reading INFO]
Script Name	Big Love INFO
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Go to Layout [ “SETUP” (SETUP) ]
Go to Record/Request/Page [ First ]
Set Field [ SETUP::ProductionTITLE; "Big Love" ]
Set Field [ SETUP::ProductionSHORTTitle; "BL" ]
Set Field [ SETUP::FIRST REHEARSAL; "8/28/2026" ]
Set Field [ SETUP::LAST DATE Needed; "10/20/2026" ]
Set Field [ SETUP::ADDpreProWeek; 0 ]
Set Field [ SETUP::Director; "Kevaughn Harvey" ]
Set Field [ SETUP::Semester; "Fall 2026" ]
Set Field [ SETUP::Course Numbers; "THTR Big Love course" ]
Set Field [ SETUP_EXPORT::HIDE_Start; "" ]
Set Field [ SETUP_EXPORT::HIDE_End; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_Start; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_Start; "" ]
Go to Layout [ original layout ]
Perform Script [ “CREATE PRODUCTION WORKDAYS” ]
Fields used in this script	
SETUP::ProductionTITLE
SETUP::ProductionSHORTTitle
SETUP::FIRST REHEARSAL
SETUP::LAST DATE Needed
SETUP::ADDpreProWeek
SETUP::Director
SETUP::Semester
SETUP::Course Numbers
SETUP_EXPORT::HIDE_Start
SETUP_EXPORT::HIDE_End
SETUP_EXPORT::HIGHLIGHT_Start
SETUP_EXPORT::HIGHLIGHT_End
SETUP_EXPORT::LOWLIGHT_End
SETUP_EXPORT::LOWLIGHT_Start
Scripts used in this script	
CREATE PRODUCTION WORKDAYS
Layouts used in this script	
SETUP
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [Big Love INFO]
Parent Folder: [stored production INFO]
Next Script: [TIME INFO]
Script Name	TIME Reading INFO
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Go to Layout [ “SETUP” (SETUP) ]
Go to Record/Request/Page [ First ]
Set Field [ SETUP::ProductionTITLE; "T.I.M.E. (Devised)" ]
Set Field [ SETUP::ProductionSHORTTitle; "TIME" ]
Set Field [ SETUP::FIRST REHEARSAL; "10/20/2026" ]
Set Field [ SETUP::LAST DATE Needed; "12/19/2026" ]
Set Field [ SETUP::ADDpreProWeek; 0 ]
Set Field [ SETUP::Director; "Nigel Maister" ]
Set Field [ SETUP::Semester; "Fall 2026" ]
Set Field [ SETUP::Course Numbers; "THTR TIME.read course" ]
Set Field [ SETUP_EXPORT::HIDE_Start; "" ]
Set Field [ SETUP_EXPORT::HIDE_End; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_Start; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_Start; "" ]
Go to Layout [ original layout ]
Perform Script [ “CREATE PRODUCTION WORKDAYS” ]
Fields used in this script	
SETUP::ProductionTITLE
SETUP::ProductionSHORTTitle
SETUP::FIRST REHEARSAL
SETUP::LAST DATE Needed
SETUP::ADDpreProWeek
SETUP::Director
SETUP::Semester
SETUP::Course Numbers
SETUP_EXPORT::HIDE_Start
SETUP_EXPORT::HIDE_End
SETUP_EXPORT::HIGHLIGHT_Start
SETUP_EXPORT::HIGHLIGHT_End
SETUP_EXPORT::LOWLIGHT_End
SETUP_EXPORT::LOWLIGHT_Start
Scripts used in this script	
CREATE PRODUCTION WORKDAYS
Layouts used in this script	
SETUP
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [TIME Reading INFO]
Parent Folder: [stored production INFO]
Next Script: [KAYFABE Info]
Script Name	TIME INFO
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Go to Layout [ “SETUP” (SETUP) ]
Go to Record/Request/Page [ First ]
Set Field [ SETUP::ProductionTITLE; "T.I.M.E." ]
Set Field [ SETUP::ProductionSHORTTitle; "TIME" ]
Set Field [ SETUP::FIRST REHEARSAL; "3/16/2027" ]
Set Field [ SETUP::LAST DATE Needed; "5/3/27" ]
Set Field [ SETUP::ADDpreProWeek; 1 ]
Set Field [ SETUP::Director; "Nigel Maister" ]
Set Field [ SETUP::Semester; "Spring 2027" ]
Set Field [ SETUP::Course Numbers; "THTR TIME course" ]
Set Field [ SETUP_EXPORT::HIDE_Start; "" ]
Set Field [ SETUP_EXPORT::HIDE_End; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_Start; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_Start; "" ]
Go to Layout [ original layout ]
Perform Script [ “CREATE PRODUCTION WORKDAYS” ]
Fields used in this script	
SETUP::ProductionTITLE
SETUP::ProductionSHORTTitle
SETUP::FIRST REHEARSAL
SETUP::LAST DATE Needed
SETUP::ADDpreProWeek
SETUP::Director
SETUP::Semester
SETUP::Course Numbers
SETUP_EXPORT::HIDE_Start
SETUP_EXPORT::HIDE_End
SETUP_EXPORT::HIGHLIGHT_Start
SETUP_EXPORT::HIGHLIGHT_End
SETUP_EXPORT::LOWLIGHT_End
SETUP_EXPORT::LOWLIGHT_Start
Scripts used in this script	
CREATE PRODUCTION WORKDAYS
Layouts used in this script	
SETUP
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [TIME INFO]
Parent Folder: [stored production INFO]
Next Script: [One Acts INFO]
Script Name	KAYFABE Info
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Go to Layout [ “SETUP” (SETUP) ]
Go to Record/Request/Page [ First ]
Set Field [ SETUP::ProductionTITLE; "KAYFABE" ]
Set Field [ SETUP::ProductionSHORTTitle; "KF" ]
Set Field [ SETUP::FIRST REHEARSAL; "10/14/2026" ]
// Set Field [ SETUP::FIRST REHEARSAL; "10/19/2026" ]
Set Field [ SETUP::LAST DATE Needed; "11/2/26" ]
Set Field [ SETUP::ADDpreProWeek; 0 ]
Set Field [ SETUP::Director; "Josh Rice" ]
Set Field [ SETUP::Semester; "Fall 2026" ]
Set Field [ SETUP::Course Numbers; "n/a" ]
Set Field [ SETUP_EXPORT::HIDE_Start; "" ]
Set Field [ SETUP_EXPORT::HIDE_End; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_Start; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_Start; "" ]
Go to Layout [ original layout ]
Perform Script [ “CREATE PRODUCTION WORKDAYS” ]
Fields used in this script	
SETUP::ProductionTITLE
SETUP::ProductionSHORTTitle
SETUP::FIRST REHEARSAL
SETUP::LAST DATE Needed
SETUP::ADDpreProWeek
SETUP::Director
SETUP::Semester
SETUP::Course Numbers
SETUP_EXPORT::HIDE_Start
SETUP_EXPORT::HIDE_End
SETUP_EXPORT::HIGHLIGHT_Start
SETUP_EXPORT::HIGHLIGHT_End
SETUP_EXPORT::LOWLIGHT_End
SETUP_EXPORT::LOWLIGHT_Start
Scripts used in this script	
CREATE PRODUCTION WORKDAYS
Layouts used in this script	
SETUP
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [KAYFABE Info]
Parent Folder: [stored production INFO]
Script Name	One Acts INFO
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Go to Layout [ “SETUP” (SETUP) ]
Go to Record/Request/Page [ First ]
Set Field [ SETUP::ProductionTITLE; "One Acts Fall 2026" ]
Set Field [ SETUP::ProductionSHORTTitle; "OA" ]
Set Field [ SETUP::FIRST REHEARSAL; "10/16/26" ]
Set Field [ SETUP::LAST DATE Needed; "12/12/26" ]
Set Field [ SETUP::ADDpreProWeek; 0 ]
Set Field [ SETUP::Director; "SP, CM" ]
Set Field [ SETUP::Semester; "Fall 2026" ]
Set Field [ SETUP::Course Numbers; "THTR TIME course" ]
Set Field [ SETUP_EXPORT::HIDE_Start; "" ]
Set Field [ SETUP_EXPORT::HIDE_End; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_Start; "" ]
Set Field [ SETUP_EXPORT::HIGHLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_End; "" ]
Set Field [ SETUP_EXPORT::LOWLIGHT_Start; "" ]
Go to Layout [ original layout ]
Perform Script [ “CREATE PRODUCTION WORKDAYS” ]
Fields used in this script	
SETUP::ProductionTITLE
SETUP::ProductionSHORTTitle
SETUP::FIRST REHEARSAL
SETUP::LAST DATE Needed
SETUP::ADDpreProWeek
SETUP::Director
SETUP::Semester
SETUP::Course Numbers
SETUP_EXPORT::HIDE_Start
SETUP_EXPORT::HIDE_End
SETUP_EXPORT::HIGHLIGHT_Start
SETUP_EXPORT::HIGHLIGHT_End
SETUP_EXPORT::LOWLIGHT_End
SETUP_EXPORT::LOWLIGHT_Start
Scripts used in this script	
CREATE PRODUCTION WORKDAYS
Layouts used in this script	
SETUP
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

