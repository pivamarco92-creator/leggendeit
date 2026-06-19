#!/usr/bin/env python3
"""
Genera gli asset pixel-art di LEGGENDE D'ITALIA.
Output: assets/tileset.png, assets/creatures.png, assets/chars.png
Rigenera con:  python3 tools/gen_assets.py
Sostituibili in qualsiasi momento con asset migliori (stesse dimensioni/ordine frame).
"""
import os, random
from PIL import Image, ImageDraw

random.seed(42)
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'assets')
os.makedirs(OUT, exist_ok=True)

T = 16  # tile size

# ----------------------------------------------------------------------
# Helper
# ----------------------------------------------------------------------
def px_img(rows, pal, size=16):
    """Crea un'immagine RGBA da righe di caratteri + palette."""
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch != '.' and ch in pal:
                im.putpixel((x, y), pal[ch])
    return im

def outline(im, color=(20, 16, 24, 255)):
    """Aggiunge un contorno scuro di 1px attorno ai pixel opachi."""
    w, h = im.size
    out = im.copy()
    for y in range(h):
        for x in range(w):
            if im.getpixel((x, y))[3] == 0:
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = x+dx, y+dy
                    if 0 <= nx < w and 0 <= ny < h and im.getpixel((nx, ny))[3] > 200:
                        out.putpixel((x, y), color)
                        break
    return out

def scale(im, f):
    return im.resize((im.width*f, im.height*f), Image.NEAREST)

def noise_rect(d, x0, y0, x1, y1, base, var=8, density=0.18):
    d.rectangle([x0, y0, x1, y1], fill=base)
    for _ in range(int((x1-x0)*(y1-y0)*density)):
        x = random.randint(x0, x1); y = random.randint(y0, y1)
        v = random.randint(-var, var)
        c = tuple(max(0, min(255, base[i]+v)) for i in range(3)) + (255,)
        d.point((x, y), fill=c)

# ----------------------------------------------------------------------
# TILESET — indici:
#  0 strada  1 piazza  2 prato  3 erba alta  4 albero  5 acqua A  6 acqua B
#  7 palazzo  8 duomo  9 porta lab  10 porta palestra  11 edicola
#  12 zerbino/uscita  13 pavimento interno  14 muro interno  15 sentiero su prato
# ----------------------------------------------------------------------
def make_tile(idx):
    im = Image.new('RGBA', (T, T), (0, 0, 0, 255))
    d = ImageDraw.Draw(im)
    if idx == 0:    # strada / sampietrini
        noise_rect(d, 0, 0, 15, 15, (188, 180, 166, 255), 10)
        for y in (4, 9, 14):
            d.line([(0, y), (15, y)], fill=(170, 162, 148, 255))
        for x in (5, 11):
            d.line([(x, 0), (x, 15)], fill=(174, 166, 152, 255))
    elif idx == 1:  # piazza chiara
        noise_rect(d, 0, 0, 15, 15, (212, 204, 188, 255), 8)
        d.line([(0, 7), (15, 7)], fill=(196, 188, 172, 255))
    elif idx == 2:  # prato
        noise_rect(d, 0, 0, 15, 15, (124, 178, 92, 255), 12, .3)
    elif idx == 3:  # erba alta
        noise_rect(d, 0, 0, 15, 15, (104, 158, 76, 255), 10, .2)
        g = (66, 118, 48, 255); g2 = (84, 140, 58, 255)
        for x0, y0 in ((1,2),(6,1),(11,3),(3,8),(9,9),(13,8)):
            d.line([(x0+1, y0), (x0+1, y0+5)], fill=g)
            d.line([(x0, y0+1), (x0, y0+4)], fill=g2)
            d.line([(x0+2, y0+1), (x0+2, y0+4)], fill=g2)
    elif idx == 4:  # albero
        noise_rect(d, 0, 0, 15, 15, (124, 178, 92, 255), 12, .3)
        d.rectangle([6, 10, 9, 15], fill=(104, 74, 44, 255))
        d.line([(7, 10), (7, 15)], fill=(126, 92, 56, 255))
        for r, c in ((7, (52, 104, 40, 255)), (5, (72, 130, 52, 255)), (3, (96, 156, 64, 255))):
            d.ellipse([8-r, 7-r, 8+r-1, 7+r-1], fill=c)
        d.point((5, 3), fill=(130, 190, 90, 255)); d.point((10, 5), fill=(130, 190, 90, 255))
    elif idx in (5, 6):  # acqua (2 frame)
        noise_rect(d, 0, 0, 15, 15, (62, 110, 188, 255), 8)
        w = (120, 164, 224, 255)
        off = 0 if idx == 5 else 4
        for y0, x0 in ((2, 1), (7, 8), (12, 3)):
            x = (x0 + off) % 12
            d.line([(x, y0), (x+4, y0)], fill=w)
            d.point((x+1, y0+1), fill=(90, 136, 206, 255))
    elif idx == 7:  # palazzo milanese
        noise_rect(d, 0, 0, 15, 15, (168, 144, 120, 255), 6)
        d.rectangle([0, 0, 15, 2], fill=(140, 116, 94, 255))      # cornicione
        for wx in (2, 9):
            d.rectangle([wx, 5, wx+4, 9], fill=(80, 96, 120, 255))
            d.line([(wx+1, 6), (wx+3, 6)], fill=(150, 170, 200, 255))
            d.rectangle([wx, 11, wx+4, 14], fill=(80, 96, 120, 255))
        d.line([(0, 3), (15, 3)], fill=(184, 160, 134, 255))
    elif idx == 8:  # duomo / marmo e guglie
        noise_rect(d, 0, 0, 15, 15, (228, 220, 206, 255), 6)
        for x in (2, 7, 12):
            d.rectangle([x, 1, x+1, 15], fill=(204, 194, 178, 255))
            d.line([(x, 1), (x, 15)], fill=(244, 238, 226, 255))
            d.polygon([(x-1, 4), (x+2, 4), (x, 0)], fill=(214, 204, 188, 255))
        d.line([(0, 14), (15, 14)], fill=(198, 188, 172, 255))
    elif idx in (9, 10):  # porte (lab marrone / palestra dorata)
        noise_rect(d, 0, 0, 15, 15, (168, 144, 120, 255), 6)
        c = (96, 64, 40, 255) if idx == 9 else (180, 140, 32, 255)
        c2 = (130, 92, 60, 255) if idx == 9 else (220, 178, 60, 255)
        d.rectangle([3, 3, 12, 15], fill=c)
        d.rectangle([4, 4, 11, 14], fill=c2)
        d.rectangle([5, 6, 10, 9], fill=(240, 232, 192, 255))
        d.point((10, 11), fill=(240, 232, 192, 255))
    elif idx == 11:  # edicola
        noise_rect(d, 0, 4, 15, 15, (56, 128, 72, 255), 8)
        d.rectangle([2, 7, 13, 13], fill=(238, 238, 230, 255))
        d.line([(3, 9), (12, 9)], fill=(120, 120, 120, 255))
        d.line([(3, 11), (12, 11)], fill=(160, 160, 160, 255))
        for i in range(8):                                   # tenda rossa/bianca
            c = (216, 56, 56, 255) if i % 2 == 0 else (240, 240, 240, 255)
            d.rectangle([i*2, 0, i*2+1, 3], fill=c)
        d.line([(0, 4), (15, 4)], fill=(150, 40, 40, 255))
    elif idx == 12:  # zerbino / uscita
        noise_rect(d, 0, 0, 15, 15, (176, 168, 144, 255), 6)
        d.rectangle([2, 3, 13, 12], fill=(128, 116, 92, 255))
        d.rectangle([3, 4, 12, 11], fill=(148, 136, 108, 255))
        d.line([(4, 7), (11, 7)], fill=(128, 116, 92, 255))
    elif idx == 13:  # pavimento interno
        noise_rect(d, 0, 0, 15, 15, (222, 210, 188, 255), 5)
        d.line([(0, 7), (15, 7)], fill=(206, 194, 172, 255))
        d.line([(7, 0), (7, 15)], fill=(206, 194, 172, 255))
    elif idx == 14:  # muro interno
        noise_rect(d, 0, 0, 15, 15, (148, 130, 152, 255), 6)
        d.rectangle([0, 12, 15, 15], fill=(112, 96, 116, 255))
        d.line([(0, 12), (15, 12)], fill=(170, 152, 174, 255))
        for wx in (3, 10):
            d.rectangle([wx, 3, wx+3, 8], fill=(96, 110, 134, 255))
    elif idx == 15:  # sentiero su prato
        noise_rect(d, 0, 0, 15, 15, (124, 178, 92, 255), 12, .3)
        noise_rect(d, 4, 0, 11, 15, (192, 180, 156, 255), 8)
    elif idx == 16:  # Mole Antonelliana (mattone + lesene + finestre ad arco)
        noise_rect(d, 0, 0, 15, 15, (162, 134, 104, 255), 7)
        for x in (1, 7, 13):
            d.rectangle([x, 0, x+1, 15], fill=(186, 158, 124, 255))
        for wx in (4, 10):
            d.rectangle([wx, 4, wx+1, 10], fill=(70, 62, 80, 255))
            d.point((wx, 3), fill=(70, 62, 80, 255)); d.point((wx+1, 3), fill=(70, 62, 80, 255))
        d.line([(0, 13), (15, 13)], fill=(140, 112, 86, 255))
    elif idx == 17:  # portici torinesi (muro + arcate scure)
        noise_rect(d, 0, 0, 15, 15, (198, 178, 150, 255), 6)
        d.rectangle([0, 0, 15, 2], fill=(174, 154, 126, 255))
        for ax in (2, 9):
            d.rectangle([ax, 6, ax+4, 15], fill=(58, 50, 66, 255))
            d.line([(ax+1, 5), (ax+3, 5)], fill=(58, 50, 66, 255))
            d.point((ax+2, 4), fill=(58, 50, 66, 255))
        d.line([(0, 15), (15, 15)], fill=(150, 132, 106, 255))
    elif idx == 18:  # porta ambulatorio (bianca con croce verde)
        noise_rect(d, 0, 0, 15, 15, (168, 144, 120, 255), 6)
        d.rectangle([3, 3, 12, 15], fill=(238, 238, 234, 255))
        d.rectangle([4, 4, 11, 14], fill=(220, 222, 218, 255))
        d.rectangle([6, 6, 9, 7], fill=(40, 150, 70, 255))
        d.rectangle([7, 5, 8, 8], fill=(40, 150, 70, 255))
        d.point((10, 11), fill=(120, 120, 120, 255))
    elif idx == 19:  # neve (Valle d'Aosta)
        noise_rect(d, 0, 0, 15, 15, (228, 234, 244, 255), 5)
        d.point((4, 5), fill=(206, 216, 232, 255)); d.point((10, 9), fill=(206, 216, 232, 255))
        d.point((7, 12), fill=(248, 250, 255, 255)); d.point((12, 3), fill=(212, 222, 238, 255))
    elif idx == 20:  # montagna / vetta innevata (solida)
        noise_rect(d, 0, 0, 15, 15, (120, 122, 142, 255), 10)
        d.polygon([(0, 15), (8, 1), (15, 15)], fill=(96, 98, 122, 255))
        d.polygon([(4, 7), (8, 1), (12, 7)], fill=(234, 238, 248, 255))   # cima innevata
        d.line([(0, 15), (15, 15)], fill=(78, 80, 102, 255))
    elif idx == 21:  # laptop / terminale del deposito (su pavimento interno, solido)
        noise_rect(d, 0, 0, 15, 15, (222, 210, 188, 255), 5)
        d.rectangle([2, 11, 13, 14], fill=(120, 92, 60, 255))     # scrivania
        d.line([(2, 11), (13, 11)], fill=(150, 116, 78, 255))
        d.rectangle([4, 3, 11, 10], fill=(40, 42, 54, 255))       # monitor
        d.rectangle([5, 4, 10, 9], fill=(72, 122, 182, 255))      # schermo acceso
        d.line([(5, 5), (9, 5)], fill=(160, 205, 245, 255))
        d.line([(5, 7), (8, 7)], fill=(120, 170, 220, 255))
    return im

tiles = [make_tile(i) for i in range(22)]
sheet = Image.new('RGBA', (T*22, T), (0, 0, 0, 0))
for i, t in enumerate(tiles):
    sheet.paste(t, (i*T, 0))
sheet.save(os.path.join(OUT, 'tileset.png'))

# ----------------------------------------------------------------------
# CREATURE — 10 specie, 16x16 -> outline -> x2 in frame 32x32
# Riga 0: fronte · Riga 1: retro (frame = idx, idx+10)
# ----------------------------------------------------------------------
CREATURES = {
 'salvanello': dict(pal={'G':(96,168,80,255),'g':(64,128,56,255),'B':(150,108,64,255),
   'b':(118,82,48,255),'S':(232,190,148,255),'K':(30,26,32,255),'W':(255,255,255,255),'R':(200,72,56,255)}, rows=[
   '......GG........','....GGGGGG......','...GGGgGGGG.....','....gGGGGg......',
   '....SSSSSS......','....SKSSKS......','....SSSSSS......','.....SRRS.......',
   '...BBBBBBBB.....','..BBbBBBBbBB....','..SBBBBBBBBS....','...BBBBBBBB.....',
   '...BBb..bBB.....','...bb....bb.....','...K......K.....','................']),
 'tarantasino': dict(pal={'V':(88,160,88,255),'v':(60,120,64,255),'C':(228,216,160,255),
   'R':(232,72,48,255),'r':(248,160,64,255),'K':(30,26,32,255),'W':(255,255,255,255),'Y':(240,200,72,255)}, rows=[
   '....RR..........','...RrR..VVV.....','....R..VVVVV....','.......VKWVV....',
   '.......VVVVV....','......VVVVv.....','.....VVVVv......','....VCCVVV......',
   '...VCCCVVVV.....','...VCCVVVVVV....','...VCCVVV.VVV...','...VCCCVV..vv...',
   '....VCCVVV......','.....VVVVvv.....','......vvvv......','................']),
 'anguanella': dict(pal={'B':(88,144,216,255),'b':(56,104,176,255),'C':(140,200,232,255),
   'S':(238,214,190,255),'K':(30,26,32,255),'W':(255,255,255,255),'P':(120,176,224,255)}, rows=[
   '....CCCCCC......','...CCCCCCCC.....','..CCSSSSSSCC....','..CSSKSSKSSC....',
   '..CSSSSSSSSC....','..CCSSbbSSCC....','...CCSSSSCC.....','....BBBBBB......',
   '...BBBbBBBB.....','..BBBBBBBBBB....','..PBBBBBBBBP....','...BBBBBBBB.....',
   '....BBBBBB......','.....BbbB.......','....bb..bb......','................']),
 'merlotta': dict(pal={'K':(40,38,44,255),'k':(70,66,76,255),'G':(150,146,150,255),
   'Y':(232,176,40,255),'E':(255,255,255,255)}, rows=[
   '................','......GGG.......','.....GGGGG......','.....GEGGG......',
   '...YYGGGGG......','......KKKKKK....','.....KKKKKKKk...','....KkKKKKKkk...',
   '....KKKKKKKk....','.....KKKKKK.....','......KKKK......','......Y..Y......',
   '.....YY..YY.....','................','................','................']),
 'mazapegul': dict(pal={'P':(146,96,168,255),'p':(110,68,130,255),'R':(200,56,72,255),
   'S':(226,182,150,255),'K':(30,26,32,255),'W':(255,255,255,255)}, rows=[
   '......RRR.......','....RRRRRR......','...RRRRRRRR.....','....SSSSSS......',
   '...SSKSSKSS.....','....SSSSSS......','.....SppS.......','....PPPPPP......',
   '...PPpPPPPp.....','..SPPPPPPPPS....','...PPPPPPPP.....','...PPp..pPP.....',
   '....pp...pp.....','...K......K.....','................','................']),
 'bigatto': dict(pal={'C':(196,220,150,255),'c':(160,188,116,255),'Y':(240,208,88,255),
   'K':(30,26,32,255),'R':(216,88,56,255),'W':(255,255,255,255)}, rows=[
   '................','.....R.R........','.....RRR........','....CCCC........',
   '...CKCCCK.......','...CCCCCC.......','...cCCCCCC......','....YCCCCC......',
   '...CCCCCCCC.....','..CCcCCCcCCC....','..CCCCCCCCCCc...','...cCCcCCcCC....',
   '....cc..cc......','................','................','................']),
 'linchetto': dict(pal={'G':(92,160,72,255),'g':(64,120,52,255),'V':(168,120,190,255),
   'S':(230,188,150,255),'K':(30,26,32,255),'W':(255,255,255,255)}, rows=[
   '...V...V...V....','..VV..VVV..VV...','..VVVVVVVVVV....','...VVVVVVVV.....',
   '....gggggg......','....SSSSSS......','...SKSSSSKS.....','...SSSSSSSS.....',
   '....SSggSS......','...GGGGGGGG.....','..GGgGGGGgGG....','...GGGGGGGG.....',
   '...GG....GG.....','...g......g.....','................','................']),
 'munaciello': dict(pal={'R':(190,52,52,255),'r':(150,38,42,255),'S':(232,190,148,255),
   'K':(30,26,32,255),'W':(255,255,255,255),'Y':(248,216,80,255),'B':(60,56,70,255)}, rows=[
   '......RRRR......','....RRRRRRRR....','...RRRrrrrRRR...','...RR.SSSS.RR...',
   'Y..R.SKSSKS.R..Y','.Y...SSSSSS...Y.','......SrrS......','....RRRRRRRR....',
   '...RRrRRRRrRR...','...RRRRRRRRRR...','..SRRRRRRRRRRS..','....RRRRRRRR....',
   '....BB....BB....','...Y........Y...','................','................']),
 'gattomammone': dict(pal={'T':(196,164,116,255),'t':(160,128,84,255),'C':(228,206,168,255),
   'K':(30,26,32,255),'Y':(232,176,40,255),'W':(255,255,255,255),'R':(180,80,60,255)}, rows=[
   '..T..........T..','..TT........TT..','..TtT......TtT..','..TTTTTTTTTTTT..',
   '..TTTTTTTTTTTT..','..TYKTTTTTKYT...','..TTTTTtTTTTT...','..TTtTTTTTtTT...',
   '...TTTWWWTTT....','..TTTTTTTTTTTt..','..TCCCCCCCCTt...','..TCCCCCCCCT....',
   '..TTTTTTTTTT....','...TT.TT.TT.....','..t..........t..','................']),
 'bisso': dict(pal={'V':(96,168,104,255),'v':(64,128,72,255),'Y':(240,200,72,255),
   'K':(30,26,32,255),'R':(216,64,56,255),'W':(255,255,255,255)}, rows=[
   '....Y.Y.........','....YYY.........','...VVVVV........','..VVKVVKV.......',
   '..VVVVVVV.......','...VVRRV........','....VVVV........','...vVVVVv.......',
   '..VVV..VVV......','.VVV....VVV.....','.VVv...VVVv.....','..VVVVVVVv......',
   '...vVVVVv.......','.....vvv........','................','................']),
 'servanot': dict(pal={'B':(158,116,72,255),'b':(122,86,52,255),'Y':(226,196,96,255),
   'S':(232,188,146,255),'K':(30,26,32,255),'H':(196,162,88,255),'W':(255,255,255,255)}, rows=[
   '.....HHHHHH.....','....HHHHHHHH....','..HHHHHHHHHHHH..','.....SSSSSS.....',
   '....SKSSSSKS....','....SSSSSSSS....','.....SbbbSS.....','....BBBBBBB.....',
   '...BBbBBBBbB....','..YBBBBBBBBY....','..YBBBBBBBBY....','...BBBBBBBB.....',
   '...BBb..bBB.....','...bb....bb.....','................','................']),
 'masca': dict(pal={'G':(120,116,134,255),'g':(86,82,100,255),'C':(214,210,222,255),
   'S':(206,182,162,255),'K':(30,26,32,255),'Y':(238,210,96,255),'W':(255,255,255,255)}, rows=[
   '......CCCC......','....CCCCCCCC....','...CCCCCCCCCC...','....SSSSSSSS....',
   '....SYSSSSKS....','....SSSSSSSS....','.....SggSSS.....','....GGGGGGGG....',
   '...GGgGGGGgGG...','..GGGGGGGGGGG...','..GGGgGGGGgGG...','...GGGGGGGGG....',
   '....GGGGGGG.....','.....g..g.......','................','................']),
 'fusinot': dict(pal={'M':(150,154,168,255),'m':(110,114,130,255),'R':(238,108,48,255),
   'r':(250,180,70,255),'K':(30,26,32,255),'Y':(246,222,110,255),'W':(255,255,255,255)}, rows=[
   '....R..rr..R....','...rRRrrrRRr....','....RRRRRRR.....','...MMMMMMMMM....',
   '...MKMMMMMKM....','...MMMMMMMMM....','....MMmmmMM.....','...MMMMMMMMM....',
   '..mMMmMMMmMMm...','..mMMMMMMMMMm...','..mMMMMMMMMMm...','...MMmMMMmMM....',
   '...MMM...MMM....','...mm.....mm....','................','................']),
 'toret': dict(pal={'V':(74,128,92,255),'v':(50,96,68,255),'B':(110,170,224,255),
   'K':(30,26,32,255),'Y':(214,186,90,255),'W':(255,255,255,255)}, rows=[
   '..VV........VV..','..VVV......VVV..','...VVVVVVVVVV...','..VVVVVVVVVVVV..',
   '..VVKVVVVVVKVV..','..VVVVVVVVVVVV..','...VVVvvvvVVV...','....VVvBBvVV....',
   '....BB.BB.......','...BB...........','..BB....vVVv....','...B...VVVVVV...',
   '.......VVvvVV...','.......vv..vv...','................','................']),
 # ---------- EVOLUZIONI ----------
 'salvan': dict(pal={'G':(86,158,72,255),'g':(58,118,50,255),'B':(150,108,64,255),
   'b':(118,82,48,255),'S':(232,190,148,255),'K':(30,26,32,255),'R':(200,72,56,255),'W':(255,255,255,255)}, rows=[
   '....GG....GG....','...GGGGGGGGG....','..GGGgGGGgGGG...','...GgGGGGGgG....',
   '....SSSSSSSS....','...SSKSSSSKS....','...SSSSSSSSS....','....SSRRSS......',
   '..BBBBBBBBBB....','.BBbBBBBBBbBB...','.SBBBBBBBBBBS...','.SBBBbBBbBBBS...',
   '..BBBBBBBBBB....','..BBb....bBB....','..bb......bb....','..K........K....']),
 'gransalvan': dict(pal={'G':(76,148,64,255),'g':(50,108,44,255),'B':(140,100,58,255),
   'b':(108,74,42,255),'S':(228,186,144,255),'K':(30,26,32,255),'R':(196,68,52,255),'Y':(226,196,96,255),'W':(255,255,255,255)}, rows=[
   '..GG..GGGG..GG..','.GGGGGGGGGGGGG..','.GGgGGGGGGgGGG..','..GGGgGGGGGGG...',
   '...SSSSSSSSSS...','..SSKSSSSSSKS...','..SSSSSSSSSSS...','...SSSRRRSS.....',
   '.BBBBBBBBBBBBB..','.BBbBBBBBBBbBB..','.YBBBBBBBBBBBY..','.YBBBbBBBbBBBY..',
   '..BBBBBBBBBBB...','..BBbb...bbBB...','..bbb.....bbb...','..KK.......KK...']),
 'tarantas': dict(pal={'V':(80,150,80,255),'v':(54,112,58,255),'C':(224,210,152,255),
   'R':(230,66,44,255),'r':(248,156,60,255),'K':(30,26,32,255),'Y':(240,200,72,255),'W':(255,255,255,255)}, rows=[
   '...RR...........','..RrrR..VVVV....','...RR..VVVVVV...','...r...VKWVVV...',
   '.......VVVVVV...','......VVVVVv....','.....VVVVVv.....','....VCCVVVV.....',
   '...VCCCVVVVV....','..VCCCVVVVVVV...','..VCCVVVV.VVVV..','..VCCCVVV..vv...',
   '...VCCCVVVV.....','....VVVVVvv.....','.....vvvvv......','......vvv.......']),
 'tarantasio': dict(pal={'V':(66,136,72,255),'v':(44,100,50,255),'C':(220,206,148,255),
   'R':(232,60,40,255),'r':(250,150,56,255),'K':(30,26,32,255),'Y':(240,200,72,255),'A':(120,180,120,255),'W':(255,255,255,255)}, rows=[
   '..RRr......A....','.RrrrR..VVVVA...','..RRR..VVVVVVA..','...r..VVKWVVV...',
   '..A...VVVVVVV...','.AA..VVVVVVv....','.AAA.VVVVVv.....','..AAVCCVVVVV....',
   '..AVCCCVVVVVV...','..VCCCVVVVVVVV..','..VCCVVVVV.VVVV.','..VCCCVVVV..vv..',
   '..VCCCCVVVVV....','...VCCVVVVvv....','....VVVvvvv.....','.....vvvvv......']),
 'anguana': dict(pal={'B':(76,132,208,255),'b':(48,94,166,255),'C':(132,194,228,255),
   'S':(238,214,190,255),'K':(30,26,32,255),'P':(110,168,218,255),'W':(255,255,255,255)}, rows=[
   '...CCCCCCCC.....','..CCCCCCCCCC....','.CCSSSSSSSSCC...','.CSSKSSSSKSSC...',
   '.CSSSSSSSSSSC...','.CCSSSbbSSSCC...','..CCSSSSSSCC....','...BBBBBBBB.....',
   '..BBBbBBBBBB....','.BBBBBBBBBBBB...','.PBBBBBBBBBBP...','..BBBBBBBBBB....',
   '...BBBBBBBB.....','....BBbbBB......','...BB....BB.....','...bb....bb.....']),
 'anguanaregina': dict(pal={'B':(64,118,196,255),'b':(40,84,152,255),'C':(140,200,232,255),
   'S':(238,214,190,255),'K':(30,26,32,255),'Y':(240,206,90,255),'P':(104,160,212,255),'W':(255,255,255,255)}, rows=[
   '....Y.YY.Y......','...CYYCCYYC.....','..CCCCCCCCCC....','.CCSSSSSSSSCC...',
   '.CSSKSSSSKSSC...','.CSSSSSSSSSSC...','.CCSSSbbSSSCC...','..BBBBBBBBBB....',
   '.BBBbBBBBBBBB...','.BBBBBBBBBBBB...','.PBBBBBBBBBBP...','.BBBBBBBBBBBB...',
   '..BBBBBBBBBB....','...BBBBBBBB.....','..BBB.bb.BBB....','..bb......bb....']),
 'merlona': dict(pal={'K':(38,36,42,255),'k':(66,62,72,255),'G':(146,142,148,255),
   'Y':(232,176,40,255),'E':(255,255,255,255),'R':(200,60,50,255)}, rows=[
   '.....GGGG.......','....GGGGGG......','....GEGGGG......','..YYGGGGGG......',
   '..Y..KKKKKKK....','....KKKKKKKKk...','...KkKKKKKKkkk..','...KKKKKKKKkk...',
   '...KKKKKKKKk....','....KKKKKKKK....','.....KKKKKK.....','......KKKK......',
   '.....YY..YY.....','....YY....YY....','................','................']),
 'mazapegon': dict(pal={'P':(134,86,156,255),'p':(100,60,120,255),'R':(196,52,68,255),
   'S':(224,180,148,255),'K':(30,26,32,255),'Y':(226,196,96,255),'W':(255,255,255,255)}, rows=[
   '.....RRRR.......','...RRRRRRRR.....','..RRRRRRRRRR....','...SSSSSSSS.....',
   '..SSKSSSSKSS....','..SSSSSSSSSS....','...SSppppSS.....','..PPPPPPPPPP....',
   '.PPpPPPPPPpPP...','.SPPPPPPPPPPS...','..PPPPPPPPPP....','..PPpPPPPpPP....',
   '..PPp....pPP....','..pp......pp....','.K..........K...','................']),
 'bombice': dict(pal={'C':(238,232,214,255),'c':(206,198,176,255),'B':(168,150,120,255),
   'K':(30,26,32,255),'Y':(240,208,88,255),'R':(216,88,56,255),'W':(255,255,255,255)}, rows=[
   '..CC.......CC...','.CCCC.....CCCC..','.CCCCC...CCCCC..','.CCCCCC.CCCCCC..',
   '..CCCCCBCCCCC...','...CCCBBBCCC....','....CBKKBC......','....BBBBBB......',
   '...CCBBBBCC.....','..CCCCBBCCCC....','.CCCCC..CCCCC...','.CCCC....CCCC...',
   '..CC......CC....','................','................','................']),
 'buffardello': dict(pal={'G':(84,150,66,255),'g':(58,112,46,255),'V':(150,108,176,255),
   'v':(112,76,134,255),'S':(226,184,146,255),'K':(30,26,32,255),'E':(212,230,160,255),'W':(255,255,255,255)}, rows=[
   '..V...VVV...V...','.VVV.VVVVV.VVV..','.VVVVVVVVVVVV...','..VVVVVVVVVV....',
   '...gggggggg.....','...SSSSSSSS.....','..SEKSSSSKES....','..SSSSSSSSSS....',
   '...SSSggSSS.....','..GGGGGGGGGG....','.GGgGGGGGGgGG...','..GGGGGGGGGG....',
   '..GGG....GGG....','...g......g.....','................','................']),
 # ---------- VALLE D'AOSTA — tipo Ghiaccio ----------
 'neiot': dict(pal={'W':(236,244,255,255),'C':(150,196,230,255),'c':(108,158,210,255),
   'K':(30,26,40,255)}, rows=[
   '................','......CCCC......','.....CWWWWC.....','....CWWWWWWC....',
   '....CWKWWKWC....','....CWWWWWWC....','.....CWccWC.....','....CCCCCCCC....',
   '...CCWWWWWWCC...','..CWWWWWWWWWWC..','..cWWWWWWWWWWc..','...CWWWWWWWWC...',
   '....CWWWWWWC....','....CC....CC....','....c......c....','................']),
 'brinassa': dict(pal={'B':(120,170,222,255),'b':(78,128,190,255),'C':(212,236,250,255),
   'S':(222,228,238,255),'K':(30,26,40,255),'W':(255,255,255,255)}, rows=[
   '.......CC.......','......CCCC......','.....CCBBCC.....','....CBBBBBBC....',
   '....SSSSSSSS....','....SBKSSKBS....','....SSSSSSSS....','.....SbbbbS.....',
   '....BBBBBBBB....','...BBbBBBBbBB...','..CBBBBBBBBBBC..','..CBBBBBBBBBBC..',
   '...BBBBBBBBBB...','....BBBBBBBB....','....bb....bb....','................']),
 'stambeco': dict(pal={'F':(240,244,250,255),'f':(196,206,222,255),'H':(178,158,118,255),
   'h':(140,122,90,255),'M':(208,178,150,255),'K':(30,26,40,255)}, rows=[
   '..H........H....','..hH......Hh....','...hH....Hh.....','....HFFFFFFH....',
   '...FFFFFFFFFF...','...FFKFFFFKFF...','...FFFFFFFFFF...','....FFFMMFF.....',
   '...FFFFFFFFFF...','..fFFFFFFFFFFf..','..FFFFFFFFFFFF..','..FFFFFFFFFFFF..',
   '...FF.FF.FF.F...','...FF.FF.FF.F...','..f........f....','................']),
 # ---------- MILANO — leggendaria nebbia (Spettro/Acqua) ----------
 'scighera': dict(pal={'C':(202,212,228,255),'c':(150,166,192,255),'W':(244,248,255,255),
   'K':(44,44,66,255)}, rows=[
   '....CCCCCC......','..CCCCCCCCCC....','.CCCWWWWWWCCC...','.CCWWWWWWWWCC...',
   '.CWWKWWWWKWWC...','.CWWWWWWWWWWC...','.cCWWWWWWWWCc...','..CCWWWWWWCC....',
   '..cCCWWWWCCc....','...cCCCCCCc.....','..c.cCCCCc.c....','.c...cccc...c...',
   '..c..c..c..c....','...c.....c.c....','................','................']),
 # ---------- TORINO — il Toro di bronzo (Acciaio) ----------
 'taurin': dict(pal={'M':(172,120,62,255),'m':(120,84,40,255),'H':(224,214,182,255),
   'N':(86,60,40,255),'K':(26,22,18,255)}, rows=[
   '..H........H....','..HH......HH....','...MMMMMMMM.....','..MMMMMMMMMM....',
   '..MMKMMMMKMM....','..MMMMMMMMMM....','...MMMNNMMM.....','..mMMMMMMMMm....',
   '..MMMMMMMMMM....','..MMMMMMMMMM....','..MMMMMMMMMM....','..MM.MM.MM.M....',
   '..mm.mm.mm.m....','..m........m....','................','................']),
 # ---------- VALLE D'AOSTA — il San Bernardo del passo (Normale/Ghiaccio) ----------
 'barry': dict(pal={'W':(238,238,242,255),'w':(196,196,206,255),'B':(150,100,60,255),
   'N':(54,46,46,255),'K':(26,22,26,255),'R':(204,64,52,255)}, rows=[
   '..BB......BB....','.BWWB....BWWB...','.BWWWWWWWWWWB...','..WBWWWWWWBW....',
   '..WWKWWWWKWW....','..WWWWNNWWWW....','..WWWWWWWWWW....','.WWWWWWWWWWWW...',
   '.WWWRRRRRRWW....','.WWWRRRRRRWW....','.WWWWWWWWWWWW...','..WW.WW.WW.WW...',
   '..ww.ww.ww.ww...','................','................','................']),
 # ---------- EVOLUZIONI · blocco 1 ----------
 'gattore': dict(pal={'G':(140,130,162,255),'g':(100,92,126,255),'C':(212,206,226,255),
   'Y':(240,210,90,255),'K':(28,24,34,255),'R':(190,72,90,255)}, rows=[
   '..G..Y.Y.Y..G...','..GG.YYYYY.GG...','..GgG.....GgG...','..GGGGGGGGGGGG..',
   '..GYKGGGGGKYG...','..GGGGGGGGGGGG..','...GGGRRGGG.....','..GGGGGGGGGGGG..',
   '.GGgGGGGGGGgGG..','.CGGGGGGGGGGGC..','.CGGGGGGGGGGGC..','..GGGGGGGGGGG...',
   '..GG.GG.GG.GG...','..gg.gg.gg.gg...','.G..........G...','................']),
 'bissone': dict(pal={'V':(96,168,104,255),'v':(60,124,72,255),'Y':(240,200,72,255),
   'K':(28,24,20,255),'R':(214,64,56,255),'S':(232,200,170,255),'W':(255,255,255,255)}, rows=[
   '.....YYY........','....VVVVV.......','...VVKVVKV......','...VVVVVVV......',
   '...VVRRRV.S.....','....VVVV..S.....','...vVVVVv.......','..VVVVVVVV......',
   '.VVVv..vVVV.....','.VVV....VVV.....','.VVv....vVV.....','..VVv..vVV......',
   '...VVVVVV.......','....vVVv........','.....vv.........','................']),
 'munacione': dict(pal={'R':(180,46,46,255),'r':(140,34,38,255),'S':(232,190,148,255),
   'K':(28,24,32,255),'Y':(248,222,80,255),'B':(56,52,66,255),'W':(255,255,255,255)}, rows=[
   'Y....RRRR....Y..','.Y..RRRRRR..Y...','..RRRrrrrRR.....','..RR.SSSS.RR....',
   '.YR.SKSSKS.RY...','.Y..SSSSSS..Y...','.....SrrS.......','...RRRRRRRR.....',
   '..RRrRRRRrRR....','.YRRRRRRRRRRY...','.SRRRRRRRRRRS...','..RRRRRRRRRR....',
   '...BB....BB.....','..YY......YY....','................','................']),
 # ---------- EVOLUZIONI · blocco 2 (Piemonte) ----------
 'granservan': dict(pal={'B':(150,110,68,255),'b':(112,80,48,255),'S':(232,188,146,255),
   'K':(28,24,28,255),'H':(120,84,52,255),'Y':(226,196,96,255)}, rows=[
   '.....HHHH.......','....HHHHHH......','...HHHHHHHH.....','....SSSSSS......',
   '...SKSSSSKS.....','...SSSSSSSS.....','....SbbbbS......','..BBBBBBBBBB....',
   '.BBbBBBBBBBbB...','.YBBBBBBBBBBY...','.YBBBBBBBBBBY...','..BBBBBBBBBB....',
   '..BBb....bBB....','..bb......bb....','..K........K....','................']),
 'mascagna': dict(pal={'C':(60,52,78,255),'S':(206,182,162,255),'K':(28,24,28,255),
   'Y':(238,210,96,255),'G':(120,116,134,255),'g':(86,82,100,255)}, rows=[
   '.......C........','......CC........','.....CCCC.......','....CCCCCC......',
   '...SSSSSSSS.....','...SYSSSSKS.....','...SSSSSSSS.....','....SggggS......',
   '...GGGGGGGG.....','..GGgGGGGgGG....','.GGGGGGGGGGGG...','.GGGgGGGGgGGG...',
   '..GGGGGGGGGG....','...GGGGGGGG.....','....g....g......','................']),
 'fusinon': dict(pal={'M':(150,154,168,255),'m':(110,114,130,255),'R':(238,108,48,255),
   'r':(250,180,70,255),'K':(28,24,32,255),'Y':(246,222,110,255)}, rows=[
   '...R..rr..R.....','..rRRrrrRRr.....','...RRRRRRR......','..MMMMMMMMMM....',
   '..MKMMMMMMKM....','..MMMMMMMMMM....','...MMmmmmMM.....','..MMMMMMMMMM....',
   '.mMMmMMMMmMMm...','.mMMMMMMMMMMm...','.mMMMMMMMMMMm...','..MMmMMMMmMM....',
   '..MMM..MMM......','..mm....mm......','................','................']),
 'toron': dict(pal={'V':(74,128,92,255),'v':(50,96,68,255),'B':(110,170,224,255),
   'K':(28,24,20,255),'Y':(214,186,90,255)}, rows=[
   '..VV........VV..','..VVV......VVV..','...VVVVVVVVVV...','..VVVVVVVVVVVV..',
   '..VVKVVVVVVKVV..','..VVVVVVVVVVVV..','...VVVvvvvVVV...','....VVvBBvVV....',
   '....BB.BB.......','...BB...........','..BBB...vVVv....','...B...VVVVVV...',
   '.......VVvvVV...','.......vv..vv...','................','................']),
 # ---------- EVOLUZIONI · blocco 3 (Hexany A) ----------
 'strigone': dict(pal={'G':(150,140,120,255),'g':(110,102,86,255),'W':(245,245,250,255),
   'K':(28,24,28,255),'Y':(232,176,40,255)}, rows=[
   '....GG....GG....','...GGGG..GGGG...','..GGGGGGGGGGGG..','..GWWGGGGGGWWG..',
   '..GWKGGGGGGKWG..','..GGGGGGGGGGGG..','..GGGGGYYGGGGG..','..GGGGGGGGGGGG..',
   '..GgGGGGGGGGgG..','.GGGGGGGGGGGGGG.','.GGgGGGGGGGGgGG.','..GGGGGGGGGGGG..',
   '...GGGGGGGGGG...','....YY....YY....','................','................']),
 'bordona': dict(pal={'B':(110,150,200,255),'b':(70,110,170,255),'C':(190,215,235,255),
   'K':(28,24,28,255)}, rows=[
   '.....CCCC.......','...CCCCCCCC.....','..CCBBBBBBCC....','..CBBBBBBBBC....',
   '..CBKBBBBKBC....','..CBBBBBBBBC....','...CBBBBBBC.....','..BBBBBBBBBB....',
   '.BBbBBBBBBbBB...','.CBBBBBBBBBBC...','.CBBBBBBBBBBC...','..BBBBBBBBBB....',
   '...BB.BB.BB.....','..b..b..b..b....','................','................']),
 'mannarone': dict(pal={'G':(120,118,128,255),'g':(86,84,96,255),'W':(240,240,245,255),
   'K':(28,24,28,255),'R':(180,70,70,255),'Y':(230,200,80,255)}, rows=[
   '..G..........G..','..GG........GG..','..GgG......GgG..','..GGGGGGGGGGGG..',
   '..GGYKGGGGKYGG..','..GGGGGGGGGGGG..','..GGGWWRRWWGGG..','..GGGGGGGGGGGG..',
   '.GGgGGGGGGGGgGG.','.GGGGGGGGGGGGGG.','.GGGGGGGGGGGGGG.','..GGGGGGGGGGGG..',
   '..GGG.GG.GG.GG..','..g.........g...','................','................']),
 # ---------- EVOLUZIONI · blocco 4 (Hexany B) ----------
 'ratavolora': dict(pal={'P':(150,104,178,255),'p':(104,68,128,255),'K':(28,24,28,255),
   'W':(240,240,245,255)}, rows=[
   '.PP........PP...','.PPP......PPP...','.PPPP....PPPP...','..PPPPPPPPPP....',
   '..PPKPPPPKPP....','..PPPPPPPPPP....','..PPPWWWWPPP....','...PPPPPPPP.....',
   '.PPpPPPPPPpPP...','PPPPPPPPPPPPPP..','.PPpPPPPPPpPP...','...PPPPPPPP.....',
   '....PP..PP......','................','................','................']),
 'malebranca': dict(pal={'R':(214,72,56,255),'r':(150,40,42,255),'K':(28,24,28,255),
   'Y':(248,216,80,255),'B':(56,40,46,255),'W':(255,255,255,255)}, rows=[
   '..R........R....','..RR......RR....','..rRR....RRr....','...RRRRRRRR.....',
   '..RRYKRRKYRR....','..RRRRRRRRRR....','..RRRWWWWRRR....','...RRRRRRRR.....',
   '..RrRRRRRRrR....','.RRRRRRRRRRRR...','.BRRRRRRRRRRB...','..RRRRRRRRRR....',
   '...RR.RR.RR.....','..r........r....','................','................']),
 'basiliscu': dict(pal={'V':(110,150,80,255),'v':(74,110,56,255),'Y':(232,200,72,255),
   'K':(28,24,28,255),'R':(200,60,60,255)}, rows=[
   '.....YYYY.......','....VVVVVV......','...VVKVVKVV.....','...VVVVVVVV.....',
   '...VVVRRVVV.....','....VVVVVV......','...vVVVVVVv.....','..VVVVVVVVVV....',
   '.VVVv....vVVV...','.VVV......VVV...','.VVv......vVV...','..VVv....vVV....',
   '...VVVVVVVV.....','.....vvvv.......','................','................']),
 # ---------- LIGURIA — il Grifone di Genova (Volante) ----------
 'grifone': dict(pal={'B':(150,110,60,255),'b':(110,80,44,255),'Y':(232,196,90,255),
   'W':(232,224,196,255),'K':(28,24,28,255)}, rows=[
   '.....WWW........','....WWWWW.......','...WWKWWY.......','...WWWWWW.......',
   '..WWWWWWW.......','..WBBBBBBB......','.BBBBBBBBBB.....','.BBbBBBBBBBB....',
   '.BBBBBBBBBBB....','..BBBBBBBBB.....','..BBBBBBBBB.....','..BB.BB.BB.....',
   '..bb.bb.bb.....','..Y..Y..Y......','................','................']),
 # ---------- TRENTINO-A.A. — Roccia + Re Laurino ----------
 'croder': dict(pal={'G':(140,134,120,255),'g':(96,92,80,255),'W':(190,184,168,255),
   'K':(28,24,28,255)}, rows=[
   '................','.....GGGG.......','....GGGGGG......','...GGWGGWGG.....',
   '...GGKGGKGG.....','...GGGGGGGG.....','..GgGGGGGGgG....','..GGGGGGGGGG....',
   '..gGGGGGGGGg....','..GGGGGGGGGG....','..GG.GG.GG.G....','..gg.gg.gg.g....',
   '................','................','................','................']),
 'crodon': dict(pal={'G':(132,126,112,255),'g':(90,86,74,255),'W':(186,180,164,255),
   'K':(28,24,28,255)}, rows=[
   '..GGG....GGG....','.GGGGGGGGGGGG...','.GGWGGGGGGWGG...','.GGKGGGGGGKGG...',
   '.GGGGGGGGGGGG...','.GGGGGGGGGGGG...','GGgGGGGGGGGgGG..','GGGGGGGGGGGGGG..',
   '.gGGGGGGGGGGg...','.GGGGGGGGGGGG...','.GGGG....GGGG...','.gggg....gggg...',
   '.GG........GG...','................','................','................']),
 'laurino': dict(pal={'Y':(232,200,90,255),'S':(222,182,150,255),'W':(225,218,205,255),
   'R':(170,92,82,255),'r':(120,62,56,255),'K':(28,24,28,255)}, rows=[
   '...Y.Y.Y........','...YYYYY........','..SSSSSSS.......','..SKSSSKS.......',
   '..SSSSSSS.......','..WWWWWWW.......','..WWWWWWW.......','.RRRRRRRRR......',
   '.RrRRRRRRrR.....','.RRRRRRRRRR.....','.RRRRRRRRRR.....','..RRR..RRR......',
   '..rrr..rrr......','................','................','................']),
 # ---------- FRIULI-V.G. — linea del Cjalcjut + Bora ----------
 'cjalcjut': dict(pal={'B':(140,175,215,255),'b':(90,130,180,255),'W':(220,235,250,255),
   'K':(30,26,32,255),'C':(180,215,240,255),'w':(160,200,225,255)}, rows=[
   '....WWWW........',
   '...WwwwwW.......',
   '..WwBBBBwW......',
   '..WwBKBKBwW.....',
   '..WwBBBBBwW.....',
   '...WwBBBwW......',
   '....WCCCW.......',
   '...bBBBBBb......',
   '..bBBbBBBBb.....',
   '..bBBBBBBBb.....',
   '...bBBBBBb......',
   '....bb..bb......',
   '...b......b.....',
   '..w........w....',
   '................',
   '................']),
 'cjalcjutone': dict(pal={'B':(110,155,205,255),'b':(70,110,170,255),'W':(210,230,250,255),
   'K':(30,26,32,255),'w':(140,185,220,255),'D':(50,80,130,255)}, rows=[
   '..WW........WW..',
   '.WWwW......WwWW.',
   'WWwBBWWWWWWBBwWW',
   '.WwBBBBBBBBBBwW.',
   '..WBBKBBBBKBBw..',
   '..WBBBBBBBBBBw..',
   '..WwBBBBBBBBwW..',
   '..bBBBBBBBBBBb..',
   '.bBBBbBBBBBbBBb.',
   '.bBBBBBBBBBBBBb.',
   '.bBBBBBBBBBBBBb.',
   '..bBBBBBBBBBBb..',
   '..bBBbb..bbBBb..',
   '...bDD....DDb...',
   '..w...w..w...w..',
   '................']),
 'bora': dict(pal={'B':(180,205,235,255),'b':(120,155,200,255),'W':(240,245,255,255),
   'K':(30,26,32,255),'C':(200,225,245,255),'w':(100,140,190,255)}, rows=[
   '.W..........W...',
   'WwW........WwW..',
   'WWwBBBBBBBBwWW..',
   '.WwBBBBBBBBBwW..',
   '..WwBBKBBKBBwW..',
   '..WwBBBBBBBwW...',
   '...WwBBBBBwW....',
   '...bBBBBBBBb....',
   '..bBBBBBBBBBb...',
   '..bBBBBBBBBBb...',
   '..bBBBBBBBBBb...',
   '..bBBBBBBBBBb...',
   '...bBBBBBBBb....',
   '....bb....bb....',
   '...w........w...',
   '..w..........w..']),
 # ---------- VENETO — linea del Mazariol + Leone di San Marco ----------
 'mazariol': dict(pal={'R':(200,60,60,255),'r':(150,40,40,255),'S':(232,190,148,255),
   'K':(30,26,32,255),'G':(80,140,60,255),'g':(56,104,42,255),'B':(80,56,36,255)}, rows=[
   '......RR........',
   '....RRRRRR......',
   '....SSSSSS......',
   '....SKSSKS......',
   '....SSSSSS......',
   '.....SrrS.......',
   '...GGGGGGGG.....',
   '..GGgGGGGgGG....',
   '..SGGGGGGGGGS...',
   '...GGGGGGGG.....',
   '...GGg..gGG.....',
   '....GG..GG......',
   '....BB..BB......',
   '....B....B......',
   '................',
   '................']),
 'mazarione': dict(pal={'R':(185,50,50,255),'r':(130,30,30,255),'S':(232,190,148,255),
   'K':(30,26,32,255),'G':(60,120,50,255),'g':(40,90,36,255),'B':(88,148,200,255),'b':(60,108,165,255)}, rows=[
   '....RRRRRR......',
   '...RRRRRRRR.....',
   '...RSSSSSSR.....',
   '..RSSKSSKRR.....',
   '..RSSSSSSRR.....',
   '...SSSSSSS......',
   '..GGGGGGGGGG....',
   '.GGGgGGGGGGGG...',
   '.BGGGGGGGGGGB...',
   '.GGGgGGGGGGGG...',
   '..GGGg..gGGG....',
   '...GGG..GGG.....',
   '...GGG..GGG.....',
   '....BB..BB......',
   '................',
   '................']),
 'leon': dict(pal={'Y':(220,180,60,255),'y':(170,130,40,255),'B':(88,148,212,255),
   'b':(56,108,178,255),'W':(240,230,200,255),'K':(30,26,32,255),'R':(200,80,50,255)}, rows=[
   '....BB..BB......',
   '...BBB..BBB.....',
   '..BBBYYYYBBB....',
   '.BBBYYKYYYBBB...',
   '..BYYYYYYYYY....',
   '...YYYYYYYYYB...',
   '..YYWYYYWYYYY...',
   '.YYYYYYYYYYYy...',
   '.YYyYYYYYYYyy...',
   '.YYYyYYYYyYYY...',
   '.YYy.RRRR.yYY...',
   '..YY.RRRR.YY....',
   '..YYY....YYY....',
   '..yy......yy....',
   '................',
   '................']),
}

ORDER = list(CREATURES.keys())
cw = 32
csheet = Image.new('RGBA', (cw*len(ORDER), cw*2), (0, 0, 0, 0))
for i, key in enumerate(ORDER):
    c = CREATURES[key]
    base = px_img(c['rows'], c['pal'])
    front = scale(outline(base), 2)                      # 32x32
    back = scale(outline(base.transpose(Image.FLIP_LEFT_RIGHT)), 2)
    # il retro leggermente più scuro
    dark = Image.new('RGBA', back.size, (0, 0, 30, 36))
    back = Image.alpha_composite(back, Image.composite(dark, Image.new('RGBA', back.size, (0,0,0,0)), back.split()[3]))
    csheet.paste(front, (i*cw, 0))
    csheet.paste(back, (i*cw, cw))
csheet.save(os.path.join(OUT, 'creatures.png'))
# Numero di creature procedurali: serve a import_hexany.py per essere idempotente.
with open(os.path.join(OUT, '.proc_count'), 'w') as f:
    f.write(str(len(ORDER)))

# ----------------------------------------------------------------------
# PERSONAGGI — 16x16. Frame 0-7: player (down0 down1 up0 up1 left0 left1 right0 right1)
# Frame 8+: NPC statici (giù): prof, nonna, ragazzo, tifoso, vecchietto,
#           carletto, scagnozzo, giornalaio
# ----------------------------------------------------------------------
def person(shirt, hat, dirn='down', step=0, skin=(232,184,136,255), coat=None):
    im = Image.new('RGBA', (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    pants = (40, 48, 72, 255)
    # ombra
    d.ellipse([3, 13, 12, 15], fill=(0, 0, 0, 50))
    # testa
    d.rectangle([5, 2, 10, 6], fill=skin)
    # cappello/capelli
    d.rectangle([4, 1, 11, 3], fill=hat)
    if dirn == 'down':
        d.point((6, 4), fill=(20, 20, 24, 255)); d.point((9, 4), fill=(20, 20, 24, 255))
    elif dirn == 'left':
        d.point((5, 4), fill=(20, 20, 24, 255))
    elif dirn == 'right':
        d.point((10, 4), fill=(20, 20, 24, 255))
    else:
        d.rectangle([4, 1, 11, 5], fill=hat)
    # corpo
    body = coat or shirt
    d.rectangle([4, 7, 11, 11], fill=body)
    if coat:
        d.rectangle([6, 7, 9, 11], fill=shirt)
    # braccia
    d.rectangle([3, 8, 4, 10], fill=skin)
    d.rectangle([11, 8, 12, 10], fill=skin)
    # gambe
    if step:
        d.rectangle([4, 12, 6, 14], fill=pants); d.rectangle([9, 11, 11, 13], fill=pants)
    else:
        d.rectangle([4, 11, 6, 13], fill=pants); d.rectangle([9, 12, 11, 14], fill=pants)
    return outline(im)

frames = []
PLAYER = dict(shirt=(184, 44, 48, 255), hat=(34, 32, 40, 255))
for dirn in ('down', 'up', 'left', 'right'):
    for step in (0, 1):
        frames.append(person(PLAYER['shirt'], PLAYER['hat'], dirn, step))
NPCS = [
    dict(shirt=(140, 80, 110, 255), hat=(120, 70, 100, 255), coat=(238, 238, 238, 255)),  # prof
    dict(shirt=(110, 76, 52, 255),  hat=(210, 206, 200, 255)),                            # nonna
    dict(shirt=(60, 92, 170, 255),  hat=(168, 144, 80, 255)),                             # ragazzo
    dict(shirt=(186, 56, 56, 255),  hat=(40, 40, 44, 255)),                               # tifoso
    dict(shirt=(90, 128, 76, 255),  hat=(190, 186, 180, 255)),                            # vecchietto
    dict(shirt=(240, 208, 80, 255), hat=(44, 56, 120, 255)),                              # carletto
    dict(shirt=(58, 56, 64, 255),   hat=(24, 22, 28, 255)),                               # scagnozzo
    dict(shirt=(70, 130, 90, 255),  hat=(120, 116, 110, 255)),                            # giornalaio
]
for n in NPCS:
    frames.append(person(n['shirt'], n['hat'], 'down', 0, coat=n.get('coat')))

# Frame 16: oggetto raccoglibile (sferina rossa/bianca, stile contenitore)
def make_item():
    im = Image.new('RGBA', (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.ellipse([4, 12, 11, 14], fill=(0, 0, 0, 50))                   # ombra
    d.ellipse([4, 3, 11, 10], fill=(238, 238, 238, 255))            # base bianca
    d.pieslice([4, 3, 11, 10], 180, 360, fill=(214, 64, 56, 255))   # metà superiore rossa
    d.line([(4, 6), (11, 6)], fill=(30, 26, 32, 255))
    d.line([(4, 7), (11, 7)], fill=(30, 26, 32, 255))
    d.rectangle([7, 6, 8, 7], fill=(240, 240, 240, 255))            # bottone centrale
    return outline(im)
frames.append(make_item())

psheet = Image.new('RGBA', (16*len(frames), 16), (0, 0, 0, 0))
for i, f in enumerate(frames):
    psheet.paste(f, (i*16, 0))
psheet.save(os.path.join(OUT, 'chars.png'))

# Anteprima ingrandita per controllo umano
prev = Image.new('RGBA', (csheet.width*3, csheet.height*3 + T*3*2 + 16*3), (24, 24, 36, 255))
prev.paste(scale(sheet, 3), (0, 0))
prev.paste(scale(csheet, 3), (0, T*3 + 8))
prev.paste(scale(psheet, 3), (0, T*3 + csheet.height*3 + 16))
prev.save(os.path.join(OUT, '_preview.png'))
print('OK: tileset.png', sheet.size, '| creatures.png', csheet.size, '| chars.png', psheet.size)
