var textoConfiguracionEspañol = {
	left: "Izquierda",
	right: "Derecha",
	up: "Arriba",
	down: "Abajo",
	jump: "Salto",
	dash: "Dash",
	accion: "Accion",
	inventario: "Tarjetas",
	fullscreen: "Pantalla completa",
	pausa: "Pausa"
}
var textoConfiguracionIngles = {
	left: "Left",
	right: "Right",
	up: "Up",
	down: "Down",
	jump: "Jump",
	dash: "Dash",
	accion: "Action",
	inventario: "Cards",
	fullscreen: "Fullscreen",
	pausa: "Pause"
}

// JavaScript source code
class Ajustes extends Phaser.Scene {

    constructor() {
        super('Ajustes');
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
        this.load.image('volver', 'assets/Interfaz/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Interfaz/Botones/volver_pulsado.png');
		*/
	}
	create() {
		this.cameras.main.fadeIn(valorFade);
		
		var separacionBotonesY = 50;
		var separacionBotonesX = 250
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
        this.fondo = this.add.image(width / 2, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);


        this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setInteractive();
		this.buttonVolver.on('pointerdown', () => {this.buttonVolver.setTexture("volver_pulsado");});
        this.buttonVolver.on('pointerup', () => PasarEscena(this, "Mainmenu"));
        this.buttonVolver.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonVolver.setTexture("volver_pulsado");}});
        this.buttonVolver.on('pointerout', () => {this.buttonVolver.setTexture("volver");});
		
		this.tablon = this.add.image(width / 2, height / 2, 'tablonPausa').setVisible(false);
		
		if(enPc){
			if(idioma.idioma.includes("es")){
				var i = 0;
				for (var key in textoConfiguracionEspañol){
					this.add.text(width / 2, 50 + i * separacionBotonesY, textoConfiguracionEspañol[key]);
					i++;
				}
			}else{
				var i = 0;
				for (var key in textoConfiguracionIngles){
					this.add.text(width / 2, 50 + i * separacionBotonesY, textoConfiguracionIngles[key]);
					i++;
				}
			}
			var i = 0;
			this.botonIzq = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonIzq.on('pointerdown', () => {this.botonIzq.setTexture("volver_pulsado");});
			this.botonIzq.on('pointerup', () => {this.botonIzq.setTexture("volver"); this.RecibirTecla('left');} );
			this.botonIzq.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonIzq.setTexture("volver_pulsado");}});
			this.botonIzq.on('pointerout', () => {this.botonIzq.setTexture("volver");});
			i++;
			this.botonDcha = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonDcha.on('pointerdown', () => {this.botonDcha.setTexture("volver_pulsado");});
			this.botonDcha.on('pointerup', () => {this.botonDcha.setTexture("volver"); this.RecibirTecla('right');});
			this.botonDcha.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonDcha.setTexture("volver_pulsado");}});
			this.botonDcha.on('pointerout', () => {this.botonDcha.setTexture("volver");});
			i++;
			this.botonArriba = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonArriba.on('pointerdown', () => {this.botonArriba.setTexture("volver_pulsado");});
			this.botonArriba.on('pointerup', () => {this.botonArriba.setTexture("volver"); this.RecibirTecla('up');});
			this.botonArriba.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonArriba.setTexture("volver_pulsado");}});
			this.botonArriba.on('pointerout', () => {this.botonArriba.setTexture("volver");});
			i++;
			this.botonAbajo = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonAbajo.on('pointerdown', () => {this.botonAbajo.setTexture("volver_pulsado");});
			this.botonAbajo.on('pointerup', () => {this.botonAbajo.setTexture("volver"); this.RecibirTecla('down');});
			this.botonAbajo.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonAbajo.setTexture("volver_pulsado");}});
			this.botonAbajo.on('pointerout', () => {this.botonAbajo.setTexture("volver");});
			i++;
			this.botonSalto = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonSalto.on('pointerdown', () => {this.botonSalto.setTexture("volver_pulsado");});
			this.botonSalto.on('pointerup', () => {this.botonSalto.setTexture("volver"); this.RecibirTecla('jump');});
			this.botonSalto.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonSalto.setTexture("volver_pulsado");}});
			this.botonSalto.on('pointerout', () => {this.botonSalto.setTexture("volver");});
			i++;
			this.botonDash = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonDash.on('pointerdown', () => {this.botonDash.setTexture("volver_pulsado");});
			this.botonDash.on('pointerup', () => {this.botonDash.setTexture("volver"); this.RecibirTecla('dash');});
			this.botonDash.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonDash.setTexture("volver_pulsado");}});
			this.botonDash.on('pointerout', () => {this.botonDash.setTexture("volver");});
			i++;
			this.botonAccion = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonAccion.on('pointerdown', () => {this.botonAccion.setTexture("volver_pulsado");});
			this.botonAccion.on('pointerup', () => {this.botonAccion.setTexture("volver"); this.RecibirTecla('accion');});
			this.botonAccion.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonAccion.setTexture("volver_pulsado");}});
			this.botonAccion.on('pointerout', () => {this.botonAccion.setTexture("volver");});
			i++;
			this.botonTarjetas = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonTarjetas.on('pointerdown', () => {this.botonTarjetas.setTexture("volver_pulsado");});
			this.botonTarjetas.on('pointerup', () => {this.botonTarjetas.setTexture("volver"); this.RecibirTecla('inventario');});
			this.botonTarjetas.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonTarjetas.setTexture("volver_pulsado");}});
			this.botonTarjetas.on('pointerout', () => {this.botonTarjetas.setTexture("volver");});
			i++;
			this.botonFullscreen = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonFullscreen.on('pointerdown', () => {this.botonFullscreen.setTexture("volver_pulsado");});
			this.botonFullscreen.on('pointerup', () => {this.botonFullscreen.setTexture("volver"); this.RecibirTecla('fullscreen');});
			this.botonFullscreen.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonFullscreen.setTexture("volver_pulsado");}});
			this.botonFullscreen.on('pointerout', () => {this.botonFullscreen.setTexture("volver");});
			i++;
			this.botonPausa = this.add.sprite(width / 2 + separacionBotonesX, 50 + i * separacionBotonesY, 'volver').setInteractive();
			this.botonPausa.on('pointerdown', () => {this.botonPausa.setTexture("volver_pulsado");});
			this.botonPausa.on('pointerup', () => {this.botonPausa.setTexture("volver"); this.RecibirTecla('pausa');});
			this.botonPausa.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonPausa.setTexture("volver_pulsado");}});
			this.botonPausa.on('pointerout', () => {this.botonPausa.setTexture("volver");});
		}
		
		this.graficos = JSON.parse(localStorage.getItem('graficos')) || {
			iluminacion: true,
			particulas: true
		};
		if(enPc){
			this.botonAlto = this.add.sprite(width / 4, height / 4, 'alto_pulsado').setInteractive();
			this.botonBajo = this.add.sprite(width / 4, (height / 4) * 2, 'bajo_pulsado').setInteractive();
			this.botonMuyBajo = this.add.sprite(width / 4, (height / 4) * 3, 'muybajo_pulsado').setInteractive();
		}else{
			this.botonAlto = this.add.sprite(width / 2, height / 4, 'alto_pulsado').setInteractive();
			this.botonBajo = this.add.sprite(width / 2, (height / 4) * 2, 'bajo_pulsado').setInteractive();
			this.botonMuyBajo = this.add.sprite(width / 2, (height / 4) * 3, 'muybajo_pulsado').setInteractive();
		}
		
		this.botonAlto.on('pointerdown', () => this.PulsarAlto());
		this.botonBajo.on('pointerdown', () => this.PulsarBajo());
		this.botonMuyBajo.on('pointerdown', () => this.PulsarMuyBajo());
		
		if(this.graficos.iluminacion){
			if(this.graficos.particulas){
				this.botonAlto.setTexture('alto');
			}else{
				this.botonBajo.setTexture('bajo');
			}
		}else{
			this.botonMuyBajo.setTexture('muybajo');
		}
		
    }

	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
	
	RecibirTecla(accion){
		this.botonIzq.setVisible(false);
		this.botonDcha.setVisible(false);
		this.botonArriba.setVisible(false);
		this.botonAbajo.setVisible(false);
		this.botonSalto.setVisible(false);
		this.botonDash.setVisible(false);
		this.botonAccion.setVisible(false);
		this.botonTarjetas.setVisible(false);
		this.botonFullscreen.setVisible(false);
		this.botonPausa.setVisible(false);
		this.botonAlto.setVisible(false);
		this.botonBajo.setVisible(false);
		this.botonMuyBajo.setVisible(false);
		
		this.tablon.setVisible(true);
		var texto;
		var acciones 
		if(idioma.idioma.includes("es")){
			texto = "Pulsa la tecla para: ";
			acciones = textoConfiguracionEspañol;
		}else{
			texto = "Press the key for: ";
			acciones = textoConfiguracionIngles;
		}
		
		this.texto = this.add.text(width / 2, height / 2, texto + acciones[accion]);
		
		this.texto.depth = 100;
		this.tablon.depth = 100;
		this.input.keyboard.once('keydown', (eventName, event) => {
			var controlesGuardados = JSON.parse(localStorage.getItem('controlesGuardados')) || {
				left: Phaser.Input.Keyboard.KeyCodes.A,
				right: Phaser.Input.Keyboard.KeyCodes.D,
				up: Phaser.Input.Keyboard.KeyCodes.W,
				down: Phaser.Input.Keyboard.KeyCodes.S,
				jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
				dash: Phaser.Input.Keyboard.KeyCodes.SHIFT,
				accion: Phaser.Input.Keyboard.KeyCodes.E,
				inventario: Phaser.Input.Keyboard.KeyCodes.Q,
				fullscreen: Phaser.Input.Keyboard.KeyCodes.F,
				pausa: Phaser.Input.Keyboard.KeyCodes.P,
				//debug
				propiedades: Phaser.Input.Keyboard.KeyCodes.L,
				tpMesa: Phaser.Input.Keyboard.KeyCodes.I,
				tpCosas: Phaser.Input.Keyboard.KeyCodes.O
			};
			console.log(controlesGuardados);
			controlesGuardados[accion] = eventName.keyCode;
			
			this.tablon.setVisible(false);
			this.texto.setVisible(false);
			
			this.botonIzq.setVisible(true);
			this.botonDcha.setVisible(true);
			this.botonArriba.setVisible(true);
			this.botonAbajo.setVisible(true);
			this.botonSalto.setVisible(true);
			this.botonDash.setVisible(true);
			this.botonAccion.setVisible(true);
			this.botonTarjetas.setVisible(true);
			this.botonFullscreen.setVisible(true);
			this.botonPausa.setVisible(true);
			this.botonAlto.setVisible(true);
			this.botonBajo.setVisible(true);
			this.botonMuyBajo.setVisible(true);
		
			localStorage.setItem('controlesGuardados', JSON.stringify(controlesGuardados));
			
		});
	}
	
	PulsarAlto(){
		if(!(this.graficos.iluminacion && this.graficos.particulas)){
			this.botonAlto.setTexture('alto');
			this.botonBajo.setTexture('bajo_pulsado');
			this.botonMuyBajo.setTexture('muybajo_pulsado');
			this.graficos.iluminacion = true;
			this.graficos.particulas = true;
			localStorage.setItem('graficos', JSON.stringify(this.graficos));
		}
	}
	PulsarBajo(){
		if(!(this.graficos.iluminacion && !this.graficos.particulas)){
			this.botonAlto.setTexture('alto_pulsado');
			this.botonBajo.setTexture('bajo');
			this.botonMuyBajo.setTexture('muybajo_pulsado');
			this.graficos.iluminacion = true;
			this.graficos.particulas = false;
			localStorage.setItem('graficos', JSON.stringify(this.graficos));
		}
	}
	PulsarMuyBajo(){
		if(!(!this.graficos.iluminacion && !this.graficos.particulas)){
			this.botonAlto.setTexture('alto_pulsado');
			this.botonBajo.setTexture('bajo_pulsado');
			this.botonMuyBajo.setTexture('muybajo');
			this.graficos.iluminacion = false;
			this.graficos.particulas = false;
			localStorage.setItem('graficos', JSON.stringify(this.graficos));
		}
	}
}