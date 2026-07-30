# Conventions

**Read before adding anything.**

## What these are

Handoff docs. Every file should read like something you hand a designer on their first day, a new hire who has never seen the space, or whoever holds your role after you.

The test before you write a file: *would someone open this to look something up?* If the only reason to open it is to understand somebody's process, it does not belong here.

## How to write them

Detailed prose from someone who knows the subject. Full sentences, real paragraphs, the aside that explains why a thing catches people.

**Avoid tables.** A table strips out everything except the cells, and the useful part of a note is usually the connective tissue a table has nowhere to put. "Earplugs and gloves are in both rooms; masks are in neither" is the sentence that saves someone a walk across the building, and a three-column grid cannot hold it. Reach for a table only when the data is genuinely tabular and there is nothing to say about it.

**No YAML front matter.** GitHub renders it as a table, so every note opened with a metadata grid instead of a sentence. Put what mattered in an italic line under the title.

**Say how old the content is** in that line — when it was last actually checked, not when the file was last touched. Copying a file is not verifying it.

**Go easy on bold and emoji.** A page where half the words are bold has no emphasis at all. Save a warning marker for something that costs real money to get wrong.

**Do not write about the documentation.** No notes on why a file is shaped the way it is, what it used to be, or what got moved. That is what `DECISIONS.md` is for, one line.

## The shape

```
<type>/<package>/<document>.md
```

Two levels, three path segments to any file. That is the cap.

Six types. `handbooks/` is how you hold a role over time. `guides/` is how to do one thing. `standards/` is what the work must conform to. `programs/` is what someone has to acknowledge. `venues/` is what is true about a room. `templates/` is what you start from.

**Standards versus guides, so it is never a judgment call:** a standard is cited, a guide is followed. Class naming is a standard. Hanging a truss is a guide.

A new folder earns existence if you can name every sibling it will ever have, today. A package earns a subfolder when it grows companions — attachments, appendices, sidecars. Headings never justify nesting; GitHub already builds a table of contents from them.

## Rules

Kebab-case, lowercase, folders and files.

Zero-pad sequences. `week-01`, or it sorts 1, 10, 11, 2.

One document per unit. One week, one standard, one program. Never a file that accretes.

Split past roughly 15KB.

Every package has a `README.md` listing its documents and **naming the ones that should exist and do not.**

**Never scaffold an empty file.** A file appears when there is something to put in it. Gaps get named in the package README instead — an empty container makes a project look further along than it is.

**Nothing here asks a question.** A `- [ ]` in this repo is dead text; nobody can answer it. Questions go to the ClickUp log.

Superseded content gets marked, not deleted, with a pointer to what replaced it.

**No `index.html`. No viewer. Ever.** This repo is content.

## Where things live

This repo holds **source** — authored text that gets edited, diffed, and re-delivered.

FileMaker holds **records** — signed forms, dated acknowledgments, anything tied to a person or a production. A record may carry a path into this repo. The repo never holds a copy of a record.

ClickUp keeps its work: tasks, lists, chat, decision logs, audit pages.

**Numbers:** if you would put it on a drawing, it lives in the model. If you would tell it to a new hire on their first walk, it lives here.

**Personnel:** this repo is private, so names are not a leak. But "Charlie has the key" decays the day Charlie leaves, while "the key lives in the PM office, ask the PM" survives. Write the version that outlives the person.

## Private

This repo is private and Michael is the only way anything leaves it. Write freely.
