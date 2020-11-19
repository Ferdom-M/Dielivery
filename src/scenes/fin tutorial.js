var tutorialCorrecto = false;

class FinTutorial extends Phaser.Scene {
    constructor() {
        super("FinTutorial");
    }

    create() {
		console.log("pito");
        this.fondoPausa = this.add.image(width / 2, height / 2, 'fondoPausa');
		this.tablonPausa = this.add.image(width / 2, height / 2, 'tablonPausa');
		
		var texto;
		console.log(tutorialCorrecto);
		if(tutorialCorrecto){
			if(idioma.idioma.includes("es")){
				texto = "¡Fantástico! ¡Ahora tienes todo lo que necesitas para conseguir ser el empleado del mes! ¡Pásatelo bien en las instalaciones de Dielivery!";
			}else{
				texto = "Awesome! Now you got all you need to become the employee of the month! Have fun in Dielivery's facilities!";
			}
		}else{
			if(idioma.idioma.includes("es")){
				texto = "Bueno, no has completado el pedido correctamente, pero seguro que se te da mejor la próxima vez. ¡Pásatelo bien en las instalaciones de Dielivery!";
			}else{
				texto = "Well, you didn't make the order correctly, but you will make it better next time for sure! Have fun in Dielivery's facilities!";
			}
		}
		var config = {
			fontFamily: 'Sylfaen',
			fontSize: '18px',
			color: '#fff',
			stroke: '#000000',
			strokeThickness: 0.5,
			align: 'left',  // 'left'|'center'|'right'|'justify'
			maxLines: 0,
			lineSpacing: 0,
			fixedWidth: 298,
			fixedHeight: 300,
			rtl: false,
			testString: '|MÉqgy',
			wordWrap: {
				width: 298,
				callback: null,
				callbackScope: null,
				useAdvancedWrap: false
			},
			metrics: false
			// metrics: {
			//     ascent: 0,
			//     descent: 0,
			//     fontSize: 0
			// }
		};
		
		this.textoFinal = this.add.text(width / 2 - 149, height / 2 - 150, texto, config);
		
		console.log(this.textoFinal);
		
        this.menu = this.add.image(width / 2, height / 2 + separacionBotones, 'menu').setInteractive();
		this.menu.on('pointerdown', () => {this.menu.setTexture("menu_pulsado");});
        this.menu.on('pointerup', () => this.VolverMenu());
        this.menu.on('pointerover', () => {if(this.input.activePointer.isDown){this.menu.setTexture("menu_pulsado");}});
        this.menu.on('pointerout', () => {this.menu.setTexture("menu");});
    }
	
	VolverMenu(){
		this.cameras.main.fadeOut(valorFade);
		this.sound.stopAll();
		this.sound.play("s_menu");
		this.cameras.main.on('camerafadeoutcomplete', () => {this.scene.stop("Game"); this.scene.start("Mainmenu");});
		
	}
}
