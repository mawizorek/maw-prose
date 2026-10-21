
Set Variable [ $config; Value:JSONSetElement ( $Config ; "DefaultEventStyle.options" ; $EventStyleOptions;JSONArray ) ]
Set Variable [ $config; Value:JSONSetElement ( $Config ; "EventStyleField.options" ; $TextFieldsArray ;JSONArray ) ]
Set Variable [ $config; Value:JSONSetElement ( $Config ; "StartOnDay.options" ; $dayArray ;JSONArray ) ]
Set Variable [ $config; Value:JSONSetElement ( $Config ; "EventFilterField.options" ; $AllFieldsOnSelectedLayoutArray ;JSONArray ) ]
Set Variable [ $config; Value:JSONSetElement ( $Config ; "EventFilterQueryField.options" ; $FieldsOnThisLayoutArray ;JSONArray ) ]
If [ not IsEmpty ( $Callback ) ]
Set Variable [ $result; Value:$config ]
Perform JavaScript in Web Viewer [ Object Name: $WidgetWebViewer; Function Name: $Callback; Parameter 1: $result; Parameter 2: $fetchId ]
End If
Exit Script [ Result: $Config ]
Fields used in this script	
FCCalendarAddon::OriginalLayout
FCCalendarAddon::OriginalTable
Scripts used in this script	
FCCalendar Get WebViewer Object Name
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [FCCalendarSchema]
Parent Folder: [FCCalendar Event Handlers - Respond To Addon Events]
Next Script: [FCCalendarSaveConfig]
Script Name	FCCalendarFind
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
#/##
# performs Find Requests For the FCCalendar
# !!!!!! DO NOT CHANGE THE NAME OF THIS SCRIPT !!!!!!
# @param {object} json the payload coming from the widget
# @param {string} json.Data the data that got sent
# @param {string} json.Meta.Callback the callback function to call back to the widget
# @param {string} json.Meta.FetchId a string that uniquely identifies this specific call
# @param {object} json.Meta.Config the Config object passed into the widget on boot
# @param {object} json.Meta.AddonUUID the unique ID for this Addon Instance
##/
Allow User Abort
Set Error Capture
Perform Script [ “FCSetDefaultDayOfWeek” ]
Set Variable [ $json; Value:Get ( ScriptParameter ) ]
Set Variable [ $data; Value:JSONGetElement ( $json ; "Data" ) ]
Set Variable [ $Callback; Value:JSONGetElement ( $json ; "Meta.Callback" ) ]
Set Variable [ $FetchID; Value:JSONGetElement ( $json ; "Meta.FetchId" ) ]
Set Variable [ $AddonUUID; Value:JSONGetElement ( $json ; "Meta.AddonUUID" ) ]
Set Variable [ $Config; Value:JSONGetElement ( $json ; "Meta.Config" ) ]
Perform Script [ “FCCalendar Get WebViewer Object Name”; Parameter: $AddonUUID ]
Set Variable [ $WidgetWebViewer; Value:Get ( ScriptResult ) ]
Set Variable [ $SearchField; Value:JSONGetElement($Config; "EventFilterField.value") ]
If [ not IsEmpty ( $SearchField ) ]
Set Variable [ $QueryField; Value:JSONGetElement($Config; "EventFilterQueryField.value") ]
Set Variable [ $SearchFieldSplit; Value:Substitute($SearchField; "::" ; "¶") ]
Set Variable [ $SearchField; Value:GetValue($SearchFieldSplit; 2) ]
Set Variable [ $QueryValue; Value:GetField($QueryField) ]
Set Variable [ $data; Value:JSONSetElement($data; "query[0]." & $SearchField; $QueryValue; JSONString) ]
End If
If [ not IsEmpty ( $data ) ]
Execute FileMaker Data API [ $result; $data ] [ Select ]
Else
Set Variable [ $result; Value:JSONSetElement(""; ["messages[0].code"; -2 ; JSONNumber]; ["messages[0].message"; "invalid find" ; JSONString] ) ]
End If
Set Variable [ $code; Value:JSONGetElement ( $result ; "messages[0].code" ) ]
Set Variable [ $message; Value:JSONGetElement ( $result ; "messages[0].message" ) ]
If [ not IsEmpty ( $Callback ) ]
Perform JavaScript in Web Viewer [ Object Name: $WidgetWebViewer; Function Name: $Callback; Parameter 1: $result; Parameter 2: $fetchId ]
End If
Fields used in this script	
Scripts used in this script	
FCSetDefaultDayOfWeek
FCCalendar Get WebViewer Object Name
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [FCCalendarFind]
Parent Folder: [FCCalendar Event Handlers - Respond To Addon Events]
Script Name	FCCalendarSaveConfig
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
#/##
# Stores the configuration
# !!!!!! DO NOT CHANGE THE NAME OF THIS SCRIPT !!!!!!
# @param {object} json the payload coming from the widget
# @param {string} json.data the data that got sent
# @param {string} json.meta.Callback the callback function to call back to the widget
# @param {string} json.meta.FetchId a string that uniquely identifies this specific call
##/
Allow User Abort
Set Error Capture
#change to match the path of your selected layout
Set Variable [ $SelectedLayoutPath; Value:"EventDetailLayout.value" ]
Set Variable [ $json; Value:Get ( ScriptParameter ) ]
Set Variable [ $NewConfig; Value:JSONGetElement ( $json ; "Data" ) ]
Set Variable [ $meta; Value:JSONGetElement ( $json ; "Meta" ) ]
Set Variable [ $FetchID; Value:JSONGetElement ( $meta ; "FetchId" ) ]
Set Variable [ $Callback; Value:JSONGetElement ( $meta ; "Callback" ) ]
Set Variable [ $AddonUUID; Value:JSONGetElement ( $Meta ; "AddonUUID" ) ]
Set Variable [ $OldConfig; Value:JSONGetElement ( $meta ; "Config" ) ]
#passing empty "", gives us the name of the Configurator webviewer
Perform Script [ “FCCalendar Get WebViewer Object Name”; Parameter: "" ]
Set Variable [ $WidgetWebViewer; Value:Get ( ScriptResult ) ]
Set Variable [ $EventType; Value:JSONGetElement($Meta;"EventType") ]
If [ $EventType <> "cancel" ]
Perform Script [ “FCCalendar Get WebViewer Object Name”; Parameter: $AddonUUID ]
Set Variable [ $WidgetWebViewer; Value:Get ( ScriptResult ) ]
If [ $AddonUUID="[<^FMXML_AddonInstanceUUID>]" ]
Set Variable [ $AddonUUID; Value:"DEV_UUID" ]
End If
Set Variable [ $ConfigStore; Value:FCCalendarAddon::ConfigStore ]
Set Variable [ $ConfigStore; Value:JSONSetElement ( $ConfigStore; $AddonUUID ; $newConfig; JSONObject ) ]
#if there is a problem do not destroy other configs
If [ Left($ConfigStore ;3 ) <> "? *" ]
Set Field [ FCCalendarAddon::ConfigStore; $ConfigStore ]
End If
If [ not IsEmpty ( $Callback ) ]
Perform JavaScript in Web Viewer [ Object Name: $WidgetWebViewer; Function Name: $Callback; Parameter 1: $result; Parameter 2: $fetchId ]
End If
End If
#We navigate to an emmpty web page here to clear the WebViewer cache, then we pause, then we close the window.
Set Web Viewer [ Object Name: $WidgetWebViewer; URL: "data:text/html, <html></html>" ]
Pause/Resume Script [ Duration (seconds): ".1" ]
Close Window [ Current Window ]
Fields used in this script	
FCCalendarAddon::ConfigStore
Scripts used in this script	
FCCalendar Get WebViewer Object Name
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

FCCalendar API - Send Messages To Addon

Parent Folder: [FCCalendar API - Send Messages To Addon]
Next Script: [FCCalendar Navigation]
Script Name	FCCalendar Add Event
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
FCCalendar Add Event Button
FCCalendarEvents
Script Definition
Script Steps	
#/##
# Open a Card window on the Event Display Layout and create new record
# @param {object} json
# @param {string} json.AddonUUID the unique id of this instance of the addon
# @param {object} json.Data the object that contains the data to make the new event
# #/
Allow User Abort
Set Error Capture
Set Variable [ $json; Value:Get ( ScriptParameter ) ]
Set Variable [ $AddonUUID; Value:JSONGetElement($json; "AddonUUID") ]
Set Variable [ $Data; Value:JSONGetElement($json; "Data") ]
Set Variable [ $Config; Value:FCCalendarConfig ( $AddonUUID ) ]
Set Variable [ $StartDateField; Value:JSONGetElement ( $Config; "EventStartDateField.value" ) ]
Set Variable [ $EndDateField; Value:JSONGetElement ( $Config; "EventEndDateField.value" ) ]
Set Variable [ $StartTimeField; Value:JSONGetElement ( $Config; "EventStartTimeField.value" ) ]
Set Variable [ $EndTimeField; Value:JSONGetElement ( $Config; "EventEndTimeField.value" ) ]
Set Variable [ $AllDayField; Value:JSONGetElement ( $Config; "EventAllDayField.value" ) ]
Set Variable [ $eventDisplayLayout; Value:JSONGetElement ( $Config; "EventDetailLayout.value" ) ]
Set Variable [ $StartDateStr; Value:JSONGetElement($Data; "StartDateStr") ]
Set Variable [ $StartTimeStr; Value:JSONGetElement($Data; "StartTimeStr") ]
Set Variable [ $EndDateStr; Value:JSONGetElement($Data; "EndDateStr") ]
Set Variable [ $EndTimeStr; Value:JSONGetElement($Data; "EndTimeStr") ]
Set Variable [ $AllDay; Value:JSONGetElement($Data; "AllDay") ]
Refresh Object [ Object Name: "FCalendarAddEvent"; Repetition: 1 ]
#NOTE - we store the AddonUUID in the WindowName so the window can pick it up when it closes
New Window [ Style: Card; Name: $AddonUUID; Using layout: $eventDisplayLayout; Close: Yes; Minimize: No; Maximize: No; Resize: No; Menu Bar: No; Dim parent window: No; Toolbars: No ]
New Record/Request
Set Field By Name [ $StartDateField; $StartDateStr ]
Set Field By Name [ $EndDateField; $EndDateStr ]
Set Field By Name [ $StartTimeField; $StartTimeStr ]
Set Field By Name [ $EndTimeField; $EndTimeStr ]
Set Field By Name [ $EndTimeField; $EndTimeStr ]
Set Field By Name [ $AllDay; $AllDay ]
#the user can now fill out the rest.
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
FCCalendarConfig
Custom menu set used by this script	

Previous Script: [FCCalendar Add Event]
Parent Folder: [FCCalendar API - Send Messages To Addon]
Next Script: [FCCalendar View Change ]
Script Name	FCCalendar Navigation
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
FCCalendar Navigation Button
Script Definition
Script Steps	
#/##
# uses Perform JavaScript On WebViewer to Advance the Calendar Date
# @param {object} json
# @param {string} json.direction the direction to navigate. one of "prev", "next", "today"
# @param {string} json.AddonUUID the unique id of this instance of the addon
# #/
Allow User Abort
Set Error Capture
Set Variable [ $json; Value:Get ( ScriptParameter ) ]
Set Variable [ $nav; Value:JSONGetElement($json; "direction") ]
Set Variable [ $AddonUUID; Value:JSONGetElement($json; "AddonUUID") ]
#the name of the web viewer widget
Perform Script [ “FCCalendar Get WebViewer Object Name”; Parameter: $AddonUUID ]
Set Variable [ $WebViewerName; Value:Get ( ScriptResult ) ]
If [ $nav = "next" ]
Set Variable [ $functionName; Value:"Calendar_Next" ]
Else If [ $nav = "prev" ]
Set Variable [ $functionName; Value:"Calendar_Prev" ]
Else If [ $nav = "today" ]
Set Variable [ $functionName; Value:"Calendar_Today" ]
End If
Perform JavaScript in Web Viewer [ Object Name: $WebViewerName; Function Name: $functionName ]
# resets the button bar state
Refresh Object [ Object Name: "FCCalendarToday"; Repetition: 1 ]
Refresh Object [ Object Name: "FCalendarAddEvent"; Repetition: 1 ]
Refresh Object [ Object Name: "FCCalendarNav"; Repetition: 1 ]
Fields used in this script	
Scripts used in this script	
FCCalendar Get WebViewer Object Name
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [FCCalendar Navigation]
Parent Folder: [FCCalendar API - Send Messages To Addon]
Next Script: [FCCalendar Refresh]
Script Name	FCCalendar View Change
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
FCCalendar Set View Button
Script Definition
Script Steps	
#/##
# uses Perform JavaScript On WebViewer to change the Calendar View
# @param {object} json
# @param {string} json.view the calendar view to display. one of "dayGridView", "timeGridWeek", "timeGridMonth"
# @param {string} json.AddonUUID the unique id of this instance of the addon
# #/
Allow User Abort
Set Error Capture
Set Variable [ $json; Value:Get ( ScriptParameter ) ]
Set Variable [ $view; Value:JSONGetElement($json; "view") ]
Set Variable [ $AddonUUID; Value:JSONGetElement($json; "AddonUUID") ]
#the name of the web viewer widget
Perform Script [ “FCCalendar Get WebViewer Object Name”; Parameter: $AddonUUID ]
Set Variable [ $WebViewerName; Value:Get ( ScriptResult ) ]
#Call the JavaScript Function in the Calendar
Perform JavaScript in Web Viewer [ Object Name: $WebViewerName; Function Name: "Calendar_SetView"; Parameter 1: $view ]
Fields used in this script	
Scripts used in this script	
FCCalendar Get WebViewer Object Name
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [FCCalendar View Change ]
Parent Folder: [FCCalendar API - Send Messages To Addon]
Script Name	FCCalendar Refresh
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
FCCalendar Close Event Card Window Button
FCCalendar Delete Event Button
FCCalendarEvents
Script Definition
Script Steps	
#/##
# tell the calendar to refresh its data
# #/
Set Variable [ $AddonUUID; Value:Get ( ScriptParameter ) ]
#the name of the web viewer widget
Perform Script [ “FCCalendar Get WebViewer Object Name”; Parameter: $AddonUUID ]
Set Variable [ $WebViewerName; Value:Get ( ScriptResult ) ]
Set Variable [ $function; Value:"Calendar_Refresh" ]
Perform JavaScript in Web Viewer [ Object Name: $webViewerName; Function Name: $function ]
Fields used in this script	
Scripts used in this script	
FCCalendar Get WebViewer Object Name
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

FCCalendar Private

Parent Folder: [FCCalendar Private ]
Script Name	FCCalendar Get WebViewer Object Name
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
FCCalendar Button Show Config
FCCalendarEvents
FCCalendarSchema
FCCalendarFind
FCCalendarSaveConfig
FCCalendar Navigation
FCCalendar View Change
FCCalendar Refresh
FCCalendar Load Calendar
Script Definition
Script Steps	
#/##
# This script's job is to calculate the WebViewer Name that is used to target the JavaScript calls
# @param {text} AddonUUID the unqiue Id of the webviewer to target
##/
Set Variable [ $AddonUUID; Value:Get ( ScriptParameter ) ]
Set Variable [ $Prefix; Value:"FCCalendarWV_" ]
If [ IsEmpty ( $AddonUUID ) ]
#if no AddonUUID is passed in, this will find all the Calendar WebViewers on the layout
Set Variable [ $CalendarWebViewers; Value:While ( [ prefix = $Prefx; l = Length(prefix); objects = LayoutObjectNames ( Get(FileName) ; Get(LayoutName) ); n = 1; thisObject = GetValue(objects;1); result = "" ]; not IsEmpty ( thisObject ); [ thisObjectsType = GetLayoutObjectAttribute ( thisObject ; "objectType" ); isWebViewer = thisObjectsType = "web viewer"; matchesPrefix = Left(thisObject; l) = prefix; result = If( (isWebViewer and matchesPrefix) ; List(result; thisObject; );result ); n = n+1; thisObject = GetValue(objects;n) ]; result ) ]
Set Variable [ $FirstWebViewer; Value:GetValue($CalendarWebViewers; 1) ]
Exit Script [ Result: $FirstWebViewer ]
End If
Exit Script [ Result: $Prefix& Get ( ScriptParameter ) ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

FCCalendar Addon Developer Only

Parent Folder: [FCCalendar Addon Developer Only]
Next Script: [FCCalendar Load Calendar]
Script Name	FCCalendar Clear Dev Flag
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
FCCalendarUpdateCalendarHTML
Script Definition
Script Steps	
#/##
# This script is only used when developing the Addon
# It is never used by the users of an application using this addon
##/
Set Variable [ $$FCCalendar_DEV_URL; Value:"" ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [FCCalendar Clear Dev Flag]
Parent Folder: [FCCalendar Addon Developer Only]
Next Script: [FCSetDefaultDayOfWeek]
Script Name	FCCalendar Load Calendar
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
# this the script will load the Calendar in Dev Mode
##/
Set Variable [ $json; Value:Get(ScriptParameter) ]
Set Variable [ $AddonUUID; Value:JSONGetElement($json; "AddonUUID" ) ]
Set Variable [ $ShowConfig; Value:JSONGetElement($json; "ShowConfig" ) ]
If [ IsEmpty ( $AddonUUID ) ]
Set Variable [ $AddonUUID; Value:"[<^FMXML_AddonInstanceUUID>]" ]
End If
#Put the url to your development server.
Set Variable [ $dev_url; Value:"http://localhost:3000" ]
#the name of the web viewer widget
Perform Script [ “FCCalendar Get WebViewer Object Name”; Parameter: $AddonUUID ]
Set Variable [ $WebViewerName; Value:Get ( ScriptResult ) ]
If [ $ShowConfig ]
Set Variable [ $WebViewerName; Value:"FCCalendarWV_Configurator" ]
End If
#RESET WEBVIEWER
#Going to a URL like this, is the best way to destroy any lingering Content that might be cached in the WebViewer
Set Web Viewer [ Object Name: $WebViewerName; URL: "data:text/html,<html></html>" ]
Set Variable [ $config; Value:FCCalendarConfig ( $AddonUUID ) ]
Set Variable [ $initialProps; Value:JSONSetElement (""; ["Config"; $Config; JSONObject]; ["AddonUUID"; $AddonUUID; JSONString]; ["ShowConfig"; $ShowConfig; JSONBoolean]; // ---Optional--- ["Meta.System.Appearance" ; Get(SystemAppearance) ; JSONString]; ["Meta.System.Platform" ; Get(SystemPlatform) ; JSONString]; ["Meta.Application.Version" ; Get(ApplicationVersion) ; JSONString]; ["Meta.Application.Language" ; Get(ApplicationLanguage) ; JSONString] ) ]
#Load the Widget
#This branch only runs when we are developing the Addon
Set Variable [ $$FCCalendar_DEV_URL; Value:$dev_url ]
Set Web Viewer [ Object Name: $WebViewerName; URL: $$FCCalendar_DEV_URL ]
Set Variable [ $error; Value:Get(LastError) ]
If [ $error <> 0 ]
Show Custom Dialog [ Title: "Developer Error: " & $error; Message: "The webViewer couldn't load."; Default Button: “OK”, Commit: “Yes” ]
End If
Perform JavaScript in Web Viewer [ Object Name: $webViewerName; Function Name: "loadInitialProps"; Parameter 1: $initialProps ]
Set Variable [ $error; Value:Get(LastError) ]
Fields used in this script	
Scripts used in this script	
FCCalendar Get WebViewer Object Name
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
FCCalendarConfig
Custom menu set used by this script	

Previous Script: [FCCalendar Load Calendar]
Parent Folder: [FCCalendar Addon Developer Only]
Next Script: [__FCClearDefaultDayOfWeek]
Script Name	FCSetDefaultDayOfWeek
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
FCCalendarFind
Script Definition
Script Steps	
If [ GetField ( "DefaultDayOfWeek" ) = "" ]
Set Variable [ $appLanguage; Value:Get ( ApplicationLanguage ) ]
Set Field [ FCCalendarAddon::DefaultDayOfWeek; Case ( $appLanguage = "English" ; "Sunday"; $appLanguage = "Simplified Chinese"; "Sunday"; $appLanguage = "Japanese"; "Sunday"; $appLanguage = "Korean"; "Sunday"; "Monday" ) ]
Set Variable [ $startingDayOfWeek; Value:GetNthRecord(GetField("FCCalendarAddon::DefaultDayOfWeek"); 1) ]
Set Field [ FCCalendarAddon::ConfigStore; JSONSetElement ( GetNthRecord(GetField("FCCalendarAddon::ConfigStore"); 1) ; [ "DEV_UUID.StartOnDay.value" ; $startingDayOfWeek ; JSONString ] ) ]
End If
Fields used in this script	
FCCalendarAddon::DefaultDayOfWeek
FCCalendarAddon::ConfigStore
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [FCSetDefaultDayOfWeek]
Parent Folder: [FCCalendar Addon Developer Only]
Next Script: [FCCalendar Import Sample Data]
Script Name	__FCClearDefaultDayOfWeek
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Set Field [ FCCalendarAddon::DefaultDayOfWeek; "" ]
Fields used in this script	
FCCalendarAddon::DefaultDayOfWeek
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [__FCClearDefaultDayOfWeek]
Parent Folder: [FCCalendar Addon Developer Only]
Next Script: [FCCalendarUpdateCalendarHTML]
Script Name	FCCalendar Import Sample Data
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Insert Text [ $FieldList ] [ Select ]
Freeze Window
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