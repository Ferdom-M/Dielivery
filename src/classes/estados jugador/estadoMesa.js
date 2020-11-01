var buttEnviarCielo;
var buttEnviarInfierno;
var buttCerrar;

class Mesa extends State{

	enter(delta, scene, jugador){
		console.log("Estado mesa");
		
        jugador.body.velocity.x = 0;
    

        /*for(var i = 0; i<jugador.inventario.length; i++){
            //Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
            var miObj = jugador.inventario[i].tipo;
            var indice = i;
            jugador.arrayMostrados[i] = scene.add.sprite(jugador.x + tileSize + 75*i, jugador.y-tileSize - 40, miObj).setScale(1.5).setInteractive();
            jugador.arrayMostrados[i].on('pointerdown', () => this.ClickObjeto(miObj, jugador, indice));

        }*/

        switch(jugador.inventario.length){
            case 1:
                var obj1 = scene.add.sprite(jugador.x + tileSize, jugador.y-tileSize - 40, jugador.inventario[0].tipo).setScale(1.5).setInteractive();
                obj1.on('pointerdown', () => this.ClickObjeto(0, jugador));
                jugador.arrayMostrados.push(obj1);
                break;
            case 2:
                var obj1 = scene.add.sprite(jugador.x + tileSize, jugador.y-tileSize - 40, jugador.inventario[0].tipo).setScale(1.5).setInteractive();
                obj1.on('pointerdown', () => this.ClickObjeto(0, jugador));
                jugador.arrayMostrados.push(obj1);
                var obj2 = scene.add.sprite(jugador.x + tileSize + 75, jugador.y-tileSize - 40, jugador.inventario[1].tipo).setScale(1.5).setInteractive();
                obj2.on('pointerdown', () => this.ClickObjeto(1, jugador));
                jugador.arrayMostrados.push(obj2);
                break;
            case 3:
                var obj1 = scene.add.sprite(jugador.x + tileSize, jugador.y-tileSize - 40, jugador.inventario[0].tipo).setScale(1.5).setInteractive();
                obj1.on('pointerdown', () => this.ClickObjeto(0, jugador));
                jugador.arrayMostrados.push(obj1);
                var obj2 = scene.add.sprite(jugador.x + tileSize + 75, jugador.y-tileSize - 40, jugador.inventario[1].tipo).setScale(1.5).setInteractive();
                obj2.on('pointerdown', () => this.ClickObjeto(1, jugador));
                jugador.arrayMostrados.push(obj2);
                var obj3 = scene.add.sprite(jugador.x + tileSize + 75*2, jugador.y-tileSize - 40, jugador.inventario[2].tipo).setScale(1.5).setInteractive();
                obj3.on('pointerdown', () => this.ClickObjeto(2, jugador));
                jugador.arrayMostrados.push(obj3);
                break;
            case 4:
                var obj1 = scene.add.sprite(jugador.x + tileSize, jugador.y-tileSize - 40, jugador.inventario[0].tipo).setScale(1.5).setInteractive();
                obj1.on('pointerdown', () => this.ClickObjeto(0, jugador));
                jugador.arrayMostrados.push(obj1);
                var obj2 = scene.add.sprite(jugador.x + tileSize + 75, jugador.y-tileSize - 40, jugador.inventario[1].tipo).setScale(1.5).setInteractive();
                obj2.on('pointerdown', () => this.ClickObjeto(1, jugador));
                jugador.arrayMostrados.push(obj2);
                var obj3 = scene.add.sprite(jugador.x + tileSize + 75*2, jugador.y-tileSize - 40, jugador.inventario[2].tipo).setScale(1.5).setInteractive();
                obj3.on('pointerdown', () => this.ClickObjeto(2, jugador));
                jugador.arrayMostrados.push(obj3);
                var obj4 = scene.add.sprite(jugador.x + tileSize + 75*3, jugador.y-tileSize - 40, jugador.inventario[3].tipo).setScale(1.5).setInteractive();
                obj4.on('pointerdown', () => this.ClickObjeto(3, jugador));
                jugador.arrayMostrados.push(obj4);
                break;
            case 5:
                var obj1 = scene.add.sprite(jugador.x + tileSize, jugador.y-tileSize - 40, jugador.inventario[0].tipo).setScale(1.5).setInteractive();
                obj1.on('pointerdown', () => this.ClickObjeto(0, jugador));
                jugador.arrayMostrados.push(obj1);
                var obj2 = scene.add.sprite(jugador.x + tileSize + 75, jugador.y-tileSize - 40, jugador.inventario[1].tipo).setScale(1.5).setInteractive();
                obj2.on('pointerdown', () => this.ClickObjeto(1, jugador));
                jugador.arrayMostrados.push(obj2);
                var obj3 = scene.add.sprite(jugador.x + tileSize + 75*2, jugador.y-tileSize - 40, jugador.inventario[2].tipo).setScale(1.5).setInteractive();
                obj3.on('pointerdown', () => this.ClickObjeto(2, jugador));
                jugador.arrayMostrados.push(obj3);
                var obj4 = scene.add.sprite(jugador.x + tileSize + 75*3, jugador.y-tileSize - 40, jugador.inventario[3].tipo).setScale(1.5).setInteractive();
                obj4.on('pointerdown', () => this.ClickObjeto(3, jugador));
                jugador.arrayMostrados.push(obj4);
                var obj5 = scene.add.sprite(jugador.x + tileSize + 75*4, jugador.y-tileSize - 40, jugador.inventario[4].tipo).setScale(1.5).setInteractive();
                obj5.on('pointerdown', () => this.ClickObjeto(4, jugador));
                jugador.arrayMostrados.push(obj5);
                break;

        }
        /*var obj1 = scene.add.sprite(jugador.x + tileSize + 75*i, jugador.y-tileSize - 40, jugador.inventario[0].tipo).setScale(1.5).setInteractive();
        obj1.on('pointerdown', () => this.ClickObjeto(0, jugador));
        var obj2 = scene.add.sprite(jugador.x + tileSize + 75*i, jugador.y-tileSize - 40, jugador.inventario[1].tipo).setScale(1.5).setInteractive();
        obj2.on('pointerdown', () => this.ClickObjeto(1, jugador));
        var obj3 = scene.add.sprite(jugador.x + tileSize + 75*i, jugador.y-tileSize - 40, jugador.inventario[2].tipo).setScale(1.5).setInteractive();
        obj3.on('pointerdown', () => this.ClickObjeto(2, jugador));
        var obj4 = scene.add.sprite(jugador.x + tileSize + 75*i, jugador.y-tileSize - 40, jugador.inventario[3].tipo).setScale(1.5).setInteractive();
        obj4.on('pointerdown', () => this.ClickObjeto(3, jugador));
        var obj5 = scene.add.sprite(jugador.x + tileSize + 75*i, jugador.y-tileSize - 40, jugador.inventario[4].tipo).setScale(1.5).setInteractive();
        obj5.on('pointerdown', () => this.ClickObjeto(4, jugador));*/

        /*for(var i = 0; i<jugador.inventario.length; i++){
            //Para multi: usar elemento de UI para ubicarlo en funcion del canvas de la pantalla en vez de sprite para que el otro no lo vea
            var miObj = jugador.inventario[i].tipo;
            jugador.arrayMostrados[i] = scene.add.sprite(jugador.x + tileSize + 75*i, jugador.y-tileSize - 40, miObj).setScale(1.5).setInteractive();
            //jugador.arrayMostrados[i].on('pointerdown', () => this.ClickObjeto(miObj, jugador));
            jugador.arrayMostrados[i].on('pointerdown', () => this.ClickObjeto(this.key, jugador));

        }*/
        
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
            jugador.arrayMostrados[objetoActual].clearTint();
            console.log("borrar " + jugador.inventario[objetoActual].tipo);
            var index = jugador.arraySeleccionados.indexOf(objetoActual);
            jugador.arraySeleccionados.splice(index, 1);
        }else{
            jugador.arrayMostrados[objetoActual].setTint(0x616161);
            jugador.arraySeleccionados.push(objetoActual);
        }
    
    }

    Enviar(jugador, destElegido){
        var paqueteCreado = [];
        for(let a = 0; a < jugador.arraySeleccionados.length; a++){
            paqueteCreado.push(jugador.inventario[jugador.arraySeleccionados[a]].tipo);
        }
        console.log("he creado el paquete: " + paqueteCreado);

        //Esto debe ir en Comparar paquete, esta aqui provisionalmente porque
        //Comparar paquete no va por la seleccion de pedidos
        for(let i = 0; i < paqueteCreado.length; i++){
            for(let j = 0; j < jugador.inventario.length; j++){
                console.log("Comparando: " + jugador.inventario[j].tipo + " y " + paqueteCreado[i]);
                if(jugador.inventario[j].tipo == paqueteCreado[i]){
                    console.log("coindice el elemento: " + j + ", " + jugador.inventario[j].tipo);
                    jugador.inventario.splice(j, 1);
                }
            }
        }
        arraySeleccionados.splice(0, arraySeleccionados.length);
        //hasta aqui
        console.log(CompararPedidos(paqueteCreado, jugador.pedidoSeleccionado, destElegido));
    }

    BorrarBotones(delta, jugador){
        buttEnviarCielo.destroy();
        buttEnviarInfierno.destroy();
        for(var i = 0; i < jugador.arrayMostrados.length; i++){
            jugador.arrayMostrados[i].destroy();
        }
        jugador.arrayMostrados.splice(0, jugador.arrayMostrados.length);
    }
}