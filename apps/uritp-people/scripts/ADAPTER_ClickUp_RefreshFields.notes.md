---
id: uritp-people-script-adapter-clickup-refreshfields
title: "adapter | clickup_Refresh_Fields"
type: reference
status: public
order: 21
revised: 2026-10
summary: The first script in the file that calls ClickUp. Fills xt_FIELDS names and types from the list's custom-field endpoint, and reports a mapped field ClickUp no longer has.
---

# adapter | clickup_Refresh_Fields

!!! abstract "Grain"
    One container per run. Writes `xt_FieldName` and `xt_FieldType` on its `xt_FIELDS` rows and nothing else.

## The endpoint

`GET {BaseURL}/list/{list id}/field`, returning `{ "fields" : [ { id, name, type, type_config } ] }`. Verified against the Claris-independent [ClickUp custom fields reference](https://developer.clickup.com/reference/get-accessible-custom-fields) on 2026-10-23.

The personal token goes in `Authorization` **bare**. No `Bearer` prefix: that form is for OAuth access tokens, and a personal token sent as a bearer is rejected. Tokens begin `pk_`.

## What it writes, and what it refuses to

It writes the name and the type. It never writes `mapKey`, and that restraint is the point: `mapKey` is the only thing that survives ClickUp renaming a field, and it is the reason the list's two identically named Phone Number fields cannot be confused. A refresh that corrected mapKey from ClickUp would hand the naming collision straight back.

It also never writes `xt_FieldID`. The id is the contract.

## Four counts, because three of them are defects

The closing dialog reports:

- **Updated** — rows that matched a live ClickUp field.
- **Native, skipped** — rows with an empty `xt_FieldID`, meaning `name` and `status`. Task attributes, not custom fields, so there is nothing to refresh and this is expected to read 2.
- **Mapped but missing from ClickUp** — a row whose id ClickUp did not return. The field was deleted, or moved out of this list. **This is the one to act on:** the mapping is now pointing at nothing, and without this count a pull would simply read empty for that field forever and nobody would know why.
- **On the list but not mapped** — fields ClickUp has that `xt_FIELDS` does not. Informational, and expected to be large, since the list carries availability, positions, relationships and more that this sync deliberately ignores.

## Credentials

Reads `BaseURL` and `Token` off the `xt_SYSTEMS` row itself, from the key the dispatcher passed. Nothing sensitive travels in a script parameter, where it would be visible in the Data Viewer and in any dialog that echoes the parameter.

## Known limits

The inner loop rescans the JSON array per row, so the cost is rows × fields. At ten rows against a list of this size that is nothing, and the flat shape is worth more than the speed. If a container ever maps dozens of fields, build a lookup once instead.

The HTTP status is read from the first line of the dumped header with `MiddleWords` (word 3, since FileMaker treats `/` in `HTTP/1.1` as a word break), paired with `Get ( LastError )` so a transport failure and a non-200 are both caught. A 429 is not retried here: that belongs in the pull, where it is worth the complexity, not in a housekeeping script run by hand.
