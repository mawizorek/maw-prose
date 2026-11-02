---
id: uritp-utilities-build-sheet
title: URITP Utilities build sheet
status: public
type: reference
summary: Last reported Utilities build progress and the checks required before any consumer switches to the hub.
revised: 2026-11
---

# URITP Utilities build sheet

## Evidence boundary

Last reported in-file work is the [November 1 Utilities session](https://app.clickup.com/t/17tuucqrqhq). This sheet was checked against that session and the v1 spec on November 2, 2026. No current DDR or live-file inspection was supplied in this documentation pass. Nothing below certifies the present contents of the file.

## Last reported

On November 1, the session recorded creation of the Utilities file in progress. At 22:12 it reported `sql.Table`, `sql.Field` and the nine json-params custom functions installed. JSONPatch had also been copied; its removal was instructed, not verified.

The table-paste corrections and J23 code changes were specified at 22:14 and 22:18. The field-by-field target was committed at 22:26. The session does not verify completion of those table changes, relationships, scripts, seeding or integration tests.

## Next verification sequence

1. Inspect the current file or a fresh DDR against the table notes and TSV registers. Do not infer completion from the documentation.
2. Confirm JSONPatch is absent and the approved sql/json-params custom functions are present.
3. Test the relative EDS path between separate app folders on Mac and FileMaker Go before wiring consumers. If either fails, use the flat deployment arrangement in the build spec.
4. Verify the schema and relationships, then implement the scripts in the build spec's order.
5. Run vocabulary seed, schema-version check and a preflight with no network call. Check validation and commit errors explicitly.
6. Confirm People's present in-file state and pass Checkpoint 2 before repointing its live sync. Re-pass Checkpoint 2 against Utilities after extraction.
7. Verify Production MAWnster can pull its first event through the same hub.

## Integration constraint

The v1 spec defines `xt_Key` as system Code plus `:` plus `xt_ID`, while GitHub `xt_ID` is a repository-relative file path. That does not distinguish the same path in different repositories under the `github` system. The table note retains the approved formula and names the limitation. Cross-repository GitHub use is not verified and must not be represented as collision-safe.

## Documentation delivered November 2

Renderer-format table notes and matching field registers were authored from the v1 spec, using the People registers only for inherited field types and unchanged calculations. This is reference coverage, not a FileMaker build milestone.
