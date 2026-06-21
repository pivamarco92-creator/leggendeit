#!/usr/bin/env python3
"""
Sostituisce gli sprite delle Leggende con creature di Hexany's Monster Menagerie
(CC0, 32x32 NATIVE monocromatiche), colorizzate per tipo. Tutte 32x32 native: niente
upscaling (a differenza del vecchio import_tiny, rimosso perché 16x16 scalati rendevano male).

Override per id: ogni voce dice quale colonna (creatura di CREATURE_ORDER) rimpiazzare con
quale creatura Hexany (numero 1-64). Colore = tinta del tipo, salvo override espliciti
(legendari). Le creature NON elencate restano con lo sprite PROCEDURALE 32x32 (anch'esso
nativo): i 3 soci, Tuttobène, i Soli della Puglia (sprite dedicati).

Pipeline: gen_assets -> import_kenney -> import_sproutlands -> import_hexany -> embed_assets
"""
import os, re
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
SRC = os.path.join(ROOT, 'vendor', 'hexany', 'tiles', 'transparent')
OUT = os.path.join(ROOT, 'assets', 'creatures.png')
CW = 32

if not os.path.isdir(SRC):
    raise SystemExit('Pack Hexany non trovato: ' + SRC)

TYPE_COLOR = {
    'Fuoco':(228,84,56),'Acqua':(88,148,212),'Erba':(96,168,80),'Elettro':(240,210,80),
    'Volante':(186,202,226),'Coleottero':(150,180,90),'Veleno':(150,104,178),
    'Acciaio':(160,164,178),'Ghiaccio':(150,200,235),'Roccia':(150,134,110),
    'Spettro':(170,160,200),'Normale':(200,185,160),'Vento':(172,206,212),
    'Psico':(190,130,200),'Terra':(170,120,70),'Drago':(110,150,90),'Luce':(246,224,120),
}

# id -> numero Hexany (tinta automatica per tipo)  oppure  (numero, colore esplicito)
HEXANY = {
    # --- leggendari (colore dedicato) ---
    'scighera':(47,(188,200,228)), 'grifone':(8,(228,196,120)), 'leon':(4,(222,184,96)),
    'bora':(48,(188,208,236)), 'aruspice':(14,(190,130,200)), 'sibilla':(25,(196,168,214)),
    'dracone':(45,(120,168,96)), 'dormiente':(61,(150,134,110)), 'partenope':(35,(96,156,214)),
    'solleone':(54,(246,214,96)), 'calanco':(16,(172,124,74)), 'taurin':(16,(176,120,62)),
    'lupogubbio':(27,(150,138,110)), 'dimenticato':(53,(182,172,206)),
    # --- linee/comuni (tinta per tipo) ---
    'salvanello':10, 'salvan':19, 'gransalvan':32,
    'tarantasino':46, 'tarantas':62, 'tarantasio':8,
    'anguanella':35, 'anguana':30, 'anguanaregina':25,
    'merlotta':43, 'merlona':8,
    'mazapegul':64, 'mazapegon':32,
    'bigatto':56, 'bombice':49,
    'linchetto':41, 'buffardello':9,
    'munaciello':64, 'munacione':32,
    'gattomammone':3, 'gattore':4,
    'bisso':6, 'bissone':62,
    'servanot':41, 'granservan':19,
    'masca':30, 'mascagna':59,
    'fusinot':26, 'fusinon':28,
    'toret':50, 'toron':61,
    'neiot':9, 'brinassa':30, 'stambeco':63,
    'barry':27,
    'strigone':57, 'bordona':30, 'mannarone':27, 'ratavolora':17,
    'malebranca':29, 'basiliscu':62,
    'croder':50, 'crodon':61, 'laurino':16,
    'cjalcjut':41, 'cjalcjutone':57,
    'mazariol':64, 'mazarione':10,
    'foghin':9, 'fogaron':32, 'aldial':24,
    'strio':34, 'strione':30,
    'zollin':50, 'zollone':61,
    'falchin':43, 'falchione':57,
    'ruderin':46, 'ruderone':62,
    'cinghial':32, 'pantafica':59, 'luccicola':41, 'pantegana':64,
    'ranot':50, 'gazzot':43,
    'petrin':50, 'petrone':61,
    'svanin':9, 'svanone':47,
    'vesuvin':9, 'vesuvione':29,
    'monachin':64, 'monachione':19,
    'ratapignata':17, 'farfarello':15, 'civettona':8, 'borda':30, 'lupomannaro':27, 'scultone':6,
}

def read_data():
    s = open(os.path.join(ROOT, 'data', 'creatures.js'), encoding='utf-8').read()
    blk = re.sub(r'/\*[\s\S]*?\*/', '', re.search(r'const CREATURE_ORDER[\s\S]*?\];', s).group(0))
    order = re.findall(r"'([a-z0-9]+)'", blk)
    types = {}
    for m in re.finditer(r"\n\s*([a-z0-9]+):\s*\{[^}]*?types:\[([^\]]*)\]", s):
        types[m.group(1)] = m.group(2).replace("'", "").replace(" ", "").split(',')[0]
    return order, types

def shade_of(c):
    return tuple(max(0, v - 46) for v in c)

def colorize(im, main, shade):
    w, h = im.size
    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    px, opx = im.load(), out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a > 90 and r > 90:
                opx[x, y] = (main if y < h * 0.55 else shade) + (255,)
    res = out.copy(); rpx = res.load()
    for y in range(h):
        for x in range(w):
            if opx[x, y][3] == 0:
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = x+dx, y+dy
                    if 0 <= nx < w and 0 <= ny < h and opx[nx, ny][3] > 200:
                        rpx[x, y] = (24, 20, 30, 255); break
    return res

def darken(im):
    out = im.copy(); px = out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a: px[x, y] = (max(0, r-24), max(0, g-24), max(0, b-16), a)
    return out

order, types = read_data()
N = len(order)
base = Image.open(OUT).convert('RGBA')
if base.width < N * CW:
    nb = Image.new('RGBA', (N * CW, 64), (0, 0, 0, 0))
    nb.alpha_composite(base, (0, 0)); base = nb

done = 0
for cid, val in HEXANY.items():
    if cid not in order:
        continue
    num, color = (val if isinstance(val, tuple) else (val, TYPE_COLOR.get(types.get(cid, 'Normale'), (200,185,160))))
    c = order.index(cid)
    src = Image.open(os.path.join(SRC, 'creature_%03d.png' % num)).convert('RGBA')
    front = colorize(src, color, shade_of(color))
    back = darken(front.transpose(Image.FLIP_LEFT_RIGHT))
    base.paste((0, 0, 0, 0), (c*CW, 0, c*CW+CW, 64))
    base.alpha_composite(front, (c*CW, 0))
    base.alpha_composite(back, (c*CW, CW))
    done += 1

base.save(OUT)
print('OK: %d sprite Hexany applicati (sheet %d colonne, tutti 32x32 nativi)' % (done, base.width // CW))
