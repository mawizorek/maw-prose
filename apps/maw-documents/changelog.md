# Changelog

*Structural changes to this documentation set.*

📋 Decision history → [MAW Documents — Decision Log](https://app.clickup.com/36074068/docs/12cwjm-57453/12cwjm-80213)

## 2026-09-16 (v1.2) · Trim pass — verbosity out, reasoning kept

Michael: *"this documentation is VERBOSE."* Correct. Every page rewritten so the **register and the
rule are what you read**, and the argument behind each rule moved into an **HTML comment.**

🔴 **Nothing was deleted.** `<!-- AGENT NOTE -->` blocks are invisible in the reader and in GitHub's
rendered markdown, and fully present in the raw file. **Michael reads the tight version; an agent
opening the file cold gets the whole argument.**

<p></p>

**`docs-viewer.html` → v1.1**, because the idea did not work without a code change: the parser escapes
`<` and `>`, so a comment would have rendered as **visible literal text.** It now strips comments
before parsing, leaves them alone inside code fences, and shows **"N agent notes hidden"** in the
toolbar — hidden, but never secret.

<p></p>

What stayed visible, deliberately: field registers, grain lines, the three schema rules, the FMP19
atomicity steps, PII rules, exit tests, and every open question. **What moved: the war stories.**

### ⚠️ On-disk size is roughly flat, and that is the design

Bytes moved from prose into comments; **the rendered page is what got shorter.** A file-size drop would
have meant content was lost. `schema-notes.md` is the clearest case: 7,079 → 7,114 bytes on disk, and
about **40% shorter to read.**

<!-- AGENT NOTE · the trim rules, so a later pass does not undo this.
WHAT BELONGS VISIBLE: the field register, the grain sentence, the rule itself, anything a builder needs
AT THE KEYBOARD (atomicity steps, PII, exit tests), and every open question.
WHAT BELONGS IN A COMMENT: why a rule exists, what failed before, which surfaces have drifted, the
failure a guard was written against, and any reasoning that only matters if you are about to CHANGE the
rule rather than follow it.
TEST: would Michael, mid-build with FileMaker open, need this sentence to act? If no, comment it.
DO NOT delete a comment to shorten a file. The comments ARE the reason the rules survive contact with
a cold agent who thinks a shortcut looks cheap.
-->

## 2026-09-16 (v1.1) · Doc reader shipped

**`docs-viewer.html`** — renders every markdown page in this tree, sidebar nav, per-page deep links,
in-tree `.md` links resolving inside the reader.
[Open it.](https://mawizorek.github.io/maw-prose/apps/maw-documents/docs-viewer.html)

<p></p>

**A separate tool, not an update to `viewer.html`** (ruled by Michael): that one is a **layout renderer
+ theme sandbox** reading `*.html` wireframe renders. `doc-render-engine` is a third thing, the markdown
publisher. **Three tools, three jobs.**

<p></p>

🔴 **Built without a fallback app root, on purpose.** `viewer.html` hardcodes `apps/hml-llc`, so off
GitHub Pages it silently renders another app's content. This reader errors out instead. **A doc reader
that guesses its own app would show the wrong schema and look like it was working.**

<p></p>

No third-party JavaScript. Discovery is one GitHub trees call; bodies are same-origin fetches of the
deployed file, so **what renders is what shipped.**

### Also fixed

- `tables/PurchaseLines.md` arrows normalized to `→`.
- `OPEN-ME.md` nav re-verified against a live listing.
- **`apps/hml-llc/OPEN-ME.md`** corrected — it named `_viewer.html` (file is `viewer.html`) and omitted
  **eight root files on disk**, so a cold agent concluded `design-decisions.md` did not exist.

### Still open, not mine to close

- ⚠️ **`theme: default-theme` is a placeholder.** No theme assigned; the reader shows it as an amber
  badge rather than pretending. **Needs a slug from Michael.**
- ⚠️ **`viewer.html`'s hardcoded fallback and `DEFAULT_THEME` are unfixed in code**, documented in its
  own package. Harmless where it sits, real on the first copy.
- ⚠️ **Neither viewer is in any app ledger** — `VERSIONS.md` scopes coverage to that repo's root
  folders, so a tool inside a `maw-prose` app package is structurally invisible to it.

## 2026-09-16 (v1.0) · Package opened

Cut on Michael's go-ahead, six weeks after the placement was approved. Seven root files,
`relationships/README.md`, and ten table pages.

**Settled the same day:** books are documents · the contribution join collapsed 2 → 1 ·
`DocumentCopies` became load-bearing (you cannot buy a title) · ledger = header + lines · one
`Organizations` authority · naming locked to J3, with a rival `pk_`/`fk_` convention marked superseded.

<!-- AGENT NOTE · the five same-session corrections, kept because they were ONE habit.
A role or attribute placed on the ENTITY instead of on the RELATIONSHIP:
  1. Organizations.fkOrganizationType demoted from role-carrier to descriptive field.
  2. DocumentCopies.LentTo struck; replaced by CopyLoans.
  3. BibliographicDetails.Publisher changed from text to fkPublisher.
  4. The claim that this tree projects the ClickUp page set — wrong, it mirrors FileMaker's Manage menus.
  5. The claim that the repo should only receive settled schema — wrong. What is barred is ANSWERABLE
     content, not unsettled content.
DELIBERATELY ABSENT: the library spine (pre-J3 naming) and the layouts/scripts/value-lists/calculations/
fixtures directories. Cutting empty stubs would ship the scaffolding and call it the building.
-->
