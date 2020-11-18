var buttEnviarCielo;
var buttEnviarInfierno;
var buttCerrar;
var buttBasura;
var textoSeleccionPedido;
var tablon;

var seleccionado; 

var configTextoMesa = {
	fontFamily: 'Sylfaen',
	fontSize: '16px',
	color: '#fff',
	stroke: '#000000',
	strokeThickness: 2,
	align: 'justify',  // 'left'|'center'|'right'|'justify'
	maxLines: 0,
	lineSpacing: 0,
	fixedWidth: 300,
	fixedHeight: 92 ,
	rtl: false,
	testString: '|MÉqgy',
	wordWrap: {
		width: 300,
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

class Mesa extends State{

	enter(delta, scene, jugador){
		jugador.enMesa = true;
        
        BorrarInventario(scene, jugador);
		if(!enPc){
			scene.zonaSwipe.setVisible(false);
			scene.zonaTarjetas.setVisible(false);
			scene.base.setVisible(false);
			scene.thumb.setVisible(false);
		}
		
        jugador.body.velocity.x = 0;
		
		tablon = scene.add.image(width / 2, height / 2, 'interfazMesa').setScrollFactor(0,0);
		
		var PosX0 = width / 2 - tablon.width / 2;
		var PosY0 = height / 2 - tablon.height / 2;

        for(var i = 0; i < jugador.inventario.length; i++){
            //Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
            var miObj = jugador.inventario[i].tipo;
			
            jugador.arrayMostrados.push(scene.add.sprite(width / 2 - 50 + (i / (limInventario - 1)) * 374.5, PosY0 + tablon.height - 75, miObj).setScale(1.5).setInteractive().setScrollFactor(0,0));
			//jugador.arrayInventario.push(that.add.sprite((width / 2 - 430) + (i / (limInventario - 1)) * 350, height - 50, jugador.inventario[i].tipo).setScrollFactor(0,0));

			jugador.arrayMostrados[i].on('pointerdown', this.OnPointerDown.bind(this, jugador.arrayMostrados[i]));
			jugador.arrayMostrados[i].on('pointerup', this.ClickObjeto.bind(this, i, jugador));
			jugador.arrayMostrados[i].on('pointerover', this.OnPointerOver.bind(this, jugador.arrayMostrados[i], scene));
			jugador.arrayMostrados[i].on('pointerout', this.OnPointerOut.bind(this, jugador.arrayMostrados[i], jugador.arraySeleccionados, i));
        }

		if(idioma.idioma.includes("es")){
			textoSeleccionPedido = scene.add.text(PosX0 + 50, PosY0 + 50, "Selecciona el pedido y crea el paquete", configTextoMesa).setScrollFactor(0,0);
		}else{
			textoSeleccionPedido = scene.add.text(PosX0 + 50, PosY0 + 50, "Choose the order and make the package", configTextoMesa).setScrollFactor(0,0);
		}
        
		
		for(var i = 0; i < arrayPedidos.length; i++){
            //Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
            var pedido = scene.add.text(PosX0 + 50, PosY0 + 90 + (i / (maxPedidos - 1)) * 155, arrayNombres[arrayPedidos[i].persona], configTexto).setInteractive().setScrollFactor(0,0);
 
			arrayPedidosMostrados.push(pedido);
			
			arrayPedidosMostrados[i].on('pointerdown', this.SeleccionarPedido.bind(this, i, jugador));
        }

        buttEnviarCielo = scene.add.sprite(PosX0 + tablon.width / 2 + 75, PosY0 + 80, 'botonEnviarCielo').setInteractive();
        buttEnviarInfierno = scene.add.sprite(PosX0 + tablon.width / 2 + 75, PosY0 + 160, 'botonEnviarInfierno').setInteractive();
        buttBasura = scene.add.sprite(PosX0 + tablon.width / 2 + 275, PosY0 + 120, 'botonEnviarBasura').setInteractive();
        
		buttEnviarCielo.on('pointerdown', () => {buttEnviarCielo.setTexture('botonEnviarCielo_pulsado')});
		buttEnviarCielo.on('pointerup', () => {buttEnviarCielo.setTexture('botonEnviarCielo'); this.Enviar(delta, scene, jugador, true)});
		buttEnviarCielo.on('pointerover', () => {if(scene.input.activePointer.isDown){buttEnviarCielo.setTexture('botonEnviarCielo_pulsado')}});
		buttEnviarCielo.on('pointerout', () => {buttEnviarCielo.setTexture('botonEnviarCielo')});
		
		buttEnviarInfierno.on('pointerdown', () => {buttEnviarInfierno.setTexture('botonEnviarInfierno_pulsado')});
		buttEnviarInfierno.on('pointerup', () => {buttEnviarInfierno.setTexture('botonEnviarInfierno'); this.Enviar(delta, scene, jugador, false)});
		buttEnviarInfierno.on('pointerover', () => {if(scene.input.activePointer.isDown){buttEnviarInfierno.setTexture('botonEnviarInfierno_pulsado')}});
		buttEnviarInfierno.on('pointerout', () => {buttEnviarInfierno.setTexture('botonEnviarInfierno')});
		
		buttBasura.on('pointerdown', () => {buttBasura.setTexture('botonEnviarBasura_pulsado')});
		buttBasura.on('pointerup', () => {buttBasura.setTexture('botonEnviarBasura'); this.Eliminar(delta, scene, jugador, false)});
		buttBasura.on('pointerover', () => {if(scene.input.activePointer.isDown){buttBasura.setTexture('botonEnviarBasura_pulsado')}});
		buttBasura.on('pointerout', () => {buttBasura.setTexture('botonEnviarBasura')});
		
		for(var i = 0; i < arrayTarjetas.length; i++){
			arrayTarjetas[i].setVisible(false);
		}
		
        jugador.accion = false;
		this.pedidoCorrecto = false;
		this.pedidoRealizado = false;
    }

	execute(delta, scene, jugador){
		//console.log(jugador.pedidoSeleccionado);
        //cuando salir de este estado
        if(jugador.accion){
			if(!enPc){
				scene.zonaSwipe.setVisible(true);
				scene.zonaTarjetas.setVisible(true);
				scene.base.setVisible(true);
				scene.thumb.setVisible(true);
			}
			
			console.log(this.pedidoRealizado);
			if(mapaActual == "tutorial" && this.pedidoRealizado){
				TerminarTutorial(scene, jugador, this.pedidoCorrecto);
			}
            RepresentarInventario(scene, jugador);
            jugador.stateMachine.transition(delta, "idle");
            jugador.accion = false;
			
			jugador.arraySeleccionados = new Array();
			jugador.pedidoSeleccionado = undefined;
			
			for(var i = 0; i < arrayTarjetas.length; i++){
				arrayTarjetas[i].setVisible(true)
				arrayTarjetas[i] = ColocarTarjeta(arrayTarjetas[i], i);
			}
			
			jugador.velActual = velJugador + (-velJugador / (2 * limInventario)) * jugador.inventario.length;
			
			jugador.enMesa = false;
			
            this.BorrarBotones(delta, jugador);
        }
    }
	
	OnPointerDown(objeto){
		objeto.setTint(0xBEBEBE);
	}
	
	OnPointerOver(objeto, scene){
		if(scene.input.activePointer.isDown){
			objeto.setTint(0xBEBEBE);
		}
	}
    
	OnPointerOut(objeto, seleccionados, i){
		if(seleccionados.includes(i)){
			objeto.setTint(0x616161);
		}else{
			objeto.clearTint();
		}
	}
	

	
    ClickObjeto (objetoActual, jugador){
        if(jugador.arraySeleccionados.includes(objetoActual)){
            //Falta meter cambio de sprite que indique que está seleccionado
            //
            //
            //
            jugador.arrayMostrados[objetoActual].clearTint();
            console.log("borrar " + jugador.inventario[objetoActual].tipo);
            var index = jugador.arraySeleccionados.indexOf(objetoActual);
            jugador.arraySeleccionados.splice(index, 1);
        }else{
            jugador.arrayMostrados[objetoActual].setTint(0x616161);
            jugador.arraySeleccionados.push(objetoActual);
        }
    
    }
	
	SeleccionarPedido(pedido, jugador){
		console.log(jugador.pedidoSeleccionado);
		if(jugador.pedidoSeleccionado == arrayPedidos[pedido]){
            arrayPedidosMostrados[pedido].clearTint();
			jugador.pedidoSeleccionado = undefined;
        }else{
			for(var i = 0; i < arrayPedidos.length; i++){
				arrayPedidosMostrados[i].clearTint();
			}
		
            arrayPedidosMostrados[pedido].setTint(0x616161);
			jugador.pedidoSeleccionado = arrayPedidos[pedido];
        }
		seleccionado = jugador.pedidoSeleccionado;
    }
	
    Enviar(delta, scene, jugador, destElegido){
        if(jugador.pedidoSeleccionado && jugador.arraySeleccionados.length > 0){
			this.pedidoRealizado = true;
			console.log(this.pedidoRealizado);
            var paquete = this.Eliminar(delta, scene, jugador, true);
            //hasta aqui
            this.pedidoCorrecto = CompararPedidos(paquete, jugador.pedidoSeleccionado, destElegido);
            //console.log("Puntuacion actual: " + puntuacionTotal);
            this.BorrarBotones(delta, jugador);
            this.enter(delta, scene, jugador);
        }
    }

    Eliminar(delta, scene, jugador, enviar){
		console.log("intento eliminar");
		if(jugador.arraySeleccionados.length > 0){
			console.log("Elimino");
			var paqueteCreado = [];
			// Lo hacemos de final a principio porque si hacemos el splice de principio a final nos cargamos el orden despues, de esta forma no intervenimos en los demás
			for(let a = jugador.arraySeleccionados.length - 1; a >= 0; a--){
				console.log(jugador.arraySeleccionados[a]);
				paqueteCreado.push(jugador.inventario[jugador.arraySeleccionados[a]].tipo);
				jugador.inventario.splice(jugador.arraySeleccionados[a], 1);
			}
			console.log("he creado el paquete: " + paqueteCreado);

			//Esto debe ir en Comparar paquete, esta aqui provisionalmente porque
			//Comparar paquete no va por la seleccion de pedidos
			// No va porque no habeis leido el codigo de comparar paquete

			for(let z = 0; z < jugador.arraySeleccionados.length; z++){
				jugador.arrayMostrados[jugador.arraySeleccionados[z]].destroy();
			}

			jugador.arraySeleccionados.splice(0, jugador.arraySeleccionados.length);

			if(!enviar){
				this.BorrarBotones(delta, jugador);
				this.enter(delta, scene, jugador);
			}

			return paqueteCreado;
		}
    }


    BorrarBotones(delta, jugador){
		buttEnviarCielo.off('pointerdown');
		buttEnviarInfierno.off('pointerdown');
		buttBasura.off('pointerdown');
		tablon.destroy();
        buttEnviarCielo.destroy();
        buttEnviarInfierno.destroy();
        buttBasura.destroy();
        textoSeleccionPedido.destroy();
        for(var i = 0; i < jugador.arrayMostrados.length; i++){
            jugador.arrayMostrados[i].off('pointerdown');
            jugador.arrayMostrados[i].destroy();
        }
        for(var i = 0; i < arrayPedidosMostrados.length; i++){
            arrayPedidosMostrados[i].off('pointerdown');
            arrayPedidosMostrados[i].destroy();
        }
        arrayPedidosMostrados.splice(0, arrayPedidosMostrados.length);
        jugador.arrayMostrados.splice(0, jugador.arrayMostrados.length);
    }
}