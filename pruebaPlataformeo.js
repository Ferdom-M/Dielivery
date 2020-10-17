var debug = false;

var map;
var suelo;
var tileSize = 32;

var cursors;

// Por si acaso acabamos metiendo multi local, se hará con un array del tamaño de numJugadores
var numJugadores = 1;
var jugadores = new Array(numJugadores);
var limInventario = 6;

for (var i = 0; i < numJugadores; i++) {
    jugadores[i] = new Jugador();
}

class prueba extends Phaser.Scene {

    constructor() {
        super("prueba");
    }
	
	preload ()
    {
		this.load.image("escalera", "assets/ladder.png");
		this.load.tilemapTiledJSON("map", "assets/Mapas/plataformeodimensionado.json");
		
    }

    create ()
    {
		GenerarMundo(this, "map");
		GenerarEscalera(this);
		GenerarRecogidas(this);
		GenerarJugador(this, jugadores[0], 1800, 400);
		GenerarCamara(this, jugadores[0]);
		
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
		// Según el tile que tengamos alrededor tendremos un estado u otro. Ej suelo normal o resbaladizo
		ComprobarEstados(jugadores[0], this);
		// Al volver al suelo reiniciamos valores como el dash aereo, etc
		ReiniciarValores(jugadores[0]);
		
		ProcesarMovimiento(delta, jugadores[0]);
		ProcesarDash(delta, jugadores[0]);
		AccionSalto(delta, jugadores[0], this);
		SubirEscalon(delta, jugadores[0]);
		
		RecogerObjeto(delta, jugadores[0], this);
		
		InteractuarPinchos(delta, jugadores[0]);
		TiempoObjeto(delta, jugadores[0]);
	}
}

function RecogerObjeto(delta, jugador, that){
	if(cursors.accion.isDown && !jugador.recogiendoObjeto){
		if(that.physics.overlap(jugador.sprite, tulipanes)){
			RecogerTulipan(jugador)
		}
	}
}

function RecogerTulipan(jugador){
	if(jugador.numObjetos < limInventario){
		jugador.recogiendoObjeto = true;
		jugador.inventario.push(tulipan);
		jugador.numObjetos += 1;
	}
}
