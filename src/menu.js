/* Menù di pausa (esplorazione): SQUADRA, BORSA, PROGRESSI, SALVA, CHIUDI.
   Si apre con B/ESC mentre si cammina. Overlay DOM, controllato da G.mode='menu'.
   La squadra si riordina selezionando due Leggende (scambio).  */
const MENU_ITEMS = [
  { key:'party',    label:'SQUADRA' },
  { key:'bag',      label:'BORSA' },
  { key:'map',      label:'MAPPA' },
  { key:'pivadex',  label:'PIVADEX' },
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
  h += '<div class="hintbar">A: usa (cure/rianima) · € in cassa: ' + G.money + ' · B: indietro</div>';
  $('menuPanel').innerHTML = h;
  scrollSelIntoView($('menuPanel'));
}

/* Scelta del bersaglio quando si usa un oggetto dalla borsa fuori battaglia. */
function menuRenderBagTarget() {
  $('menuPanel').style.display = 'block';
  const it = ITEMS[MENU.bagKey];
  let h = '<h3>' + it.n + ' · su chi?</h3>';
  G.party.forEach((m, i) => {
    const cls = i === MENU.sel ? ' sel' : '';
    h += `<div class="row${cls}">${i + 1}. ${m.name}<span class="meta">L${m.lv} · PS ${Math.max(0, m.hp)}/${m.maxhp}${m.hp <= 0 ? ' · KO' : ''}</span></div>`;
  });
  h += '<div class="hintbar">A: usa · B: indietro</div>';
  $('menuPanel').innerHTML = h;
  scrollSelIntoView($('menuPanel'));
}
function menuUseOnTarget() {
  const key = MENU.bagKey, it = ITEMS[key], m = G.party[MENU.sel];
  if (!it || G.items[key] <= 0) { MENU.view = 'bag'; MENU.sel = 0; menuRenderSection(); return; }
  if (it.revive) {
    if (m.hp > 0) { beep(300, .1); menuMsg(m.name + ' non è KO!'); return; }
    m.hp = Math.max(1, Math.floor(m.maxhp * it.revive));
  } else {
    if (m.hp <= 0) { beep(300, .1); menuMsg(m.name + ' è KO!\nServe un rianimante.'); return; }
    if (m.hp >= m.maxhp) { beep(300, .1); menuMsg(m.name + ' ha già tutti i PS!'); return; }
    m.hp = Math.min(m.maxhp, m.hp + it.heal);
  }
  G.items[key]--;
  beep(880, .08); saveGame();
  menuMsg(it.n + ' usato su ' + m.name + '!');
}

function menuRenderProgress() {
  $('menuPanel').style.display = 'block';
  const badges = Object.keys(G.flags).filter(k => /^badge\d*$/.test(k) && G.flags[k]).length;
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

/* Regioni raggiungibili col viaggio rapido: città già visitate (o palestra battuta). */
function ftRegions() {
  if (typeof WORLD_MAP === 'undefined') return [];
  return WORLD_MAP.filter(r => G.flags[r.badge] ||
    (r.respawn && G.flags['ft_' + r.respawn.map]) || r.maps.includes(G.mapId));
}
function menuRenderMap() {
  $('menuPanel').style.display = 'block';
  const L = (typeof AREA_LABELS !== 'undefined') ? AREA_LABELS : {};
  const SEC = (typeof SECRET_AREAS !== 'undefined') ? SECRET_AREAS : [];
  const FT = ftRegions();
  let h = '<h3>MAPPA · LEGGENDE D\'ITALIA</h3>';
  (typeof WORLD_MAP !== 'undefined' ? WORLD_MAP : []).forEach(r => {
    const earned = G.flags[r.badge];
    const inRegion = r.maps.includes(G.mapId);
    const ftIdx = FT.indexOf(r);
    const selHere = ftIdx >= 0 && ftIdx === MENU.sel;
    h += '<div class="regttl' + (inRegion ? ' regnow' : '') + (selHere ? ' sel' : '') + '">' +
         (selHere ? '▶ ' : '') + r.city +
         (earned ? ' ✓' : '') + (ftIdx >= 0 && !inRegion ? ' ✈' : '') +
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
  h += '<div class="hintbar">✈ = viaggio rapido · ▶ scelta · ↑↓ scorri · A: viaggia · B: indietro</div>';
  $('menuPanel').innerHTML = h;
  scrollSelIntoView($('menuPanel'));
}
/* Teletrasporto al capoluogo di una regione visitata. */
function fastTravel(r) {
  const rp = r.respawn;
  $('menuScr').style.display = 'none'; $('menuPanel').style.display = 'none';
  G.mode = 'walk';
  G.px = rp.x; G.py = rp.y; G.dir = rp.dir;
  WORLD.loadMap(rp.map);
  saveGame();
  beep(659, .08); beep(880, .12);
  say(['Viaggio rapido:\n' + r.city + '!']);
}

/* ---- PIVADEX ---- */
const PIVA_SOURCE = {
  stambeco:'Aosta/Santuario', scighera:'Milano/Darsena', taurin:'Torino/Sotterranei', barry:'Aosta/Grotta', grifone:'Genova/Lanterna',
  salvanello:'Dalla Prof.ssa', tarantasino:'Dalla Prof.ssa', anguanella:'Dalla Prof.ssa / pesca'
};
function pivaWhere(id) {
  if (PIVA_SOURCE[id]) return PIVA_SOURCE[id];
  const z = [];
  for (const [mid, m] of Object.entries(MAPS)) {
    const reg = ((typeof WORLD_MAP !== 'undefined' && WORLD_MAP.find(w => w.maps.includes(mid))) || {}).city || '';
    const lab = (typeof AREA_LABELS !== 'undefined' && AREA_LABELS[mid]) || mid;
    if ((m.encounters || []).some(e => e.id === id)) z.push(reg + '/' + lab);
    if ((m.fish || []).some(e => e.id === id)) z.push(reg + '/' + lab + ' (pesca)');
  }
  if (z.length) return [...new Set(z)].join(', ');
  for (const bs of Object.values(SPECIES)) if (bs.evolve && bs.evolve.to === id) return 'evoluzione';
  return '—';
}
function menuRenderPiva() {
  $('menuPanel').style.display = 'block';
  const dex = G.dex || { seen: [], caught: [] };
  let h = '<h3>PIVADEX ' + dex.caught.length + '/' + CREATURE_ORDER.length + '</h3>';
  CREATURE_ORDER.forEach((id, i) => {
    const sp = SPECIES[id];
    const st = dex.caught.includes(id) ? '●' : dex.seen.includes(id) ? '◦' : '·';
    h += '<div class="row' + (i === MENU.sel ? ' sel' : '') + '">' + st + ' ' + sp.n +
         '<span class="meta">' + sp.types.join('/') + '</span></div>';
    if (i === MENU.sel) {
      const evo = sp.evolve ? '<br>Evolve in ' + SPECIES[sp.evolve.to].n + ' a Lv ' + sp.evolve.lv : '';
      h += '<div class="pivadet">' + sp.dex + '<br>Zona: ' + pivaWhere(id) + evo + '</div>';
    }
  });
  h += '<div class="hintbar">● catturata · ◦ vista · ↑↓ scorri · B: indietro</div>';
  $('menuPanel').innerHTML = h;
  scrollSelIntoView($('menuPanel'));
}

function menuRenderSection() {
  menuRenderBox();
  if (MENU.view === 'party') menuRenderParty();
  else if (MENU.view === 'bag') menuRenderBag();
  else if (MENU.view === 'bagtarget') menuRenderBagTarget();
  else if (MENU.view === 'map') menuRenderMap();
  else if (MENU.view === 'pivadex') menuRenderPiva();
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
  else if (MENU.view === 'bagtarget') n = G.party.length;
  else if (MENU.view === 'pivadex') n = CREATURE_ORDER.length;
  else if (MENU.view === 'map') n = ftRegions().length;
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
  if (MENU.view === 'bag') {
    const es = menuBagEntries();
    if (!es.length) { menuB(); return; }
    const k = es[MENU.sel][0], it = ITEMS[k];
    if (it.heal || it.revive) {
      if (!G.party.length) { menuB(); return; }
      MENU.bagKey = k; MENU.view = 'bagtarget'; MENU.sel = 0; beep(700, .05); menuRenderSection(); return;
    }
    menuB(); return;   // ampolla/canna: non usabili dal menù
  }
  if (MENU.view === 'bagtarget') { menuUseOnTarget(); return; }
  if (MENU.view === 'map') {
    const list = ftRegions();
    if (!list.length) { menuB(); return; }
    const r = list[MENU.sel];
    if (r.maps.includes(G.mapId)) { beep(300, .1); menuMsg('Sei già qui!'); return; }
    beep(880, .06); fastTravel(r); return;
  }
  menuB();   // progress / msg: A torna al menù
}
function menuB() {
  if (MENU.view === 'root') return closePauseMenu();
  if (MENU.view === 'party' && MENU.moveIdx >= 0) { MENU.moveIdx = -1; menuRenderParty(); return; }
  if (MENU.view === 'bagtarget') { MENU.view = 'bag'; MENU.sel = 0; menuRenderSection(); beep(440, .05); return; }
  MENU.view = 'root';
  $('menuPanel').style.display = 'none';
  menuRenderBox();
  beep(440, .05);
}
