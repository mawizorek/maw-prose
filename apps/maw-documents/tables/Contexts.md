# Contexts

!!! abstract "Grain"
    one ownership scope. "Whose world does this document belong to?" URITP, HML_LLC, Teaching, Personal, Global Reference.

Contexts drive the hub's mode switching. Flip to "URITP mode" = filter by context. A document
can belong to multiple contexts via [DocumentContexts](./DocumentContexts.md).

Contexts are **not** subjects. Context = whose world. Subject = what topic. A safety document
can be in context URITP AND context Teaching (it belongs to both worlds) while its subject is
"Safety" (what it's about). Independent axes.

Contexts stay flat rows. They do not graduate to their own tables. When production-specific
linking is needed, that happens through the production metadata layer (phase 2), not by
promoting a context to a table.

## Fields

| Field | Type | Notes |
|---|---|---|
| PrimaryKey | UUID | |
| ContextName | Text | "URITP", "HML_LLC", "Teaching", "Personal" |
| fkContextType | UUID (FK) | optional grouping |
| ParentContext | UUID (FK) | optional hierarchy |
| ExternalSourceKey | Text | for sync with external systems |
| IsActive | Number (boolean) | |
| SortOrder | Number | |
| audit fields | | per data-standards.md |
