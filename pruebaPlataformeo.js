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
		this.load.image("mesa", "assets/bolita.jpg");
		this.load.image("tulipan", "assets/Sprites Objetos/Icono Tulipan.png");
		this.load.image("botonEnviar", "assets/cuadrencio.png");
		this.load.tilemapTiledJSON("plataformeo", "assets/Mapas/plataformeodimensionado.json");
		this.load.tilemapTiledJSON("normal", "assets/Mapas/mapanormaldimensionado.json");
		
    }

    create ()
    {
		GenerarMundo(this, "plataformeo");
		GenerarEscalera(this);
		GenerarRecogidas(this);
		GenerarJugador(this, jugadores[0], 1800, 400);
		GenerarCamara(this, jugadores[0]);
		GenerarMesaPaquetes(this);

		//Placeholder
		var genPedidos = this.add.sprite(2000, 450, 'botonEnviar').setScale(2).setInteractive();
		genPedidos.on('pointerdown', () => GenerarPedido(jugadores[0], this));


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
	if(cursors.accion.isDown && !jugador.recogiendoObjeto && objetos.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize)){
		var tileActual = objetos.getTileAtWorldXY(jugador.sprite.x, jugador.sprite.y + tileSize).index;
		switch(true){
			case idTulipanes.has(tileActual):
				AñadirObjeto(jugador, tulipan);
				break;
			case idRosas.has(tileActual):
				AñadirObjeto(jugador, rosa);
				break;
			case idVioletas.has(tileActual):
				AñadirObjeto(jugador, violeta);
				break;
			case idMargaritas.has(tileActual):
				AñadirObjeto(jugador, margarita);
				break;
			case idOrujo.has(tileActual):
				AñadirObjeto(jugador, orujo);
				break;
			case idWhisky.has(tileActual):
				AñadirObjeto(jugador, whisky);
				break;
			case idRon.has(tileActual):
				AñadirObjeto(jugador, ron);
				break;
			case idVino.has(tileActual):
				AñadirObjeto(jugador, vino);
				break;
			case idBandera1.has(tileActual):
				AñadirObjeto(jugador, bandera1);
				break;
			case idBandera2.has(tileActual):
				AñadirObjeto(jugador, bandera2);
				break;
			case idPelucheViejo.has(tileActual):
				AñadirObjeto(jugador, pelucheViejo);
				break;
			case idPelucheNuevo.has(tileActual):
				AñadirObjeto(jugador, pelucheNuevo);
				break;
			case idCartaSello.has(tileActual):
				AñadirObjeto(jugador, cartaSello);
				break;
			case idCartaAbierta.has(tileActual):
				AñadirObjeto(jugador, cartaAbierta);
				break;
			case idFotoFamiliar.has(tileActual):
				AñadirObjeto(jugador, fotoFamiliar);
				break;
			case idFotoPersonal.has(tileActual):
				AñadirObjeto(jugador, fotoPersonal);
				break;
			case idAnillo.has(tileActual):
				AñadirObjeto(jugador, anillo);
				break;
			case idPendiente.has(tileActual):
				AñadirObjeto(jugador, pendiente);
				break;
			case idCollarPerlas.has(tileActual):
				AñadirObjeto(jugador, collarPerlas);
				break;
			case idCollarOro.has(tileActual):
				AñadirObjeto(jugador, collarOro);
				break;
		}
	}
}

function AñadirObjeto(jugador, objeto){
	if(jugador.inventario.length < limInventario){
		jugador.recogiendoObjeto = true;
		jugador.inventario.push(objeto);
		jugador.velActual = velJugador + (-velJugador / (2 * limInventario)) * jugador.inventario.length;
	}
}


function EntrarMesa(jugador, that){
	if(cursors.accion.isDown && !jugador.recogiendoObjeto){
		if(that.physics.overlap(jugador.sprite, grupoMesa)){
			for(let i = 0; i<jugador.inventario.length; i++){
				//Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
				jugador.arrayMostrados[i] = that.add.sprite(jugador.sprite.x + tileSize, jugador.sprite.y-tileSize - 150*i, jugador.inventario[i].sprite.toString()).setScale(4).setInteractive();
				jugador.arrayMostrados[i].on('pointerdown', () => clickObjeto(jugador.inventario[i].sprite, jugador));
			}
		}

		buttEnviarCielo = that.add.sprite(jugador.sprite.x +100 + tileSize, jugador.sprite.y-tileSize - 150*i, 'botonEnviar').setScale(1.5).setInteractive();
		buttEnviarInfierno = that.add.sprite(jugador.sprite.x +100 + tileSize, jugador.sprite.y - 150*i + 40, 'botonEnviar').setScale(1.5).setInteractive();
		buttEnviarCielo.on('pointerdown', () => Enviar(jugador, true));
		buttEnviarInfierno.on('pointerdown', () => Enviar(jugador, false));

	}
}

function clickObjeto(objetoActual, jugador){
	if(jugador.arraySeleccionados.includes(objetoActual.toString())){
		//Falta meter cambio de sprite que indique que está seleccionado
		//
		//
		//
		index = jugador.arraySeleccionados.indexOf(objetoActual.toString());
		jugador.arraySeleccionados.splice(index, 1);
	}else{
		jugador.arraySeleccionados.push(objetoActual.toString());
	}

}


function Enviar(jugador, destElegido){
	console.log(CompararPedidos(jugador.arraySeleccionados, jugador.pedidoSeleccionado, destElegido));
	/*
	for(let i = 0; i < jugador.arrayMostrados.length; i++){
		jugador.arrayMostrados[i].destroy();
	}
	*/
}
