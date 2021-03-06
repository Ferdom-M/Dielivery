const puntuacionDestinatarioFallido = -150;
const puntuacionItemFallido = -40;
var puntuacionTotal = 0;
var pedido;


class Objeto {
	constructor(tipo, puntuacion){
		this.tipo = tipo; // String
		this.puntuacion = puntuacion;
	}
	
	Clone(objeto){
		this.tipo = objeto.tipo; 
		this.puntuacion = objeto.puntuacion;
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
const tulipan = new Objeto("Tulipan", 50);
const rosa = new Objeto("Rosa", 110);
const violeta = new Objeto("Violeta", 70);
const margarita = new Objeto("Margarita", 90);

// Bebidas
const orujo = new Objeto("Botella Orujo", 100);
const whisky = new Objeto("Botella Whisky", 130);
const ron = new Objeto("Botella Ron", 170);
const vino = new Objeto("Botella Vino", 200);

// Cosas personales
const bandera1 = new Objeto("Bandera 1", 120);
const bandera2 = new Objeto("Bandera 2", 125);
const pelucheViejo = new Objeto("Osito Viejo", 80);
const pelucheNuevo = new Objeto("Osito Nuevo", 85);

// Cartas 
const cartaSello = new Objeto("Carta Sellada", 80);
const cartaAbierta = new Objeto("Carta Abierta", 70);
const fotoFamiliar = new Objeto("Foto Familiar", 50);
const fotoPersonal = new Objeto("Foto Personal", 90);

// Joyas
const anillo = new Objeto("Anillo", 165);
const pendiente = new Objeto("Pendiente", 150);
const collarPerlas = new Objeto("Collar Perlas", 170);
const collarOro = new Objeto("Collar Oro", 195);

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
var arrayPedidosPorRecoger =  new Array();
//var tarjetasVigentes = [];
var pedidosVigentes = 0;

const maxPedidos = 5;
const numTumbas = 4;
const tarjetaAncho = 426;
const tarjetaAlto = 310;
const escalaTarjeta = 0.7
const margenInicialTarjeta = 160;
const margenFinalTarjeta = margenInicialTarjeta - (tarjetaAncho * escalaTarjeta) / 5;
const alturaTarjeta = -65;


function GenerarPedido(jugador, that, mapa){
	if(arrayPedidosPorRecoger.length < numTumbas){
		if(mapa != "tutorial"){
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
			pedido = new Pedido(0, numObjetos, objetosGenerados, destinatario, persona, pedidosVigentes);
			//arrayPedidos.push(pedido);
			arrayPedidosPorRecoger.push(pedido);
			
			// En qué tumba lo metemos?
			var tumba = Math.floor(Math.random() * 4);
			while(tumbaConPedidos.has(tumba)){
				var tumba = Math.floor(Math.random() * 4);
			}
			tumbaConPedidos.add(tumba);
			avisoTumba[tumba].setVisible(true);
			for(var i = 0; i < tilesTumba[tumba].length; i++){
				idTumbasConPedidos.add(tilesTumba[tumba][i]);
			}
			
			//var tarjeta = that.add.sprite(1700 + arrayPedidos.length*80, 650, 'logo').setScale(0.1).setInteractive();
			//tarjeta.on('pointerdown', () => jugador.pedidoSeleccionado = pedido);

			/*var tarjeta = new Tarjeta(that, 0, 0, pedido).setScrollFactor(0,0);
			
			camJugador1.ignore(tarjeta);
			//camJugador2.ignore(tarjeta);
			
			tarjeta = ColocarTarjeta(tarjeta, arrayTarjetas.length);
			
			arrayTarjetas.push(tarjeta);

			pedidosVigentes++;
			*/
		}else{
			var destinatario = Math.floor(Math.random() * 2) == 0;
			
			// Aleatorio 2 a 4
			var numObjetos = 3;
			
			// Aleatorio entre los 20 con la misma probabilidad
			var objetosGenerados = new Array();
			objetosGenerados.push(pelucheViejo);
			objetosGenerados.push(vino);
			objetosGenerados.push(cartaAbierta);
			
			var persona = 24;
			pedido = new Pedido(0, numObjetos, objetosGenerados, destinatario, persona, pedidosVigentes);
			arrayPedidosPorRecoger.push(pedido);
			var tumba = 0;
			avisoTumba[tumba].setVisible(true);
			for(var i = 0; i < tilesTumba[tumba].length; i++){
				idTumbasConPedidos.add(tilesTumba[tumba][i]);
			}
			
		}
		return pedido;
	}
}

function RecogerPedido(that, pedido){
	var tarjeta = new Tarjeta(that, 0, 0, pedido).setScrollFactor(0,0);
	
	camJugador1.ignore(tarjeta);
	//camJugador2.ignore(tarjeta);
	
	pedido.indice = arrayPedidos.length;
	
	tarjeta = ColocarTarjeta(tarjeta, arrayTarjetas.length);
	
	arrayTarjetas.push(tarjeta);
	arrayPedidos.push(pedido);
	arrayPedidosPorRecoger.splice(0, 1);

	pedidosVigentes++;

	
	
}

const anguloMaximo = 9;
function ColocarTarjeta(tarjeta, numTarjeta){
	var angulo = Math.floor(Math.random() * anguloMaximo * 2) - anguloMaximo;
	
	tarjeta.setPosition(margenInicialTarjeta + (numTarjeta / (maxPedidos - 1)) * (width - 2 * margenFinalTarjeta), alturaTarjeta);
	tarjeta.setScale(escalaTarjeta);
	tarjeta.setAngle(angulo);
	
	return tarjeta
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
	var pedidoCorrecto = false;
	for(var z = 0; z < pedido.objetos.length; z++){
		objetos.push(pedido.objetos[z].tipo);
	}
	if(destinoElegido == pedido.destinatario){
		var objetosCorrectos = 0;
		for (var i = 0; i < paquete.length; i++){
			if(objetos.includes(paquete[i])){
				puntuacionTotal += pedido.objetos[objetos.indexOf(paquete[i])].puntuacion;
				// Sobreescribimos ese elemento del array
				pedido.objetos[objetos.indexOf(paquete[i])] = 0;
				objetos[objetos.indexOf(paquete[i])] = 0;
				objetosCorrectos++;
				//console.log("puntuacion" + paquete.objetos[pedido.objetos.indexOf(paquete[i])].puntuacion);
				//puntuacion += 50;
			}else{
				puntuacionTotal += puntuacionItemFallido;
				
				objetosCorrectos--;
				//puntuacion += 50;
			}
			
		}
		if(objetosCorrectos == pedido.objetos.length){
			pedidoCorrecto = true;
		}else{
			puntuacionTotal -= Math.abs((pedido.objetos.length - paquete.length) * puntuacionItemFallido);
			//puntuacion += puntuacionItemFallido;
		}
	}else{
		puntuacionTotal += puntuacionDestinatarioFallido;
	}


	//Eliminamos tarjeta del pedido que hemos hecho
	arrayTarjetas[pedido.indice].destroy();
	arrayTarjetas.splice(pedido.indice, 1);
	arrayPedidos.splice(pedido.indice, 1);
	

	for(let i = pedido.indice; i < arrayPedidos.length; i++){
		arrayPedidos[i].indice--;
	}
	pedidosVigentes--;

	//Insertar bucle de vaciado de inventario(actualmente en ClickObjeto de estadoMesa) 

	//return puntuacion;
	return pedidoCorrecto;
}