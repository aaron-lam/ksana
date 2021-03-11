class BloodMoon {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.assetsMap = {
      "idle": ASSET_MANAGER.getAsset("./src/assets/blood-moon/idle.png"),
      "run": ASSET_MANAGER.getAsset("./src/assets/blood-moon/run.png"),
      "attack": ASSET_MANAGER.getAsset("./src/assets/blood-moon/attack.png"),
      "death": ASSET_MANAGER.getAsset("./src/assets/blood-moon/death.png"),
    }
    this.animations = [
      this.instantiateAnimator("idle", 4, 0.2),
      this.instantiateAnimator("run", 4, 0.1),
      this.instantiateAnimator("attack", 4, 0.2, 110, 96, 0),
      this.instantiateAnimator("death", 7, 0.27, 80, 120, 40),
    ];
    this.velocity = this.game.isWin ? 140 : 180;
    this.triggerDistance = 140;
    this.state = 0;
    this.isIdle = false;
    this.idleCounter = 0;
  };

  instantiateAnimator(mode, numOfFrames, frameRate, width = 40, framePadding = 160, xStart = 80) {
    return new Animator(this.assetsMap[mode], xStart, 0, width, 200, numOfFrames, frameRate, framePadding, true, mode !== "death" && mode !== "attack");
  }

  update() {
    if (this.idle) {
      this.state = 0;
      return;
    }
    if (this.state === 1) {
      if (this.x > PARAMS.BLOCKWIDTH * this.triggerDistance) {
        this.x -= this.game.clockTick * this.velocity * PARAMS.SCALE;
      } else {
        if (this.game.isWin) {
          this.isIdle = true;
          this.idleCounter += this.game.clockTick;
          if (this.idleCounter > 0.2) {
            this.idleCounter = 0.0;
            this.x -= PARAMS.BLOCKWIDTH * 20;
            this.state = 3;
            this.idle = false;
          }
        } else {
          this.x -= PARAMS.BLOCKWIDTH * 40;
          this.state = 2;
        }
      }
    }
  };

  draw(ctx) {
    this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE)
  }
}
