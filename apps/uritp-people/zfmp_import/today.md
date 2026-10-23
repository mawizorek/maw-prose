Tables

Table Name	
Statistics
Occurrences in Relationship Graph
GLOBAL_USE	
2 fields defined, 1 record
GLOBAL_USE
Target_Tables	
9 fields defined, 0 record
Target_Tables, view_Target_Tables
PEOPLE	
17 fields defined, 1 record
PEOPLE
people_STUDENTS	
9 fields defined, 0 record
people_STUDENTS
people_ADULTS	
6 fields defined, 0 record
people_ADULTS
VENUES	
6 fields defined, 0 record
VENUES
ORGANIZATIONS	
6 fields defined, 0 record
ORGANIZATIONS
CONTACTS	
8 fields defined, 0 record
CONTACTS
contact_PHONE_NUMBERS	
9 fields defined, 0 record
contact_PHONE_NUMBERS
contact_EMAILS	
9 fields defined, 0 record
contact_EMAILS
contact_ADDRESS	
9 fields defined, 0 record
contact_ADDRESS
sync_SESSIONS	
9 fields defined, 0 record
sync_SESSIONS_fRECONCILE, sync_SESSIONS
sync_EVENTS	
11 fields defined, 0 record
sync_EVENTS
sync_SOURCES	
8 fields defined, 1 record
sync_SOURCES_fxtContainers, sync_SOURCES
sync_RECONCILE	
11 fields defined, 0 record
sync_RECONCILE
value_LISTS	
10 fields defined, 0 record
value_LISTS
VALUES	
9 fields defined, 0 record
VALUES, value_ContactLabel, value_GraduationYearLabel, value_ClassStanding, value_AcademicLevel, status_Person
XTERNAL_JOINS	
7 fields defined, 0 record
XTERNAL_JOINS_People, view_XTERNAL_JOINS
xt_SYSTEMS	
8 fields defined, 2 records
xt_SYSTEMS
xt_RECORDS	
9 fields defined, 0 record
xt_RECORDS
xt_CONTAINERS	
10 fields defined, 0 record
xt_CONTAINERS
xt_FIELDS	
10 fields defined, 0 record
xt_FIELDS, xt_FIELDS_fRECONCILE
Fields

Table Name: GLOBAL_USE - 2 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
gCur_PERSON	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
GLOBAL_USE=PEOPLE
UNIQUE	Normal, Number	Auto-Enter:
Constant data: 1
Allow editing
Validation:
Always Validate
Unique
Strict validation
Range: 1 - 1
Error message: "There may only be (1) record in this table."
Storage:
Repetitions: 1
Indexing: All
Index Language: English
there may only be (1) GLOBAL record	

Table Name: Target_Tables - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: view_Target_Tables
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
Target_Tables=xt_CONTAINERS
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
fm_BaseTableID	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
FileMaker's internal table id. This is the match key, because it doesn't change when you rename a table	
fm_BaseTableName	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
filled in by the refresh, never typed by hand	
isPresent	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
set to 0 if a table disappears. The row is kept, since cu_LISTS might still point at it	
LastSeenAt	Normal, Timestamp	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: PEOPLE - 17 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: PEOPLE
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
CONTACTS=PEOPLE
people_ADULTS=PEOPLE
people_STUDENTS=PEOPLE
GLOBAL_USE=PEOPLE
XTERNAL_JOINS_People=PEOPLE
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
Name_First	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Name_Last	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Name_Preferred	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Name_Alternate	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
auto_Name_LastFirst	Normal, Text	Auto-Enter:
Allow editing
Context table: PEOPLE
Calculation: Let ( [ var1 = 1 ; var2 = 2 ; dFirst = PEOPLE::auto_Name_FirstDisplay ; dLast = PEOPLE::Name_Last ; Name = dLast & ", " & dFirst ] ; Name )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
stored_NameDisplayInPlaybills	Normal, Text	Auto-Enter:
Allow editing
Do not replace existing value for field (if any)
Context table: PEOPLE
Calculation: PEOPLE::Name_First & " " & PEOPLE::Name_Last
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
auto_PrimaryEmail	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
auto_Name_FirstDisplay	Normal, Text	Auto-Enter:
Allow editing
Context table: PEOPLE
Calculation: Case ( IsEmpty ( PEOPLE::Name_Preferred ) and IsEmpty ( PEOPLE::Name_Alternate ) ; PEOPLE::Name_First ; PEOPLE::Name_First & " '" & PEOPLE::Name_Preferred & "'" )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sort_Name	Normal, Text	Auto-Enter:
Allow editing
Context table: PEOPLE
Calculation: PEOPLE::Name_Last
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
status_Person	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Pronouns	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
auto_Name_FirstLast	Normal, Text	Auto-Enter:
Allow editing
Context table: PEOPLE
Calculation: Let ( [ var1 = 1 ; var2 = 2 ; dFirst = PEOPLE::auto_Name_FirstDisplay ; dLast = PEOPLE::Name_Last ; Name = dFirst & " " & dLast ] ; Name )
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: people_STUDENTS - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: people_STUDENTS
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
fk_Person	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
people_STUDENTS=PEOPLE
ExpectedGraduation	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
StudentID	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
value_AcademicLevel	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: people_ADULTS - 6 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: people_ADULTS
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
fk_Person	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
people_ADULTS=PEOPLE

Table Name: VENUES - 6 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: VENUES
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
CONTACTS=VENUES
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

Table Name: ORGANIZATIONS - 6 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: ORGANIZATIONS
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
ORGANIZATIONS=CONTACTS
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

Table Name: CONTACTS - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: CONTACTS
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
contact_PHONE_NUMBERS=CONTACTS
contact_EMAILS=CONTACTS
contact_ADDRESS=CONTACTS
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
fk_Owner	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Unique
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
CONTACTS=PEOPLE
CONTACTS=VENUES
ORGANIZATIONS=CONTACTS
stored_PrimaryPhone	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
stored_PrimaryEmail	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: contact_PHONE_NUMBERS - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: contact_PHONE_NUMBERS
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
fk_Contact	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
contact_PHONE_NUMBERS=CONTACTS
value_ContactLabel	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
PhoneNumber	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sort_Index	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: contact_EMAILS - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: contact_EMAILS
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
fk_Contact	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
contact_EMAILS=CONTACTS
EmailAddress	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
value_ContactLabel	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sort_Index	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: contact_ADDRESS - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: contact_ADDRESS
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
fk_Contact	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
contact_ADDRESS=CONTACTS
value_ContactLabel	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Address	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sort_Index	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: sync_SESSIONS - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: sync_SESSIONS
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
sync_EVENTS=sync_SESSIONS
sync_RECONCILE=sync_SESSIONS_fRECONCILE
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
fk_Source	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sync_SESSIONS=sync_SOURCES
calc_EventCount	Calculated, Number	Calculation:
Context table: sync_SESSIONS
Count ( sync_EVENTS::PrimaryKey )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
calc_EndedAt	Calculated, Timestamp	Calculation:
Context table: sync_SESSIONS
Max ( sync_EVENTS::CreationTimestamp )
Storage:
Repetitions: 1
Do not store calculation results
Index Language: English
calc_ErrorCount	Calculated, Number	Calculation:
Context table: sync_SESSIONS
ExecuteSQL ( "SELECT COUNT(*) FROM sync_EVENTS WHERE fk_Session = ? AND HttpStatus >= 300" ; "" ; "" ; sync_SESSIONS::PrimaryKey )
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: sync_EVENTS - 11 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: sync_EVENTS
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
fk_Session	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sync_EVENTS=sync_SESSIONS
fk_xtRecord	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sync_EVENTS=xt_RECORDS
Action	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Value list: dropdown_syncType
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
PULL | PUSH | ADOPT	
HttpStatus	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
code ClickUp sent back (200 = ok)	
Request	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Response	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
whatever ClickUp replied	

Table Name: sync_SOURCES - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: sync_SOURCES
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
sync_SESSIONS=sync_SOURCES
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
fk_Container	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sync_SOURCES_fxtContainers=xt_CONTAINERS
xt_ViewPath	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
a ClickUp view id or a GitHub file path	

Table Name: sync_RECONCILE - 11 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: sync_RECONCILE
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
FM_Value	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
xt_Value	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Decision	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
fk_Session	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sync_RECONCILE=sync_SESSIONS_fRECONCILE
fk_xtRecord	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
sync_RECONCILE=xt_RECORDS
fk_xtField	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
xt_FIELDS_fRECONCILE=sync_RECONCILE

Table Name: value_LISTS - 10 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: value_LISTS
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
VALUES=value_LISTS
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
gV_ContactLabels	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
value_ContactLabel=value_LISTS
gV_GraduationYearLabels	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
colloqiual: "First Year | Sophomore | Junior | Senior"	
value_GraduationYearLabel=value_LISTS
gS_Person	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
status_Person=value_LISTS
gV_AcademicLevel	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
value_AcademicLevel=value_LISTS
gV_ClassStanding	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Global
Repetitions: 1
Index Language: English
value_ClassStanding=value_LISTS

Table Name: VALUES - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: status_Person
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
fk_List	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
status_Person=value_LISTS
value_AcademicLevel=value_LISTS
VALUES=value_LISTS
value_ClassStanding=value_LISTS
value_ContactLabel=value_LISTS
value_GraduationYearLabel=value_LISTS
sort_Index	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
bool_isStatusList	Normal, Number	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Name	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English

Table Name: XTERNAL_JOINS - 7 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: view_XTERNAL_JOINS
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
fk_SourceRecord	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
XTERNAL_JOINS_People=PEOPLE
fk_xtRecord	Normal, Text	Auto-Enter:
Allow editing
Validation:
Always Validate
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
XTERNAL_JOINS_People=xt_RECORDS

Table Name: xt_SYSTEMS - 8 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: xt_SYSTEMS
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
xt_SYSTEMS=xt_CONTAINERS
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
Always Validate
Not empty
Unique
Strict validation
Value list: dropdown_External_Systems
Error message: Must be one unqiue record per exteranl system.
Storage:
Repetitions: 1
Indexing: All
Index Language: English
BaseURL	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Token	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: xt_RECORDS - 9 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: xt_RECORDS
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
XTERNAL_JOINS_People=xt_RECORDS
sync_EVENTS=xt_RECORDS
sync_RECONCILE=xt_RECORDS
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
fk_Container	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
xt_CONTAINERS=xt_RECORDS
xt_ID	Normal, Text	Auto-Enter:
Allow editing
Validation:
Always Validate
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
xt_Label	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
xt_Version	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
ClickUp sends its date as a raw number and GitHub sends a version code. Text holds both exactly and avoids timezone conversion	

Table Name: xt_CONTAINERS - 10 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: xt_CONTAINERS
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
xt_FIELDS=xt_CONTAINERS
xt_CONTAINERS=xt_RECORDS
sync_SOURCES_fxtContainers=xt_CONTAINERS
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
fk_System	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
xt_SYSTEMS=xt_CONTAINERS
xt_ID	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Unique
Strict validation
Storage:
Repetitions: 1
Indexing: Minimal
Automatically create indexes as needed
Index Language: English
ListID, repo path	
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
fk_TargetTable	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Not empty
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Target_Tables=xt_CONTAINERS
isActive	Normal, Number	Auto-Enter:
Constant data: 1
Allow editing
Validation:
Only during data entry
Not empty
Range: 0 - 1
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English

Table Name: xt_FIELDS - 10 Fields
Field Name	Type	Options	Comments	On Layouts	In Relationships	In Scripts	In Value Lists
PrimaryKey	Normal, Text	Auto-Enter:
Context table: xt_FIELDS
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
xt_FIELDS_fRECONCILE=sync_RECONCILE
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
fk_Container	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
xt_FIELDS=xt_CONTAINERS
mapKey	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Rebuild the field in ClickUp and you fix one row, not every script	
xt_FieldID	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
xt_FieldName	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
xt_FieldType	Normal, Text	Auto-Enter:
Allow editing
Validation:
Only during data entry
Storage:
Repetitions: 1
Indexing: None
Automatically create indexes as needed
Index Language: English
Base Directories

ID	Path
0	URITP People/
Relationships: Table Occurrences

Table Occurrence	Source Table	Source File	In Relationships	In Scripts	In Field Definitions	In Value Lists	Associated with layouts
contact_EMAILS	contact_EMAILS	URITP People.fmp12	
contact_EMAILS=CONTACTS
contact_PHONE_NUMBERS	contact_PHONE_NUMBERS	URITP People.fmp12	
contact_PHONE_NUMBERS=CONTACTS
contact_ADDRESS	contact_ADDRESS	URITP People.fmp12	
contact_ADDRESS=CONTACTS
sync_SOURCES_fxtContainers	sync_SOURCES	URITP People.fmp12	
sync_SOURCES_fxtContainers=xt_CONTAINERS
Target_Tables	Target_Tables	URITP People.fmp12	
Target_Tables=xt_CONTAINERS
xt_SYSTEMS	xt_SYSTEMS	URITP People.fmp12	
xt_SYSTEMS=xt_CONTAINERS
xt_FIELDS	xt_FIELDS	URITP People.fmp12	
xt_FIELDS=xt_CONTAINERS
xt_CONTAINERS	xt_CONTAINERS	URITP People.fmp12	
xt_FIELDS=xt_CONTAINERS
xt_CONTAINERS=xt_RECORDS
Target_Tables=xt_CONTAINERS
xt_SYSTEMS=xt_CONTAINERS
sync_SOURCES_fxtContainers=xt_CONTAINERS
xt_RECORDS	xt_RECORDS	URITP People.fmp12	
XTERNAL_JOINS_People=xt_RECORDS
sync_EVENTS=xt_RECORDS
xt_CONTAINERS=xt_RECORDS
sync_RECONCILE=xt_RECORDS
XTERNAL_JOINS_People	XTERNAL_JOINS	URITP People.fmp12	
XTERNAL_JOINS_People=xt_RECORDS
XTERNAL_JOINS_People=PEOPLE
sync_SESSIONS_fRECONCILE	sync_SESSIONS	URITP People.fmp12	
sync_RECONCILE=sync_SESSIONS_fRECONCILE
sync_EVENTS	sync_EVENTS	URITP People.fmp12	
sync_EVENTS=sync_SESSIONS
sync_EVENTS=xt_RECORDS
sync_SESSIONS::calc_EventCount
sync_SESSIONS::calc_EndedAt
sync_RECONCILE	sync_RECONCILE	URITP People.fmp12	
sync_RECONCILE=xt_RECORDS
sync_RECONCILE=sync_SESSIONS_fRECONCILE
xt_FIELDS_fRECONCILE=sync_RECONCILE
xt_FIELDS_fRECONCILE	xt_FIELDS	URITP People.fmp12	
xt_FIELDS_fRECONCILE=sync_RECONCILE
sync_SOURCES	sync_SOURCES	URITP People.fmp12	
sync_SESSIONS=sync_SOURCES
sync_SESSIONS	sync_SESSIONS	URITP People.fmp12	
sync_EVENTS=sync_SESSIONS
sync_SESSIONS=sync_SOURCES
sync_SESSIONS::calc_ErrorCount
VALUES	VALUES	URITP People.fmp12	
VALUES=value_LISTS
value_LISTS	value_LISTS	URITP People.fmp12	
status_Person=value_LISTS
value_AcademicLevel=value_LISTS
VALUES=value_LISTS
value_ClassStanding=value_LISTS
value_ContactLabel=value_LISTS
value_GraduationYearLabel=value_LISTS
value_ContactLabel	VALUES	URITP People.fmp12	
value_ContactLabel=value_LISTS
value_GraduationYearLabel	VALUES	URITP People.fmp12	
value_GraduationYearLabel=value_LISTS
value_ClassStanding	VALUES	URITP People.fmp12	
value_ClassStanding=value_LISTS
value_AcademicLevel	VALUES	URITP People.fmp12	
value_AcademicLevel=value_LISTS
status_Person	VALUES	URITP People.fmp12	
status_Person=value_LISTS
view_XTERNAL_JOINS	XTERNAL_JOINS	URITP People.fmp12	
view_Target_Tables	Target_Tables	URITP People.fmp12	
people_ADULTS	people_ADULTS	URITP People.fmp12	
people_ADULTS=PEOPLE
VENUES	VENUES	URITP People.fmp12	
CONTACTS=VENUES
ORGANIZATIONS	ORGANIZATIONS	URITP People.fmp12	
ORGANIZATIONS=CONTACTS
CONTACTS	CONTACTS	URITP People.fmp12	
contact_PHONE_NUMBERS=CONTACTS
contact_EMAILS=CONTACTS
CONTACTS=PEOPLE
contact_ADDRESS=CONTACTS
CONTACTS=VENUES
ORGANIZATIONS=CONTACTS
people_STUDENTS	people_STUDENTS	URITP People.fmp12	
people_STUDENTS=PEOPLE
PEOPLE	PEOPLE	URITP People.fmp12	
CONTACTS=PEOPLE
people_ADULTS=PEOPLE
people_STUDENTS=PEOPLE
GLOBAL_USE=PEOPLE
XTERNAL_JOINS_People=PEOPLE
PEOPLE::auto_Name_LastFirst
PEOPLE::stored_NameDisplayInPlaybills
PEOPLE::auto_Name_FirstDisplay
PEOPLE::sort_Name
PEOPLE::auto_Name_FirstLast
GLOBAL_USE	GLOBAL_USE	URITP People.fmp12	
GLOBAL_USE=PEOPLE
Relationships: Details

Relationship: contact_PHONE_NUMBERS=CONTACTS

Table Occurrence	contact_PHONE_NUMBERS		CONTACTS
Field	fk_Contact	=	PrimaryKey
Source Table	contact_PHONE_NUMBERS		CONTACTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
On

Field: sort_Index

Ascending order
Reorder based on summary field: Off
Override field's language for sort: Off
Off
Relationship: contact_EMAILS=CONTACTS

Table Occurrence	contact_EMAILS		CONTACTS
Field	fk_Contact	=	PrimaryKey
Source Table	contact_EMAILS		CONTACTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
On

Field: sort_Index

Ascending order
Reorder based on summary field: Off
Override field's language for sort: Off
Off
Relationship: CONTACTS=PEOPLE

Table Occurrence	CONTACTS		PEOPLE
Field	fk_Owner	=	PrimaryKey
Source Table	CONTACTS		PEOPLE
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: people_ADULTS=PEOPLE

Table Occurrence	people_ADULTS		PEOPLE
Field	fk_Person	=	PrimaryKey
Source Table	people_ADULTS		PEOPLE
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: people_STUDENTS=PEOPLE

Table Occurrence	people_STUDENTS		PEOPLE
Field	fk_Person	=	PrimaryKey
Source Table	people_STUDENTS		PEOPLE
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: GLOBAL_USE=PEOPLE

Table Occurrence	GLOBAL_USE		PEOPLE
Field	gCur_PERSON	=	PrimaryKey
Source Table	GLOBAL_USE		PEOPLE
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: status_Person=value_LISTS

Table Occurrence	status_Person		value_LISTS
Field	fk_List	=	gS_Person
Source Table	VALUES		value_LISTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: value_AcademicLevel=value_LISTS

Table Occurrence	value_AcademicLevel		value_LISTS
Field	fk_List	=	gV_AcademicLevel
Source Table	VALUES		value_LISTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: VALUES=value_LISTS

Table Occurrence	VALUES		value_LISTS
Field	fk_List	=	PrimaryKey
Source Table	VALUES		value_LISTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: value_ClassStanding=value_LISTS

Table Occurrence	value_ClassStanding		value_LISTS
Field	fk_List	=	gV_ClassStanding
Source Table	VALUES		value_LISTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: value_ContactLabel=value_LISTS

Table Occurrence	value_ContactLabel		value_LISTS
Field	fk_List	=	gV_ContactLabels
Source Table	VALUES		value_LISTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: value_GraduationYearLabel=value_LISTS

Table Occurrence	value_GraduationYearLabel		value_LISTS
Field	fk_List	=	gV_GraduationYearLabels
Source Table	VALUES		value_LISTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: XTERNAL_JOINS_People=xt_RECORDS

Table Occurrence	XTERNAL_JOINS_People		xt_RECORDS
Field	fk_xtRecord	=	PrimaryKey
Source Table	XTERNAL_JOINS		xt_RECORDS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: XTERNAL_JOINS_People=PEOPLE

Table Occurrence	XTERNAL_JOINS_People		PEOPLE
Field	fk_SourceRecord	=	PrimaryKey
Source Table	XTERNAL_JOINS		PEOPLE
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: contact_ADDRESS=CONTACTS

Table Occurrence	contact_ADDRESS		CONTACTS
Field	fk_Contact	=	PrimaryKey
Source Table	contact_ADDRESS		CONTACTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
On

Field: sort_Index

Ascending order
Reorder based on summary field: Off
Override field's language for sort: Off
Off
Relationship: CONTACTS=VENUES

Table Occurrence	CONTACTS		VENUES
Field	fk_Owner	=	PrimaryKey
Source Table	CONTACTS		VENUES
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: ORGANIZATIONS=CONTACTS

Table Occurrence	ORGANIZATIONS		CONTACTS
Field	PrimaryKey	=	fk_Owner
Source Table	ORGANIZATIONS		CONTACTS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: xt_FIELDS=xt_CONTAINERS

Table Occurrence	xt_FIELDS		xt_CONTAINERS
Field	fk_Container	=	PrimaryKey
Source Table	xt_FIELDS		xt_CONTAINERS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: sync_EVENTS=sync_SESSIONS

Table Occurrence	sync_EVENTS		sync_SESSIONS
Field	fk_Session	=	PrimaryKey
Source Table	sync_EVENTS		sync_SESSIONS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: sync_EVENTS=xt_RECORDS

Table Occurrence	sync_EVENTS		xt_RECORDS
Field	fk_xtRecord	=	PrimaryKey
Source Table	sync_EVENTS		xt_RECORDS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: sync_SESSIONS=sync_SOURCES

Table Occurrence	sync_SESSIONS		sync_SOURCES
Field	fk_Source	=	PrimaryKey
Source Table	sync_SESSIONS		sync_SOURCES
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: xt_CONTAINERS=xt_RECORDS

Table Occurrence	xt_CONTAINERS		xt_RECORDS
Field	PrimaryKey	=	fk_Container
Source Table	xt_CONTAINERS		xt_RECORDS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: Target_Tables=xt_CONTAINERS

Table Occurrence	Target_Tables		xt_CONTAINERS
Field	PrimaryKey	=	fk_TargetTable
Source Table	Target_Tables		xt_CONTAINERS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: xt_SYSTEMS=xt_CONTAINERS

Table Occurrence	xt_SYSTEMS		xt_CONTAINERS
Field	PrimaryKey	=	fk_System
Source Table	xt_SYSTEMS		xt_CONTAINERS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: sync_SOURCES_fxtContainers=xt_CONTAINERS

Table Occurrence	sync_SOURCES_fxtContainers		xt_CONTAINERS
Field	fk_Container	=	PrimaryKey
Source Table	sync_SOURCES		xt_CONTAINERS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: sync_RECONCILE=xt_RECORDS

Table Occurrence	sync_RECONCILE		xt_RECORDS
Field	fk_xtRecord	=	PrimaryKey
Source Table	sync_RECONCILE		xt_RECORDS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: sync_RECONCILE=sync_SESSIONS_fRECONCILE

Table Occurrence	sync_RECONCILE		sync_SESSIONS_fRECONCILE
Field	fk_Session	=	PrimaryKey
Source Table	sync_RECONCILE		sync_SESSIONS
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off
Relationship: xt_FIELDS_fRECONCILE=sync_RECONCILE

Table Occurrence	xt_FIELDS_fRECONCILE		sync_RECONCILE
Field	PrimaryKey	=	fk_xtField
Source Table	xt_FIELDS		sync_RECONCILE
Source File	URITP People.fmp12		URITP People.fmp12
Allow creation of records via this relationship	Off		Off
Delete related records in this table when a record is deleted in the other table	Off		Off
Sort records	
Off

Off