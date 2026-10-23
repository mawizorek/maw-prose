---
status: hidden
type: reference
generated: fmp-state
---

# URITP People.fmp12 · STATE
DDR-XML export 10/23/2026 2:53 PM · FM 19.6.3
Source drop: `apps/zFMP-drops/URITP People_fmp12.xml` · recover raw: `git show 2a9e851a2b5f:"apps/zFMP-drops/URITP People_fmp12.xml"`
Companion files: DELTA.md (vs previous drop, read first) · STEPS.md (full script steps, load on demand)

**Absent from this export (read as empty):** ValueListCatalog. Either none exist yet or the category was unticked in the DDR dialog.

## Tables (22) · rec = record count (state, not hashed) · _std audit_ = stock PrimaryKey/Created*/Modified* fields, factored

### GLOBAL_USE · 2 fields · 1 rec
- `gCur_PERSON` Text g
- `UNIQUE` Number ae=ConstantData // there may only be (1) GLOBAL record

### Target_Tables · 9 fields · 0 rec
- _std audit 5/5_
- `fm_BaseTableID` Text // FileMaker's internal table id. This is the match key, because it doesn't change when you rename a t…
- `fm_BaseTableName` Text // filled in by the refresh, never typed by hand
- `isPresent` Number // set to 0 if a table disappears. The row is kept, since cu_LISTS might still point at it
- `LastSeenAt` TimeStamp

### PEOPLE · 17 fields · 1 rec
- _std audit 5/5_
- `Name_First` Text
- `Name_Last` Text
- `Name_Preferred` Text
- `Name_Alternate` Text
- `auto_Name_LastFirst` Text ae=calc
- `stored_NameDisplayInPlaybills` Text ae=calc
- `auto_PrimaryEmail` Text
- `auto_Name_FirstDisplay` Text ae=calc
- `sort_Name` Text ae=calc
- `status_Person` Text
- `Pronouns` Text
- `auto_Name_FirstLast` Text ae=calc

### people_STUDENTS · 9 fields · 0 rec
- _std audit 5/5_
- `fk_Person` Text
- `ExpectedGraduation` Text
- `StudentID` Text
- `value_AcademicLevel` Text

### people_ADULTS · 6 fields · 0 rec
- _std audit 5/5_
- `fk_Person` Text

### VENUES · 6 fields · 0 rec
- _std audit 5/5_
- `Name` Text

### ORGANIZATIONS · 6 fields · 0 rec
- _std audit 5/5_
- `Name` Text

### CONTACTS · 6 fields · 0 rec
- _std audit 5/5_
- `fk_Owner` Text

### contact_PHONE_NUMBERS · 9 fields · 0 rec
- _std audit 5/5_
- `fk_Contact` Text
- `value_ContactLabel` Text
- `PhoneNumber` Text
- `sort_Index` Number

### contact_EMAILS · 9 fields · 0 rec
- _std audit 5/5_
- `fk_Contact` Text
- `EmailAddress` Text
- `value_ContactLabel` Text
- `sort_Index` Number

### contact_ADDRESS · 9 fields · 0 rec
- _std audit 5/5_
- `fk_Contact` Text
- `value_ContactLabel` Text
- `Address` Text
- `sort_Index` Number

### sync_SESSIONS · 9 fields · 0 rec
- _std audit 5/5_
- `fk_Source` Text
- `calc_EventCount` Number/Calculated = `Count ( sync_EVENTS::PrimaryKey )`
- `calc_EndedAt` TimeStamp/Calculated = `Max ( sync_EVENTS::CreationTimestamp )`
- `calc_ErrorCount` Number/Calculated = `ExecuteSQL ( "SELECT COUNT(*) FROM sync_EVENTS WHERE fk_Session = ? AND HttpStatus >= 300" ; "" ; "" ; PrimaryKey )`

### sync_EVENTS · 11 fields · 0 rec
- _std audit 5/5_
- `fk_Session` Text
- `fk_xtRecord` Text
- `Action` Text // PULL | PUSH | ADOPT
- `HttpStatus` Number // code ClickUp sent back (200 = ok)
- `Request` Text
- `Response` Text // whatever ClickUp replied

### sync_SOURCES · 8 fields · 1 rec
- _std audit 5/5_
- `Name` Text
- `fk_Container` Text
- `xt_ViewPath` Text // a ClickUp view id or a GitHub file path

### sync_RECONCILE · 11 fields · 0 rec
- _std audit 5/5_
- `FM_Value` Text
- `xt_Value` Text
- `Decision` Text
- `fk_Session` Text
- `fk_xtRecord` Text
- `fk_xtField` Text

### value_LISTS · 10 fields · 0 rec
- _std audit 5/5_
- `gV_ContactLabels` Text g
- `gV_GraduationYearLabels` Text g // colloqiual: "First Year | Sophomore | Junior | Senior"
- `gS_Person` Text g
- `gV_AcademicLevel` Text g
- `gV_ClassStanding` Text g

### VALUES · 9 fields · 0 rec
- _std audit 5/5_
- `fk_List` Text
- `sort_Index` Number
- `bool_isStatusList` Number
- `Name` Text

### XTERNAL_JOINS · 7 fields · 0 rec
- _std audit 5/5_
- `fk_SourceRecord` Text
- `fk_xtRecord` Text

### xt_SYSTEMS · 8 fields · 2 rec
- _std audit 5/5_
- `Name` Text
- `BaseURL` Text
- `Token` Text

### xt_RECORDS · 9 fields · 0 rec
- _std audit 5/5_
- `fk_Container` Text
- `xt_ID` Text
- `xt_Label` Text
- `xt_Version` Text // ClickUp sends its date as a raw number and GitHub sends a version code. Text holds both exactly and…

### xt_CONTAINERS · 10 fields · 0 rec
- _std audit 5/5_
- `fk_System` Text
- `xt_ID` Text // ListID, repo path
- `Name` Text
- `fk_TargetTable` Text
- `isActive` Number ae=ConstantData

### xt_FIELDS · 10 fields · 0 rec
- _std audit 5/5_
- `fk_Container` Text
- `mapKey` Text // Rebuild the field in ClickUp and you fix one row, not every script
- `xt_FieldID` Text
- `xt_FieldName` Text
- `xt_FieldType` Text

## Table occurrences (32) · name[base table]
sync_SOURCES[sync_SOURCES], contact_EMAILS[contact_EMAILS], contact_PHONE_NUMBERS[contact_PHONE_NUMBERS], contact_ADDRESS[contact_ADDRESS], sync_SOURCES_fxtContainers[sync_SOURCES], Target_Tables[Target_Tables], xt_SYSTEMS[xt_SYSTEMS], xt_FIELDS[xt_FIELDS], xt_CONTAINERS[xt_CONTAINERS], xt_RECORDS[xt_RECORDS], XTERNAL_JOINS_People[XTERNAL_JOINS], sync_SESSIONS_fRECONCILE[sync_SESSIONS], sync_EVENTS[sync_EVENTS], sync_RECONCILE[sync_RECONCILE], xt_FIELDS_fRECONCILE[xt_FIELDS], sync_SESSIONS[sync_SESSIONS], VALUES[VALUES], value_LISTS[value_LISTS], value_ContactLabel[VALUES], value_GraduationYearLabel[VALUES], value_ClassStanding[VALUES], value_AcademicLevel[VALUES], status_Person[VALUES], view_XTERNAL_JOINS[XTERNAL_JOINS], view_Target_Tables[Target_Tables], people_ADULTS[people_ADULTS], VENUES[VENUES], ORGANIZATIONS[ORGANIZATIONS], CONTACTS[CONTACTS], people_STUDENTS[people_STUDENTS], PEOPLE[PEOPLE], GLOBAL_USE[GLOBAL_USE]

## Relationships (28)
- contact_PHONE_NUMBERS ⇄ CONTACTS on fk_Contact Equal PrimaryKey
- contact_EMAILS ⇄ CONTACTS on fk_Contact Equal PrimaryKey
- CONTACTS ⇄ PEOPLE on fk_Owner Equal PrimaryKey
- people_ADULTS ⇄ PEOPLE on fk_Person Equal PrimaryKey
- people_STUDENTS ⇄ PEOPLE on fk_Person Equal PrimaryKey
- GLOBAL_USE ⇄ PEOPLE on gCur_PERSON Equal PrimaryKey
- status_Person ⇄ value_LISTS on fk_List Equal gS_Person
- value_AcademicLevel ⇄ value_LISTS on fk_List Equal gV_AcademicLevel
- VALUES ⇄ value_LISTS on fk_List Equal PrimaryKey
- value_ClassStanding ⇄ value_LISTS on fk_List Equal gV_ClassStanding
- value_ContactLabel ⇄ value_LISTS on fk_List Equal gV_ContactLabels
- value_GraduationYearLabel ⇄ value_LISTS on fk_List Equal gV_GraduationYearLabels
- XTERNAL_JOINS_People ⇄ xt_RECORDS on fk_xtRecord Equal PrimaryKey
- XTERNAL_JOINS_People ⇄ PEOPLE on fk_SourceRecord Equal PrimaryKey
- contact_ADDRESS ⇄ CONTACTS on fk_Contact Equal PrimaryKey
- CONTACTS ⇄ VENUES on fk_Owner Equal PrimaryKey
- ORGANIZATIONS ⇄ CONTACTS on PrimaryKey Equal fk_Owner
- xt_FIELDS ⇄ xt_CONTAINERS on fk_Container Equal PrimaryKey
- sync_EVENTS ⇄ sync_SESSIONS on fk_Session Equal PrimaryKey
- sync_EVENTS ⇄ xt_RECORDS on fk_xtRecord Equal PrimaryKey
- sync_SESSIONS ⇄ sync_SOURCES on fk_Source Equal PrimaryKey
- xt_CONTAINERS ⇄ xt_RECORDS on PrimaryKey Equal fk_Container
- Target_Tables ⇄ xt_CONTAINERS on PrimaryKey Equal fk_TargetTable
- xt_SYSTEMS ⇄ xt_CONTAINERS on PrimaryKey Equal fk_System
- sync_SOURCES_fxtContainers ⇄ xt_CONTAINERS on fk_Container Equal PrimaryKey
- sync_RECONCILE ⇄ xt_RECORDS on fk_xtRecord Equal PrimaryKey
- sync_RECONCILE ⇄ sync_SESSIONS_fRECONCILE on fk_Session Equal PrimaryKey
- xt_FIELDS_fRECONCILE ⇄ sync_RECONCILE on PrimaryKey Equal fk_xtField

## Value lists (0)

## Custom functions (0)

## Scripts (folder tree · step counts exclude comments · `-` separators omitted)
- **API test** · 9 steps

**📁 zOld**

**📁 zOld/10_IMPORT**
- **PEOPLE_Pull** · 92 steps · calls: PEOPLE_Compare
- **RECONCILE_Setll** · 15 steps
- **RECONCILE_SetAll** · 15 steps
- **PEOPLE_Compare** · 81 steps
- **RECONCILE_ShowSession** · 10 steps

## Layouts (folder tree · base TO · fields placed · button → script) · geometry + styling NOT captured
- **GLOBAL_USE** [GLOBAL_USE] · 1 fields
- **ui_view_PEOPLE** [GLOBAL_USE] · 3 fields · 1 portals

**📁 Value Lists**
- **value_LISTS** [value_LISTS] · 5 fields

**📁 Tables**

**📁 Tables/view**
- **view | Target_Tables** [view_Target_Tables] · 0 fields
- **view | XTERNAL_JOINS** [view_XTERNAL_JOINS] · 2 fields
- **table | PEOPLE** [PEOPLE] · 11 fields
- **table | VENUES** [VENUES] · 1 fields
- **table | ORGANIZATIONS** [ORGANIZATIONS] · 1 fields
- **table | people_STUDENTS** [people_STUDENTS] · 4 fields
- **table | people_ADULTS** [people_ADULTS] · 1 fields
- **table | CONTACTS** [CONTACTS] · 1 fields
- **table | contact_PHONE_NUMBERS** [contact_PHONE_NUMBERS] · 4 fields
- **table | contact_EMAILS** [contact_EMAILS] · 4 fields
- **table | contact_ADDRESS** [contact_ADDRESS] · 4 fields
- **table | sync_SOURCES** [sync_SOURCES] · 2 fields
- **table | sync_RECONCILE** [sync_RECONCILE] · 5 fields
- **table | sync_SESSIONS** [sync_SESSIONS] · 0 fields
- **table | sync_EVENTS** [sync_EVENTS] · 6 fields
- **table | xt_SYSTEMS** [xt_SYSTEMS] · 3 fields
- **table | xt_CONTAINERS** [xt_CONTAINERS] · 4 fields
- **table | xt_RECORDS** [xt_RECORDS] · 4 fields
- **table | xt_FIELDS** [xt_FIELDS] · 3 fields

## Counts
Tables 22 · Fields 190 · TOs 32 · Relationships 28 · Value lists 0 · Custom functions 0 · Scripts 6 · Layouts 22

## Not captured (declared)
- Layout object geometry, styles, local CSS, theme bodies
- Full script step text lives in STEPS.md, not here
- Record data, accounts, privileges
