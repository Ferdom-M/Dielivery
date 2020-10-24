var buttEnviarCielo;
var buttEnviarInfierno;
var buttCerrar;

class Mesa extends State{

	enter(delta, scene, jugador){
		console.log("Estado mesa");
		
        jugador.body.velocity.x = 0;
    

        for(var i = 0; i<jugador.inventario.length; i++){
            //Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
            var miObj = jugador.inventario[i].tipo;
            jugador.arrayMostrados[i] = scene.add.sprite(jugador.x + tileSize + 75*i, jugador.y-tileSize - 40, miObj).setScale(1.5).setInteractive();
            jugador.arrayMostrados[i].on('pointerdown', () => this.ClickObjeto(miObj, jugador));

        }
        
        console.log(jugador.inventario);


        buttEnviarCielo = scene.add.sprite(jugador.x +70 + tileSize, jugador.y - 150, 'botonEnviar').setScale(1.5).setInteractive();
        buttEnviarInfierno = scene.add.sprite(jugador.x +130 + tileSize, jugador.y - 150, 'botonEnviar').setScale(1.5).setInteractive();
        buttEnviarCielo.on('pointerdown', () => this.Enviar(jugador, true));
        buttEnviarInfierno.on('pointerdown', () => this.Enviar(jugador, false));


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
    
    ClickObjeto(objetoActual, jugador){
        console.log(objetoActual);
        if(jugador.arraySeleccionados.includes(objetoActual)){
            //Falta meter cambio de sprite que indique que está seleccionado
            //
            //
            //
            console.log("borrar");
            var index = jugador.arraySeleccionados.indexOf(objetoActual);
            jugador.arraySeleccionados.splice(index, 1);
        }else{
            jugador.arraySeleccionados.push(objetoActual);
        }
    
    }

    Enviar(jugador, destElegido){
        console.log(CompararPedidos(jugador.arraySeleccionados, jugador.pedidoSeleccionado, destElegido));
    }

    BorrarBotones(delta, jugador){
        buttEnviarCielo.destroy();
        buttEnviarInfierno.destroy();
        for(var i = 0; i < jugador.arrayMostrados.length; i++){
            jugador.arrayMostrados[i].destroy();
        }
    }
}