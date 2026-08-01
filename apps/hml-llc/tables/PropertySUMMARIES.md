# PropertySUMMARIES

*Collateral table. 🔨 BUILT · verified in file 2026-07-15. Field register reconciled 2026-07-31.*

**Grain: one piece of real collateral.** Not a deal, not a loan. That distinction is the single most important thing on this page, because this table used to be the financial parent and is not any more — loan terms, rates, maturity and servicing status were all re-homed onto `Loans` in June 2026. A property can secure several loans, and the fixture proves it: `PROP-001` carries two.

It remains the property-first navigation hub, which is worth stating because it explains the shape of the app. The schema is loan-first; the way a person moves through it is property-first. Those are allowed to disagree, and the `Loans` portal on the property hub is what reconciles them — without it a property reads as an orphan, since its loan terms no longer live here.

## Fields

| Field | Type | Key | Category | Status | Notes |
|---|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | | |
| CreationTimestamp | timestamp | audit | audit | | |
| CreatedBy | text | audit | audit | | |
| ModificationTimestamp | timestamp | audit | audit | | |
| ModifiedBy | text | audit | audit | | |
| fkBorrower | text-uuid | fk | key | under review | ownership unclear: property lens or loan servicing |
| fkDocuments | text-uuid | fk | key | under review | a scalar FK where a one-to-many probably belongs |
| fkBalloonNote | text-uuid | fk | key | under review | |
| fkPropertyStatus | text-uuid | fk | key | under review | should resolve to a real status record |
| *property identity + operating fields* | text | plain | identity | not enumerated | address and collateral identity — never read out of the file |

The last row is not a placeholder anybody forgot. It is an honest statement that this table's actual identity fields have never been enumerated from the live file, and writing a plausible-looking address block here would be worse than the gap.

### One calculation, and its status is unresolved

⚠️ **`countNumDocuments` may not exist.** It was documented on this table, and then flagged on 2026-07-16 as absent from the locked schema and possibly phantom — present in an old index, never carried into the canonical field set. It is recorded here because deleting a possibly-real calculation is worse than carrying a flagged one, but **do not treat it as built.** If the live file has it, it needs a real entry alongside the other formula files; if not, it stays dropped.

`countNumDocuments` — Number, unstored. Counts related property documents.

```
GetAsNumber (
  ExecuteSQL (
    "SELECT COUNT(PrimaryKey) FROM Documents WHERE fkProperty = ?" ;
    "" ; "" ; PrimaryKey
  )
)
```

It is also a live example of the SQL naming exposure: the query names `Documents` as text, so it breaks silently the day that table is renamed — returning nothing rather than erroring.

## Relationships

`fkDocuments` points at `Documents` and `fkBorrower` at `Organizations`, both many-to-one and both under review. `Loans.fkProperty` points back here, and that one is locked.

## Open

Enumerate the real property fields from the file. Re-check the four under-review foreign keys, since each one predates the loan re-homing. Verify no loan-owned terms have drifted back onto this table — that is the specific regression this design invites.

The legacy `PropertyExpectations` calc layer is believed to fold into the `Loans` calcs. Believed, not confirmed.
