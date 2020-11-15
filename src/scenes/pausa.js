class Pausa extends Phaser.Scene {
    constructor() {
        super("Pausa");
    }

    create() {
        this.add.image(width / 2, height / 2, 'pausa');
        this.add.image(width / 2, height / 2, 'pausaSprite');

        var PKey = this.input.keyboard.addKey('P');
        PKey.on('down', () => {
			for(var i = 0; i < arrayTarjetas.length; i++){
				arrayTarjetas[i].setVisible(true);
			}
		
			this.scene.resume("Game");
			this.scene.stop("Pausa");
		}, this);

        var NKey = this.input.keyboard.addKey('N');
        NKey.on('down', () => {
			this.cameras.main.fadeOut(valorFade);
	
			this.cameras.main.on('camerafadeoutcomplete', () => {this.scene.stop("Game"); this.scene.start("Mainmenu");});
            
		}, this);
    }
}
