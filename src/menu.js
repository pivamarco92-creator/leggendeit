/* Menù di pausa (esplorazione): SQUADRA, BORSA, PROGRESSI, SALVA, CHIUDI.
   Si apre con B/ESC mentre si cammina. Overlay DOM, controllato da G.mode='menu'.
   La squadra si riordina selezionando due Leggende (scambio).  */
const MENU_ITEMS = [
  { key:'party',    label:'SQUADRA' },
  { key:'bag',      label:'BORSA' },
  { key:'map',      label:'MAPPA' },
  { key:'progress', label:'PROGRESSI' },
  { key:'save',     label:'SALVA' },
  { key:'close',    label:'CHIUDI' }
];
const MENU = { view:'root', rootSel:0, sel:0, moveIdx:-1 };

function openPauseMenu() {
  if (G.mode !== 'walk') return;
  G.mode = 'menu';
  MENU.view = 'root'; MENU.rootSel = 0; MENU.sel = 0; MENU.moveIdx = -1;
  $('menuScr').style.display = 'block';
  $('menuPanel').style.display = 'none';
  beep(660, .05);
  menuRenderBox();
}
function closePauseMenu() {
  $('menuScr').style.display = 'none';
  $('menuPanel').style.display = 'none';
  G.mode = 'walk';
  saveGame();
  beep(440, .05);
}

function menuRenderBox() {
  $('menuBox').innerHTML = '<div class="title">MENÙ</div>' +
    MENU_ITEMS.map((it, i) =>
      `<div class="opt${MENU.view === 'root' && i === MENU.rootSel ? ' sel' : ''}">${it.label}</div>`).join('');
}

/* ---- liste ---- */
function menuBagEntries() { return Object.entries(G.items).filter(([k, v]) => v > 0); }

function menuRenderParty() {
  $('menuPanel').style.display = 'block';
  let h = '<h3>SQUADRA</h3>';
  if (!G.party.length) h += '<div class="row">Nessuna Leggenda.</div>';
  G.party.forEach((m, i) => {
    const cls = i === MENU.sel ? ' sel' : (i === MENU.moveIdx ? ' move' : '');
    h += `<div class="row${cls}">${i + 1}. ${m.name}<span class="meta">L${m.lv} · ${m.types.join('/')} · PS ${Math.max(0, m.hp)}/${m.maxhp}</span></div>`;
  });
  h += MENU.moveIdx >= 0
    ? '<div class="hintbar">A: scambia con ' + G.party[MENU.moveIdx].name + ' · B: annulla</div>'
    : '<div class="hintbar">A: prendi per spostare · B: indietro</div>';
  $('menuPanel').innerHTML = h;
  scrollSelIntoView($('menuPanel'));
}
function menuPartyAction() {
  if (!G.party.length) return;
  if (MENU.moveIdx < 0) { MENU.moveIdx = MENU.sel; beep(700, .05); }
  else if (MENU.moveIdx === MENU.sel) { MENU.moveIdx = -1; beep(400, .05); }
  else {
    const t = G.party[MENU.moveIdx];
    G.party[MENU.moveIdx] = G.party[MENU.sel];
    G.party[MENU.sel] = t;
    MENU.moveIdx = -1; beep(880, .06); saveGame();
  }
  menuRenderParty();
}

function menuRenderBag() {
  $('menuPanel').style.display = 'block';
  let h = '<h3>BORSA</h3>';
  const es = menuBagEntries();
  if (!es.length) h += '<div class="row">La borsa è vuota.</div>';
  es.forEach(([k, v], i) => {
    const cls = i === MENU.sel ? ' sel' : '';
    h += `<div class="row${cls}">${ITEMS[k].n} ×${v}<span class="meta">${ITEMS[k].desc}</span></div>`;
  });
  h += '<div class="hintbar">€ in cassa: ' + G.money + ' · B: indietro</div>';
  $('menuPanel').innerHTML = h;
  scrollSelIntoView($('menuPanel'));
}

function menuRenderProgress() {
  $('menuPanel').style.display = 'block';
  const badges = [G.flags.badge, G.flags.badge2, G.flags.badge3].filter(Boolean).length;
  const rep = G.morale >= 4 ? 'Leggenda di quartiere'
            : G.morale >= 2 ? 'Ben vista'
            : G.morale <= -3 ? 'Vicina alla Cosca'
            : G.morale <= -1 ? 'Chiacchierata' : 'Neutrale';
  const tot = (typeof CREATURE_ORDER !== 'undefined') ? CREATURE_ORDER.length : 0;
  const seen = G.dex ? G.dex.seen.length : 0, caught = G.dex ? G.dex.caught.length : 0;
  $('menuPanel').innerHTML = '<h3>PROGRESSI</h3>' +
    '<div class="row">Medaglie<span class="meta">' + badges + ' / 20</span></div>' +
    '<div class="row">Denaro<span class="meta">' + G.money + '€</span></div>' +
    '<div class="row">Reputazione<span class="meta">' + rep + '</span></div>' +
    '<div class="row">Dex catturate<span class="meta">' + caught + ' / ' + tot + '</span></div>' +
    '<div class="row">Dex viste<span class="meta">' + seen + ' / ' + tot + '</span></div>' +
    '<div class="row">Squadra<span class="meta">' + G.party.length + ' / 6</span></div>' +
    '<div class="row">Deposito<span class="meta">' + (G.box ? G.box.length : 0) + '</span></div>' +
    '<div class="hintbar">B: indietro</div>';
}

function menuMsg(text) {
  MENU.view = 'msg';
  $('menuPanel').style.display = 'block';
  $('menuPanel').innerHTML = '<h3>' + text + '</h3><div class="hintbar">Premi A o B per tornare.</div>';
}

function menuRenderMap() {
  $('menuPanel').style.display = 'block';
  const L = (typeof AREA_LABELS !== 'undefined') ? AREA_LABELS : {};
  const SEC = (typeof SECRET_AREAS !== 'undefined') ? SECRET_AREAS : [];
  let h = '<h3>MAPPA · LEGGENDE D\'ITALIA</h3>';
  (typeof WORLD_MAP !== 'undefined' ? WORLD_MAP : []).forEach(r => {
    const earned = G.flags[r.badge];
    const inRegion = r.maps.includes(G.mapId);
    h += '<div class="regttl' + (inRegion ? ' regnow' : '') + '">' + r.city +
         (earned ? ' ✓' : '') +
         ' <span style="color:#888;font-weight:normal">' + r.region + ' · ' + r.type + '</span></div>';
    (r.layout || []).forEach(row => {
      h += '<div class="maprow">';
      row.c.forEach((id, i) => {
        if (i > 0) h += '<span class="sep">' + (row.j || '·') + '</span>';
        const here = id === G.mapId;
        const secret = SEC.includes(id);
        h += '<span class="chip' + (here ? ' here' : '') + (secret ? ' secret' : '') + '">' +
             (L[id] || id) + (secret ? '★' : '') + '</span>';
      });
      h += '</div>';
    });
    h += '<div class="maplink">' + r.link + '</div>';
  });
  h += '<div class="hintbar">riquadro giallo = sei qui · ★ = area segreta · ✓ = medaglia · B: indietro</div>';
  $('menuPanel').innerHTML = h;
}

function menuRenderSection() {
  menuRenderBox();
  if (MENU.view === 'party') menuRenderParty();
  else if (MENU.view === 'bag') menuRenderBag();
  else if (MENU.view === 'map') menuRenderMap();
  else if (MENU.view === 'progress') menuRenderProgress();
}

/* ---- input ---- */
function menuDir(d) {
  if (MENU.view === 'root') {
    if (d === 'up')   MENU.rootSel = (MENU.rootSel + MENU_ITEMS.length - 1) % MENU_ITEMS.length;
    if (d === 'down') MENU.rootSel = (MENU.rootSel + 1) % MENU_ITEMS.length;
    menuRenderBox(); return;
  }
  let n = 0;
  if (MENU.view === 'party') n = G.party.length;
  else if (MENU.view === 'bag') n = menuBagEntries().length;
  else return;
  if (!n) return;
  if (d === 'up')   MENU.sel = (MENU.sel + n - 1) % n;
  if (d === 'down') MENU.sel = (MENU.sel + 1) % n;
  menuRenderSection();
}
function menuA() {
  if (MENU.view === 'root') {
    const key = MENU_ITEMS[MENU.rootSel].key;
    beep(660, .05);
    if (key === 'close') return closePauseMenu();
    if (key === 'save') { saveGame(); beep(880, .08); beep(1100, .1); menuMsg('Partita salvata!'); return; }
    MENU.view = key; MENU.sel = 0; MENU.moveIdx = -1; menuRenderSection(); return;
  }
  if (MENU.view === 'party') { menuPartyAction(); return; }
  menuB();   // bag / progress / msg: A torna al menù
}
function menuB() {
  if (MENU.view === 'root') return closePauseMenu();
  if (MENU.view === 'party' && MENU.moveIdx >= 0) { MENU.moveIdx = -1; menuRenderParty(); return; }
  MENU.view = 'root';
  $('menuPanel').style.display = 'none';
  menuRenderBox();
  beep(440, .05);
}
