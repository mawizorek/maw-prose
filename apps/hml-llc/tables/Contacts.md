# Contacts

*Person records. 🥇 GOLDEN — parked, out of v1 scope. Verified 2026-07-31.*

**Grain: one person.**

Parked and undesigned. Rename `CONTACTS` to `Contacts` before any `ExecuteSQL` references it.

The interesting open question is not this table but whether it needs a join to `Organizations`. If one person can belong to several entities, or wear several roles at one entity, then `OrganizationContacts` has to exist and the relationship cannot be a simple foreign key. In private lending that is common enough to plan for and cheap enough to skip until it appears.

## Fields

| Field | Type | Key | Category |
|---|---|---|---|
| PrimaryKey | text-uuid | pk | key |

The full field set and the audit quad are unenumerated.

## Relationships

A potential `OrganizationContacts` join, per the above. Nothing built.

## Open

The join question, then the field set.
