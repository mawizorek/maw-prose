---
id: table-utility-logs
title: Utility logs
type: reference
status: public
order: 10
revised: Aug 2026
summary: One row per run. Nothing in the file is allowed to happen unrecorded.
data:
  catalog:
    file: UTILITY_LOGS.tsv
---

# Utility logs

!!! abstract "Grain"
    One row per RUN. A file session is a run and a script execution is a run; `vl_Kind` is the only thing that separates them.

!!! data "catalog"

Specced 2026-08-09. ⬜ **Not built in the file.** The script template has depended on this table since it was written, and `INDEX.tsv` has carried it as a gap the whole time.

## Why one table and not two

A file session and a script execution look like different things and they are not. Both start, both end, both either succeed or do not, and both want the same nine columns. Splitting them would duplicate every field to gain one distinction that a single indexed value already makes, and it would turn the most useful question in the table — *what happened during this session* — into a join instead of a sort.

`SessionToken` is what holds it together. The open row mints it, every script run inside that session carries it, and the close row ends it. Sort by token and you are reading one person's afternoon in order.

## The unfinished row is the point

A row with `ts_Start` and no `ts_End` is not a defect in this table. **It is the only crash log the file will ever have.**

FileMaker fires no close trigger on a crash, a force quit, a lost server connection or a killed process. So the close row is best-effort by nature, and treating its absence as an error would mean chasing a bug that is really a power cut. Read it the other way round: the open row is trustworthy, the close row is a bonus, and **every unmatched open row is a session that ended badly and left you a note about it.**

⚠️ Which means `vl_Status = running` is ambiguous forever unless something resolves it. A row saying `running` is either a session happening right now or a session that died in March.

⬜ **The gap that closes it, and it does not exist yet:** a `UTIL · Sweep Abandoned Runs` script, called from `FILE · Open` before anything else, that finds `running` rows whose `SessionToken` is not the current one and stamps them `abandoned`. Cheap, and it converts an ambiguous state into a countable one. Named here rather than written, because nobody asked for it and an unrequested script is a script nobody maintains.

## What must never be written here

🚫 **No record data.** Not a borrower, not a person, not a production title, not a payoff figure. A log is read by whoever is debugging, and a debugging surface is the last place anyone thinks to check before sharing a screenshot. `json_Params` is the loophole to watch: it captures the inbound parameter verbatim, so a script called with a name in its parameter puts that name in the log. Pass keys, never values.

🚫 **No second log table.** `UTILITY_REPORTS` is downstream of this one, per `INDEX.tsv`. It reads these rows; it does not keep its own.

## Fields

See [UTILITY_LOGS.tsv](./UTILITY_LOGS.tsv).

## Relationships

- **`GLOBAL_USE|byLogPK`** — `GLOBAL_USE::g_logPK = UTILITY_LOGS::PrimaryKey`. ⬜ Not built. **`UTIL · Run End` cannot work without it**, and that is deliberate: with the relationship, Run End edits the log row through a global key from an anchor and never runs a find. Without it, every run-close is an `Enter Find Mode`, which the house rules forbid inline for good reason.

## Calculations

### calc_Duration {#calc-calc_Duration}

Unstored [Number]{.calc}, from `ts_Start` and `ts_End`. Seconds a run took.

```
Case (
  IsEmpty ( ts_End ) or IsEmpty ( ts_Start ) ; "" ;
  GetAsNumber ( ts_End ) - GetAsNumber ( ts_Start )
)
```

- Unstored because half of these rows have no end yet, and a stored calc on an empty operand stores the wrong answer rather than no answer.
- Empty is a real result here and means *still running, or never finished*. Do not default it to zero; zero is a run that took no time, which is a different and much less alarming fact.
