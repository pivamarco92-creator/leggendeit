/* WorldScene — esplorazione: tilemap, movimento a griglia con tween,
   animazioni di camminata, camera, NPC, portali, erba alta. */
const IDLE_FRAME = { down:0, up:2, left:4, right:6 };
const ITEM_FRAME = 16;   // icona "oggetto di cattura" (cella di contenimento) in assets/chars.png

class WorldScene extends Phaser.Scene {
  constructor() { super('World'); }

  create() {
    WORLD = this;
    this.moving = false;
    this.npcSprites = [];
    this.itemSprites = [];
    const mk = (k, fr) => this.anims.create({
      key: k, frames: this.anims.generateFrameNumbers('chars', { frames: fr }),
      frameRate: 8, repeat: -1 });
    mk('walk-down', [0, 1]); mk('walk-up', [2, 3]);
    mk('walk-left', [4, 5]); mk('walk-right', [6, 7]);
    this.player = this.add.sprite(0, 0, 'chars', 0).setDepth(10).setOrigin(0.5, 0.65);
    this.cameras.main.setZoom(2).setRoundPixels(true);
    this.loadMap(G.mapId);
    // animazione acqua
    this.time.addEvent({ delay: 450, loop: true,
      callback: () => { if (this.map) this.map.swapByIndex(5, 6); } });
  }

  loadMap(id) {
    G.mapId = id;
    if (typeof BEATEN_VISIT !== 'undefined') BEATEN_VISIT.clear();   // gli allenatori-rivincita ti risfidano
    const def = MAPS[id];
    if (this.layer) { this.layer.destroy(); this.map.destroy(); }
    this.npcSprites.forEach(s => s.destroy());
    const grid = def.tiles.map(r => [...r].map(ch => def.t2i[ch] ?? def.t2i['.']));
    this.map = this.make.tilemap({ data: grid, tileWidth: 16, tileHeight: 16 });
    const ts = this.map.addTilesetImage('tiles');
    this.layer = this.map.createLayer(0, ts, 0, 0).setDepth(0);
    this.npcSprites = (NPCS[id] || []).filter(n => !(n.gone && G.flags[n.gone])).map(n => {
      const s = this.add.sprite(n.x*16 + 8, n.y*16 + 8, 'chars', n.frame).setDepth(5).setOrigin(0.5, 0.65);
      s.npcRef = n; return s;
    });
    this.itemSprites.forEach(o => o.sprite.destroy());
    this.itemSprites = (def.items || []).filter(it => !G.flags[it.flag]).map(it => ({
      data: it,
      sprite: this.add.sprite(it.x*16 + 8, it.y*16 + 9, 'chars', ITEM_FRAME).setDepth(4).setOrigin(0.5, 0.65)
    }));
    this.player.setPosition(G.px*16 + 8, G.py*16 + 8);
    this.player.setFrame(IDLE_FRAME[G.dir]);
    const cam = this.cameras.main;
cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
cam.startFollow(this.player, true, 0.2, 0.2);
    cam.fadeIn(220, 8, 8, 16);
    this.moving = false;
  }

  tileChar(x, y) {
    const rows = MAPS[G.mapId].tiles;
    if (y < 0 || y >= rows.length || x < 0 || x >= rows[0].length) return '#';
    return rows[y][x];
  }
  npcAt(x, y) { return (NPCS[G.mapId] || []).find(n => n.x === x && n.y === y && !(n.gone && G.flags[n.gone])); }
  repositionNpc(n) {
    const s = this.npcSprites.find(sp => sp.npcRef === n);
    if (s) s.setPosition(n.x*16 + 8, n.y*16 + 8);
  }
  hideNpc(n) {   // rimuove subito lo sprite di un oggetto raccolto (riappare mai: filtrato in loadMap)
    const s = this.npcSprites.find(sp => sp.npcRef === n);
    if (s) { s.destroy(); this.npcSprites = this.npcSprites.filter(sp => sp !== s); }
  }

  update() {
    if (G.mode !== 'walk' || this.moving) return;
    let dir = null;
    if (keys.ArrowUp) dir = 'up';
    else if (keys.ArrowDown) dir = 'down';
    else if (keys.ArrowLeft) dir = 'left';
    else if (keys.ArrowRight) dir = 'right';
    if (!dir) {
      this.player.anims.stop();
      this.player.setFrame(IDLE_FRAME[G.dir]);
      return;
    }
    this.step(dir);
  }

  step(dir) {
    G.dir = dir;
    const [dx, dy] = DELTA[dir];
    const nx = G.px + dx, ny = G.py + dy;
    const ch = this.tileChar(nx, ny);
    if (SOLID.has(ch) || this.npcAt(nx, ny)) {
      this.player.anims.stop();
      this.player.setFrame(IDLE_FRAME[dir]);
      return;
    }
    // Portali — eventuali blocchi narrativi definiti nei dati (lock/msg)
    const portal = (PORTALS[G.mapId] || {})[ch];
    if (portal) {
      if (portal.lock && portal.lock()) { say(portal.msg); return; }
      G.px = portal.x; G.py = portal.y; G.dir = portal.dir;
      this.cameras.main.fadeOut(150, 8, 8, 16);
      this.moving = true;
      this.time.delayedCall(160, () => {
        if (portal.heal) healParty();
        this.loadMap(portal.map);
        saveGame();
        if (portal.arriveMsg) say(portal.arriveMsg);
        else if (typeof onEnterMap === 'function') onEnterMap(portal.map);
      });
      return;
    }
    // Passo con tween
    this.moving = true;
    this.player.anims.play('walk-' + dir, true);
    this.tweens.add({
      targets: this.player,
      x: nx*16 + 8, y: ny*16 + 8,
      duration: 150, ease: 'Linear',
      onComplete: () => {
        G.px = nx; G.py = ny; this.moving = false;
        this.afterStep(ch);
      }
    });
  }

  afterStep(ch) {
    saveGame();
    // raccolta oggetti (sferine sul terreno)
    const io = (this.itemSprites || []).find(o => o.data.x === G.px && o.data.y === G.py);
    if (io) {
      const it = io.data;
      G.flags[it.flag] = true;
      G.items[it.item] = (G.items[it.item] || 0) + 1;
      io.sprite.destroy();
      this.itemSprites = this.itemSprites.filter(o => o !== io);
      beep(880, .08); beep(1100, .12);
      saveGame();
      say('Hai trovato ' + ITEMS[it.item].n + '!');
      return;   // nessun incontro selvatico nello stesso passo
    }
    if (typeof checkTriggers === 'function') checkTriggers();
    if (G.mode !== 'walk') return;
    if (typeof checkTrainerSight === 'function' && checkTrainerSight()) return;
    if (G.mode !== 'walk') return;
    const enc = MAPS[G.mapId].encounters;
    if (enc && ch === 'G' && Math.random() < 0.18) {
      const tot = enc.reduce((s, e) => s + e.w, 0);
      let r = Math.random() * tot, pick = enc[0];
      for (const e of enc) { r -= e.w; if (r <= 0) { pick = e; break; } }
      const lv = pick.min + Math.floor(Math.random() * (pick.max - pick.min + 1));
      G.mode = 'battle';                       // blocca input durante il flash
      this.cameras.main.flash(250, 255, 255, 255);
      this.time.delayedCall(280, () => startBattle(makeMon(pick.id, lv), null));
    }
  }

  interact() {
    const [dx, dy] = DELTA[G.dir];
    const n = this.npcAt(G.px + dx, G.py + dy);
    if (n) {
      if (n.ev && typeof STORY_EVENTS !== 'undefined' && STORY_EVENTS[n.ev]) return STORY_EVENTS[n.ev](n);
      say(n.lines, null, n.name);
      return;
    }
    const ch = this.tileChar(G.px + dx, G.py + dy);
    if (ch === 'K') { if (typeof shop === 'function') shop('EDICOLA DA BRERA'); return; }
    if (ch === 'M') { say(["Il DUOMO di Milano.\nCi hanno messo 600 anni.\nIl tuo viaggio sarà più veloce.\nForse."]); return; }
    if (ch === 'A' && typeof evArchivioCosca === 'function') { evArchivioCosca(); return; }
    if (ch === 'X' && typeof LEGEND_SPOTS !== 'undefined') {
      const fn = LEGEND_SPOTS[G.mapId];
      if (fn) { fn(); return; }
    }
    if (ch === 'L' && typeof openLaptop === 'function') { openLaptop(); return; }
    if (ch === 'W') {
      if (G.items.canna && typeof fish === 'function') { fish(); return; }
      say("Acqua. Senza una canna da pesca\nnon ci fai granché."); return;
    }
  }
}
