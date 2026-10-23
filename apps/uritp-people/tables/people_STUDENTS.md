---
id: uritp-people-table-people-students
title: people_STUDENTS
type: reference
status: public
order: 12
revised: 2026-10
summary: The student role of one person. Only what is true of someone because they are a student.
data:
  catalog:
    file: people_STUDENTS.tsv
---

# people_STUDENTS

!!! abstract "Grain"
    One person in their role as a student. The person's name and contacts stay on [PEOPLE](@uritp-people-table-people).

## Fields

!!! data "catalog"

## A role, not a person

Nothing here repeats a name, a status or an email. `fk_Person` is text because it holds a PEOPLE UUID; a number field would never match it.

## StudentID is text

Student ids can start with a zero. A number field strips it.
