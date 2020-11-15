// JavaScript source code


var inputNombreX = (width/4) * 3;
var inputNombreY = height/4;
var nombreJugador;


class Results extends Phaser.Scene {

    constructor() {
        super("Results");
	}
	
	shutdown(){
		this.load.off('progress');
		this.load.off('complete');
	}


    preload() {
		// BARRA DE CARGA
		/*var width = this.cameras.main.width;
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
		*/
		
		// CARGA
		/*
        this.load.image('fondo', 'assets/sky.jpeg');
        this.load.image('logo', 'assets/logo.png');
        
        this.load.image('volver', 'assets/Interfaz/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Interfaz/Botones/volver_pulsado.png');
        */
		this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    }

    create(puntuacion) {
		this.cameras.main.fadeIn(valorFade);
		//console.log(mapaActual);
		var puntuacionPosX = width / 2;
		var puntuacionPosY = height / 2;
		
		//this.scale.stopFullscreen();

        this.fondo = this.add.image(width / 2, height / 2, 'fondo').setInteractive();
		this.fondo.setDisplaySize(width, height);
		
		//console.log(puntuacionTotal);
		
		this.add.text(puntuacionPosX, puntuacionPosY, "Has acabado con " + puntuacionTotal.toString() + " puntos, pog felicididades",
		  { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		
		
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setInteractive();
		this.buttonVolver.on('pointerdown', () => {this.buttonVolver.setTexture("volver_pulsado");});
        this.buttonVolver.on('pointerup', () => {this.buttonVolver.setTexture("volver"); this.checkNombre()});
        this.buttonVolver.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonVolver.setTexture("volver_pulsado");}});
        this.buttonVolver.on('pointerout', () => {this.buttonVolver.setTexture("volver");});
		
		if(mapaActual == "Nivel1"){
			var nivel1Jugado = {
				nivel1Jugado: true
			};
			localStorage.setItem('nivel1Jugado', JSON.stringify(nivel1Jugado));
		}else if(mapaActual == "Nivel2"){
			var nivel2Jugado = {
				nivel2Jugado: true
			};
			localStorage.setItem('nivel2Jugado', JSON.stringify(nivel2Jugado));
		}
		
		/*var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {
			if(!flipflop){
				if (this.scale.isFullscreen) {
					this.scale.stopFullscreen();
				}
				else {
					this.scale.startFullscreen();
				}
			}
		}, this);*/
		
		//Creamos el input text del chaval este tan majo y ponemos que cuando el texto cambie se guarde en la variable nombreJugador
        var inputText = this.add.rexInputText(inputNombreX, inputNombreY, 300, 40, {
			id: 'inputText',
			placeholder: 'Introduce tu nombre',
			backgroundColor: 'blue',
        });
        inputText.on('textchange', function(inputText){
			nombreJugador = inputText.text;
		}, this);
		
		this.fondo.on('pointerdown', () => { inputText.setBlur();});
		// Desactivamos que ignore los eventos de teclado del navegador
		this.input.keyboard.disableGlobalCapture();
	}
	
	checkNombre() {
		if(nombreJugador == undefined || nombreJugador == ''){
			console.log('Mete un nombre, bobo');
		}else{
			PasarEscena(this, "Ranking");
		}
	}

	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}

}
