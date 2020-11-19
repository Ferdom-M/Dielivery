class ComienzoTutorial extends Phaser.Scene {
    constructor() {
        super("ComienzoTutorial");
    }

    create() {
        this.fondoPausa = this.add.image(width / 2, height / 2, 'fondoPausa');
		this.tablonPausa = this.add.image(width / 2, height / 2, 'tablonPausa');
		
		var texto;
		if(idioma.idioma.includes("es")){
			texto = "¡Te damos la bienvenida a Dielivery!\n¿Quieres ser el empleado del mes? Ve siguiendo los carteles de la pared y aprende cómo.\nTú misión es enviar pedidos recogiendo las ofrendas que cada cliente te pide";
		}else{
			texto = "Welcome to Dielivery!\nDo you want to become the employee of the month? Follow the signs on the wall and learn how to.\nYour mission is to send packages while gathering the offerings that every client has";
		}
		var config = {
			fontFamily: 'Sylfaen',
			fontSize: '18px',
			color: '#fff',
			stroke: '#000000',
			strokeThickness: 0.5,
			align: 'justify',  // 'left'|'center'|'right'|'justify'
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
		
        this.confirmar = this.add.image(width / 2, height / 2 + separacionBotones, 'continuar').setInteractive();
		this.confirmar.on('pointerdown', () => {this.confirmar.setTexture("continuar_pulsado");});
        this.confirmar.on('pointerup', () => this.ReanudarJuego());
        this.confirmar.on('pointerover', () => {if(this.input.activePointer.isDown){this.confirmar.setTexture("continuar_pulsado");}});
        this.confirmar.on('pointerout', () => {this.confirmar.setTexture("continuar");});
    }
	
	ReanudarJuego(){
		this.scene.resume("Game");
		this.scene.stop("ComienzoTutorial");
	
		
	}
}
