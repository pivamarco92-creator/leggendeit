/* Stato globale di gioco + helper. */
const G = {
  mode: 'title',           // title | walk | dialog | choice | battle | menu | end
  mapId: 'lab', px: 4, py: 5, dir: 'down',
  party: [],
  box: [],                 // deposito: Leggende oltre la 6a, gestibili dal laptop
  items: { panzerotto:2, pizza:1, ampolla:5 },
  money: 0,                // € guadagnati nelle battaglie, spesi al negozio
  dex: { seen: [], caught: [] },   // id specie viste / catturate
  flags: { starter:false, starterId:null, cosca:false, badge:false, badge2:false, badge3:false,
           coscaChoice:null, torinoIntro:false, archivioDone:false,
           stamboCaught:false, scigheraCaught:false, taurinCaught:false, barryCaught:false,
           badge4:false, grifoneCaught:false, badge5:false, laurinoCaught:false,
           badge6:false, leonCaught:false,
           badge7:false, boraCaught:false,
           badge8:false, aldialCaught:false,
           badge9:false, aruspiceCaught:false,
           badge10:false, lupogubbioCaught:false,
           badge11:false, sibillaCaught:false,
           badge12:false, draconeCaught:false,
           badge13:false, dormienteCaught:false,
           badge14:false, dimenticatoCaught:false,
           badge15:false, partenopeCaught:false,
           badge16:false, solleoneCaught:false,
           badge17:false, calancoCaught:false,
           badge18:false, fataCaught:false,
           badge19:false, colapesceCaught:false,
           badge20:false, pramaCaught:false,
           finaleDone:false,
           mol_p1:false, mol_p2:false, mol_p3:false, molise_open:false,
           piva_n1:false, piva_n2:false, piva_n3:false, piva_done:false,
           licata_med:false, licata_done:false,
           facci_quiz:false, facci_done:false, soci_reward:false },
  morale: 0
};

/* Pokédex minimale: tiene traccia di viste e catture. */
function dexSee(id)   { if (G.dex && !G.dex.seen.includes(id))   G.dex.seen.push(id); }
function dexCatch(id) { if (!G.dex) return;
  if (!G.dex.caught.includes(id)) G.dex.caught.push(id);
  if (!G.dex.seen.includes(id))   G.dex.seen.push(id); }

/* Leggendari: il flag "preso" si attiva SOLO alla cattura (battle.js). Se fuggi
   o vai KO, il leggendario torna disponibile al santuario. */
const LEGENDARY_FLAG = { stambeco:'stamboCaught', scighera:'scigheraCaught',
  taurin:'taurinCaught', barry:'barryCaught', grifone:'grifoneCaught', laurino:'laurinoCaught',
  leon:'leonCaught', bora:'boraCaught', aldial:'aldialCaught', aruspice:'aruspiceCaught',
  lupogubbio:'lupogubbioCaught', sibilla:'sibillaCaught', dracone:'draconeCaught',
  dormiente:'dormienteCaught', dimenticato:'dimenticatoCaught', partenope:'partenopeCaught',
  solleone:'solleoneCaught', calanco:'calancoCaught', fatamorgana:'fataCaught',
  colapesce:'colapesceCaught', prama:'pramaCaught' };
/* Allenatori-rivincita già battuti in QUESTA visita alla mappa (azzerato al cambio mappa). */
const BEATEN_VISIT = new Set();
/* Mappe-percorso: i loro allenatori (Cosca) si ripresentano a ogni visita, sempre più forti. */
const ROUTE_MAPS = ['navigli', 'murazzi', 'gransanbernardo', 'scogliera',
  'stradapo', 'valico', 'appennino', 'dolomiti', 'valdadige', 'brenta', 'isonzo', 'carso',
  'viaemilia', 'pianurapo', 'chianti', 'futa', 'valnerina', 'trasimeno', 'conero', 'furlo',
  'appiaantica', 'salaria', 'gransasso', 'valeria', 'tratturo', 'matese', 'vesuvio', 'sannio', 'murgia', 'tavoliere', 'calanchi', 'bradano', 'aspromonte', 'pollino', 'madonie', 'traghetto', 'barbagia', 'nave'];

/* ---------------- SALVATAGGIO ---------------- */
const SAVE_KEY = 'leggende-italia-save';
function saveGame() {
  try {
    const { mapId, px, py, dir, party, box, items, money, dex, flags, morale } = G;
    localStorage.setItem(SAVE_KEY,
      JSON.stringify({ v:1, mapId, px, py, dir, party, box, items, money, dex, flags, morale }));
  } catch (e) {}
}
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return (s && s.v === 1 && Array.isArray(s.party)) ? s : null;
  } catch (e) { return null; }
}
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }

let WORLD = null;   // istanza WorldScene
let BSCENE = null;  // istanza BattleScene
let GAME = null;    // istanza Phaser.Game

const keys = {};
let onA = null, onB = null, onDir = null;

function activeMon() { return G.party.find(m => m.hp > 0); }
function healParty() {
  for (const m of G.party) {
    m.hp = m.maxhp;
    for (const mv of m.moves) mv.pp = MOVES[mv.id].pp;
    m.stages = { atk:0, def:0, spd:0 };
  }
}
function applyExp(mon, gained, done) {
  if (mon.lv >= MAX_LEVEL) { done(); return; }
  mon.exp += gained;
  const ups = [];
  while (mon.exp >= mon.expNext && mon.lv < MAX_LEVEL) {
    mon.exp -= mon.expNext; mon.lv++;
    mon.expNext = expToNext(mon.lv);
    const st = calcStats(SPECIES[mon.id], mon.lv);
    const dHp = st.maxhp - mon.maxhp;
    Object.assign(mon, { maxhp:st.maxhp, atk:st.atk, def:st.def, spd:st.spd });
    mon.hp = Math.min(mon.maxhp, mon.hp + dHp);
    ups.push(mon.name + ' sale al livello ' + mon.lv + '!');
    // nuove mosse a questo livello
    for (const [l, mv] of SPECIES[mon.id].learnset) {
      if (l !== mon.lv || mon.moves.some(m => m.id === mv)) continue;
      if (mon.moves.length < 4) {
        mon.moves.push({ id: mv, pp: MOVES[mv].pp });
        ups.push(mon.name + ' impara\n' + MOVES[mv].n + '!');
      } else {
        const old = mon.moves.shift();
        mon.moves.push({ id: mv, pp: MOVES[mv].pp });
        ups.push(mon.name + ' dimentica ' + MOVES[old.id].n + '\ne impara ' + MOVES[mv].n + '!');
      }
    }
  }
  // evoluzione
  const sp = SPECIES[mon.id];
  if (sp.evolve && mon.lv >= sp.evolve.lv) {
    const sp2 = SPECIES[sp.evolve.to];
    ups.push('Cosa?! ' + mon.name + ' si sta\nevolvendo...');
    const ratio = Math.max(0.05, mon.hp / mon.maxhp);
    mon.id = sp.evolve.to; mon.name = sp2.n; mon.types = sp2.types;
    const st = calcStats(sp2, mon.lv);
    Object.assign(mon, { maxhp:st.maxhp, atk:st.atk, def:st.def, spd:st.spd });
    mon.hp = Math.min(st.maxhp, Math.max(1, Math.round(st.maxhp * ratio)));
    ups.push('...è diventato ' + sp2.n + '!');
    if (typeof BSCENE !== 'undefined' && BSCENE && typeof B !== 'undefined' && B.pm === mon)
      BSCENE.setPlayer(mon.id, true);
  }
  updateBars();
  if (ups.length) { beep(880, .1); beep(1100, .15); bSay(ups, done); }
  else done();
}

/* Assegna esperienza a più Leggende in sequenza (i messaggi si accodano). */
function awardExp(mons, gained, done) {
  let i = 0;
  const step = () => {
    if (i >= mons.length) { done(); return; }
    applyExp(mons[i++], gained, step);
  };
  step();
}

/* ---------------- AUDIO (chiptune minimale) ---------------- */
let AC = null;
function beep(freq, dur, type) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = type || 'square'; o.frequency.value = freq;
    g.gain.value = 0.04; g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + dur);
    o.connect(g); g.connect(AC.destination);
    o.start(); o.stop(AC.currentTime + dur);
  } catch (e) {}
}
