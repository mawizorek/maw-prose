# Safety Programs

The programs people are asked to read and sign. **One file per program.** Sources are the Word originals in `/URITP SOPs/` on Dropbox, none of which have been deleted or changed.

**[Personal Protective Equipment](./ppe.md)** is converted — the pilot, source revised August 2025.

Still Word-only, with the source revision date so you can see how stale each one is: **Accident & Injury** and **First Aid** (both February 2026, the freshest of the set) · **Key & Swipe Access** (March 2025) · **Fire Prevention & Mitigation** (August 2025) · **Housekeeping**, **Ladder & Scaffold**, **Manually Lifting Loads**, **Proper Attire** and **Emergency Handbook** (all February 2025) · **Todd Facility** (January 2025) · and the three **MEWP** programs, authorized use, training and observation (February 2025), which live in a folder because they carry an additional-resources sidecar.

## How a program is written

Prose, not tables. These read like notes from someone who knows the building, because that is what they are, and a lookup table is a worse version of that even when the content is technically the same.

Open with a one-line italic note saying it is a signed program, where the source came from, and how old that source is. Then the responsibility statement in a sentence or two — that is the scope, and it does not need a heading calling itself SCOPE.

After that, whatever the program actually says, in the shape it actually has. PPE happens to be *what we stock and where it lives* then *minimum PPE by activity*, because that is how PPE works. Another program will have a different shape. **Do not force a program into an inherited skeleton, and do not add a heading for a section the program does not have** — an empty DEFINITIONS heading is worse than no heading, because it implies something was considered and left out.

Close with an acknowledgment paragraph naming what the form captures, and then a short notes-on-this-file paragraph: when it was converted, what changed in the reorganizing, and what is still missing.

**No YAML front matter.** GitHub renders it as a table at the top of the file, which is exactly the thing we are getting away from. Put the same facts in the opening line where a person will actually read them.

## One file per program, not a folder

The question came up whether each program should be a folder with a file per section — DEFINITIONS, SCOPE, PROCEDURE. Converting PPE answered it.

The whole PPE program is about a page and a half of prose. Split four ways that is a few hundred words per file, and every one of those files would need its own header. **The scaffolding would outweigh the content.**

Beyond size, the generic headings are not the real sections. PPE's actual shape is a responsibility statement, then what is available and where, then what is required for which task, then a signature. Compliance boilerplate would be an imported skeleton that does not match what these documents say.

And a program is **signed as a whole**. The signature block sits at the bottom of the document. Nobody signs section three.

**A program earns a folder when it grows companions, not sections** — and that has already happened naturally in Dropbox. `MEWP Program/` is a folder because it carries an additional-resources subfolder, and PPE has a `[PERSONAL PROTECTIVE EQUIPMENT]` folder beside it. Attachments and appendices earn a folder; headings never do.

## The format was hiding the scale

This is the sharp part, and it answers the *understand scale of each program* half of the question.

**Every one of the fifteen Word files is between 145KB and 151KB.** They are indistinguishable by weight, so the file listing tells you nothing about which programs are substantial and which are a paragraph. **PPE is one of the largest at 150.8KB and its actual content is about 1.5KB** — roughly 99% Word overhead.

Converting to markdown makes scale visible for free, in the file list and in the diff and in the reading. No folder structure was ever needed for that. Word was just concealing it.

## What is broken in this pipeline

Carried forward so it does not get lost in the conversion.

**`Ladder Safety` is a dropdown option in ClickUp with no policy, no blank form, no submission, and no task anywhere** — while `LADDER & SCAFFOLD Program.docx` sits in Dropbox. The content exists and was never brought into the chain. Ladders are the highest-frequency real hazard in a scene shop, which makes this the gap worth closing first.

**There is no denominator.** Eight signed submissions all link correctly to CRM person records, and the email-matching agent even survived a respondent misspelling her own name. But nothing anywhere lists who is *required* to complete a program, so the system can prove who was trained and can never answer *is everyone trained* — the only question that matters if something goes wrong. That is a records problem and belongs in FileMaker, not solved with a list in markdown.

**`Date Approved` is empty on all eight submissions**, and the field is defined twice. The review step was designed, built twice, and never once used.

**The pipeline stopped being fed on 9 June 2026.** Thirteen programs were written that evening between 6:02 and 9:00 PM, and every policy from that burst got a blank form. The two written since, Hot Work on 11 June and Theatrical Weapons on 24 June, got nothing. Seven weeks, no new forms. The likeliest cause is authoring cost: cloning a Word template and rebuilding formatting is expensive, and markdown is not.

**Three naming systems for the same three MEWP items.** The policy says authorized use, training, and observation. The templates say Part 1, Part 2, Part 3. The dropdown says pt 1, pt 2, pt 3. Pick one at conversion time — renaming later means touching three surfaces.

**`related programs:` is empty in every source document.** A cross-reference mechanism was designed and never filled in.
