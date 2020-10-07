var debug = true;

var gravedad = 1800;
var velJugador = 360;
var velEscalon = -220;
var velDeslizandoPared = 300;
var aceleracion = 0.4;
var friccionSuelo = 0.1;
var friccionAerea = 0.2;
var tiempoJumpsquat = 66.6;
var tiempoSaltoEnPared = 350;
var tiempoDash = 100;
var velSaltoPared = 500;
var velSalto = -700;
var velDash = 960;

var map;
var suelo;
var tileSize = 64;

var cursors;

// Clase jugador, aquí guardaremos el inventario, puntuacion, etc
class Jugador {
    constructor(limInventario) {
        this.puntuacion = 0;
        this.inventario = new Array(limInventario);
		this.subiendoEscalon = false;
		this.dirX = 0;
		this.dirY = 0;
		this.ultimaDirX = 1;
		this.jumpsquat = false;
		this.dash = false;
		this.dashing = false;
		this.dashVelocity = 0;
		this.dashDisponible = false;
		this.saltoEnParedDisponible = false;
		this.saltandoEnPared = false;
		this.saltando = false;
		this.empezandoSalto = false;
		this.contadorJumpsquat = 0.0;
		this.deslizandoPared = false;
		this.contadorSaltoEnPared = 0.0;
		this.contadorDash = 0.0;
    }
}

class Objeto {
	constructor(tipo, peso, puntuacion){
		this.tipo = tipo; // String
		this.peso = peso; 
		this.puntuacion = puntuacion;
	}
}

// Por si acaso acabamos metiendo multi local, se hará con un array del tamaño de numJugadores
var numJugadores = 1;
var jugadores = new Array(numJugadores);
var limInventario = 6;
for (var i = 0; i < numJugadores; i++) {
    jugadores[i] = new Jugador(limInventario);
}

class prueba extends Phaser.Scene {

    constructor() {
        super("prueba");
    }
	
	preload ()
    {
        this.load.image('sky', 'assets/sky.jpeg');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('vicente', 'assets/Sprites Personajes/boceto prueba dielivery.png');
		this.load.image("tiles", "assets/Mapas/Spritesheets/spritesheet_tiles_extruded.png");
		this.load.tilemapTiledJSON("map", "assets/Mapas/mapa_fixed.json");

    }

    create ()
    {
		GenerarMundo(this);
		GenerarJugador(this);
		GenerarCamara(this);
		
		InicializarCursores(this);
		
		this.input.gamepad.start();
		
		if(debug){
			const debugGraphics = this.add.graphics().setAlpha(0.75);
			suelo.renderDebug(debugGraphics, {
			  tileColor: null, // Color of non-colliding tiles
			  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
			});
		}
    }

    update(time, delta){
		// Comprobamos una sola vez si tocamos suelo o paredes
		let enSuelo = jugadores[0].sprite.body.blocked.down;
		let enParedIzq = jugadores[0].sprite.body.blocked.left;
		let enParedDcha = jugadores[0].sprite.body.blocked.right;
		
		// Al volver al suelo reiniciamos valores
		if (enSuelo){
			jugadores[0].dashDisponible = true;
			jugadores[0].saltoEnParedDisponible = true;
			jugadores[0].subiendoEscalon = false;
			jugadores[0].deslizandoPared = false;
			jugadores[0].saltandoEnPared = false;
			jugadores[0].saltando = false;
			jugadores[0].dashing = false;
		}
		
		if(!jugadores[0].dashing){
			ProcesarMovimiento(delta, enSuelo, enParedIzq, enParedDcha);
		}else{
			ProcesarDash(delta, enSuelo);
		}
		
		if (jugadores[0].jumpsquat && enSuelo || 
		    !enSuelo && jugadores[0].dashDisponible || 
			!enSuelo && jugadores[0].saltoEnParedDisponible || 
			jugadores[0].empezandoSalto){
				AccionSalto(delta, enSuelo); 
		}
		
		
		if (jugadores[0].dash && jugadores[0].dashDisponible && !jugadores[0].saltandoEnPared && !enSuelo){
			AccionDash(delta);
		}
		
		
		
		
		
		SubirEscalon(delta, enParedIzq, enParedDcha);
		
		//ActualizarCamara(delta, this);
    }
}

function GenerarMundo(that){
	map = that.make.tilemap({ key: "map" });
	// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
	// Phaser's cache (i.e. the name you used in preload)
	const tileset = map.addTilesetImage("spritesheet_tiles", "tiles", 64, 64, 1, 12);
	// Parameters: layer name (or index) from Tiled, tileset, x, y
	fondo = map.createStaticLayer("Fondo", tileset, 0, 0);
	suelo = map.createStaticLayer("Suelo", tileset, 0, 0);
	suelo.setCollisionByProperty({ collides: true });
}
	
function GenerarJugador(that){
	jugadores[0].sprite = that.physics.add.sprite(200, 200, 'vicente');
	jugadores[0].sprite.setMaxVelocity(velDash, 1100); // x, y
	//jugadores[0].sprite.setCollideWorldBounds(true);
	that.physics.add.collider(jugadores[0].sprite, suelo);
}

function GenerarCamara(that){
	// Cámara un jugador
	var camJugador1 = that.cameras.main;
	//that.cameraDolly = new Phaser.Geom.Point(jugadores[0].sprite.x, jugadores[0].sprite.y);
	camJugador1.startFollow(jugadores[0].sprite);
	
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
		jugadores[0].dirX = -1;
		jugadores[0].ultimaDirX = -1;
	}, that);
	cursors.left.on('up', function () {
		if(cursors.right.isUp){
			jugadores[0].dirX = 0;
		}else{
			jugadores[0].dirX = 1;
		}
	}, that);
	
	cursors.right.on('down', function () {
		jugadores[0].dirX = 1;
		jugadores[0].ultimaDirX = 1;
	}, that);
	cursors.right.on('up', function () {
		if(cursors.left.isUp){
			jugadores[0].dirX = 0;
		}else{
			jugadores[0].dirX = -1
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
		jugadores[0].jumpsquat = true;
	}, that);
	cursors.jump.on('up', function () {
		jugadores[0].jumpsquat = false;
	}, that);
	
	cursors.dash.on('down', function () {
		jugadores[0].dash = true;
	}, that);
	cursors.dash.on('up', function () {
		jugadores[0].dash = false;
	}, that);
	/*
	cursors.action.on('down', function () {
		if (jugadores[0].sprite.) {
			that.scale.stopFullscreen();
		}
		else {
			that.scale.startFullscreen();
		}
	}, that);
	*/
}

function AccionSalto(delta, enSuelo){
	if (jugadores[0].contadorJumpsquat == 0 && jugadores[0].jumpsquat){
		jugadores[0].empezandoSalto = true;
	}
		
	if (jugadores[0].empezandoSalto){
		jugadores[0].contadorJumpsquat += delta;
	}
	if (jugadores[0].contadorJumpsquat > tiempoJumpsquat){
		jugadores[0].empezandoSalto = false;
		jugadores[0].contadorJumpsquat = 0.0;
		jugadores[0].saltando = true;
		if (!enSuelo){
			
			if (jugadores[0].deslizandoPared && jugadores[0].saltoEnParedDisponible){
				
				jugadores[0].sprite.body.velocity.x = -velSaltoPared * jugadores[0].dirX;
				jugadores[0].deslizandoPared = false;
				jugadores[0].saltoEnParedDisponible = false;
				jugadores[0].saltandoEnPared = true;
				jugadores[0].contadorSaltoEnPared = 0.0;
				jugadores[0].sprite.body.velocity.y = velSalto
			}
			else if (jugadores[0].dashDisponible){
				jugadores[0].dashDisponible = false
				console.log("salto aereo");
				jugadores[0].sprite.body.velocity.y = velSalto
			}
		}
		else{
			if (jugadores[0].jumpsquat){
				jugadores[0].sprite.body.velocity.y = velSalto;
				jugadores[0].jumpsquat = false;
			}else{
				jugadores[0].sprite.body.velocity.y = velSalto / 1.2;
			}

		}
	}
}

function AccionDash(delta){
	jugadores[0].dashing = true
	jugadores[0].dashDisponible = false
	
	console.log("dash");
	jugadores[0].dashVelocity = velDash * jugadores[0].ultimaDirX;

}

function ProcesarMovimiento(delta, enSuelo, enParedIzq, enParedDcha){
	if(!jugadores[0].saltandoEnPared){
		if(jugadores[0].dirX != 0){
			jugadores[0].sprite.body.velocity.x = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.x, jugadores[0].dirX * velJugador, aceleracion);
		}else{
			if(enSuelo){
				jugadores[0].sprite.body.velocity.x = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.x, 0, friccionSuelo);
			}else{
				jugadores[0].sprite.body.velocity.x = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.x, 0, friccionAerea);
			}
		}
	}else{
		jugadores[0].contadorSaltoEnPared += delta;
		if(jugadores[0].contadorSaltoEnPared > tiempoSaltoEnPared){
			jugadores[0].saltandoEnPared = false;
			jugadores[0].saltoEnParedDisponible = true;
		}
	}
	if (!enSuelo){
		if (enParedIzq || enParedDcha){
			jugadores[0].deslizandoPared = true;
			console.log(jugadores[0].sprite.body.gravity.y);
			jugadores[0].sprite.body.setAllowGravity(false);
			jugadores[0].sprite.body.velocity.y = velDeslizandoPared;
		}else{
			jugadores[0].deslizandoPared = false;
			jugadores[0].sprite.body.setAllowGravity(true);
		}
	}
}

function ProcesarDash(delta, enSuelo, that){
	if(!enSuelo){
		jugadores[0].sprite.body.velocity.y = 0;
		jugadores[0].sprite.body.velocity.x = jugadores[0].dashVelocity;
		jugadores[0].contadorDash += delta;
		jugadores[0].sprite.body.setAllowGravity(false);
		
	}
	if(jugadores[0].contadorDash > tiempoDash){
		jugadores[0].dashing = false;
		jugadores[0].dashVelocity = 0;
		jugadores[0].contadorDash = 0;
		jugadores[0].sprite.body.setAllowGravity(true);
	}
}

function SubirEscalon(delta, enParedIzq, enParedDcha){
	if(enParedIzq){
		// El bloque de arriba a la izq está libre
		// Comprueba también si el de justo encima está libre para poder pasar, no debería pasar nada pero por si acaso lo compruebo
		if((!suelo.getTileAtWorldXY(jugadores[0].sprite.x-tileSize, jugadores[0].sprite.y-tileSize)&&
			!suelo.getTileAtWorldXY(jugadores[0].sprite.x,jugadores[0].sprite.y-tileSize)) || 
			jugadores[0].subiendoEscalon){
				
			jugadores[0].sprite.body.velocity.y = velEscalon;
			jugadores[0].sprite.body.velocity.x = velJugador/4  * jugadores[0].dirX;
			jugadores[0].subiendoEscalon = true;
		}
	}else{
		jugadores[0].subiendoEscalon = false;
	}
	if(enParedDcha){
		if((!suelo.getTileAtWorldXY(jugadores[0].sprite.x+tileSize, jugadores[0].sprite.y-tileSize)&&
			!suelo.getTileAtWorldXY(jugadores[0].sprite.x, jugadores[0].sprite.y-tileSize)) ||
			
			jugadores[0].subiendoEscalon){
			jugadores[0].sprite.body.velocity.y = velEscalon;
			jugadores[0].sprite.body.velocity.x = velJugador/4  * jugadores[0].dirX;
			jugadores[0].subiendoEscalon = true;
		}
	}else{
		jugadores[0].subiendoEscalon = false;
	}
}

function ActualizarCamara(delta, that){
	that.cameraDolly.x = Math.round(jugadores[0].sprite.x);
    that.cameraDolly.y = Math.round(jugadores[0].sprite.y);
}