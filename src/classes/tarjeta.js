var configTexto = {
			fontFamily: 'Sylfaen',
			fontSize: '18px',
			color: '#fff',
			stroke: '#000000',
			strokeThickness: 2,
			align: 'left',  // 'left'|'center'|'right'|'justify'
			maxLines: 0,
			lineSpacing: 0,
			fixedWidth: 198,
			fixedHeight: 92 ,
			rtl: false,
			testString: '|MÉqgy',
			wordWrap: {
				width: 198,
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

class Tarjeta extends Phaser.GameObjects.Container{
	constructor(scene, x, y, pedido) {
		var imagenes = new Array();
		
		var tituloObjetos;
		if(idioma.idioma.includes("es")){
			tituloObjetos = "Ofrendas:"
		}else{
			tituloObjetos = "Offerings:";
		}
		
		if(pedido.destinatario){
			imagenes.push(scene.add.image(0, 0, "cielo" + pedido.numObjetos).setInteractive());
		}else{
			imagenes.push(scene.add.image(0, 0, "infierno" + pedido.numObjetos).setInteractive());
		}
		
		for(var i = 0; i < pedido.numObjetos; i++){
			imagenes.push(scene.add.image(-123 + i * 84, 88, pedido.objetos[i].tipo));
		}
		/*
		this.imagenes.push(scene.add.image(0, 0, 'persona' + pedido.persona));
		*/
		
		imagenes.push(scene.add.text(-10, -104, arrayNombres[pedido.persona], configTexto).setFontStyle('bold'));
		imagenes.push(scene.add.text(-10, -60, arrayCausaMuerte[pedido.persona], configTexto));
		imagenes.push(scene.add.text(-150, 30, tituloObjetos, configTexto).setFontStyle('bold').setFontSize('14px'));
		
		imagenes.push(scene.add.image(-95, -50, "perfil" + (pedido.persona)).setInteractive());
        super(scene, x, y, imagenes);
        
		this.imagenes = imagenes;
		
        scene.add.existing(this);
    }
}