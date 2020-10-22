// JavaScript source code

window.onload = function(){
	var config = {
		type: Phaser.AUTO,
		scale: {
			mode: Phaser.Scale.FIT,
			parent: 'phaser-example',
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: 1280,
			height: 720
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
		scene: [Mainmenu, ComoJugar, creditos, prueba],
		antialias: false,
		debug: true
	};
	
	game = new Phaser.Game(config);
	window.focus();
	
	
}
//prueba();