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
            jugador.arrayMostrados[i] = scene.add.sprite(jugador.x + tileSize, jugador.y-tileSize - 150*i, miObj).setScale(2).setInteractive();
            jugador.arrayMostrados[i].on('pointerdown', () => this.ClickObjeto(miObj, jugador));
        }
        
        console.log(jugador.inventario);


        buttEnviarCielo = scene.add.sprite(jugador.x +100 + tileSize, jugador.y-tileSize - 150*i, 'botonEnviar').setScale(1.5).setInteractive();
        buttEnviarInfierno = scene.add.sprite(jugador.x +100 + tileSize, jugador.y - 150*i + 40, 'botonEnviar').setScale(1.5).setInteractive();
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
            this.BorrarBotones();
        }
    }
    
    ClickObjeto(objetoActual, jugador){
        //if(jugador.arraySeleccionados.includes(objetoActual.toString())){
        if(jugador.arraySeleccionados.includes(objetoActual)){
            //Falta meter cambio de sprite que indique que está seleccionado
            //
            //
            //
            var index = jugador.arraySeleccionados.indexOf(objetoActual);
            jugador.arraySeleccionados.splice(index, 1);
            console.log("Seleccionados " + jugador.arraySeleccionados);
        }else{
            jugador.arraySeleccionados.push(objetoActual);
            console.log("Seleccionados " + jugador.arraySeleccionados);
        }
    
    }

    Enviar(jugador, destElegido){
        console.log(CompararPedidos(jugador.arraySeleccionados, jugador.pedidoSeleccionado, destElegido));
    }

    BorrarBotones(delta, jugador){
        buttEnviarCielo.destroy();
        buttEnviarInfierno.destroy();
    }
}