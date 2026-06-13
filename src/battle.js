/* Logica di battaglia a turni (menu DOM + animazioni delegate a BattleScene). */
const $ = id => document.getElementById(id);
const B = { on:false, enemy:null, trainer:null, pm:null, phase:'msg',
  menuSel:0, listSel:0, listKind:null, queue:[], qcb:null, lastMoveId:null,
  participants:[], mustSwitch:false };

function hpColor(r) { return r > .5 ? '#30c020' : r > .2 ? '#e8a020' : '#e03030'; }
function updateBars() {
  const e = B.enemy, p = B.pm;
  if (!e || !p) return;
  $('eName').textContent = e.name; $('eLv').textContent = 'L' + e.lv;
  const er = Math.max(0, e.hp / e.maxhp);
  $('eHp').style.width = (er*100) + '%'; $('eHp').style.background = hpColor(er);
  $('pName').textContent = p.name; $('pLv').textContent = 'L' + p.lv;
  const pr = Math.max(0, p.hp / p.maxhp);
  $('pHp').style.width = (pr*100) + '%'; $('pHp').style.background = hpColor(pr);
  $('pHpNum').textContent = Math.max(0, p.hp) + '/' + p.maxhp;
  const xp = (p.lv >= MAX_LEVEL) ? 1 : Math.max(0, Math.min(1, p.exp / p.expNext));
  const xb = $('pExp'); if (xb) xb.style.width = (xp * 100) + '%';
}

function bSay(lines, cb) {
  if (typeof lines === 'string') lines = [lines];
  B.queue.push(...lines); B.qcb = cb || B.qcb;
  if (B.phase !== 'msg') { B.phase = 'msg'; showPanels(); }
  bNext();
}
function bNext() {
  if (B.queue.length) { $('bMsg').textContent = B.queue.shift(); return; }
  const cb = B.qcb; B.qcb = null;
  if (cb) cb(); else openMenu();
}
function showPanels() {
  $('bMenu').style.display = B.phase === 'menu' ? 'grid' : 'none';
  $('bList').style.display = B.phase === 'list'
    ? (B.listKind === 'moves' ? 'grid' : 'block') : 'none';
}

function startBattle(enemyMon, trainer) {
  B.on = true; B.enemy = enemyMon; B.trainer = trainer || null;
  B.pm = activeMon();
  dexSee(enemyMon.id);
  B.queue = []; B.qcb = null; B.lastMoveId = null;
  B.participants = [B.pm]; B.mustSwitch = false;
  G.mode = 'battle';
  GAME.scene.pause('World');
  $('battleUI').style.display = 'block';
  GAME.scene.run('Battle');
  updateBars();
  beep(440, .12); beep(330, .12);
  const intro = trainer
    ? [trainer.name + ' ti sfida!', trainer.name + ' manda in campo\n' + enemyMon.name + '!']
    : ['Un ' + enemyMon.name + ' selvatico!\nLivello ' + enemyMon.lv + '.'];
  bSay([...intro, 'Vai, ' + B.pm.name + '!'], openMenu);
}

function openMenu() {
  B.phase = 'menu'; B.menuSel = 0; showPanels(); renderMenu();
  $('bMsg').textContent = 'Cosa deve fare\n' + B.pm.name + '?';
}
function renderMenu() {
  $('bMenu').querySelectorAll('div').forEach((d, i) =>
    d.classList.toggle('sel', i === B.menuSel));
}

function openList(kind) {
  B.phase = 'list'; B.listKind = kind; B.listSel = 0;
  // preseleziona l'ultima mossa usata (se la creatura in campo la conosce ancora)
  if (kind === 'moves' && B.lastMoveId) {
    const i = B.pm.moves.findIndex(m => m.id === B.lastMoveId);
    if (i >= 0) B.listSel = i;
  }
  showPanels(); renderList();
}
function listEntries() {
  if (B.listKind === 'moves')
    return B.pm.moves.map(m => ({ label: MOVES[m.id].n,
      meta: MOVES[m.id].t + ' PP ' + m.pp + '/' + MOVES[m.id].pp, ref: m }));
  if (B.listKind === 'bag')
    return Object.entries(G.items).filter(([k, v]) => v > 0 && (ITEMS[k].heal || ITEMS[k].ball))
      .map(([k, v]) => ({ label: ITEMS[k].n + ' ×' + v, meta: ITEMS[k].desc, ref: k }));
  if (B.listKind === 'party')
    return G.party.map((m, i) => ({ label: m.name + ' L' + m.lv,
      meta: 'PS ' + Math.max(0, m.hp) + '/' + m.maxhp, ref: i }));
  return [];
}
function renderList() {
  const es = listEntries();
  const box = $('bList');
  if (!es.length) { box.className = ''; box.innerHTML = '<div class="opt sel">— vuoto — (B per tornare)</div>'; return; }
  box.className = (B.listKind === 'moves') ? 'movegrid' : '';   // mosse = griglia 2×2
  box.innerHTML = es.map((e, i) =>
    `<div class="opt${i === B.listSel ? ' sel' : ''}" data-i="${i}">${e.label}<span class="meta">${e.meta}</span></div>`).join('');
  box.querySelectorAll('.opt').forEach(el =>
    el.onclick = () => { B.listSel = +el.dataset.i; listPick(); });
  scrollSelIntoView(box);
}

/* ---- input ---- */
function battleDir(d) {
  if (B.phase === 'menu') {
    if (d === 'up' || d === 'down')    B.menuSel = (B.menuSel + 2) % 4;
    if (d === 'left' || d === 'right') B.menuSel = B.menuSel % 2 ? B.menuSel - 1 : B.menuSel + 1;
    renderMenu();
  } else if (B.phase === 'list') {
    const n = listEntries().length; if (!n) return;
    if (B.listKind === 'moves') {                 // navigazione griglia 2×2 (2 colonne)
      if (d === 'left'  && B.listSel % 2 === 1)               B.listSel--;
      else if (d === 'right' && B.listSel % 2 === 0 && B.listSel + 1 < n) B.listSel++;
      else if (d === 'up'    && B.listSel - 2 >= 0)           B.listSel -= 2;
      else if (d === 'down'  && B.listSel + 2 < n)            B.listSel += 2;
    } else {
      if (d === 'up')   B.listSel = (B.listSel + n - 1) % n;
      if (d === 'down') B.listSel = (B.listSel + 1) % n;
    }
    renderList();
  }
}
function battleA() {
  if (B.phase === 'msg') bNext();
  else if (B.phase === 'menu') menuPick();
  else if (B.phase === 'list') listPick();
}
function battleB() {
  if (B.mustSwitch) return;            // sostituzione obbligata: devi scegliere
  if (B.phase === 'list') openMenu();
}
function menuPick() {
  beep(660, .06);
  if (B.menuSel === 0) openList('moves');
  else if (B.menuSel === 1) openList('bag');
  else if (B.menuSel === 2) openList('party');
  else tryRun();
}
function listPick() {
  const es = listEntries(); if (!es.length) { openMenu(); return; }
  const e = es[B.listSel];
  beep(660, .06);
  if (B.listKind === 'moves') {
    if (e.ref.pp <= 0) { bSay('Non ci sono più PP!', openMenu); return; }
    B.lastMoveId = e.ref.id;        // ricorda per preselezionarla al turno dopo
    playerTurn(e.ref);
  } else if (B.listKind === 'bag') useItem(e.ref);
  else if (B.listKind === 'party') {
    if (B.mustSwitch) forcedSwitch(e.ref);   // dopo un KO: scelta obbligata, niente turno nemico
    else switchMon(e.ref);
  }
}

/* ---- meccanica ---- */
function stageMult(s) { return s >= 0 ? (2 + s) / 2 : 2 / (2 - s); }
function calcDamage(att, dif, mv) {
  const M = MOVES[mv.id];
  if (!M.pow) return { dmg:0, eff:1, crit:false };
  const atk = att.atk * stageMult(att.stages.atk);
  const def = Math.max(1, dif.def * stageMult(dif.stages.def));
  const stab = att.types.includes(M.t) ? 1.5 : 1;
  const eff = typeMult(M.t, dif.types);
  const crit = Math.random() < 0.0625;
  const dmg = Math.floor((((2*att.lv/5 + 2) * M.pow * atk/def) / 50 + 2)
              * stab * eff * (crit ? 1.5 : 1) * (0.85 + Math.random()*0.15));
  return { dmg: Math.max(1, dmg), eff, crit };
}
function fxLines(target, fx, targetIsEnemy) {
  const stat = fx.slice(0, 3);
  const who = targetIsEnemy ? B.enemy.name + ' nemico' : B.pm.name;
  const names = { atk:'Attacco', def:'Difesa', spd:'Velocità' };
  if (target.stages[stat] <= -6) return ['Non può scendere di più!'];
  target.stages[stat]--;
  return [names[stat] + ' di ' + who + '\ndiminuisce!'];
}
function execMove(att, dif, mvRef, attIsPlayer, done) {
  const M = MOVES[mvRef.id];
  mvRef.pp--;
  const who = attIsPlayer ? B.pm.name : B.enemy.name + ' nemico';
  const lines = [who + ' usa ' + M.n + '!'];
  if (M.fx) {
    lines.push(...fxLines(dif, M.fx, attIsPlayer));
    bSay(lines, done);
    return;
  }
  const { dmg, eff, crit } = calcDamage(att, dif, mvRef);
  dif.hp -= dmg;
  if (crit) lines.push('Brutto colpo!');
  if (eff > 1) lines.push('È superefficace!');
  else if (eff < 1) lines.push('Non è molto efficace...');
  beep(eff > 1 ? 200 : 300, .15, 'sawtooth');
  if (BSCENE) BSCENE.hit(attIsPlayer ? 'enemy' : 'player', eff > 1 || crit);
  bSay(lines, () => { updateBars(); done(); });
}
function enemyPickMove() {
  const usable = B.enemy.moves.filter(m => m.pp > 0);
  if (!usable.length) return B.enemy.moves[0];
  return usable[Math.floor(Math.random() * usable.length)];
}

function playerTurn(mvRef) {
  B.phase = 'msg'; showPanels();
  const pFirst = (B.pm.spd * stageMult(B.pm.stages.spd)) >=
                 (B.enemy.spd * stageMult(B.enemy.stages.spd));
  const pAct = done => execMove(B.pm, B.enemy, mvRef, true, done);
  const eAct = done => execMove(B.enemy, B.pm, enemyPickMove(), false, done);
  const seq = pFirst ? [pAct, eAct] : [eAct, pAct];
  seq[0](() => {
    if (checkFaint()) return;
    seq[1](() => { if (!checkFaint()) openMenu(); });
  });
}
function enemyFreeTurn(after) {
  execMove(B.enemy, B.pm, enemyPickMove(), false, () => {
    if (!checkFaint()) after();
  });
}

function checkFaint() {
  if (B.enemy.hp <= 0) { onEnemyFaint(); return true; }
  if (B.pm.hp <= 0) { onPlayerFaint(); return true; }
  return false;
}
function onEnemyFaint() {
  beep(150, .3, 'triangle');
  if (BSCENE) BSCENE.faint('enemy');
  const gained = Math.floor(7 * B.enemy.lv * (B.trainer ? 1.5 : 1));
  const cash = Math.floor(B.enemy.lv * (B.trainer ? 8 : 4));
  G.money += cash;
  // esperienza a TUTTE le Leggende che hanno partecipato e sono ancora vive
  const winners = (B.participants && B.participants.length ? B.participants : [B.pm])
    .filter(m => m && m.hp > 0);
  const expLines = winners.map(m => m.name + ' guadagna\n' + gained + ' Punti Esp.!');
  bSay([B.enemy.name + (B.trainer ? '' : ' selvatico') + ' è KO!',
        ...expLines,
        'Raccogli ' + cash + '€ dalla lotta.'], () => {
    awardExp(winners, gained, () => {
      if (B.trainer && ++B.trainer.idx < B.trainer.team.length) {
        B.enemy = B.trainer.team[B.trainer.idx];
        dexSee(B.enemy.id);
        if (BSCENE) BSCENE.setEnemy(B.enemy.id, true);
        updateBars();
        bSay(B.trainer.name + ' manda in campo\n' + B.enemy.name + '!', openMenu);
      } else endBattle(true);
    });
  });
}
function onPlayerFaint() {
  if (BSCENE) BSCENE.faint('player');
  bSay(B.pm.name + ' è KO!', () => {
    const alive = G.party.filter(m => m.hp > 0);
    if (!alive.length) {
      bSay(['Non hai più Leggende!', 'Hai perso! Tutto nero...'], () => endBattle(false));
      return;
    }
    if (alive.length === 1) { sendIn(alive[0]); return; }   // una sola disponibile: nessuna scelta
    B.mustSwitch = true;
    bSay('Quale Leggenda mandi in campo?', () => openList('party'));
  });
}

function useItem(key) {
  const it = ITEMS[key];
  B.phase = 'msg'; showPanels();
  if (it.ball) {
    if (B.trainer) { bSay('Non puoi! È la Leggenda di un\nallenatore. Roba da matti.', openMenu); return; }
    G.items.ampolla--;
    const r = 1 - B.enemy.hp / B.enemy.maxhp;
    const chance = Math.min(0.95, 0.25 + r * 0.65);
    if (BSCENE) BSCENE.catchAnim();
    bSay(["Hai lanciato un'Ampolla!", 'Il vetro vibra...', '......'], () => {
      if (Math.random() < chance) {
        beep(990, .2);
        const caught = B.enemy;
        dexCatch(caught.id);
        bSay('Preso! ' + caught.name + '\nè stato imbottigliato!', () => {
          if (G.party.length < 6) { G.party.push(caught); endBattle(true, true); }
          else {
            (G.box = G.box || []).push(caught);
            bSay(caught.name + ' va al DEPOSITO:\nla squadra è piena. Lo recuperi al\nlaptop del negozio.', () => endBattle(true, true));
          }
        });
      } else {
        if (BSCENE) BSCENE.catchFail();
        bSay('Accidenti! Si è liberato!', () => enemyFreeTurn(openMenu));
      }
    });
    return;
  }
  if (G.items[key] <= 0) { openMenu(); return; }
  if (B.pm.hp >= B.pm.maxhp) { bSay('Ha già tutti i PS!', openMenu); return; }
  G.items[key]--;
  B.pm.hp = Math.min(B.pm.maxhp, B.pm.hp + it.heal);
  updateBars();
  bSay(B.pm.name + ' recupera PS\ncon ' + it.n + '!', () => enemyFreeTurn(openMenu));
}

function switchMon(idx) {
  const m = G.party[idx];
  B.phase = 'msg'; showPanels();
  if (m === B.pm) { bSay('È già in campo!', openMenu); return; }
  if (m.hp <= 0) { bSay(m.name + ' è KO!\nNon può lottare.', openMenu); return; }
  B.pm = m;
  if (!B.participants.includes(m)) B.participants.push(m);
  if (BSCENE) BSCENE.setPlayer(m.id, true);
  updateBars();
  bSay('Torna! Vai, ' + m.name + '!', () => enemyFreeTurn(openMenu));
}

/* Invia in campo una Leggenda dopo un KO (nessun turno nemico). */
function sendIn(m) {
  B.pm = m;
  if (!B.participants.includes(m)) B.participants.push(m);
  if (BSCENE) BSCENE.setPlayer(m.id, true);
  updateBars();
  bSay('Vai, ' + m.name + '!', openMenu);
}
/* Scelta obbligata dopo un KO: la voce scelta deve essere viva. */
function forcedSwitch(idx) {
  const m = G.party[idx];
  if (m.hp <= 0) { bSay(m.name + ' è KO!\nScegline un altra.', () => openList('party')); return; }
  B.mustSwitch = false;
  B.phase = 'msg'; showPanels();
  sendIn(m);
}

function tryRun() {
  B.phase = 'msg'; showPanels();
  if (B.trainer) { bSay('Non si scappa da una sfida!\nNeanche a Milano.', openMenu); return; }
  if (Math.random() < 0.7) bSay('Fuga riuscita! Filato via come\nun tram in ritardo.', () => endBattle(null));
  else bSay('Non riesci a fuggire!', () => enemyFreeTurn(openMenu));
}

function endBattle(won, caught) {
  const tr = B.trainer;
  $('battleUI').style.display = 'none';
  B.on = false; B.trainer = null;
  for (const m of G.party) m.stages = { atk:0, def:0, spd:0 };
  GAME.scene.stop('Battle');
  GAME.scene.resume('World');
  G.mode = 'walk';
  saveGame();
  if (won === false) { (tr && tr.loseCb) ? tr.loseCb() : whiteout(); return; }
  if (tr && tr.winCb) tr.winCb();
}
