/* Mappe in ASCII — ogni carattere è un tile.
   t2i traduce il carattere nell'indice del tileset (assets/tileset.png):
   0 strada · 1 piazza · 2 prato · 3 erba alta · 4 albero · 5/6 acqua ·
   7 palazzo · 8 duomo · 9 porta lab · 10 porta palestra · 11 edicola ·
   12 uscita · 13 pavimento interno · 14 muro interno · 15 sentiero ·
   16 Mole · 17 portici · 18 porta ambulatorio · 19 neve · 20 montagna(solida)

   Per aggiungere una regione: nuova voce qui + portali + NPC in npcs.js.
   (In futuro: esporta da Tiled in JSON e converti — vedi README.) */

const MAPS = {
  milano: {
    t2i: { '.':0, ',':1, 'G':3, 'T':4, 'W':5, '#':7, 'M':8, 'D':9, 'Y':10, 'K':11, 'P':15, 'E':12, 'S':12, 'H':18, 'N':12, 'C':9 },
    tiles: [
      'TTTTTTTTTTTTTPPTTTTTTTTTTTTTTT',
      'T..........................S.T',
      'T..####..####....####..####..T',
      'T..####..####....####..####..T',
      'T..##D#..####....####..#Y##..T',
      'T............................T',
      'T............................T',
      'T..####......MMMM......####..T',
      'T..####......MMMM......####..T',
      'T..####......MMMM......####..T',
      'T............MM..............T',
      'T............................T',
      'T...K........................T',
      'T............................T',
      'T..####..####....####..####..T',
      'T..####..#H##....####..#C##..T',
      'T............................T',
      'T.WWWWWWWWWWW....WWWWWWWWWWW.T',
      'T.WWWWWWWWWWW....WWWWWWWWWWW.T',
      'T............................T',
      'T.............NN.............T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: null,
    fish: [ { id:'anguanella', min:3, max:6, w:100 } ]
  },
  parco: {
    t2i: { '.':2, 'G':3, 'T':4, 'W':5, 'E':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'T......................T',
      'T..GGGGG....GGGGGG.....T',
      'T..GGGGG....GGGGGG.....T',
      'T..GGGGG....GGGGGG.....T',
      'T......................T',
      'T...WWWW......GGGG.....T',
      'T...WWWW......GGGG.....T',
      'T......................T',
      'T..GGGGGGGG...GGGGGG...T',
      'T..GGGGGGGG...GGGGGG...T',
      'T..GGGGGGGG............T',
      'T......................T',
      'T......................T',
      'T......................T',
      'TTTTTTTTTTTEETTTTTTTTTTT'
    ],
    encounters: [
      { id:'merlotta',   min:2, max:5, w:30 },
      { id:'mazapegul',  min:2, max:5, w:28 },
      { id:'bigatto',    min:3, max:5, w:20 },
      { id:'linchetto',  min:4, max:6, w:15 },
      { id:'civettona',  min:3, max:6, w:12 },
      { id:'munaciello', min:5, max:5, w:5 }
    ]
  },
  lab: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '##########',
      '#........#',
      '#........#',
      '#........#',
      '#........#',
      '#........#',
      '#........#',
      '####EE####'
    ],
    encounters: null
  },
  gym: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  torino: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, '#':7, 'O':17, 'L':16, 'Y':10, 'S':12, 'H':18, 'V':12, 'P':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T.............V..............T',
      'T..####..####....OOOO...LL...T',
      'T..####..####....OOOO...LL...T',
      'T..#Y##..####....OOOO...LL...T',
      'T............................T',
      'T............................T',
      'T..OOOO..OOOO....####..####..T',
      'T..OOOO..OOOO....#H##..####..T',
      'T............................T',
      'T............................T',
      'T.WWWWWWWWWWWW....WWWWWWWWWW.T',
      'T.WWWWWWWWWWWW....WWWWWWWWWW.T',
      'T............................T',
      'T..GGGGGG....GGGGGG..........T',
      'T..GGGGGG....GGGGGG..........T',
      'T..GGGGGG....GGGGGG..........T',
      'T............................T',
      'T..GGGGGGGG..GGGGGG..........T',
      'T..GGGGGGGG..GGGGGG......S...T',
      'T......P.....................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'servanot',    min:6, max:9,  w:32 },
      { id:'merlotta',    min:6, max:9,  w:23 },
      { id:'linchetto',   min:7, max:9,  w:18 },
      { id:'borda',       min:8, max:10, w:10 },
      { id:'mazapegul',   min:7, max:10, w:9 },
      { id:'masca',       min:8, max:10, w:8 },
      { id:'lupomannaro', min:9, max:10, w:5 }
    ],
    fish: [
      { id:'anguanella', min:6, max:9,  w:55 },
      { id:'borda',      min:7, max:10, w:25 },
      { id:'toret',      min:8, max:10, w:20 }
    ]
  },
  gymto: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  ambmi: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  ambto: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  /* ---------- REGIONE 3 · VALLE D'AOSTA ----------
     ^ montagna · X santuario dello Stambéco · A archivio della Cosca · V bus per Torino */
  aosta: {
    t2i: { '.':19, 'G':3, 'T':4, 'W':5, '#':7, 'Y':10, 'H':18, 'A':9, 'V':12, '^':20, 'X':20, 'B':12, 'J':12 },
    tiles: [
      '^^^^B^^^^^^^^X^^^^^^^^^^^^^^',
      '^.........TT...TT..........^',
      '^..####............####....^',
      '^..#Y##............#A##....^',
      '^..........................^',
      '^....GGGG.........GGGG.....^',
      '^....GGGG.........GGGG.....^',
      '^....GGGG.........GGGG.....^',
      '^..........................^',
      '^..###.....................^',
      '^..#H#.....................^',
      '^..........................^',
      '^.........TT...TT..........^',
      '^....WWWW..................^',
      '^....WWWW..................^',
      '^..........................^',
      '^...J........VV............^',
      '^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
    ],
    encounters: [
      { id:'neiot',       min:13, max:16, w:40 },
      { id:'civettona',   min:13, max:16, w:25 },
      { id:'lupomannaro', min:14, max:17, w:18 },
      { id:'brinassa',    min:16, max:18, w:12 }
    ],
    fish: [ { id:'anguanella', min:13, max:16, w:100 } ]
  },
  gymao: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  ambao: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  /* ---------- MILANO · percorso dei Navigli (U = ritorno a Milano, Z = area segreta) ---------- */
  navigli: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........UU..........T',
      'T.WWW..............WWW.T',
      'T.WWW.....GGGG.....WWW.T',
      'T.WWW.....GGGG.....WWW.T',
      'T.........GGGG.........T',
      'T.....TT........TT.....T',
      'T.........GGGG.........T',
      'T......................T',
      'T.WWW..............WWW.T',
      'T.WWW.....GGGG.....WWW.T',
      'T......................T',
      'T.....TT........TT.....T',
      'T........GGGGGG........T',
      'T........GGGGGG........T',
      'T..........ZZ..........T',
      'T......................T',
      'TTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'merlotta',  min:3, max:6, w:28 },
      { id:'mazapegul', min:3, max:6, w:24 },
      { id:'bigatto',   min:3, max:6, w:20 },
      { id:'civettona', min:4, max:7, w:16 },
      { id:'bisso',     min:5, max:7, w:12 }
    ],
    items: [
      { x:3,  y:8,  item:'ampolla',    flag:'it_nav1' },
      { x:20, y:11, item:'panzerotto', flag:'it_nav2' },
      { x:18, y:16, item:'ampolla',    flag:'it_nav3' }
    ],
    fish: [ { id:'anguanella', min:4, max:7, w:100 } ]
  },
  /* ---------- MILANO · area segreta della Darsena (X = santuario della Scighéra) ---------- */
  segreto: {
    t2i: { '.':2, 'G':3, 'T':4, 'W':5, 'X':5, 'E':12 },
    tiles: [
      'TTTTTTTTTTTTTTTT',
      'T..............T',
      'T..GGGG..GGGG..T',
      'T..GGGG..GGGG..T',
      'T.....XX.......T',
      'T.WWWWWWWWWWWW.T',
      'T.WWWWWWWWWWWW.T',
      'T..............T',
      'T...GG....GG...T',
      'T...GG....GG...T',
      'T..............T',
      'T......EE......T',
      'T..............T',
      'TTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'bisso',        min:8, max:11, w:30 },
      { id:'munaciello',   min:9, max:12, w:22 },
      { id:'gattomammone', min:9, max:12, w:20 },
      { id:'anguanella',   min:8, max:10, w:18 },
      { id:'mazapegul',    min:8, max:10, w:10 }
    ],
    items: [
      { x:12, y:1, item:'pizza', flag:'it_seg1' }
    ],
    fish: [ { id:'anguanella', min:8, max:11, w:100 } ]
  },
  /* ---------- MILANO · negozio (interno) — commesso + laptop del deposito ---------- */
  shopmi: {
    t2i: { '.':13, '#':14, 'E':12, 'L':21 },
    indoor: true,
    tiles: [
      '##########',
      '#........#',
      '#......L.#',
      '#........#',
      '#........#',
      '####EE####'
    ],
    encounters: null
  },
  /* ---------- TORINO · Murazzi del Po (U = Torino, Z = sotterranei) ---------- */
  murazzi: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'T.........UU...........T',
      'T...........WWWWWWWWW..T',
      'T...GGGG....WWWWWWWWW..T',
      'T...GGGG....WWWWWWWWW..T',
      'T...........WWWWWWWWW..T',
      'T....TT.....WWWWWWWWW..T',
      'T...........WWWWWWWWW..T',
      'T...GGGG....WWWWWWWWW..T',
      'T...GGGG....WWWWWWWWW..T',
      'T...........WWWWWWWWW..T',
      'T....TT.....WWWWWWWWW..T',
      'T...........WWWWWWWWW..T',
      'T...GGGG....WWWWWWWWW..T',
      'T...GGGG....WWWWWWWWW..T',
      'T...........WWWWWWWWW..T',
      'T.........ZZ...........T',
      'TTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'merlotta',  min:7, max:10, w:28 },
      { id:'mazapegul', min:7, max:10, w:24 },
      { id:'bisso',     min:8, max:11, w:20 },
      { id:'borda',     min:8, max:11, w:16 },
      { id:'masca',     min:9, max:11, w:12 }
    ],
    items: [
      { x:2, y:5,  item:'ampolla',    flag:'it_mur1' },
      { x:2, y:12, item:'panzerotto', flag:'it_mur2' }
    ],
    fish: [
      { id:'anguanella', min:7, max:10, w:50 },
      { id:'borda',      min:8, max:11, w:30 },
      { id:'toret',      min:9, max:11, w:20 }
    ]
  },
  /* ---------- TORINO · sotterranei (X = Taurin, il toro di bronzo) ---------- */
  sotterranei: {
    t2i: { '.':13, '#':14, 'W':5, 'G':3, 'X':14, 'E':12 },
    tiles: [
      '################',
      '#..............#',
      '#.......WWWW...#',
      '#.......WWWW...#',
      '#....XX........#',
      '#..............#',
      '#..............#',
      '#.GGGG....GGG..#',
      '#.GGGG....GGG..#',
      '#..............#',
      '#..............#',
      '#......EE......#',
      '#..............#',
      '################'
    ],
    encounters: [
      { id:'masca',     min:9,  max:12, w:30 },
      { id:'servanot',  min:9,  max:12, w:25 },
      { id:'bisso',     min:10, max:13, w:20 },
      { id:'mazapegul', min:10, max:12, w:15 },
      { id:'borda',     min:10, max:13, w:10 }
    ],
    items: [ { x:12, y:1, item:'pizza', flag:'it_sot1' } ]
  },
  /* ---------- AOSTA · Gran San Bernardo (U = Aosta, Z = grotta del gelo) ---------- */
  gransanbernardo: {
    t2i: { '.':19, 'G':3, 'T':4, 'W':5, '^':20, 'U':12, 'Z':12 },
    tiles: [
      '^^^^^^^^^^^^^^^^^^^^^^^^',
      '^..........UU..........^',
      '^......................^',
      '^...GGGG........GGGG...^',
      '^...GGGG........GGGG...^',
      '^......................^',
      '^.........TT...........^',
      '^......................^',
      '^...GGGG........GGGG...^',
      '^...GGGG.WW.....GGGG...^',
      '^........WW............^',
      '^...........TT.........^',
      '^......................^',
      '^...GGGG........GGGG...^',
      '^...GGGG........GGGG...^',
      '^......................^',
      '^..........ZZ..........^',
      '^^^^^^^^^^^^^^^^^^^^^^^^'
    ],
    encounters: [
      { id:'neiot',       min:13, max:17, w:34 },
      { id:'civettona',   min:13, max:16, w:22 },
      { id:'lupomannaro', min:14, max:18, w:18 },
      { id:'brinassa',    min:16, max:19, w:14 },
      { id:'merlotta',    min:13, max:16, w:12 }
    ],
    items: [
      { x:2,  y:7,  item:'ampolla',    flag:'it_gsb1' },
      { x:21, y:11, item:'panzerotto', flag:'it_gsb2' }
    ],
    fish: [ { id:'anguanella', min:13, max:16, w:100 } ]
  },
  /* ---------- AOSTA · grotta del gelo (X = Barry, il San Bernardo) ---------- */
  gelo: {
    t2i: { '.':13, '#':14, 'W':5, 'G':3, 'X':5, 'E':12 },
    tiles: [
      '################',
      '#..............#',
      '#.GGG......GGG.#',
      '#.GGG......GGG.#',
      '#......XX......#',
      '#..............#',
      '#..............#',
      '#...WWWWWWWW...#',
      '#...WWWWWWWW...#',
      '#..............#',
      '#..............#',
      '#......EE......#',
      '#..............#',
      '################'
    ],
    encounters: [
      { id:'neiot',       min:15, max:19, w:34 },
      { id:'brinassa',    min:17, max:20, w:24 },
      { id:'lupomannaro', min:16, max:19, w:22 },
      { id:'civettona',   min:15, max:18, w:20 }
    ],
    items: [ { x:12, y:1, item:'ampolla', flag:'it_gel1' } ]
  },
  /* ---------- REGIONE 4 · LIGURIA (Genova) ---------- */
  genova: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, '#':7, 'Y':10, 'H':18, 'V':12, 'R':12, 'B':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T............VV............T',
      'T..####...####.....####....T',
      'T..#Y##...####.....#H##....T',
      'T..........................T',
      'T..........................T',
      'T....GGGG.........GGGG.....T',
      'T....GGGG.........GGGG.....T',
      'T..........................T',
      'T........B................RT',
      'T.........................RT',
      'T..........................T',
      'T..........................T',
      'TWWWWWWWWWWWWWWWWWWWWWWWWWWT',
      'TWWWWWWWWWWWW..WWWWWWWWWWWWT',
      'TWWWWWWWWWWWW..WWWWWWWWWWWWT',
      'TWWWWWWWWWWWWWWWWWWWWWWWWWWT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: null,
    fish: [ { id:'anguanella', min:17, max:20, w:60 }, { id:'borda', min:18, max:21, w:40 } ]
  },
  gymge: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  ambge: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  scogliera: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'T.........UU...........T',
      'T............WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T........TT..WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T........TT..WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T.........ZZ.WWWWWWWWW.T',
      'TTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'ratapignata', min:17, max:20, w:28 },
      { id:'merlotta',    min:17, max:20, w:22 },
      { id:'civettona',   min:18, max:21, w:18 },
      { id:'anguanella',  min:17, max:20, w:18 },
      { id:'borda',       min:19, max:22, w:14 }
    ],
    items: [
      { x:2, y:5,  item:'ampolla',    flag:'it_sco1' },
      { x:2, y:12, item:'panzerotto', flag:'it_sco2' }
    ],
    fish: [ { id:'anguanella', min:18, max:21, w:60 }, { id:'borda', min:19, max:22, w:40 } ]
  },
  lanterna: {
    t2i: { '.':13, '#':14, 'W':5, 'G':3, 'X':14, 'E':12 },
    tiles: [
      '################',
      '#..............#',
      '#......XX......#',
      '#..............#',
      '#.GGG....GGG...#',
      '#.GGG....GGG...#',
      '#..............#',
      '#..WW......WW..#',
      '#..WW......WW..#',
      '#..............#',
      '#..............#',
      '#......EE......#',
      '#..............#',
      '################'
    ],
    encounters: [
      { id:'ratapignata', min:20, max:23, w:34 },
      { id:'civettona',   min:20, max:23, w:26 },
      { id:'borda',       min:21, max:24, w:20 }
    ],
    items: [ { x:12, y:1, item:'ampolla', flag:'it_lan1' } ]
  },
  /* ---------- PERCORSI TRA LE REGIONI (U = regione precedente, Z = successiva) ---------- */
  stradapo: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T..........................T',
      'T..GGGG.............GGGG...T',
      'T..GGGG.............GGGG...T',
      'T..........................T',
      'T.........TT.....WWW.WW....T',
      'T................WWW.WW....T',
      'T................WWW.WW....T',
      'T..........................T',
      'TU........................ZT',
      'T...GGGG...................T',
      'T...GGGG...................T',
      'T...............TT.........T',
      'T..........................T',
      'T..WWWWW..GGGGGG...........T',
      'T..WWWWW..GGGGGG...........T',
      'T..WWWWW...................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'merlotta',  min:8, max:11, w:30 },
      { id:'mazapegul', min:8, max:11, w:26 },
      { id:'servanot',  min:9, max:12, w:24 },
      { id:'bisso',     min:9, max:12, w:20 }
    ]
  },
  valico: {
    t2i: { '.':19, 'G':3, 'T':4, '^':20, 'U':12, 'Z':12 },
    tiles: [
      '^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
      '^..........................^',
      '^..........................^',
      '^..GGGG....................^',
      '^..GGGG....................^',
      '^.......^^.................^',
      '^.....................^^...^',
      '^..........................^',
      '^.........GGGGG............^',
      '^.........GGGGG............^',
      '^U........................Z^',
      '^..........................^',
      '^.................^^.......^',
      '^..........................^',
      '^.....^....................^',
      '^...................GGGG...^',
      '^...................GGGG...^',
      '^..........................^',
      '^..........................^',
      '^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
    ],
    encounters: [
      { id:'masca',       min:12, max:15, w:28 },
      { id:'servanot',    min:12, max:15, w:24 },
      { id:'neiot',       min:13, max:16, w:26 },
      { id:'lupomannaro', min:13, max:16, w:22 }
    ]
  },
  appennino: {
    t2i: { '.':2, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T..........................T',
      'T..GGGG....................T',
      'T..GGGG...........GGGG.....T',
      'T..........TT.....GGGG.....T',
      'T.......TT.................T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'TU........................ZT',
      'T..............TT..........T',
      'T....................WWWWW.T',
      'T....................WWWWW.T',
      'T........GGGGG.......WWWWW.T',
      'T........GGGGG.......WWWWW.T',
      'T....................WWWWW.T',
      'T....................WWWWW.T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'lupomannaro', min:16, max:19, w:28 },
      { id:'civettona',   min:16, max:19, w:24 },
      { id:'borda',       min:17, max:20, w:26 },
      { id:'ratapignata', min:17, max:20, w:22 }
    ]
  },
  /* ---------- REGIONE 5 · TRENTINO-ALTO ADIGE (Bolzano) ---------- */
  bolzano: {
    t2i: { '.':19, 'G':3, 'T':4, 'W':5, '#':7, '^':20, 'Y':10, 'H':18, 'V':12, 'D':12, 'B':12 },
    tiles: [
      '^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
      '^............VV............^',
      '^..####............####....^',
      '^..#Y##............#H##....^',
      '^..........................^',
      '^..........................^',
      '^....GGGG.........GGGG.....^',
      '^....GGGG.........GGGG.....^',
      '^..........................^',
      '^.........................D^',
      '^.........................D^',
      '^..........................^',
      '^WWWWWWWWWWW...............^',
      '^WWWWWWWWWWW...............^',
      '^WWWWWWWWWWW...............^',
      '^..........................^',
      '^............BB............^',
      '^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
    ],
    encounters: null,
    fish: [ { id:'anguanella', min:22, max:25, w:60 }, { id:'borda', min:23, max:26, w:40 } ]
  },
  gymtr: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  ambtr: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  dolomiti: {
    t2i: { '.':19, 'G':3, '^':20, 'U':12, 'Z':12 },
    tiles: [
      '^^^^^^^^^^^^^^^^^^^^^^^^',
      '^.........UU...........^',
      '^......................^',
      '^...GGGG...............^',
      '^...GGGG.......^^......^',
      '^......................^',
      '^........^^............^',
      '^......................^',
      '^...GGGG...............^',
      '^...GGGG...............^',
      '^......................^',
      '^........^^............^',
      '^......................^',
      '^...GGGG...............^',
      '^...GGGG.......^^......^',
      '^......................^',
      '^.........ZZ...........^',
      '^^^^^^^^^^^^^^^^^^^^^^^^'
    ],
    encounters: [
      { id:'croder',      min:24, max:27, w:30 },
      { id:'neiot',       min:24, max:27, w:24 },
      { id:'civettona',   min:24, max:27, w:20 },
      { id:'brinassa',    min:26, max:28, w:14 },
      { id:'lupomannaro', min:25, max:28, w:12 }
    ],
    items: [ { x:2, y:8, item:'ampolla', flag:'it_dol1' } ]
  },
  rosengarten: {
    t2i: { '.':13, '#':14, 'G':3, '^':20, 'X':20, 'E':12 },
    tiles: [
      '################',
      '#..............#',
      '#..............#',
      '#......XX......#',
      '#..............#',
      '#....^....^....#',
      '#..............#',
      '#.GGG......GGG.#',
      '#.GGG......GGG.#',
      '#..............#',
      '#..............#',
      '#......EE......#',
      '#..............#',
      '################'
    ],
    encounters: [
      { id:'croder', min:26, max:29, w:34 },
      { id:'crodon', min:28, max:30, w:16 },
      { id:'brinassa', min:27, max:30, w:24 }
    ],
    items: [ { x:12, y:1, item:'pizza', flag:'it_ros1' } ]
  },
  valdadige: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T..........................T',
      'T..GGGG....................T',
      'T..GGGG....................T',
      'T...............WWWW.......T',
      'T...............WWWW.......T',
      'T...............WWWW.......T',
      'T.........GGGGG............T',
      'T.........GGGGG............T',
      'TU........................ZT',
      'T.....................TT...T',
      'T........TT................T',
      'T..........................T',
      'T..........................T',
      'T..WWWW.............GGGG...T',
      'T..WWWW.............GGGG...T',
      'T..WWWW....................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'civettona',   min:20, max:23, w:28 },
      { id:'lupomannaro', min:20, max:23, w:24 },
      { id:'borda',       min:21, max:24, w:22 },
      { id:'ratapignata', min:21, max:24, w:18 },
      { id:'croder',      min:22, max:24, w:14 }
    ]
  },
  /* ---------- REGIONE 6 · VENETO (Venezia, capopalestra Bepi — Acqua) ---------- */
  venezia: {
    t2i: { '.':0, 'W':5, 'G':3, 'T':4, '#':7, 'Y':10, 'H':18, 'R':12, 'V':12, 'I':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T............VV............T',
      'T..####...####.....####....T',
      'T..#Y##...####.....#H##....T',
      'T..........................T',
      'T..........................T',
      'T.WWWWWWWWWWWWWWWWWWWWWWWW.T',
      'T.W......................W.T',
      'T.W....GGGG.....GGGG.....W.T',
      'T.W....GGGG.....GGGG.....W.T',
      'T.W......................W.T',
      'T.WWWWWWWWWWWWWWWWWWWWWWWW.T',
      'T..........................T',
      'T.........................RT',
      'T..........................T',
      'T..........................T',
      'T.........................IT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: null,
    fish: [ { id:'anguanella', min:27, max:30, w:60 }, { id:'borda', min:27, max:30, w:40 } ]
  },
  gymve: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  ambve: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  /* ---------- VENEZIA · Laguna (U = Venezia, Z = calle segreta) ---------- */
  laguna: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTT',
      'T.........UU...........T',
      'T............WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T........TT..WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T........TT..WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T...GGGG.....WWWWWWWWW.T',
      'T............WWWWWWWWW.T',
      'T.........ZZ.WWWWWWWWW.T',
      'TTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'mazariol',    min:28, max:31, w:28 },
      { id:'anguanella',  min:27, max:30, w:24 },
      { id:'borda',       min:28, max:31, w:20 },
      { id:'ratapignata', min:28, max:31, w:16 },
      { id:'civettona',   min:27, max:30, w:12 }
    ],
    items: [
      { x:2, y:5,  item:'ampolla',    flag:'it_lag1' },
      { x:2, y:12, item:'panzerotto', flag:'it_lag2' }
    ],
    fish: [ { id:'anguanella', min:28, max:31, w:60 }, { id:'borda', min:29, max:32, w:40 } ]
  },
  /* ---------- VENEZIA · area segreta — calle (X = Leon de San Marco) ---------- */
  calle: {
    t2i: { '.':13, '#':14, 'W':5, 'G':3, 'X':5, 'E':12 },
    indoor: true,
    tiles: [
      '################',
      '#..............#',
      '#..............#',
      '#.WWWWWWWWWWWW.#',
      '#.WWWWWWWWWWWW.#',
      '#......XX......#',
      '#..............#',
      '#.GGG......GGG.#',
      '#.GGG......GGG.#',
      '#..............#',
      '#..............#',
      '#......EE......#',
      '#..............#',
      '################'
    ],
    encounters: [
      { id:'mazariol',    min:30, max:33, w:30 },
      { id:'anguanella',  min:30, max:33, w:26 },
      { id:'borda',       min:31, max:34, w:20 },
      { id:'ratapignata', min:30, max:33, w:14 }
    ],
    items: [ { x:12, y:1, item:'pizza', flag:'it_cal1' } ]
  },
  /* ---------- TRENTINO → VENETO · percorso lungo il Brenta (U = Bolzano, Z = Venezia) ---------- */
  brenta: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T..........................T',
      'T..GGGG....................T',
      'T..GGGG....................T',
      'T...............WWWW.......T',
      'T...............WWWW.......T',
      'T...............WWWW.......T',
      'T.........GGGGG............T',
      'T.........GGGGG............T',
      'TU........................ZT',
      'T.....................TT...T',
      'T........TT................T',
      'T..........................T',
      'T..........................T',
      'T..WWWW.............GGGG...T',
      'T..WWWW.............GGGG...T',
      'T..WWWW....................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'civettona',   min:25, max:28, w:28 },
      { id:'lupomannaro', min:25, max:28, w:24 },
      { id:'borda',       min:26, max:29, w:22 },
      { id:'ratapignata', min:26, max:29, w:18 },
      { id:'croder',      min:25, max:28, w:14 },
      { id:'mazariol',    min:27, max:29, w:10 }
    ]
  },

  /* ---------- FRIULI-V.G. — Isonzo (route inter-regione), Trieste, Carso, Grotta ---------- */
  isonzo: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'TGGG.TT.....GGGG....TT.GGGGT',
      'T...GGG.....GGG.....GGG....T',
      'T..........................T',
      'T..........................T',
      'T..GG..............GGG.....T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..........................T',
      'TU........................ZT',
      'T..........................T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..GGG...............GGG...T',
      'T..........................T',
      'T..........................T',
      'T..WWWWWWWWWWWWWWWWWWWWWWWWT',
      'T..WWWWWWWWWWWWWWWWWWWWWWWWT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'cjalcjut',   min:30, max:33, w:35 },
      { id:'borda',      min:29, max:32, w:25 },
      { id:'ratapignata',min:30, max:33, w:25 },
      { id:'mazariol',   min:29, max:31, w:15 }
    ],
    items: [
      { x:6,  y:5,  item:'panzerotto', flag:'it_iso1' },
      { x:20, y:13, item:'ampolla',    flag:'it_iso2' }
    ]
  },

  trieste: {
    t2i: { '.':0, 'W':5, 'G':3, 'T':4, '#':7, 'Y':10, 'H':18, 'R':12, 'V':12, 'B':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.#Y..####..####..#H#...##.T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.##..####..####..####..##.T',
      'T.........................RT',
      'T..........................T',
      'TB.........................T',
      'T..........................T',
      'T..........................T',
      'TV.........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: null
  },

  gymts: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },

  ambts: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },

  /* ---------- CARSO (route del Friuli, verso grotta_bora) ---------- */
  carso: {
    t2i: { '.':0, 'G':3, 'T':4, 'M':20, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'TGGG.MM....GGG....MM.GGGGGGT',
      'T....MM....GGG....MM.......T',
      'T....MM.ZG.GGG....MM.......T',
      'T..........................T',
      'T..GG..............GGG.....T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..........................T',
      'TU.........................T',
      'T..........................T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..MM....GGG....MM.........T',
      'T..MM....GGG....MM.........T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'cjalcjut',   min:32, max:35, w:35 },
      { id:'ratapignata',min:32, max:35, w:28 },
      { id:'lupomannaro',min:32, max:35, w:22 },
      { id:'cjalcjutone',min:33, max:36, w:15 }
    ],
    items: [
      { x:22, y:5,  item:'ampolla',    flag:'it_car1' },
      { x:5,  y:15, item:'panzerotto', flag:'it_car2' }
    ]
  },

  /* ---------- GROTTA DELLA BORA (area segreta) ---------- */
  grotta_bora: {
    t2i: { '.':13, '#':14, 'X':5, 'E':12 },
    indoor: true,
    tiles: [
      '################',
      '#..............#',
      '#..............#',
      '#..............#',
      '#.....XX.......#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '######EE########'
    ],
    encounters: null
  },

  /* ========== EMILIA-ROMAGNA (Bologna) — regione 8 ========== */
  /* ---------- FRIULI → EMILIA · percorso della Pianura Padana (U = Trieste, Z = Bologna) ---------- */
  pianurapo: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'TGGG.TT.....GGGG....TT.GGGGT',
      'T...GGG.....GGG.....GGG....T',
      'T..........................T',
      'T..........................T',
      'T..GG..............GGG.....T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..........................T',
      'TU........................ZT',
      'T..........................T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..GGG...............GGG...T',
      'T..........................T',
      'T..........................T',
      'T..WWWWWWWWWWWWWWWWWWWWWWWWT',
      'T..WWWWWWWWWWWWWWWWWWWWWWWWT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'foghin',      min:37, max:40, w:30 },
      { id:'borda',       min:37, max:40, w:24 },
      { id:'civettona',   min:36, max:39, w:20 },
      { id:'ratapignata', min:37, max:40, w:14 },
      { id:'lupomannaro', min:37, max:40, w:12 }
    ],
    items: [
      { x:6,  y:5,  item:'panzerotto', flag:'it_pia1' },
      { x:20, y:13, item:'ampolla',    flag:'it_pia2' }
    ]
  },

  bologna: {
    t2i: { '.':0, 'W':5, 'G':3, 'T':4, '#':7, 'Y':10, 'H':18, 'R':12, 'V':12, 'B':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.#Y..####..####..#H#...##.T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.##..####..####..####..##.T',
      'T.........................RT',
      'T..........................T',
      'TB.........................T',
      'T..........................T',
      'T..........................T',
      'TV.........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: null
  },
  gymbo: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  ambbo: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  /* ---------- VIA EMILIA (route della regione, verso le Due Torri) ---------- */
  viaemilia: {
    t2i: { '.':0, 'G':3, 'T':4, '#':7, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'TGGG.##....GGG....##.GGGGGGT',
      'T....##....GGG....##.......T',
      'T....##.ZG.GGG....##.......T',
      'T..........................T',
      'T..GG..............GGG.....T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..........................T',
      'TU.........................T',
      'T..........................T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..##....GGG....##.........T',
      'T..##....GGG....##.........T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'foghin',      min:36, max:39, w:30 },
      { id:'civettona',   min:35, max:38, w:22 },
      { id:'borda',       min:36, max:39, w:20 },
      { id:'farfarello',  min:36, max:39, w:16 },
      { id:'lupomannaro', min:36, max:39, w:12 }
    ],
    items: [
      { x:5,  y:5,  item:'ampolla',    flag:'it_vem1' },
      { x:22, y:10, item:'panzerotto', flag:'it_vem2' }
    ]
  },
  /* ---------- LE DUE TORRI (area segreta — X = Al Diâl) ---------- */
  torri: {
    t2i: { '.':13, '#':14, 'X':5, 'E':12 },
    indoor: true,
    tiles: [
      '################',
      '#..............#',
      '#..............#',
      '#..............#',
      '#.....XX.......#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '######EE########'
    ],
    encounters: null
  },

  /* ========== TOSCANA (Firenze) — regione 9 ========== */
  /* ---------- EMILIA → TOSCANA · valico appenninico della Futa (U = Bologna, Z = Firenze) ---------- */
  futa: {
    t2i: { '.':0, 'G':3, 'T':4, 'M':20, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TMM..GGG......GGG......MMMMT',
      'TM...GGG......GGG......MMM.T',
      'T....................MM....T',
      'T..GG................MM....T',
      'T..........................T',
      'T..GGG.........GGG.........T',
      'TMM........................T',
      'T..........................T',
      'TU........................ZT',
      'T..........................T',
      'T........MM......MM........T',
      'T..GGG...MM......MM...GGG..T',
      'T........MM......MM........T',
      'T..........................T',
      'T..GGG................GGG..T',
      'TMMM....................MMMT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'strio',       min:41, max:44, w:28 },
      { id:'civettona',   min:40, max:43, w:22 },
      { id:'borda',       min:41, max:44, w:20 },
      { id:'farfarello',  min:41, max:44, w:16 },
      { id:'lupomannaro', min:41, max:44, w:14 }
    ],
    items: [
      { x:5,  y:5,  item:'ampolla',    flag:'it_fut1' },
      { x:22, y:14, item:'panzerotto', flag:'it_fut2' }
    ]
  },

  firenze: {
    t2i: { '.':0, 'W':5, 'G':3, 'T':4, '#':7, 'Y':10, 'H':18, 'R':12, 'V':12, 'B':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.#Y..####..####..#H#...##.T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.##..####..####..####..##.T',
      'T.........................RT',
      'T..........................T',
      'TB.........................T',
      'T..........................T',
      'T..........................T',
      'TV.........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: null
  },
  gymfi: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  ambfi: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  /* ---------- IL CHIANTI (route della regione, verso l'ipogeo etrusco) ---------- */
  chianti: {
    t2i: { '.':0, 'G':3, 'T':4, '#':7, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'TGGG.##....GGG....##.GGGGGGT',
      'T....##....GGG....##.......T',
      'T....##.ZG.GGG....##.......T',
      'T..........................T',
      'T..GG..............GGG.....T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..........................T',
      'TU.........................T',
      'T..........................T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..##....GGG....##.........T',
      'T..##....GGG....##.........T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'strio',       min:40, max:43, w:30 },
      { id:'civettona',   min:39, max:42, w:22 },
      { id:'borda',       min:40, max:43, w:20 },
      { id:'farfarello',  min:40, max:43, w:16 },
      { id:'lupomannaro', min:40, max:43, w:12 }
    ],
    items: [
      { x:5,  y:5,  item:'pizza',      flag:'it_chi1' },
      { x:22, y:10, item:'ampolla',    flag:'it_chi2' }
    ]
  },
  /* ---------- IPOGEO ETRUSCO (area segreta — X = L'Arùspice) ---------- */
  ipogeo: {
    t2i: { '.':13, '#':14, 'X':5, 'E':12 },
    indoor: true,
    tiles: [
      '################',
      '#..............#',
      '#..............#',
      '#..............#',
      '#.....XX.......#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '######EE########'
    ],
    encounters: null
  },

  /* ========== UMBRIA (Perugia) — regione 10 ========== */
  /* ---------- TOSCANA → UMBRIA · sponde del Trasimeno (U = Firenze, Z = Perugia) ---------- */
  trasimeno: {
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'TGGG.TT.....GGGG....TT.GGGGT',
      'T...GGG.....GGG.....GGG....T',
      'T..........................T',
      'T..........................T',
      'T..GG..............GGG.....T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..........................T',
      'TU........................ZT',
      'T..........................T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..GGG...............GGG...T',
      'T..........................T',
      'T..........................T',
      'T..WWWWWWWWWWWWWWWWWWWWWWWWT',
      'T..WWWWWWWWWWWWWWWWWWWWWWWWT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'zollin',      min:44, max:47, w:30 },
      { id:'civettona',   min:43, max:46, w:22 },
      { id:'borda',       min:44, max:47, w:18 },
      { id:'lupomannaro', min:44, max:47, w:16 },
      { id:'farfarello',  min:44, max:47, w:14 }
    ],
    items: [
      { x:6,  y:5,  item:'ampolla',    flag:'it_tra1' },
      { x:20, y:13, item:'pizza',      flag:'it_tra2' }
    ]
  },

  perugia: {
    t2i: { '.':0, 'W':5, 'G':3, 'T':4, '#':7, 'Y':10, 'H':18, 'R':12, 'V':12, 'B':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.#Y..####..####..#H#...##.T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.##..####..####..####..##.T',
      'T.........................RT',
      'T..........................T',
      'TB.........................T',
      'T..........................T',
      'T..........................T',
      'TV.........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: null
  },
  gympg: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  ambpg: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  /* ---------- VALNERINA (route della regione, verso Gubbio) ---------- */
  valnerina: {
    t2i: { '.':0, 'G':3, 'T':4, 'M':20, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'TGGG.MM....GGG....MM.GGGGGGT',
      'T....MM....GGG....MM.......T',
      'T....MM.ZG.GGG....MM.......T',
      'T..........................T',
      'T..GG..............GGG.....T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..........................T',
      'TU.........................T',
      'T..........................T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..MM....GGG....MM.........T',
      'T..MM....GGG....MM.........T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'zollin',      min:45, max:48, w:30 },
      { id:'lupomannaro', min:44, max:47, w:22 },
      { id:'civettona',   min:44, max:47, w:18 },
      { id:'borda',       min:45, max:48, w:16 },
      { id:'farfarello',  min:45, max:48, w:14 }
    ],
    items: [
      { x:5,  y:5,  item:'panzerotto', flag:'it_val1' },
      { x:22, y:10, item:'ampolla',    flag:'it_val2' }
    ]
  },
  /* ---------- GUBBIO (area segreta — X = Lupo di Gubbio) ---------- */
  gubbio: {
    t2i: { '.':13, '#':14, 'X':5, 'E':12 },
    indoor: true,
    tiles: [
      '################',
      '#..............#',
      '#..............#',
      '#..............#',
      '#.....XX.......#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '######EE########'
    ],
    encounters: null
  },

  /* ========== MARCHE (Ancona) — regione 11 ========== */
  /* ---------- UMBRIA → MARCHE · Gola del Furlo (U = Perugia, Z = Ancona) ---------- */
  furlo: {
    t2i: { '.':0, 'G':3, 'T':4, 'M':20, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TMM..GGG......GGG......MMMMT',
      'TM...GGG......GGG......MMM.T',
      'T....................MM....T',
      'T..GG................MM....T',
      'T..........................T',
      'T..GGG.........GGG.........T',
      'TMM........................T',
      'T..........................T',
      'TU........................ZT',
      'T..........................T',
      'T........MM......MM........T',
      'T..GGG...MM......MM...GGG..T',
      'T........MM......MM........T',
      'T..........................T',
      'T..GGG................GGG..T',
      'TMMM....................MMMT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'falchin',     min:47, max:50, w:28 },
      { id:'civettona',   min:46, max:49, w:22 },
      { id:'ratapignata', min:47, max:50, w:18 },
      { id:'borda',       min:47, max:50, w:16 },
      { id:'lupomannaro', min:47, max:50, w:14 }
    ],
    items: [
      { x:5,  y:5,  item:'ampolla',    flag:'it_fur1' },
      { x:22, y:14, item:'panzerotto', flag:'it_fur2' }
    ]
  },

  ancona: {
    t2i: { '.':0, 'W':5, 'G':3, 'T':4, '#':7, 'Y':10, 'H':18, 'R':12, 'V':12, 'B':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.#Y..####..####..#H#...##.T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.##..####..####..####..##.T',
      'T.........................RT',
      'T..........................T',
      'TB.........................T',
      'T..........................T',
      'T..........................T',
      'TV.........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: null
  },
  gyman: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  amban: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  /* ---------- MONTE CONERO (route della regione, verso i Sibillini) ---------- */
  conero: {
    t2i: { '.':0, 'G':3, 'T':4, '#':7, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'TGGG.##....GGG....##.GGGGGGT',
      'T....##....GGG....##.......T',
      'T....##.ZG.GGG....##.......T',
      'T..........................T',
      'T..GG..............GGG.....T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..........................T',
      'TU.........................T',
      'T..........................T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..##....GGG....##.........T',
      'T..##....GGG....##.........T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'falchin',     min:48, max:51, w:30 },
      { id:'civettona',   min:47, max:50, w:20 },
      { id:'ratapignata', min:48, max:51, w:18 },
      { id:'borda',       min:48, max:51, w:16 },
      { id:'lupomannaro', min:48, max:51, w:14 }
    ],
    items: [
      { x:5,  y:5,  item:'pizza',      flag:'it_con1' },
      { x:22, y:10, item:'ampolla',    flag:'it_con2' }
    ]
  },
  /* ---------- MONTI SIBILLINI (area segreta — X = Sibilla) ---------- */
  sibillini: {
    t2i: { '.':13, '#':14, 'X':5, 'E':12 },
    indoor: true,
    tiles: [
      '################',
      '#..............#',
      '#..............#',
      '#..............#',
      '#.....XX.......#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '######EE########'
    ],
    encounters: null
  },

  /* ========== LAZIO (Roma) — regione 12 ========== */
  /* ---------- MARCHE → LAZIO · Via Salaria (U = Ancona, Z = Roma) ---------- */
  salaria: {
    t2i: { '.':0, 'G':3, 'T':4, 'M':20, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TMM..GGG......GGG......MMMMT',
      'TM...GGG......GGG......MMM.T',
      'T....................MM....T',
      'T..GG................MM....T',
      'T..........................T',
      'T..GGG.........GGG.........T',
      'TMM........................T',
      'T..........................T',
      'TU........................ZT',
      'T..........................T',
      'T........MM......MM........T',
      'T..GGG...MM......MM...GGG..T',
      'T........MM......MM........T',
      'T..........................T',
      'T..GGG................GGG..T',
      'TMMM....................MMMT',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'ruderin',     min:50, max:53, w:26 },
      { id:'lupomannaro', min:50, max:53, w:22 },
      { id:'civettona',   min:49, max:52, w:18 },
      { id:'borda',       min:50, max:53, w:18 },
      { id:'farfarello',  min:50, max:53, w:16 }
    ],
    items: [
      { x:5,  y:5,  item:'ampolla',    flag:'it_sal1' },
      { x:22, y:14, item:'pizza',      flag:'it_sal2' }
    ]
  },

  roma: {
    t2i: { '.':0, 'W':5, 'G':3, 'T':4, '#':7, 'Y':10, 'H':18, 'R':12, 'V':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.#Y..####..####..#H#...##.T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'T.##..####..####..####..##.T',
      'T.##..####..####..####..##.T',
      'T.........................RT',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'TV.........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: null
  },
  gymrm: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '############',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#..........#',
      '#####EE#####'
    ],
    encounters: null
  },
  ambrm: {
    t2i: { '.':13, '#':14, 'E':12 },
    indoor: true,
    tiles: [
      '########',
      '#......#',
      '#......#',
      '#......#',
      '###EE###'
    ],
    encounters: null
  },
  /* ---------- VIA APPIA ANTICA (route della regione, verso le catacombe) ---------- */
  appiaantica: {
    t2i: { '.':0, 'G':3, 'T':4, '#':7, 'U':12, 'Z':12 },
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'TGGG.##....GGG....##.GGGGGGT',
      'T....##....GGG....##.......T',
      'T....##.ZG.GGG....##.......T',
      'T..........................T',
      'T..GG..............GGG.....T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..........................T',
      'TU.........................T',
      'T..........................T',
      'TGGGGGGGGGGGGGGGGGGGGGGGGGGT',
      'T..##....GGG....##.........T',
      'T..##....GGG....##.........T',
      'T..........................T',
      'T..........................T',
      'T..........................T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTT'
    ],
    encounters: [
      { id:'ruderin',     min:51, max:54, w:28 },
      { id:'lupomannaro', min:50, max:53, w:20 },
      { id:'civettona',   min:50, max:53, w:18 },
      { id:'borda',       min:51, max:54, w:16 },
      { id:'farfarello',  min:51, max:54, w:16 }
    ],
    items: [
      { x:5,  y:5,  item:'panzerotto', flag:'it_app1' },
      { x:22, y:10, item:'ampolla',    flag:'it_app2' }
    ]
  },
  /* ---------- CATACOMBE ROMANE (area segreta — X = Dracòne) ---------- */
  catacombe: {
    t2i: { '.':13, '#':14, 'X':5, 'E':12 },
    indoor: true,
    tiles: [
      '################',
      '#..............#',
      '#..............#',
      '#..............#',
      '#.....XX.......#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '#..............#',
      '######EE########'
    ],
    encounters: null
  }
};

const SOLID = new Set(['#','T','W','M','K','^','X','A','L']);
const DELTA = { up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] };

/* Transizioni: mappa -> carattere -> destinazione.
   lock(): se ritorna true il passaggio è chiuso e viene mostrato msg.
   heal: cura la squadra · arriveMsg: testo all'arrivo. */
const PORTALS = {
  lab:    { E: { map:'milano', x:5,  y:5,  dir:'down' } },
  milano: { D: { map:'lab',    x:4,  y:6,  dir:'up' },
            P: { map:'parco',  x:11, y:14, dir:'up',
                 lock: () => !G.flags.starter,
                 msg: "Nell'erba alta senza una Leggenda?\nNeanche per sogno, fioeu." },
            Y: { map:'gym',    x:5,  y:9,  dir:'up',
                 lock: () => !G.flags.cosca,
                 msg: ["La palestra è chiusa.\n«Torno subito — C.»",
                       "...si sente puzza di guai dalle\nparti dell'edicola."] },
            H: { map:'ambmi',  x:3,  y:3,  dir:'up' },
            C: { map:'shopmi', x:4,  y:4, dir:'up' },
            N: { map:'navigli', x:11, y:2, dir:'down',
                 arriveMsg: ["I NAVIGLI. Canali, ringhiere e\nbiciclette. Più giù si fa\nselvatico — e si lavora poco pulito."] },
            S: { map:'stradapo', x:2, y:10, dir:'right',
                 lock: () => !G.flags.badge,
                 msg: ["Uscita sud: la statale per il Piemonte.\nUn vigile ti sbarra la strada:",
                       "«Prima la Medaglia Madonnina,\npoi la strada per Torino, bagai.»"],
                 arriveMsg: ["LA STATALE PER TORINO.\nPianura, nebbia e risaie. E gente\npoco pulita lungo la strada."] } },
  parco:  { E: { map:'milano', x:13, y:1,  dir:'down' } },
  gym:    { E: { map:'milano', x:24, y:5,  dir:'down' } },
  torino: { S: { map:'stradapo', x:25, y:10, dir:'left',
                 arriveMsg: ["LA STATALE. Verso Milano, tra\nrisaie e cascine."] },
            Y: { map:'gymto',  x:5,  y:9,  dir:'up' },
            H: { map:'ambto',  x:3,  y:3,  dir:'up' },
            P: { map:'murazzi', x:10, y:2, dir:'down',
                 arriveMsg: ["I MURAZZI DEL PO. Argini, gabbiani\ne un'aria che sa di fiume."] },
            V: { map:'valico', x:2, y:10, dir:'right',
                 lock: () => !G.flags.badge2,
                 msg: ["La strada del valico, verso la\nVALLE D'AOSTA.",
                       "Un casellante ti blocca:\n«Senza la Medaglia della Mole\nnon si sale, giovnot.»"],
                 arriveMsg: ["IL VALICO. Tornanti, la neve che si\navvicina, e ombre in gessato tra\nle rocce."] } },
  gymto:  { E: { map:'torino', x:4,  y:5,  dir:'down' } },
  ambmi:  { E: { map:'milano', x:10, y:16, dir:'down' } },
  ambto:  { E: { map:'torino', x:18, y:9,  dir:'down' } },
  aosta:  { V: { map:'valico', x:25, y:10, dir:'left',
                 arriveMsg: ["IL VALICO. Si scende verso Torino."] },
            Y: { map:'gymao',  x:5,  y:9,  dir:'up' },
            H: { map:'ambao',  x:3,  y:3,  dir:'up' },
            B: { map:'gransanbernardo', x:11, y:2, dir:'down',
                 arriveMsg: ["IL GRAN SAN BERNARDO. Tornanti di\nneve e silenzio. Quassù si respira\npiano."] },
            J: { map:'appennino', x:2, y:10, dir:'right',
                 lock: () => !G.flags.badge3,
                 msg: ["La lunga strada verso la LIGURIA\ne il mare.",
                       "«Senza la Medaglia del Monte Bianco\nlaggiù non hai niente da fare, bagai.»"],
                 arriveMsg: ["VERSO LA LIGURIA. Boschi che\ndigradano, e in fondo il profumo\ndel mare."] } },
  gymao:  { E: { map:'aosta', x:4, y:4,  dir:'down' } },
  ambao:  { E: { map:'aosta', x:4, y:11, dir:'down' } },
  navigli:{ U: { map:'milano',  x:14, y:19, dir:'up' },
            Z: { map:'segreto', x:7,  y:10, dir:'up',
                 arriveMsg: ["Oltre un cancello arrugginito, una\ndarsena dimenticata. L'acqua è\nferma. La nebbia non si alza mai."] } },
  segreto:{ E: { map:'navigli', x:11, y:16, dir:'up' } },
  shopmi: { E: { map:'milano',  x:24, y:16, dir:'down' } },
  murazzi:{ U: { map:'torino',  x:7,  y:19, dir:'up' },
            Z: { map:'sotterranei', x:7, y:10, dir:'up',
                 arriveMsg: ["Una grata cede. Scendi nei SOTTERRANEI\ndi Torino: umido, buio, e qualcosa\nche respira."] } },
  sotterranei:{ E: { map:'murazzi', x:10, y:15, dir:'up' } },
  gransanbernardo:{ U: { map:'aosta', x:4, y:1, dir:'down' },
            Z: { map:'gelo', x:7, y:10, dir:'up',
                 arriveMsg: ["Una fenditura nel ghiacciaio. Dentro,\nla GROTTA DEL GELO. Un freddo che\ntaglia il fiato."] } },
  gelo:{ E: { map:'gransanbernardo', x:11, y:15, dir:'up' } },
  genova:{ V: { map:'appennino', x:25, y:10, dir:'left',
               arriveMsg: ["LA STRADA. Si risale verso i monti."] },
           Y: { map:'gymge', x:5, y:9, dir:'up' },
           H: { map:'ambge', x:3, y:3, dir:'up' },
           R: { map:'scogliera', x:10, y:2, dir:'down',
               arriveMsg: ["LA SCOGLIERA. Onde, gabbiani e\nscogli a picco sul mare."] },
           B: { map:'valdadige', x:2, y:10, dir:'right',
               lock: () => !G.flags.badge4,
               msg: ["La strada per il TRENTINO e le Dolomiti.",
                     "«Senza la Medaglia della Lanterna\nlassù non si va, mussu.»"],
               arriveMsg: ["LA VAL D'ADIGE. Vigneti, meleti e\nle Dolomiti che si alzano in fondo."] } },
  gymge:{ E: { map:'genova', x:4, y:4, dir:'down' } },
  ambge:{ E: { map:'genova', x:20, y:4, dir:'down' } },
  scogliera:{ U: { map:'genova', x:25, y:9, dir:'left' },
              Z: { map:'lanterna', x:7, y:10, dir:'up',
                  arriveMsg: ["LA LANTERNA. Il vecchio faro di\nGenova. In cima, un battito d'ali\nenorme."] } },
  lanterna:{ E: { map:'scogliera', x:10, y:15, dir:'up' } },
  stradapo:{ U: { map:'milano', x:27, y:2,  dir:'down' }, Z: { map:'torino', x:25, y:19, dir:'left' } },
  valico:{   U: { map:'torino', x:14, y:3,  dir:'down' }, Z: { map:'aosta',  x:13, y:15, dir:'up' } },
  appennino:{ U: { map:'aosta', x:4,  y:15, dir:'up' },   Z: { map:'genova', x:14, y:2,  dir:'down' } },
  valdadige:{ U: { map:'genova', x:9, y:10, dir:'down' }, Z: { map:'bolzano', x:13, y:2, dir:'down' } },
  bolzano:{ V: { map:'valdadige', x:25, y:10, dir:'left' },
            D: { map:'dolomiti', x:10, y:2, dir:'down',
                 arriveMsg: ["SENTIERO DELLE DOLOMITI.\nCrode rosa, aria che taglia e\nqualcosa che si muove tra i sassi."] },
            Y: { map:'gymtr', x:5, y:9, dir:'up' },
            H: { map:'ambtr', x:3, y:3, dir:'up' },
            B: { map:'brenta', x:2, y:10, dir:'right',
                 lock: () => !G.flags.badge5,
                 msg: ["La strada verso il VENETO e Venezia.\nUn guardiano ti sbarra la via:",
                       "«Senza la Medaglia del Rosengarten\nnon si scende, Bursch.»"],
                 arriveMsg: ["IL BRENTA. Il fiume scende lento\nverso la laguna. Barene, anguane\ne acque verdi a perdita d'occhio."] } },
  dolomiti:{ U: { map:'bolzano', x:25, y:9, dir:'left' },
             Z: { map:'rosengarten', x:7, y:10, dir:'up',
                  arriveMsg: ["IL ROSENGARTEN. Il roseto pietrificato\ndi Re Laurino. Al tramonto le Dolomiti\nsi tingono di rosso."] } },
  rosengarten:{ E: { map:'dolomiti', x:10, y:15, dir:'up' } },
  gymtr:{ E: { map:'bolzano', x:4, y:4, dir:'down' } },
  ambtr:{ E: { map:'bolzano', x:20, y:4, dir:'down' } },
  venezia:{ V: { map:'brenta', x:25, y:10, dir:'left',
                 arriveMsg: ["IL BRENTA. Si risale verso le\nDolomiti. L'acqua si fa più fredda."] },
            Y: { map:'gymve', x:5, y:9, dir:'up' },
            H: { map:'ambve', x:3, y:3, dir:'up' },
            R: { map:'laguna', x:11, y:2, dir:'down',
                 arriveMsg: ["LA LAGUNA. Acqua, canne e aironi.\nQui il confine tra terra e mare\nnon esiste davvero."] },
            I: { map:'isonzo', x:2, y:9, dir:'right',
                 lock: () => !G.flags.badge6,
                 msg: ["La via verso il FRIULI...", "«Prima devi ottenere\nla Medaglia del Leone.»"],
                 arriveMsg: ["ISONZO. Il vento arriva da est,\nfreddo e diretto. Trieste è vicina."] } },
  gymve:{ E: { map:'venezia', x:4, y:4, dir:'down' } },
  ambve:{ E: { map:'venezia', x:20, y:4, dir:'down' } },
  laguna:{ U: { map:'venezia', x:25, y:13, dir:'left' },
           Z: { map:'calle', x:7, y:10, dir:'up',
                arriveMsg: ["UNA CALLE DIMENTICATA. Il silenzio\nè totale. Solo il ciac dell'acqua\ne qualcosa che veglia nell'ombra."] } },
  calle:{ E: { map:'laguna', x:10, y:15, dir:'up' } },
  brenta:{ U: { map:'bolzano', x:13, y:15, dir:'up' },
           Z: { map:'venezia', x:14, y:2, dir:'down',
                arriveMsg: ["VENEZIA. La Serenissima.\nGondole, palazzi sull'acqua e\nil leone alato che tutto sorveglia."] } },
  isonzo:{ U: { map:'venezia', x:25, y:16, dir:'left' },
           Z: { map:'trieste', x:2, y:14, dir:'right',
                arriveMsg: ["TRIESTE. La città del vento.\nLa BORA soffia tra i vicoli."] } },
  trieste:{ V: { map:'isonzo', x:25, y:9, dir:'left' },
             Y: { map:'gymts', x:5, y:9, dir:'up' },
             H: { map:'ambts', x:3, y:3, dir:'up' },
             R: { map:'carso', x:14, y:9, dir:'right',
                  arriveMsg: ["IL CARSO. Il vento sibila\ntra i sassi. La bora è padrona."] },
             B: { map:'pianurapo', x:2, y:9, dir:'right',
                  lock: () => !G.flags.badge7,
                  msg: ["La strada verso l'EMILIA e Bologna.",
                        "«Senza la Medaglia della Bora\nnon si scende in pianura, mulo.»"],
                  arriveMsg: ["LA PIANURA PADANA. Nebbia bassa,\ncampi a perdita d'occhio e la\nVia Emilia dritta verso sud."] } },
  gymts:{ E: { map:'trieste', x:4, y:4, dir:'down' } },
  ambts:{ E: { map:'trieste', x:20, y:4, dir:'down' } },
  carso:{ U: { map:'trieste', x:25, y:9, dir:'left' },
          Z: { map:'grotta_bora', x:7, y:12, dir:'up',
               arriveMsg: ["GROTTA DEL VENTO. Il buio risuona\ndi un sibilo profondo."] } },
  grotta_bora:{ E: { map:'carso', x:8, y:5, dir:'down' } },
  pianurapo:{ U: { map:'trieste', x:2, y:11, dir:'right' },
              Z: { map:'bologna', x:2, y:14, dir:'right',
                   arriveMsg: ["BOLOGNA LA DOTTA, LA GRASSA, LA ROSSA.\nPortici a perdita d'occhio e le Due\nTorri che pendono nel cielo."] } },
  bologna:{ V: { map:'pianurapo', x:25, y:9, dir:'left',
                 arriveMsg: ["LA PIANURA. Si risale verso nord-est,\nverso il Friuli e il vento."] },
            Y: { map:'gymbo', x:5, y:9, dir:'up' },
            H: { map:'ambbo', x:3, y:3, dir:'up' },
            R: { map:'viaemilia', x:2, y:9, dir:'right',
                 arriveMsg: ["LA VIA EMILIA. La strada romana che\ntaglia dritta la pianura. In fondo,\nle Due Torri."] },
            B: { map:'futa', x:2, y:9, dir:'right',
                 lock: () => !G.flags.badge8,
                 msg: ["Il valico della Futa, verso la TOSCANA.",
                       "«Senza la Medaglia delle Due Torri\nl'Appennino non si passa, ciò.»"],
                 arriveMsg: ["IL PASSO DELLA FUTA. Tornanti tra i\nfaggi dell'Appennino tosco-emiliano.\nDi là, la Toscana."] } },
  gymbo:{ E: { map:'bologna', x:4, y:4, dir:'down' } },
  ambbo:{ E: { map:'bologna', x:20, y:4, dir:'down' } },
  viaemilia:{ U: { map:'bologna', x:25, y:9, dir:'left' },
              Z: { map:'torri', x:7, y:12, dir:'up',
                   arriveMsg: ["LE DUE TORRI. Dentro la Garisenda, una\nscala a chiocciola sale nel buio. In\ncima, qualcosa ride piano."] } },
  torri:{ E: { map:'viaemilia', x:8, y:5, dir:'down' } },
  futa:{ U: { map:'bologna', x:2, y:11, dir:'right' },
         Z: { map:'firenze', x:2, y:14, dir:'right',
              arriveMsg: ["FIRENZE. La culla del Rinascimento.\nIl Duomo, il giglio, e qualcosa di\nmolto più antico sotto i suoi piedi."] } },
  firenze:{ V: { map:'futa', x:25, y:9, dir:'left',
                 arriveMsg: ["IL PASSO DELLA FUTA. Si risale verso\nl'Emilia, tra i faggi dell'Appennino."] },
            Y: { map:'gymfi', x:5, y:9, dir:'up' },
            H: { map:'ambfi', x:3, y:3, dir:'up' },
            R: { map:'chianti', x:2, y:9, dir:'right',
                 arriveMsg: ["LE COLLINE DEL CHIANTI. Filari di viti\na perdita d'occhio, cipressi e vecchie\ntombe etrusche tra gli ulivi."] },
            B: { map:'trasimeno', x:2, y:9, dir:'right',
                 lock: () => !G.flags.badge9,
                 msg: ["La strada verso l'UMBRIA e Perugia,\nlungo il lago Trasimeno.",
                       "«Senza la Medaglia del Giglio di là\nnon si passa, o bischero.»"],
                 arriveMsg: ["IL LAGO TRASIMENO. Acque larghe e\npiatte, isole e canneti. Di là\ncomincia il cuore verde d'Italia."] } },
  gymfi:{ E: { map:'firenze', x:4, y:4, dir:'down' } },
  ambfi:{ E: { map:'firenze', x:20, y:4, dir:'down' } },
  chianti:{ U: { map:'firenze', x:25, y:9, dir:'left' },
            Z: { map:'ipogeo', x:7, y:12, dir:'up',
                 arriveMsg: ["UN IPOGEO ETRUSCO. Scendi nel buio tra\naffreschi sbiaditi di banchetti e\ndemoni. Qualcosa, qui sotto, veglia."] } },
  ipogeo:{ E: { map:'chianti', x:8, y:5, dir:'down' } },
  trasimeno:{ U: { map:'firenze', x:2, y:11, dir:'right' },
              Z: { map:'perugia', x:2, y:14, dir:'right',
                   arriveMsg: ["PERUGIA. Vicoli medievali in salita,\nl'acquedotto, il Grifo di pietra.\nIl cuore verde d'Italia."] } },
  perugia:{ V: { map:'trasimeno', x:25, y:9, dir:'left',
                 arriveMsg: ["IL TRASIMENO. Si torna verso la\nToscana, lungo le sponde del lago."] },
            Y: { map:'gympg', x:5, y:9, dir:'up' },
            H: { map:'ambpg', x:3, y:3, dir:'up' },
            R: { map:'valnerina', x:2, y:9, dir:'right',
                 arriveMsg: ["LA VALNERINA. La valle del Nera tra\nmonti boscosi, eremi e cascate.\nIn fondo, Gubbio."] },
            B: { map:'furlo', x:2, y:9, dir:'right',
                 lock: () => !G.flags.badge10,
                 msg: ["La strada verso le MARCHE e Ancona,\nattraverso la Gola del Furlo.",
                       "«Senza la Medaglia del Grifo di là\nnon si passa, ragazzo.»"],
                 arriveMsg: ["LA GOLA DEL FURLO. Pareti a strapiombo\nsul fiume e una vecchia galleria\nromana. Di là, l'Adriatico."] } },
  gympg:{ E: { map:'perugia', x:4, y:4, dir:'down' } },
  ambpg:{ E: { map:'perugia', x:20, y:4, dir:'down' } },
  valnerina:{ U: { map:'perugia', x:25, y:9, dir:'left' },
              Z: { map:'gubbio', x:7, y:12, dir:'up',
                   arriveMsg: ["I BOSCHI DI GUBBIO. Tra i faggi, una\nradura silenziosa. Qui San Francesco\nincontrò il lupo. Qualcosa si muove."] } },
  gubbio:{ E: { map:'valnerina', x:8, y:5, dir:'down' } },
  furlo:{ U: { map:'perugia', x:2, y:11, dir:'right' },
          Z: { map:'ancona', x:2, y:14, dir:'right',
               arriveMsg: ["ANCONA. Il porto dorico sull'Adriatico,\nil Duomo sul colle, l'odore di mare\ne di brodetto."] } },
  ancona:{ V: { map:'furlo', x:25, y:9, dir:'left',
                arriveMsg: ["LA GOLA DEL FURLO. Si risale verso\nl'Umbria, tra le pareti di roccia."] },
           Y: { map:'gyman', x:5, y:9, dir:'up' },
           H: { map:'amban', x:3, y:3, dir:'up' },
           R: { map:'conero', x:2, y:9, dir:'right',
                arriveMsg: ["IL MONTE CONERO. La montagna a picco\nsul mare, leccete e calette bianche.\nIn alto, i Sibillini."] },
           B: { map:'salaria', x:2, y:9, dir:'right',
                lock: () => !G.flags.badge11,
                msg: ["La Via Salaria, l'antica strada del\nsale verso ROMA.",
                      "«Senza la Medaglia del Conero a Roma\nnon ci arrivi, bardascio.»"],
                arriveMsg: ["LA VIA SALARIA. L'antica strada del\nsale taglia l'Appennino verso la\ncittà eterna."] } },
  gyman:{ E: { map:'ancona', x:4, y:4, dir:'down' } },
  amban:{ E: { map:'ancona', x:20, y:4, dir:'down' } },
  conero:{ U: { map:'ancona', x:25, y:9, dir:'left' },
           Z: { map:'sibillini', x:7, y:12, dir:'up',
                arriveMsg: ["LA GROTTA DELLA SIBILLA. Cunicoli che\nsprofondano nel monte. Una luce fioca\npulsa in fondo, come un respiro."] } },
  sibillini:{ E: { map:'conero', x:8, y:5, dir:'down' } },
  salaria:{ U: { map:'ancona', x:2, y:11, dir:'right' },
            Z: { map:'roma', x:2, y:14, dir:'right',
                 arriveMsg: ["ROMA. La città eterna: Colosseo, Fori,\ncupole. E sotto, catacombe e segreti\nche dormono da millenni."] } },
  roma:{ V: { map:'salaria', x:25, y:9, dir:'left',
              arriveMsg: ["LA VIA SALARIA. Si risale verso le\nMarche e l'Adriatico."] },
         Y: { map:'gymrm', x:5, y:9, dir:'up' },
         H: { map:'ambrm', x:3, y:3, dir:'up' },
         R: { map:'appiaantica', x:2, y:9, dir:'right',
              arriveMsg: ["LA VIA APPIA ANTICA. La regina delle\nstrade: basoli, pini marittimi e\nmausolei. Sotto, le catacombe."] } },
  gymrm:{ E: { map:'roma', x:4, y:4, dir:'down' } },
  ambrm:{ E: { map:'roma', x:20, y:4, dir:'down' } },
  appiaantica:{ U: { map:'roma', x:25, y:9, dir:'left' },
                Z: { map:'catacombe', x:7, y:12, dir:'up',
                     arriveMsg: ["LE CATACOMBE. Scendi tra loculi e\naffreschi paleocristiani. Nel buio,\nin fondo, qualcosa di enorme respira."] } },
  catacombe:{ E: { map:'appiaantica', x:8, y:5, dir:'down' } }
};
