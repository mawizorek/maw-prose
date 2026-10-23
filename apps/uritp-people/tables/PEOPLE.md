---
id: uritp-people-table-people
title: PEOPLE
type: reference
status: public
order: 10
revised: 2026-10
summary: One human. FileMaker's own record of who they are, carrying no ClickUp id and no contact value.
data:
  catalog:
    file: PEOPLE.tsv
---

# PEOPLE

!!! abstract "Grain"
    One person. Someone who is a student, a guest artist and a vendor at once is still one record.

## Fields

!!! data "catalog"

## FileMaker is canonical

A person can be born in ClickUp, typed in by name on a phone. The next sync adopts them: it creates the PEOPLE record and links it to the task with one row in [XTERNAL_JOINS](@uritp-people-table-xternal-joins). From then on FileMaker wins. A difference ClickUp shows later lands in [sync_RECONCILE](@uritp-people-table-sync-reconcile) for a decision and never overwrites a field by itself.

## No ClickUp id on this table

The link to a task is a join row, never a field here. Nothing on PEOPLE knows ClickUp exists, which is what lets the same person be linked to another system later without touching this table.

## No email or phone on this table

Contact values live on the person's [CONTACTS](@uritp-people-table-contacts) card. The primary email is the first related email by `sort_Index`. There is no stored copy, because a stored copy goes stale the moment an address is added, corrected or reordered, and nothing says so.

## The playbill name is a fact

`stored_NameDisplayInPlaybills` fills itself once from first and last name and is then edited by hand to whatever the playbill should print. It is not a copy of anything and must never be cleaned up as a derivable value.

## Empty optional names are true

Preferred name, alternate name and pronouns are empty for many people. That is a fact about the person, not a missing value.
