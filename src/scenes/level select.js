// JavaScript source code
class LevelSelect extends Phaser.Scene {

    constructor() {
        super("LevelSelect");
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
        this.load.image('1', 'assets/Interfaz/Botones/1.png');
        this.load.image('2', 'assets/Interfaz/Botones/2.png');;
        this.load.image('3', 'assets/Interfaz/Botones/3.png');
        */
    }

    create() {
		this.cameras.main.fadeIn(valorFade);
		var Nivel1PosX = width / 4.25;
		var Nivel1PosY = height / 1.3;
		var Nivel2PosX = width / 4.25 * 2.25;
		var Nivel2PosY = height / 1.3;
		var Nivel3PosX = width / 4.25 * 3.5;
		var Nivel3PosY = height / 1.3;
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
		//this.cameras.main.setZoom(ratio);
		
		
        this.fondo = this.add.image(width / 2, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);

        this.buttonNivel1 = this.add.sprite(Nivel1PosX, Nivel1PosY, 'mapa1').setInteractive();
        this.buttonNivel2 = this.add.sprite(Nivel2PosX, Nivel2PosY, 'mapa3_block').setInteractive();
		this.buttonNivel3 = this.add.sprite(Nivel3PosX, Nivel3PosY, 'mapa3_block').setInteractive();
        
		//this.buttonNivel1.on('pointerdown', () => PasarEscena(this, "Game", "Nivel1"));
		this.buttonNivel1.on('pointerdown', () => {this.buttonNivel1.setTexture("mapa1_pulsado");});
        this.buttonNivel1.on('pointerup', () => PasarEscena(this, "Game", "Nivel1"));
        this.buttonNivel1.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonNivel1.setTexture("mapa1_pulsado");}});
		this.buttonNivel1.on('pointerout', () => {this.buttonNivel1.setTexture("mapa1");});
		
		// La base para bloquear niveles si no se han jugado, se puede tambien poner el boton de nivel distinto
		var nivel1Jugado = JSON.parse(localStorage.getItem('nivel1Jugado')) || false;
		var nivel2Jugado = JSON.parse(localStorage.getItem('nivel2Jugado')) || false;
		if(nivel1Jugado){//hay que cambiar por mapa 2 cuando este hecho
			this.buttonNivel2.setTexture("mapa3");
			this.buttonNivel2.on('pointerdown', () => {this.buttonNivel2.setTexture("mapa3_pulsado");});
			this.buttonNivel2.on('pointerup', () => PasarEscena(this, "Game", "Nivel2"));
			this.buttonNivel2.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonNivel2.setTexture("mapa3_pulsado");}});
			this.buttonNivel2.on('pointerout', () => {this.buttonNivel2.setTexture("mapa3");});
			//this.buttonNivel2.on('pointerdown', () => PasarEscena(this, "Game", "Nivel2"));
		}
		if(nivel2Jugado){
			this.buttonNivel3.setTexture("mapa3");
			this.buttonNivel3.on('pointerdown', () => {this.buttonNivel2.setTexture("mapa3_pulsado");});
			this.buttonNivel3.on('pointerup', () => PasarEscena(this, "Game", "Nivel3"));
			this.buttonNivel3.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonNivel2.setTexture("mapa3_pulsado");}});
			this.buttonNivel3.on('pointerout', () => {this.buttonNivel2.setTexture("mapa3");});
		}
		
		
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setInteractive();
		this.buttonVolver.on('pointerdown', () => {this.buttonVolver.setTexture("volver_pulsado");});
        this.buttonVolver.on('pointerup', () => PasarEscena(this, "Mainmenu"));
        this.buttonVolver.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonVolver.setTexture("volver_pulsado");}});
        this.buttonVolver.on('pointerout', () => {this.buttonVolver.setTexture("volver");});
		
		var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }

        }, this);
    }

	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
}
