---
id: uritp-people-sync-plan
title: URITP People sync plan
type: page
status: unlisted
revised: 2026-10
summary: How URITP People and ClickUp's PEOPLE list stay in step, both ways. Setup rows, the pull, adoption, the three-way compare, reconcile, the push, and the edge cases.
---

# URITP People sync plan

Written 2026-10-23 against the [schema baseline](@uritp-people). The six rulings this plan opened were settled the same day as D-048; they are at the bottom, each with the call that was made. Field names were swept onto the built file the same evening, after the setup build renamed eleven of them.

Ruled 2026-10-23 by Michael: every mirrored field, contacts included, syncs both ways through [sync_RECONCILE](@uritp-people-table-sync-reconcile). There is no push-only field.

## The shape in one paragraph

One source, PEOPLE, reads one ClickUp view of the PEOPLE list. A run opens a session, pages the view, caches every task in xt_RECORDS, and hands each new or changed task to the person handler. A task with no join is adopted: a PEOPLE record, a contact card with the task's emails and phone, and a join. A task with a join is compared field by field against FileMaker and against the last value the two sides agreed on. ClickUp's edits become sync_RECONCILE rows; FileMaker's edits are pushed. Nothing is overwritten without a decision.

## Naming, settled

Two conventions run through this layer, and both were settled by what got built rather than by argument.

- **`fk_<family><Thing>`** names the family the key points at. A key into `VALUES` is `fk_v<Thing>`: `fk_vAction`, `fk_vDecision`. A key into the external layer is `fk_xt<Thing>`: `fk_xtSystem`, `fk_xtContainer`, `fk_xtRecord`, `fk_xtField`. Every table that points at a container uses the same name, `fk_xtContainer`, so the graph reads one way from any end.
- **`stored_`** means frozen at write time. **`null_`** marks a nullable field.

## What is mirrored

Each line is an xt_FIELDS row: mapKey, then the ClickUp field, then the FileMaker side. Field ids are from the PEOPLE list on 2026-10-23. All of them sync both ways.

- `name` · task name · built from `PEOPLE::auto_Name_FirstLast`. FileMaker builds it, so it is pushed and never compared. On adoption only, it fills first and last if the custom fields are empty.
- `status` · task status · `PEOPLE::status_Person`.
- `first` · Legal First Name `b8397952-bcaf-423d-a182-62bc152cf160` · `PEOPLE::Name_First`.
- `last` · Last Name `4e8a61ba-3162-4e9a-89fd-9fe0e24fad8e` · `PEOPLE::Name_Last`.
- `alt` · Alt. Name `d5cba607-c034-4eb3-a699-9f5a3f4a4144` · `PEOPLE::Name_Alternate`.
- `pronouns` · Pronouns `da51a70d-2beb-46eb-ba14-2d46ac37004b` · `PEOPLE::Pronouns`.
- `playbill` · Name as in Playbill `cc4886b9-ed39-4d69-bd97-69fccadcba9e` · `PEOPLE::NameDisplay_InPlaybills`. A manual fact on both sides, so it is compared like any other text field.
- `email_primary` · Primary Email `9b413089-fd05-42b0-b463-f20a312752c4` · contact_EMAILS row 1 by `sort_Index`.
- `email_secondary` · Secondary Email `4df4a28f-e31d-40e8-a420-7b6a15354528` · contact_EMAILS row 2.
- `phone_primary` · Phone Number `8a00bd24-8ef0-4efa-a8b9-49fcf717d90f` · contact_PHONE_NUMBERS row 1. Compared digits only.

The list has a second field also named Phone Number, a button (`e0beb790-03bb-4034-87d4-496627048992`). Map by id, never by name. That is what mapKey is for.

Everything else on the list (availability, positions, relationships, birthday, lift training) is not mirrored.

## One-time setup rows

Typed once, before any script runs. All of it is in as of 2026-10-23 evening.

- xt_SYSTEMS: the ClickUp row, with BaseURL and Token.
- Target_Tables: all 22 base tables, filled by `refresh | Target_Tables` and seeded with DDR ids (D-050).
- xt_CONTAINERS: one row. `fk_xtSystem` ClickUp, `xt_ID` the list id `901305646880`, Name PEOPLE, `fk_TargetTable` the PEOPLE row, `isActive` 1. Its key is `5F8A3722-1519-43FB-852A-53369CCCBEEA`.
- xt_FIELDS: the ten rows above, under that container, `fk_xtContainer` pointed at it. The field refresh fills `xt_FieldName` and `xt_FieldType` from ClickUp; `mapKey` is typed.
- sync_SOURCES: the existing PEOPLE row, `fk_xtContainer` pointed at the container row, `xt_ViewPath` the view `12cwjm-66873`.
- value_LISTS: `SYNC_Action` (PULL, PUSH, ADOPT, EXPORT) and `SYNC_DECISION` (PENDING, FM, XT, APPLIED), each with its global seeded on value_LISTS and a filtered `value_LIST_*` occurrence on the graph.

The view has to show closed tasks. If it doesn't, a person closed in ClickUp looks the same as a person deleted.

The file's one test PEOPLE record was deleted, so the initial load starts from zero.

## Value-list keying

Every field that picks from a list carries a foreign key to `VALUES::PrimaryKey`, never the label. One mechanism everywhere, so nothing in this layer is read two ways (D-051). A pick writes the key; a script then snapshots the label it resolved into a sibling `stored_` field, so the log reads without a join and keeps reading the same way after someone renames a value. The pairs: `sync_EVENTS::fk_vAction` with `stored_ActionLabel`, `sync_RECONCILE::fk_vDecision` with `stored_DecisionLabel`. Letter case on the values is display formatting only; scripts match on the key, so case never matters.

## Scripts

- `SYNC_Run` · the button. Parameter: a sync_SOURCES Name. Reads the source, its container and its system once into variables, opens a sync_SESSIONS row, runs the pull, the dispatcher, then the push, then shows the session.
- `ADAPTER_ClickUp_Pull` · the only script that knows ClickUp's page shape.
- `SYNC_Dispatch` · walks the session's new and changed xt_RECORDS and calls the handler for the container's target table.
- `PERSON_Upsert_From_xtRecord` · adopt or compare.
- `RECONCILE_Apply` · acts on decided rows.
- `ADAPTER_ClickUp_Push` · one person, or every person FileMaker has moved.
- `XT_Refresh_Fields` · housekeeping, run by hand. It stays a dispatcher: it resolves the container's system and calls that system's `ADAPTER_<System>_RefreshFields`, which is the only script that knows the endpoint and the response shape (D-052). Written, not yet installed.
- `refresh | Target_Tables` · housekeeping, run by hand. Installed and run clean twice.

`SYNC_Run` reads its context in one `ExecuteSQL` join across sync_SOURCES, xt_CONTAINERS and xt_SYSTEMS, with every field name built from `GetFieldName` so a rename follows the field (D-043). One call, and no new table occurrences on a graph that was just rebuilt. The alternative, relationships through `sync_SOURCES_fxtContainers`, is not taken. Every script below receives the same context as variables either way, so the call changed this one script only.

## The pull

Page the view from page 0, 30 tasks a page, until `last_page` is true. For each task:

1. Find the xt_RECORDS row by `xt_ID` (the task id) in this container, matched through `fk_xtContainer`. None: create it.
2. Compare the task's `date_updated` with `xt_Version`. Equal: ClickUp has not changed it, move on.
3. Changed or new: hand it to the handler first, then write one sync_EVENTS row (`fk_vAction` the PULL key with `stored_ActionLabel` snapped, the request URL, HttpStatus, the task's JSON as Response), set `xt_Label` to the task name and `xt_Version` to `date_updated`.

An event is written only for a new or changed task. An unchanged task is never logged; doing so would write hundreds of identical payloads a pull.

The payload lives once, on that event. The handler runs before the new event is written, so the record's newest existing event is still the last value both sides agreed on.

A development cap stops after page 0. That's the first test: 30 real people, no hand entry.

The status code comes from `--dump-header` in the cURL options. A 429 pauses 60 seconds and retries the page once; a second failure ends the session with an error event.

## Adoption

A changed xt_RECORDS row with no XTERNAL_JOINS row is a person ClickUp has and FileMaker doesn't. The handler:

1. Creates PEOPLE from first, last, alt, pronouns, playbill name and status. If first and last are empty (a name typed on a phone), it splits the task name at the last space.
2. Creates the person's CONTACTS card, with Primary Email as email row 1, Secondary Email as row 2 and Phone Number as phone row 1, wherever ClickUp has them.
3. Creates the join.
4. Writes an event keyed to ADOPT.

Adoption never matches against existing people. A person who already exists unjoined becomes a duplicate to merge by hand. Merging means moving the join to the survivor and deleting the other record. That is rare once the initial load is done, and an automatic name match would be wrong more often than it saves.

## The three-way compare

For a joined task that changed, each mirrored field is read three ways: FileMaker now, ClickUp now, and the base, which is that field in the record's newest event (the last pull, or the re-read after the last push). Text compares with `Exact`, because FileMaker's `=` ignores case. Phones compare digits only.

- Only ClickUp moved (FileMaker equals the base): a sync_RECONCILE row, `fk_vDecision` keyed to PENDING.
- Only FileMaker moved (ClickUp equals the base): no row. The push sends it.
- Both moved to the same value: nothing to do.
- Both moved to different values: a conflict row, keyed to PENDING.

FileMaker is never written during the compare.

In the review window each row is set to FM (keep FileMaker, push it), XT (take ClickUp's) or left PENDING. `RECONCILE_Apply` writes XT rows into FileMaker, queues FM rows for the push, and marks both APPLIED. Taking ClickUp's email or phone inserts it as a new row in that position and moves the old one down, so nothing is lost.

A task that was in the container's cache and didn't come back on a full pull is gone. It gets a PENDING row with no field. The person is never deleted. Gone is only checked when the pull ran to the last page, never under the development cap.

## The push

The push needs no stored last-pushed value. For each joined person it compares FileMaker with the base and sends what FileMaker moved, plus every row decided FM. It skips any field with a PENDING row, so a push never tramples a ClickUp edit waiting for a decision.

- Name and status go in one Update Task call.
- Emails, phone and the playbill name go through Set Custom Field Value, one call per field.
- A person with no join gets a Create Task call in the list, then a join and an xt_RECORDS row.

Each call writes an event keyed to PUSH. Afterwards the push re-reads the task once and stores it as a PULL event with its `date_updated` as `xt_Version`. That becomes the new base, and the next pull doesn't see our own write as a ClickUp edit.

The phone field rejects anything without a country code. ClickUp's own example is `+1 123 456 7890`. The push sends a ten-digit US number as +1, skips anything it can't format, and logs the skip as an error event. It doesn't guess.

After the initial load the first full push only sends what FileMaker computes differently from ClickUp, mostly task names. Because the task name is FileMaker's `auto_Name_FirstLast`, that first run renames every task whose name differs, so a sample is checked before it runs. Each person costs up to five calls. At 100 requests a minute per token that's about half an hour in the worst case. The push paces itself at about one call every 0.7 seconds.

## Checkpoints

1. Setup rows in, field refresh fills xt_FIELDS with the right names and types. *Setup rows in. The refresh scripts are written and not yet installed, so the names and types are still typed.*
2. Pull with the cap: 30 xt_RECORDS, 30 pull events, 30 adopted PEOPLE with their emails and phones, 30 joins.
3. The same pull again: 0 events, 0 adoptions, 0 reconcile rows.
4. Change one Last Name and one Primary Email in ClickUp, pull: 1 event, 2 reconcile rows.
5. Change one pronoun in FileMaker, run: pushed, 0 reconcile rows.
6. Change the same person's Alt. Name differently on both sides, pull: 1 conflict row.
7. Cap off, full pull: PEOPLE, joins and xt_RECORDS all equal the list's task count, closed tasks included.
8. Full push, then pull: 0 reconcile rows.

## What stays out of git

sync_EVENTS holds student names and contact details. It lives in FileMaker only. The DDR drops in this repo carry schema and record counts, never records. Any export of sync tables stays out of this public repo without UR's approval.

## Rulings, settled 2026-10-23

All six were ruled as recommended. Recorded as D-048.

1. **Event granularity.** An event only for a new or changed task.
2. **Status map.** `status_Person`'s VALUES mirror the list's statuses (new, active, circle back, connect with, plus its closed ones) one to one, so status needs no translation table. This is the one place a label is the contract, because the label is ClickUp's.
3. **Task name.** The task name is FileMaker's `auto_Name_FirstLast`, which already prefers the preferred name. Check a sample before the first full push renames.
4. **Name as in Playbill.** Mirrored as `playbill`, both ways, under the same rule as everything else. The FileMaker side is `NameDisplay_InPlaybills`, renamed from `stored_NameDisplayInPlaybills` during the setup build.
5. **The one PEOPLE record.** Deleted before the first pull. Done.
6. **Context read.** One `ExecuteSQL` join, with `GetFieldName` text.

Then D-051, value-list keying by key with a label snapshot, and D-052, `XT_Refresh_Fields` stays a dispatcher.

Three field names briefly disagreed with their siblings and were settled the same night by renaming in the file rather than by writing a rule: `sync_EVENTS::fk_vAction` took the `v`, and `sync_SOURCES` and `xt_RECORDS` both took `fk_xtContainer`. The conventions they settle are at the top of this page. The flag that says a list is a status set also moved up a grain in that build, from `VALUES::bool_isStatusList` to `value_LISTS::bool_isStatusSet`, which is the right grain and is recorded in D-051.
