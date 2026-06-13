/* Dialoghi (effetto macchina da scrivere) e scelte — overlay DOM sopra il canvas. */
const dlg = document.getElementById('dlg'), dlgText = document.getElementById('dlgText'),
      dlgName = document.getElementById('dlgName');

/* Mantiene la voce evidenziata (.sel) visibile dentro un contenitore scrollabile.
   Usato da liste battaglia, scelte, menù e laptop. */
function scrollSelIntoView(container) {
  if (!container) return;
  const sel = container.querySelector('.opt.sel, .row.sel');
  if (!sel) return;
  const top = sel.offsetTop, bot = top + sel.offsetHeight;
  if (top < container.scrollTop) container.scrollTop = top;
  else if (bot > container.scrollTop + container.clientHeight)
    container.scrollTop = bot - container.clientHeight;
}
let dlgQueue = [], dlgCb = null, typing = false, typeTimer = null, prevMode = 'walk';

function say(lines, cb, speaker) {
  if (typeof lines === 'string') lines = [lines];
  dlgQueue = lines.slice(); dlgCb = cb || null;
  if (G.mode !== 'dialog') prevMode = G.mode;
  G.mode = 'dialog';
  dlg.style.display = 'block';
  if (speaker) { dlgName.textContent = speaker; dlgName.style.display = 'block'; }
  else dlgName.style.display = 'none';
  nextLine();
}
function nextLine() {
  if (!dlgQueue.length) {
    dlg.style.display = 'none'; dlgName.style.display = 'none';
    const cb = dlgCb; dlgCb = null;
    if (G.mode === 'dialog') G.mode = prevMode;
    if (cb) cb();
    return;
  }
  const line = dlgQueue.shift();
  typing = true; dlgText.textContent = '';
  let i = 0;
  clearInterval(typeTimer);
  typeTimer = setInterval(() => {
    dlgText.textContent = line.slice(0, ++i);
    if (i >= line.length) { clearInterval(typeTimer); typing = false; }
  }, 18);
  dlg._line = line;
}
function dlgAdvance() {
  if (typing) { clearInterval(typeTimer); dlgText.textContent = dlg._line; typing = false; }
  else nextLine();
}

/* ---------------- SCELTE ---------------- */
const choiceBox = document.getElementById('choiceBox');
let choiceOpts = [], choiceSel = 0, choiceCb = null;

function ask(opts, cb) {
  choiceOpts = opts; choiceSel = 0; choiceCb = cb;
  if (G.mode !== 'choice') prevMode = (G.mode === 'dialog' ? prevMode : G.mode);
  G.mode = 'choice';
  renderChoice();
  choiceBox.style.display = 'block';
}
function renderChoice() {
  choiceBox.innerHTML = choiceOpts.map((o, i) =>
    `<div class="opt${i === choiceSel ? ' sel' : ''}" data-i="${i}">${o}</div>`).join('');
  choiceBox.querySelectorAll('.opt').forEach(el =>
    el.onclick = () => { choiceSel = +el.dataset.i; pickChoice(); });
  scrollSelIntoView(choiceBox);
}
function pickChoice() {
  choiceBox.style.display = 'none';
  const cb = choiceCb, sel = choiceSel;
  choiceCb = null;
  G.mode = prevMode;
  if (cb) cb(sel);
}
