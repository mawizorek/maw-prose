#!/usr/bin/env python3
"""One-shot: old-shape FileMaker table notes -> doc-render shape (maw-prose D-041).

Old shape:  # Title / "Manage -> ..." breadcrumb / "Grain: ..." / "## Fields" + md table.
New shape:  template-docs front matter, # Title, !!! abstract "Grain", the prose,
            "## Fields" + !!! data "catalog", and a sibling <Table>.tsv register.

Lossless or nothing: a note that does not match the old shape exactly (no grain,
no fields table, two fields tables, front matter already present) is SKIPPED
and listed, never guessed at.
"""
import re, sys, pathlib, json

def cells(line):
    s = line.strip()
    if s.startswith('|'): s = s[1:]
    if s.endswith('|'): s = s[:-1]
    return [c.strip().replace('\\|', '|') for c in re.split(r'(?<!\\)\|', s)]

HEAD = {'field': 'Field_Name', 'field name': 'Field_Name', 'name': 'Field_Name', 'type': 'Type',
        'fmp comment': 'Notes', 'comment': 'Notes', 'notes': 'Notes', 'to': 'TO', '⚠️': 'Flag', '⚠': 'Flag', 'flag': 'Flag'}

def q(v):
    v = v.replace('"', '\\"')
    return '"' + v + '"'

def convert(path, app):
    src = path.read_text(encoding='utf-8')
    if src.startswith('---\n'): return None, 'already has front matter'
    L = src.replace('\r\n', '\n').split('\n')
    title = None; grain = None; fields = None; body = []; i = 0; nfields = 0
    while i < len(L):
        l = L[i]
        if title is None and re.match(r'^#\s+', l): title = re.sub(r'^#\s+', '', l).strip(); i += 1; continue
        if re.match(r'^\s*Manage\s*(→|->)', l): i += 1; continue
        if grain is None and re.match(r'^\s*\**\s*grain\s*:', l, re.I):
            buf = [re.sub(r'^\s*\**\s*grain\s*:\s*\**\s*', '', l, flags=re.I)]; i += 1
            while i < len(L) and L[i].strip() and not L[i].startswith('#'): buf.append(L[i].strip()); i += 1
            grain = ' '.join(buf).strip(); continue
        if re.match(r'^##\s+fields\b', l, re.I):
            nfields += 1; j = i + 1
            while j < len(L) and not L[j].strip().startswith('|') and not L[j].startswith('#'): j += 1
            rows = []
            while j < len(L) and L[j].strip().startswith('|'): rows.append(L[j]); j += 1
            if rows: fields = rows
            i = j; continue
        body.append(l); i += 1
    if nfields != 1 or not fields: return None, 'needs exactly one "## Fields" table, found %d' % nfields
    if not grain: return None, 'no Grain: line'
    if not title: return None, 'no H1'
    head = [HEAD.get(h.lower().replace('`', '').replace('*', '').strip()) for h in cells(fields[0])]
    if 'Field_Name' not in head: return None, 'fields table has no Field column'
    if any(h is None for h in head): return None, 'unmapped fields column: ' + ', '.join(h for h, k in zip(cells(fields[0]), head) if k is None)
    out_rows = ['\t'.join(head)]
    count = 0
    for r in fields[1:]:
        if re.match(r'^[\s|:-]+$', r): continue
        c = cells(r) + [''] * len(head)
        out_rows.append('\t'.join(x.replace('\t', ' ') for x in c[:len(head)])); count += 1
    stem = path.stem
    tid = (app + '-table-' + re.sub(r'[^a-z0-9]+', '-', stem.lower())).strip('-')
    summary = re.split(r'(?<=[.!?])\s', grain, maxsplit=1)[0]
    summary = summary[:1].upper() + summary[1:]
    prose = '\n'.join(body).strip('\n')
    fm = ['---', 'id: ' + tid, 'title: ' + q(title), 'type: reference', 'status: hidden',
          'summary: ' + q(summary), 'data:', '  catalog:', '    file: ' + stem + '.tsv', '---', '']
    md = '\n'.join(fm) + '# ' + title + '\n\n!!! abstract "Grain"\n    ' + grain + '\n\n' + \
         (prose + '\n\n' if prose else '') + '## Fields\n\n!!! data "catalog"\n'
    return (md, '\n'.join(out_rows) + '\n', count), None

def main(root, apps):
    report = {'converted': [], 'skipped': []}
    for app in apps:
        for p in sorted(pathlib.Path(root, 'apps', app, 'tables').glob('*.md')):
            if p.name.lower() in ('readme.md', 'index.md') or p.name.endswith('.notes.md'): continue
            res, why = convert(p, app)
            if res is None: report['skipped'].append(f'{p}: {why}'); continue
            md, tsv, n = res
            tsvp = p.with_suffix('.tsv')
            if tsvp.exists(): report['skipped'].append(f'{p}: {tsvp.name} already exists'); continue
            p.write_text(md, encoding='utf-8'); tsvp.write_text(tsv, encoding='utf-8')
            report['converted'].append(f'{p} ({n} fields)')
    print(json.dumps(report, indent=1))
    return report

if __name__ == '__main__':
    r = main(sys.argv[1], sys.argv[2:])
