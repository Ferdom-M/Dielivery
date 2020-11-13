class estadoRecogerPedido extends State{
	enter(delta, scene, jugador){
		// console.log("Estado recoger pedido");
		RecogerPedido(scene, arrayPedidosPorRecoger[0]);
		
		jugador.body.velocity.x = 0;
		jugador.anims.play("idle", true);
		if(!jugador.sGuarTarjeta.isPlaying){
			jugador.sGuarTarjeta.play();
		}
		scene.time.delayedCall(1000, () => jugador.stateMachine.transition(delta, 'idle'));
	}
}

