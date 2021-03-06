// JavaScript source code

window.onload = function(){

	var config = {
		dom: {
			createContainer: true
		},
		type: Phaser.AUTO,
		scale: {
			mode: Phaser.Scale.FIT,
			parent: 'dielivery',
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: width,
			height: height,
			fullscreenTarget: document.getElementById('dielivery')
		},
		input: {
			gamepad: true
		},
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 1300 },
				debug: false
			}
		},
		scene: [Boot, Preload, Mainmenu, Ajustes, creditos, LevelSelect, Game, ComienzoTutorial, MitadTutorial, Pausa, FinTutorial, Results, Ranking],
		antialias: false,
		pixelart: true,
		failIfMajorPerformanceCaveat: true,
		debug: true
	};
	
	var game = new Phaser.Game(config);
	window.focus();
	
	
}

	
//prueba();