var buttEnviarCielo;
var buttEnviarInfierno;
var buttCerrar;
var buttBasura;
var textoSeleccionPedido;

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
        
        textoSeleccionPedido = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 200, "Selecciona tu pedido", {fontFamily: 'Georgia, Times, serif'});
        switch(arrayPedidos.length){
            case 1:
                //var pedido1 = scene.add.sprite(jugador.x - tileSize*4, jugador.y-tileSize - 150, "pruebaNombre").setScale(0.2).setInteractive();
                //var pedido1 = scene.add.text(jugador.x - tileSize, jugador.y-tileSize - 40, "Pedido: " + arrayNombres[arrayPedidos[0].persona], {fontFamily: 'Georgia, Times, serif'}).setInteractive();
                var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 150, arrayNombres[arrayPedidos[0].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido1.on('pointerdown', () => this.SeleccionarPedido(0, jugador));
                arrayPedidosMostrados.push(pedido1);
                break;
            case 2:
                var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 150, arrayNombres[arrayPedidos[0].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido1.on('pointerdown', () => this.SeleccionarPedido(0, jugador));
                arrayPedidosMostrados.push(pedido1);

                var pedido2 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 125, arrayNombres[arrayPedidos[1].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido2.on('pointerdown', () => this.SeleccionarPedido(1, jugador));
                arrayPedidosMostrados.push(pedido2);
                break;
            case 3:
                var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 150, arrayNombres[arrayPedidos[0].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido1.on('pointerdown', () => this.SeleccionarPedido(0, jugador));
                arrayPedidosMostrados.push(pedido1);

                var pedido2 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 125, arrayNombres[arrayPedidos[1].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido2.on('pointerdown', () => this.SeleccionarPedido(1, jugador));
                arrayPedidosMostrados.push(pedido2);

                var pedido3 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 100, arrayNombres[arrayPedidos[2].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido3.on('pointerdown', () => this.SeleccionarPedido(2, jugador));
                arrayPedidosMostrados.push(pedido3);
                break;
            case 4:
                var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 150, arrayNombres[arrayPedidos[0].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido1.on('pointerdown', () => this.SeleccionarPedido(0, jugador));
                arrayPedidosMostrados.push(pedido1);

                var pedido2 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 125, arrayNombres[arrayPedidos[1].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido2.on('pointerdown', () => this.SeleccionarPedido(1, jugador));
                arrayPedidosMostrados.push(pedido2);

                var pedido3 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 100, arrayNombres[arrayPedidos[2].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido3.on('pointerdown', () => this.SeleccionarPedido(2, jugador));
                arrayPedidosMostrados.push(pedido3);

                var pedido4 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 75, arrayNombres[arrayPedidos[3].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido4.on('pointerdown', () => this.SeleccionarPedido(3, jugador));
                arrayPedidosMostrados.push(pedido4);
                break;
            case 5:
                var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 150, arrayNombres[arrayPedidos[0].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido1.on('pointerdown', () => this.SeleccionarPedido(0, jugador));
                arrayPedidosMostrados.push(pedido1);

                var pedido2 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 125, arrayNombres[arrayPedidos[1].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido2.on('pointerdown', () => this.SeleccionarPedido(1, jugador));
                arrayPedidosMostrados.push(pedido2);

                var pedido3 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 100, arrayNombres[arrayPedidos[2].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido3.on('pointerdown', () => this.SeleccionarPedido(2, jugador));
                arrayPedidosMostrados.push(pedido3);

                var pedido4 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 75, arrayNombres[arrayPedidos[3].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido4.on('pointerdown', () => this.SeleccionarPedido(3, jugador));
                arrayPedidosMostrados.push(pedido4);

                var pedido5 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 50, arrayNombres[arrayPedidos[1].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '22px', resolution: 100}).setInteractive();
                pedido5.on('pointerdown', () => this.SeleccionarPedido(4, jugador));
                arrayPedidosMostrados.push(pedido5);
                break;
            
           /*case 5:
            var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 150, arrayNombres[arrayPedidos[0].persona], {fontFamily: 'Georgia, Times, serif'}).setInteractive();
            var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 125, arrayNombres[arrayPedidos[1].persona], {fontFamily: 'Copperplate, "Copperplate Gothic Light"', fontSize: '20px', resolution: 100}).setInteractive();
            var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 100, arrayNombres[arrayPedidos[2].persona], {fontFamily: 'Georgia, Times, serif'}).setInteractive();
            var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 75,  arrayNombres[arrayPedidos[3].persona], {fontFamily: 'Georgia, Times, serif'}).setInteractive();
            var pedido1 = scene.add.text(jugador.x - tileSize*4, jugador.y-tileSize - 50,  arrayNombres[arrayPedidos[4].persona], {fontFamily: 'Georgia, Times, serif'}).setInteractive();
            */
        }
        
        console.log(jugador.inventario);

        
        buttEnviarCielo = scene.add.sprite(jugador.x +70 + tileSize, jugador.y - 150, 'botonEnviar').setScale(1.5).setInteractive();
        buttEnviarInfierno = scene.add.sprite(jugador.x +130 + tileSize, jugador.y - 150, 'botonEnviar').setScale(1.5).setInteractive();
        buttBasura = scene.add.sprite(jugador.x + 200 + tileSize, jugador.y - 150, 'botonEnviar').setScale(1.5).setInteractive();
        buttEnviarCielo.on('pointerdown', () => this.Enviar(jugador, true));
        buttEnviarInfierno.on('pointerdown', () => this.Enviar(jugador, false));
        buttBasura.on('pointerdown', () => this.Eliminar(jugador));


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
        var paquete = this.Eliminar(jugador);
        //hasta aqui
        console.log(CompararPedidos(paquete, jugador.pedidoSeleccionado, destElegido));
    }

    Eliminar(jugador){
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
        for(let z = 0; z < jugador.arraySeleccionados.length; z++){
            jugador.arrayMostrados[jugador.arraySeleccionados[z]].destroy();
        }

        jugador.arraySeleccionados.splice(0, jugador.arraySeleccionados.length);

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