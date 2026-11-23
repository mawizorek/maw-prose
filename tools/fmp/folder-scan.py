#!/usr/bin/env python3
"""folder-scan.py: one folder of files -> a paged manifest URITP Utilities reads with Read from Data File.

    python3 tools/fmp/folder-scan.py "<root>" --out "<URITP Utilities folder>/folder-scans" --init <code>   # first run only
    python3 tools/fmp/folder-scan.py "<root>" --out "<URITP Utilities folder>/folder-scans"                 # every run
    python3 tools/fmp/folder-scan.py "<root>" --out "..." --verify                                          # rehash everything

Identity (J43): one record per file placement. The root is named by the code in <root>/.uritp-root, never by its
mount path, so the same folder reads the same on any Mac and an unplugged drive refuses instead of reading as empty.
The marker also records the volume it was named on. A cloned backup drive carries a copy of the marker, so a scan
on a different volume refuses: name the clone with --init <new code>, or --adopt if it really is the same root
(a replaced or reformatted drive). On APFS and HFS+ it also records its own file number: a move keeps it, a Finder
duplicate on the same disk gets a new one, so the duplicate refuses too. A Dropbox or Drive root is named with
--synced, since it lives on many Macs.
Version = sha256. Each file is read once, in 4 MiB blocks, feeding two hashes: plain sha256 and Dropbox's
content_hash (sha256 of the block sha256s), so a drive copy matches the hash Dropbox's API reports without a download.

Safety: online-only cloud placeholders (macOS File Provider dataless, or size > 0 with no allocated blocks) are
reported and never read, since reading one downloads it. A file whose size or mtime moves while it is hashed is
reported unstable and not hashed. Symlinks are never followed. Hashes are cached by size + mtime (not inode: exFAT
inodes change per mount), so a 20 GB video is read once; --verify ignores the cache.

Output: <out>/<code>/scan-<id>/page-NNNN.json + scan.json (written last, complete: true), then <out>/<code>/latest.json
points at it. Each step is a temp write + rename, so FileMaker never reads half a scan. Standard library only.
"""
import argparse, datetime, hashlib, json, os, plistlib, re, shlex, shutil, subprocess, sys, time, unicodedata

BLOCK = 4 * 1024 * 1024                      # Dropbox content_hash block size, exactly 4 MiB
MARKER = '.uritp-root'
SF_DATALESS = 0x40000000                     # macOS: file content lives in the cloud only
SKIP_NAMES = {MARKER, '.DS_Store', 'Icon\r', '.dropbox', '.dropbox.attr', '.dropbox.cache', '.Trashes',
              '.Spotlight-V100', '.fseventsd', '.TemporaryItems', '.DocumentRevisions-V100', '$RECYCLE.BIN'}
PACKAGES = {'app', 'bundle', 'fcpbundle', 'fcpxbundle', 'imovielibrary', 'photoslibrary', 'logicx', 'band',
            'rtfd', 'key', 'pages', 'numbers', 'sparsebundle', 'theater', 'dvdmedia'}
MEDIA = {'mov', 'mp4', 'm4v', 'mxf', 'avi', 'mkv', 'webm', 'mts', 'wav', 'aif', 'aiff', 'mp3', 'm4a', 'flac',
         'jpg', 'jpeg', 'png', 'tif', 'tiff', 'heic', 'gif', 'webp'}
CODE = re.compile(r'^[a-z0-9_]+$')
KEEP_SCANS = 5

def now_iso(): return datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
def iso(ns): return datetime.datetime.fromtimestamp(ns / 1e9, datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
def nfc(s): return unicodedata.normalize('NFC', s)
def ext_of(name):
    base, dot, e = name.rpartition('.')
    return e.lower() if dot and base else ''

def volume_info(path):
    """(VolumeUUID, filesystem) from macOS diskutil. Empty when unknown. FOLDER_SCAN_VOLUME / _FS override, for tests only."""
    if 'FOLDER_SCAN_VOLUME' in os.environ: return os.environ['FOLDER_SCAN_VOLUME'], os.environ.get('FOLDER_SCAN_FS', 'apfs')
    if sys.platform != 'darwin' or not shutil.which('diskutil'): return '', ''
    try:
        r = subprocess.run(['diskutil', 'info', '-plist', path], capture_output=True, timeout=20)
        d = plistlib.loads(r.stdout)
        return d.get('VolumeUUID', '') or '', (d.get('FilesystemType', '') or '').lower()
    except Exception: return '', ''

def read_marker(path):
    raw = open(path, encoding='utf-8').read().strip()
    try: m = json.loads(raw)
    except ValueError: m = {'code': raw}                       # plain-text marker: code only, volume unknown
    ino = m.get('inode', 0)
    return dict(code=str(m.get('code', '')), volume=str(m.get('volume', '')), synced=bool(m.get('synced', False)),
                inode=ino if isinstance(ino, int) else 0, named=str(m.get('named', '')))

def write_marker(path, m, track_inode):
    """Rewritten in place (same file, same inode), so the inode it records is its own."""
    if not os.path.exists(path): open(path, 'w').close()
    m = dict(m, inode=os.stat(path).st_ino if track_inode else 0)
    with open(path, 'w', encoding='utf-8') as f: json.dump(m, f, indent=1); f.write('\n')

def write_json(path, obj):
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f: json.dump(obj, f, ensure_ascii=False, separators=(',', ':'))
    os.replace(tmp, path)

def is_placeholder(st):
    if getattr(st, 'st_flags', 0) & SF_DATALESS: return True
    return st.st_size > 0 and getattr(st, 'st_blocks', 1) == 0

def hash_file(path, st0):
    """One read, two hashes. Returns (sha256, dropbox_hash) or raises IOError('unstable')."""
    whole, blocks = hashlib.sha256(), []
    with open(path, 'rb', buffering=0) as f:
        while True:
            buf = bytearray()
            while len(buf) < BLOCK:
                chunk = f.read(BLOCK - len(buf))
                if not chunk: break
                buf += chunk
            if not buf: break
            whole.update(buf); blocks.append(hashlib.sha256(buf).digest())
            if len(buf) < BLOCK: break
    st1 = os.stat(path, follow_symlinks=False)
    if (st1.st_size, st1.st_mtime_ns) != (st0.st_size, st0.st_mtime_ns): raise IOError('unstable')
    return whole.hexdigest(), hashlib.sha256(b''.join(blocks)).hexdigest()

def probe(path):
    """Cheap media facts via ffprobe when installed. Unknown facts are left out, never null."""
    exe = shutil.which('ffprobe')
    if not exe: return None
    try:
        r = subprocess.run([exe, '-v', 'error', '-show_entries',
                            'format=duration:stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels',
                            '-of', 'json', path], capture_output=True, text=True, timeout=60)
        d = json.loads(r.stdout or '{}')
    except Exception: return None
    m = {}
    try:
        dur = float(d.get('format', {}).get('duration', ''))
        if dur > 0: m['duration_s'] = round(dur, 3)
    except ValueError: pass
    for s in d.get('streams', []):
        t = s.get('codec_type')
        if t == 'video' and 'video' not in m:
            v = {k: s[k] for k in ('width', 'height') if isinstance(s.get(k), int)}
            if s.get('codec_name'): v['codec'] = s['codec_name']
            fr = s.get('r_frame_rate', '')
            if re.match(r'^\d+/\d+$', fr) and not fr.endswith('/0'):
                a, b = fr.split('/'); v['fps'] = round(int(a) / int(b), 3)
            if v: m['video'] = v
        elif t == 'audio' and 'audio' not in m:
            a = {}
            if s.get('codec_name'): a['codec'] = s['codec_name']
            if str(s.get('sample_rate', '')).isdigit(): a['sample_rate'] = int(s['sample_rate'])
            if isinstance(s.get('channels'), int): a['channels'] = s['channels']
            if a: m['audio'] = a
    return m or None

class Scan:
    def __init__(self, root, code, cache, verify, media, out):
        self.root, self.code, self.cache, self.verify, self.media, self.out = root, code, cache, verify, media, out
        self.new_cache, self.entries, self.skipped, self.errors = {}, [], {}, []
        self.counts = dict(files=0, read=0, cached=0, online_only=0, unstable=0, unreadable=0, packages=0)

    def skip(self, why): self.skipped[why] = self.skipped.get(why, 0) + 1

    def hashed(self, rel, full, st):
        """(sha256, dropbox_hash, source, media) using the cache unless --verify. Placeholders only ever hit the cache."""
        c = self.cache.get(rel)
        hit = c and c.get('size') == st.st_size and c.get('mtime_ns') == st.st_mtime_ns
        if hit and not self.verify:
            self.new_cache[rel] = c
            return c['sha256'], c['dropbox_hash'], 'cache', c.get('media')
        if is_placeholder(st):
            if hit: self.new_cache[rel] = c; return c['sha256'], c['dropbox_hash'], 'cache', c.get('media')
            return None, None, None, None
        sha, dbx = hash_file(full, st)
        med = probe(full) if self.media and ext_of(rel.rsplit('/', 1)[-1]) in MEDIA else None
        self.new_cache[rel] = dict(size=st.st_size, mtime_ns=st.st_mtime_ns, sha256=sha,
                                   dropbox_hash=dbx, media=med, hashed_at=now_iso())
        return sha, dbx, 'read', med

    def walk(self, d, rel_dir):
        try: it = sorted(os.scandir(d), key=lambda e: e.name)
        except OSError as e: self.errors.append(f'{rel_dir or "."}: {e.strerror}'); return
        for e in it:
            name = e.name
            rel = (rel_dir + '/' if rel_dir else '') + nfc(name)
            if name in SKIP_NAMES or name.startswith('._') or name == '.uritp': self.skip(name if name in SKIP_NAMES else 'appledouble'); continue
            if e.is_symlink(): self.skip('symlink'); continue
            if os.path.abspath(e.path) == self.out: self.skip('manifest folder'); continue
            if e.is_dir(follow_symlinks=False):
                if ext_of(name) in PACKAGES: self.package(e.path, rel)
                else: self.walk(e.path, rel)
                continue
            if not e.is_file(follow_symlinks=False): self.skip('special'); continue
            self.file(e.path, rel, name)

    def file(self, full, rel, name):
        st = os.stat(full, follow_symlinks=False)
        ent = dict(path=rel, name=nfc(name), ext=ext_of(name), kind='file', size=st.st_size, mtime=iso(st.st_mtime_ns))
        self.counts['files'] += 1
        try:
            sha, dbx, src, med = self.hashed(rel, full, st)
            if sha is None: ent['status'] = 'online_only'; self.counts['online_only'] += 1
            else:
                ent.update(status='online_only' if is_placeholder(st) else 'ok', sha256=sha, dropbox_hash=dbx, hash_source=src)
                if ent['status'] == 'online_only': self.counts['online_only'] += 1
                self.counts['read' if src == 'read' else 'cached'] += 1
                if med: ent['media'] = med
        except IOError as e:
            if str(e) == 'unstable': ent['status'] = 'unstable'; self.counts['unstable'] += 1
            else: ent['status'] = 'unreadable'; self.counts['unreadable'] += 1; self.errors.append(f'{rel}: {e}')
        self.entries.append(ent)

    def package(self, full, rel):
        """A macOS package (Keynote, Final Cut library) is one document: one entry, hashed over its sorted contents."""
        parts, size, latest, status = [], 0, 0, 'ok'
        for dp, dns, fns in os.walk(full, followlinks=False):
            dns.sort()
            for fn in sorted(fns):
                if fn in SKIP_NAMES or fn.startswith('._'): continue
                p = os.path.join(dp, fn)
                if os.path.islink(p): continue
                inner = rel + '/' + nfc(os.path.relpath(p, full).replace(os.sep, '/'))
                st = os.stat(p, follow_symlinks=False)
                size += st.st_size; latest = max(latest, st.st_mtime_ns)
                try:
                    sha, _, _, _ = self.hashed(inner, p, st)
                    if sha is None: status = 'online_only'; continue
                    parts.append(inner[len(rel) + 1:] + '\0' + sha + '\n')
                except IOError: status = 'unstable'
        ent = dict(path=rel, name=nfc(os.path.basename(full)), ext=ext_of(full), kind='package', size=size,
                   mtime=iso(latest) if latest else '', status=status)
        if status == 'ok':
            ent.update(sha256=hashlib.sha256(''.join(parts).encode('utf-8')).hexdigest(), hash_source='tree')
        self.counts['files'] += 1; self.counts['packages'] += 1
        if status != 'ok': self.counts[status] += 1
        self.entries.append(ent)

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('root'); ap.add_argument('--out', required=True)
    ap.add_argument('--init', metavar='CODE', help='first run: name this root (lowercase a-z, 0-9, _). Also names a cloned drive.')
    ap.add_argument('--synced', action='store_true', help='with --init: a Dropbox/Drive root that lives on many Macs (no volume check)')
    ap.add_argument('--adopt', action='store_true', help='same root on a new volume (replaced or reformatted drive): keep the code')
    ap.add_argument('--verify', action='store_true', help='ignore the hash cache and reread every local file')
    ap.add_argument('--no-media', action='store_true', help='skip ffprobe media facts')
    ap.add_argument('--page-size', type=int, default=200)
    a = ap.parse_args()

    root = os.path.abspath(a.root)
    if not os.path.isdir(root): sys.exit(f'REFUSED: {root} is not a folder (unplugged drive or wrong path). Nothing written.')
    marker = os.path.join(root, MARKER)
    vol, fs = volume_info(root)
    inode_fs = fs in ('apfs', 'hfs')                           # file numbers survive a remount here; not on exFAT/FAT
    have = read_marker(marker) if os.path.exists(marker) else None
    if a.init:
        if not CODE.match(a.init): sys.exit('REFUSED: --init code must be lowercase a-z, 0-9 and _ only.')
        if have and have['code'] != a.init:
            moved_disk = have['volume'] and vol and have['volume'] != vol
            copied = inode_fs and have['inode'] and have['volume'] == vol and os.stat(marker).st_ino != have['inode']
            if have['synced'] or not (moved_disk or copied):
                sys.exit(f'REFUSED: {root} is already named "{have["code"]}". Codes never change.')
            print(f'  named the copy: "{have["code"]}" (copied marker) -> "{a.init}"')
        upgrade = have and not have['synced'] and ((not have['volume'] and vol) or (inode_fs and not have['inode']))
        if not have or have['code'] != a.init or upgrade:
            write_marker(marker, dict(code=a.init, volume='' if a.synced else vol, synced=a.synced, named=now_iso()),
                         inode_fs and not a.synced)
    if not os.path.exists(marker): sys.exit(f'REFUSED: no {MARKER} in {root}. Name it once with --init <code>.')
    m = read_marker(marker); code = m['code']
    if not CODE.match(code): sys.exit(f'REFUSED: {marker} holds "{code}", not a valid code.')
    if a.adopt:
        write_marker(marker, dict(m, volume=vol), inode_fs and not m['synced']); m = read_marker(marker)
        print(f'  adopted: "{code}" now belongs to volume {vol or "(unknown)"} at {root}')
    elif not m['synced'] and m['volume'] and vol and m['volume'] != vol:
        sys.exit(f'REFUSED: "{code}" was named on volume {m["volume"]}, but this is volume {vol}. '
                 f'A cloned backup? Name it: --init <new code>. The same root on a replaced drive? --adopt. Nothing written.')
    elif not m['synced'] and inode_fs and m['inode'] and os.stat(marker).st_ino != m['inode']:
        sys.exit(f'REFUSED: this "{code}" marker is a copy (its file number changed). A duplicated folder? Name it: '
                 f'--init <new code>. Restored from a backup? --adopt. Nothing written.')
    if not m['synced'] and not m['volume']:
        print('  !! volume unknown for this root: clone detection is off until it is named on a Mac (rerun with --init <same code>).')

    base = os.path.join(os.path.abspath(a.out), code); os.makedirs(base, exist_ok=True)
    cache_path = os.path.join(base, 'hash-cache.json')
    try: cache = json.load(open(cache_path, encoding='utf-8'))
    except (OSError, ValueError): cache = {}

    started, t0 = now_iso(), time.time()
    scan_id = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    s = Scan(root, code, cache, a.verify, not a.no_media, os.path.abspath(a.out))
    s.walk(root, '')

    # FileMaker matches text without case; two paths that differ only by case would share one key there.
    seen, clash = {}, []
    for e in s.entries:
        k = e['path'].lower()
        if k in seen: clash.append(e['path']); clash.append(seen[k])
        seen[k] = e['path']
    dupes = {}
    for e in s.entries:
        if e.get('sha256'): dupes.setdefault(e['sha256'], []).append(e['path'])
    groups = [sorted(v) for v in dupes.values() if len(v) > 1]

    for left in [d for d in os.listdir(base) if d.startswith('.scan-') and d.endswith('.tmp')]:
        shutil.rmtree(os.path.join(base, left), ignore_errors=True)   # a crashed earlier scan; never read
    n = 1
    while os.path.exists(os.path.join(base, f'scan-{scan_id}')): n += 1; scan_id = scan_id.split('-')[0] + f'-{n}'
    tmp = os.path.join(base, f'.scan-{scan_id}.tmp'); final = os.path.join(base, f'scan-{scan_id}')
    os.makedirs(tmp)
    ps = max(1, a.page_size); pages = max(1, (len(s.entries) + ps - 1) // ps)
    for n in range(pages):
        write_json(os.path.join(tmp, f'page-{n:04d}.json'),
                   dict(scan=scan_id, page=n, last_page=n == pages - 1, files=s.entries[n * ps:(n + 1) * ps]))
    rescan = ' '.join(shlex.quote(x) for x in ['python3', os.path.abspath(__file__), root, '--out', os.path.abspath(a.out)])
    header = dict(scan=scan_id, root_code=code, root_path=root, volume=vol, filesystem=fs, synced=m['synced'],
                  mode='verify' if a.verify else 'scan', rescan=rescan, started=started, finished=now_iso(),
                  finished_local=datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S'), seconds=round(time.time() - t0, 1), pages=pages,
                  page_size=ps, counts=s.counts, skipped=s.skipped, duplicate_groups=len(groups),
                  case_clashes=sorted(set(clash)), errors=s.errors[:200], complete=True)
    write_json(os.path.join(tmp, 'scan.json'), header)
    os.rename(tmp, final)
    write_json(os.path.join(base, 'latest.json'), dict(scan=scan_id, dir=f'scan-{scan_id}', pages=pages, complete=True))
    write_json(cache_path, s.new_cache)
    for old in sorted(d for d in os.listdir(base) if d.startswith('scan-'))[:-KEEP_SCANS]:
        shutil.rmtree(os.path.join(base, old), ignore_errors=True)

    c = s.counts
    print(f'{code}: {c["files"]} files in {pages} page(s), {header["seconds"]}s. read {c["read"]}, cached {c["cached"]}, '
          f'online-only {c["online_only"]}, unstable {c["unstable"]}, unreadable {c["unreadable"]}, packages {c["packages"]}.')
    if c['online_only']: print(f'  !! {c["online_only"]} online-only file(s) not hashed. Make the folder available offline, then rescan.')
    if c['unstable']: print(f'  !! {c["unstable"]} file(s) changed while hashing (still copying or syncing). Rescan when settled.')
    if clash: print(f'  !! paths differing only by case (FileMaker would treat them as one): {", ".join(sorted(set(clash))[:10])}')
    if groups:
        print(f'  identical files: {len(groups)} group(s)')
        for g in groups[:10]: print('    = ' + ' | '.join(g))
    for e in s.errors[:10]: print('  !! ' + e)
    print(f'  manifest: {final}')

if __name__ == '__main__': main()
