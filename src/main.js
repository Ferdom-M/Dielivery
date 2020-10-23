// JavaScript source code
import VirtualJoystickPlugin from './node_modules/phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';

window.onload = function(){

	var config = {
		type: Phaser.AUTO,
		scale: {
			mode: Phaser.Scale.FIT,
			parent: 'phaser-example',
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: 960,
			height: 540
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
		scene: [Mainmenu, ComoJugar, creditos, prueba],
		antialias: false,
		debug: true
	};
	
	var game = new Phaser.Game(config);
	window.focus();
	
	
}
//prueba();