// JavaScript source code
import VirtualJoystickPlugin from './node_modules/phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';

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
		plugins: {
			global: [{
				key: 'rexVirtualJoystick',
				plugin: VirtualJoystickPlugin,
				start: true
			},
			// ...
			]
		},
		scene: [Mainmenu, ComoJugar, creditos, LevelSelect, Game, Pausa, Results, Ranking],
		antialias: false,
		pixelart: true,
		failIfMajorPerformanceCaveat: true,
		debug: true
	};

	
	var game = new Phaser.Game(config);
	window.focus();
	
	
}
//prueba();