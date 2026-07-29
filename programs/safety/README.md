---
title: Safety Programs
type: program
package: safety
domain: theatre
department: all
audience: all-personnel
status: in-migration
last_verified: 2026-07-29
---

# Safety Programs

The programs people are asked to read and sign. **One file per program.**

| Program | Source date | State |
|---|---|---|
| [Personal Protective Equipment](./ppe.md) | 2025-08-13 | ✅ converted (pilot) |
| Accident & Injury | 2026-02-05 | ⭕ `.docx` only |
| First Aid | 2026-02-05 | ⭕ `.docx` only |
| Fire Prevention & Mitigation | 2025-08-12 | ⭕ `.docx` only |
| Key & Swipe Access | 2025-03-11 | ⭕ `.docx` only |
| Housekeeping | 2025-02-02 | ⭕ `.docx` only |
| Ladder & Scaffold | 2025-02-02 | ⭕ `.docx` only |
| Manually Lifting Loads | 2025-02-02 | ⭕ `.docx` only |
| Proper Attire | 2025-02-02 | ⭕ `.docx` only |
| Emergency Handbook | 2025-02-02 | ⭕ `.docx` only |
| Todd Facility | 2025-01-27 | ⭕ `.docx` only |
| MEWP (×3: authorized use · training · observation) | 2025-02-10 | ⭕ `.docx` + attachments folder |

**Sources:** `/URITP SOPs/` in Dropbox. **Nothing there has been deleted or changed.**

---

## One file per program, not a folder

The question came up whether each program should be a folder with a file per section — `DEFINITIONS`, `SCOPE`, `PROCEDURE`. **The PPE conversion answered it: no.**

**The whole PPE program is about 1.5KB of prose.** Split across four section files that averages under 400 bytes each. That is not compartmentalizing, it is confetti — and every one of those files would need its own front matter, roughly doubling the file's total weight with metadata.

**And the real sections are not definitions, scope, and procedure.** PPE's actual shape is *responsibility statement → what is available and where → what is required for which task → signature*. Generic compliance-boilerplate headings would be an imported skeleton that does not match what these documents say.

**A program is also signed as a whole.** The signature block is at the bottom of the document, not per section. You cannot sign section three.

**A program becomes a folder when it grows COMPANIONS, not sections.** That already happened in Dropbox: `MEWP Program/` is a folder because it carries an `additional resources` subfolder, and PPE has a sibling `[PERSONAL PROTECTIVE EQUIPMENT]` folder. **Attachments and appendices earn a folder. Headings never do.**

---

## The section template

Headings are the compartments. GitHub builds a table of contents from them automatically, so you get the navigation without the folder.

```markdown
# Safety Program: <Name>

<Responsibility statement — one or two lines. This is the scope.>

## <The substance>

<Whatever this program actually says. A table where it is a table,
steps where it is steps. Do not force it into a shape it does not have.>

## Acknowledgment

<What the form captures. The blank form and signed returns live in ClickUp.>
```

**Do not add a section a program does not need.** An empty `DEFINITIONS` heading is worse than no heading — it implies something was considered and left out.

---

## 🔑 The `.docx` format was hiding the scale

This is the sharp finding, and it is the direct answer to *"understand scale of each program."*

**Every one of the fifteen `.docx` files is between 145KB and 151KB.** They are indistinguishable by weight, so the file listing tells you nothing about which programs are substantial and which are a paragraph. **PPE is one of the largest at 150.8KB and its actual content is 1.5KB** — roughly **99% Word overhead.**

**Converting to markdown makes scale visible for free.** A 1.5KB program and an 8KB program look different in the file list, in the diff, and in the reading. **No folder structure was ever needed to see scale; the old format was just concealing it.**

---

## What is broken in this pipeline

Carried forward so it does not get lost in the conversion:

- **`Ladder Safety` is a dropdown option in ClickUp with no policy, no blank form, no submission, and no task anywhere** — while `LADDER & SCAFFOLD Program.docx` sits in Dropbox. The content exists and was never brought into the chain. **Ladders are the highest-frequency real hazard in a scene shop.**
- **There is no denominator.** Eight signed submissions all link correctly to CRM people, but nothing lists who is *required* to complete a program. The system can prove who was trained and can never answer *"is everyone trained?"* **That is a records problem — FileMaker's lane, not this repo's.** Do not solve it with a list in markdown.
- **`Date Approved` is empty on all eight submissions**, and the field is defined twice. The review step was designed, built twice, and never used.
- **The pipeline stopped being fed on 2026-06-09.** Thirteen programs were written that evening between 6:02 and 9:00 PM. The two written since — Hot Work (06-11) and Theatrical Weapons (06-24) — got no blank form. **Seven weeks, nothing.** The likeliest cause is authoring cost: cloning a Word template and rebuilding formatting is expensive, and markdown is not.
- **Three naming systems for the same three MEWP items.** The policy says *Authorized Use / Training / Observation*, the templates say *Part 1 / 2 / 3*, the dropdown says *pt 1 / 2 / 3*. **Pick one at conversion time** — renaming later means touching three surfaces.
- **`related programs:` is empty in every source document.** A cross-reference mechanism was designed and never filled. In markdown it is a `related:` front-matter field that becomes real links.
