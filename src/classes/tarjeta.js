class Tarjeta extends Phaser.GameObjects.Container{
	constructor(scene, x, y, pedido) {
		var imagenes = new Array();
		
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
		
		imagenes.push(scene.add.text(-10, -100, arrayNombres[pedido.persona]));
		imagenes.push(scene.add.text(-10, -50, arrayCausaMuerte[pedido.persona]));
		
		var tituloObjetos;
		if(idioma.idioma.includes("es")){
			tituloObjetos = "Ofrendas:"
		}else{
			tituloObjetos = "Offerings:";
		}
		imagenes.push(scene.add.text(-147, 39, tituloObjetos));
		imagenes.push(scene.add.image(-95, -50, "perfil" + (pedido.persona)).setInteractive());
        super(scene, x, y, imagenes);
        
		this.imagenes = imagenes;
		
        scene.add.existing(this);
    }
}