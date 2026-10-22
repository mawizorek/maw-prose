---
id: TEMPLATE-class
name: "Band-Leaf"
parent: TEMPLATE-class-band
type: class
status: gap
visibility: on
use: "one line. what belongs in this class, and nothing else."
---

# Band-Leaf

Prose is **optional**. Delete this whole body and the file is still complete.

Write it only when there is something a person would otherwise have to ask you: why the class is split the way it is, what bites you, what it is deliberately NOT for.

<!--
KEYS

id         stable, kebab-case, unique in this file folder. The @id link target.
           Never renamed once anything links to it.

name       the EXACT class name as it must appear in the .vwx. Verbatim,
           including delimiters, spacing and case. This is the one key the
           reconcile pass matches on.

parent     the `id` of the band above this one. Omit on a top-level band.

           🔴 Vectorworks derives hierarchy from the NAME delimiter, so
           `Steel-Pipe` is already a child of `Steel` as far as the file is
           concerned. If `parent:` disagrees with the name, the renderer
           paints it RED, and it means exactly one thing: this class was
           re-banded here and never renamed in the file.

status     public  the line is written and trustworthy
           draft   written, not ratified
           gap     frontmatter only. A COMPLETE record. Amber, not an error.

visibility default visibility in the base file: on | off

use        ONE line, and it is the load-bearing key. It exists so a designer
           can decide whether their object belongs here WITHOUT asking you.
           If it does not do that, it is not written yet.
-->

## Attributes

🚫 **Not frontmatter keys.** Fill, pen, line weight, line type and texture go in a sibling `.tsv` declared under `data:`, or they are omitted entirely and reported as a gap.

There are too many of them, most are inherited, and **a blank frontmatter key reads as a decision** rather than as missing information.

⚠️ Default class attributes are a **recorded gap** on the Smith tree. Leaving this section out is correct until someone reads them off the file.
