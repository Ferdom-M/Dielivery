function GenerarMundo(that, mapa){
	
	map = that.make.tilemap({ key: mapa });
	// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
	// Phaser's cache (i.e. the name you used in preload)
	const tileset = map.addTilesetImage("spritesheet_tiles", "tiles", 32, 32, 1, 2);
	const fondos = map.addTilesetImage("spritesheet_fondos", "fondos", 32, 32, 1, 2);
	// Parameters: layer name (or index) from Tiled, tileset, x, y
	fondo = map.createStaticLayer("Fondo", [tileset, fondos], 0, 0);
	suelo = map.createStaticLayer("Suelo", tileset, 0, 0);
	objetos = map.createStaticLayer("Objetos", tileset, 0, 0);
	resto = map.createStaticLayer("Resto", tileset, 0, 0);
	iluminacion = map.createStaticLayer("Iluminacion", fondos, 0, 0);	
	iluminacion.depth = 50;

	if(mapa == "tutorial"){
		if(enPc){
			cartelesPc = map.createStaticLayer("CartelesPC", tileset, 0, 0);
		}else{
			cartelesMovil = map.createStaticLayer("CartelesMovil", tileset, 0, 0);
		}
	}
	

	suelo.depth = 3;
	suelo.setCollisionByProperty({ collides: true });
}

function GenerarParticulas(that){
	var vela0 = fondo.findByIndex(4312 + 540);
	that.particulasVela = that.add.particles('llamita')
	
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 2000,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela0.pixelX + tileSize - 2,
		y: vela0.pixelY
	});
	
	var vela1 = fondo.findByIndex(4313 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 1900,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela1.pixelX + 10,
		y: vela1.pixelY + 7
	});
	
	var vela2 = fondo.findByIndex(4314 + 540);
	if(!suelo.getTileAtWorldXY(vela2.pixelX, vela2.pixelY)){
		that.particulasVela.createEmitter({
			speed: 5,
			angle: {min: 180, max: 360},
			lifespan: 10000,
			frequency: 1500,
			maxParticles: 0,
			scale: { start: 1, end: 0 },
			x: vela2.pixelX + 12,
			y: vela2.pixelY
		});
	}
	
	var vela3 = fondo.findByIndex(276 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 2200,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela3.pixelX + tileSize / 2,
		y: vela3.pixelY + tileSize / 2 - 2
	});
	
	var vela4 = fondo.findByIndex(278 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 2000,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela4.pixelX + 5,
		y: vela4.pixelY + tileSize / 2 - 2
	});
	
	var vela5 = fondo.findByIndex(294 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 1800,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela5.pixelX + 6,
		y: vela5.pixelY + tileSize / 2 - 2
	});
	
	var vela6 = fondo.findByIndex(295 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 2300,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela6.pixelX + tileSize - 5,
		y: vela6.pixelY + tileSize / 2 - 2
	});
	
	var vela7 = fondo.findByIndex(2807 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 1700,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela7.pixelX + 10,	
		y: vela7.pixelY + tileSize - 4
	});
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 2100,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela7.pixelX + tileSize - 2,
		y: vela7.pixelY + tileSize / 2 + 2
	});
	
	var vela9 = fondo.findByIndex(2818 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 1800,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela9.pixelX + tileSize - 4,
		y: vela9.pixelY + tileSize - 3
	});
	
	var vela10 = fondo.findByIndex(2820 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 1900,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela10.pixelX + tileSize / 2 - 2,
		y: vela10.pixelY + tileSize / 2 + 2
	});
	
	var vela11 = fondo.findByIndex(5312 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 2000,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela11.pixelX + tileSize - 6,
		y: vela11.pixelY + 10
	});
	
	var vela12 = fondo.findByIndex(5314 + 540);
	that.particulasVela.createEmitter({
		speed: 5,
		angle: {min: 180, max: 360},
		lifespan: 10000,
		frequency: 2200,
		maxParticles: 0,
		scale: { start: 1, end: 0 },
		x: vela12.pixelX + tileSize / 2 - 2,
		y: vela12.pixelY + tileSize / 2 - 5
	});
	
	
	that.particulasLuz = that.add.particles('luz1')
	var luzInvernadero1 = iluminacion.findByIndex(1882 + 540);
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 20000,
		frequency: 4000,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzInvernadero1.pixelX, max: luzInvernadero1.pixelX + tileSize * 14},
		y: {min: luzInvernadero1.pixelY, max: luzInvernadero1.pixelY + tileSize * 7}
	});
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 10000,
		frequency: 2500,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzInvernadero1.pixelX, max: luzInvernadero1.pixelX + tileSize * 14},
		y: {min: luzInvernadero1.pixelY, max: luzInvernadero1.pixelY + tileSize * 7}
	});
	
	var luzInvernadero1 = iluminacion.findByIndex(1870 + 540);
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 22000,
		frequency: 11000,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzInvernadero1.pixelX, max: luzInvernadero1.pixelX + tileSize * 7},
		y: {min: luzInvernadero1.pixelY, max: luzInvernadero1.pixelY + tileSize * 6}
	});
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 12000,
		frequency: 6000,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzInvernadero1.pixelX, max: luzInvernadero1.pixelX + tileSize * 7},
		y: {min: luzInvernadero1.pixelY, max: luzInvernadero1.pixelY + tileSize * 6}
	});
	
	var luzInvernadero1 = iluminacion.findByIndex(1731 + 540);
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 21000,
		frequency: 10500,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzInvernadero1.pixelX, max: luzInvernadero1.pixelX + tileSize * 5},
		y: {min: luzInvernadero1.pixelY, max: luzInvernadero1.pixelY + tileSize * 8}
	});
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 11000,
		frequency: 5500,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzInvernadero1.pixelX, max: luzInvernadero1.pixelX + tileSize * 5},
		y: {min: luzInvernadero1.pixelY, max: luzInvernadero1.pixelY + tileSize * 8}
	});
	
	var luzJoyeria1 = iluminacion.findByIndex(2692 + 540);
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 21000,
		frequency: 10500,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzJoyeria1.pixelX, max: luzJoyeria1.pixelX + tileSize * 2},
		y: {min: luzJoyeria1.pixelY, max: luzJoyeria1.pixelY + tileSize * 9}
	});
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 12000,
		frequency: 6000,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzJoyeria1.pixelX, max: luzJoyeria1.pixelX + tileSize * 2},
		y: {min: luzJoyeria1.pixelY, max: luzJoyeria1.pixelY + tileSize * 9}
	});
	
	var luzJoyeria1 = iluminacion.findByIndex(2706 + 540);
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 22000,
		frequency: 11000,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzJoyeria1.pixelX, max: luzJoyeria1.pixelX + tileSize * 2},
		y: {min: luzJoyeria1.pixelY, max: luzJoyeria1.pixelY + tileSize * 9}
	});
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 11000,
		frequency: 55000,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzJoyeria1.pixelX, max: luzJoyeria1.pixelX + tileSize * 2},
		y: {min: luzJoyeria1.pixelY, max: luzJoyeria1.pixelY + tileSize * 9}
	});
	
	var luzJoyeria1 = iluminacion.findByIndex(2361 + 540);
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 20000,
		frequency: 20000,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzJoyeria1.pixelX, max: luzJoyeria1.pixelX + tileSize * 4},
		y: {min: luzJoyeria1.pixelY, max: luzJoyeria1.pixelY + tileSize * 2}
	});
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 10000,
		frequency: 10000,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzJoyeria1.pixelX, max: luzJoyeria1.pixelX + tileSize * 4},
		y: {min: luzJoyeria1.pixelY, max: luzJoyeria1.pixelY + tileSize * 2}
	});
	
	var luzSotano1 = iluminacion.findByIndex(7100 + 540);
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 20000,
		frequency: 2000,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzSotano1.pixelX, max: luzJoyeria1.pixelX + tileSize * 11},
		y: {min: luzSotano1.pixelY, max: luzJoyeria1.pixelY + tileSize * 37}
	});
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 11000,
		frequency: 1100,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzSotano1.pixelX, max: luzSotano1.pixelX + tileSize * 11},
		y: {min: luzSotano1.pixelY, max: luzSotano1.pixelY + tileSize * 37}
	});
	var luzSotano1 = iluminacion.findByIndex(7119 + 540);
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 22000,
		frequency: 2200,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzSotano1.pixelX, max: luzJoyeria1.pixelX + tileSize * 11},
		y: {min: luzSotano1.pixelY, max: luzJoyeria1.pixelY + tileSize * 37}
	});
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 12000,
		frequency: 1200,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzSotano1.pixelX, max: luzSotano1.pixelX + tileSize * 11},
		y: {min: luzSotano1.pixelY, max: luzSotano1.pixelY + tileSize * 37}
	});
	
	var luzBiblioteca1 = iluminacion.findByIndex(1997 + 540);
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 20000,
		frequency: 2500,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzBiblioteca1.pixelX, max: luzBiblioteca1.pixelX + tileSize * 17},
		y: {min: luzBiblioteca1.pixelY, max: luzBiblioteca1.pixelY + tileSize * 14}
	});
	that.particulasLuz.createEmitter({
		speed: {min: 1, max: 4},
		lifespan: 11000,
		frequency: 1375,
		blendMode: 'ADD',
		scale: { start: 1, end: 0.4 },
		x: {min: luzBiblioteca1.pixelX, max: luzBiblioteca1.pixelX + tileSize * 14},
		y: {min: luzBiblioteca1.pixelY, max: luzBiblioteca1.pixelY + tileSize * 14}
	});

}

function GenerarCamara(that, jugador){
	// Cámara un jugador
	
	camJugador1 = that.cameras.main;
	camJugador1.startFollow(jugador);
	
	var camInterfaz = that.cameras.add(0, 0, width, height, false, "interfaz");
	camInterfaz.ignore([jugador, fondo, suelo, objetos, resto, iluminacion]);

	// Cámara dos jugadores
	/*
	that.cameras.resize(width / 2, height);
	camJugador1 = that.cameras.main;
	camJugador2 = that.cameras.add(width / 2, 0, width / 2, height, false, "jugador2");
	
	var camInterfaz = that.cameras.add(0, 0, width, height, false, "interfaz");
	camInterfaz.ignore([jugador, fondo, suelo, objetos, resto]);
	camJugador1.startFollow(jugador);
	camJugador2.startFollow(jugador);
	*/
}

function InicializarCursores(that, jugador){
	// Guardar cursores
	if(enPc){
		cursors = that.input.keyboard.addKeys(
			{
				left: Phaser.Input.Keyboard.KeyCodes.A,
				right: Phaser.Input.Keyboard.KeyCodes.D,
				up: Phaser.Input.Keyboard.KeyCodes.W,
				down: Phaser.Input.Keyboard.KeyCodes.S,
				jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
				dash: Phaser.Input.Keyboard.KeyCodes.SHIFT,
				accion: Phaser.Input.Keyboard.KeyCodes.E,
				inventario: Phaser.Input.Keyboard.KeyCodes.Q,
				fullscreen: Phaser.Input.Keyboard.KeyCodes.F,
				pausa: Phaser.Input.Keyboard.KeyCodes.P,
				//debug
				propiedades: Phaser.Input.Keyboard.KeyCodes.L,
				tpMesa: Phaser.Input.Keyboard.KeyCodes.I,
				tpCosas: Phaser.Input.Keyboard.KeyCodes.O
			}); 
			// El segundo valor de entrada es enableCapture, llama a preventDefault en el navegador, 
			// es decir, desactiva los valores predeterminados. El valor predeterminado es true. En
			// resultados hay que desactivar esto.
			
			// Al pulsar F se hace un evento
		cursors.fullscreen.on('down', function () {
			if (that.scale.isFullscreen) {
				that.scale.stopFullscreen();
			}
			else {
				that.scale.startFullscreen();
			}
		}, that);

		cursors.left.on('down', function () {
			jugador.dirX = -1;
			jugador.ultimaDirX = -1;
			
		}, that);
		cursors.left.on('up', function () {
			if(cursors.right.isUp){
				jugador.dirX = 0;
				jugador.ultimaDirX = -1;
			}else{
				jugador.dirX = 1;
				jugador.ultimaDirX = 1;
			}
		}, that);

		cursors.right.on('down', function () {
			jugador.dirX = 1;
			jugador.ultimaDirX = 1;
		}, that);
		cursors.right.on('up', function () {
			if(cursors.left.isUp){
				jugador.dirX = 0;
				jugador.ultimaDirX = 1;
			}else{
				jugador.dirX = -1
				jugador.ultimaDirX = -1
			}
		}, that);

		cursors.up.on('down', function () {
			jugador.dirY = -1;
		}, that);

		cursors.up.on('up', function () {
			if(cursors.down.isUp){
				jugador.dirY = 0;
			}else{
				jugador.dirY = 1
			}
		}, that);

		cursors.down.on('down', function () {
			jugador.dirY = 1;
		}, that);
		cursors.down.on('up', function () {
			if(cursors.up.isUp){
				jugador.dirY = 0;
			}else{
				jugador.dirY = -1
			}
		}, that);

		cursors.jump.on('down', function () {
			jugador.jumpsquat = true;
		}, that);
		cursors.jump.on('up', function () {
			jugador.jumpsquat = false;
		}, that);

		cursors.dash.on('down', function () {
			jugador.dash = true;
		}, that);
		cursors.dash.on('up', function () {
			jugador.dash = false;
		}, that);

		cursors.inventario.on('down', function () {
			jugador.tarjetas = true;
		}, that);
		cursors.inventario.on('up', function () {
			jugador.tarjetas = false;
		}, that);
		
		cursors.accion.on('down', function () {
			jugador.accion = true;
		}, that);
		cursors.accion.on('up', function () {	
			jugador.accion = false;
		}, that);
		
		cursors.pausa.on('down', function() {
			jugador.PararSonidos();
			jugador.ResetearControl();
			
			this.scene.pause();
            this.scene.launch('Pausa');
		}, that);
		
		/*
		/
		/
		/
		*/
		cursors.propiedades.on('down', function () {
			console.log(jugador.arrayMostrados);
			console.log(jugador.arraySeleccionados);
			console.log(jugador.pedidoSeleccionado);
			console.log(jugador.inventario);
		}, that);
		cursors.tpMesa.on('down', function () {
			console.log("tpd");
			jugador.x = 1824;
			jugador.y = 800;
		}, that);
		cursors.tpCosas.on('down', function () {
			console.log("tpd");
			jugador.x = 1130;
			jugador.y = 2432;
		}, that);

	}else{
		
		that.input.addPointer(3);
		
		// Necesitamos este objeto interactuable para que funcione bien el stick por la camara interfaz
		// (Ocurre porque al usar la nueva cámara interfaz no hay interactuables en algunas zonas, entonces no se sabe donde se está pulsando el puntero)
		that.zonaFondo = that.add.rectangle(width / 2, height / 2, width, height).setInteractive().setScrollFactor(0,0);
		
		that.zonaSwipe = that.add.rectangle(width / 4 * 3, height / 2, width / 2, height).setInteractive({ draggable: true }).setScrollFactor(0,0);
		that.zonaTarjetas = that.add.rectangle(width / 2, 25, width, 50).setInteractive().setScrollFactor(0,0);
		that.base = that.add.circle(0, 0, 200);
		that.thumb = that.add.image(0, 0, 'joystick');
		that.botonAccion = that.add.image(width - 75, height - 204, 'botonAccion').setInteractive().setScrollFactor(0,0);
		
		that.joyStick = that.plugins.get('rexVirtualJoystick').add(that, {
			//x: (that.sys.game.canvas.width - ((that.sys.game.canvas.width/that.sys.game.canvas.height) * 540)) / 2 + 150,
			//y: (that.sys.game.canvas.height - 540) / 2 + 390,
			x: 150,
			y: height - 204,
			radius: 75,
			base: that.base,
			thumb: that.thumb,
			fixed: true
			// dir: '8dir',
			// forceMin: 16,
			// fixed: true,
			// enable: true
			
		});
		
		that.zonaSwipe.depth = 99;
		that.zonaTarjetas.depth = 99;
		that.botonAccion.depth = 100;
		that.base.depth = 100;
		that.thumb.depth = 100;
		
		camJugador1.ignore([that.zonaSwipe, that.zonaTarjetas, that.base, that.thumb, that.zonaFondo]);
		
		cursorStick = that.joyStick.createCursorKeys();
		
		cursorStick.left.on('down', function () {
			jugador.dirX = -1;
			jugador.ultimaDirX = -1;
			
		}, that);
		cursorStick.left.on('up', function () {
			if(cursorStick.right.isUp){
				jugador.dirX = 0;
				jugador.ultimaDirX = -1;
			}else{
				jugador.dirX = 1;
				jugador.ultimaDirX = 1;
			}
		}, that);

		cursorStick.right.on('down', function () {
			jugador.dirX = 1;
			jugador.ultimaDirX = 1;
		}, that);
		cursorStick.right.on('up', function () {
			if(cursorStick.left.isUp){
				jugador.dirX = 0;
				jugador.ultimaDirX = 1;
			}else{
				jugador.dirX = -1
				jugador.ultimaDirX = -1
			}
		}, that);

		cursorStick.up.on('down', function () {
			jugador.dirY = -1;
		}, that);

		cursorStick.up.on('up', function () {
			if(cursorStick.down.isUp){
				jugador.dirY = 0;
			}else{
				jugador.dirY = 1
			}
		}, that);

		cursorStick.down.on('down', function () {
			jugador.dirY = 1;
		}, that);
		cursorStick.down.on('up', function () {
			if(cursorStick.up.isUp){
				jugador.dirY = 0;
			}else{
				jugador.dirY = -1
			}
		}, that);
		
		var downX, upX, downY, upY, threshold = 100;
	
		that.zonaSwipe.on('dragstart', function (pointer) {
			downX = pointer.x;
			downY = pointer.y;
		}   
		);

		that.zonaSwipe.on('drag', function (pointer) {
			upX = pointer.x;
			upY = pointer.y;
			if (upX < downX - threshold){
				jugador.ultimaDirX = -1;
				jugador.dash = true;
			} else if (upX > downX + threshold) {
				jugador.ultimaDirX = 1;
				jugador.dash = true;
			} else if (upY < downY - threshold && !jugador.jumpsquat) {
				jugador.jumpsquat = true;	
			}
			
		}    
		);
		
		that.zonaSwipe.on('dragend', function (pointer) {
			jugador.dash = false;
			jugador.jumpsquat = false;
		}   
		);
		
		that.zonaTarjetas.on('pointerdown', function() {
			jugador.tarjetas = true;
		}    
		);
		that.zonaTarjetas.on('pointerup', function() {
			jugador.tarjetas = false;
		}    
		);
		
		that.botonAccion.on('pointerdown', function () {
			jugador.accion = true;
		}, that);
		that.botonAccion.on('pointerout', function () {	
			jugador.accion = false;
		}, that);
		that.botonAccion.on('pointerup', function () {	
			jugador.accion = false;
		}, that);
	}
	
}