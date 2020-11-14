class estadoRecogerPedido extends State{
	enter(delta, scene, jugador){
		// console.log("Estado recoger pedido");
		RecogerPedido(scene, arrayPedidosPorRecoger[0]);
		
		
		jugador.body.velocity.x = 0;
		jugador.anims.play("idle", true);
		if(!jugador.sGuarTarjeta.isPlaying){
			jugador.sGuarTarjeta.play();
		}
		scene.time.delayedCall(100, () => jugador.stateMachine.transition(delta, 'idle'));
		
		var tileActual = resto.getTileAtWorldXY(jugador.x, jugador.y).index;
		
		switch(true){
			case(idTumbas0.has(tileActual)):
				var tumba = 0;
				break;
			case(idTumbas1.has(tileActual)):
				var tumba = 1;
				break;
			case(idTumbas2.has(tileActual)):
				var tumba = 2;
				break;
			case(idTumbas3.has(tileActual)):
				var tumba = 3;
				break;
		}
		
		tumbaConPedidos.delete(tumba);
		avisoTumba[tumba].setVisible(false);
		for(var i = 0; i < tilesTumba[tumba].length; i++){
			idTumbasConPedidos.delete(tilesTumba[tumba][i]);
		}

	}
}

