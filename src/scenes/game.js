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
		/*if(!assetsCargados){
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
		*/
		
    }

    create (mapa)
    {
		this.anims.create({
			key: 'bocadilloAnim',
			frames: this.anims.generateFrameNames('bocadillo', {start: 0, end: 4}),
			frameRate: 1,
			repeat: -1
		});
		
		this.cameras.main.fadeIn(valorFade);
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
		puntuacionTotal = 0;
		perfilesUsados.add(24);
		 
		this.graficos = JSON.parse(localStorage.getItem('graficos')) || {
			iluminacion: true,
			particulas: true
		};
		
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
			case "tutorial":
				posInicialX = 6*tileSize;
				posInicialY = 28*tileSize;
				break;
		}
		this.jugador = new Jugador({scene: this, x: posInicialX, y: posInicialY, key: 'anim_andar'});
		
		if(this.graficos.particulas){
			GenerarParticulas(this, mapa);
		}
		
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
		
		if(tumba0){
		avisoTumba.push(this.add.sprite(tumba0.pixelX + 1.5 * tileSize, tumba0.pixelY - 0.5 * tileSize, 'bocadillo').setVisible(false).play('bocadilloAnim'));
		}
		if(tumba1){
		avisoTumba.push(this.add.sprite(tumba1.pixelX + 1.5 * tileSize, tumba1.pixelY - 0.5 * tileSize, 'bocadillo').setVisible(false).play('bocadilloAnim'));
		}
		if(tumba2){
		avisoTumba.push(this.add.sprite(tumba2.pixelX + 1.5 * tileSize, tumba2.pixelY - 0.5 * tileSize, 'bocadillo').setVisible(false).play('bocadilloAnim'));
		}
		if(tumba3){
		avisoTumba.push(this.add.sprite(tumba3.pixelX + 1.5 * tileSize, tumba3.pixelY - 0.5 * tileSize, 'bocadillo').setVisible(false).play('bocadilloAnim'));
		}
		
		GenerarPedido(this.jugador, this, mapa);
		
		
		tablonInventario = this.add.image(width / 2, height - 51, 'interfazInventario').setScrollFactor(0,0);
		puntuacion = this.add.text(width - 100, height - 54, puntuacionTotal).setScrollFactor(0,0);
		if(mapa != "tutorial"){
			for(var i = 0; i < comienzoPedidos - 1; i++){
				GenerarPedido(this.jugador, this);
			}
		
			generacionPedidos = this.time.addEvent({ delay: 30000, callback: GenerarPedido, args: [this.jugador, this] ,callbackScope: this, loop: true });
			this.initialTime = 480;

			tiempo = this.add.text(width / 2 - 16, height - 54, formatTime(this.initialTime)).setScrollFactor(0,0).setVisible(true);

			// Each 1000 ms call onEvent
			timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
			
		}
		
		this.sys.events.once('shutdown', this.shutdown, this);
	}
	
    update(time, delta){
		this.jugador.update(time, delta);
	}
	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 540;
		
		this.cameras.main.setZoom(ratio);
		

	}
	shutdown (){
        this.events.off('timedEvent');
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
		this.sound.stopAll();
		this.sound.play("s_menu");
		this.cameras.main.fadeOut(valorFade);
		
		this.cameras.main.on('camerafadeoutcomplete', () => {this.scene.start("Results", puntuacionFinal);});
	}
}

function RepresentarInventario(that, jugador){
	if(mapaActual != "tutorial"){
		tiempo.setVisible(true);
	}
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
		jugador.arrayInventario.push(that.add.sprite((width / 2 - 400) + (i / (limInventario - 1)) * (320), height - 49, jugador.inventario[i].tipo).setScrollFactor(0,0));
		
		
	}
	cogiObjeto = false;
}

function BorrarInventario(that, jugador){
	for(var i = 0; i < jugador.arrayInventario.length; i++){
		jugador.arrayInventario[i].destroy();
	}
	if(mapaActual != "tutorial"){
		tiempo.setVisible(false);
	}
	puntuacion.setVisible(false);
	tablonInventario.setVisible(false);
}

function TerminarTutorial(that, jugador, pedidoCorrecto){
	BorrarInventario(that, jugador);
	jugador.PararSonidos();
	jugador.ResetearControl();
	
	jugador.tutorialFinalizado = true;
	for(var i = 0; i < arrayTarjetas.length; i++){
		arrayTarjetas[i].setVisible(false);
	}
	that.sound.stopAll();
	that.sound.play("s_menu");
	that.input.keyboard.resetKeys()
	that.time.addEvent({ delay: 1000, callback: PasarEscenaFinTutorial, args: [pedidoCorrecto], callbackScope: that, loop: false })
	
}

function PasarEscenaFinTutorial(pedidoCorrecto){
	this.scene.pause();
	this.scene.launch("FinTutorial", pedidoCorrecto);
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