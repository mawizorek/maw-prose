---
id: uritp-people-sync-plan
title: URITP People sync plan
type: page
status: unlisted
revised: 2026-10
summary: How URITP People and ClickUp's PEOPLE list stay in step. Setup rows, the pull, adoption, reconcile, the push, and the edge cases. Draft until the rulings at the bottom are made.
---

# URITP People sync plan

Written 2026-10-23 against the [schema baseline](@uritp-people). It changes nothing in the baseline. Where it needs a ruling, the ruling is listed at the bottom with a recommendation, and nothing that depends on it gets built first.

## The shape in one paragraph

One source, PEOPLE, reads one ClickUp view of the PEOPLE list. A run opens a session, pages the view, caches every task in xt_RECORDS, and hands each new or changed task to the person handler. A task with no join is adopted: a PEOPLE record, a contact card and a join are made. A task with a join is compared field by field and every difference becomes a sync_RECONCILE row; nothing is overwritten. The push sends FileMaker's name, status, primary email and primary phone back to the task, and creates a task for any person FileMaker has that ClickUp does not.

## What is mirrored

Each line is an xt_FIELDS row: mapKey, then the ClickUp field, then the FileMaker side. Field ids are from the PEOPLE list on 2026-10-23.

- `name` · task name · built from `PEOPLE::auto_Name_FirstLast`. Pushed. On adoption only, read to fill first and last if the custom fields are empty.
- `status` · task status · `PEOPLE::status_Person`. Pulled and pushed.
- `first` · Legal First Name `b8397952-bcaf-423d-a182-62bc152cf160` · `PEOPLE::Name_First`.
- `last` · Last Name `4e8a61ba-3162-4e9a-89fd-9fe0e24fad8e` · `PEOPLE::Name_Last`.
- `alt` · Alt. Name `d5cba607-c034-4eb3-a699-9f5a3f4a4144` · `PEOPLE::Name_Alternate`.
- `pronouns` · Pronouns `da51a70d-2beb-46eb-ba14-2d46ac37004b` · `PEOPLE::Pronouns`.
- `email_primary` · Primary Email `9b413089-fd05-42b0-b463-f20a312752c4` · the first contact_EMAILS row by `sort_Index`. Push only.
- `phone_primary` · Phone Number `8a00bd24-8ef0-4efa-a8b9-49fcf717d90f` · the first contact_PHONE_NUMBERS row by `sort_Index`. Push only.

The list has a second field also named Phone Number, a button (`e0beb790-03bb-4034-87d4-496627048992`). Map by id, never by name. That is what mapKey is for.

Everything else on the list (availability, positions, relationships, birthday, lift training, Name as in Playbill) is not mirrored.

## One-time setup rows

Typed once, before any script runs.

- xt_SYSTEMS: the ClickUp row exists, with BaseURL and Token.
- Target_Tables: one row for PEOPLE, filled by the table refresh.
- xt_CONTAINERS: one row. `fk_System` ClickUp, `xt_ID` the list id `901305646880`, Name PEOPLE, `fk_TargetTable` the PEOPLE row, `isActive` 1. Today this table is empty.
- xt_FIELDS: the eight rows above, under that container. The field refresh fills `xt_FieldName` and `xt_FieldType` from ClickUp; `mapKey` is typed.
- sync_SOURCES: the existing PEOPLE row, `fk_Container` pointed at the new container row, `xt_ViewPath` the view `12cwjm-66873`.
- Value lists Action (pull, push, adopt, export) and Decision (pending, fm, xt, applied).

The view has to show closed tasks. If it doesn't, a person closed in ClickUp looks the same as a person deleted.

## Scripts

- `SYNC_Run` · the button. Parameter: a sync_SOURCES Name. Reads the source, its container and its system once into variables, opens a sync_SESSIONS row, calls the pull, the dispatcher, then shows the session.
- `ADAPTER_ClickUp_Pull` · the only script that knows ClickUp's page shape.
- `SYNC_Dispatch` · walks the session's new and changed xt_RECORDS and calls the handler for the container's target table.
- `PERSON_Upsert_From_xtRecord` · adopt or compare.
- `RECONCILE_Apply` · acts on decided rows.
- `ADAPTER_ClickUp_Push` · one person, or every person whose values differ from the cache.
- `XT_Refresh_Fields` and `APP_Refresh_Tables` · housekeeping, run by hand.

How `SYNC_Run` reads its context, one ExecuteSQL join or relationships through `sync_SOURCES_fxtContainers`, is still open. Every script below receives that context as variables either way, so the ruling changes one script.

## The pull

Page the view from page 0, 30 tasks a page, until `last_page` is true. For each task:

1. Find the xt_RECORDS row by `xt_ID` (the task id) in this container. None: create it.
2. Compare the task's `date_updated` with `xt_Version`. Equal: the task has not changed, move on.
3. Changed or new: write one sync_EVENTS row (Action pull, the request URL, HttpStatus, the task's JSON as Response), set `xt_Label` to the task name and `xt_Version` to `date_updated`.

The payload lives once, on that event. What ClickUp last said about a person is the record's newest pull event, through the sync_EVENTS relationship sorted newest first. Nothing is copied onto xt_RECORDS.

A development cap stops after page 0. That's the first test: 30 real people, no hand entry.

The status code comes from `--dump-header` in the cURL options. A 429 pauses 60 seconds and retries the page once; a second failure ends the session with an error event.

## Adoption

A changed xt_RECORDS row with no XTERNAL_JOINS row is a person ClickUp has and FileMaker doesn't. The handler:

1. Creates PEOPLE from first, last, alt, pronouns and status. If first and last are empty (a name typed on a phone), it splits the task name at the last space.
2. Creates the person's CONTACTS card.
3. Creates the join.
4. Writes an adopt event.

Adoption never matches against existing people. A person who already exists unjoined becomes a duplicate to merge by hand. Merging means moving the join to the survivor and deleting the other record. That is rare once the initial load is done, and an automatic name match would be wrong more often than it saves.

Ruling needed: whether adoption also copies Primary Email, Secondary Email and Phone Number into the card. See the bottom.

## Compare and reconcile

A changed task that already has a join is compared on first, last, alt, pronouns and status with `Exact`, because FileMaker's `=` ignores case. Every difference writes a sync_RECONCILE row: the field, FM_Value, xt_Value, Decision pending. FileMaker is not touched. The task name is not compared; FileMaker builds it.

In the review window each row is set to fm (FileMaker is right, push it), xt (ClickUp is right, write it into FileMaker) or left pending. `RECONCILE_Apply` writes the xt rows into PEOPLE, queues the fm rows for the push, and marks both applied.

A task that was in the container's cache and didn't come back on a full pull is gone. It gets a pending row with no field. The person is never deleted. Gone is only checked when the pull ran to the last page, never under the development cap.

## The push

The push needs no stored last-pushed value. It compares FileMaker's values with the record's newest pull event and sends only what differs.

- Name and status go in one Update Task call.
- Email and phone go through Set Custom Field Value, one call per field.
- A person with no join gets a Create Task call in the list, then a join and an xt_RECORDS row.

Each call writes a push event. The Update Task response's `date_updated` becomes `xt_Version`, so the next pull doesn't see our own write as a change. A custom-field call returns no task, so after field calls the push re-reads the task once and stores that as a pull event.

The phone field rejects anything without a country code. ClickUp's own example is `+1 123 456 7890`. The push formats a ten-digit US number as +1, skips anything it can't format, and logs the skip as an error event. It doesn't guess.

Pushing every phone and email for the initial load is roughly three calls per person. At 100 requests a minute per token, that's about fifteen minutes for the whole list. The push paces itself at about one call every 0.7 seconds.

## Checkpoints

1. Setup rows in, field refresh fills xt_FIELDS with the right names and types.
2. Pull with the cap: 30 xt_RECORDS, 30 pull events, 30 adopted PEOPLE, 30 joins.
3. The same pull again: 0 events, 0 adoptions, 0 reconcile rows.
4. Change one Last Name in ClickUp, pull: exactly 1 event and 1 reconcile row.
5. Cap off, full pull: PEOPLE, joins and xt_RECORDS all equal the list's task count, closed tasks included.
6. Push one person, check the task, pull: 0 reconcile rows.
7. Full push, then pull: 0 reconcile rows.

## What stays out of git

sync_EVENTS holds student names and contact details. It lives in FileMaker only. The DDR drops in this repo carry schema and record counts, never records. Any export of sync tables stays out of this public repo without UR's approval.

## Rulings needed

1. **Seed contacts on adoption.** The baseline says emails and phones are never pulled. But FileMaker has none and ClickUp has hundreds, so a literal reading throws them away on the initial load. Recommendation: on adoption only, copy Primary Email and Phone Number as the first rows on the card and Secondary Email as the second. After that, push only. This narrows the baseline sentence to "never pulled after adoption".
2. **Event granularity.** Recommendation: an event only for a new or changed task. Logging every unchanged task writes hundreds of identical payloads per pull.
3. **Status map.** The list's open statuses today are new, active, circle back and connect with, plus its closed ones. Recommendation: status_Person's VALUES mirror them one to one, so status needs no translation table.
4. **Task name.** Recommendation: the task name is FileMaker's `auto_Name_FirstLast`, which already prefers the preferred name. The first full push renames every task whose name differs, so check a sample before running it.
5. **Name as in Playbill.** ClickUp has the field; `stored_NameDisplayInPlaybills` is a manual fact in FileMaker. Recommendation: add it to the push as `playbill`, push only.
6. **The one PEOPLE record.** Recommendation: delete it before the first pull, so the initial load starts from zero.
7. **Context read** (already open). Plan works either way; one script changes.
