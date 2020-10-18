
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

function GenerarJugador(that, jugador, posX, posY){
	InicializarJugador(jugador);
	
	jugador.sprite = that.physics.add.sprite(posX, posY, 'anim_andar', 0);
	jugador.sprite.setMaxVelocity(velDash, 800); // x, y
	//jugadores[0].sprite.setCollideWorldBounds(true);
	that.physics.add.collider(jugador.sprite, suelo);
	
	that.anims.create({
		key: 'andar',
		frames: that.anims.generateFrameNames('anim_andar', {start: 1, end: 3}),
		frameRate: 8,
		repeat: -1
	});

	that.anims.create({
		key: 'idle',
		frames: that.anims.generateFrameNames('anim_Idle', {start: 0, end: 1}),
		frameRate: 4,
		repeat: -1
	});

	that.anims.create({
		key: 'inicioSalto',
		frames: that.anims.generateFrameNames('anim_InicioSalto', {start: 0, end: 1}),
		frameRate: 8,
		repeat: 0
	});

	that.anims.create({
		key: 'caidaSalto',
		frames: that.anims.generateFrameNames('anim_CaidaSalto', {start: 0, end: 1}),
		frameRate: 6,
		repeat: 0
	});
	
	that.anims.create({
		key: 'aterrizajeSalto',
		frames: that.anims.generateFrameNames('anim_AterrizajeSalto', {start: 0, end: 1}),
		frameRate: 4,
		repeat: 0
	});

	that.anims.create({
		key: 'dash',
		frames: that.anims.generateFrameNames('anim_Dash', {start: 0, end: 1}),
		frameRate: 8,
		repeat: -1
	});

}


function GenerarCamara(that, jugador){
	// Cámara un jugador
	var camJugador1 = that.cameras.main;
	//that.cameraDolly = new Phaser.Geom.Point(jugadores[0].sprite.x, jugadores[0].sprite.y);
	camJugador1.startFollow(jugador.sprite);
	
	// Cámara dos jugadores
	/*
	that.cameras.resize(640, 720);
	var camJugador2 = that.cameras.add(640, 0, 640, 720, false, "jugador2");
	
	camJugador1.startFollow(jugadores[0].sprite);
	camJugador2.startFollow(logo);
	*/
}

function InicializarCursores(that){
	// Guardar cursores
	cursors = that.input.keyboard.addKeys(
		{
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
			dash: Phaser.Input.Keyboard.KeyCodes.CTRL,
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
		jugadores[0].sprite.anims.play("andar", true);
		if(jugadores[0].ultimaDirX == 1){
			jugadores[0].sprite.resetFlip();
		}
		jugadores[0].dirX = -1;
		jugadores[0].ultimaDirX = -1;
		
	}, that);
	cursors.left.on('up', function () {
		if(cursors.right.isDown){
			jugadores[0].sprite.flipX = true;
			jugadores[0].sprite.anims.play("andar", true);
		}
		else{
			jugadores[0].sprite.anims.play('idle');
		}
		if(cursors.right.isUp){
			jugadores[0].dirX = 0;
			jugadores[0].ultimaDirX = -1;
		}else{
			jugadores[0].dirX = 1;
			jugadores[0].ultimaDirX = 1;
			
		}
	}, that);
	
	cursors.right.on('down', function () {
		jugadores[0].sprite.anims.play("andar", true);
		if(jugadores[0].ultimaDirX != 1){
			jugadores[0].sprite.flipX = true;
		}
		jugadores[0].dirX = 1;
		jugadores[0].ultimaDirX = 1;
	}, that);
	cursors.right.on('up', function () {
		if(cursors.left.isDown){
			jugadores[0].sprite.resetFlip();
			jugadores[0].sprite.anims.play("andar", true);
		}else{
			jugadores[0].sprite.anims.play('idle');
		}
		
		if(cursors.left.isUp){
			jugadores[0].dirX = 0;
			jugadores[0].ultimaDirX = 1;
		}else{
			jugadores[0].dirX = -1
			jugadores[0].ultimaDirX = -1
		}
	}, that);
	
	cursors.up.on('down', function () {
		jugadores[0].dirY = -1;
	}, that);

	cursors.up.on('up', function () {
		if(cursors.left.isUp){
			jugadores[0].dirY = 0;
		}else{
			jugadores[0].dirY = 1
		}
	}, that);
	
	cursors.down.on('down', function () {
		jugadores[0].dirY = 1;
	}, that);
	cursors.down.on('up', function () {
		if(cursors.left.isUp){
			jugadores[0].dirY = 0;
		}else{
			jugadores[0].dirY = -1
		}
	}, that);
	
	cursors.jump.on('down', function () {
		jugadores[0].sprite.anims.play("inicioSalto");
		jugadores[0].jumpsquat = true;
	}, that);
	cursors.jump.on('up', function () {
		jugadores[0].jumpsquat = false;
	}, that);
	
	cursors.dash.on('down', function () {
		if(!jugadores[0].enSuelo){
			jugadores[0].sprite.anims.play("dash");
		}
		jugadores[0].dash = true;
	}, that);
	cursors.dash.on('up', function () {
		jugadores[0].dash = false;
	}, that);
	
	cursors.inventario.on('down', function () {
		console.log(jugadores[0].inventario)
	}, that);
	
}