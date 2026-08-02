# Updating Contact Sheets
> Track who's on a production and how to reach them. Cross-platform sync target.

## What It Is
One doc per production listing cast, crew, staff with roles, emails, phones, pronouns, emergency contacts.

## Who Maintains
- **Created by:** Nigel (Word/PDF via Dropbox)
- **Kept current by:** PM, with updates from SM and department heads

## Where It Lives
| Platform | Path Pattern |
|----------|-------------|
| Dropbox | `productions/z[YY-YY]/[show]/_contact sheet/` |
| ClickUp | Personnel fields on production task + People list |

## Fields
- Name, role, pronouns
- Email, phone
- Emergency contact
- Department/area
- Equity status (if applicable)

## Update Triggers
- Cast/crew assignment or change
- Contact info correction (email, phone, address)
- Personnel departure or replacement
- Role reassignment

## Cross-References
When you update contacts, also check:
- **Info sheet** (personnel section mirrors this)
- **Crew calls** (names/roles pulled from here)
- **Email distribution lists** (if maintained separately)

## Audit Checklist
- [ ] All names match across contact sheet, info sheet, crew call header
- [ ] No stale entries from previous cast/crew
- [ ] Emergency contacts present for all cast
- [ ] Dropbox PDF matches current Word doc version

---

see also: `updating-production-calendars.md` · `updating-info-sheets.md`

---
<!-- ═══ MAW PROSE (original notes, preserved) ═══ -->

Each production spreads calendar info across multiple platforms. This is the source of truth for what those platforms *are* and pointers for the current season productions versions.

# The goal:
- make CLICKUP the ~working surface~ while the interfaces below are SERVED by and audited agains them. ClickUp is Michael's private sandbox, but critically also the theoretical source of truth.
- Live clikcup moves *never* directly push to external surfaces. No direct google calendar edit integration from tasks. We create TASKS that mimic the google calendar and sync privately to compare events.
- BUT ideally all paperwork, email templates, and reports can be independently pulled from and served via ClickUp. Think re-creating the info sheet or contact sheet as ClickUp views - or more stabley, we will use api to pull record info and 'live' data into Filemaker via request. 

# Surfaces
( These are the PLATFORMS that we interact with and who controls them and why they exist. )

## Word Docs (PDFS)
( Personal standard: default to sending and serving PDFs while Word dox remain internal and shared more directly. Shared dropbox is fine to hold these word dox but emailing a file out should typically be in pdf.

### Info Sheets
Nigel makes them; others to help keep them up to date (PM).


# Default Structure

see also: updating-production-calendars.md
