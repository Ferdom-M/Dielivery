class ComoJugar extends Phaser.Scene {

    constructor() {
        super("ComoJugar");
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
        this.load.image('fondo', 'assets/sky.jpeg');
        
        this.load.image('volver', 'assets/Botones/volver.png');
        this.load.image('volver_pulsado', 'assets/Botones/volver_pulsado.png');
		
		// Sonidos
		this.load.audio('s_pasos', 'assets/Sonidos/s_pasos.wav');
		this.load.audio('s_pasosMojados', 'assets/Sonidos/s_pasosMojado.wav');
		this.load.audio('s_botellas', 'assets/Sonidos/s_botellas.wav');
		this.load.audio('s_carta', 'assets/Sonidos/s_carta.wav');
		this.load.audio('s_flores', 'assets/Sonidos/s_flores.wav');
		this.load.audio('s_joyero', 'assets/Sonidos/s_joyero.wav');
		this.load.audio('s_extTarjeta', 'assets/Sonidos/s_extTarjeta.wav');
		this.load.audio('s_guarTarjeta', 'assets/Sonidos/s_guarTarjeta.wav');
		this.load.audio('s_baulRecuerdos', 'assets/Sonidos/s_baulRecuerdos.wav');
		this.load.audio('s_dash', 'assets/Sonidos/s_dash.wav');
		this.load.audio('s_escalera', 'assets/Sonidos/s_escalera.wav');
		this.load.audio('s_salto', 'assets/Sonidos/s_salto.wav');
		
		this.load.spritesheet('anim_andar', 'assets/Sprites Personajes/Spritesheet Andar.png', {frameWidth: 32, frameHeight: 64});
		//this.load.spritesheet('anim_saltar', 'assets/Sprites Personajes/Spritesheet Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_InicioSalto', 'assets/Sprites Personajes/Spritesheet Inicio Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Idle', 'assets/Sprites Personajes/Spritesheet Idle.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_CaidaSalto', 'assets/Sprites Personajes/Spritesheet Caida Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_AterrizajeSalto', 'assets/Sprites Personajes/Spritesheet Aterrizaje Salto.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Dash', 'assets/Sprites Personajes/Spritesheet Dash.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Trepar', 'assets/Sprites Personajes/Spritesheet Trepar Nuevo.png', {frameWidth: 32, frameHeight: 64});
		this.load.spritesheet('anim_Dano', 'assets/Sprites Personajes/Spritesheet Dano.png', {frameWidth: 32, frameHeight: 64});
		
		this.load.tilemapTiledJSON("mapComoJugar", "assets/Mapas/como jugar.json");
		this.load.image("tiles", "assets/Mapas/Spritesheets/spritesheet definitiva (en curso).png");
    }
	
    create() {
		//this.resizeCamera();
		//this.scale.on('resize', () => this.resizeCamera());
		
        this.add.image(640, 360, 'fondo');

		GenerarMundo(this, "mapComoJugar");
		
		this.jugador = new Jugador({scene: this, x: 300, y: 200, key: 'anim_andar'});
		
		
		InicializarCursores(this, this.jugador);
		
		
		// Boton volver
		this.buttonVolver = this.add.sprite(volverPosX, volverPosY, 'volver').setScale(0.5).setInteractive();
		this.buttonVolver.on('pointerdown', () => {this.buttonVolver.setTexture("volver_pulsado");});
        this.buttonVolver.on('pointerup', () => PasarEscena(this, "Mainmenu"));
        this.buttonVolver.on('pointerover', () => {if(this.input.activePointer.isDown){this.buttonVolver.setTexture("volver_pulsado");}});
        this.buttonVolver.on('pointerout', () => {this.buttonVolver.setTexture("volver");});
    }

    update(time, delta) {
        this.jugador.update(time, delta);
    }
	
	resizeCamera(){
		var ratio = this.sys.game.canvas.height / 720;
		
		this.cameras.main.setZoom(ratio);
	}
}