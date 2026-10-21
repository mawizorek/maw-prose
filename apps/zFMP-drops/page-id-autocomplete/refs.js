// Part of page-id-autocomplete. Split 2026-10-12 to stay under the ~22KB
// read ceiling: one concern per file, shared mutable state lives in state.js.
const S = require('./state');

// ── Reference extraction (body + frontmatter) ──────────────────────────
//
// Mirrors the engine's id-bearing surfaces:
//   body      [text](@id)  [text](@id#anchor)   links.py (prefixed @x:y skipped)
//   body      !!! chain "id"                     chainlist.py
//   fm        chain:   - id | - section: ... (skipped) | - subtitle: (skipped)
//   fm        related: id | a, b | [a, b] | - id | - id: local text   related.py
//   fm        parent:  id                        objects/space.yml
// A leading @ is tolerated in fm values, same as related.py _entries().

const FM_ID_KEYS = { chain: 'list', related: 'list', parent: 'scalar' };
const CHAIN_SKIP_KEYS = new Set(['section', 'subtitle']);

function fmBounds(text) {
  const m = text.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/);
  if (!m) return null;
  const start = text.indexOf('\n') + 1;
  return { start, end: start + m[1].length, body: m[1] };
}

function cleanId(raw) {
  return String(raw).trim().replace(/^["']|["']$/g, '').trim().replace(/^@/, '');
}

function extractRefs(text) {
  const refs = [];
  const fm = fmBounds(text);

  // ── Frontmatter ──
  if (fm) {
    let key = null;
    let offset = fm.start;
    for (const line of fm.body.split('\n')) {
      const top = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*?)\s*$/);
      if (top) {
        key = FM_ID_KEYS[top[1]] ? top[1] : null;
        const val = top[2];
        if (key && val && !val.startsWith('#')) {
          const valStart = offset + line.indexOf(val, top[1].length + 1);
          const inner = val.replace(/^\[|\]$/g, '');
          const innerStart = valStart + (val.startsWith('[') ? 1 : 0);
          const parts = (FM_ID_KEYS[key] === 'scalar') ? [inner] : inner.split(',');
          let cursor = 0;
          for (const part of parts) {
            const at = inner.indexOf(part, cursor);
            cursor = at + part.length;
            const id = cleanId(part);
            if (!id) continue;
            const s = innerStart + at + part.indexOf(part.trim());
            refs.push({ id, start: s, end: s + part.trim().length, kind: 'fm:' + key });
          }
        }
      } else if (key && FM_ID_KEYS[key] === 'list') {
        const item = line.match(/^(\s*-\s+)(.*?)\s*$/);
        if (item) {
          let raw = item[2];
          const mapKey = raw.match(/^["']?([^"':\s]+)["']?\s*:(\s|$)/);
          if (mapKey) {
            if (CHAIN_SKIP_KEYS.has(mapKey[1])) { offset += line.length + 1; continue; }
            raw = mapKey[1];
          }
          const id = cleanId(raw);
          if (id) {
            const s = offset + item[1].length + item[2].indexOf(raw);
            refs.push({ id, start: s, end: s + raw.length, kind: 'fm:' + key });
          }
        } else if (/^\S/.test(line)) {
          key = null;
        }
        // indented non-dash lines (e.g. "  subtitle: ...") are continuations: skip
      }
      offset += line.length + 1;
    }
  }

  // ── Body: [text](@id...) ──
  const bodyFrom = fm ? fm.end : 0;
  const linkRe = /\]\(@([A-Za-z0-9_.:-]+)/g;
  let m;
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index < bodyFrom) continue;
    const token = m[1];
    if (token.includes(':')) {
      // Marker LINK form (@rel:, @calc:, @role: ...) targets a page id
      // (markerlinks.py: state.PAGES.get(rest)). Everything else with a colon
      // (@img:, @data:, @url:, @fmp:, @peer:) is not a page id.
      const [pfx, rest] = [token.slice(0, token.indexOf(':')), token.slice(token.indexOf(':') + 1)];
      if (rest && S.MARKERS.some(r => r[4] === pfx)) {
        const s0 = m.index + 3 + pfx.length + 1;
        refs.push({ id: rest, start: s0, end: s0 + rest.length, kind: 'marker:' + pfx });
      }
      continue;
    }
    const s = m.index + 3;                        // after "](@"
    refs.push({ id: token, start: s - 1, end: s + token.length, kind: 'link' });
  }

  // ── Body: !!! chain "id" ──
  const chainRe = /^[ \t]*!!![ \t]+chain[ \t]+"([^"\n]*)"[ \t]*$/gm;
  while ((m = chainRe.exec(text)) !== null) {
    if (m.index < bodyFrom) continue;
    const id = m[1].trim();
    if (!id) continue;
    const s = m.index + m[0].indexOf('"') + 1;
    refs.push({ id, start: s, end: s + m[1].length, kind: 'chain-directive' });
  }
  return refs;
}

// Is this document offset inside an id-bearing frontmatter value?
function idContextAt(document, position) {
  const text = document.getText();
  const off = document.offsetAt(position);
  return extractRefs(text).find(r => off >= r.start && off <= r.end) || null;
}

// Top-level keys of a frontmatter MAP block, e.g. the slot names under `data:`.
function fmMapKeys(text, key) {
  const fm = fmBounds(text);
  if (!fm) return [];
  const lines = fm.body.split('\n');
  const keys = [];
  let inBlock = false, indent = null;
  for (const line of lines) {
    if (new RegExp('^' + key + '\\s*:\\s*(#.*)?$').test(line)) { inBlock = true; indent = null; continue; }
    if (!inBlock) continue;
    if (/^\S/.test(line)) break;            // next top-level key
    const m = line.match(/^(\s+)(["']?)([^\s"':#][^"':]*?)\2\s*:/);
    if (!m) continue;
    if (indent === null) indent = m[1].length;
    if (m[1].length === indent) keys.push(m[3].trim());
  }
  return keys;
}

// Byte ranges of fenced code, so a page DOCUMENTING syntax is not linted.
function codeRanges(text) {
  const out = [];
  const re = /^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?(^[ \t]*\1[ \t]*$|$(?![\s\S]))/gm;
  let m;
  while ((m = re.exec(text)) !== null) out.push([m.index, m.index + m[0].length]);
  return out;
}
const inRanges = (ranges, off) => ranges.some(([a, b]) => off >= a && off < b);


// The text with frontmatter, fenced code and inline code blanked to spaces
// (newlines kept), so offsets still line up and documented syntax is not linted.
function maskCode(text) {
  const blank = (str) => str.replace(/[^\n]/g, ' ');
  let out = text;
  const fm = fmBounds(text);
  if (fm) out = blank(out.slice(0, fm.end + 4)) + out.slice(fm.end + 4);
  out = out.replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?(^[ \t]*\1[ \t]*$|$(?![\s\S]))/gm, blank);
  out = out.replace(/(`+)[^`\n][\s\S]*?\1/g, (m0) => m0.includes('\n\n') ? m0 : blank(m0));
  return out;
}

module.exports = { maskCode, FM_ID_KEYS, fmBounds, cleanId, extractRefs, idContextAt, fmMapKeys, codeRanges, inRanges };
