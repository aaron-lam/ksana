const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./src/assets/ksana/idle.png");
ASSET_MANAGER.queueDownload("./src/assets/blood-moon/idle.png");

ASSET_MANAGER.downloadAll(function () {
	const gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	canvas = document.getElementById('game');
	context = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;

	gameEngine.init(context);

	sceneManager = new SceneManager(gameEngine);

	gameEngine.start();
});

function getRandomTime(maxMilliseconds) {
  return Math.floor(Math.random() * Math.floor(maxMilliseconds));
}

function displayReadySetGoText() {
	sceneManager.game.isDisplayingReadyText = true;
	setTimeout(() => {
		sceneManager.game.isDisplayingReadyText = false;
		sceneManager.game.isDisplayingSetText = true;
	}, 1000);
	setTimeout(() => {
		sceneManager.game.isDisplayingSetText = false;
	}, 2000);
	const randomMilliseconds = 2100 + getRandomTime(4000);
	setTimeout(() => {
		sceneManager.game.isDisplayingGoText = true;
	}, randomMilliseconds);
}

function startGame(waitInMilliseconds) {
	displayReadySetGoText();
}

function getResponseTime() {
	if (sceneManager.game.isDisplayingGoText) {
		console.log(sceneManager.game.responseTimer);
		sceneManager.game.responseTimer = 0;
	}
}
