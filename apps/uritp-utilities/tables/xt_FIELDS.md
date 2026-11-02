---
id: uritp-utilities-table-xt-fields
title: xt_FIELDS
status: public
type: reference
summary: Remote field definitions paired with stable semantic mapKeys, without naming local app fields.
order: 50
revised: 2026-11
data:
  catalog:
    file: xt_FIELDS.tsv
---

# xt_FIELDS

!!! abstract "Grain"
    One external field catalog entry within a container.

## Fields

!!! data "catalog"

## Meaning belongs here; landing belongs in the app

The field refresh writes `xt_FieldID`, `xt_FieldName` and `xt_FieldType` from the external system. These are external facts, not hand-selected FileMaker types. `mapKey` names the field's meaning, such as `person.email`, and allows lowercase letters, digits, underscores and periods.

The app's upsert contract decides which local field receives each mapKey. Utilities never stores a consuming app's field name or table pointer.

## One meaning per container

`uniq_ContainerMapKey` is a stored auto-enter text calculation joining `fk_Container`, a vertical bar and `mapKey`, validated unique. Two fields in one container cannot claim the same meaning. The scope is the container, not a globally unique external display name.
