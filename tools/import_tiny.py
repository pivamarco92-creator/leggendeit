#!/usr/bin/env python3
"""
Sovrascrive gli sprite delle Leggende con creature COLORATE dal pack "tiny-creatures"
(CC0, 16x16), scalate 2x a 32x32. Fonte principale degli sprite.

Override per id: ogni voce dice quale colonna (creatura di CREATURE_ORDER) rimpiazzare
con quale tile del pack. NON applica tinta (gli sprite sono già a colori): il "tipo"
è reso scegliendo il tile del colore giusto (drago rosso = fuoco, ecc.).

Va eseguito DOPO import_hexany.py (i due si sovrascrivono colonne diverse).
Le creature NON elencate qui (né in import_hexany) restano con lo sprite procedurale:
i 3 "soci", Tuttobène e i Soli della Puglia (sprite su misura dedicati).

Pipeline: gen_assets -> import_kenney -> import_hexany -> import_tiny -> embed_assets
"""
import os, re, zipfile, io
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
ZIP = os.path.join(ROOT, 'vendor', 'tiny-creatures', 'tiny-creatures.zip')
OUT = os.path.join(ROOT, 'assets', 'creatures.png')
CW = 32

if not os.path.exists(ZIP):
    raise SystemExit('Pack tiny-creatures non trovato: ' + ZIP)

# id_creatura -> numero tile del pack (vedi contact-sheet)
TINY = {
    'salvanello':11, 'salvan':12, 'gransalvan':114,
    'tarantasino':80, 'tarantas':29, 'tarantasio':33,
    'anguanella':100, 'anguana':99, 'anguanaregina':31,
    'merlotta':110, 'merlona':141,
    'mazapegul':108, 'mazapegon':15,
    'bigatto':9, 'bombice':131,
    'linchetto':10, 'buffardello':70,
    'munaciello':39, 'munacione':124,
    'gattomammone':158, 'gattore':157,
    'bisso':149, 'bissone':77,
    'servanot':120, 'granservan':23,
    'masca':66, 'mascagna':20,
    'fusinot':129, 'fusinon':101,
    'toret':172, 'toron':128,
    'neiot':50, 'brinassa':47, 'stambeco':153,
    'taurin':21, 'barry':3,
    'strigone':132, 'bordona':136, 'mannarone':138, 'ratavolora':133,
    'malebranca':4, 'basiliscu':84,
    'croder':48, 'crodon':25, 'laurino':126,
    'cjalcjut':13, 'cjalcjutone':135,
    'mazariol':125, 'mazarione':122,
    'foghin':56, 'fogaron':46, 'aldial':96,
    'strio':67, 'strione':66,
    'zollin':127, 'zollone':89,
    'lupogubbio':94,
    'falchin':141, 'falchione':110,
    'ruderin':32, 'ruderone':34,
    'cinghial':139, 'pantafica':59, 'luccicola':140, 'pantegana':143,
    'ranot':147, 'gazzot':123,
    'petrin':58, 'petrone':128,
    'svanin':7, 'svanone':70,
    'vesuvin':80, 'vesuvione':46,
    'monachin':108, 'monachione':15,
    'ratapignata':134, 'farfarello':96, 'civettona':109,
    'borda':5, 'lupomannaro':137, 'scultone':41,
}

def read_order():
    s = open(os.path.join(ROOT, 'data', 'creatures.js'), encoding='utf-8').read()
    blk = re.search(r'const CREATURE_ORDER[\s\S]*?\];', s).group(0)
    blk = re.sub(r'/\*[\s\S]*?\*/', '', blk)
    return re.findall(r"'([a-z0-9]+)'", blk)

def darken(im):
    out = im.copy(); px = out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a: px[x, y] = (max(0, r-26), max(0, g-26), max(0, b-18), a)
    return out

order = read_order()
N = len(order)
base = Image.open(OUT).convert('RGBA')
if base.width < N * CW:
    nb = Image.new('RGBA', (N * CW, 64), (0, 0, 0, 0))
    nb.alpha_composite(base, (0, 0)); base = nb

z = zipfile.ZipFile(ZIP)
def load_tile(num):
    data = z.read('tiny-creatures/Tiles/tile_%04d.png' % num)
    im = Image.open(io.BytesIO(data)).convert('RGBA')
    return im.resize((CW, CW), Image.NEAREST)

done = 0
for cid, num in TINY.items():
    if cid not in order:
        continue
    c = order.index(cid)
    front = load_tile(num)
    back = darken(front.transpose(Image.FLIP_LEFT_RIGHT))
    base.paste((0, 0, 0, 0), (c*CW, 0, c*CW+CW, 64))   # pulisci la cella
    base.alpha_composite(front, (c*CW, 0))
    base.alpha_composite(back, (c*CW, CW))
    done += 1

base.save(OUT)
print('OK: %d sprite tiny-creatures applicati (sheet %d colonne)' % (done, base.width // CW))
