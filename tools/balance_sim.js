/* Simulatore di bilanciamento (diagnostico, headless — non parte del gioco).
   Carica i dati reali (tipi/mosse/creature/regioni) e simula molte battaglie
   squadra-benchmark vs ogni capopalestra a livello di PARITÀ (= asso della palestra),
   così misura se una palestra è giusta, troppo facile o un muro, a prescindere
   dal livello a cui ci arriva il giocatore. Riusa la formula di danno e gli stati
   esattamente come src/battle.js.
   Uso:  node tools/balance_sim.js [N_TRIALS] */
const vm = require('vm'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const ctx = { console, Math, Object, Array, JSON, Set, Map };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['data/types.js','data/moves.js','data/creatures.js','data/regions.js'])
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
vm.runInContext('globalThis.__r={SPECIES,MOVES,TYPE_EFF,typeMult,makeMon,GYMS,CREATURE_ORDER};', ctx);
const { SPECIES, MOVES, typeMult, makeMon, GYMS } = ctx.__r;

const N = parseInt(process.argv[2] || '1500', 10);
const rnd = () => Math.random();
const stageMult = s => s >= 0 ? (2 + s) / 2 : 2 / (2 - s);
function clone(m) { return JSON.parse(JSON.stringify(m)); }
function effSpd(m) { return m.spd * stageMult(m.stages.spd) * (m.status === 'par' ? 0.25 : 1); }
function calcDamage(att, dif, mid) {
  const M = MOVES[mid]; if (!M.pow) return 0;
  const atk = att.atk * stageMult(att.stages.atk);
  const def = Math.max(1, dif.def * stageMult(dif.stages.def));
  const stab = att.types.includes(M.t) ? 1.5 : 1;
  const eff = typeMult(M.t, dif.types);
  const crit = rnd() < 0.0625 ? 1.5 : 1;
  const burn = att.status === 'brn' ? 0.5 : 1;
  return Math.max(1, Math.floor((((2*att.lv/5 + 2) * M.pow * atk/def) / 50 + 2)
    * stab * eff * burn * crit * (0.85 + rnd()*0.15)));
}
function expDmg(att, dif, mid) { // valore atteso (per scelta mossa "intelligente")
  const M = MOVES[mid]; if (!M.pow) return 0;
  const atk = att.atk * stageMult(att.stages.atk), def = Math.max(1, dif.def * stageMult(dif.stages.def));
  const stab = att.types.includes(M.t) ? 1.5 : 1, eff = typeMult(M.t, dif.types);
  return (((2*att.lv/5 + 2) * M.pow * atk/def) / 50 + 2) * stab * eff;
}
// giocatore: sceglie la mossa col massimo danno atteso (status solo se non ha nulla da danno)
function smartMove(att, dif) {
  let best = null, bv = -1;
  for (const mv of att.moves) { if (mv.pp <= 0) continue; const v = expDmg(att, dif, mv.id); if (v > bv) { bv = v; best = mv; } }
  if (best && bv > 0) return best;
  const usable = att.moves.filter(m => m.pp > 0); return usable[0] || att.moves[0];
}
// nemico: come nel gioco, mossa casuale tra quelle con PP
function randMove(att) { const u = att.moves.filter(m => m.pp > 0); return (u.length ? u : att.moves)[Math.floor(rnd()*(u.length||att.moves.length))]; }

function applyStatus(target, fx) {
  if (target.status) return;
  if (fx === 'brn' && target.types.includes('Fuoco')) return;
  if (fx === 'psn' && target.types.includes('Veleno')) return;
  if (!['psn','brn','par','slp'].includes(fx)) return;
  target.status = fx; if (fx === 'slp') target.slp = 2 + Math.floor(rnd()*3);
}
function doMove(att, dif, mv) {
  const M = MOVES[mv.id]; mv.pp--;
  if (M.acc && rnd() > M.acc) return;            // mancato
  if (M.fx && !M.pow) { applyStatus(dif, M.fx); return; }
  dif.hp -= calcDamage(att, dif, mv.id);
  if (M.fx && M.pow && dif.hp > 0 && rnd() < (M.fxp || 0)) applyStatus(dif, M.fx);
}
function canAct(m) {                               // ritorna true se può agire
  if (m.status === 'slp') { if (m.slp > 0) m.slp--; if (m.slp <= 0) { m.status = null; return true; } return false; }
  if (m.status === 'par' && rnd() < 0.25) return false;
  return true;
}
function residual(m) {
  if (m.hp <= 0 || (m.status !== 'psn' && m.status !== 'brn')) return;
  m.hp -= Math.max(1, Math.floor(m.maxhp / (m.status === 'psn' ? 8 : 16)));
}
/* Una battaglia: teamP (giocatore, smart) vs teamE (nemico, random). Ritorna true se vince P. */
function battle(teamP, teamE) {
  teamP = teamP.map(clone); teamE = teamE.map(clone);
  let pi = 0, ei = 0, guard = 0;
  let P = teamP[pi], E = teamE[ei];
  while (guard++ < 400) {
    const pMv = smartMove(P, E), eMv = randMove(E);
    const pf = effSpd(P) >= effSpd(E);
    const order = pf ? [['P'],['E']] : [['E'],['P']];
    for (const [side] of order) {
      if (side === 'P') { if (canAct(P)) doMove(P, E, pMv); }
      else { if (canAct(E)) doMove(E, P, eMv); }
      if (E.hp <= 0) { if (++ei >= teamE.length) return true; E = teamE[ei]; }
      if (P.hp <= 0) { if (++pi >= teamP.length) return false; P = teamP[pi]; }
    }
    residual(P); residual(E);
    if (E.hp <= 0) { if (++ei >= teamE.length) return true; E = teamE[ei]; }
    if (P.hp <= 0) { if (++pi >= teamP.length) return false; P = teamP[pi]; }
  }
  return P.hp >= E.hp; // stallo: vince chi ha più PS (raro)
}

// Due profili di giocatore:
//  FORTE  = 6 evoluzioni finali con copertura (giocatore preparato) → misura il "soffitto"
//  MODESTA= starter finale + comuni deboli (giocatore non ottimizzato) → misura il "pavimento"
const FORTE   = ['gransalvan','tarantasio','anguanaregina','gattorco','ruderone','bissone'];
const MODESTA = ['gransalvan','cinghial','pantafica','gazzot','pantegana','ranot'];
const team = (roster, lv) => roster.map(id => makeMon(id, Math.min(100, Math.max(2, lv))));

const gyms = Object.entries(GYMS).map(([map, g]) => ({ map, ...g }))
  .sort((a, b) => (a.region || 0) - (b.region || 0));

function winrate(pteam, eteam) { let w = 0; for (let i = 0; i < N; i++) if (battle(pteam, eteam)) w++; return 100*w/N; }
function verdict(wr) { return wr < 45 ? 'MURO' : wr < 60 ? 'duro' : wr > 95 ? 'banale' : 'ok'; }

console.log(`Simulatore bilancio — ${N} battaglie/scenario. Gioco competente (mossa migliore).`);
console.log('FORTE = squadra evoluta a livello asso. MODESTA = starter+comuni. Sotto = MODESTA a asso-8.');
console.log('Ideale: FORTE alta, MODESTA impegnata ma fattibile, Sotto bassa (premia preparazione).\n');
console.log('reg palestra        tipo             asso Δlv   FORTE  MODESTA  -8lv');
let prevAce = null;
for (const g of gyms) {
  const ace = Math.max(...g.team.map(t => t[1]));
  const eteam = g.team.map(([id, lv]) => makeMon(id, lv));
  const wF = winrate(team(FORTE, ace), eteam);
  const wM = winrate(team(MODESTA, ace), eteam);
  const wU = winrate(team(MODESTA, ace - 8), eteam);
  const dl = prevAce == null ? 0 : ace - prevAce; prevAce = ace;
  console.log(
    String(g.region).padEnd(3) +
    (g.leader||'').padEnd(15) + ' ' +
    String(g.type||'').padEnd(16) + ' ' +
    String(ace).padStart(3) + ' ' +
    ((dl>=0?'+':'') + dl + (dl>=10?'⚠':'')).padStart(4) + '  ' +
    (wF.toFixed(0)+'%').padStart(5) + '   ' +
    (wM.toFixed(0)+'% '+verdict(wM)).padEnd(9) + ' ' +
    (wU.toFixed(0)+'%').padStart(4));
}
