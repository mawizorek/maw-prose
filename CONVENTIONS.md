# Conventions

How this repo is organized. **Read before adding anything.**

## What this repo is for

**All of our documentation.** Not only prose — the name is a label, not a specification. The split against `ClickUp_apps` is **code versus documentation**: that repo holds the HTML apps, the infrastructure, and Brain's own config tree. This one holds documentation of things — rooms, roles, safety programs, and the schemas of applications we build.

*Clarified 2026-07-30 after the name was read as a content rule and used to argue that FileMaker schema documentation belonged elsewhere. It does not. It belongs here.*

## What these notes are for

**Handoff docs.** Every file here should read like something you hand a designer on their first day, a new hire who has never seen the space, or whoever holds your role after you.

That means reference first — the layer list, the load limits, the thing that will bite them — not how we decided it or when.

**The test before you write a file:** would someone open this to look something up? If the only reason to open it is to understand somebody's process, it is not a note. It belongs in `DECISIONS.md` as one line, or nowhere.

## Write prose

**These are notes, not a database.** Detailed, well-maintained prose from someone who knows the subject. Full sentences, real paragraphs, the aside that explains why a thing catches people.

**Avoid tables.** A table strips out everything except the cells — and the useful part of a note is usually the connective tissue a table has nowhere to put. "Earplugs and gloves are in both rooms; masks are in neither" is the kind of sentence a three-column grid cannot hold, and it is the sentence that saves someone a walk across the building.

A short bulleted list is fine when the content is genuinely a list. Reach for a table only when the data is truly tabular and there is nothing to say about it — and expect to justify it.

**No YAML front matter.** GitHub renders it as a table at the top of the file, so every note opened with a metadata grid before the reader got to a single word. Whatever mattered in there — what this is, where it came from, how old the source is — goes in an italic line under the title, where a person will actually read it.

The cost of dropping front matter is honest: there are no machine-readable tags to filter on. **The taxonomy now lives in the prose and the paths**, and finding things is a matter of reading rather than querying. Worth it, because a note nobody wants to open is not findable at any price.

**Say how old it is.** The one thing front matter was genuinely good for. Every note states when its content was last actually checked — not when the file was last touched, which is a different and much less useful fact. Copying a file is not verifying it. This is the only defense against prose that looks authoritative forever while being quietly wrong.

**Go easy on bold and emoji.** A page where half the words are bold has no emphasis at all, and a warning marker means nothing once it is decoration. Save both for something that costs real money to get wrong.

**Do not write about the documentation.** No notes on why a file is shaped the way it is, what it used to be, or what got moved and when. A reader opening a note about a room does not care how the note came to exist. That belongs in `DECISIONS.md`, one line.

### Registers are not notes

A field list, a script inventory, an object-class list — these are **registers**, and the rules above are rules about notes. A register's whole job is to be a complete enumeration you scan for one row, and prose cannot do that: seventeen fields written as paragraphs is unreadable in a way the table version is not.

So a register may be tabular, and it does not need to justify itself line by line. What it does need is a note beside it or above it doing the job the table cannot — the grain, the one rule that must never break, the field everyone misreads. **A register without that note is a data dump; the pairing is what makes it documentation.**

The repo already drew this distinction once: `D-018` exempts numbered registers from the newest-at-top rule that governs logs. Same animal, different rule.

## The shape

```
<type>/<package>/<document>.md
```

**Two levels. Three path segments to any file. That is the cap** — with one exemption, below.

The types. `handbooks/` is how you hold a role over time, read in sequence. `standards/` is what the correct way to do something is, reached for by reference. `programs/` is what someone has to acknowledge, pulled up by compliance topic. `guides/` is how to do one thing, read at the moment of need. `venues/` is what is true about a particular room. `templates/` is what you start from. `paperwork/` is the forms themselves. `apps/` is what is true about a particular application we built.

**`apps/` is `venues/` for software**, and that parallel is the whole reason it earns a folder: both answer *what is true about this one specific built thing*, as opposed to what correct practice is in general. A room has load limits and a dimmer rack; an application has tables and scripts. Neither is a standard and neither is a guide.

**`guides/` versus `standards/`, so it is never a judgment call:** a standard is cited, a guide is followed. If someone would point at it to settle an argument about the right way to do something, it is a standard. If someone would read it start to finish while doing a task, it is a guide. Standards are what the work must conform to; guides are how to perform the work. Class naming is a standard. Hanging a truss is a guide.

**Does a new folder deserve to exist?** One question: can you name every sibling it will ever have, today? If yes, folder. If it is open-ended, it does not get one.

**A package earns a subfolder when it grows companions, not sections.** Attachments, appendices, and sidecars justify nesting. Headings never do — they are already navigable, since GitHub builds a table of contents from them.

### The depth cap does not apply to a menu mirror

An app package may go deeper than three segments **when the extra depth mirrors the application's own menu** — `apps/hml-llc/tables/loans.md`, `apps/hml-llc/scripts/60_PAYMENTS/post-batch.fmscript`.

The cap exists because depth in a taxonomy is a tax: every level is a placement decision you have to make before you are allowed to write, and the axes overlap so some of those decisions have no correct answer. **A mirror has none of that cost.** You are not choosing where a thing goes; you are copying where it already is. Open FileMaker's *Manage* menu and the folders are decided for you.

And the countable-sibling test passes cleanly: FileMaker's object types are a fixed, enumerable set — tables, relationships, fields, scripts, custom functions, layouts, value lists. That is exactly the condition the test was written to find.

**The exemption is narrow.** It covers mirroring an external application's structure and nothing else. If you find yourself inventing a level that has no counterpart in the app, the cap is back on.

## Rules

**Kebab-case, lowercase**, folders and files. *Mirrored folders keep the application's own casing* — `60_PAYMENTS/` is what FileMaker calls it, and renaming it breaks the mirror.

**Zero-pad sequences.** `week-01`, not `week-1`, or it sorts 1, 10, 11, 2.

**One document per unit.** One week, one standard, one program, one table. Never a file that accretes.

**Split past roughly 15KB.** A file nobody reads whole is a file nobody edits safely.

**Every package has a `README.md`** listing its documents — and naming the ones that should exist and do not, so the gaps stay visible. The index is what makes the rest findable.

**Never scaffold an empty file.** A file appears when there is something to put in it. A heading-only placeholder makes a project look further along than it is; name the gap in the README instead.

**Nothing here asks a question.** Questions go to the ClickUp log; findings stay here. A `- [ ]` in this repo is dead text — nobody can answer it. If a passage expects a reply, it is misfiled.

**Superseded content gets marked, not deleted**, with a pointer to what replaced it.

**No `index.html`. No viewer. Ever.** An app whose only job was rendering a repo markdown file got built, maintained, versioned, and then deleted as redundant. This repo is content.

### Copy targets

Some files here are not read, they are **typed** — a `.fmscript` gets hand-entered into FileMaker's script workspace step by step, and a `.fmcalc` pastes back into the calculation dialog verbatim.

For those, **everything in the file must be something you want to type.** A short contract header and inline comments are fine, because those become real comment steps in the script. Status, changelogs, defect flags and history are not — they go in a `<name>.notes.md` sidecar next to it.

The split has to be the whole file rather than a section above a marker: a `#` line is a valid FileMaker comment step, so over-selecting past a marker does not fail, it silently pastes commentary into your script. Whole-file copy is the only version that cannot be got wrong at two in the morning.

## Where things live

**This repo holds source** — authored text that gets edited, diffed, and re-delivered. And documentation, which is the same thing wearing a different hat.

**`ClickUp_apps` holds code** — the HTML apps, the infrastructure, `brain-config`. If it runs, gets served, or gets loaded by an agent at runtime, it lives there.

**FileMaker holds records** — signed forms, dated acknowledgments, anything tied to a person or a production. A FileMaker record may carry a path into this repo. The repo never holds a copy of a record.

**ClickUp keeps its work:** tasks, lists, chat, decision logs, audit pages.

**Numbers:** if you would put it on a drawing, it lives in the model. If you would tell it to a new hire on their first walk, it lives here.

**Personnel:** this repo is private, so names are not a leak. But "Charlie has the key" decays the day Charlie leaves, while "the key lives in the PM office, ask the PM" survives. Write the version that outlives the person.

## Private

This repo is private and Michael is the only way anything leaves it. Write freely.

⚠️ **That is also load-bearing now, not just convenient.** A loan-servicing fixture in the public `ClickUp_apps` shipped a real payee name and a payment handle on 2026-07-29 because the content was financial and the repo was public. Sample data, payment instructions and anything account-adjacent belong on this side of the fence.
