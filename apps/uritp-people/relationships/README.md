---
id: uritp-people-relationships
title: Relationships
type: reference
status: public
order: 30
revised: 2026-10
summary: Every edge in People. How a person reaches their roles and contacts, how the external layer chains, and why some tables appear twice.
---

# Relationships

Each base table has an occurrence with the table's own name. Any other occurrence is named `TABLE_fCONTEXT`, the table followed by the context it is seen from.

## A person to their roles

`people_STUDENTS::fk_Person = PEOPLE::PrimaryKey` and the same for `people_ADULTS`. Both keys are text, because they hold UUIDs.

## An owner to its contact card

`CONTACTS::fk_Owner` matches `PrimaryKey` on PEOPLE, on VENUES and on ORGANIZATIONS: three edges, one key. Each owner has at most one card because `fk_Owner` is unique. A production in Production MAWnster reaches its card from that file through an external data source; there is no edge for it here.

## A card to its emails, phones and addresses

`contact_EMAILS::fk_Contact = CONTACTS::PrimaryKey`, and the same for phone numbers and addresses. All three sort by `sort_Index` ascending, so the first related row is the primary everywhere it is shown or pushed.

The primary is never stored. A stored copy only refreshes when its own record changes, so adding, correcting or reordering an address would leave it wrong with nothing to say so.

## The external chain

`xt_SYSTEMS::PrimaryKey = xt_CONTAINERS::fk_System`. `Target_Tables::PrimaryKey = xt_CONTAINERS::fk_TargetTable`. From a container, `xt_RECORDS`, `xt_FIELDS` and `sync_SOURCES_fxtContainers` each match on `fk_Container`.

## A person to their task

`XTERNAL_JOINS_People` sits between them: `fk_SourceRecord = PEOPLE::PrimaryKey` and `fk_xtRecord = xt_RECORDS::PrimaryKey`.

## The log

`sync_SESSIONS::fk_Source = sync_SOURCES::PrimaryKey`. `sync_EVENTS::fk_Session = sync_SESSIONS::PrimaryKey` and `sync_EVENTS::fk_xtRecord = xt_RECORDS::PrimaryKey`.

## Reconcile

`sync_RECONCILE::fk_xtRecord = xt_RECORDS::PrimaryKey`. Its session and field are reached through their own occurrences, `sync_SESSIONS_fRECONCILE` on `fk_Session` and `xt_FIELDS_fRECONCILE` on `fk_xtField`, because the base occurrences are already joined to xt_RECORDS another way and FileMaker does not allow a loop.

## Why sync_SOURCES appears twice

Container to records to events to sessions to sources and back to the container would be a loop. So the base `sync_SOURCES` hangs off sessions, and `sync_SOURCES_fxtContainers` hangs off containers.

## Value lists

Six occurrences of VALUES, one per list, each matching `fk_List` against one global on value_LISTS. The base `VALUES` occurrence matches `fk_List = value_LISTS::PrimaryKey`.
