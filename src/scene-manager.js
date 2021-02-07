class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.loadAnimationExamples();
    };

    loadAnimationExamples() {
        this.game.entities = [];
        let ksana = new Ksana(this.game, PARAMS.BLOCKWIDTH * 10,  PARAMS.BLOCKWIDTH * 4);
        this.game.addEntity(ksana);
        let enemy = new BloodMoon(this.game, PARAMS.BLOCKWIDTH * 250,  -PARAMS.BLOCKWIDTH);
        this.game.addEntity(enemy);
    };
}
