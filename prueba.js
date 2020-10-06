var debug = false;

var velJugador = 360;
var aceleracion = 0.4
var friccion = 0.2

var map;
var suelo;
var tileSize = 32;

var cursors;

// Clase jugador, aquí guardaremos el inventario, puntuacion, etc
class Jugador {
    constructor(limInventario) {
        this.puntuacion = 0;
        this.inventario = new Array(limInventario);
		this.saltando = false;
		this.dir = 0;
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
		this.load.image("tiles", "assets/tilesheet.png");
		this.load.tilemapTiledJSON("map", "assets/map.json");

    }

    create ()
    {
		GenerarMundo(this);
		GenerarJugador(this);
		GenerarCamara(this);
		
		InicializarCursores(this);
		
		
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
		ProcesarMovimiento(delta);
		SubirEscalon(delta);
		
    }
}

function GenerarMundo(that){
	map = that.make.tilemap({ key: "map" });
	// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
	// Phaser's cache (i.e. the name you used in preload)
	const tileset = map.addTilesetImage("tilesheet", "tiles");
	// Parameters: layer name (or index) from Tiled, tileset, x, y
	suelo = map.createStaticLayer("suelo", tileset, 0, 0);
	suelo.setCollisionByProperty({ collides: true });
}
	
function GenerarJugador(that){
	jugadores[0].sprite = that.physics.add.sprite(50, 518, 'vicente');
	jugadores[0].sprite.setMaxVelocity(velJugador);
	jugadores[0].sprite.setCollideWorldBounds(true);
	that.physics.add.collider(jugadores[0].sprite, suelo);
}

function GenerarCamara(that){
	// Cámara un jugador
	var camJugador1 = that.cameras.main;
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
			action: Phaser.Input.Keyboard.KeyCodes.SPACE,
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
		jugadores[0].dir = -1;
	}, that);
	cursors.right.on('down', function () {
		jugadores[0].dir = 1;
	}, that);
	cursors.left.on('up', function () {
		if(cursors.right.isUp){
			jugadores[0].dir = 0;
		}else{
			jugadores[0].dir = 1;
		}
	}, that);
	
	cursors.right.on('up', function () {
		if(cursors.left.isUp){
			jugadores[0].dir = 0;
		}else{
			jugadores[0].dir = -1
		}
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

function ProcesarMovimiento(delta){
	if(jugadores[0].sprite.body.blocked.down){
		jugadores[0].saltando = false;
		if(jugadores[0].dir != 0){
			jugadores[0].sprite.body.velocity.x = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.x, jugadores[0].dir * velJugador, aceleracion);
		}else{
			jugadores[0].sprite.body.velocity.x = Phaser.Math.Linear(jugadores[0].sprite.body.velocity.x, 0, friccion);
		}
	}else if(!jugadores[0].saltando){
		jugadores[0].sprite.body.velocity.x = 0;
	}
	
}

function SubirEscalon(delta){
	if(jugadores[0].sprite.body.blocked.left){
		// El bloque de arriba a la izq está libre
		// Comprueba también si el de justo encima está libre para poder pasar, no debería pasar nada pero por si acaso lo compruebo
		if((!map.getTileAtWorldXY(jugadores[0].sprite.x-tileSize,jugadores[0].sprite.y-tileSize,tileSize,tileSize,suelo)&&
			!map.getTileAtWorldXY(jugadores[0].sprite.x,jugadores[0].sprite.y-tileSize,tileSize,tileSize,suelo)) || 
			jugadores[0].saltando){
			Salto();
		}
	}
	if(jugadores[0].sprite.body.blocked.right){
		if((!map.getTileAtWorldXY(jugadores[0].sprite.x+tileSize, jugadores[0].sprite.y-tileSize, tileSize, tileSize, suelo)&&
			!map.getTileAtWorldXY(jugadores[0].sprite.x, jugadores[0].sprite.y-tileSize, tileSize, tileSize, suelo)) || 
			jugadores[0].saltando){
			Salto();
		}
	}
}

function Salto(){
	jugadores[0].sprite.body.velocity.y = -220;
	jugadores[0].sprite.body.velocity.x = velJugador/4  * jugadores[0].dir;
	jugadores[0].saltando = true;
}
