class Ksana {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.assetsMap = {
      "idle": ASSET_MANAGER.getAsset("./src/assets/ksana/idle.png"),
      "run": ASSET_MANAGER.getAsset("./src/assets/ksana/run.png"),
      "attack": ASSET_MANAGER.getAsset("./src/assets/ksana/attack.png"),
      "death": ASSET_MANAGER.getAsset("./src/assets/ksana/death.png"),
    }
    this.animations = [
      this.instantiateAnimator("idle", 8, 0.1),
      this.instantiateAnimator("run", 6, 0.1),
      this.instantiateAnimator("attack", 8, 0.1, 110, 90),
      this.instantiateAnimator("death", 6, 0.2),
    ];
    this.velocity = this.game.isWin ? 180 : 150;
    this.triggerDistance = 120;
    this.state = 0;
    this.idle = false;
    this.idleCounter = 0.0;
  };

  instantiateAnimator(mode, numOfFrames, frameRate, width = 40, framePadding = 160) {
    return new Animator(this.assetsMap[mode], 80, 0, width, 200, numOfFrames, frameRate, framePadding, false, mode !== "death" && mode !== "attack");
  }

  update() {
    if (this.idle) {
      this.state = 0;
      return;
    }
    if (this.state === 1) {
      if (this.x < PARAMS.BLOCKWIDTH * this.triggerDistance) {
        this.x += this.game.clockTick * this.velocity * PARAMS.SCALE;
      } else {
        if (!this.game.isWin) {
          this.isIdle = true;
          this.idleCounter += this.game.clockTick;
          if (this.idleCounter > 0.2) {
            this.idleCounter = 0.0;
            this.state = 3;
            this.idle = false;
          }
        } else {
          this.state = 2;
        }
      }
    }
  };

  draw(ctx) {
    this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE)
  }
}
