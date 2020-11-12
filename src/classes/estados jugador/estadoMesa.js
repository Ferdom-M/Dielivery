var buttEnviarCielo;
var buttEnviarInfierno;
var buttCerrar;
var buttBasura;
var textoSeleccionPedido;
var tablon;

class Mesa extends State{

	enter(delta, scene, jugador){
		jugador.enMesa = true;
        
        BorrarInventario(scene, jugador);

        jugador.body.velocity.x = 0;
		
		tablon = scene.add.image(width / 2, height / 2, 'interfazMesa').setScrollFactor(0,0);
		
		var PosX0 = width / 2 - tablon.width / 2;
		var PosY0 = height / 2 - tablon.height / 2;

        for(var i = 0; i < jugador.inventario.length; i++){
            //Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
            var miObj = jugador.inventario[i].tipo;
			
            jugador.arrayMostrados.push(scene.add.sprite(width / 2 - 50 + (i / (limInventario - 1)) * 374.5, PosY0 + tablon.height - 75, miObj).setScale(1.5).setInteractive().setScrollFactor(0,0));
			//jugador.arrayInventario.push(that.add.sprite((width / 2 - 430) + (i / (limInventario - 1)) * 350, height - 50, jugador.inventario[i].tipo).setScrollFactor(0,0));
            jugador.arrayMostrados[i].on("pointerdown", this.ClickObjeto.bind(this, i, jugador));
        }

        textoSeleccionPedido = scene.add.text(PosX0 + 50, PosY0 + 50, "Selecciona el pedido y crea el paquete", {fontFamily: 'Georgia, Times, serif'}).setScrollFactor(0,0);
		
		for(var i = 0; i < arrayPedidos.length; i++){
            //Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
            var pedido = scene.add.text(PosX0 + 50, PosY0 + 90 + (i / (maxPedidos - 1)) * 155, arrayNombres[arrayPedidos[i].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px'}).setInteractive().setScrollFactor(0,0);
 
			arrayPedidosMostrados.push(pedido);
            arrayPedidosMostrados[i].on("pointerdown", this.SeleccionarPedido.bind(this, i, jugador));
        }

        buttEnviarCielo = scene.add.sprite(PosX0 + tablon.width / 2 + 100, PosY0 + 100, 'botonEnviar').setScale(1.5).setInteractive();
        buttEnviarInfierno = scene.add.sprite(PosX0 + tablon.width / 2 + 100, PosY0 + 160, 'botonEnviar').setScale(1.5).setInteractive();
        buttBasura = scene.add.sprite(PosX0 + tablon.width / 2 + 250, PosY0 + 130, 'botonEnviar').setScale(1.5).setInteractive();
        
		buttEnviarCielo.on('pointerdown', () => this.Enviar(delta, scene, jugador, true));
        buttEnviarInfierno.on('pointerdown', () => this.Enviar(delta, scene, jugador, false));
        buttBasura.on('pointerdown', () => this.Eliminar(delta, scene, jugador, false));


		for(var i = 0; i < arrayTarjetas.length; i++){
			arrayTarjetas[i].setPosition(-1000, -1000);
		}
		
        jugador.accion = false;
    }
    

	execute(delta, scene, jugador){
        //cuando salir de este estado
        if(jugador.accion){
            console.log("salir mesa");
            RepresentarInventario(scene, jugador);
            jugador.stateMachine.transition(delta, "idle");
            jugador.accion = false;
			
			jugador.arraySeleccionados = new Array();
			jugador.pedidoSeleccionado = undefined;
			
			for(var i = 0; i < arrayTarjetas.length; i++){
				arrayTarjetas[i] = ColocarTarjeta(arrayTarjetas[i], i);
			}
			
			jugador.velActual = velJugador + (-velJugador / (2 * limInventario)) * jugador.inventario.length;
			
			jugador.enMesa = false;
			
            this.BorrarBotones(delta, jugador);
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
		if(jugador.pedidoSeleccionado == arrayPedidos[pedido]){
            //Falta meter cambio de sprite que indique que está seleccionado
            //
            //
            //
            arrayPedidosMostrados[pedido].clearTint();
			jugador.pedidoSeleccionado = undefined;
        }else{
			for(var i = 0; i < arrayPedidos.length; i++){
				arrayPedidosMostrados[i].clearTint();
			}
		
            arrayPedidosMostrados[pedido].setTint(0x616161);
			jugador.pedidoSeleccionado = arrayPedidos[pedido];
        }
    }
	
    Enviar(delta, scene, jugador, destElegido){
        if(jugador.pedidoSeleccionado && jugador.arraySeleccionados.length > 0){
            var paquete = this.Eliminar(delta, scene, jugador, true);
            //hasta aqui
            CompararPedidos(paquete, jugador.pedidoSeleccionado, destElegido);
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
			for(let a = 0; a < jugador.arraySeleccionados.length; a++){
				paqueteCreado.push(jugador.inventario[jugador.arraySeleccionados[a]].tipo);
			}
			console.log("he creado el paquete: " + paqueteCreado);

			//Esto debe ir en Comparar paquete, esta aqui provisionalmente porque
			//Comparar paquete no va por la seleccion de pedidos
			// No va porque no habeis leido el codigo de comparar paquete
			for(let i = 0; i < paqueteCreado.length; i++){
				for(let j = 0; j < jugador.inventario.length; j++){
					console.log("Comparando: " + jugador.inventario[j].tipo + " y " + paqueteCreado[i]);
					if(jugador.inventario[j].tipo == paqueteCreado[i]){
						console.log("coindice el elemento: " + j + ", " + jugador.inventario[j].tipo);
						jugador.inventario.splice(j, 1);
					}
				}
			}
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
		tablon.destroy();
        buttEnviarCielo.destroy();
        buttEnviarInfierno.destroy();
        buttBasura.destroy();
        textoSeleccionPedido.destroy();
        for(var i = 0; i < jugador.arrayMostrados.length; i++){
            jugador.arrayMostrados[i].destroy();
        }
        for(var i = 0; i < arrayPedidosMostrados.length; i++){
            arrayPedidosMostrados[i].destroy();
        }
        arrayPedidosMostrados.splice(0, arrayPedidosMostrados.length);
        jugador.arrayMostrados.splice(0, jugador.arrayMostrados.length);
    }
}