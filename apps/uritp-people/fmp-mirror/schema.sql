-- ============================================================
-- URITP People.fmp12 · sql.js mirror schema
-- Source: DDR-XML export 10/23/2026 · FM 19.6.3
-- 22 tables · 28 relationships · 32 TOs
--
-- Convention: _std audit_ fields (PrimaryKey, CreatedBy,
-- CreationTimestamp, ModifiedBy, ModificationTimestamp)
-- appear on every table. PrimaryKey is TEXT (UUID).
-- ============================================================

PRAGMA foreign_keys = ON;

-- ────────────────────────────────────────────────
-- GLOBAL_USE (app globals, single-record table)
-- ────────────────────────────────────────────────
CREATE TABLE GLOBAL_USE (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    gCur_PERSON         TEXT,
    UNIQUE_CONSTRAINT   INTEGER DEFAULT 1
);

-- ────────────────────────────────────────────────
-- Target_Tables (self-refreshing table registry)
-- ────────────────────────────────────────────────
CREATE TABLE Target_Tables (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fm_BaseTableID      TEXT,
    fm_BaseTableName    TEXT,
    isPresent           INTEGER DEFAULT 1,
    LastSeenAt          TEXT
);

-- ────────────────────────────────────────────────
-- PEOPLE (core person record)
-- ────────────────────────────────────────────────
CREATE TABLE PEOPLE (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    Name_First          TEXT,
    Name_Last           TEXT,
    Name_Preferred      TEXT,
    Name_Alternate      TEXT,
    auto_Name_LastFirst TEXT,
    stored_NameDisplayInPlaybills TEXT,
    auto_PrimaryEmail   TEXT,
    auto_Name_FirstDisplay TEXT,
    sort_Name           TEXT,
    status_Person       TEXT,
    Pronouns            TEXT,
    auto_Name_FirstLast TEXT
);

-- ────────────────────────────────────────────────
-- people_STUDENTS (1:1 extension of PEOPLE)
-- ────────────────────────────────────────────────
CREATE TABLE people_STUDENTS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Person           TEXT REFERENCES PEOPLE(PrimaryKey),
    ExpectedGraduation  TEXT,
    StudentID           TEXT,
    value_AcademicLevel TEXT
);

-- ────────────────────────────────────────────────
-- people_ADULTS (1:1 extension of PEOPLE)
-- ────────────────────────────────────────────────
CREATE TABLE people_ADULTS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Person           TEXT REFERENCES PEOPLE(PrimaryKey)
);

-- ────────────────────────────────────────────────
-- VENUES
-- ────────────────────────────────────────────────
CREATE TABLE VENUES (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    Name                TEXT
);

-- ────────────────────────────────────────────────
-- ORGANIZATIONS
-- ────────────────────────────────────────────────
CREATE TABLE ORGANIZATIONS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    Name                TEXT
);

-- ────────────────────────────────────────────────
-- CONTACTS (supertype hub: person / venue / org)
-- ────────────────────────────────────────────────
CREATE TABLE CONTACTS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Owner            TEXT
);

-- ────────────────────────────────────────────────
-- contact_PHONE_NUMBERS
-- ────────────────────────────────────────────────
CREATE TABLE contact_PHONE_NUMBERS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Contact          TEXT REFERENCES CONTACTS(PrimaryKey),
    value_ContactLabel  TEXT,
    PhoneNumber         TEXT,
    sort_Index          INTEGER
);

-- ────────────────────────────────────────────────
-- contact_EMAILS
-- ────────────────────────────────────────────────
CREATE TABLE contact_EMAILS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Contact          TEXT REFERENCES CONTACTS(PrimaryKey),
    EmailAddress        TEXT,
    value_ContactLabel  TEXT,
    sort_Index          INTEGER
);

-- ────────────────────────────────────────────────
-- contact_ADDRESS
-- ────────────────────────────────────────────────
CREATE TABLE contact_ADDRESS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Contact          TEXT REFERENCES CONTACTS(PrimaryKey),
    value_ContactLabel  TEXT,
    Address             TEXT,
    sort_Index          INTEGER
);

-- ────────────────────────────────────────────────
-- value_LISTS (global key table)
-- ────────────────────────────────────────────────
CREATE TABLE value_LISTS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    gV_ContactLabels    TEXT,
    gV_GraduationYearLabels TEXT,
    gS_Person           TEXT,
    gV_AcademicLevel    TEXT,
    gV_ClassStanding    TEXT
);

-- ────────────────────────────────────────────────
-- VALUES (value list items)
-- ────────────────────────────────────────────────
CREATE TABLE [VALUES] (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_List             TEXT,  -- FM: matched via globals, not PK
    sort_Index          INTEGER,
    bool_isStatusList   INTEGER,
    Name                TEXT
);

-- ────────────────────────────────────────────────
-- SYNC LAYER
-- ────────────────────────────────────────────────

CREATE TABLE sync_SOURCES (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    Name                TEXT,
    fk_Container        TEXT,
    xt_ViewPath         TEXT
);

CREATE TABLE sync_SESSIONS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Source           TEXT REFERENCES sync_SOURCES(PrimaryKey)
);

CREATE TABLE sync_EVENTS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Session          TEXT REFERENCES sync_SESSIONS(PrimaryKey),
    fk_xtRecord         TEXT,
    Action              TEXT,
    HttpStatus          INTEGER,
    Request             TEXT,
    Response            TEXT
);

CREATE TABLE sync_RECONCILE (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    FM_Value            TEXT,
    xt_Value            TEXT,
    Decision            TEXT,
    fk_Session          TEXT REFERENCES sync_SESSIONS(PrimaryKey),
    fk_xtRecord         TEXT,
    fk_xtField          TEXT
);

-- ────────────────────────────────────────────────
-- EXTERNAL SYSTEMS LAYER
-- ────────────────────────────────────────────────

CREATE TABLE xt_SYSTEMS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    Name                TEXT,
    BaseURL             TEXT,
    Token               TEXT
);

CREATE TABLE xt_CONTAINERS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_System           TEXT REFERENCES xt_SYSTEMS(PrimaryKey),
    xt_ID               TEXT,
    Name                TEXT,
    fk_TargetTable      TEXT REFERENCES Target_Tables(PrimaryKey),
    isActive            INTEGER DEFAULT 1
);

CREATE TABLE xt_RECORDS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Container        TEXT REFERENCES xt_CONTAINERS(PrimaryKey),
    xt_ID               TEXT,
    xt_Label            TEXT,
    xt_Version          TEXT
);

CREATE TABLE xt_FIELDS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_Container        TEXT REFERENCES xt_CONTAINERS(PrimaryKey),
    mapKey              TEXT,
    xt_FieldID          TEXT,
    xt_FieldName        TEXT,
    xt_FieldType        TEXT
);

CREATE TABLE XTERNAL_JOINS (
    PrimaryKey          TEXT PRIMARY KEY,
    CreatedBy           TEXT,
    CreationTimestamp    TEXT,
    ModifiedBy          TEXT,
    ModificationTimestamp TEXT,
    fk_SourceRecord     TEXT,
    fk_xtRecord         TEXT REFERENCES xt_RECORDS(PrimaryKey)
);

-- ────────────────────────────────────────────────
-- VIEWS (FM ExecuteSQL calcs as SQL views)
-- ────────────────────────────────────────────────

CREATE VIEW v_sync_SESSIONS AS
SELECT
    s.*,
    COUNT(e.PrimaryKey) AS calc_EventCount,
    MAX(e.CreationTimestamp) AS calc_EndedAt,
    SUM(CASE WHEN e.HttpStatus >= 300 THEN 1 ELSE 0 END) AS calc_ErrorCount
FROM sync_SESSIONS s
LEFT JOIN sync_EVENTS e ON e.fk_Session = s.PrimaryKey
GROUP BY s.PrimaryKey;

CREATE VIEW v_PEOPLE_display AS
SELECT
    p.*,
    COALESCE(p.Name_Preferred, p.Name_First) AS calc_FirstDisplay,
    p.Name_Last || ', ' || COALESCE(p.Name_Preferred, p.Name_First) AS calc_LastFirst,
    COALESCE(p.Name_Preferred, p.Name_First) || ' ' || p.Name_Last AS calc_FirstLast,
    LOWER(COALESCE(p.Name_Last, '') || COALESCE(p.Name_First, '')) AS calc_SortName,
    ce.EmailAddress AS calc_PrimaryEmail,
    cp.PhoneNumber AS calc_PrimaryPhone
FROM PEOPLE p
LEFT JOIN CONTACTS c ON c.fk_Owner = p.PrimaryKey
LEFT JOIN contact_EMAILS ce ON ce.fk_Contact = c.PrimaryKey AND ce.sort_Index = 1
LEFT JOIN contact_PHONE_NUMBERS cp ON cp.fk_Contact = c.PrimaryKey AND cp.sort_Index = 1;

-- ────────────────────────────────────────────────
-- INDEXES
-- ────────────────────────────────────────────────

CREATE INDEX idx_contacts_owner ON CONTACTS(fk_Owner);
CREATE INDEX idx_emails_contact ON contact_EMAILS(fk_Contact);
CREATE INDEX idx_phones_contact ON contact_PHONE_NUMBERS(fk_Contact);
CREATE INDEX idx_address_contact ON contact_ADDRESS(fk_Contact);
CREATE INDEX idx_students_person ON people_STUDENTS(fk_Person);
CREATE INDEX idx_adults_person ON people_ADULTS(fk_Person);
CREATE INDEX idx_values_list ON [VALUES](fk_List);
CREATE INDEX idx_xt_records_container ON xt_RECORDS(fk_Container);
CREATE INDEX idx_xt_fields_container ON xt_FIELDS(fk_Container);
CREATE INDEX idx_xt_containers_system ON xt_CONTAINERS(fk_System);
CREATE INDEX idx_sync_events_session ON sync_EVENTS(fk_Session);
CREATE INDEX idx_sync_sessions_source ON sync_SESSIONS(fk_Source);
CREATE INDEX idx_xternal_joins_source ON XTERNAL_JOINS(fk_SourceRecord);
CREATE INDEX idx_xternal_joins_xt ON XTERNAL_JOINS(fk_xtRecord);
