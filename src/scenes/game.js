var debug = false;

var map;
var suelo;
var fondo;
var objetos;
var tileSize = 32;

var cursors;

// Por si acaso acabamos metiendo multi local, se hará con un array del tamaño de numJugadores
var numJugadores = 1;
var jugadores = new Array(numJugadores);


var text;
var timedEvent;


var emitter; 

class Game extends Phaser.Scene {

    constructor() {
        super("Game");
    }
	
	preload ()
    {
        this.load.image('logo', 'assets/logo.png');
		this.load.image("escalera", "assets/ladder.png");
		this.load.image("mesa", "assets/bolita.jpg");
		this.load.image("Tulipan", "assets/Sprites Objetos/Icono Tulipan.png");
		this.load.image("botonEnviar", "assets/cuadrencio.png");
		this.load.tilemapTiledJSON("Nivel1", "assets/Mapas/mapanormaldimensionado.json");
		this.load.tilemapTiledJSON("Nivel2", "assets/Mapas/plataformeodimensionado.json");
		this.load.tilemapTiledJSON("Nivel3", "assets/Mapas/plataformeodimensionado.json");
		
		this.load.spritesheet('anim_andar', 'assets/Sprites Personajes/Spritesheet Andar.png', {frameWidth: 32, frameHeight: 64});
		//this.load.spritesheet('anim_saltar', 'assets/Sprites Personajes/Spritesheet Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_InicioSalto', 'assets/Sprites Personajes/Spritesheet Inicio Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Idle', 'assets/Sprites Personajes/Spritesheet Idle.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_CaidaSalto', 'assets/Sprites Personajes/Spritesheet Caida Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_AterrizajeSalto', 'assets/Sprites Personajes/Spritesheet Aterrizaje Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Dash', 'assets/Sprites Personajes/Spritesheet Dash.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Trepar', 'assets/Sprites Personajes/Spritesheet Trepar Nuevo.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Dano', 'assets/Sprites Personajes/Spritesheet Dano.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Pared', 'assets/Sprites Personajes/Spritesheet Pared.png', {frameWidth: 32, frameHeight: 64});
		
		this.load.image("tiles", "assets/Mapas/Spritesheets/nuevos sprites.png");
		
    }

    create (mapa)
    {
		//this.scale.on('resize', () => this.resizeCamera());

		GenerarMundo(this, mapa);
		GenerarEscalera(this);
		GenerarRecogidas(this);
		
		/*
		var particles = this.add.particles('mesa');
		emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.05, end: 0 }
        });
		*/
		var posInicialX, posInicialY;
		switch(mapa){
			case "Nivel1":
				posInicialX = 3232;
				posInicialY = 800;
				break;
			case "Nivel2":
				posInicialX = 1824;
				posInicialY = 800;
				break;
			case "Nivel3":
				posInicialX = 1824;
				posInicialY = 800;
				break;
		}
		this.jugador = new Jugador({scene: this, x: posInicialX, y: posInicialY, key: 'anim_andar'});
		
		
		GenerarCamara(this, this.jugador);
		//this.resizeCamera();
		//GenerarMesaPaquetes(this);

		//Placeholder
		var genPedidos = this.add.sprite(2000, 575, 'botonEnviar').setScale(2).setInteractive();
		genPedidos.on('pointerdown', () => GenerarPedido(this.jugador, this));

		/*
		emitter.startFollow(jugadores[0].sprite, 0, jugadores[0].sprite.body.height / 4);
		emitter.stop();
		*/
		
		InicializarCursores(this, this.jugador);
		
		this.input.gamepad.start();
		
		if(debug){
			const debugGraphics = this.add.graphics().setAlpha(0.75);
			suelo.renderDebug(debugGraphics, {
			  tileColor: null, // Color of non-colliding tiles
			  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
			});
		}
		
		
		this.initialTime = 300;

		text = this.add.text(0, 0, 'Countdown: ' + formatTime(this.initialTime)).setScrollFactor(0,0);

		// Each 1000 ms call onEvent
		timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
		
    }
	
    update(time, delta){
		this.jugador.update(time, delta);
	}
	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 540;
		
		this.cameras.main.setZoom(ratio);
		

	}
	
}

function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}

function onEvent ()
{
    this.initialTime -= 1; // One second
    text.setText('Countdown: ' + formatTime(this.initialTime));
	if(this.initialTime == 0){
		var puntuacionFinal = this.jugador.puntuacion;
        this.scene.start("Results", [puntuacionFinal]);
	}
}



/*
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
	
}

*/