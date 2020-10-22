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

function GenerarMesaPaquetes(that){
	grupoMesa = that.physics.add.staticGroup();
	grupoMesa.create(2535, 800, 'mesa').setScale(0.1);
	//mesaPaquete = that.add.sprite(2535,800, 'escalera');
} 

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
			fullscreen: Phaser.Input.Keyboard.KeyCodes.F
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
		console.log(jugador.inventario)
	}, that);
	
}