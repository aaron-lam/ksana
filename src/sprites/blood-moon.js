class BloodMoon {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    const assetsMap = {
      "idle": ASSET_MANAGER.getAsset("./src/assets/blood-moon/idle.png"),
    }
    this.animation = this.instantiateAnimator(assetsMap["idle"]);
  };

  instantiateAnimator(spriteSheet) {
    return new Animator(spriteSheet, 80, 0, 40, 200, 4, 0.2, 160, false, true);
  }

  update() {

  };

  draw(ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE)
  }
}
