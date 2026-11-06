"""Assemble la banque v3 (480 questions) à partir de banque-v3/src/*.py.
- réutilise les fichiers média v2 déjà sourcés (champ media_ref)
- répartit les bonnes réponses exactement 20/20/20/20 par catégorie
- valide : 80/cat, 24 médias/cat, 8 physiatrie/cat, pas de doublon, anti-fuite
Usage : python3 banque-v3/build_bank.py
"""
import importlib, json, random, sys, collections, pathlib, shutil
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'banque-v3' / 'src'
sys.path.insert(0, str(SRC))
V2 = {}
for f in (ROOT / 'questions').glob('*.json'):
    for qq in json.load(open(f)):
        V2[qq['id']] = qq
CATS = [('histoire', 'histoire'), ('cinema-series', 'cinema_series'), ('litterature', 'litterature'),
        ('science-medecine', 'science_medecine'), ('musique-pop', 'musique_pop'), ('traditions', 'traditions')]
GENERIC = {'image': 'Image à identifier', 'audio': 'Extrait sonore à identifier', 'video': 'Vidéo à identifier'}
out_dir = ROOT / 'app-v3' / 'src' / 'data'
out_dir.mkdir(parents=True, exist_ok=True)
errors, report, used_media = [], [], set()
all_texts = set()
for cat, mod in CATS:
    import _lib
    _lib.Q.clear()
    if mod in sys.modules: del sys.modules[mod]
    m = importlib.import_module(mod)
    items = list(_lib.Q)
    rng = random.Random('v3-' + cat)
    positions = [0, 1, 2, 3] * (len(items) // 4) + [0, 1, 2, 3][: len(items) % 4]
    rng.shuffle(positions)
    res = []
    for i, it in enumerate(items):
        qid = f'{cat}-v3-{i+1:03d}'
        wrong = it['mauvaises'][:]
        rng.shuffle(wrong)
        pos = positions[i]
        choices = wrong[:pos] + [it['bonne']] + wrong[pos:]
        if len(set(c.lower() for c in choices)) != 4: errors.append(f'{qid} choix en double')
        key = it['question'].strip().lower()
        if key in all_texts: errors.append(f'{qid} question en double : {it["question"]}')
        all_texts.add(key)
        rec = dict(id=qid, category=cat, difficulty='difficile' if it['d'] == 'd' else 'intermediaire',
                   type='texte', question=it['question'], choices=choices, correctIndex=pos,
                   explanation=it['explication'], physiatrie=bool(it['physiatrie']))
        if it['media_ref']:
            src = V2.get(it['media_ref'])
            if not src or not src.get('media'): errors.append(f'{qid} média introuvable {it["media_ref"]}'); continue
            med = dict(src['media'])
            kind = med.get('kind') or src['type']
            med['alt'] = GENERIC.get(kind, 'Média à identifier')
            med['credit'] = ('Source externe' if med.get('external') else 'Wikimedia Commons')
            med.pop('status', None)
            rec['type'] = src['type']
            rec['media'] = med
            used_media.add(med['src'])
            # anti-fuite : la bonne réponse ne doit pas apparaître dans le nom du fichier hébergé
            if not med.get('external'):
                stem = med['src'].lower()
                for w in it['bonne'].lower().replace('(', ' ').replace(')', ' ').split():
                    if len(w) > 4 and w in stem: errors.append(f'{qid} fuite possible dans le nom de fichier : {w}')
        # fuite : la bonne réponse écrite dans la question
        b = it['bonne'].lower()
        if len(b) > 5 and b in it['question'].lower(): errors.append(f'{qid} réponse dans la question')
        res.append(rec)
    c = collections.Counter(r['type'] for r in res)
    n_media = sum(v for k, v in c.items() if k != 'texte')
    n_phy = sum(r['physiatrie'] for r in res)
    n_diff = sum(r['difficulty'] == 'difficile' for r in res)
    pos_c = collections.Counter(r['correctIndex'] for r in res)
    longest = sum(1 for r in res if len(r['choices'][r['correctIndex']]) == max(len(x) for x in r['choices']))
    report.append(f'{cat:18s} total={len(res)} médias={n_media} {dict(c)} physiatrie={n_phy} difficiles={n_diff} positions={dict(sorted(pos_c.items()))} bonne=plus longue:{longest}')
    if len(res) != 80: errors.append(f'{cat}: {len(res)} questions (attendu 80)')
    if n_media != 24: errors.append(f'{cat}: {n_media} médias (attendu 24)')
    if n_phy != 8: errors.append(f'{cat}: {n_phy} physiatrie (attendu 8)')
    json.dump(res, open(out_dir / f'{cat}.json', 'w'), ensure_ascii=False, indent=1)
print('\n'.join(report))
# copie des médias hébergés réellement utilisés
pub = ROOT / 'app-v3' / 'public' / 'media'
pub.mkdir(parents=True, exist_ok=True)
copied = 0
for s in used_media:
    if s.startswith('http'): continue
    f = ROOT / 'app' / 'public' / s.lstrip('/')
    if not f.exists(): errors.append(f'fichier manquant {f}'); continue
    shutil.copy2(f, pub / f.name); copied += 1
cred = ROOT / 'app' / 'public' / 'media' / 'CREDITS.md'
if cred.exists(): shutil.copy2(cred, pub / 'CREDITS.md')
print(f'médias utilisés : {len(used_media)} (hébergés copiés : {copied}, externes : {len(used_media)-copied})')
if errors:
    print('ERREURS :'); print('\n'.join(errors)); sys.exit(1)
print('OK — banque v3 valide')
