// Part of page-id-autocomplete. Split 2026-10-12 to stay under the ~22KB
// read ceiling: one concern per file, shared mutable state lives in state.js.
const fs = require('fs');
const path = require('path');
const S = require('./state');
const { fmBounds, extractRefs } = require('./refs');

// ── Page index (from snippets) ──────────────────────────────────────────

function loadPageIndex() {
  S.pageIndex = {};
  for (const folder of S.getWorkspaceFolders()) {
    const snippetsPath = path.join(folder.uri.fsPath, '.vscode', 'project.code-snippets');
    try {
      const raw = fs.readFileSync(snippetsPath, 'utf8');
      Object.assign(S.pageIndex, JSON.parse(raw));
    } catch (_) {}
  }
}

// ── Image index ─────────────────────────────────────────────────────────

function loadImageIndex() {
  S.imageIndex = {};
  const exts = ['.jpg', '.jpeg', '.png', '.svg', '.gif', '.webp', '.avif'];
  for (const folder of S.getWorkspaceFolders()) {
    S.walkTree(folder.uri.fsPath, (filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      if (!exts.includes(ext)) return;
      const rel = path.relative(folder.uri.fsPath, filePath);
      const stem = path.basename(filePath, path.extname(filePath));
      if (!S.imageIndex[stem]) {
        S.imageIndex[stem] = rel;
      }
    });
  }
}

// ── Peer index ──────────────────────────────────────────────────────────

function loadPeerIndex() {
  S.peerIndex = {};
  for (const folder of S.getWorkspaceFolders()) {
    for (const name of ['xref-cache.json', '.vscode/xref-cache.json']) {
      try {
        const raw = fs.readFileSync(path.join(folder.uri.fsPath, name), 'utf8');
        const data = JSON.parse(raw);
        if (typeof data === 'object') Object.assign(S.peerIndex, data);
      } catch (_) {}
    }
  }
}

// ── Reverse references ──────────────────────────────────────────────────

function buildReverseRefs() {
  S.reverseRefs = {};
  for (const folder of S.getWorkspaceFolders()) {
    S.walkTree(folder.uri.fsPath, (filePath) => {
      if (!filePath.endsWith('.md')) return;
      let content;
      try { content = fs.readFileSync(filePath, 'utf8'); } catch (_) { return; }
      const fm = fmBounds(content);
      let fromId = null;
      if (fm) {
        const idMatch = fm.body.match(/^(?:@id|id)\s*:\s*["']?(.+?)["']?\s*$/m);
        if (idMatch) fromId = idMatch[1];
      }
      const rel = path.relative(folder.uri.fsPath, filePath);
      for (const r of extractRefs(content)) {
        if (!S.reverseRefs[r.id]) S.reverseRefs[r.id] = [];
        const lineNum = content.substring(0, r.start).split('\n').length;
        S.reverseRefs[r.id].push({ fromId, fromFile: rel, fromLine: lineNum, fullPath: filePath, kind: r.kind });
      }
    });
  }
}

// ── Duplicate ID detection ──────────────────────────────────────────────

function buildIdLocations() {
  S.idLocations = {};
  const fmRe = /^---\s*\n(.*?)\n---/s;
  const idRe = /^(?:@id|id)\s*:\s*["']?(.+?)["']?\s*$/m;
  for (const folder of S.getWorkspaceFolders()) {
    S.walkTree(folder.uri.fsPath, (filePath) => {
      if (!filePath.endsWith('.md')) return;
      let content;
      try { content = fs.readFileSync(filePath, 'utf8').substring(0, 4096); } catch (_) { return; }
      const fm = fmRe.exec(content);
      if (!fm) return;
      const m = idRe.exec(fm[1]);
      if (!m) return;
      const id = m[1];
      const rel = path.relative(folder.uri.fsPath, filePath);
      // Line number of the id field
      const beforeId = content.substring(0, content.indexOf(m[0]));
      const lineNum = beforeId.split('\n').length;
      if (!S.idLocations[id]) S.idLocations[id] = [];
      S.idLocations[id].push({ file: rel, line: lineNum, fullPath: filePath });
    });
  }
}

// ── Load everything ─────────────────────────────────────────────────────

function loadAll() {
  loadPageIndex();
  loadImageIndex();
  loadPeerIndex();
  buildIdLocations();
  buildReverseRefs();
}


module.exports = { loadPageIndex, loadImageIndex, loadPeerIndex, buildReverseRefs, buildIdLocations, loadAll };
