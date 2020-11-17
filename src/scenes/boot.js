class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }
    preload() {
		this.load.spritesheet('carga', 'assets/Mapas/Spritesheets/spritesheet_calavera.png', {frameWidth: 81, frameHeight: 77});
		
    }
	
    create() {
		if(this.sys.game.device.os.desktop){
			enPc = true;
		}else{
			enPc = false;
		}
		this.scene.start('Preload');
    }

	
}