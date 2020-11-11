class estadoRecogerPedido extends State{
	enter(delta, scene, jugador){
		RecogerPedido(scene, arrayPedidosPorRecoger[0]);
	}
	
	execute(delta, scene, jugador){
		scene.time.delayedCall(100, () => jugador.stateMachine.transition(delta, 'idle'));
	}
}

