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

### Calculation

`countNumDocuments` — Number, unstored. Counts related property documents.

```
GetAsNumber (
  ExecuteSQL (
    "SELECT COUNT(PrimaryKey) FROM Documents WHERE fkProperty = ?" ;
    "" ; "" ; PrimaryKey
  )
)
```

This is the one calc in the app whose text lives in a table note rather than a `.fmcalc` file, because it is four lines and it exists to illustrate the SQL table-name dependency: the query says `Documents`, so it breaks silently the day that table is renamed. `ExecuteSQL` returns nothing rather than erroring on a bad table name, which is why table names get locked before any SQL is written.

## Relationships

`fkDocuments` points at `Documents` and `fkBorrower` at `Organizations`, both many-to-one and both under review. `Loans.fkProperty` points back here, and that one is locked.

## Open

Enumerate the real property fields from the file. Re-check the four under-review foreign keys, since each one predates the loan re-homing. Verify no loan-owned terms have drifted back onto this table — that is the specific regression this design invites.

The legacy `PropertyExpectations` calc layer is believed to fold into the `Loans` calcs. Believed, not confirmed.
