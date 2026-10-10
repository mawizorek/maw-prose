---
id: filemaker-production-systems
title: FileMaker production systems
status: unlisted
type: page
summary: The FileMaker solutions Michael designs and specs for theatre production, how ClickUp feeds them, and the standards that keep separate files consistent.
revised: 2026-10
source: https://github.com/mawizorek/maw-prose/blob/main/DECISIONS.md
related: [profile-projects]
keywords: [FileMaker, database, ClickUp, production management, data standards]
---

# FileMaker production systems

## What I build

A production office runs on information that changes every day: who is on a crew, how to reach them, what a show has spent, which version of a document is current. I build FileMaker solutions that hold that information in one place, so it gets looked up instead of re-asked.

The current set: URITP People (people and contacts), Production MAWster, MAW Budget, a URITP budget file, and the shared setup layer the URITP files build on.

## Why it matters on a production

The payoff is the next production, not this one. A crew list built once, a budget that rolls forward, and documentation a new hire can read cold mean the program keeps what it learned when students graduate and staff move on.

## How the work is shaped

Every app starts as a written spec before it starts as a file. Each table gets a note that names its grain, meaning what one record actually is, with a field register beside it. The spec is the target the build works toward, and it never pretends to describe the live file. Progress is tracked on one build sheet per app instead of being scattered through the spec.

ClickUp is where the program's people and tasks already live, so rather than retyping them I connect the two. URITP People is being rebuilt as a ClickUp-fed hub: a button script pulls people, email addresses and phone numbers from ClickUp one way, matched on ClickUp's own task id, and every other file joins to a person on that same id. One source of truth, and no reconciling two address books by hand.

## Standards across apps

FileMaker cannot share a custom function or a naming rule between files, so consistency has to be designed in. I keep one canonical definition of each cross-app function and standard, and each app points at it rather than copying it. Beside each shared definition sits a conformance fixture an installed copy can test itself against, so a file learns it has drifted before a user does.

Every file also carries its own catalog of tables and layouts, generated from the file's schema by a refresh script and keyed on FileMaker's internal ids. Names are never typed by hand, so a rename follows the object instead of breaking whatever pointed at it. The same refresh reports gaps against the data standards, which turns a style guide into a check that runs.

<!-- Facts sourced from DECISIONS.md D-037, D-040, D-041, D-042, D-043. Table/script counts are in the hidden bullet bank (as of the August 2026 DDR) and stay off this page until rechecked. -->

## Related

- [Projects](@profile-projects)
