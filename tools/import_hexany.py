#!/usr/bin/env python3
"""
Integra creature da Hexany's Monster Menagerie (CC0, vendor/hexany/) nel
foglio assets/creatures.png: colorizza gli sprite 1-bit, genera il retro
(specchiato e scurito) e aggiunge le colonne in coda.

L'ORDINE qui sotto DEVE combaciare con le specie aggiunte in coda a
CREATURE_ORDER in data/creatures.js.

Pipeline completa:
  python3 tools/gen_assets.py && python3 tools/import_kenney.py \
    && python3 tools/import_hexany.py && python3 tools/embed_assets.py
"""
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
SRC = os.path.join(ROOT, 'vendor', 'hexany', 'Tiles', 'Regular')
OUT = os.path.join(ROOT, 'assets', 'creatures.png')
CW = 32

if not os.path.isdir(SRC):
    raise SystemExit('Pack non trovato: ' + SRC)

# specie -> (numero creatura Hexany, colore principale, colore ombra)
HEXANY = [
    ('ratapignata', 15, (150, 104, 178), (104, 68, 128)),   # pipistrello leggendario
    ('farfarello',  17, (224, 84, 56),  (160, 52, 36)),     # diavoletto dantesco
    ('civettona',   45, (186, 142, 86), (136, 100, 58)),    # civetta del malaugurio
    ('borda',       14, (138, 178, 206), (94, 128, 156)),   # strega della nebbia
    ('lupomannaro', 35, (152, 152, 164), (108, 108, 122)),  # licantropo
    ('scultone',     6, (104, 170, 100), (70, 124, 70)),    # serpente sardo
]

def colorize(im, main, shade):
    """Bianco -> colore (metà inferiore più scura), aggiunge outline scuro."""
    w, h = im.size
    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    px, opx = im.load(), out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a > 100 and r > 100:
                opx[x, y] = (main if y < h*0.55 else shade) + (255,)
    # outline
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
            if a: px[x, y] = (max(0, r-22), max(0, g-22), max(0, b-14), a)
    return out

base = Image.open(OUT).convert('RGBA')
# Idempotenza: riparti SEMPRE dalle sole creature procedurali (assets/.proc_count
# scritto da gen_assets.py), così rilanciare lo script non duplica le colonne.
pc = os.path.join(ROOT, 'assets', '.proc_count')
if os.path.exists(pc):
    with open(pc) as f:
        n_existing = int(f.read().strip())
    base = base.crop((0, 0, n_existing * CW, 64))
else:
    n_existing = base.width // CW
sheet = Image.new('RGBA', (n_existing * CW + CW * len(HEXANY), 64), (0, 0, 0, 0))
sheet.alpha_composite(base, (0, 0))
for i, (name, num, main, shade) in enumerate(HEXANY):
    src = Image.open(os.path.join(SRC, 'creature_%03d.png' % num)).convert('RGBA')
    front = colorize(src, main, shade)
    back = darken(front.transpose(Image.FLIP_LEFT_RIGHT))
    x = (n_existing + i) * CW
    sheet.alpha_composite(front, (x, 0))
    sheet.alpha_composite(back, (x, CW))
sheet.save(OUT)
print('OK: %d creature Hexany aggiunte (totale colonne: %d)' %
      (len(HEXANY), n_existing + len(HEXANY)))
