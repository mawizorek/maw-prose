---
id: uritp-people-table-xt-fields
title: xt_FIELDS
type: reference
status: public
order: 44
revised: 2026-10
summary: One external field a container exposes, and the stable name scripts use to ask for it.
data:
  catalog:
    file: xt_FIELDS.tsv
---

# xt_FIELDS

!!! abstract "Grain"
    One field on one container, such as the PEOPLE list's Primary Email field.

## Fields

!!! data "catalog"

## Scripts ask for mapKey

`mapKey` is FileMaker's own name for the field, such as `primary_email`, so it carries no `xt_` prefix. Scripts ask for a mapKey and never hold a raw field id. If the field is rebuilt in ClickUp and gets a new id, one row changes here and no script does.

## The refresh writes the rest

`xt_FieldID`, `xt_FieldName` and `xt_FieldType` are written by the field refresh from the system's API. The type is the system's own word (ClickUp sends `email`, `phone`, `drop_down` and so on), never picked by hand.

## Built-in fields are rows too

A task's name and status are mapped the same way, with `xt_FieldID` set to `name` or `status`, so the push and the compare treat every field alike.
