// Part of page-id-autocomplete. Split 2026-10-12 to stay under the ~22KB
// read ceiling: one concern per file, shared mutable state lives in state.js.
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const S = require('./state');

// name, slot source (frontmatter map key | 'page' | null), takes arg?, shape
const DIRECTIVES = [
  { name: 'data',       slots: 'data',  arg: true,  doc: 'draw a table from this page\'s `data:` slot' },
  { name: 'form',       slots: 'forms', arg: true,  doc: 'embed a ClickUp form from `forms:`' },
  { name: 'formpicker', slots: 'forms', arg: true,  doc: 'form picker over a `forms:` slot' },
  { name: 'view',       slots: 'views', arg: true,  doc: 'embed a ClickUp view from `views:`' },
  { name: 'tally',      slots: 'tally', arg: true,  doc: 'live-math worksheet from `tally:`' },
  { name: 'chain',      slots: 'page',  arg: 'optional', doc: 'contents list of a chain (bare = this page\'s own)' },
  { name: 'qr',         slots: null,    arg: true,  doc: 'a QR code' },
  { name: 'cards',      slots: null,    arg: false, block: true, doc: 'a card grid (indented body)' },
  { name: 'report',     slots: null,    arg: false, doc: 'the build report (engine sites)' },
  { name: 'tokens',     slots: null,    arg: false, doc: 'the theme token audit (engine sites)' }
];
const DIRECTIVE_NAMES = new Set(DIRECTIVES.map(d => d.name));


function readTsv(file) {
  const rows = [];
  let header = null;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    if (!line.trim() || line.startsWith('#')) continue;
    const cells = line.split('\t');
    if (!header) { header = cells.map(c => c.trim()); continue; }
    const row = {};
    header.forEach((h, i) => { row[h] = (cells[i] || '').trim(); });
    rows.push(row);
  }
  return rows;
}

function findEngine() {
  const cfg = vscode.workspace.getConfiguration('pageId').get('enginePath');
  const candidates = [];
  if (cfg) candidates.push(cfg.replace(/^~(?=\/)/, require('os').homedir()));
  for (const f of S.getWorkspaceFolders()) {
    candidates.push(path.join(f.uri.fsPath, '..', 'doc-render-engine'));
    candidates.push(f.uri.fsPath); // the engine repo itself is open
  }
  return candidates.find(c => fs.existsSync(path.join(c, 'objects', '_base.yml'))
    && fs.existsSync(path.join(c, 'theme', 'markers.tsv'))) || null;
}

function loadVocab() {
  const root = findEngine();
  if (!root) { S.VOCAB_SOURCE = 'built-in fallback (no doc-render-engine checkout found)'; return null; }
  try {
    const blocks = readTsv(path.join(root, 'theme', 'blocks.tsv'))
      .filter(r => r.block).map(r => [r.block, (r.note || '').split('.')[0]]);
    if (blocks.length) S.CALLOUTS = blocks;

    const markers = readTsv(path.join(root, 'theme', 'markers.tsv'))
      .filter(r => r.marker).map(r => [r.marker, r.class || '', r.label || '', r.tooltip || '', r.prefix || '']);
    if (markers.length) S.MARKERS = markers;

    const types = [], requires = {};
    for (const f of fs.readdirSync(path.join(root, 'objects'))) {
      if (!f.endsWith('.yml') || f.startsWith('_')) continue;
      const y = fs.readFileSync(path.join(root, 'objects', f), 'utf8');
      const t = y.match(/^type:\s*(\S+)/m);
      if (!t) continue;
      types.push(t[1]);
      const req = y.match(/^requires:\s*\n((?:[ \t]+-[^\n]*\n?)+)/m);
      if (req) requires[t[1]] = [...req[1].matchAll(/-\s*([A-Za-z_][\w-]*)/g)].map(m => m[1]);
    }
    if (types.length) { S.KNOWN_TYPES = types.sort(); S.TYPE_REQUIRES = requires; }

    const op = fs.readFileSync(path.join(root, 'docrender', 'objects.py'), 'utf8');
    const vs = op.match(/VALID_STATUS\s*=\s*\{([^}]*)\}/);
    if (vs) {
      const st = [...vs[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
      if (st.length) S.KNOWN_STATUSES = st;
    }
    S.VOCAB_SOURCE = 'live from ' + root;
    return root;
  } catch (e) {
    S.VOCAB_SOURCE = 'built-in fallback (engine read failed: ' + e.message + ')';
    return null;
  }
}


module.exports = { DIRECTIVES, DIRECTIVE_NAMES, readTsv, findEngine, loadVocab };
