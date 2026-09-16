# ContributorRoles

Manage → Database → Tables → ContributorRoles

Grain: **one kind of contribution.** Author, editor, translator, illustrator — **and lighting designer,
stage manager, technical director.**

⭐ **A controlled vocabulary borrowed from cataloguing practice** — MARC's three-character relator code,
which BIBFRAME models as `bf:Contributor`. Canonical list:
[id.loc.gov/vocabulary/relators](https://id.loc.gov/vocabulary/relators) · browsable term sequence:
[loc.gov/marc/relators/relaterm.html](https://www.loc.gov/marc/relators/relaterm.html)

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| RoleName | text | Display term: Author / Editor / Lighting designer | | ⚠️ use the MARC term |
| RelatorCode | text | MARC relator code | | ⭐ from id.loc.gov/vocabulary/relators |
| SortOrder | number | Display order in a contributor list | | 🔴 why this is a table |
| IsActive | number | 1 = offered in pickers | | |
| Notes | text | When to use this over a near neighbour | | |

Audit fields → [data-standards.md](../data-standards.md).

## Seed values — bibliographic

| RoleName | RelatorCode | SortOrder |
|---|---|---|
| Author | `aut` | 10 |
| Editor | `edt` | 20 |
| Translator | `trl` | 30 |
| Illustrator | `ill` | 40 |
| Photographer | `pht` | 50 |
| Compiler | `com` | 60 |
| Author of foreword | `aui` | 70 |
| Annotator | `ann` | 80 |
| Arranger | `arr` | 90 |

## Seed values — theatre and production

⭐ **The vocabulary already covers a production roster**, which is the reason this borrow pays off twice.
All codes below **verified against the LOC term sequence, 2026-09-16** — none inferred.

| RoleName | RelatorCode | SortOrder | Note |
|---|---|---|---|
| Director | `drt` | 200 | general management + supervision of a performance |
| Artistic director | `ard` | 210 | controls artistic style of a whole production |
| Stage manager | `stm` | 220 | |
| Technical director | `tcd` | 230 | |
| Lighting designer | `lgd` | 240 | "designs the lighting scheme for a theatrical presentation" |
| Costume designer | `cst` | 250 | |
| Choreographer | `chr` | 260 | |
| Musical director | `msd` | 270 | |
| Conductor | `cnd` | 280 | |
| Composer | `cmp` | 290 | |
| Librettist | `lbt` | 300 | libretto of an opera or other stage work |
| Lyricist | `lyr` | 310 | non-dramatic musical work |
| Actor | `act` | 320 | |
| Dancer | `dnc` | 330 | |
| Vocalist | `voc` | 340 | |
| Narrator | `nrt` | 350 | |
| Makeup artist | `mka` | 360 | |
| Audio engineer | `aue` | 370 | technical aspects of sound: record, mix, reproduce |
| Mixing engineer | `mxe` | 380 | |
| Music copyist | `mcp` | 390 | |
| Adapter | `adp` | 400 | modifies a work for a different medium or audience |
| Designer | `dsr` | 410 | ⚠️ the generic fallback — see below |
| Restager | `rsg` | 420 | |
| Casting director | `cad` | 430 | |
| Art director | `adi` | 440 | ⚠️ film/TV term: oversees set builders |
| Minute taker | `mtk` | 450 | ⭐ production meeting notes |

⚠️ **Look codes up rather than guessing.** They are mnemonic but not derivable (`msd` musical director,
`mka` makeup artist), and **a wrong code is worse than none because it looks authoritative.**

## ⚠️ Where the vocabulary runs out

🔴 **There is no scenic designer, set designer, props supervisor, sound designer or dramaturg term that
this pass could verify.** `dsr` (designer) is the generic fallback and `adi` (art director) is a film
term about supervising set builders, not a scenic design credit.

**Do not invent a code.** An unlisted role uses `RoleName` with an **empty `RelatorCode`** — that is a
honest gap, and a fabricated three-letter code is indistinguishable from a real one forever.

<!-- AGENT NOTE · provenance, the absence caveat, and why the theatre half matters beyond this app.
SEEDED 2026-09-16 after Michael found id.loc.gov/vocabulary/relators and it closed the OPEN item this
file already carried ("theatrical roles have MARC codes too — worth seeding once production paperwork is
in the archive"). Every code above was read off loc.gov/marc/relators/relaterm.html plus the code
sequence page in the same session; none was inferred from the code-structure rule.
THE ABSENCE IS DECLARED, NOT PROVEN. The term-sequence page truncated on fetch mid-alphabet, so
"there is no scenic designer term" means THIS PASS COULD NOT FIND ONE, not that LOC lacks one. Anyone
who needs certainty should download the full SKOS/JSON dump from id.loc.gov rather than trust this line.
LOC also adds terms on documented request, which is a real option for a genuinely missing theatre role.
WHY IT MATTERS WIDER: production paperwork credits the same roles over and over across shows, and URITP
contact sheets already carry role titles as free text. A standard vocabulary with codes is the obvious
normalization target for those — but that is a URITP/Milo scope call, NOT a MAW Documents build step,
and the two apps must not silently share a table. Flagged, not proposed.
SortOrder leaves gaps of 10 and jumps to 200 for the theatre block on purpose: inserting a role later
is a row, never a renumber.
-->

## 🔴 Why a table, not a value list

App-wide rule: **if the thing needs an attribute beyond its display label, it is a table.** A role
carries a relator code and a display order. A value list can hold neither.

## 🚩 The name is load-bearing

This was `PEOPLE_ROLES`, and **that name caused the wrong schema.** *"People roles"* reads as *roles a
person has* — a claim about people — so a person+role pair table looked obvious. **Renamed, the extra
join stops looking necessary on sight.**

🚩 **Do not add a person FK to this table.**

<!-- AGENT NOTE · the full failure the rename fixed, and one open item.
A contribution role is a property of the CONTRIBUTION, not of the person: Uva is the author of one
book and could be the editor of another. The pair table cost three things — the same person+role pair
could exist twice, per-work attributes (billing order, "translator of the 2nd edition") had nowhere to
live, and every contributor read took two hops for no gain. The rename was the fix; collapsing the
join was the consequence.
OPEN: a person credited in two roles on one work is TWO DocumentPeople rows. Costs nothing. Noted so
nobody invents a compound role value like "author/illustrator" instead. The theatre block makes this
likelier, not less — one person is routinely LD and TD on a small show.
-->

FK map → [relationships/README.md](../relationships/README.md)
