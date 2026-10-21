// Part of page-id-autocomplete. Split 2026-10-12 to stay under the ~22KB
// read ceiling: one concern per file, shared mutable state lives in state.js.
const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

let pageIndex = {};
let imageIndex = {};
let peerIndex = {};
let reverseRefs = {};  // pageId -> [{ fromId, fromFile, fromLine }]

// FALLBACK vocabulary, copied from doc-render-engine 2026-10-12 (objects.py
// VALID_STATUS, objects/*.yml). vocab.js overwrites these from a live engine
// checkout when one is found; these only apply when none is.
let KNOWN_STATUSES = ['public', 'unlisted', 'gated', 'hidden'];
let KNOWN_TYPES = [
  'page', 'index', 'binder', 'procedure', 'program', 'reference',
  'role', 'sign', 'space', 'standard', 'venue'
];
// Per-type required fields beyond _base (objects/<type>.yml `requires:`)
let TYPE_REQUIRES = { space: ['parent'], role: ['gloss'] };
const KNOWN_THEMES = [
  'eos', 'papyrus', 'database', 'utility',
  'uritp', 'uritp-safety',
  'sharp-utility', 'soft-utility',
  'sharp-mclaren', 'mclaren-mobile',
  'sharp-carbon', 'soft-mercedes',
  'grounded-neutral', 'on-track', 'f1-racetracks'
];
// Material's `hide:` key, not ours. Only values seen in use in the repos are listed.
const KNOWN_HIDE = ['navigation', 'toc', 'footer'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function todayFormatted() {
  const d = new Date();
  return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}

function thisMonthFormatted() {
  const d = new Date();
  return MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}

function getWorkspaceFolders() {
  return vscode.workspace.workspaceFolders || [];
}


// ── Body vocabulary: callouts, directives, markers ─────────────────────
//
// FALLBACKS ONLY. Copied from doc-render-engine 2026-10-12:
//   callouts   theme/blocks.tsv       (13 families; Material's 12 + `good`)
//   markers    theme/markers.tsv      (marker, class, label, tooltip, prefix)
//   directives docrender/*.py `!!! x` regexes
// When a doc-render-engine checkout sits next to the open repo (or
// pageId.enginePath points at one), loadVocab() reads the REAL files and
// these lists are ignored. That is the fix for hand-copied vocab drifting.

let CALLOUTS = [
  ['note', 'the house voice'], ['abstract', 'summary / TL;DR'], ['info', 'informational aside'],
  ['tip', 'advice that helps'], ['success', 'something worked or is confirmed'],
  ['question', 'open question / FAQ'], ['warning', 'proceed carefully'],
  ['failure', 'something did not work'], ['danger', 'a hazard'], ['bug', 'a known defect'],
  ['example', 'a worked example'], ['quote', 'a quotation'],
  ['good', 'positive pointer: first aid here, the good entrance']
];

let MARKERS = [
  ['tbc', 'confidence', 'To be confirmed', 'Not yet verified against a source.'],
  ['verify', 'confidence', 'Verify on site', 'Recorded once and never re-checked.'],
  ['gap', 'confidence', 'Not recorded', 'This fact should exist and does not.'],
  ['conf', 'confidence', 'Confirmed', 'Double-checked against the real thing.'],
  ['est', 'confidence', 'Estimate', 'Approximate. Close enough to plan with.'],
  ['was', 'confidence', 'Superseded', 'The old VALUE. For an old NAME, use alias.'],
  ['term', 'terminology', '', 'House terminology.'],
  ['role', 'terminology', 'Role', 'A defined production role.'],
  ['hi', 'highlight', 'Highlight', 'Flagged as worth your attention.'],
  ['button', 'layout', 'Button', 'A button on a FileMaker layout.'],
  ['field', 'layout', 'Field', 'A field placed on a layout.'],
  ['portal', 'layout', 'Portal', 'A portal on a layout.'],
  ['layout', 'layout', 'Layout', 'A layout.'],
  ['calc', 'schema', 'Calculation', 'A calculated value.'],
  ['rel', 'schema', 'Relationship', 'A relationship between tables.'],
  ['script', 'schema', 'Script', 'A script.'],
  ['trigger', 'schema', 'Script trigger', 'A script trigger.'],
  ['global', 'schema', 'Global', 'A global field or a $$variable.'],
  ['vl', 'schema', 'Value list', 'A value list.'],
  ['alias', 'alias', 'Former name', 'A RETIRED NAME. Point it at the live one.']
];


// attr_list classes an AUTHOR types that are not markers (so the unknown-marker
// lint must leave them alone). Both read off the engine:
//   new-page   assets/print-flow.css `break-before: page` (mkdocs.yml attr_list note)
//   no-print   markerlinks.py NO_PRINT_CLASS, per-mention gloss suppression on paper
const ATTR_CLASSES = [
  ['new-page', 'print: start a new page here (on a heading/element)'],
  ['no-print', 'print: drop this role link\'s gloss on paper (link form only)']
];

let VOCAB_SOURCE = 'built-in fallback';
let diagnosticCollection = null;
let idLocations = {};

function walkTree(dir, callback) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch (_) { return; }
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkTree(fullPath, callback);
    else callback(fullPath);
  }
}

// One shared object. Other modules read AND reassign through it (S.pageIndex = {}),
// so every module always sees the current value.
module.exports = {
  todayFormatted, thisMonthFormatted, getWorkspaceFolders, walkTree,
  pageIndex, imageIndex, peerIndex, reverseRefs, idLocations, KNOWN_STATUSES, KNOWN_TYPES, TYPE_REQUIRES, KNOWN_THEMES, KNOWN_HIDE, MONTHS, ATTR_CLASSES, CALLOUTS, MARKERS, VOCAB_SOURCE, diagnosticCollection
};
