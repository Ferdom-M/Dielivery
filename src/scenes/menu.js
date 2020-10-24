// JavaScript source code
var jugarPosX = 300;
var jugarPosY = 350;
var comoJugarPosX = 300;
var comoJugarPosY = 450;
var creditosPosX = 300;
var creditosPosY = 550;
var volverPosX = 200;
var volverPosY = 50;

var ratio;

class Mainmenu extends Phaser.Scene {

    constructor() {
        super("Mainmenu");
    }

    preload() {
        this.load.image('fondo', 'assets/sky.jpeg');
        this.load.image('logo', 'assets/logo.png');
        
        this.load.image('jugar', 'assets/Botones/jugar.png');
        this.load.image('jugar_pulsado', 'assets/Botones/jugar_pulsado.png');;
        this.load.image('creditos', 'assets/Botones/creditos.png');
        this.load.image('creditos_pulsado', 'assets/Botones/creditos_pulsados.png');
        this.load.image('como_jugar', 'assets/Botones/como_jugar.png');
        this.load.image('como_jugar_pulsado', 'assets/Botones/como_jugar_pulsado.png');
    }
	
    create() {
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
		//this.cameras.main.setZoom(ratio);
		
		
        this.add.image(640, 360, 'fondo');
        this.add.image(300, 150, 'logo').setScale(0.4);

        this.buttonJugar = this.add.sprite(jugarPosX, jugarPosY, 'jugar').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerover', () => this.changeSpriteJugarPulsado());
        this.buttonJugar.on('pointerup', () => this.changeSpriteJugar());

        this.buttonComoJugar = this.add.sprite(comoJugarPosX, comoJugarPosY, 'como_jugar').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerover', () => this.changeSpriteComoJugarPulsado());
        this.buttonComoJugar.on('pointerup', () => this.changeSpriteComoJugar());

        this.buttonCreditos = this.add.sprite(creditosPosX, creditosPosY, 'creditos').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerover', () => this.changeSpriteCreditosPulsado());
        this.buttonCreditos.on('pointerup', () => this.changeSpriteCreditos());

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
	
    clickButtonJugar(){
		//this.scale.off('resize');
        this.scene.start("LevelSelect");
    }
    clickButtonCreditos(){
		//this.scale.off('resize');
        this.scene.start("creditos");
    }
    clickButtonComoJugar(){
		//this.scale.off('resize');
        this.scene.start("ComoJugar");
    }



    changeSpriteJugarPulsado() {
        this.buttonJugar.destroy();
        this.buttonJugar = this.add.sprite(jugarPosX, jugarPosY, 'jugar_pulsado').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.changeSpriteJugar());
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerout', () => this.changeSpriteJugar());
    }
	changeSpriteJugar() {
        this.buttonJugar.destroy();
        this.buttonJugar = this.add.sprite(jugarPosX, jugarPosY, 'jugar').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerover', () => this.changeSpriteJugarPulsado());
        this.buttonJugar.on('pointerup', () => this.changeSpriteJugar());
    }
	
	changeSpriteComoJugarPulsado() {
        this.buttonComoJugar.destroy();
        this.buttonComoJugar = this.add.sprite(comoJugarPosX, comoJugarPosY, 'como_jugar_pulsado').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.changeSpriteComoJugar());
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerout', () => this.changeSpriteComoJugar());

    }
    changeSpriteComoJugar() {
        this.buttonComoJugar.destroy();
        this.buttonComoJugar = this.add.sprite(comoJugarPosX, comoJugarPosY, 'como_jugar').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerover', () => this.changeSpriteComoJugarPulsado());
        this.buttonComoJugar.on('pointerup', () => this.changeSpriteJugar());

    }
    
	changeSpriteCreditosPulsado() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(creditosPosX, creditosPosY, 'creditos_pulsado').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.changeSpriteCreditos());
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerout', () => this.changeSpriteCreditos());
    }
	changeSpriteCreditos() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(creditosPosX, creditosPosY, 'creditos').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerover', () => this.changeSpriteCreditosPulsado());
        this.buttonCreditos.on('pointerup', () => this.changeSpriteJugar());

    }
}
