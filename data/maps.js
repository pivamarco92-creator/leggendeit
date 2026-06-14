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
    t2i: { '.':0, 'G':3, 'T':4, 'W':5, '#':7, 'Y':10, 'H':18, 'V':12, 'R':12 },
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
      'T.........................RT',
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
               arriveMsg: ["LA SCOGLIERA. Onde, gabbiani e\nscogli a picco sul mare."] } },
  gymge:{ E: { map:'genova', x:4, y:4, dir:'down' } },
  ambge:{ E: { map:'genova', x:20, y:4, dir:'down' } },
  scogliera:{ U: { map:'genova', x:25, y:9, dir:'left' },
              Z: { map:'lanterna', x:7, y:10, dir:'up',
                  arriveMsg: ["LA LANTERNA. Il vecchio faro di\nGenova. In cima, un battito d'ali\nenorme."] } },
  lanterna:{ E: { map:'scogliera', x:10, y:15, dir:'up' } },
  stradapo:{ U: { map:'milano', x:27, y:2,  dir:'down' }, Z: { map:'torino', x:25, y:19, dir:'left' } },
  valico:{   U: { map:'torino', x:14, y:3,  dir:'down' }, Z: { map:'aosta',  x:13, y:15, dir:'up' } },
  appennino:{ U: { map:'aosta', x:4,  y:15, dir:'up' },   Z: { map:'genova', x:14, y:2,  dir:'down' } }
};
