var buttEnviarCielo;
var buttEnviarInfierno;
var buttCerrar;
var buttBasura;
var textoSeleccionPedido;

class Mesa extends State{

	enter(delta, scene, jugador){
		console.log("Estado mesa");
		
        jugador.body.velocity.x = 0;
    

        for(var i = 0; i < jugador.inventario.length; i++){
            //Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
            var miObj = jugador.inventario[i].tipo;
			
            jugador.arrayMostrados.push(scene.add.sprite(jugador.x + tileSize + 75*i, jugador.y-tileSize - 40, miObj).setScale(1.5).setInteractive());
            jugador.arrayMostrados[i].on("pointerdown", this.ClickObjeto.bind(this, i, jugador));
        }

        textoSeleccionPedido = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 200, "Selecciona tu pedido", {fontFamily: 'Georgia, Times, serif'});
		
		for(var i = 0; i < arrayPedidos.length; i++){
            //Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
            var pedido = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - (150 - 25 * i), arrayNombres[arrayPedidos[i].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                
			arrayPedidosMostrados.push(pedido);
            arrayPedidosMostrados[i].on("pointerdown", this.SeleccionarPedido.bind(this, i, jugador));
        }

        buttEnviarCielo = scene.add.sprite(jugador.x +70 + tileSize, jugador.y - 150, 'botonEnviar').setScale(1.5).setInteractive();
        buttEnviarInfierno = scene.add.sprite(jugador.x +130 + tileSize, jugador.y - 150, 'botonEnviar').setScale(1.5).setInteractive();
        buttBasura = scene.add.sprite(jugador.x + 200 + tileSize, jugador.y - 150, 'botonEnviar').setScale(1.5).setInteractive();
        buttEnviarCielo.on('pointerdown', () => this.Enviar(delta, scene, jugador, true));
        buttEnviarInfierno.on('pointerdown', () => this.Enviar(delta, scene, jugador, false));
        buttBasura.on('pointerdown', () => this.Eliminar(delta, scene, jugador, false));


        jugador.accion = false;
    }
    

	execute(delta, scene, jugador){
        //cuando salir de este estado
        if(jugador.accion){
            console.log("salir mesa");
            jugador.stateMachine.transition(delta, "idle");
            jugador.accion = false;
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

    Enviar(delta, scene, jugador, destElegido){
        if(jugador.pedidoSeleccionado){
            var paquete = this.Eliminar(jugador, true);
            //hasta aqui
            CompararPedidos(paquete, jugador.pedidoSeleccionado, destElegido);
            //console.log("Puntuacion actual: " + puntuacionTotal);
            this.BorrarBotones(delta, jugador);
            this.enter(delta, scene, jugador);
        }
    }

    Eliminar(delta, scene, jugador, enviar){
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


    BorrarBotones(delta, jugador){
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

    SeleccionarPedido(pedido, jugador){
        jugador.pedidoSeleccionado = arrayPedidos[pedido];
    }
}