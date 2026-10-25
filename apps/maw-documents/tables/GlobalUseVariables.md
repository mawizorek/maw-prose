# GLOBAL_USE_VARIABLES

!!! abstract "Grain"
    one record. The singleton app control center.

**ALL_CAPS is deliberate and exempted from PascalCase.** The screaming caps are a signal:
this is not a data table. Readable at a glance in Manage Database and in every TO name.

Drives hub navigation state, current lens, active filters, selected mode, import queue state,
and UI toggles.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| g_Mode | Text (global) | current hub mode |
| g_Search | Text (global) | search input |
| g_CurrentContext | Text (global) | active context filter |
| g_CurrentDocumentType | Text (global) | active type filter |
| g_CurrentSubject | Text (global) | active subject filter |
| g_ShowAnnotated | Number (global) | variant filter toggle |
| g_ShowClean | Number (global) | variant filter toggle |
| g_CurrentSavedLens | Text (global) | active lens |
| audit fields | | per data-standards.md |
