# Conventions

How this repo is organized. **Read before adding anything.**

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

## The shape

```
<type>/<package>/<document>.md
```

**Two levels. Three path segments to any file. That is the cap.**

Six types. `handbooks/` is how you hold a role over time, read in sequence. `standards/` is what the correct way to do something is, reached for by reference. `programs/` is what someone has to acknowledge, pulled up by compliance topic. `guides/` is how to do one thing, read at the moment of need. `venues/` is what is true about a particular room. `templates/` is what you start from.

**`guides/` versus `standards/`, so it is never a judgment call:** a standard is cited, a guide is followed. If someone would point at it to settle an argument about the right way to do something, it is a standard. If someone would read it start to finish while doing a task, it is a guide. Standards are what the work must conform to; guides are how to perform the work. Class naming is a standard. Hanging a truss is a guide.

**Does a new folder deserve to exist?** One question: can you name every sibling it will ever have, today? If yes, folder. If it is open-ended, it does not get one.

**A package earns a subfolder when it grows companions, not sections.** Attachments, appendices, and sidecars justify nesting. Headings never do — they are already navigable, since GitHub builds a table of contents from them.

## Rules

**Kebab-case, lowercase**, folders and files.

**Zero-pad sequences.** `week-01`, not `week-1`, or it sorts 1, 10, 11, 2.

**One document per unit.** One week, one standard, one program. Never a file that accretes.

**Split past roughly 15KB.** A file nobody reads whole is a file nobody edits safely.

**Every package has a `README.md`** listing its documents. The index is what makes the rest findable.

**Nothing here asks a question.** Questions go to the ClickUp log; findings stay here. A `- [ ]` in this repo is dead text — nobody can answer it. If a passage expects a reply, it is misfiled.

**Superseded content gets marked, not deleted**, with a pointer to what replaced it.

**No `index.html`. No viewer. Ever.** An app whose only job was rendering a repo markdown file got built, maintained, versioned, and then deleted as redundant. This repo is content.

## Where things live

**This repo holds source** — authored text that gets edited, diffed, and re-delivered.

**FileMaker holds records** — signed forms, dated acknowledgments, anything tied to a person or a production. A FileMaker record may carry a path into this repo. The repo never holds a copy of a record.

**ClickUp keeps its work:** tasks, lists, chat, decision logs, audit pages.

**Numbers:** if you would put it on a drawing, it lives in the model. If you would tell it to a new hire on their first walk, it lives here.

**Personnel:** this repo is private, so names are not a leak. But "Charlie has the key" decays the day Charlie leaves, while "the key lives in the PM office, ask the PM" survives. Write the version that outlives the person.

## Private

This repo is private and Michael is the only way anything leaves it. Write freely.
