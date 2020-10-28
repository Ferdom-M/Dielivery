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
	constructor(numObjetos, objetos, destinatario, nombre, causaDeMuerte){
		this.numObjetos = numObjetos; // int numero de objetos del pedido
		this.objetos = objetos; // array de objetos que conforman el pedido
		this.destinatario = destinatario; // bool true = cielo, false = infierno
		this.nombre = nombre;
		this.causaDeMuerte = causaDeMuerte;
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
arrayNombres.push("Fer");
arrayNombres.push("Dvd");
arrayNombres.push("Nou");
arrayNombres.push("Leggnas");
arrayNombres.push("Raúl");
arrayNombres.push("Nacho");

var arrayCausaMuerte = new Array();
arrayCausaMuerte.push("Pensó que el ajo era una papa");
arrayCausaMuerte.push("Colleja de Nou");
arrayCausaMuerte.push("Estuvo trabajando en la capa equivocada en Tiled");
arrayCausaMuerte.push("Era artista");
arrayCausaMuerte.push("Se tropezó con el espagueti code que tenemos montado y se partió la crisma");
arrayCausaMuerte.push("Fue Fer");

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

function GenerarPedido(jugador, that){
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
	
	var nombre = Math.floor(Math.random() * arrayNombres.length);
	var causaDeMuerte = Math.floor(Math.random() * arrayCausaMuerte.length);
	
	var pedido = new Pedido(numObjetos, objetosGenerados, destinatario, arrayNombres[nombre], arrayCausaMuerte[causaDeMuerte]);
	arrayPedidos.push(pedido);
	var tarjeta = that.add.sprite(1700 + arrayPedidos.length*80, 650, 'logo').setScale(0.1).setInteractive();
	tarjeta.on('pointerdown', () => jugador.pedidoSeleccionado = pedido);


	return pedido;
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
	return puntuacion;
}