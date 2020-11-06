// JavaScript source code
class LevelSelect extends Phaser.Scene {

    constructor() {
        super("LevelSelect");
    }

    preload() {
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
        this.load.image('fondo', 'assets/sky.jpeg');
        this.load.image('logo', 'assets/logo.png');
        
        this.load.image('volver', 'assets/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Botones/volver_pulsado.png');
        this.load.image('1', 'assets/Botones/1.png');
        this.load.image('2', 'assets/Botones/2.png');;
        this.load.image('3', 'assets/Botones/3.png');
        
    }

    create() {
		var Nivel1PosX = this.sys.game.canvas.width / 4;
		var Nivel1PosY = this.sys.game.canvas.height / 2;
		var Nivel2PosX = this.sys.game.canvas.width / 4 * 2;
		var Nivel2PosY = this.sys.game.canvas.height / 2;
		var Nivel3PosX = this.sys.game.canvas.width / 4 * 3;
		var Nivel3PosY = this.sys.game.canvas.height / 2;
		var volverPosX = 200;
		var volverPosY = 50;
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
		//this.cameras.main.setZoom(ratio);
		
		
        this.add.image(640, 360, 'fondo');

        this.buttonNivel1 = this.add.sprite(Nivel1PosX, Nivel1PosY, '1').setScale(0.5).setInteractive();
        this.buttonNivel2 = this.add.sprite(Nivel2PosX, Nivel2PosY, '2').setScale(0.5).setInteractive();
		this.buttonNivel3 = this.add.sprite(Nivel3PosX, Nivel3PosY, '3').setScale(0.5).setInteractive();
        
		this.buttonNivel1.on('pointerdown', () => PasarEscena(this, "Game", "Nivel1"));
		this.buttonNivel2.on('pointerdown', () => PasarEscena(this, "Game", "Nivel2"));
		this.buttonNivel3.on('pointerdown', () => PasarEscena(this, "Game", "Nivel3"));
		
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
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
