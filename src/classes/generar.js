function GenerarMundo(that, mapa){
	
	map = that.make.tilemap({ key: mapa });
	// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
	// Phaser's cache (i.e. the name you used in preload)
	const tileset = map.addTilesetImage("spritesheet_tiles", "tiles", 32, 32, 0, 0);
	const fondos = map.addTilesetImage("spritesheet_fondos", "fondos", 32, 32, 0, 0);
	// Parameters: layer name (or index) from Tiled, tileset, x, y
	fondo = map.createStaticLayer("Fondo", [tileset, fondos], 0, 0);
	suelo = map.createStaticLayer("Suelo", tileset, 0, 0);
	objetos = map.createStaticLayer("Objetos", tileset, 0, 0);
	resto = map.createStaticLayer("Resto", tileset, 0, 0);
	iluminacion = map.createStaticLayer("Iluminacion", fondos, 0, 0);

	iluminacion.depth = 50;
	suelo.setCollisionByProperty({ collides: true });
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
	if(that.sys.game.device.os.desktop ){
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
		that.base = that.add.circle(0, 0, 100, 000000);
		that.thumb = that.add.circle(0, 0, 50, 111111);
		
		that.joyStick = that.plugins.get('rexVirtualJoystick').add(that, {
			//x: (that.sys.game.canvas.width - ((that.sys.game.canvas.width/that.sys.game.canvas.height) * 540)) / 2 + 150,
			//y: (that.sys.game.canvas.height - 540) / 2 + 390,
			x: 150,
			y: height - 154,
			radius: 100,
			base: that.base,
			thumb: that.thumb,
			fixed: true
			// dir: '8dir',
			// forceMin: 16,
			// fixed: true,
			// enable: true
			
		});
		
		that.zonaSwipe.depth = 100;
		that.zonaTarjetas.depth = 100;
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
				setTimeout(function() { jugador.dash = false; }, tiempoJumpsquat + 1);	
			} else if (upX > downX + threshold) {
				jugador.ultimaDirX = 1;
				jugador.dash = true;
				setTimeout(function() { jugador.dash = false; }, tiempoJumpsquat + 1);	
			} else if (upY < downY - threshold && !jugador.jumpsquat) {
				jugador.jumpsquat = true;	
				setTimeout(function() { jugador.jumpsquat = false; }, tiempoJumpsquat + 1);	
			}
			
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
	}
	
}