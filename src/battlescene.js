/* BattleScene — solo presentazione (sfondo, sprite, animazioni).
   La logica vive in src/battle.js e parla con questa scena via metodi. */
class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  create() {
    BSCENE = this;
    const W = 480, H = 320;
    // sfondo a fasce
    this.add.rectangle(W/2, 70,  W, 140, 0xdfe8c4);
    this.add.rectangle(W/2, 180, W, 80,  0xcfdcb4);
    this.add.rectangle(W/2, 270, W, 100, 0xc2d0a6);
    // pedane
    this.ePlat = this.add.ellipse(356, 152, 168, 42, 0xb2c293);
    this.pPlat = this.add.ellipse(116, 262, 190, 48, 0xb2c293);
    // sprite (entrano in scena con tween)
    this.eSpr = this.add.sprite(620, 112, 'creatures', 0).setScale(3);
    this.pSpr = this.add.sprite(-140, 218, 'creatures', 10).setScale(3.6);
    if (B.enemy) this.setEnemy(B.enemy.id, true);
    if (B.pm)    this.setPlayer(B.pm.id, true);
  }

  setEnemy(id, slide) {
    this.eSpr.setFrame(creatureFrame(id, false)).setAlpha(1).setY(112);
    if (slide) { this.eSpr.setX(620);
      this.tweens.add({ targets: this.eSpr, x: 356, duration: 420, ease: 'Cubic.out' }); }
    else this.eSpr.setX(356);
  }
  setPlayer(id, slide) {
    this.pSpr.setFrame(creatureFrame(id, true)).setAlpha(1).setY(218);
    if (slide) { this.pSpr.setX(-140);
      this.tweens.add({ targets: this.pSpr, x: 116, duration: 420, ease: 'Cubic.out' }); }
    else this.pSpr.setX(116);
  }
  hit(side, strong) {
    const spr = side === 'enemy' ? this.eSpr : this.pSpr;
    spr.setTintFill(0xffffff);
    this.time.delayedCall(90, () => spr.clearTint());
    this.time.delayedCall(180, () => spr.setTintFill(0xffffff));
    this.time.delayedCall(260, () => spr.clearTint());
    this.cameras.main.shake(strong ? 160 : 90, strong ? 0.012 : 0.006);
  }
  faint(side) {
    const spr = side === 'enemy' ? this.eSpr : this.pSpr;
    this.tweens.add({ targets: spr, y: spr.y + 26, alpha: 0, duration: 380, ease: 'Quad.in' });
  }
  catchAnim(done) {
    this.tweens.add({ targets: this.eSpr, scale: 0.2, alpha: 0.3, duration: 350, ease: 'Quad.in',
      onComplete: () => { if (done) done(); } });
  }
  catchFail() {
    this.eSpr.setScale(3).setAlpha(1);
  }
}
