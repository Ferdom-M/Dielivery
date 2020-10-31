var puntuacionPedidoFallido = -50;
var ratio;

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

var arrayNombres = new Array();
arrayNombres.push("adrvapor");
arrayNombres.push("SrAleSelz");
arrayNombres.push("AlbertoRayo");
arrayNombres.push("It'sGonza :D");
arrayNombres.push("Mokito");
arrayNombres.push("Shofiris");
arrayNombres.push("Whiite");

var arrayCausaMuerte = new Array();
arrayCausaMuerte.push("Se cayó por las\nescaleras de la\ncafetería de la\nuniversidad");
arrayCausaMuerte.push("Sufrió un derrame\ncerebral tras\njugar 453 horas\nseguidas al Isaac");
arrayCausaMuerte.push("Fue el sacrificio\npara la invocación\nde un dios primigenio");
arrayCausaMuerte.push("Murió apuñalado\npor la espalda\npor un villero");
arrayCausaMuerte.push("Muerte por triple\nmortal.\nAhora ya sabe por qué\nse llama así");
arrayCausaMuerte.push("Cayó por un acantilado\npor exceso de velocidad\nen una motocicleta");
arrayCausaMuerte.push("Sacó un 1 de natural\nen DnD");

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
			objetosGenerados.push(arrayObjetos[objetoGenerado].tipo);
		}
		
		var persona = Math.floor(Math.random() * arrayNombres.length);
		
		var pedido = new Pedido(arrayPedidos.length, numObjetos, objetosGenerados, destinatario, persona, pedidosVigentes);
		arrayPedidos.push(pedido);
		//var tarjeta = that.add.sprite(1700 + arrayPedidos.length*80, 650, 'logo').setScale(0.1).setInteractive();
		//tarjeta.on('pointerdown', () => jugador.pedidoSeleccionado = pedido);

		var tarjeta = new Tarjeta(that, 0, 0, pedido).setScrollFactor(0,0);
		
		tarjeta.setPosition(margenInicialTarjeta + (arrayTarjetas.length / (maxPedidos - 1)) * (width - 2 * margenInicialTarjeta), -35).setScale(escalaTarjeta);
		
		arrayTarjetas.push(tarjeta);

		pedidosVigentes++;
		
		return pedido;
	}
}

//Paquete creado por el jugador, pedido a cumplir que elige el jugador  
function CompararPedidos(paquete, pedido, destinoElegido){
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

	arrayTarjetas[pedido.indice].destroy();
	arrayTarjetas.splice(pedido.indice, 1);
	for(let i = pedido.indice; i < arrayPedidos.length; i++){
		arrayPedidos[i].indice = arrayPedidos[i].indice - 1;
	}
	pedidosVigentes--;

	return puntuacion;
}