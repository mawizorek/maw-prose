# Property Hub (Form View)

Manage → Layouts → Property Hub → View as Form

Context: `PropertySUMMARIES`

The front door. Navigate by property, see its loan(s), drill in.

## Wireframe

```
┌─────────────────────────────────────────────────┐
│  ▓▓ PROPERTY BAR (purple #7B3FA0) ▓▓▓▓▓▓▓▓▓▓▓  │
│  │ Address │ City │ Borrower │ Status │         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─ LOANS (portal) ───────────────────────┐   │
│  │ Loan# | Principal | Rate | Status | Due  │   │
│  │ ─────────────────────────────────────── │   │
│  │ (click row → form-loan-detail)           │   │
│  └───────────────────────────────────────────┘   │
│                                                 │
│  ┌─ DOCUMENTS (portal, deferred v1) ───────┐   │
│  │ Type pill | Name | Date | Version         │   │
│  └───────────────────────────────────────────┘   │
│                                                 │
│  [ side nav: list of all properties ]           │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Portals

| Portal | Table | Relationship | Sort |
|---|---|---|---|
| Loans | Loans | PropertySUMMARIES::PrimaryKey = Loans::fkProperty | OriginationDate desc |
| Documents | Documents | (deferred) | |

## Actions

| Element | Script | Does |
|---|---|---|
| Loan row click | NAV/go-to-loan | navigates to form-loan-detail for that loan |
| Side nav property list | NAV/go-to-property | switches found set to selected property |

## Design tokens

- Property bar: purple `#7B3FA0`, white text
- Page background: cream `#F5F1EA`
- Cards: paper `#FDFCFA`
- Document pills: category-colored chips
- Font: Gabarito (UI), IBM Plex Mono (data)
