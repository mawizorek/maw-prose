// Part of page-id-autocomplete (v0.6). Registries the engine resolves `@x:`
// against, read from the same files the engine reads:
//   @url:   page `links:` (wins) + instances/<slug>/site.yml `links:`   urllinks.py
//   @fmp:   the NEAREST NAMES.tsv at or above the page's folder          fmpnames.py
//   #anchor heading slugs, Python-Markdown toc default slugify (+ {#explicit})
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const S = require('./state');
const { fmBounds } = require('./refs');
const { readTsv, findEngine } = require('./vocab');

const cache = new Map();   // kind|path -> { mtime, value }
function cached(kind, file, build) {
  const key = kind + '|' + file;
  let st;
  try { st = fs.statSync(file); } catch (_) { cache.delete(key); return null; }
  const hit = cache.get(key);
  if (hit && hit.mtime === st.mtimeMs) return hit.value;
  const value = build(fs.readFileSync(file, 'utf8'));
  cache.set(key, { mtime: st.mtimeMs, value });
  return value;
}

// Entries of a top-level YAML map: [{ name, value, children }]. Two spellings,
// same as urllinks._entry: `name: url` or `name:` + indented `url:` / `text:`.
function yamlMapEntries(body, key) {
  const out = [];
  let inBlock = false, indent = null, cur = null;
  for (const line of body.split('\n')) {
    if (new RegExp('^' + key + '\\s*:\\s*(#.*)?$').test(line)) { inBlock = true; continue; }
    if (!inBlock) continue;
    if (/^\S/.test(line)) break;
    const m = line.match(/^(\s+)(["']?)([^\s"':#][^"':]*?)\2\s*:\s*(.*?)\s*$/);
    if (!m) continue;
    if (indent === null) indent = m[1].length;
    if (m[1].length === indent) { cur = { name: m[3].trim(), value: m[4], children: {} }; out.push(cur); }
    else if (cur && m[1].length > indent) cur.children[m[3].trim()] = m[4];
  }
  return out;
}

function folderOf(fsPath) {
  return S.getWorkspaceFolders().find(f => fsPath.startsWith(f.uri.fsPath + path.sep)) || null;
}

// ── @url: ──
function siteLinks(fsPath) {
  const root = findEngine();
  const folder = folderOf(fsPath);
  if (!root || !folder) return null;           // null = unknown, not empty
  const repo = path.basename(folder.uri.fsPath);
  let dirs = [];
  try { dirs = fs.readdirSync(path.join(root, 'instances')); } catch (_) { return null; }
  for (const d of dirs) {
    const file = path.join(root, 'instances', d, 'site.yml');
    const parsed = cached('site', file, t => ({
      repo: (t.match(/^content_repo:\s*\S+\/([\w.-]+)/m) || [])[1],
      links: yamlMapEntries(t, 'links')
    }));
    if (parsed && parsed.repo === repo) return { slug: d, links: parsed.links };
  }
  return null;
}

function urlNames(document) {
  const fm = fmBounds(document.getText());
  const local = fm ? yamlMapEntries(fm.body, 'links') : [];
  const site = siteLinks(document.uri.fsPath);
  const names = new Map();
  if (site) for (const e of site.links) names.set(e.name, { ...e, where: 'site.yml (' + site.slug + ')' });
  for (const e of local) names.set(e.name, { ...e, where: 'this page' });   // the page wins
  return { names, siteKnown: !!site };
}

// ── @fmp: ──
function fmpCatalog(fsPath) {
  const folder = folderOf(fsPath);
  if (!folder) return null;
  let dir = path.dirname(fsPath);
  while (dir.startsWith(folder.uri.fsPath)) {
    const file = path.join(dir, 'NAMES.tsv');
    if (fs.existsSync(file)) {
      return { file: path.relative(folder.uri.fsPath, file),
        rows: cached('names', file, () => readTsv(file).filter(r => r.key)) || [] };
    }
    if (dir === folder.uri.fsPath) break;
    dir = path.dirname(dir);
  }
  return null;
}

// ── headings ──
function slugify(s) {
  return s.normalize('NFKD').replace(/[^\x00-\x7F]/g, '')
    .replace(/[^\w\s-]/g, '').trim().toLowerCase().replace(/[-\s]+/g, '-');
}

function headings(text) {
  const out = [], seen = new Map();
  let fence = null;
  for (const line of text.split('\n')) {
    const f = line.match(/^\s*(`{3,}|~{3,})/);
    if (f) { fence = fence ? (line.trim().startsWith(fence) ? null : fence) : f[1]; continue; }
    if (fence) continue;
    const h = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (!h) continue;
    let raw = h[2], slug;
    const explicit = raw.match(/\{[^}]*#([\w-]+)[^}]*\}\s*$/);
    raw = raw.replace(/\{[^}]*\}\s*$/, '');
    const shown = raw.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, '').trim();
    if (explicit) slug = explicit[1];
    else {
      slug = slugify(shown);
      const n = seen.get(slug) || 0;
      seen.set(slug, n + 1);
      if (n) slug = slug + '_' + n;
    }
    out.push({ slug, text: shown, level: h[1].length });
  }
  return out;
}

function pagePath(id) {
  const page = S.pageIndex[id];
  if (!page || !page.description) return null;
  for (const f of S.getWorkspaceFolders()) {
    const p = path.join(f.uri.fsPath, page.description);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function headingsOf(id, document) {
  if (!id) return headings(document.getText());
  const p = pagePath(id);
  if (!p) return null;
  return cached('headings', p, headings);
}

const markerPrefixes = () => new Set(S.MARKERS.map(m => m[4]).filter(Boolean));

// ── lint: anchors, @url:, @fmp: ──
function lintRegistry(document, masked) {
  const diags = [];
  const warn = (start, len, msg, sev, code) => {
    const d = new vscode.Diagnostic(new vscode.Range(document.positionAt(start), document.positionAt(start + len)),
      msg, sev === undefined ? vscode.DiagnosticSeverity.Warning : sev);
    d.source = 'page-id'; d.code = code; diags.push(d);
  };
  const prefixes = markerPrefixes();
  let m;

  // Anchors: ](@id#a)  ](@rel:id#a)  ](#a)
  const anc = /\]\((?:@(?:([a-z]+):)?([A-Za-z0-9_.-]+))?#([^)\s]+)\)/g;
  while ((m = anc.exec(masked)) !== null) {
    const [, pfx, id, anchor] = m;
    if (pfx && !prefixes.has(pfx)) continue;           // @url:x#a, @fmp:x#a: not ours to check
    if (id && !S.pageIndex[id]) continue;                // the dead id is already flagged
    const hs = headingsOf(id, document);
    if (!hs || hs.some(h => h.slug === anchor)) continue;
    const s = m.index + m[0].lastIndexOf('#') + 1;
    warn(s, anchor.length, 'No heading #' + anchor + ' on ' + (id ? '@' + id : 'this page') + '. Has: '
      + (hs.slice(0, 8).map(h => h.slug).join(', ') || 'no headings') + (hs.length > 8 ? ', ...' : ''), undefined, 'dead-anchor');
  }

  // @url:name
  const url = /\]\(@url:([\w.-]+)/g;
  let names = null;
  while ((m = url.exec(masked)) !== null) {
    names = names || urlNames(document);
    if (names.names.has(m[1]) || !names.siteKnown) continue;
    warn(m.index + 7, m[1].length, '@url:' + m[1] + ' is in neither this page\'s links: nor site.yml links:. Renders as a dead span.', undefined, 'dead-url');
  }

  // @fmp:key
  const fmp = /\]\(@fmp:([a-z0-9_.]+)/g;
  let cat;
  while ((m = fmp.exec(masked)) !== null) {
    if (cat === undefined) cat = fmpCatalog(document.uri.fsPath);
    if (!cat) { warn(m.index + 7, m[1].length, '@fmp: but no NAMES.tsv exists at or above this folder.', undefined, 'dead-fmp'); continue; }
    if (cat.rows.some(r => r.key === m[1])) continue;
    warn(m.index + 7, m[1].length, '@fmp:' + m[1] + ' is not a key in ' + cat.file + '.', undefined, 'dead-fmp');
  }
  // Typed marker links: markerlinks.py holds @role:x to a page of type: role
  // (marker name == page type name). Reported, never refused -- same as the engine.
  const typed = /\]\(@([a-z]+):([A-Za-z0-9_.-]+)/g;
  while ((m = typed.exec(masked)) !== null) {
    const [, pfx, id] = m;
    if (!prefixes.has(pfx) || !S.KNOWN_TYPES.includes(pfx) || !S.pageIndex[id]) continue;
    const p = pagePath(id);
    const t = p && cached('type', p, txt => { const f = fmBounds(txt); return f ? ((f.body.match(/^type\s*:\s*(\S+)/m) || [])[1] || 'page') : 'page'; });
    if (t && t !== pfx) warn(m.index + 4 + pfx.length, id.length, '@' + pfx + ':' + id + ' points at a type: ' + t
      + ' page. It links fine, but carries none of what a ' + pfx + ' page supplies (gloss:).', vscode.DiagnosticSeverity.Information, 'typed-target');
  }
  return diags;
}

module.exports = { yamlMapEntries, urlNames, fmpCatalog, headings, headingsOf, slugify, markerPrefixes, lintRegistry };
