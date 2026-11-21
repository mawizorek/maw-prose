#!/usr/bin/env python3
"""Put an app's tables on the clipboard as FileMaker tables (XMTB).

    python3 tools/fmp/fmp-tables.py apps/uritp-utilities            # all tables
    python3 tools/fmp/fmp-tables.py apps/uritp-utilities xt_RECORD  # some tables
    python3 tools/fmp/fmp-tables.py apps/uritp-utilities --out x.xml # file, no clipboard

Then: Manage Database > Tables tab > Cmd-V.

Source = apps/<app>/schema/<TABLE>.tsv (one file per table, filename = table name).
Columns: Field_Name, Type, Options, Notes, status. Notes become field comments.

Options grammar (semicolon-separated):
  audit            captured FileMaker audit field (PrimaryKey, Creation*/Modification*)
  key              not empty + unique + strict + validate always + indexed + raw
  fk               not empty + indexed + raw
  not empty | unique | strict | always | indexed | raw
  auto <value>     auto-enter constant
  calc: <expr>     auto-enter calculation, replaces existing value (must be last)
Anything else is NOT pasted and is listed loudly, so a table never pastes silently short.
Every XML shape here was copied from a real FileMaker clipboard (11-21-2026, URITP Utilities).
"""
import os, re, subprocess, sys
from xml.sax.saxutils import escape

HERE = os.path.dirname(os.path.abspath(__file__))
TYPES = {"text": "Text", "number": "Number", "timestamp": "TimeStamp", "date": "Date", "time": "Time"}

def audit_templates():
    xml = open(os.path.join(HERE, "audit-fields.xml"), encoding="utf-8").read()
    return {re.search(r'name="(\w+)"', f).group(1): f for f in re.findall(r"<Field .*?</Field>", xml)}

def field_xml(table, fid, name, dtype, opts, note, warn):
    o = dict(ne=False, uq=False, strict=False, always=False, idx="None", raw=False)
    ae = '<AutoEnter allowEditing="True" constant="False" furigana="False" lookup="False" calculation="False"><ConstantData></ConstantData></AutoEnter>'
    head, sep, calc = opts.partition("calc:")
    toks = [t.strip() for t in head.split(";") if t.strip()] + (["calc:" + calc] if sep else [])
    for tok in toks:
        low = tok.lower()
        if low == "key": o.update(ne=True, uq=True, strict=True, always=True, idx="Minimal", raw=True)
        elif low == "fk": o.update(ne=True, idx="Minimal", raw=True)
        elif low == "not empty": o["ne"] = True
        elif low == "unique": o["uq"] = True
        elif low == "strict": o["strict"] = True
        elif low == "always": o["always"] = True
        elif low == "indexed": o["idx"] = "Minimal"
        elif low == "raw": o["raw"] = True
        elif low.startswith("auto "):
            ae = f'<AutoEnter allowEditing="True" value="ConstantData" constant="True" furigana="False" lookup="False" calculation="False"><ConstantData>{escape(tok[5:].strip())}</ConstantData></AutoEnter>'
        elif low.startswith("calc:"):
            ae = (f'<AutoEnter allowEditing="False" overwriteExistingValue="True" alwaysEvaluate="False" constant="False" furigana="False" lookup="False" calculation="True">'
                  f'<ConstantData></ConstantData><Calculation table="{table}"><![CDATA[{tok[5:].strip()}]]></Calculation></AutoEnter>')
        else:
            warn.append(f"{table}::{name}  NOT PASTED: {tok}")
    b = lambda x: "True" if x else "False"
    sd = '<StrictDataType value="FourDigitYear"></StrictDataType>' if dtype == "TimeStamp" else ""
    val = (f'<Validation message="False" maxLength="False" valuelist="False" calculation="False" alwaysValidateCalculation="False" type="{"Always" if o["always"] else "OnlyDuringDataEntry"}">{sd}'
           f'<NotEmpty value="{b(o["ne"])}"></NotEmpty><Unique value="{b(o["uq"])}"></Unique><Existing value="False"></Existing><StrictValidation value="{b(o["strict"])}"></StrictValidation></Validation>')
    st = f'<Storage autoIndex="True" index="{o["idx"]}" indexLanguage="{"Unicode_Raw" if o["raw"] else "English"}" global="False" maxRepetition="1"></Storage><DefaultStyle></DefaultStyle>'
    return f'<Field id="{fid}" dataType="{dtype}" fieldType="Normal" name="{name}"><Comment>{escape(note)}</Comment>{ae}{val}{st}</Field>'

def build(app, only, warn):
    sdir = os.path.join(app, "schema")
    names = only or sorted(f[:-4] for f in os.listdir(sdir) if f.endswith(".tsv"))
    audit, out, fid = audit_templates(), ['<fmxmlsnippet type="FMObjectList">'], 100
    for t in names:
        src = os.path.join(sdir, t + ".tsv")
        if not os.path.exists(src):
            sys.exit(f"!! no schema file {src}. Run git pull; if it is still missing, the table is not in the schema yet.")
        rows = [l.rstrip("\n").split("\t") for l in open(src, encoding="utf-8")][1:]
        out.append(f'<BaseTable name="{t}">')
        for r in rows:
            if not r or not r[0]: continue
            r += [""] * (5 - len(r)); name, typ, opts, note = r[0], r[1], r[2], r[3]
            if opts.strip().lower() == "audit":
                if name not in audit: warn.append(f"{t}::{name}  NOT PASTED: no captured audit template"); continue
                out.append(audit[name].replace("__TABLE__", t)); continue
            dtype = TYPES.get(typ.strip().lower())
            if not dtype: warn.append(f"{t}::{name}  NOT PASTED: type {typ!r} (calc fields not proven yet)"); continue
            fid += 1; out.append(field_xml(t, fid, name, dtype, opts, note, warn))
        out.append("</BaseTable>")
    out.append("</fmxmlsnippet>")
    return "".join(out), names

if __name__ == "__main__":
    args = sys.argv[1:]
    if not args: sys.exit(__doc__)
    outfile = args[args.index("--out") + 1] if "--out" in args else None
    pos = [a for i, a in enumerate(args) if a != "--out" and (i == 0 or args[i - 1] != "--out")]
    warn = []
    xml, names = build(pos[0], pos[1:], warn)
    if outfile:
        open(outfile, "w", encoding="utf-8").write(xml)
    else:
        subprocess.run(["osascript", "-e", f'set the clipboard to «data XMTB{xml.encode("utf-8").hex()}»'], check=True)
    print(f"{len(names)} tables {'written to ' + outfile if outfile else 'on the clipboard. Manage Database > Tables > Cmd-V.'}")
    for w in warn: print("  !! " + w)
    if warn: print(f"  {len(warn)} item(s) need a hand step.")
