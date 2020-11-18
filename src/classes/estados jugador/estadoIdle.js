class Idle extends State{
	enter(delta, scene, jugador){
		//console.log("Estado idle");
		
		jugador.dashDisponible = true;
		// Desactivamos la gravedad si estamos en el suelo, solo se vuelve a activar si estamos en el aire sin tocar paredes
		jugador.body.setAllowGravity(false);
		
		// Para sustituir la animacion anterior, pero solo la sustituimos si no es aterrizajeSalto
		if(jugador.anims.getCurrentKey() != 'aterrizajeSalto'){
			jugador.anims.delayedPlay(1000, 'idle');
		}
	}
	
	execute(delta, scene, jugador){
		// Transiciones
		if(jugador.enPinchos){
			jugador.stateMachine.transition(delta, 'dano');
			return;
		}
		if(jugador.dirX != 0){
			jugador.stateMachine.transition(delta, 'correr');
			return;
		}
		if(!jugador.enSuelo){
			jugador.stateMachine.transition(delta, 'caer');
			return;
		}
		if(jugador.enEscalera && jugador.dirY < 0){
			jugador.stateMachine.transition(delta, 'escalera');
			return;
		}
		if(jugador.accion && objetos.getTileAtWorldXY(jugador.x, jugador.y) && jugador.inventario.length < limInventario){
			jugador.stateMachine.transition(delta, 'recogerObjeto');
			return;
		}
		if(jugador.jumpsquat){
			jugador.stateMachine.transition(delta, 'salto');
			return;
		}
		if(jugador.accion && resto.getTileAtWorldXY(jugador.x, jugador.y) && idTumbasConPedidos.has(resto.getTileAtWorldXY(jugador.x, jugador.y).index) && arrayPedidos.length < 5 && arrayPedidosPorRecoger.length > 0){
			jugador.stateMachine.transition(delta, 'recogerPedido');
			return;
		}
		if(jugador.accion && resto.getTileAtWorldXY(jugador.x, jugador.y) && idMesa.has(resto.getTileAtWorldXY(jugador.x, jugador.y).index)){
			jugador.stateMachine.transition(delta, 'mesa');
			return;
		}
		if(jugador.tarjetas && arrayPedidos.length > 0){
			jugador.stateMachine.transition(delta, "mirandoTarjetas");
			return;
		}
		
		

		
		if(jugador.enSueloResbaladizo){
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, aceleracionResbaladizo));
		}
		else{
			jugador.setVelocityX(Phaser.Math.Linear(jugador.body.velocity.x, 0, friccionSuelo));
		}
		
		if(Math.abs(jugador.body.velocity.x) < 5){
			jugador.setVelocityX(0);
		}
	}
}




