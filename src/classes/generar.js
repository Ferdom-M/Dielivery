var ratio

function GenerarMundo(that, mapa){
	
	map = that.make.tilemap({ key: mapa });
	// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
	// Phaser's cache (i.e. the name you used in preload)
	const tileset = map.addTilesetImage("spritesheet_tiles", "tiles", 32, 32, 0, 5);
	// Parameters: layer name (or index) from Tiled, tileset, x, y
	fondo = map.createStaticLayer("Fondo", tileset, 0, 0);
	suelo = map.createStaticLayer("Suelo", tileset, 0, 0);

	objetos = map.createStaticLayer("Objetos", tileset, 0, 0);

	
	suelo.setCollisionByProperty({ collides: true });
}
	
function GenerarEscalera(that){
	grupoEscaleras = that.physics.add.staticGroup();
	grupoEscaleras.create(450, 250, 'escalera');
}

/*
function GenerarMesaPaquetes(that){
	grupoMesa = that.physics.add.staticGroup();
	grupoMesa.create(2535, 800, 'mesa').setScale(0.1);
	//mesaPaquete = that.add.sprite(2535,800, 'escalera');
} 
*/

function GenerarRecogidas(that){
	tulipanes = that.physics.add.staticGroup();
	tulipanes.create(450, 850, 'escalera');
}

function GenerarCamara(that, jugador){
	// Cámara un jugador
	
	var camJugador1 = that.cameras.main;
	camJugador1.setZoom(ratio);
	//that.cameraDolly = new Phaser.Geom.Point(jugadores[0].sprite.x, jugadores[0].sprite.y);
	camJugador1.startFollow(jugador);
	
	// Cámara dos jugadores
	/*
	that.cameras.resize(640, 720);
	var camJugador2 = that.cameras.add(640, 0, 640, 720, false, "jugador2");
	
	camJugador1.startFollow(jugadores[0].sprite);
	camJugador2.startFollow(logo);
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
				//debug
				propiedades: Phaser.Input.Keyboard.KeyCodes.L,
				tpMesa: Phaser.Input.Keyboard.KeyCodes.P,
				tpCosas: Phaser.Input.Keyboard.KeyCodes.O
			});
			
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
			console.log(this.jugador.inventario);
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
		
		/*
		/
		/
		/
		*/
		cursors.propiedades.on('down', function () {
			console.log(jugador.arrayMostrados);
			console.log(jugador.arraySeleccionados);
			console.log(jugador.pedidoSeleccionado);
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
		
		that.zonaSwipe = that.add.rectangle(that.sys.game.canvas.width / 4 * 3, that.sys.game.canvas.height / 2, that.sys.game.canvas.width / 2, that.sys.game.canvas.height).setInteractive({ draggable: true }).setScrollFactor(0,0);
		console.log(that.zonaSwipe);

		that.joyStick = that.plugins.get('rexVirtualJoystick').add(that, {
			//x: (that.sys.game.canvas.width - ((that.sys.game.canvas.width/that.sys.game.canvas.height) * 540)) / 2 + 150,
			//y: (that.sys.game.canvas.height - 540) / 2 + 390,
			x: 150,
			y: 390,
			radius: 100
			// dir: '8dir',
			// forceMin: 16,
			// fixed: true,
			// enable: true
			
		});
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
				setTimeout(function() { jugador.dash = false; }, 75);	
			} else if (upX > downX + threshold) {
				jugador.ultimaDirX = 1;
				jugador.dash = true;
				setTimeout(function() { jugador.dash = false; }, 75);	
			} else if (upY < downY - threshold) {
				jugador.jumpsquat = true;	
				setTimeout(function() { jugador.jumpsquat = false; }, 75);	
			}
		}    
		);
	}
	
}