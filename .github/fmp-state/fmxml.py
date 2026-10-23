#!/usr/bin/env python3
# fmxml.py: passive FileMaker deconstructor for cold agents.
# Reads every *.xml in the drop folder, detects the format by root element,
# writes compact state files to <out>/<app-slug>/, then deletes the drop.
#   FMPReport    (Tools > Database Design Report > XML)  -> STATE.md, STEPS.md, fingerprints.json, DELTA.md
#   FMSaveAsXML  (Tools > Save a Copy as XML)            -> ACTIVITY.md, ONLY if it carries no credential data.
#                A normal Save-as-XML includes account + file-access authentication blobs: it is REJECTED,
#                deleted from HEAD, and the run fails loud. Do not drop Save-as-XML into this repo.
# One bad drop never blocks the rest: symlinks, unreadable or unparseable files (e.g. a DDR Summary.xml)
# are skipped with a warning and left in place; every good drop is still processed, indexed and deleted.
# Output is deterministic for a given export: no run timestamp, so identical input = identical bytes.
# Record counts are reported as state and never hashed. Layout geometry/styling is dropped and declared.
import sys, os, re, json, glob, hashlib, collections, xml.etree.ElementTree as ET

DROP, OUT = sys.argv[1], sys.argv[2]
SHA = os.environ.get("DROP_SHA", "")[:12]
FM = "---\nstatus: hidden\ntype: reference\ngenerated: fmp-state\n---\n\n"

def h(s): return hashlib.sha1(s.encode()).hexdigest()[:10]
def txt(e): return (e.text or "").strip() if e is not None else ""
def one(s, n=140):
    s = re.sub(r"\s+", " ", s).strip()
    return s if len(s) <= n else s[:n-1] + "\u2026"
def slug(name):
    name = re.sub(r"\.fmp12$", "", name or "unknown", flags=re.I)
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or "unknown"
def recover(src): return f"`git show {SHA}:\"{src}\"`" if SHA else "(local run, no commit)"

# ---------------------------------------------------------------- DDR XML
def ddr(root, src):
    F = root.find("File"); app = F.get("name"); d = os.path.join(OUT, slug(app)); os.makedirs(d, exist_ok=True)
    cats = {c.tag: c for c in F}; fp = {}; L = []; W = L.append
    def put(k, name, el, sem=None): fp[k] = {"n": name, "h": h(sem if sem is not None else ET.tostring(el, encoding="unicode"))}
    W(f"# {app} \u00b7 STATE")
    W(f"DDR-XML export {root.get('creationDate')} {root.get('creationTime')} \u00b7 FM {root.get('version')}")
    W(f"Source drop: `{src}` \u00b7 recover raw: {recover(src)}")
    W("Companion files: DELTA.md (vs previous drop, read first) \u00b7 STEPS.md (full script steps, load on demand)\n")
    STD = {"PrimaryKey", "CreationTimestamp", "CreatedBy", "ModificationTimestamp", "ModifiedBy"}
    tabs = cats["BaseTableCatalog"].findall("BaseTable"); nf = 0
    W(f"## Tables ({len(tabs)}) \u00b7 rec = record count (state, not hashed) \u00b7 _std audit_ = stock PrimaryKey/Created*/Modified* fields, factored")
    for t in tabs:
        fl = t.findall("FieldCatalog/Field"); nf += len(fl); std = []; rows = []
        put(f"table:{t.get('id')}", t.get("name"), t, sem=t.get("name"))
        for x in fl:
            put(f"field:{t.get('id')}:{x.get('id')}", f"{t.get('name')}::{x.get('name')}", x)
            cm = txt(x.find("Comment"))
            if x.get("name") in STD and x.get("fieldType") == "Normal" and cm.startswith(("Unique identifier", "Date and time each", "Account name of")):
                std.append(x.get("name")); continue
            st = x.find("Storage"); g = " g" if st is not None and st.get("global") == "True" else ""
            ae = x.find("AutoEnter"); aes = ""
            if ae is not None:
                if ae.get("calculation") == "True": aes = " ae=calc"
                elif ae.find("Serial") is not None: aes = " ae=serial"
                elif ae.get("value") not in (None, "False"): aes = f" ae={ae.get('value')}"
            ft = x.get("fieldType"); calc = txt(x.find("Calculation"))
            line = f"- `{x.get('name')}` {x.get('dataType')}{'/' + ft if ft != 'Normal' else ''}{g}{aes}"
            if calc: line += f" = `{one(calc, 120)}`"
            if cm: line += f" // {one(cm, 100)}"
            rows.append(line)
        W(f"\n### {t.get('name')} \u00b7 {len(fl)} fields \u00b7 {t.get('records')} rec")
        if std: W(f"- _std audit {len(std)}/5" + ("" if len(std) == 5 else " (missing: " + ", ".join(sorted(STD - set(std))) + ")") + "_")
        L.extend(rows)
    rg = cats["RelationshipGraph"]; tos = rg.findall("TableList/Table")
    W(f"\n## Table occurrences ({len(tos)}) \u00b7 name[base table]")
    W(", ".join(f"{t.get('name')}[{t.get('baseTable')}]" for t in tos if t.find("FileReference") is None))
    ext = [f"{t.get('name')} \u2192 {t.find('FileReference').get('name')}" for t in tos if t.find("FileReference") is not None]
    if ext: W("**External file refs:** " + ", ".join(ext))
    for t in tos: put(f"to:{t.get('id')}", t.get("name"), t)
    rels = rg.findall("RelationshipList/Relationship"); W(f"\n## Relationships ({len(rels)})")
    for r in rels:
        lt, rt = r.find("LeftTable"), r.find("RightTable")
        preds = [f"{p.find('LeftField/Field').get('name')} {p.get('type')} {p.find('RightField/Field').get('name')}" for p in r.findall("JoinPredicateList/JoinPredicate")]
        fl = [f"{s}:{w}" for s, t in (("L", lt), ("R", rt)) for w, a in (("create", "cascadeCreate"), ("DELETE", "cascadeDelete")) if t.get(a) == "True"]
        nm = f"{lt.get('name')} \u21c4 {rt.get('name')}"
        W(f"- {nm} on {' & '.join(preds)}" + (f" [{', '.join(fl)}]" if fl else ""))
        put(f"rel:{r.get('id')}", nm, r)
    vls = cats["ValueListCatalog"].findall("ValueList"); W(f"\n## Value lists ({len(vls)})")
    for v in vls:
        s = v.find("Source").get("value")
        dsc = ("custom: " + one(" | ".join(txt(x) for x in v.findall("CustomValues/Text")), 100)) if s == "Custom" else (s + ": " + ", ".join(f"{x.get('table')}::{x.get('name')}" for x in v.iter("Field")))
        W(f"- {v.get('name')} \u00b7 {dsc}"); put(f"vl:{v.get('id')}", v.get("name"), v)
    cfs = cats["CustomFunctionCatalog"].findall("CustomFunction"); W(f"\n## Custom functions ({len(cfs)})")
    for c in cfs: W(f"- {c.get('name')}({c.get('parameters') or ''})"); put(f"cf:{c.get('id')}", c.get("name"), c)
    S = [f"# {app} \u00b7 SCRIPT STEPS", f"Source drop: `{src}` \u00b7 disabled steps prefixed ~~"]; ns = [0]
    def swalk(node, path):
        for s in node:
            if s.tag == "Group":
                W(f"\n**\U0001f4c1 {'/'.join(path + [s.get('name')])}**"); swalk(s, path + [s.get("name")])
            elif s.tag == "Script":
                steps = s.findall("StepList/Step")
                if not steps and s.get("name") == "-": continue
                ns[0] += 1
                real = [x for x in steps if x.get("name") != "# (comment)"]
                dis = sum(1 for x in steps if x.get("enable") == "False")
                calls = sorted({x.find("Script").get("name") for x in steps if x.find("Script") is not None})
                W(f"- **{s.get('name')}** \u00b7 {len(real) if steps else 'EMPTY'}" + (" steps" if steps else "") + (f" ({dis} disabled)" if dis else "") + (" \u00b7 calls: " + ", ".join(calls) if calls else ""))
                put(f"script:{s.get('id')}", s.get("name"), s)
                S.append(f"\n## {s.get('name')}")
                for x in steps:
                    t = txt(x.find("StepText")) or txt(x.find("Text"))
                    if x.get("name") == "# (comment)" and not t: continue
                    S.append(("  ~~" if x.get("enable") == "False" else "  ") + one(t or x.get("name"), 200))
    W("\n## Scripts (folder tree \u00b7 step counts exclude comments \u00b7 `-` separators omitted)"); swalk(cats["ScriptCatalog"], [])
    nl = [0]
    def lwalk(node, path):
        for s in node:
            if s.tag == "Group":
                W(f"\n**\U0001f4c1 {'/'.join(path + [s.get('name')])}**"); lwalk(s, path + [s.get("name")])
            elif s.tag == "Layout":
                to = s.find("Table")
                if to is None and s.get("name") == "-": continue
                nl[0] += 1
                fields = sorted({txt(n) for n in s.iter("Name") if "::" in txt(n)})
                btn = sorted({x.get("name") for b in list(s.iter("ButtonObj")) + list(s.iter("ButtonBarObj")) for x in b.iter("Script")})
                portals = sum(1 for o in s.iter("Object") if o.get("type") == "Portal")
                W(f"- **{s.get('name')}** [{to.get('name') if to is not None else '\u2014'}] \u00b7 {len(fields)} fields" + (f" \u00b7 {portals} portals" if portals else "") + (" \u00b7 btn \u2192 " + ", ".join(btn) if btn else ""))
                put(f"layout:{s.get('id')}", s.get("name"), s, sem=json.dumps([s.get("name"), to.get("name") if to is not None else None, fields, btn, portals]))
    W("\n## Layouts (folder tree \u00b7 base TO \u00b7 fields placed \u00b7 button \u2192 script) \u00b7 geometry + styling NOT captured"); lwalk(cats["LayoutCatalog"], [])
    W(f"\n## Counts\nTables {len(tabs)} \u00b7 Fields {nf} \u00b7 TOs {len(tos)} \u00b7 Relationships {len(rels)} \u00b7 Value lists {len(vls)} \u00b7 Custom functions {len(cfs)} \u00b7 Scripts {ns[0]} \u00b7 Layouts {nl[0]}")
    W("\n## Not captured (declared)\n- Layout object geometry, styles, local CSS, theme bodies\n- Full script step text lives in STEPS.md, not here\n- Record data, accounts, privileges")
    # delta vs previous fingerprints
    fpp = os.path.join(d, "fingerprints.json"); old = None
    if os.path.exists(fpp):
        try: old = json.load(open(fpp))
        except Exception: old = None
    new = {"app": app, "export": f"{root.get('creationDate')} {root.get('creationTime')}", "drop": SHA, "objects": fp}
    D = [FM + f"# {app} \u00b7 DELTA"]
    if old is None:
        D.append(f"Baseline drop ({new['export']}). No previous fingerprints, nothing to compare. {len(fp)} objects fingerprinted.")
    else:
        A, B = old["objects"], fp
        add = sorted(set(B) - set(A)); rem = sorted(set(A) - set(B))
        ren = sorted(k for k in set(A) & set(B) if A[k]["n"] != B[k]["n"])
        chg = sorted(k for k in set(A) & set(B) if A[k]["h"] != B[k]["h"] and k not in ren)
        D.append(f"{old.get('export')} \u2192 {new['export']} \u00b7 +{len(add)} \u2212{len(rem)} renamed {len(ren)} ~{len(chg)} of {len(B)} objects")
        for lab, ks, fn in (("Added", add, lambda k: B[k]["n"]), ("Removed", rem, lambda k: A[k]["n"]), ("Renamed", ren, lambda k: f"{A[k]['n']} \u2192 {B[k]['n']}"), ("Changed", chg, lambda k: B[k]["n"])):
            if ks: D.append(f"\n## {lab} ({len(ks)})"); D += [f"- {k.split(':')[0]} \u00b7 {fn(k)}" for k in ks]
        if not (add or rem or ren or chg): D.append("\nNo schema change.")
    open(os.path.join(d, "STATE.md"), "w").write(FM + "\n".join(L) + "\n")
    open(os.path.join(d, "STEPS.md"), "w").write(FM + "\n".join(S) + "\n")
    open(os.path.join(d, "DELTA.md"), "w").write("\n".join(D) + "\n")
    json.dump(new, open(fpp, "w"), indent=0, sort_keys=True, ensure_ascii=False)
    return app

# ---------------------------------------------------------------- Save-as-XML
SEC = {"Account", "Authorization", "PrivilegeSet", "ExtendedPrivilege"}
def saxml(root, src):
    for a in root.iter("Authentication"):
        if len(a) or txt(a): return None
    app = root.get("File"); d = os.path.join(OUT, slug(app)); os.makedirs(d, exist_ok=True); rows = []
    def walk(e, stack):
        for c in e:
            if c.tag == "UUID" and c.get("timestamp"):
                own = next((s for s in reversed(stack) if s.get("name")), None)
                if own is not None and own.tag not in SEC and not own.tag.endswith("Catalog"):
                    nm = own.get("name")
                    if own.tag == "Field":
                        bt = next((s.find("BaseTableReference") for s in reversed(stack) if s.tag == "FieldCatalog"), None)
                        if bt is not None: nm = f"{bt.get('name')}::{nm}"
                    rows.append((c.get("timestamp"), own.tag, nm))
            walk(c, stack + [c])
    walk(root, [root]); rows.sort(key=lambda r: (r[0], r[1], r[2]), reverse=True)
    o = [FM + f"# {app} \u00b7 ACTIVITY", f"Save-as-XML {root.get('version')} \u00b7 FM {root.get('Source')} \u00b7 {len(rows)} dated objects \u00b7 newest first",
         f"Source drop: `{src}` \u00b7 recover raw: {recover(src)}", "Read the top section to see where the build is right now.\n"]
    days = collections.OrderedDict()
    for t, k, n in rows: days.setdefault(t[:10], []).append((t, k, n))
    for dd, items in days.items():
        o.append(f"## {dd} \u00b7 {len(items)}"); g = collections.defaultdict(list)
        for t, k, n in items: g[k].append(f"{n} ({t[11:16]})")
        for k in sorted(g, key=lambda k: (-len(g[k]), k)):
            o.append(f"- **{k}** \u00d7{len(g[k])}: " + ", ".join(g[k][:30]) + (f" \u2026 +{len(g[k]) - 30}" if len(g[k]) > 30 else ""))
        o.append("")
    open(os.path.join(d, "ACTIVITY.md"), "w").write("\n".join(o))
    return app

def index():
    apps = sorted(p for p in os.listdir(OUT) if os.path.isdir(os.path.join(OUT, p)))
    I = [FM + "# FMP state \u00b7 index", "Generated from FileMaker exports dropped in `zFMP-drops/`. Cold agents: open an app's DELTA.md first (what moved since the previous drop), then STATE.md (what the app is), STEPS.md only when you need a script's actual steps. ACTIVITY.md appears only if a credential-free Save-as-XML was ever processed.\n"]
    for a in apps:
        have = [f for f in ("ACTIVITY.md", "STATE.md", "DELTA.md", "STEPS.md") if os.path.exists(os.path.join(OUT, a, f))]
        if not have: continue
        I.append(f"- **{a}** \u00b7 " + " \u00b7 ".join(f"[{f[:-3]}]({a}/{f})" for f in have))
    open(os.path.join(OUT, "index.md"), "w").write("\n".join(I) + "\n")

drops = sorted(glob.glob(os.path.join(DROP, "*.xml")) + glob.glob(os.path.join(DROP, "*.XML")))
if not drops: print("no drops"); sys.exit(0)
os.makedirs(OUT, exist_ok=True); done = []; rejected = []; skipped = []
for p in drops:
    src = p.replace(os.sep, "/")
    if os.path.islink(p) or not os.path.isfile(p):
        print(f"::warning::{src}: symlink or not a regular file (a Finder alias or DDR Summary.xml link?). Skipped, not deleted.")
        skipped.append(src); continue
    try:
        root = ET.parse(p).getroot()
        if root.tag == "FMPReport": app = ddr(root, src)
        elif root.tag == "FMSaveAsXML":
            app = saxml(root, src)
            if app is None:
                os.remove(p); rejected.append(src)
                print(f"::error::{src} is Save-as-XML carrying account/credential data. Deleted from HEAD, nothing generated. It is still in git history: purge that commit. Drop DDR XML instead."); continue
        else:
            print(f"::warning::{src}: unknown root <{root.tag}>. Expected FMPReport (DDR XML) or FMSaveAsXML. Skipped, not deleted.")
            skipped.append(src); continue
    except Exception as e:
        print(f"::warning::{src}: could not deconstruct ({type(e).__name__}: {one(str(e), 160)}). A DDR Summary.xml has no catalogs: drop the per-file XML instead. Skipped, not deleted.")
        skipped.append(src); continue
    done.append((p, app)); print(f"{src} \u2192 {slug(app)} ({root.tag})")
index()
for p, _ in done: os.remove(p)
if skipped: print(f"\u26a0\ufe0f Skipped {len(skipped)} file(s): " + ", ".join(skipped))
if rejected: sys.exit(2)
