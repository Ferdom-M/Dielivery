
// JavaScript source code
class creditos extends Phaser.Scene {

    constructor() {
        super("creditos");
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
		
		this.botonSalto = this.add.sprite(width / 2, height / 2, 'volver').setInteractive();
		this.botonSalto.on('pointerdown', () => {this.botonSalto.setTexture("volver_pulsado");});
        this.botonSalto.on('pointerup', () => this.RecibirTecla('jump'));
        this.botonSalto.on('pointerover', () => {if(this.input.activePointer.isDown){this.botonSalto.setTexture("volver_pulsado");}});
        this.botonSalto.on('pointerout', () => {this.botonSalto.setTexture("volver");});
    }

	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
	
	RecibirTecla(accion){
		
		
			
		this.tablon.setVisible(true);
		this.texto = this.add.text(width / 2, height / 2, "Pulsa la tecla para: " + accion);
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
			
			console.log(controlesGuardados);
			localStorage.setItem('controlesGuardados', JSON.stringify(controlesGuardados));
			
		});
	}
}