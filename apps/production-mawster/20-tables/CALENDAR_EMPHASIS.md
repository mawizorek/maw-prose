---
id: table-calendar-emphasis
title: CALENDAR_EMPHASIS
type: reference
status: public
order: 10
revised: Aug 2026
summary: N typed callouts per calendar. Replaces the fixed highlight/lowlight pairs.
---

# CALENDAR_EMPHASIS

!!! abstract "Grain"
    One callout on one calendar. A new KIND of emphasis is a ROW, never a schema change.

Replaces `HIGHLIGHT_Start/End` + `LOWLIGHT_Start/End` on PRODUCTION_CALENDARS. "Highlight" and "lowlight" were never concepts, just the first two rows Michael happened to need.

## Two anchor modes

| `AnchorMode` | Range comes from | Use |
|---|---|---|
| `range` | typed `DateStart` / `DateEnd` | spring break, a residency, dark days |
| `event` | matched EVENTS rows via `fkStandardEvent` | Designer Run, Q2Q, load-in |

⭐ **`event` mode is the one that survives a reschedule.** "Highlight Designer Run" resolves through EVENTS at render time, so when the run moves, the emphasis moves. A typed range would silently point at the old date.

- `event` mode matches **every** event of that type in the production, so "all designer runs" is ONE row, not one per instance. This is the honest answer to recurrence: it works when the recurrence is a real event type, not when it is "every Monday."
- Cost, stated plainly: **two resolution predicates, one priority ladder.** `range` resolves date-between; `event` resolves through the workday's events. Same sort, same winner rule, two relationships.
- `PadBefore` / `PadAfter` extend an anchored emphasis outward in days (tech week = Q2Q anchored, padded back 3).

## Resolution rule (the load-bearing part)

**Overlap is the NORMAL state**, not an edge case — tech week sits inside the rehearsal block, opening weekend sits inside tech.

1. Highest `Priority` wins.
2. Tie → **narrowest range wins.** The specific thing is almost always the thing you meant to call out.
3. Resolved LIVE through a sorted relationship from WORKDAYS (sorted `Priority`, then span). Not stamped: stamping would mean regenerating 68+ workday records to change one colour.

**Convention that makes `Priority` easy:** the academic calendar always loses to the production calendar visually. Spring break greyed *under* tech week red, never the reverse. Set academic rows low (`10`) and stop thinking about it. Increment by 10.

⚠️ **A day with two claims prints ONE colour.** `MatchCount` exists so the layout can mark a contested day instead of silently dropping the loser.

## Not supported in v1

- **Half-day emphasis.** Grain is the day. Ruled out by Michael.
- **Calendar-shape recurrence** ("every Monday is dark"). Hand-enter the rows; accept that a one-week shift invalidates all of them. `event` mode covers the cases that are really event types.
- **Derived cross-production emphasis** (greying another show's load-in on a shared stage). Type the range for now. This is the most likely v2 ask.

## Guards

- `DateEnd` ≥ `DateStart`. An inverted row matches nothing and reads as a broken feature.
- Range must fall inside the calendar's bounds (`Calendar_START` → last week's end). Wrong-year entry is the boring failure that costs twenty minutes.

## Seams

- `fkStyle` → STYLES, domain `emphasis`. Emphasis never hardcodes a colour.
- `Label` is not decoration: it is **what makes a printed legend possible.** The legacy file had no legend, so every colour on the 11x17 was tribal knowledge.
- `HIDE` deliberately did NOT move here. Hide changes which records EXIST in the found set; emphasis only styles records that are already there. Different verb, so hide stays a stamped flag on WORKDAYS driven by a range pair on the calendar. ⚠️ The names "hide" and "lowlight" sound like one idea at two strengths and are built differently on purpose.
- ⚠️ **Lineage tradeoff:** live resolution means reprinting an old PRINT_SESSIONS row renders with TODAY's emphasis rows, not the ones in effect at print time. Accepted; the paper was never authoritative.
- 🪦 Legacy scripts `checkHIGHlight` / `checkLOWlight` are replaced by this relationship. `checkHideWorkday` survives.

## Fields

See [CALENDAR_EMPHASIS.tsv](./CALENDAR_EMPHASIS.tsv).
