# Conventions

How this repo is organized. **Read before adding anything.**

---

## What these notes are for

**Handoff docs.** Every file here should read like something you hand a designer on their first day, a new hire who has never seen the space, or whoever holds your role after you.

**That means reference first.** The layer list, the load limits, the class names, the thing that will bite them. Not how we decided it or when.

**The test before you write a file:** *would someone open this to look something up?* If the only reason to open it is to understand somebody's process, it is not a note — it belongs in `DECISIONS.md` as one line, or nowhere.

---

## The shape

```
<type>/<package>/<document>.md
```

**Two levels. Three path segments to any file. That is the cap.**

Six types:

| Type | Answers | You reach for it |
|---|---|---|
| `handbooks/` | How do I hold this role over time? | In sequence, week by week |
| `standards/` | What is the correct way to do this? | By reference |
| `programs/` | What does someone have to acknowledge? | By compliance topic |
| `guides/` | How do I do this one thing? | At the moment of need |
| `venues/` | What is true about this room? | By place |
| `templates/` | What do I start from? | By situation |

**`guides/` vs `standards/` — the test, so it is never a judgment call:**

> **A standard is cited. A guide is followed.**
>
> If someone would point at it to settle an argument about the right way to do something, it is a **standard**. If someone would read it start to finish while doing a task, it is a **guide**.
>
> Still ambiguous? **Standards are what the work must conform to; guides are how to perform the work.** Class naming is a standard. Hanging a truss is a guide.

**Does a new folder deserve to exist?** One question: *can you name every sibling it will ever have, today?* If yes, folder. If it is open-ended, it is a front-matter field instead.

---

## Front matter

Every document opens with this. The tree is only as findable as its worst-tagged file.

```yaml
---
title: Week 1 — Reading the Plot
type: handbook
package: head-electrician
sequence: 1                 # only where order matters

domain: theatre             # theatre | business | personal | academic
department: electrics       # electrics | scenic | props | costumes | stage-management
discipline: lighting        # lighting | audio | video — lives under department
role: head-electrician
venue: smith-theatre        # omit when it does not matter

audience: department-heads
status: draft               # draft | review | active | superseded
last_verified: 2026-07-29
---
```

**Why the taxonomy is here and not in the folder path:** electrics covers lighting, audio, and video. A folder would force you to pick one. A field lets both be true, and re-tagging is a text edit instead of a file move that breaks every link to it.

**`last_verified` is the date someone actually checked the content**, not the date the file was touched. Copying a file is not verifying it. This is the only defense against prose that looks authoritative forever while being quietly wrong.

---

## Rules

- **Kebab-case, lowercase.** Folders and files.
- **Zero-pad sequences.** `week-01`, not `week-1`. Otherwise it sorts 1, 10, 11, 2.
- **One document per unit.** One week, one standard, one program. Never a file that accretes.
- **Split past ~15KB.** A file nobody reads whole is a file nobody edits safely.
- **Every package has a `README.md`** listing its documents in order. The index is what makes the rest findable.
- **Nothing here asks a question.** Questions go to the ClickUp log; findings stay here. If a passage expects a reply, it is misfiled.
- **Superseded content gets marked, not deleted.** `status: superseded` plus a pointer to what replaced it.
- **No `index.html`. No viewer. Ever.** An app whose only job was rendering a repo markdown file got built, maintained, versioned, and deleted as redundant. This repo is content.

---

## Where things live

**This repo holds SOURCE** — authored text that gets edited, diffed, and re-delivered.

**FileMaker holds RECORDS** — signed forms, dated acknowledgments, anything tied to a person or a production. An FMP record may carry a path into this repo. **The repo never holds a copy of a record.**

**ClickUp keeps its work:** tasks, lists, chat, decision logs, audit pages.

**Numbers:** if you would put it on a drawing, it lives in the model. If you would tell it to a new hire on their first walk, it lives here.

---

## Private

This repo is private and Michael is the only way anything leaves it. Write freely.
