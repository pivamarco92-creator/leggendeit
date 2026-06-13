/* Laptop del DEPOSITO (PC box): sposta Leggende tra SQUADRA e DEPOSITO.
   Si apre dal laptop nel negozio (tile 'L') o dalla voce «Laptop» del negozio.
   Mode G.mode='laptop'. Lista unica scrollabile: prima la squadra, poi il deposito. */
const LAPTOP = { sel: 0, msg: '' };

function openLaptop() {
  G.box = G.box || [];
  G.mode = 'laptop';
  LAPTOP.sel = 0; LAPTOP.msg = '';
  $('boxScr').style.display = 'block';
  beep(620, .05); beep(740, .06);
  renderLaptop();
}
function closeLaptop() {
  $('boxScr').style.display = 'none';
  G.mode = 'walk';
  saveGame();
  beep(440, .05);
}

function laptopCount() { return G.party.length + (G.box ? G.box.length : 0); }
function laptopCurIsParty() { return LAPTOP.sel < G.party.length; }

function laptopRow(m, gi) {
  const sel = gi === LAPTOP.sel ? ' sel' : '';
  return `<div class="row${sel}">${m.name}<span class="meta">L${m.lv} · ${m.types.join('/')} · PS ${Math.max(0, m.hp)}/${m.maxhp}</span></div>`;
}
function renderLaptop() {
  const n = laptopCount();
  if (LAPTOP.sel >= n) LAPTOP.sel = Math.max(0, n - 1);
  let h = '<h3>LAPTOP · DEPOSITO LEGGENDE</h3>';
  h += '<div style="color:#666;margin-top:2px">SQUADRA (' + G.party.length + '/6)</div>';
  G.party.forEach((m, i) => { h += laptopRow(m, i); });
  h += '<div style="color:#666;margin-top:6px">DEPOSITO (' + (G.box ? G.box.length : 0) + ')</div>';
  if (!G.box || !G.box.length) h += '<div class="row">— vuoto —</div>';
  else G.box.forEach((m, i) => { h += laptopRow(m, G.party.length + i); });
  h += '<div class="status">' + (LAPTOP.msg || '&nbsp;') + '</div>';
  h += '<div class="hintbar">↑↓ scegli · A: ' +
       (laptopCurIsParty() ? 'deposita' : 'preleva') + ' · B: esci</div>';
  $('boxPanel').innerHTML = h;
  scrollSelIntoView($('boxPanel'));
}

function laptopDir(d) {
  const n = laptopCount(); if (!n) return;
  if (d === 'up')   LAPTOP.sel = (LAPTOP.sel + n - 1) % n;
  if (d === 'down') LAPTOP.sel = (LAPTOP.sel + 1) % n;
  LAPTOP.msg = '';
  renderLaptop();
}
function laptopA() {
  if (laptopCurIsParty()) {
    if (G.party.length <= 1) { LAPTOP.msg = 'Serve almeno una Leggenda in squadra.'; beep(300, .06); renderLaptop(); return; }
    const m = G.party.splice(LAPTOP.sel, 1)[0];
    (G.box = G.box || []).push(m);
    LAPTOP.msg = m.name + ' depositato.';
    beep(700, .06); saveGame(); renderLaptop();
  } else {
    if (G.party.length >= 6) { LAPTOP.msg = 'Squadra piena (6). Deposita prima.'; beep(300, .06); renderLaptop(); return; }
    const bi = LAPTOP.sel - G.party.length;
    const m = G.box.splice(bi, 1)[0];
    G.party.push(m);
    LAPTOP.msg = m.name + ' aggiunto alla squadra.';
    beep(880, .06); saveGame(); renderLaptop();
  }
}
function laptopB() { closeLaptop(); }

/* Wrapper per NPC/tile. */
function evLaptop() { openLaptop(); }
