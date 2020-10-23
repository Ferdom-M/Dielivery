// JavaScript source code
class Results extends Phaser.Scene {

    constructor() {
        super("Results");
    }

    preload() {
        this.load.image('fondo', 'assets/sky.jpeg');
        this.load.image('logo', 'assets/logo.png');
        
        this.load.image('volver', 'assets/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Botones/volver_pulsado.png');
        this.load.image('1', 'assets/Botones/1.png');
        this.load.image('2', 'assets/Botones/2.png');;
        this.load.image('3', 'assets/Botones/3.png');
        
    }

    create(puntuacion) {
		var puntuacionPosX = this.sys.game.canvas.width / 2;
		var puntuacionPosY = this.sys.game.canvas.height / 2;
		var volverPosX = 200;
		var volverPosY = 50;
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
		//this.cameras.main.setZoom(ratio);
		
		
        this.add.image(640, 360, 'fondo');
		
		console.log(puntuacion);
		
		this.add.text(puntuacionPosX, puntuacionPosY, "Has acabado con " + puntuacion.toString() + " puntos, pog",  { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());
		
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

	clickButtonVolver() {
		//this.scale.off('resize');
		this.scene.stop("Game");
		this.scene.stop("Results");
        this.scene.start("Mainmenu");
    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.changeSpriteVolver());
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());
    }
    changeSpriteVolver() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
    }
}
