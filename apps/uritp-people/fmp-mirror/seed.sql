-- ============================================================
-- URITP People · seed.sql
-- Synthetic sample data for layout previews.
-- NO real people. NO real emails. NO real phone numbers.
-- ============================================================

-- Global record
INSERT INTO GLOBAL_USE (PrimaryKey, gCur_PERSON, UNIQUE_CONSTRAINT)
VALUES ('G-0001', NULL, 1);

-- ────────────────────────────────────────────────
-- Value lists
-- ────────────────────────────────────────────────
INSERT INTO value_LISTS (PrimaryKey, gV_ContactLabels, gV_GraduationYearLabels, gS_Person, gV_AcademicLevel, gV_ClassStanding)
VALUES ('VL-0001', 'VL-CL', 'VL-GY', 'VL-SP', 'VL-AL', 'VL-CS');

INSERT INTO [VALUES] (PrimaryKey, fk_List, sort_Index, bool_isStatusList, Name) VALUES
    ('V-CL01', 'VL-CL', 1, 0, 'Primary'),
    ('V-CL02', 'VL-CL', 2, 0, 'Work'),
    ('V-CL03', 'VL-CL', 3, 0, 'Personal'),
    ('V-CL04', 'VL-CL', 4, 0, 'Emergency'),
    ('V-AL01', 'VL-AL', 1, 0, 'Undergraduate'),
    ('V-AL02', 'VL-AL', 2, 0, 'Graduate'),
    ('V-AL03', 'VL-AL', 3, 0, 'Non-Degree'),
    ('V-CS01', 'VL-CS', 1, 0, 'First Year'),
    ('V-CS02', 'VL-CS', 2, 0, 'Sophomore'),
    ('V-CS03', 'VL-CS', 3, 0, 'Junior'),
    ('V-CS04', 'VL-CS', 4, 0, 'Senior'),
    ('V-SP01', 'VL-SP', 1, 1, 'Active'),
    ('V-SP02', 'VL-SP', 2, 1, 'Inactive'),
    ('V-SP03', 'VL-SP', 3, 1, 'Alumni');

-- ────────────────────────────────────────────────
-- People (12 synthetic records: mix of students + adults)
-- ────────────────────────────────────────────────
INSERT INTO PEOPLE (PrimaryKey, Name_First, Name_Last, Name_Preferred, Pronouns, status_Person, auto_Name_LastFirst, auto_Name_FirstDisplay, auto_Name_FirstLast, sort_Name) VALUES
    ('P-0001', 'Jordan',   'Reeves',    NULL,      'they/them', 'Active',   'Reeves, Jordan',    'Jordan',  'Jordan Reeves',    'reevesjordan'),
    ('P-0002', 'Amara',    'Chen',      NULL,      'she/her',   'Active',   'Chen, Amara',       'Amara',   'Amara Chen',       'chenamara'),
    ('P-0003', 'Theodore', 'Banks',     'Teddy',   'he/him',    'Active',   'Banks, Teddy',      'Teddy',   'Teddy Banks',      'bankstheodore'),
    ('P-0004', 'Liliana',  'Marquez',   'Lily',    'she/her',   'Active',   'Marquez, Lily',     'Lily',    'Lily Marquez',     'marquezliliana'),
    ('P-0005', 'Samuel',   'Okafor',    'Sam',     'he/him',    'Active',   'Okafor, Sam',       'Sam',     'Sam Okafor',       'okaforsamuel'),
    ('P-0006', 'Rina',     'Takahashi', NULL,      'she/her',   'Active',   'Takahashi, Rina',   'Rina',    'Rina Takahashi',   'takahashirina'),
    ('P-0007', 'Marcus',   'Webb',      NULL,      'he/him',    'Active',   'Webb, Marcus',      'Marcus',  'Marcus Webb',      'webbmarcus'),
    ('P-0008', 'Priya',    'Desai',     NULL,      'she/her',   'Active',   'Desai, Priya',      'Priya',   'Priya Desai',      'desaipriya'),
    ('P-0009', 'Elena',    'Voronova',  'Lena',    'she/her',   'Inactive', 'Voronova, Lena',    'Lena',    'Lena Voronova',    'voronovaelena'),
    ('P-0010', 'Kwame',    'Asante',    NULL,      'he/him',    'Active',   'Asante, Kwame',     'Kwame',   'Kwame Asante',     'asantekwame'),
    ('P-0011', 'Nadia',    'Petrov',    NULL,      'she/her',   'Alumni',   'Petrov, Nadia',     'Nadia',   'Nadia Petrov',     'petrovnadia'),
    ('P-0012', 'Rowan',    'Kim',       NULL,      'they/them', 'Active',   'Kim, Rowan',        'Rowan',   'Rowan Kim',        'kimrowan');

-- Students (6 of the 12)
INSERT INTO people_STUDENTS (PrimaryKey, fk_Person, ExpectedGraduation, StudentID, value_AcademicLevel) VALUES
    ('PS-0001', 'P-0001', '2028', 'STU-10291', 'Undergraduate'),
    ('PS-0002', 'P-0003', '2027', 'STU-10455', 'Undergraduate'),
    ('PS-0003', 'P-0004', '2029', 'STU-10812', 'Undergraduate'),
    ('PS-0004', 'P-0006', '2027', 'STU-10133', 'Undergraduate'),
    ('PS-0005', 'P-0010', '2028', 'STU-10677', 'Graduate'),
    ('PS-0006', 'P-0012', '2029', 'STU-10934', 'Undergraduate');

-- Adults (6 of the 12)
INSERT INTO people_ADULTS (PrimaryKey, fk_Person) VALUES
    ('PA-0001', 'P-0002'),
    ('PA-0002', 'P-0005'),
    ('PA-0003', 'P-0007'),
    ('PA-0004', 'P-0008'),
    ('PA-0005', 'P-0009'),
    ('PA-0006', 'P-0011');

-- ────────────────────────────────────────────────
-- Contacts + emails + phones
-- ────────────────────────────────────────────────
INSERT INTO CONTACTS (PrimaryKey, fk_Owner) VALUES
    ('C-0001', 'P-0001'), ('C-0002', 'P-0002'), ('C-0003', 'P-0003'),
    ('C-0004', 'P-0004'), ('C-0005', 'P-0005'), ('C-0006', 'P-0006'),
    ('C-0007', 'P-0007'), ('C-0008', 'P-0008'), ('C-0009', 'P-0009'),
    ('C-0010', 'P-0010'), ('C-0011', 'P-0011'), ('C-0012', 'P-0012');

INSERT INTO contact_EMAILS (PrimaryKey, fk_Contact, EmailAddress, value_ContactLabel, sort_Index) VALUES
    ('CE-0001', 'C-0001', 'jreeves@example.edu',     'Primary', 1),
    ('CE-0002', 'C-0001', 'jordan.reeves@mail.com',  'Personal', 2),
    ('CE-0003', 'C-0002', 'achen@example.edu',       'Primary', 1),
    ('CE-0004', 'C-0003', 'tbanks@example.edu',      'Primary', 1),
    ('CE-0005', 'C-0004', 'lmarquez@example.edu',    'Primary', 1),
    ('CE-0006', 'C-0005', 'sokafor@example.edu',     'Primary', 1),
    ('CE-0007', 'C-0005', 'sam.okafor@work.org',     'Work', 2),
    ('CE-0008', 'C-0006', 'rtakahashi@example.edu',  'Primary', 1),
    ('CE-0009', 'C-0007', 'mwebb@example.edu',       'Primary', 1),
    ('CE-0010', 'C-0008', 'pdesai@example.edu',      'Primary', 1),
    ('CE-0011', 'C-0009', 'evoronova@example.edu',   'Primary', 1),
    ('CE-0012', 'C-0010', 'kasante@example.edu',     'Primary', 1),
    ('CE-0013', 'C-0011', 'npetrov@alumni.example.edu', 'Primary', 1),
    ('CE-0014', 'C-0012', 'rkim@example.edu',        'Primary', 1);

INSERT INTO contact_PHONE_NUMBERS (PrimaryKey, fk_Contact, PhoneNumber, value_ContactLabel, sort_Index) VALUES
    ('CP-0001', 'C-0001', '+15855550101', 'Primary', 1),
    ('CP-0002', 'C-0002', '+15855550102', 'Primary', 1),
    ('CP-0003', 'C-0003', '+15855550103', 'Primary', 1),
    ('CP-0004', 'C-0005', '+15855550105', 'Primary', 1),
    ('CP-0005', 'C-0005', '+15855550205', 'Work',    2),
    ('CP-0006', 'C-0007', '+15855550107', 'Primary', 1),
    ('CP-0007', 'C-0008', '+15855550108', 'Primary', 1),
    ('CP-0008', 'C-0010', '+15855550110', 'Primary', 1);

-- Some people deliberately have no phone (P-0004, P-0006, P-0009, P-0011, P-0012)
-- to test empty-state rendering

-- ────────────────────────────────────────────────
-- Venues + Organizations (non-person contactables)
-- ────────────────────────────────────────────────
INSERT INTO VENUES (PrimaryKey, Name) VALUES
    ('VN-0001', 'Todd Theatre'),
    ('VN-0002', 'Spurrier Dance Studio'),
    ('VN-0003', 'Scene Shop');

INSERT INTO ORGANIZATIONS (PrimaryKey, Name) VALUES
    ('ORG-0001', 'University of Rochester'),
    ('ORG-0002', 'Eastman School of Music');

-- Venue + org contacts
INSERT INTO CONTACTS (PrimaryKey, fk_Owner) VALUES
    ('C-V001', 'VN-0001'), ('C-V002', 'VN-0002'),
    ('C-O001', 'ORG-0001');

INSERT INTO contact_EMAILS (PrimaryKey, fk_Contact, EmailAddress, value_ContactLabel, sort_Index) VALUES
    ('CE-V001', 'C-V001', 'toddtheatre@example.edu', 'Primary', 1),
    ('CE-O001', 'C-O001', 'info@example.edu',        'Primary', 1);

INSERT INTO contact_PHONE_NUMBERS (PrimaryKey, fk_Contact, PhoneNumber, value_ContactLabel, sort_Index) VALUES
    ('CP-V001', 'C-V001', '+15855550200', 'Primary', 1);

-- ────────────────────────────────────────────────
-- External systems (config, token masked)
-- ────────────────────────────────────────────────
INSERT INTO xt_SYSTEMS (PrimaryKey, Name, BaseURL, Token) VALUES
    ('XS-0001', 'ClickUp', 'https://api.clickup.com/api/v2', '***');

INSERT INTO xt_CONTAINERS (PrimaryKey, fk_System, xt_ID, Name, fk_TargetTable, isActive) VALUES
    ('XC-0001', 'XS-0001', '901300000001', 'PEOPLE', NULL, 1);

-- Target_Tables registry
INSERT INTO Target_Tables (PrimaryKey, fm_BaseTableID, fm_BaseTableName, isPresent) VALUES
    ('TT-0001', '1065089', 'PEOPLE',              1),
    ('TT-0002', '1065090', 'people_STUDENTS',      1),
    ('TT-0003', '1065091', 'people_ADULTS',        1),
    ('TT-0004', '1065092', 'VENUES',               1),
    ('TT-0005', '1065093', 'ORGANIZATIONS',        1),
    ('TT-0006', '1065094', 'CONTACTS',             1),
    ('TT-0007', '1065095', 'contact_PHONE_NUMBERS', 1),
    ('TT-0008', '1065096', 'contact_EMAILS',        1),
    ('TT-0009', '1065097', 'contact_ADDRESS',       1);

-- Sync source
INSERT INTO sync_SOURCES (PrimaryKey, Name, fk_Container, xt_ViewPath) VALUES
    ('SS-0001', 'PEOPLE list pull', 'XC-0001', NULL);
