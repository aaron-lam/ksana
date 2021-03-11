class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.game.isDisplayingReadyText = false;
        this.game.isDisplayingSetText = false;
        this.game.isDisplayingGoText = false;
        this.game.isDisplayingStatusText = false;
        this.game.responseTimer = 0;
        this.game.isWin = false;
        this.isCalledFirstTime = true;
        this.x = 0;
        this.loadAnimationExamples();
    };

    loadAnimationExamples() {
        this.game.entities = [];
        let ksana = new Ksana(this.game, PARAMS.BLOCKWIDTH * 10,  PARAMS.BLOCKWIDTH * 4);
        this.game.addEntity(ksana);
        let enemy = new BloodMoon(this.game, PARAMS.BLOCKWIDTH * 250,  -PARAMS.BLOCKWIDTH);
        this.game.addEntity(enemy);
        this.game.addEntity(this);
    };

    update() {
    }

    drawText(ctx, text, x) {
        ctx.font = PARAMS.BLOCKWIDTH * 10 + 'px "Press Start 2P"';
        ctx.fillStyle = 'White';
        ctx.fillText(text, x, 50 * PARAMS.BLOCKWIDTH);
    }

    resetRound() {
        this.loadAnimationExamples();
        this.isCalledFirstTime = true;
        this.game.isDisplayingReadyText = false;
        this.game.isDisplayingSetText = false;
        this.game.isDisplayingGoText = false;
        this.game.isDisplayingStatusText = false;
        this.game.responseTimer = 0;
    }

    draw(ctx) {
        if (this.game.isDisplayingReadyText) {
            this.drawText(ctx, "Ready...", 110 * PARAMS.BLOCKWIDTH);
        } else if (this.game.isDisplayingSetText) {
            this.drawText(ctx, "Set...", 120 * PARAMS.BLOCKWIDTH);
        } else if (this.game.isDisplayingGoText) {
            this.drawText(ctx, "Go!!", 130 * PARAMS.BLOCKWIDTH);
            this.game.responseTimer += this.game.clockTick;
        } else if (this.game.isDisplayingStatusText) {
            this.game.isWin = this.game.responseTimer <= 0.3;
            const status = this.game.isWin ? "Perfect!" : "Too Slow!";
            if (this.isCalledFirstTime) {
                this.game.entities[0].state = 1;
                this.game.entities[1].state = 1;
                this.isCalledFirstTime = false;
            }
            this.drawText(ctx, status, 110 * PARAMS.BLOCKWIDTH);
        }
    }
}
