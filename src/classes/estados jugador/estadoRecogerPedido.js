class estadoRecogerPedido extends State{
	enter(delta, scene, jugador){
		RecogerPedido(scene, arrayPedidosPorRecoger[0]);
		
		jugador.body.velocity.x = 0;
		jugador.anims.play("idle", true);
		if(!jugador.sGuarTarjeta.isPlaying){
			jugador.sGuarTarjeta.play();
		}
	}
	
	execute(delta, scene, jugador){
		scene.time.delayedCall(100, () => jugador.stateMachine.transition(delta, 'idle'));
	}
}

