class RecogerObjeto extends State{
	enter(delta, scene, jugador){
		//console.log("Estado recoger objeto");
		
		var tileActual = objetos.getTileAtWorldXY(jugador.x, jugador.y).index;
		var objeto = new Objeto();
		switch(true){
			case idTulipanes.has(tileActual):
				objeto.Clone(tulipan);
				break;
			case idRosas.has(tileActual):
				objeto.Clone(rosa);
				break;
			case idVioletas.has(tileActual):
				objeto.Clone(violeta);
				break;
			case idMargaritas.has(tileActual):
				objeto.Clone(margarita);
				break;
			case idOrujo.has(tileActual):
				objeto.Clone(orujo);
				break;
			case idWhisky.has(tileActual):
				objeto.Clone(whisky);
				break;
			case idRon.has(tileActual):
				objeto.Clone(ron);
				break;
			case idVino.has(tileActual):
				objeto.Clone(vino);
				break;
			case idBandera1.has(tileActual):
				objeto.Clone(bandera1);
				break;
			case idBandera2.has(tileActual):
				objeto.Clone(bandera2);
				break;
			case idPelucheViejo.has(tileActual):
				objeto.Clone(pelucheViejo);
				break;
			case idPelucheNuevo.has(tileActual):
				objeto.Clone(pelucheNuevo);
				break;
			case idCartaSello.has(tileActual):
				objeto.Clone(cartaSello);
				break;
			case idCartaAbierta.has(tileActual):
				objeto.Clone(cartaAbierta);
				break;
			case idFotoFamiliar.has(tileActual):
				objeto.Clone(fotoFamiliar);
				break;
			case idFotoPersonal.has(tileActual):
				objeto.Clone(fotoPersonal);
				break;
			case idAnillo.has(tileActual):
				objeto.Clone(anillo);
				break;
			case idPendiente.has(tileActual):
				objeto.Clone(pendiente);
				break;
			case idCollarPerlas.has(tileActual):
				objeto.Clone(collarPerlas);
				break;
			case idCollarOro.has(tileActual):
				objeto.Clone(collarOro);
				break;
		}
		
		jugador.body.velocity.x = 0;
		
		scene.time.delayedCall(tiempoRecogerObjeto, () => this.AgregarObjeto(delta, jugador, objeto));			
	}
	
	AgregarObjeto(delta, jugador, objeto){
		console.log(objeto);
		jugador.inventario.push(objeto);
		jugador.velActual = velJugador + (-velJugador / (2 * limInventario)) * jugador.inventario.length;

		jugador.stateMachine.transition(delta, 'idle');
	}
}