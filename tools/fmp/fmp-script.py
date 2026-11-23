#!/usr/bin/env python3
"""fmp-script.py: a .fmscript in the repo -> FileMaker script steps on the clipboard (XMSS).

    python3 tools/fmp/fmp-script.py "apps/<app>/scripts/<name>.fmscript"
    python3 tools/fmp/fmp-script.py "apps/<app>/scripts/<name>.fmscript" --out /tmp/s.xml

Then in Script Workspace: click into the script's step pane, Cmd-V.

Step XML is a line-for-line port of fmp-renderer/source/fmscript.js (ClickUp_apps), whose shapes
were proven by real pastes. A step it cannot translate is pasted as a comment reading
"TYPE BY HAND: <line>" and listed with !!, never dropped. Keep the two in step: a shape added
to one gets added to the other.
"""
import re, subprocess, sys

def x(s): return str(s).replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('"','&quot;')
def cdata(s): return '<![CDATA[' + str(s).replace(']]>', ']]]]><![CDATA[>') + ']]>'
def calc(s): return '<Calculation>' + cdata(s) + '</Calculation>'
def step(i, name, inner=''): return f'<Step enable="True" id="{i}" name="{x(name)}">{inner}</Step>'
def comment(t): return step(89, '# (comment)', '<Text>' + x(t) + '</Text>')
def on_off(a): return bool(re.match(r'^\s*on\s*$', a or '', re.I))

def split_args(s):
    out, cur, depth, q, i = [], '', 0, False, 0
    while i < len(s):
        c = s[i]
        if q:
            cur += c
            if c == '\\' and i + 1 < len(s): i += 1; cur += s[i]; i += 1; continue
            if c == '"': q = False
            i += 1; continue
        if c == '"': q = True; cur += c; i += 1; continue
        if c in '([{': depth += 1
        if c in ')]}': depth -= 1
        if c == ';' and depth == 0: out.append(cur.strip()); cur = ''; i += 1; continue
        cur += c; i += 1
    if cur.strip() or out: out.append(cur.strip())
    return out

def after(a, label):
    m = re.match(r'^' + label + r'\s*:\s*', a or '', re.I)
    return (a[m.end():] if m else None)
def unquote(s):
    m = re.match(r'^"((?:[^"\\]|\\.)*)"$', str(s).strip())
    return m.group(1).replace('\\"', '"') if m else None
def field_ref(r):
    m = re.match(r'^([^:]+)::(.+)$', str(r).strip())
    return (m.group(1).strip(), m.group(2).strip()) if m else None

class Hand(Exception): pass
def need(v, why):
    if v is None: raise Hand(why)
    return v

def s_set_variable(a):
    v = need(after(a[1] if len(a) > 1 else '', 'Value'), 'no Value:')
    m = need(re.match(r'^(\$\$?[^\s\[]+)\s*(?:\[\s*(.+)\s*\])?$', a[0]), 'bad variable name')
    return 141, '<Value>' + calc(v) + '</Value><Repetition>' + calc(m.group(2) or '1') + '</Repetition><Name>' + x(m.group(1)) + '</Name>'
def s_exit_script(a):
    r = after(a[0] if a else '', 'Text Result')
    return 103, ('' if r in (None, '') else calc(r))
def s_go_to_layout(a):
    n = need(unquote(a[0] if a else ''), 'only a named layout translates; type layout-by-calculation by hand')
    return 6, '<LayoutDestination value="SelectedLayout"/><Layout id="0" name="' + x(n) + '"/>'
def s_perform_find(a):
    if any(a): raise Hand('stored find requests do not translate')
    return 28, '<Restore state="False"/>'
def s_set_field(a):
    f = need(field_ref(a[0] if a else ''), 'target is not Table::Field')
    return 76, calc(a[1] if len(a) > 1 else '') + f'<Field table="{x(f[0])}" id="0" name="{x(f[1])}"/>'
def s_goto_record(a):
    where = (a[0] if a else '').strip()
    if where in ('First', 'Last'): return 16, f'<NoInteract state="True"/><RowPageLocation value="{where}"/>'
    if where in ('Next', 'Previous'):
        ex = re.search(r'exit after last\s*:\s*on', ';'.join(a), re.I)
        return 16, '<NoInteract state="True"/>' + ('<Exit state="True"/>' if ex else '') + f'<RowPageLocation value="{where}"/>'
    raise Hand('only First, Last, Next and Previous translate')

def s_insert_from_url(a):
    # Shape proven by XMSS capture 2026-11-22 (URITP Utilities scratch | capture).
    tgt = url = curl = None; sel = ssl = dont = False; nodlg = True
    for p in a:
        if after(p, 'Target') is not None: tgt = after(p, 'Target').strip(); continue
        if after(p, 'cURL options') is not None: curl = after(p, 'cURL options'); continue
        if after(p, 'With dialog') is not None: nodlg = not on_off(after(p, 'With dialog')); continue
        if re.match(r'^select$', p, re.I): sel = True; continue
        if re.match(r'^verify ssl certificates$', p, re.I): ssl = True; continue
        if re.match(r'^do not automatically encode url$', p, re.I): dont = True; continue
        if url is None and p: url = p; continue
        raise Hand('unexpected argument: ' + p)
    tgt = need(tgt, 'no Target:')
    if not re.match(r'^\$\$?\S+$', tgt): raise Hand('only a variable target translates; type a field target by hand')
    need(url, 'no URL')
    st = lambda b: '"True"' if b else '"False"'
    return 160, (f'<NoInteract state={st(nodlg)}></NoInteract><DontEncodeURL state={st(dont)}></DontEncodeURL>'
                 f'<SelectAll state={st(sel)}></SelectAll><VerifySSLCertificates state={st(ssl)}></VerifySSLCertificates>'
                 + ('<CURLOptions>' + calc(curl) + '</CURLOptions>' if curl not in (None, '') else '')
                 + calc(url) + '<Text></Text><Field>' + x(tgt) + '</Field>')
def s_perform_script(a):
    # Shape proven by XMSS capture 2026-11-22. id="0": FileMaker binds by name on paste (as Go to Layout); scan for <unknown>.
    rest = [p for p in a if not re.match(r'^specified\s*:\s*from list$', p, re.I)]
    if any(re.match(r'^specified\s*:', p, re.I) for p in rest): raise Hand('only Specified: From list translates')
    name = par = None
    for p in rest:
        if after(p, 'Parameter') is not None: par = after(p, 'Parameter'); continue
        if name is None: name = need(unquote(p), 'script name must be a quoted name'); continue
        raise Hand('unexpected argument: ' + p)
    need(name, 'no script name')
    return 1, ('' if par in (None, '') else calc(par)) + '<Script id="0" name="' + x(name) + '"></Script>'

# Data-file steps. Shapes proven by XMSS capture 2026-11-22 (URITP Utilities file | read text, FileMaker 19).
# The path is one entry, written as FileMaker shows it: $variable or a quoted literal path. Only a variable target translates.
def _path_target(a):
    path = tgt = None
    for p in a:
        if after(p, 'Target') is not None: tgt = after(p, 'Target').strip(); continue
        if path is None and p: path = unquote(p) if unquote(p) is not None else p; continue
        raise Hand('unexpected argument: ' + p)
    need(path, 'no file path'); tgt = need(tgt, 'no Target:')
    if not re.match(r'^\$\$?\S+$', tgt): raise Hand('only a variable target translates')
    if '\n' in path or '¶' in path: raise Hand('only a single path translates')
    return '<UniversalPathList>' + x(path) + '</UniversalPathList><Text></Text><Field>' + x(tgt) + '</Field>'
def s_get_file_exists(a): return 188, _path_target(a)
def s_open_data_file(a): return 191, _path_target(a)
def s_read_from_data_file(a):
    fid = tgt = None; enc = 'UTF-8'
    for p in a:
        if after(p, 'File ID') is not None: fid = after(p, 'File ID').strip(); continue
        if after(p, r'Amount \(bytes\)') is not None:
            if after(p, r'Amount \(bytes\)').strip(): raise Hand('only an empty Amount (read the whole file) is proven')
            continue
        if after(p, 'Target') is not None: tgt = after(p, 'Target').strip(); continue
        if after(p, 'Read as') is not None: enc = after(p, 'Read as').strip(); continue
        raise Hand('unexpected argument: ' + p)
    fid = need(fid, 'no File ID:'); tgt = need(tgt, 'no Target:')
    if enc.upper() != 'UTF-8': raise Hand('only Read as: UTF-8 is proven')
    if not re.match(r'^\$\$?\S+$', tgt): raise Hand('only a variable target translates')
    return 193, '<DataSourceType value="2"></DataSourceType>' + calc(fid) + '<Text></Text><Field>' + x(tgt) + '</Field>'
def s_close_data_file(a):
    fid = need(after(a[0] if a else '', 'File ID'), 'no File ID:')
    return 196, calc(fid.strip())

STEPS = {
    'Set Variable': s_set_variable,
    'If': lambda a: (68, calc(a[0])), 'Else If': lambda a: (125, calc(a[0])),
    'Else': lambda a: (69, ''), 'End If': lambda a: (70, ''),
    'Loop': lambda a: (71, ''), 'Exit Loop If': lambda a: (72, calc(a[0])), 'End Loop': lambda a: (73, ''),
    'Exit Script': s_exit_script,
    'Set Error Capture': lambda a: (86, f'<Set state="{"True" if on_off(a[0] if a else "") else "False"}"/>'),
    'Allow User Abort': lambda a: (85, f'<Set state="{"True" if on_off(a[0] if a else "") else "False"}"/>'),
    'Freeze Window': lambda a: (79, ''),
    'Go to Layout': s_go_to_layout,
    'Enter Find Mode': lambda a: (22, '<Pause state="%s"/>' % ('True' if re.search(r'pause\s*:\s*on', ';'.join(a), re.I) else 'False')),
    'Perform Find': s_perform_find,
    'Set Field': s_set_field,
    'Go to Record/Request/Page': s_goto_record,
    'Show All Records': lambda a: (23, ''),
    'New Record/Request': lambda a: (7, ''),
    'Commit Records/Requests': lambda a: (75, '<NoInteract state="True"/>'),
    'Insert from URL': s_insert_from_url,
    'Perform Script': s_perform_script,
    'Get File Exists': s_get_file_exists,
    'Open Data File': s_open_data_file,
    'Read from Data File': s_read_from_data_file,
    'Close Data File': s_close_data_file,
}

def to_snippet(text):
    out, hand, n_steps = [], [], 0
    for n, raw in enumerate(text.replace('\r\n', '\n').replace('\r', '\n').split('\n'), 1):
        line = raw.strip()
        if not line: continue
        if line.startswith('#'): out.append(comment(re.sub(r'^#\s?', '', line))); continue
        m = re.match(r'^([^\[]+?)\s*(?:\[\s*([\s\S]*?)\s*\])?\s*$', line)
        name = m.group(1).strip() if m else line
        args = split_args(m.group(2)) if m and m.group(2) is not None else []
        try:
            fn = STEPS.get(name)
            if not fn: raise Hand('no translation for this step yet')
            i, inner = fn(args); out.append(step(i, name, inner)); n_steps += 1
        except (Hand, IndexError) as why:
            out.append(comment('TYPE BY HAND: ' + line)); hand.append((n, line, str(why)))
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<fmxmlsnippet type="FMObjectList">\n' + '\n'.join(out) + '\n</fmxmlsnippet>\n'
    return xml, n_steps, hand

def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    path = sys.argv[1]
    xml, n, hand = to_snippet(open(path, encoding='utf-8').read())
    if '--out' in sys.argv:
        open(sys.argv[sys.argv.index('--out') + 1], 'w', encoding='utf-8').write(xml)
        print(f'{n} steps written')
    else:
        subprocess.run(['osascript', '-e', 'set the clipboard to \u00abdata XMSS' + xml.encode('utf-8').hex() + '\u00bb'], check=True)
        print(f'{n} steps on the clipboard. Script Workspace: click into the step pane, Cmd-V.')
    for ln, line, why in hand: print(f'  !! line {ln}: TYPE BY HAND ({why}): {line}')
    if hand: print(f'  {len(hand)} step(s) pasted as TYPE BY HAND comments.')

if __name__ == '__main__': main()
