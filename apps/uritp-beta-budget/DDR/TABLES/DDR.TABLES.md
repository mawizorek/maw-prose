URITP Budget.fmp12

Overview
Tables	30
Relationships	47
Layouts	69
Scripts	63
Value Lists	32
Custom Functions	19
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
OnFirstWindowOpen	Off
OnLastWindowClose	Script: lastWindowClose
OnWindowOpen	Off
OnWindowClose	Off
OnFileAVPlayerChange	Off
Thumbnail Settings
Generate Thumbnails	On; Temporary
 

Tables

Table Name	
Statistics
Occurrences in Relationship Graph
GLOBAL_USE_VARIABLES	
27 fields defined, 1 record
ui_GLOBAL_BudgetHub, GLOBAL_forIMPORTING, values_ImportSessionStatuses, values_ImportStatuses, values_List2 2, values_BudgetVersions, values_List2, values_StatusCategories, GLOBAL_USE_VARIABLES
GLOBAL_scriptVariabls	
3 fields defined, 0 record
GLOBAL_scriptVariables
XX_GLOBAL_PrintingVariables	
6 fields defined, 0 record
XX_GLOBAL_PrintingVariables
XX_GLOBAL_fileSetup	
13 fields defined, 0 record
XX_GLOBAL_fileSetup
BUDGET_Versions	
12 fields defined, 10 records
BUDGET_Versions_selfSuperseed, BUDGET_AllocationVersions
BudgetCode_YearConfig	
14 fields defined, 40 records
BudgetCode_YearConfig, SpecificBudgetCode_forURF_Assigning
Budget_Codes_Defintions	
31 fields defined, 280 records
BudgetCode_Defintions, self_BudgetCodes_byCode, Code_Definitions, BudgetCodes_forDefaultOthersCodes, URITPCodes_forCodingCumSale
Budget_FamilyDefintions	
10 fields defined, 7 records
Budget_FamilyDefintions_forFiltering, Budget_FamilyDefintions
Budget_ContextDefinitions	
12 fields defined, 80 records
Budget_ContextDefinitions_forFiltering, Budget_Contexts_forPopup, Budget_ContextDefinitions
Budget_ContextSuffixDefinitions	
10 fields defined, 136 records
Budget_ContextSuffixDefinitions_forFiltering, Budget_ContextSuffix_forPopup, Budget_ContextSuffixDefinitions
Budget_Allocation	
14 fields defined, 837 records
Budget_Allocation
Budget_Supervisors	
6 fields defined, 7 records
Budget_Supervisors
BudgetCode_Header_Categories	
3 fields defined, 20 records
BudgetCode_Header_Categories
IMPORT_SESSIONS	
19 fields defined, 13 records
fURF0989_IMPORT_SESSIONS, IMPORT_SESSIONS
IMPORT_URF0985	
54 fields defined, 1499 records
URF_IMPORT_ROWS
Import_URF0989	
18 fields defined, 0 record
Import_URF0989
URF_ROW_ASSIGNMENTS	
13 fields defined, 0 record
URF_ROW_ASSIGNMENTS
URF_CODED_TRANSACTIONS	
10 fields defined, 0 record
URF_CODED_TRANSACTIONS
Import_CumSaleLABOUR	
10 fields defined, 25 records
CumSale_LABOUR
XXFiscal Years	
8 fields defined, 3 records
XXlocalFiscal_Years
file_WorkNotes	
8 fields defined, 2 records
file_WorkNotes
zfile_ValueLISTS	
12 fields defined, 4 records
ufile_ValueLISTS, ui_ValueLISTS
zfile_Values	
10 fields defined, 16 records
ufile_Values, ufile_ValuesSelfStatusCategories, ufile_Values_OtherSameListSameCategory, ui_Values, ui_ValuesSelfStatusCategories
Budget_Allocation_OthersCodes	
10 fields defined, 2 records
Budget_Allocation_OthersCodes
UR_SpendRevenueCategory	
9 fields defined, 70 records
fURF0989_UR_SpendRevenueCategory, UR_SpendRevenueCategory
UR_Company	
8 fields defined, 1 record
fURF0989_UR_Company
UR_OperatingLineFAO	
9 fields defined, 69 records
fURF0989_UR_OperatingLineFAO, OP_Lines
UR_CostCenter	
9 fields defined, 1 record
fURF0989_UR_CostCenter
UR_Fund	
8 fields defined, 7 records
fURF0989_UR_Fund
UR_LedgerAccount	
8 fields defined, 32 records
fURF0989_UR_LedgerAccount
Fields

Table Name: GLOBAL_USE_VARIABLES - 27 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
APP_TITLE	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
File SETUP
gBudget Codes
save zBACKUP | File
APP_VERSION	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
File SETUP
gBudget Codes
calc_FILEPATH	Calculated, Number	Calculation:
Context table: ui_GLOBAL_BudgetHub
Get ( FilePath )
Storage:
Global
Repetitions: 1
Index Language: English
File SETUP
gBudget Codes
calc_FILENAME	Calculated, Text	Calculation:
Context table: ui_GLOBAL_BudgetHub
Get (FileName)
Storage:
Global
Repetitions: 1
Index Language: English
File SETUP
gBudget Codes
calc_HOSTED_STATUS	Calculated, Text	Calculation:
Context table: ui_GLOBAL_BudgetHub
If ( Get ( MultiUserState ) > 1 ; "Hosted" ; "Local" )
Storage:
Global
Repetitions: 1
Index Language: English
File SETUP
gBudget Codes
calc_FILESIZE_MB	Calculated, Text	Calculation:
Context table: ui_GLOBAL_BudgetHub
/* GetAsNumber ( Get (FileSize) ) / 100 */ Let ( ~bytes = Get (FileSize) ; Round ( ~bytes / 1048576 ; 2 ) & " MB" )
Storage:
Global
Repetitions: 1
Index Language: English
File SETUP
gBudget Codes
script_Stats_RecordCounts	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
File SETUP
gBudget Codes
set G | FILE RECORD STATS
script_LastSaved	Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
File SETUP
gBudget Codes
lastWindowClose
PrimaryKey	Normal, Text	Auto-Enter:
Context table: ui_GLOBAL_BudgetHub
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
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
g_fkACTIVE_BUDGET	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
File SETUP
gBudget Codes
gPRINT_CodeSortedBy	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
g_fkSelectedBudgetVersion	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
File SETUP
GLOBAL_VARIABLES | Imported
gBudget Codes
ui_GLOBAL_BudgetHub
(form) CODED Transactions
(form) URITP Budget Code
(PRINT) CODED Transactions Copy
ui_GLOBAL_BudgetHub=BUDGET_AllocationVersions
showOnly_CurrentAllocation
assignToCurrent
showOnlyActiveAllocation
g_fkSelectedCode	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
gBudget Codes
set G | SELECTED CODE
set G | SELECTED Version from gFY
g_fkSelectedImportURFSession	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Create_New_URF_Import
IMPORT_URF_Create_Session
g_fkImportURFSession	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_URF_Preflight_Profile
g_fkSelectedFiscalYear	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
(table) Budget Code Year Configs
gBudget Codes
ui_GLOBAL_BudgetHub=Fiscal_Years_forCurrent
set G | SELECTED Version from gFY
select | g FISCAL YEAR
CREATE Budget Code Year Config Snapshot
g_fkPREVIOUS_BUDGET	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
File SETUP
GLOBAL_VARIABLES | Imported
gBudget Codes
ui_GLOBAL_BudgetHub
g_fkNEXT_BUDGET	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
File SETUP
gBudget Codes
g_fkCOMPARE_BUDGET	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
File SETUP
GLOBAL_VARIABLES | Imported
gBudget Codes
ui_GLOBAL_BudgetHub
gLIST_BudgetVersions	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
values_BudgetVersions=ufile_Values
gLIST_2	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
values_List2=ufile_Values
gLIST_StatusGROUPS	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
values_StatusCategories=ufile_Values
gLIST_ImportStatuses	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
values_ImportStatuses=ufile_Values
g_tempImportContainer	Normal, Binary	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_URF_Preflight_Profile
IMPORT_rows_to_URF0985
gLIST_ImportSessionStatuses	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
values_ImportSessionStatuses=ufile_Values

Table Name: GLOBAL_scriptVariabls - 3 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: GLOBAL_scriptVariables
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
CODEpk	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
GLOBAL_scriptVariables
FilterSingleCodeASK
getCODEpk
_copyCode	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English

Table Name: XX_GLOBAL_PrintingVariables - 6 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: XX_GLOBAL_PrintingVariables
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
xx_CodeSortedBy	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
XX_GLOBAL_PrintingVariables
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
SortbyCode100
SortedbyCode10
SortedbyCode10 Copy
SortedbyHeader

Table Name: XX_GLOBAL_fileSetup - 13 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
APP_TITLE	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
GLOBAL_VARIABLES | Imported
ui_GLOBAL_BudgetHub
XX_GLOBAL_fileSetup
APP_VERSION	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
GLOBAL_VARIABLES | Imported
ui_GLOBAL_BudgetHub
XX_GLOBAL_fileSetup
calc_FilePath	Calculated, Number	Calculation:
Context table: XX_GLOBAL_fileSetup
Get ( FilePath )
Storage:
Global
Repetitions: 1
Index Language: English
calc_FileName	Calculated, Text	Calculation:
Context table: XX_GLOBAL_fileSetup
Get (FileName)
Storage:
Global
Repetitions: 1
Index Language: English
calc_HostedStatus	Calculated, Text	Calculation:
Context table: XX_GLOBAL_fileSetup
If ( Get ( MultiUserState ) > 1 ; "Hosted" ; "Local" )
Storage:
Global
Repetitions: 1
Index Language: English
calc_FileSize	Calculated, Text	Calculation:
Context table: XX_GLOBAL_fileSetup
Get (FileSize)
Storage:
Global
Repetitions: 1
Index Language: English
script_Stats_RecordCounts	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
script_LastSaved	Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
PrimaryKey	Normal, Text	Auto-Enter:
Context table: XX_GLOBAL_fileSetup
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	

Table Name: BUDGET_Versions - 12 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
TITLE	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(form) Budget HISTORY
(form) Budget Versions
File SETUP
gBudget Codes
(List) Budget Versions
BUDGET_VERSIONS
VERSION	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Value list: (dropdown) Budget_REVs
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) Budget HISTORY
(form) Budget Versions
File SETUP
gBudget Codes
(List) Budget Versions
DateReceived	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) Budget HISTORY
(form) Budget Versions
File SETUP
gBudget Codes
(List) Budget Versions
sort | Budget Allocation VERSIONS
SORT_ORDER	Normal, Number	Auto-Enter:
Allow editing
Do not replace existing value for field (if any)
Context table: BUDGET_AllocationVersions
Calculation: Max ( BUDGET_AllocationVersions::SORT_ORDER ) + 1
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) Budget HISTORY
(List) Budget Versions
BudgetVersionBY_SortOrder
sort | Budget Allocation VERSIONS
Notes	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) Budget HISTORY
(form) Budget Versions
File SETUP
gBudget Codes
fkFiscalYear	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(form) Budget HISTORY
(form) Budget Versions
File SETUP
gBudget Codes
(List) Budget Versions
Fiscal_Years_forBudgetVersions=BUDGET_AllocationVersions
fkSuperseededBy	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) Budget HISTORY
(List) Budget Versions
BUDGET_Versions_selfSuperseed=BUDGET_AllocationVersions
PrimaryKey	Normal, Text	Auto-Enter:
Context table: BUDGET_AllocationVersions
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: All
Index Language: Unicode Raw
Unique identifier of each record in this table	
BUDGET_AllocationVersions=Budget_Allocation
ui_GLOBAL_BudgetHub=BUDGET_AllocationVersions
BUDGET_Versions_selfSuperseed=BUDGET_AllocationVersions
showOnly_CurrentAllocation
DuplicateWRelated
BUDGET_VERSIONS
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
(List) Budget Versions
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	

Table Name: BudgetCode_YearConfig - 14 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
Code_snapshot	Normal, Number	Auto-Enter:
Allow editing
Context table: BudgetCode_YearConfig
Calculation: BudgetCode_Defintions::display_CodeCurrent
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Budget Code Year Configs
CREATE Budget Code Year Config Snapshot
Name_snapshot	Normal, Text	Auto-Enter:
Allow editing
Context table: BudgetCode_YearConfig
Calculation: BudgetCode_Defintions::Default Name
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Budget Code Year Configs
fkBudgetCodeDefinition	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Budget Code Year Configs
BudgetCode_YearConfig=BudgetCode_Defintions
CREATE Budget Code Year Config Snapshot
fkFiscalYear	Normal, Text	Auto-Enter:
Allow editing
Do not replace existing value for field (if any)
Context table: BudgetCode_YearConfig
Calculation: GLOBAL_USE_VARIABLES::g_fkSelectedFiscalYear
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Budget Code Year Configs
Fiscal_Years_forBudgetCodeConfigs=BudgetCode_YearConfig
PrimaryKey	Normal, Text	Auto-Enter:
Context table: BudgetCode_YearConfig
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
Budget_Allocation=BudgetCode_YearConfig
SpecificBudgetCode_forURF_Assigning=URF_ROW_ASSIGNMENTS
CREATE Budget Code Year Config Snapshot
popupV_BudgetCode_fromCurrentConfig
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
calc_CodeHundred	Calculated, Number	Calculation:
Context table: BudgetCode_YearConfig
BudgetCode_YearConfig::Code_snapshot - Mod ( BudgetCode_YearConfig::Code_snapshot ; 100 )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
calc_CodeTen	Calculated, Number	Calculation:
Context table: BudgetCode_YearConfig
BudgetCode_YearConfig::Code_snapshot - Mod ( BudgetCode_YearConfig::Code_snapshot ; 10 )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
xx_fkCodeHeaderCategory	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
calc_CodeInCurrentConfig	Calculated, Number	Calculation:
Context table: BudgetCode_YearConfig
GetAsNumber ( Budget_FamilyDefintions::calc_DigitsAsText & Budget_ContextDefinitions::calc_DigitsAsText & Budget_ContextSuffixDefinitions::calc_DigitsAsText )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
(table) Budget Code Year Configs
auto_DisplayName	Normal, Text	Auto-Enter:
Allow editing
Context table: BudgetCode_YearConfig
Calculation: BudgetCode_YearConfig::Code_snapshot & ". " & BudgetCode_YearConfig::Name_snapshot
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Budget Code Year Configs
popupV_BudgetCode_fromCurrentConfig

Table Name: Budget_Codes_Defintions - 31 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
Default Code	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Generate Budget Codes
(table) URITP Budget Codes
Print BUDGET CODES
(form) CODED Transactions
(form) URITP Budget Code
CodeSelectionPOPUP
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
SORT_BudgetCodes
goToCode
POPUP_selectCODE
buttonPassCodeNum
getCODEpk
Default Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Generate Budget Codes
(table) URITP Budget Codes
Print BUDGET CODES
(form) CODED Transactions
(form) URITP Budget Code
UNASSIGNED
CodeSelectionPOPUP
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
goToCodedTransactions
temp
PUBLICNotes	Normal, Text	Auto-Enter:
Allow editing
Context table: BudgetCode_Defintions
Calculation: TextFormatRemove ( Self )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) URITP Budget Codes
(form) CODED Transactions
(form) URITP Budget Code
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
PVT Allocation Notes	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) CODED Transactions
(form) URITP Budget Code
(PRINT) CODED Transactions Copy
_temp	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Generate Budget Codes
(table) URITP Budget Codes
Print BUDGET CODES
(form) URITP Budget Code
commitSummaryButtonTriggerFY26
is_active	Normal, Number	Auto-Enter:
Constant data: 1
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Value Lists
(table) URITP Budget Codes
Print BUDGET CODES
gBudget Codes
fkOWNER	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) URITP Budget Codes
Print BUDGET CODES
Budget_Supervisors=BudgetCode_Defintions
fkAllocation	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Print BUDGET CODES
xx_fkDefaultHeaderCategory	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) URITP Budget Codes
(form) URITP Budget Code
BudgetCode_Defintions=BudgetCode_Header_Categories
PrimaryKey	Normal, Text	Auto-Enter:
Context table: BudgetCode_Defintions
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: All
Index Language: Unicode Raw
Unique identifier of each record in this table	
Print BUDGET CODES
CumSale_LABOUR=URITPCodes_forCodingCumSale
BudgetCodes_forDefaultOthersCodes=Budget_Allocation_OthersCodes
BudgetCode_YearConfig=BudgetCode_Defintions
Code_Definitions=URF_CODED_TRANSACTIONS
navi | Select Code
COMMIT_ALL
useSelectedCode
goToCodedTransactions
buttonPassCodeNum
FilterSingleCodeASK
getCODEpk
CREATE Budget Code Year Config Snapshot
Budget Code Extended Names
popup Budget Code Number
popup Budget Code DisplayName
calc_CodeHundred	Calculated, Number	Calculation:
Context table: BudgetCode_Defintions
BudgetCode_Defintions::Default Code - Mod ( BudgetCode_Defintions::Default Code ; 100 )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
(table) URITP Budget Codes
calc_CodeTen	Calculated, Number	Calculation:
Context table: BudgetCode_Defintions
BudgetCode_Defintions::Default Code - Mod ( BudgetCode_Defintions::Default Code ; 10 )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
(table) URITP Budget Codes
calcTotalAllocation	Calculated, Number	Calculation:
Context table: BudgetCode_Defintions
Sum ( Budget_Allocation::AmountAwarded )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
calcDisplay_Code	Calculated, Number	Calculation:
Context table: BudgetCode_Defintions
"[" & GetAsText ( BudgetCode_Defintions::Default Code ) & "] " & BudgetCode_Defintions::Default Name
Storage:
Repetitions: 1
Indexing: All
Index Language: English
Budget Code Extended Names
xxFY26_Spent	Calculated, Number	Calculation:
Context table: Code_Definitions
Sum ( URF_IMPORT_ROWS::source_Amount ) + Sum ( CumSale_LABOUR::FYTD_Regular_Extra )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
(table) URITP Budget Codes
(form) CODED Transactions
(form) URITP Budget Code
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
xxFY26_REMAINING	Calculated, Number	Calculation:
Context table: BudgetCode_Defintions
BudgetCode_Defintions::xxFY26 Allocation - BudgetCode_Defintions::xxFY26_Spent
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
(table) URITP Budget Codes
(form) CODED Transactions
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
xxFY27 Allocation Summary	Summary, Number	Summary Information:
Total
All together
Summary field: xxFY27 Allocation
Auto-Enter:
Allow editing
(table) URITP Budget Codes
xxFY26 Allocation Summary	Summary, Number	Summary Information:
Total
All together
Summary field: xxFY26 Allocation
Auto-Enter:
Allow editing
(table) URITP Budget Codes
CODED Ledgers
PRINT CODED TRANSACTIONS
xxFY26 Spent Summary	Summary, Number	Summary Information:
Total
All together
Summary field: xxFY26_Spent
Auto-Enter:
Allow editing
(table) URITP Budget Codes
CODED Ledgers
xxFY26 Remaining Summary	Summary, Number	Summary Information:
Total
All together
Summary field: xxFY26_REMAINING
Auto-Enter:
Allow editing
(table) URITP Budget Codes
CODED Ledgers
xxFY26 Allocation	Normal, Number	Auto-Enter:
Allow editing
Context table: BudgetCode_Defintions
Calculation: TextFormatRemove ( Self )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) URITP Budget Codes
(form) CODED Transactions
(form) URITP Budget Code
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
commitSummaryButtonTriggerFY26
commitSummaryButtonTrigger CopyFY26
xxFY27 Allocation	Normal, Number	Auto-Enter:
Allow editing
Context table: BudgetCode_Defintions
Calculation: TextFormatRemove ( Self )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) URITP Budget Codes
(form) CODED Transactions
(form) URITP Budget Code
(PRINT) CODED Transactions Copy
fkBudget_FAMILY	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
two-digits	
(table) Generate Budget Codes
Print BUDGET CODES
Budget_FamilyDefintions=BudgetCode_Defintions
Budget_Contexts_forPopup=BudgetCode_Defintions
Budget_ContextSuffix_forPopup=BudgetCode_Defintions
fkBudget_CONTEXT	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
one middle digit	
(table) Generate Budget Codes
Print BUDGET CODES
Budget_ContextDefinitions=BudgetCode_Defintions
fkBudget_SUFFIX	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
final last two digits	
(table) Generate Budget Codes
Print BUDGET CODES
gBudget Codes
BudgetCode_Defintions=Budget_ContextSuffixDefinitions
fkUROperatingLine	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Print BUDGET CODES
OP_Lines=BudgetCode_Defintions
fkURSpendCateogry	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Print BUDGET CODES
calc_ExpectedCode	Calculated, Number	Calculation:
Context table: BudgetCode_Defintions
/* Budget_FamilyDefintions::calc_DigitsAsText & "." & Budget_ContextDefinitions::calc_DigitsAsText & "." & If ( IsEmpty ( Suffix_OVerride ) ; Budget_ContextSuffixDefinitions::calc_DigitsAsText ; Suffix_OVerride) & " | " & */ Budget_FamilyDefintions::calc_DigitsAsText & Budget_ContextDefinitions::calc_DigitsAsText & Budget_ContextSuffixDefinitions::calc_DigitsAsText
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
(table) Generate Budget Codes
New Script
Suffix_OVerride	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Generate Budget Codes
display_CodeCurrent	Normal, Text	Auto-Enter:
Allow editing
Do not replace existing value for field (if any)
Context table: BudgetCode_Defintions
Calculation: BudgetCode_Defintions::calc_ExpectedCode
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Generate Budget Codes
Print BUDGET CODES
BudgetCode_Defintions=self_BudgetCodes_byCode
New Script
popup Budget Code Number
auto_Display_forPopups	Normal, Text	Auto-Enter:
Allow editing
Context table: BudgetCode_Defintions
Calculation: BudgetCode_Defintions::display_CodeCurrent & ". " & BudgetCode_Defintions::Default Name
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Generate Budget Codes
popup Budget Code DisplayName

Table Name: Budget_FamilyDefintions - 10 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: Budget_FamilyDefintions
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
Budget_FamilyDefintions=BudgetCode_Defintions
Budget_ContextSuffixDefinitions_forFiltering=Budget_FamilyDefintions
Budget_ContextDefinitions_forFiltering=Budget_FamilyDefintions
popup_BudgetFAMILIES
CreationTimestamp	Normal, Timestamp	Auto-Enter:
Creation timestamp
Validation:
Only during data entry
Strict data type: 4 digit year
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: All
Index Language: English
Date and time each record was created	
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Generate Budget Codes
(table) Budget FAMILY Definitions
Digits	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Budget FAMILY Definitions
sort | Budget Code SUFFIXES
sort | Budget Code SUFFIXES Copy
sort | Budget Code Assignment Join
calc_DigitsAsText	Calculated, Text	Calculation:
Context table: Budget_FamilyDefintions
GetAsText ( leadingZeros ( Budget_FamilyDefintions::Digits ; 1 ) )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Budget FAMILY Definitions
auto_PopupName	Normal, Text	Auto-Enter:
Allow editing
Context table: Budget_FamilyDefintions
Calculation: "[" & Budget_FamilyDefintions::calc_DigitsAsText & "] " & Budget_FamilyDefintions::Name
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Budget FAMILY Definitions
popup_BudgetFAMILIES
SuffixScope	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Budget FAMILY Definitions

Table Name: Budget_ContextDefinitions - 12 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: Budget_ContextDefinitions
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
Budget_ContextDefinitions=BudgetCode_Defintions
popup_BudgetCodeCONTEXTS
popup_BudgetCodeCONTEXTS_FilteredbyFamily
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
Digit	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Budget CONTEXT Definitions
sort | Budget Code SUFFIXES Copy
sort | Budget Code Assignment Join
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Budget CONTEXT Definitions
calc_DigitsAsText	Calculated, Text	Calculation:
Context table: Budget_ContextDefinitions
GetAsText ( leadingZeros ( Budget_ContextDefinitions::Digit ; 2 ) )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Budget CONTEXT Definitions
sort | Budget Code SUFFIXES
fkFamily_forContext	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Budget CONTEXT Definitions
Budget_Contexts_forPopup=BudgetCode_Defintions
Budget_ContextDefinitions_forFiltering=Budget_FamilyDefintions
calcViz_code	Calculated, Text	Calculation:
Context table: Budget_ContextDefinitions_forFiltering
Budget_FamilyDefintions_forFiltering::calc_DigitsAsText & Budget_ContextDefinitions_forFiltering::calc_DigitsAsText
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
(table) Budget CONTEXT Definitions
fkUROperatingLine	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Budget CONTEXT Definitions
auto_popupName	Normal, Text	Auto-Enter:
Allow editing
Context table: Budget_ContextDefinitions
Calculation: "[" & Budget_ContextDefinitions::calcViz_code & "] " & Budget_ContextDefinitions::Name
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Budget CONTEXT Definitions
popup_BudgetCodeCONTEXTS
popup_BudgetCodeCONTEXTS_FilteredbyFamily

Table Name: Budget_ContextSuffixDefinitions - 10 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: Budget_ContextSuffixDefinitions
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
BudgetCode_Defintions=Budget_ContextSuffixDefinitions
popup_BudgetSUFFIX_byFamily
popup_BudgetCodeContextSUFFIX_filtered
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Budget SUFFIX Definitions
popup_BudgetSUFFIX_byFamily
popup_BudgetCodeContextSUFFIX_filtered
Digits	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Budget SUFFIX Definitions
sort | Budget Code SUFFIXES
sort | Budget Code Assignment Join
calc_DigitsAsText	Calculated, Text	Calculation:
Context table: Budget_ContextSuffixDefinitions
GetAsText ( leadingZeros ( Budget_ContextSuffixDefinitions::Digits ; 2 ) )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Budget SUFFIX Definitions
fkFamily_forSubContext	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Budget SUFFIX Definitions
Budget_ContextSuffix_forPopup=BudgetCode_Defintions
Budget_ContextSuffixDefinitions_forFiltering=Budget_FamilyDefintions
calcViz_code	Calculated, Text	Calculation:
Context table: Budget_ContextSuffixDefinitions_forFiltering
Budget_FamilyDefintions_forFiltering::calc_DigitsAsText & "--" & Budget_ContextSuffixDefinitions_forFiltering::calc_DigitsAsText
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
(table) Budget SUFFIX Definitions

Table Name: Budget_Allocation - 14 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
Title	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) Budget HISTORY
Description	Normal, Text	Auto-Enter:
Allow editing
Context table: Budget_Allocation
Calculation: TextFormatRemove(Self)
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(Layout) NM Allocation Format Copy
(form) Budget HISTORY
(form) Budget Versions
(form) CODED Transactions
(Layout) NM Allocation Format
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
AmountAwarded	Normal, Number	Auto-Enter:
Allow editing
Context table: Budget_Allocation
Calculation: TextFormatRemove(Self)
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(Layout) NM Allocation Format Copy
(form) Budget HISTORY
(form) Budget Versions
(form) CODED Transactions
(Layout) NM Allocation Format
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
fkBudgetVersion	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(Layout) NM Allocation Format Copy
(form) CODED Transactions
(Layout) NM Allocation Format
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
(PRINT) CODED Transactions Copy
BUDGET_AllocationVersions=Budget_Allocation
assignToCurrent
findAllocation
newAllocationWcurrent
showOnlyActiveAllocation
PrimaryKey	Normal, Text	Auto-Enter:
Context table: Budget_Allocation
Calculation: Get( UUID )
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: All
Index Language: Unicode Raw
Unique identifier of each record in this table	
fkBudgetCode	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(Layout) NM Allocation Format Copy
(form) Budget HISTORY
(form) Budget Versions
(form) CODED Transactions
(Layout) NM Allocation Format
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
Budget_Allocation=BudgetCode_YearConfig
Notes	Normal, Text	Auto-Enter:
Allow editing
Context table: Budget_Allocation
Calculation: TextFormatRemove(Self)
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(Layout) NM Allocation Format Copy
(form) Budget Versions
(form) CODED Transactions
(Layout) NM Allocation Format
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
SummaryAmountAwarded	Summary, Number	Summary Information:
Total
All together
Summary field: AmountAwarded
Auto-Enter:
Allow editing
(Layout) NM Allocation Format Copy
(form) Budget HISTORY
(form) CODED Transactions
(Layout) NM Allocation Format
Current_Allocation
(form) URITP Budget Code
commitSummaryButtonTriggerFY26
commitSummaryButtonTrigger CopyFY26
FLAG	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
WORKSHEET	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) Budget HISTORY
Current_Allocation
(form) URITP Budget Code
NM_sort	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(Layout) NM Allocation Format Copy
(Layout) NM Allocation Format
goToRelatedAllocations
sortByNMAllocation
AllocationWorksheet	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(Layout) NM Allocation Format Copy
(Layout) NM Allocation Format
goToRelatedAllocations
sortByNMAllocation
NM_Subtotal	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(Layout) NM Allocation Format Copy
(Layout) NM Allocation Format
goToRelatedAllocations
sortByNMAllocation
fkDefaultExtAllocation	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
Budget_Allocation=Budget_Allocation_OthersCodes

Table Name: Budget_Supervisors - 6 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: Budget_Supervisors
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
Budget_Supervisors=BudgetCode_Defintions
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English

Table Name: BudgetCode_Header_Categories - 3 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: BudgetCode_Header_Categories
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
BudgetCode_Defintions=BudgetCode_Header_Categories
HeaderTITLE	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
HeaderStartNumber	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: IMPORT_SESSIONS - 19 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
SessionLabel	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
"FY27-02 URF0985 import"	
(table) Import SESSIONS URF
IMPORT_SESSIONS
IMPORT_URF_Create_Session
ImportTimestamp	Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import SESSIONS URF
IMPORT_SESSIONS
IMPORT_URF_Create_Session
ReportMonthEnd	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
IMPORT_URF_Create_Session
fkFiscalYear	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import SESSIONS URF
IMPORT_SESSIONS
Fiscal_Years_forImports=IMPORT_SESSIONS
IMPORT_URF_Create_Session
fkSessionStatus	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import SESSIONS URF
Create_New_URF_Import
IMPORT_URF_Create_Session
ImportedRowCount	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
CarryForwardRowCount	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
IgnoreDuplicateRowCount	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
NewRowCount	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
NeedsReviewRowCount	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Notes	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import SESSIONS URF
IMPORT_SESSIONS
Create_New_URF_Import
OriginalFile	Normal, Binary	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
don't delete yet but keep it super lightweight.	
(table) Import SESSIONS URF
IMPORT_SESSIONS
IMPORT_URF_Create_Session
auto_Filename	Calculated, Number	Calculation:
Context table: IMPORT_SESSIONS
GetContainerAttribute ( IMPORT_SESSIONS::OriginalFile ; "filename" )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
don't delete yet but keep it super lightweight.	
(table) Import SESSIONS URF
IMPORT_SESSIONS
IMPORT_URF_Create_Session
auto_FilesizeKB	Calculated, Number	Calculation:
Context table: IMPORT_SESSIONS
GetAsNumber ( GetContainerAttribute ( IMPORT_SESSIONS::OriginalFile ; "filesize" ) ) / 100
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
don't delete yet but keep it super lightweight.	
(table) Import SESSIONS URF
IMPORT_SESSIONS
PrimaryKey	Normal, Text	Auto-Enter:
Context table: IMPORT_SESSIONS
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
URF_IMPORT_ROWS=IMPORT_SESSIONS
CumSale_LABOUR=IMPORT_SESSIONS
fURF0989_IMPORT_SESSIONS=Import_URF0989
Create_New_URF_Import
IMPORT_URF_Create_Session
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	

Table Name: IMPORT_URF0985 - 54 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
is_first_seen_ever	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Not empty
Context table: URF_IMPORT_ROWS
Calculation: 0 or 1
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
was_seen_in_prior_import	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Not empty
Context table: URF_IMPORT_ROWS
Calculation: 0 or 1
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
is_duplicate_within_session	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Not empty
Context table: URF_IMPORT_ROWS
Calculation: 0 or 1
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
is_revision_candidate	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Not empty
Context table: URF_IMPORT_ROWS
Calculation: 0 or 1
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
fkMatchedPriorRow	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
fkMatchedPriorSession	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
fkImportSession	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
URF_IMPORT_ROWS=IMPORT_SESSIONS
fkImportStatus	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
typicall Script Set	
(table) Import URF LINES
(table) Import URF LINES Excel
calc_NormalizedReference	Calculated, Number	Calculation:
Context table: URF_IMPORT_ROWS
Let ( [ t = URF_IMPORT_ROWS::source_Reference ; t1 = Substitute ( t ; [ Char ( 13 ) ; " " ] ; [ Char ( 10 ) ; " " ] ; [ "¶" ; " " ] ) ] ; Upper ( TrimAll ( t1 ; 1 ; 1 ) ) )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
calc_NormalizedBusinessDocument	Calculated, Number	Calculation:
Context table: URF_IMPORT_ROWS
Let ( [ t = URF_IMPORT_ROWS::source_BusinessDocument ; t1 = Substitute ( t ; [ Char ( 13 ) ; " " ] ; [ Char ( 10 ) ; " " ] ; [ "¶" ; " " ] ) ] ; Upper ( TrimAll ( t1 ; 1 ; 1 ) ) )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
calc_NormalizedSupplier	Calculated, Number	Calculation:
Context table: URF_IMPORT_ROWS
Let ( [ t = URF_IMPORT_ROWS::source_Supplier ; t1 = Substitute ( t ; [ Char ( 13 ) ; " " ] ; [ Char ( 10 ) ; " " ] ; [ "¶" ; " " ] ) ] ; Upper ( TrimAll ( t1 ; 1 ; 1 ) ) )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
calc_NormalizedLineMemo	Calculated, Number	Calculation:
Context table: URF_IMPORT_ROWS
Let ( [ t = URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber ; t1 = Substitute ( t ; [ Char ( 13 ) ; " " ] ; [ Char ( 10 ) ; " " ] ; [ "¶" ; " " ] ) ] ; Upper ( TrimAll ( t1 ; 1 ; 1 ) ) )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
calc_sourceUKey_LineFingerprint	Calculated, Number	Calculation:
Context table: URF_IMPORT_ROWS
Let ( [ raw = URF_IMPORT_ROWS::source_FAO_ID & "¦" & GetAsText ( URF_IMPORT_ROWS::source_AccountingDate ) & "¦" & GetAsText ( URF_IMPORT_ROWS::source_BudgetDate ) & "¦" & Substitute ( GetAsText ( URF_IMPORT_ROWS::source_Amount ) ; "-" ; "" ) & "¦" & URF_IMPORT_ROWS::source_JournalSource & "¦" & URF_IMPORT_ROWS::calc_NormalizedReference & "¦" & URF_IMPORT_ROWS::calc_NormalizedBusinessDocument & "¦" & URF_IMPORT_ROWS::source_LedgerAccountIdentifier & "¦" & URF_IMPORT_ROWS::source_FAC_ID & "¦" & URF_IMPORT_ROWS::calc_NormalizedSupplier & "¦" & URF_IMPORT_ROWS::calc_NormalizedLineMemo & "¦" & GetAsText ( URF_IMPORT_ROWS::source_Amount ) & "¦" & GetAsText ( URF_IMPORT_ROWS::source_FiscalTimePeriodEndDate ) ] ; Substitute ( raw ; " " ; "" ) /* Base64EncodeRFC ( 4648 ; CryptDigest ( raw ; "SHA256" ) ) */ )
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
calc_sourceUKey_DocumentFingerprint	Calculated, Number	Calculation:
Context table: URF_IMPORT_ROWS
Let ( [ raw = URF_IMPORT_ROWS::source_FAO_ID & "¦" & URF_IMPORT_ROWS::source_JournalSource & "¦" & URF_IMPORT_ROWS::calc_NormalizedReference & "¦" & URF_IMPORT_ROWS::calc_NormalizedBusinessDocument & "¦" & URF_IMPORT_ROWS::source_LedgerAccountIdentifier & "¦" & URF_IMPORT_ROWS::calc_NormalizedSupplier ] ; Base64EncodeRFC ( 4648 ; CryptDigest ( raw ; "SHA256" ) ) )
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
xxURF_UNIQUE	Calculated, Text	Calculation:
Context table: URF_IMPORT_ROWS
GetAsNumber ( URF_IMPORT_ROWS::source_AccountingDate ) & Let ( ~amount = Round ( URF_IMPORT_ROWS::source_Amount ; 2 ) ; If ( Mod ( URF_IMPORT_ROWS::source_Amount ; 1 ) = 0 ; ~amount & ".00" ; ~amount ) )
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
URF_UNIQUE
xxFLAG	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
MOBILE Assiging Budget Codes Copy
PRINT CODED TRANSACTIONS
xxs_Amount	Summary, Number	Summary Information:
Total
All together
Summary field: source_Amount
Auto-Enter:
Allow editing
(form) CODED Transactions
URF_IMPORT Copy
xxfkBUDGET_CODE	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(form) CODED Transactions
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
PRINT CODED TRANSACTIONS
showUNASSIGNED
showUNASSIGNED Copy
useSelectedCode
REPLACE_fkBudgetCode
COPY_code
PASTE_code
buttonPassCodeNum
enterLayoutSpecificCodeURF
FilterSingleCodeASK
xxCODING_Notes	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Batch Assiging Budget Codes
sourceScripted_RowNumber	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
source_Company	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_Fund	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_CostCenter	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_FAO_ID	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
URF_IMPORT_ROWS
URF_IMPORT Copy
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
source_FAOName	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT_ROWS
URF_IMPORT Copy
CODED Ledgers
source_ObjectClassName	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_ObjectClassSortOrder	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_LedgerAccount	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
URF_IMPORT Copy
Ledger Accounts
source_LedgerAccountIdentifier	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_FAC_ID	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_FACName	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
URF_IMPORT Copy
UNASSIGNED
FAC Names
source_Supplier	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
(form) CODED Transactions
URF_IMPORT Copy
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
source_PONumber	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
URF_IMPORT Copy
source_AccountingDate	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
the date it was reconciled.	
(table) Import URF LINES
(table) Import URF LINES Excel
URF_IMPORT Copy
URF_UNIQUE
UNASSIGNED
source_BudgetDate	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
the month that "absorbs" that charge actually	
(table) Import URF LINES
(table) Import URF LINES Excel
(form) CODED Transactions
URF_IMPORT Copy
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
enterLayoutSpecificCodeURF
source_JournalSource	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
URF_IMPORT Copy
source_Reference	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
(form) CODED Transactions
URF_IMPORT Copy
UNASSIGNED
Batch Assiging Budget Codes
PRINT CODED TRANSACTIONS
source_BusinessDocument	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
URF_IMPORT Copy
URF_UNIQUE
source_HeaderMemo_PONumber	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
(form) CODED Transactions
URF_IMPORT Copy
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
source_LineMemo_SupplierReferenceNumber	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
(form) CODED Transactions
URF_IMPORT Copy
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
source_Amount	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
(table) Import URF LINES
(table) Import URF LINES Excel
(form) CODED Transactions
URF_IMPORT_ROWS
URF_IMPORT Copy
URF_UNIQUE
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
showUNASSIGNED
showUNASSIGNED Copy
source_Award	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_AwardName	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_FromDate	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_ToDate	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_AwardLineAmount	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_PrincipalInvestigator	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_FiscalTimePeriodStartDate	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
source_FiscalTimePeriodEndDate	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) Import URF LINES Excel
URF_IMPORT Copy
PrimaryKey	Normal, Text	Auto-Enter:
Context table: URF_IMPORT_ROWS
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
URF_IMPORT_ROWS=URF_ROW_ASSIGNMENTS
Create_New_URF_Import
POPUP_selectCODE
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	

Table Name: Import_URF0989 - 18 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: Import_URF0989
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
fkFAO	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
fURF0989_UR_OperatingLineFAO=Import_URF0989
fkCompany	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
fURF0989_UR_Company=Import_URF0989
fkCostCenter	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
fURF0989_UR_CostCenter=Import_URF0989
fkFund	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
fURF0989_UR_Fund=Import_URF0989
fkLedgerAccount	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
fURF0989_UR_LedgerAccount=Import_URF0989
fkSpendCategory	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
fURF0989_UR_SpendRevenueCategory=Import_URF0989
import_OriginalBudget	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
import_CurrentBudget	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
import_MonthActual	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
import_FYTD Actual	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
import_BalanaceAvailable	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
import_PercentUsed	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
fkImportSession	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Import_URF0989
fURF0989_IMPORT_SESSIONS=Import_URF0989

Table Name: URF_ROW_ASSIGNMENTS - 13 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
fkURFImportRow	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_ROW_ASSIGNMENTS
URF_IMPORT_ROWS=URF_ROW_ASSIGNMENTS
fkBudgetCode	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_ROW_ASSIGNMENTS
SpecificBudgetCode_forURF_Assigning=URF_ROW_ASSIGNMENTS
AssignedAmount	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_ROW_ASSIGNMENTS
AssignmentMethod	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_ROW_ASSIGNMENTS
AssignedBy	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_ROW_ASSIGNMENTS
AssignedAt	Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_ROW_ASSIGNMENTS
Notes	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_ROW_ASSIGNMENTS
fkAssingmentStatus	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_ROW_ASSIGNMENTS
PrimaryKey	Normal, Text	Auto-Enter:
Context table: URF_ROW_ASSIGNMENTS
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
URF_ROW_ASSIGNMENTS
URF_CODED_TRANSACTIONS=URF_ROW_ASSIGNMENTS
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
URF_ROW_ASSIGNMENTS
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
URF_ROW_ASSIGNMENTS
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
URF_ROW_ASSIGNMENTS
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
URF_ROW_ASSIGNMENTS

Table Name: URF_CODED_TRANSACTIONS - 10 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
fkAssignment	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_CODED_TRANSACTIONS
URF_CODED_TRANSACTIONS=URF_ROW_ASSIGNMENTS
PrimaryKey	Normal, Text	Auto-Enter:
Context table: URF_CODED_TRANSACTIONS
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
URF_CODED_TRANSACTIONS
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
URF_CODED_TRANSACTIONS
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
URF_CODED_TRANSACTIONS
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
URF_CODED_TRANSACTIONS
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
URF_CODED_TRANSACTIONS
Amount	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_CODED_TRANSACTIONS
PostingDate	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_CODED_TRANSACTIONS
SourceType	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
URF_CODED_TRANSACTIONS
fkDefaultCode	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
URF_CODED_TRANSACTIONS
Code_Definitions=URF_CODED_TRANSACTIONS

Table Name: Import_CumSaleLABOUR - 10 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
Worker	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) CODED Transactions
CumSale_LABOUR
FYTD_Regular_Extra	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(form) CODED Transactions
CumSale_LABOUR
fkBudgetCode	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
CumSale_LABOUR
CumSale_LABOUR=URITPCodes_forCodingCumSale
Summary_Earnings	Summary, Number	Summary Information:
Total
All together
Summary field: FYTD_Regular_Extra
Auto-Enter:
Allow editing
CumSale_LABOUR
fkImportSession	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
CumSale_LABOUR=IMPORT_SESSIONS
PrimaryKey	Normal, Text	Auto-Enter:
Context table: CumSale_LABOUR
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	

Table Name: XXFiscal Years - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: XXlocalFiscal_Years
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
(popup) Fiscal Year
popupEDS_FiscalYears
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
ShortName	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(popup) Fiscal Year
popupEDS_FiscalYears
Start Date	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
End Date	Normal, Date	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: file_WorkNotes - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
NOTES	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
file_WorkNotes
_temp	Normal, Number	Auto-Enter:
Constant data: 0
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
file_WorkNotes
PrimaryKey	Normal, Text	Auto-Enter:
Context table: file_WorkNotes
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
URGENCY	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
file_WorkNotes

Table Name: zfile_ValueLISTS - 12 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
Value Lists
popupV_ValueLists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: ufile_ValueLISTS
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
Value Lists
ufile_ValueLISTS=ufile_Values
ui_ValueLISTS=ui_Values
popupV_ValueLists
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
is_actve	Normal, Number	Auto-Enter:
Constant data: 1
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Value Lists
is_status_list	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) values
Value Lists
enforce_1_to_1	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Value Lists
commitRecord
tester	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
Value Lists
Notes	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Value Lists
sCount_Values	Calculated, Number	Calculation:
Context table: ufile_ValueLISTS
Count ( ufile_Values::PrimaryKey )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
Value Lists

Table Name: zfile_Values - 10 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) values
Value Lists
popupV_StatusCategories
popupV_ImportSessionStatuses
popupV_BudgetVersions
popupV_List2
popupV_ImportStatuses
sort_order	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) values
Value Lists
use_Notes	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(table) values
Value Lists
fkList	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) values
ufile_ValueLISTS=ufile_Values
ui_ValueLISTS=ui_Values
values_ImportStatuses=ufile_Values
values_StatusCategories=ufile_Values
values_BudgetVersions=ufile_Values
values_List2=ufile_Values
ufile_Values_OtherSameListSameCategory∞ufile_Values
values_ImportSessionStatuses=ufile_Values
fkStatusCATEGORY	Normal, Text	Auto-Enter:
Allow editing
Validation:
Always Validate
Strict validation
Error message: "This value list enforces one value per Status Category. That category is already used, pick a different category or leave it blank."
Context table: ufile_Values
Calculation: not ( ufile_ValueLISTS::enforce_1_to_1 = 1 and not IsEmpty ( ufile_Values::fkStatusCATEGORY ) and Count ( ufile_Values_OtherSameListSameCategory::PrimaryKey ) > 0 )
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
(table) values
Value Lists
ufile_ValuesSelfStatusCategories=ufile_Values
ui_ValuesSelfStatusCategories=ui_Values
ufile_Values_OtherSameListSameCategory∞ufile_Values
PrimaryKey	Normal, Text	Auto-Enter:
Context table: ufile_Values
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
(table) values
Value Lists
ufile_ValuesSelfStatusCategories=ufile_Values
ui_ValuesSelfStatusCategories=ui_Values
ufile_Values_OtherSameListSameCategory∞ufile_Values
popupV_StatusCategories
popupV_ImportSessionStatuses
popupV_BudgetVersions
popupV_List2
popupV_ImportStatuses
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	

Table Name: Budget_Allocation_OthersCodes - 10 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: Budget_Allocation_OthersCodes
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
Budget_Allocation=Budget_Allocation_OthersCodes
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
Title	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(tabel) Codes tht Others Use
Description_and_notes	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(tabel) Codes tht Others Use
fkDefaultSpendCategory	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(tabel) Codes tht Others Use
UR_SpendRevenueCategory=Budget_Allocation_OthersCodes
fkDefaultURITPBudgetCode	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
(tabel) Codes tht Others Use
BudgetCodes_forDefaultOthersCodes=Budget_Allocation_OthersCodes
calc_combinedName	Calculated, Number	Calculation:
Context table: Budget_Allocation_OthersCodes
1
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: UR_SpendRevenueCategory - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
auto_DisplayName	Normal, Text	Auto-Enter:
Allow editing
Context table: UR_SpendRevenueCategory
Calculation: UR_SpendRevenueCategory::Title & " (" & UR_SpendRevenueCategory::Code_Prefix & UR_SpendRevenueCategory::Code & ")"
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
UR_Spend_Categories
Code_Prefix	Normal, Text	Auto-Enter:
Constant data: SC
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
UR_Spend_Categories
Code	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
UR_Spend_Categories
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
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
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
PrimaryKey	Normal, Text	Auto-Enter:
Context table: UR_SpendRevenueCategory
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
UR_SpendRevenueCategory=Budget_Allocation_OthersCodes
fURF0989_UR_SpendRevenueCategory=Import_URF0989
popup_SpendCategories
Title	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
UR_Spend_Categories
popup_SpendCategories

Table Name: UR_Company - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: fURF0989_UR_Company
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
fURF0989_UR_Company=Import_URF0989
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_Company
Code	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_Company
auto_DisplayName	Normal, Text	Auto-Enter:
Allow editing
Context table: fURF0989_UR_Company
Calculation: fURF0989_UR_Company::Code & " " & fURF0989_UR_Company::Name
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_Company

Table Name: UR_OperatingLineFAO - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: OP_Lines
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
OP_Lines=BudgetCode_Defintions
fURF0989_UR_OperatingLineFAO=Import_URF0989
popup_OPLines
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
Title	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
UR_OperatingLines_FAOs
popup_OPLines
Code	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: All
Index Language: English
UR_OperatingLines_FAOs
Code_Prefix	Normal, Text	Auto-Enter:
Constant data: OP
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
UR_OperatingLines_FAOs
auto_DisplayName	Normal, Text	Auto-Enter:
Allow editing
Context table: OP_Lines
Calculation: OP_Lines::Code_Prefix & OP_Lines::Code & " " & OP_Lines::Title
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
UR_OperatingLines_FAOs

Table Name: UR_CostCenter - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: fURF0989_UR_CostCenter
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
fURF0989_UR_CostCenter=Import_URF0989
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
auto_DisplayName	Normal, Text	Auto-Enter:
Allow editing
Context table: fURF0989_UR_CostCenter
Calculation: fURF0989_UR_CostCenter::Code_Prefix & fURF0989_UR_CostCenter::Code & " " & fURF0989_UR_CostCenter::Title
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_CostCenter
Code	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_CostCenter
Code_Prefix	Normal, Text	Auto-Enter:
Constant data: CC
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_CostCenter
Title	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
fURF0989_UR_CostCenter

Table Name: UR_Fund - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: fURF0989_UR_Fund
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
fURF0989_UR_Fund=Import_URF0989
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_Fund
auto_DisplayName	Normal, Text	Auto-Enter:
Allow editing
Context table: fURF0989_UR_Fund
Calculation: fURF0989_UR_Fund::Name & " - " & fURF0989_UR_Fund::Fund_Restrictions
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_Fund
Fund_Restrictions	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_Fund

Table Name: UR_LedgerAccount - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: fURF0989_UR_LedgerAccount
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
fURF0989_UR_LedgerAccount=Import_URF0989
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
CreatedBy	Normal, Text	Auto-Enter:
Creation account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who created each record	
ModificationTimestamp	Normal, Timestamp	Auto-Enter:
Modification timestamp
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
Date and time each record was last modified	
ModifiedBy	Normal, Text	Auto-Enter:
Modification account name
Validation:
Only during data entry
Not empty
Strict validation
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Account name of the user who last modified each record	
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_LedgerAccount
Code	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
fURF0989_UR_LedgerAccount
auto_DisplayName	Normal, Text	Auto-Enter:
Allow editing
Context table: fURF0989_UR_LedgerAccount
Calculation: fURF0989_UR_LedgerAccount::Code & ": " & fURF0989_UR_LedgerAccount::Name
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fURF0989_UR_LedgerAccount
Base Directories

ID	Path
0	Scanned from a Xerox Multifunction Printer 2/
Relationships: Table Occurrences

Table Occurrence	Source Table	Source File	In Relationships	In Scripts	In Field Definitions	In Value Lists	Associated with layouts
BUDGET_Versions_selfSuperseed	BUDGET_Versions	URITP Budget.fmp12	
BUDGET_Versions_selfSuperseed=BUDGET_AllocationVersions
Fiscal_Years_forBudgetCodeConfigs	FISCAL_YEARS	Data Source: URITP Global Setup	
Fiscal_Years_forBudgetCodeConfigs=BudgetCode_YearConfig
BudgetCode_Defintions	Budget_Codes_Defintions	URITP Budget.fmp12	
BudgetCode_Defintions=BudgetCode_Header_Categories
Budget_Supervisors=BudgetCode_Defintions
OP_Lines=BudgetCode_Defintions
Budget_ContextDefinitions=BudgetCode_Defintions
BudgetCode_Defintions=Budget_ContextSuffixDefinitions
BudgetCode_YearConfig=BudgetCode_Defintions
Budget_FamilyDefintions=BudgetCode_Defintions
Budget_Contexts_forPopup=BudgetCode_Defintions
Budget_ContextSuffix_forPopup=BudgetCode_Defintions
BudgetCode_Defintions=self_BudgetCodes_byCode
navi | Select Code
commitSummaryButtonTriggerFY26
commitSummaryButtonTrigger CopyFY26
COMMIT_ALL
SORT_BudgetCodes
buttonPassCodeNum
FilterSingleCodeASK
getCODEpk
temp
New Script
CREATE Budget Code Year Config Snapshot
BudgetCode_YearConfig::Code_snapshot
BudgetCode_YearConfig::Name_snapshot
Budget_Codes_Defintions::calc_CodeHundred
Budget_Codes_Defintions::calc_CodeTen
Budget_Codes_Defintions::calcDisplay_Code
Budget_Codes_Defintions::xxFY26_REMAINING
Budget_Codes_Defintions::display_CodeCurrent
Budget_Codes_Defintions::auto_Display_forPopups
Budget Code Extended Names
popup Budget Code Number
popup Budget Code DisplayName
(table) Generate Budget Codes
Value Lists
(table) URITP Budget Codes
Print BUDGET CODES
gBudget Codes
(form) URITP Budget Code
BudgetCode_YearConfig	BudgetCode_YearConfig	URITP Budget.fmp12	
Budget_Allocation=BudgetCode_YearConfig
BudgetCode_YearConfig=BudgetCode_Defintions
Fiscal_Years_forBudgetCodeConfigs=BudgetCode_YearConfig
CREATE Budget Code Year Config Snapshot
BudgetCode_YearConfig::calc_CodeHundred
BudgetCode_YearConfig::calc_CodeTen
BudgetCode_YearConfig::auto_DisplayName
popupV_BudgetCode_fromCurrentConfig
(table) Budget Code Year Configs
Budget_Allocation	Budget_Allocation	URITP Budget.fmp12	
BUDGET_AllocationVersions=Budget_Allocation
Budget_Allocation=Budget_Allocation_OthersCodes
Budget_Allocation=BudgetCode_YearConfig
goToRelatedAllocations
assignToCurrent
commitSummaryButtonTriggerFY26
commitSummaryButtonTrigger CopyFY26
sortByNMAllocation
findAllocation
newAllocationWcurrent
showOnlyActiveAllocation
Budget_Codes_Defintions::calcTotalAllocation
(Layout) NM Allocation Format Copy
(form) Budget HISTORY
(form) Budget Versions
(form) CODED Transactions
(Layout) NM Allocation Format
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
(PRINT) CODED Transactions Copy
BUDGET_AllocationVersions	BUDGET_Versions	URITP Budget.fmp12	
BUDGET_AllocationVersions=Budget_Allocation
Fiscal_Years_forBudgetVersions=BUDGET_AllocationVersions
ui_GLOBAL_BudgetHub=BUDGET_AllocationVersions
BUDGET_Versions_selfSuperseed=BUDGET_AllocationVersions
showOnly_CurrentAllocation
BudgetVersionBY_SortOrder
DuplicateWRelated
sort | Budget Allocation VERSIONS
BUDGET_Versions::SORT_ORDER
BUDGET_VERSIONS
(form) Budget HISTORY
(form) Budget Versions
File SETUP
gBudget Codes
(List) Budget Versions
Import_URF0989	Import_URF0989	URITP Budget.fmp12	
fURF0989_UR_Company=Import_URF0989
fURF0989_UR_CostCenter=Import_URF0989
fURF0989_UR_OperatingLineFAO=Import_URF0989
fURF0989_UR_Fund=Import_URF0989
fURF0989_UR_LedgerAccount=Import_URF0989
fURF0989_UR_SpendRevenueCategory=Import_URF0989
fURF0989_IMPORT_SESSIONS=Import_URF0989
Import_URF0989
fURF0989_IMPORT_SESSIONS	IMPORT_SESSIONS	URITP Budget.fmp12	
fURF0989_IMPORT_SESSIONS=Import_URF0989
fURF0989_UR_SpendRevenueCategory	UR_SpendRevenueCategory	URITP Budget.fmp12	
fURF0989_UR_SpendRevenueCategory=Import_URF0989
fURF0989_UR_LedgerAccount	UR_LedgerAccount	URITP Budget.fmp12	
fURF0989_UR_LedgerAccount=Import_URF0989
UR_LedgerAccount::auto_DisplayName
fURF0989_UR_LedgerAccount
fURF0989_UR_Fund	UR_Fund	URITP Budget.fmp12	
fURF0989_UR_Fund=Import_URF0989
UR_Fund::auto_DisplayName
fURF0989_UR_Fund
fURF0989_UR_OperatingLineFAO	UR_OperatingLineFAO	URITP Budget.fmp12	
fURF0989_UR_OperatingLineFAO=Import_URF0989
fURF0989_UR_CostCenter	UR_CostCenter	URITP Budget.fmp12	
fURF0989_UR_CostCenter=Import_URF0989
UR_CostCenter::auto_DisplayName
fURF0989_UR_CostCenter
fURF0989_UR_Company	UR_Company	URITP Budget.fmp12	
fURF0989_UR_Company=Import_URF0989
UR_Company::auto_DisplayName
fURF0989_UR_Company
Fiscal_Years_forBudgetVersions	FISCAL_YEARS	Data Source: URITP Global Setup	
Fiscal_Years_forBudgetVersions=BUDGET_AllocationVersions
sort | Budget Allocation VERSIONS
self_BudgetCodes_byCode	Budget_Codes_Defintions	URITP Budget.fmp12	
BudgetCode_Defintions=self_BudgetCodes_byCode
Print BUDGET CODES
ufile_ValueLISTS	zfile_ValueLISTS	URITP Budget.fmp12	
ufile_ValueLISTS=ufile_Values
commitRecord
zfile_Values::fkStatusCATEGORY
popupV_ValueLists
(table) values
Value Lists
eds_Departments	DEPARTMENTS	Data Source: URITP Global Setup	
ui_GLOBAL_BudgetHub	GLOBAL_USE_VARIABLES	URITP Budget.fmp12	
ui_GLOBAL_BudgetHub=Fiscal_Years_forCurrent
ui_GLOBAL_BudgetHub=BUDGET_AllocationVersions
save zBACKUP | File
set G | SELECTED CODE
set G | SELECTED Version from gFY
select | g FISCAL YEAR
showOnly_CurrentAllocation
assignToCurrent
showOnlyActiveAllocation
Value Lists
File SETUP
GLOBAL_VARIABLES | Imported
gBudget Codes
ui_GLOBAL_BudgetHub
(form) CODED Transactions
(form) URITP Budget Code
CODED Ledgers
(PRINT) CODED Transactions Copy
Budget_ContextSuffixDefinitions_forFiltering	Budget_ContextSuffixDefinitions	URITP Budget.fmp12	
Budget_ContextSuffixDefinitions_forFiltering=Budget_FamilyDefintions
sort | Budget Code SUFFIXES
Budget_ContextSuffixDefinitions::calcViz_code
popup_BudgetCodeContextSUFFIX_filtered
(table) Budget SUFFIX Definitions
Budget_ContextDefinitions_forFiltering	Budget_ContextDefinitions	URITP Budget.fmp12	
Budget_ContextDefinitions_forFiltering=Budget_FamilyDefintions
sort | Budget Code SUFFIXES
sort | Budget Code SUFFIXES Copy
Budget_ContextDefinitions::calcViz_code
popup_BudgetCodeCONTEXTS_FilteredbyFamily
(table) Budget CONTEXT Definitions
Budget_FamilyDefintions_forFiltering	Budget_FamilyDefintions	URITP Budget.fmp12	
Budget_ContextDefinitions::calcViz_code
Budget_ContextSuffixDefinitions::calcViz_code
Budget_FamilyDefintions	Budget_FamilyDefintions	URITP Budget.fmp12	
Budget_FamilyDefintions=BudgetCode_Defintions
Budget_ContextSuffixDefinitions_forFiltering=Budget_FamilyDefintions
Budget_ContextDefinitions_forFiltering=Budget_FamilyDefintions
sort | Budget Code SUFFIXES
sort | Budget Code SUFFIXES Copy
sort | Budget Code Assignment Join
BudgetCode_YearConfig::calc_CodeInCurrentConfig
Budget_Codes_Defintions::calc_ExpectedCode
Budget_FamilyDefintions::calc_DigitsAsText
Budget_FamilyDefintions::auto_PopupName
popup_BudgetFAMILIES
(table) Generate Budget Codes
(table) Budget FAMILY Definitions
GLOBAL_forIMPORTING	GLOBAL_USE_VARIABLES	URITP Budget.fmp12	
Budget_ContextSuffix_forPopup	Budget_ContextSuffixDefinitions	URITP Budget.fmp12	
Budget_ContextSuffix_forPopup=BudgetCode_Defintions
popup_BudgetSUFFIX_byFamily
Budget_ContextSuffixDefinitions	Budget_ContextSuffixDefinitions	URITP Budget.fmp12	
BudgetCode_Defintions=Budget_ContextSuffixDefinitions
sort | Budget Code Assignment Join
BudgetCode_YearConfig::calc_CodeInCurrentConfig
Budget_Codes_Defintions::calc_ExpectedCode
Budget_ContextSuffixDefinitions::calc_DigitsAsText
OP_Lines	UR_OperatingLineFAO	URITP Budget.fmp12	
OP_Lines=BudgetCode_Defintions
UR_OperatingLineFAO::auto_DisplayName
popup_OPLines
UR_OperatingLines_FAOs
Budget_Contexts_forPopup	Budget_ContextDefinitions	URITP Budget.fmp12	
Budget_Contexts_forPopup=BudgetCode_Defintions
BudgetCode_Header_Categories	BudgetCode_Header_Categories	URITP Budget.fmp12	
BudgetCode_Defintions=BudgetCode_Header_Categories
Budget_ContextDefinitions	Budget_ContextDefinitions	URITP Budget.fmp12	
Budget_ContextDefinitions=BudgetCode_Defintions
sort | Budget Code Assignment Join
BudgetCode_YearConfig::calc_CodeInCurrentConfig
Budget_Codes_Defintions::calc_ExpectedCode
Budget_ContextDefinitions::calc_DigitsAsText
Budget_ContextDefinitions::auto_popupName
popup_BudgetCodeCONTEXTS
values_ImportSessionStatuses	GLOBAL_USE_VARIABLES	URITP Budget.fmp12	
values_ImportSessionStatuses=ufile_Values
ufile_Values	zfile_Values	URITP Budget.fmp12	
ufile_ValuesSelfStatusCategories=ufile_Values
ufile_ValueLISTS=ufile_Values
values_ImportStatuses=ufile_Values
values_StatusCategories=ufile_Values
values_BudgetVersions=ufile_Values
values_List2=ufile_Values
ufile_Values_OtherSameListSameCategory∞ufile_Values
values_ImportSessionStatuses=ufile_Values
zfile_ValueLISTS::sCount_Values
zfile_Values::fkStatusCATEGORY
popupV_StatusCategories
popupV_ImportSessionStatuses
popupV_BudgetVersions
popupV_List2
popupV_ImportStatuses
(table) values
Value Lists
ufile_ValuesSelfStatusCategories	zfile_Values	URITP Budget.fmp12	
ufile_ValuesSelfStatusCategories=ufile_Values
Value Lists
values_ImportStatuses	GLOBAL_USE_VARIABLES	URITP Budget.fmp12	
values_ImportStatuses=ufile_Values
ufile_Values_OtherSameListSameCategory	zfile_Values	URITP Budget.fmp12	
ufile_Values_OtherSameListSameCategory∞ufile_Values
zfile_Values::fkStatusCATEGORY
values_List2 2	GLOBAL_USE_VARIABLES	URITP Budget.fmp12	
values_BudgetVersions	GLOBAL_USE_VARIABLES	URITP Budget.fmp12	
values_BudgetVersions=ufile_Values
values_List2	GLOBAL_USE_VARIABLES	URITP Budget.fmp12	
values_List2=ufile_Values
values_StatusCategories	GLOBAL_USE_VARIABLES	URITP Budget.fmp12	
values_StatusCategories=ufile_Values
Code_Definitions	Budget_Codes_Defintions	URITP Budget.fmp12	
Code_Definitions=URF_CODED_TRANSACTIONS
useSelectedCode
goToCode
POPUP_selectCODE
goToCodedTransactions
(form) CODED Transactions
UNASSIGNED
CodeSelectionPOPUP
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
URF_CODED_TRANSACTIONS	URF_CODED_TRANSACTIONS	URITP Budget.fmp12	
URF_CODED_TRANSACTIONS=URF_ROW_ASSIGNMENTS
Code_Definitions=URF_CODED_TRANSACTIONS
URF_CODED_TRANSACTIONS
SpecificBudgetCode_forURF_Assigning	BudgetCode_YearConfig	URITP Budget.fmp12	
SpecificBudgetCode_forURF_Assigning=URF_ROW_ASSIGNMENTS
URF_ROW_ASSIGNMENTS	URF_ROW_ASSIGNMENTS	URITP Budget.fmp12	
URF_IMPORT_ROWS=URF_ROW_ASSIGNMENTS
URF_CODED_TRANSACTIONS=URF_ROW_ASSIGNMENTS
SpecificBudgetCode_forURF_Assigning=URF_ROW_ASSIGNMENTS
URF_ROW_ASSIGNMENTS
URF_IMPORT_ROWS	IMPORT_URF0985	URITP Budget.fmp12	
URF_IMPORT_ROWS=IMPORT_SESSIONS
URF_IMPORT_ROWS=URF_ROW_ASSIGNMENTS
Create_New_URF_Import
IMPORT_rows_to_URF0985
showUNASSIGNED
showUNASSIGNED Copy
useSelectedCode
POPUP_selectCODE
REPLACE_fkBudgetCode
COPY_code
PASTE_code
buttonPassCodeNum
enterLayoutSpecificCodeURF
FilterSingleCodeASK
Budget_Codes_Defintions::xxFY26_Spent
IMPORT_URF0985::calc_NormalizedReference
IMPORT_URF0985::calc_NormalizedBusinessDocument
IMPORT_URF0985::calc_NormalizedSupplier
IMPORT_URF0985::calc_NormalizedLineMemo
IMPORT_URF0985::calc_sourceUKey_LineFingerprint
IMPORT_URF0985::calc_sourceUKey_DocumentFingerprint
IMPORT_URF0985::xxURF_UNIQUE
Ledger Accounts
FAC Names
(table) Import URF LINES
(table) Import URF LINES Excel
(form) CODED Transactions
URF_IMPORT_ROWS
URF_IMPORT Copy
URF_UNIQUE
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
IMPORT_SESSIONS	IMPORT_SESSIONS	URITP Budget.fmp12	
URF_IMPORT_ROWS=IMPORT_SESSIONS
Fiscal_Years_forImports=IMPORT_SESSIONS
CumSale_LABOUR=IMPORT_SESSIONS
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_SESSIONS::auto_Filename
IMPORT_SESSIONS::auto_FilesizeKB
(table) Import SESSIONS URF
IMPORT_SESSIONS
Budget_Supervisors	Budget_Supervisors	URITP Budget.fmp12	
Budget_Supervisors=BudgetCode_Defintions
BudgetCodes_forDefaultOthersCodes	Budget_Codes_Defintions	URITP Budget.fmp12	
BudgetCodes_forDefaultOthersCodes=Budget_Allocation_OthersCodes
Budget_Allocation_OthersCodes	Budget_Allocation_OthersCodes	URITP Budget.fmp12	
UR_SpendRevenueCategory=Budget_Allocation_OthersCodes
Budget_Allocation=Budget_Allocation_OthersCodes
BudgetCodes_forDefaultOthersCodes=Budget_Allocation_OthersCodes
(tabel) Codes tht Others Use
UR_SpendRevenueCategory	UR_SpendRevenueCategory	URITP Budget.fmp12	
UR_SpendRevenueCategory=Budget_Allocation_OthersCodes
UR_SpendRevenueCategory::auto_DisplayName
popup_SpendCategories
UR_Spend_Categories
Fiscal_Years_forCurrent	FISCAL_YEARS	Data Source: URITP Global Setup	
ui_GLOBAL_BudgetHub=Fiscal_Years_forCurrent
file_WorkNotes	file_WorkNotes	URITP Budget.fmp12	
file_WorkNotes
ui_ValueLISTS	zfile_ValueLISTS	URITP Budget.fmp12	
ui_ValueLISTS=ui_Values
ui_Values	zfile_Values	URITP Budget.fmp12	
ui_ValueLISTS=ui_Values
ui_ValuesSelfStatusCategories=ui_Values
ui_ValuesSelfStatusCategories	zfile_Values	URITP Budget.fmp12	
ui_ValuesSelfStatusCategories=ui_Values
XX_GLOBAL_PrintingVariables	XX_GLOBAL_PrintingVariables	URITP Budget.fmp12	
SortbyCode100
SortedbyCode10
SortedbyCode10 Copy
SortedbyHeader
XX_GLOBAL_PrintingVariables
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
XX_GLOBAL_fileSetup	XX_GLOBAL_fileSetup	URITP Budget.fmp12	
GLOBAL_VARIABLES | Imported
ui_GLOBAL_BudgetHub
XX_GLOBAL_fileSetup
XXlocalFiscal_Years	XXFiscal Years	URITP Budget.fmp12	
(popup) Fiscal Year
popupEDS_FiscalYears
GLOBAL_USE_VARIABLES	GLOBAL_USE_VARIABLES	URITP Budget.fmp12	
lastWindowClose
set G | FILE RECORD STATS
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_URF_Preflight_Profile
IMPORT_rows_to_URF0985
CREATE Budget Code Year Config Snapshot
BudgetCode_YearConfig::fkFiscalYear
(table) Budget Code Year Configs
Value Lists
GLOBAL_scriptVariables	GLOBAL_scriptVariabls	URITP Budget.fmp12	
FilterSingleCodeASK
getCODEpk
GLOBAL_scriptVariables
CumSale_LABOUR	Import_CumSaleLABOUR	URITP Budget.fmp12	
CumSale_LABOUR=URITPCodes_forCodingCumSale
CumSale_LABOUR=IMPORT_SESSIONS
Budget_Codes_Defintions::xxFY26_Spent
(form) CODED Transactions
CumSale_LABOUR
URITPCodes_forCodingCumSale	Budget_Codes_Defintions	URITP Budget.fmp12	
CumSale_LABOUR=URITPCodes_forCodingCumSale
Fiscal_Years_forImports	FISCAL_YEARS	Data Source: URITP Global Setup	
Fiscal_Years_forImports=IMPORT_SESSIONS
eds_URITP_GLOBAL_Variables	GLOBAL_USAGE_VARIABLES	Data Source: URITP Global Setup	
IMPORT_URF_Create_Session
eds_Fiscal_Years	FISCAL_YEARS	Data Source: URITP Global Setup	
viewEXT_Fiscal_Years
Relationships: Details

Relationship: BUDGET_AllocationVersions=Budget_Allocation

Table Occurrence	BUDGET_AllocationVersions		Budget_Allocation
Field	PrimaryKey	=	fkBudgetVersion
Source Table	BUDGET_Versions		Budget_Allocation
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		On
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: BudgetCode_Defintions=BudgetCode_Header_Categories

Table Occurrence	BudgetCode_Defintions		BudgetCode_Header_Categories
Field	xx_fkDefaultHeaderCategory	=	PrimaryKey
Source Table	Budget_Codes_Defintions		BudgetCode_Header_Categories
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Fiscal_Years_forBudgetVersions=BUDGET_AllocationVersions

Table Occurrence	Fiscal_Years_forBudgetVersions		BUDGET_AllocationVersions
Field	PrimaryKey	=	fkFiscalYear
Source Table	FISCAL_YEARS		BUDGET_Versions
Source File	Data Source: URITP Global Setup		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Budget_Supervisors=BudgetCode_Defintions

Table Occurrence	Budget_Supervisors		BudgetCode_Defintions
Field	CreationTimestamp	=	fkOWNER
Source Table	Budget_Supervisors		Budget_Codes_Defintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: URF_IMPORT_ROWS=IMPORT_SESSIONS

Table Occurrence	URF_IMPORT_ROWS		IMPORT_SESSIONS
Field	fkImportSession	=	PrimaryKey
Source Table	IMPORT_URF0985		IMPORT_SESSIONS
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Fiscal_Years_forImports=IMPORT_SESSIONS

Table Occurrence	Fiscal_Years_forImports		IMPORT_SESSIONS
Field	PrimaryKey	=	fkFiscalYear
Source Table	FISCAL_YEARS		IMPORT_SESSIONS
Source File	Data Source: URITP Global Setup		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: CumSale_LABOUR=URITPCodes_forCodingCumSale

Table Occurrence	CumSale_LABOUR		URITPCodes_forCodingCumSale
Field	fkBudgetCode	=	PrimaryKey
Source Table	Import_CumSaleLABOUR		Budget_Codes_Defintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: CumSale_LABOUR=IMPORT_SESSIONS

Table Occurrence	CumSale_LABOUR		IMPORT_SESSIONS
Field	fkImportSession	=	PrimaryKey
Source Table	Import_CumSaleLABOUR		IMPORT_SESSIONS
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: ui_GLOBAL_BudgetHub=Fiscal_Years_forCurrent

Table Occurrence	ui_GLOBAL_BudgetHub		Fiscal_Years_forCurrent
Field	g_fkSelectedFiscalYear	=	PrimaryKey
Source Table	GLOBAL_USE_VARIABLES		FISCAL_YEARS
Source File	URITP Budget.fmp12		Data Source: URITP Global Setup
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: ui_GLOBAL_BudgetHub=BUDGET_AllocationVersions

Table Occurrence	ui_GLOBAL_BudgetHub		BUDGET_AllocationVersions
Field	g_fkSelectedBudgetVersion	=	PrimaryKey
Source Table	GLOBAL_USE_VARIABLES		BUDGET_Versions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: BUDGET_Versions_selfSuperseed=BUDGET_AllocationVersions

Table Occurrence	BUDGET_Versions_selfSuperseed		BUDGET_AllocationVersions
Field	PrimaryKey	=	fkSuperseededBy
Source Table	BUDGET_Versions		BUDGET_Versions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: ufile_ValuesSelfStatusCategories=ufile_Values

Table Occurrence	ufile_ValuesSelfStatusCategories		ufile_Values
Field	PrimaryKey	=	fkStatusCATEGORY
Source Table	zfile_Values		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: ufile_ValueLISTS=ufile_Values

Table Occurrence	ufile_ValueLISTS		ufile_Values
Field	PrimaryKey	=	fkList
Source Table	zfile_ValueLISTS		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		On
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: ui_ValueLISTS=ui_Values

Table Occurrence	ui_ValueLISTS		ui_Values
Field	PrimaryKey	=	fkList
Source Table	zfile_ValueLISTS		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		On
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: ui_ValuesSelfStatusCategories=ui_Values

Table Occurrence	ui_ValuesSelfStatusCategories		ui_Values
Field	PrimaryKey	=	fkStatusCATEGORY
Source Table	zfile_Values		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: UR_SpendRevenueCategory=Budget_Allocation_OthersCodes

Table Occurrence	UR_SpendRevenueCategory		Budget_Allocation_OthersCodes
Field	PrimaryKey	=	fkDefaultSpendCategory
Source Table	UR_SpendRevenueCategory		Budget_Allocation_OthersCodes
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Budget_Allocation=Budget_Allocation_OthersCodes

Table Occurrence	Budget_Allocation		Budget_Allocation_OthersCodes
Field	fkDefaultExtAllocation	=	PrimaryKey
Source Table	Budget_Allocation		Budget_Allocation_OthersCodes
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: BudgetCodes_forDefaultOthersCodes=Budget_Allocation_OthersCodes

Table Occurrence	BudgetCodes_forDefaultOthersCodes		Budget_Allocation_OthersCodes
Field	PrimaryKey	=	fkDefaultURITPBudgetCode
Source Table	Budget_Codes_Defintions		Budget_Allocation_OthersCodes
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: OP_Lines=BudgetCode_Defintions

Table Occurrence	OP_Lines		BudgetCode_Defintions
Field	PrimaryKey	=	fkUROperatingLine
Source Table	UR_OperatingLineFAO		Budget_Codes_Defintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Budget_ContextDefinitions=BudgetCode_Defintions

Table Occurrence	Budget_ContextDefinitions		BudgetCode_Defintions
Field	PrimaryKey	=	fkBudget_CONTEXT
Source Table	Budget_ContextDefinitions		Budget_Codes_Defintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: BudgetCode_Defintions=Budget_ContextSuffixDefinitions

Table Occurrence	BudgetCode_Defintions		Budget_ContextSuffixDefinitions
Field	fkBudget_SUFFIX	=	PrimaryKey
Source Table	Budget_Codes_Defintions		Budget_ContextSuffixDefinitions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Budget_Allocation=BudgetCode_YearConfig

Table Occurrence	Budget_Allocation		BudgetCode_YearConfig
Field	fkBudgetCode	=	PrimaryKey
Source Table	Budget_Allocation		BudgetCode_YearConfig
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: BudgetCode_YearConfig=BudgetCode_Defintions

Table Occurrence	BudgetCode_YearConfig		BudgetCode_Defintions
Field	fkBudgetCodeDefinition	=	PrimaryKey
Source Table	BudgetCode_YearConfig		Budget_Codes_Defintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Budget_FamilyDefintions=BudgetCode_Defintions

Table Occurrence	Budget_FamilyDefintions		BudgetCode_Defintions
Field	PrimaryKey	=	fkBudget_FAMILY
Source Table	Budget_FamilyDefintions		Budget_Codes_Defintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: URF_IMPORT_ROWS=URF_ROW_ASSIGNMENTS

Table Occurrence	URF_IMPORT_ROWS		URF_ROW_ASSIGNMENTS
Field	PrimaryKey	=	fkURFImportRow
Source Table	IMPORT_URF0985		URF_ROW_ASSIGNMENTS
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: URF_CODED_TRANSACTIONS=URF_ROW_ASSIGNMENTS

Table Occurrence	URF_CODED_TRANSACTIONS		URF_ROW_ASSIGNMENTS
Field	fkAssignment	=	PrimaryKey
Source Table	URF_CODED_TRANSACTIONS		URF_ROW_ASSIGNMENTS
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: SpecificBudgetCode_forURF_Assigning=URF_ROW_ASSIGNMENTS

Table Occurrence	SpecificBudgetCode_forURF_Assigning		URF_ROW_ASSIGNMENTS
Field	PrimaryKey	=	fkBudgetCode
Source Table	BudgetCode_YearConfig		URF_ROW_ASSIGNMENTS
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Code_Definitions=URF_CODED_TRANSACTIONS

Table Occurrence	Code_Definitions		URF_CODED_TRANSACTIONS
Field	PrimaryKey	=	fkDefaultCode
Source Table	Budget_Codes_Defintions		URF_CODED_TRANSACTIONS
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: values_ImportStatuses=ufile_Values

Table Occurrence	values_ImportStatuses		ufile_Values
Field	gLIST_ImportStatuses	=	fkList
Source Table	GLOBAL_USE_VARIABLES		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: values_StatusCategories=ufile_Values

Table Occurrence	values_StatusCategories		ufile_Values
Field	gLIST_StatusGROUPS	=	fkList
Source Table	GLOBAL_USE_VARIABLES		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: values_BudgetVersions=ufile_Values

Table Occurrence	values_BudgetVersions		ufile_Values
Field	gLIST_BudgetVersions	=	fkList
Source Table	GLOBAL_USE_VARIABLES		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: values_List2=ufile_Values

Table Occurrence	values_List2		ufile_Values
Field	gLIST_2	=	fkList
Source Table	GLOBAL_USE_VARIABLES		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: ufile_Values_OtherSameListSameCategory∞ufile_Values

Table Occurrence	ufile_Values_OtherSameListSameCategory		ufile_Values
Field	fkList	=	fkList
and	fkStatusCATEGORY	=	fkStatusCATEGORY
and	PrimaryKey	!=	PrimaryKey
Source Table	zfile_Values		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: values_ImportSessionStatuses=ufile_Values

Table Occurrence	values_ImportSessionStatuses		ufile_Values
Field	gLIST_ImportSessionStatuses	=	fkList
Source Table	GLOBAL_USE_VARIABLES		zfile_Values
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Budget_Contexts_forPopup=BudgetCode_Defintions

Table Occurrence	Budget_Contexts_forPopup		BudgetCode_Defintions
Field	fkFamily_forContext	=	fkBudget_FAMILY
Source Table	Budget_ContextDefinitions		Budget_Codes_Defintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Budget_ContextSuffix_forPopup=BudgetCode_Defintions

Table Occurrence	Budget_ContextSuffix_forPopup		BudgetCode_Defintions
Field	fkFamily_forSubContext	=	fkBudget_FAMILY
Source Table	Budget_ContextSuffixDefinitions		Budget_Codes_Defintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Budget_ContextSuffixDefinitions_forFiltering=Budget_FamilyDefintions

Table Occurrence	Budget_ContextSuffixDefinitions_forFiltering		Budget_FamilyDefintions
Field	fkFamily_forSubContext	=	PrimaryKey
Source Table	Budget_ContextSuffixDefinitions		Budget_FamilyDefintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Budget_ContextDefinitions_forFiltering=Budget_FamilyDefintions

Table Occurrence	Budget_ContextDefinitions_forFiltering		Budget_FamilyDefintions
Field	fkFamily_forContext	=	PrimaryKey
Source Table	Budget_ContextDefinitions		Budget_FamilyDefintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: BudgetCode_Defintions=self_BudgetCodes_byCode

Table Occurrence	BudgetCode_Defintions		self_BudgetCodes_byCode
Field	display_CodeCurrent	=	display_CodeCurrent
Source Table	Budget_Codes_Defintions		Budget_Codes_Defintions
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Fiscal_Years_forBudgetCodeConfigs=BudgetCode_YearConfig

Table Occurrence	Fiscal_Years_forBudgetCodeConfigs		BudgetCode_YearConfig
Field	PrimaryKey	=	fkFiscalYear
Source Table	FISCAL_YEARS		BudgetCode_YearConfig
Source File	Data Source: URITP Global Setup		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: fURF0989_UR_Company=Import_URF0989

Table Occurrence	fURF0989_UR_Company		Import_URF0989
Field	PrimaryKey	=	fkCompany
Source Table	UR_Company		Import_URF0989
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: fURF0989_UR_CostCenter=Import_URF0989

Table Occurrence	fURF0989_UR_CostCenter		Import_URF0989
Field	PrimaryKey	=	fkCostCenter
Source Table	UR_CostCenter		Import_URF0989
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: fURF0989_UR_OperatingLineFAO=Import_URF0989

Table Occurrence	fURF0989_UR_OperatingLineFAO		Import_URF0989
Field	PrimaryKey	=	fkFAO
Source Table	UR_OperatingLineFAO		Import_URF0989
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: fURF0989_UR_Fund=Import_URF0989

Table Occurrence	fURF0989_UR_Fund		Import_URF0989
Field	PrimaryKey	=	fkFund
Source Table	UR_Fund		Import_URF0989
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: fURF0989_UR_LedgerAccount=Import_URF0989

Table Occurrence	fURF0989_UR_LedgerAccount		Import_URF0989
Field	PrimaryKey	=	fkLedgerAccount
Source Table	UR_LedgerAccount		Import_URF0989
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: fURF0989_UR_SpendRevenueCategory=Import_URF0989

Table Occurrence	fURF0989_UR_SpendRevenueCategory		Import_URF0989
Field	PrimaryKey	=	fkSpendCategory
Source Table	UR_SpendRevenueCategory		Import_URF0989
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: fURF0989_IMPORT_SESSIONS=Import_URF0989

Table Occurrence	fURF0989_IMPORT_SESSIONS		Import_URF0989
Field	PrimaryKey	=	fkImportSession
Source Table	IMPORT_SESSIONS		Import_URF0989
Source File	URITP Budget.fmp12		URITP Budget.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Layouts

Layout Hierarchy

view
viewEXT_Fiscal_Years
(table) values
UR Workday
Operating Lines FOAs
UR_OperatingLines_FAOs
fURF0989_UR_Company
fURF0989_UR_CostCenter
fURF0989_UR_Fund
fURF0989_UR_LedgerAccount
Spend Categories
UR_Spend_Categories
ALLOCATION
(Layout) NM Allocation Format Copy
(form) Budget HISTORY
(tabel) Codes tht Others Use
Code generation
(table) Generate Budget Codes
(table) Budget FAMILY Definitions
(table) Budget CONTEXT Definitions
(table) Budget SUFFIX Definitions
(table) Budget Code Year Configs
Value Lists
utility
(form) Budget Versions
(table) URITP Budget Codes
SETUP Globals and Values
File SETUP
EDS
GLOBAL_VARIABLES | Imported
PRINT
Print BUDGET CODES
URF
(table) Import SESSIONS URF
(table) Import URF LINES
(table) Import URF LINES Excel
URF_ROW_ASSIGNMENTS
URF_CODED_TRANSACTIONS
zPREV
gBudget Codes
SETUP
ui_GLOBAL_BudgetHub
relegate_Supervisors
(Setup) Code Header Categories
-
GLOBAL_scriptVariables
setup_Import/Export
XXimport_URF_AUX
XX_GLOBAL_PrintingVariables
-
URITP CODES
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
(form) CODED Transactions
ALLOCATING
Budget Versions
(List) Budget Versions
NIGEL's ALLOCATIONS
(Layout) NM Allocation Format
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
-
Importing Data
URF
URF_IMPORT_ROWS
URF_IMPORT Copy
URF_UNIQUE
Assigning Codes
UNASSIGNED
CodeSelectionPOPUP
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
CODED Ledgers
PRINT CODED TRANSACTIONS
(PRINT) CODED Transactions Copy
CumSale_LABOUR
PRINTS/EXPORTS
-
DIAGRAMING and NOTES
file_WorkNotes
XX_GLOBAL_fileSetup
IMPORT_SESSIONS
Import_URF0989

Layout Name	Include In Menu	Quick Find	# of Objects	Show Records From	Save record changes automatically	Show field frames when record is active	Show field frames only on current record	Show current record indicator in List View	Used in Scripts	Custom Menu Set	Script Triggers	Theme ID
viewEXT_Fiscal_Years	Yes	Yes	
5 Regular Fields
eds_Fiscal_Years	On	Off	Off	On		[File Default]		03
(table) values	Yes	Yes	
6 Regular Fields
ufile_Values	On	Off	On	On		[File Default]		04
UR_OperatingLines_FAOs	Yes	Yes	
4 Regular Fields
OP_Lines	On	Off	On	On		[File Default]		01
fURF0989_UR_Company	Yes	Yes	
3 Regular Fields
fURF0989_UR_Company	On	Off	On	On		[File Default]		01
fURF0989_UR_CostCenter	Yes	Yes	
4 Regular Fields
fURF0989_UR_CostCenter	On	Off	On	On		[File Default]		01
fURF0989_UR_Fund	Yes	Yes	
3 Regular Fields
fURF0989_UR_Fund	On	Off	On	On		[File Default]		01
fURF0989_UR_LedgerAccount	Yes	Yes	
3 Regular Fields
fURF0989_UR_LedgerAccount	On	Off	On	On		[File Default]		01
UR_Spend_Categories	Yes	Yes	
4 Regular Fields
UR_SpendRevenueCategory	On	Off	On	On		[File Default]		01
(Layout) NM Allocation Format Copy	Yes	Yes	
12 Regular Fields
6 Buttons
1 Popover Buttons
4 Button Bars
BUDGET_AllocationVersions	On	Off	Off	Off		[File Default]		03
(form) Budget HISTORY	Yes	Yes	
16 Regular Fields
6 Buttons
1 Popover Buttons
3 Button Bars
3 Portals
BUDGET_AllocationVersions	On	Off	Off	On		[File Default]		03
(tabel) Codes tht Others Use	Yes	Yes	
4 Regular Fields
Budget_Allocation_OthersCodes	On	Off	On	On		[File Default]		04
(table) Generate Budget Codes	Yes	Yes	
11 Regular Fields
3 Buttons
3 Button Bars
BudgetCode_Defintions	On	Off	On	On	
CREATE Budget Code Year Config Snapshot
[File Default]		02
(table) Budget FAMILY Definitions	Yes	Yes	
5 Regular Fields
1 Merge Fields
Budget_FamilyDefintions	On	Off	On	On		[File Default]		04
(table) Budget CONTEXT Definitions	Yes	Yes	
7 Regular Fields
1 Merge Fields
1 Buttons
1 Button Bars
Budget_ContextDefinitions_forFiltering	On	Off	On	On		[File Default]		04
(table) Budget SUFFIX Definitions	Yes	Yes	
5 Regular Fields
1 Merge Fields
1 Buttons
1 Button Bars
Budget_ContextSuffixDefinitions_forFiltering	On	Off	On	On		[File Default]		04
(table) Budget Code Year Configs	Yes	Yes	
7 Regular Fields
1 Buttons
1 Button Bars
BudgetCode_YearConfig	On	Off	On	On		[File Default]		04
Value Lists	Yes	Yes	
29 Regular Fields
5 Merge Fields
3 Buttons
3 Popover Buttons
6 Button Bars
2 Portals
1 Graphic Objects
ufile_ValueLISTS	On	Off	On	On		[File Default]	
OnLayoutEnter
Script: enter | GLOBAL SETUP
Modes: Browse, Find
04
(form) Budget Versions	Yes	Yes	
12 Regular Fields
6 Buttons
3 Button Bars
2 Portals
BUDGET_AllocationVersions	On	Off	Off	On	
showOnly_CurrentAllocation
[File Default]		03
(table) URITP Budget Codes	Yes	Yes	
17 Regular Fields
BudgetCode_Defintions	On	Off	Off	On	
buttonPassCodeNum
getCODEpk
[File Default]	
OnLayoutEnter
Script: SORT_BudgetCodes
Modes: Browse
03
File SETUP	Yes	Yes	
18 Regular Fields
1 Merge Fields
2 Buttons
1 Popover Buttons
3 Button Bars
1 Portals
1 Tab Controls
ui_GLOBAL_BudgetHub	On	Off	On	On		[File Default]	
OnLayoutEnter
Script: enter | GLOBAL SETUP
Modes: Browse, Find
04
GLOBAL_VARIABLES | Imported	Yes	Yes	
6 Regular Fields
eds_URITP_GLOBAL_Variables	On	Off	On	On		[File Default]		03
Print BUDGET CODES	Yes	Yes	
12 Regular Fields
2 Buttons
1 Popover Buttons
3 Button Bars
1 Graphic Objects
BudgetCode_Defintions	On	Off	Off	Off		[File Default]		02
(table) Import SESSIONS URF	Yes	Yes	
8 Regular Fields
IMPORT_SESSIONS	On	Off	On	On	
Create_New_URF_Import
IMPORT_URF_Create_Session
[File Default]		04
(table) Import URF LINES	Yes	Yes	
28 Regular Fields
2 Buttons
1 Button Bars
URF_IMPORT_ROWS	On	Off	On	On		[File Default]		04
(table) Import URF LINES Excel	Yes	Yes	
42 Regular Fields
URF_IMPORT_ROWS	On	Off	On	On	
Create_New_URF_Import
IMPORT_rows_to_URF0985
[File Default]		04
URF_ROW_ASSIGNMENTS	Yes	Yes	
13 Regular Fields
URF_ROW_ASSIGNMENTS	On	Off	On	On		[File Default]		01
URF_CODED_TRANSACTIONS	Yes	Yes	
10 Regular Fields
URF_CODED_TRANSACTIONS	On	Off	On	On		[File Default]		01
gBudget Codes	Yes	Yes	
19 Regular Fields
4 Merge Fields
3 Buttons
1 Popover Buttons
4 Button Bars
2 Portals
1 Tab Controls
ui_GLOBAL_BudgetHub	On	Off	On	On		[File Default]	
OnLayoutEnter
Script: enter | GLOBAL SETUP
Modes: Browse, Find
04
ui_GLOBAL_BudgetHub	Yes	Yes	
5 Regular Fields
ui_GLOBAL_BudgetHub	On	Off	On	On		[File Default]		03
relegate_Supervisors	Yes	Yes	
1 Regular Fields
<Missing Table Occurrence>	On	Off	On	On		[File Default]		03
(Setup) Code Header Categories	Yes	Yes	
2 Regular Fields
<Missing Table Occurrence>	On	Off	On	Off		[File Default]		03
-	Yes	Yes	
BudgetCode_Defintions	On	Off	On	On		[File Default]		01
GLOBAL_scriptVariables	Yes	Yes	
1 Regular Fields
GLOBAL_scriptVariables	On	Off	On	On		[File Default]		01
XXimport_URF_AUX	Yes	Yes	
<Missing Table Occurrence>	On	Off	On	On		[File Default]		01
XX_GLOBAL_PrintingVariables	Yes	Yes	
1 Regular Fields
XX_GLOBAL_PrintingVariables	On	Off	On	On		[File Default]		01
-	Yes	Yes	
URF_IMPORT_ROWS	On	Off	On	On		[File Default]		01
(Print) URITP Budget Codes FY26	Yes	Yes	
32 Regular Fields
5 Merge Fields
7 Buttons
1 Popover Buttons
4 Button Bars
BudgetCode_YearConfig	On	Off	Off	On		[File Default]	
OnLayoutEnter
Script: SORT_BudgetCodes
Modes: Browse
03
(Print) URITP Budget Codes Allocation HISTORY	Yes	Yes	
27 Regular Fields
5 Merge Fields
7 Buttons
1 Popover Buttons
4 Button Bars
<Missing Table Occurrence>	On	Off	Off	On		[File Default]	
OnLayoutEnter
Script: SORT_BudgetCodes
Modes: Browse
03
(form) CODED Transactions	Yes	Yes	
25 Regular Fields
3 Buttons
7 Button Bars
6 Portals
1 Tab Controls
Code_Definitions	On	On	Off	Off	
goToCodedTransactions
[File Default]		03
(List) Budget Versions	Yes	Yes	
7 Regular Fields
1 Buttons
1 Button Bars
BUDGET_AllocationVersions	On	Off	Off	Off		[File Default]	
OnLayoutEnter
Script: BudgetVersionBY_SortOrder
Modes: Browse
OnRecordCommit
Script: BudgetVersionBY_SortOrder
Modes: Browse
03
(Layout) NM Allocation Format	Yes	Yes	
12 Regular Fields
6 Buttons
1 Popover Buttons
4 Button Bars
Budget_Allocation	On	Off	Off	Off	
goToRelatedAllocations
[File Default]		03
(list) individual Allocations	Yes	Yes	
6 Regular Fields
Budget_Allocation	On	Off	Off	On		[File Default]		03
Current_Allocation	Yes	Yes	
12 Regular Fields
5 Buttons
2 Button Bars
Budget_Allocation	On	Off	Off	On		[File Default]		03
(form) URITP Budget Code	Yes	Yes	
25 Regular Fields
4 Buttons
1 Button Bars
5 Portals
1 Tab Controls
1 Graphic Objects
BudgetCode_Defintions	On	On	Off	Off		[File Default]		03
-	Yes	Yes	
URF_IMPORT_ROWS	On	Off	On	On		[File Default]		01
URF_IMPORT_ROWS	Yes	Yes	
3 Regular Fields
URF_IMPORT_ROWS	On	Off	On	On		[File Default]		01
URF_IMPORT Copy	Yes	Yes	
30 Regular Fields
URF_IMPORT_ROWS	On	Off	On	On		[File Default]		01
URF_UNIQUE	Yes	Yes	
4 Regular Fields
URF_IMPORT_ROWS	On	Off	On	Off		[File Default]		01
UNASSIGNED	Yes	Yes	
10 Regular Fields
1 Merge Fields
2 Buttons
2 Button Bars
URF_IMPORT_ROWS	On	Off	Off	Off		[File Default]	
OnLayoutEnter
Script: showUNASSIGNED
Modes: Browse
03
CodeSelectionPOPUP	Yes	Yes	
2 Regular Fields
8 Buttons
3 Button Bars
Code_Definitions	On	Off	Off	On	
POPUP_selectCODE
[File Default]	
OnLayoutEnter
Script: SORT_BudgetCodes
Modes: Browse
03
Batch Assiging Budget Codes	Yes	Yes	
10 Regular Fields
1 Merge Fields
11 Buttons
6 Button Bars
URF_IMPORT_ROWS	On	Off	Off	Off		[File Default]		03
MOBILE Assiging Budget Codes Copy	Yes	Yes	
8 Regular Fields
1 Merge Fields
12 Buttons
6 Button Bars
URF_IMPORT_ROWS	On	Off	Off	Off		[File Default]		03
CODED Ledgers	Yes	Yes	
16 Regular Fields
2 Merge Fields
1 Buttons
2 Button Bars
URF_IMPORT_ROWS	On	On	Off	Off	
Layout #29
[File Default]		02
PRINT CODED TRANSACTIONS	Yes	Yes	
16 Regular Fields
2 Merge Fields
2 Buttons
2 Button Bars
URF_IMPORT_ROWS	On	On	Off	On	
enterLayoutSpecificCodeURF
[File Default]	
OnLayoutEnter
Script: enterLayoutSpecificCodeURF
Modes: Browse
02
(PRINT) CODED Transactions Copy	Yes	Yes	
14 Regular Fields
2 Buttons
2 Button Bars
2 Portals
Code_Definitions	On	On	Off	Off		[File Default]		02
CumSale_LABOUR	Yes	Yes	
5 Regular Fields
2 Merge Fields
1 Buttons
1 Button Bars
CumSale_LABOUR	On	Off	Off	On		[File Default]		03
-	Yes	Yes	
URF_IMPORT_ROWS	On	Off	On	On		[File Default]		01
DIAGRAMING and NOTES	Yes	Yes	
Budget_Allocation	On	Off	On	Off		[File Default]		03
file_WorkNotes	Yes	Yes	
3 Regular Fields
file_WorkNotes	On	Off	Off	On		[File Default]		03
XX_GLOBAL_fileSetup	Yes	Yes	
2 Regular Fields
XX_GLOBAL_fileSetup	On	Off	On	On		[File Default]		01
IMPORT_SESSIONS	Yes	Yes	
7 Regular Fields
IMPORT_SESSIONS	On	Off	On	On		[File Default]		01
Import_URF0989	Yes	Yes	
13 Regular Fields
Import_URF0989	On	Off	On	On		[File Default]		01
Layout Objects: viewEXT_Fiscal_Years

Regular Fields

Field Name: eds_Fiscal_Years::Short_Label
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
viewEXT_Fiscal_Years
Top: 170 pt
Left: 12 pt
Bottom: 191 pt
Right: 88 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: eds_Fiscal_Years::StartDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
viewEXT_Fiscal_Years
Top: 170 pt
Left: 93 pt
Bottom: 191 pt
Right: 214 pt
Anchoring: Left, Top
Field Format:
Drop-down Calendar
Include icon to show and hide calendar
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: eds_Fiscal_Years::EndDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
viewEXT_Fiscal_Years
Top: 170 pt
Left: 226 pt
Bottom: 191 pt
Right: 347 pt
Anchoring: Left, Top
Field Format:
Drop-down Calendar
Include icon to show and hide calendar
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: eds_Fiscal_Years::PrimaryKey
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
viewEXT_Fiscal_Years
Top: 170 pt
Left: 775 pt
Bottom: 191 pt
Right: 989 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: eds_Fiscal_Years::Title_auto
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
viewEXT_Fiscal_Years
Top: 170 pt
Left: 359 pt
Bottom: 191 pt
Right: 637 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: (table) values

Regular Fields

Field Name: ufile_Values::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) values
Top: 178 pt
Left: 152 pt
Bottom: 210 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_Values::sort_order
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) values
Top: 214 pt
Left: 152 pt
Bottom: 246 pt
Right: 253 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_Values::use_Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) values
Top: 250 pt
Left: 152 pt
Bottom: 282 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_Values::fkList
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) values
Top: 286 pt
Left: 152 pt
Bottom: 318 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ValueLists
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_Values::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) values
Top: 467 pt
Left: 125 pt
Bottom: 498 pt
Right: 342 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: ufile_Values::fkStatusCATEGORY
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) values
Hide Condition:
IsEmpty ( ufile_Values::PrimaryKey ) or not ufile_ValueLISTS::is_status_list
Top: 468 pt
Left: 382 pt
Bottom: 498 pt
Right: 517 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_StatusCategories
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: UR_OperatingLines_FAOs

Regular Fields

Field Name: OP_Lines::Title
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UR_OperatingLines_FAOs
Top: 133 pt
Left: 145 pt
Bottom: 164 pt
Right: 398 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: OP_Lines::Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UR_OperatingLines_FAOs
Top: 168 pt
Left: 145 pt
Bottom: 199 pt
Right: 246 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: OP_Lines::auto_DisplayName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UR_OperatingLines_FAOs
Top: 213 pt
Left: 151 pt
Bottom: 244 pt
Right: 404 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: OP_Lines::Code_Prefix
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UR_OperatingLines_FAOs
Top: 248 pt
Left: 151 pt
Bottom: 279 pt
Right: 404 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Layout Objects: fURF0989_UR_Company

Regular Fields

Field Name: fURF0989_UR_Company::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_Company
Top: 114 pt
Left: 138 pt
Bottom: 145 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: fURF0989_UR_Company::Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_Company
Top: 149 pt
Left: 138 pt
Bottom: 180 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: fURF0989_UR_Company::auto_DisplayName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_Company
Top: 184 pt
Left: 138 pt
Bottom: 215 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: fURF0989_UR_CostCenter

Regular Fields

Field Name: fURF0989_UR_CostCenter::auto_DisplayName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_CostCenter
Top: 301 pt
Left: 185 pt
Bottom: 332 pt
Right: 438 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: fURF0989_UR_CostCenter::Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_CostCenter
Top: 161 pt
Left: 185 pt
Bottom: 192 pt
Right: 438 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: fURF0989_UR_CostCenter::Code_Prefix
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_CostCenter
Top: 123 pt
Left: 185 pt
Bottom: 154 pt
Right: 438 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: fURF0989_UR_CostCenter::Title
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_CostCenter
Top: 231 pt
Left: 185 pt
Bottom: 262 pt
Right: 438 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: fURF0989_UR_Fund

Regular Fields

Field Name: fURF0989_UR_Fund::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_Fund
Top: 114 pt
Left: 138 pt
Bottom: 145 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: fURF0989_UR_Fund::auto_DisplayName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_Fund
Top: 266 pt
Left: 138 pt
Bottom: 297 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: fURF0989_UR_Fund::Fund_Restrictions
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_Fund
Top: 184 pt
Left: 138 pt
Bottom: 215 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: values_Fund_Restrictions
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Layout Objects: fURF0989_UR_LedgerAccount

Regular Fields

Field Name: fURF0989_UR_LedgerAccount::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_LedgerAccount
Top: 226 pt
Left: 170 pt
Bottom: 257 pt
Right: 423 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: fURF0989_UR_LedgerAccount::Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_LedgerAccount
Top: 171 pt
Left: 170 pt
Bottom: 202 pt
Right: 423 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: fURF0989_UR_LedgerAccount::auto_DisplayName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
fURF0989_UR_LedgerAccount
Top: 282 pt
Left: 188 pt
Bottom: 313 pt
Right: 441 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: UR_Spend_Categories

Regular Fields

Field Name: UR_SpendRevenueCategory::Title
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UR_Spend_Categories
Top: 289 pt
Left: 138 pt
Bottom: 320 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: UR_SpendRevenueCategory::Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UR_Spend_Categories
Top: 228 pt
Left: 126 pt
Bottom: 259 pt
Right: 227 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: UR_SpendRevenueCategory::auto_DisplayName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UR_Spend_Categories
Top: 462 pt
Left: 157 pt
Bottom: 493 pt
Right: 410 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: UR_SpendRevenueCategory::Code_Prefix
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UR_Spend_Categories
Top: 167 pt
Left: 131 pt
Bottom: 198 pt
Right: 384 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Layout Objects: (Layout) NM Allocation Format Copy

Regular Fields

Field Name: Budget_Allocation::Description
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 201 pt
Left: 63 pt
Bottom: 220 pt
Right: 279 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::NM_sort
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 201 pt
Left: 12 pt
Bottom: 220 pt
Right: 58 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::AmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 201 pt
Left: 284 pt
Bottom: 220 pt
Right: 363 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::fkBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 201 pt
Left: 915 pt
Bottom: 220 pt
Right: 1019 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 201 pt
Left: 636 pt
Bottom: 220 pt
Right: 740 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup Budget Code Number
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 282 pt
Left: 256 pt
Bottom: 301 pt
Right: 363 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Budget_Allocation::AllocationWorksheet
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 143 pt
Left: 9 pt
Bottom: 170 pt
Right: 797 pt
Anchoring: Left, Top
Field Format:
Drop-down List
Display values from: NM_AllocationWorksheets
Auto-complete using value list
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 201 pt
Left: 366 pt
Bottom: 220 pt
Right: 635 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 237 pt
Left: 284 pt
Bottom: 256 pt
Right: 363 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Budget_Allocation::AllocationWorksheet
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 196 pt
Left: 547 pt
Bottom: 215 pt
Right: 701 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: NM_AllocationWorksheets
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::NM_Subtotal
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 220 pt
Left: 547 pt
Bottom: 239 pt
Right: 701 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: NM_SubtotalCategories
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::NM_Subtotal
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format Copy
Top: 177 pt
Left: 12 pt
Bottom: 196 pt
Right: 800 pt
Anchoring: Left, Top
Field Format:
Drop-down List
Display values from: NM_AllocationWorksheets
Auto-complete using value list
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Buttons

Button Properties	Coordinates	Script/Script Step
Type:
Text: find Allocation
Layout Name:
(Layout) NM Allocation Format Copy
Top: 8 pt
Left: 9 pt
Bottom: 46 pt
Right: 132 pt
Anchoring: Left, Top
Perform Script [ “findAllocation” ]
Scripts:

findAllocation

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(Layout) NM Allocation Format Copy
Orientation:
horizontal
Top: 57 pt
Left: 12 pt
Bottom: 112 pt
Right: 376 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format Copy
Label Calculations:
"byWORKSHEET"
Top: 58 pt
Left: 13 pt
Bottom: 111 pt
Right: 194 pt
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_Allocation::AllocationWorksheet; based on value list: “NM_AllocationWorksheets” Budget_Allocation::NM_Subtotal; based on value list: “NM_SubtotalCategories” Budget_Allocation::NM_sort; ascending ] [ Restore; No dialog ]
Fields:

Budget_Allocation::AllocationWorksheet
Budget_Allocation::NM_Subtotal
Budget_Allocation::NM_sort
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format Copy
Label Calculations:
"NEW"
Top: 58 pt
Left: 194 pt
Bottom: 111 pt
Right: 375 pt
Perform Script [ “newAllocationWcurrent” ]
Scripts:

newAllocationWcurrent

Button Bar Properties	Coordinates
Layout Name:
(Layout) NM Allocation Format Copy
Orientation:
horizontal
Top: 201 pt
Left: 741 pt
Bottom: 220 pt
Right: 848 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
(Layout) NM Allocation Format Copy
Label Calculations:
"NM WORKSHEET"
Top: 202 pt
Left: 742 pt
Bottom: 219 pt
Right: 847 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
Yes
Title:
"Popover"
Position:
Left
Top: 164 pt
Left: 527 pt
Bottom: 258 pt
Right: 731 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
Budget_Allocation::AllocationWorksheet at (196, 547, 215, 701)
Budget_Allocation::NM_Subtotal at (220, 547, 239, 701)

Button Bar Properties	Coordinates
Layout Name:
(Layout) NM Allocation Format Copy
Orientation:
horizontal
Top: 201 pt
Left: 854 pt
Bottom: 220 pt
Right: 909 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format Copy
Label Calculations:
"dup."
Top: 202 pt
Left: 855 pt
Bottom: 219 pt
Right: 908 pt
Duplicate Record/Request

Button Bar Properties	Coordinates
Layout Name:
(Layout) NM Allocation Format Copy
Orientation:
horizontal
Top: 21 pt
Left: 551 pt
Bottom: 76 pt
Right: 915 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format Copy
Label Calculations:
"DELETE"
Top: 22 pt
Left: 552 pt
Bottom: 75 pt
Right: 733 pt
Delete Record/Request
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format Copy
Label Calculations:
"NEW"
Top: 22 pt
Left: 733 pt
Bottom: 75 pt
Right: 914 pt
Perform Script [ “newAllocationWcurrent” ]
Scripts:

newAllocationWcurrent

Layout Objects: (form) Budget HISTORY

Regular Fields

Field Name: BUDGET_AllocationVersions::TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 113 pt
Left: 7 pt
Bottom: 132 pt
Right: 188 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BUDGET_AllocationVersions::TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 135 pt
Left: 7 pt
Bottom: 150 pt
Right: 148 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 135 pt
Left: 74 pt
Bottom: 150 pt
Right: 165 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::Description
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 135 pt
Left: 314 pt
Bottom: 150 pt
Right: 429 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::AmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 135 pt
Left: 655 pt
Bottom: 150 pt
Right: 734 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::Title
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 135 pt
Left: 190 pt
Bottom: 150 pt
Right: 305 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 135 pt
Left: 439 pt
Bottom: 148 pt
Right: 643 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_BudgetCode_fromCurrentConfig
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::WORKSHEET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 135 pt
Left: 741 pt
Bottom: 150 pt
Right: 899 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 26 pt
Left: 270 pt
Bottom: 45 pt
Right: 523 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 49 pt
Left: 270 pt
Bottom: 68 pt
Right: 523 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (dropdown) Budget_REVs
Include "Edit..." item to allow editing of value list
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::DateReceived
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 72 pt
Left: 270 pt
Bottom: 91 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Drop-down Calendar
Include icon to show and hide calendar
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::SORT_ORDER
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 63 pt
Left: 554 pt
Bottom: 82 pt
Right: 633 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::fkFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 26 pt
Left: 554 pt
Bottom: 45 pt
Right: 683 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (popup) Fiscal Year
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::fkSuperseededBy
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 295 pt
Left: 611 pt
Bottom: 315 pt
Right: 835 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_BudgetVersions
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 343 pt
Left: 611 pt
Bottom: 499 pt
Right: 864 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget HISTORY
Top: 329 pt
Left: 643 pt
Bottom: 344 pt
Right: 734 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Buttons

Button Properties	Coordinates	Script/Script Step
Type:
Text: DISPLAY these ALLOCATIONS
Layout Name:
(form) Budget HISTORY
Top: 18 pt
Left: 711 pt
Bottom: 37 pt
Right: 924 pt
Anchoring: Left, Top
Perform Script [ “goToRelatedAllocations” ]
Scripts:

goToRelatedAllocations

Button Properties	Coordinates	Script/Script Step
Type:
Text: DEFAULT SOT
Layout Name:
(form) Budget HISTORY
Top: 49 pt
Left: 711 pt
Bottom: 91 pt
Right: 924 pt
Anchoring: Left, Top
Perform Script [ “sort | Budget Allocation VERSIONS” ]
Scripts:

sort | Budget Allocation VERSIONS

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(form) Budget HISTORY
Orientation:
horizontal
Top: 14 pt
Left: 38 pt
Bottom: 45 pt
Right: 159 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) Budget HISTORY
Label Calculations:
"Budget Versions"
Top: 15 pt
Left: 39 pt
Bottom: 44 pt
Right: 158 pt
Go to Layout [ “(List) Budget Versions” (BUDGET_AllocationVersions) ]
Layouts:

(List) Budget Versions

Button Bar Properties	Coordinates
Layout Name:
(form) Budget HISTORY
Orientation:
horizontal
Top: 60 pt
Left: 7 pt
Bottom: 102 pt
Right: 153 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) Budget HISTORY
Top: 61 pt
Left: 8 pt
Bottom: 101 pt
Right: 56 pt
Go to Record/Request/Page [ Previous ]
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) Budget HISTORY
Top: 61 pt
Left: 56 pt
Bottom: 101 pt
Right: 104 pt
Go to Layout [ “(List) Budget Versions” (BUDGET_AllocationVersions) ]
Layouts:

(List) Budget Versions
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) Budget HISTORY
Top: 61 pt
Left: 104 pt
Bottom: 101 pt
Right: 152 pt
Go to Record/Request/Page [ Next ]

Button Bar Properties	Coordinates
Layout Name:
(form) Budget HISTORY
Orientation:
horizontal
Top: 74 pt
Left: 405 pt
Bottom: 102 pt
Right: 511 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
(form) Budget HISTORY
Label Calculations:
"NOTES"
Top: 75 pt
Left: 406 pt
Bottom: 101 pt
Right: 510 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
Yes
Title:
"Popover"
Position:
Bottom
Top: 248 pt
Left: 593 pt
Bottom: 648 pt
Right: 883 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
BUDGET_AllocationVersions::fkSuperseededBy at (295, 611, 315, 835)
BUDGET_AllocationVersions::Notes at (343, 611, 499, 864)

Portals

Portal Properties	Coordinates	Fields	Options
Table:
BUDGET_AllocationVersions
Layout Name:
(form) Budget HISTORY
Top: 132 pt
Left: 5 pt
Bottom: 314 pt
Right: 188 pt
Anchoring: Left, Top and Bottom
Field Objects
BUDGET_AllocationVersions::TITLE at (135, 7, 150, 148)
BUDGET_AllocationVersions::VERSION at (135, 74, 150, 165)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 10
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Table:
Budget_Allocation
Layout Name:
(form) Budget HISTORY
Top: 132 pt
Left: 190 pt
Bottom: 314 pt
Right: 924 pt
Anchoring: Left, Top and Bottom
Field Objects
Budget_Allocation::Description at (135, 314, 150, 429)
Budget_Allocation::AmountAwarded at (135, 655, 150, 734)
Budget_Allocation::Title at (135, 190, 150, 305)
Budget_Allocation::fkBudgetCode at (135, 439, 148, 643)
Budget_Allocation::WORKSHEET at (135, 741, 150, 899)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 10
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Table:
Budget_Allocation
Layout Name:
(form) Budget HISTORY
Top: 326 pt
Left: 190 pt
Bottom: 346 pt
Right: 924 pt
Anchoring: Left, Bottom
Field Objects
Budget_Allocation::SummaryAmountAwarded at (329, 643, 344, 734)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 1
Allow deletion of portal records

Layout Objects: (tabel) Codes tht Others Use

Regular Fields

Field Name: Budget_Allocation_OthersCodes::Title
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(tabel) Codes tht Others Use
Top: 289 pt
Left: 138 pt
Bottom: 320 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation_OthersCodes::Description_and_notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(tabel) Codes tht Others Use
Top: 324 pt
Left: 138 pt
Bottom: 355 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation_OthersCodes::fkDefaultSpendCategory
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(tabel) Codes tht Others Use
Top: 359 pt
Left: 138 pt
Bottom: 390 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_SpendCategories
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation_OthersCodes::fkDefaultURITPBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(tabel) Codes tht Others Use
Top: 394 pt
Left: 138 pt
Bottom: 425 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup Budget Code Number
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: (table) Generate Budget Codes

Regular Fields

Field Name: BudgetCode_Defintions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 194 pt
Left: 203 pt
Bottom: 226 pt
Right: 304 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 230 pt
Left: 203 pt
Bottom: 262 pt
Right: 456 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::_temp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 284 pt
Left: 203 pt
Bottom: 316 pt
Right: 304 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::fkBudget_FAMILY
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 381 pt
Left: 203 pt
Bottom: 413 pt
Right: 456 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_BudgetFAMILIES
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::fkBudget_CONTEXT
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 414 pt
Left: 203 pt
Bottom: 446 pt
Right: 456 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_BudgetCodeCONTEXTS_FilteredbyFamily
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::fkBudget_SUFFIX
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 450 pt
Left: 203 pt
Bottom: 482 pt
Right: 456 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_BudgetCodeContextSUFFIX_filtered
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::calc_ExpectedCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 544 pt
Left: 207 pt
Bottom: 576 pt
Right: 381 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::Suffix_OVerride
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 580 pt
Left: 207 pt
Bottom: 612 pt
Right: 460 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_FamilyDefintions::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 138 pt
Left: 10 pt
Bottom: 162 pt
Right: 263 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::display_CodeCurrent
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 503 pt
Left: 203 pt
Bottom: 524 pt
Right: 456 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::auto_Display_forPopups
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Generate Budget Codes
Top: 616 pt
Left: 138 pt
Bottom: 637 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(table) Generate Budget Codes
Orientation:
horizontal
Top: 36 pt
Left: 110 pt
Bottom: 68 pt
Right: 233 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(table) Generate Budget Codes
Label Calculations:
"default SORT"
Top: 37 pt
Left: 111 pt
Bottom: 67 pt
Right: 232 pt
Perform Script [ “sort | Budget Code Assignment Join” ]
Scripts:

sort | Budget Code Assignment Join

Button Bar Properties	Coordinates
Layout Name:
(table) Generate Budget Codes
Orientation:
horizontal
Top: 36 pt
Left: 476 pt
Bottom: 68 pt
Right: 599 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(table) Generate Budget Codes
Label Calculations:
"complete DISPLAY"
Top: 37 pt
Left: 477 pt
Bottom: 67 pt
Right: 598 pt
Perform Script [ “New Script” ]
Scripts:

New Script

Button Bar Properties	Coordinates
Layout Name:
(table) Generate Budget Codes
Orientation:
horizontal
Top: 36 pt
Left: 293 pt
Bottom: 68 pt
Right: 416 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(table) Generate Budget Codes
Label Calculations:
"temp"
Top: 37 pt
Left: 294 pt
Bottom: 67 pt
Right: 415 pt
Perform Script [ “temp” ]
Scripts:

temp

Layout Objects: (table) Budget FAMILY Definitions

Regular Fields

Field Name: Budget_FamilyDefintions::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget FAMILY Definitions
Top: 114 pt
Left: 138 pt
Bottom: 146 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_FamilyDefintions::Digits
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget FAMILY Definitions
Top: 150 pt
Left: 138 pt
Bottom: 182 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_FamilyDefintions::calc_DigitsAsText
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget FAMILY Definitions
Top: 201 pt
Left: 138 pt
Bottom: 233 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_FamilyDefintions::auto_PopupName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget FAMILY Definitions
Top: 279 pt
Left: 127 pt
Bottom: 307 pt
Right: 380 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_FamilyDefintions::SuffixScope
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget FAMILY Definitions
Top: 311 pt
Left: 138 pt
Bottom: 339 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Drop-down List
Display values from: value_SuffixScope
Auto-complete using value list
Include arrow to show and hide list
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{LayoutTableName}}
Layout Name:
(table) Budget FAMILY Definitions
Top: 84 pt
Left: 0 pt
Bottom: 99 pt
Right: 414 pt
Anchoring: Left, Top
No

Layout Objects: (table) Budget CONTEXT Definitions

Regular Fields

Field Name: Budget_ContextDefinitions_forFiltering::Digit
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget CONTEXT Definitions
Top: 204 pt
Left: 138 pt
Bottom: 236 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_ContextDefinitions_forFiltering::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget CONTEXT Definitions
Top: 150 pt
Left: 138 pt
Bottom: 182 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_ContextDefinitions_forFiltering::calc_DigitsAsText
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget CONTEXT Definitions
Top: 258 pt
Left: 112 pt
Bottom: 290 pt
Right: 365 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_ContextDefinitions_forFiltering::fkFamily_forContext
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget CONTEXT Definitions
Top: 294 pt
Left: 138 pt
Bottom: 322 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_BudgetFAMILIES
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_ContextDefinitions_forFiltering::calcViz_code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget CONTEXT Definitions
Top: 326 pt
Left: 138 pt
Bottom: 354 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_ContextDefinitions_forFiltering::fkUROperatingLine
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget CONTEXT Definitions
Top: 358 pt
Left: 138 pt
Bottom: 386 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_OPLines
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_ContextDefinitions_forFiltering::auto_popupName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget CONTEXT Definitions
Top: 422 pt
Left: 138 pt
Bottom: 450 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{LayoutTableName}}
Layout Name:
(table) Budget CONTEXT Definitions
Top: 84 pt
Left: 0 pt
Bottom: 99 pt
Right: 414 pt
Anchoring: Left, Top
No

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(table) Budget CONTEXT Definitions
Orientation:
horizontal
Top: 14 pt
Left: 188 pt
Bottom: 59 pt
Right: 330 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(table) Budget CONTEXT Definitions
Label Calculations:
"default SORT"
Top: 15 pt
Left: 189 pt
Bottom: 58 pt
Right: 329 pt
Perform Script [ “sort | Budget Code SUFFIXES Copy” ]
Scripts:

sort | Budget Code SUFFIXES Copy

Layout Objects: (table) Budget SUFFIX Definitions

Regular Fields

Field Name: Budget_ContextSuffixDefinitions_forFiltering::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget SUFFIX Definitions
Top: 142 pt
Left: 138 pt
Bottom: 174 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_ContextSuffixDefinitions_forFiltering::Digits
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget SUFFIX Definitions
Top: 178 pt
Left: 138 pt
Bottom: 210 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_ContextSuffixDefinitions_forFiltering::calc_DigitsAsText
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget SUFFIX Definitions
Top: 214 pt
Left: 138 pt
Bottom: 246 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_ContextSuffixDefinitions_forFiltering::fkFamily_forSubContext
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget SUFFIX Definitions
Top: 277 pt
Left: 151 pt
Bottom: 305 pt
Right: 404 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_BudgetFAMILIES
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_ContextSuffixDefinitions_forFiltering::calcViz_code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget SUFFIX Definitions
Top: 309 pt
Left: 138 pt
Bottom: 337 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{LayoutTableName}}
Layout Name:
(table) Budget SUFFIX Definitions
Top: 89 pt
Left: 1 pt
Bottom: 104 pt
Right: 415 pt
Anchoring: Left, Top
No

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(table) Budget SUFFIX Definitions
Orientation:
horizontal
Top: 28 pt
Left: 119 pt
Bottom: 73 pt
Right: 261 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(table) Budget SUFFIX Definitions
Label Calculations:
"default SORT"
Top: 29 pt
Left: 120 pt
Bottom: 72 pt
Right: 260 pt
Perform Script [ “sort | Budget Code SUFFIXES” ]
Scripts:

sort | Budget Code SUFFIXES

Layout Objects: (table) Budget Code Year Configs

Regular Fields

Field Name: BudgetCode_YearConfig::Code_snapshot
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget Code Year Configs
Top: 125 pt
Left: 200 pt
Bottom: 157 pt
Right: 301 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_YearConfig::Name_snapshot
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget Code Year Configs
Top: 161 pt
Left: 200 pt
Bottom: 193 pt
Right: 453 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_YearConfig::fkBudgetCodeDefinition
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget Code Year Configs
Top: 197 pt
Left: 200 pt
Bottom: 229 pt
Right: 453 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup Budget Code DisplayName
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_YearConfig::fkFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget Code Year Configs
Top: 236 pt
Left: 200 pt
Bottom: 268 pt
Right: 453 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupEDS_FiscalYears
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_YearConfig::calc_CodeInCurrentConfig
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget Code Year Configs
Top: 377 pt
Left: 200 pt
Bottom: 409 pt
Right: 301 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: GLOBAL_USE_VARIABLES::g_fkSelectedFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget Code Year Configs
Top: 70 pt
Left: 747 pt
Bottom: 98 pt
Right: 1000 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (popup) Fiscal Year
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: BudgetCode_YearConfig::auto_DisplayName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Budget Code Year Configs
Top: 428 pt
Left: 199 pt
Bottom: 456 pt
Right: 452 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(table) Budget Code Year Configs
Orientation:
horizontal
Top: 17 pt
Left: 330 pt
Bottom: 86 pt
Right: 576 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(table) Budget Code Year Configs
Label Calculations:
"GENERATE CODES FOR SELECTED FY"
Top: 18 pt
Left: 331 pt
Bottom: 85 pt
Right: 575 pt
Perform Script [ “CREATE Budget Code Year Config Snapshot” ]
Scripts:

CREATE Budget Code Year Config Snapshot

Layout Objects: Value Lists

Regular Fields

Field Name: ufile_ValueLISTS::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 64 pt
Left: 0 pt
Bottom: 104 pt
Right: 250 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ui_GLOBAL_BudgetHub::g_fkSelectedCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 9 pt
Left: 901 pt
Bottom: 30 pt
Right: 1037 pt
Anchoring: Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 31 pt
Left: 905 pt
Bottom: 46 pt
Right: 1037 pt
Anchoring: Right, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ufile_ValueLISTS::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 69 pt
Left: 308 pt
Bottom: 106 pt
Right: 525 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: ufile_ValueLISTS::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 120 pt
Left: 183 pt
Bottom: 180 pt
Right: 469 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_Values::sort_order
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Hide Condition:
IsEmpty ( ufile_Values::PrimaryKey )
Top: 152 pt
Left: 257 pt
Bottom: 182 pt
Right: 294 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_Values::Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 151 pt
Left: 308 pt
Bottom: 182 pt
Right: 525 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: ufile_Values::fkStatusCATEGORY
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Hide Condition:
IsEmpty ( ufile_Values::PrimaryKey ) or not ufile_ValueLISTS::is_status_list
OnObjectModify
Script: commitRecord
Modes: Browse
Top: 152 pt
Left: 565 pt
Bottom: 182 pt
Right: 700 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_StatusCategories
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_Values::use_Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 194 pt
Left: 402 pt
Bottom: 254 pt
Right: 688 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: GLOBAL_USE_VARIABLES::gLIST_StatusGROUPS
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 105 pt
Left: 487 pt
Bottom: 129 pt
Right: 671 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ValueLists
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ufile_ValueLISTS::tester
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 136 pt
Left: 487 pt
Bottom: 160 pt
Right: 671 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_StatusCategories
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: GLOBAL_USE_VARIABLES::gLIST_BudgetVersions
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 185 pt
Left: 487 pt
Bottom: 209 pt
Right: 671 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ValueLists
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ufile_ValueLISTS::tester
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 216 pt
Left: 487 pt
Bottom: 240 pt
Right: 671 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_BudgetVersions
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: GLOBAL_USE_VARIABLES::gLIST_2
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 267 pt
Left: 487 pt
Bottom: 291 pt
Right: 671 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ValueLists
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ufile_ValueLISTS::tester
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 298 pt
Left: 487 pt
Bottom: 322 pt
Right: 671 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_List2
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: GLOBAL_USE_VARIABLES::gLIST_ImportStatuses
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 356 pt
Left: 487 pt
Bottom: 380 pt
Right: 671 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ValueLists
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ufile_ValueLISTS::tester
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 387 pt
Left: 487 pt
Bottom: 411 pt
Right: 671 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ImportStatuses
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: GLOBAL_USE_VARIABLES::gLIST_ImportSessionStatuses
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 106 pt
Left: 692 pt
Bottom: 130 pt
Right: 876 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ValueLists
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ufile_ValueLISTS::tester
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 137 pt
Left: 692 pt
Bottom: 161 pt
Right: 876 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ImportSessionStatuses
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: GLOBAL_USE_VARIABLES::gLIST_BudgetVersions
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 186 pt
Left: 692 pt
Bottom: 210 pt
Right: 876 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ValueLists
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ufile_ValueLISTS::tester
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 217 pt
Left: 692 pt
Bottom: 241 pt
Right: 876 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_BudgetVersions
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: GLOBAL_USE_VARIABLES::gLIST_2
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 268 pt
Left: 692 pt
Bottom: 292 pt
Right: 876 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ValueLists
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ufile_ValueLISTS::tester
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 299 pt
Left: 692 pt
Bottom: 323 pt
Right: 876 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_List2
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: GLOBAL_USE_VARIABLES::gLIST_ImportStatuses
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 357 pt
Left: 692 pt
Bottom: 381 pt
Right: 876 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ValueLists
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ufile_ValueLISTS::tester
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 388 pt
Left: 692 pt
Bottom: 412 pt
Right: 876 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ImportStatuses
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ufile_ValueLISTS::is_actve
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 65 pt
Left: 535 pt
Bottom: 85 pt
Right: 553 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_ValueLISTS::is_status_list
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 84 pt
Left: 535 pt
Bottom: 104 pt
Right: 553 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_ValueLISTS::enforce_1_to_1
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 105 pt
Left: 535 pt
Bottom: 125 pt
Right: 553 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ufile_ValueLISTS::PrimaryKey
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Value Lists
Top: 231 pt
Left: 400 pt
Bottom: 263 pt
Right: 653 pt
Anchoring: Left, Bottom
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{LayoutName}}
Layout Name:
Value Lists
Top: 32 pt
Left: 10 pt
Bottom: 57 pt
Right: 324 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
<<APP_TITLE>>
Layout Name:
Value Lists
Top: 10 pt
Left: 10 pt
Bottom: 32 pt
Right: 324 pt
Anchoring: Left, Top
ui_GLOBAL_BudgetHub::APP_TITLE
No

Field Properties	Coordinates	Fields	Quick Find
Text:
v<<APP_VERSION>>
Layout Name:
Value Lists
Top: 269 pt
Left: 571 pt
Bottom: 284 pt
Right: 723 pt
Anchoring: Right, Top
ui_GLOBAL_BudgetHub::APP_VERSION
No

Field Properties	Coordinates	Fields	Quick Find
Text:
Last save: <<script_LastSaved>>
Layout Name:
Value Lists
Top: 281 pt
Left: 437 pt
Bottom: 296 pt
Right: 723 pt
Anchoring: Right, Top
ui_GLOBAL_BudgetHub::script_LastSaved
No

Field Properties	Coordinates	Fields	Quick Find
Text:
(<<sCount_Values>>) ValueS
Layout Name:
Value Lists
Top: 122 pt
Left: 308 pt
Bottom: 142 pt
Right: 594 pt
Anchoring: Left, Top
ufile_ValueLISTS::sCount_Values
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
Value Lists
Orientation:
horizontal
Top: 13 pt
Left: 461 pt
Bottom: 49 pt
Right: 634 pt
Anchoring: Right, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Value Lists
Label Calculations:
"Navigation placholder"
Top: 14 pt
Left: 462 pt
Bottom: 48 pt
Right: 633 pt
Set Field [ ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET; ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ]
Fields:

ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET

Button Bar Properties	Coordinates
Layout Name:
Value Lists
Orientation:
horizontal
Top: 68 pt
Left: 254 pt
Bottom: 106 pt
Right: 304 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
Value Lists
Label Calculations:
"Notes"
Top: 69 pt
Left: 255 pt
Bottom: 105 pt
Right: 303 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
No
Position:
Bottom
Top: 116 pt
Left: 179 pt
Bottom: 188 pt
Right: 473 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
ufile_ValueLISTS::Notes at (120, 183, 180, 469)
Conditional Formatting	Condition	Format
1.	
Formula: not IsEmpty ( ufile_ValueLISTS::Notes )

self:normal .self
{
color: rgba(0%,89.8039%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Button Bar Properties	Coordinates
Layout Name:
Value Lists
Hide Condition:
IsEmpty ( ufile_Values::PrimaryKey )
Orientation:
horizontal
Top: 150 pt
Left: 529 pt
Bottom: 180 pt
Right: 561 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
Value Lists
Label Calculations:
"Notes"
Top: 151 pt
Left: 530 pt
Bottom: 179 pt
Right: 560 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
No
Position:
Bottom
Top: 190 pt
Left: 398 pt
Bottom: 262 pt
Right: 692 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
ufile_Values::use_Notes at (194, 402, 254, 688)
Conditional Formatting	Condition	Format
1.	
Formula: not IsEmpty ( ufile_Values::use_Notes )

self:normal .self
{
color: rgba(0%,89.8039%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Button Bar Properties	Coordinates
Layout Name:
Value Lists
Orientation:
horizontal
Top: 221 pt
Left: 416 pt
Bottom: 248 pt
Right: 525 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Value Lists
Label Calculations:
"DELETE"
Additional Properties:
Change to hand cursor over button
Top: 222 pt
Left: 417 pt
Bottom: 247 pt
Right: 524 pt
Delete Portal Row [ No dialog ]
Conditional Formatting	Condition	Format
1.	
Formula: not IsEmpty ( ufile_Values::use_Notes )

self:normal .self
{
color: rgba(0%,89.8039%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Button Bar Properties	Coordinates
Layout Name:
Value Lists
Orientation:
horizontal
Top: 17 pt
Left: 649 pt
Bottom: 45 pt
Right: 735 pt
Anchoring: Right, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
Value Lists
Label Calculations:
"GLOBALS"
Top: 18 pt
Left: 650 pt
Bottom: 44 pt
Right: 734 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
Yes
Title:
"gLIST Assignments"
Position:
Bottom
Top: 55 pt
Left: 478 pt
Bottom: 469 pt
Right: 907 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
GLOBAL_USE_VARIABLES::gLIST_StatusGROUPS at (105, 487, 129, 671)
ufile_ValueLISTS::tester at (136, 487, 160, 671)
GLOBAL_USE_VARIABLES::gLIST_BudgetVersions at (185, 487, 209, 671)
ufile_ValueLISTS::tester at (216, 487, 240, 671)
GLOBAL_USE_VARIABLES::gLIST_2 at (267, 487, 291, 671)
ufile_ValueLISTS::tester at (298, 487, 322, 671)
GLOBAL_USE_VARIABLES::gLIST_ImportStatuses at (356, 487, 380, 671)
ufile_ValueLISTS::tester at (387, 487, 411, 671)
GLOBAL_USE_VARIABLES::gLIST_ImportSessionStatuses at (106, 692, 130, 876)
ufile_ValueLISTS::tester at (137, 692, 161, 876)
GLOBAL_USE_VARIABLES::gLIST_BudgetVersions at (186, 692, 210, 876)
ufile_ValueLISTS::tester at (217, 692, 241, 876)
GLOBAL_USE_VARIABLES::gLIST_2 at (268, 692, 292, 876)
ufile_ValueLISTS::tester at (299, 692, 323, 876)
GLOBAL_USE_VARIABLES::gLIST_ImportStatuses at (357, 692, 381, 876)
ufile_ValueLISTS::tester at (388, 692, 412, 876)

Button Bar Properties	Coordinates
Layout Name:
Value Lists
Orientation:
horizontal
Top: 13 pt
Left: 183 pt
Bottom: 49 pt
Right: 356 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Value Lists
Label Calculations:
"New Value List"
Top: 14 pt
Left: 184 pt
Bottom: 48 pt
Right: 355 pt
New Record/Request

Portals

Portal Properties	Coordinates	Fields	Options
Table:
ufile_ValueLISTS
Layout Name:
Value Lists
Top: 63 pt
Left: 0 pt
Bottom: 227 pt
Right: 250 pt
Anchoring: Left, Top and Bottom
Field Objects
ufile_ValueLISTS::Name at (64, 0, 104, 250)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 4
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Table:
ufile_Values
Layout Name:
Value Lists
Top: 144 pt
Left: 250 pt
Bottom: 227 pt
Right: 744 pt
Anchoring: Left and Right, Top and Bottom
Field Objects
ufile_Values::sort_order at (152, 257, 182, 294)
ufile_Values::Name at (151, 308, 182, 525)
ufile_Values::fkStatusCATEGORY at (152, 565, 182, 700)
ufile_Values::use_Notes at (194, 402, 254, 688)
Sort records: On
Field: sort_order

Ascending order
Reorder based on summary field: Off
Override field's language for sort: Off
Field: sort_order

Ascending order
Reorder based on summary field: Off
Override field's language for sort: Off

Filter calculation: None
Initial Row: 1
Number of Rows: 2
Show vertical scroll bar

Graphic Objects

Graphic Object Properties	Coordinates
Type:
Text: Status Category
Layout Name:
Value Lists
Hide Condition:
not ufile_ValueLISTS::is_status_list
Top: 123 pt
Left: 565 pt
Bottom: 143 pt
Right: 701 pt
Anchoring: Left, Top

Layout Objects: (form) Budget Versions

Regular Fields

Field Name: BUDGET_AllocationVersions::TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 141 pt
Left: 7 pt
Bottom: 172 pt
Right: 246 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::Description
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 621 pt
Left: 18 pt
Bottom: 640 pt
Right: 285 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::AmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 621 pt
Left: 285 pt
Bottom: 640 pt
Right: 366 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 621 pt
Left: 519 pt
Bottom: 640 pt
Right: 999 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 621 pt
Left: 366 pt
Bottom: 640 pt
Right: 512 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BUDGET_AllocationVersions::VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 117 pt
Left: 165 pt
Bottom: 136 pt
Right: 246 pt
Anchoring: Left, Top
Field Format:
Drop-down List
Display values from: (dropdown) Budget_REVs
Include "Edit..." item to allow editing of value list
Auto-complete using value list
Include arrow to show and hide list
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::DateReceived
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 179 pt
Left: 7 pt
Bottom: 198 pt
Right: 246 pt
Anchoring: Left, Top
Field Format:
Drop-down Calendar
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::fkFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 117 pt
Left: 7 pt
Bottom: 136 pt
Right: 154 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (popup) Fiscal Year
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 236 pt
Left: 7 pt
Bottom: 300 pt
Right: 246 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::fkFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 121 pt
Left: 264 pt
Bottom: 138 pt
Right: 314 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (popup) Fiscal Year
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 121 pt
Left: 314 pt
Bottom: 138 pt
Right: 395 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) Budget Versions
Top: 121 pt
Left: 395 pt
Bottom: 138 pt
Right: 550 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Buttons

Button Properties	Coordinates	Script/Script Step
Type:
Text: DISPLAY these ALLOCATIONS
Layout Name:
(form) Budget Versions
Top: 14 pt
Left: 259 pt
Bottom: 95 pt
Right: 472 pt
Anchoring: Left, Top
Perform Script [ “goToRelatedAllocations” ]
Scripts:

goToRelatedAllocations

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(form) Budget Versions
Orientation:
horizontal
Top: 14 pt
Left: 38 pt
Bottom: 45 pt
Right: 159 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) Budget Versions
Label Calculations:
"Budget Versions"
Top: 15 pt
Left: 39 pt
Bottom: 44 pt
Right: 158 pt
Go to Layout [ “(List) Budget Versions” (BUDGET_AllocationVersions) ]
Layouts:

(List) Budget Versions

Button Bar Properties	Coordinates
Layout Name:
(form) Budget Versions
Orientation:
horizontal
Top: 314 pt
Left: 7 pt
Bottom: 345 pt
Right: 246 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) Budget Versions
Label Calculations:
"DUPLICATE w/ RELATED"
Top: 315 pt
Left: 8 pt
Bottom: 344 pt
Right: 245 pt
Perform Script [ “DuplicateWRelated” ]
Scripts:

DuplicateWRelated

Button Bar Properties	Coordinates
Layout Name:
(form) Budget Versions
Orientation:
horizontal
Top: 60 pt
Left: 7 pt
Bottom: 102 pt
Right: 153 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) Budget Versions
Top: 61 pt
Left: 8 pt
Bottom: 101 pt
Right: 56 pt
Go to Record/Request/Page [ Previous ]
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) Budget Versions
Top: 61 pt
Left: 56 pt
Bottom: 101 pt
Right: 104 pt
Go to Layout [ “(List) Budget Versions” (BUDGET_AllocationVersions) ]
Layouts:

(List) Budget Versions
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) Budget Versions
Top: 61 pt
Left: 104 pt
Bottom: 101 pt
Right: 152 pt
Go to Record/Request/Page [ Next ]

Portals

Portal Properties	Coordinates	Fields	Options
Table:
Budget_Allocation
Layout Name:
(form) Budget Versions
Top: 616 pt
Left: 13 pt
Bottom: 753 pt
Right: 999 pt
Anchoring: Left, Top
Field Objects
Budget_Allocation::Description at (621, 18, 640, 285)
Budget_Allocation::AmountAwarded at (621, 285, 640, 366)
Budget_Allocation::Notes at (621, 519, 640, 999)
Budget_Allocation::fkBudgetCode at (621, 366, 640, 512)
Sort records: On
Field: fkBudgetCode

Custom order based on value list: popup Budget Code Number
Reorder based on summary field: Off
Override field's language for sort: Off

Filter calculation: None
Initial Row: 1
Number of Rows: 5
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Table:
BUDGET_AllocationVersions
Layout Name:
(form) Budget Versions
Top: 118 pt
Left: 259 pt
Bottom: 300 pt
Right: 555 pt
Anchoring: Left, Top
Field Objects
BUDGET_AllocationVersions::fkFiscalYear at (121, 264, 138, 314)
BUDGET_AllocationVersions::VERSION at (121, 314, 138, 395)
BUDGET_AllocationVersions::TITLE at (121, 395, 138, 550)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 10
Show vertical scroll bar
Allow deletion of portal records

Layout Objects: (table) URITP Budget Codes

Regular Fields

Field Name: BudgetCode_Defintions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 84 pt
Bottom: 68 pt
Right: 319 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: Mod ( BudgetCode_Defintions::Default Code ; 10 ) = 0

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(64.6512%,75.1975%,80.4706%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: BudgetCode_Defintions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 16 pt
Bottom: 68 pt
Right: 85 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: Mod ( BudgetCode_Defintions::Default Code ; 10 ) = 0

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(64.6512%,75.1975%,80.4706%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: BudgetCode_Defintions::xxFY26 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 321 pt
Bottom: 68 pt
Right: 384 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::xxFY27 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 1374 pt
Bottom: 68 pt
Right: 1453 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::PUBLICNotes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 522 pt
Bottom: 68 pt
Right: 861 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::xx_fkDefaultHeaderCategory
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 861 pt
Bottom: 68 pt
Right: 1048 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (popup) Code HEADERS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::_temp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 2 pt
Bottom: 72 pt
Right: 16 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::xxFY27 Allocation Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 79 pt
Left: 1367 pt
Bottom: 98 pt
Right: 1446 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: BudgetCode_Defintions::xxFY26 Allocation Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 79 pt
Left: 267 pt
Bottom: 98 pt
Right: 366 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: BudgetCode_Defintions::xxFY26_Spent
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 383 pt
Bottom: 68 pt
Right: 446 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::xxFY26 Spent Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 79 pt
Left: 365 pt
Bottom: 98 pt
Right: 464 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: BudgetCode_Defintions::xxFY26_REMAINING
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 445 pt
Bottom: 68 pt
Right: 520 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::xxFY26 Remaining Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 79 pt
Left: 463 pt
Bottom: 98 pt
Right: 562 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: BudgetCode_Defintions::fkOWNER
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 1047 pt
Bottom: 68 pt
Right: 1146 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: fk_budgetOwners
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::calc_CodeHundred
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 53 pt
Left: 1151 pt
Bottom: 72 pt
Right: 1238 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::calc_CodeTen
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 52 pt
Left: 1238 pt
Bottom: 71 pt
Right: 1325 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::is_active
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) URITP Budget Codes
Top: 52 pt
Left: 1331 pt
Bottom: 71 pt
Right: 1361 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: File SETUP

Regular Fields

Field Name: ui_GLOBAL_BudgetHub::calc_FILEPATH
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 257 pt
Left: 20 pt
Bottom: 297 pt
Right: 492 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::calc_FILENAME
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 297 pt
Left: 20 pt
Bottom: 337 pt
Right: 492 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::calc_FILESIZE_MB
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 337 pt
Left: 20 pt
Bottom: 375 pt
Right: 492 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::script_LastSaved
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 377 pt
Left: 20 pt
Bottom: 414 pt
Right: 492 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::script_Stats_RecordCounts
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 417 pt
Left: 20 pt
Bottom: 457 pt
Right: 492 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::calc_HOSTED_STATUS
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 457 pt
Left: 20 pt
Bottom: 497 pt
Right: 492 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkPREVIOUS_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 530 pt
Left: 30 pt
Bottom: 570 pt
Right: 482 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkCOMPARE_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 760 pt
Left: 31 pt
Bottom: 801 pt
Right: 482 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 277 pt
Left: 30 pt
Bottom: 314 pt
Right: 482 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: BUDGET_AllocationVersions::TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 364 pt
Left: 341 pt
Bottom: 386 pt
Right: 462 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 387 pt
Left: 341 pt
Bottom: 410 pt
Right: 462 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::DateReceived
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 433 pt
Left: 340 pt
Bottom: 456 pt
Right: 462 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::fkFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 410 pt
Left: 341 pt
Bottom: 433 pt
Right: 462 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 453 pt
Left: 124 pt
Bottom: 517 pt
Right: 410 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ui_GLOBAL_BudgetHub::g_fkNEXT_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 645 pt
Left: 30 pt
Bottom: 685 pt
Right: 482 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::APP_TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 2 pt
Left: 0 pt
Bottom: 23 pt
Right: 138 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::APP_TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 54 pt
Left: 150 pt
Bottom: 86 pt
Right: 400 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::APP_VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
File SETUP
Top: 94 pt
Left: 150 pt
Bottom: 126 pt
Right: 400 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{LayoutName}}
Layout Name:
File SETUP
Top: 24 pt
Left: 0 pt
Bottom: 46 pt
Right: 314 pt
Anchoring: Left, Top
No

Button Bars

Button Bar Properties	Coordinates
Layout Name:
File SETUP
Orientation:
horizontal
Top: 449 pt
Left: 41 pt
Bottom: 485 pt
Right: 110 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
File SETUP
Label Calculations:
"Notes"
Top: 450 pt
Left: 42 pt
Bottom: 484 pt
Right: 109 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
No
Position:
Right
Top: 449 pt
Left: 120 pt
Bottom: 521 pt
Right: 414 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
BUDGET_AllocationVersions::Notes at (453, 124, 517, 410)
Conditional Formatting	Condition	Format
1.	
Formula: not IsEmpty ( BUDGET_AllocationVersions::Notes )

self:normal .self
{
-fm-underline: underline;
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Button Bar Properties	Coordinates
Layout Name:
File SETUP
Orientation:
horizontal
Top: 845 pt
Left: 30 pt
Bottom: 881 pt
Right: 166 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
File SETUP
Label Calculations:
"Set as Default"
Top: 846 pt
Left: 31 pt
Bottom: 880 pt
Right: 165 pt
Set Field [ ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET; ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ]
Fields:

ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET

Button Bar Properties	Coordinates
Layout Name:
File SETUP
Orientation:
horizontal
Top: 845 pt
Left: 204 pt
Bottom: 881 pt
Right: 340 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
File SETUP
Label Calculations:
"Recall Default"
Top: 846 pt
Left: 205 pt
Bottom: 880 pt
Right: 339 pt
Set Field [ ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion; ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET ]
Fields:

ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET
ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion

Portals

Portal Properties	Coordinates	Fields	Options
Table:
BUDGET_AllocationVersions
Layout Name:
File SETUP
Top: 348 pt
Left: 30 pt
Bottom: 497 pt
Right: 482 pt
Anchoring: Left, Top
Field Objects
BUDGET_AllocationVersions::TITLE at (364, 341, 386, 462)
BUDGET_AllocationVersions::VERSION at (387, 341, 410, 462)
BUDGET_AllocationVersions::DateReceived at (433, 340, 456, 462)
BUDGET_AllocationVersions::fkFiscalYear at (410, 341, 433, 462)
BUDGET_AllocationVersions::Notes at (453, 124, 517, 410)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 1

Tab Controls

Tab Control Properties	Coordinates
Layout Name:
File SETUP
Justification:
Left
Tab Width:
Default Front Tab:
Tab 1
Top: 195 pt
Left: 10 pt
Bottom: 904 pt
Right: 502 pt
Anchoring: Left and Right, Top
Tabs
Tab Properties	Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Tab 0:
TextSize ( "File Info" ; 14 )
Field Objects
ui_GLOBAL_BudgetHub::calc_FILEPATH at (257, 20, 297, 492)
ui_GLOBAL_BudgetHub::calc_FILENAME at (297, 20, 337, 492)
ui_GLOBAL_BudgetHub::calc_FILESIZE_MB at (337, 20, 375, 492)
ui_GLOBAL_BudgetHub::script_LastSaved at (377, 20, 414, 492)
ui_GLOBAL_BudgetHub::script_Stats_RecordCounts at (417, 20, 457, 492)
ui_GLOBAL_BudgetHub::calc_HOSTED_STATUS at (457, 20, 497, 492)
Tab 1:
TextSize ( "Budget Selection" ; 14 )
Field Objects
ui_GLOBAL_BudgetHub::g_fkPREVIOUS_BUDGET at (530, 30, 570, 482)
ui_GLOBAL_BudgetHub::g_fkCOMPARE_BUDGET at (760, 31, 801, 482)
ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion at (277, 30, 314, 482)
BUDGET_AllocationVersions::TITLE at (364, 341, 386, 462)
BUDGET_AllocationVersions::VERSION at (387, 341, 410, 462)
BUDGET_AllocationVersions::DateReceived at (433, 340, 456, 462)
BUDGET_AllocationVersions::fkFiscalYear at (410, 341, 433, 462)
BUDGET_AllocationVersions::Notes at (453, 124, 517, 410)
ui_GLOBAL_BudgetHub::g_fkNEXT_BUDGET at (645, 30, 685, 482)
Portal Object at (348, 30, 497, 482)
Tab 2:
TextSize ( "Print Options" ; 14 )

Layout Objects: GLOBAL_VARIABLES | Imported

Regular Fields

Field Name: ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
GLOBAL_VARIABLES | Imported
Top: 115 pt
Left: 161 pt
Bottom: 134 pt
Right: 414 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
GLOBAL_VARIABLES | Imported
Top: 342 pt
Left: 161 pt
Bottom: 467 pt
Right: 414 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkPREVIOUS_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
GLOBAL_VARIABLES | Imported
Top: 191 pt
Left: 161 pt
Bottom: 210 pt
Right: 414 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkCOMPARE_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
GLOBAL_VARIABLES | Imported
Top: 267 pt
Left: 161 pt
Bottom: 286 pt
Right: 414 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: XX_GLOBAL_fileSetup::APP_TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
GLOBAL_VARIABLES | Imported
Top: 115 pt
Left: 704 pt
Bottom: 134 pt
Right: 957 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: XX_GLOBAL_fileSetup::APP_VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
GLOBAL_VARIABLES | Imported
Top: 138 pt
Left: 704 pt
Bottom: 157 pt
Right: 957 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Layout Objects: Print BUDGET CODES

Regular Fields

Field Name: BudgetCode_Defintions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 96 pt
Left: 409 pt
Bottom: 117 pt
Right: 488 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 121 pt
Left: 409 pt
Bottom: 142 pt
Right: 580 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::_temp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 122 pt
Left: 38 pt
Bottom: 143 pt
Right: 56 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::is_active
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 98 pt
Left: 554 pt
Bottom: 119 pt
Right: 572 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::fkOWNER
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 96 pt
Left: 676 pt
Bottom: 117 pt
Right: 847 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: fk_budgetOwners
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::fkAllocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 121 pt
Left: 676 pt
Bottom: 142 pt
Right: 847 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::fkBudget_CONTEXT
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 96 pt
Left: 115 pt
Bottom: 117 pt
Right: 312 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_BudgetCodeCONTEXTS_FilteredbyFamily
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::fkBudget_SUFFIX
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 123 pt
Left: 115 pt
Bottom: 144 pt
Right: 312 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_BudgetCodeContextSUFFIX_filtered
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::display_CodeCurrent
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 96 pt
Left: 4 pt
Bottom: 117 pt
Right: 56 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::fkBudget_FAMILY
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 62 pt
Left: 4 pt
Bottom: 83 pt
Right: 257 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup_BudgetFAMILIES
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::fkUROperatingLine
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 194 pt
Left: 927 pt
Bottom: 215 pt
Right: 1065 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::fkURSpendCateogry
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Print BUDGET CODES
Top: 219 pt
Left: 927 pt
Bottom: 240 pt
Right: 1065 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
Print BUDGET CODES
Orientation:
horizontal
Top: 103 pt
Left: 1152 pt
Bottom: 137 pt
Right: 1188 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
Print BUDGET CODES
Top: 104 pt
Left: 1153 pt
Bottom: 136 pt
Right: 1187 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
Yes
Title:
"Popover"
Position:
Bottom
Top: 153 pt
Left: 792 pt
Bottom: 248 pt
Right: 1082 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
BudgetCode_Defintions::fkUROperatingLine at (194, 927, 215, 1065)
BudgetCode_Defintions::fkURSpendCateogry at (219, 927, 240, 1065)

Button Bar Properties	Coordinates
Layout Name:
Print BUDGET CODES
Orientation:
horizontal
Top: 13 pt
Left: 62 pt
Bottom: 45 pt
Right: 185 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Print BUDGET CODES
Label Calculations:
"default SORT"
Top: 14 pt
Left: 63 pt
Bottom: 44 pt
Right: 184 pt
Perform Script [ “sort | Budget Code Assignment Join” ]
Scripts:

sort | Budget Code Assignment Join

Button Bar Properties	Coordinates
Layout Name:
Print BUDGET CODES
Orientation:
horizontal
Top: 13 pt
Left: 312 pt
Bottom: 45 pt
Right: 435 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Print BUDGET CODES
Label Calculations:
"Copy calc into CURRENT"
Top: 14 pt
Left: 313 pt
Bottom: 44 pt
Right: 434 pt
Perform Script [ “sort | Budget Code Assignment Join” ]
Scripts:

sort | Budget Code Assignment Join

Graphic Objects

Graphic Object Properties	Coordinates
Type:
Rectangle
Layout Name:
Print BUDGET CODES
Hide Condition:
not ( Count ( self_BudgetCodes_byCode::PrimaryKey ) > 1 )
Top: 90 pt
Left: 1 pt
Bottom: 149 pt
Right: 316 pt
Anchoring: Left, Top

Layout Objects: (table) Import SESSIONS URF

Regular Fields

Field Name: IMPORT_SESSIONS::ImportTimestamp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import SESSIONS URF
Top: 128 pt
Left: 152 pt
Bottom: 160 pt
Right: 393 pt
Anchoring: Left, Top
Field Format:
Drop-down Calendar
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::OriginalFile
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import SESSIONS URF
Top: 164 pt
Left: 152 pt
Bottom: 289 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: IMPORT_SESSIONS::auto_Filename
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import SESSIONS URF
Top: 293 pt
Left: 152 pt
Bottom: 325 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::auto_FilesizeKB
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import SESSIONS URF
Top: 329 pt
Left: 152 pt
Bottom: 361 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::SessionLabel
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import SESSIONS URF
Top: 365 pt
Left: 152 pt
Bottom: 397 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import SESSIONS URF
Top: 401 pt
Left: 152 pt
Bottom: 433 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::fkFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import SESSIONS URF
Top: 437 pt
Left: 152 pt
Bottom: 469 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (popup) Fiscal Year
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::fkSessionStatus
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import SESSIONS URF
Top: 522 pt
Left: 152 pt
Bottom: 554 pt
Right: 405 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupV_ImportSessionStatuses
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: (table) Import URF LINES

Regular Fields

Field Name: URF_IMPORT_ROWS::source_FAO_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 227 pt
Left: 238 pt
Bottom: 259 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LedgerAccount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 371 pt
Left: 238 pt
Bottom: 403 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FACName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 479 pt
Left: 238 pt
Bottom: 511 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 515 pt
Left: 238 pt
Bottom: 547 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_PONumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 551 pt
Left: 390 pt
Bottom: 583 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_AccountingDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 587 pt
Left: 238 pt
Bottom: 619 pt
Right: 359 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 623 pt
Left: 238 pt
Bottom: 655 pt
Right: 359 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_JournalSource
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 659 pt
Left: 238 pt
Bottom: 691 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Reference
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 695 pt
Left: 238 pt
Bottom: 727 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BusinessDocument
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 731 pt
Left: 238 pt
Bottom: 763 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_HeaderMemo_PONumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 767 pt
Left: 238 pt
Bottom: 799 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 803 pt
Left: 238 pt
Bottom: 835 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 839 pt
Left: 238 pt
Bottom: 871 pt
Right: 339 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::sourceScripted_RowNumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1156 pt
Left: 238 pt
Bottom: 1188 pt
Right: 339 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_NormalizedReference
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1509 pt
Left: 252 pt
Bottom: 1541 pt
Right: 561 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_NormalizedBusinessDocument
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1545 pt
Left: 252 pt
Bottom: 1577 pt
Right: 561 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_NormalizedSupplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1581 pt
Left: 252 pt
Bottom: 1613 pt
Right: 561 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_NormalizedLineMemo
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1617 pt
Left: 252 pt
Bottom: 1649 pt
Right: 561 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_sourceUKey_LineFingerprint
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1653 pt
Left: 252 pt
Bottom: 1685 pt
Right: 561 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_sourceUKey_DocumentFingerprint
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1689 pt
Left: 252 pt
Bottom: 1721 pt
Right: 561 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::is_first_seen_ever
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1307 pt
Left: 252 pt
Bottom: 1339 pt
Right: 275 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::was_seen_in_prior_import
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1343 pt
Left: 252 pt
Bottom: 1375 pt
Right: 275 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::is_duplicate_within_session
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1379 pt
Left: 252 pt
Bottom: 1411 pt
Right: 275 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::is_revision_candidate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1415 pt
Left: 252 pt
Bottom: 1447 pt
Right: 275 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::fkMatchedPriorRow
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1833 pt
Left: 252 pt
Bottom: 1865 pt
Right: 505 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::fkMatchedPriorSession
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1869 pt
Left: 252 pt
Bottom: 1901 pt
Right: 505 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::fkImportSession
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1905 pt
Left: 252 pt
Bottom: 1937 pt
Right: 505 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::fkImportStatus
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES
Top: 1941 pt
Left: 252 pt
Bottom: 1973 pt
Right: 505 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(table) Import URF LINES
Orientation:
horizontal
Top: 14 pt
Left: 24 pt
Bottom: 77 pt
Right: 571 pt
Anchoring: Left and Right, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(table) Import URF LINES
Label Calculations:
"New Import Session"
Additional Properties:
Change to hand cursor over button
Top: 15 pt
Left: 25 pt
Bottom: 76 pt
Right: 298 pt
Perform Script [ “Create_New_URF_Import” ]
Scripts:

Create_New_URF_Import
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(table) Import URF LINES
Label Calculations:
"Recompute Fingerprints"
Additional Properties:
Change to hand cursor over button
Top: 15 pt
Left: 298 pt
Bottom: 76 pt
Right: 570 pt
Perform Script [ “Recompute_URF_Fingerprints” ]
Scripts:

Recompute_URF_Fingerprints

Layout Objects: (table) Import URF LINES Excel

Regular Fields

Field Name: URF_IMPORT_ROWS::source_Company
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 119 pt
Left: 238 pt
Bottom: 151 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Fund
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 155 pt
Left: 238 pt
Bottom: 187 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_CostCenter
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 191 pt
Left: 238 pt
Bottom: 223 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAO_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 227 pt
Left: 238 pt
Bottom: 259 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAOName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 263 pt
Left: 238 pt
Bottom: 295 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_ObjectClassName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 299 pt
Left: 238 pt
Bottom: 331 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_ObjectClassSortOrder
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 335 pt
Left: 238 pt
Bottom: 367 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LedgerAccount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 371 pt
Left: 238 pt
Bottom: 403 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LedgerAccountIdentifier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 407 pt
Left: 238 pt
Bottom: 439 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAC_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 443 pt
Left: 238 pt
Bottom: 475 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FACName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 479 pt
Left: 238 pt
Bottom: 511 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 515 pt
Left: 238 pt
Bottom: 547 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_PONumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 551 pt
Left: 238 pt
Bottom: 583 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_AccountingDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 587 pt
Left: 238 pt
Bottom: 619 pt
Right: 359 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 623 pt
Left: 238 pt
Bottom: 655 pt
Right: 359 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_JournalSource
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 659 pt
Left: 238 pt
Bottom: 691 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Reference
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 695 pt
Left: 238 pt
Bottom: 727 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BusinessDocument
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 731 pt
Left: 238 pt
Bottom: 763 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_HeaderMemo_PONumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 767 pt
Left: 238 pt
Bottom: 799 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 803 pt
Left: 238 pt
Bottom: 835 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 839 pt
Left: 238 pt
Bottom: 871 pt
Right: 339 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Award
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 875 pt
Left: 238 pt
Bottom: 907 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_AwardName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 911 pt
Left: 238 pt
Bottom: 943 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FromDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 947 pt
Left: 238 pt
Bottom: 979 pt
Right: 359 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_ToDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 983 pt
Left: 238 pt
Bottom: 1015 pt
Right: 359 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_AwardLineAmount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1019 pt
Left: 238 pt
Bottom: 1051 pt
Right: 339 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_PrincipalInvestigator
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1055 pt
Left: 238 pt
Bottom: 1087 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FiscalTimePeriodStartDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1091 pt
Left: 238 pt
Bottom: 1123 pt
Right: 359 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FiscalTimePeriodEndDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1127 pt
Left: 238 pt
Bottom: 1159 pt
Right: 359 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::fkImportStatus
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1163 pt
Left: 138 pt
Bottom: 1195 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::is_first_seen_ever
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1199 pt
Left: 138 pt
Bottom: 1231 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::was_seen_in_prior_import
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1235 pt
Left: 138 pt
Bottom: 1267 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::is_duplicate_within_session
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1271 pt
Left: 138 pt
Bottom: 1303 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::is_revision_candidate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1307 pt
Left: 138 pt
Bottom: 1339 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::fkMatchedPriorRow
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1343 pt
Left: 138 pt
Bottom: 1375 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::fkMatchedPriorSession
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1379 pt
Left: 138 pt
Bottom: 1411 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_sourceUKey_LineFingerprint
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1415 pt
Left: 138 pt
Bottom: 1447 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_sourceUKey_DocumentFingerprint
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1451 pt
Left: 138 pt
Bottom: 1483 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_NormalizedReference
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1487 pt
Left: 138 pt
Bottom: 1519 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_NormalizedBusinessDocument
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1523 pt
Left: 138 pt
Bottom: 1555 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_NormalizedSupplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1559 pt
Left: 138 pt
Bottom: 1591 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::calc_NormalizedLineMemo
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(table) Import URF LINES Excel
Top: 1595 pt
Left: 138 pt
Bottom: 1627 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: URF_ROW_ASSIGNMENTS

Regular Fields

Field Name: URF_ROW_ASSIGNMENTS::fkURFImportRow
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 114 pt
Left: 138 pt
Bottom: 145 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 149 pt
Left: 138 pt
Bottom: 180 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::AssignedAmount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 184 pt
Left: 138 pt
Bottom: 215 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::AssignmentMethod
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 219 pt
Left: 138 pt
Bottom: 250 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::AssignedBy
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 254 pt
Left: 138 pt
Bottom: 285 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::AssignedAt
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 289 pt
Left: 138 pt
Bottom: 320 pt
Right: 379 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 324 pt
Left: 138 pt
Bottom: 355 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::fkAssingmentStatus
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 359 pt
Left: 138 pt
Bottom: 390 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::PrimaryKey
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 394 pt
Left: 138 pt
Bottom: 425 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::CreationTimestamp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 429 pt
Left: 138 pt
Bottom: 460 pt
Right: 379 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::CreatedBy
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 464 pt
Left: 138 pt
Bottom: 495 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::ModificationTimestamp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 499 pt
Left: 138 pt
Bottom: 530 pt
Right: 379 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_ROW_ASSIGNMENTS::ModifiedBy
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_ROW_ASSIGNMENTS
Top: 534 pt
Left: 138 pt
Bottom: 565 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: URF_CODED_TRANSACTIONS

Regular Fields

Field Name: URF_CODED_TRANSACTIONS::fkAssignment
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 114 pt
Left: 138 pt
Bottom: 145 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_CODED_TRANSACTIONS::PrimaryKey
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 149 pt
Left: 138 pt
Bottom: 180 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_CODED_TRANSACTIONS::CreationTimestamp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 184 pt
Left: 138 pt
Bottom: 215 pt
Right: 379 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_CODED_TRANSACTIONS::CreatedBy
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 219 pt
Left: 138 pt
Bottom: 250 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_CODED_TRANSACTIONS::ModificationTimestamp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 254 pt
Left: 138 pt
Bottom: 285 pt
Right: 379 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_CODED_TRANSACTIONS::ModifiedBy
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 289 pt
Left: 138 pt
Bottom: 320 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_CODED_TRANSACTIONS::Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 324 pt
Left: 138 pt
Bottom: 355 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_CODED_TRANSACTIONS::PostingDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 359 pt
Left: 138 pt
Bottom: 390 pt
Right: 259 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_CODED_TRANSACTIONS::SourceType
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 394 pt
Left: 138 pt
Bottom: 425 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_CODED_TRANSACTIONS::fkDefaultCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_CODED_TRANSACTIONS
Top: 429 pt
Left: 138 pt
Bottom: 460 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: gBudget Codes

Regular Fields

Field Name: ui_GLOBAL_BudgetHub::calc_FILEPATH
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 62 pt
Left: 1006 pt
Bottom: 102 pt
Right: 1478 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::calc_FILENAME
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 102 pt
Left: 1006 pt
Bottom: 142 pt
Right: 1478 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::calc_FILESIZE_MB
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 142 pt
Left: 1006 pt
Bottom: 180 pt
Right: 1478 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::script_LastSaved
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 182 pt
Left: 1006 pt
Bottom: 219 pt
Right: 1478 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::script_Stats_RecordCounts
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 222 pt
Left: 1006 pt
Bottom: 262 pt
Right: 1478 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::calc_HOSTED_STATUS
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 262 pt
Left: 1006 pt
Bottom: 302 pt
Right: 1478 pt
Anchoring: Left and Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkPREVIOUS_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 335 pt
Left: 1016 pt
Bottom: 375 pt
Right: 1468 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkCOMPARE_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 565 pt
Left: 1017 pt
Bottom: 606 pt
Right: 1468 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 82 pt
Left: 1016 pt
Bottom: 119 pt
Right: 1468 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: BUDGET_AllocationVersions::TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 169 pt
Left: 1327 pt
Bottom: 191 pt
Right: 1448 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 192 pt
Left: 1327 pt
Bottom: 215 pt
Right: 1448 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::DateReceived
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 238 pt
Left: 1326 pt
Bottom: 261 pt
Right: 1448 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::fkFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 215 pt
Left: 1327 pt
Bottom: 238 pt
Right: 1448 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 495 pt
Left: 124 pt
Bottom: 559 pt
Right: 410 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ui_GLOBAL_BudgetHub::g_fkNEXT_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 450 pt
Left: 1016 pt
Bottom: 490 pt
Right: 1468 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: BudgetCode_Defintions::fkBudget_SUFFIX
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 95 pt
Left: 7 pt
Bottom: 123 pt
Right: 260 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: ui_GLOBAL_BudgetHub::g_fkSelectedCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 0 pt
Left: 608 pt
Bottom: 21 pt
Right: 744 pt
Anchoring: Right, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 22 pt
Left: 612 pt
Bottom: 37 pt
Right: 744 pt
Anchoring: Right, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkSelectedFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
gBudget Codes
Top: 70 pt
Left: 332 pt
Bottom: 85 pt
Right: 464 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupEDS_FiscalYears
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{LayoutName}}
Layout Name:
gBudget Codes
Top: 32 pt
Left: 10 pt
Bottom: 54 pt
Right: 324 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
<<APP_TITLE>>
Layout Name:
gBudget Codes
Top: 10 pt
Left: 10 pt
Bottom: 32 pt
Right: 324 pt
Anchoring: Left, Top
ui_GLOBAL_BudgetHub::APP_TITLE
No

Field Properties	Coordinates	Fields	Quick Find
Text:
v<<APP_VERSION>>
Layout Name:
gBudget Codes
Top: 768 pt
Left: 571 pt
Bottom: 783 pt
Right: 723 pt
Anchoring: Right, Top
ui_GLOBAL_BudgetHub::APP_VERSION
No

Field Properties	Coordinates	Fields	Quick Find
Text:
Last save: <<script_LastSaved>>
Layout Name:
gBudget Codes
Top: 780 pt
Left: 437 pt
Bottom: 795 pt
Right: 723 pt
Anchoring: Right, Top
ui_GLOBAL_BudgetHub::script_LastSaved
No

Button Bars

Button Bar Properties	Coordinates
Layout Name:
gBudget Codes
Orientation:
horizontal
Top: 254 pt
Left: 1027 pt
Bottom: 290 pt
Right: 1096 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
gBudget Codes
Label Calculations:
"Notes"
Top: 255 pt
Left: 1028 pt
Bottom: 289 pt
Right: 1095 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
No
Position:
Right
Top: 491 pt
Left: 120 pt
Bottom: 563 pt
Right: 414 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
BUDGET_AllocationVersions::Notes at (495, 124, 559, 410)
Conditional Formatting	Condition	Format
1.	
Formula: not IsEmpty ( BUDGET_AllocationVersions::Notes )

self:normal .self
{
-fm-underline: underline;
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Button Bar Properties	Coordinates
Layout Name:
gBudget Codes
Orientation:
horizontal
Top: 650 pt
Left: 1016 pt
Bottom: 686 pt
Right: 1152 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
gBudget Codes
Label Calculations:
"Set as Default"
Top: 651 pt
Left: 1017 pt
Bottom: 685 pt
Right: 1151 pt
Set Field [ ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET; ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ]
Fields:

ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET

Button Bar Properties	Coordinates
Layout Name:
gBudget Codes
Orientation:
horizontal
Top: 650 pt
Left: 1190 pt
Bottom: 686 pt
Right: 1326 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
gBudget Codes
Label Calculations:
"Recall Default"
Top: 651 pt
Left: 1191 pt
Bottom: 685 pt
Right: 1325 pt
Set Field [ ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion; ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET ]
Fields:

ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET
ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion

Button Bar Properties	Coordinates
Layout Name:
gBudget Codes
Orientation:
horizontal
Top: 10 pt
Left: 291 pt
Bottom: 46 pt
Right: 464 pt
Anchoring: Right, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
gBudget Codes
Label Calculations:
"Navigation placholder"
Top: 11 pt
Left: 292 pt
Bottom: 45 pt
Right: 463 pt
Set Field [ ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET; ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ]
Fields:

ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
ui_GLOBAL_BudgetHub::g_fkACTIVE_BUDGET

Portals

Portal Properties	Coordinates	Fields	Options
Table:
BUDGET_AllocationVersions
Layout Name:
gBudget Codes
Top: 153 pt
Left: 1016 pt
Bottom: 302 pt
Right: 1468 pt
Anchoring: Left, Top
Field Objects
BUDGET_AllocationVersions::TITLE at (169, 1327, 191, 1448)
BUDGET_AllocationVersions::VERSION at (192, 1327, 215, 1448)
BUDGET_AllocationVersions::DateReceived at (238, 1326, 261, 1448)
BUDGET_AllocationVersions::fkFiscalYear at (215, 1327, 238, 1448)
BUDGET_AllocationVersions::Notes at (495, 124, 559, 410)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 1

Portal Properties	Coordinates	Fields	Options
Table:
BudgetCode_Defintions
Layout Name:
gBudget Codes
Top: 89 pt
Left: 0 pt
Bottom: 730 pt
Right: 300 pt
Anchoring: Left, Top and Bottom
Field Objects
BudgetCode_Defintions::fkBudget_SUFFIX at (95, 7, 123, 260)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 16
Show vertical scroll bar

Tab Controls

Tab Control Properties	Coordinates
Layout Name:
gBudget Codes
Justification:
Left
Tab Width:
Default Front Tab:
Tab 1
Top: 0 pt
Left: 996 pt
Bottom: 709 pt
Right: 1488 pt
Anchoring: Left and Right, Top
Tabs
Tab Properties	Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Tab 0:
TextSize ( "File Info" ; 14 )
Field Objects
ui_GLOBAL_BudgetHub::calc_FILEPATH at (62, 1006, 102, 1478)
ui_GLOBAL_BudgetHub::calc_FILENAME at (102, 1006, 142, 1478)
ui_GLOBAL_BudgetHub::calc_FILESIZE_MB at (142, 1006, 180, 1478)
ui_GLOBAL_BudgetHub::script_LastSaved at (182, 1006, 219, 1478)
ui_GLOBAL_BudgetHub::script_Stats_RecordCounts at (222, 1006, 262, 1478)
ui_GLOBAL_BudgetHub::calc_HOSTED_STATUS at (262, 1006, 302, 1478)
Tab 1:
TextSize ( "Budget Selection" ; 14 )
Field Objects
ui_GLOBAL_BudgetHub::g_fkPREVIOUS_BUDGET at (335, 1016, 375, 1468)
ui_GLOBAL_BudgetHub::g_fkCOMPARE_BUDGET at (565, 1017, 606, 1468)
ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion at (82, 1016, 119, 1468)
BUDGET_AllocationVersions::TITLE at (169, 1327, 191, 1448)
BUDGET_AllocationVersions::VERSION at (192, 1327, 215, 1448)
BUDGET_AllocationVersions::DateReceived at (238, 1326, 261, 1448)
BUDGET_AllocationVersions::fkFiscalYear at (215, 1327, 238, 1448)
BUDGET_AllocationVersions::Notes at (495, 124, 559, 410)
ui_GLOBAL_BudgetHub::g_fkNEXT_BUDGET at (450, 1016, 490, 1468)
Portal Object at (153, 1016, 302, 1468)
Tab 2:
TextSize ( "Print Options" ; 14 )

Layout Objects: ui_GLOBAL_BudgetHub

Regular Fields

Field Name: ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
ui_GLOBAL_BudgetHub
Top: 115 pt
Left: 161 pt
Bottom: 134 pt
Right: 414 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkPREVIOUS_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
ui_GLOBAL_BudgetHub
Top: 191 pt
Left: 161 pt
Bottom: 210 pt
Right: 414 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: ui_GLOBAL_BudgetHub::g_fkCOMPARE_BUDGET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
ui_GLOBAL_BudgetHub
Top: 267 pt
Left: 161 pt
Bottom: 286 pt
Right: 414 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: XX_GLOBAL_fileSetup::APP_TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
ui_GLOBAL_BudgetHub
Top: 115 pt
Left: 704 pt
Bottom: 134 pt
Right: 957 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: XX_GLOBAL_fileSetup::APP_VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
ui_GLOBAL_BudgetHub
Top: 138 pt
Left: 704 pt
Bottom: 157 pt
Right: 957 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Layout Objects: relegate_Supervisors

Regular Fields

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
relegate_Supervisors
Top: 134 pt
Left: 10 pt
Bottom: 153 pt
Right: 263 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: (Setup) Code Header Categories

Regular Fields

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Setup) Code Header Categories
Top: 43 pt
Left: 132 pt
Bottom: 62 pt
Right: 385 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Setup) Code Header Categories
Top: 43 pt
Left: 4 pt
Bottom: 62 pt
Right: 83 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Layout Objects: -

Layout Objects: GLOBAL_scriptVariables

Regular Fields

Field Name: GLOBAL_scriptVariables::CODEpk
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
GLOBAL_scriptVariables
Top: 114 pt
Left: 138 pt
Bottom: 145 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Layout Objects: XXimport_URF_AUX

Layout Objects: XX_GLOBAL_PrintingVariables

Regular Fields

Field Name: XX_GLOBAL_PrintingVariables::xx_CodeSortedBy
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
XX_GLOBAL_PrintingVariables
Top: 114 pt
Left: 138 pt
Bottom: 145 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Layout Objects: -

Layout Objects: (Print) URITP Budget Codes FY26

Regular Fields

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 174 pt
Left: 84 pt
Bottom: 188 pt
Right: 319 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No
Conditional Formatting	Condition	Format
1.	
Formula: Mod ( <Table Missing>::<Field Missing> ; 10 ) = 0

self:normal .self
{
background-color: rgba(69.0275%,84.7764%,94.77%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}
2.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
background-color: rgba(81.1765%,73.3333%,99.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 174 pt
Left: 16 pt
Bottom: 188 pt
Right: 85 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No
Conditional Formatting	Condition	Format
1.	
Formula: Mod ( <Table Missing>::<Field Missing> ; 10 ) = 0

self:normal .self
{
background-color: rgba(69.0275%,84.7764%,94.77%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}
2.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
background-color: rgba(81.1765%,73.3333%,99.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 174 pt
Left: 319 pt
Bottom: 188 pt
Right: 382 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No
Conditional Formatting	Condition	Format
1.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
background-color: rgba(81.1765%,73.3333%,99.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 174 pt
Left: 2 pt
Bottom: 189 pt
Right: 16 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 311 pt
Left: 298 pt
Bottom: 330 pt
Right: 374 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 174 pt
Left: 383 pt
Bottom: 188 pt
Right: 446 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No
Conditional Formatting	Condition	Format
1.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
background-color: rgba(81.1765%,73.3333%,99.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 311 pt
Left: 375 pt
Bottom: 330 pt
Right: 453 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 174 pt
Left: 447 pt
Bottom: 188 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No
Conditional Formatting	Condition	Format
1.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
background-color: rgba(81.1765%,73.3333%,99.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 311 pt
Left: 454 pt
Bottom: 330 pt
Right: 530 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 227 pt
Left: 408 pt
Bottom: 265 pt
Right: 642 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 296 pt
Left: 408 pt
Bottom: 311 pt
Right: 595 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (popup) Code HEADERS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 332 pt
Left: 408 pt
Bottom: 347 pt
Right: 507 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: fk_budgetOwners
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 378 pt
Left: 409 pt
Bottom: 397 pt
Right: 488 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 414 pt
Left: 399 pt
Bottom: 433 pt
Right: 652 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: fk_budgetOwners
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 193 pt
Left: 319 pt
Bottom: 209 pt
Right: 382 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 193 pt
Left: 383 pt
Bottom: 209 pt
Right: 446 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 193 pt
Left: 447 pt
Bottom: 209 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 91 pt
Left: 16 pt
Bottom: 110 pt
Right: 572 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 221 pt
Left: 319 pt
Bottom: 237 pt
Right: 382 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 221 pt
Left: 383 pt
Bottom: 237 pt
Right: 446 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 221 pt
Left: 447 pt
Bottom: 237 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 111 pt
Left: 15 pt
Bottom: 130 pt
Right: 85 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 115 pt
Left: 85 pt
Bottom: 129 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No
Conditional Formatting	Condition	Format
1.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 131 pt
Left: 15 pt
Bottom: 150 pt
Right: 85 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 135 pt
Left: 85 pt
Bottom: 149 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No
Conditional Formatting	Condition	Format
1.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 247 pt
Left: 319 pt
Bottom: 263 pt
Right: 382 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 247 pt
Left: 383 pt
Bottom: 263 pt
Right: 446 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 247 pt
Left: 447 pt
Bottom: 263 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 153 pt
Left: 15 pt
Bottom: 172 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: fk_budgetOwners
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 273 pt
Left: 319 pt
Bottom: 289 pt
Right: 382 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 273 pt
Left: 383 pt
Bottom: 289 pt
Right: 446 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes FY26
Top: 273 pt
Left: 447 pt
Bottom: 289 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{RecordNumber}}
Layout Name:
(Print) URITP Budget Codes FY26
Top: 175 pt
Left: 477 pt
Bottom: 187 pt
Right: 574 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
<<<Table Missing>>> SUBTOTAL:
Layout Name:
(Print) URITP Budget Codes FY26
Top: 196 pt
Left: 0 pt
Bottom: 222 pt
Right: 316 pt
Anchoring: Left, Top
<Missing Field>
No

Field Properties	Coordinates	Fields	Quick Find
Text:
{{PageNumber}}
Layout Name:
(Print) URITP Budget Codes FY26
Top: 356 pt
Left: 243 pt
Bottom: 371 pt
Right: 333 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
{{CurrentDate}}
Layout Name:
(Print) URITP Budget Codes FY26
Top: 356 pt
Left: 488 pt
Bottom: 371 pt
Right: 573 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
Summed by
Layout Name:
(Print) URITP Budget Codes FY26
Top: 50 pt
Left: 156 pt
Bottom: 66 pt
Right: 572 pt
Anchoring: Left, Top
XX_GLOBAL_PrintingVariables::xx_CodeSortedBy
No

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(Print) URITP Budget Codes FY26
Orientation:
horizontal
Top: 175 pt
Left: 514 pt
Bottom: 189 pt
Right: 550 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
(Print) URITP Budget Codes FY26
Label Calculations:
"Details"
Top: 176 pt
Left: 515 pt
Bottom: 188 pt
Right: 549 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
Yes
Title:
"Popover"
Position:
Bottom
Top: 199 pt
Left: 387 pt
Bottom: 599 pt
Right: 677 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
<Missing Field> at (227, 408, 265, 642)
<Missing Field> at (296, 408, 311, 595)
<Missing Field> at (332, 408, 347, 507)
<Missing Field> at (378, 409, 397, 488)
<Missing Field> at (414, 399, 433, 652)

Button Bar Properties	Coordinates
Layout Name:
(Print) URITP Budget Codes FY26
Orientation:
horizontal
Top: 476 pt
Left: 408 pt
Bottom: 514 pt
Right: 524 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes FY26
Label Calculations:
"GO TO"
Top: 477 pt
Left: 409 pt
Bottom: 513 pt
Right: 523 pt
Perform Script [ “goToCodedTransactions” ]
Scripts:

goToCodedTransactions

Button Bar Properties	Coordinates
Layout Name:
(Print) URITP Budget Codes FY26
Orientation:
horizontal
Top: 4 pt
Left: 13 pt
Bottom: 23 pt
Right: 357 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes FY26
Label Calculations:
"sort by HEADER"
Top: 5 pt
Left: 15 pt
Bottom: 23 pt
Right: 83 pt
Perform Script [ “SortedbyHeader” ]
Scripts:

SortedbyHeader
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes FY26
Label Calculations:
"code10"
Top: 5 pt
Left: 83 pt
Bottom: 23 pt
Right: 151 pt
Perform Script [ “SortedbyCode10” ]
Scripts:

SortedbyCode10
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes FY26
Label Calculations:
"code100"
Top: 5 pt
Left: 151 pt
Bottom: 23 pt
Right: 219 pt
Perform Script [ “SortbyCode100” ]
Scripts:

SortbyCode100
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes FY26
Label Calculations:
"just codes"
Top: 5 pt
Left: 219 pt
Bottom: 23 pt
Right: 288 pt
Perform Script [ “SortedbyCode10 Copy” ]
Scripts:

SortedbyCode10 Copy
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes FY26
Label Calculations:
"by OWNER"
Top: 5 pt
Left: 288 pt
Bottom: 23 pt
Right: 356 pt
Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; descending <Table Missing>; ascending <Table Missing>; ascending ] [ Restore; No dialog ]
Fields:

<Missing Field>
<Missing Field>
<Missing Field>

Button Bar Properties	Coordinates
Layout Name:
(Print) URITP Budget Codes FY26
Orientation:
horizontal
Top: 4 pt
Left: 461 pt
Bottom: 23 pt
Right: 571 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes FY26
Label Calculations:
"save set"
Top: 5 pt
Left: 463 pt
Bottom: 23 pt
Right: 571 pt
Perform Script [ “printAllCodeFormats” ]
Scripts:

printAllCodeFormats

Layout Objects: (Print) URITP Budget Codes Allocation HISTORY

Regular Fields

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 174 pt
Left: 52 pt
Bottom: 188 pt
Right: 263 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: Mod ( <Table Missing>::<Field Missing> ; 10 ) = 0

self:normal .self
{
background-color: rgba(69.0275%,84.7764%,94.77%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}
2.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
background-color: rgba(81.1765%,73.3333%,99.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 174 pt
Left: 16 pt
Bottom: 188 pt
Right: 52 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: Mod ( <Table Missing>::<Field Missing> ; 10 ) = 0

self:normal .self
{
background-color: rgba(69.0275%,84.7764%,94.77%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}
2.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
background-color: rgba(81.1765%,73.3333%,99.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 174 pt
Left: 265 pt
Bottom: 188 pt
Right: 321 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
background-color: rgba(81.1765%,73.3333%,99.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 174 pt
Left: 2 pt
Bottom: 189 pt
Right: 16 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 311 pt
Left: 298 pt
Bottom: 330 pt
Right: 374 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 174 pt
Left: 320 pt
Bottom: 188 pt
Right: 375 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
background-color: rgba(81.1765%,73.3333%,99.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 311 pt
Left: 375 pt
Bottom: 330 pt
Right: 453 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 227 pt
Left: 408 pt
Bottom: 265 pt
Right: 642 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 296 pt
Left: 408 pt
Bottom: 311 pt
Right: 595 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (popup) Code HEADERS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 332 pt
Left: 408 pt
Bottom: 347 pt
Right: 507 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: fk_budgetOwners
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 378 pt
Left: 409 pt
Bottom: 397 pt
Right: 488 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 414 pt
Left: 399 pt
Bottom: 433 pt
Right: 652 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: fk_budgetOwners
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 193 pt
Left: 259 pt
Bottom: 209 pt
Right: 322 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 193 pt
Left: 323 pt
Bottom: 209 pt
Right: 386 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 91 pt
Left: 16 pt
Bottom: 110 pt
Right: 572 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 221 pt
Left: 259 pt
Bottom: 237 pt
Right: 322 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 221 pt
Left: 323 pt
Bottom: 237 pt
Right: 386 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 111 pt
Left: 15 pt
Bottom: 130 pt
Right: 85 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 115 pt
Left: 85 pt
Bottom: 129 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 131 pt
Left: 15 pt
Bottom: 150 pt
Right: 85 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 135 pt
Left: 85 pt
Bottom: 149 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: <Table Missing>::<Field Missing> = 1

self:normal .self
{
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 247 pt
Left: 259 pt
Bottom: 263 pt
Right: 322 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 247 pt
Left: 323 pt
Bottom: 263 pt
Right: 386 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 153 pt
Left: 15 pt
Bottom: 172 pt
Right: 510 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: fk_budgetOwners
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 273 pt
Left: 259 pt
Bottom: 289 pt
Right: 322 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 273 pt
Left: 323 pt
Bottom: 289 pt
Right: 386 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 174 pt
Left: 375 pt
Bottom: 188 pt
Right: 536 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{RecordNumber}}
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 175 pt
Left: 481 pt
Bottom: 187 pt
Right: 578 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
<<<Table Missing>>> SUBTOTAL:
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 196 pt
Left: 0 pt
Bottom: 222 pt
Right: 266 pt
Anchoring: Left, Top
<Missing Field>
No

Field Properties	Coordinates	Fields	Quick Find
Text:
{{PageNumber}}
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 356 pt
Left: 243 pt
Bottom: 371 pt
Right: 333 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
{{CurrentDate}}
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 356 pt
Left: 488 pt
Bottom: 371 pt
Right: 573 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
Summed by
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Top: 50 pt
Left: 156 pt
Bottom: 66 pt
Right: 572 pt
Anchoring: Left, Top
XX_GLOBAL_PrintingVariables::xx_CodeSortedBy
No

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Orientation:
horizontal
Top: 174 pt
Left: 578 pt
Bottom: 188 pt
Right: 614 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Label Calculations:
"Details"
Top: 175 pt
Left: 579 pt
Bottom: 187 pt
Right: 613 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
Yes
Title:
"Popover"
Position:
Bottom
Top: 199 pt
Left: 387 pt
Bottom: 599 pt
Right: 677 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
<Missing Field> at (227, 408, 265, 642)
<Missing Field> at (296, 408, 311, 595)
<Missing Field> at (332, 408, 347, 507)
<Missing Field> at (378, 409, 397, 488)
<Missing Field> at (414, 399, 433, 652)

Button Bar Properties	Coordinates
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Orientation:
horizontal
Top: 476 pt
Left: 408 pt
Bottom: 514 pt
Right: 524 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Label Calculations:
"GO TO"
Top: 477 pt
Left: 409 pt
Bottom: 513 pt
Right: 523 pt
Perform Script [ “goToCodedTransactions” ]
Scripts:

goToCodedTransactions

Button Bar Properties	Coordinates
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Orientation:
horizontal
Top: 4 pt
Left: 13 pt
Bottom: 23 pt
Right: 357 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Label Calculations:
"sort by HEADER"
Top: 5 pt
Left: 14 pt
Bottom: 22 pt
Right: 83 pt
Perform Script [ “SortedbyHeader” ]
Scripts:

SortedbyHeader
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Label Calculations:
"code10"
Top: 5 pt
Left: 83 pt
Bottom: 22 pt
Right: 151 pt
Perform Script [ “SortedbyCode10” ]
Scripts:

SortedbyCode10
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Label Calculations:
"code100"
Top: 5 pt
Left: 151 pt
Bottom: 22 pt
Right: 219 pt
Perform Script [ “SortbyCode100” ]
Scripts:

SortbyCode100
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Label Calculations:
"just codes"
Top: 5 pt
Left: 219 pt
Bottom: 22 pt
Right: 288 pt
Perform Script [ “SortedbyCode10 Copy” ]
Scripts:

SortedbyCode10 Copy
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Label Calculations:
"by OWNER"
Top: 5 pt
Left: 288 pt
Bottom: 22 pt
Right: 356 pt
Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; descending <Table Missing>; ascending <Table Missing>; ascending ] [ Restore; No dialog ]
Fields:

<Missing Field>
<Missing Field>
<Missing Field>

Button Bar Properties	Coordinates
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Orientation:
horizontal
Top: 4 pt
Left: 461 pt
Bottom: 23 pt
Right: 571 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Print) URITP Budget Codes Allocation HISTORY
Label Calculations:
"save set"
Top: 5 pt
Left: 462 pt
Bottom: 22 pt
Right: 570 pt
Perform Script [ “printAllCodeFormats” ]
Scripts:

printAllCodeFormats

Layout Objects: (form) CODED Transactions

Regular Fields

Field Name: Code_Definitions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 91 pt
Left: 49 pt
Bottom: 110 pt
Right: 314 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( Code_Definitions::xxFY27 Allocation ) ; Mod ( Code_Definitions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Code_Definitions::xxFY26_REMAINING
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Hide Condition:
Code_Definitions::xxFY26_Spent = 0
Top: 91 pt
Left: 202 pt
Bottom: 110 pt
Right: 314 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( Code_Definitions::xxFY27 Allocation ) ; Mod ( Code_Definitions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Code_Definitions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 91 pt
Left: 8 pt
Bottom: 110 pt
Right: 49 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( Code_Definitions::xxFY27 Allocation ) ; Mod ( Code_Definitions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Code_Definitions::xxFY26 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Hide Condition:
Code_Definitions::xxFY26_Spent ≠ 0
Top: 91 pt
Left: 208 pt
Bottom: 110 pt
Right: 314 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( Code_Definitions::xxFY27 Allocation ) ; Mod ( Code_Definitions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: URF_IMPORT_ROWS::xxs_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Object Name:
PORTAL_SUMMARY
Layout Name:
(form) CODED Transactions
Top: 757 pt
Left: 354 pt
Bottom: 792 pt
Right: 724 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 237 pt
Left: 346 pt
Bottom: 253 pt
Right: 412 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 237 pt
Left: 412 pt
Bottom: 253 pt
Right: 491 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 237 pt
Left: 491 pt
Bottom: 253 pt
Right: 665 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Reference
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 237 pt
Left: 1161 pt
Bottom: 253 pt
Right: 1312 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::xxfkBUDGET_CODE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 237 pt
Left: 1313 pt
Bottom: 253 pt
Right: 1442 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup Budget Code Number
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26_REMAINING
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 197 pt
Left: 469 pt
Bottom: 216 pt
Right: 553 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 158 pt
Left: 469 pt
Bottom: 177 pt
Right: 553 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26_Spent
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 177 pt
Left: 469 pt
Bottom: 196 pt
Right: 553 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: CumSale_LABOUR::FYTD_Regular_Extra
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 381 pt
Left: 1624 pt
Bottom: 397 pt
Right: 1703 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: CumSale_LABOUR::Worker
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 381 pt
Left: 1450 pt
Bottom: 397 pt
Right: 1624 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 604 pt
Left: 367 pt
Bottom: 639 pt
Right: 737 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Budget_Allocation::Description
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 166 pt
Left: 500 pt
Bottom: 185 pt
Right: 728 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: Budget_Allocation::AmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 166 pt
Left: 728 pt
Bottom: 185 pt
Right: 807 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 166 pt
Left: 807 pt
Bottom: 185 pt
Right: 894 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Include "Other..." item to allow entry of other values
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: Budget_Allocation::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 166 pt
Left: 894 pt
Bottom: 185 pt
Right: 1340 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: Budget_Allocation::fkBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 166 pt
Left: 365 pt
Bottom: 185 pt
Right: 500 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Include "Other..." item to allow entry of other values
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
No

Field Name: Code_Definitions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 94 pt
Left: 368 pt
Bottom: 121 pt
Right: 471 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Code_Definitions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 94 pt
Left: 471 pt
Bottom: 121 pt
Right: 822 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Code_Definitions::PUBLICNotes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 94 pt
Left: 822 pt
Bottom: 121 pt
Right: 1184 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::PVT Allocation Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) CODED Transactions
Top: 132 pt
Left: 1323 pt
Bottom: 166 pt
Right: 1632 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(form) CODED Transactions
Orientation:
horizontal
Top: 237 pt
Left: 665 pt
Bottom: 253 pt
Right: 1161 pt
Anchoring: Left, Top

Button Bar Properties	Coordinates
Layout Name:
(form) CODED Transactions
Orientation:
horizontal
Top: 216 pt
Left: 346 pt
Bottom: 235 pt
Right: 491 pt
Anchoring: Left, Top

Button Bar Properties	Coordinates
Layout Name:
(form) CODED Transactions
Orientation:
horizontal
Top: 216 pt
Left: 666 pt
Bottom: 235 pt
Right: 1162 pt
Anchoring: Left, Top

Button Bar Properties	Coordinates
Layout Name:
(form) CODED Transactions
Orientation:
horizontal
Top: 216 pt
Left: 491 pt
Bottom: 235 pt
Right: 665 pt
Anchoring: Left, Top

Button Bar Properties	Coordinates
Layout Name:
(form) CODED Transactions
Orientation:
horizontal
Top: 345 pt
Left: 1451 pt
Bottom: 372 pt
Right: 1725 pt
Anchoring: Left, Top

Button Bar Properties	Coordinates
Layout Name:
(form) CODED Transactions
Orientation:
horizontal
Top: 755 pt
Left: 6 pt
Bottom: 790 pt
Right: 335 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) CODED Transactions
Label Calculations:
"PREV"
Top: 756 pt
Left: 7 pt
Bottom: 789 pt
Right: 171 pt
Go to Record/Request/Page [ Previous ]
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) CODED Transactions
Label Calculations:
"NEXT"
Top: 756 pt
Left: 171 pt
Bottom: 789 pt
Right: 334 pt
Go to Record/Request/Page [ Next ]

Button Bar Properties	Coordinates
Layout Name:
(form) CODED Transactions
Orientation:
horizontal
Top: 9 pt
Left: 6 pt
Bottom: 54 pt
Right: 208 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) CODED Transactions
Label Calculations:
"print CODES"
Top: 10 pt
Left: 7 pt
Bottom: 53 pt
Right: 207 pt
Go to Layout [ “(Print) URITP Budget Codes FY26” (BudgetCode_YearConfig) ]
Layouts:

(Print) URITP Budget Codes FY26

Portals

Portal Properties	Coordinates	Fields	Options
Table:
Code_Definitions
Layout Name:
(form) CODED Transactions
Top: 88 pt
Left: 6 pt
Bottom: 734 pt
Right: 335 pt
Anchoring: Left, Top
Field Objects
Code_Definitions::Default Name at (91, 49, 110, 314)
Code_Definitions::xxFY26_REMAINING at (91, 202, 110, 314)
Code_Definitions::Default Code at (91, 8, 110, 49)
Code_Definitions::xxFY26 Allocation at (91, 208, 110, 314)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 28
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Object Name:
SUMMARY_PORTAL
Table:
URF_IMPORT_ROWS
Layout Name:
(form) CODED Transactions
Top: 751 pt
Left: 347 pt
Bottom: 797 pt
Right: 1027 pt
Anchoring: Left, Top
Field Objects
URF_IMPORT_ROWS::xxs_Amount at (757, 354, 792, 724)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 1

Portal Properties	Coordinates	Fields	Options
Object Name:
CurrentAllocationPortal Copy
Table:
URF_IMPORT_ROWS
Layout Name:
(form) CODED Transactions
Top: 235 pt
Left: 343 pt
Bottom: 741 pt
Right: 1443 pt
Anchoring: Left, Top
Field Objects
URF_IMPORT_ROWS::source_BudgetDate at (237, 346, 253, 412)
URF_IMPORT_ROWS::source_Amount at (237, 412, 253, 491)
URF_IMPORT_ROWS::source_Supplier at (237, 491, 253, 665)
URF_IMPORT_ROWS::source_Reference at (237, 1161, 253, 1312)
URF_IMPORT_ROWS::xxfkBUDGET_CODE at (237, 1313, 253, 1442)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 28
Show vertical scroll bar

Portal Properties	Coordinates	Fields	Options
Object Name:
CurrentAllocationPortal Copy2
Table:
CumSale_LABOUR
Layout Name:
(form) CODED Transactions
Top: 379 pt
Left: 1448 pt
Bottom: 741 pt
Right: 1725 pt
Anchoring: Left, Top
Field Objects
CumSale_LABOUR::FYTD_Regular_Extra at (381, 1624, 397, 1703)
CumSale_LABOUR::Worker at (381, 1450, 397, 1624)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 20

Portal Properties	Coordinates	Fields	Options
Object Name:
ALL_Summary
Table:
Budget_Allocation
Layout Name:
(form) CODED Transactions
Top: 598 pt
Left: 360 pt
Bottom: 644 pt
Right: 1040 pt
Anchoring: Left, Top
Field Objects
Budget_Allocation::SummaryAmountAwarded at (604, 367, 639, 737)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 1
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Object Name:
CurrentAllocationPortal Copy 2
Table:
Budget_Allocation
Layout Name:
(form) CODED Transactions
Top: 161 pt
Left: 360 pt
Bottom: 595 pt
Right: 1515 pt
Anchoring: Left, Top
Field Objects
Budget_Allocation::Description at (166, 500, 185, 728)
Budget_Allocation::AmountAwarded at (166, 728, 185, 807)
Budget_Allocation::fkBudgetCode at (166, 807, 185, 894)
Budget_Allocation::Notes at (166, 894, 185, 1340)
Budget_Allocation::fkBudgetVersion at (166, 365, 185, 500)
Sort records: On
Field: fkBudgetVersion

Descending order
Reorder based on summary field: Off
Override field's language for sort: Off
Field: Description

Ascending order
Reorder based on summary field: Off
Override field's language for sort: Off

Filter calculation: None
Initial Row: 1
Number of Rows: 16
Show vertical scroll bar
Allow deletion of portal records

Tab Controls

Tab Control Properties	Coordinates
Layout Name:
(form) CODED Transactions
Justification:
Left
Tab Width:
Default Front Tab:
Tab 0
Top: 132 pt
Left: 343 pt
Bottom: 812 pt
Right: 1725 pt
Anchoring: Left, Top
Tabs
Tab Properties	Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Tab 0:
"CURRENT"
Field Objects
URF_IMPORT_ROWS::xxs_Amount at (757, 354, 792, 724)
URF_IMPORT_ROWS::source_BudgetDate at (237, 346, 253, 412)
URF_IMPORT_ROWS::source_Amount at (237, 412, 253, 491)
URF_IMPORT_ROWS::source_Supplier at (237, 491, 253, 665)
URF_IMPORT_ROWS::source_Reference at (237, 1161, 253, 1312)
URF_IMPORT_ROWS::xxfkBUDGET_CODE at (237, 1313, 253, 1442)
Code_Definitions::xxFY26_REMAINING at (197, 469, 216, 553)
Code_Definitions::xxFY26 Allocation at (158, 469, 177, 553)
Code_Definitions::xxFY26_Spent at (177, 469, 196, 553)
CumSale_LABOUR::FYTD_Regular_Extra at (381, 1624, 397, 1703)
CumSale_LABOUR::Worker at (381, 1450, 397, 1624)
Portal Object at (751, 347, 797, 1027)
Portal Object at (235, 343, 741, 1443)
Portal Object at (379, 1448, 741, 1725)
Tab 1:
"All"
Field Objects
Budget_Allocation::SummaryAmountAwarded at (604, 367, 639, 737)
Budget_Allocation::Description at (166, 500, 185, 728)
Budget_Allocation::AmountAwarded at (166, 728, 185, 807)
Budget_Allocation::fkBudgetCode at (166, 807, 185, 894)
Budget_Allocation::Notes at (166, 894, 185, 1340)
Budget_Allocation::fkBudgetVersion at (166, 365, 185, 500)
Portal Object at (598, 360, 644, 1040)

Layout Objects: (List) Budget Versions

Regular Fields

Field Name: BUDGET_AllocationVersions::SORT_ORDER
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(List) Budget Versions
Top: 48 pt
Left: 7 pt
Bottom: 103 pt
Right: 88 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(List) Budget Versions
Top: 72 pt
Left: 93 pt
Bottom: 103 pt
Right: 592 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BUDGET_AllocationVersions::VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(List) Budget Versions
Top: 48 pt
Left: 251 pt
Bottom: 67 pt
Right: 332 pt
Anchoring: Left, Top
Field Format:
Drop-down List
Display values from: (dropdown) Budget_REVs
Include "Edit..." item to allow editing of value list
Auto-complete using value list
Include arrow to show and hide list
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::DateReceived
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(List) Budget Versions
Top: 48 pt
Left: 339 pt
Bottom: 67 pt
Right: 592 pt
Anchoring: Left, Top
Field Format:
Drop-down Calendar
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::fkFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(List) Budget Versions
Top: 48 pt
Left: 93 pt
Bottom: 67 pt
Right: 240 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popupEDS_FiscalYears
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::fkSuperseededBy
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(List) Budget Versions
Top: 107 pt
Left: 138 pt
Bottom: 126 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BUDGET_AllocationVersions::CreationTimestamp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(List) Budget Versions
Visibility:
Only visible in Table View
Top: 24 pt
Left: 473 pt
Bottom: 45 pt
Right: 593 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(List) Budget Versions
Orientation:
horizontal
Top: 51 pt
Left: 606 pt
Bottom: 103 pt
Right: 697 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(List) Budget Versions
Label Calculations:
"GO"
Top: 52 pt
Left: 607 pt
Bottom: 102 pt
Right: 696 pt
Go to Layout [ “(form) Budget Versions” (BUDGET_AllocationVersions) ]
Layouts:

(form) Budget Versions

Layout Objects: (Layout) NM Allocation Format

Regular Fields

Field Name: Budget_Allocation::Description
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 201 pt
Left: 63 pt
Bottom: 220 pt
Right: 279 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::NM_sort
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 201 pt
Left: 12 pt
Bottom: 220 pt
Right: 58 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::AmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 201 pt
Left: 284 pt
Bottom: 220 pt
Right: 363 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::fkBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 201 pt
Left: 915 pt
Bottom: 220 pt
Right: 1019 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 201 pt
Left: 636 pt
Bottom: 220 pt
Right: 740 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup Budget Code Number
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 282 pt
Left: 256 pt
Bottom: 301 pt
Right: 363 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Budget_Allocation::AllocationWorksheet
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 143 pt
Left: 9 pt
Bottom: 170 pt
Right: 797 pt
Anchoring: Left, Top
Field Format:
Drop-down List
Display values from: NM_AllocationWorksheets
Auto-complete using value list
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 201 pt
Left: 366 pt
Bottom: 220 pt
Right: 635 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 237 pt
Left: 284 pt
Bottom: 256 pt
Right: 363 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Budget_Allocation::AllocationWorksheet
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 196 pt
Left: 547 pt
Bottom: 215 pt
Right: 701 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: NM_AllocationWorksheets
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::NM_Subtotal
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 220 pt
Left: 547 pt
Bottom: 239 pt
Right: 701 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: NM_SubtotalCategories
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::NM_Subtotal
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(Layout) NM Allocation Format
Top: 177 pt
Left: 12 pt
Bottom: 196 pt
Right: 800 pt
Anchoring: Left, Top
Field Format:
Drop-down List
Display values from: NM_AllocationWorksheets
Auto-complete using value list
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Buttons

Button Properties	Coordinates	Script/Script Step
Type:
Text: find Allocation
Layout Name:
(Layout) NM Allocation Format
Top: 8 pt
Left: 9 pt
Bottom: 46 pt
Right: 132 pt
Anchoring: Left, Top
Perform Script [ “findAllocation” ]
Scripts:

findAllocation

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(Layout) NM Allocation Format
Orientation:
horizontal
Top: 57 pt
Left: 12 pt
Bottom: 112 pt
Right: 376 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format
Label Calculations:
"byWORKSHEET"
Top: 58 pt
Left: 13 pt
Bottom: 111 pt
Right: 194 pt
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_Allocation::AllocationWorksheet; based on value list: “NM_AllocationWorksheets” Budget_Allocation::NM_Subtotal; based on value list: “NM_SubtotalCategories” Budget_Allocation::NM_sort; ascending ] [ Restore; No dialog ]
Fields:

Budget_Allocation::AllocationWorksheet
Budget_Allocation::NM_Subtotal
Budget_Allocation::NM_sort
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format
Label Calculations:
"NEW"
Top: 58 pt
Left: 194 pt
Bottom: 111 pt
Right: 375 pt
Perform Script [ “newAllocationWcurrent” ]
Scripts:

newAllocationWcurrent

Button Bar Properties	Coordinates
Layout Name:
(Layout) NM Allocation Format
Orientation:
horizontal
Top: 201 pt
Left: 741 pt
Bottom: 220 pt
Right: 848 pt
Anchoring: Left, Top
Popover Button Segments
Popover Button Properties	Coordinates
Type:
Text:
Layout Name:
(Layout) NM Allocation Format
Label Calculations:
"NM WORKSHEET"
Top: 202 pt
Left: 742 pt
Bottom: 219 pt
Right: 847 pt
Anchoring: Left, Top
Popover Properties	Coordinates
Show Title Bar:
Yes
Title:
"Popover"
Position:
Left
Top: 164 pt
Left: 527 pt
Bottom: 258 pt
Right: 731 pt
Anchoring: Left, Top
Popover Content
Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Field Objects
Budget_Allocation::AllocationWorksheet at (196, 547, 215, 701)
Budget_Allocation::NM_Subtotal at (220, 547, 239, 701)

Button Bar Properties	Coordinates
Layout Name:
(Layout) NM Allocation Format
Orientation:
horizontal
Top: 201 pt
Left: 854 pt
Bottom: 220 pt
Right: 909 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format
Label Calculations:
"dup."
Top: 202 pt
Left: 855 pt
Bottom: 219 pt
Right: 908 pt
Duplicate Record/Request

Button Bar Properties	Coordinates
Layout Name:
(Layout) NM Allocation Format
Orientation:
horizontal
Top: 21 pt
Left: 551 pt
Bottom: 76 pt
Right: 915 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format
Label Calculations:
"DELETE"
Top: 22 pt
Left: 552 pt
Bottom: 75 pt
Right: 733 pt
Delete Record/Request
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(Layout) NM Allocation Format
Label Calculations:
"NEW"
Top: 22 pt
Left: 733 pt
Bottom: 75 pt
Right: 914 pt
Perform Script [ “newAllocationWcurrent” ]
Scripts:

newAllocationWcurrent

Layout Objects: (list) individual Allocations

Regular Fields

Field Name: Budget_Allocation::Description
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(list) individual Allocations
Top: 24 pt
Left: 113 pt
Bottom: 43 pt
Right: 366 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::AmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(list) individual Allocations
Top: 24 pt
Left: 370 pt
Bottom: 43 pt
Right: 465 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::fkBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(list) individual Allocations
Top: 24 pt
Left: 10 pt
Bottom: 43 pt
Right: 109 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(list) individual Allocations
Top: 24 pt
Left: 469 pt
Bottom: 43 pt
Right: 784 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(list) individual Allocations
Top: 24 pt
Left: 788 pt
Bottom: 43 pt
Right: 1041 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::FLAG
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(list) individual Allocations
Top: 22 pt
Left: 1045 pt
Bottom: 45 pt
Right: 1065 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: Current_Allocation

Regular Fields

Field Name: Budget_Allocation::Description
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 157 pt
Left: 16 pt
Bottom: 172 pt
Right: 147 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::AmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 157 pt
Left: 149 pt
Bottom: 172 pt
Right: 209 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: Budget_Allocation::FLAG = 1

self:normal .self
{
background-color: rgba(100%,90.9804%,79.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Budget_Allocation::fkBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 110 pt
Left: 473 pt
Bottom: 125 pt
Right: 575 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 156 pt
Left: 210 pt
Bottom: 172 pt
Right: 361 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 156 pt
Left: 361 pt
Bottom: 172 pt
Right: 567 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::FLAG
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 157 pt
Left: 1 pt
Bottom: 171 pt
Right: 14 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::WORKSHEET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 157 pt
Left: 622 pt
Bottom: 172 pt
Right: 724 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: NM_Worksheets
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::WORKSHEET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 110 pt
Left: 83 pt
Bottom: 126 pt
Right: 313 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 186 pt
Left: 149 pt
Bottom: 205 pt
Right: 228 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 242 pt
Left: 149 pt
Bottom: 261 pt
Right: 228 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Budget_Allocation::fkBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 133 pt
Left: 473 pt
Bottom: 148 pt
Right: 575 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Current_Allocation
Top: 133 pt
Left: 83 pt
Bottom: 149 pt
Right: 463 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Buttons

Button Properties	Coordinates	Script/Script Step
Type:
Text: Show ACTIVE Allocation
Layout Name:
Current_Allocation
Top: 5 pt
Left: 444 pt
Bottom: 60 pt
Right: 567 pt
Anchoring: Left, Top
Perform Script [ “showOnly_CurrentAllocation” ]
Scripts:

showOnly_CurrentAllocation

Button Properties	Coordinates	Script/Script Step
Type:
Text: by WORKSHEET
Layout Name:
Current_Allocation
Top: 5 pt
Left: 29 pt
Bottom: 60 pt
Right: 295 pt
Anchoring: Left, Top
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_Allocation::WORKSHEET; ascending ] [ Restore; No dialog ]
Fields:

Budget_Allocation::WORKSHEET

Button Bars

Button Bar Properties	Coordinates
Layout Name:
Current_Allocation
Orientation:
horizontal
Top: 32 pt
Left: 293 pt
Bottom: 60 pt
Right: 546 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Current_Allocation
Label Calculations:
"by WORKSHEET"
Top: 33 pt
Left: 294 pt
Bottom: 59 pt
Right: 378 pt
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_Allocation::WORKSHEET; ascending ] [ Restore; No dialog ]
Fields:

Budget_Allocation::WORKSHEET
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Current_Allocation
Label Calculations:
"by CODE"
Top: 33 pt
Left: 378 pt
Bottom: 59 pt
Right: 462 pt
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_Allocation::fkBudgetCode; based on value list: “popup Budget Code Number” ] [ Restore; No dialog ]
Fields:

Budget_Allocation::fkBudgetCode

Button Bar Properties	Coordinates
Layout Name:
Current_Allocation
Orientation:
horizontal
Top: 157 pt
Left: 572 pt
Bottom: 172 pt
Right: 612 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Current_Allocation
Label Calculations:
"GO"
Top: 158 pt
Left: 573 pt
Bottom: 171 pt
Right: 611 pt
Go to Layout [ “(form) URITP Budget Code” (BudgetCode_Defintions) ]
Layouts:

(form) URITP Budget Code

Layout Objects: (form) URITP Budget Code

Regular Fields

Field Name: BudgetCode_Defintions::xxFY26 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 38 pt
Left: 258 pt
Bottom: 57 pt
Right: 321 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( BudgetCode_Defintions::xxFY27 Allocation ) ; Mod ( BudgetCode_Defintions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}
2.	
Formula: BudgetCode_Defintions::xxFY26_Spent ≠ Budget_Allocation::SummaryAmountAwarded

self:normal .self
{
background-color: rgba(100%,90.9804%,79.6078%,1);
}

Field Name: BudgetCode_Defintions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 38 pt
Left: 59 pt
Bottom: 57 pt
Right: 258 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( BudgetCode_Defintions::xxFY27 Allocation ) ; Mod ( BudgetCode_Defintions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: BudgetCode_Defintions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 38 pt
Left: 18 pt
Bottom: 57 pt
Right: 59 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( BudgetCode_Defintions::xxFY27 Allocation ) ; Mod ( BudgetCode_Defintions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Object Name:
PORTAL_SUMMARY
Layout Name:
(form) URITP Budget Code
Top: 580 pt
Left: 373 pt
Bottom: 615 pt
Right: 743 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Budget_Allocation::fkBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 145 pt
Left: 453 pt
Bottom: 164 pt
Right: 588 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Include "Other..." item to allow entry of other values
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 145 pt
Left: 782 pt
Bottom: 164 pt
Right: 1164 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::Description
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
OnObjectExit
Script: assignToCurrent
Modes: Browse
Top: 145 pt
Left: 588 pt
Bottom: 164 pt
Right: 783 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes
Conditional Formatting	Condition	Format
1.	
Value is equal to 0
Formula: Self=0

self:normal .self
{
background-color: rgba(70.1961%,70.1961%,70.1961%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}
2.	
Formula: Budget_Allocation::FLAG = 1

self:normal .self
{
background-color: rgba(100%,90.9804%,79.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 145 pt
Left: 1386 pt
Bottom: 164 pt
Right: 1497 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::FLAG
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 143 pt
Left: 1363 pt
Bottom: 166 pt
Right: 1382 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Budget_Allocation::AmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
OnObjectSave
Script: assignToCurrent
Modes: Browse
Top: 145 pt
Left: 374 pt
Bottom: 164 pt
Right: 453 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes
Conditional Formatting	Condition	Format
1.	
Value is equal to 0
Formula: Self=0

self:normal .self
{
background-color: rgba(70.1961%,70.1961%,70.1961%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}
2.	
Formula: Budget_Allocation::FLAG = 1

self:normal .self
{
background-color: rgba(100%,90.9804%,79.6078%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Budget_Allocation::WORKSHEET
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 145 pt
Left: 1164 pt
Bottom: 164 pt
Right: 1359 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: NM_Worksheets
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::SummaryAmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 581 pt
Left: 376 pt
Bottom: 616 pt
Right: 746 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Budget_Allocation::Description
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 143 pt
Left: 509 pt
Bottom: 162 pt
Right: 737 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::AmountAwarded
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 143 pt
Left: 737 pt
Bottom: 162 pt
Right: 816 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 143 pt
Left: 816 pt
Bottom: 162 pt
Right: 903 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Include "Other..." item to allow entry of other values
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 143 pt
Left: 903 pt
Bottom: 162 pt
Right: 1349 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: Budget_Allocation::fkBudgetVersion
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 143 pt
Left: 374 pt
Bottom: 162 pt
Right: 509 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: BUDGET_VERSIONS
Include "Other..." item to allow entry of other values
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 38 pt
Left: 363 pt
Bottom: 57 pt
Right: 442 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 35 pt
Left: 451 pt
Bottom: 54 pt
Right: 802 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::xxFY26 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 38 pt
Left: 802 pt
Bottom: 57 pt
Right: 891 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::xxFY27 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 38 pt
Left: 895 pt
Bottom: 57 pt
Right: 984 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: BudgetCode_Defintions::PUBLICNotes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 66 pt
Left: 363 pt
Bottom: 100 pt
Right: 672 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::PVT Allocation Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 66 pt
Left: 675 pt
Bottom: 100 pt
Right: 984 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::xx_fkDefaultHeaderCategory
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 107 pt
Left: 677 pt
Bottom: 126 pt
Right: 930 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: (popup) Code HEADERS
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: BudgetCode_Defintions::_temp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(form) URITP Budget Code
Top: 54 pt
Left: 1257 pt
Bottom: 77 pt
Right: 1276 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Buttons

Button Properties	Coordinates	Script/Script Step
Object Name:
COMMIT_SUMMARY_TO_RECORD Copy
Type:
Text: Commit
Layout Name:
(form) URITP Budget Code
Top: 579 pt
Left: 756 pt
Bottom: 614 pt
Right: 992 pt
Anchoring: Left, Top
Perform Script [ “commitSummaryButtonTriggerFY26” ]
Scripts:

commitSummaryButtonTriggerFY26

Button Properties	Coordinates	Script/Script Step
Type:
Text: commit all
Layout Name:
(form) URITP Budget Code
Top: 38 pt
Left: 1012 pt
Bottom: 107 pt
Right: 1229 pt
Anchoring: Left, Top
Perform Script [ “COMMIT_ALL” ]
Scripts:

COMMIT_ALL

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(form) URITP Budget Code
Orientation:
horizontal
Top: 574 pt
Left: 13 pt
Bottom: 626 pt
Right: 342 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) URITP Budget Code
Label Calculations:
"PREV"
Top: 575 pt
Left: 14 pt
Bottom: 625 pt
Right: 178 pt
Go to Record/Request/Page [ Previous ]
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(form) URITP Budget Code
Label Calculations:
"NEXT"
Top: 575 pt
Left: 178 pt
Bottom: 625 pt
Right: 341 pt
Go to Record/Request/Page [ Next ]

Portals

Portal Properties	Coordinates	Fields	Options
Table:
BudgetCode_Defintions
Layout Name:
(form) URITP Budget Code
Top: 35 pt
Left: 13 pt
Bottom: 566 pt
Right: 342 pt
Anchoring: Left, Top
Field Objects
BudgetCode_Defintions::xxFY26 Allocation at (38, 258, 57, 321)
BudgetCode_Defintions::Default Name at (38, 59, 57, 258)
BudgetCode_Defintions::Default Code at (38, 18, 57, 59)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 23
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Object Name:
SUMMARY_PORTAL
Table:
Budget_Allocation
Layout Name:
(form) URITP Budget Code
Top: 574 pt
Left: 366 pt
Bottom: 620 pt
Right: 1046 pt
Anchoring: Left, Top
Field Objects
Budget_Allocation::SummaryAmountAwarded at (580, 373, 615, 743)
Sort records: Off
Filter calculation:
Budget_Allocation::fkBudgetVersion = ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion

Initial Row: 1
Number of Rows: 1
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Object Name:
CurrentAllocationPortal Copy
Table:
Budget_Allocation
Layout Name:
(form) URITP Budget Code
Top: 140 pt
Left: 366 pt
Bottom: 574 pt
Right: 1521 pt
Anchoring: Left, Top
Field Objects
Budget_Allocation::fkBudgetVersion at (145, 453, 164, 588)
Budget_Allocation::Notes at (145, 782, 164, 1164)
Budget_Allocation::Description at (145, 588, 164, 783)
Budget_Allocation::fkBudgetCode at (145, 1386, 164, 1497)
Budget_Allocation::FLAG at (143, 1363, 166, 1382)
Budget_Allocation::AmountAwarded at (145, 374, 164, 453)
Budget_Allocation::WORKSHEET at (145, 1164, 164, 1359)
Sort records: On
Field: Description

Ascending order
Reorder based on summary field: Off
Override field's language for sort: Off

Filter calculation:
Budget_Allocation::fkBudgetVersion = ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion

Initial Row: 1
Number of Rows: 16
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Object Name:
ALL_Summary
Table:
Budget_Allocation
Layout Name:
(form) URITP Budget Code
Top: 575 pt
Left: 369 pt
Bottom: 621 pt
Right: 1049 pt
Anchoring: Left, Top
Field Objects
Budget_Allocation::SummaryAmountAwarded at (581, 376, 616, 746)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 1
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Object Name:
CurrentAllocationPortal Copy 2
Table:
Budget_Allocation
Layout Name:
(form) URITP Budget Code
Top: 138 pt
Left: 369 pt
Bottom: 572 pt
Right: 1524 pt
Anchoring: Left, Top
Field Objects
Budget_Allocation::Description at (143, 509, 162, 737)
Budget_Allocation::AmountAwarded at (143, 737, 162, 816)
Budget_Allocation::fkBudgetCode at (143, 816, 162, 903)
Budget_Allocation::Notes at (143, 903, 162, 1349)
Budget_Allocation::fkBudgetVersion at (143, 374, 162, 509)
Sort records: On
Field: fkBudgetVersion

Descending order
Reorder based on summary field: Off
Override field's language for sort: Off
Field: Description

Ascending order
Reorder based on summary field: Off
Override field's language for sort: Off

Filter calculation: None
Initial Row: 1
Number of Rows: 16
Show vertical scroll bar
Allow deletion of portal records

Tab Controls

Tab Control Properties	Coordinates
Layout Name:
(form) URITP Budget Code
Justification:
Left
Tab Width:
Default Front Tab:
Tab 0
Top: 109 pt
Left: 352 pt
Bottom: 626 pt
Right: 1529 pt
Anchoring: Left, Top
Tabs
Tab Properties	Tab Controls	Slide Controls	Fields	Buttons	Portals	Web Viewer Controls	Charts
Tab 0:
"CURRENT"
Field Objects
Budget_Allocation::SummaryAmountAwarded at (580, 373, 615, 743)
Budget_Allocation::fkBudgetVersion at (145, 453, 164, 588)
Budget_Allocation::Notes at (145, 782, 164, 1164)
Budget_Allocation::Description at (145, 588, 164, 783)
Budget_Allocation::fkBudgetCode at (145, 1386, 164, 1497)
Budget_Allocation::FLAG at (143, 1363, 166, 1382)
Budget_Allocation::AmountAwarded at (145, 374, 164, 453)
Budget_Allocation::WORKSHEET at (145, 1164, 164, 1359)
Portal Object at (574, 366, 620, 1046)
Portal Object at (140, 366, 574, 1521)
Tab 1:
"All"
Field Objects
Budget_Allocation::SummaryAmountAwarded at (581, 376, 616, 746)
Budget_Allocation::Description at (143, 509, 162, 737)
Budget_Allocation::AmountAwarded at (143, 737, 162, 816)
Budget_Allocation::fkBudgetCode at (143, 816, 162, 903)
Budget_Allocation::Notes at (143, 903, 162, 1349)
Budget_Allocation::fkBudgetVersion at (143, 374, 162, 509)
Portal Object at (575, 369, 621, 1049)

Graphic Objects

Graphic Object Properties	Coordinates
Type:
Rectangle
Layout Name:
(form) URITP Budget Code
Hide Condition:
BudgetCode_Defintions::_temp ≠ 1
Top: 38 pt
Left: 17 pt
Bottom: 57 pt
Right: 321 pt
Anchoring: Left, Top

Layout Objects: -

Layout Objects: URF_IMPORT_ROWS

Regular Fields

Field Name: URF_IMPORT_ROWS::source_FAO_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT_ROWS
Top: 116 pt
Left: 6 pt
Bottom: 147 pt
Right: 259 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAOName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT_ROWS
Top: 116 pt
Left: 259 pt
Bottom: 147 pt
Right: 512 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT_ROWS
Top: 116 pt
Left: 664 pt
Bottom: 147 pt
Right: 743 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: URF_IMPORT Copy

Regular Fields

Field Name: URF_IMPORT_ROWS::source_Company
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 114 pt
Left: 138 pt
Bottom: 145 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Fund
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 149 pt
Left: 138 pt
Bottom: 180 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_CostCenter
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 184 pt
Left: 138 pt
Bottom: 215 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAO_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 219 pt
Left: 138 pt
Bottom: 250 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAOName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 254 pt
Left: 138 pt
Bottom: 285 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_ObjectClassName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 289 pt
Left: 138 pt
Bottom: 320 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_ObjectClassSortOrder
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 324 pt
Left: 138 pt
Bottom: 355 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LedgerAccount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 359 pt
Left: 138 pt
Bottom: 390 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LedgerAccountIdentifier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 394 pt
Left: 138 pt
Bottom: 425 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAC_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 429 pt
Left: 138 pt
Bottom: 460 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FACName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 464 pt
Left: 138 pt
Bottom: 495 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 499 pt
Left: 138 pt
Bottom: 530 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_PONumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 534 pt
Left: 138 pt
Bottom: 565 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_AccountingDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 569 pt
Left: 138 pt
Bottom: 600 pt
Right: 259 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 604 pt
Left: 138 pt
Bottom: 635 pt
Right: 259 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_JournalSource
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 639 pt
Left: 138 pt
Bottom: 670 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Reference
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 674 pt
Left: 138 pt
Bottom: 705 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BusinessDocument
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 709 pt
Left: 138 pt
Bottom: 740 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_HeaderMemo_PONumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 744 pt
Left: 138 pt
Bottom: 775 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 779 pt
Left: 138 pt
Bottom: 810 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 814 pt
Left: 138 pt
Bottom: 845 pt
Right: 217 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Award
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 849 pt
Left: 138 pt
Bottom: 880 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_AwardName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 884 pt
Left: 138 pt
Bottom: 915 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FromDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 919 pt
Left: 138 pt
Bottom: 950 pt
Right: 259 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_ToDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 954 pt
Left: 138 pt
Bottom: 985 pt
Right: 259 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_AwardLineAmount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 989 pt
Left: 138 pt
Bottom: 1020 pt
Right: 217 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_PrincipalInvestigator
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 1024 pt
Left: 138 pt
Bottom: 1055 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FiscalTimePeriodStartDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 1059 pt
Left: 138 pt
Bottom: 1090 pt
Right: 259 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FiscalTimePeriodEndDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 1094 pt
Left: 138 pt
Bottom: 1125 pt
Right: 259 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::xxs_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_IMPORT Copy
Top: 1129 pt
Left: 138 pt
Bottom: 1160 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Layout Objects: URF_UNIQUE

Regular Fields

Field Name: URF_IMPORT_ROWS::source_AccountingDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_UNIQUE
Top: 118 pt
Left: 12 pt
Bottom: 149 pt
Right: 171 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::xxURF_UNIQUE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_UNIQUE
Top: 118 pt
Left: 758 pt
Bottom: 149 pt
Right: 1011 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_UNIQUE
Top: 118 pt
Left: 179 pt
Bottom: 149 pt
Right: 371 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BusinessDocument
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
URF_UNIQUE
Top: 118 pt
Left: 386 pt
Bottom: 149 pt
Right: 639 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: UNASSIGNED

Regular Fields

Field Name: URF_IMPORT_ROWS::xxfkBUDGET_CODE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 114 pt
Left: 6 pt
Bottom: 133 pt
Right: 127 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup Budget Code Number
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_HeaderMemo_PONumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 126 pt
Left: 441 pt
Bottom: 178 pt
Right: 562 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 126 pt
Left: 565 pt
Bottom: 178 pt
Right: 686 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 159 pt
Left: 241 pt
Bottom: 178 pt
Right: 324 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 136 pt
Left: 241 pt
Bottom: 155 pt
Right: 436 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAO_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 114 pt
Left: 127 pt
Bottom: 133 pt
Right: 241 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: FAOs
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FACName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 114 pt
Left: 241 pt
Bottom: 133 pt
Right: 436 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: FAC Names
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_AccountingDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 136 pt
Left: 175 pt
Bottom: 155 pt
Right: 241 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 159 pt
Left: 175 pt
Bottom: 178 pt
Right: 241 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Reference
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
UNASSIGNED
Top: 114 pt
Left: 441 pt
Bottom: 127 pt
Right: 686 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: FAC Names
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
<<Code_Definitions::Default Name>>
Layout Name:
UNASSIGNED
Top: 140 pt
Left: 6 pt
Bottom: 177 pt
Right: 127 pt
Anchoring: Left, Top
Code_Definitions::Default Name
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
UNASSIGNED
Orientation:
horizontal
Top: 158 pt
Left: 327 pt
Bottom: 177 pt
Right: 436 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
UNASSIGNED
Label Calculations:
"ASSIGN CODE"
Top: 159 pt
Left: 328 pt
Bottom: 176 pt
Right: 435 pt
Perform Script [ “POPUP_selectCODE” ]
Scripts:

POPUP_selectCODE

Button Bar Properties	Coordinates
Layout Name:
UNASSIGNED
Orientation:
horizontal
Top: 9 pt
Left: 18 pt
Bottom: 76 pt
Right: 428 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
UNASSIGNED
Label Calculations:
"Unassigned"
Top: 10 pt
Left: 19 pt
Bottom: 75 pt
Right: 155 pt
Perform Script [ “showUNASSIGNED” ]
Scripts:

showUNASSIGNED

Layout Objects: CodeSelectionPOPUP

Regular Fields

Field Name: Code_Definitions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CodeSelectionPOPUP
Top: 60 pt
Left: 67 pt
Bottom: 79 pt
Right: 254 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CodeSelectionPOPUP
Top: 60 pt
Left: 1 pt
Bottom: 79 pt
Right: 67 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
CodeSelectionPOPUP
Orientation:
horizontal
Top: 60 pt
Left: 256 pt
Bottom: 79 pt
Right: 318 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CodeSelectionPOPUP
Label Calculations:
"SELECT"
Top: 61 pt
Left: 257 pt
Bottom: 78 pt
Right: 317 pt
Perform Script [ “useSelectedCode” ]
Scripts:

useSelectedCode

Button Bar Properties	Coordinates
Layout Name:
CodeSelectionPOPUP
Orientation:
horizontal
Top: 6 pt
Left: 5 pt
Bottom: 25 pt
Right: 315 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CodeSelectionPOPUP
Label Calculations:
"ALL"
Top: 7 pt
Left: 6 pt
Bottom: 24 pt
Right: 109 pt
Show All Records
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CodeSelectionPOPUP
Label Calculations:
"ENTER"
Top: 7 pt
Left: 109 pt
Bottom: 24 pt
Right: 211 pt
Perform Find [ ]
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CodeSelectionPOPUP
Label Calculations:
"FIND"
Top: 7 pt
Left: 211 pt
Bottom: 24 pt
Right: 314 pt
Enter Find Mode [ ] [ Pause ]

Button Bar Properties	Coordinates
Layout Name:
CodeSelectionPOPUP
Orientation:
horizontal
Top: 33 pt
Left: 5 pt
Bottom: 52 pt
Right: 315 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CodeSelectionPOPUP
Label Calculations:
"P1"
Top: 34 pt
Left: 6 pt
Bottom: 51 pt
Right: 83 pt
Perform Script [ “goToCode”; Parameter: "20101" ]
Scripts:

goToCode
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CodeSelectionPOPUP
Label Calculations:
"P2"
Top: 34 pt
Left: 83 pt
Bottom: 51 pt
Right: 160 pt
Perform Script [ “goToCode”; Parameter: "20204" ]
Scripts:

goToCode
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CodeSelectionPOPUP
Label Calculations:
"P3"
Top: 34 pt
Left: 160 pt
Bottom: 51 pt
Right: 237 pt
Perform Script [ “goToCode”; Parameter: "20307" ]
Scripts:

goToCode
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CodeSelectionPOPUP
Label Calculations:
"P4"
Top: 34 pt
Left: 237 pt
Bottom: 51 pt
Right: 314 pt
Perform Script [ “goToCode”; Parameter: "20410" ]
Scripts:

goToCode

Layout Objects: Batch Assiging Budget Codes

Regular Fields

Field Name: URF_IMPORT_ROWS::xxfkBUDGET_CODE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 111 pt
Left: 26 pt
Bottom: 130 pt
Right: 130 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_HeaderMemo_PONumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 125 pt
Left: 131 pt
Bottom: 178 pt
Right: 252 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 125 pt
Left: 255 pt
Bottom: 178 pt
Right: 376 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 153 pt
Left: 378 pt
Bottom: 171 pt
Right: 461 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 133 pt
Left: 379 pt
Bottom: 149 pt
Right: 546 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAO_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 111 pt
Left: 378 pt
Bottom: 127 pt
Right: 461 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: FAOs
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 111 pt
Left: 463 pt
Bottom: 127 pt
Right: 546 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Reference
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 111 pt
Left: 131 pt
Bottom: 124 pt
Right: 376 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: FAC Names
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 155 pt
Left: 579 pt
Bottom: 171 pt
Right: 593 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::xxCODING_Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Batch Assiging Budget Codes
Top: 113 pt
Left: 604 pt
Bottom: 149 pt
Right: 857 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
<<Code_Definitions::Default Name>>
Layout Name:
Batch Assiging Budget Codes
Top: 134 pt
Left: 25 pt
Bottom: 172 pt
Right: 131 pt
Anchoring: Left, Top
Code_Definitions::Default Name
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
Batch Assiging Budget Codes
Orientation:
horizontal
Top: 20 pt
Left: 39 pt
Bottom: 87 pt
Right: 449 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"Unassigned"
Top: 21 pt
Left: 40 pt
Bottom: 86 pt
Right: 176 pt
Perform Script [ “showUNASSIGNED” ]
Scripts:

showUNASSIGNED

Button Bar Properties	Coordinates
Layout Name:
Batch Assiging Budget Codes
Orientation:
horizontal
Top: 153 pt
Left: 463 pt
Bottom: 171 pt
Right: 546 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"ASSIGN CODE"
Top: 154 pt
Left: 464 pt
Bottom: 170 pt
Right: 545 pt
Perform Script [ “POPUP_selectCODE” ]
Scripts:

POPUP_selectCODE

Button Bar Properties	Coordinates
Layout Name:
Batch Assiging Budget Codes
Orientation:
horizontal
Top: 113 pt
Left: 557 pt
Bottom: 149 pt
Right: 593 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"CLEAR CODE"
Top: 114 pt
Left: 558 pt
Bottom: 148 pt
Right: 592 pt
Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; "" ]
Fields:

URF_IMPORT_ROWS::xxfkBUDGET_CODE

Button Bar Properties	Coordinates
Layout Name:
Batch Assiging Budget Codes
Orientation:
horizontal
Top: 153 pt
Left: 604 pt
Bottom: 176 pt
Right: 857 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"PROGRAM unassigned"
Top: 154 pt
Left: 605 pt
Bottom: 175 pt
Right: 689 pt
Perform Script [ “buttonPassCodeNum”; Parameter: "10000" ]
Scripts:

buttonPassCodeNum
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"TRAVEL, ACOMM"
Top: 154 pt
Left: 689 pt
Bottom: 175 pt
Right: 772 pt
Perform Script [ “buttonPassCodeNum”; Parameter: "10200" ]
Scripts:

buttonPassCodeNum
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"Program Hospitality"
Top: 154 pt
Left: 772 pt
Bottom: 175 pt
Right: 856 pt
Perform Script [ “buttonPassCodeNum”; Parameter: "10100" ]
Scripts:

buttonPassCodeNum

Button Bar Properties	Coordinates
Layout Name:
Batch Assiging Budget Codes
Orientation:
vertical
Top: 112 pt
Left: 861 pt
Bottom: 175 pt
Right: 905 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"NM"
Top: 112 pt
Left: 861 pt
Bottom: 133 pt
Right: 905 pt
Perform Script [ “buttonPassCodeNum”; Parameter: "30001" ]
Scripts:

buttonPassCodeNum
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"KT"
Top: 133 pt
Left: 861 pt
Bottom: 154 pt
Right: 905 pt
Perform Script [ “buttonPassCodeNum”; Parameter: "30002" ]
Scripts:

buttonPassCodeNum
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"MAW"
Top: 154 pt
Left: 861 pt
Bottom: 175 pt
Right: 905 pt
Perform Script [ “buttonPassCodeNum”; Parameter: "30003" ]
Scripts:

buttonPassCodeNum

Button Bar Properties	Coordinates
Layout Name:
Batch Assiging Budget Codes
Orientation:
vertical
Top: 112 pt
Left: 2 pt
Bottom: 175 pt
Right: 23 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"C"
Top: 113 pt
Left: 3 pt
Bottom: 144 pt
Right: 22 pt
Perform Script [ “COPY_code” ]
Scripts:

COPY_code
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
Batch Assiging Budget Codes
Label Calculations:
"P"
Top: 144 pt
Left: 3 pt
Bottom: 174 pt
Right: 22 pt
Perform Script [ “PASTE_code” ]
Scripts:

PASTE_code

Layout Objects: MOBILE Assiging Budget Codes Copy

Regular Fields

Field Name: URF_IMPORT_ROWS::source_HeaderMemo_PONumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
MOBILE Assiging Budget Codes Copy
Top: 256 pt
Left: 15 pt
Bottom: 358 pt
Right: 304 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
MOBILE Assiging Budget Codes Copy
Top: 360 pt
Left: 15 pt
Bottom: 462 pt
Right: 304 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
MOBILE Assiging Budget Codes Copy
Top: 185 pt
Left: 12 pt
Bottom: 206 pt
Right: 179 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
MOBILE Assiging Budget Codes Copy
Top: 161 pt
Left: 12 pt
Bottom: 182 pt
Right: 179 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAO_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
MOBILE Assiging Budget Codes Copy
Top: 120 pt
Left: 12 pt
Bottom: 141 pt
Right: 95 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: FAOs
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
MOBILE Assiging Budget Codes Copy
Top: 120 pt
Left: 97 pt
Bottom: 141 pt
Right: 180 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::xxfkBUDGET_CODE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
MOBILE Assiging Budget Codes Copy
Top: 214 pt
Left: 12 pt
Bottom: 233 pt
Right: 308 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup Budget Code Number
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::xxFLAG
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
MOBILE Assiging Budget Codes Copy
Top: 155 pt
Left: 329 pt
Bottom: 195 pt
Right: 367 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
<<Code_Definitions::Default Name>>
Layout Name:
MOBILE Assiging Budget Codes Copy
Top: 237 pt
Left: 15 pt
Bottom: 253 pt
Right: 303 pt
Anchoring: Left, Top
Code_Definitions::Default Name
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
MOBILE Assiging Budget Codes Copy
Orientation:
vertical
Top: 256 pt
Left: 314 pt
Bottom: 462 pt
Right: 380 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"COPY"
Top: 257 pt
Left: 315 pt
Bottom: 325 pt
Right: 379 pt
Perform Script [ “COPY_code” ]
Scripts:

COPY_code
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"PASTE"
Top: 325 pt
Left: 315 pt
Bottom: 393 pt
Right: 379 pt
Perform Script [ “PASTE_code” ]
Scripts:

PASTE_code
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"REPLACE"
Top: 393 pt
Left: 315 pt
Bottom: 461 pt
Right: 379 pt
Perform Script [ “REPLACE_fkBudgetCode” ]
Scripts:

REPLACE_fkBudgetCode

Button Bar Properties	Coordinates
Layout Name:
MOBILE Assiging Budget Codes Copy
Orientation:
horizontal
Top: 117 pt
Left: 187 pt
Bottom: 207 pt
Right: 308 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"ASSIGN CODE"
Top: 118 pt
Left: 188 pt
Bottom: 206 pt
Right: 307 pt
Perform Script [ “POPUP_selectCODE” ]
Scripts:

POPUP_selectCODE

Button Bar Properties	Coordinates
Layout Name:
MOBILE Assiging Budget Codes Copy
Orientation:
horizontal
Top: 521 pt
Left: 8 pt
Bottom: 589 pt
Right: 373 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"PREV"
Top: 522 pt
Left: 9 pt
Bottom: 588 pt
Right: 191 pt
Go to Record/Request/Page [ Previous ]
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"NEXT"
Top: 522 pt
Left: 191 pt
Bottom: 588 pt
Right: 372 pt
Go to Record/Request/Page [ Next ]

Button Bar Properties	Coordinates
Layout Name:
MOBILE Assiging Budget Codes Copy
Orientation:
horizontal
Top: 56 pt
Left: 8 pt
Bottom: 96 pt
Right: 380 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"FIND"
Top: 57 pt
Left: 9 pt
Bottom: 95 pt
Right: 132 pt
Enter Find Mode [ ] [ Pause ]
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"BROWSE"
Top: 57 pt
Left: 132 pt
Bottom: 95 pt
Right: 256 pt
Enter Browse Mode
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"SHOW ALL"
Top: 57 pt
Left: 256 pt
Bottom: 95 pt
Right: 379 pt
Show All Records

Button Bar Properties	Coordinates
Layout Name:
MOBILE Assiging Budget Codes Copy
Orientation:
horizontal
Top: 77 pt
Left: 633 pt
Bottom: 117 pt
Right: 997 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
Top: 78 pt
Left: 634 pt
Bottom: 116 pt
Right: 755 pt
Perform Script [ “showUNASSIGNED Copy” ]
Scripts:

showUNASSIGNED Copy

Button Bar Properties	Coordinates
Layout Name:
MOBILE Assiging Budget Codes Copy
Orientation:
horizontal
Top: 8 pt
Left: 8 pt
Bottom: 48 pt
Right: 380 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"Unassigned"
Top: 9 pt
Left: 9 pt
Bottom: 47 pt
Right: 132 pt
Perform Script [ “showUNASSIGNED” ]
Scripts:

showUNASSIGNED
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
MOBILE Assiging Budget Codes Copy
Label Calculations:
"ASSIGNED"
Top: 9 pt
Left: 132 pt
Bottom: 47 pt
Right: 256 pt
Perform Script [ “showUNASSIGNED Copy” ]
Scripts:

showUNASSIGNED Copy

Layout Objects: CODED Ledgers

Regular Fields

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 251 pt
Left: 0 pt
Bottom: 269 pt
Right: 70 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 250 pt
Left: 488 pt
Bottom: 269 pt
Right: 567 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 251 pt
Left: 68 pt
Bottom: 269 pt
Right: 242 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::PUBLICNotes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 110 pt
Left: 363 pt
Bottom: 154 pt
Right: 570 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 109 pt
Left: 94 pt
Bottom: 130 pt
Right: 173 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 133 pt
Left: 94 pt
Bottom: 154 pt
Right: 347 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: <Missing Field>
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 64 pt
Left: 0 pt
Bottom: 98 pt
Right: 137 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Code_Definitions::xxFY26 Allocation Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 283 pt
Left: 487 pt
Bottom: 304 pt
Right: 566 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Code_Definitions::xxFY26 Spent Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 304 pt
Left: 487 pt
Bottom: 325 pt
Right: 566 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Code_Definitions::xxFY26 Remaining Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 327 pt
Left: 487 pt
Bottom: 348 pt
Right: 566 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: URF_IMPORT_ROWS::source_FAO_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 203 pt
Left: 4 pt
Bottom: 224 pt
Right: 178 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_FAOName
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 203 pt
Left: 184 pt
Bottom: 224 pt
Right: 569 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26 Allocation Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 363 pt
Left: 487 pt
Bottom: 384 pt
Right: 566 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Code_Definitions::xxFY26 Spent Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 384 pt
Left: 487 pt
Bottom: 405 pt
Right: 566 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Code_Definitions::xxFY26 Remaining Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 407 pt
Left: 487 pt
Bottom: 428 pt
Right: 566 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: URF_IMPORT_ROWS::source_FAO_ID
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CODED Ledgers
Top: 253 pt
Left: 181 pt
Bottom: 267 pt
Right: 239 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{PageNumber}}
Layout Name:
CODED Ledgers
Top: 436 pt
Left: 213 pt
Bottom: 457 pt
Right: 363 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
{{CurrentDate}}
Layout Name:
CODED Ledgers
Top: 436 pt
Left: 417 pt
Bottom: 457 pt
Right: 567 pt
Anchoring: Left, Top
No

Button Bars

Button Bar Properties	Coordinates
Layout Name:
CODED Ledgers
Orientation:
horizontal
Top: 250 pt
Left: 242 pt
Bottom: 271 pt
Right: 488 pt
Anchoring: Left, Top

Button Bar Properties	Coordinates
Layout Name:
CODED Ledgers
Orientation:
horizontal
Top: 13 pt
Left: 10 pt
Bottom: 47 pt
Right: 375 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CODED Ledgers
Label Calculations:
"sortbyCode"
Top: 14 pt
Left: 11 pt
Bottom: 46 pt
Right: 132 pt
Sort Records by Field [ Ascending; Code_Definitions::Default Code ]
Fields:

Code_Definitions::Default Code

Layout Objects: PRINT CODED TRANSACTIONS

Regular Fields

Field Name: URF_IMPORT_ROWS::xxFLAG
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 177 pt
Left: 549 pt
Bottom: 200 pt
Right: 572 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 180 pt
Left: 4 pt
Bottom: 194 pt
Right: 70 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 173 pt
Left: 458 pt
Bottom: 201 pt
Right: 542 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 173 pt
Left: 69 pt
Bottom: 187 pt
Right: 243 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Reference
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 186 pt
Left: 69 pt
Bottom: 200 pt
Right: 189 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 205 pt
Left: 458 pt
Bottom: 224 pt
Right: 542 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26_Spent
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 224 pt
Left: 458 pt
Bottom: 243 pt
Right: 542 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26_REMAINING
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 244 pt
Left: 458 pt
Bottom: 263 pt
Right: 542 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::xxfkBUDGET_CODE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Hide Condition:
If ( IsEmpty ( URF_IMPORT_ROWS::xxfkBUDGET_CODE ) ; 0 ; 1 )
Top: 184 pt
Left: 4 pt
Bottom: 202 pt
Right: 71 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: popup Budget Code Number
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::PUBLICNotes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 134 pt
Left: 4 pt
Bottom: 168 pt
Right: 338 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 73 pt
Left: 85 pt
Bottom: 94 pt
Right: 164 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 94 pt
Left: 85 pt
Bottom: 115 pt
Right: 338 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 75 pt
Left: 493 pt
Bottom: 96 pt
Right: 572 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26 Allocation Summary
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 114 pt
Left: 259 pt
Bottom: 135 pt
Right: 338 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: Code_Definitions::xxFY26_Spent
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 96 pt
Left: 493 pt
Bottom: 117 pt
Right: 572 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26_REMAINING
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
PRINT CODED TRANSACTIONS
Top: 119 pt
Left: 493 pt
Bottom: 140 pt
Right: 572 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{PageNumber}}
Layout Name:
PRINT CODED TRANSACTIONS
Top: 270 pt
Left: 213 pt
Bottom: 291 pt
Right: 363 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
{{CurrentDate}}
Layout Name:
PRINT CODED TRANSACTIONS
Top: 270 pt
Left: 406 pt
Bottom: 291 pt
Right: 556 pt
Anchoring: Left, Top
No

Button Bars

Button Bar Properties	Coordinates
Layout Name:
PRINT CODED TRANSACTIONS
Orientation:
horizontal
Top: 172 pt
Left: 243 pt
Bottom: 201 pt
Right: 458 pt
Anchoring: Left, Top

Button Bar Properties	Coordinates
Layout Name:
PRINT CODED TRANSACTIONS
Orientation:
horizontal
Top: 7 pt
Left: 10 pt
Bottom: 38 pt
Right: 319 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
PRINT CODED TRANSACTIONS
Label Calculations:
"SORT BY CODE"
Top: 8 pt
Left: 11 pt
Bottom: 37 pt
Right: 113 pt
Sort Records [ Keep records in sorted order; Specified Sort Order: Code_Definitions::Default Code; ascending ] [ Restore; No dialog ]
Fields:

Code_Definitions::Default Code
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
PRINT CODED TRANSACTIONS
Label Calculations:
"SEARCH CODE"
Top: 8 pt
Left: 216 pt
Bottom: 37 pt
Right: 318 pt
Perform Script [ “FilterSingleCodeASK” ]
Scripts:

FilterSingleCodeASK

Layout Objects: (PRINT) CODED Transactions Copy

Regular Fields

Field Name: Code_Definitions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 81 pt
Left: 1850 pt
Bottom: 100 pt
Right: 2115 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( Code_Definitions::xxFY27 Allocation ) ; Mod ( Code_Definitions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Code_Definitions::xxFY26_REMAINING
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Hide Condition:
Code_Definitions::xxFY26_Spent = 0
Top: 81 pt
Left: 2003 pt
Bottom: 100 pt
Right: 2115 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( Code_Definitions::xxFY27 Allocation ) ; Mod ( Code_Definitions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Code_Definitions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 81 pt
Left: 1809 pt
Bottom: 100 pt
Right: 1850 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( Code_Definitions::xxFY27 Allocation ) ; Mod ( Code_Definitions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Code_Definitions::xxFY26 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Hide Condition:
Code_Definitions::xxFY26_Spent ≠ 0
Top: 81 pt
Left: 2009 pt
Bottom: 100 pt
Right: 2115 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode
Select entire contents of field on entry
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes
Conditional Formatting	Condition	Format
1.	
Formula: If ( IsEmpty ( Code_Definitions::xxFY27 Allocation ) ; Mod ( Code_Definitions::Default Code ; 10 ) = 0 ; 0 )

self:normal .self
{
background-color: rgba(15.619%,26.2269%,33.8039%,1);
font-weight: bold;
color: rgba(100%,100%,100%,1);
}
self:normal .icon
{
-fm-icon-color: rgba(0%,0%,0%,0);
}

Field Name: Code_Definitions::PUBLICNotes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 86 pt
Left: 33 pt
Bottom: 120 pt
Right: 361 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::PVT Allocation Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 104 pt
Left: 736 pt
Bottom: 138 pt
Right: 1045 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::Default Code
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 43 pt
Left: 108 pt
Bottom: 64 pt
Right: 187 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::Default Name
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 64 pt
Left: 108 pt
Bottom: 85 pt
Right: 361 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26 Allocation
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 43 pt
Left: 497 pt
Bottom: 64 pt
Right: 576 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26_Spent
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 64 pt
Left: 497 pt
Bottom: 85 pt
Right: 576 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Code_Definitions::xxFY26_REMAINING
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 87 pt
Left: 497 pt
Bottom: 108 pt
Right: 576 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_BudgetDate
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 142 pt
Left: 4 pt
Bottom: 160 pt
Right: 74 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Amount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 141 pt
Left: 492 pt
Bottom: 160 pt
Right: 571 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: URF_IMPORT_ROWS::source_Supplier
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
(PRINT) CODED Transactions Copy
Top: 142 pt
Left: 72 pt
Bottom: 160 pt
Right: 246 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Button Bars

Button Bar Properties	Coordinates
Layout Name:
(PRINT) CODED Transactions Copy
Orientation:
horizontal
Top: 623 pt
Left: 1807 pt
Bottom: 717 pt
Right: 2136 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(PRINT) CODED Transactions Copy
Label Calculations:
"PREV"
Top: 624 pt
Left: 1808 pt
Bottom: 716 pt
Right: 1972 pt
Go to Record/Request/Page [ Previous ]
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
(PRINT) CODED Transactions Copy
Label Calculations:
"NEXT"
Top: 624 pt
Left: 1972 pt
Bottom: 716 pt
Right: 2135 pt
Go to Record/Request/Page [ Next ]

Button Bar Properties	Coordinates
Layout Name:
(PRINT) CODED Transactions Copy
Orientation:
horizontal
Top: 141 pt
Left: 246 pt
Bottom: 160 pt
Right: 492 pt
Anchoring: Left, Top

Portals

Portal Properties	Coordinates	Fields	Options
Table:
Code_Definitions
Layout Name:
(PRINT) CODED Transactions Copy
Top: 78 pt
Left: 1807 pt
Bottom: 609 pt
Right: 2136 pt
Anchoring: Left, Top
Field Objects
Code_Definitions::Default Name at (81, 1850, 100, 2115)
Code_Definitions::xxFY26_REMAINING at (81, 2003, 100, 2115)
Code_Definitions::Default Code at (81, 1809, 100, 1850)
Code_Definitions::xxFY26 Allocation at (81, 2009, 100, 2115)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 23
Show vertical scroll bar
Allow deletion of portal records

Portal Properties	Coordinates	Fields	Options
Object Name:
CurrentAllocationPortal Copy
Table:
URF_IMPORT_ROWS
Layout Name:
(PRINT) CODED Transactions Copy
Top: 140 pt
Left: 4 pt
Bottom: 742 pt
Right: 571 pt
Anchoring: Left, Top
Field Objects
URF_IMPORT_ROWS::source_BudgetDate at (142, 4, 160, 74)
URF_IMPORT_ROWS::source_Amount at (141, 492, 160, 571)
URF_IMPORT_ROWS::source_Supplier at (142, 72, 160, 246)
Sort records: Off
Filter calculation: None
Initial Row: 1
Number of Rows: 30
Show vertical scroll bar

Layout Objects: CumSale_LABOUR

Regular Fields

Field Name: CumSale_LABOUR::Worker
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CumSale_LABOUR
Top: 215 pt
Left: 14 pt
Bottom: 234 pt
Right: 181 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: CumSale_LABOUR::FYTD_Regular_Extra
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CumSale_LABOUR
Top: 215 pt
Left: 187 pt
Bottom: 234 pt
Right: 266 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: CumSale_LABOUR::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CumSale_LABOUR
Top: 215 pt
Left: 272 pt
Bottom: 234 pt
Right: 575 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Field Name: CumSale_LABOUR::Summary_Earnings
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CumSale_LABOUR
Top: 247 pt
Left: 187 pt
Bottom: 266 pt
Right: 266 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: CumSale_LABOUR::fkBudgetCode
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
CumSale_LABOUR
Top: 158 pt
Left: 14 pt
Bottom: 177 pt
Right: 355 pt
Anchoring: Left, Top
Field Format:
Pop-up Menu
Display values from: Budget Code Extended Names
Field Behavior:
Touch keyboard type: Default for Data Type
Go to next field using: Tab key, Return key, Enter key
Yes

Merge Fields

Field Properties	Coordinates	Fields	Quick Find
Text:
{{PageNumber}}
Layout Name:
CumSale_LABOUR
Top: 277 pt
Left: 243 pt
Bottom: 292 pt
Right: 333 pt
Anchoring: Left, Top
No

Field Properties	Coordinates	Fields	Quick Find
Text:
{{CurrentDate}}
Layout Name:
CumSale_LABOUR
Top: 277 pt
Left: 489 pt
Bottom: 292 pt
Right: 574 pt
Anchoring: Left, Top
No

Button Bars

Button Bar Properties	Coordinates
Layout Name:
CumSale_LABOUR
Orientation:
horizontal
Top: 5 pt
Left: 12 pt
Bottom: 45 pt
Right: 362 pt
Anchoring: Left, Top
Button Segments
Button Properties	Coordinates	Script/Script Step
Type:
Text:
Layout Name:
CumSale_LABOUR
Label Calculations:
"by CODE"
Top: 6 pt
Left: 13 pt
Bottom: 44 pt
Right: 129 pt
Sort Records [ Keep records in sorted order; Specified Sort Order: CumSale_LABOUR::fkBudgetCode; based on value list: “popup Budget Code Number” ] [ Restore; No dialog ]
Fields:

CumSale_LABOUR::fkBudgetCode

Layout Objects: -

Layout Objects: DIAGRAMING and NOTES

Layout Objects: file_WorkNotes

Regular Fields

Field Name: file_WorkNotes::NOTES
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
file_WorkNotes
Top: 140 pt
Left: 54 pt
Bottom: 185 pt
Right: 377 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: file_WorkNotes::_temp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
file_WorkNotes
Top: 121 pt
Left: 8 pt
Bottom: 166 pt
Right: 45 pt
Anchoring: Left, Top
Field Format:
Checkbox Set
Display values from: One
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: file_WorkNotes::URGENCY
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
file_WorkNotes
Top: 115 pt
Left: 54 pt
Bottom: 134 pt
Right: 377 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: XX_GLOBAL_fileSetup

Regular Fields

Field Name: XX_GLOBAL_fileSetup::APP_TITLE
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
XX_GLOBAL_fileSetup
Top: 114 pt
Left: 138 pt
Bottom: 145 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: XX_GLOBAL_fileSetup::APP_VERSION
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
XX_GLOBAL_fileSetup
Top: 149 pt
Left: 138 pt
Bottom: 180 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Layout Objects: IMPORT_SESSIONS

Regular Fields

Field Name: IMPORT_SESSIONS::fkFiscalYear
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
IMPORT_SESSIONS
Top: 114 pt
Left: 138 pt
Bottom: 145 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::ImportTimestamp
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
IMPORT_SESSIONS
Top: 149 pt
Left: 138 pt
Bottom: 180 pt
Right: 379 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::OriginalFile
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
IMPORT_SESSIONS
Top: 184 pt
Left: 138 pt
Bottom: 309 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
No

Field Name: IMPORT_SESSIONS::auto_Filename
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
IMPORT_SESSIONS
Top: 313 pt
Left: 138 pt
Bottom: 344 pt
Right: 217 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::auto_FilesizeKB
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
IMPORT_SESSIONS
Top: 348 pt
Left: 138 pt
Bottom: 379 pt
Right: 217 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::SessionLabel
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
IMPORT_SESSIONS
Top: 383 pt
Left: 138 pt
Bottom: 414 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: IMPORT_SESSIONS::Notes
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
IMPORT_SESSIONS
Top: 418 pt
Left: 138 pt
Bottom: 449 pt
Right: 391 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Layout Objects: Import_URF0989

Regular Fields

Field Name: Import_URF0989::fkFAO
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 114 pt
Left: 263 pt
Bottom: 145 pt
Right: 516 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::fkCompany
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 149 pt
Left: 263 pt
Bottom: 180 pt
Right: 516 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::fkCostCenter
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 184 pt
Left: 263 pt
Bottom: 215 pt
Right: 516 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::fkFund
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 219 pt
Left: 263 pt
Bottom: 250 pt
Right: 516 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::fkLedgerAccount
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 254 pt
Left: 263 pt
Bottom: 285 pt
Right: 516 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::fkSpendCategory
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 289 pt
Left: 263 pt
Bottom: 320 pt
Right: 516 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::import_OriginalBudget
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 324 pt
Left: 263 pt
Bottom: 355 pt
Right: 342 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::import_CurrentBudget
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 359 pt
Left: 263 pt
Bottom: 390 pt
Right: 342 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::import_MonthActual
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 394 pt
Left: 263 pt
Bottom: 425 pt
Right: 342 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::import_FYTD Actual
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 429 pt
Left: 263 pt
Bottom: 460 pt
Right: 342 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::import_BalanaceAvailable
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 464 pt
Left: 263 pt
Bottom: 495 pt
Right: 342 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::import_PercentUsed
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 499 pt
Left: 263 pt
Bottom: 530 pt
Right: 342 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Field Name: Import_URF0989::fkImportSession
Field Properties	Coordinates	Field Format	Field Behavior	Quick Find
Layout Name:
Import_URF0989
Top: 534 pt
Left: 263 pt
Bottom: 565 pt
Right: 516 pt
Anchoring: Left, Top
Field Format:
Edit Box
Field Behavior:
Allow field to be entered: In Find mode, In Browse mode
Touch keyboard type: Default for Data Type
Go to next field using: Tab key
Yes

Value Lists

Value List Name	Source	Values	On Layouts
One	Custom	
1
(table) Generate Budget Codes
Value Lists
(table) URITP Budget Codes
Print BUDGET CODES
(table) Import URF LINES
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
PRINT CODED TRANSACTIONS
file_WorkNotes
BUDGET_VERSIONS	Field	
Primary Field
Field: BUDGET_AllocationVersions::PrimaryKey

Secondary Field
Field: BUDGET_AllocationVersions::TITLE

Show values only from second field
Sort by second field
(Layout) NM Allocation Format Copy
Value Lists
File SETUP
GLOBAL_VARIABLES | Imported
gBudget Codes
ui_GLOBAL_BudgetHub
(form) CODED Transactions
(Layout) NM Allocation Format
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
(dropdown) Budget_REVs	Custom	
A, B, C, D, E, F, Original, Final, MAW, NM, SG, Deans, template, Proposed
(form) Budget HISTORY
(form) Budget Versions
(List) Budget Versions
Budget Code Extended Names	Field	
Primary Field
Field: BudgetCode_Defintions::PrimaryKey

Secondary Field
Field: BudgetCode_Defintions::calcDisplay_Code

Show values only from second field
Sort by second field
(form) Budget Versions
(form) CODED Transactions
(list) individual Allocations
Current_Allocation
(form) URITP Budget Code
Batch Assiging Budget Codes
CumSale_LABOUR
popup Budget Code Number	Field	
Primary Field
Field: BudgetCode_Defintions::PrimaryKey

Secondary Field
Field: BudgetCode_Defintions::display_CodeCurrent

Show values only from second field
Sort by second field
(Layout) NM Allocation Format Copy
(tabel) Codes tht Others Use
(form) CODED Transactions
(Layout) NM Allocation Format
UNASSIGNED
MOBILE Assiging Budget Codes Copy
PRINT CODED TRANSACTIONS
popup Budget Code DisplayName	Field	
Primary Field
Field: BudgetCode_Defintions::PrimaryKey

Secondary Field
Field: BudgetCode_Defintions::auto_Display_forPopups

Show values only from second field
Sort by second field
(table) Budget Code Year Configs
(popup) Fiscal Year	External	
FileMaker Data Source: URITP Global Setup
Value list: popup_FISCAL_YEAR_Titles
(form) Budget HISTORY
(table) Budget Code Year Configs
(form) Budget Versions
(table) Import SESSIONS URF
FAOs	Custom	
OP211035, OP213141, OP213142, OP213143, OP213144
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
Ledger Accounts	Field	
Primary Field
Field: URF_IMPORT_ROWS::source_LedgerAccount

Sort by first field
FAC Names	Field	
Primary Field
Field: URF_IMPORT_ROWS::source_FACName

Sort by first field
UNASSIGNED
Batch Assiging Budget Codes
fk_budgetOwners	Field	
Primary Field
Field: <Missing Field>

Secondary Field
Field: <Missing Field>

Show values only from second field
Sort by second field
(table) URITP Budget Codes
Print BUDGET CODES
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
(popup) Code HEADERS	Field	
Primary Field
Field: <Missing Field>

Secondary Field
Field: <Missing Field>

Show values only from second field
Sort by second field
(table) URITP Budget Codes
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
(form) URITP Budget Code
NM_Worksheets	Custom	
Bellow the Line Staffing, Production Budget, Production Budget Summary, Program Budget, Breakdowns & Worksheets, Accom Worksheet, Summary, MAW_Allocation
Current_Allocation
(form) URITP Budget Code
NM_AllocationWorksheets	Custom	
Below the Line Staffing, Production 1, Production 2, Production 3, Production 4, Production - Other, Production - Summary, Program Budget, Breakdowns, P1, P2, Travel and Accomm, Prod Exp 2
(Layout) NM Allocation Format Copy
(Layout) NM Allocation Format
NM_SubtotalCategories	Custom	
Artist Fees, Travel & Accom, Production Expenses 1, Production Expenses 2
(Layout) NM Allocation Format Copy
(Layout) NM Allocation Format
popupEDS_FiscalYears	External	
FileMaker Data Source: URITP Global Setup
Value list: popup_FISCAL_YEAR_Titles
(table) Budget Code Year Configs
gBudget Codes
(List) Budget Versions
popupV_StatusCategories	Field	
Primary Field
Field: ufile_Values::PrimaryKey

Secondary Field
Field: ufile_Values::Name

Show values only from second field
Sort by second field
Table Occurrence: values_StatusCategories
(table) values
Value Lists
popupV_ImportSessionStatuses	Field	
Primary Field
Field: ufile_Values::PrimaryKey

Secondary Field
Field: ufile_Values::Name

Show values only from second field
Sort by second field
Table Occurrence: values_ImportSessionStatuses
Value Lists
(table) Import SESSIONS URF
popupV_BudgetVersions	Field	
Primary Field
Field: ufile_Values::PrimaryKey

Secondary Field
Field: ufile_Values::Name

Show values only from second field
Sort by second field
Table Occurrence: values_BudgetVersions
(form) Budget HISTORY
Value Lists
popupV_List2	Field	
Primary Field
Field: ufile_Values::PrimaryKey

Secondary Field
Field: ufile_Values::Name

Show values only from second field
Sort by second field
Table Occurrence: values_List2
Value Lists
popupV_ImportStatuses	Field	
Primary Field
Field: ufile_Values::PrimaryKey

Secondary Field
Field: ufile_Values::Name

Show values only from second field
Sort by second field
Table Occurrence: values_ImportStatuses
Value Lists
popupV_ValueLists	Field	
Primary Field
Field: ufile_ValueLISTS::PrimaryKey

Secondary Field
Field: ufile_ValueLISTS::Name

Show values only from second field
Sort by second field
(table) values
Value Lists
popup_SpendCategories	Field	
Primary Field
Field: UR_SpendRevenueCategory::PrimaryKey

Secondary Field
Field: UR_SpendRevenueCategory::Title

Show values only from second field
Sort by second field
(tabel) Codes tht Others Use
popup_OPLines	Field	
Primary Field
Field: OP_Lines::PrimaryKey

Secondary Field
Field: OP_Lines::Title

Show values only from second field
Sort by second field
(table) Budget CONTEXT Definitions
popup_BudgetFAMILIES	Field	
Primary Field
Field: Budget_FamilyDefintions::PrimaryKey

Secondary Field
Field: Budget_FamilyDefintions::auto_PopupName

Show values only from second field
Sort by second field
Re-sort values based on: English
(table) Generate Budget Codes
(table) Budget CONTEXT Definitions
(table) Budget SUFFIX Definitions
Print BUDGET CODES
popup_BudgetSUFFIX_byFamily	Field	
Primary Field
Field: Budget_ContextSuffix_forPopup::PrimaryKey

Secondary Field
Field: Budget_ContextSuffix_forPopup::Name

Show values only from second field
Sort by second field
Re-sort values based on: English
popup_BudgetCodeCONTEXTS	Field	
Primary Field
Field: Budget_ContextDefinitions::PrimaryKey

Secondary Field
Field: Budget_ContextDefinitions::auto_popupName

Show values only from second field
Sort by second field
Re-sort values based on: English
popup_BudgetCodeCONTEXTS_FilteredbyFamily	Field	
Primary Field
Field: Budget_ContextDefinitions_forFiltering::PrimaryKey

Secondary Field
Field: Budget_ContextDefinitions_forFiltering::auto_popupName

Show values only from second field
Sort by second field
Re-sort values based on: English
Table Occurrence: Budget_FamilyDefintions
(table) Generate Budget Codes
Print BUDGET CODES
popup_BudgetCodeContextSUFFIX_filtered	Field	
Primary Field
Field: Budget_ContextSuffixDefinitions_forFiltering::PrimaryKey

Secondary Field
Field: Budget_ContextSuffixDefinitions_forFiltering::Name

Show values only from second field
Sort by second field
Table Occurrence: Budget_FamilyDefintions
(table) Generate Budget Codes
Print BUDGET CODES
value_SuffixScope	Custom	
FAMILY, CONTEXT
(table) Budget FAMILY Definitions
values_Fund_Restrictions	Custom	
Unrestricted, Temp Restricted High, Temp Restricted Low
fURF0989_UR_Fund
popupV_BudgetCode_fromCurrentConfig	Field	
Primary Field
Field: BudgetCode_YearConfig::PrimaryKey

Secondary Field
Field: BudgetCode_YearConfig::auto_DisplayName

Show values only from second field
Sort by second field
(form) Budget HISTORY
Script Hierarchy

File Scripts
lastWindowClose
firstWindowOpen
File OPERATIONS
save zBACKUP | File
Layout ENTER, EXIT
enter | GLOBAL SETUP
SET | Fields
set GLOBALS
set G | FILE RECORD STATS
set G | SELECTED CODE
set G | SELECTED Version from gFY
SELECTOR triggers
select | g FISCAL YEAR
BUTTONS
NAVIGATION
navi | Select Code
-
URF IMPORT
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_URF_Preflight_Profile
IMPORT_rows_to_URF0985
Recompute_URF_Fingerprints
Filter
Omit_all
New Windows
new_square_window
-
button_CurrentAllocationPupup
showOnly_CurrentAllocation
goToRelatedAllocations
RefreshCurrentAllocation
assignToCurrent
commitSummaryButtonTriggerFY26
commitSummaryButtonTrigger CopyFY26
COMMIT_ALL
SORT_BudgetCodes
showUNASSIGNED
showUNASSIGNED Copy
assignCODE
useSelectedCode
goToCode
POPUP_selectCODE
Scripts for Buttons
goToCodedTransactions
printAllCodeFormats
Layout #29
SortbyCode100
SortedbyCode10
SortedbyCode10 Copy
SortedbyHeader
REPLACE_fkBudgetCode
COPY_code
PASTE_code
buttonPassCodeNum
enterLayoutSpecificCodeURF
FilterSingleCodeASK
getCODEpk
New Script
LayoutEnter
Sort By
sortByNMAllocation
BudgetVersionBY_SortOrder
findAllocation
newAllocationWcurrent
showOnlyActiveAllocation
DuplicateWRelated
commitRecord
sort | Budget Code SUFFIXES
sort | Budget Code SUFFIXES Copy
sort | Budget Code Assignment Join
temp
New Script
CREATE Budget Code Year Config Snapshot
CHECK BudgetCodeDef
sort | Budget Allocation VERSIONS

Next Script: [Recompute_URF_Fingerprints]
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

Previous Script: [-]
Next Script: [-]
Script Name	Recompute_URF_Fingerprints
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(table) Import URF LINES
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

Previous Script: [Recompute_URF_Fingerprints]
Next Script: [button_CurrentAllocationPupup]
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

Previous Script: [-]
Next Script: [showOnly_CurrentAllocation]
Script Name	button_CurrentAllocationPupup
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
New Window [ Style: Document; Name: "Current Allocation"; Using layout: <Current Layout>; Height: 800; Width: 1200; Top: 100; Left: 600; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
Perform Script [ “goToRelatedAllocations” ]
Fields used in this script	
Scripts used in this script	
goToRelatedAllocations
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [button_CurrentAllocationPupup]
Next Script: [goToRelatedAllocations]
Script Name	showOnly_CurrentAllocation
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Current_Allocation
Scripts that use this script	
Script Definition
Script Steps	
Go to Layout [ “(form) Budget Versions” (BUDGET_AllocationVersions) ]
Enter Find Mode [ ]
Set Field [ BUDGET_AllocationVersions::PrimaryKey; ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ]
Perform Find [ ]
Perform Script [ “goToRelatedAllocations” ]
Fields used in this script	
ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
BUDGET_AllocationVersions::PrimaryKey
Scripts used in this script	
goToRelatedAllocations
Layouts used in this script	
(form) Budget Versions
Tables used in this script	
BUDGET_Versions
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
BUDGET_AllocationVersions
ui_GLOBAL_BudgetHub
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [showOnly_CurrentAllocation]
Next Script: [RefreshCurrentAllocation]
Script Name	goToRelatedAllocations
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(form) Budget HISTORY
(form) Budget Versions
Scripts that use this script	
button_CurrentAllocationPupup
showOnly_CurrentAllocation
Script Definition
Script Steps	
Go to Related Record [ From table: “Budget_Allocation”; Using layout: “(Layout) NM Allocation Format” (Budget_Allocation) ] [ Show only related records; New window ]
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_Allocation::AllocationWorksheet; based on value list: “NM_AllocationWorksheets” Budget_Allocation::NM_Subtotal; based on value list: “NM_SubtotalCategories” Budget_Allocation::NM_sort; ascending ] [ Restore; No dialog ]
Fields used in this script	
Budget_Allocation::AllocationWorksheet
Budget_Allocation::NM_Subtotal
Budget_Allocation::NM_sort
Scripts used in this script	
Layouts used in this script	
(Layout) NM Allocation Format
Tables used in this script	
Budget_Allocation
Table occurrences used by this script	
Budget_Allocation
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [goToRelatedAllocations]
Next Script: [assignToCurrent]
Script Name	RefreshCurrentAllocation
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Refresh Portal [ Object Name: "SUMMARY_PORTAL" ]
// Refresh Portal [ Object Name: "SUMMARY_PORTAL" ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [RefreshCurrentAllocation]
Next Script: [commitSummaryButtonTriggerFY26]
Script Name	assignToCurrent
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
If [ IsEmpty ( Budget_Allocation::fkBudgetVersion ) ]
Set Field [ Budget_Allocation::fkBudgetVersion; ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ]
End If
Fields used in this script	
Budget_Allocation::fkBudgetVersion
ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Allocation
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
Budget_Allocation
ui_GLOBAL_BudgetHub
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [assignToCurrent]
Next Script: [commitSummaryButtonTrigger CopyFY26]
Script Name	commitSummaryButtonTriggerFY26
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
(form) URITP Budget Code
Scripts that use this script	
COMMIT_ALL
Script Definition
Script Steps	
Set Variable [ $ObjectName; Value:"PORTAL_SUMMARY" ]
// Set Variable [ $Total; Value: GetLayoutObjectAttribute ( $ObjectName ; "content" ) ]
Set Variable [ $Total; Value: Case ( IsEmpty(Budget_Allocation::SummaryAmountAwarded) ; 0 ; GetLayoutObjectAttribute ( $ObjectName ; "content" ) ) ]
// Show Custom Dialog [ Title: "Value"; Message: "Value = " & $Total; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
// Show Custom Dialog [ Title: "Summary Amount"; Message: "Total = " & $Total; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
Set Field [ BudgetCode_Defintions::xxFY26 Allocation; $Total ]
Set Field [ BudgetCode_Defintions::_temp; 1 ]
Fields used in this script	
Budget_Allocation::SummaryAmountAwarded
BudgetCode_Defintions::xxFY26 Allocation
BudgetCode_Defintions::_temp
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Allocation
Budget_Codes_Defintions
Table occurrences used by this script	
BudgetCode_Defintions
Budget_Allocation
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [commitSummaryButtonTriggerFY26]
Next Script: [COMMIT_ALL]
Script Name	commitSummaryButtonTrigger CopyFY26
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Go to Object [ Object Name: "PORTAL_SUMMARY" ]
Set Variable [ $Total; Value: Case ( IsEmpty(Budget_Allocation::SummaryAmountAwarded) ; 0 ; Budget_Allocation::SummaryAmountAwarded ) ]
// Show Custom Dialog [ Title: "Summary Amount"; Message: "Total = " & $Total; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
Set Field [ BudgetCode_Defintions::xxFY26 Allocation; $Total ]
Fields used in this script	
Budget_Allocation::SummaryAmountAwarded
BudgetCode_Defintions::xxFY26 Allocation
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Allocation
Budget_Codes_Defintions
Table occurrences used by this script	
BudgetCode_Defintions
Budget_Allocation
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [commitSummaryButtonTrigger CopyFY26]
Next Script: [SORT_BudgetCodes]
Script Name	COMMIT_ALL
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(form) URITP Budget Code
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $return; Value:BudgetCode_Defintions::PrimaryKey ]
Go to Record/Request/Page [ First ]
Loop
Perform Script [ “commitSummaryButtonTriggerFY26” ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Enter Find Mode [ ]
Set Field [ BudgetCode_Defintions::PrimaryKey; $return ]
Perform Find [ ]
Show All Records
Perform Script [ “SORT_BudgetCodes” ]
Fields used in this script	
BudgetCode_Defintions::PrimaryKey
Scripts used in this script	
commitSummaryButtonTriggerFY26
SORT_BudgetCodes
Layouts used in this script	
Tables used in this script	
Budget_Codes_Defintions
Table occurrences used by this script	
BudgetCode_Defintions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [COMMIT_ALL]
Next Script: [showUNASSIGNED]
Script Name	SORT_BudgetCodes
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
COMMIT_ALL
Script Definition
Script Steps	
Sort Records by Field [ Ascending; BudgetCode_Defintions::Default Code ]
Fields used in this script	
BudgetCode_Defintions::Default Code
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Codes_Defintions
Table occurrences used by this script	
BudgetCode_Defintions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [SORT_BudgetCodes]
Next Script: [showUNASSIGNED Copy]
Script Name	showUNASSIGNED
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
Scripts that use this script	
Script Definition
Script Steps	
Show All Records
Enter Find Mode [ ]
// Go to Field [ URF_IMPORT_ROWS::source_Amount ]
Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; "=" ]
Perform Find [ ]
Fields used in this script	
URF_IMPORT_ROWS::source_Amount
URF_IMPORT_ROWS::xxfkBUDGET_CODE
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
IMPORT_URF0985
Table occurrences used by this script	
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [showUNASSIGNED]
Next Script: [assignCODE]
Script Name	showUNASSIGNED Copy
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
MOBILE Assiging Budget Codes Copy
Scripts that use this script	
Script Definition
Script Steps	
Show All Records
Enter Find Mode [ ]
// Go to Field [ URF_IMPORT_ROWS::source_Amount ]
Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; "=" ]
Perform Find [ ]
Show Omitted Only
Fields used in this script	
URF_IMPORT_ROWS::source_Amount
URF_IMPORT_ROWS::xxfkBUDGET_CODE
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
IMPORT_URF0985
Table occurrences used by this script	
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [showUNASSIGNED Copy]
Next Script: [useSelectedCode]
Script Name	assignCODE
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [assignCODE]
Next Script: [goToCode]
Script Name	useSelectedCode
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
CodeSelectionPOPUP
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $selectedCode; Value:Code_Definitions::PrimaryKey ]
// Show Custom Dialog [ Title: "pk Budget Code"; Message: "pk: " & $selectedCode; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
Close Window [ Current Window ]
#and then add that P.K. to the record
Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; $selectedCode ]
Fields used in this script	
Code_Definitions::PrimaryKey
URF_IMPORT_ROWS::xxfkBUDGET_CODE
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Codes_Defintions
IMPORT_URF0985
Table occurrences used by this script	
Code_Definitions
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [useSelectedCode]
Next Script: [POPUP_selectCODE]
Script Name	goToCode
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
CodeSelectionPOPUP
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $code; Value:Get(ScriptParameter) ]
Enter Find Mode [ ]
Set Field [ Code_Definitions::Default Code; $code ]
Perform Find [ ]
Show All Records
Sort Records by Field [ Ascending ]
// Scroll Window [ End ]
// Pause/Resume Script [ Duration (seconds): .25 ]
Scroll Window [ To Selection ]
Fields used in this script	
Code_Definitions::Default Code
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Codes_Defintions
Table occurrences used by this script	
Code_Definitions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [goToCode]
Next Script: [COPY_code]
Script Name	POPUP_selectCODE
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
UNASSIGNED
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $returnID; Value:URF_IMPORT_ROWS::PrimaryKey ]
New Window [ Style: Card; Name: "BUDGET CODES"; Using layout: “CodeSelectionPOPUP” (Code_Definitions); Height: 800; Close: Yes; Minimize: No; Maximize: No; Resize: No; Menu Bar: No; Dim parent window: Yes; Toolbars: No ]
Show All Records
Sort Records [ Keep records in sorted order; Specified Sort Order: Code_Definitions::Default Code; ascending ] [ Restore; No dialog ]
Enter Find Mode [ ] [ Pause ]
Fields used in this script	
URF_IMPORT_ROWS::PrimaryKey
Code_Definitions::Default Code
Scripts used in this script	
Layouts used in this script	
CodeSelectionPOPUP
Tables used in this script	
Budget_Codes_Defintions
IMPORT_URF0985
Table occurrences used by this script	
Code_Definitions
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [POPUP_selectCODE]
Next Script: [PASTE_code]
Script Name	COPY_code
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $fk; Value:URF_IMPORT_ROWS::xxfkBUDGET_CODE ]
Set Field [ <Table Missing>; $fk ]
Fields used in this script	
URF_IMPORT_ROWS::xxfkBUDGET_CODE
<Missing Field>
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
IMPORT_URF0985
Table occurrences used by this script	
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [COPY_code]
Next Script: [buttonPassCodeNum]
Script Name	PASTE_code
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Batch Assiging Budget Codes
MOBILE Assiging Budget Codes Copy
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $fk; Value:<Table Missing>::<Field Missing> ]
Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; $fk ]
Fields used in this script	
URF_IMPORT_ROWS::xxfkBUDGET_CODE
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
IMPORT_URF0985
Table occurrences used by this script	
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [PASTE_code]
Next Script: [enterLayoutSpecificCodeURF]
Script Name	buttonPassCodeNum
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Batch Assiging Budget Codes
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $code; Value:Get(ScriptParameter) ]
Set Variable [ $fk; Value:0 ]
Freeze Window
Go to Layout [ “(table) URITP Budget Codes” (BudgetCode_Defintions) ]
Enter Find Mode [ ]
Set Field [ BudgetCode_Defintions::Default Code; $code ]
Perform Find [ ]
Set Variable [ $fk; Value:BudgetCode_Defintions::PrimaryKey ]
Show All Records
Go to Layout [ original layout ]
Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; $fk ]
Fields used in this script	
BudgetCode_Defintions::Default Code
BudgetCode_Defintions::PrimaryKey
URF_IMPORT_ROWS::xxfkBUDGET_CODE
Scripts used in this script	
Layouts used in this script	
(table) URITP Budget Codes
Tables used in this script	
Budget_Codes_Defintions
IMPORT_URF0985
Table occurrences used by this script	
BudgetCode_Defintions
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [buttonPassCodeNum]
Next Script: [FilterSingleCodeASK]
Script Name	enterLayoutSpecificCodeURF
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Enter Browse Mode
Go to Layout [ “PRINT CODED TRANSACTIONS” (URF_IMPORT_ROWS) ]
Sort Records [ Keep records in sorted order; Specified Sort Order: URF_IMPORT_ROWS::xxfkBUDGET_CODE; based on value list: “popup Budget Code Number” URF_IMPORT_ROWS::source_BudgetDate; ascending ] [ Restore; No dialog ]
Fields used in this script	
URF_IMPORT_ROWS::xxfkBUDGET_CODE
URF_IMPORT_ROWS::source_BudgetDate
Scripts used in this script	
Layouts used in this script	
PRINT CODED TRANSACTIONS
Tables used in this script	
IMPORT_URF0985
Table occurrences used by this script	
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [enterLayoutSpecificCodeURF]
Next Script: [getCODEpk]
Script Name	FilterSingleCodeASK
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
PRINT CODED TRANSACTIONS
Scripts that use this script	
Script Definition
Script Steps	
Show Custom Dialog [ Title: "Which code do you want to display?"; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No”; Input #1: $code, "Show code:" ]
Perform Script [ “getCODEpk”; Parameter: $code ]
Enter Find Mode [ ]
Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; GLOBAL_scriptVariables::CODEpk ]
// Perform Find [ ]
// Set Variable [ $CODEpk; Value:BudgetCode_Defintions::PrimaryKey ]
// Go to Layout [ original layout ]
//
//
// Show All Records
// Enter Find Mode [ ]
//
// Set Field [ URF_IMPORT_ROWS::xxfkBUDGET_CODE ]
Fields used in this script	
<Missing Field>
GLOBAL_scriptVariables::CODEpk
URF_IMPORT_ROWS::xxfkBUDGET_CODE
BudgetCode_Defintions::PrimaryKey
Scripts used in this script	
getCODEpk
Layouts used in this script	
Tables used in this script	
Budget_Codes_Defintions
GLOBAL_scriptVariabls
IMPORT_URF0985
Table occurrences used by this script	
BudgetCode_Defintions
GLOBAL_scriptVariables
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [FilterSingleCodeASK]
Next Script: [New Script]
Script Name	getCODEpk
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
FilterSingleCodeASK
Script Definition
Script Steps	
Set Variable [ $code; Value:Get(ScriptParameter) ]
Set Field [ GLOBAL_scriptVariables::CODEpk; 0 ]
Freeze Window
Go to Layout [ “(table) URITP Budget Codes” (BudgetCode_Defintions) ]
Enter Find Mode [ ]
Set Field [ BudgetCode_Defintions::Default Code; $code ]
Perform Find [ ]
Set Field [ GLOBAL_scriptVariables::CODEpk; BudgetCode_Defintions::PrimaryKey ]
Fields used in this script	
GLOBAL_scriptVariables::CODEpk
BudgetCode_Defintions::Default Code
BudgetCode_Defintions::PrimaryKey
Scripts used in this script	
Layouts used in this script	
(table) URITP Budget Codes
Tables used in this script	
Budget_Codes_Defintions
GLOBAL_scriptVariabls
Table occurrences used by this script	
BudgetCode_Defintions
GLOBAL_scriptVariables
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [getCODEpk]
Next Script: [findAllocation]
Script Name	New Script
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

Previous Script: [New Script]
Next Script: [newAllocationWcurrent]
Script Name	findAllocation
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(Layout) NM Allocation Format Copy
(Layout) NM Allocation Format
Scripts that use this script	
Script Definition
Script Steps	
Enter Find Mode [ ]
Go to Field [ Budget_Allocation::fkBudgetVersion ]
Pause/Resume Script [ Indefinitely ]
Perform Find [ ]
Perform Script [ “sortByNMAllocation” ]
Fields used in this script	
Budget_Allocation::fkBudgetVersion
Scripts used in this script	
sortByNMAllocation
Layouts used in this script	
Tables used in this script	
Budget_Allocation
Table occurrences used by this script	
Budget_Allocation
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [findAllocation]
Next Script: [showOnlyActiveAllocation]
Script Name	newAllocationWcurrent
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(Layout) NM Allocation Format Copy
(Layout) NM Allocation Format
Scripts that use this script	
Script Definition
Script Steps	
New Record/Request
Set Field [ Budget_Allocation::fkBudgetVersion ]
Fields used in this script	
Budget_Allocation::fkBudgetVersion
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Allocation
Table occurrences used by this script	
Budget_Allocation
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [newAllocationWcurrent]
Next Script: [DuplicateWRelated]
Script Name	showOnlyActiveAllocation
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Show All Records
Set Variable [ $ActiveAllocation; Value:GetAsText ( GetField ( ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion ) ) ]
Show Custom Dialog [ Title: "allocation"; Message: "Current: " & $ActiveAllocation; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
Perform Find [ Specified Find Requests: Find Records; Criteria: Budget_Allocation::fkBudgetVersion: “$ActiveAllocation” ] [ Restore ]
Fields used in this script	
ui_GLOBAL_BudgetHub::g_fkSelectedBudgetVersion
Budget_Allocation::fkBudgetVersion
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Allocation
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
Budget_Allocation
ui_GLOBAL_BudgetHub
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [showOnlyActiveAllocation]
Next Script: [commitRecord]
Script Name	DuplicateWRelated
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(form) Budget Versions
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $newParentID; Value:BUDGET_AllocationVersions::PrimaryKey ]
Fields used in this script	
BUDGET_AllocationVersions::PrimaryKey
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
BUDGET_Versions
Table occurrences used by this script	
BUDGET_AllocationVersions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [DuplicateWRelated]
Next Script: [sort | Budget Code SUFFIXES]
Script Name	commitRecord
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Create_New_URF_Import
Script Definition
Script Steps	
Set Error Capture [ On ]
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $mode; Value:JSONGetElement ( $p ; "mode" ) ]
If [ PatternCount ( "mode" ; "skipValidation" ) ]
Commit Records/Requests [ Skip data entry validation; No dialog ]
Else
Commit Records/Requests [ No dialog ]
If [ Get ( LastError ) and ufile_ValueLISTS::enforce_1_to_1 = 1 ]
Show Custom Dialog [ Message: MSG_ValueListErrors ( "validate_enforce_1_to_1" ) & Char(13) & Char(13) & Char(13) & Char(13) & "Reverting record."; Default Button: “OK”, Commit: “Yes” ]
Revert Record/Request [ No dialog ]
End If
End If
Fields used in this script	
ufile_ValueLISTS::enforce_1_to_1
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
zfile_ValueLISTS
Table occurrences used by this script	
ufile_ValueLISTS
Custom Functions used by this script	
MSG_ValueListErrors
Custom menu set used by this script	

Previous Script: [commitRecord]
Next Script: [sort | Budget Code SUFFIXES Copy]
Script Name	sort | Budget Code SUFFIXES
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(table) Budget SUFFIX Definitions
Scripts that use this script	
Script Definition
Script Steps	
#::Family DIGITS
#fkContext
#Digits
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_FamilyDefintions::Digits; ascending Budget_ContextSuffixDefinitions_forFiltering::Digits; ascending Budget_ContextDefinitions_forFiltering::calc_DigitsAsText; ascending ] [ Restore; No dialog ]
Fields used in this script	
Budget_FamilyDefintions::Digits
Budget_ContextSuffixDefinitions_forFiltering::Digits
Budget_ContextDefinitions_forFiltering::calc_DigitsAsText
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_ContextDefinitions
Budget_ContextSuffixDefinitions
Budget_FamilyDefintions
Table occurrences used by this script	
Budget_ContextDefinitions_forFiltering
Budget_ContextSuffixDefinitions_forFiltering
Budget_FamilyDefintions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [sort | Budget Code SUFFIXES]
Next Script: [sort | Budget Code Assignment Join]
Script Name	sort | Budget Code SUFFIXES Copy
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(table) Budget CONTEXT Definitions
Scripts that use this script	
Script Definition
Script Steps	
#::Family DIGITS
#DIGITS
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_FamilyDefintions::Digits; ascending Budget_ContextDefinitions_forFiltering::Digit; ascending ] [ Restore; No dialog ]
Fields used in this script	
Budget_FamilyDefintions::Digits
Budget_ContextDefinitions_forFiltering::Digit
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_ContextDefinitions
Budget_FamilyDefintions
Table occurrences used by this script	
Budget_ContextDefinitions_forFiltering
Budget_FamilyDefintions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [sort | Budget Code SUFFIXES Copy]
Next Script: [temp]
Script Name	sort | Budget Code Assignment Join
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(table) Generate Budget Codes
Print BUDGET CODES
Scripts that use this script	
Script Definition
Script Steps	
# budget FAMILY digit
# budget CONTEXT digits
# budget SUFFIX digits
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_FamilyDefintions::Digits; ascending Budget_ContextDefinitions::Digit; ascending Budget_ContextSuffixDefinitions::Digits; ascending ] [ Restore; No dialog ]
Fields used in this script	
Budget_FamilyDefintions::Digits
Budget_ContextDefinitions::Digit
Budget_ContextSuffixDefinitions::Digits
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_ContextDefinitions
Budget_ContextSuffixDefinitions
Budget_FamilyDefintions
Table occurrences used by this script	
Budget_ContextDefinitions
Budget_ContextSuffixDefinitions
Budget_FamilyDefintions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [sort | Budget Code Assignment Join]
Next Script: [New Script]
Script Name	temp
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(table) Generate Budget Codes
Scripts that use this script	
Script Definition
Script Steps	
Show All Records
// Go to Field [ BudgetCode_Defintions::Default Name ]
Go to Record/Request/Page [ First ]
Loop
Set Field [ BudgetCode_Defintions::Default Name; BudgetCode_Defintions::Default Name ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Go to Record/Request/Page [ First ]
Fields used in this script	
BudgetCode_Defintions::Default Name
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Codes_Defintions
Table occurrences used by this script	
BudgetCode_Defintions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [temp]
Next Script: [CREATE Budget Code Year Config Snapshot]
Script Name	New Script
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(table) Generate Budget Codes
Scripts that use this script	
Script Definition
Script Steps	
Show All Records
Go to Record/Request/Page [ First ]
Loop
Set Field [ BudgetCode_Defintions::display_CodeCurrent; BudgetCode_Defintions::calc_ExpectedCode ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Fields used in this script	
BudgetCode_Defintions::calc_ExpectedCode
BudgetCode_Defintions::display_CodeCurrent
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Codes_Defintions
Table occurrences used by this script	
BudgetCode_Defintions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [New Script]
Next Script: [CHECK BudgetCodeDef]
Script Name	CREATE Budget Code Year Config Snapshot
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(table) Budget Code Year Configs
Scripts that use this script	
Script Definition
Script Steps	
#really an UPDATE / RECONCILATION to make a UNIQUE SET OF CODES for the CURRENT FISCAL YEAR.
#If no config exists for the selected FY, then generate new joins for every found CODE.
#If fkBudgetCodeDefintiion already exists, update the code for the selected FY
Set Variable [ $fkFY; Value:GLOBAL_USE_VARIABLES::g_fkSelectedFiscalYear ]
Show All Records
Enter Find Mode [ ]
Set Field [ BudgetCode_YearConfig::fkBudgetCodeDefinition; "*" ]
Perform Find [ ]
// Show Omitted Only
Sort Records [ Keep records in sorted order; Specified Sort Order: BudgetCode_YearConfig::Code_snapshot; ascending ] [ Restore; No dialog ]
Go to Record/Request/Page [ First ]
Set Variable [ $i; Value:0 ]
Set Variable [ $made; Value:0 ]
Loop
Set Variable [ $i; Value:$i+1 ]
Set Variable [ $fkCodeConfig; Value:BudgetCode_YearConfig::PrimaryKey ]
Set Variable [ $fkCodeConfig; Value:BudgetCode_YearConfig::PrimaryKey ]
Freeze Window
Go to Layout [ “(table) Generate Budget Codes” (BudgetCode_Defintions) ]
Enter Find Mode [ ]
Set Field [ BudgetCode_Defintions::PrimaryKey; $fkCodeDef ]
Perform Find [ ]
Go to Record/Request/Page [ Next; Exit after last ]
End Loop
Fields used in this script	
GLOBAL_USE_VARIABLES::g_fkSelectedFiscalYear
BudgetCode_YearConfig::fkBudgetCodeDefinition
BudgetCode_YearConfig::Code_snapshot
BudgetCode_YearConfig::PrimaryKey
BudgetCode_Defintions::PrimaryKey
Scripts used in this script	
Layouts used in this script	
(table) Generate Budget Codes
Tables used in this script	
BudgetCode_YearConfig
Budget_Codes_Defintions
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
BudgetCode_Defintions
BudgetCode_YearConfig
GLOBAL_USE_VARIABLES
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [CREATE Budget Code Year Config Snapshot]
Next Script: [sort | Budget Allocation VERSIONS]
Script Name	CHECK BudgetCodeDef
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
#really an UPDATE / RECONCILATION to make a UNIQUE SET OF CODES for the CURRENT FISCAL YEAR.
#If no config exists for the selected FY, then generate new joins for every found CODE.
#If fkBudgetCodeDefintiion already exists, update the code for the selected FY
Freeze Window
Go to Layout [ original layout ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [CHECK BudgetCodeDef]
Script Name	sort | Budget Allocation VERSIONS
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(form) Budget HISTORY
Scripts that use this script	
Script Definition
Script Steps	
#fk FISCAL YEAR::YEAR
#DATE RECEIVED
#SORT ORDER
Sort Records [ Keep records in sorted order; Specified Sort Order: Fiscal_Years_forBudgetVersions::StartDate; descending BUDGET_AllocationVersions::DateReceived; descending BUDGET_AllocationVersions::SORT_ORDER; descending ] [ Restore; No dialog ]
Fields used in this script	
Fiscal_Years_forBudgetVersions::StartDate
BUDGET_AllocationVersions::DateReceived
BUDGET_AllocationVersions::SORT_ORDER
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
BUDGET_Versions
FISCAL_YEARS
Table occurrences used by this script	
BUDGET_AllocationVersions
Fiscal_Years_forBudgetVersions
Custom Functions used by this script	
Custom menu set used by this script	

File Scripts

Parent Folder: [File Scripts]
Next Script: [firstWindowOpen]
Script Name	lastWindowClose
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Set Field [ GLOBAL_USE_VARIABLES::script_LastSaved; Get ( CurrentTimestamp ) ]
Commit Records/Requests [ No dialog ]
Perform Script [ “save zBACKUP | File” ]
Fields used in this script	
GLOBAL_USE_VARIABLES::script_LastSaved
Scripts used in this script	
save zBACKUP | File
Layouts used in this script	
Tables used in this script	
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
GLOBAL_USE_VARIABLES
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [lastWindowClose]
Parent Folder: [File Scripts]
Script Name	firstWindowOpen
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

File OPERATIONS

Parent Folder: [File OPERATIONS]
Script Name	save zBACKUP | File
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
lastWindowClose
Script Definition
Script Steps	
Show Custom Dialog [ Message: "Save a backup?"; Default Button: “Save”, Commit: “Yes”; Button 2: “No”, Commit: “No” ]
If [ Get ( LastMessageChoice ) = 2 ]
Exit Script [ ]
End If
#get filapath in real time for sanity | don't rely on a variable
Set Variable [ $path; Value:Get ( FilePath ) ]
#strip filename to get parent directory
Set Variable [ $dir; Value:Left ( $path ; Position ( $path ; "/" ; Length ( $path ) ; -1 ) ) ]
#Timestamp for the backup name
Set Variable [ $ts; Value:Year ( Get ( CurrentDate ) ) & "" & Right("0" & Month ( Get ( CurrentDate ) ) ; 2 ) & "" & Right("0" & Day ( Get ( CurrentDate ) ) ; 2 ) & "_" & Right("0" & Hour ( Get ( CurrentTimestamp ) ) ; 2 ) & Right("0" & Minute ( Get ( CurrentTimestamp ) ) ; 2 ) ]
#build the backup destination
Set Variable [ $File; Value:$dir & "zBACKUPS/" & Substitute ( ui_GLOBAL_BudgetHub::APP_TITLE ; " " ; "" ) & "_" & $ts & ".fmp12" ]
#Save the file
Save a Copy as [ “$File”; Create folders:Yes ] [ copy of current file ]
Fields used in this script	
ui_GLOBAL_BudgetHub::APP_TITLE
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
ui_GLOBAL_BudgetHub
Custom Functions used by this script	
Custom menu set used by this script	

Layout ENTER, EXIT

Parent Folder: [Layout ENTER, EXIT]
Script Name	enter | GLOBAL SETUP
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Perform Script [ “set G | FILE RECORD STATS” ]
Fields used in this script	
Scripts used in this script	
set G | FILE RECORD STATS
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

SET | Fields

set GLOBALS

Parent Folder: [set GLOBALS]
Next Script: [set G | SELECTED CODE]
Script Name	set G | FILE RECORD STATS
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
enter | GLOBAL SETUP
Script Definition
Script Steps	
Set Field [ GLOBAL_USE_VARIABLES::script_Stats_RecordCounts; "Budget Codes: " & ExecuteSQL ( "SELECT COUNT(*) FROM \"Budget_Codes\"" ; "" ; "" ) ]
Fields used in this script	
GLOBAL_USE_VARIABLES::script_Stats_RecordCounts
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
GLOBAL_USE_VARIABLES
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [set G | FILE RECORD STATS]
Parent Folder: [set GLOBALS]
Next Script: [set G | SELECTED Version from gFY]
Script Name	set G | SELECTED CODE
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
navi | Select Code
Script Definition
Script Steps	
Set Variable [ $pk; Value:Get ( ScriptParameter ) ]
If [ IsEmpty ( $pk ) ]
Show Custom Dialog [ Message: "No pk passed."; Default Button: “OK”, Commit: “Yes” ]
Exit Script [ ]
End If
Set Field [ ui_GLOBAL_BudgetHub::g_fkSelectedCode; $pk ]
Fields used in this script	
ui_GLOBAL_BudgetHub::g_fkSelectedCode
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
ui_GLOBAL_BudgetHub
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [set G | SELECTED CODE]
Parent Folder: [set GLOBALS]
Script Name	set G | SELECTED Version from gFY
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
Scripts that use this script	
select | g FISCAL YEAR
Script Definition
Script Steps	
If [ Get ( ScriptParameter ) ]
Set Variable [ $fy; Value:Get ( ScriptParameter ) ]
Else
Set Variable [ $fy; Value:ui_GLOBAL_BudgetHub::g_fkSelectedFiscalYear ]
End If
If [ IsEmpty ( $fy ) ]
Show Custom Dialog [ Message: "No fiscal year."; Default Button: “OK”, Commit: “Yes” ]
Exit Script [ ]
End If
Set Field [ ui_GLOBAL_BudgetHub::g_fkSelectedCode; $pk ]
Fields used in this script	
ui_GLOBAL_BudgetHub::g_fkSelectedFiscalYear
ui_GLOBAL_BudgetHub::g_fkSelectedCode
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
ui_GLOBAL_BudgetHub
Custom Functions used by this script	
Custom menu set used by this script	

SELECTOR triggers

Parent Folder: [SELECTOR triggers]
Script Name	select | g FISCAL YEAR
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Commit Records/Requests [ No dialog ]
Perform Script [ “set G | SELECTED Version from gFY”; Parameter: ui_GLOBAL_BudgetHub::g_fkSelectedFiscalYear ]
Fields used in this script	
ui_GLOBAL_BudgetHub::g_fkSelectedFiscalYear
Scripts used in this script	
set G | SELECTED Version from gFY
Layouts used in this script	
Tables used in this script	
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
ui_GLOBAL_BudgetHub
Custom Functions used by this script	
Custom menu set used by this script	

BUTTONS

NAVIGATION

Parent Folder: [NAVIGATION]
Script Name	navi | Select Code
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
If [ IsEmpty ( Get ( ScriptParameter ) ) ]
Set Variable [ $pkCode; Value:BudgetCode_Defintions::PrimaryKey ]
Show Custom Dialog [ Title: "No pk passed."; Message: "Using: " & $pk; Default Button: “OK”, Commit: “Yes”; Button 2: “Cancel”, Commit: “No” ]
If [ Get ( LastMessageChoice ) = 2 ]
Exit Script [ ]
End If
Else
Set Variable [ $pkCode; Value:Get ( ScriptParameter ) ]
End If
Perform Script [ “set G | SELECTED CODE”; Parameter: $pkCode ]
Refresh Window [ Flush cached join results; Flush cached external data ]
Fields used in this script	
BudgetCode_Defintions::PrimaryKey
Scripts used in this script	
set G | SELECTED CODE
Layouts used in this script	
Tables used in this script	
Budget_Codes_Defintions
Table occurrences used by this script	
BudgetCode_Defintions
Custom Functions used by this script	
Custom menu set used by this script	

URF IMPORT

Parent Folder: [URF IMPORT]
Next Script: [IMPORT_URF_Create_Session]
Script Name	Create_New_URF_Import
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(table) Import URF LINES
Scripts that use this script	
Script Definition
Script Steps	
#============================================================
#SCRIPT: IMPORT__URF__New_Set (working file: Create_New_URF_Import)
#ROLE: Orchestrator (Option B, keep thin): full URF0985 monthly intake
#CALLED BY: "Import New Set" header button on the URF Raw Import Workbench
#CALLS: IMPORT__URF__Create_Session -> IMPORT__URF__Preflight_Profile ->
# IMPORT__URF__Stamp_Imported_FoundSet -> IMPORT__URF__Clean_First_Pass ->
# IMPORT__URF__Classify_Current_Session -> IMPORT__URF__Open_Current_Session_Workbench
# (UI util: new_square_window)
#------------------------------------------------------------
#INPUTS (script parameter): none for v1
#GLOBALS IN: (optional) current fiscal-year global if set elsewhere
#------------------------------------------------------------
#RETURNS (Exit Script, JSON per convention):
# { "ok": true, "status": "done" } full chain completed
# { "ok": false, "status": "cancelled" } user cancelled
# { "ok": false, "status": "preflight_failed", "error": <notes> }
#GLOBALS OUT (set via Create_Session):
# GLOBAL_USE_VARIABLES::g_fkImportURFSession = new session PK
# GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession = new session PK
# GLOBAL_USE_VARIABLES::g_tempImportContainer = selected file (CLEARED on exit)
#SIDE EFFECTS: creates 1 session + N raw URF_IMPORT_ROWS rows; lands on workbench
#============================================================
#--- SETUP / SAFETY -----------------------------------------
Allow User Abort [ Off ]
Set Error Capture [ On ]
Set Variable [ $layoutName; Value:Get ( LayoutName ) ]
#JSON in (optional in v1)
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Commit Records/Requests [ No dialog ]
// Freeze Window
Set Variable [ $SessionLabel; Value:"Auto import URF 0985" ]
Show Custom Dialog [ Message: "Beginning import session: " & $SessionLabel & ". With or without file upload?"; Default Button: “Without”, Commit: “Yes”; Button 2: “Abort”, Commit: “No”; Button 3: “With”, Commit: “Yes”; Input #1: $customName, "Custom session label:" ]
#Buttons: 1 = without file , 2 = cancel , 3 = with file
If [ Get ( LastMessageChoice ) = 2 ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "status" ; "cancelled" ) ) ) ]
End If
If [ Get ( LastMessageChoice ) = 3 ]
Set Variable [ $wFileUpload; Value:PBool ( "wFileUpload" ; 1 ) ]
Else
Set Variable [ $wFileUpload; Value:PBool ( "wFileUpload" ; 0 ) ]
End If
If [ not IsEmpty ( $customName ) ]
#rename the session
Set Variable [ $sessionLabel; Value:$customName ]
End If
#--- RESET GLOBALS (preserve prior selection for safe return)
Set Variable [ $currentSelected; Value:GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession ]
Set Field [ GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession; "" ]
Set Field [ GLOBAL_USE_VARIABLES::g_fkImportURFSession; "" ]
Set Field [ GLOBAL_USE_VARIABLES::g_tempImportContainer; "" ]
Commit Records/Requests [ No dialog ]
Perform Script [ “new_square_window”; Parameter: Param ( List ( PText ( "mode" ; "max" ) ; PNum ( "max" ; 400 ) ) ) ]
#--- 1. CREATE SESSION (helper sets the session globals) ----
Perform Script [ “IMPORT_URF_Create_Session”; Parameter: Param ( List ( 1 ; $wFileUpload ; PText ( "sessionLabel" ; $sessionLabel ) ) ) ]
// Exit Script [ Result: Param ( List ( PBool ( "ok" ; 1 ) ; "sessionPK" ; $sessionPK ) ) ]
Set Variable [ $return_create; Value:Get ( ScriptResult ) ]
Set Variable [ $ok; Value:ParamGetText ( $return_create ; "ok" ; 0 ) ]
If [ $ok = 0 ]
Set Variable [ $message; Value:ParamGetText ( $return_create ; "error" ; "unkown error" ) ]
Show Custom Dialog [ Title: "Import failed."; Message: $message; Default Button: “OK”, Commit: “Yes” ]
Exit Script [ ]
End If
#--- 2. PREFLIGHT against the locked URF0985 profile --------
Perform Script [ “IMPORT_URF_Preflight_Profile”; Parameter: Param ( List ( PText ( "sessionPK" ; $sessionPK ) ) ) ]
#Preflight reads the file from g_tempImportContainer + resolves the session by PK.
Set Variable [ $return_preflight; Value:Get ( ScriptResult ) ]
If [ ParamGetBoolean ( $return_preflight ; "ok" ; 0 ) = 0 ]
Set Variable [ $message; Value:JSONGetElement ( $return_preflight ; "error" ) ]
Go to Layout [ “(table) Import SESSIONS URF” (IMPORT_SESSIONS) ]
Enter Find Mode [ ]
Set Field [ IMPORT_SESSIONS::PrimaryKey; $sessionPK ]
Perform Find [ ]
Show Custom Dialog [ Title: "Preflight failed."; Message: "$message" & Char(13) & Char(13) & Char(13) & "Delete created session?"; Default Button: “Yes”, Commit: “Yes”; Button 2: “Save it”, Commit: “No” ]
If [ Get ( FoundCount ) = 1 ]
If [ Get ( LastMessageChoice ) = 1 ]
Delete Record/Request
Else
Set Field [ IMPORT_SESSIONS::Notes; $message ]
Set Field [ IMPORT_SESSIONS::fkSessionStatus; "preflight_failed" ]
Perform Script [ “commitRecord” ]
Show All Records
End If
Close Window [ Current Window ]
Exit Script [ ]
End If
End If
// Go to Layout [ “(table) Import URF LINES Excel” (URF_IMPORT_ROWS) ]
// Omit Multiple Records [ URF_IMPORT_ROWS::PrimaryKey ] [ No dialog ]
// Perform Script [ “Omit_all” ]
#--- 3. IMPORT into the raw rows table (locked URF0985 order)
Perform Script [ “IMPORT_rows_to_URF0985” ]
#Import Records leaves the newly imported records as the current found set.
#--- 4. HELPER CHAIN over the imported found set ------------
#Classify rolls up the status counts onto the parent session record.
#--- 5. LAND on the workbench (globals point at this session)
// Go to Layout [ original layout ]
#=== EOF ========================================================
Fields used in this script	
<Missing Field>
GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession
GLOBAL_USE_VARIABLES::g_fkImportURFSession
GLOBAL_USE_VARIABLES::g_tempImportContainer
IMPORT_SESSIONS::PrimaryKey
IMPORT_SESSIONS::Notes
IMPORT_SESSIONS::fkSessionStatus
URF_IMPORT_ROWS::PrimaryKey
Scripts used in this script	
new_square_window
IMPORT_URF_Create_Session
IMPORT_URF_Preflight_Profile
commitRecord
Omit_all
IMPORT_rows_to_URF0985
Layouts used in this script	
(table) Import SESSIONS URF
(table) Import URF LINES Excel
Tables used in this script	
GLOBAL_USE_VARIABLES
IMPORT_SESSIONS
IMPORT_URF0985
Table occurrences used by this script	
GLOBAL_USE_VARIABLES
IMPORT_SESSIONS
URF_IMPORT_ROWS
Custom Functions used by this script	
Param
PBool
PText
PNum
ParamGetText
ParamGetBoolean
Custom menu set used by this script	

Previous Script: [Create_New_URF_Import]
Parent Folder: [URF IMPORT]
Next Script: [IMPORT_URF_Preflight_Profile]
Script Name	IMPORT_URF_Create_Session
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Create_New_URF_Import
Script Definition
Script Steps	
#SCRIPT: IMPORT__URF__Create_Session (working file: IMPORT_URF_Create_Session)
#ROLE: Helper: create one fresh URF_IMPORT_SESSIONS parent + activate it
#CALLED BY: IMPORT__URF__New_Set
#CALLS: (none)
#------------------------------------------------------------
#INPUTS (script parameter, JSON, all optional in v1):
# sourceFileName text original workbook file name (if overriding auto)
# sessionLabel text e.g. "FY27-02 URF0985 import"
# fiscalYearPK text FK -> eds_Fiscal_Years
# reportMonthEnd date month-end this pull represents
# sessionStatus text
# wFileUploade bool 0 / 1
#GLOBALS IN: (none required)
#------------------------------------------------------------
#RETURNS (Exit Script, JSON per convention):
# { "ok": true, "sessionPK": <new PK> }
# { "ok": false, "error": <message> } (on record-create failure)
#GLOBALS OUT:
# GLOBAL_USE_VARIABLES::g_fkImportURFSession = new session PK
# GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession = new session PK
#SIDE EFFECTS: creates + commits exactly one URF_IMPORT_SESSIONS record
#============================================================
#--- SETUP --------------------------------------------------
Set Error Capture [ On ]
#JSON in (optional in v1)
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $wFileUpload; Value:JSONGetElement ( $p ; "wFileUpload" ) ]
Go to Layout [ “(table) Import SESSIONS URF” (IMPORT_SESSIONS) ]
Perform Script [ “Omit_all” ]
#--- 1-2. NEW SESSION RECORD --------------------------------
New Record/Request
Commit Records/Requests [ No dialog ]
If [ Get ( LastError ) ≠ 0 ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "error" ; "could not create session record" )) ) ]
End If
Set Variable [ $sessionPK; Value:IMPORT_SESSIONS::PrimaryKey ]
#--- 4-5. CAPTURE PK into the session globals ---------------
Set Field [ GLOBAL_USE_VARIABLES::g_fkImportURFSession; $sessionPK ]
Set Field [ GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession; $sessionPK ]
#--- RETREIVE REFERENCE FILE --------------------------------
Insert File [ $importFile ] [ Storage method: Reference ] [ Display icon ] [ Compression: Never compress ]
If [ Get ( LastError ) = 1 ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "error" ; "File selection error." ) ) ) ]
End If
Set Field [ GLOBAL_USE_VARIABLES::g_tempImportContainer; $importFile ]
#--- 3. POPULATE metadata (helper readers w/ defaults) ------
If [ $wFileUpload = 1 ]
Set Field [ IMPORT_SESSIONS::OriginalFile; $importFile ]
End If
Set Field [ IMPORT_SESSIONS::SessionLabel; ParamGetText ( $p ; "sessionLabel" ; "Import " & GetAsText ( Get ( CurrentDate ) ) ) ]
Set Field [ IMPORT_SESSIONS::fkFiscalYear; ParamGetText ( $p ; "fiscalYearPK" ; eds_URITP_GLOBAL_Variables::fkCURRENT_FISCAL_YEAR ) ]
Set Field [ IMPORT_SESSIONS::ReportMonthEnd; ParamGetText ( $p ; "reportMonthEnd" ; "" ) ]
Set Field [ IMPORT_SESSIONS::fkSessionStatus; ParamGetText ( $p ; "sessionStatus" ; "" ) ]
Set Field [ IMPORT_SESSIONS::auto_Filename; ParamGetText ( $p ; "sourceFileName" ; IMPORT_SESSIONS::auto_Filename ) ]
Set Field [ IMPORT_SESSIONS::ImportTimestamp; Get ( CurrentTimestamp ) ]
#--- 6-7. COMMIT and return JSON to the caller --------------
Commit Records/Requests [ No dialog ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 1 ) ; "sessionPK" ; $sessionPK ) ) ]
#=== EOF ========================================================
Fields used in this script	
IMPORT_SESSIONS::PrimaryKey
GLOBAL_USE_VARIABLES::g_fkImportURFSession
GLOBAL_USE_VARIABLES::g_fkSelectedImportURFSession
GLOBAL_USE_VARIABLES::g_tempImportContainer
IMPORT_SESSIONS::OriginalFile
IMPORT_SESSIONS::SessionLabel
eds_URITP_GLOBAL_Variables::fkCURRENT_FISCAL_YEAR
IMPORT_SESSIONS::fkFiscalYear
IMPORT_SESSIONS::ReportMonthEnd
IMPORT_SESSIONS::fkSessionStatus
IMPORT_SESSIONS::auto_Filename
IMPORT_SESSIONS::ImportTimestamp
Scripts used in this script	
Omit_all
Layouts used in this script	
(table) Import SESSIONS URF
Tables used in this script	
GLOBAL_USAGE_VARIABLES
GLOBAL_USE_VARIABLES
IMPORT_SESSIONS
Table occurrences used by this script	
GLOBAL_USE_VARIABLES
IMPORT_SESSIONS
eds_URITP_GLOBAL_Variables
Custom Functions used by this script	
Param
PBool
PText
ParamGetText
Custom menu set used by this script	

Previous Script: [IMPORT_URF_Create_Session]
Parent Folder: [URF IMPORT]
Next Script: [IMPORT_rows_to_URF0985]
Script Name	IMPORT_URF_Preflight_Profile
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Create_New_URF_Import
Script Definition
Script Steps	
#============================================================
#SCRIPT: IMPORT_URF_Preflight_Profile
#ROLE: Light pre-import gate: confirm a file is present + correct type
# on the active session before Import Records runs (v1).
#CALLED BY: Create_New_URF_Import (after Create_Session, before Import Records)
#CALLS: (none)
#------------------------------------------------------------
#INPUTS (script parameter, JSON):
# sessionPK text default = GLOBAL_USE_VARIABLES::g_fkImportURFSession
# expectedProfile text default "URF0985"
# expectedSheet text optional; sheet name we EXPECT (see sheet note)
#GLOBALS IN:
# GLOBAL_USE_VARIABLES::g_fkImportURFSession (fallback session PK)
# GLOBAL_USE_VARIABLES::g_tempImportContainer (the selected file — read here)
#------------------------------------------------------------
#RETURNS (Exit Script, JSON per convention):
# { "ok": true, "result": "pass", "profile": "URF0985" }
# { "ok": false, "result": "fail", "notes": <plain-language reason> }
#GLOBALS OUT: (none)
#SIDE EFFECTS: none (does NOT import, does NOT write rows). May leave the
# session record found; caller owns marking preflight_failed.
#============================================================
#--- SETUP --------------------------------------------------
Set Error Capture [ On ]
#JSON in (optional in v1)
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $sessionPK; Value:JSONGetElement ( $p ; "sessionPK" ) ]
Set Variable [ $sessionPK; Value:ParamGetText ( $p ; "sessionPK" ; GLOBAL_USE_VARIABLES::g_fkImportURFSession ) ]
Set Variable [ $expectedProfile; Value:ParamGetText ( $p ; "expectedProfile" ; "URF0985" ) ]
Set Variable [ $expectedProfile; Value:ParamGetText ( $p ; "expectedSheet" ; "" ) ]
#--- RESOLVE THE ACTIVE SESSION RECORD ----------------------
#why do this step at all?????
#--- 1. FILE PRESENT? ---------------------------------------
Set Variable [ $file; Value:GLOBAL_USE_VARIABLES::g_tempImportContainer ]
If [ IsEmpty ( $file ) ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "result" ; "fail" ) ; PText ( "error" ; MSG_PreflightErrors ( "sourceFileLocationError" ) ) ) ) ]
End If
#--- 2. CORRECT FILE TYPE? ----------------------------------
Set Variable [ $fileName; Value:GetContainerAttribute ( $file ; "filename" ) ]
Set Variable [ $ext; Value:Lower ( RightWords ( Substitute ( $fileName ; "." ; " " ) ; 1 ) ) ]
If [ not ($ext = "xlsx" or $ext = "xls") ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "result" ; "fail" ) ; PText ( "error" ; MSG_PreflightErrors ( "fileTypeError" ) & Char(13) & "Received: " & $fileName ) ) ) ]
End If
#--- 3. EXPECTED SHEET (best-effort; see sheet note) --------
## v1 cannot enumerate xlsx sheet names by calc before import.
## If $expectedSheet is provided, this is documented intent only;
## real sheet/header confirmation happens at the import step or via
## the future peek table. Left as a pass-through in v1.
#--- PASS ---------------------------------------------------
If [ ParamGetBoolean ( $ScriptResult ; "ok" ; 0 ) = 0 ]
Set Variable [ $message; Value:JSONGetElement ( $return_preflight ; "error" ) ]
End If
#--- COMMIT and return JSON to the caller --------------
Commit Records/Requests [ No dialog ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 1 ) ; PText ( "result" ; "passed" ) ; PText ( "profile" ; $expectedProfile ) ) ) ]
#=== EOF ========================================================
Fields used in this script	
GLOBAL_USE_VARIABLES::g_fkImportURFSession
GLOBAL_USE_VARIABLES::g_tempImportContainer
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
GLOBAL_USE_VARIABLES
Custom Functions used by this script	
ParamGetText
Param
PBool
PText
MSG_PreflightErrors
ParamGetBoolean
Custom menu set used by this script	

Previous Script: [IMPORT_URF_Preflight_Profile]
Parent Folder: [URF IMPORT]
Script Name	IMPORT_rows_to_URF0985
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Create_New_URF_Import
Script Definition
Script Steps	
Go to Layout [ “(table) Import URF LINES Excel” (URF_IMPORT_ROWS) ]
Perform Script [ “Omit_all” ]
#--- GUARD: file present in the global ----------------------
If [ IsEmpty ( GLOBAL_USE_VARIABLES::g_tempImportContainer ) ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "status" ; "no_file" ) ; PText ( "error" ; "g_tempImportContainer is empty." ) ) ) ]
End If
#--- 1. EXPORT container -> temp path (Import can't read a container)
#CONSTANT filename (not the source filename). A stable path is what lets the
#saved field map keep a target every run. Import cannot read a container.
Set Variable [ $FilePath; Value:Get ( TemporaryPath ) & "URF_0985_import.xlsx" ]
Show Custom Dialog [ Title: "Exporting file."; Message: $FilePath; Default Button: “OK”, Commit: “Yes” ]
If [ Get ( LastError ) ≠ 0 ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "status" ; "export_failed" ) ; PText ( "error" ; "Export to temp failed, code " & Get ( LastError ) ) ) ) ]
End If
Export Field Contents [ GLOBAL_USE_VARIABLES::g_tempImportContainer; “$FilePath”; Create folders:Yes ]
#--- 2. IMPORT from the temp path using the locked URF0985 map
#The saved field map + worksheet live ON this step. Build it ONCE against a
#real file (worksheet "URF0985 Transaction Details Pri...", 30-col positional,
#Add), THEN swap Source to $FilePath. Dialog OFF + arrange by LAST order so
#FileMaker does NOT remap by name at runtime. Do not reopen the map dialog.
// Import Records [ "URF0985_Transaction_Details_Printable_(NCL) (3) copy.xlsx"; Worksheet: "URF0985 Transaction Details Pri"; Fields Name Row: 0; Target: “URF_IMPORT_ROWS”; Method: Add; Character Set: “Mac Roman”; Field Mapping: Source field 1 import to URF_IMPORT_ROWS::source_Company; Source field 2 import to URF_IMPORT_ROWS::source_Fund; Source field 3 import to URF_IMPORT_ROWS::source_CostCenter; Source field 4 import to URF_IMPORT_ROWS::source_FAO_ID; Source field 5 import to URF_IMPORT_ROWS::source_FAOName; Source field 6 import to URF_IMPORT_ROWS::source_ObjectClassName; Source field 7 import to URF_IMPORT_ROWS::source_ObjectClassSortOrder; Source field 8 import to URF_IMPORT_ROWS::source_LedgerAccount; Source field 9 import to URF_IMPORT_ROWS::source_LedgerAccountIdentifier; Source field 10 import to URF_IMPORT_ROWS::source_FAC_ID; Source field 11 import to URF_IMPORT_ROWS::source_FACName; Source field 12 import to URF_IMPORT_ROWS::source_Supplier; Source field 13 import to URF_IMPORT_ROWS::source_PONumber; Source field 14 import to URF_IMPORT_ROWS::source_AccountingDate; Source field 15 import to URF_IMPORT_ROWS::source_BudgetDate; Source field 16 import to URF_IMPORT_ROWS::source_JournalSource; Source field 17 import to URF_IMPORT_ROWS::source_Reference; Source field 18 import to URF_IMPORT_ROWS::source_BusinessDocument; Source field 19 import to URF_IMPORT_ROWS::source_HeaderMemo_PONumber; Source field 20 import to URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber; Source field 21 import to URF_IMPORT_ROWS::source_Amount; Source field 22 import to URF_IMPORT_ROWS::source_Award; Source field 23 import to URF_IMPORT_ROWS::source_AwardName; Source field 24 import to URF_IMPORT_ROWS::source_FromDate; Source field 25 import to URF_IMPORT_ROWS::source_ToDate; Source field 26 import to URF_IMPORT_ROWS::source_AwardLineAmount; Source field 27 import to URF_IMPORT_ROWS::source_PrincipalInvestigator; Source field 28 import to URF_IMPORT_ROWS::source_FiscalTimePeriodStartDate; Source field 29 import to URF_IMPORT_ROWS::source_FiscalTimePeriodEndDate; URF_IMPORT_ROWS::xxFLAG(Do Auto-Enter); URF_IMPORT_ROWS::CreationTimestamp(Do Auto-Enter); URF_IMPORT_ROWS::CreatedBy(Do Auto-Enter); URF_IMPORT_ROWS::ModificationTimestamp(Do Auto-Enter); URF_IMPORT_ROWS::ModifiedBy(Do Auto-Enter); URF_IMPORT_ROWS::is_first_seen_ever(Do Auto-Enter); URF_IMPORT_ROWS::was_seen_in_prior_import(Do Auto-Enter); URF_IMPORT_ROWS::is_duplicate_within_session(Do Auto-Enter); URF_IMPORT_ROWS::is_revision_candidate(Do Auto-Enter); URF_IMPORT_ROWS::PrimaryKey(Do Auto-Enter); ] [ Data contains column names ]
// Import Records [ Source: “$FilePath”; Target: “URF_IMPORT_ROWS”; Method: Add; Character Set: “Mac Roman”; Field Mapping: Source field 1 import to URF_IMPORT_ROWS::source_Company; Source field 2 import to URF_IMPORT_ROWS::source_Fund; Source field 3 import to URF_IMPORT_ROWS::source_CostCenter; Source field 4 import to URF_IMPORT_ROWS::source_FAO_ID; Source field 5 import to URF_IMPORT_ROWS::source_FAOName; Source field 6 import to URF_IMPORT_ROWS::source_ObjectClassName; Source field 7 import to URF_IMPORT_ROWS::source_ObjectClassSortOrder; Source field 8 import to URF_IMPORT_ROWS::source_LedgerAccount; Source field 9 import to URF_IMPORT_ROWS::source_LedgerAccountIdentifier; Source field 10 import to URF_IMPORT_ROWS::source_FAC_ID; Source field 11 import to URF_IMPORT_ROWS::source_FACName; Source field 12 import to URF_IMPORT_ROWS::source_Supplier; Source field 13 import to URF_IMPORT_ROWS::source_PONumber; Source field 14 import to URF_IMPORT_ROWS::source_AccountingDate; Source field 15 import to URF_IMPORT_ROWS::source_BudgetDate; Source field 16 import to URF_IMPORT_ROWS::source_JournalSource; Source field 17 import to URF_IMPORT_ROWS::source_Reference; Source field 18 import to URF_IMPORT_ROWS::source_BusinessDocument; Source field 19 import to URF_IMPORT_ROWS::source_HeaderMemo_PONumber; Source field 20 import to URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber; Source field 21 import to URF_IMPORT_ROWS::source_Amount; Source field 22 import to URF_IMPORT_ROWS::source_Award; Source field 23 import to URF_IMPORT_ROWS::source_AwardName; Source field 24 import to URF_IMPORT_ROWS::source_FromDate; Source field 25 import to URF_IMPORT_ROWS::source_ToDate; Source field 26 import to URF_IMPORT_ROWS::source_AwardLineAmount; Source field 27 import to URF_IMPORT_ROWS::source_PrincipalInvestigator; Source field 28 import to URF_IMPORT_ROWS::source_FiscalTimePeriodStartDate; Source field 29 import to URF_IMPORT_ROWS::source_FiscalTimePeriodEndDate; URF_IMPORT_ROWS::xxFLAG(Do Auto-Enter); URF_IMPORT_ROWS::CreationTimestamp(Do Auto-Enter); URF_IMPORT_ROWS::CreatedBy(Do Auto-Enter); URF_IMPORT_ROWS::ModificationTimestamp(Do Auto-Enter); URF_IMPORT_ROWS::ModifiedBy(Do Auto-Enter); URF_IMPORT_ROWS::is_first_seen_ever(Do Auto-Enter); URF_IMPORT_ROWS::was_seen_in_prior_import(Do Auto-Enter); URF_IMPORT_ROWS::is_duplicate_within_session(Do Auto-Enter); URF_IMPORT_ROWS::is_revision_candidate(Do Auto-Enter); URF_IMPORT_ROWS::PrimaryKey(Do Auto-Enter); ]
Import Records [ "$FilePath"; Worksheet: ""; Fields Name Row: 0; Target: “URF_IMPORT_ROWS”; Method: Add; Character Set: “Mac Roman”; Field Mapping: Source field 1 import to URF_IMPORT_ROWS::source_Company; Source field 2 import to URF_IMPORT_ROWS::source_Fund; Source field 3 import to URF_IMPORT_ROWS::source_CostCenter; Source field 4 import to URF_IMPORT_ROWS::source_FAO_ID; Source field 5 import to URF_IMPORT_ROWS::source_FAOName; Source field 6 import to URF_IMPORT_ROWS::source_ObjectClassName; Source field 7 import to URF_IMPORT_ROWS::source_ObjectClassSortOrder; Source field 8 import to URF_IMPORT_ROWS::source_LedgerAccount; Source field 9 import to URF_IMPORT_ROWS::source_LedgerAccountIdentifier; Source field 10 import to URF_IMPORT_ROWS::source_FAC_ID; Source field 11 import to URF_IMPORT_ROWS::source_FACName; Source field 12 import to URF_IMPORT_ROWS::source_Supplier; Source field 13 import to URF_IMPORT_ROWS::source_PONumber; Source field 14 import to URF_IMPORT_ROWS::source_AccountingDate; Source field 15 import to URF_IMPORT_ROWS::source_BudgetDate; Source field 16 import to URF_IMPORT_ROWS::source_JournalSource; Source field 17 import to URF_IMPORT_ROWS::source_Reference; Source field 18 import to URF_IMPORT_ROWS::source_BusinessDocument; Source field 19 import to URF_IMPORT_ROWS::source_HeaderMemo_PONumber; Source field 20 import to URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber; Source field 21 import to URF_IMPORT_ROWS::source_Amount; Source field 22 import to URF_IMPORT_ROWS::source_Award; Source field 23 import to URF_IMPORT_ROWS::source_AwardName; Source field 24 import to URF_IMPORT_ROWS::source_FromDate; Source field 25 import to URF_IMPORT_ROWS::source_ToDate; Source field 26 import to URF_IMPORT_ROWS::source_AwardLineAmount; Source field 27 import to URF_IMPORT_ROWS::source_PrincipalInvestigator; Source field 28 import to URF_IMPORT_ROWS::source_FiscalTimePeriodStartDate; Source field 29 import to URF_IMPORT_ROWS::source_FiscalTimePeriodEndDate; URF_IMPORT_ROWS::xxFLAG(Do Auto-Enter); URF_IMPORT_ROWS::CreationTimestamp(Do Auto-Enter); URF_IMPORT_ROWS::CreatedBy(Do Auto-Enter); URF_IMPORT_ROWS::ModificationTimestamp(Do Auto-Enter); URF_IMPORT_ROWS::ModifiedBy(Do Auto-Enter); URF_IMPORT_ROWS::is_first_seen_ever(Do Auto-Enter); URF_IMPORT_ROWS::was_seen_in_prior_import(Do Auto-Enter); URF_IMPORT_ROWS::is_duplicate_within_session(Do Auto-Enter); URF_IMPORT_ROWS::is_revision_candidate(Do Auto-Enter); URF_IMPORT_ROWS::PrimaryKey(Do Auto-Enter); ] [ No dialog; Data contains column names ]
If [ Get ( LastError ) ≠ 0 ]
Delete File [ Target file: “$FilePath” ]
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 0 ) ; PText ( "status" ; "import_failed" ) ; PText ( "error" ; "Import failed, code " & Get ( LastError ) ) ) ) ]
End If
Set Variable [ $rows; Value:Get ( FoundCount ) ]
#--- 3. CLEANUP: remove the exported temp file --------------
// Delete File [ Target file: “$FilePath” ]
// Show Custom Dialog [ Message: "Exiting Import_Rows"; Default Button: “OK”, Commit: “Yes” ]
#--- PASS ---------------------------------------------------
Exit Script [ Result: Param ( List ( PBool ( "ok" ; 1 ) ; PText ( "status" ; "imported" ) ; PNum ( "rows" ; $rows ) ) ) ]
Fields used in this script	
GLOBAL_USE_VARIABLES::g_tempImportContainer
URF_IMPORT_ROWS::source_Company
URF_IMPORT_ROWS::source_Fund
URF_IMPORT_ROWS::source_CostCenter
URF_IMPORT_ROWS::source_FAO_ID
URF_IMPORT_ROWS::source_FAOName
URF_IMPORT_ROWS::source_ObjectClassName
URF_IMPORT_ROWS::source_ObjectClassSortOrder
URF_IMPORT_ROWS::source_LedgerAccount
URF_IMPORT_ROWS::source_LedgerAccountIdentifier
URF_IMPORT_ROWS::source_FAC_ID
URF_IMPORT_ROWS::source_FACName
URF_IMPORT_ROWS::source_Supplier
URF_IMPORT_ROWS::source_PONumber
URF_IMPORT_ROWS::source_AccountingDate
URF_IMPORT_ROWS::source_BudgetDate
URF_IMPORT_ROWS::source_JournalSource
URF_IMPORT_ROWS::source_Reference
URF_IMPORT_ROWS::source_BusinessDocument
URF_IMPORT_ROWS::source_HeaderMemo_PONumber
URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber
URF_IMPORT_ROWS::source_Amount
URF_IMPORT_ROWS::source_Award
URF_IMPORT_ROWS::source_AwardName
URF_IMPORT_ROWS::source_FromDate
URF_IMPORT_ROWS::source_ToDate
URF_IMPORT_ROWS::source_AwardLineAmount
URF_IMPORT_ROWS::source_PrincipalInvestigator
URF_IMPORT_ROWS::source_FiscalTimePeriodStartDate
URF_IMPORT_ROWS::source_FiscalTimePeriodEndDate
URF_IMPORT_ROWS::xxURF_UNIQUE
URF_IMPORT_ROWS::xxfkBUDGET_CODE
URF_IMPORT_ROWS::xxs_Amount
URF_IMPORT_ROWS::xxFLAG
URF_IMPORT_ROWS::xxCODING_Notes
URF_IMPORT_ROWS::fkImportSession
URF_IMPORT_ROWS::CreationTimestamp
URF_IMPORT_ROWS::CreatedBy
URF_IMPORT_ROWS::ModificationTimestamp
URF_IMPORT_ROWS::ModifiedBy
URF_IMPORT_ROWS::sourceScripted_RowNumber
URF_IMPORT_ROWS::fkImportStatus
URF_IMPORT_ROWS::is_first_seen_ever
URF_IMPORT_ROWS::was_seen_in_prior_import
URF_IMPORT_ROWS::is_duplicate_within_session
URF_IMPORT_ROWS::is_revision_candidate
URF_IMPORT_ROWS::fkMatchedPriorRow
URF_IMPORT_ROWS::fkMatchedPriorSession
URF_IMPORT_ROWS::calc_sourceUKey_LineFingerprint
URF_IMPORT_ROWS::calc_sourceUKey_DocumentFingerprint
URF_IMPORT_ROWS::calc_NormalizedReference
URF_IMPORT_ROWS::calc_NormalizedBusinessDocument
URF_IMPORT_ROWS::calc_NormalizedSupplier
URF_IMPORT_ROWS::calc_NormalizedLineMemo
URF_IMPORT_ROWS::PrimaryKey
<Missing Field>
URF_IMPORT_ROWS::source_Company
URF_IMPORT_ROWS::source_Fund
URF_IMPORT_ROWS::source_CostCenter
URF_IMPORT_ROWS::source_FAO_ID
URF_IMPORT_ROWS::source_FAOName
URF_IMPORT_ROWS::source_ObjectClassName
URF_IMPORT_ROWS::source_ObjectClassSortOrder
URF_IMPORT_ROWS::source_LedgerAccount
URF_IMPORT_ROWS::source_LedgerAccountIdentifier
URF_IMPORT_ROWS::source_FAC_ID
URF_IMPORT_ROWS::source_FACName
URF_IMPORT_ROWS::source_Supplier
URF_IMPORT_ROWS::source_PONumber
URF_IMPORT_ROWS::source_AccountingDate
URF_IMPORT_ROWS::source_BudgetDate
URF_IMPORT_ROWS::source_JournalSource
URF_IMPORT_ROWS::source_Reference
URF_IMPORT_ROWS::source_BusinessDocument
URF_IMPORT_ROWS::source_HeaderMemo_PONumber
URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber
URF_IMPORT_ROWS::source_Amount
URF_IMPORT_ROWS::source_Award
URF_IMPORT_ROWS::source_AwardName
URF_IMPORT_ROWS::source_FromDate
URF_IMPORT_ROWS::source_ToDate
URF_IMPORT_ROWS::source_AwardLineAmount
URF_IMPORT_ROWS::source_PrincipalInvestigator
URF_IMPORT_ROWS::source_FiscalTimePeriodStartDate
URF_IMPORT_ROWS::source_FiscalTimePeriodEndDate
URF_IMPORT_ROWS::xxURF_UNIQUE
URF_IMPORT_ROWS::xxfkBUDGET_CODE
URF_IMPORT_ROWS::xxs_Amount
URF_IMPORT_ROWS::xxFLAG
URF_IMPORT_ROWS::xxCODING_Notes
URF_IMPORT_ROWS::fkImportSession
URF_IMPORT_ROWS::CreationTimestamp
URF_IMPORT_ROWS::CreatedBy
URF_IMPORT_ROWS::ModificationTimestamp
URF_IMPORT_ROWS::ModifiedBy
URF_IMPORT_ROWS::sourceScripted_RowNumber
URF_IMPORT_ROWS::fkImportStatus
URF_IMPORT_ROWS::is_first_seen_ever
URF_IMPORT_ROWS::was_seen_in_prior_import
URF_IMPORT_ROWS::is_duplicate_within_session
URF_IMPORT_ROWS::is_revision_candidate
URF_IMPORT_ROWS::fkMatchedPriorRow
URF_IMPORT_ROWS::fkMatchedPriorSession
URF_IMPORT_ROWS::calc_sourceUKey_LineFingerprint
URF_IMPORT_ROWS::calc_sourceUKey_DocumentFingerprint
URF_IMPORT_ROWS::calc_NormalizedReference
URF_IMPORT_ROWS::calc_NormalizedBusinessDocument
URF_IMPORT_ROWS::calc_NormalizedSupplier
URF_IMPORT_ROWS::calc_NormalizedLineMemo
URF_IMPORT_ROWS::PrimaryKey
URF_IMPORT_ROWS::source_Company
URF_IMPORT_ROWS::source_Fund
URF_IMPORT_ROWS::source_CostCenter
URF_IMPORT_ROWS::source_FAO_ID
URF_IMPORT_ROWS::source_FAOName
URF_IMPORT_ROWS::source_ObjectClassName
URF_IMPORT_ROWS::source_ObjectClassSortOrder
URF_IMPORT_ROWS::source_LedgerAccount
URF_IMPORT_ROWS::source_LedgerAccountIdentifier
URF_IMPORT_ROWS::source_FAC_ID
URF_IMPORT_ROWS::source_FACName
URF_IMPORT_ROWS::source_Supplier
URF_IMPORT_ROWS::source_PONumber
URF_IMPORT_ROWS::source_AccountingDate
URF_IMPORT_ROWS::source_BudgetDate
URF_IMPORT_ROWS::source_JournalSource
URF_IMPORT_ROWS::source_Reference
URF_IMPORT_ROWS::source_BusinessDocument
URF_IMPORT_ROWS::source_HeaderMemo_PONumber
URF_IMPORT_ROWS::source_LineMemo_SupplierReferenceNumber
URF_IMPORT_ROWS::source_Amount
URF_IMPORT_ROWS::source_Award
URF_IMPORT_ROWS::source_AwardName
URF_IMPORT_ROWS::source_FromDate
URF_IMPORT_ROWS::source_ToDate
URF_IMPORT_ROWS::source_AwardLineAmount
URF_IMPORT_ROWS::source_PrincipalInvestigator
URF_IMPORT_ROWS::source_FiscalTimePeriodStartDate
URF_IMPORT_ROWS::source_FiscalTimePeriodEndDate
URF_IMPORT_ROWS::xxURF_UNIQUE
URF_IMPORT_ROWS::xxfkBUDGET_CODE
URF_IMPORT_ROWS::xxs_Amount
URF_IMPORT_ROWS::xxFLAG
URF_IMPORT_ROWS::xxCODING_Notes
URF_IMPORT_ROWS::fkImportSession
URF_IMPORT_ROWS::CreationTimestamp
URF_IMPORT_ROWS::CreatedBy
URF_IMPORT_ROWS::ModificationTimestamp
URF_IMPORT_ROWS::ModifiedBy
URF_IMPORT_ROWS::sourceScripted_RowNumber
URF_IMPORT_ROWS::fkImportStatus
URF_IMPORT_ROWS::is_first_seen_ever
URF_IMPORT_ROWS::was_seen_in_prior_import
URF_IMPORT_ROWS::is_duplicate_within_session
URF_IMPORT_ROWS::is_revision_candidate
URF_IMPORT_ROWS::fkMatchedPriorRow
URF_IMPORT_ROWS::fkMatchedPriorSession
URF_IMPORT_ROWS::calc_sourceUKey_LineFingerprint
URF_IMPORT_ROWS::calc_sourceUKey_DocumentFingerprint
URF_IMPORT_ROWS::calc_NormalizedReference
URF_IMPORT_ROWS::calc_NormalizedBusinessDocument
URF_IMPORT_ROWS::calc_NormalizedSupplier
URF_IMPORT_ROWS::calc_NormalizedLineMemo
URF_IMPORT_ROWS::PrimaryKey
<Missing Field>
Scripts used in this script	
Omit_all
Layouts used in this script	
(table) Import URF LINES Excel
Tables used in this script	
GLOBAL_USE_VARIABLES
Table occurrences used by this script	
GLOBAL_USE_VARIABLES
URF_IMPORT_ROWS
URF_IMPORT_ROWS
URF_IMPORT_ROWS
Custom Functions used by this script	
Param
PBool
PText
PNum
Custom menu set used by this script	

Filter

Parent Folder: [Filter]
Script Name	Omit_all
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_rows_to_URF0985
Script Definition
Script Steps	
Show All Records
Go to Record/Request/Page [ No dialog; First ]
Omit Multiple Records [ Get ( FoundCount ) ] [ No dialog ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

New Windows

Parent Folder: [New Windows]
Script Name	new_square_window
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Create_New_URF_Import
Script Definition
Script Steps	
Set Variable [ $defaultSize; Value:400 ]
Set Variable [ $defaultHeight; Value:$defaultSize ]
Set Variable [ $defaultWidth; Value:$defaultSize ]
Set Variable [ $p; Value:Get ( ScriptParameter ) ]
Set Variable [ $mode; Value:JSONGetElement ( $p ; "mode" ) ]
If [ IsEmpty ( $mode ) or $mode = "default" ]
New Window [ Style: Document; Using layout: <Current Layout>; Height: $defualtHeight; Width: $defaultWidth; Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
End If
If [ PatternCount ( $mode ; "max" ) ]
Set Variable [ $max; Value:JSONGetElement ( $p ; "max" ) ]
New Window [ Style: Document; Using layout: <Current Layout>; Height: Max ( $defualtHeight ; $max ; Get ( WindowHeight ) - 80 ); Width: Max ( $defaultWidth ; $max ; Get ( WindowWidth ) - 80); Close: Yes; Minimize: Yes; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: Yes ]
End If
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Scripts for Buttons

Parent Folder: [Scripts for Buttons]
Next Script: [printAllCodeFormats]
Script Name	goToCodedTransactions
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
Scripts that use this script	
Script Definition
Script Steps	
Set Variable [ $pkCode; Value:<Table Missing>::<Field Missing> ]
New Window [ Style: Dialog; Name: "Code"; Using layout: “(form) CODED Transactions” (Code_Definitions); Height: 800; Width: 800; Top: 200; Left: 200; Close: Yes; Minimize: No; Maximize: Yes; Resize: Yes; Menu Bar: Yes; Dim parent window: No; Toolbars: No ]
// Go to Layout [ “(form) CODED Transactions” (Code_Definitions) ]
Enter Find Mode [ ]
// Go to Field [ Code_Definitions::Default Name ]
Set Field [ Code_Definitions::PrimaryKey; $pkCode ]
Perform Find [ ]
Fields used in this script	
Code_Definitions::Default Name
Code_Definitions::PrimaryKey
Scripts used in this script	
Layouts used in this script	
(form) CODED Transactions
Tables used in this script	
Budget_Codes_Defintions
Table occurrences used by this script	
Code_Definitions
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [goToCodedTransactions]
Parent Folder: [Scripts for Buttons]
Next Script: [Layout #29]
Script Name	printAllCodeFormats
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
Scripts that use this script	
Script Definition
Script Steps	
// Freeze Window
Perform Script [ “SortedbyHeader” ]
#setup 8.5x11 portrai
Enter Preview Mode
Save Records as PDF [ Create folders:Yes ]
Enter Browse Mode
Perform Script [ “SortedbyCode10” ]
#setup 8.5x11 portrai
Enter Preview Mode
Save Records as PDF [ Create folders:Yes ]
Enter Browse Mode
Perform Script [ “SortbyCode100” ]
#setup 8.5x11 portrai
Enter Preview Mode
Save Records as PDF [ Create folders:Yes ]
Enter Browse Mode
Fields used in this script	
Scripts used in this script	
SortedbyHeader
SortedbyCode10
SortbyCode100
Layouts used in this script	
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [printAllCodeFormats]
Parent Folder: [Scripts for Buttons]
Next Script: [SortbyCode100]
Script Name	Layout #29
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Enter Browse Mode
Go to Layout [ “CODED Ledgers” (URF_IMPORT_ROWS) ]
Fields used in this script	
Scripts used in this script	
Layouts used in this script	
CODED Ledgers
Tables used in this script	
Table occurrences used by this script	
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [Layout #29]
Parent Folder: [Scripts for Buttons]
Next Script: [SortedbyCode10]
Script Name	SortbyCode100
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
Scripts that use this script	
printAllCodeFormats
Script Definition
Script Steps	
Show All Records
Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; ascending <Table Missing>; ascending ] [ Restore; No dialog ]
Set Field [ XX_GLOBAL_PrintingVariables::xx_CodeSortedBy; "Groups of 100" ]
Fields used in this script	
<Missing Field>
XX_GLOBAL_PrintingVariables::xx_CodeSortedBy
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
XX_GLOBAL_PrintingVariables
Table occurrences used by this script	
XX_GLOBAL_PrintingVariables
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [SortbyCode100]
Parent Folder: [Scripts for Buttons]
Next Script: [SortedbyCode10 Copy]
Script Name	SortedbyCode10
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
Scripts that use this script	
printAllCodeFormats
Script Definition
Script Steps	
Show All Records
Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; ascending <Table Missing>; ascending ] [ Restore; No dialog ]
Set Field [ XX_GLOBAL_PrintingVariables::xx_CodeSortedBy; "Groups of 10" ]
Fields used in this script	
<Missing Field>
XX_GLOBAL_PrintingVariables::xx_CodeSortedBy
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
XX_GLOBAL_PrintingVariables
Table occurrences used by this script	
XX_GLOBAL_PrintingVariables
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [SortedbyCode10]
Parent Folder: [Scripts for Buttons]
Next Script: [SortedbyHeader]
Script Name	SortedbyCode10 Copy
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
Scripts that use this script	
Script Definition
Script Steps	
Show All Records
Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; ascending ] [ Restore; No dialog ]
Set Field [ XX_GLOBAL_PrintingVariables::xx_CodeSortedBy; "Code Number" ]
Fields used in this script	
<Missing Field>
XX_GLOBAL_PrintingVariables::xx_CodeSortedBy
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
XX_GLOBAL_PrintingVariables
Table occurrences used by this script	
XX_GLOBAL_PrintingVariables
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [SortedbyCode10 Copy]
Parent Folder: [Scripts for Buttons]
Next Script: [REPLACE_fkBudgetCode]
Script Name	SortedbyHeader
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
(Print) URITP Budget Codes FY26
(Print) URITP Budget Codes Allocation HISTORY
Scripts that use this script	
printAllCodeFormats
Script Definition
Script Steps	
Show All Records
Sort Records [ Keep records in sorted order; Specified Sort Order: <Table Missing>; based on value list: “(popup) Code HEADERS” ] [ Restore; No dialog ]
Set Field [ XX_GLOBAL_PrintingVariables::xx_CodeSortedBy; "Header Category" ]
Fields used in this script	
<Missing Field>
XX_GLOBAL_PrintingVariables::xx_CodeSortedBy
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
XX_GLOBAL_PrintingVariables
Table occurrences used by this script	
XX_GLOBAL_PrintingVariables
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [SortedbyHeader]
Parent Folder: [Scripts for Buttons]
Script Name	REPLACE_fkBudgetCode
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	No
Layouts that use this script	
MOBILE Assiging Budget Codes Copy
Scripts that use this script	
Script Definition
Script Steps	
Replace Field Contents [ URF_IMPORT_ROWS::xxfkBUDGET_CODE; Current contents ]
Fields used in this script	
URF_IMPORT_ROWS::xxfkBUDGET_CODE
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
IMPORT_URF0985
Table occurrences used by this script	
URF_IMPORT_ROWS
Custom Functions used by this script	
Custom menu set used by this script	

LayoutEnter

Sort By

Parent Folder: [Sort By]
Next Script: [BudgetVersionBY_SortOrder]
Script Name	sortByNMAllocation
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
findAllocation
Script Definition
Script Steps	
Sort Records [ Keep records in sorted order; Specified Sort Order: Budget_Allocation::AllocationWorksheet; based on value list: “NM_AllocationWorksheets” Budget_Allocation::NM_Subtotal; based on value list: “NM_SubtotalCategories” Budget_Allocation::NM_sort; ascending ] [ Restore; No dialog ]
Fields used in this script	
Budget_Allocation::AllocationWorksheet
Budget_Allocation::NM_Subtotal
Budget_Allocation::NM_sort
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
Budget_Allocation
Table occurrences used by this script	
Budget_Allocation
Custom Functions used by this script	
Custom menu set used by this script	

Previous Script: [sortByNMAllocation]
Parent Folder: [Sort By]
Script Name	BudgetVersionBY_SortOrder
Run script with full access privileges	Off
Siri Shortcut Visible	Off
Include In Menu	Yes
Layouts that use this script	
Scripts that use this script	
Script Definition
Script Steps	
Sort Records [ Keep records in sorted order; Specified Sort Order: BUDGET_AllocationVersions::SORT_ORDER; descending ] [ Restore; No dialog ]
Fields used in this script	
BUDGET_AllocationVersions::SORT_ORDER
Scripts used in this script	
Layouts used in this script	
Tables used in this script	
BUDGET_Versions
Table occurrences used by this script	
BUDGET_AllocationVersions
Custom Functions used by this script	
Custom menu set used by this script	

Custom Functions

Function Name	Parameters	Availability	Definition	In Field Definitions	In Scripts
leadingZeros	value;numDigitsTotal	All accounts	Right ( "000000000" & value ; numDigitsTotal )	
Budget_FamilyDefintions::calc_DigitsAsText
Budget_ContextDefinitions::calc_DigitsAsText
Budget_ContextSuffixDefinitions::calc_DigitsAsText
JSON		All accounts		
PNum	key;value	All accounts	JSONSetElement ( "{}" ; [ "key" ; key ; JSONString ] ; [ "type" ; "number" ; JSONString ] ; [ "value" ; value ; JSONNumber ] )	
Create_New_URF_Import
IMPORT_rows_to_URF0985
PBool	key;value	All accounts	JSONSetElement ( "{}" ; [ "key" ; key ; JSONString ] ; [ "type" ; "boolean" ; JSONString ] ; [ "value" ; GetAsNumber ( value ) ≠ 0 ; JSONBoolean ] )	
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_URF_Preflight_Profile
IMPORT_rows_to_URF0985
PJSON	key;jsonValue	All accounts	JSONSetElement ( "{}" ; [ "key" ; key ; JSONString ] ; [ "type" ; "json" ; JSONString ] ; [ "value" ; jsonValue ; JSONRaw ] )	
Param	elementList	All accounts	Let ( [ _count = ValueCount ( elementList ) ] ; While ( [ _i = 1 ; _json = "{}" ; _row = "" ; _key = "" ; _type = "" ] ; _i ≤ _count ; [ _row = GetValue ( elementList ; _i ) ; _key = JSONGetElement ( _row ; "key" ) ; _type = JSONGetElement ( _row ; "type" ) ; _json = Case ( IsEmpty ( _row ) or IsEmpty ( _key ) ; _json ; _type = "text" ; JSONSetElement ( _json ; _key ; JSONGetElement ( _row ; "value" ) ; JSONString ) ; _type = "number" ; JSONSetElement ( _json ; _key ; JSONGetElement ( _row ; "value" ) ; JSONNumber ) ; _type = "boolean" ; JSONSetElement ( _json ; _key ; JSONGetElement ( _row ; "value" ) ; JSONBoolean ) ; _type = "json" ; JSONSetElement ( _json ; _key ; JSONGetElement ( _row ; "value" ) ; JSONRaw ) ; _json ) ; _i = _i + 1 ] ; _json ) )	
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_URF_Preflight_Profile
IMPORT_rows_to_URF0985
PText	key;value	All accounts	JSONSetElement ( "{}" ; [ "key" ; key ; JSONString ] ; [ "type" ; "text" ; JSONString ] ; [ "value" ; value ; JSONString ] )	
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_URF_Preflight_Profile
IMPORT_rows_to_URF0985
ParamHas	json;key	All accounts	Let ( [ _keys = JSONListKeys ( JSON ; "" ) ] ; PatternCount ( ¶ & _keys & ¶ ; ¶ & key & ¶ ) > 0 )	
ParamGetText	json;key;default	All accounts	Case ( ParamHas ( JSON ; key ) ; JSONGetElement ( JSON ; key ) ; default )	
Create_New_URF_Import
IMPORT_URF_Create_Session
IMPORT_URF_Preflight_Profile
ParamGetNumber	json;key;default	All accounts	Case ( ParamHas ( JSON ; key ) ; GetAsNumber ( JSONGetElement ( JSON ; key ) ) ; default )	
ParamGetBoolean	json;key;default	All accounts	Case ( ParamHas ( JSON ; key ) ; GetAsNumber ( JSONGetElement ( JSON ; key ) ) ≠ 0 ; GetAsNumber ( default ) ≠ 0 )	
Create_New_URF_Import
IMPORT_URF_Preflight_Profile
--		All accounts		
AddMonths	myDate;numberOfMonths	All accounts	/* Will add numberOfMonths to myDate; result is a date Why do you need this? Because adding a month to the 31st January is NOT the 3rd March as Filemaker would have it if you just add 1 to the month of Date(1;31;2019), in a payroll situation you' would expect to get your money on the last day of February instead, i.e. 28th or 29th February. This function takes care of it. */ Let( [ vMonth = Month( myDate); vDay = Day( myDate); vYear = Year( myDate); vInitialResult=Date(vMonth+numberOfMonths;vDay;vYear); vNewDay=Day(vInitialResult) ]; Case(vNewDay ≠vDay; Date(Month(vInitialResult);1;Year(vInitialResult))-1; vInitialResult) ) /* Our result is simply a case of seeing if the result day is the same as before, if not then filemaker has wrapped it around to the next month, we only need set the day back to 1 and deduct a day to get the last day of the previous month. It means the adding 14 months to Dec 30th 2018 results in 29th Feb 2020 */	
CSSPixelWidth		All accounts	Get ( WindowContentWidth )	
exists	field	All accounts	not IsEmpty ( field )	
MESSAGES		All accounts		
--		All accounts		
MSG_ValueListErrors	message	All accounts	/* custom function: MSG_StatusCategoryDuplicate */ Case ( PatternCount ( message ; "validate_enforce_1_to_1" ) ; "This value list enforces one value per Status Category. " & "That category is already used — pick a different category or leave it blank." ; "Validation error" )	
commitRecord
MSG_PreflightErrors	message	All accounts	Case ( PatternCount ( message ; "fileTypeError" ) ; "Unexpected file type (exptected .xlsx/.xls)." ; PatternCount ( message ; "sourceFileLocationError" ) ; "No source file selected for this run." ; "Preflight error." )	
IMPORT_URF_Preflight_Profile
Themes

Theme ID	Display Name	Internal Name	Group	Locale	Version
01	Apex Blue	com.filemaker.theme.apex_blue	Apex Blue	en	1
02	MAW moose	com.filemaker.theme.custom.D17CB684_FF73_436F_9D33_CC4821C2BDAE	Custom	en	6
03	MAW_Dark	com.filemaker.theme.custom.9BBC5315_E42B_4E45_A64C_4678D55D1654	Custom	en	6
04	MAW_McL	com.filemaker.theme.custom.D6C5AF03_B1E6_4B41_A655_22065CCA689F	Custom	en	6