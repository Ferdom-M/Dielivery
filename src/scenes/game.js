var debug = false;

var map;
var suelo;
var fondo;
var objetos;
var resto;
var tileSize = 32;

var cursors;

// Por si acaso acabamos metiendo multi local, se hará con un array del tamaño de numJugadores
var numJugadores = 1;
var jugadores = new Array(numJugadores);


var text;
var timedEvent;
var generacionPedidos;

var emitter; 

var camJugador1;
var camJugador2;

class Game extends Phaser.Scene {

    constructor() {
        super("Game");
    }
	
	preload ()
    {
		// BARRA DE CARGA
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		
		var progressBar = this.add.graphics(width / 2, height / 2);
		var progressBox = this.add.graphics(width / 2, height / 2);
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(width / 2 - 320 / 2, height / 2, 320, 50);
		
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		this.load.on('progress', function (value) {
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(width / 2 - 320 / 2 + 10, height / 2 + 10, 300 * value, 30);

			percentText.setText(parseInt(value * 100) + '%');
		});


		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			percentText.destroy();
		});
		
		// CARGA
		this.load.image('logo', 'assets/logo.png');
		this.load.image("escalera", "assets/ladder.png");
		this.load.image("mesa", "assets/bolita.jpg");

		//ICONOS DE OBJETOS PARA INVENTARIO
		this.load.image("Anillo", "assets/Sprites Objetos/Icono Anillo.png");
		this.load.image("Bandera 1", "assets/Sprites Objetos/Icono Bandera 1.png");
		this.load.image("Bandera 2", "assets/Sprites Objetos/Icono Bandera 2.png");
		this.load.image("Botella Orujo", "assets/Sprites Objetos/Icono Botella Orujo.png");
		this.load.image("Botella Ron", "assets/Sprites Objetos/Icono Botella Ron.png");
		this.load.image("Botella Vino", "assets/Sprites Objetos/Icono Botella Vino.png");
		this.load.image("Botella Whisky", "assets/Sprites Objetos/Icono Botella Whisky.png");
		this.load.image("Carta Abierta", "assets/Sprites Objetos/Icono Carta Abierta.png");
		this.load.image("Carta Sellada", "assets/Sprites Objetos/Icono Carta Sellada.png");
		this.load.image("Collar Oro", "assets/Sprites Objetos/Icono Collar Oro.png");
		this.load.image("Collar Perlas", "assets/Sprites Objetos/Icono Collar Perlas.png");
		this.load.image("Foto Familiar", "assets/Sprites Objetos/Icono Foto Familiar.png");
		this.load.image("Foto Personal", "assets/Sprites Objetos/Icono Foto Personal.png");
		this.load.image("Margarita", "assets/Sprites Objetos/Icono Margarita.png");
		this.load.image("Osito Nuevo", "assets/Sprites Objetos/Icono Osito Nuevo.png");
		this.load.image("Osito Viejo", "assets/Sprites Objetos/Icono Osito Viejo.png");
		this.load.image("Pendiente", "assets/Sprites Objetos/Icono Pendientes.png");
		this.load.image("Rosa", "assets/Sprites Objetos/Icono Rosa.png");
		this.load.image("Tulipan", "assets/Sprites Objetos/Icono Tulipan.png");
		this.load.image("Violeta", "assets/Sprites Objetos/Icono Violeta.png");
		this.load.image("cielo", "assets/Interfaz/Cielo.png");
		this.load.image("infierno", "assets/Interfaz/Infierno.png");
		
		// Sonidos
		this.load.audio('s_pasos', 'assets/Sonidos/s_pasos.wav');
		this.load.audio('s_pasosMojados', 'assets/Sonidos/s_pasosMojado.wav');
		this.load.audio('s_botellas', 'assets/Sonidos/s_botellas.wav');
		this.load.audio('s_carta', 'assets/Sonidos/s_carta.wav');
		this.load.audio('s_flores', 'assets/Sonidos/s_flores.wav');
		this.load.audio('s_joyero', 'assets/Sonidos/s_joyero.wav');
		this.load.audio('s_extTarjeta', 'assets/Sonidos/s_extTarjeta.wav');
		this.load.audio('s_guarTarjeta', 'assets/Sonidos/s_guarTarjeta.wav');
		this.load.audio('s_baulRecuerdos', 'assets/Sonidos/s_baulRecuerdos.wav');
		this.load.audio('s_dash', 'assets/Sonidos/s_dash.wav');
		this.load.audio('s_escalera', 'assets/Sonidos/s_escalera.wav');
		this.load.audio('s_salto', 'assets/Sonidos/s_salto.wav');
		
		this.load.image("botonEnviar", "assets/cuadrencio.png");
		this.load.tilemapTiledJSON("Nivel1", "assets/Mapas/mapanormaldimensionado.json");
		this.load.tilemapTiledJSON("Nivel2", "assets/Mapas/plataformeodimensionado.json");
		this.load.tilemapTiledJSON("Nivel3", "assets/Mapas/intermedio.json");
		
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
		
		this.load.image("tiles", "assets/Mapas/Spritesheets/spritesheet definitiva (en curso).png");
		
		for (var i = 0;  i < arrayNombres.length; i++){
			this.load.image("perfil" + i, "assets/Perfiles/perfil" + i + ".jpg");
		}


		this.load.image("pruebaNombre", "assets/prueba nombre.png");
    }

    create (mapa)
    {
		//this.scale.on('resize', () => this.resizeCamera());
		
		GenerarMundo(this, mapa);
		
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
		//var genPedidos = this.add.sprite(2000, 575, 'botonEnviar').setScale(2).setInteractive();
		
		//genPedidos.on('pointerdown', () => GenerarPedido(this.jugador, this));

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

		text = this.add.text(0, 30, 'Countdown: ' + formatTime(this.initialTime)).setScrollFactor(0,0);

		// Each 1000 ms call onEvent
		timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
		generacionPedidos = this.time.addEvent({ delay: 3000, callback: GenerarPedido, args: [this.jugador, this] ,callbackScope: this, loop: true });
		
	}
	
    update(time, delta){
		this.jugador.update(time, delta);
	}
	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 540;
		
		this.cameras.main.setZoom(ratio);
		

	}
	
}

function MoverTarjeta(that, tarjeta){
	console.log("a");
	// Mover de vuelta arriba
	if(tarjeta.expandida){
		this.tarjeta.setPosition((Phaser.Math.Linear(tarjeta.x, 0, friccionResbalo)), (Phaser.Math.Linear(tarjeta.y, 0, friccionResbalo)));
	}
	// Mover al centro de pantalla y agrandar
	else{
		
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
		var puntuacionFinal = puntuacionTotal;
        this.scene.start("Results", puntuacionFinal);
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