class Pausa extends Phaser.Scene {
    constructor() {
        super("Pausa");
    }

    create() {
        this.fondoPausa = this.add.image(width / 2, height / 2, 'fondoPausa');
		this.tablonPausa = this.add.image(width / 2, height / 2, 'tablonPausa');
        this.pausa = this.add.image(width / 2, height / 2 - this.tablonPausa.y / 2 + 30, 'pausa');
		
        this.reanudar = this.add.image(width / 2, height / 2, 'reanudar').setInteractive();
		this.reanudar.on('pointerdown', () => {this.reanudar.setTexture("reanudar_pulsado");});
        this.reanudar.on('pointerup', () => this.ReanudarJuego());
        this.reanudar.on('pointerover', () => {if(this.input.activePointer.isDown){this.reanudar.setTexture("reanudar_pulsado");}});
        this.reanudar.on('pointerout', () => {this.reanudar.setTexture("reanudar");});
		
        this.menu = this.add.image(width / 2, height / 2 + separacionBotones, 'menu').setInteractive();
		this.menu.on('pointerdown', () => {this.menu.setTexture("menu_pulsado");});
        this.menu.on('pointerup', () => this.VolverMenu());
        this.menu.on('pointerover', () => {if(this.input.activePointer.isDown){this.menu.setTexture("menu_pulsado");}});
        this.menu.on('pointerout', () => {this.menu.setTexture("menu");});
		
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
			
		this.cursors = this.input.keyboard.addKeys({
			pausa: controlesGuardados.pausa
		}); 
		
		this.cursors.pausa.on('down', function() {
			this.ReanudarJuego()
		}, this);
    }
	
	ReanudarJuego(){
		for(var i = 0; i < arrayTarjetas.length; i++){
				arrayTarjetas[i].setVisible(true);
			}
	
		this.scene.resume("Game");
		this.scene.stop("Pausa");
	}
	
	VolverMenu(){
		this.cameras.main.fadeOut(valorFade);
	
		this.cameras.main.on('camerafadeoutcomplete', () => {this.scene.stop("Game"); this.scene.start("Mainmenu");});
		
	}
}
