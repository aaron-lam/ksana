const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./src/assets/ksana/idle.png");
ASSET_MANAGER.queueDownload("./src/assets/blood-moon/idle.png");

ASSET_MANAGER.downloadAll(function () {
	const gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;

	gameEngine.init(context);

	new SceneManager(gameEngine);

	gameEngine.start();
});
