class estadoRecogerPedido extends State{

	enter(delta, scene, jugador, indiceTumba){
		console.log("Estado recoger pedido");
		//console.log(indiceTumba);
		/*var i = 0;
		while(indiceTumba != indicesTumbas[i]){
		}
			i++;
		*/
		var tumba = this.ClavePorValor(mapaTumbas, indiceTumba);
		if(!arrayTumbasLibres.includes(tumba) && !arrayTumbasCooldown.includes(tumba)){
			//console.log("tumba: " + tumba);
			RecogerPedido(scene, arrayPedidosPorRecoger[0], tumba);
			
			jugador.body.velocity.x = 0;
			jugador.anims.play("idle", true);
			if(!jugador.sGuarTarjeta.isPlaying){
				jugador.sGuarTarjeta.play();
			}
			scene.time.delayedCall(1000, () => jugador.stateMachine.transition(delta, 'idle'));
		}else{
			scene.time.delayedCall(100, () => jugador.stateMachine.transition(delta, 'idle'));
		}
		
	}

	ClavePorValor(map, valor) {
		for (let [key, value] of map.entries()) {
			/*console.log(value);
			console.log(valor);
			console.log(value.includes(valor));*/
			if (value.includes(valor)){
				console.log("entro");
				return key;
			}
		}
	}
}
