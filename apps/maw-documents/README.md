# MAW Documents

*The FileMaker solution that holds Michael's personal library and paperwork archive.
Single-user, local-first. Unbuilt as of 2026-09-16.*

Start at [OPEN-ME.md](./OPEN-ME.md).

## What is true about this application

It is a **personal digital library, a document repository, and a file logistics layer**,
in that order of emphasis. The library engine sits underneath and binder-style lenses sit
on top: `Global`, `URITP`, `Teaching`, `Reference` are saved lenses on ONE hub filtered by
context, never separate layout families. That was ruled in May 2026 and re-confirmed in
July when a casual use of the word "window" made it look reversed. It was vocabulary,
not intent.

The architectural claim the whole thing rests on is a **three-layer grain split**, and it
is the one thing that must not be collapsed:

- a **document** is the intellectual work — *Uva's Rigging Guide* exists
- a **variant** is a stream of that work — clean, annotated, source scan, extracted text
- a **file version** is one stored payload — v1, v2, the replacement scan

A fourth layer arrived on 2026-09-16 and it sits between document and variant for
physical things: a **copy** is the object you actually hold. That is the layer a purchase
attaches to, the layer a loan attaches to, and the layer that makes "I bought this book on
this date" expressible at all. You cannot buy a title.

## Books are documents

There is no separate library file, and there was almost one. The design already covered
it: `textbook` and `reference PDF` were day-one document types, a document-people join was
already planned, and the hub layout has been called `h_DocLibrary` since June. The ClickUp
interim list is literally named *DOCUMENTS / TEXTS / BOOKS*.

A book is a document with better metadata. Those extra facts — ISBN, publisher, edition,
page count, call number — live on a 1:1 extension, not as columns on the parent, because
twenty bibliographic fields on `Documents` would sit empty on every scanned packing slip.

## Where the real library-science borrowing happened

Three ideas were taken deliberately, and knowing which is which matters when someone
later proposes changing one:

- **The contributor role lives on the relationship, not the person.** This is MARC's
  relator code in `$e`/`$4` and BIBFRAME's `bf:Contributor` — one agent plus one role,
  together, on the resource. It is not a stylistic choice; it is what every cataloguing
  standard does, because a person is an author here and an editor there.
- **`People` and `Organizations` are AUTHORITY records.** Name authority control (LCNAF,
  VIAF) is the reason the tables exist at all: *Penny, Louise* and *Louise Penny* must
  resolve to one row, or every count and every report is quietly wrong.
- **The copy is the FRBR/LRM Item.** Circulation, condition and location attach there.

And one place the professional pattern was deliberately **rejected**: every real ILS keeps
the patron file separate from the name-authority file. Correct for an institution, wrong
here — the colleague who borrows your rigging guide may be a contributor on something
else, and two people tables fork one human into two rows.

## What this app refuses to be

- **Not HML's document home.** HML servicing documents live only in the HML app and never
  enter this archive. What may live here is real-estate-LLC **templates** — blank forms,
  letterheads, boilerplate. A template belongs to nobody and is reused; a record belongs
  to one loan and is evidence. They look identical on disk and are opposite kinds of
  thing. Never let a template and an executed copy share a table.
- **Not a personal-finance app.** The purchase ledger records what you paid for a book. It
  does not track valuation over time, refunds, or currency history.
- **Not URITP People.** This app's `People` is bibliographic and personal-loan scope only.
  URITP People was ruled its own app on 2026-08-07 — *a table with two owners has no
  owner*. If a name has to exist in both, it exists twice, by design.
- **Not a tag soup.** Controlled contexts, controlled document types, controlled subjects.
  Free text is what makes a library unusable at year three.

## Runtime

⚠️ **FileMaker 19 floor, deliberately, even though this file could be built on newer.**
The engine has to be portable to HML's runtime, which is 19 permanently. That means **no
`Open/Commit/Revert Transaction` anywhere** — those are v20 script steps. Atomicity is
hand-built: every multi-row write goes through ONE relationship from a single parent
record so `Revert Record` discards the set, `Set Error Capture [On]`, `Get(LastError)`
after every step, and no `Commit Records` inside the block.

Portable by construction. That is the entire point of this app being the reference
implementation.
