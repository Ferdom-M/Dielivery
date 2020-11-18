class RecogerObjeto extends State{
	enter(delta, scene, jugador){
		//console.log("Estado recoger objeto");
		
		jugador.anims.play("idle", true);
		var tileActual = objetos.getTileAtWorldXY(jugador.x, jugador.y).index;
		var objeto = new Objeto();
		switch(true){
			case idTulipanes.has(tileActual):
				jugador.sFlores.play();
				objeto.Clone(tulipan);
				break;
			case idRosas.has(tileActual):
				jugador.sFlores.play();
				objeto.Clone(rosa);
				break;
			case idVioletas.has(tileActual):
				jugador.sFlores.play();
				objeto.Clone(violeta);
				break;
			case idMargaritas.has(tileActual):
				jugador.sFlores.play();
				objeto.Clone(margarita);
				break;
			case idOrujo.has(tileActual):
				jugador.sBotellas.play();
				objeto.Clone(orujo);
				break;
			case idWhisky.has(tileActual):
				jugador.sBotellas.play();
				objeto.Clone(whisky);
				break;
			case idRon.has(tileActual):
				jugador.sBotellas.play();
				objeto.Clone(ron);
				break;
			case idVino.has(tileActual):
				jugador.sBotellas.play();
				objeto.Clone(vino);
				break;
			case idBandera1.has(tileActual):
				jugador.sBaulRecuerdos.play();
				objeto.Clone(bandera1);
				break;
			case idBandera2.has(tileActual):
				jugador.sBaulRecuerdos.play();
				objeto.Clone(bandera2);
				break;
			case idPelucheViejo.has(tileActual):
				jugador.sBaulRecuerdos.play();
				objeto.Clone(pelucheViejo);
				break;
			case idPelucheNuevo.has(tileActual):
				jugador.sBaulRecuerdos.play();
				objeto.Clone(pelucheNuevo);
				break;
			case idCartaSello.has(tileActual):
				jugador.sCarta.play();
				objeto.Clone(cartaSello);
				break;
			case idCartaAbierta.has(tileActual):
				jugador.sCarta.play();
				objeto.Clone(cartaAbierta);
				break;
			case idFotoFamiliar.has(tileActual):
				jugador.sCarta.play();
				objeto.Clone(fotoFamiliar);
				break;
			case idFotoPersonal.has(tileActual):
				jugador.sCarta.play();
				objeto.Clone(fotoPersonal);
				break;
			case idAnillo.has(tileActual):
				jugador.sJoyero.play();
				objeto.Clone(anillo);
				break;
			case idPendiente.has(tileActual):
				jugador.sJoyero.play();
				objeto.Clone(pendiente);
				break;
			case idCollarPerlas.has(tileActual):
				jugador.sJoyero.play();
				objeto.Clone(collarPerlas);
				break;
			case idCollarOro.has(tileActual):
				jugador.sJoyero.play();
				objeto.Clone(collarOro);
				break;
		}
		
		jugador.body.velocity.x = 0;
		
		scene.time.delayedCall(tiempoRecogerObjeto, () => this.AgregarObjeto(delta, scene, jugador, objeto));	

		this.contadorBarra = 0;
		this.barraCarga = scene.add.graphics(width / 2, height / 2);
		this.anchoBarra = 100;
		this.altoBarra = 10;
	}
	
	execute(delta, scene, jugador){
		this.contadorBarra += delta;
		
		this.barraCarga.clear();
		this.barraCarga.fillStyle(0xadecff, 1);
		this.barraCarga.fillRect(width / 2 - this.anchoBarra / 2, height / 2 - this.altoBarra / 2 - tileSize, this.contadorBarra / tiempoRecogerObjeto * this.anchoBarra, this.altoBarra);
	}
	
	AgregarObjeto(delta, scene, jugador, objeto){
		this.barraCarga.destroy();
		
		jugador.inventario.push(objeto);
		jugador.velActual = velJugador + (-velJugador / (2 * limInventario)) * jugador.inventario.length;

		RepresentarInventario(scene, jugador);
		jugador.stateMachine.transition(delta, 'idle');
	}
}