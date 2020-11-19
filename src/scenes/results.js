// JavaScript source code

var inputNombreX = (width/2);
var inputNombreY = height/1.58;
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
		
    }

    create(puntuacion) {
		
		if(idioma.idioma.includes("es")){
			nombreJugador = "Introduce tu nombre";
		}else{
			nombreJugador = "Enter your name";
		}

		var configTexto = {
				fontFamily: 'Sylfaen',
				fontSize: '22px',
				color: '#fff',
				stroke: '#000000',
				strokeThickness: 4,
				align: 'center',  // 'left'|'center'|'right'|'justify'
				maxLines: 3,
				lineSpacing: 0,
				fixedWidth: 600,
				fixedHeight: 100 ,
				rtl: false,
				testString: '|MÉqgy',
				wordWrap: {
					width: 600,
					callback: null,
					callbackScope: null,
					useAdvancedWrap: false
				},
				metrics: false
			// metrics: {
			//     ascent: 0,
			//     descent: 0,
			//     fontSize: 0
			// }  
		};

		var configTexto2 = {
			fontFamily: 'Sylfaen',
			fontSize: '22px',
			color: '#fff',
			stroke: '#000000',
			strokeThickness: 4,
			align: 'center',  // 'left'|'center'|'right'|'justify'
			maxLines: 3,
			lineSpacing: 0,
			fixedWidth: 600,
			fixedHeight: 100 ,
			rtl: false,
			testString: '|MÉqgy',
			wordWrap: {
				width: 600,
				callback: null,
				callbackScope: null,
				useAdvancedWrap: false
			},
			placeholder: nombreJugador.toString(),
			metrics: false
		// metrics: {
		//     ascent: 0,
		//     descent: 0,
		//     fontSize: 0
		// }  
	};

		
		
		
		this.cameras.main.fadeIn(valorFade);
		//console.log(mapaActual);
		var puntuacionPosX = width / 7;
		var puntuacionPosY = height / 1.35;
		
		//this.scale.stopFullscreen();

        this.fondo = this.add.image(width / 2, height / 2, 'fondo').setInteractive();
		this.fondo.setDisplaySize(width, height);
		
		this.cuadroResultados = this.add.image(width / 2, height / 2.5, 'cuadro_resultados').setInteractive();
		//this.marco = this.add.image(width / 2, height / 2, 'tablon').setScale(0.3);
		
		//console.log(puntuacionTotal);
		
		if(idioma.idioma.includes("es")){
			this.add.text(puntuacionPosX, puntuacionPosY, "Has acabado la jornada con " + puntuacionTotal.toString() + " puntos, ¡buen trabajo!",configTexto);
		}else{
			this.add.text(puntuacionPosX, puntuacionPosY, "You finished the day with " + puntuacionTotal.toString() + " points, nice job!", configTexto);
		}
		

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
		
		//Creamos el input text del chaval este tan majo y ponemos que cuando el texto cambie se guarde en la variable nombreJugador
        var inputText = this.add.rexInputText(inputNombreX, inputNombreY, 300, 40, configTexto2);
        inputText.on('textchange', function(inputText){
			if(inputText.text.length > 12){
				inputText.text = nombreJugador;
			}else{
				nombreJugador = inputText.text;
			}
			
		}, this);
		
		this.fondo.on('pointerdown', () => { inputText.setBlur();});
		// Desactivamos que ignore los eventos de teclado del navegador
		this.input.keyboard.disableGlobalCapture();
	}

	Borrar(obj){
		obj.destroy();
	}
	
	checkNombre() {
		if(nombreJugador == undefined || nombreJugador == '' || nombreJugador == "Introduce tu nombre"){
			if(idioma.idioma.includes("es")){
				var txt = this.add.text(width/1.4, height/2.5, "Olvidaste introducir\ntu nombre", configTexto);
				var borrarTXT = this.time.addEvent({ delay: 1500, callback: this.Borrar, args: [txt], callbackScope: this, loop: false });
			}else{
				var txt = this.add.text(width/1.4, height/2.5, "You forgot ntroducing \nyour name", configTexto);
				var borrarTXT = this.time.addEvent({ delay: 1500, callback: this.Borrar, args: [txt], callbackScope: this, loop: false });
			}
			
			//console.log('Mete un nombre, bobo');
		}else{
			PasarEscena(this, "Ranking");
		}
	}

	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}

}
