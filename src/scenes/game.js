var debug = false;

var map;
var suelo;
var fondo;
var objetos;
var resto;
var iluminacion;

const tileSize = 32;

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

var mapaActual;

var tiempo;
var tablonInventario;
var puntuacion;

var comienzoPedidos = 2;

var avisoTumba = new Array();

var assetsCargados = false;

class Game extends Phaser.Scene {

    constructor() {
        super("Game");
    }
	shutdown(){
		this.load.off('progress');
		this.load.off('complete');
	}
    preload() {
		if(!assetsCargados){
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
			
			this.sys.events.once('shutdown', this.shutdown, this);
		}
		
		
		// CARGA
		this.load.image('logo', 'assets/logo.png');
		this.load.image("escalera", "assets/ladder.png");
		
		// INTERFAZ
		this.load.image("interfazInventario", "assets/Interfaz/Tablon interfaz partida.png");
		this.load.image("interfazMesa", "assets/Interfaz/Tablon interfaz pedidos.png");
		this.load.image("botonEnviarCielo", "assets/Interfaz/Botones/boton_cielo.png");
		this.load.image("botonEnviarCielo_pulsado", "assets/Interfaz/Botones/boton_cielo_pulsado.png");
		this.load.image("botonEnviarInfierno", "assets/Interfaz/Botones/boton_infierno.png");
		this.load.image("botonEnviarInfierno_pulsado", "assets/Interfaz/Botones/boton_infierno_pulsado.png");
		this.load.image("botonEnviarBasura", "assets/Interfaz/Botones/basura.png");
		this.load.image("botonEnviarBasura_pulsado", "assets/Interfaz/Botones/basura_pulsado.png");
		

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
		
		// TARJETAS
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
		
		
		// MAPAS
		this.load.tilemapTiledJSON("Nivel1", "assets/Mapas/mapanormaldimensionado.json");
		this.load.tilemapTiledJSON("Nivel2", "assets/Mapas/plataformeodimensionado.json");
		this.load.tilemapTiledJSON("Nivel3", "assets/Mapas/intermedio.json");
		
		// ANIMACIONES
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
		
		// PARTICULAS
		this.load.image("llamita", "assets/llamita.png");
		this.load.image("luz1", "assets/luz1.png");
		
        this.load.image('pausa', 'assets/Fondo_pausa.png');
        this.load.image('pausaSprite', 'assets/pausa.png');
		
		this.load.image("tiles", "assets/Mapas/Spritesheets/s-extruded.png");
		this.load.image("fondos", "assets/Mapas/Spritesheets/f-extruded.png");
		
		for (var i = 0;  i < arrayNombres.length; i++){
			this.load.image("perfil" + i, "assets/Perfiles/perfil" + i + ".jpg");
		}


    }

    create (mapa)
    {
		assetsCargados = true;
		arrayPedidos = new Array();
		arrayTarjetas = new Array();
		arrayPedidosMostrados =  new Array();
		arrayPedidosPorRecoger =  new Array();
		
		tumbaConPedidos = new Set();
		idTumbasConPedidos = new Set();
		perfilesUsados = new Set();
		
		avisoTumba = new Array();
		//var tarjetasVigentes = [];
		pedidosVigentes = 0;
		 
		//this.scale.on('resize', () => this.resizeCamera());
		mapaActual = mapa;
		GenerarMundo(this, mapa);
		
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
		
		
		GenerarParticulas(this);
		
		GenerarCamara(this, this.jugador);
		//this.resizeCamera();
		//GenerarMesaPaquetes(this);

		//Placeholder
		//var genPedidos = this.add.sprite(2000, 700, 'botonEnviar').setScale(2).setInteractive();
		
		//genPedidos.on('pointerdown', () => RecogerPedido(this, arrayPedidosPorRecoger[0]));

		
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
		var tumba0 = resto.findByIndex(tilesTumba[0][0]);
		var tumba1 = resto.findByIndex(tilesTumba[1][0]);
		var tumba2 = resto.findByIndex(tilesTumba[2][0]);
		var tumba3 = resto.findByIndex(tilesTumba[3][0]);
		
		avisoTumba.push(this.add.image(tumba0.pixelX + 1.5 * tileSize, tumba0.pixelY - 0.5 * tileSize, 'botonEnviar').setVisible(false));
		avisoTumba.push(this.add.image(tumba1.pixelX + 1.5 * tileSize, tumba1.pixelY - 0.5 * tileSize, 'botonEnviar').setVisible(false));
		avisoTumba.push(this.add.image(tumba2.pixelX + 1.5 * tileSize, tumba2.pixelY - 0.5 * tileSize, 'botonEnviar').setVisible(false));
		avisoTumba.push(this.add.image(tumba3.pixelX + 1.5 * tileSize, tumba3.pixelY - 0.5 * tileSize, 'botonEnviar').setVisible(false));
		
		for(var i = 0; i < comienzoPedidos; i++){
			GenerarPedido(this.jugador, this);
		}
		
		tablonInventario = this.add.image(width / 2, height - 57, 'interfazInventario').setScrollFactor(0,0);
		generacionPedidos = this.time.addEvent({ delay: 30000, callback: GenerarPedido, args: [this.jugador, this] ,callbackScope: this, loop: true });
		puntuacion = this.add.text(width - 100, height - 60, puntuacionTotal).setScrollFactor(0,0);
		if(mapa != "tutorial"){
			this.initialTime = 500;

			tiempo = this.add.text(width / 2 - 16, height - 60, formatTime(this.initialTime)).setScrollFactor(0,0).setVisible(true);

			// Each 1000 ms call onEvent
			timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
			
		}
		
		
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
	tiempo.setText(formatTime(this.initialTime));
	
	if(this.initialTime == 0){
		seHaJugado = true;
		var puntuacionFinal = puntuacionTotal;
		this.jugador.PararSonidos();
		this.textures.remove('Anillo');
        this.scene.start("Results", puntuacionFinal);
	}
}

function RepresentarInventario(that, jugador){
	tiempo.setVisible(true);
	puntuacion.setVisible(true);
	puntuacion.setText(puntuacionTotal);
	tablonInventario.setVisible(true);
	
	if(jugador.arrayInventario.length > 0){
		for(var i = 0; i < jugador.arrayInventario.length; i++){
			jugador.arrayInventario[i].destroy();
		}
		jugador.arrayInventario.splice(0, jugador.arrayInventario.length);
	}
	

	for(let i = 0; i < jugador.inventario.length; i++){
		console.log(jugador.inventario[i].tipo);
		jugador.arrayInventario.push(that.add.sprite((width / 2 - 430) + (i / (limInventario - 1)) * (350), height - 55, jugador.inventario[i].tipo).setScrollFactor(0,0));
		
		
	}
	cogiObjeto = false;
}

function BorrarInventario(that, jugador){
	for(var i = 0; i < jugador.arrayInventario.length; i++){
		jugador.arrayInventario[i].destroy();
	}
	tiempo.setVisible(false);
	puntuacion.setVisible(false);
	tablonInventario.setVisible(false);
	

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