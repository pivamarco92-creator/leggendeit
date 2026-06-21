#!/usr/bin/env python3
"""
Sovrascrive gli sprite di ALCUNE Leggende (soprattutto i leggendari) con creature
di Hexany's Monster Menagerie (CC0, 32x32 monocromatiche), colorizzate per tipo.

Modello "override per id": ogni voce dice quale colonna (= creatura di CREATURE_ORDER)
rimpiazzare con quale creatura Hexany. Funziona DOPO gen_assets/import_kenney e PRIMA
di import_tiny (che a sua volta sovrascrive altre colonne con sprite colorati).

Pipeline completa:
  gen_assets.py -> import_kenney.py -> import_hexany.py -> import_tiny.py -> embed_assets.py
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

# id_creatura -> (numero Hexany, colore principale)  [l'ombra è derivata]
HEXANY = {
    'scighera':    (47, (188, 200, 228)),   # fantasma/nebbia
    'grifone':     ( 8, (228, 196, 120)),   # grifone (uccello-leone) oro
    'leon':        ( 4, (222, 184, 96)),    # leone alato di San Marco, oro
    'bora':        (48, (188, 208, 236)),   # spirito del vento (spirale)
    'aruspice':    (14, (190, 130, 200)),   # indovino/mago, psico
    'sibilla':     (25, (196, 168, 214)),   # profetessa alata
    'dracone':     (62, (120, 168, 96)),    # grande drago serpentino
    'dormiente':   (61, (150, 134, 110)),   # gigante di pietra (golem)
    'partenope':   (35, ( 96, 156, 214)),   # sirena
    'solleone':    (54, (246, 214, 96)),    # sole (sunburst)
    'calanco':     (16, (172, 124, 74)),    # golem d'argilla su base
}

# Fallback se mai servisse tintare per tipo (qui i colori sono espliciti sopra).
TYPE_COLOR = {
    'Fuoco':(228,84,56),'Acqua':(88,148,212),'Erba':(96,168,80),'Elettro':(240,210,80),
    'Volante':(186,202,226),'Coleottero':(150,180,90),'Veleno':(150,104,178),
    'Acciaio':(160,164,178),'Ghiaccio':(150,200,235),'Roccia':(150,134,110),
    'Spettro':(170,160,200),'Normale':(200,185,160),'Vento':(172,206,212),
    'Psico':(190,130,200),'Terra':(170,120,70),'Drago':(110,150,90),'Luce':(246,224,120),
}

def read_order():
    s = open(os.path.join(ROOT, 'data', 'creatures.js'), encoding='utf-8').read()
    blk = re.search(r'const CREATURE_ORDER[\s\S]*?\];', s).group(0)
    blk = re.sub(r'/\*[\s\S]*?\*/', '', blk)
    return re.findall(r"'([a-z0-9]+)'", blk)

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

order = read_order()
N = len(order)
base = Image.open(OUT).convert('RGBA')
if base.width < N * CW:                     # pad fino a tutte le colonne
    nb = Image.new('RGBA', (N * CW, 64), (0, 0, 0, 0))
    nb.alpha_composite(base, (0, 0)); base = nb

done = 0
for cid, (num, color) in HEXANY.items():
    if cid not in order:
        continue
    c = order.index(cid)
    src = Image.open(os.path.join(SRC, 'creature_%03d.png' % num)).convert('RGBA')
    front = colorize(src, color, shade_of(color))
    back = darken(front.transpose(Image.FLIP_LEFT_RIGHT))
    base.paste((0, 0, 0, 0), (c*CW, 0, c*CW+CW, 64))   # pulisci la cella
    base.alpha_composite(front, (c*CW, 0))
    base.alpha_composite(back, (c*CW, CW))
    done += 1

base.save(OUT)
print('OK: %d sprite Hexany applicati (sheet %d colonne)' % (done, base.width // CW))
