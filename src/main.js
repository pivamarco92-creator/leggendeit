/* Bootstrap: caricamento asset, configurazione Phaser, input globale. */
class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }
  preload() {
    // Asset incorporati in base64 (data/assets.js) per funzionare anche da file://
    // Per usare PNG esterni serve un server locale (vedi README).
    this.load.spritesheet('tiles',     ASSETS_B64.tileset,   { frameWidth: 16, frameHeight: 16 });
    this.load.image('tilesetImg',      ASSETS_B64.tileset);
    this.load.spritesheet('creatures', ASSETS_B64.creatures, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('chars',     ASSETS_B64.chars,     { frameWidth: 16, frameHeight: 16 });
  }
  create() { this.scene.start('World'); }
}

const config = {
  type: Phaser.AUTO,
  parent: 'gameContainer',
  width: 480, height: 320,
  pixelArt: true,
  backgroundColor: '#101018',
  scene: [BootScene, WorldScene, BattleScene]
};
GAME = new Phaser.Game(config);

/* ---------------- INPUT GLOBALE (tastiera + pad touch) ---------------- */
const KEYMAP = { w:'ArrowUp', s:'ArrowDown', a:'ArrowLeft', d:'ArrowRight',
  W:'ArrowUp', S:'ArrowDown', A:'ArrowLeft', D:'ArrowRight',
  Enter:'z', ' ':'z', Escape:'x' };
function normKey(k) { return KEYMAP[k] || k; }

document.addEventListener('keydown', e => {
  const k = normKey(e.key);
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) e.preventDefault();
  if (e.repeat) { keys[k] = true; return; }
  keys[k] = true;
  if (k === 'z' && onA) onA();
  else if (k === 'x' && onB) onB();
  else if (k.startsWith('Arrow') && onDir) onDir(k.slice(5).toLowerCase());
});
document.addEventListener('keyup', e => { keys[normKey(e.key)] = false; });

document.querySelectorAll('.padBtn').forEach(b => {
  const k = b.dataset.k;
  const press = ev => { ev.preventDefault();
    keys[k] = true;
    if (k === 'z' && onA) onA();
    else if (k === 'x' && onB) onB();
    else if (k.startsWith('Arrow') && onDir) onDir(k.slice(5).toLowerCase());
  };
  b.addEventListener('mousedown', press);
  b.addEventListener('touchstart', press, { passive: false });
  ['mouseup', 'mouseleave', 'touchend'].forEach(t =>
    b.addEventListener(t, () => { keys[k] = false; }));
});

/* ---------------- DISPATCH PER MODE ---------------- */
onA = () => {
  if (G.mode === 'title') titleConfirm();
  else if (G.mode === 'dialog') dlgAdvance();
  else if (G.mode === 'choice') pickChoice();
  else if (G.mode === 'menu') menuA();
  else if (G.mode === 'laptop') laptopA();
  else if (G.mode === 'walk' && WORLD && !WORLD.moving) WORLD.interact();
  else if (G.mode === 'battle') battleA();
};
onB = () => {
  if (G.mode === 'battle') battleB();
  else if (G.mode === 'menu') menuB();
  else if (G.mode === 'laptop') laptopB();
  else if (G.mode === 'walk' && WORLD && !WORLD.moving) openPauseMenu();
};
onDir = d => {
  if (G.mode === 'choice') {
    if (d === 'up')   { choiceSel = (choiceSel + choiceOpts.length - 1) % choiceOpts.length; renderChoice(); }
    if (d === 'down') { choiceSel = (choiceSel + 1) % choiceOpts.length; renderChoice(); }
  } else if (G.mode === 'menu') menuDir(d);
  else if (G.mode === 'laptop') laptopDir(d);
  else if (G.mode === 'battle') battleDir(d);
};
