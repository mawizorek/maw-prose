---
id: theme-template-layout
title: Styled Objects Template (build spec)
type: reference
status: public
order: 23
nav: collapsed
revised: 2026-08-16
summary: Build spec for template | STYLED OBJECTS — one layout holding one instance of every styled role. It is the token inventory, the theme test bench, and the source you copy production objects from.
---

# `template | STYLED OBJECTS` — build spec

> Michael, 2026-08-16: *"we can define in a template page the exact OBJECTS that we need/want on every page and use that to drive which styles we define?"* — yes, and it is the FMP-native twin of the F1 theme object templates already in `FileMaker Home`.

## Why this layout exists — three jobs, not one

1. ⭐ **It IS the inventory.** The objects on this page are the definitive list of styled roles. **Not on the template → not a token.** A layout needing something the template lacks is the moment to decide *new role, or reuse an existing one* — the object library's approval test, enforced by a place instead of a document.
2. ⭐ **It is the theme test bench.** Flip `g_pkCurrentTheme` and every token that resolves wrong is visible on ONE page, instead of hunting four print layouts.
3. ✅ **It is the copy source.** `FileMaker Home` already rules: *production layouts should be copied from the object library, not styled ad hoc.* This gives that rule a home inside the file.

## 🔴 The three rules that keep it useful

- 🚫 **Tokens, not layouts.** Do NOT mock up the calendar grid here. It is a **swatch page** — one instance per role even if five layouts use it. Geometry lives on the real layouts; this page carries appearance only.
- 🚫 **Never in the layout menu.** Same rule as `util_*` layouts. It is a workbench, not a destination.
- ⚠️ **Every object gets an OBJECT NAME matching its token** (Inspector ▸ Position ▸ Name). That is what makes it findable, scriptable, and greppable in a DDR — without names this page is just a pretty picture.

## Layout setup

```
name .......... template | STYLED OBJECTS
show in menu .. NO
base table .... WORKDAYS      ← chosen deliberately, see note
parts ......... Header (chrome roles)
                Body   (record-driven roles)
                Footer (chrome roles)
```

⚠️ **Base table `WORKDAYS`, and the reason matters:** the date roles are the only ones already proven end to end, and WORKDAYS is a projection table so its records are disposable. 🔴 **A styled field only renders on a layout whose context can reach its relationships** — so the EVENT roles need either a portal to `EVENTS_X_WORKDAYS` or a second template layout anchored on EVENTS. **Start with a portal; split to `template | STYLED OBJECTS · EVENTS` only if the graph fights you.**

## ✅ BUILD NOW — the calendar roles

These are live or one step away. Each row is one object.

| Object name | Displays | Size | Status |
|---|---|---|---|
| `tok_date_short` | `calc_DateLabel_Short` | 9 | ⬜ field not built |
| `tok_date_colloquial` | `calc_DateLabel_Colloquial` | 11 | ⬜ |
| `tok_date_display` | `calc_DateLabel_Display` | 14 | ⬜ |
| `tok_event_name` | `EVENTS::calc_EventName_Styled` | 9 | ⬜ needs a portal |
| `tok_emphasis_label` | the holiday / blackout label | 9 | ⬜ token exists (`BLACK`), no appearance row |

⚠️ **All five are the SAME formula** with one line different (`~text = …`). Build one, verify it, duplicate.

⚠️ **Set each object's point size in the Inspector**, per the size-only ruling in [[Vector Grain](@theme-vector-grain)] — size is layout, everything else is data. 🔴 **Size the object taller than the text needs.** A font swap changes width and a bigger theme clips silently in print with no error.

### Chrome roles — defer the decision, not the objects

Place these as **plain text objects** for now, styled with the FMP theme:

```
chr_page_title        the production title
chr_subtitle          calendar name / date range
chr_footer            "printed <date>" + page number
chr_column_header     day-of-week strip
chr_legend_entry      one legend row
```

⭐ **Why plain, not tokenised: chrome has NO record grain**, so there is nothing to join to. A footer looks the same on every page of every production. ⚠️ **Tokenise a chrome role only when a THEME needs to restyle it** — that is a real requirement, and it is not today's. Placing them now means the page shows the whole visual language even where the mechanism is still native.

## 📇 PRELIM · CONTACT SHEET roles

Drawn now so the vocabulary exists before the layout does. 🔴 **Do NOT build the fields yet** — there is **no PEOPLE table** (fix-queue item 16: `ROLES::fkPerson` pointed at nothing and was removed). **These are named holes, not tasks.**

| Object name | Displays | Data-driven? |
|---|---|---|
| `tok_person_name` | full name | ⚠️ probably NOT — see below |
| `tok_person_role` | "Stage Manager" | ✅ likely — department could carry colour |
| `tok_person_dept` | department / section label | ✅ likely — the strongest candidate |
| `chr_contact_detail` | phone / email | 🚫 chrome. no meaning in its appearance |
| `chr_contact_group_header` | "PRODUCTION TEAM" | 🚫 chrome |
| `tok_person_status` | active / released / TBD | ✅ likely — condition, like `calendar` |

⭐ **The useful prediction, and it is the whole reason to write this early: a contact sheet is mostly CHROME.** A person's name does not mean anything different in blue. **Department and status are the only real token candidates** — department is a `kind` (same shape as `monthLabel`) and status is a `condition` (same shape as `calendar`).

⚠️ **So the contact sheet will want a `department` domain and possibly a `personStatus` domain** — domains, never tables. `STYLES.md`: *"Add a domain, not a table."*

🔴 **And the open vocabulary gap already logged in the object library applies exactly here:** document-type labels express **KIND**, `badge_status_*` expresses **CONDITION**, and forcing one into the other is how a family drifts. `department` is kind; `personStatus` is condition. **Two domains, not one.**

## Build order

1. **The three `dateFormat_*` calcs** on WORKDAYS (Text result, stored).
2. **`calc_DateLabel_Short`** — one styled field, the full colour + font + case body. **Verify it renders before duplicating.**
3. **Duplicate it twice** for Colloquial and Display, changing only `~text`.
4. **Cut the layout**, place the three date objects, name each one.
5. **Add the chrome text objects.** Plain, FMP-theme styled.
6. **Flip `g_pkCurrentTheme` to URITP and look.** August and October should change colour; nothing else should move. 🔴 **That is the first real cascade test.**
7. **Only then** add the EVENTS portal and `tok_event_name`.
8. **report-contact-sheet objects: not yet.** Revisit when a PEOPLE table exists.

## ⚠️ Two things this page cannot do

- **It does not test GEOMETRY.** A token that looks perfect here can still clip in a 0.9-inch grid cell. **Print the real layout too.**
- **It cannot show the DEFAULT branch working**, because the default branch is not built on WORKDAYS yet — only `_for_curr_*`. 🔴 Until it exists, a sparse theme renders nothing rather than inheriting, and this page will show that as blank text rather than as an obvious error.

Related: [[Vector Grain](@theme-vector-grain)] · [[Theme State](@theme-state)] · [[Theme Build Order](@theme-build-order)] · [[Event Styling](@theme-event-styling)]
