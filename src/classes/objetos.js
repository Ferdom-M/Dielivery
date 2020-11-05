var puntuacionDestinatarioFallido = -150;
var puntuacionItemFallido = -40;
var puntuacionTotal = 0;


class Objeto {
	constructor(tipo, puntuacion){
		this.tipo = tipo; // String
		this.puntuacion = puntuacion;
	}
	
	Clone(objeto){
		this.tipo = objeto.tipo; 
		this.puntuacion = objeto.puntuacion; 
		this.sprite = objeto.sprite; 
	}
}

class Pedido{
	constructor(numPedido, numObjetos, objetos, destinatario, persona, indice){
		this.numPedido = numPedido;
		this.numObjetos = numObjetos; // int numero de objetos del pedido
		this.objetos = objetos; // array de objetos que conforman el pedido
		this.destinatario = destinatario; // bool true = cielo, false = infierno
		this.persona = persona
		this.indice = indice;
	}
}
// Flores
var tulipan = new Objeto("Tulipan", 50);
var rosa = new Objeto("Rosa", 50);
var violeta = new Objeto("Violeta", 50);
var margarita = new Objeto("Margarita", 50);

// Bebidas
var orujo = new Objeto("Botella Orujo", 50);
var whisky = new Objeto("Botella Whisky", 50);
var ron = new Objeto("Botella Ron", 50);
var vino = new Objeto("Botella Vino", 50);

// Cosas personales
var bandera1 = new Objeto("Bandera 1", 50);
var bandera2 = new Objeto("Bandera 2", 50);
var pelucheViejo = new Objeto("Osito Viejo", 50);
var pelucheNuevo = new Objeto("Osito Nuevo", 50);

// Cartas 
var cartaSello = new Objeto("Carta Sellada", 50);
var cartaAbierta = new Objeto("Carta Abierta", 50);
var fotoFamiliar = new Objeto("Foto Familiar", 50);
var fotoPersonal = new Objeto("Foto Personal", 50);

// Joyas
var anillo = new Objeto("Anillo", 50);
var pendiente = new Objeto("Pendiente", 50);
var collarPerlas = new Objeto("Collar Perlas", 50);
var collarOro = new Objeto("Collar Oro", 50);

// Los objetos se meten en un array para sacarlos directamente con el numero generado
var arrayObjetos = new Array();
arrayObjetos.push(tulipan);
arrayObjetos.push(rosa);
arrayObjetos.push(violeta);
arrayObjetos.push(margarita);
arrayObjetos.push(orujo);
arrayObjetos.push(whisky);
arrayObjetos.push(ron);
arrayObjetos.push(vino);
arrayObjetos.push(bandera1);
arrayObjetos.push(bandera2);
arrayObjetos.push(pelucheViejo);
arrayObjetos.push(pelucheNuevo);
arrayObjetos.push(cartaSello);
arrayObjetos.push(cartaAbierta);
arrayObjetos.push(fotoFamiliar);
arrayObjetos.push(fotoPersonal);
arrayObjetos.push(anillo);
arrayObjetos.push(pendiente);
arrayObjetos.push(collarPerlas);
arrayObjetos.push(collarOro);

var arrayPedidos = new Array();
var arrayTarjetas = new Array();
var arrayPedidosMostrados =  new Array();
//var tarjetasVigentes = [];
var pedidosVigentes = 0;

var maxPedidos = 5;
var escalaTarjeta = 0.4;
var margenInicialTarjeta = 100;

function GenerarPedido(jugador, that){
	if(arrayPedidos.length < maxPedidos){
		// Aleatorio 0 a 1, si es 0 será cielo, si es 1 será infierno
		var destinatario = Math.floor(Math.random() * 2) == 0;
		
		// Aleatorio 2 a 4
		var numObjetos = Math.floor(Math.random() * 3) + 2;
		
		// Aleatorio entre los 20 con la misma probabilidad
		var objetosGenerados = new Array();
		for(var i = 0; i < numObjetos; i++){
			var objetoGenerado = Math.floor(Math.random() * arrayObjetos.length);
			//objetosGenerados.push(arrayObjetos[objetoGenerado].tipo);
			objetosGenerados.push(arrayObjetos[objetoGenerado]);
			//objetosGenerados solo tiene nombres por lo que no se puede acceder a la puntuacion
			//en compararPedidos
		}
		
		var persona = Math.floor(Math.random() * arrayNombres.length);
		while(perfilesUsados.has(persona)){
			persona = Math.floor(Math.random() * arrayNombres.length);
		}
		perfilesUsados.add(persona);
		var pedido = new Pedido(arrayPedidos.length, numObjetos, objetosGenerados, destinatario, persona, pedidosVigentes);
		arrayPedidos.push(pedido);
		//var tarjeta = that.add.sprite(1700 + arrayPedidos.length*80, 650, 'logo').setScale(0.1).setInteractive();
		//tarjeta.on('pointerdown', () => jugador.pedidoSeleccionado = pedido);

		var tarjeta = new Tarjeta(that, 0, 0, pedido).setScrollFactor(0,0);
		
		camJugador1.ignore(tarjeta);
		//camJugador2.ignore(tarjeta);
		
		tarjeta.setPosition(margenInicialTarjeta + (arrayTarjetas.length / (maxPedidos - 1)) * (width - 2 * margenInicialTarjeta), -35).setScale(escalaTarjeta);
		
		arrayTarjetas.push(tarjeta);

		pedidosVigentes++;
		
		return pedido;
	}
}

//Paquete creado por el jugador, pedido a cumplir que elige el jugador  
/*function CompararPedidos(paquete, pedido, destinoElegido){
	var puntuacion = 0
	if(destinoElegido == pedido.destinatario){
		var objetosCorrectos = 0;
		for (var i = 0; i < paquete.numObjetos; i++){
			if(pedido.objetos.contains(paquete.objetos[i])){
				// Sobreescribimos ese elemento del array
				pedido.objetos[pedido.objetos.indexOf(paquete.objetos[i])] = 0;
				objetosCorrectos += 1;
				puntuacion += paquete.objetos[i].puntuacion;
			}else{
				puntuacion -= paquete.objetos[i].puntuacion;
			}
		}
		if(objetosCorrectos == paquete.numObjetos){
			console.log("Pedido correcto");
		}else{
			console.log("Pedido fallido");
			puntuacion -= puntuacionPedidoFallido;
		}
	}else{
		console.log("Pedido fallido");
		puntuacion += puntuacionPedidoFallido;
	}

	//Eliminamos tarjeta del pedido que hemos hecho
	arrayTarjetas[pedido.indice].destroy();
	arrayTarjetas.splice(pedido.indice, 1);
	for(let i = pedido.indice; i < arrayPedidos.length; i++){
		arrayPedidos[i].indice = arrayPedidos[i].indice - 1;
	}
	pedidosVigentes--;

	//Insertar bucle de vaciado de inventario(actualmente en ClickObjeto de estadoMesa) 

	return puntuacion;
}*/

function CompararPedidos(paquete, pedido, destinoElegido){
	//var puntuacion = 0
	var objetos = [];
	for(var z = 0; z < pedido.objetos.length; z++){
		objetos.push(pedido.objetos[z].tipo);
	}
	console.log("Score previo: " + puntuacionTotal);
	if(destinoElegido == pedido.destinatario){
		var objetosCorrectos = 0;
		for (var i = 0; i < paquete.length; i++){
			if(objetos.includes(paquete[i])){
				console.log("contengo: " + paquete[i]);
				console.log("Sumo: " + pedido.objetos[objetos.indexOf(paquete[i])].puntuacion);
				puntuacionTotal += pedido.objetos[objetos.indexOf(paquete[i])].puntuacion;
				// Sobreescribimos ese elemento del array
				pedido.objetos[objetos.indexOf(paquete[i])] = 0;
				objetos[objetos.indexOf(paquete[i])] = 0;
				objetosCorrectos += 1;
				//console.log("puntuacion" + paquete.objetos[pedido.objetos.indexOf(paquete[i])].puntuacion);
				//puntuacion += 50;
			}else{
				console.log("fallo: " + paquete[i]);
				puntuacionTotal += puntuacionItemFallido;
				//puntuacion += 50;
			}
			
		}
		if(objetosCorrectos == pedido.length){
			console.log("Pedido correcto");
		}else{
			console.log("Pedido fallido");
			var itemsSobrantes = Math.abs(pedido.objetos.length - paquete.length);
			puntuacionTotal -= Math.abs(itemsSobrantes * puntuacionItemFallido);
			console.log("Resto: " + itemsSobrantes * puntuacionItemFallido);
			//puntuacion += puntuacionItemFallido;
		}
	}else{
		console.log("Pedido fallido por destino");
		puntuacionTotal += puntuacionDestinatarioFallido;
	}

	//Eliminamos tarjeta del pedido que hemos hecho
	arrayTarjetas[pedido.indice].destroy();
	arrayTarjetas.splice(pedido.indice, 1);
	arrayPedidos.splice(pedido.indice, 1);
	for(let i = pedido.indice; i < arrayPedidos.length; i++){
		arrayPedidos[i].indice = arrayPedidos[i].indice - 1;
	}
	arrayPedidosMostrados[pedido.indice].destroy();

	pedidosVigentes--;

	//Insertar bucle de vaciado de inventario(actualmente en ClickObjeto de estadoMesa) 

	//return puntuacion;
	console.log("Puntuacion actual: " + puntuacionTotal);
}