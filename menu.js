// JavaScript source code
var jugarPosX = 300;
var jugarPosY = 350;
var comoJugarPosX = 300;
var comoJugarPosY = 450;
var creditosPosX = 300;
var creditosPosY = 550;
var volverPosX = 200;
var volverPosY = 50;

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
        this.load.image('volver', 'assets/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Botones/volver_pulsado.png');
		
        this.load.image('vicente', 'assets/Sprites Personajes/boceto prueba dielivery.png');
		this.load.spritesheet('anim_andar', 'assets/Sprites Personajes/Spritesheet Andar.png', {frameWidth: 32, frameHeight: 64});
		//this.load.spritesheet('anim_saltar', 'assets/Sprites Personajes/Spritesheet Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_InicioSalto', 'assets/Sprites Personajes/Spritesheet Inicio Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Idle', 'assets/Sprites Personajes/Spritesheet Idle.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_CaidaSalto', 'assets/Sprites Personajes/Spritesheet Caida Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_AterrizajeSalto', 'assets/Sprites Personajes/Spritesheet Aterrizaje Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Dash', 'assets/Sprites Personajes/Spritesheet Dash.png', {frameWidth: 32, frameHeight: 64});
		
		this.load.tilemapTiledJSON("mapComoJugar", "assets/Mapas/como jugar.json");
		this.load.image("tiles", "assets/Mapas/Spritesheets/spritesheet_tiles_extruded.png");
    }

    create() {
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

    clickButtonJugar(){
        this.scene.start("prueba");
    }
    clickButtonCreditos(){
        this.scene.switch("creditos");
    }
    clickButtonComoJugar(){
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



class ComoJugar extends Phaser.Scene {

    constructor() {
        super("ComoJugar");
    }
    create() {
        this.add.image(640, 360, 'fondo');

        
        
		GenerarMundo(this, "mapComoJugar");
		GenerarJugador(this, jugadores[0], 300, 200);
		InicializarCursores(this);
		
		// Boton volver
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());

    }

    update(time, delta) {
        // Según el tile que tengamos alrededor tendremos un estado u otro. Ej suelo normal o resbaladizo
		ComprobarEstados(jugadores[0], this);
		// Al volver al suelo reiniciamos valores como el dash aereo, etc
		ReiniciarValores(jugadores[0]);
		
		ProcesarMovimiento(delta, jugadores[0]);
		ProcesarDash(delta, jugadores[0]);
		AccionSalto(delta, jugadores[0], this);
		SubirEscalon(delta, jugadores[0]);
    }
	
    clickButtonVolver() {
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

// JavaScript source code
class creditos extends Phaser.Scene {

    constructor() {
        super("creditos");
    }

    create() {
        this.add.image(640, 360, 'fondo');


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

    clickButtonVolver() {
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