---
id: uritp-people-script-people-compare
title: PEOPLE_Compare
type: reference
status: public
order: 20
revised: 2026-10
summary: Turns one session's staged rows into review rows. New, Changed, Gone. Writes nothing to PEOPLE.
---

# PEOPLE_Compare

Copy target: `PEOPLE_Compare.fmscript`, folder `10_IMPORT`. Called by [PEOPLE_Pull](@uritp-people-script-people-pull) with the session key; never on a button.

## Every field, every time

It compares all five pulled fields for every staged person, rather than trusting ClickUp's last-updated date to say who changed. Five fields across five hundred people is nothing, and a date check would hide any field someone edited in FileMaker by hand.

## The field list is the contract

`$fields` at the top names the PEOPLE fields the import owns. The same list sits at the top of [PEOPLE_Apply](@uritp-people-script-people-apply). Adding a pulled field means a PEOPLE field, an `import_` twin in import_PEOPLE, a line in step 4 of the pull, and the name in both lists.

## Rows are gathered, then written

Differences collect in a JSON array while the script stands on import_PEOPLE, and only become RECONCILE records at the end. That keeps the script from switching layouts inside the loop, which is where found sets get lost.
