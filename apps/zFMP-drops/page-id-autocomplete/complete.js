// Part of page-id-autocomplete. Split 2026-10-12 to stay under the ~22KB
// read ceiling: one concern per file, shared mutable state lives in state.js.
const vscode = require('vscode');
const S = require('./state');
const { FM_ID_KEYS, fmBounds, fmMapKeys } = require('./refs');
const { DIRECTIVES } = require('./vocab');

// ═══════════════════════════════════════════════════════════════════════════
// COMPLETION PROVIDERS
// ═══════════════════════════════════════════════════════════════════════════

function makePageProvider() {
  return {
    provideCompletionItems(document, position) {
      const line = document.lineAt(position).text;
      const prefix = line.substring(0, position.character);
      const at = prefix.lastIndexOf('@');
      if (at === -1) return [];

      const afterAt = prefix.substring(at + 1);
      // Anything with a colon is a namespace (@img:, @url:, @fmp:, @rel:, a peer...):
      // those have their own providers, and page ids never contain a colon.
      if (!/^[A-Za-z0-9_.-]*$/.test(afterAt)) return [];   // also stops at #anchor, ), spaces

      const range = new vscode.Range(position.line, at, position.line, position.character);
      return Object.entries(S.pageIndex).map(([id, info]) => {
        const item = new vscode.CompletionItem(id, vscode.CompletionItemKind.Reference);
        item.detail = info.description || '';
        item.insertText = '@' + id;
        item.range = range;
        item.filterText = '@' + id;
        item.sortText = id;
        return item;
      });
    }
  };
}

function makeImageProvider() {
  return {
    provideCompletionItems(document, position) {
      const line = document.lineAt(position).text;
      const prefix = line.substring(0, position.character);
      const trigger = prefix.lastIndexOf('@img:');
      if (trigger === -1) return [];
      const range = new vscode.Range(position.line, trigger, position.line, position.character);
      return Object.entries(S.imageIndex).map(([stem, relPath]) => {
        const item = new vscode.CompletionItem(stem, vscode.CompletionItemKind.File);
        item.detail = relPath;
        item.insertText = '@img:' + stem;
        item.range = range;
        item.filterText = '@img:' + stem;
        item.sortText = stem;
        return item;
      });
    }
  };
}

function makePeerProvider() {
  return {
    provideCompletionItems(document, position) {
      const line = document.lineAt(position).text;
      const prefix = line.substring(0, position.character);
      for (const [peerSlug, pages] of Object.entries(S.peerIndex)) {
        const trigger = prefix.lastIndexOf('@' + peerSlug + ':');
        if (trigger === -1) continue;
        const range = new vscode.Range(position.line, trigger, position.line, position.character);
        return Object.entries(pages).map(([id, url]) => {
          const item = new vscode.CompletionItem(id, vscode.CompletionItemKind.Reference);
          item.detail = peerSlug + ' peer';
          item.insertText = '@' + peerSlug + ':' + id;
          item.range = range;
          item.filterText = '@' + peerSlug + ':' + id;
          item.sortText = id;
          return item;
        });
      }
      return [];
    }
  };
}


// ── Body: !!! / ??? callouts + directives, directive slots, {. markers ──

function makeBodyProvider() {
  return {
    provideCompletionItems(document, position) {
      const text = document.getText();
      const fm = fmBounds(text);
      if (fm && document.offsetAt(position) <= fm.end + 4) return [];
      const line = document.lineAt(position).text;
      const prefix = line.substring(0, position.character);

      // 1. Slot inside a directive's quotes:  !!! data "|
      const slotM = prefix.match(/^\s*!!!\s+([a-z]+)\s+"([^"]*)$/);
      if (slotM) {
        const d = DIRECTIVES.find(x => x.name === slotM[1]);
        if (!d || !d.slots) return [];
        const start = position.translate(0, -slotM[2].length);
        const range = new vscode.Range(start, position);
        const closes = line.charAt(position.character) === '"';
        if (d.slots === 'page') {
          return Object.entries(S.pageIndex).map(([pid, info]) => {
            const it = new vscode.CompletionItem(pid, vscode.CompletionItemKind.Reference);
            it.detail = info.description || ''; it.range = range;
            it.insertText = pid + (closes ? '' : '"');
            return it;
          });
        }
        const keys = fmMapKeys(text, d.slots);
        if (!keys.length) {
          const it = new vscode.CompletionItem('(no `' + d.slots + ':` slots on this page)', vscode.CompletionItemKind.Text);
          it.insertText = ''; it.range = range;
          return [it];
        }
        return keys.map(k => {
          const it = new vscode.CompletionItem(k, vscode.CompletionItemKind.Field);
          it.detail = d.slots + ': slot on this page'; it.range = range;
          it.insertText = k + (closes ? '' : '"');
          return it;
        });
      }

      // 2. Callout / directive name:  !!! |   ??? |   ???+ |
      const headM = prefix.match(/^(\s*)(!!!|\?\?\?\+?)(\s*)([a-z-]*)$/);
      if (headM) {
        const [, indent, fence, gap, word] = headM;
        const start = position.translate(0, -word.length);
        const range = new vscode.Range(start, position);
        const lead = gap ? '' : ' ';
        const body = '\n' + indent + '    ';
        const items = S.CALLOUTS.map(([name, note], i) => {
          const it = new vscode.CompletionItem(name, vscode.CompletionItemKind.Color);
          it.detail = (fence === '!!!' ? 'callout' : 'collapsible callout') + ': ' + note;
          it.documentation = new vscode.MarkdownString('Body must be indented 4 spaces (blocks.tsv).');
          it.insertText = new vscode.SnippetString(lead + name + '${1: "${2:Title}"}' + body + '$0');
          it.range = range; it.sortText = '0' + String(i).padStart(2, '0');
          return it;
        });
        if (fence === '!!!') {
          DIRECTIVES.forEach((d, i) => {
            const it = new vscode.CompletionItem(d.name, vscode.CompletionItemKind.Function);
            it.detail = 'directive: ' + d.doc;
            let snip = lead + d.name;
            if (d.arg === true) snip += ' "$1"$0';
            else if (d.arg === 'optional') snip += '${1: "$2"}$0';
            else if (d.block) snip += body + '$0';
            it.insertText = new vscode.SnippetString(snip);
            it.range = range; it.sortText = '1' + String(i).padStart(2, '0');
            if (d.arg) it.command = { command: 'editor.action.triggerSuggest', title: 'slots' };
            return items.push(it);
          });
        }
        return items;
      }

      // 3. Marker:  {.|   [text]{.|   { .|
      const markM = prefix.match(/\{[ \t]*\.([a-z0-9-]*)$/);
      if (markM) {
        const start = position.translate(0, -markM[1].length);
        const range = new vscode.Range(start, position);
        const closes = /^[ \t]*\}/.test(line.substring(position.character));
        const items = S.MARKERS.map(([name, klass, label, tip, pfx], i) => {
          const it = new vscode.CompletionItem(name, vscode.CompletionItemKind.EnumMember);
          it.detail = klass + (label ? ' · ' + label : '') + (pfx ? ' · link form @' + pfx + ':' : '');
          it.documentation = tip;
          it.insertText = name + (closes ? '' : '}');
          it.range = range; it.sortText = klass + name;
          return it;
        });
        for (const [name, doc] of S.ATTR_CLASSES) {
          const it = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
          it.detail = 'class (not a marker) · ' + doc;
          it.insertText = name + (closes ? '' : '}');
          it.range = range; it.sortText = 'zz' + name;
          items.push(it);
        }
        return items;
      }
      return [];
    }
  };
}

function makeFrontmatterProvider() {
  return {
    provideCompletionItems(document, position) {
      const line = document.lineAt(position).text;
      const prefix = line.substring(0, position.character).trimStart();

      let fenceCount = 0;
      for (let i = 0; i < position.line; i++) {
        if (document.lineAt(i).text.trim() === '---') fenceCount++;
      }
      if (fenceCount !== 1) return [];

      let items = [];

      // Page ids for id-bearing keys: "parent: ", or "- " under chain:/related:
      let idKey = null;
      const scalarKey = prefix.match(/^(parent|related|chain)\s*:\s*\[?([^,\]]*,\s*)*[^,\]]*$/);
      if (scalarKey) idKey = scalarKey[1];
      else if (/^-\s*/.test(prefix)) {
        for (let i = position.line - 1; i >= 0; i--) {
          const prev = document.lineAt(i).text;
          const top = prev.match(/^([A-Za-z_][\w-]*)\s*:/);
          if (top) { idKey = FM_ID_KEYS[top[1]] ? top[1] : null; break; }
        }
      }
      if (idKey) {
        return Object.entries(S.pageIndex).map(([pid, info]) => {
          const item = new vscode.CompletionItem(pid, vscode.CompletionItemKind.Reference);
          item.detail = (info.description || '') + '  (' + idKey + ':)';
          item.sortText = pid;
          return item;
        });
      }

      if (prefix.startsWith('status:')) {
        items = S.KNOWN_STATUSES.map(v => {
          const item = new vscode.CompletionItem(v, vscode.CompletionItemKind.EnumMember);
          item.detail = 'frontmatter value';
          return item;
        });
      } else if (prefix.startsWith('type:')) {
        items = S.KNOWN_TYPES.map(v => {
          const item = new vscode.CompletionItem(v, vscode.CompletionItemKind.EnumMember);
          item.detail = 'frontmatter value';
          return item;
        });
      } else if (prefix.startsWith('theme:')) {
        items = S.KNOWN_THEMES.map(v => {
          const item = new vscode.CompletionItem(v, vscode.CompletionItemKind.EnumMember);
          item.detail = 'theme';
          return item;
        });
      } else if (prefix.startsWith('revised:')) {
        const today = new vscode.CompletionItem(S.todayFormatted(), vscode.CompletionItemKind.Value);
        today.detail = 'today';
        today.sortText = '0';
        today.preselect = true;
        const month = new vscode.CompletionItem(S.thisMonthFormatted(), vscode.CompletionItemKind.Value);
        month.detail = 'this month';
        month.sortText = '1';
        items = [today, month];
      } else if (prefix.startsWith('hide:') || prefix.match(/^\s*-\s*$/)) {
        let inHideBlock = false;
        for (let i = position.line - 1; i >= 0; i--) {
          const prev = document.lineAt(i).text.trimStart();
          if (prev.startsWith('hide:')) { inHideBlock = true; break; }
          if (!prev.startsWith('-') && prev !== '') break;
        }
        if (prefix.startsWith('hide:') || inHideBlock) {
          items = S.KNOWN_HIDE.map(v => {
            const item = new vscode.CompletionItem(v, vscode.CompletionItemKind.EnumMember);
            item.detail = 'hide option';
            return item;
          });
        }
      } else if (prefix.startsWith('order:')) {
        items = ['10','20','30','40','50','60','70','80','90','100'].map(v => {
          const item = new vscode.CompletionItem(v, vscode.CompletionItemKind.Value);
          item.detail = 'page order';
          return item;
        });
      }

      return items;
    }
  };
}


module.exports = { makePageProvider, makeImageProvider, makePeerProvider, makeBodyProvider, makeFrontmatterProvider };
