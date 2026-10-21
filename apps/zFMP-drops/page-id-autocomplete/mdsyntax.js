// Part of page-id-autocomplete (v0.6). Lints for the stock markdown extensions
// doc-render-engine turns on (mkdocs.yml markdown_extensions), each tied to a
// rule the engine itself wrote down:
//   unindented-body  !!! / ??? / === body must be indented 4 (blocks.tsv: detab)
//   worksheet        - [ ] is a WORKSHEET, never a RECORD (mkdocs.yml tasklist)
//   approx           "~18 ft" -> [18 ft]{.est}  (est = soft shape, CSS adds the ~)
//   subscript        ~x~ IS subscript under pymdownx.tilde
//   mark             ==x== means nothing and is reported nowhere; {.hi} is
//   footnote         [^x] with no definition / definition never cited
//   table            row cell count != header (Python-Markdown drops / pads)
const vscode = require('vscode');
const S = require('./state');
const { fmBounds } = require('./refs');
const { DIRECTIVE_NAMES } = require('./vocab');

const OPENER = /^([ \t]*)(!!!|\?\?\?\+?|===[+!]?)[ \t]+(\S[^\n]*)$/;
const SEV = () => vscode.DiagnosticSeverity;

function indentOf(line) { return line.match(/^[ \t]*/)[0].replace(/\t/g, '    ').length; }

// Lines of the body that SHOULD have been indented: the paragraph after the opener.
function strayBody(lines, i) {
  let j = i + 1;
  while (j < lines.length && !lines[j].trim()) j++;
  if (j >= lines.length) return null;
  const want = indentOf(lines[i]) + 4;
  if (indentOf(lines[j]) >= want) return null;
  if (OPENER.test(lines[j]) && indentOf(lines[j]) <= indentOf(lines[i]) && !lines[i].trim().startsWith('===')) return null;
  let k = j;
  while (k + 1 < lines.length && lines[k + 1].trim()) k++;
  return { from: j, to: k, want };
}

function lintSyntax(document, text, masked) {
  const diags = [];
  const add = (start, len, msg, sev, code) => {
    const d = new vscode.Diagnostic(new vscode.Range(document.positionAt(start), document.positionAt(start + len)), msg, sev);
    d.source = 'page-id'; d.code = code; diags.push(d);
  };
  const lines = masked.split('\n');
  const offs = []; let o = 0;
  for (const l of lines) { offs.push(o); o += l.length + 1; }

  // ── unindented block bodies ──
  lines.forEach((line, i) => {
    const m = line.match(OPENER);
    if (!m) return;
    if (m[2] === '!!!') {
      const word = m[3].split(/[\s"]/)[0];
      if (DIRECTIVE_NAMES.has(word) && word !== 'cards') return;   // directives have no body
    }
    const stray = strayBody(lines, i);
    if (!stray) return;
    add(offs[i] + m[1].length, line.length - m[1].length,
      (m[2].startsWith('===') ? '===' : m[2]) + ' body is not indented 4 spaces. It renders as a title-only box, then a loose paragraph (line '
        + (stray.from + 1) + ').', SEV().Warning, 'unindented-body');
  });

  // ── task list on a RECORD-shaped page ──
  const fm = fmBounds(text);
  const fmBody = fm ? fm.body : '';
  const recordish = /^type\s*:\s*program\b/m.test(fmBody) || /^forms\s*:/m.test(fmBody);
  if (recordish) {
    const t = masked.match(/^[ \t]*[-*+] \[[ xX]\]/m);
    if (t) add(t.index, t[0].length,
      'Task list on a ' + (/^type\s*:\s*program\b/m.test(fmBody) ? 'program' : 'forms:') + ' page. A tick is a WORKSHEET (gone on reload, the print is the artifact). If this has to prove somebody completed it, that is a RECORD: use !!! form.',
      SEV().Information, 'worksheet');
  }

  let m;
  // ── ~x~ subscript (pymdownx.tilde: no unescaped spaces inside) ──
  const sub = /(^|[^~\\])~(?!~)((?:[^\s~\\]|\\.)+)~(?!~)/g;
  while ((m = sub.exec(masked)) !== null) {
    const s0 = m.index + m[1].length;
    add(s0, m[2].length + 2, '~' + m[2] + '~ renders as SUBSCRIPT (pymdownx.tilde). Fine for H~2~O; if you meant "approximately", use [' + m[2] + ']{.est}.',
      SEV().Hint, 'subscript');
  }

  // ── "~18 ft" approximations -> {.est} ──
  const approx = /(^|[\s(\[|])~[ \t]?(\d[\d.,/:x-]*(?:[ \t]?(?:ft|in|m|cm|mm|lbs?|kg|%|min|mins|hrs?|hours?|sec|ppl|people|seats|"|'))?)(?![\w~])/g;
  while ((m = approx.exec(masked)) !== null) {
    if (masked.charAt(m.index + m[0].length) === ']') continue;   // already inside [..]{.est}
    const s0 = m.index + m[1].length;
    add(s0, m[0].length - m[1].length, 'Approximate? [' + m[2] + ']{.est} renders the ~ itself (soft shape) and lands in the build report as an estimate.',
      SEV().Hint, 'approx');
  }

  // ── ==mark== ──
  const mark = /(^|[^=])==(?!=)([^=\n]+?)==(?!=)/g;
  while ((m = mark.exec(masked)) !== null) {
    const lineStart = masked.lastIndexOf('\n', m.index) + 1;
    if (/^[ \t]*===/.test(masked.slice(lineStart, lineStart + 8))) continue;
    const s0 = m.index + m[1].length;
    add(s0, m[2].length + 4, '==highlight== means nothing and is reported nowhere. If the emphasis has a reason, [' + m[2] + ']{.hi} lands in the build report.',
      SEV().Hint, 'mark');
  }

  // ── footnotes ──
  const defs = new Map(), refs = [];
  const defRe = /^\[\^([^\]\s]+)\]:/gm;
  while ((m = defRe.exec(masked)) !== null) defs.set(m[1], m.index);
  const refRe = /\[\^([^\]\s]+)\](?!:)/g;
  while ((m = refRe.exec(masked)) !== null) refs.push([m[1], m.index]);
  const cited = new Set(refs.map(r => r[0]));
  for (const [label, at] of refs) if (!defs.has(label))
    add(at, label.length + 3, 'Footnote [^' + label + '] has no definition, so it renders as literal text. Add a line: [^' + label + ']: ...', SEV().Warning, 'footnote');
  for (const [label, at] of defs) if (!cited.has(label))
    add(at, label.length + 3, 'Footnote [^' + label + '] is defined but never cited.', SEV().Information, 'footnote');

  // ── tables ──
  const SEP = /^\s*\|?\s*:?-{1,}:?\s*(\|\s*:?-{1,}:?\s*)+\|?\s*$|^\s*\|\s*:?-{1,}:?\s*\|\s*$/;
  const cells = (l) => l.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '').split(/(?<!\\)\|/).length;
  for (let i = 0; i + 1 < lines.length; i++) {
    if (!lines[i].includes('|') || !SEP.test(lines[i + 1])) continue;
    const want = cells(lines[i]);
    let j = i + 2;
    for (; j < lines.length && lines[j].includes('|') && lines[j].trim(); j++) {
      const got = cells(lines[j]);
      if (got !== want) add(offs[j], lines[j].length, 'Row has ' + got + ' cells, header has ' + want + '. '
        + (got > want ? 'Python-Markdown DROPS the extra cells.' : 'Missing cells render empty.'), SEV().Warning, 'table');
    }
    i = j - 1;
  }
  return diags;
}

// ── quick fixes ──
function makeSyntaxActionProvider() {
  return {
    provideCodeActions(document, range, context) {
      const out = [];
      for (const d of context.diagnostics) {
        if (d.source !== 'page-id') continue;
        const raw = document.getText(d.range);
        const fix = (title, newText, r) => {
          const a = new vscode.CodeAction(title, vscode.CodeActionKind.QuickFix);
          a.edit = new vscode.WorkspaceEdit();
          a.edit.replace(document.uri, r || d.range, newText);
          a.diagnostics = [d]; a.isPreferred = true; out.push(a);
        };
        if (d.code === 'approx') fix('Mark as estimate: [' + raw.replace(/^~\s?/, '') + ']{.est}', '[' + raw.replace(/^~\s?/, '') + ']{.est}');
        if (d.code === 'mark') fix('Make it a reported highlight: {.hi}', '[' + raw.slice(2, -2) + ']{.hi}');
        if (d.code === 'unindented-body') {
          const lines = document.getText().split('\n');
          const stray = strayBody(lines, d.range.start.line);
          if (!stray) continue;
          const a = new vscode.CodeAction('Indent the body 4 spaces', vscode.CodeActionKind.QuickFix);
          a.edit = new vscode.WorkspaceEdit();
          const pad = ' '.repeat(stray.want);
          for (let l = stray.from; l <= stray.to; l++)
            a.edit.replace(document.uri, new vscode.Range(l, 0, l, lines[l].match(/^[ \t]*/)[0].length), pad);
          a.diagnostics = [d]; a.isPreferred = true; out.push(a);
        }
      }
      return out;
    }
  };
}

module.exports = { lintSyntax, makeSyntaxActionProvider };
