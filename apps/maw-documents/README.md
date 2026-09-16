# MAW Documents

*Michael's personal library and paperwork archive, in FileMaker. Single-user, local-first.
Unbuilt as of 2026-09-16.* Start at [OPEN-ME.md](./OPEN-ME.md).

## What it is

A **personal digital library, a document repository, and a file logistics layer**, in that order
of emphasis. Library engine underneath; `Global`, `URITP`, `Teaching`, `Reference` are saved
lenses on ONE hub filtered by context, **never separate layout families.**

It rests on a **grain split** that must not be collapsed:

- a **document** is the work — *Uva's Rigging Guide* exists
- a **variant** is a stream of it — clean, annotated, source scan, extracted text
- a **file version** is one stored payload — v1, v2, the replacement scan
- a **copy** is the object you hold — purchases and loans attach here

🔴 **You cannot buy a title.** That is why the copy layer exists.

## Books are documents

No separate library file. `textbook` and `reference PDF` were day-one document types, the
document-people join was already planned, and the hub has been called `h_DocLibrary` since June.
Extra book facts (ISBN, publisher, edition, pages, call number) live on a **1:1 extension**, not
as columns on the parent.

<!-- AGENT NOTE · how close this came to being two apps.
A separate MAW Library file was nearly built. The answer was already sitting on a design page
under a DIFFERENT NAME, which is exactly why the question read as open in June. Building it
would have rebuilt document/variant/version a second time — the cloned-engine drift cost this
log already recorded as the known price of the HML fork.
-->

## Where the library-science borrowing is real

Three ideas taken deliberately. Knowing which is which matters when someone proposes changing one:

- **The contributor role lives on the relationship** — MARC's relator code in `$e`/`$4`,
  BIBFRAME's `bf:Contributor`. Not a style choice: it is what every cataloguing standard does.
- **`People` and `Organizations` are AUTHORITY records** — name authority control (LCNAF, VIAF)
  is the whole reason they exist. *Penny, Louise* and *Louise Penny* must be one row.
- **The copy is the FRBR/LRM Item** — circulation, condition and location attach there.

<!-- AGENT NOTE · the pattern deliberately REJECTED.
Every real ILS keeps the patron file separate from the name-authority file. Correct for an
institution, wrong here: the colleague who borrows your rigging guide may be a contributor on
something else, and two people tables fork one human into two rows. One People authority; the
loan carries the role.
-->

## What it refuses to be

- **Not HML's document home.** HML servicing documents live only in the HML app. This archive may
  hold real-estate-LLC **templates** — blank forms, letterheads. 🔴 **A template belongs to nobody
  and is reused; a record belongs to one loan and is evidence.** Never one table.
- **Not a personal-finance app.** It records what you paid for a book. No valuation, no refunds.
- **Not URITP People.** That is its own app (*a table with two owners has no owner*). If a name
  must exist in both, it exists twice, by design.
- **Not a tag soup.** Controlled contexts, document types and subjects. Free text is what makes a
  library unusable at year three.

## Runtime

⚠️ **FileMaker 19 floor, deliberately, even though this file could be built on newer.** The
engine must be portable to HML's runtime. **No `Open/Commit/Revert Transaction` anywhere** —
those are v20 steps.

<!-- AGENT NOTE · the hand-built atomicity contract, in full.
Every multi-row write goes through ONE relationship from a single parent record so Revert Record
discards the set; Set Error Capture [On]; Get(LastError) after EVERY step; no Commit Records
inside the block. Portable by construction — that is the entire point of this app being the
reference implementation, and it is why native transactions stay out even if the file lands on a
newer runtime.
-->
