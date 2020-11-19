
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
	}

	create() {
		this.cameras.main.fadeIn(valorFade);
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		var medio = width / 2;
		var offset = 180;
		
        this.fondo = this.add.image(medio, height / 2, 'fondo');
		this.fondo.setDisplaySize(width, height);
		this.tablon = this.add.image(medio, height / 2, 'tablonCreditos');
		this.placa_fer = this.add.image(medio - offset, height / 1.85, 'placa_fer').setInteractive();
		this.placa_raul = this.add.image(medio - offset, height / 1.19, 'placa_raul').setInteractive();
		this.placa_leggnas = this.add.image(medio, height / 1.85, 'placa_leggnas').setInteractive();
		this.placa_nacho = this.add.image(medio, height / 1.19, 'placa_nacho');
		this.placa_nou = this.add.image((medio) + offset, height / 1.85, 'placa_nou').setInteractive();
		this.placa_dvd = this.add.image(medio + offset, height / 1.19, 'placa_dvd').setInteractive();

		this.placa_leggnas.on('pointerdown', () => {window.open("https://twitter.com/AngelSerra_", '_blank');});
		this.placa_dvd.on('pointerdown', () => {window.open("https://twitter.com/dvd_arts", '_blank');});
		this.placa_fer.on('pointerdown', () => {window.open("https://twitter.com/m_ferdom", '_blank');});
		this.placa_nou.on('pointerdown', () => {window.open("https://twitter.com/nouconcept", '_blank');});
		this.placa_raul.on('pointerdown', () => {window.open("https://twitter.com/raul_yebenes3", '_blank');});
		
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setInteractive();
		//this.buttonVolver.on('pointerdown', () => {window.open("https://twitter.com/SlytrickStudio", '_blank');});
		this.buttonVolver.on('pointerdown', () => {this.buttonVolver.setTexture("volver_pulsado");});
        this.buttonVolver.on('pointerup', () => PasarEscena(this, "Mainmenu"));
        this.buttonVolver.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonVolver.setTexture("volver_pulsado");}});
		this.buttonVolver.on('pointerout', () => {this.buttonVolver.setTexture("volver");});

    }

	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
}