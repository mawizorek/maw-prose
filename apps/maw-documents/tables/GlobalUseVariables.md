# GLOBAL_USE_VARIABLES

!!! abstract "Grain"
    one record. The singleton app control center.

**ALL_CAPS is deliberate and exempted from PascalCase.** The screaming caps are a signal:
this is not a data table. Readable at a glance in Manage Database and in every TO name.

Drives hub navigation state, current lens, active filters, selected mode, import queue state,
and UI toggles.

## Storage base path

`g_FILE_REPO` holds the single base path to the flat file folder (e.g.
`/Users/michael/MAW_Files/`). Every file reference in the app resolves as
`g_FILE_REPO & auto_fileName`. Already exists in the built `.fmp12`.

**Portability:** copy the folder + the `.fmp12` to any machine. Update `g_FILE_REPO`
to the new location. Every file resolves. This is the NAS migration path too: change
the base path from local to network, nothing else changes.

## Matrix slot globals

`gSlot1` through `gSlot5` are the fixed-arity column selectors for the paperwork
matrix layout. Each holds a FK to whatever classification axis is active (Context,
Subject, Production, etc.). Buttons reassign which entity occupies a slot. The matrix
never grows beyond 5 columns: it is a parameterized window, not a pivot table.

This is Michael's own design pattern (corrected Oct 13, 2026): "a custom layout with
5-6 header SLOTS held as globals, and a saved view filtered on those globals."

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| fk_gCurrentRecord | Text (global) | current record pointer. Already in built file |
| g_FILE_REPO | Text (global) | base path to flat file folder. Already in built file |
| g_Mode | Text (global) | current hub mode |
| g_Search | Text (global) | search input |
| g_CurrentContext | Text (global) | active context filter |
| g_CurrentDocumentType | Text (global) | active type filter |
| g_CurrentSubject | Text (global) | active subject filter |
| g_ShowAnnotated | Number (global) | variant filter toggle |
| g_ShowClean | Number (global) | variant filter toggle |
| g_CurrentSavedLens | Text (global) | active lens |
| gSlot1 | Text (global) | matrix column 1 selector |
| gSlot2 | Text (global) | matrix column 2 selector |
| gSlot3 | Text (global) | matrix column 3 selector |
| gSlot4 | Text (global) | matrix column 4 selector |
| gSlot5 | Text (global) | matrix column 5 selector |
| audit fields | | per data-standards.md |
